import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { faixasInvestimento, formasPagamento, jaParticipou, jornadasQuiz, objetivos } from '../../config/quiz';
import { ufs } from '../../data/estados';
import { enviarLead, type DadosLead } from '../../lib/leads';
import { mascararTelefone, telefoneValido } from '../../lib/formatadores';
import { EVENTO_ABRIR_QUIZ, type AbrirQuizDetalhe } from '../../lib/quizEvents';
import { linkWhatsapp, numeroWhatsapp } from '../../lib/whatsapp';

const TOTAL = 7;

interface Respostas {
  jornada: string;
  objetivo: string;
  uf: string;
  cidade: string;
  faixa: string;
  pagamento: string;
  participou: string;
  nome: string;
  whatsapp: string;
}

const vazio: Respostas = {
  jornada: '',
  objetivo: '',
  uf: '',
  cidade: '',
  faixa: '',
  pagamento: '',
  participou: '',
  nome: '',
  whatsapp: '',
};

const campoCls =
  'w-full rounded-[var(--radius-moldura)] border border-linha bg-branco px-4 py-3 text-marinho-900 placeholder:text-cinza/70 focus:border-marinho-900';

function Opcoes(props: {
  nome: string;
  opcoes: readonly { valor: string; rotulo: string; detalhe?: string }[];
  valor: string;
  onChange: (v: string) => void;
}) {
  return (
    <div class="flex flex-col gap-2.5">
      {props.opcoes.map((o) => (
        <label
          class={`flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-moldura)] border px-4 py-3.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-marinho-900 ${
            props.valor === o.valor ? 'border-marinho-900 bg-marinho-900 text-branco' : 'border-linha bg-branco text-marinho-900 hover:border-marinho-900'
          }`}
        >
          <span>
            <span class="block font-titulo text-[0.95rem] font-semibold">{o.rotulo}</span>
            {o.detalhe && (
              <span class={`block text-xs ${props.valor === o.valor ? 'text-prata' : 'text-cinza'}`}>{o.detalhe}</span>
            )}
          </span>
          <input
            type="radio"
            name={props.nome}
            value={o.valor}
            class="sr-only"
            checked={props.valor === o.valor}
            onChange={() => props.onChange(o.valor)}
          />
          <span
            aria-hidden="true"
            class={`grid size-5 shrink-0 place-items-center rounded-full border ${
              props.valor === o.valor ? 'border-rosa bg-vinho-50' : 'border-prata'
            }`}
          >
            {props.valor === o.valor && <span class="size-2 rounded-full bg-marinho-900" />}
          </span>
        </label>
      ))}
    </div>
  );
}

const lista = (itens: readonly string[]) => itens.map((i) => ({ valor: i, rotulo: i }));

function montarMensagem(r: Respostas, contexto: string): string {
  const jornada = jornadasQuiz.find((j) => j.id === r.jornada);
  const linhas = [
    `Olá, Marcelo! Meu nome é ${r.nome}.`,
    '',
    `Jornada: ${jornada ? `${jornada.rotulo} (${jornada.detalhe})` : '-'}`,
    `Objetivo: ${r.objetivo}`,
    `Interesse em: ${r.cidade}/${r.uf}`,
    `Faixa de investimento: ${r.faixa}`,
    `Pagamento: ${r.pagamento}`,
    `Já participei de leilão: ${r.participou}`,
  ];
  if (contexto) linhas.push('', contexto);
  linhas.push('', `Meu WhatsApp: ${r.whatsapp}`);
  return linhas.join('\n');
}

