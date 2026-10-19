/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { SlotFillProvider, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createReduxStore, register, select } from '@wordpress/data';

// All 22 GSlider Core Inspector Components
import InspectorControl from '@Components/inspector-controls';
import SwitcherControl from '@Components/switcher-control';
import HtmlTagControl from '@Components/html-tag-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import PresetSelector from '@Components/preset-selector';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import IconPicker from '@Components/icon-picker';
import ContentOrderControl from '@Components/content-order-control';
import ImageControl from '@Components/image-control';

import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import ColorControl from '@Components/color-control';
import GradientColorControl from '@Components/gradient-color-control';
import BackgroundControl from '@Components/background-control';
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';

import InputControls from '@Components/input-control';
import UrlControl from '@Components/url-control';
import { HORIZONTAL_POSITION_ICONS, HTML_TAGS } from '@Constants';

// 1. Register core/editor Redux store mock in Storybook so ColorControl does not error
if ( typeof window !== 'undefined' && ! window.__gslider_editor_store_mocked ) {
	window.__gslider_editor_store_mocked = true;
	try {
		if ( ! select( 'core/editor' ) ) {
			const editorStore = createReduxStore( 'core/editor', {
				reducer: ( state = {} ) => state,
				selectors: {
					getEditorSettings: () => ( {
						colors: [
							{
								name: 'Primary',
								slug: 'primary',
								color: '#2563eb',
							},
							{
								name: 'Secondary',
								slug: 'secondary',
								color: '#10b981',
							},
							{ name: 'Dark', slug: 'dark', color: '#1e293b' },
							{ name: 'Light', slug: 'light', color: '#f8fafc' },
						],
					} ),
				},
			} );
			register( editorStore );
		}
	} catch ( _ ) {}
}

// 2. Ensure Google Fonts mock fallback is available for typography control
if ( typeof window !== 'undefined' && ! window.__gslider_fetch_mocked ) {
	window.__gslider_fetch_mocked = true;
	const originalFetch = window.fetch.bind( window );
	window.fetch = async ( ...args ) => {
		const url =
			typeof args[ 0 ] === 'string'
				? args[ 0 ]
				: args[ 0 ]?.url || String( args[ 0 ] );
		if ( url.includes( 'google-fonts.json' ) ) {
			try {
				const response = await originalFetch( ...args );
				if ( response.ok ) {
					return response;
				}
			} catch ( _ ) {}
			return new Response(
				JSON.stringify( {
					Default: [ 'inherit' ],
					Roboto: [ '400', '700' ],
					'Open Sans': [ '400', '600', '700' ],
					Inter: [ '400', '500', '600', '700' ],
				} ),
				{ headers: { 'Content-Type': 'application/json' } }
			);
		}
		return originalFetch( ...args );
	};
}

// 3. Ensure wp.media mock is available in Storybook for media uploads
if ( typeof window !== 'undefined' && ! window.wp?.media ) {
	window.wp = window.wp || {};
	window.wp.media = () => {
		let selectCallback = null;
		const instance = {
			state: () => ( {
				get: () => ( {
					first: () => ( {
						toJSON: () => ( {
							id: 101,
							url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
							alt: 'Sample Slider Image',
						} ),
					} ),
				} ),
			} ),
			on: ( event, cb ) => {
				if ( event === 'select' ) {
					selectCallback = cb;
				}
			},
			open: () => {
				if ( selectCallback ) {
					selectCallback();
				}
			},
		};
		return instance;
	};
}

// 4. Pre-seed fallback icons for IconPicker in Storybook
if ( typeof window !== 'undefined' && ! window.__gslider_icons_preseeded ) {
	window.__gslider_icons_preseeded = true;
	try {
		const icons = {
			'angle-left': {
				svg: {
					solid: {
						width: 384,
						height: 512,
						path: 'M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z',
					},
				},
				label: 'angle-left',
			},
			'angle-right': {
				svg: {
					solid: {
						width: 384,
						height: 512,
						path: 'M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z',
					},
				},
				label: 'angle-right',
			},
			'arrow-left': {
				svg: {
					solid: {
						width: 448,
						height: 512,
						path: 'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z',
					},
				},
				label: 'arrow-left',
			},
			'arrow-right': {
				svg: {
					solid: {
						width: 448,
						height: 512,
						path: 'M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.8 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z',
					},
				},
				label: 'arrow-right',
			},
		};
		window.localStorage.setItem(
			'gslider_svg_icons',
			JSON.stringify( icons )
		);
	} catch ( _ ) {}
}

export default {
	title: 'GSlider Compositions/FullInspectorPanel',
	component: InspectorControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'FullInspectorPanel is the benchmark composition showcase for GSlider Blocks. It integrates all 22 custom controls into an authentic WordPress Gutenberg Block Inspector Sidebar with General, Style, and Advanced tabs.',
			},
		},
	},
};

