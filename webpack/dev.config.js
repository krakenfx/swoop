var makeConfig = require('./makeConfig');

module.exports = makeConfig({
    debug: true,
    devtool: 'eval',
    entry: {
      app: ['./src/client'],
    },
});
