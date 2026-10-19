import { createElement } from '@wordpress/element';

/**
 * Decorator to simulate LTR / RTL text direction based on the toolbar global.
 *
 * @param {Function} Story   Story component.
 * @param {Object}   context Storybook context.
 * @return {Element} Rendered element.
 */
export const WithRTL = ( Story, context ) => {
	const direction = context?.globals?.direction || 'ltr';

	return createElement(
		'div',
		{
			dir: direction,
			className: `gslider-direction-${ direction }`,
			style: { width: '100%' },
		},
		createElement( Story )
	);
};
