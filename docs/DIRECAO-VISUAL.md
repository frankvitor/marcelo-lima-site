# Direção visual — refatoração

Branch: `refactor-visual`. Referência: https://www.aucleiloes.com.br/ (capturas em `docs/referencias/auc/`). O site atual está em `docs/referencias/antes/`.
Escopo: só estética. Conteúdo, dados, simulador, quiz e regras do CLAUDE.md continuam valendo. **Não** se copia logo, texto, foto nem código do AUC.

## (a) O que define a estética do AUC

Medido com computed styles em 1440px:

- **Cor**: azul-marinho profundo dominante (`#010149` nas seções, `#060B2F` no hero e fundos de overlay), alternado com seções em branco-creme (`#FFFDF7` / `#FAF8EF`). Um único acento quente (dourado `#DAA520`, hover `#B8860B`) usado em botão principal, palavra de destaque no título, rótulos e ícones. Texto `#0A0A0A` e cinzas neutros (`#4B5563`, `#6B7280`).
- **Tipografia**: dois sans-serifs, Manrope (headline do hero: 60px, caixa-alta, tracking −0,9px) e Inter (resto). Títulos de seção em 36px com peso leve (300) e **uma palavra em cor de destaque** ("Atuamos em *todas as frentes*"). Título de card 18px/700. Corpo 15px, entrelinha ~1,5, cinza médio.
- **Ritmo**: seções com 60px de padding vertical (48px nas faixas), container de 1280px (conteúdo de leitura em 960px), alternância clara/escura a cada seção, o que dá cadência sem ornamento.
- **Formas**: botões com raio pequeno (4px) e fonte 15px/600; cards brancos com raio médio e sombra suave; pílulas apenas em rótulos.
- **Fotografia**: hero em foto escura de pessoas em reunião sob gradiente marinho (opacidade ~85% → transparente). Seções escuras com foto desfocada/overlay marinho ao fundo. Fotos de equipe em retrato.
- **Componentes de destaque**: eyebrow minúsculo em caixa-alta acima de cada título; cards de serviço em grade 3×2 com ícone de linha dourado; **faixa de logos rolando** (marquee) de bancos/leiloeiros; carrossel de depoimentos; CTA com mapa ao fundo; rodapé marinho em colunas com links de SEO.
- **Sensação geral**: institucional, sóbria, "financeira/jurídica". Confiança por contraste e hierarquia, não por decoração.

## (b) Problemas do nosso site atual (comparando os prints em `antes/`)

| Seção | Problema |
|---|---|
| Paleta geral | Laranja/âmbar + ardósia + cinza-azulado é vivo demais para o tema "segurança jurídica". Contraste fraco do laranja em texto, e o conjunto lembra app de delivery, não consultoria. Sem fundo escuro dominante, o site parece "claro e chapado". |
| Tipografia | Lexend em caixa-alta e peso 700 em todos os títulos H2 cansa; tudo grita com o mesmo volume. Falta contraste entre título forte (hero) e títulos de seção. |
| Molduras de título | O retângulo de contorno ocupa a largura toda e repete em todas as seções; vira ruído e deixa as seções iguais entre si. |
| Header | Fundo gelo sem presença; some sobre o hero claro. No AUC o header é parte do hero (transparente sobre foto, depois sólido). |
| Hero | Ilustração vetorial de prédios (provisória) em vez de fotografia; sem overlay, sem profundidade, sem prova de produto. Falta o card flutuante com um exemplo de arremate. |
| Jornadas | 3 cards idênticos, só texto e ícone. Sem foto, sem hierarquia, sem bullets. O primeiro (o principal) não se destaca dos outros. |
| Como funciona | Cinco colunas estreitas com texto minúsculo; números laranja grandes disputam com o título. Sem linha que conecte as etapas. |
| Riscos | Bom contraste claro/escuro, mas os cards são iguais aos das outras seções e o fundo é chapado, sem foto. |
| Simulador | Duas colunas corretas, mas o resultado vive num card que rola com a página e o formulário é denso. |
| Cases | Ficha técnica quebra em 3 colunas com `[PREENCHER]` longos; os cards parecem planilha. Sem foto do imóvel. |
| Mapa | Blocos esquemáticos parecem jogo; não comunicam "Brasil" de imediato. |
| Sobre | Silhueta cinza chapada como foto; seção fraca justamente onde deveria gerar confiança. |
| FAQ | Funcional, mas visualmente igual a uma lista de formulário. |
| CTA final | Fundo escuro liso com arco; sem foto, sem emoção. |
| Rodapé | Compacto demais, sem colunas claras. |
| Ritmo geral | Todas as seções têm o mesmo tratamento (moldura + parágrafo + grade), sem alternância clara/escura nem fotos para respirar. |

## (c) Plano de refatoração

