/* global GETH_RPC_URL */
import web3, { eth } from 'web3';
import test from 'tape-catch';
import loadWallet from '../../src/loadWallet';
import overrideSendTransaction from '../../src/overrideSendTransaction';
import deposit from '../../src/deposit';

/**
 * This test requires the account in wallet.json to be funded.
 */
test('sweep wallet', t => {
  t.plan(1);

  const wallet = loadWallet(require('./wallet.json'), 'derp');

  const provider = new web3.providers.HttpProvider(GETH_RPC_URL);
  web3.setProvider(provider);

  overrideSendTransaction(web3.eth, (addr) => {
    if (`${wallet.address}` !== addr) {
      throw new Error('Sending where? ' + addr);
    }
    return wallet.privKey;
  });

  deposit(
    wallet.address,
    'XE83ETHKRAKEN3CBX0BG',
    0.1e18,
    (err, hash) => {
      if (err) { return t.fail(err.message); }

      // Example: 0xeac9aa4ba29955c413b5048de2b9805662cafeb27c3045ff2505b9d4bf0475fb
      t.equal(new Buffer(hash.slice(2), 'hex').length, 32, 'should return a transaction hash');

      console.log(`sent as ${hash}`);
    });
});
