const path = require('path')

module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /node_modules\/(?!(practical-react-components\/*)\/).*/,
				use: {
					loader: 'babel-loader',
					options: {
						rootMode: 'upward',
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}
