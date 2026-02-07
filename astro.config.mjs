// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 1. サイトのURLを設定（SEOとサイトマップ生成に必須）
  site: 'https://litesite.jp',

  // 2. 末尾のスラッシュ設定（SEO評価を統一するために推奨）
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    // 3. サイトマップの設定（Googleにページを正しく伝える）
    sitemap()
  ]
});