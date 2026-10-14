export interface DadosLead {
  jornada: string;
  objetivo: string;
  uf: string;
  cidade: string;
  faixaInvestimento: string;
  pagamento: string;
  jaParticipou: string;
  nome: string;
  whatsapp: string;
  /** Resumo da simulação, quando o lead vem do simulador. */
  contextoSimulacao?: string;
}

/**
 * Envia o lead para o CRM.
 *
 * HOJE É UM NO-OP: nada é enviado nem armazenado; o contato acontece só pelo WhatsApp.
 * No futuro, esta função enviará o lead ao CRM (Supabase) ANTES de o quiz abrir o WhatsApp.
 * O quiz já faz `await enviarLead(dados)` e não deve falhar o fluxo se o envio falhar.
 */
export async function enviarLead(_dados: DadosLead): Promise<void> {
  // TODO: integrar com Supabase (insert na tabela de leads).
}
