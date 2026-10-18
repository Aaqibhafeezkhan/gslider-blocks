const path = require('path');

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
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		// 1. Resolve GSlider path aliases matching webpack.config.js
		config.resolve.alias = {
			...config.resolve.alias,
			'@Controls': path.resolve(__dirname, '../blocks-config/gslider-controls/'),
			'@Components': path.resolve(__dirname, '../src/components/'),
			'@Utils': path.resolve(__dirname, '../src/utils/'),
			'@Constants': path.resolve(__dirname, '../src/constants/'),
			'@Blocks': path.resolve(__dirname, '../src/blocks/'),
			'@Store': path.resolve(__dirname, '../src/store/'),
			'@Attributes': path.resolve(__dirname, '../blocks-config/blocks-attributes/'),
		};

		// 2. Add rule for SCSS stylesheets
		config.module.rules.push({
			test: /\.s[ac]ss$/i,
			exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
					},
				},
			],
			include: path.resolve(__dirname, '../'),
		});

		// 3. Add rule for JavaScript & JSX using WordPress default Babel preset
		config.module.rules.push({
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						require.resolve('@wordpress/babel-preset-default'),
					],
				},
			},
		});

		return config;
	},
};

module.exports = config;
