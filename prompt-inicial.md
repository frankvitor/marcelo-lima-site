Vamos criar do zero o site do Marcelo Lima, consultor em leilões de imóveis.

Antes de tudo:
1. Leia o arquivo `CLAUDE.md` na raiz — ele é o briefing completo do projeto (posicionamento, regras de conteúdo, identidade visual, estrutura, stack). Siga-o à risca.
2. Analise as imagens em `docs/referencias/`. Descreva em poucas linhas o que você entendeu da linguagem visual e como vai traduzi-la para o site (sem copiar a marca de referência).

Depois, trabalhe nestas etapas, fazendo um commit ao final de cada uma:

**Etapa 1 — Setup**
Projeto Astro (versão estável mais recente) com TypeScript strict, Tailwind v4, Preact, sitemap, Fontsource (Sora + DM Sans), estrutura de pastas do CLAUDE.md, `git init`, `.gitignore`, `.env.example` e README inicial.

**Etapa 2 — Identidade e design system**
Tokens no `@theme`, logo provisório em SVG (horizontal, monograma, negativa) e uma página `/styleguide` (noindex) mostrando: paleta, tipografia, botões, pílulas, cards, moldura de título, ficha técnica, foto em duotone e arco divisor.
⏸️ **PARE aqui e me mostre o resultado** (rode o servidor e descreva/tire print). Só siga após minha aprovação do visual.

**Etapa 3 — Home**
Todas as seções na ordem do CLAUDE.md, responsivas (mobile first), com conteúdo vindo de `src/config` / `src/content` / `src/data` e placeholders `[PREENCHER]` onde faltar informação.

**Etapa 4 — Interativos**
Simulador de custo do arremate e quiz de qualificação → WhatsApp, conforme a seção 5 do CLAUDE.md.

**Etapa 5 — Páginas de apoio, SEO e qualidade**
Política de privacidade, 404, metas, OG, JSON-LD, robots. Rode o build, revise acessibilidade e performance (meta Lighthouse ≥ 95 mobile) e corrija o que for preciso.

**Etapa 6 — Fechamento**
README completo (rodar, editar conteúdo, deploy na Vercel/Netlify) e `docs/PENDENCIAS.md` com tudo que o cliente precisa enviar.

Regras: não invente números, depoimentos ou preços; não crie repositório remoto nem faça push; se algo do briefing estiver ambíguo, pergunte antes de decidir.

Comece pela leitura do CLAUDE.md e das referências, me dê seu resumo e o plano da Etapa 1.
