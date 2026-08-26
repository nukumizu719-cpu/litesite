import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 予想記事。
 * 予想の中身は本文ではなく frontmatter の構造化データとして持つ。
 * こうすることで買い目テーブル・減点表・回収率集計が自動生成でき、
 * Claudeの出力を貼るだけで記事が完成する。
 */
const races = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/races' }),
  schema: z.object({
    raceName: z.string(), // 札幌記念
    grade: z.enum(['G1', 'G2', 'G3', 'OP', 'L', '3勝', '2勝', '1勝', 'その他']),
    course: z.string(), // 札幌・芝2000m
    raceDate: z.coerce.date(), // 2026-08-30
    headCount: z.number(),
    handicap: z.boolean().default(false),

    // ── 予想 ──
    /** 軸馬の馬名 */
    axis: z.string(),
    /** 一言サマリー。一覧カードとOGPの説明文に使う */
    summary: z.string().optional(),
    marks: z.array(
      z.object({
        no: z.number(), // 馬番
        name: z.string(),
        mark: z.enum(['◎', '○', '▲', '△', '☆', '消']),
        pop: z.number().optional(), // 人気
        odds: z.number().optional(),
        deduction: z.number().optional(), // チェックリストの減点（0 または負の数）
        note: z.string().optional(),
      })
    ),
    danger: z
      .object({
        no: z.number(),
        name: z.string(),
        reason: z.string(),
      })
      .optional(),

    // ── 買い目 ──
    budget: z.number(), // 投資額（円）
    bets: z.array(
      z.object({
        type: z.enum(['単勝', '複勝', '馬連', 'ワイド', '3連複', '3連単', '枠連']),
        combo: z.string(), // '5-8' / '5→8,11,14'
        points: z.number(),
        unit: z.number(), // 1点あたりの金額
      })
    ),

    // ── 結果（レース後に追記する） ──
    result: z
      .object({
        top3: z
          .array(z.object({ no: z.number(), name: z.string() }))
          .length(3),
        payout: z.number(), // 払戻合計（円）
        hits: z.array(z.string()).default([]), // 的中した券種
        note: z.string().optional(), // 振り返り
      })
      .optional(),

    /** true にすると一覧・集計から外れる（書きかけの記事用） */
    draft: z.boolean().default(false),
    premium: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

/** ロジックの更新履歴 */
const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    /** どのロジックを変えたか */
    target: z.enum(['チェックリスト', '購入ロジック', '危険な人気馬', 'その他']),
    /** きっかけになったレース（任意） */
    trigger: z.string().optional(),
  }),
});

export const collections = { races, updates };
