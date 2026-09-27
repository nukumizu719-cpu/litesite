/**
 * 問い合わせ完了の計測（GA4 の generate_lead）。
 *
 * 送信直後に gtag を呼んでもすぐ /thanks/ へ遷移するとイベントが送られる前に捨てられるため、
 * 送信成功時は sessionStorage に印を残し、/thanks/ を開いたときに送る。
 * 印は送ったら消すので、完了ページを再読み込みしても二重に数えない。
 */

const KEY = 'litesite:lead';

export interface LeadParams {
  form_name: string;
  inquiry_type: string;
  plan: string;
}

/** 送信成功時に呼ぶ。印を残せたら true */
export function markLead(params: LeadParams): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(params));
    return true;
  } catch {
    return false;
  }
}

/** /thanks/ で呼ぶ。印があれば generate_lead を送って消す */
export function sendMarkedLead(): void {
  let params: LeadParams | null = null;
  try {
    params = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    sessionStorage.removeItem(KEY);
  } catch {
    return;
  }
  if (params) window.gtag?.('event', 'generate_lead', params);
}

/**
 * sessionStorage が使えない環境向け。その場で送り、送信を待ってから遷移する。
 * gtag が応答しなくても 2.5 秒で遷移する。
 */
export function sendLeadThenGo(params: LeadParams, url: string): void {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    location.href = url;
  };
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { ...params, transport_type: 'beacon', event_callback: go, event_timeout: 2000 });
  }
  setTimeout(go, 2500);
}
