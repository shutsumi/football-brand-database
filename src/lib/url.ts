// サイト内リンクの頭に公開先のパス（/football-brand-database）を付ける
// astro.config.mjs の base を変えれば全リンクが追従する
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => BASE + path;
