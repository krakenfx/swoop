import web3, { eth } from 'web3';

export default function deposit(from, to, amount, callback) {
  return eth.sendTransaction({
    from,
    to,
    value: amount,
  }, callback);
}
