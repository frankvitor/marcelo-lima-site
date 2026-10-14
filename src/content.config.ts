import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: file('src/content/cases.json'),
  schema: z.object({
    tipo: z.string(),
    cidade: z.string(),
    uf: z.string(),
    avaliacao: z.string(),
    arrematado: z.string(),
    custoTotal: z.string(),
    descontoReal: z.string(),
    prazo: z.string(),
    exemplo: z.boolean().default(false),
    ordem: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    pergunta: z.string(),
    resposta: z.string(),
    ordem: z.number().default(0),
  }),
});

const depoimentos = defineCollection({
  loader: file('src/content/depoimentos.json'),
  schema: z.object({
    nome: z.string(),
    cidade: z.string().optional(),
    texto: z.string(),
    ordem: z.number().default(0),
  }),
});

export const collections = { cases, faq, depoimentos };
