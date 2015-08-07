import test from 'tape-catch';
import txToRaw from '../src/txToRaw';

test('txToRaw rejects invalid to-addresses', t => {
  t.plan(1);

  const tx = {
    to: 'herp derp',
  };

  t.throws(() => txToRaw(tx), /to /);
});
