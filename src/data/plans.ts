/**
 * 料金。制作プラン（サイトの規模）と運用プラン（公開後の管理）を別々に選ぶ形。
 * トップ・料金ページ・特商法表記・構造化データ（Offer）で共通に使う。
 * 金額は税込の数値で持ち、表示は formatYen() で整形する。
 */

export interface Plan {
  id: string;
  name: string;
  /** プランの対象を一言で */
  lead: string;
  /** 制作費（税込） */
  price: number;
  /** ページ数の目安 */
  pages: string;
  features: string[];
  /** このプランで制作したサイト */
  example?: { label: string; href: string };
  recommended?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'スタンダードプラン',
    lead: 'まずはきちんとしたホームページを持ちたい方へ',
    price: 229000,
    pages: '10ページ前後まで',
    features: [
      'トップページ＋サービス・料金・会社概要などの下層ページ',
      'スマートフォン・タブレット対応',
      'SEOの内部対策（タイトル設計・構造化データ・サイトマップ）',
      'Googleアナリティクス・サーチコンソールの初期設定',
      'お問い合わせフォームの設置',
    ],
  },
  {
    id: 'growth',
    name: '集客プラン',
    lead: '検索からの問い合わせを本格的に増やしたい方へ',
    price: 650000,
    pages: '20〜30ページ規模',
    features: [
      'スタンダードプランの内容すべて',
      '「地域名＋業種」で見つけてもらうための地域別ページ',
      '施工事例・実績の詳細ページ',
      'お知らせ（新着情報）のページ',
      '業種に合わせた見積りフォーム（エリア・面積などの項目）',
      'スマホ画面下の電話・LINE・見積りボタン',
    ],
    example: { label: '怒涛の芝革命様（約30ページ）', href: '/works/' },
    recommended: true,
  },
];

export interface CarePlan {
  id: string;
  name: string;
  lead: string;
  /** 月額（税込）。0 なら月額なし */
  monthly: number;
  features: string[];
  notes: string[];
}

export const CARE_PLANS: CarePlan[] = [
  {
    id: 'self',
    name: 'セルフ運用',
    lead: '作ったあとの維持費を最小限にしたい方へ',
    monthly: 0,
    features: ['月額の管理費なし', 'ドメイン・サーバーはお客様名義で管理'],
    notes: ['ドメイン・サーバーの実費（年1万円程度）はお客様のご負担です。', '公開後の修正・追加は、その都度お見積りします。'],
  },
  {
    id: 'subscription',
    name: '安心サブスク',
    lead: '公開後の更新や管理も任せたい方へ',
    monthly: 4980,
    features: [
      'ドメイン・サーバーの契約更新を代行（費用込み）',
      '月1回までの軽微な修正（文言・写真の差し替えなど）',
      'LINE・Zoomでの運用相談',
    ],
    notes: ['解約は解約希望月の前月末日までにお申し出ください。翌月から停止します。'],
  },
];

/** 全プラン共通の制作内容 */
export const PLAN_COMMON = [
  { title: 'ヒアリング・構成設計', body: '事業内容・お客様像・狙う検索キーワードを整理し、ページ構成を決めます。' },
  { title: 'デザイン・コーディング', body: '業種に合った信頼感のあるデザインで、スマートフォンから見やすく作ります。' },
  { title: 'SEOの内部対策', body: 'タイトル・見出し・説明文の設計、構造化データ、サイトマップ、表示速度の最適化。' },
  { title: '公開と計測の準備', body: 'ドメイン接続、SSL化、アナリティクス・サーチコンソールの設定まで行います。' },
];

export const formatYen = (n: number) => `${n.toLocaleString('ja-JP')}円`;
