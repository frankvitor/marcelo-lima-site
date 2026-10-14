// Textos da home. Edite aqui — os componentes só renderizam.
// Regras (CLAUDE.md §2): sem preços/honorários, sem promessa de resultado, sem "advogado/corretor próprio".

export type IconeNome =
  | 'casa' | 'relogio' | 'dinheiro' | 'pin' | 'chave' | 'percentual' | 'seta' | 'alerta'
  | 'documento' | 'escudo' | 'usuarios' | 'mensagem' | 'menu' | 'fechar' | 'busca' | 'martelo'
  | 'check' | 'mais';

export type JornadaId = 'assessoria-completa' | 'consultoria-pontual' | 'pos-arrematacao';

export const nav = [
  { rotulo: 'Como funciona', href: '#como-funciona' },
  { rotulo: 'Serviços', href: '#servicos' },
  { rotulo: 'Simulador', href: '#simulador' },
  { rotulo: 'Sobre', href: '#sobre' },
  { rotulo: 'Dúvidas', href: '#duvidas' },
];

export const hero = {
  titulo: 'Compre imóveis de leilão com segurança, do edital à entrega das chaves',
  subtitulo:
    'Eu conduzo o processo e coordeno advogados parceiros para você decidir com informação e reduzir riscos. Segurança primeiro, economia depois.',
  selo: 'Atendemos todo o Brasil · 100% online',
  ctaPrincipal: 'Quero começar',
  ctaSecundario: 'Falar no WhatsApp',
  fotoAlt: 'Prédios residenciais em meio a árvores, vistos do alto em uma grande cidade brasileira',
  /** Card flutuante do hero (desktop). Valores reais só quando o cliente enviar. */
  exemplo: {
    titulo: 'Exemplo de arremate',
    aviso: 'Exemplo ilustrativo',
    pilula: 'Desconto real: 29,8%',
    itens: [
      { icone: 'casa' as IconeNome, valor: 'R$ 420.000', rotulo: 'Avaliação' },
      { icone: 'dinheiro' as IconeNome, valor: 'R$ 252.000', rotulo: 'Arrematado' },
      { icone: 'percentual' as IconeNome, valor: 'R$ 294.660', rotulo: 'Custo total' },
    ],
  },
};

export const jornadasSecao = {
  eyebrow: 'Como posso ajudar',
  titulo: 'Atuo em *todas as frentes*',
  intro: 'Escolha o ponto em que você está. Eu adapto o acompanhamento ao seu momento.',
};

export const jornadas: {
  id: JornadaId;
  /** Rótulo de intenção (chamada curta do card). */
  rotulo: string;
  titulo: string;
  servico: string;
  texto: string;
  bullets: string[];
  icone: IconeNome;
  cta: string;
  destaque?: boolean;
}[] = [
  {
    id: 'assessoria-completa',
    rotulo: 'Eu cuido de tudo por você',
    titulo: 'Quero arrematar um imóvel',
    servico: 'Assessoria completa',
    texto:
      'Acompanho você de ponta a ponta, do perfil à entrega das chaves.',
    bullets: [
      'Busca e filtro de oportunidades',
      'Análise de edital e matrícula, com advogados parceiros',
      'Lance, pós-arrematação e entrega das chaves',
    ],
    icone: 'busca',
    cta: 'Começar por aqui',
    destaque: true,
  },
  {
    id: 'consultoria-pontual',
    rotulo: 'Você já escolheu, eu analiso',
    titulo: 'Já encontrei um imóvel',
    servico: 'Consultoria pontual',
    texto: 'Antes de dar o lance, você sabe o que está comprando.',
    bullets: [
      'Riscos do edital e da matrícula',
      'Débitos e situação de ocupação',
      'Custo total real e lance máximo recomendado',
    ],
    icone: 'documento',
    cta: 'Analisar meu imóvel',
  },
  {
    id: 'pos-arrematacao',
    rotulo: 'Já arrematou? Eu resolvo o pós',
    titulo: 'Já arrematei e preciso de ajuda',
    servico: 'Pós-arrematação',
    texto: 'Arrematou sozinho e travou? Eu ajudo você a chegar às chaves.',
    bullets: [
      'Regularização e registro do imóvel',
      'Débitos do imóvel',
      'Desocupação e entrega das chaves',
    ],
    icone: 'chave',
    cta: 'Pedir ajuda',
  },
];

