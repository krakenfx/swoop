import test from 'tape-catch';
import deposit from '../src/deposit';

test('deposit', t => {
  t.plan(1);

  t.throws(() => {
    deposit('0x1234', 'XE83ETHBAKEN1234');
  }, /institution/i, 'should reject institution other than KRAKEN');
});
