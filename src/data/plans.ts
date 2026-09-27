/**
 * 料金プラン。トップ・料金ページ・構造化データ（Offer）で共通に使う。
 * 金額は税込の数値で持ち、表示は formatYen() で整形する。
 */

export interface Plan {
  id: string;
  name: string;
  /** プランの対象を一言で */
  lead: string;
  /** 制作費（税込） */
  initial: number;
  /** 月額（税込）。0 なら月額なし */
  monthly: number;
  features: string[];
  /** 料金の注記 */
  notes: string[];
  recommended?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'self',
    name: 'セルフ運用プラン',
    lead: '作ったあとの維持費を最小限にしたい方へ',
    initial: 229000,
    monthly: 0,
    features: [
      '表示が速い静的サイトで構築（Astro）',
      'スマートフォン・タブレット対応',
      'SEOの内部対策を標準で実施',
      'Googleアナリティクス・サーチコンソールの初期設定',
      'お問い合わせフォームの設置',
      '月額管理費0円',
    ],
    notes: ['ドメイン・サーバーの実費（年1万円程度）はお客様のご負担です。'],
  },
  {
    id: 'subscription',
    name: '安心サブスクプラン',
    lead: '公開後の更新や管理もまとめて任せたい方へ',
    initial: 229000,
    monthly: 4980,
    features: [
      'セルフ運用プランの内容すべて',
      'ドメイン・サーバーの契約更新を代行（費用込み）',
      '月1回までの軽微な修正（文言・写真の差し替えなど）',
      'LINE・Zoomでの運用相談',
    ],
    notes: ['解約は解約希望月の前月末日までにお申し出ください。翌月から停止します。'],
    recommended: true,
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
