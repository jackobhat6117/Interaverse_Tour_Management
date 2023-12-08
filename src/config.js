import { getCurrencySymbol } from './features/utils/countires';

export const priceTimeout = 1000 * 60 * 15; // 15 minutes

export const path = {
  // api: "https://btm-backend-live.onrender.com/api",
  // api: process.env.REACT_APP_API || "https://miles-v2-staging.onrender.com/api",
  site: window.location.protocol+"//"+window.location.host,
}

let cur = window.localStorage.getItem("currency") || "NGN";
export const def = {
  get currency() {
    return getCurrencySymbol(cur)
  },
  get currencyCode() {
    cur = window.localStorage.getItem('currency') || "NGN";
    return cur;
  },
  devStatus: 'test',
  siteName: 'miles',
  logo: require('./assets/icons/textlogo.svg')
}