export default function Quiz() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const [aberto, setAberto] = useState(false);
  const [passo, setPasso] = useState(0);
  const [r, setR] = useState<Respostas>(vazio);
  const [contexto, setContexto] = useState('');
  const [tentou, setTentou] = useState(false);
  const [concluido, setConcluido] = useState<{ url: string; mensagem: string } | null>(null);

  const abrir = (d: AbrirQuizDetalhe = {}) => {
    const jornadaValida = jornadasQuiz.some((j) => j.id === d.jornada);
    setR({ ...vazio, jornada: jornadaValida ? d.jornada! : '' });
    setContexto(d.contexto ?? '');
    setPasso(jornadaValida ? 1 : 0); // jornada já marcada: pula a primeira pergunta
    setTentou(false);
    setConcluido(null);
    setAberto(true);
  };

  // Escuta cliques em [data-quiz] (botões da página) e o evento global (simulador).
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-quiz]');
      if (!alvo) return;
      e.preventDefault();
      abrir({ jornada: alvo.dataset.jornada });
    };
    const aoEvento = (e: Event) => abrir((e as CustomEvent<AbrirQuizDetalhe>).detail);
    document.addEventListener('click', aoClicar);
    window.addEventListener(EVENTO_ABRIR_QUIZ, aoEvento);
    return () => {
      document.removeEventListener('click', aoClicar);
      window.removeEventListener(EVENTO_ABRIR_QUIZ, aoEvento);
    };
  }, []);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberto && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!aberto && d.open) d.close();
    if (!aberto) document.documentElement.style.overflow = '';
  }, [aberto]);

  useEffect(() => {
    if (aberto) titulo.current?.focus();
  }, [passo, aberto, concluido]);

  const set = <K extends keyof Respostas>(k: K, v: Respostas[K]) => setR((a) => ({ ...a, [k]: v }));

  const valido = (p: number): boolean => {
    switch (p) {
      case 0: return !!r.jornada;
      case 1: return !!r.objetivo;
      case 2: return !!r.uf && r.cidade.trim().length >= 2;
      case 3: return !!r.faixa;
      case 4: return !!r.pagamento;
      case 5: return !!r.participou;
      default: return r.nome.trim().length >= 2 && telefoneValido(r.whatsapp);
    }
  };

  const avancar = () => {
    setTentou(true);
    if (!valido(passo)) return;
    setTentou(false);
    setPasso((p) => p + 1);
  };

  const concluir = async (e: Event) => {
    e.preventDefault();
    setTentou(true);
    if (!valido(6)) return;
    const jornada = jornadasQuiz.find((j) => j.id === r.jornada);
    const dados: DadosLead = {
      jornada: jornada?.detalhe ?? r.jornada,
      objetivo: r.objetivo,
      uf: r.uf,
      cidade: r.cidade.trim(),
      faixaInvestimento: r.faixa,
      pagamento: r.pagamento,
      jaParticipou: r.participou,
      nome: r.nome.trim(),
      whatsapp: r.whatsapp,
      contextoSimulacao: contexto || undefined,
    };
    try {
      await enviarLead(dados); // hoje no-op; no futuro grava no CRM antes do WhatsApp
    } catch {
      /* falha no CRM não pode impedir o contato */
    }
    const mensagem = montarMensagem({ ...r, nome: dados.nome, cidade: dados.cidade }, contexto);
    const url = linkWhatsapp(mensagem);
    setConcluido({ url, mensagem });
    if (numeroWhatsapp()) window.open(url, '_blank', 'noopener');
  };

  const fechar = () => setAberto(false);
  const erro = (cond: boolean, texto: string) =>
    tentou && cond ? (
      <p class="mt-2 text-sm font-medium text-[#a32a00]" role="alert">
        {texto}
      </p>
    ) : null;

  const titulos = [
    'Em que momento você está?',
    'Qual é o seu objetivo?',
    'Onde você procura o imóvel?',
    'Qual faixa de investimento você tem disponível?',
    'Como pretende pagar?',
    'Você já participou de leilão?',
    'Para quem eu falo?',
  ];

  let corpo: ComponentChildren = null;
  if (passo === 0)
    corpo = (
      <Opcoes
        nome="jornada"
        valor={r.jornada}
        onChange={(v) => set('jornada', v)}
        opcoes={jornadasQuiz.map((j) => ({ valor: j.id, rotulo: j.rotulo, detalhe: j.detalhe }))}
      />
    );
  else if (passo === 1) corpo = <Opcoes nome="objetivo" valor={r.objetivo} onChange={(v) => set('objetivo', v)} opcoes={lista(objetivos)} />;
  else if (passo === 2)
    corpo = (
      <div class="grid gap-4 sm:grid-cols-[110px_1fr]">
        <div>
          <label for="quiz-uf" class="mb-1.5 block text-sm font-medium text-marinho-900">Estado</label>
          <select id="quiz-uf" class={campoCls} value={r.uf} onChange={(e) => set('uf', (e.target as HTMLSelectElement).value)}>
            <option value="">UF</option>
            {ufs.map((u) => (
              <option value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label for="quiz-cidade" class="mb-1.5 block text-sm font-medium text-marinho-900">Cidade de interesse</label>
          <input id="quiz-cidade" class={campoCls} autocomplete="address-level2" value={r.cidade} onInput={(e) => set('cidade', (e.target as HTMLInputElement).value)} />
        </div>
        <div class="sm:col-span-2">{erro(!valido(2), 'Informe o estado e a cidade.')}</div>
      </div>
    );
  else if (passo === 3) corpo = <Opcoes nome="faixa" valor={r.faixa} onChange={(v) => set('faixa', v)} opcoes={lista(faixasInvestimento)} />;
  else if (passo === 4) corpo = <Opcoes nome="pagamento" valor={r.pagamento} onChange={(v) => set('pagamento', v)} opcoes={lista(formasPagamento)} />;
  else if (passo === 5) corpo = <Opcoes nome="participou" valor={r.participou} onChange={(v) => set('participou', v)} opcoes={lista(jaParticipou)} />;
  else
    corpo = (
      <div class="flex flex-col gap-4">
        <div>
          <label for="quiz-nome" class="mb-1.5 block text-sm font-medium text-marinho-900">Seu nome</label>
          <input id="quiz-nome" class={campoCls} autocomplete="name" value={r.nome} onInput={(e) => set('nome', (e.target as HTMLInputElement).value)} />
          {erro(r.nome.trim().length < 2, 'Informe seu nome.')}
        </div>
        <div>
          <label for="quiz-whats" class="mb-1.5 block text-sm font-medium text-marinho-900">Seu WhatsApp</label>
          <input
            id="quiz-whats"
            class={campoCls}
            type="tel"
            inputMode="numeric"
            autocomplete="tel-national"
            placeholder="(11) 91234-5678"
            value={r.whatsapp}
            onInput={(e) => set('whatsapp', mascararTelefone((e.target as HTMLInputElement).value))}
          />
          {erro(!telefoneValido(r.whatsapp), 'Informe um WhatsApp válido com DDD.')}
        </div>
        <p class="text-xs text-cinza">
          Ao continuar, você será levado ao WhatsApp com um resumo das suas respostas. Veja a{' '}
          <a href="/politica-de-privacidade" class="underline">política de privacidade</a>.
        </p>
      </div>
    );

  const semNumero = concluido && !numeroWhatsapp();

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="quiz-titulo"
      class="m-0 mt-auto max-h-[94dvh] w-full max-w-none overflow-y-auto rounded-t-card bg-gelo p-0 text-marinho-900 backdrop:bg-marinho-900/70 sm:m-auto sm:max-w-lg sm:rounded-card"
      onClose={() => setAberto(false)}
      onClick={(e) => e.target === dialogo.current && fechar()}
    >
      <div class="flex flex-col gap-5 p-6 sm:p-8">
        <div class="flex items-center justify-between gap-4">
          <p class="font-titulo text-xs font-semibold uppercase tracking-widest text-cinza">
            {concluido ? 'Tudo pronto' : `Pergunta ${passo + 1} de ${TOTAL}`}
          </p>
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            class="grid size-10 cursor-pointer place-items-center rounded-full border border-linha bg-branco"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!concluido && (
          <div
            class="h-1.5 w-full overflow-hidden rounded-full bg-prata/60"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-valuenow={passo + 1}
            aria-label="Progresso do questionário"
          >
            <div class="h-full rounded-full bg-vinho transition-[width] duration-300" style={{ width: `${((passo + 1) / TOTAL) * 100}%` }} />
          </div>
        )}

        {concluido ? (
          <div class="flex flex-col gap-4">
            <h2 id="quiz-titulo" ref={titulo} tabIndex={-1} class="text-2xl normal-case leading-tight">
              {semNumero ? 'Quase lá!' : 'Abrimos o WhatsApp para você'}
            </h2>
            {semNumero ? (
              <p class="text-cinza">
                O número do WhatsApp ainda não foi configurado neste site. Esta é a mensagem que seria enviada:
              </p>
            ) : (
              <p class="text-cinza">
                Se a conversa não abriu, use o botão abaixo. Envie a mensagem pronta e eu respondo por lá.
              </p>
            )}
            <pre class="max-h-48 overflow-auto whitespace-pre-wrap rounded-[var(--radius-moldura)] bg-branco p-4 text-sm text-marinho-900">{concluido.mensagem}</pre>
            {!semNumero && (
              <a
                href={concluido.url}
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full bg-vinho px-7 py-3.5 font-titulo text-sm font-bold text-branco hover:bg-vinho-500"
              >
                Abrir WhatsApp
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={passo === TOTAL - 1 ? concluir : (e) => { e.preventDefault(); avancar(); }} noValidate class="flex flex-col gap-5">
            <fieldset class="flex flex-col gap-4">
              <legend class="mb-3">
                <h2 id="quiz-titulo" ref={titulo} tabIndex={-1} class="text-2xl normal-case leading-tight">
                  {titulos[passo]}
                </h2>
              </legend>
              {corpo}
              {passo !== 2 && passo !== 6 && erro(!valido(passo), 'Escolha uma opção para continuar.')}
            </fieldset>
            <div class="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => { setTentou(false); setPasso((p) => Math.max(0, p - 1)); }}
                disabled={passo === 0}
                class="cursor-pointer rounded-full px-5 py-3 font-titulo text-sm font-semibold text-marinho-900 hover:bg-prata/40 disabled:invisible"
              >
                Voltar
              </button>
              <button
                type="submit"
                class="inline-flex cursor-pointer items-center justify-center rounded-full bg-vinho px-7 py-3.5 font-titulo text-sm font-bold text-branco hover:bg-vinho-500"
              >
                {passo === TOTAL - 1 ? 'Falar no WhatsApp' : 'Continuar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
