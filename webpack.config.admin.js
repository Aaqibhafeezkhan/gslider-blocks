const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		admin: path.resolve(__dirname, 'admin/scss/admin.scss'), // ✅ Corrected path
	},
	output: {
		path: path.resolve(__dirname, 'assets/admin/css'),
		filename: '[name].js', // optional dummy JS
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
			filename: '[name].css', // outputs admin.css
		}),
	],
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
};
