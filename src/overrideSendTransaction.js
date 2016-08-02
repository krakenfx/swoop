// From https://github.com/SilentCicero/ethereumjs-accounts/blob/master/index.js#L547
import web3 from 'web3';
import lodash from 'lodash';
import Tx from 'ethereumjs-tx';
const debug = console.log.bind(console);
import txToRaw from './txToRaw';


export function sendTransactionWithKey(tx, privKey, callback) {
  debug(`transaction: ${JSON.stringify(tx, null, 4)}`);
  debug(`fetching transaction count for ${tx.from}...`);

  web3.eth.getTransactionCount(tx.from, (err, nonce) => {
    if (err) { return callback(err); }
    debug(`got nonce, ${nonce}`);

    debug('looking up current gas price...');
    web3.eth.getGasPrice((innerErr, currentGasPrice) => {
      if (innerErr) { return callback(innerErr); }

      debug(`current gas price is ${currentGasPrice}`);

      // const gasLimit = '200000';
      // const gasPrice = +currentGasPrice ? currentGasPrice : '10000';
      const gasPrice = '0x110c8f7d8de';
      const gasLimit = `0x${(22000).toString(16)}`;

      const rawTx = txToRaw({ ...tx, nonce, gasPrice, gasLimit });
      debug(`raw transaction: ${JSON.stringify(rawTx, null, 4)}`);

      const txToSign = new Tx(rawTx);
      txToSign.sign(privKey);

      const serializedTx = '0x' + txToSign.serialize().toString('hex');
      debug(`serialized transaction: ${serializedTx}`);

      web3.eth.sendRawTransaction(serializedTx, callback);
    });
  });
}

export default function overrideSendTransaction(eth, lookupPrivKey) {
  const real = eth.sendTransaction;

  eth.sendTransaction = lodash.wrap(eth.sendTransaction, (sendTransaction, tx, callback) => {
    const privKey = lookupPrivKey(tx.from);
    if (!privKey) {
      throw new Error(`Private key for ${tx.from} not found.`);
    }
    sendTransactionWithKey(tx, privKey, callback);
  });

  eth.sendTransaction.real = real;
}
