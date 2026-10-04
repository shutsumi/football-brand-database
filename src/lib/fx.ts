// 売上高を円にそろえるための為替レート（1ユーロあたり）
// 出典：欧州中央銀行（ECB）の参照レート。更新したら date と rates を差し替える
export const fx = {
  date: '2026-10-02',
  source: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
  perEur: {
    EUR: 1,
    USD: 1.1225,
    JPY: 176.99,
  },
} as const;

export type Currency = keyof typeof fx.perEur;
export const currencies = Object.keys(fx.perEur) as [Currency, ...Currency[]];

// amount は百万単位（決算資料の表記どおり）。円に換算して返す
export function toYen(amountMillions: number, currency: Currency) {
  return (amountMillions * 1e6 / fx.perEur[currency]) * fx.perEur.JPY;
}

// 7兆3,159億円 のように表記する
export function formatYen(yen: number) {
  const oku = Math.round(yen / 1e8);
  const cho = Math.floor(oku / 10000);
  const rest = oku % 10000;
  if (cho === 0) return `${rest.toLocaleString('ja-JP')}億円`;
  return rest === 0 ? `${cho}兆円` : `${cho}兆${rest.toLocaleString('ja-JP')}億円`;
}

const symbol: Record<Currency, string> = { EUR: '€', USD: '$', JPY: '¥' };
export function formatOriginal(amountMillions: number, currency: Currency) {
  return `${symbol[currency]}${amountMillions.toLocaleString('en-US')}百万`;
}
