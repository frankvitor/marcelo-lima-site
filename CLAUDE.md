# CLAUDE.md — Site Marcelo Lima · Assessoria em Leilões de Imóveis

Este arquivo é o briefing permanente do projeto. Leia-o inteiro antes de qualquer tarefa e siga-o em todas as sessões. Se algo aqui conflitar com um pedido pontual, pergunte antes de agir.

---

## 1. O projeto

Site institucional + captação de leads para **Marcelo Lima**, consultor especializado em **leilões de imóveis**, com atendimento **em todo o Brasil, 100% online**.

Projeto do zero. Idioma do site: **português do Brasil**.

### Serviços (3 jornadas)
1. **Assessoria completa** — acompanha o cliente de ponta a ponta: entende o perfil, busca e filtra oportunidades, análise do edital e da matrícula (com advogados parceiros), estudo de viabilidade (lance máximo, custo total, margem), acompanhamento no dia do leilão, pós-arrematação (carta de arrematação, ITBI, registro), desocupação/imissão na posse e entrega das chaves.
2. **Consultoria pontual** — o cliente já encontrou um imóvel e quer uma análise antes de dar o lance: riscos do edital e da matrícula, débitos, ocupação, custo total real e lance máximo recomendado.
3. **Pós-arrematação** — para quem arrematou sozinho e travou: regularização, registro, débitos e desocupação.

### Público
- Pessoa física que quer comprar imóvel para **morar** com desconto, com medo de cair numa armadilha.
- **Investidor** que quer margem (revenda ou aluguel) e precisa de alguém que conduza o processo.
- Quem **já arrematou** e precisa resolver o pós.

A dor central é **medo de risco** (dívidas, imóvel ocupado, ônus na matrícula, edital confuso, site de leilão falso). A promessa é **segurança primeiro, economia depois**.

---

## 2. Regras de conteúdo (obrigatórias)

- **Marcelo NÃO é advogado nem corretor.** Nunca escreva "assessoria jurídica própria", "nosso escritório de advocacia", "CRECI" ou "OAB". O correto é: *"análise jurídica feita por advogados parceiros"*, *"Marcelo conduz todo o processo e coordena os especialistas"*.
- **Não mencionar preços, honorários, percentuais de cobrança ou "gratuito".** Nenhuma seção de planos/preços. Se precisar, use "Fale com o Marcelo para entender como funciona".
- **Não prometer resultado**: nada de "lucro garantido", "100% seguro", "até 50% de desconto garantido". Use linguagem como "imóveis com desconto em relação ao valor de mercado", "reduzir riscos", "decidir com informação".
- **Números e cases são placeholders.** Todo dado não fornecido (anos de experiência, nº de arrematações, depoimentos, cases, fotos, WhatsApp, e-mail, CNPJ) deve ficar centralizado em arquivos de dados e marcado com `[PREENCHER]` — nunca invente números como se fossem reais.
- Atendimento: **"Atendemos todo o Brasil, 100% online"** é um argumento central — deixe isso visível no hero e repetido em pontos-chave.
- Tom de voz: direto, seguro, humano, sem juridiquês. Frases curtas. Fala com "você". Marcelo em primeira pessoa nas seções "Sobre" e CTAs pessoais ("Fale comigo").

---

## 3. Identidade visual

Ainda não existe marca. Vamos criar uma **identidade provisória** coerente, que o cliente vai aprovar.

### Referências
Estão em `docs/referencias/` (imagens do Behance — projeto de social media de uma imobiliária). **Use como inspiração de linguagem visual, nunca copie logo, layout literal ou textos.** O que extrair delas:

