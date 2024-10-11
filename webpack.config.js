const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: './public',
		hot: true,
		port: 9000,
	},
	plugins: [
		new BrowserSyncPlugin(
		  {
			host: 'localhost',
			port: 9000,
			server: { baseDir: ['public'] },
		  },
		  {
			reload: true,
		  }
		),
	  ],
};
