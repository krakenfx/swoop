import CryptoJS from 'exports?CryptoJS!../vendor/cryptojs/rollups/sha3';

const toHex = CryptoJS.enc.Hex.stringify;
const fromHex = CryptoJS.enc.Hex.parse;

export default function sha3(buffer, length = 256) {
  const shad = CryptoJS.SHA3(fromHex(buffer.toString('hex')), {
    outputLength: length,
  });

  return new Buffer(toHex(shad), 'hex');
}
