// Mapa esquemático do Brasil em blocos (1 bloco por UF). `col`/`lin` = posição na grade.
export interface Estado {
  uf: string;
  nome: string;
  col: number;
  lin: number;
}

export const estados: Estado[] = [
  { uf: 'RR', nome: 'Roraima', col: 1, lin: 0 },
  { uf: 'AP', nome: 'Amapá', col: 2, lin: 0 },
  { uf: 'AM', nome: 'Amazonas', col: 1, lin: 1 },
  { uf: 'PA', nome: 'Pará', col: 2, lin: 1 },
  { uf: 'MA', nome: 'Maranhão', col: 3, lin: 1 },
  { uf: 'PI', nome: 'Piauí', col: 4, lin: 1 },
  { uf: 'CE', nome: 'Ceará', col: 5, lin: 1 },
  { uf: 'RN', nome: 'Rio Grande do Norte', col: 6, lin: 1 },
  { uf: 'AC', nome: 'Acre', col: 0, lin: 2 },
  { uf: 'RO', nome: 'Rondônia', col: 1, lin: 2 },
  { uf: 'MT', nome: 'Mato Grosso', col: 2, lin: 2 },
  { uf: 'TO', nome: 'Tocantins', col: 3, lin: 2 },
  { uf: 'BA', nome: 'Bahia', col: 4, lin: 2 },
  { uf: 'PE', nome: 'Pernambuco', col: 5, lin: 2 },
  { uf: 'PB', nome: 'Paraíba', col: 6, lin: 2 },
  { uf: 'MS', nome: 'Mato Grosso do Sul', col: 2, lin: 3 },
  { uf: 'GO', nome: 'Goiás', col: 3, lin: 3 },
  { uf: 'DF', nome: 'Distrito Federal', col: 4, lin: 3 },
  { uf: 'SE', nome: 'Sergipe', col: 5, lin: 3 },
  { uf: 'AL', nome: 'Alagoas', col: 6, lin: 3 },
  { uf: 'MG', nome: 'Minas Gerais', col: 4, lin: 4 },
  { uf: 'ES', nome: 'Espírito Santo', col: 5, lin: 4 },
  { uf: 'PR', nome: 'Paraná', col: 2, lin: 5 },
  { uf: 'SP', nome: 'São Paulo', col: 3, lin: 5 },
  { uf: 'RJ', nome: 'Rio de Janeiro', col: 4, lin: 5 },
  { uf: 'SC', nome: 'Santa Catarina', col: 2, lin: 6 },
  { uf: 'RS', nome: 'Rio Grande do Sul', col: 2, lin: 7 },
];

/** UFs destacadas no mapa. Hoje: todas (atendimento nacional). Remova siglas para restringir. */
export const estadosAtendidos: string[] = estados.map((e) => e.uf);

export const ufs = estados.map((e) => e.uf).sort();
