import attributes from './attributes';
import saveGapOr20 from './save-gap-or';

const vGapOr20 = {
	apiVersion: 3,
	attributes,
	supports: {
		html: false,
		anchor: false,
		customClassName: false,
		align: [ 'wide', 'full' ],
	},
	save: saveGapOr20,
};

export default [ vGapOr20 ];
