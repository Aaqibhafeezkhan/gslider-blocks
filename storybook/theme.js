import { create } from '@storybook/theming';

/**
 * GSlider Blocks Storybook Theme.
 * Modeled directly after the WordPress Gutenberg Storybook theme.
 */
export default create( {
	base: 'light',
	brandTitle: 'GSlider Blocks Design System',
	brandUrl: 'https://github.com/noruzzamans/gslider-blocks',
	brandTarget: '_blank',
	brandImage: './logo.svg',

	// Typography
	fontBase:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
	fontCode: 'monospace',

	// Brand Colors (WordPress Blue)
	colorPrimary: '#3858e9',
	colorSecondary: '#3858e9',

	// UI
	appBg: '#ffffff',
	appContentBg: '#ffffff',
	appPreviewBg: '#ffffff',
	appBorderColor: '#e0e0e0',
	appBorderRadius: 2,

	// Text Colors
	textColor: '#1e1e1e',
	textInverseColor: '#ffffff',

	// Toolbar
	barTextColor: '#757575',
	barSelectedColor: '#3858e9',
	barBg: '#ffffff',

	// Form Controls
	inputBg: '#ffffff',
	inputBorder: '#949494',
	inputTextColor: '#1e1e1e',
	inputBorderRadius: 2,
} );
