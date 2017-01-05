const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		main: './src/js/main'
	},
	output: {
		path: './public/js',
		filename: '[name].min.js'
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
	plugins: [ 
		new ExtractTextPlugin('../css/[name].min.css')
	],
	target: 'node'
};