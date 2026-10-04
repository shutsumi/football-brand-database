import { getCollection } from 'astro:content';
import { countries, sports } from './taxonomy';

// 英語名のアルファベット順
export async function getBrands() {
  const brands = await getCollection('brands');
  return brands.sort((a, b) => a.data.nameEn.localeCompare(b.data.nameEn, 'en', { sensitivity: 'base' }));
}

export const countryName = (id: keyof typeof countries) => countries[id];
export const sportName = (id: keyof typeof sports) => sports[id];
