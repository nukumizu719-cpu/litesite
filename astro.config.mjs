// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // サイトのURL（SEOとサイトマップ生成に必須）
  site: 'https://litesite.jp',

  // 末尾のスラッシュ設定（SEO評価を統一するため）
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // noindex にしているページはサイトマップからも外す
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/thanks/' && path !== '/404/';
      },
    }),
  ],
});
