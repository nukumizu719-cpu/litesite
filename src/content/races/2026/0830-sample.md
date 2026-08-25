---
raceName: サンプルレース（記入例）
grade: G3
course: 中山・芝2000m
raceDate: 2026-08-30
headCount: 16
handicap: true
axis: サンプルホースA
summary: "これは記事フォーマットの記入例です。draft を true にしてあるため、一覧にも成績集計にも出てきません。中身を実際のレースに書き換えるか、ファイルごと削除してください。"
draft: true

# ── 印と評価 ──
# mark は ◎ ○ ▲ △ ☆ 消 のいずれか
# deduction は人気馬チェックリストの減点（0 または負の数）
marks:
  - { no: 5,  name: サンプルホースA, mark: "◎", pop: 2, odds: 5.4,  deduction: -1, note: 減点最少。右回りで実績あり }
  - { no: 11, name: サンプルホースB, mark: "○", pop: 5, odds: 12.3, deduction: -3, note: 4〜6番人気ゾーンの起点 }
  - { no: 2,  name: サンプルホースC, mark: "▲", pop: 1, odds: 2.8,  deduction: -4, note: 昇級初戦。頭までは信頼しない }
  - { no: 14, name: サンプルホースD, mark: "△", pop: 8, odds: 28.0, deduction: -3 }
  - { no: 7,  name: サンプルホースE, mark: "消", pop: 3, odds: 7.1,  deduction: -9, note: 前走逃げ切り＋トップハンデ }

# ── 危険な人気馬（該当馬がいなければこのブロックごと消す）──
danger:
  no: 7
  name: サンプルホースE
  reason: 前走は単騎逃げで押し切った形。今回は同型が3頭おり、同じ形を作れる保証がない。加えてトップハンデ。

# ── 買い目 ──
budget: 9000
bets:
  - { type: ワイド,  combo: "5-11",       points: 1, unit: 1500 }
  - { type: ワイド,  combo: "5-14",       points: 1, unit: 1000 }
  - { type: 馬連,    combo: "5-11",       points: 1, unit: 2000 }
  - { type: 3連複,   combo: "5-11-2,14",  points: 2, unit: 1000 }
  - { type: 単勝,    combo: "11",         points: 1, unit: 1500 }

# ── 結果（レース後に追記する。レース前はこのブロックごと消しておく）──
result:
  top3:
    - { no: 11, name: サンプルホースB }
    - { no: 5,  name: サンプルホースA }
    - { no: 2,  name: サンプルホースC }
  payout: 14200
  hits: [ワイド, 馬連, 3連複]
  note: 3連複の紐を2頭に絞らず厚めに取った判断が的中につながった。単勝は外れたが、ワイドを起点にした組み立てが機能した形。

tags: [ハンデ戦, 重賞, 記入例]
---

## 展開想定

本文はここに書く。Markdownがそのまま使える。

印・減点表・危険な人気馬・買い目テーブルは frontmatter から自動で組み上がるので、
本文には**表に書けないこと**だけを書く。展開の読み、馬場の想定、前走の解釈、迷った点など。

## 軸馬について

サンプルホースAを軸に置いた理由をここに書く。

## 買い目の考え方

なぜこの組み合わせにしたのか、どの券種を捨てたのかを書く。
ロジックの詳細は[馬券購入ロジック](/logic/buying/)に譲り、ここでは今回の判断だけを書く。
