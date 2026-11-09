/* eslint-disable import/no-unresolved */
import { queryAttributes } from '@Components/query-settings-panel/query-attributes';
import { animationAttributes } from '@Components/animation-control/animation-attributes';

const attributes = {
	blockId: {
		type: 'string',
		default: '',
	},
	deviceType: {
		type: 'string',
		default: 'Desktop',
	},
	blockStyle: {
		type: 'string',
		default: '',
	},

	/** Start Carousel Settings */
	carouselPerColumn: {
		type: 'object',
		default: {
			Desktop: 3,
			Tablet: 2,
			Mobile: 1,
		},
	},
	carouselPerColumnGap: {
		type: 'object',
		default: {
			Desktop: 10,
			Tablet: 10,
			Mobile: 10,
		},
	},
	speed: {
		type: 'object',
		default: {
			Desktop: 800,
			Tablet: 800,
			Mobile: 800,
		},
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
	enableLazyLoad: {
		type: 'boolean',
		default: false,
	},
	autoplayDelay: {
		type: 'object',
		default: {
			Desktop: 1000,
			Tablet: 1000,
			Mobile: 1000,
		},
	},
	infiniteLoop: {
		type: 'boolean',
		default: true,
	},
	allowTouchMove: {
		type: 'boolean',
		default: true,
	},
	pauseOnHover: {
		type: 'boolean',
		default: false,
	},
	stopOnLastSlide: {
		type: 'boolean',
		default: false,
	},
	reverseDirection: {
		type: 'boolean',
		default: false,
	},
	carouselEffect: {
		type: 'string',
		default: 'slide',
	},
	mousewheelControl: {
		type: 'boolean',
		default: false,
	},
	keyboardNavigation: {
		type: 'boolean',
		default: false,
	},
	paginationType: {
		type: 'string',
		default: 'bullets',
	},
	dynamicBullets: {
		type: 'boolean',
		default: false,
	},
	/** End Carousel Settings */

	/** Start Show/Hide Elements */
	paginationPositionType: {
		type: 'string',
		default: 'outside',
	},
	showNavigation: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showPagination: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	/** End Show/Hide Elements */

	/** Layout & Content Setting */
	layoutHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	layoutHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	verticalAlign: {
		type: 'object',
		default: {
			Desktop: 'center',
			Tablet: 'center',
			Mobile: 'center',
		},
	},
	/** End Layout & Content Setting */

	/** Content Order */
	contentOrder: {
		type: 'array',
		default: [
			'thumbnail',
			'categories',
			'title',
			'excerpt',
			'meta',
			'readmore',
		],
	},
	postTaxonomyDisplay: {
		type: 'string',
		default: 'category',
	},
	enableTaxonomyBadgeOverlay: {
		type: 'boolean',
		default: true,
	},
	taxonomyBadgeOverlayPosition: {
		type: 'string',
		default: 'top-left',
	},
	taxonomyBadgeOverlayVisibility: {
		type: 'string',
		default: 'always',
	},
	taxonomyBadgeOverlayTopOffset: {
		type: 'object',
		default: {
			Desktop: '15',
			Tablet: '15',
			Mobile: '12',
		},
	},
	taxonomyBadgeOverlayTopOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	taxonomyBadgeOverlayLeftOffset: {
		type: 'object',
		default: {
			Desktop: '15',
			Tablet: '15',
			Mobile: '12',
		},
	},
	taxonomyBadgeOverlayLeftOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Content Order */

	/** Query Attributes */
	...queryAttributes,
	useRelatedPostsQuery: {
		type: 'boolean',
		default: false,
	},
	relatedPostsTaxonomy: {
		type: 'string',
		default: 'category',
	},
	/** End Query Attributes */

	/** Start Navigation Custom Arrows */
	navigationArrowsIconSwitcher: {
		type: 'boolean',
		default: false,
	},

	navigationArrowsIconLeftAlign: {
		type: 'string',
		default: 'icon',
	},

	navigationArrowsIconLeft: {
		type: 'string',
		default: 'arrow-left',
	},

	navigationArrowsIconLeftHtml: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconLeftImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconLeftImageAlt: {
		type: 'string',
		default: 'Left Arrow',
	},
	navigationArrowsIconLeftImageID: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconRightAlign: {
		type: 'string',
		default: 'icon',
	},

	navigationArrowsIconRight: {
		type: 'string',
		default: 'arrow-right',
	},

	navigationArrowsIconRightHtml: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconRightImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconRightImageAlt: {
		type: 'string',
		default: 'Right Arrow',
	},
	navigationArrowsIconRightImageID: {
		type: 'string',
		default: '',
	},
	/** End Navigation Custom Arrows */

	/** Start Navigation Arrow Size */
	navigationArrowSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '14',
		},
	},
	navigationArrowSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Size */

	/** Start Navigation Arrow Color */
	navigationArrowColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowColor: {
		type: 'string',
		default: '#333333',
	},
	navigationArrowColorHover: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Color */

	/** Start Navigation Arrow Background */
	navigationArrowNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	navigationArrowNormalClassicColor: {
		type: 'string',
		default: '#d2d2d2c7',
	},
	navigationArrowNormalGradientColor: {
		type: 'string',
		default: null,
	},
	navigationArrowNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	navigationArrowNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	navigationArrowHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	navigationArrowHoverClassicColor: {
		type: 'string',
		default: '#787878b8',
	},
	navigationArrowHoverGradientColor: {
		type: 'string',
		default: null,
	},
	navigationArrowHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	navigationArrowHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Background */

	/** Start Navigation Arrow Width & Height */
	navigationArrowWidth: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '32',
		},
	},
	navigationArrowWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowHeight: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '32',
		},
	},
	navigationArrowHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Width & Height */

	/** Start Navigation Arrow Border */
	navigationArrowBorder: {
		type: 'string',
		default: 'none',
	},
	navigationArrowBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowBorderColor: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderHoverColor: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Navigation Arrow Border */

	/** Start Navigation Arrow Border Radius */
	navigationArrowBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowTabletBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowMobileBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Navigation Arrow Border Radius */

	/** Start Navigation Arrow Box Shadow */
	navigationArrowBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowBoxShadowValues: {
		type: 'array',
		default: [],
	},
	navigationArrowBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	navigationArrowBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	navigationArrowBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Box Shadow */

	/** Start Navigation Arrow Position */
	navigationArrowPositionType: {
		type: 'string',
		default: 'outside',
	},

	navigationArrowPosition: {
		type: 'string',
		default: 'center',
	},
	navigationArrowDirection: {
		type: 'string',
		default: 'row',
	},
	navigationArrowPositionTopOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionTopOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionLeftOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionLeftOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionRightOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionRightOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionBottomOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionBottomOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowGap: {
		type: 'object',
		default: {
			Desktop: '10',
			Tablet: '10',
			Mobile: '10',
		},
	},
	navigationArrowGapUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowPositionOutsidePadding: {
		type: 'object',
		default: {
			Desktop: '30',
			Tablet: '30',
			Mobile: '30',
		},
	},
	navigationArrowPositionOutsidePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Position */

	/** Start Pagination Dots Margin */
	paginationDotsMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationDotsDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Margin */

	/** Start Pagination Dots Position */
	paginationDotsPosition: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationDotsPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	paginationProgressbarPosition: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationProgressbarPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End Pagination Dots Position */

	/** Start Pagination Outside Offset */
	paginationOutsideOffset: {
		type: 'object',
		default: {
			Desktop: '30',
			Tablet: '30',
			Mobile: '30',
		},
	},
	paginationOutsideOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Pagination Outside Offset */

	/** Start Pagination Dots Style */
	paginationDotsSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationNormalDotsBgColor: {
		type: 'string',
		default: '#333333',
	},
	paginationActiveDotsBgColor: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Pagination Dots Style */

	/** Start Pagination Dots Border */
	paginationNormalDotsBorder: {
		type: 'string',
		default: 'none',
	},
	paginationNormalDotsBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationNormalDotsBorderColor: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsBorderHoverColor: {
		type: 'string',
	},

	paginationNormalDotsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Border */

	/** Start Pagination Dots Border Radius */
	paginationNormalDotsBorderRadius: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsTabletBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsMobileBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Border Radius */

	/** Start Active Pagination Dots Width & Height */
	paginationActiveDotsWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationActiveDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationActiveDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Active Pagination Dots Width & Height */

	/** Start Active Pagination Dots Border */
	paginationActiveDotsBorder: {
		type: 'string',
		default: 'none',
	},
	paginationActiveDotsBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationActiveDotsBorderColor: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderHoverColor: {
		type: 'string',
	},

	paginationActiveDotsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Active Pagination Dots Border */

	/** Start Active Pagination Dots Border Radius */
	paginationActiveDotsBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsTabletBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsMobileBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Active Pagination Dots Border Radius */

	/** Start Fraction Typography */
	paginationFractionFontFamily: {
		type: 'string',
		default: '',
	},
	paginationFractionFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionFontWeight: {
		type: 'string',
		default: '',
	},
	paginationFractionFontStyle: {
		type: 'string',
		default: '',
	},
	paginationFractionTextTransform: {
		type: 'string',
		default: '',
	},
	paginationFractionTextDecoration: {
		type: 'string',
		default: '',
	},
	paginationFractionLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Fraction Typography */

	/** Start Fraction Color */
	paginationFractionColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationFractionColor: {
		type: 'string',
		default: '',
	},
	paginationFractionColorHover: {
		type: 'string',
		default: '',
	},
	/** End Fraction Color */

	/** Start Progressbar */
	paginationProgressbarBGColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationProgressbarBGColor: {
		type: 'string',
		default: '',
	},
	paginationProgressbarBGActiveColor: {
		type: 'string',
	},
	paginationProgressbarHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationProgressbarHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Progressbar */

	/** Start Global Setting */

	/** Start Global Margin */
	globalMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalMarginDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Global Margin */

	/** Start Global Padding */
	globalPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Global Padding */

	/** Start Global Z-Index */
	globalZIndex: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalID: {
		type: 'string',
		default: '',
	},
	globalClass: {
		type: 'string',
		default: '',
	},
	/** End Global Z-Index */

	/** Start Global Background */
	globalNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	globalNormalClassicColor: {
		type: 'string',
		default: '',
	},
	globalNormalGradientColor: {
		type: 'string',
		default: null,
	},
	globalNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	globalNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	globalNormalBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalNormalBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	globalNormalBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	globalNormalBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	globalNormalBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},

	globalHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	globalHoverClassicColor: {
		type: 'string',
		default: '',
	},
	globalHoverGradientColor: {
		type: 'string',
		default: null,
	},
	globalHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	globalHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	globalHoverBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalHoverBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	globalHoverBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	globalHoverBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	globalHoverBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},
	/** End Global Background */

	/** Start Global Border */
	globalBorder: {
		type: 'string',
		default: 'none',
	},
	globalBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	globalBorderColor: {
		type: 'string',
	},
	globalBorderHoverColor: {
		type: 'string',
	},
	globalBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderLink: {
		type: 'boolean',
		default: true,
	},
	globalBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	globalBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	globalBoxShadowValues: {
		type: 'array',
		default: [],
	},
	globalBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	globalBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	globalBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Global Border */

	/** Start Global Custom CSS */
	globalCustomCSS: {
		type: 'string',
		default: '',
	},
	/** End Global Custom CSS */

	/** Start Post Card Margin */
	postCardMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCardMarginDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardMarginDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCardMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardMarginTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCardMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardMarginMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCardMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Card Margin */

	/** Start Post Card Padding */
	postCardPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCardPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCardPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCardPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCardPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Card Padding */

	/** Start Post Card Background */
	postCardNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postCardNormalClassicColor: {
		type: 'string',
		default: '',
	},
	postCardNormalGradientColor: {
		type: 'string',
		default: null,
	},
	postCardNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postCardNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Post Card Background */

	/** Start Post Card Hover Background */
	postCardHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postCardHoverClassicColor: {
		type: 'string',
		default: '',
	},
	postCardHoverGradientColor: {
		type: 'string',
		default: null,
	},
	postCardHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postCardHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Post Card Hover Background */

	/** Start Post Card Border */
	postCardBorder: {
		type: 'string',
		default: 'none',
	},
	postCardBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postCardBorderColor: {
		type: 'string',
	},
	postCardBorderHoverColor: {
		type: 'string',
	},
	postCardBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCardBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderLink: {
		type: 'boolean',
		default: true,
	},
	postCardBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCardBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCardBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCardBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	postCardBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postCardBoxShadowValues: {
		type: 'array',
		default: [],
	},
	postCardBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	postCardBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	postCardBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Post Card Border */

	/** Start Image Settings */
	showFeaturedImage: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	imageMaxWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageMaxWidthUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	imageHeight: {
		type: 'object',
		default: {
			Desktop: '200',
			Tablet: '',
			Mobile: '',
		},
	},
	imageHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageObjectFit: {
		type: 'string',
		default: 'cover',
	},
	imageObjectPosition: {
		type: 'string',
		default: 'center',
	},

	/** Start image Padding */
	imagePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imagePaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Padding */

	/** Start image Margin */
	imageMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageMarginDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageMarginDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageMarginTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageMarginMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Margin */

	/** Start image Background */
	imageNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageNormalClassicColor: {
		type: 'string',
		default: '',
	},
	imageNormalGradientColor: {
		type: 'string',
		default: null,
	},
	imageNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},

	imageHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageHoverClassicColor: {
		type: 'string',
		default: '',
	},
	imageHoverGradientColor: {
		type: 'string',
		default: null,
	},
	imageHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End image Background */

	/** Start image Border */
	imageBorder: {
		type: 'string',
		default: 'none',
	},
	imageBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageBorderColor: {
		type: 'string',
		default: '',
	},
	imageBorderHoverColor: {
		type: 'string',
		default: '',
	},
	imageBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Border */

	/** Start image Border Radius */
	imageBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Border Radius */

	/** Start image Box Shadow */
	imageBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageBoxShadowValues: {
		type: 'array',
		default: [],
	},
	imageBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	imageBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	imageBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End image Box Shadow */

	/** Start Image Hover Settings */
	imageHoverEffect: {
		type: 'string',
		default: 'none',
	},
	imageHoverOpacity: {
		type: 'object',
		default: {
			Desktop: 0.8,
			Tablet: 0.8,
			Mobile: 0.8,
		},
	},
	imageHoverScale: {
		type: 'object',
		default: {
			Desktop: 1.05,
			Tablet: 1.05,
			Mobile: 1.05,
		},
	},
	imageHoverLift: {
		type: 'object',
		default: {
			Desktop: 10,
			Tablet: 10,
			Mobile: 10,
		},
	},
	imageHoverLiftUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTransitionDuration: {
		type: 'object',
		default: {
			Desktop: 300,
			Tablet: 300,
			Mobile: 300,
		},
	},
	imageHoverBlur: {
		type: 'object',
		default: {
			Desktop: 4,
			Tablet: 4,
			Mobile: 4,
		},
	},
	imageHoverRotate: {
		type: 'object',
		default: {
			Desktop: 3,
			Tablet: 3,
			Mobile: 3,
		},
	},
	imageHoverGrayscale: {
		type: 'object',
		default: {
			Desktop: 100,
			Tablet: 100,
			Mobile: 100,
		},
	},
	imageHoverPan: {
		type: 'object',
		default: {
			Desktop: 5,
			Tablet: 5,
			Mobile: 5,
		},
	},
	/** End Image Hover Settings */

	/** Start Post Title Alignment & Heading Tag */
	showPostTitle: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	postTitleAlign: {
		type: 'object',
		default: {
			Desktop: 'left',
			Tablet: 'left',
			Mobile: 'left',
		},
	},
	postTitleHtmlTag: {
		type: 'string',
		default: 'h3',
	},

	/** Start Post Title Typography */
	postTitleFontFamily: {
		type: 'string',
		default: '',
	},
	postTitleFontSize: {
		type: 'object',
		default: {
			Desktop: '18',
			Tablet: '18',
			Mobile: '18',
		},
	},
	postTitleFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleFontWeight: {
		type: 'string',
		default: '600',
	},
	postTitleFontStyle: {
		type: 'string',
		default: '',
	},
	postTitleTextTransform: {
		type: 'string',
		default: '',
	},
	postTitleTextDecoration: {
		type: 'string',
		default: '',
	},
	postTitleLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTitleLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTitleLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTitleWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Title Typography */

	/** Start Post Title Color */
	postTitleNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postTitleNormalClassicColor: {
		type: 'string',
		default: '',
	},
	postTitleNormalGradientColor: {
		type: 'string',
		default: null,
	},
	postTitleNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postTitleNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	postTitleHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postTitleHoverClassicColor: {
		type: 'string',
		default: '',
	},
	postTitleHoverGradientColor: {
		type: 'string',
		default: null,
	},
	postTitleHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postTitleHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Post Title Color */

	/** Start Post Title Margin */
	postTitleMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '8',
			left: '0',
			right: '0',
		},
	},
	postTitleDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTitleTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTitleTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTitleMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTitleMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTitleMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Title Margin */

	/** Start Post Title Padding */
	postTitlePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTitleDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTitleTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTitleTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTitleMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTitleMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTitlePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Title Padding */

	/** Start Post Title Settings */
	enablePostTitleLimit: {
		type: 'boolean',
		default: false,
	},
	postTitleLimitType: {
		type: 'string',
		default: 'words',
	},
	postTitleLimit: {
		type: 'object',
		default: {
			Desktop: '10',
			Tablet: '10',
			Mobile: '10',
		},
	},
	postTitleLimitSuffix: {
		type: 'string',
		default: '...',
	},
	enablePostTitleLink: {
		type: 'boolean',
		default: true,
	},
	postTitleLinkTarget: {
		type: 'boolean',
		default: false,
	},
	postTitleLinkNofollow: {
		type: 'boolean',
		default: false,
	},
	postTitleLinkSponsored: {
		type: 'boolean',
		default: false,
	},
	enablePostTitleHoverUnderlineAnim: {
		type: 'boolean',
		default: false,
	},
	postTitleHoverUnderlineColor: {
		type: 'string',
		default: '',
	},
	postTitleHoverUnderlineHeight: {
		type: 'object',
		default: {
			Desktop: '2',
			Tablet: '2',
			Mobile: '2',
		},
	},
	postTitleHoverUnderlineBottomOffset: {
		type: 'object',
		default: {
			Desktop: '-2',
			Tablet: '-2',
			Mobile: '-2',
		},
	},
	postTitleHoverUnderlineTransitionSpeed: {
		type: 'object',
		default: {
			Desktop: '0.3',
			Tablet: '0.3',
			Mobile: '0.3',
		},
	},
	showPostTitleDivider: {
		type: 'boolean',
		default: false,
	},
	postTitleDividerStyle: {
		type: 'string',
		default: 'solid',
	},
	postTitleDividerColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postTitleDividerColor: {
		type: 'string',
		default: '#333333',
	},
	postTitleDividerHoverColor: {
		type: 'string',
		default: '',
	},
	postTitleDividerWidth: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	postTitleDividerWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTitleDividerHeight: {
		type: 'object',
		default: {
			Desktop: '2',
			Tablet: '2',
			Mobile: '2',
		},
	},
	postTitleDividerHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	enablePostTitleDividerHoverExpand: {
		type: 'boolean',
		default: false,
	},
	/** End Post Title Settings */

	/** Start Post Excerpt Styling */
	showExcerpt: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	postExcerptAlign: {
		type: 'object',
		default: {
			Desktop: 'left',
			Tablet: 'left',
			Mobile: 'left',
		},
	},
	postExcerptHtmlTag: {
		type: 'string',
		default: 'p',
	},
	enablePostExcerptLimit: {
		type: 'boolean',
		default: false,
	},
	postExcerptLimitType: {
		type: 'string',
		default: 'words',
	},
	postExcerptLimit: {
		type: 'object',
		default: {
			Desktop: '20',
			Tablet: '20',
			Mobile: '20',
		},
	},
	postExcerptLimitSuffix: {
		type: 'string',
		default: '...',
	},
	postExcerptSource: {
		type: 'string',
		default: 'auto',
	},
	postExcerptLineClamp: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},

	/** Start Post Excerpt Typography */
	postExcerptFontFamily: {
		type: 'string',
		default: '',
	},
	postExcerptFontSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '16',
		},
	},
	postExcerptFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postExcerptFontWeight: {
		type: 'string',
		default: '',
	},
	postExcerptFontStyle: {
		type: 'string',
		default: '',
	},
	postExcerptTextTransform: {
		type: 'string',
		default: '',
	},
	postExcerptTextDecoration: {
		type: 'string',
		default: '',
	},
	postExcerptLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postExcerptLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postExcerptLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postExcerptLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postExcerptWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postExcerptWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Excerpt Typography */

	/** Start Post Excerpt Color */
	postExcerptColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postExcerptColor: {
		type: 'string',
		default: '',
	},
	postExcerptColorHover: {
		type: 'string',
		default: '',
	},
	/** End Post Excerpt Color */

	/** Start Post Excerpt Margin */
	postExcerptMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postExcerptDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '12',
			left: '0',
			right: '0',
		},
	},
	postExcerptDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postExcerptTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postExcerptMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Excerpt Margin */

	/** Start Post Excerpt Padding */
	postExcerptPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postExcerptDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postExcerptDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postExcerptTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postExcerptMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postExcerptPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Excerpt Padding */
	/** End Post Excerpt Styling */

	/** Start Post Category Styling */
	showTaxonomy: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},

	/** Start Post Category Alignment */
	postCategoryAlign: {
		type: 'object',
		default: {
			Desktop: 'left',
			Tablet: 'left',
			Mobile: 'left',
		},
	},

	/** Start Post Category Typography */
	postCategoryFontFamily: {
		type: 'string',
		default: '',
	},
	postCategoryFontSize: {
		type: 'object',
		default: {
			Desktop: '13',
			Tablet: '13',
			Mobile: '13',
		},
	},
	postCategoryFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryFontWeight: {
		type: 'string',
		default: '',
	},
	postCategoryFontStyle: {
		type: 'string',
		default: '',
	},
	postCategoryTextTransform: {
		type: 'string',
		default: '',
	},
	postCategoryTextDecoration: {
		type: 'string',
		default: '',
	},
	postCategoryLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postCategoryLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postCategoryLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postCategoryWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Category Typography */

	/** Start Post Category Color */
	postCategoryColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postCategoryColor: {
		type: 'string',
		default: '',
	},
	postCategoryColorHover: {
		type: 'string',
		default: '',
	},
	/** End Post Category Color */

	/** Start Post Category Background */
	postCategoryNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postCategoryNormalClassicColor: {
		type: 'string',
		default: '',
	},
	postCategoryNormalGradientColor: {
		type: 'string',
		default: null,
	},
	postCategoryNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postCategoryNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},

	postCategoryHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postCategoryHoverClassicColor: {
		type: 'string',
		default: '',
	},
	postCategoryHoverGradientColor: {
		type: 'string',
		default: null,
	},
	postCategoryHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postCategoryHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Post Category Background */

	/** Start Post Category Border */
	postCategoryBorder: {
		type: 'string',
		default: 'none',
	},
	postCategoryBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postCategoryBorderColor: {
		type: 'string',
		default: '',
	},
	postCategoryBorderHoverColor: {
		type: 'string',
		default: '',
	},
	postCategoryBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Category Border */

	/** Start Post Category Border Radius */
	postCategoryBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Category Border Radius */

	/** Start Post Category Box Shadow */
	postCategoryBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postCategoryBoxShadowValues: {
		type: 'array',
		default: [],
	},
	postCategoryBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	postCategoryBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	postCategoryBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Post Category Box Shadow */

	/** Start Post Category Gap */
	postCategoryGap: {
		type: 'object',
		default: {
			Desktop: '5',
			Tablet: '5',
			Mobile: '5',
		},
	},
	postCategoryGapUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Category Gap */

	/** Start Post Category Spacing (Margin & Padding) */
	postCategoryMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryMarginLink: {
		type: 'boolean',
		default: true,
	},

	postCategoryPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Category Spacing */

	/** Start Post Category Item Padding */
	postCategoryItemPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postCategoryItemDesktopPadding: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '8',
			right: '8',
		},
	},
	postCategoryItemDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryItemTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryItemTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryItemMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postCategoryItemMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postCategoryItemPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Category Item Padding */
	/** End Post Category Styling */

	/** Start Post Tag Styling */
	postTagAlign: {
		type: 'object',
		default: {
			Desktop: 'left',
			Tablet: 'left',
			Mobile: 'left',
		},
	},

	/** Start Post Tag Typography */
	postTagFontFamily: {
		type: 'string',
		default: '',
	},
	postTagFontSize: {
		type: 'object',
		default: {
			Desktop: '13',
			Tablet: '13',
			Mobile: '13',
		},
	},
	postTagFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagFontWeight: {
		type: 'string',
		default: '',
	},
	postTagFontStyle: {
		type: 'string',
		default: '',
	},
	postTagTextTransform: {
		type: 'string',
		default: '',
	},
	postTagTextDecoration: {
		type: 'string',
		default: '',
	},
	postTagLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTagLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTagLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postTagWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Tag Typography */

	/** Start Post Tag Color */
	postTagColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postTagColor: {
		type: 'string',
		default: '',
	},
	postTagColorHover: {
		type: 'string',
		default: '',
	},
	/** End Post Tag Color */

	/** Start Post Tag Background */
	postTagNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postTagNormalClassicColor: {
		type: 'string',
		default: '',
	},
	postTagNormalGradientColor: {
		type: 'string',
		default: null,
	},
	postTagNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postTagNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},

	postTagHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	postTagHoverClassicColor: {
		type: 'string',
		default: '',
	},
	postTagHoverGradientColor: {
		type: 'string',
		default: null,
	},
	postTagHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	postTagHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Post Tag Background */

	/** Start Post Tag Border */
	postTagBorder: {
		type: 'string',
		default: 'none',
	},
	postTagBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postTagBorderColor: {
		type: 'string',
		default: '',
	},
	postTagBorderHoverColor: {
		type: 'string',
		default: '',
	},
	postTagBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Tag Border */

	/** Start Post Tag Border Radius */
	postTagBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	postTagBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Tag Border Radius */

	/** Start Post Tag Box Shadow */
	postTagBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postTagBoxShadowValues: {
		type: 'array',
		default: [],
	},
	postTagBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	postTagBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	postTagBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Post Tag Box Shadow */

	/** Start Post Tag Gap */
	postTagGap: {
		type: 'object',
		default: {
			Desktop: '5',
			Tablet: '5',
			Mobile: '5',
		},
	},
	postTagGapUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Tag Gap */

	/** Start Post Tag Spacing (Margin & Padding) */
	postTagMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTagTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTagMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postTagMarginLink: {
		type: 'boolean',
		default: true,
	},

	postTagPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Tag Spacing */

	/** Start Post Tag Item Padding */
	postTagItemPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postTagItemDesktopPadding: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '8',
			right: '8',
		},
	},
	postTagItemDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagItemTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagItemTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagItemMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postTagItemMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postTagItemPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Tag Item Padding */
	/** End Post Tag Styling */

	/** Start Post Meta Settings */
	showMeta: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaAuthor: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaAvatar: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaDate: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},

	/** Start Author Image Style */

	/** Start Author Image Size */
	authorImageSize: {
		type: 'object',
		default: {
			Desktop: '28',
			Tablet: '28',
			Mobile: '28',
		},
	},
	authorImageSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Author Image Size */

	/** Start Author Image Border */
	authorImageBorder: {
		type: 'string',
		default: 'none',
	},
	authorImageBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	authorImageBorderColor: {
		type: 'string',
		default: '',
	},
	authorImageBorderHoverColor: {
		type: 'string',
		default: '',
	},
	authorImageBorderWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorImageDesktopBorderWidth: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageDesktopBorderWidthCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageTabletBorderWidth: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageTabletBorderWidthCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageMobileBorderWidth: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageMobileBorderWidthCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageBorderWidthLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Image Border */

	/** Start Author Image Border Radius */
	authorImageBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorImageDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	authorImageDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageTabletBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	authorImageTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageMobileBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	authorImageMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Image Border Radius */

	/** Start Author Image Margin */
	authorImageMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorImageDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorImageDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageTabletMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorImageTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageMobileMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorImageMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Image Margin */

	/** Start Author Image Padding */
	authorImagePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorImageDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorImageMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorImageMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorImagePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Image Padding */

	/** End Author Image Style */

	/** Start Author Name Typography */
	authorNameFontFamily: {
		type: 'string',
		default: '',
	},
	authorNameFontSize: {
		type: 'object',
		default: {
			Desktop: '14',
			Tablet: '14',
			Mobile: '14',
		},
	},
	authorNameFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorNameFontWeight: {
		type: 'string',
		default: '',
	},
	authorNameFontStyle: {
		type: 'string',
		default: '',
	},
	authorNameTextTransform: {
		type: 'string',
		default: '',
	},
	authorNameTextDecoration: {
		type: 'string',
		default: '',
	},
	authorNameLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	authorNameLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorNameLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	authorNameLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorNameWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	authorNameWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Author Name Typography */

	/** Start Author Name Color */
	authorNameColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	authorNameColor: {
		type: 'string',
		default: '',
	},
	authorNameColorHover: {
		type: 'string',
		default: '',
	},
	/** End Author Name Color */

	/** Start Author Name Margin */
	authorNameMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorNameDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorNameDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorNameTabletMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorNameTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorNameMobileMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	authorNameMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	authorNameMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Name Margin */

	/** Start Author Name Padding */
	authorNamePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	authorNameDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorNameDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorNameTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorNameTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorNameMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	authorNameMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	authorNamePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Author Name Padding */

	/** End Author Name */

	/** Start Post Date Typography */
	postDateFontFamily: {
		type: 'string',
		default: '',
	},
	postDateFontSize: {
		type: 'object',
		default: {
			Desktop: '14',
			Tablet: '14',
			Mobile: '14',
		},
	},
	postDateFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postDateFontWeight: {
		type: 'string',
		default: '',
	},
	postDateFontStyle: {
		type: 'string',
		default: '',
	},
	postDateTextTransform: {
		type: 'string',
		default: '',
	},
	postDateTextDecoration: {
		type: 'string',
		default: '',
	},
	postDateLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postDateLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postDateLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postDateLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postDateWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	postDateWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Post Date Typography */

	/** Start Post Date Color */
	postDateColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	postDateColor: {
		type: 'string',
		default: '',
	},
	postDateColorHover: {
		type: 'string',
		default: '',
	},
	/** End Post Date Color */

	/** Start Post Date Margin */
	postDateMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postDateDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postDateTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postDateMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	postDateMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Date Margin */

	/** Start Post Date Padding */
	postDatePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	postDateDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postDateTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postDateMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	postDateMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	postDatePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Post Date Padding */

	/** End Post Date */

	/** Start Read More Button Settings */

	showReadMoreButton: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	readMoreButtonText: {
		type: 'string',
		default: 'Read More',
	},
	readMoreButtonLinkType: {
		type: 'string',
		default: 'post',
	},
	readMoreButtonLink: {
		type: 'string',
		default: '#',
	},
	readMoreButtonTargetLink: {
		type: 'boolean',
		default: true,
	},
	readMoreButtonNofollow: {
		type: 'boolean',
		default: false,
	},
	readMoreButtonSponsored: {
		type: 'boolean',
		default: false,
	},
	/** End Read More Button Settings */

	/** Start Read More Button Icon */
	readMoreButtonIconSwitcher: {
		type: 'boolean',
		default: true,
	},
	readMoreButtonIconType: {
		type: 'string',
		default: 'icon',
	},
	readMoreButtonIconPosition: {
		type: 'string',
		default: 'right',
	},
	readMoreButtonIcon: {
		type: 'string',
		default: 'arrow-right',
	},
	readMoreButtonIconHtml: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconImageUrl: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconImageAlt: {
		type: 'string',
		default: 'Right Arrow',
	},
	readMoreButtonIconImageID: {
		type: 'string',
		default: '',
	},
	/** End Read More Button Icon */

	/** Start Read More Button Typography */
	readMoreButtonFontFamily: {
		type: 'string',
		default: '',
	},
	readMoreButtonFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonFontWeight: {
		type: 'string',
		default: '',
	},
	readMoreButtonFontStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonTextTransform: {
		type: 'string',
		default: '',
	},
	readMoreButtonTextDecoration: {
		type: 'string',
		default: 'none',
	},
	readMoreButtonLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Read More Button Typography */

	/** Start Read More Button Color */
	readMoreButtonColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonColor: {
		type: 'string',
		default: '#111c2d',
	},
	readMoreButtonColorHover: {
		type: 'string',
		default: '#FFFFFF',
	},
	/** End Read More Button Color */

	/** Start Read More Button Background */
	readMoreButtonNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	readMoreButtonNormalClassicColor: {
		type: 'string',
		default: '#d2d2d2c7',
	},
	readMoreButtonNormalGradientColor: {
		type: 'string',
		default: null,
	},
	readMoreButtonNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	readMoreButtonNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	readMoreButtonHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	readMoreButtonHoverClassicColor: {
		type: 'string',
		default: '#787878b8',
	},
	readMoreButtonHoverGradientColor: {
		type: 'string',
		default: null,
	},
	readMoreButtonHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	readMoreButtonHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Read More Button Background */

	/** Start Read More Button Border */
	readMoreButtonBorder: {
		type: 'string',
		default: 'none',
	},
	readMoreButtonBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonBorderColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonBorderHoverColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Border */

	/** Start Read More Button Border Radius */
	readMoreButtonBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonTabletBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonMobileBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Border Radius */

	/** Start Read More Button Box Shadow */
	readMoreButtonBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonBoxShadowValues: {
		type: 'array',
		default: [],
	},
	readMoreButtonBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	readMoreButtonBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	readMoreButtonBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Read More Button Box Shadow */

	/** Start Read More Button Margin */
	readMoreButtonMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Margin */

	/** Start Read More Button Padding */
	readMoreButtonPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Padding */

	/** Start Read More Button Layout & Alignment */
	readMoreButtonAlign: {
		type: 'object',
		default: {
			Desktop: 'left',
			Tablet: 'left',
			Mobile: 'left',
		},
	},
	readMoreButtonWidth: {
		type: 'string',
		default: 'full',
	},
	readMoreButtonHoverAnimation: {
		type: 'string',
		default: 'none',
	},
	/** End Read More Button Layout & Alignment */

	/** Start Read More Button Icon Size */
	readMoreButtonIconSize: {
		type: 'object',
		default: {
			Desktop: '14',
			Tablet: '14',
			Mobile: '14',
		},
	},
	readMoreButtonIconSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Read More Button Icon Size */

	/** Start Read More Button Icon Width & Height */
	readMoreButtonIconWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonIconWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonIconHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonIconHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Read More Button Icon Width & Height */

	/** Start Read More Button Icon Rotation */
	readMoreButtonIconRotationSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonIconRotation: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	readMoreButtonIconHoverRotation: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	/** End Read More Button Icon Rotation */

	/** Start Read More Button Icon Hover Animation */
	readMoreButtonIconHoverAnimation: {
		type: 'string',
		default: 'none',
	},
	/** End Read More Button Icon Hover Animation */

	/** Start Read More Button Icon Gap */
	readMoreButtonIconGap: {
		type: 'object',
		default: {
			Desktop: '8',
			Tablet: '8',
			Mobile: '8',
		},
	},
	readMoreButtonIconGapUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Read More Button Icon Gap */

	/** Start Read More Button Icon Color */
	readMoreButtonIconColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonIconColor: {
		type: 'string',
		default: '#111c2d',
	},
	readMoreButtonIconColorHover: {
		type: 'string',
		default: '#FFFFFF',
	},
	/** End Read More Button Icon Color */

	/** Start Read More Button Icon Background */
	readMoreButtonIconNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	readMoreButtonIconNormalClassicColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconNormalGradientColor: {
		type: 'string',
		default: null,
	},
	readMoreButtonIconNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	readMoreButtonIconNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	readMoreButtonIconHoverClassicColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconHoverGradientColor: {
		type: 'string',
		default: null,
	},
	readMoreButtonIconHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	readMoreButtonIconHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Read More Button Icon Background */

	/** Start Read More Button Icon Border */
	readMoreButtonIconBorder: {
		type: 'string',
		default: 'none',
	},
	readMoreButtonIconBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonIconBorderColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconBorderHoverColor: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonIconDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Icon Border */

	/** Start Read More Button Icon Border Radius */
	readMoreButtonIconBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	readMoreButtonIconDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconTabletBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconMobileBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	readMoreButtonIconMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Read More Button Icon Border Radius */

	/** Start Read More Button Icon Box Shadow */
	readMoreButtonIconBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	readMoreButtonIconBoxShadowValues: {
		type: 'array',
		default: [],
	},
	readMoreButtonIconBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	readMoreButtonIconBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	readMoreButtonIconBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Read More Button Icon Box Shadow */
	/** End Read More Button */

	/** Start Animation Settings */
	...animationAttributes,
	/** End Animation Settings */
};

export default attributes;
