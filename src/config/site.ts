// Dados centrais do site.
// ATENÇÃO: contatos, CNPJ e redes abaixo são FICTÍCIOS (demonstração). Substitua pelos dados reais
// do cliente e depois defina `demo: false` para que telefone/e-mail entrem nos dados estruturados (JSON-LD).
export const site = {
  /** true = dados fictícios de demonstração. */
  demo: true,
  nome: 'Marcelo Lima',
  descritor: 'Assessoria em Leilões de Imóveis',
  descricao:
    'Consultoria em leilões de imóveis em todo o Brasil, 100% online: do edital à entrega das chaves.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://exemplo.com.br', // domínio ainda não definido
  whatsapp: '5511900000000', // FICTÍCIO. Somente dígitos com DDI+DDD, ex.: 5511999999999
  whatsappExibicao: '(11) 90000-0000', // FICTÍCIO
  email: 'contato@marcelolima.example', // FICTÍCIO
  cnpj: '00.000.000/0001-00', // FICTÍCIO
  redes: {
    instagram: '@marcelolima.leiloes', // FICTÍCIO (use a URL completa https://… quando for real)
    linkedin: 'Marcelo Lima · Leilões de Imóveis', // FICTÍCIO
    youtube: '@marcelolimaleiloes', // FICTÍCIO
  },
  analytics: {
    ga4: import.meta.env.PUBLIC_GA4_ID || '',
    metaPixel: import.meta.env.PUBLIC_META_PIXEL_ID || '',
  },
} as const;
