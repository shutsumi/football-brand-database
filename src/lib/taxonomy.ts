// 国と競技の一覧。ここにない ID をブランドに書くとビルドが落ちる
// 国の ID は ISO 3166-1 の2文字コード（小文字）

export const regions = ['ヨーロッパ', 'アジア', '中東', '北米', '中南米', 'アフリカ', 'オセアニア'] as const;
export type Region = (typeof regions)[number];

const countryTable = {
  gb: ['イギリス', 'ヨーロッパ'],
  de: ['ドイツ', 'ヨーロッパ'],
  fr: ['フランス', 'ヨーロッパ'],
  it: ['イタリア', 'ヨーロッパ'],
  es: ['スペイン', 'ヨーロッパ'],
  dk: ['デンマーク', 'ヨーロッパ'],
  be: ['ベルギー', 'ヨーロッパ'],
  ch: ['スイス', 'ヨーロッパ'],
  pl: ['ポーランド', 'ヨーロッパ'],
  hu: ['ハンガリー', 'ヨーロッパ'],
  sk: ['スロバキア', 'ヨーロッパ'],
  ba: ['ボスニア・ヘルツェゴビナ', 'ヨーロッパ'],
  ru: ['ロシア', 'ヨーロッパ'],
  nl: ['オランダ', 'ヨーロッパ'],
  ie: ['アイルランド', 'ヨーロッパ'],
  pt: ['ポルトガル', 'ヨーロッパ'],
  se: ['スウェーデン', 'ヨーロッパ'],
  tr: ['トルコ', 'ヨーロッパ'],
  am: ['アルメニア', 'ヨーロッパ'],
  rs: ['セルビア', 'ヨーロッパ'],
  hr: ['クロアチア', 'ヨーロッパ'],
  ua: ['ウクライナ', 'ヨーロッパ'],
  jp: ['日本', 'アジア'],
  cn: ['中国', 'アジア'],
  kp: ['北朝鮮', 'アジア'],
  kr: ['韓国', 'アジア'],
  mn: ['モンゴル', 'アジア'],
  th: ['タイ', 'アジア'],
  id: ['インドネシア', 'アジア'],
  my: ['マレーシア', 'アジア'],
  sg: ['シンガポール', 'アジア'],
  ph: ['フィリピン', 'アジア'],
  in: ['インド', 'アジア'],
  np: ['ネパール', 'アジア'],
  uz: ['ウズベキスタン', 'アジア'],
  vn: ['ベトナム', 'アジア'],
  kh: ['カンボジア', 'アジア'],
  mm: ['ミャンマー', 'アジア'],
  pk: ['パキスタン', 'アジア'],
  ir: ['イラン', '中東'],
  kw: ['クウェート', '中東'],
  ae: ['アラブ首長国連邦', '中東'],
  sa: ['サウジアラビア', '中東'],
  us: ['アメリカ', '北米'],
  ca: ['カナダ', '北米'],
  mx: ['メキシコ', '中南米'],
  br: ['ブラジル', '中南米'],
  ar: ['アルゼンチン', '中南米'],
  co: ['コロンビア', '中南米'],
  pe: ['ペルー', '中南米'],
  ec: ['エクアドル', '中南米'],
  cl: ['チリ', '中南米'],
  py: ['パラグアイ', '中南米'],
  hn: ['ホンジュラス', '中南米'],
  ma: ['モロッコ', 'アフリカ'],
  et: ['エチオピア', 'アフリカ'],
  bf: ['ブルキナファソ', 'アフリカ'],
  dz: ['アルジェリア', 'アフリカ'],
  ng: ['ナイジェリア', 'アフリカ'],
  gh: ['ガーナ', 'アフリカ'],
  ke: ['ケニア', 'アフリカ'],
  tz: ['タンザニア', 'アフリカ'],
  ug: ['ウガンダ', 'アフリカ'],
  zm: ['ザンビア', 'アフリカ'],
  ao: ['アンゴラ', 'アフリカ'],
  za: ['南アフリカ', 'アフリカ'],
  au: ['オーストラリア', 'オセアニア'],
  nz: ['ニュージーランド', 'オセアニア'],
} as const satisfies Record<string, readonly [string, Region]>;

export type CountryId = keyof typeof countryTable;
export const countryIds = Object.keys(countryTable) as [CountryId, ...CountryId[]];
export const countries = Object.fromEntries(countryIds.map((id) => [id, countryTable[id][0]])) as Record<CountryId, string>;
export const regionOf = (id: CountryId): Region => countryTable[id][1];

// 国旗の絵文字（Windows では2文字のコードで表示される）
export const flag = (id: CountryId) =>
  String.fromCodePoint(...id.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

export const sports = {
  football: 'サッカー',
  running: 'ランニング',
  basketball: 'バスケットボール',
  tennis: 'テニス',
  baseball: '野球',
  golf: 'ゴルフ',
  'american-football': 'アメリカンフットボール',
  rugby: 'ラグビー',
  volleyball: 'バレーボール',
} as const;

export type SportId = keyof typeof sports;
export const sportIds = Object.keys(sports) as [SportId, ...SportId[]];
