// From https://github.com/SilentCicero/ethereumjs-accounts/blob/master/index.js#L547
import web3 from 'web3';
import lodash from 'lodash';
import Tx from 'ethereumjs-tx';
const debug = console.log.bind(console);

const GAS_FOR_TRANSACTION = 21000;

export function sendTransactionWithKey(tx, privKey, callback) {
  debug(`transaction: ${JSON.stringify(tx, null, 4)}`);
  debug(`fetching transaction count for ${tx.from}...`);

  web3.eth.getTransactionCount(`0x${tx.from}`, (err, nonce) => {
    if (err) { return callback(err); }
    debug(`got nonce, ${nonce}`);

    debug('looking up current gas price...');
    web3.eth.getGasPrice((innerErr, gasPrice) => {
      if (innerErr) { return callback(innerErr); }

      const txValues = {
        nonce,
        value: web3.toHex(tx.value),
        to: web3.toHex(tx.to),
        gasPrice: web3.toHex(gasPrice),
        gasLimit: web3.toHex(GAS_FOR_TRANSACTION),
      };

      const txToSign = new Tx(txValues);

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
