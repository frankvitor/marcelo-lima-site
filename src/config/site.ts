// Dados centrais do site. Tudo que está como [PREENCHER] precisa ser enviado pelo cliente.
export const site = {
  nome: 'Marcelo Lima',
  descritor: 'Assessoria em Leilões de Imóveis',
  descricao:
    'Consultoria em leilões de imóveis em todo o Brasil, 100% online: do edital à entrega das chaves.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://exemplo.com.br', // [PREENCHER] domínio
  whatsapp: '[PREENCHER]', // somente dígitos com DDI, ex.: 5511999999999
  email: '[PREENCHER]',
  cnpj: '[PREENCHER]',
  redes: {
    instagram: '[PREENCHER]',
    linkedin: '[PREENCHER]',
    youtube: '[PREENCHER]',
  },
  analytics: {
    ga4: import.meta.env.PUBLIC_GA4_ID || '',
    metaPixel: import.meta.env.PUBLIC_META_PIXEL_ID || '',
  },
} as const;
