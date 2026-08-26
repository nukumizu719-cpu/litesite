/**
 * サイト全体の設定を1ファイルに集約。
 * サイト名・URL・SNS・GA などを変えたいときはここだけ書き換える。
 */

export const SITE = {
  /** サイト名（日本語） */
  name: '減点法ケイバ',
  /** 英字表記（ロゴ・フッターなどで使用） */
  nameEn: 'GENTENHO KEIBA',
  /** 一言でどんなサイトか */
  tagline: 'ロジックを公開するAI競馬予想',
  /** トップページの meta description */
  description:
    '独自の減点式チェックリストと馬券購入ロジックをAIに適用した競馬予想サイト。予想の根拠も、投資額と払戻の全記録も公開しています。回収率はすべて自動集計です。',
  /** 本番URL（末尾スラッシュなし） */
  url: 'https://litesite.jp',
  /** 言語 */
  lang: 'ja',
  /** OGP画像（public/ 配下のパス） */
  ogImage: '/ogp.png',
  /** Google Analytics 4 の測定ID。使わない場合は空文字にする */
  gaId: 'G-3P00N31YPG',
  /** 運営者名（特商法表記・構造化データで使用） */
  author: '減点法ケイバ 編集部',
  /** 問い合わせ先メールアドレス */
  email: '',
} as const;

/** LINE公式アカウントのURL。未開設なら空文字にすると導線が非表示になる */
export const LINE_URL = '';

/** グローバルナビゲーション */
export const NAV = [
  { label: '予想', href: '/races/' },
  { label: '成績', href: '/results/' },
  { label: 'ロジック', href: '/logic/' },
  { label: 'サイトについて', href: '/about/' },
] as const;

/** フッターのリーガルリンク */
export const LEGAL_NAV = [
  { label: '利用規約', href: '/terms/' },
  { label: '免責事項', href: '/disclaimer/' },
  { label: 'プライバシーポリシー', href: '/privacy-policy/' },
  { label: '特定商取引法に基づく表記', href: '/law/' },
  { label: 'お問い合わせ', href: '/contact/' },
] as const;

/**
 * 枠番の色（JRA準拠）。馬番から枠番を出すのは頭数依存なので、
 * 記事側では枠番を直接持たず、必要なら frontmatter に足す。
 */
export const WAKU_COLORS = [
  { bg: '#FFFFFF', fg: '#16181A', name: '白' },
  { bg: '#16181A', fg: '#FFFFFF', name: '黒' },
  { bg: '#DC2340', fg: '#FFFFFF', name: '赤' },
  { bg: '#1668B3', fg: '#FFFFFF', name: '青' },
  { bg: '#F4CF20', fg: '#16181A', name: '黄' },
  { bg: '#17994B', fg: '#FFFFFF', name: '緑' },
  { bg: '#EF8118', fg: '#FFFFFF', name: '橙' },
  { bg: '#F0A6BA', fg: '#16181A', name: '桃' },
] as const;
