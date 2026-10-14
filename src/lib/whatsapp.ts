import { site } from '../config/site';

/** Número só com dígitos (DDI+DDD+número) ou null se não estiver configurado. */
export function numeroWhatsapp(): string | null {
  const digitos = site.whatsapp.replace(/\D/g, '');
  return digitos.length >= 10 ? digitos : null;
}

/** Link wa.me com mensagem opcional. Sem número configurado, aponta para a âncora de contato. */
export function linkWhatsapp(mensagem?: string): string {
  const numero = numeroWhatsapp();
  if (!numero) return '#contato';
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : '';
  return `https://wa.me/${numero}${texto}`;
}
