import test from 'tape-catch';
import seedToPrivateKey from '../src/seedToPrivateKey';

test('seedToPrivateKey', t => {
  const examples = [
    {
      seed: new Buffer('805b7b7a081f8d0837312d458580a7b19894269b3cdcb4e2cb698bb85c7c943f', 'hex'),
      priv: new Buffer('89325ec0cda3fac3dc2d9b24e7a84e78e96a24c322e94fe5cb6e33a0e3438c04', 'hex'),
      quirk: true,
    },
    {
      seed: new Buffer('b37824c01b0d359db00a0b6e6dc518871c6659d22ee76b1fe6467a3d189a6f45', 'hex'),
      priv: new Buffer('9fe89798dbb91be4846154c97a1cb6d7f70953117db8ad4c308e672f2a581b8f', 'hex'),
      quirk: true,
    },
  ];

  t.plan(Object.keys(examples).length);

  for (const example of examples) {
    const { seed, priv, quirk } = example;
    const actual = seedToPrivateKey(seed, quirk);
    t.equal(actual.toString('hex'), priv.toString('hex'));
  }
});
