import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const modernOverlayStyles = {
	postLayoutMode: 'overlay',
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: true,
	overlayGradientScrim:
		'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
	overlayScrimHeight: 75,
	postCardBorder: 'none',
	postCardBorderRadiusDesktop: {
		top: '14',
		right: '14',
		bottom: '14',
		left: '14',
	},
	postTitleNormalClassicColor: '#ffffff',
	postTitleHoverClassicColor: '#e2e8f0',
	postExcerptColor: 'rgba(255, 255, 255, 0.88)',
	authorNameColor: '#ffffff',
	postDateColor: 'rgba(255, 255, 255, 0.8)',
};

const ModernOverlayPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<defs>
			<linearGradient
				id="gsliderPresetOverlayScrim"
				x1="60"
				y1="26"
				x2="60"
				y2="84"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
				<stop offset="100%" stopColor="#0f172a" stopOpacity="0.92" />
			</linearGradient>
		</defs>
		<rect x="10" y="6" width="100" height="78" rx="7" fill="#93c5fd" />
		<rect
			x="10"
			y="6"
			width="100"
			height="78"
			rx="7"
			fill="url(#gsliderPresetOverlayScrim)"
		/>
		<rect
			x="18"
			y="14"
			width="24"
			height="7"
			rx="3.5"
			fill="#ffffff"
			fillOpacity="0.35"
		/>
		<rect x="18" y="48" width="76" height="6" rx="3" fill="#ffffff" />
		<rect
			x="18"
			y="58"
			width="84"
			height="4"
			rx="2"
			fill="#e2e8f0"
			fillOpacity="0.85"
		/>
		<rect x="18" y="68" width="32" height="6" rx="3" fill="#38bdf8" />
	</svg>
);

const presetModernOverlay = {
	value: 'modern-overlay',
	label: __( 'Modern Overlay', 'gslider-blocks' ),
	description: __(
		'Full-bleed media background with bottom dark gradient scrim, frosted glass pills, and crisp white text.',
		'gslider-blocks'
	),
	preview: <ModernOverlayPreview />,
	styles: modernOverlayStyles,
	attributes: Object.entries( modernOverlayStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetModernOverlay;
