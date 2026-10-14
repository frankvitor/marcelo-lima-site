// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domínio ainda não definido. Defina PUBLIC_SITE_URL no ambiente (ver .env.example).
const site = process.env.PUBLIC_SITE_URL || 'https://exemplo.com.br';

export default defineConfig({
  site,
  output: 'static',
  integrations: [preact(), sitemap({ filter: (page) => !page.includes('/styleguide') })],
  vite: { plugins: [tailwindcss()] },
});
