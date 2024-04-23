export function camelToSpace(string) {
    let result = string[0]; // Preserve the first character as is
    for (let i = 1; i < string.length; i++) { // Ignore the first character
      if (string[i] === string[i].toUpperCase()) {
        result += ' ' + string[i];
      } else {
        result += string[i];
      }
    }
    return result;
  }
  