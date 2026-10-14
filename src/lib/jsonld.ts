import { site } from '../config/site';

const preenchido = (v: string) => !site.demo && !!v;

/** JSON-LD ProfessionalService. Campos ainda não preenchidos (telefone, e-mail, redes) ficam de fora. */
export function professionalService(urlBase: string): Record<string, unknown> {
  const digitos = site.whatsapp.replace(/\D/g, '');
  const sameAs = Object.values(site.redes).filter((r) => r.startsWith('http'));
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${site.nome} · ${site.descritor}`,
    description: site.descricao,
    url: urlBase,
    image: new URL('/og.png', urlBase).href,
    areaServed: 'BR',
    serviceType: 'Consultoria em leilões de imóveis',
    availableLanguage: 'pt-BR',
    ...(!site.demo && digitos.length >= 10 ? { telephone: `+${digitos}` } : {}),
    ...(preenchido(site.email) ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