const SAMPLE_PRESETS = [
	{
		value: 'preset-classic',
		label: 'Classic',
		icon: 'align-center',
		description: 'Centered layout with neutral tones',
		isDefault: true,
	},
	{
		value: 'preset-modern',
		label: 'Modern',
		icon: 'align-left',
		description: 'Left-aligned clean design',
	},
	{
		value: 'preset-minimal',
		label: 'Minimal',
		icon: 'editor-kitchensink',
		description: 'Compact layout with slim padding',
	},
	{
		value: 'preset-bold',
		label: 'Bold Hero',
		icon: 'star-filled',
		description: 'Generous padding and high contrast',
	},
];

const SLIDE_CONTENT_ITEMS = [
	{ key: 'title', label: 'Slide Title', icon: 'editor-textcolor' },
	{ key: 'subtitle', label: 'Subtitle', icon: 'text' },
	{ key: 'description', label: 'Description', icon: 'editor-paragraph' },
	{ key: 'buttons', label: 'Action Buttons', icon: 'button' },
];

const ALIGN_OPTIONS = [
	{ label: HORIZONTAL_POSITION_ICONS.left, value: 'left' },
	{ label: HORIZONTAL_POSITION_ICONS.center, value: 'center' },
	{ label: HORIZONTAL_POSITION_ICONS.right, value: 'right' },
];

