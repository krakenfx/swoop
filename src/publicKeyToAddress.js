import sha3 from './sha3';

export default function publicKeyToAddress(pubKey) {
  const input = pubKey.slice(1, 65);
  return sha3(input).slice(12).toString('hex');
}
