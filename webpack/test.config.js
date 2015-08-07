var makeConfig = require('./makeConfig');

module.exports = makeConfig({
    debug: true,
    devtool: 'eval',
    entry: {
      tests: ['./tests/index'],
      integration: ['./tests/integration/test'],
    },
});
