import { getCurrencySymbol } from './features/utils/countires';

export const priceTimeout = 1000 * 60 * 15; // 15 minutes

let cur = window.localStorage.getItem("currency") || "NGN";
export const def = {
  get currency() {
    return getCurrencySymbol(cur)
  },
  get currencyCode() {
    cur = window.localStorage.getItem('currency') || "NGN";
    return cur;
  },
  siteName: 'JourneyEasy',
  logo: require('./assets/icons/textlogo.png')
}