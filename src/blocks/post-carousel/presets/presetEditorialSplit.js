import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const editorialSplitStyles = {
	postLayoutMode: 'horizontal',
	horizontalMediaWidth: 45,
	horizontalMediaPosition: 'left',
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: false,
	postCardBorder: 'solid',
	postCardBorderDesktop: {
		top: '1',
		right: '1',
		bottom: '1',
		left: '1',
	},
	postCardBorderColor: '#e2e8f0',
	postCardBorderRadiusDesktop: {
		top: '12',
		right: '12',
		bottom: '12',
		left: '12',
	},
	postTitleNormalClassicColor: '#111c2d',
	postTitleHoverClassicColor: '#000000',
	postExcerptColor: '#45464d',
	authorNameColor: '#111c2d',
	postDateColor: '#45464d',
};

const EditorialSplitPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<rect
			x="8"
			y="12"
			width="104"
			height="66"
			rx="6"
			fill="#ffffff"
			stroke="#cbd5e1"
			strokeWidth="1.5"
		/>
		<rect x="14" y="18" width="40" height="54" rx="4" fill="#dbeafe" />
		<rect x="60" y="20" width="20" height="5" rx="2.5" fill="#007cba" />
		<rect x="60" y="30" width="44" height="6" rx="3" fill="#334155" />
		<rect x="60" y="40" width="46" height="4" rx="2" fill="#94a3b8" />
		<rect x="60" y="48" width="38" height="4" rx="2" fill="#94a3b8" />
		<rect x="60" y="60" width="28" height="6" rx="3" fill="#007cba" />
	</svg>
);

const presetEditorialSplit = {
	value: 'editorial-split',
	label: __( 'Editorial Split', 'gslider-blocks' ),
	description: __(
		'Side-by-side 2-column horizontal split with hairline border and automatic mobile stack.',
		'gslider-blocks'
	),
	preview: <EditorialSplitPreview />,
	styles: editorialSplitStyles,
	attributes: Object.entries( editorialSplitStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetEditorialSplit;
