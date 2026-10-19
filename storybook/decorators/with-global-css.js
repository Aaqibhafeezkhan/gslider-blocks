import { createElement } from '@wordpress/element';
import '@wordpress/components/build-style/style.css';
import '../../assets/admin/css/block-controls.css';

/**
 * Decorator that injects WordPress component styles and manages global CSS contexts,
 * matching Gutenberg's with-global-css approach.
 *
 * @param {Function} Story   Story component.
 * @param {Object}   context Storybook context.
 * @return {Element} Rendered element.
 */
export const WithGlobalCSS = ( Story ) => {
	return createElement(
		'div',
		{
			className:
				'gslider-storybook-root gslider-storybook-wordpress-root wp-core-ui',
			style: {
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
			},
		},
		createElement( Story )
	);
};
