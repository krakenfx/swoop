import web3, { eth } from 'web3';

export default function deposit(from, iban, amount, callback) {
  let address;

  if (iban.length === 20) {
    if (!iban.match(/^XE..ETHKRAKEN/)) {
      throw new Error('Institution must be KRAKEN');
    }
    address = iban.slice(11);
  } else if (iban.length === 9) {
    address = iban;
  } else {
    throw new Error(`Invalid address, ${iban}.`);
  }

  return eth.sendTransaction({
    from,
    data: web3.toHex(address),
    value: amount,
  }, callback);
}