1. **Cor única forte**: vermelho-vinho/carmim dominante + branco. Paleta quase monocromática, de alto impacto.
2. **Fotos de arquitetura em duotone** (filtro na cor da marca, efeito multiply) como fundo de seções.
3. **Cards brancos com cantos bem arredondados e sombra suave**, "flutuando" sobre fundo vinho.
4. **Pílulas/tags** sólidas na cor da marca com texto branco para destacar números (ex.: "Desconto real: 38%").
5. **"Ficha técnica"**: blocos de ícones de linha + número + rótulo curto, com divisores finos — usar nos cases e no resultado do simulador.
6. **Títulos em caixa-alta, peso extra-bold, entrelinha justa.**
7. **Molduras de linha fina** (retângulos com cantos arredondados só no contorno) para enquadrar títulos de seção.
8. **Arco/semicírculo branco** como divisor de seções e as **chaves** como símbolo da "entrega das chaves".

Evitar: fotos de banco de imagem com casais sorrindo, gradientes genéricos, visual "template de IA" (shadcn padrão, roxo-azul, cards todos iguais).

### Tokens de design (ponto de partida — ajustar se necessário para contraste AA)
| Token | Valor | Uso |
|---|---|---|
| `--vinho-900` | `#5E0A22` | fundos profundos, rodapé |
| `--vinho-700` | `#A3123A` | cor primária, botões, pílulas, títulos de destaque |
| `--vinho-500` | `#C8264F` | hover, detalhes |
| `--vinho-50` | `#FBEFF2` | fundos tintados, cards de apoio |
| `--grafite` | `#1C1C22` | texto principal |
| `--cinza` | `#6B6B75` | texto secundário |
| `--linha` | `#E8E2E0` | bordas e divisores |
| `--off-white` | `#FAF7F5` | fundo base |
| `--branco` | `#FFFFFF` | cards |

- **Tipografia**: títulos em **Sora** (700–800, caixa-alta nos H1/H2), texto em **DM Sans** (400–500). Self-hosted via Fontsource.
- **Raios**: cards 24px, botões e pílulas totalmente arredondados (999px), molduras 16px.
- **Ícones**: linha, traço 1.5–2px, na cor vinho (Lucide ou Tabler, via ícones SVG inline).
- **Logo provisório**: monograma **"ML"** branco dentro de um círculo vinho + wordmark **"Marcelo Lima"** (Sora 800) + linha de apoio **"Assessoria em Leilões de Imóveis"** (DM Sans). Criar em SVG (`src/assets/brand/`), versões horizontal, só monograma e negativa (branca).

---

## 4. Estrutura do site

One-page principal + páginas de apoio.

### Home (`/`), na ordem
1. **Header fixo** — logo, âncoras (Como funciona, Serviços, Simulador, Sobre, Dúvidas), botão "Falar no WhatsApp".
2. **Hero** — headline forte em caixa-alta (ex.: "COMPRE IMÓVEIS DE LEILÃO COM SEGURANÇA, DO EDITAL À ENTREGA DAS CHAVES"), subtítulo, CTA principal (abre o quiz) + CTA secundário (WhatsApp), selo "Atendemos todo o Brasil · 100% online". Foto de arquitetura em duotone ou imagem das chaves.
3. **Seletor de jornada** — 3 cards: "Quero arrematar um imóvel" (assessoria completa) · "Já encontrei um imóvel" (consultoria pontual) · "Já arrematei e preciso de ajuda" (pós-arrematação). Cada um com CTA que abre o quiz já com a jornada marcada.
4. **Como funciona** — 5 etapas numeradas: Entendimento do perfil → Busca e análise (edital, matrícula, viabilidade) → Estratégia e lance → Pós-arrematação e registro → Desocupação e entrega das chaves.
5. **Riscos que eu evito por você** — fundo vinho, cards brancos: dívidas de IPTU/condomínio, imóvel ocupado, ônus e penhoras na matrícula, edital com armadilhas, sites de leilão falsos, custo total acima do previsto.
6. **Simulador de custo real do arremate** (ver seção 5).
7. **Cases** — cards no estilo "ficha técnica": tipo de imóvel + cidade/UF, valor de avaliação, valor arrematado, custo total, desconto real (pílula), prazo até as chaves. Dados vindos de content collection, todos `[PREENCHER]`, com 3 exemplos fictícios marcados como `exemplo: true` (renderizar com um aviso "exemplo ilustrativo" enquanto não houver casos reais).
8. **Atendimento em todo o Brasil** — mapa do Brasil em SVG com estados destacados (lista configurável) + texto sobre o atendimento remoto.
9. **Sobre o Marcelo** — foto (placeholder), história em primeira pessoa, como trabalha com advogados parceiros e especialistas.
10. **Depoimentos** — estrutura pronta, escondida automaticamente se a lista estiver vazia.
11. **FAQ** — acordeão acessível (`<details>`). Perguntas: posso visitar o imóvel? E se estiver ocupado? Dá para financiar ou parcelar? Quanto tempo leva? Qual a diferença entre leilão judicial e extrajudicial? Atende minha cidade? Preciso estar presente no leilão? O que acontece se eu não arrematar?
12. **CTA final** — fundo vinho com arco branco, "Vamos encontrar seu imóvel?" + botão do quiz.
13. **Footer** — logo negativa, contatos, redes, links legais, aviso: "Marcelo Lima atua como consultor. Análises jurídicas são realizadas por advogados parceiros."
14. **Botão flutuante de WhatsApp** (mobile e desktop).