### Paleta (proposta) — marinho dominante, vinho como destaque
Base sóbria inspirada na estrutura do AUC, mas com marinho próprio (não o mesmo hex) e o **vinho `#A3123A`** como único acento, conforme a sua instrução.

| Token | Hex | Uso |
|---|---|---|
| `marinho-950` | `#070B1F` | Overlays de foto, rodapé profundo |
| `marinho-900` | `#0E1633` | Header, seções escuras, rodapé |
| `marinho-700` | `#1B2550` | Cards sobre fundo escuro, hover escuro |
| `vinho` (700) | `#A3123A` | CTAs principais, pílulas de desconto, números, detalhes |
| `vinho-500` | `#C8264F` | Hover, detalhes |
| `vinho-50` | `#FBEFF2` | Fundos tintados, círculos de ícone |
| `rosa` | `#F3B3C3` | Texto de destaque **sobre fundo marinho** (vinho puro não tem contraste ali) |
| `grafite` | `#12142B` | Texto principal |
| `cinza` | `#5B6070` | Texto secundário (AA sobre branco e gelo) |
| `linha` | `#E2E4EB` | Bordas e divisores |
| `gelo` | `#F4F5F8` | Seções claras alternadas |
| `off-white` | `#FAFAFB` | Fundo base |
| `branco` | `#FFFFFF` | Cards |

Regras de contraste: texto branco sobre vinho (7,3:1) e sobre marinho (≥ 15:1); vinho só como texto sobre fundo claro; sobre marinho, destaque em `rosa`.

**Nota**: esta paleta substitui a laranja/ardósia da seção 8 do CLAUDE.md (decisão anterior). Se a intenção era manter o laranja, avise antes de aprovarmos a etapa 2.

### Tipografia (proposta)
Trocar **Lexend + DM Sans** por **Manrope + Inter** (Fontsource, livres), as mesmas famílias do AUC e uma dupla mais sóbria:
- Manrope 800 para H1 do hero (caixa-alta) e 700 para títulos de seção (caixa normal) e de card.
- Inter 400/500/600 para texto, botões e navegação.
- Títulos de seção em caixa normal, com **uma palavra em vinho** (azul/rosa sobre fundo escuro), em vez de moldura + caixa-alta. A caixa-alta fica só no hero. Eyebrow pequeno em caixa-alta acima de cada título.
- Logo: wordmark também em Manrope, emblema em degradê vinho.

### Imagens
Fotos reais do Unsplash (ver `docs/CREDITOS-IMAGENS.md`): hero (prédios de São Paulo), jornadas (chaves na entrada, análise de documentos, chave na fechadura), faixas de seção (fachadas), CTA final (torre residencial), mapa (vista aérea). Otimizadas com `astro:assets` (AVIF/WebP, `srcset`). Overlay marinho nas fotos de fundo. Sem martelo, sem casais posando.

### Estrutura visual por seção
1. **Header**: transparente sobre o hero (marinho), sólido marinho ao rolar; logo branca; botão vinho de WhatsApp; menu mobile em painel marinho.
2. **Hero**: foto de prédios + overlay marinho (gradiente), headline em caixa-alta, selo, 2 CTAs; no desktop, card branco flutuante "Exemplo de arremate" (ficha técnica + pílula de desconto, "exemplo ilustrativo").
3. **Jornadas** ("Atuo em todas as frentes"): 3 cards grandes com foto, rótulo de intenção, 3 bullets e botão; o primeiro com borda/realce.
4. **Serviços**: "Antes do leilão" e "Depois do leilão" em grades de cards (ícone, título, 1 linha), **apenas serviços já descritos no CLAUDE.md**.
5. **Faixa contínua (marquee)** com fontes de leilão em texto, parada com `prefers-reduced-motion`.
6. **Como funciona** (claro), **Riscos** (marinho + foto com overlay), **Simulador** (2 colunas, resultado sticky), **Cases** (com foto), **Mapa** (SVG real dos estados, licença livre), **Sobre**, **Depoimentos**, **FAQ**, **CTA final** (foto + overlay), **Rodapé** (marinho, colunas, logo branca).
7. **Interações**: hover de elevação nos cards, fade-in on scroll (já existente), transições de 200–300ms.

### Alternância de fundo (ritmo)
Hero escuro → Jornadas claro → Serviços escuro (foto) → Marquee claro → Como funciona claro/gelo → Riscos escuro → Simulador claro → Cases gelo → Mapa escuro (foto) → Sobre claro → Depoimentos gelo → FAQ claro → CTA escuro (foto) → Rodapé escuro.

### Ordem de execução
1. (feito) Análise, direção, fotos baixadas, créditos.
2. Tokens, fontes, logo, Header, Hero e Jornadas → **pausa para aprovação** com prints 1440/390.
3. Demais seções, mapa SVG, marquee; prints "depois" em `docs/referencias/depois/`.
4. Build, Lighthouse mobile ≥ 90, contraste AA, overflow em 390px.
