import { createElement } from '@wordpress/element';
import '@wordpress/components/build-style/style.css';
import '../../assets/admin/css/block-controls.css';

/**
 * Decorator that injects WordPress component styles and GSlider root scope
 */
export const WithGSliderStyles = (Story) =>
	createElement(
		'div',
		{ className: 'gslider-storybook-wordpress-root' },
		createElement(Story)
	);
