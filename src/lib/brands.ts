import { getCollection, type CollectionEntry } from 'astro:content';
import { countries, sports } from './taxonomy';
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

// メインビジュアル用：グループを売上高の大きい順に並べ、傘下のブランドを添える
// 売上が分からないグループ・グループ不明のブランドは最後にまとめる
export async function getRanking() {
  const [brands, groups] = await Promise.all([getBrands(), getGroups()]);
  const ranked = groups
    .filter((g) => g.data.revenue)
    .map((g) => ({ group: g, yen: groupYen(g)!, brands: brands.filter((b) => b.data.group?.id === g.id) }))
    .sort((a, b) => b.yen - a.yen);
  const rankedIds = new Set(ranked.map((r) => r.group.id));
  const undisclosed = brands.filter((b) => !b.data.group || !rankedIds.has(b.data.group.id));
  return { ranked, undisclosed };
}

export const countryName = (id: keyof typeof countries) => countries[id];
export const sportName = (id: keyof typeof sports) => sports[id];
