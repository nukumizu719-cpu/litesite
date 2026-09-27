/** GA4（gtag.js）はLayoutで読み込む。未設定の環境では存在しない */
interface Window {
  gtag?: (...args: unknown[]) => void;
}
