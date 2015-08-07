import CryptoJS from 'exports?CryptoJS!../vendor/cryptojs/rollups/aes';
import assert from 'assert';

function bufferToCryptoJs(x) {
  return CryptoJS.enc.Hex.parse(x.toString('hex'));
}

function cryptoJsToBuffer(x) {
  return new Buffer(CryptoJS.enc.Hex.stringify(x), 'hex');
}

export default function decryptSeed(key, encryptedSeed) {
  assert(Buffer.isBuffer(key), 'key must be Buffer');
  assert(Buffer.isBuffer(encryptedSeed), 'encryptedSeed must be Buffer');

  const iv = bufferToCryptoJs(encryptedSeed.slice(0, 16));
  const ciphertext = bufferToCryptoJs(encryptedSeed.slice(16));

  const cleartext = cryptoJsToBuffer(CryptoJS.AES.decrypt({
    ciphertext: ciphertext,
  },
  bufferToCryptoJs(key),
  {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }));

  if (cleartext.length === 64) {
    return new Buffer(cleartext.toString(), 'hex');
  }

  return cleartext;
}
