import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { countryIds, sportIds } from './lib/taxonomy';

const brands = defineCollection({
  // ファイル名（拡張子なし）がそのまま URL になる： nike.md → /brands/nike/
  loader: glob({ pattern: '*.md', base: './src/content/brands' }),
  schema: z.object({
    nameEn: z.string(),
    nameJa: z.string(),
    country: z.enum(countryIds),
    founded: z.number().int(),
    founders: z.array(z.string()).min(1),
    logo: z.object({
      // public/ からのパス
      path: z.string().startsWith('/logos/'),
      // Wikimedia Commons のファイルページ
      source: z.url(),
      license: z.string(),
      author: z.string().optional(),
    }),
    nameOrigin: z.string(),
    sports: z.array(z.enum(sportIds)).min(1),
    athletes: z.array(z.object({
      name: z.string(),
      sport: z.enum(sportIds),
      country: z.string(),
      // 契約を確認した出典
      source: z.url(),
    })).default([]),
    officialUrl: z.url(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1),
    updated: z.coerce.date(),
  }),
});

export const collections = { brands };
