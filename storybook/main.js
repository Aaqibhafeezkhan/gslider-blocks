const path = require( 'path' );

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: [
		'./stories/**/*.mdx',
		'./stories/**/*.story.@(js|jsx|mjs|ts|tsx)',
		'./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: [
		{ from: '../assets', to: 'assets' },
		path.resolve( __dirname, './static' ),
	],
	webpackFinal: async ( webpackConfig ) => {
		const pkgDir = ( name ) =>
			path.dirname( require.resolve( `${ name }/package.json` ) );

		// 1. Resolve GSlider path aliases matching webpack.config.js & Storybook mocks
		webpackConfig.resolve.alias = {
			...webpackConfig.resolve.alias,
			react: pkgDir( 'react' ),
			'react-dom': pkgDir( 'react-dom' ),
			'@wordpress/block-editor$': path.resolve(
				__dirname,
				'./mocks/block-editor.js'
			),
			'__real_wordpress_block_editor$': path.join(
				pkgDir( '@wordpress/block-editor' ),
				'build-module/index.mjs'
			),
			'@wordpress/components$': path.join(
				pkgDir( '@wordpress/components' ),
				'build-module/index.mjs'
			),
			'@Components': path.resolve( __dirname, '../src/components/' ),
			'@Utils': path.resolve( __dirname, '../src/utils/' ),
			'@Constants': path.resolve( __dirname, '../src/constants/' ),
			'@Blocks': path.resolve( __dirname, '../src/blocks/' ),
			'@Store': path.resolve( __dirname, '../src/store/' ),
		};

		// 2. Add rule for SCSS stylesheets
		webpackConfig.module.rules.push( {
			test: /\.s[ac]ss$/i,
			exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require( 'sass' ),
					},
				},
			],
			include: path.resolve( __dirname, '../' ),
		} );

		// 3. Add rule for JavaScript & JSX using WordPress default Babel preset
		webpackConfig.module.rules.push( {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						require.resolve( '@wordpress/babel-preset-default' ),
					],
				},
			},
		} );

		return webpackConfig;
	},
};

module.exports = config;
