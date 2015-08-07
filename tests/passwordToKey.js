import test from 'tape-catch';
import passwordToKey from '../src/passwordToKey';

test('passwordToKey', t => {
  const examples = [
    ['test', '460a1521cb4fba8c9891f3c7160727fa'],
    ['', '2a18d75c980f0f5444343e4b4a9461a9'],
    ['this is a much longer password than most people will have', 'b25f8f2dab7c41a5c617173f8b060bd8'],
    ['フロンティア。', '3e3b27428192f621833959ca8073b814'],
    ['t35!?t', '6113938522df9c5953addba65e8ad358'],
    ['derp', 'a59569f77b0975b60d5f1b43a02a8755'],
    ['hello kitty', 'aa95826f1b929689a4d0010ae909ef88'],
  ];

  t.plan(Object.keys(examples).length);

  for (const example of examples) {
    const [password, expected] = example;
    const actual = passwordToKey(password).toString('hex');
    t.equal(actual, expected);
  }
});