export const comoFunciona = {
  titulo: 'Como funciona',
  intro: 'Cinco etapas, com você informado em cada uma.',
  etapas: [
    { titulo: 'Entendimento do perfil', texto: 'Conversamos sobre seu objetivo, orçamento e tolerância a risco. Morar ou investir muda toda a estratégia.' },
    { titulo: 'Busca e análise', texto: 'Filtro oportunidades e analiso edital, matrícula e viabilidade, com advogados parceiros na parte jurídica.' },
    { titulo: 'Estratégia e lance', texto: 'Definimos o lance máximo com base no custo total real e acompanho o leilão com você.' },
    { titulo: 'Pós-arrematação e registro', texto: 'Cuido do caminho depois do lance: carta de arrematação, ITBI e registro do imóvel.' },
    { titulo: 'Desocupação e entrega das chaves', texto: 'Quando há ocupação, coordeno a desocupação e a imissão na posse até a entrega das chaves.' },
  ],
};

export const riscos = {
  titulo: 'Riscos que eu evito por você',
  intro: 'Leilão pode ter bons descontos em relação ao valor de mercado, mas só vale a pena quando os riscos são conhecidos antes do lance.',
  itens: [
    { icone: 'dinheiro' as IconeNome, titulo: 'Dívidas de IPTU e condomínio', texto: 'Verifico débitos e o que passa (ou não) para o arrematante, conforme o edital.' },
    { icone: 'usuarios' as IconeNome, titulo: 'Imóvel ocupado', texto: 'Avalio a situação de ocupação e o impacto no prazo e no custo antes de você dar o lance.' },
    { icone: 'documento' as IconeNome, titulo: 'Ônus e penhoras na matrícula', texto: 'Leio a matrícula com atenção a gravames, penhoras e outros pontos que mudam a decisão.' },
    { icone: 'alerta' as IconeNome, titulo: 'Edital com armadilhas', texto: 'Traduzo o edital para linguagem simples e destaco as cláusulas que merecem cuidado.' },
    { icone: 'escudo' as IconeNome, titulo: 'Sites de leilão falsos', texto: 'Ajudo a confirmar se o leilão e o leiloeiro são legítimos antes de qualquer pagamento.' },
    { icone: 'percentual' as IconeNome, titulo: 'Custo total acima do previsto', texto: 'Somo comissão, impostos, registro, débitos, desocupação e reforma para você ver o custo real.' },
  ],
};

export const simulador = {
  titulo: 'Simulador de custo real do arremate',
  intro: 'O valor do lance é só uma parte da conta. Simule o custo total e o desconto real em relação ao valor de mercado.',
};

export const cases = {
  titulo: 'Cases',
  intro: 'Exemplos de como a análise fica organizada.',
  avisoExemplo: 'Exemplo ilustrativo',
};

export const atendimento = {
  titulo: 'Atendimento em todo o Brasil',
  texto:
    'Meu atendimento é 100% online: a análise é feita sobre os documentos do imóvel e do leilão, e as reuniões acontecem por vídeo ou WhatsApp. Não importa em qual estado está o imóvel.',
  pontos: ['Atendimento por vídeo e WhatsApp', 'Análise sobre edital e matrícula', 'Advogados parceiros conforme o caso'],
};

export const sobre = {
  titulo: 'Sobre o Marcelo',
  fotoAlt: 'Marcelo Lima sorrindo, de casaco preto e cachecol, em uma rua movimentada à noite',
  paragrafos: [
    'Sou o Marcelo Lima, consultor em leilões de imóveis. Ajudo pessoas e investidores a comprar imóveis em leilão com mais segurança.',
    'Eu conduzo o processo do início ao fim e coordeno advogados parceiros e outros especialistas na análise jurídica. Assim, você tem um interlocutor só, em linguagem simples.',
    'Comecei neste mercado ao acompanhar de perto a compra de um imóvel de leilão na família e percebi como a falta de informação clara custa caro. Desde então me dedico a estudar editais e matrículas e a trabalhar com uma rede de advogados parceiros, para que cada cliente decida com segurança.',
  ],
  destaques: [
    { valor: '5+', rotulo: 'Anos de experiência' },
    { valor: '100+', rotulo: 'Arrematações acompanhadas' },
  ],
};

export const depoimentos = { titulo: 'O que dizem os clientes' };

export const faq = { titulo: 'Dúvidas frequentes' };

export const ctaFinal = {
  titulo: 'Vamos encontrar seu imóvel?',
  texto: 'Responda algumas perguntas rápidas e fale direto comigo no WhatsApp.',
  cta: 'Quero começar',
};

export const rodape = {
  aviso: 'Marcelo Lima atua como consultor. Análises jurídicas são realizadas por advogados parceiros.',
};
