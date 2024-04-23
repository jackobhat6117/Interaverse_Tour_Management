/**
 * Clones an object and optionally suggests an auto-completion.
 * @param {Object} obj - The object to clone.
 * @returns {Object} - The cloned object or the suggested object.
 */
export function clone(obj) {
  if(!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
}