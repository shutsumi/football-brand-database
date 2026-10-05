import { getCollection, type CollectionEntry } from 'astro:content';
import { countries, sports, flag, type CountryId } from './taxonomy';
import { toYen } from './fx';

// 英語名のアルファベット順
export async function getBrands() {
  const brands = await getCollection('brands');
  return brands.sort((a, b) => a.data.nameEn.localeCompare(b.data.nameEn, 'en', { sensitivity: 'base' }));
}

export async function getGroups() {
  return getCollection('groups');
}

export const groupYen = (g: CollectionEntry<'groups'>) =>
  g.data.revenue ? toYen(g.data.revenue.amount, g.data.revenue.currency) : undefined;


// 創業年の古い順。創業年が分からないものは最後に名前順
export function byFounded(a: CollectionEntry<'brands'>, b: CollectionEntry<'brands'>) {
  return (a.data.founded ?? 9999) - (b.data.founded ?? 9999) || a.data.nameEn.localeCompare(b.data.nameEn, 'en', { sensitivity: 'base' });
}

export const decadeOf = (year: number) => Math.floor(year / 10) * 10;

export const countryName = (id: CountryId) => countries[id];
export const countryLabel = (id: CountryId) => `${flag(id)} ${countries[id]}`;
export const sportName = (id: keyof typeof sports) => sports[id];

// 国名の英語表記（見出しの小さなラベル用）
const enRegion = new Intl.DisplayNames(['en'], { type: 'region' });
export const countryEn = (id: CountryId) => (enRegion.of(id.toUpperCase()) ?? id).toUpperCase();

// 通し番号：全ブランドを創業が古い順に並べた順位（No.001 …）
let numbers: Map<string, string> | undefined;
export async function brandNumbers() {
  if (!numbers) {
    const all = (await getCollection('brands')).sort(byFounded);
    numbers = new Map(all.map((b, i) => [b.id, String(i + 1).padStart(3, '0')]));
  }
  return numbers;
}
