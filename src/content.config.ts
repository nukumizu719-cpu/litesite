import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * コラム記事。src/content/column/{slug}.md に置くと /column/{slug}/ で公開される。
 * ファイル名がそのままURLになるので、英小文字とハイフンで付ける。
 */
const column = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/column' }),
  schema: z.object({
    title: z.string(),
    /** 検索結果に出る説明文。全角120字前後 */
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    /** 一覧の分類 */
    category: z.enum(['費用・料金', '制作のコツ', 'SEO・集客', '補助金', '技術']),
    /** true にすると一覧・サイトマップから外れ、ページも生成しない */
    draft: z.boolean().default(false),
  }),
});

export const collections = { column };
