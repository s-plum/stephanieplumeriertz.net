const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

var PROD = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		main: './src/js/main'
	},
	output: {
		path: './public/js',
		filename: '[name].min.js'
	},
	resolve: {
        root: [path.join(__dirname, "node_modules"), path.join(__dirname, "src/js")],
        extensions: ['', '.js', '.coffee', '.html'],
        modulesDirectories: ['node_modules']
    },
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.scss$/,
        		loader: ExtractTextPlugin.extract('css-loader?minimize!postcss-loader!sass-loader')
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
      			loader: 'babel-loader?presets[]=es2015'
			}
		]
	},
	plugins: 
	PROD ? [
		new webpack.optimize.UglifyJsPlugin({
	      compress: { warnings: false }
	    }),
		new ExtractTextPlugin('../css/[name].min.css'),
		new webpack.IgnorePlugin(/vertx/),
		new LiveReloadPlugin()
	]
	: [ 
		new ExtractTextPlugin('../css/[name].min.css'),
		new webpack.IgnorePlugin(/vertx/),
		new LiveReloadPlugin()
	],
	target: 'node'
};