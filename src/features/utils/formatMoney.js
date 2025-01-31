import { def } from "../../config";

export function formatMoney(num, currency) {
  if (!num && num !== 0) return num;
  let number = num;
  let rate = 1;
  let cr = window.localStorage.getItem("currencyRate");
  if (cr) rate = Number(cr);
  if (typeof number === "number") {
    number /= rate;
    number = number.toFixed(2);
  } else if (typeof number === "string") {
    number = num.replace(/\D/g, "");

    const isFloat = num.includes(".");
    if (isFloat) {
      number = parseFloat(num.replace(/[^\d.-]/g, ""));
    }

    // Perform operations on the extracted number if needed
    const modifiedNumber = (number / rate).toFixed(2);
    number = num.replace(number, modifiedNumber);
    number = number.replace(/[a-zA-Z\s]+/, "");
  }

  const [intPart, decimalPart] = number.toString().split(".");
  let formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const usedCurrency = currency || def.currency;
  return usedCurrency + formattedIntPart;
  // return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}

export function getNumber(num) {
  // if(typeof(num) === 'number') return num;
  if (typeof num === "string") return Number(num?.replace(/[^0-9.]/g, ""));
  return num;
}

export function convertMoney(num) {
  if (!num) return num;
  let number = num;
  let rate = 1;
  let cr = window.localStorage.getItem("currencyRate");
  if (cr) rate = Number(cr);
  if (typeof number === "number") {
    number *= rate;
    number = number.toFixed(2);
  } else if (typeof number === "string") {
    number = num.replace(/\D/g, "");

    const isFloat = num.includes(".");
    if (isFloat) {
      number = parseFloat(num.replace(/[^\d.-]/g, ""));
    }

    // Perform operations on the extracted number if needed
    const modifiedNumber = (number / rate).toFixed(2);
    number = num.replace(number, modifiedNumber);
  }

  const [intPart, decimalPart] = number.toString().split(".");
  let formattedIntPart = intPart;
  return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}
