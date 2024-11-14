import CryptoJS from 'crypto-js';

const secretKey = process.env.SESSION_SECRET || 'secret_key';

export function encrypt(text: string | CryptoJS.lib.WordArray) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decrypt(cipherText: string | CryptoJS.lib.CipherParams) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptSha256(text: string) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const hashedPassword = CryptoJS.SHA256(text + salt).toString();
  return { password: hashedPassword, salt }
}

export function encryptSha256WithSalt(text: string, salt: string) {
  const hashedPassword = CryptoJS.SHA256(text + salt).toString();
  return hashedPassword;
}