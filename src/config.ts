/**
 * サイト全体の設定を1ファイルに集約。
 * 屋号・連絡先・GA・LINE などを変えたいときはここだけ書き換える。
 */

export const SITE = {
  /** 屋号（英字） */
  name: 'LiteSite',
  /** 屋号（カナ） */
  nameKana: 'ライトサイト',
  /** タイトル末尾に付ける表記 */
  titleSuffix: 'LiteSite（ライトサイト）',
  /** トップページの <title> */
  homeTitle: '名古屋・安城のホームページ制作｜月額0円から持てる高速サイト LiteSite（ライトサイト）',
  /** トップページの meta description */
  description:
    '名古屋・安城を中心に愛知県の個人事業主・小規模事業者のホームページ制作を請け負います。表示が速く、SEOの内部対策を標準で施した静的サイトを229,000円〜（税込）、月額管理費0円のプランから。補助金を使った制作のご相談も受け付けています。',
  /** 本番URL（末尾スラッシュなし） */
  url: 'https://litesite.jp',
  lang: 'ja',
  /** OGP画像（public/ 配下のパス） */
  ogImage: '/ogp.png',
  /** Google Analytics 4 の測定ID。使わない場合は空文字にする */
  gaId: 'G-EMP52J5809',
} as const;

/**
 * 事業者情報。特商法表記・運営者情報・構造化データで使う。
 * 空文字の項目は画面に出さない（特商法表記では「請求により開示」と表示する）。
 */
export const BUSINESS = {
  /** 代表者名 */
  owner: '',
  /** 郵便番号 */
  postalCode: '',
  /** 都道府県 */
  region: '愛知県',
  /** 市区町村 */
  locality: '安城市',
  /** 番地以降。空なら市区町村までを表示 */
  street: '',
  /** 電話番号。空なら表示しない */
  tel: '',
  email: 'info@litesite.jp',
  /** 営業時間の表記 */
  hours: '平日 10:00〜18:00',
  /** 営業時間外の受付 */
  hoursNote: 'フォーム・LINEは24時間受付（返信は営業時間内）',
  /** 返信の目安 */
  replyWithin: '2営業日以内',
} as const;

/** 対面対応できる主なエリア。ページ本文と構造化データの areaServed に使う */
export const AREAS = {
  main: ['名古屋市', '安城市'],
  nearby: ['岡崎市', '刈谷市', '豊田市', '知立市', '碧南市', '西尾市', '高浜市', '豊明市', '大府市'],
} as const;

/** LINE公式アカウントのURL。空文字にすると導線が非表示になる */
export const LINE_URL = 'https://line.me/R/ti/p/strait0317jabiru';

/** お問い合わせフォームの送信先（Google Apps Script） */
export const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwzfBtUqWgmJPghIBH6n3K7I3FG-oT9n8-_mvYvAmdCiewNEJIPIqnW4hO1ywCwa5gr/exec';

/** Cloudflare Turnstile のサイトキー（公開値） */
export const TURNSTILE_SITE_KEY = '0x4AAAAAACYKQJQo6LXE6nQQ';

/** グローバルナビゲーション */
export const NAV = [
  { label: 'サービス', href: '/service/' },
  { label: '料金', href: '/price/' },
  { label: '制作実績', href: '/works/' },
  { label: '制作の流れ', href: '/flow/' },
  { label: '補助金活用', href: '/subsidy/' },
  { label: 'よくある質問', href: '/faq/' },
  { label: 'コラム', href: '/column/' },
] as const;

/** フッターのリーガルリンク */
export const LEGAL_NAV = [
  { label: '運営者情報', href: '/about/' },
  { label: 'プライバシーポリシー', href: '/privacy-policy/' },
  { label: '特定商取引法に基づく表記', href: '/law/' },
] as const;
