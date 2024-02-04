export function formatNumber(num) {
  if(!num) return num;
  
  const [intPart, decimalPart] = num.toString().split(".");
  let formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}