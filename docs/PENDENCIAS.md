# Pendências de conteúdo

Tudo que o cliente (Marcelo) precisa enviar ou decidir. Os itens aparecem no site como `[PREENCHER]`.
Para localizar no código: `grep -rn "PREENCHER" src`.

## 1. Contato e identificação — `src/config/site.ts`
- [ ] Número de WhatsApp (com DDI e DDD). Enquanto faltar, os botões de WhatsApp apontam para a âncora de contato e o quiz só mostra a mensagem na tela.
- [ ] E-mail de contato
- [ ] CNPJ (ou CPF) para rodapé e política de privacidade
- [ ] Redes sociais: Instagram, LinkedIn, YouTube (URLs completas começando com `https://`)
- [ ] Domínio do site (variável `PUBLIC_SITE_URL`)

## 2. Sobre o Marcelo — `src/data/home.ts` (bloco `sobre`)
- [ ] História pessoal e trajetória no mercado de leilões (texto em primeira pessoa)
- [ ] Anos de experiência
- [ ] Número de arrematações acompanhadas
- [ ] Foto profissional (hoje há uma silhueta provisória em `src/assets/img/foto-marcelo-placeholder.svg`)

## 3. Cases — `src/content/cases.json`
- [ ] Casos reais, com autorização do cliente: tipo de imóvel, cidade/UF, valor de avaliação, valor arrematado, custo total, desconto real e prazo até as chaves
- [ ] Trocar os 3 exemplos ilustrativos (`"exemplo": true`) pelos casos reais

## 4. Depoimentos — `src/content/depoimentos.json`
- [ ] Depoimentos reais (nome, cidade e texto, com autorização). Enquanto a lista estiver vazia, a seção não aparece.

## 5. Simulador — `src/config/simulador.ts` (marcados `REVISAR COM MARCELO`)
- [ ] Comissão do leiloeiro (%), por tipo de leilão
- [ ] ITBI padrão (%). Lembrar que varia por município e que a base de cálculo pode não ser só o valor do lance
- [ ] Valor estimado de registro e escritura
- [ ] Valores padrão de débitos e de desocupação/reforma
- [ ] Revisar o texto do aviso de estimativa

## 6. Textos que merecem revisão do cliente (e, se possível, de um advogado)
- [ ] Respostas do FAQ (`src/content/faq.json`): foram escritas de forma conservadora e genérica
- [ ] Textos da seção "Riscos que eu evito" e "Como funciona" (`src/data/home.ts`)
- [ ] Política de privacidade (`src/pages/politica-de-privacidade.astro`): base legal, prazo de retenção, ferramentas usadas, data de atualização e nome do controlador
- [ ] Confirmar o texto do aviso do rodapé: "Marcelo Lima atua como consultor. Análises jurídicas são realizadas por advogados parceiros."

## 7. Identidade visual
- [ ] Aprovar o logo provisório (arco com estrela) ou enviar o logo definitivo. No logo final, converter o texto em curvas para não depender de fonte
- [ ] Fotos reais de arquitetura/imóveis para o hero e para fundos de seção (hoje há ilustrações provisórias; o filtro duotone é aplicado automaticamente)
- [ ] Confirmar a paleta e as fontes (Lexend para títulos, DM Sans para texto)

## 8. Quiz e captação
- [ ] Confirmar as faixas de investimento do quiz (`src/config/quiz.ts`)
- [ ] Decidir sobre CRM: hoje `enviarLead` em `src/lib/leads.ts` não faz nada (Supabase previsto)

## 9. Analytics e marketing
- [ ] ID do Google Analytics 4 (`PUBLIC_GA4_ID`), se for usar
- [ ] ID do Meta Pixel (`PUBLIC_META_PIXEL_ID`), se for usar
- [ ] Se ativar analytics: atualizar a política de privacidade e avaliar um aviso de cookies

## 10. Futuro
- [ ] Blog: a estrutura de content collections está preparada, sem conteúdo ainda
- [ ] Rever a lista de estados atendidos em `src/data/estados.ts` (hoje: todos)
