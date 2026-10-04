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
