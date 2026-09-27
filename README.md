# LiteSite（ライトサイト）

名古屋・安城のホームページ制作サービスのサイト。https://litesite.jp/

- Astro 5 + Tailwind CSS 4 の静的サイト
- main への push で GitHub Actions が Xserver に rsync で配信
- お問い合わせフォームは Google Apps Script + Cloudflare Turnstile

## コマンド

| コマンド | 内容 |
| :-- | :-- |
| `npm install` | 依存関係のインストール |
| `npm run dev` | 開発サーバー（localhost:4321） |
| `npm run build` | `dist/` に本番ビルド |
| `npm run preview` | ビルド結果の確認 |

設定・料金・実績の変更箇所は [CLAUDE.md](CLAUDE.md) を参照。