function FullInspectorSandbox() {
	// Active device for responsive controls
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );

	// ── General Tab State ─────────────────────────────────
	const [ heightSwitcher, setHeightSwitcher ] = useState( 'auto' );
	const [ titleTag, setTitleTag ] = useState( 'h2' );
	const [ alignment, setAlignment ] = useState( {
		Desktop: 'center',
		Tablet: 'center',
		Mobile: 'center',
	} );
	const [ presetStyle, setPresetStyle ] = useState( 'preset-classic' );

	const [ navigationToggle, setNavigationToggle ] = useState( {
		Desktop: true,
		Tablet: true,
		Mobile: true,
	} );
	const [ arrowIcon, setArrowIcon ] = useState( 'angle-right' );
	const [ paginationToggle, setPaginationToggle ] = useState( {
		Desktop: true,
		Tablet: true,
		Mobile: false,
	} );
	const [ autoplayToggle, setAutoplayToggle ] = useState( {
		Desktop: false,
		Tablet: false,
		Mobile: false,
	} );

	const [ contentOrder, setContentOrder ] = useState( [
		'title',
		'subtitle',
		'description',
		'buttons',
	] );

	const [ slideImageUrl, setSlideImageUrl ] = useState(
		'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop'
	);
	const [ slideImageAlt, setSlideImageAlt ] = useState( 'Slide Beach Image' );
	const [ slideImageId, setSlideImageId ] = useState( 101 );
	const [ slideImageSize, setSlideImageSize ] = useState( 'full' );

	// ── Style Tab State ───────────────────────────────────
	const [ paddingDesktop, setPaddingDesktop ] = useState( {
		top: '30',
		right: '30',
		bottom: '30',
		left: '30',
	} );
	const [ paddingTablet, setPaddingTablet ] = useState( {
		top: '20',
		right: '20',
		bottom: '20',
		left: '20',
	} );
	const [ paddingMobile, setPaddingMobile ] = useState( {
		top: '15',
		right: '15',
		bottom: '15',
		left: '15',
	} );
	const [ paddingLink, setPaddingLink ] = useState( true );
	const [ paddingUnits, setPaddingUnits ] = useState( {
		Desktop: 'px',
		Tablet: 'px',
		Mobile: 'px',
	} );

	const [ fontFamily, setFontFamily ] = useState( 'Default' );
	const [ fontSize, setFontSize ] = useState( {
		Desktop: '32',
		Tablet: '26',
		Mobile: '20',
	} );
	const [ fontWeight, setFontWeight ] = useState( '700' );

	const [ textColor, setTextColor ] = useState( '#1e293b' );
	const [ customGradientSwitcher, setCustomGradientSwitcher ] =
		useState( false );
	const [ customGradientValue, setCustomGradientValue ] = useState( '' );
	const [ gradientColor, setGradientColor ] = useState(
		'linear-gradient(135deg,rgb(37,99,235) 0%,rgb(16,185,129) 100%)'
	);

	const [ normalBgType, setNormalBgType ] = useState( 'classic' );
	const [ normalBgColor, setNormalBgColor ] = useState( '#ffffff' );
	const [ bgImageUrl, setBgImageUrl ] = useState( '' );
	const [ bgImageAlt, setBgImageAlt ] = useState( '' );
	const [ bgImageId, setBgImageId ] = useState( '' );
	const [ bgPosition, setBgPosition ] = useState( {
		Desktop: { x: 0.5, y: 0.5 },
		Tablet: { x: 0.5, y: 0.5 },
		Mobile: { x: 0.5, y: 0.5 },
	} );
	const [ bgAttachment, setBgAttachment ] = useState( {
		Desktop: 'scroll',
		Tablet: 'scroll',
		Mobile: 'scroll',
	} );
	const [ bgRepeat, setBgRepeat ] = useState( {
		Desktop: 'no-repeat',
		Tablet: 'no-repeat',
		Mobile: 'no-repeat',
	} );
	const [ bgSize, setBgSize ] = useState( {
		Desktop: 'cover',
		Tablet: 'cover',
		Mobile: 'cover',
	} );

	const [ boxShadow, setBoxShadow ] = useState( [
		0,
		4,
		12,
		0,
		'',
		'rgba(0,0,0,0.08)',
	] );

	// ── Advanced Tab State ────────────────────────────────
	const [ zIndex, setZIndex ] = useState( '1' );
	const [ customClass, setCustomClass ] = useState( 'my-custom-slider' );
	const [ htmlAnchor, setHtmlAnchor ] = useState( 'hero-slider' );
	const [ slideUrl, setSlideUrl ] = useState( 'https://example.com' );
	const [ urlOpenInNewTab, setUrlOpenInNewTab ] = useState( false );
	const [ urlNofollow, setUrlNofollow ] = useState( false );
	const [ urlSponsored, setUrlSponsored ] = useState( false );

	// ── General Controls Assembly ─────────────────────────
	const generalControls = (
		<>
			<PanelBody title="Slider Layout" initialOpen={ true }>
				<SwitcherControl
					label="Layout Height"
					value={ heightSwitcher }
					options={ [
						{ label: 'Auto', value: 'auto' },
						{ label: 'Fixed', value: 'fixed' },
					] }
					onChange={ setHeightSwitcher }
					help="Choose adaptive auto-height or fixed height."
				/>
				<HtmlTagControl
					label="Title HTML Tag"
					value={ titleTag }
					options={ HTML_TAGS }
					onChange={ setTitleTag }
				/>
				<ResponsiveAlignmentControl
					label="Content Alignment"
					deviceType={ deviceType }
					alignmentValue={ alignment }
					setAlignmentValue={ setAlignment }
					options={ ALIGN_OPTIONS }
				/>
				<PresetSelector
					label="Layout Preset"
					value={ presetStyle }
					presets={ SAMPLE_PRESETS }
					onChange={ setPresetStyle }
				/>
			</PanelBody>

			<PanelBody title="Navigation & Controls" initialOpen={ false }>
				<ResponsiveToggleControl
					label="Navigation Arrows"
					deviceType={ deviceType }
					toggleValue={ navigationToggle }
					setToggleValue={ setNavigationToggle }
				/>
				<IconPicker
					label="Navigation Arrow Icon"
					value={ arrowIcon }
					setIconHandler={ setArrowIcon }
				/>
				<ResponsiveToggleControl
					label="Pagination Dots"
					deviceType={ deviceType }
					toggleValue={ paginationToggle }
					setToggleValue={ setPaginationToggle }
				/>
				<ResponsiveToggleControl
					label="Autoplay"
					deviceType={ deviceType }
					toggleValue={ autoplayToggle }
					setToggleValue={ setAutoplayToggle }
				/>
			</PanelBody>

			<PanelBody title="Slide Content Order" initialOpen={ false }>
				<ContentOrderControl
					label="Content Hierarchy"
					items={ SLIDE_CONTENT_ITEMS }
					order={ contentOrder }
					onChange={ setContentOrder }
					help="Drag items to rearrange stacking order."
				/>
			</PanelBody>

			<PanelBody title="Slide Media Image" initialOpen={ false }>
				<ImageControl
					label="Active Slide Image"
					imageUrl={ slideImageUrl }
					setImageUrl={ setSlideImageUrl }
					imageAlt={ slideImageAlt }
					setImageAlt={ setSlideImageAlt }
					imageID={ slideImageId }
					setImageID={ setSlideImageId }
					imageSize={ slideImageSize }
					setImageSize={ setSlideImageSize }
					isImageSize={ true }
				/>
			</PanelBody>
		</>
	);

	// ── Style Controls Assembly ───────────────────────────
	const styleControls = (
		<>
			<PanelBody title="Spacing & Dimensions" initialOpen={ true }>
				<ResponsiveSpacingControl
					label="Container Padding"
					deviceType={ deviceType }
					isLinked={ paddingLink }
					units={ paddingUnits }
					desktopSpacing={ paddingDesktop }
					tabletSpacing={ paddingTablet }
					mobileSpacing={ paddingMobile }
					onDeviceChange={ setDeviceType }
					onLinkChange={ setPaddingLink }
					onUnitChange={ setPaddingUnits }
					onDesktopChange={ setPaddingDesktop }
					onTabletChange={ setPaddingTablet }
					onMobileChange={ setPaddingMobile }
				/>
			</PanelBody>

			<PanelBody title="Title Typography" initialOpen={ false }>
				<ResponsiveTypographyControl
					label="Title Typography"
					deviceType={ deviceType }
					fontFamily={ fontFamily }
					fontSize={ fontSize }
					fontWeight={ fontWeight }
					onDeviceChange={ setDeviceType }
					onFontFamilyChange={ setFontFamily }
					onFontSizeChange={ setFontSize }
					onFontWeightChange={ setFontWeight }
				/>
			</PanelBody>

			<PanelBody title="Colors & Gradients" initialOpen={ false }>
				<ColorControl
					label="Text Color"
					color={ textColor }
					onChangeColor={ setTextColor }
				/>
				<GradientColorControl
					label="Slide Gradient Overlay"
					globalCustomGradientSwitcher={ customGradientSwitcher }
					globalCustomGradientInputValue={ customGradientValue }
					globalGradientColor={ gradientColor }
					setGlobalCustomGradientSwitcher={
						setCustomGradientSwitcher
					}
					setGlobalCustomGradientInputValue={ setCustomGradientValue }
					setGlobalGradientColor={ setGradientColor }
				/>
			</PanelBody>

			<PanelBody title="Multi-layer Background" initialOpen={ false }>
				<BackgroundControl
					label="Slide Background"
					deviceType={ deviceType }
					normalBackgroundType={ normalBgType }
					setNormalBackgroundType={ setNormalBgType }
					normalClassicColor={ normalBgColor }
					setNormalClassicColor={ setNormalBgColor }
					isBackgroundImage={ true }
					isHover={ false }
				/>
			</PanelBody>

			<PanelBody
				title="Responsive Background Image"
				initialOpen={ false }
			>
				<ResponsiveBackgroundImageControl
					label="Responsive Backdrop"
					deviceType={ deviceType }
					globalBackgroundImageUrl={ bgImageUrl }
					setGlobalBackgroundImageUrl={ setBgImageUrl }
					globalBackgroundImageAlt={ bgImageAlt }
					setGlobalBackgroundImageAlt={ setBgImageAlt }
					globalBackgroundImageID={ bgImageId }
					setGlobalBackgroundImageID={ setBgImageId }
					globalBackgroundImagePosition={ bgPosition }
					setGlobalBackgroundImagePosition={ setBgPosition }
					globalBackgroundImageAttachment={ bgAttachment }
					setGlobalBackgroundImageAttachment={ setBgAttachment }
					globalBackgroundImageRepeat={ bgRepeat }
					setGlobalBackgroundImageRepeat={ setBgRepeat }
					globalBackgroundImageSize={ bgSize }
					setGlobalBackgroundImageSize={ setBgSize }
					setAttributes={ () => {} }
				/>
			</PanelBody>

			<PanelBody title="Box Shadow" initialOpen={ false }>
				<BoxShadowSettingsControl
					label="Slide Shadow"
					initialShadowValue={ boxShadow }
					onBoxShadowChange={ setBoxShadow }
				/>
			</PanelBody>
		</>
	);

	// ── Advanced Controls Assembly ────────────────────────
	const advancedControls = (
		<>
			<PanelBody title="Layout & Positioning" initialOpen={ true }>
				<InputControls
					label="Z-Index"
					value={ zIndex }
					onChangeValue={ setZIndex }
					helpText="Stacking order of the slider container."
				/>
				<InputControls
					label="Additional CSS Class(es)"
					value={ customClass }
					onChangeValue={ setCustomClass }
					helpText="Separate multiple classes with spaces."
				/>
				<InputControls
					label="HTML Anchor"
					value={ htmlAnchor }
					onChangeValue={ setHtmlAnchor }
					helpText="Enter a word or two without spaces to create a unique anchor link."
				/>
			</PanelBody>

			<PanelBody title="Action Link Settings" initialOpen={ false }>
				<UrlControl
					label="Destination Link"
					url={ slideUrl }
					openInNewTab={ urlOpenInNewTab }
					nofollow={ urlNofollow }
					sponsored={ urlSponsored }
					onChangeUrl={ setSlideUrl }
					onChangeOpenInNewTab={ setUrlOpenInNewTab }
					onChangeNofollow={ setUrlNofollow }
					onChangeSponsored={ setUrlSponsored }
				/>
			</PanelBody>
		</>
	);

	return (
		<SlotFillProvider>
			<InspectorControl
				generalControls={ generalControls }
				styleControls={ styleControls }
				advancedControls={ advancedControls }
			/>
			<InspectorControls.Slot />
		</SlotFillProvider>
	);
}

export const Default = {
	render: function Render() {
		return <FullInspectorSandbox />;
	},
};
