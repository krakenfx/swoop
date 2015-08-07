var makeConfig = require('./makeConfig');

module.exports = makeConfig({
    debug: true,
    devtool: 'eval',
    hotComponents: true,
    entry: {
      app: ['./src/client'],
    },
});
