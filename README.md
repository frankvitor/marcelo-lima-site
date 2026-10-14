# Site Marcelo Lima · Assessoria em Leilões de Imóveis

Site institucional e de captação de leads. Astro 7 + TypeScript (strict) + Tailwind v4 + Preact (só nos componentes interativos). Saída 100% estática, sem servidor.

O briefing completo do projeto está em [CLAUDE.md](CLAUDE.md). O que o cliente ainda precisa enviar está em [docs/PENDENCIAS.md](docs/PENDENCIAS.md).

## Rodar localmente

Requer Node 22+ (testado com Node 24).

```bash
npm install
cp .env.example .env     # opcional, para analytics e URL do site
npm run dev              # http://localhost:4321
npm run build            # checa tipos (astro check) e gera dist/
npm run preview          # serve o dist/ para conferir
```

Páginas: `/` (home), `/politica-de-privacidade`, `/404`. A página `/styleguide` mostra o design system e não é indexada (noindex, fora do sitemap e do robots).

## Onde editar o conteúdo

**Modo demonstração:** hoje contatos, CNPJ, redes, história do Marcelo, valores do hero, cases e trechos da política de privacidade são dados FICTÍCIOS. A lista do que trocar está em [docs/PENDENCIAS.md](docs/PENDENCIAS.md). Em `src/config/site.ts`, a flag `demo` deve virar `false` quando os dados reais entrarem.

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, CNPJ, redes sociais, nome e descrição | `src/config/site.ts` |
| Textos da home (hero, jornadas, etapas, riscos, sobre, CTA, rodapé) | `src/data/home.ts` |
| Cases (cards em formato de ficha técnica) | `src/content/cases.json` |
| Perguntas frequentes | `src/content/faq.json` |
| Depoimentos (a seção some sozinha enquanto a lista estiver vazia) | `src/content/depoimentos.json` |
| Estados atendidos no mapa | `src/data/estados.ts` (`estadosAtendidos`) |
| Valores padrão do simulador (comissão, ITBI, registro etc.) | `src/config/simulador.ts` (marcados `REVISAR COM MARCELO`) |
| Opções do quiz (objetivos, faixas, pagamento) | `src/config/quiz.ts` |
| Política de privacidade | `src/pages/politica-de-privacidade.astro` |
| Fotos | `src/assets/img/` (hoje há ilustrações provisórias) |
| Logo | `src/assets/brand/` (SVG; provisório) |
| Cores e fontes | `src/styles/global.css` (bloco `@theme`) |

Regras de conteúdo (resumo): Marcelo não é advogado nem corretor; sem preços, honorários ou "gratuito"; sem promessa de resultado; números e cases só quando forem reais. Detalhes na seção 2 do `CLAUDE.md`.

### Cases e depoimentos

Os três cases atuais têm `"exemplo": true` e aparecem com o aviso "Exemplo ilustrativo". Ao trocar por casos reais, preencha os campos e mude para `"exemplo": false` (ou apague o campo).

Para adicionar um depoimento, inclua um objeto em `src/content/depoimentos.json`:

```json
{ "id": "ana", "ordem": 1, "nome": "Ana", "cidade": "Campinas/SP", "texto": "..." }
```

## Quiz, simulador e WhatsApp

- O quiz abre por qualquer elemento com o atributo `data-quiz` (e `data-jornada="consultoria-pontual"` para já marcar a jornada). O simulador abre o quiz pelo evento definido em `src/lib/quizEvents.ts`.
- Ao concluir, abre `https://wa.me/<número>?text=<mensagem>`. O número fica em `src/config/site.ts` (hoje FICTÍCIO: 5511900000000). Sem número válido, o quiz mostra a mensagem na tela em vez de abrir o WhatsApp. Use só dígitos com DDI, ex.: `5511999999999`.
- `src/lib/leads.ts` tem `enviarLead(dados)`, hoje um no-op documentado. Quando houver CRM (Supabase), é ali que o lead será gravado antes de abrir o WhatsApp.

## Analytics (desligado por padrão)

Defina no ambiente (ou no painel da hospedagem) para ativar:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_META_PIXEL_ID=123456789
```

Sem as variáveis, nenhum script de analytics é carregado. Se ativar, atualize a seção 6 da política de privacidade e avalie um aviso de cookies.

## Deploy

O site é estático: o build gera a pasta `dist/`. Em qualquer hospedagem, defina a variável `PUBLIC_SITE_URL` com o domínio final (ex.: `https://www.seudominio.com.br`). Ela alimenta canonical, sitemap, robots.txt, Open Graph e JSON-LD. Sem ela o site usa `https://exemplo.com.br`.

### Vercel

1. Importe o repositório do GitHub em vercel.com/new.
2. Framework: Astro (detectado automaticamente). Build: `npm run build`. Output: `dist`.
3. Em Settings → Environment Variables, adicione `PUBLIC_SITE_URL` (e, se quiser, os IDs de analytics).
4. Em Settings → Domains, adicione o domínio.

### Netlify

1. Importe o repositório em app.netlify.com → Add new site.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Em Site configuration → Environment variables, adicione `PUBLIC_SITE_URL`.
4. Em Domain management, adicione o domínio.

Depois do deploy: confirme `https://seudominio/robots.txt` e `/sitemap-index.xml`, e teste o link de compartilhamento (Open Graph) no WhatsApp.

## Estrutura

```
src/
  assets/brand/        logo SVG (horizontal, negativa, monograma)
  assets/img/          fotos e ilustrações
  components/          componentes Astro (seções em secoes/)
  components/islands/  Simulador.tsx e Quiz.tsx (Preact)
  config/              site.ts, simulador.ts, quiz.ts
  content/             cases, faq, depoimentos (JSON)
  data/                textos da home, estados
  layouts/             BaseLayout.astro
  lib/                 leads.ts, whatsapp.ts, formatadores.ts, jsonld.ts
  pages/               index, politica-de-privacidade, 404, styleguide, robots.txt
  styles/global.css    Tailwind + tokens
docs/                  referências visuais e pendências
public/                favicon e imagem Open Graph (og.png, 1200×630)
```

## Qualidade

Última medição (Lighthouse, build de produção local): Performance, Acessibilidade, Boas práticas e SEO em 100 no mobile e no desktop. Meça de novo após o deploy real, pois fotos reais e analytics podem alterar a performance.

Observações técnicas: `preact` está na versão 10 e `typescript` na 6 porque `@astrojs/preact` e `astro check` ainda não suportam as versões mais novas.
