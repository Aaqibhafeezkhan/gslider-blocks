const path = require( 'path' );
const fs = require( 'fs' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = {
	mode: 'development',
	entry: {
		'block-controls': path.resolve(
			__dirname,
			'admin/scss/block-controls.scss'
		),
		dashboard: [
			path.resolve( __dirname, 'admin/src/index.js' ),
			path.resolve( __dirname, 'admin/scss/dashboard.scss' ),
		],
	},
	output: {
		path: path.resolve( __dirname, 'assets/admin' ),
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@wordpress/babel-preset-default' ],
							plugins: [
								[
									'@babel/plugin-transform-react-jsx',
									{
										runtime: 'classic',
										pragma: 'wp.element.createElement',
										pragmaFrag: 'wp.element.Fragment',
									},
								],
							],
						},
					},
				],
			},
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
		new MiniCssExtractPlugin( {
			filename: 'css/[name].css',
		} ),
		new DependencyExtractionWebpackPlugin(),
		{
			apply: ( compiler ) => {
				compiler.hooks.afterEmit.tap(
					'CleanupDummyAssetsPlugin',
					() => {
						const dummyFiles = [
							path.resolve(
								__dirname,
								'assets/admin/js/block-controls.asset.php'
							),
						];
						dummyFiles.forEach( ( file ) => {
							if ( fs.existsSync( file ) ) {
								try {
									fs.unlinkSync( file );
								} catch ( e ) {
									// Ignore cleanup error if already removed
								}
							}
						} );
					}
				);
			},
		},
	],
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
};