### Outras páginas
- `/politica-de-privacidade` (LGPD, texto base com `[PREENCHER]`)
- `/404` personalizada
- Estrutura preparada (sem conteúdo ainda) para um futuro `/blog` via content collections.

---

## 5. Componentes interativos

### Simulador de custo do arremate
Entradas: valor de avaliação/mercado · valor do lance · tipo de leilão (judicial / extrajudicial) · comissão do leiloeiro (%) · ITBI (%) · registro e escritura (R$ estimado) · débitos conhecidos (IPTU, condomínio) · custo estimado de desocupação/reforma.

Saídas em formato "ficha técnica": **custo total da aquisição**, **desconto real vs. valor de mercado** (pílula vinho), detalhamento item a item.

- Todos os percentuais e valores padrão ficam em **um arquivo de configuração** (`src/config/simulador.ts`) com comentário `// REVISAR COM MARCELO` — nunca hardcoded no componente.
- Máscara de moeda BRL, validação, funciona sem recarregar.
- Aviso fixo: "Estimativa para referência. Os custos reais variam por cidade, tipo de leilão e edital."
- Ao final: CTA "Quero uma análise real deste imóvel" → abre o quiz com jornada "consultoria pontual" e os valores no texto do WhatsApp.

### Quiz de qualificação → WhatsApp
Modal/drawer multi-step com barra de progresso:
1. Jornada (as 3 opções)
2. Objetivo: morar · investir para revenda · investir para aluguel
3. Estado (UF) e cidade de interesse
4. Faixa de investimento disponível
5. Forma de pagamento: à vista · financiado · ainda não sei
6. Já participou de leilão? sim · não
7. Nome + WhatsApp (máscara BR, validação)

Ao concluir: abre `https://wa.me/<NUMERO>?text=<mensagem>` com mensagem pré-formatada resumindo as respostas. Número em `src/config/site.ts` (`[PREENCHER]`).
Deixar uma função `enviarLead(dados)` isolada em `src/lib/leads.ts`, hoje só um no-op documentado — no futuro ela enviará o lead para o CRM (Supabase) antes de abrir o WhatsApp.

---

## 6. Stack e convenções técnicas

