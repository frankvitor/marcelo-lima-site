const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatarBRL = (valor: number): string => brl.format(Number.isFinite(valor) ? valor : 0);

export const somenteDigitos = (texto: string): string => texto.replace(/\D/g, '');

/** Máscara de moeda BRL (centavos implícitos): "12345" -> "R$ 123,45". */
export function mascararMoeda(texto: string): string {
  const d = somenteDigitos(texto);
  return d ? formatarBRL(Number(d) / 100) : '';
}

export function moedaParaNumero(texto: string): number {
  const d = somenteDigitos(texto);
  return d ? Number(d) / 100 : 0;
}

/** Máscara de telefone BR: (11) 91234-5678 */
export function mascararTelefone(texto: string): string {
  const d = somenteDigitos(texto).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function telefoneValido(texto: string): boolean {
  const d = somenteDigitos(texto);
  return d.length === 10 || (d.length === 11 && d[2] === '9');
}
