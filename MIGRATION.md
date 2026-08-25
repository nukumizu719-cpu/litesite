# 移行手順（litesite.jp → 減点法ケイバ）

このZIPは `nukumizu719-cpu/litesite` の **中身を全面的に入れ替えたもの**です。
デプロイ設定（`.github/workflows/deploy.yml`）と `package.json` は変更していないので、
追加のインストールも Xserver 側の設定変更も不要です。

---

## 1. ブランチを切る

Cursor のターミナルで、ローカルリポジトリ（`C:\Users\cw_89\ktmrbusiness-site\mysite`）にて：

```bash
git switch -c feature/keiba-renewal
```

---

## 2. 不要になったファイルを削除する

補助金サイト用のファイルです。まとめて削除します。

```bash
git rm src/components/Hero.astro
git rm src/components/Features.astro
git rm src/components/Works.astro
git rm src/components/Pricing.astro
git rm src/components/Contact.astro
git rm src/components/FAQ.astro
git rm src/pages/subsidy.astro
git rm -r src/assets/works
git rm -r public/images/works
git rm public/images/hero-pc.png public/images/hero-pc.webp
git rm public/images/hero-sp.png public/images/hero-sp.webp
git rm "public/ライト サイト.png"
git rm tree.txt
```

補助金サイト用の `FAQ.astro` は、競馬サイトでは使わないので削除します（よくある質問を作るときは新しく書き直したほうが早い）。

以下は残していますが、使っていないので気になれば削除して構いません。

```bash
git rm public/logo.png                                      # 旧LiteSiteロゴ
git rm public/images/ico_play_g.svg public/images/ico_stop_g.svg
```

`public/line.svg` はLINEアイコン用に残してあります。

---

## 3. ZIPの中身を上書きコピーする

ZIPを解凍して、中身をリポジトリ直下にそのまま上書きコピーしてください。
上書き・新規追加されるのは以下です。

```
astro.config.mjs              ← sitemap のフィルタを追加（noindexページを除外）
README.md                     ← 差し替え
MIGRATION.md                  ← このファイル（後で消してOK）
docs/記事の書き方.md            ← 週次運用の手順とClaude用プロンプト
public/robots.txt             ← 新規
public/site.webmanifest       ← 差し替え
src/config.ts                 ← 新規。サイト名・URL・LINE・GAの設定はここ1箇所
src/content.config.ts         ← 新規。記事のデータ構造の定義
src/styles/global.css         ← 差し替え。デザイントークンとダークモード
src/layouts/Layout.astro      ← 差し替え
src/components/*.astro        ← 全面入れ替え（10ファイル）
src/lib/format.ts             ← 新規
src/lib/stats.ts              ← 新規。回収率の自動集計
src/pages/**                  ← 全面入れ替え（16ファイル）
src/content/races/**          ← 新規。予想記事はここに置く
src/content/updates/**        ← 新規。ロジック更新履歴
```

`package.json` と `package-lock.json` は変更していません。依存パッケージの追加もありません。

---

## 4. ローカルで確認する

```bash
npm install     # 初回のみ
npm run dev     # http://localhost:4321
npm run build   # 本番と同じビルドを通す
```

`npm run build` が通れば、記事のデータ構造に問題はありません。

---

## 5. 公開前に必ずやること

### 5-1. `src/config.ts` を確認する

サイト名・URL・LINE・GA4はすべてこのファイル1箇所にまとまっています。

| 項目 | 現在の値 | 対応 |
|---|---|---|
| `SITE.name` | 減点法ケイバ | 変えたければここだけ書き換える |
| `SITE.gaId` | `G-EMP52J5809` | **旧サイトのGA4プロパティのままです。** 新規に作るなら差し替え、使わないなら空文字に |
| `SITE.email` | 空 | 入れるとお問い合わせページにメール窓口が出ます |
| `LINE_URL` | 旧サイトのLINE URL | **補助金サイト用のアカウントのままです。** 競馬用を新規に作るなら差し替え、当面使わないなら空文字にすると導線ごと非表示になります |

### 5-2. 更新履歴の日付を直す

`src/content/updates/*.md` の `date:` は**仮の日付**です。
実際にそのルールを決めた日に直してください（分からなければ削除しても構いません）。

### 5-3. 最初の記事を1本入れる

いまの状態だと、トップも成績も「まだ記事がありません」と表示されます。
`src/content/races/2026/0830-sample.md` は記入例（`draft: true`）なので、
**実際のレースを1〜2本入れてから公開**するのがおすすめです。
書き方は `docs/記事の書き方.md` にまとめてあります。

記入例そのものは、実際の記事を入れたあとに削除してください。

### 5-4. favicon と OGP 画像を差し替える

- `public/favicon.svg` `favicon-32x32.png` `favicon.ico` `apple-touch-icon.png` … 旧ロゴのままです
- `public/ogp.png` … **まだ存在しません。** SNSシェア時の画像なので、1200×630px で用意してください（無くてもサイトは動きます）

---

## 6. 公開する

```bash
git add -A
git commit -m "feat: 競馬AI予想サイトへ全面リニューアル"
git push -u origin feature/keiba-renewal
```

GitHub でPRを作って確認 → `main` にマージすると、GitHub Actions が Xserver に配信します（2分ほど）。

---

## 7. 公開後にやること

### Search Console

1. 旧サイトマップを削除し、`https://litesite.jp/sitemap-index.xml` を送信
2. トップ `/` をURL検査からインデックス登録をリクエスト（内容が全面的に変わったため）
3. `/subsidy/` などの旧URLは404になりますが、301は不要です。放置で問題ありません

### 収益化（記事が20本たまってから）

- Google AdSense を申請
- バナーブリッジ（競馬予想系案件）と TGアフィリエイト（楽天競馬）に登録
- 有料予想を始める場合は `src/pages/law.astro` の `SELLING` を `true` にして、
  特定商取引法の記載事項（氏名・住所・電話番号など）を埋める。
  合わせて `astro.config.mjs` のサイトマップフィルタから `/law/` の行を削除する

---

## 実装済みの内容

| ページ | パス |
|---|---|
| トップ（回収率サマリー付き） | `/` |
| 予想アーカイブ | `/races/` |
| 予想記事 | `/races/{年}/{ファイル名}/` |
| 成績・回収率（自動集計） | `/results/` |
| ロジック総覧 | `/logic/` |
| 人気馬チェックリスト | `/logic/checklist/` |
| 馬券購入ロジック | `/logic/buying/` |
| 危険な人気馬 | `/logic/danger/` |
| ロジック更新履歴 | `/logic/updates/` |
| サイトについて | `/about/` |
| 利用規約 | `/terms/` |
| 免責事項 | `/disclaimer/` |
| 特商法表記 | `/law/` |
| プライバシーポリシー | `/privacy-policy/` |
| お問い合わせ / 送信完了 | `/contact/` `/thanks/` |
| 404 | `/404.html` |

主な機能：

- **買い目テーブルのコピーボタン** … 投票サイトに写せる形式でクリップボードへ
- **枠番の色分け** … 馬番と出走頭数から枠番を自動計算し、JRAの8色で表示
- **回収率の自動集計** … 記事の投資額と払戻から計算。手打ちの数字は一切なし
- **ダークモード** … OSの設定に追従。ヘッダーのボタンで手動切替も可能
- **予想と結果の統合** … 1つのURLに予想と結果が同居。`result:` の追記だけで更新

## 未実装（設計書のPhase 4以降）

- `/columns/` … SEO用コラム
- `/premium/` … 有料予想の案内ページ
- 広告枠の設置（AdSense審査通過後）
