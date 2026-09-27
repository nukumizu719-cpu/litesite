/**
 * 制作実績。画像は src/assets/works/ に置き、ビルド時に最適化する。
 */
import type { ImageMetadata } from 'astro';
import relagarden from '../assets/works/relagarden.jpg';
import miwaInfo from '../assets/works/miwa-info.jpg';
import miwacoin from '../assets/works/miwacoin.jpg';
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
    client: 'リラガーデン様',
    industry: '人工芝施工',
    location: '愛知県岡崎市',
    url: 'https://relagarden.jp',
    image: relagarden,
    alt: '人工芝施工リラガーデン様のホームページのトップ画面',
    summary: '「地域名＋人工芝」の検索を狙った構成で、広告に頼らない問い合わせの入口を作りました。',
    points: ['地域名と施工内容を軸にしたページ構成', '施工写真を主役にしたビジュアル', 'スマートフォンからの問い合わせ導線'],
  },
  {
    client: '怒涛の芝革命様',
    industry: '人工芝施工',
    location: '滋賀県（全国対応）',
    url: 'https://miwacompany.info/',
    image: miwaInfo,
    alt: '人工芝施工・怒涛の芝革命様のホームページのトップ画面',
    summary: 'インパクトのある屋号を活かした力強いデザインで、創業期のブランドの立ち上げを支援しました。',
    points: ['屋号の印象を前面に出したファーストビュー', '全国対応を伝えるサービス説明', '創業期に合わせた最小構成での公開'],
  },
  {
    client: '株式会社MIWA様',
    industry: 'コンサルティング',
    location: '滋賀県',
    url: 'https://miwacoin.com/',
    image: miwacoin,
    alt: '株式会社MIWA様のコーポレートサイトのトップ画面',
    summary: '法人の取引先に向けて、誠実さが伝わる落ち着いたコーポレートサイトに仕上げました。',
    points: ['BtoB向けの落ち着いた配色', '事業内容を整理した情報設計', '会社概要・問い合わせまでの短い導線'],
  },
  {
    client: '合同会社ゴーフィッシュジャパン様',
    industry: 'コンサルティング',
    location: '滋賀県',
    url: 'https://gofishjp.com/',
    image: gofish,
    alt: '合同会社ゴーフィッシュジャパン様のホームページのトップ画面',
    summary: '海外展開を見据え、あとからページや言語を追加しやすい構成で制作しました。',
    points: ['モダンで洗練されたUI', 'ページ追加・多言語化を見込んだ設計', '表示速度を落とさない静的サイト構成'],
  },
];
