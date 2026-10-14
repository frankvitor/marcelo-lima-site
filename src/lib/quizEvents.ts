export interface AbrirQuizDetalhe {
  /** id da jornada a pré-selecionar (ex.: 'consultoria-pontual'). */
  jornada?: string;
  /** Texto extra anexado à mensagem do WhatsApp (ex.: resumo da simulação). */
  contexto?: string;
}

export const EVENTO_ABRIR_QUIZ = 'abrir-quiz';

export function abrirQuiz(detalhe: AbrirQuizDetalhe = {}): void {
  window.dispatchEvent(new CustomEvent<AbrirQuizDetalhe>(EVENTO_ABRIR_QUIZ, { detail: detalhe }));
}
