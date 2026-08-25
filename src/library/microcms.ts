// src/library/microcms.ts
import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

/**
 * microCMS クライアントの初期化
 * .env から環境変数を読み込み、APIとの接続窓口を確立します。
 */
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

/**
 * カテゴリの型定義
 * microCMSの「カテゴリ」APIの構造に合わせます。
 */
export type Category = {
  name: string;
} & MicroCMSListContent;

/**
 * ブログ記事の型定義
 * MicroCMSListContent を継承することで、
 * id, createdAt, updatedAt, publishedAt, revisedAt が自動的に含まれます。
 */
export type Blog = {
  title: string;
  content: string; // リッチエディタ（HTML文字列）
  eyecatch?: {      // 任意項目（設定忘れによるビルドエラー防止）
    url: string;
    width: number;
    height: number;
  };
  category: Category | null; // コンテンツ参照（未選択時はnull）
} & MicroCMSListContent;