const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const host = 'localhost';
const port = 8001;

const prod = process.argv.indexOf('-p') !== -1;


const config = {
	context: path.join(__dirname, 'src'),
	entry: {
		main: './main.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist')
	},
	module: {
		loaders: [
		{
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        },
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		},
		{
			test: /\.html$/,
			exclude: /node_modules/,
			loader: 'file?name=[name].[ext]'
		},
		]
	},
	devServer: {
		inline: true,
		host: host,
		port: port
	},
	devtool: 'source-map',
	plugins: [
		new OpenBrowserPlugin({ url: 'http://' + host + ':' + port}),
	]
}


config.plugins = config.plugins||[];
if (prod) {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"production"`
      }
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `""`
      }
  }));
}

module.exports = config;