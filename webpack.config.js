const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
            '@Controls': path.resolve(__dirname, 'blocks-config/fb-controls/'),
            '@Components': path.resolve(__dirname, 'src/components/'),
            '@Utils': path.resolve(__dirname, 'src/utils/'),
            '@Constants': path.resolve(__dirname, 'src/constants/'),
            '@Blocks': path.resolve(__dirname, 'src/blocks/'),
            '@Store': path.resolve(__dirname, 'src/store/'),
            '@Attributes': path.resolve(__dirname, 'blocks-config/blocks-attributes/'),
		},
	},
};
