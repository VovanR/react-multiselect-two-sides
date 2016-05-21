var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'./example/app.jsx'
	],
	devtool: 'eval',
	output: {
		path: './example',
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
