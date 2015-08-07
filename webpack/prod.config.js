var makeConfig = require('./makeConfig');

module.exports = makeConfig({
    debug: false,
    entry: {
      app: ['./src/client'],
    },
    output: {
      path: './build/prod',
      filename: '[name]-[hash].js',
      pathinfo: false,
      publicPath: '/',
    },
});
