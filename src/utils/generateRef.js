/**
 *
 * @param {string} prefix
 * @returns
 */
export const generateRef = (prefix = "TR-") => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomKey = "";

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  const ref = prefix + randomKey;
  return ref;
};
