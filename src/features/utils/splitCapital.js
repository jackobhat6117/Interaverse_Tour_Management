export default function splitCapitals(str) {
  let result = '';
  
  try {
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (char === char.toUpperCase() && i > 0) {
        result += ' ';
      }
      result += char;
    }
  } catch(ex) {}

  return result;
}