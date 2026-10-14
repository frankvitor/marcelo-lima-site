import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://exemplo.com.br');
  const corpo = `User-agent: *
Allow: /
Disallow: /styleguide

Sitemap: ${new URL('/sitemap-index.xml', base).href}
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
