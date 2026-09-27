# LiteSite（ライトサイト） — Claude Code 作業ガイド

## このリポジトリについて

名古屋・安城のホームページ制作サービス「LiteSite（ライトサイト）」の受注サイト（https://litesite.jp/）。
Astro + Tailwind の静的サイト。main への push で GitHub Actions が Xserver に配信する。

サイトの目的は **検索から見つけてもらい、問い合わせ（フォーム・LINE）につなげること。**
ページを増やすときも、この導線を切らさない。

**このリポジトリは Public。** 顧客の個人情報・見積金額・契約内容をコミットしないこと。

2026年8〜9月は競馬予想サイト「減点法ケイバ」として運用していた。そのコードは
`archive/keiba-site` ブランチに残してある。旧URL（/races/ など）は public/.htaccess で 410 を返している。

## 絶対原則

1. **料金・納期・サービス内容は、src/data/ と src/config.ts にある内容だけを載せる。**
   新しいプラン・オプション・金額を思いつきで書かない。変えるときはユーザーに確認する。
2. **補助金の情報は、公式の公募要領で裏付けが取れることだけを書く。**
   補助率・上限額・対象経費は公募回ごとに変わる。/subsidy/ は `AS_OF`（基準日）を必ず更新し、
   「実質〇万円」のように条件を省いた金額表示はしない（有利誤認になる）。
3. **検索順位を約束する表現は使わない。**「必ず上位表示」「Google評価100点」など。
4. **制作実績は、実際に制作したサイトだけを載せる。** 掲載の可否はユーザーに確認する。
5. 事業者情報（代表者名・住所・電話）は src/config.ts の BUSINESS。空欄の項目は画面に出さない作りになっている。

## ディレクトリ

- src/config.ts … 屋号・URL・GA・LINE・事業者情報・対応エリア・ナビ。設定変更はここ
- src/data/plans.ts … 料金プラン（トップ・料金ページ・構造化データで共通）
- src/data/works.ts … 制作実績（画像は src/assets/works/）
- src/data/faq.ts … よくある質問（`top: true` でトップにも表示）
- src/data/flow.ts … 制作の流れ
- src/content/column/*.md … コラム記事（ファイル名がURLになる）
- src/content.config.ts … コラムの frontmatter スキーマ
- src/layouts/Layout.astro … title / description / OGP / 構造化データ（JSON-LD）
- public/.htaccess … 404ページ・旧URLの410・キャッシュ設定
- docs/private/ … **gitignore済み。ローカル専用。絶対にコミットしない**

## SEO の決まりごと

- ページごとに `title` と `description` を個別に付ける。title には「ホームページ制作」などの検索語を含める
- h1 は1ページに1つ。見出しの階層を飛ばさない
- 下層ページは `breadcrumbs` を Layout と PageHeader の両方に渡す（パンくずの構造化データになる）
- FAQPage の構造化データは /faq/ だけで出す。同じQ&Aを複数ページでマークアップしない
- 送信完了など検索に出したくないページは `noindex` を付け、astro.config.mjs のサイトマップからも外す
- 問い合わせにつながるリンクには `data-cta="設置場所"` を付ける（GA4 に cta_click / line_click が送られる）
- フォーム送信成功時は GA4 の `generate_lead` を送っている。GA4 側でキーイベントに設定して計測する

## コラム記事の frontmatter

```yaml
title: 記事タイトル（検索されたい言葉を前半に）
description: 検索結果に出る説明文。全角100〜120字
publishedAt: 2026-09-27
updatedAt: 2026-10-01   # 任意。内容を更新したとき
category: 費用・料金 | 制作のコツ | SEO・集客 | 補助金 | 技術
draft: false            # 任意。true で非公開
```

ファイル名は英小文字とハイフン（例: homepage-cost.md → /column/homepage-cost/）。

## 文体

- です・ます調。読み手は ITに詳しくない個人事業主・小規模事業者
- 専門用語は最初に一言で説明する（例:「静的サイト（完成したページをそのまま届ける作り方）」）
- 煽らない。「爆速」「最強」「絶対」「完全攻略」などは使わない
- 自社に不利な点（静的サイトは自分で更新しにくい、など）も隠さずに書く。信頼につながる
- 記事の最後は、関連するサービスページかお問い合わせへのリンクで締める

## 作業手順

gh CLI が利用可能。PR作成・マージともコマンドで実行する。

### コラム記事の追加・文言修正のみの場合（コード変更を含まない）

以下を最後まで通しで実行してよい。途中で確認を求めなくてよい。

1. npm run build でビルドが通ることを確認
2. git status で docs/private/ が含まれていないことを確認
3. コミット → push
4. gh pr create でPRを作成
5. gh pr merge --merge でmainにマージ
6. GitHub Actions のデプロイ完了を確認
7. 本番URLをWebFetchで開き、記事が表示されることを確認
8. 結果を報告

### コード・設定・料金・サービス内容の変更を含む場合

src/ 配下の .astro / .ts / config、src/data/、.gitignore、package.json、
astro.config.mjs、public/.htaccess などに変更がある場合は、**PR作成で必ず止まる。**

1〜4 まで実行し、PRのURLを報告して停止する。
マージ指示があるまで gh pr merge を実行しないこと。

### 共通

- .github/workflows/ を変更する場合は、種類を問わず必ず事前に確認を取る
- マージ後は git switch main && git pull でローカルを同期する
- 不具合が出た場合は gh pr create で修正PRを立てるか、
  GitHub上のRevertで戻す。強制pushはしない

## やってはいけないこと

- .github/workflows/ の変更（触る必要があるときは必ず確認を取る）
- docs/private/ 配下のコミット
- 裏付けのない料金・補助金情報・実績の掲載
- 順位保証や誇大な表現
