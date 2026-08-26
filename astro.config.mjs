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
        if (path === '/thanks/') return false;
        // 有料販売を始めて law.astro の SELLING を true にしたら、この行を消す
        if (path === '/law/') return false;
        // 下書き記事（記入例のサンプルなど）
        if (path.includes('-sample/')) return false;
        return true;
      },
    }),
  ],
});
