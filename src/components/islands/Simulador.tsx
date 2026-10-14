import { useMemo, useState } from 'preact/hooks';
import { simuladorConfig, type TipoLeilao } from '../../config/simulador';
import { formatarBRL, mascararMoeda, moedaParaNumero } from '../../lib/formatadores';
import { abrirQuiz } from '../../lib/quizEvents';

const ficha = 'flex flex-col gap-1.5';
const rotuloCls = 'text-sm font-medium text-ardosia';
const campoCls =
  'w-full rounded-[var(--radius-moldura)] border border-linha bg-branco px-4 py-3 text-ardosia placeholder:text-cinza/70 focus:border-ardosia';

function pctParaNumero(texto: string): number {
  const n = Number(texto.replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function CampoMoeda(props: { id: string; rotulo: string; valor: string; onChange: (v: string) => void; dica?: string }) {
  return (
    <div class={ficha}>
      <label for={props.id} class={rotuloCls}>
        {props.rotulo}
      </label>
      <input
        id={props.id}
        class={campoCls}
        inputMode="numeric"
        autocomplete="off"
        placeholder="R$ 0,00"
        value={props.valor}
        onInput={(e) => props.onChange(mascararMoeda((e.target as HTMLInputElement).value))}
        aria-describedby={props.dica ? `${props.id}-dica` : undefined}
      />
      {props.dica && (
        <p id={`${props.id}-dica`} class="text-xs text-cinza">
          {props.dica}
        </p>
      )}
    </div>
  );
}

function CampoPct(props: { id: string; rotulo: string; valor: string; onChange: (v: string) => void }) {
  return (
    <div class={ficha}>
      <label for={props.id} class={rotuloCls}>
        {props.rotulo}
      </label>
      <div class="relative">
        <input
          id={props.id}
          class={`${campoCls} pr-10`}
          inputMode="decimal"
          autocomplete="off"
          value={props.valor}
          onInput={(e) => props.onChange((e.target as HTMLInputElement).value.replace(/[^\d,.]/g, '').slice(0, 5))}
        />
        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cinza" aria-hidden="true">
          %
        </span>
      </div>
    </div>
  );
}

const paraTexto = (n: number) => (n ? mascararMoeda(String(Math.round(n * 100))) : '');

export default function Simulador() {
  const cfg = simuladorConfig;
  const [avaliacao, setAvaliacao] = useState('');
  const [lance, setLance] = useState('');
  const [tipo, setTipo] = useState<TipoLeilao>(cfg.tipoPadrao);
  const [comissao, setComissao] = useState(String(cfg.comissaoLeiloeiroPct[cfg.tipoPadrao]).replace('.', ','));
  const [itbi, setItbi] = useState(String(cfg.itbiPct).replace('.', ','));
  const [registro, setRegistro] = useState(paraTexto(cfg.registroEscrituraReais));
  const [debitos, setDebitos] = useState(paraTexto(cfg.debitosReais));
  const [desocupacao, setDesocupacao] = useState(paraTexto(cfg.desocupacaoReformaReais));

  const trocarTipo = (novo: TipoLeilao) => {
    setTipo(novo);
    setComissao(String(cfg.comissaoLeiloeiroPct[novo]).replace('.', ','));
  };

  const r = useMemo(() => {
    const valorAvaliacao = moedaParaNumero(avaliacao);
    const valorLance = moedaParaNumero(lance);
    const comissaoV = (valorLance * pctParaNumero(comissao)) / 100;
    const itbiV = (valorLance * pctParaNumero(itbi)) / 100;
    const registroV = moedaParaNumero(registro);
    const debitosV = moedaParaNumero(debitos);
    const desocupacaoV = moedaParaNumero(desocupacao);
    const total = valorLance + comissaoV + itbiV + registroV + debitosV + desocupacaoV;
    const desconto = valorAvaliacao > 0 ? ((valorAvaliacao - total) / valorAvaliacao) * 100 : 0;
    return {
      valorAvaliacao,
      valorLance,
      pronto: valorAvaliacao > 0 && valorLance > 0,
      itens: [
        { rotulo: 'Lance', valor: valorLance },
        { rotulo: `Comissão do leiloeiro (${comissao || 0}%)`, valor: comissaoV },
        { rotulo: `ITBI (${itbi || 0}%)`, valor: itbiV },
        { rotulo: 'Registro e escritura', valor: registroV },
        { rotulo: 'Débitos (IPTU, condomínio)', valor: debitosV },
        { rotulo: 'Desocupação e reforma', valor: desocupacaoV },
      ],
      total,
      desconto,
    };
  }, [avaliacao, lance, comissao, itbi, registro, debitos, desocupacao]);

  const descontoTexto = `${r.desconto.toFixed(1).replace('.', ',')}%`;
  const acima = r.pronto && r.desconto < 0;

  const pedirAnalise = () => {
    const contexto = `Simulação no site — Avaliação/mercado: ${formatarBRL(r.valorAvaliacao)}; lance: ${formatarBRL(
      r.valorLance,
    )}; custo total estimado: ${formatarBRL(r.total)}; desconto real estimado: ${descontoTexto}.`;
    abrirQuiz({ jornada: 'consultoria-pontual', contexto });
  };

  return (
    <div class="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form class="rounded-card bg-branco p-6 shadow-card sm:p-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <div class="grid gap-5 sm:grid-cols-2">
          <CampoMoeda id="sim-avaliacao" rotulo="Valor de avaliação / mercado" valor={avaliacao} onChange={setAvaliacao} />
          <CampoMoeda id="sim-lance" rotulo="Valor do lance" valor={lance} onChange={setLance} />

          <fieldset class="sm:col-span-2">
            <legend class={`${rotuloCls} mb-1.5`}>Tipo de leilão</legend>
            <div class="grid grid-cols-2 gap-3">
              {(['judicial', 'extrajudicial'] as const).map((t) => (
                <label
                  class={`cursor-pointer rounded-[var(--radius-moldura)] border px-4 py-3 text-center font-titulo text-sm font-semibold capitalize has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-ardosia ${
                    tipo === t ? 'border-ardosia bg-ardosia text-branco' : 'border-linha bg-branco text-ardosia'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo-leilao"
                    class="sr-only"
                    checked={tipo === t}
                    onChange={() => trocarTipo(t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <CampoPct id="sim-comissao" rotulo="Comissão do leiloeiro" valor={comissao} onChange={setComissao} />
          <CampoPct id="sim-itbi" rotulo="ITBI" valor={itbi} onChange={setItbi} />
          <CampoMoeda id="sim-registro" rotulo="Registro e escritura (estimado)" valor={registro} onChange={setRegistro} />
          <CampoMoeda id="sim-debitos" rotulo="Débitos conhecidos (IPTU, condomínio)" valor={debitos} onChange={setDebitos} />
          <div class="sm:col-span-2">
            <CampoMoeda
              id="sim-desocupacao"
              rotulo="Desocupação e reforma (estimado)"
              valor={desocupacao}
              onChange={setDesocupacao}
            />
          </div>
        </div>
      </form>

      <div class="flex flex-col gap-4 rounded-card bg-ardosia p-6 text-branco shadow-card sm:p-8" aria-live="polite">
        {r.pronto ? (
          <>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="font-titulo text-sm font-semibold uppercase tracking-widest text-prata">Desconto real</p>
              <span class="inline-flex rounded-full bg-laranja px-4 py-1.5 font-titulo text-lg font-bold text-preto">
                {descontoTexto}
              </span>
            </div>
            {acima && (
              <p class="rounded-[var(--radius-moldura)] bg-white/10 p-3 text-sm text-prata">
                Neste cenário o custo total fica acima do valor de mercado informado.
              </p>
            )}
            <div class="border-y border-white/15 py-4">
              <p class="text-sm text-prata">Custo total da aquisição</p>
              <p class="font-titulo text-3xl font-bold text-ambar sm:text-4xl">{formatarBRL(r.total)}</p>
            </div>
            <dl class="flex flex-col gap-2 text-sm">
              {r.itens.map((i) => (
                <div class="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
                  <dt class="text-prata">{i.rotulo}</dt>
                  <dd class="font-medium">{formatarBRL(i.valor)}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={pedirAnalise}
              class="mt-2 inline-flex cursor-pointer items-center justify-center rounded-full bg-laranja px-7 py-3.5 font-titulo text-sm font-bold text-preto transition-colors hover:bg-ambar"
            >
              Quero uma análise real deste imóvel
            </button>
          </>
        ) : (
          <div class="my-auto text-center text-prata">
            <p class="font-titulo text-lg font-semibold text-branco">Preencha avaliação e lance</p>
            <p class="mt-1 text-sm">
              Informe o valor de avaliação e o valor do lance para ver o custo total e o desconto real.
            </p>
          </div>
        )}
        <p class="mt-auto text-xs text-prata">{cfg.aviso}</p>
      </div>
    </div>
  );
}
