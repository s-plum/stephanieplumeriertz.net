const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		main:'./src/js/main'
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
			}
		]
	},
	plugins: [ 
		new ExtractTextPlugin('../css/[name].css')
	]
};