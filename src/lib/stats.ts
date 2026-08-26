import { getCollection, type CollectionEntry } from 'astro:content';
import { roi } from './format';
import { LEDGER, type LedgerEntry } from '../data/ledger';

export type Race = CollectionEntry<'races'>;

export type Stats = {
  races: number;
  invested: number;
  returned: number;
  profit: number;
  /** 回収率（%） */
  roi: number;
  /** 的中率（%） */
  hitRate: number;
  hits: number;
};

export type LedgerRow = LedgerEntry & {
  roi: number;
  profit: number;
};

/** 下書きを除いた全記事を、開催日の新しい順に返す */
export async function getRaces(): Promise<Race[]> {
  const races = await getCollection('races', ({ data }) => !data.draft);
  return races.sort((a, b) => b.data.raceDate.getTime() - a.data.raceDate.getTime());
}

/**
 * 台帳（src/data/ledger.ts）の全レコードを、開催日の新しい順に返す。
 * 記事の有無に関わらず、ロジックを適用して実際に購入した全レースが対象。
 */
export function getLedgerRows(year?: number): LedgerRow[] {
  return LEDGER.filter((e) => year === undefined || new Date(e.date).getFullYear() === year)
    .map((e) => ({ ...e, roi: roi(e.budget, e.payout), profit: e.payout - e.budget }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * 回収率・的中率の集計。
 * 集計対象は台帳（ledger.ts）の全レコード。記事化の有無や記事の完成度に関わらず、
 * 実際に購入した全レースが常に反映される。手打ちの数字は一切使わない。
 */
export function getStats(year?: number): Stats {
  const rows = getLedgerRows(year);

  const invested = rows.reduce((s, r) => s + r.budget, 0);
  const returned = rows.reduce((s, r) => s + r.payout, 0);
  const hits = rows.filter((r) => r.payout > 0).length;

  return {
    races: rows.length,
    invested,
    returned,
    profit: returned - invested,
    roi: roi(invested, returned),
    hitRate: rows.length ? Number(((hits / rows.length) * 100).toFixed(1)) : 0,
    hits,
  };
}

/** 台帳に記録がある年を、新しい順に返す */
export function getYears(): number[] {
  return [...new Set(LEDGER.map((e) => new Date(e.date).getFullYear()))].sort((a, b) => b - a);
}

/**
 * 券種ごとの的中回数。記事化済みで結果を入力しているレースのみが対象
 * （買い目の券種・組み合わせは台帳に持たないため、記事データからしか出せない）。
 */
export async function getHitsByType(year?: number): Promise<{ type: string; count: number }[]> {
  const races = await getRaces();
  const map = new Map<string, number>();
  for (const r of races) {
    if (!r.data.result) continue;
    if (year !== undefined && r.data.raceDate.getFullYear() !== year) continue;
    for (const t of r.data.result.hits ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}
