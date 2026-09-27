/**
 * 制作実績。画像は src/assets/works/ に置き、ビルド時に最適化する。
 * 画像は各サイトをPC表示（1440×756）で撮影し、1200×630 に縮小したもの。
 */
import type { ImageMetadata } from 'astro';
import relagarden from '../assets/works/relagarden.jpg';
import miwaInfo from '../assets/works/miwa-info.jpg';
import gofish from '../assets/works/gofish.jpg';

export interface Work {
  client: string;
  industry: string;
  location: string;
  url: string;
  image: ImageMetadata;
  alt: string;
  /** 一覧用の短い説明 */
  summary: string;
  /** 実績ページで見せる取り組み */
  points: string[];
}

export const WORKS: Work[] = [
  {
    client: '怒涛の芝革命様（株式会社MIWA）',
    industry: '人工芝施工',
    location: '滋賀県彦根市',
    url: 'https://miwacompany.info/',
    image: miwaInfo,
    alt: '滋賀県彦根市の人工芝施工・怒涛の芝革命様のホームページのトップ画面',
    summary:
      '滋賀県内8エリアの地域別ページと施工事例の詳細ページを備えた、約30ページの集客サイト。「地域名＋人工芝」の検索から見積り依頼までの導線を設計しました。',
    points: [
      '彦根・長浜・草津・大津など8エリアの地域別ページ',
      '施工事例ごとの詳細ページとお知らせ機能',
      '施工エリア・面積を入力できる見積りフォーム',
      'スマホ画面下に電話・LINE・見積りの固定ボタン',
    ],
  },
  {
    client: 'リラガーデン様',
    industry: '人工芝施工',
    location: '愛知県岡崎市',
    url: 'https://relagarden.jp/',
    image: relagarden,
    alt: '愛知県岡崎市の人工芝施工・リラガーデン様のホームページのトップ画面',
    summary:
      'お庭の広さと地面の状態から概算費用がその場で分かる料金シミュレーションを搭載。計算結果をそのまま問い合わせにつなげます。',
    points: [
      '概算費用が分かる料金シミュレーション',
      'シミュレーション結果を引き継ぐお問い合わせフォーム',
      '施工事例・お知らせの更新ページ',
      '写真を送るだけで概算見積りができるLINE導線',
    ],
  },
  {
    client: '合同会社ゴーフィッシュジャパン様',
    industry: '家系図作成サービス',
    location: '滋賀県',
    url: 'https://gofishjp.com/',
    image: gofish,
    alt: '家系図作成サービス・合同会社ゴーフィッシュジャパン様のホームページのトップ画面',
    summary: '家族の歴史を扱うサービスにふさわしい、落ち着いた温かみのあるデザイン。サービス内容から料金・流れ・よくある質問までを1ページで伝えます。',
    points: ['写真と明朝体で温かみを出したデザイン', '料金の目安と作成の流れを明示', 'サービスの範囲（法的手続きは対象外）を冒頭で明記'],
  },
];
