import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const classicCardStyles = {
	postLayoutMode: 'classic',
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: true,
	postCardBorder: 'none',
	postCardBorderColor: '',
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

const ClassicCardPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<rect
			x="10"
			y="6"
			width="100"
			height="78"
			rx="6"
			fill="#ffffff"
			stroke="#cbd5e1"
			strokeWidth="1.5"
		/>
		<rect x="16" y="12" width="88" height="34" rx="4" fill="#dbeafe" />
		<rect x="20" y="16" width="22" height="6" rx="3" fill="#007cba" />
		<rect x="16" y="52" width="76" height="6" rx="3" fill="#334155" />
		<rect x="16" y="62" width="88" height="4" rx="2" fill="#94a3b8" />
		<rect x="16" y="72" width="32" height="6" rx="3" fill="#007cba" />
	</svg>
);

const presetClassicCard = {
	value: 'classic-card',
	label: __( 'Classic Card', 'gslider-blocks' ),
	description: __(
		'Standard 16:9 media top card with floating category badge and bottom-aligned CTA.',
		'gslider-blocks'
	),
	isDefault: true,
	preview: <ClassicCardPreview />,
	styles: classicCardStyles,
	attributes: Object.entries( classicCardStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetClassicCard;
