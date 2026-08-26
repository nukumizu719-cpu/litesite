export type Bet = {
  type: string;
  combo: string;
  points: number;
  unit: number;
};

const WD = ['日', '月', '火', '水', '木', '金', '土'];

/** 2026年8月30日（日） */
export function jpDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WD[d.getDay()]}）`;
}

/** 8/30（日） */
export function shortDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）`;
}

/** 2026-08-30（datetime属性用） */
export function isoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 9,000円 */
export function yen(n: number): string {
  return `${n.toLocaleString('ja-JP')}円`;
}

/** +5,200円 / -3,000円（符号を必ず付ける） */
export function signedYen(n: number): string {
  return `${n >= 0 ? '+' : '-'}${Math.abs(n).toLocaleString('ja-JP')}円`;
}

/** 買い目1行の合計金額 */
export function betAmount(b: Bet): number {
  return b.points * b.unit;
}

/** 買い目全体の合計金額 */
export function betTotal(bets: Bet[]): number {
  return bets.reduce((s, b) => s + betAmount(b), 0);
}

/**
 * 買い目をそのまま投票サイトに写せるテキストに変換する。
 * 例: ワイド 5-8, 5-11 各300円
 */
export function betsToText(bets: Bet[], raceName?: string): string {
  const lines = bets.map(
    (b) => `${b.type} ${b.combo}　${b.points}点 各${b.unit.toLocaleString('ja-JP')}円`
  );
  const total = `合計 ${yen(betTotal(bets))}`;
  return [raceName ? `【${raceName}】` : null, ...lines, total].filter(Boolean).join('\n');
}

/** 回収率（%）。投資0のときは0を返す */
export function roi(invested: number, returned: number): number {
  return invested ? Number(((returned / invested) * 100).toFixed(1)) : 0;
}

/**
 * 馬番と出走頭数から枠番を求める（JRAの割り当てルール）。
 * 頭数を8で割り、余りは外枠から順に1頭ずつ追加する。
 * 例）18頭 → 1〜6枠が各2頭、7枠と8枠が各3頭
 */
export function wakuOf(no: number, headCount: number): number {
  if (headCount <= 8) return Math.min(Math.max(no, 1), 8);
  const base = Math.floor(headCount / 8);
  const extra = headCount % 8;
  const firstExtra = 8 - extra + 1; // この枠以降が base+1 頭になる
  let cursor = 0;
  for (let w = 1; w <= 8; w++) {
    const size = base + (w >= firstExtra ? 1 : 0);
    if (no <= cursor + size) return w;
    cursor += size;
  }
  return 8;
}
