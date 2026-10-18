import { createElement } from '@wordpress/element';

/**
 * Decorator that replicates the GSlider Gutenberg Block Inspector sidebar canvas (280-300px)
 */
export const WithGSliderSidebar = (Story) =>
	createElement(
		'div',
		{
			style: {
				width: '300px',
				maxWidth: '100%',
				margin: '20px auto',
				padding: '16px',
				background: '#ffffff',
				border: '1px solid #e0e0e0',
				borderRadius: '2px',
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
			},
			className: 'block-editor-block-inspector components-panel',
		},
		createElement(Story)
	);
