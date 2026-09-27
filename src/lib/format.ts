/** 2026年9月27日 の形式。ビルド環境のタイムゾーンに左右されないよう JST で固定する */
export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' }).format(d);
