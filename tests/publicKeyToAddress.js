import test from 'tape-catch';
import publicKeyToAddress from '../src/publicKeyToAddress';

test('publicKeyToAddress', t => {
  const examples = [
    {
      pub: new Buffer('0499891f4b603630f0746db525220e9a1ecf69160ee0e141d0b8350f9c16a901251b1b6b58d4c4cac90351863637dd86a06e62f90de036f91af1973f5e25ca5d07', 'hex'),
      addr: 'eed700c57d04f8bd850c4fa2d7338ba89b0bb8c0',
    },
    {
      pub: new Buffer('04e8f075d0d73c01e585a82aaee321b600451c10cfe96703da1f7207d489993924d46f4575d3dd63eaaffd96ea2af5ad91f1b4185d739a8e95bf92196c6e445ea1', 'hex'),
      addr: '588b34c4337729266426e914469f3c7246240545',
    },
  ];

  t.plan(Object.keys(examples).length);

  for (const example of examples) {
    const { pub, addr } = example;
    const actual = publicKeyToAddress(pub);
    t.equal(actual, addr);
  }
});
