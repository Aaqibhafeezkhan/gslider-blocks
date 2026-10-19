import { createElement } from '@wordpress/element';

/**
 * Decorator to optionally wrap components in a container with a max-width,
 * matching Gutenberg's max-width wrapper toolbar global.
 *
 * @param {Function} Story   Story component.
 * @param {Object}   context Storybook context.
 * @return {Element} Rendered element.
 */
export const WithMaxWidthWrapper = ( Story, context ) => {
	const maxWidthWrapper = context?.globals?.maxWidthWrapper || 'none';

	if ( maxWidthWrapper === 'none' ) {
		return createElement( Story );
	}

	let width = '100%';
	let padding = '0';
	let background = 'transparent';
	let border = 'none';
	let boxShadow = 'none';

	if ( maxWidthWrapper === 'wordpress-sidebar' ) {
		width = '300px';
		padding = '16px';
		background = '#ffffff';
		border = '1px solid #e0e0e0';
		boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
	} else if ( maxWidthWrapper === 'small-container' ) {
		width = '600px';
		padding = '20px';
		background = '#ffffff';
		border = '1px solid #e0e0e0';
		boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
	} else if ( maxWidthWrapper === 'large-container' ) {
		width = '960px';
		padding = '24px';
		background = '#ffffff';
		border = '1px solid #e0e0e0';
		boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
	}

	return createElement(
		'div',
		{
			style: {
				width,
				maxWidth: '100%',
				margin: '20px auto',
				padding,
				background,
				border,
				borderRadius: '2px',
				boxShadow,
				boxSizing: 'border-box',
			},
			className:
				maxWidthWrapper === 'wordpress-sidebar'
					? 'block-editor-block-inspector components-panel'
					: undefined,
		},
		createElement( Story )
	);
};
