import decryptSeed from './decryptSeed';
import seedToPrivateKey from './seedToPrivateKey';
import privateKeyToPublicKey from './privateKeyToPublicKey';
import publicKeyToAddress from './publicKeyToAddress';
import passwordToKey from './passwordToKey';
import assert from 'assert';

export default function loadWallet(wallet, password, quirk = false) {
  assert.equal(typeof password, 'string');

  const { encseed, ethaddr } = wallet;
  if (!encseed) { throw new Error('encseed field missing from wallet.'); }
  if (!ethaddr) { throw new Error('ethaddr field missing from wallet.'); }

  const key = passwordToKey(password);
  let seed;

  try {
    seed = decryptSeed(key, new Buffer(wallet.encseed, 'hex'));
  } catch(e) {
    throw new Error(`Failed to decrypt wallet. Bad password? ${e.message}`);
  }

  const privKey = seedToPrivateKey(seed, quirk);
  const pubKey = privateKeyToPublicKey(privKey);
  const address = publicKeyToAddress(pubKey);

  if (address !== ethaddr) {
    if (quirk) {
      throw new Error('Address from wallet seed not matching address in wallet. Bad password?');
    }
    return loadWallet(wallet, password, true);
  }

  return { privKey, pubKey, address };
}
