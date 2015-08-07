import web3 from 'web3';
import { has } from 'lodash';
import assert from 'assert';

function toHexWithoutPrefix(value) {
  if (typeof value === 'number') { return value.toString(16); }
  return web3.toHex(value).slice(2);
}

function removeUndefinedValues(object) {
  return Object.keys(object).reduce((result, key) => {
    const value = object[key];
    if (value === undefined) { return result; }
    result[key] = value;
    return result;
  }, {});
}

export default function txToRaw(tx) {
  assert(+tx.gasPrice !== 0, 'gasPrice zero can crash rpc');
  assert(tx.to);

  if (!tx.to.match(/0x[a-z0-9]{40}/)) {
    throw new Error(`Transaction to is invalid.`);
  }

  return removeUndefinedValues({
    nonce: toHexWithoutPrefix(tx.nonce),
    gasPrice: has(tx, 'gasPrice') ? toHexWithoutPrefix(tx.gasPrice) : undefined,
    gasLimit: has(tx, 'gasLimit') ? toHexWithoutPrefix(tx.gasLimit) : undefined,
    to: tx.to,
    data: has(tx, 'data') ? toHexWithoutPrefix(tx.data) : undefined,
    value: toHexWithoutPrefix(tx.value),
  });
}
