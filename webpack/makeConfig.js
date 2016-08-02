// Idea from: https://github.com/webpack/react-starter/blob/master/make-webpack-config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var lodash = require('lodash');

module.exports = function(options) {
	options = lodash.extend({
		target: 'web',
		debug: options.debug,
		devtool: 'source-map',
		entry: {
			app: ['./src/client'],
			tests: ['./tests/index'],
			integration: ['./tests/integration/test'],
		},
		output: {
			path: './build',
			filename: '[name].js',
			pathinfo: options.debug,
			publicPath: '/'
		},
		node: {
			fs: 'empty',
			net: 'empty',
		},
		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['', '.js', '.jsx', '.json']
		},
		module: {
			loaders: [
				{ test: /\.json/, loader: "json-loader" },
				// { test: /\.css/, loader: "style-loader!css-loader" },
				{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
				// { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
				{ test: /\.jsx$/, exclude: /node_modules|bower_components/, loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'] },
				{ test: /\.js$/, exclude: /node_modules|bower_components/, loaders: ['babel-loader?stage=0&optional=runtime'] },
				{ test: /\.png/, loader: 'url-loader' },
				// { test: /\.gif/, loader: "url-loader?limit=100000&mimetype=image/gif" },
				// { test: /\.jpg/, loader: "file-loader" },
				// { test: /\.woff(2)?(\?.*)?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
				// { test: /\.(ttf|eot|svg)(\?.*)?$/, loader: "file-loader" }
			]
		},
	}, options);

	options.plugins = [
		new HtmlWebpackPlugin({
			title: 'Claim your ether pre-sale wallet',
			hash: true,
		}),
		new webpack.DefinePlugin({
			GETH_RPC_URL: `"${options.gethRpcUrl || process.env.GETH_RPC_URL}"`,
		}),
	];

  if (!options.debug) {
    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    );
  }

  return options;
};
