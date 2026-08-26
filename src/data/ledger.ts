/**
 * A分類（ロジック型）の実購入記録。
 * 出典は JRA投票照会サービスのCSV（docs/private/収支台帳.md、非公開）。
 * 記事の有無に関わらず、ロジックを適用して実際に購入した全レースをここに持つ。
 * 買い目の詳細（券種・組み合わせ）は含めない。投資額・払戻額のみ。
 */

export type LedgerEntry = {
  /** 開催日（YYYY-MM-DD） */
  date: string;
  /** 開催競馬場 */
  venue: string;
  /** レース番号 */
  raceNo: number;
  raceName: string;
  /** 投資額（円） */
  budget: number;
  /** 払戻額（円） */
  payout: number;
  /** 記事がある場合のみ、その記事の astro:content id（例: '2026/0809-cbc-sho'） */
  articleId?: string;
};

export const LEDGER: LedgerEntry[] = [
  { date: '2026-06-27', venue: '函館', raceNo: 11, raceName: '青函S', budget: 1000, payout: 760 },
  { date: '2026-06-27', venue: '小倉', raceNo: 11, raceName: '薩摩S', budget: 1000, payout: 0 },
  { date: '2026-06-27', venue: '福島', raceNo: 11, raceName: 'バーデンバーデンC', budget: 1000, payout: 1760 },
  { date: '2026-06-28', venue: '函館', raceNo: 11, raceName: '函館記念', budget: 1500, payout: 5600 },
  { date: '2026-06-28', venue: '福島', raceNo: 11, raceName: 'ラジオNIKKEI賞', budget: 1500, payout: 0 },
  { date: '2026-07-05', venue: '小倉', raceNo: 11, raceName: '北九州記念', budget: 3000, payout: 0 },
  { date: '2026-07-12', venue: '福島', raceNo: 11, raceName: '七夕賞', budget: 2200, payout: 2500 },
  { date: '2026-07-19', venue: '函館', raceNo: 11, raceName: '函館2歳ステークス(G3)', budget: 4000, payout: 0 },
  { date: '2026-07-19', venue: '小倉', raceNo: 11, raceName: '小倉記念', budget: 5600, payout: 0 },
  { date: '2026-08-02', venue: '札幌', raceNo: 11, raceName: 'クイーンS', budget: 2000, payout: 970 },
  {
    date: '2026-08-09',
    venue: '中京',
    raceNo: 7,
    raceName: 'CBC賞',
    budget: 3000,
    payout: 21720,
    articleId: '2026/0809-cbc-sho',
  },
  { date: '2026-08-15', venue: '中京', raceNo: 11, raceName: '3歳以上1勝クラス', budget: 2000, payout: 890 },
  { date: '2026-08-15', venue: '新潟', raceNo: 3, raceName: '2歳新馬', budget: 800, payout: 0 },
  { date: '2026-08-15', venue: '新潟', raceNo: 5, raceName: '3歳以上1勝クラス', budget: 2200, payout: 1040 },
  { date: '2026-08-16', venue: '中京', raceNo: 4, raceName: '3歳未勝利', budget: 1000, payout: 0 },
  { date: '2026-08-16', venue: '中京', raceNo: 7, raceName: '中京記念(G3)', budget: 2000, payout: 2350 },
  { date: '2026-08-16', venue: '中京', raceNo: 9, raceName: '3歳未勝利', budget: 2000, payout: 0 },
  { date: '2026-08-16', venue: '札幌', raceNo: 2, raceName: '2歳未勝利', budget: 200, payout: 0 },
  { date: '2026-08-16', venue: '札幌', raceNo: 4, raceName: '3歳未勝利', budget: 1000, payout: 0 },
  { date: '2026-08-16', venue: '札幌', raceNo: 11, raceName: '札幌記念(G2)', budget: 3000, payout: 0 },
  { date: '2026-08-22', venue: '新潟', raceNo: 8, raceName: '岩室温泉特別(2勝クラス)', budget: 1000, payout: 0 },
  { date: '2026-08-23', venue: '中京', raceNo: 10, raceName: '3歳未勝利', budget: 1600, payout: 2640 },
];
