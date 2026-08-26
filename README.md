# 減点法ケイバ（litesite.jp）

独自の減点式チェックリストと馬券購入ロジックをAIに適用した競馬予想サイト。
予想の根拠と、投資額・払戻の全記録を公開している。

## 技術構成

- Astro 5 / Tailwind CSS 4
- 記事は Markdown（Content Collections）
- `main` への push で GitHub Actions が Xserver へ rsync 配信

## コマンド

```bash
npm install     # 依存パッケージのインストール
npm run dev     # 開発サーバー（http://localhost:4321）
npm run build   # 本番ビルド（dist/ に出力）
npm run preview # ビルド結果をローカルで確認
```

## ディレクトリ

```
src/
  config.ts             サイト名・URL・LINE・GA の設定（変更はここ1箇所）
  content.config.ts     記事のデータ構造の定義
  content/
    races/{年}/*.md     予想記事
    updates/*.md        ロジックの更新履歴
  lib/
    format.ts           日付・金額・枠番の計算
    stats.ts            回収率・的中率の集計
  components/           UIコンポーネント
  layouts/Layout.astro  共通レイアウト（meta・OGP・構造化データ）
  pages/                各ページ
docs/
  記事の書き方.md         週次運用の手順と Claude 用プロンプト
```

## 記事の追加

`docs/記事の書き方.md` を参照。
`src/content/races/{年}/{MMDD}-{レース名}.md` に置くと、そのままURLになる。

`npm run build` が通ればデータ構造は正しい。落ちる場合は frontmatter を確認する。
