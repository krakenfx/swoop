import test from 'tape-catch';
import decryptSeed from '../src/decryptSeed';

test('decryptSeed', t => {
  const examples = [
    {
      encseed: new Buffer('b393b9b161a6828f1b1d664f943455af5b679304a5f4e4a6b3b609bc048d4fe4c6c3e274a84007a670a156373ac2d6128132d0a3399b053ca2adadd36209a6976d9923acbb94d1121d32e0b476804a7303d3b0507fe7bc1519827bf085ceeaba', 'hex'),
      key: new Buffer('460a1521cb4fba8c9891f3c7160727fa', 'hex'),
      seed: new Buffer('805b7b7a081f8d0837312d458580a7b19894269b3cdcb4e2cb698bb85c7c943f', 'hex'),
    },
    {
      encseed: new Buffer('6c982a05d54c3fb4ecc61140859cf5c0ff6579b126855be4c907f9baa68e436a08f4779b1e5b30e739c82052abbe31e62e4b09f64dcd0ef5bf9131847de9f6fdf8eba7dd7c36810cff1146f270728f6135f22e3e383dee686054bcd094459948', 'hex'),
      key: new Buffer('a59569f77b0975b60d5f1b43a02a8755', 'hex'),
      seed: new Buffer('b37824c01b0d359db00a0b6e6dc518871c6659d22ee76b1fe6467a3d189a6f45', 'hex'),
    },
    {
      encseed: new Buffer('0df0d17bc0409b0d407b784fc40f0a857bf1242c5597e0714279edc6d12ac2b01f9e4e5bbf3d034e7ac46f29cb25cccac5387149a1012cf99b228e75ff8ce5022b8765932e6528d12e793eaad14d7dff317c637e3d979091c6f9d116f091fc7d', 'hex'),
      key: new Buffer('aa95826f1b929689a4d0010ae909ef88', 'hex'),
      seed: new Buffer('2a1f8358cc3e2ab77600974d3d601ba086b0ae0671c24314280c70e3a1005663', 'hex'),
    },
  ];

  t.plan(Object.keys(examples).length);

  for (const example of examples) {
    const actual = decryptSeed(example.key, example.encseed).toString('hex');
    t.equal(actual, example.seed.toString('hex'));
  }
});
