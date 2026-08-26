# 減点法ケイバ — Claude Code 作業ガイド

## このリポジトリについて

競馬AI予想サイト「減点法ケイバ」（https://litesite.jp/）。
Astro + Tailwind の静的サイト。main への push で GitHub Actions が Xserver に配信する。

**このリポジトリは Public。** 個人情報・馬券の実収支データをコミットしないこと。

## 絶対原則

1. **サイトに載せる数字は、すべて JRA投票照会サービスのCSVに基づく実購入記録であること。**
   会話で共有された買い目、記憶ベースの記録、想定買い目は載せない。
   過去に2回、実在しない購入が記事化されかけている（エルムS / 府中牝馬S・しらさぎS）。
   裏付けが取れない場合は、記事にせず必ずユーザーに確認する。
2. **回収率で語る。的中の有無で語らない。** 単勝が的中していても回収率76%ならマイナス。
   「的中 ✅」のようなチェックマーク表記は使わない。
3. **数字は自動集計。手打ちしない。** src/lib/stats.ts が計算する。
4. **バックテストやシミュレーションを載せる場合は、後付けであることを本文に明記する。**
5. JRA投票照会サービスは過去60日分しか遡れない。それより古いレースは検証不能として扱う。

## ディレクトリ

- src/config.ts … サイト名・URL・LINE・GA。設定変更はここ1箇所
- src/content.config.ts … コンテンツのスキーマ定義
- src/content/races/{年}/{MMDD-slug}.md … 予想記事
- src/content/updates/*.md … ロジック更新履歴
- src/lib/stats.ts … 回収率の自動集計
- src/lib/format.ts … 日付・金額・枠番計算
- docs/記事の書き方.md … 記事フォーマットの詳細
- docs/private/ … **gitignore済み。ローカル専用。絶対にコミットしない**

## 記事の frontmatter

raceName / grade / course / raceDate / headCount / handicap / axis / summary
marks: [{ no, name, mark, pop, odds, note }]
budget
bets: [{ type, combo, points, unit }]
result: { top3: [{ no, name }], payout, hits, note }
tags
draft（任意。true にすると一覧・集計・検索から外れる）

ファイル名は MMDD-レース名のローマ字（例: 0809-cbc-sho.md）。
正確なスキーマは src/content.config.ts を参照すること。

## 文体

- 一人称は使わない。「〜と判断した」「〜を軸に据えた」の形で書く
- 「〜かもしれない」を多用しない。判断は判断として書く
- **負けた記事も同じ熱量で書く。負けの分析こそがこのサイトの価値**
- 見出しは体言止めにせず文にする（例:「紐を厚く取ったことがすべてだった」）
- 数字には必ず単位を付ける。回収率は小数第1位まで
- 他社の予想サービスへの誘導は書かない
- 「爆穴」「絶対」など煽る表現を使わない

## ロジックの参照先

減点法チェックリスト / 馬券購入ロジック / 危険な人気馬の判定基準は、それぞれ
src/pages/logic/checklist.astro, buying.astro, danger.astro に実装されている。
記事を書く前にこれらを読むこと。

## 作業手順

gh CLI が利用可能。PR作成・マージともコマンドで実行する。

### 記事の追加のみの場合（コード変更を含まない）

以下を最後まで通しで実行してよい。途中で確認を求めなくてよい。

1. npm run build でビルドが通ることを確認
2. git status で docs/private/ が含まれていないことを確認
3. コミット → push
4. gh pr create でPRを作成
5. gh pr merge --merge でmainにマージ
6. GitHub Actions のデプロイ完了を確認
7. 本番URLをWebFetchで開き、記事が表示されることを確認
8. 結果を報告

### コード・設定の変更を含む場合

src/ 配下の .astro / .ts / config、.gitignore、package.json、
astro.config.mjs などに変更がある場合は、**PR作成で必ず止まる。**

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
- 実購入の裏付けがない買い目の記事化
- /results/ の数字の手動編集
