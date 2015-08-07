import CryptoJS from 'exports?CryptoJS!../vendor/cryptojs/rollups/sha3';
import sha3 from 'web3/lib/utils/sha3';
import assert from 'assert';

export default function seedToPrivateKey(seed, quirk) {
  assert(Buffer.isBuffer(seed));

  const seedWords = CryptoJS.enc.Hex.parse(seed.toString('hex'));

  if (quirk) {
    const result = CryptoJS.SHA3(seed.toString('hex'), {
      outputLength: 256,
    });
    return new Buffer(CryptoJS.enc.Hex.stringify(result), 'hex');
  }

  return new Buffer(CryptoJS.SHA3(seedWords, { outputLength: 256 }).toString(), 'hex');
}