- **Astro** (versão estável mais recente) + **TypeScript strict**
- **Tailwind CSS v4** (via `@tailwindcss/vite`), tokens da seção 3 definidos em `@theme`
- Ilhas interativas (simulador e quiz) com **Preact** (`@astrojs/preact`) e `client:visible`/`client:idle`; o resto é HTML estático, zero JS
- Fontes via **Fontsource** (self-hosted)
- Imagens com `astro:assets` (`<Image />`), WebP/AVIF, `alt` sempre preenchido
- Conteúdo editável (cases, FAQ, depoimentos, estados atendidos) em **content collections** ou arquivos em `src/data/` — nada de texto de conteúdo espalhado em componentes
- **SEO**: `<title>`/meta description por página, Open Graph + imagem OG, canonical, `@astrojs/sitemap`, `robots.txt`, JSON-LD `ProfessionalService` com `areaServed: "BR"`
- **Analytics**: espaço para GA4 e Meta Pixel ativados só por variáveis de ambiente (`.env.example`), desligados por padrão
- **Acessibilidade**: contraste AA, foco visível, navegação por teclado no quiz e no FAQ, `prefers-reduced-motion` respeitado
- **Performance**: meta Lighthouse ≥ 95 em todas as categorias no mobile
- Saída **estática** (sem adapter), pronta para deploy na **Vercel** ou **Netlify**
- Animações sutis (fade/slide on scroll com CSS ou IntersectionObserver), nada pesado

### Estrutura sugerida
```
src/
  assets/brand/        # logo SVG
  assets/img/          # fotos
  components/          # seções e UI (.astro)
  components/islands/  # Simulador.tsx, Quiz.tsx (Preact)
  config/              # site.ts, simulador.ts
  content/             # cases, faq, depoimentos
  data/                # estados atendidos etc.
  layouts/             # BaseLayout.astro
  lib/                 # leads.ts, formatadores
  pages/               # index, politica-de-privacidade, 404
  styles/global.css    # Tailwind + tokens
docs/referencias/      # imagens de referência (não publicar)
```

### Git
- Repositório local com `git init`, `.gitignore` adequado, commits pequenos e descritivos em português por etapa concluída.
- **Não** criar repositório remoto nem fazer push — o dono do projeto vai conectar ao GitHub depois.
- Manter um `README.md` com: como rodar, como editar conteúdos (onde ficam os `[PREENCHER]`), como fazer deploy.

---

## 7. Como trabalhar neste projeto

- Antes de grandes mudanças, apresente o plano e espere aprovação.
- Ao terminar cada etapa, rode `npm run build` e confira que não há erros.
- Mantenha uma lista de pendências de conteúdo em `docs/PENDENCIAS.md` (tudo que for `[PREENCHER]`).
- Na dúvida sobre texto que envolva questão jurídica ou promessa, escolha a versão mais conservadora e sinalize.

---

## 8. Revisão da identidade visual (decisão do cliente — substitui a paleta vinho da seção 3)

O cliente rejeitou o vinho e, depois, o bege, e passou uma paleta própria. **Paleta vigente** (definitiva em `src/styles/global.css`, `@theme`): `laranja` `#FF7A00` (primária: botões, pílulas), `ambar` `#FECA53` (acento, duotone), `ardosia` `#2F313D` (cabeçalho, rodapé, seções escuras), `preto` `#010101`, `cinza` `#6B6C6D` (texto secundário), `prata` `#C9C9C9` (seções de destaque), `gelo` `#EDEEF0` (fundo base), `branco`. Onde o briefing diz "vinho", leia "laranja" (destaques) ou "ardosia" (fundos escuros).

Regras de contraste: texto sobre laranja é **preto** (branco não passa AA); laranja não serve como cor de texto sobre fundo claro. Duotone das fotos em âmbar.

Logo: emblema geométrico em arco (porta) dividido em quatro partes, com estrela de quatro pontas ao centro, em degradê laranja→âmbar; wordmark "Marcelo Lima" em Lexend 600 e linha "ASSESSORIA EM LEILÕES DE IMÓVEIS" em caixa-alta espaçada. Referência de estilo: logo geométrico com emblema + nome em sans geométrica. **Tipografia vigente: títulos e logo em Lexend (600–700), texto em DM Sans (400–500)** — substitui a Sora da seção 3. Formas e estrutura seguem valendo.
