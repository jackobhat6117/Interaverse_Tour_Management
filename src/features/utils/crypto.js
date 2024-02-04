import CryptoJS from 'crypto-js';

export const encrypt = (plaintext,key='sq') => {
  if(!plaintext) return null;

  const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
  const wordArray = CryptoJS.enc.Base64.parse(encrypted);
  return CryptoJS.enc.Hex.stringify(wordArray);
};

export const decrypt = (cipher,key='sq') => {
  if(!cipher) return null;
  
  const wordArray = CryptoJS.enc.Hex.parse(cipher);
  const toDecrypt = CryptoJS.enc.Base64.stringify(wordArray);
  return CryptoJS.AES.decrypt(toDecrypt, key).toString(CryptoJS.enc.Utf8);
};
