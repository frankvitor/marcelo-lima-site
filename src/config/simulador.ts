// Valores padrão do simulador de custo do arremate.
// REVISAR COM MARCELO — todos os números abaixo são apenas pontos de partida, NÃO valores oficiais.
// Nada disso fica hardcoded no componente: ajuste aqui.

export type TipoLeilao = 'judicial' | 'extrajudicial';

export const simuladorConfig = {
  /** Comissão do leiloeiro (% sobre o lance) por tipo de leilão. REVISAR COM MARCELO */
  comissaoLeiloeiroPct: { judicial: 5, extrajudicial: 5 } satisfies Record<TipoLeilao, number>,
  /** ITBI (% sobre o lance). Varia por município. REVISAR COM MARCELO */
  itbiPct: 3,
  /** Registro e escritura (R$ estimado). REVISAR COM MARCELO */
  registroEscrituraReais: 0,
  /** Débitos conhecidos de IPTU/condomínio (R$). */
  debitosReais: 0,
  /** Desocupação/reforma estimada (R$). REVISAR COM MARCELO */
  desocupacaoReformaReais: 0,
  /** Tipo de leilão selecionado inicialmente. */
  tipoPadrao: 'judicial' as TipoLeilao,
  aviso: 'Estimativa para referência. Os custos reais variam por cidade, tipo de leilão e edital.',
};
