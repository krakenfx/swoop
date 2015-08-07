import test from 'tape-catch';
import privateKeyToPublicKey from '../src/privateKeyToPublicKey';

test('privateKeyToPublicKey', t => {
  const examples = [
    {
      priv: new Buffer('89325ec0cda3fac3dc2d9b24e7a84e78e96a24c322e94fe5cb6e33a0e3438c04', 'hex'),
      pub: new Buffer('0499891f4b603630f0746db525220e9a1ecf69160ee0e141d0b8350f9c16a901251b1b6b58d4c4cac90351863637dd86a06e62f90de036f91af1973f5e25ca5d07', 'hex'),
    },
    {
      priv: new Buffer('9fe89798dbb91be4846154c97a1cb6d7f70953117db8ad4c308e672f2a581b8f', 'hex'),
      pub: new Buffer('04e8f075d0d73c01e585a82aaee321b600451c10cfe96703da1f7207d489993924d46f4575d3dd63eaaffd96ea2af5ad91f1b4185d739a8e95bf92196c6e445ea1', 'hex'),
    },
  ];

  t.plan(Object.keys(examples).length);

  for (const example of examples) {
    const { priv, pub } = example;
    const actual = privateKeyToPublicKey(priv);
    t.equal(actual.toString('hex'), pub.toString('hex'));
  }
});
