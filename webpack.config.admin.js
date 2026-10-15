const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: {
		admin: path.resolve(__dirname, 'admin/scss/admin.scss'),
		'block-controls': path.resolve(__dirname, 'admin/scss/block-controls.scss'),
	},
	output: {
		path: path.resolve(__dirname, 'assets/admin'),
		filename: 'js/[name].js', // JS files go to js folder
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css', // CSS files go to css folder
		}),
	],
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
};
