import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { countryIds, sportIds } from './lib/taxonomy';
import { currencies } from './lib/fx';

const source = z.object({ title: z.string(), url: z.url() });

// ブランドを持つ会社（グループ）。独立系ブランドは会社そのものを1グループとして書く
const groups = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/groups' }),
  schema: z.object({
    nameEn: z.string(),
    nameJa: z.string(),
    country: z.enum(countryIds),
    // 連結売上高。非公開・未確認なら書かない（メインビジュアルで「売上非公開」に回る）
    revenue: z.object({
      amount: z.number().positive(), // 百万単位、決算資料の通貨のまま
      currency: z.enum(currencies),
      period: z.string(), // 例：2025年12月期
      source: z.url(),
    }).optional(),
    // まだブランドページが無い傘下ブランドの名前
    otherBrands: z.array(z.string()).default([]),
    officialUrl: z.url(),
    sources: z.array(source).min(1),
    updated: z.coerce.date(),
  }),
});

// マイナーブランドは分からない項目が多いので、確認できたものだけ書く
// 国（country）だけは必須。創業年は分からなければ書かない
const brands = defineCollection({
  // ファイル名（拡張子なし）がそのまま URL になる： nike.md → /brands/nike/
  loader: glob({ pattern: '*.md', base: './src/content/brands' }),
  schema: z.object({
    nameEn: z.string(),
    // 日本語表記が出典で確認できるときだけ
    nameJa: z.string().optional(),
    // 今の本拠地の国
    country: z.enum(countryIds),
    // 創業した国が今の本拠地と違うとき（例：ブラジル発祥で今は日本の Athleta）
    origin: z.enum(countryIds).optional(),
    // 所有する会社。確認できなければ書かない
    group: reference('groups').optional(),
    founded: z.number().int().optional(),
    // 閉業・休眠した年（復活していれば書かない）
    closed: z.number().int().optional(),
    // 出典にもとづく短い説明（日本語、1〜2文）
    note: z.string().optional(),
    founders: z.array(z.string()).default([]),
    // Wikimedia Commons に無ければ書かない（文字のロゴで代用する）
    logo: z.object({
      // public/ からのパス
      path: z.string().startsWith('/logos/'),
      // Wikimedia Commons のファイルページ
      source: z.url(),
      license: z.string(),
      author: z.string().optional(),
    }).optional(),
    nameOrigin: z.string().optional(),
    sports: z.array(z.enum(sportIds)).min(1),
    // 主な契約選手（サッカー・フットサルの選手だけ、最大5人）。毎月11日に見直す（athletes/README.md）
    athletes: z.array(z.object({
      name: z.string(),
      sport: z.enum(['football', 'futsal']),
      country: z.string(),
      // 所属クラブ（任意）
      club: z.string().optional(),
      // 契約を確認した出典
      source: z.url(),
    })).max(5).default([]),
    officialUrl: z.url().optional(),
    sources: z.array(source).min(1),
    updated: z.coerce.date(),
  }),
});

export const collections = { brands, groups };
