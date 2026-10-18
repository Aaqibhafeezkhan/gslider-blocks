import { WithGSliderStyles } from './decorators/with-gslider-styles';
import { WithGSliderSidebar } from './decorators/with-gslider-sidebar';

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
	},
	decorators: [
		WithGSliderStyles,
		WithGSliderSidebar,
	],
};

export default preview;
