// 国と競技の一覧。ここにない ID をブランドに書くとビルドが落ちる
// 表示順はこの並び順

export const countries = {
  us: 'アメリカ',
  de: 'ドイツ',
  jp: '日本',
  gb: 'イギリス',
  fr: 'フランス',
  it: 'イタリア',
} as const;

export const sports = {
  running: 'ランニング',
  football: 'サッカー',
  basketball: 'バスケットボール',
  tennis: 'テニス',
  baseball: '野球',
  golf: 'ゴルフ',
  'american-football': 'アメリカンフットボール',
  rugby: 'ラグビー',
  volleyball: 'バレーボール',
} as const;

export type CountryId = keyof typeof countries;
export type SportId = keyof typeof sports;

export const countryIds = Object.keys(countries) as [CountryId, ...CountryId[]];
export const sportIds = Object.keys(sports) as [SportId, ...SportId[]];
