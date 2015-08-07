import { eth } from 'web3';

export default function sendIbanTransaction(from, iban, amount, callback) {
  if (!iban.match(/^XE83ETHKRAKEN/)) {
    throw new Error('Institution must be KRAKEN');
  }

  return eth.sendIBANTransaction(from, iban, amount, callback);
}
