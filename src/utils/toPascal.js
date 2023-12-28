/**
 *
 * @param {string} word
 * @returns
 */
export function toPascalCase(word) {
  if (word !== word.toLowerCase() && word !== word.toUpperCase()) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
