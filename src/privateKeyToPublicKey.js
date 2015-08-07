import BigInteger from 'bigi';
import ECKey from 'bitcoinjs-lib/src/eckey';

export default function privateKeyToPublicKey(privKey) {
  const d = BigInteger.fromBuffer(privKey);
  const Q = ECKey.curve.G.multiply(d);
  const result = Q.getEncoded(false);
  return result;
}
