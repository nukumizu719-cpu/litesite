import { getCollection, type CollectionEntry } from 'astro:content';
import { roi } from './format';

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

/** 下書きを除いた全記事を、開催日の新しい順に返す */
export async function getRaces(): Promise<Race[]> {
  const races = await getCollection('races', ({ data }) => !data.draft);
  return races.sort((a, b) => b.data.raceDate.getTime() - a.data.raceDate.getTime());
}

/** 結果が入っている記事だけを、開催日の新しい順に返す */
export async function getFinishedRaces(year?: number): Promise<Race[]> {
  const races = await getRaces();
  return races.filter(
    (r) => !!r.data.result && (year === undefined || r.data.raceDate.getFullYear() === year)
  );
}

/**
 * 回収率・的中率の集計。
 * 集計対象は「結果が入力済みの記事」のみ。手打ちの数字は一切使わない。
 */
export async function getStats(year?: number): Promise<Stats> {
  const races = await getFinishedRaces(year);

  const invested = races.reduce((s, r) => s + r.data.budget, 0);
  const returned = races.reduce((s, r) => s + (r.data.result?.payout ?? 0), 0);
  const hits = races.filter((r) => (r.data.result?.payout ?? 0) > 0).length;

  return {
    races: races.length,
    invested,
    returned,
    profit: returned - invested,
    roi: roi(invested, returned),
    hitRate: races.length ? Number(((hits / races.length) * 100).toFixed(1)) : 0,
    hits,
  };
}

/** 結果のある記事が存在する年を、新しい順に返す */
export async function getYears(): Promise<number[]> {
  const races = await getFinishedRaces();
  return [...new Set(races.map((r) => r.data.raceDate.getFullYear()))].sort((a, b) => b - a);
}

/** 券種ごとの的中回数。どの馬券が効いているかを見るため */
export async function getHitsByType(year?: number): Promise<{ type: string; count: number }[]> {
  const races = await getFinishedRaces(year);
  const map = new Map<string, number>();
  for (const r of races) {
    for (const t of r.data.result?.hits ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

/** 1レース単体の回収率 */
export function raceRoi(race: Race): number | null {
  if (!race.data.result) return null;
  return roi(race.data.budget, race.data.result.payout);
}
