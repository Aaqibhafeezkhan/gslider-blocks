/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/require-param-type, jsdoc/check-param-names, react-hooks/exhaustive-deps, import/no-unresolved, no-nested-ternary */
import { __ } from '@wordpress/i18n';
import {
	useState,
	useEffect,
	useMemo,
	memo,
	useCallback,
} from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
	BaseControl,
	Button,
	RangeControl,
	SelectControl,
	TextControl,
	FormTokenField,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
	TEXT_ALIGN,
	ARROW_ICON_ALIGN,
	VERTICAL_ALIGN,
	VERTICAL_ALIGN_SELF,
	HORIZONTAL_ALIGN,
	NORMAL_HOVER,
	BORDER_STYLES,
	CAROUSEL_EFFECT_OPTIONS,
	PAGINATION_TYPE,
	NORMAL_ACTIVE,
	NAVIGATION_ARROW_POSITION_TYPE,
	PAGINATION_POSITION_TYPE,
	NAVIGATION_ARROW_POSITION,
	NAVIGATION_ARROW_DIRECTION,
	LAYOUT_HEIGHT_SWITCHER,
	HTML_TAGS,
	ICON_TYPE,
	ICON_POSITION,
	WIDTH_MODE,
} from '@Constants';

import './editor.scss';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import ImageControl from '@Components/image-control';
import InspectorControl from '@Components/inspector-controls';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import generateSvgIcon from '@Utils/generateSvgIcon';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import { useDeviceType } from '@Utils/displayType';
import InputControls from '@Components/input-control';
import Select2Control from '@Components/select2-control';
import IconPicker from '@Components/icon-picker';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import ContentOrderControl from '@Components/content-order-control';
import { normalizeContentOrder } from './content-order';
import QuerySettingsPanel from '@Components/query-settings-panel';
import HtmlTagControl from '@Components/html-tag-control';
import UrlControl from '@Components/url-control';
import AnimationControl from '@Components/animation-control';

const Inspector = ( { attributes, setAttributes, clientId } ) => {
	const {
		blockId,
		deviceType,
		blockStyle,

		/** Start Carousel Settings */
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		enableLazyLoad,
		verticalAlign,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,
		/** End Carousel Settings */

		/** Start Show/Hide Elements */
		paginationPositionType,
		showNavigation,
		showPagination,
		showFeaturedImage,
		showPostTitle,
		showExcerpt,
		showMeta,
		showMetaAuthor,
		showMetaAvatar,
		showMetaDate,
		showTaxonomy,
		/** End Show/Hide Elements */

		/** Start Layout & Content Setting */
		layoutHeight,
		layoutHeightUnits,
		contentOrder,
		postTaxonomyDisplay,
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayPosition,
		taxonomyBadgeOverlayVisibility,
		taxonomyBadgeOverlayTopOffset,
		taxonomyBadgeOverlayTopOffsetUnits,
		taxonomyBadgeOverlayLeftOffset,
		taxonomyBadgeOverlayLeftOffsetUnits,
		/** End Layout & Content Setting */

		/** Start Query Settings */
		postType,
		postsPerPage,
		categories,
		tags,
		authors,
		excludePosts,
		offset,
		orderBy,
		order,
		searchQuery,
		stickyPosts,
		taxonomyQuery,
		metaKey,
		metaValue,
		metaCompare,
		dateRange,
		excludeCurrentPost,
		/** End Query Settings */

		/** Start Navigation Custom Arrows */
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,
		navigationArrowsIconLeftImageID,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,
		navigationArrowsIconRightImageID,
		/** End Navigation Custom Arrows */

		/** Start Arrows Style */
		navigationArrowSize,
		navigationArrowSizeUnits,
		/** End Arrows Style */

		/** Start Arrows Color */
		navigationArrowColorSwitcher,
		navigationArrowColor,
		navigationArrowColorHover,
		/** End Arrows Color */

		/** Start Background */
		navigationArrowNormalBackgroundType,
		navigationArrowNormalClassicColor,
		navigationArrowNormalGradientColor,
		navigationArrowNormalCustomGradientSwitcher,
		navigationArrowNormalCustomGradientInputValue,

		navigationArrowHoverBackgroundType,
		navigationArrowHoverClassicColor,
		navigationArrowHoverGradientColor,
		navigationArrowHoverCustomGradientSwitcher,
		navigationArrowHoverCustomGradientInputValue,
		/** End Background */

		/** Start Arrows Dimensions */
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
		/** End Arrows Dimensions */

		/** Start Border */
		navigationArrowBorder,
		navigationArrowBorderColorSwitcher,
		navigationArrowBorderColor,
		navigationArrowBorderHoverColor,
		navigationArrowBorderUnits,
		navigationArrowDesktopBorder,
		navigationArrowDesktopBorderCssStyle,
		navigationArrowTabletBorder,
		navigationArrowTabletBorderCssStyle,
		navigationArrowMobileBorder,
		navigationArrowMobileBorderCssStyle,
		navigationArrowBorderLink,
		/** End Border */

		/** Start Border Radius */
		navigationArrowBorderRadiusUnits,
		navigationArrowDesktopBorderRadius,
		navigationArrowDesktopBorderRadiusCssStyle,
		navigationArrowTabletBorderRadius,
		navigationArrowTabletBorderRadiusCssStyle,
		navigationArrowMobileBorderRadius,
		navigationArrowMobileBorderRadiusCssStyle,
		navigationArrowBorderRadiusLink,
		/** End Border Radius */

		/** Start Box Shadow */
		navigationArrowBoxShadowValuesSwitcher,
		navigationArrowBoxShadowValues,
		navigationArrowBoxShadowCssValue,
		navigationArrowBoxShadowHoverValues,
		navigationArrowBoxShadowHoverCssValue,
		/** End Box Shadow */

		/** Start Position */
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,

		navigationArrowPositionTopOffset,
		navigationArrowPositionTopOffsetUnits,
		navigationArrowPositionLeftOffset,
		navigationArrowPositionLeftOffsetUnits,
		navigationArrowPositionRightOffset,
		navigationArrowPositionRightOffsetUnits,
		navigationArrowPositionBottomOffset,
		navigationArrowPositionBottomOffsetUnits,

		navigationArrowGap,
		navigationArrowGapUnits,

		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
		/** End Position */

		/** Start Dots Margin */
		paginationDotsMarginUnits,
		paginationDotsDesktopMargin,
		paginationDotsDesktopMarginCssStyle,
		paginationDotsTabletMargin,
		paginationDotsTabletMarginCssStyle,
		paginationDotsMobileMargin,
		paginationDotsMobileMarginCssStyle,
		paginationDotsMarginLink,
		/** End Dots Margin */

		/** Start Dots Position */
		paginationDotsPosition,
		paginationDotsPositionUnits,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		/** End Dots Position */

		/** Start Dots Style */
		paginationDotsSwitcher,
		paginationNormalDotsBgColor,
		paginationActiveDotsBgColor,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		/** End Dots Style */

		/** Start Dots Border */
		paginationNormalDotsBorder,
		paginationNormalDotsBorderColorSwitcher,
		paginationNormalDotsBorderColor,
		paginationNormalDotsBorderHoverColor,
		paginationNormalDotsBorderUnits,
		paginationNormalDotsDesktopBorder,
		paginationNormalDotsDesktopBorderCssStyle,
		paginationNormalDotsTabletBorder,
		paginationNormalDotsTabletBorderCssStyle,
		paginationNormalDotsMobileBorder,
		paginationNormalDotsMobileBorderCssStyle,
		paginationNormalDotsBorderLink,
		/** End Dots Border */

		/** Start Dots Border Radius */
		paginationNormalDotsBorderRadius,
		paginationNormalDotsBorderRadiusUnits,
		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsDesktopBorderRadiusCssStyle,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsTabletBorderRadiusCssStyle,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsMobileBorderRadiusCssStyle,
		paginationNormalDotsBorderRadiusLink,
		/** End Dots Border Radius */

		/** Start Active Dots */
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		/** End Active Dots */

		/** Start Active Dots Border */
		paginationActiveDotsBorder,
		paginationActiveDotsBorderColorSwitcher,
		paginationActiveDotsBorderColor,
		paginationActiveDotsBorderHoverColor,
		paginationActiveDotsBorderUnits,
		paginationActiveDotsDesktopBorder,
		paginationActiveDotsDesktopBorderCssStyle,
		paginationActiveDotsTabletBorder,
		paginationActiveDotsTabletBorderCssStyle,
		paginationActiveDotsMobileBorder,
		paginationActiveDotsMobileBorderCssStyle,
		paginationActiveDotsBorderLink,
		/** End Active Dots Border */

		/** Start Active Dots Border Radius */
		paginationActiveDotsBorderRadiusUnits,
		paginationActiveDotsDesktopBorderRadius,
		paginationActiveDotsDesktopBorderRadiusCssStyle,
		paginationActiveDotsTabletBorderRadius,
		paginationActiveDotsTabletBorderRadiusCssStyle,
		paginationActiveDotsMobileBorderRadius,
		paginationActiveDotsMobileBorderRadiusCssStyle,
		paginationActiveDotsBorderRadiusLink,
		/** End Active Dots Border Radius */

		/** start Fraction Typography and Color */
		paginationFractionFontFamily,
		paginationFractionFontSize,
		paginationFractionFontSizeUnits,
		paginationFractionFontWeight,
		paginationFractionFontStyle,
		paginationFractionTextTransform,
		paginationFractionTextDecoration,
		paginationFractionLineHeight,
		paginationFractionLineHeightUnits,
		paginationFractionLetterSpacing,
		paginationFractionLetterSpacingUnits,
		paginationFractionWordSpacing,
		paginationFractionWordSpacingUnits,

		paginationFractionColorSwitcher,
		paginationFractionColor,
		paginationFractionColorHover,
		/** End Fraction Typography and Color */

		/** start pagination Progressbar Color */
		paginationProgressbarBGColorSwitcher,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
		/** End pagination Progressbar Color */

		/** Start Global Margin */
		globalMarginUnits,
		globalMarginDesktop,
		globalMarginDesktopCssStyle,
		globalMarginTablet,
		globalMarginTabletCssStyle,
		globalMarginMobile,
		globalMarginMobileCssStyle,
		globalMarginLink,
		/** End Global Margin */

		/** Start Global Padding */
		globalPaddingUnits,
		globalPaddingDesktop,
		globalPaddingDesktopCssStyle,
		globalPaddingTablet,
		globalPaddingTabletCssStyle,
		globalPaddingMobile,
		globalPaddingMobileCssStyle,
		globalPaddingLink,
		/** End Global Padding */

		/** Start Global Z-Index */
		globalZIndex,
		globalID,
		globalClass,
		/** End Global Z-Index */

		/** Start Global Background */
		globalNormalBackgroundType,
		globalNormalClassicColor,
		globalNormalGradientColor,
		globalNormalCustomGradientSwitcher,
		globalNormalCustomGradientInputValue,
		globalNormalBackgroundImageUrl,
		globalNormalBackgroundImagePosition,
		globalNormalBackgroundImageAttachment,
		globalNormalBackgroundImageRepeat,
		globalNormalBackgroundImageSize,

		globalHoverBackgroundType,
		globalHoverClassicColor,
		globalHoverGradientColor,
		globalHoverCustomGradientSwitcher,
		globalHoverCustomGradientInputValue,
		globalHoverBackgroundImageUrl,
		globalHoverBackgroundImagePosition,
		globalHoverBackgroundImageAttachment,
		globalHoverBackgroundImageRepeat,
		globalHoverBackgroundImageSize,
		/** End Global Background */

		/** Start Global Border */
		globalBorder,
		globalBorderColorSwitcher,
		globalBorderColor,
		globalBorderHoverColor,
		globalBorderUnits,
		globalBorderDesktop,
		globalBorderDesktopCssStyle,
		globalBorderTablet,
		globalBorderTabletCssStyle,
		globalBorderMobile,
		globalBorderMobileCssStyle,
		globalBorderLink,
		/** End Global Border */

		/** Start Global Border Radius */
		globalBorderRadiusUnits,
		globalBorderRadiusDesktop,
		globalBorderRadiusDesktopCssStyle,
		globalBorderRadiusTablet,
		globalBorderRadiusTabletCssStyle,
		globalBorderRadiusMobile,
		globalBorderRadiusMobileCssStyle,
		globalBorderRadiusLink,
		/** End Global Border Radius */

		/** Start Global Box Shadow */
		globalBoxShadowValuesSwitcher,
		globalBoxShadowValues,
		globalBoxShadowCssValue,
		globalBoxShadowHoverValues,
		globalBoxShadowHoverCssValue,
		/** End Global Box Shadow */

		/** Start Global Custom CSS */
		globalCustomCSS,
		/** End Global Custom CSS */

		/** Start Post Card Margin */
		postCardMarginUnits,
		postCardMarginDesktop,
		postCardMarginDesktopCssStyle,
		postCardMarginTablet,
		postCardMarginTabletCssStyle,
		postCardMarginMobile,
		postCardMarginMobileCssStyle,
		postCardMarginLink,
		/** End Post Card Margin */

		/** Start Post Card Padding */
		postCardPaddingUnits,
		postCardPaddingDesktop,
		postCardPaddingDesktopCssStyle,
		postCardPaddingTablet,
		postCardPaddingTabletCssStyle,
		postCardPaddingMobile,
		postCardPaddingMobileCssStyle,
		postCardPaddingLink,
		/** End Post Card Padding */

		/** Start Post Card Background */
		postCardNormalBackgroundType,
		postCardNormalClassicColor,
		postCardNormalGradientColor,
		postCardNormalCustomGradientSwitcher,
		postCardNormalCustomGradientInputValue,

		postCardHoverBackgroundType,
		postCardHoverClassicColor,
		postCardHoverGradientColor,
		postCardHoverCustomGradientSwitcher,
		postCardHoverCustomGradientInputValue,
		/** End Post Card Background */

		/** Start Post Card Border */
		postCardBorder,
		postCardBorderColorSwitcher,
		postCardBorderColor,
		postCardBorderHoverColor,
		postCardBorderUnits,
		postCardBorderDesktop,
		postCardBorderDesktopCssStyle,
		postCardBorderTablet,
		postCardBorderTabletCssStyle,
		postCardBorderMobile,
		postCardBorderMobileCssStyle,
		postCardBorderLink,
		/** End Post Card Border */

		/** Start Post Card Border Radius */
		postCardBorderRadiusUnits,
		postCardBorderRadiusDesktop,
		postCardBorderRadiusDesktopCssStyle,
		postCardBorderRadiusTablet,
		postCardBorderRadiusTabletCssStyle,
		postCardBorderRadiusMobile,
		postCardBorderRadiusMobileCssStyle,
		postCardBorderRadiusLink,
		/** End Post Card Border Radius */

		/** Start Post Card Box Shadow */
		postCardBoxShadowValuesSwitcher,
		postCardBoxShadowValues,
		postCardBoxShadowCssValue,
		postCardBoxShadowHoverValues,
		postCardBoxShadowHoverCssValue,
		/** End Post Card Box Shadow */

		/** Start Image Settings */
		imageMaxWidth,
		imageMaxWidthUnits,
		imageHeight,
		imageHeightUnits,
		imageObjectFit,
		imageObjectPosition,

		imagePaddingUnits,
		imagePaddingDesktop,
		imagePaddingDesktopCssStyle,
		imagePaddingTablet,
		imagePaddingTabletCssStyle,
		imagePaddingMobile,
		imagePaddingMobileCssStyle,
		imagePaddingLink,

		imageMarginUnits,
		imageMarginDesktop,
		imageMarginDesktopCssStyle,
		imageMarginTablet,
		imageMarginTabletCssStyle,
		imageMarginMobile,
		imageMarginMobileCssStyle,
		imageMarginLink,

		imageNormalBackgroundType,
		imageNormalClassicColor,
		imageNormalGradientColor,
		imageNormalCustomGradientSwitcher,
		imageNormalCustomGradientInputValue,

		imageHoverBackgroundType,
		imageHoverClassicColor,
		imageHoverGradientColor,
		imageHoverCustomGradientSwitcher,
		imageHoverCustomGradientInputValue,

		imageBorder,
		imageBorderColorSwitcher,
		imageBorderColor,
		imageBorderHoverColor,
		imageBorderUnits,
		imageBorderDesktop,
		imageBorderDesktopCssStyle,
		imageBorderTablet,
		imageBorderTabletCssStyle,
		imageBorderMobile,
		imageBorderMobileCssStyle,
		imageBorderLink,

		imageBorderRadiusUnits,
		imageBorderRadiusDesktop,
		imageBorderRadiusDesktopCssStyle,
		imageBorderRadiusTablet,
		imageBorderRadiusTabletCssStyle,
		imageBorderRadiusMobile,
		imageBorderRadiusMobileCssStyle,
		imageBorderRadiusLink,

		imageBoxShadowValuesSwitcher,
		imageBoxShadowValues,
		imageBoxShadowCssValue,
		imageBoxShadowHoverValues,
		imageBoxShadowHoverCssValue,

		imageHoverEffect,
		imageHoverOpacity,
		imageHoverScale,
		imageHoverLift,
		imageHoverLiftUnits,
		imageTransitionDuration,
		imageHoverBlur,
		imageHoverRotate,
		imageHoverGrayscale,
		imageHoverPan,
		/** End Image Settings */

		/** Start Post Title Typography, Color, Margin & Padding */
		postTitleAlign,
		postTitleHtmlTag,

		postTitleFontFamily,
		postTitleFontSize,
		postTitleFontSizeUnits,
		postTitleFontWeight,
		postTitleFontStyle,
		postTitleTextTransform,
		postTitleTextDecoration,
		postTitleLineHeight,
		postTitleLineHeightUnits,
		postTitleLetterSpacing,
		postTitleLetterSpacingUnits,
		postTitleWordSpacing,
		postTitleWordSpacingUnits,

		postTitleNormalBackgroundType,
		postTitleNormalClassicColor,
		postTitleNormalGradientColor,
		postTitleNormalCustomGradientSwitcher,
		postTitleNormalCustomGradientInputValue,
		postTitleHoverBackgroundType,
		postTitleHoverClassicColor,
		postTitleHoverGradientColor,
		postTitleHoverCustomGradientSwitcher,
		postTitleHoverCustomGradientInputValue,

		postTitleMarginUnits,
		postTitleDesktopMargin,
		postTitleDesktopMarginCssStyle,
		postTitleTabletMargin,
		postTitleTabletMarginCssStyle,
		postTitleMobileMargin,
		postTitleMobileMarginCssStyle,
		postTitleMarginLink,

		postTitlePaddingUnits,
		postTitleDesktopPadding,
		postTitleDesktopPaddingCssStyle,
		postTitleTabletPadding,
		postTitleTabletPaddingCssStyle,
		postTitleMobilePadding,
		postTitleMobilePaddingCssStyle,
		postTitlePaddingLink,

		// Post Title Settings
		enablePostTitleLimit,
		postTitleLimitType,
		postTitleLimit,
		postTitleLimitSuffix,

		enablePostTitleLink,
		postTitleLinkTarget,
		postTitleLinkNofollow,
		postTitleLinkSponsored,

		enablePostTitleHoverUnderlineAnim,
		postTitleHoverUnderlineColor,
		postTitleHoverUnderlineHeight,
		postTitleHoverUnderlineBottomOffset,
		postTitleHoverUnderlineTransitionSpeed,

		showPostTitleDivider,
		postTitleDividerStyle,
		postTitleDividerColorSwitcher,
		postTitleDividerColor,
		postTitleDividerHoverColor,
		postTitleDividerWidth,
		postTitleDividerWidthUnits,
		postTitleDividerHeight,
		postTitleDividerHeightUnits,
		enablePostTitleDividerHoverExpand,
		/** End Post Title Typography, Color, Margin & Padding */

		/** Start Post Excerpt Styling */
		postExcerptAlign,
		postExcerptHtmlTag,
		enablePostExcerptLimit,
		postExcerptLimitType,
		postExcerptLimit,
		postExcerptLimitSuffix,
		postExcerptSource,
		postExcerptLineClamp,

		postExcerptFontFamily,
		postExcerptFontSize,
		postExcerptFontSizeUnits,
		postExcerptFontWeight,
		postExcerptFontStyle,
		postExcerptTextTransform,
		postExcerptTextDecoration,
		postExcerptLineHeight,
		postExcerptLineHeightUnits,
		postExcerptLetterSpacing,
		postExcerptLetterSpacingUnits,
		postExcerptWordSpacing,
		postExcerptWordSpacingUnits,

		postExcerptColorSwitcher,
		postExcerptColor,
		postExcerptColorHover,

		postExcerptMarginUnits,
		postExcerptDesktopMargin,
		postExcerptDesktopMarginCssStyle,
		postExcerptTabletMargin,
		postExcerptTabletMarginCssStyle,
		postExcerptMobileMargin,
		postExcerptMobileMarginCssStyle,
		postExcerptMarginLink,

		postExcerptPaddingUnits,
		postExcerptDesktopPadding,
		postExcerptDesktopPaddingCssStyle,
		postExcerptTabletPadding,
		postExcerptTabletPaddingCssStyle,
		postExcerptMobilePadding,
		postExcerptMobilePaddingCssStyle,
		postExcerptPaddingLink,
		/** End Post Excerpt Styling */

		/** Start Post Category Styling */
		postCategoryAlign,

		postCategoryFontFamily,
		postCategoryFontSize,
		postCategoryFontSizeUnits,
		postCategoryFontWeight,
		postCategoryFontStyle,
		postCategoryTextTransform,
		postCategoryTextDecoration,
		postCategoryLineHeight,
		postCategoryLineHeightUnits,
		postCategoryLetterSpacing,
		postCategoryLetterSpacingUnits,
		postCategoryWordSpacing,
		postCategoryWordSpacingUnits,

		postCategoryColorSwitcher,
		postCategoryColor,
		postCategoryColorHover,

		postCategoryNormalBackgroundType,
		postCategoryNormalClassicColor,
		postCategoryNormalGradientColor,
		postCategoryNormalCustomGradientSwitcher,
		postCategoryNormalCustomGradientInputValue,
		postCategoryHoverBackgroundType,
		postCategoryHoverClassicColor,
		postCategoryHoverGradientColor,
		postCategoryHoverCustomGradientSwitcher,
		postCategoryHoverCustomGradientInputValue,

		postCategoryBorder,
		postCategoryBorderColorSwitcher,
		postCategoryBorderColor,
		postCategoryBorderHoverColor,
		postCategoryBorderUnits,
		postCategoryBorderDesktop,
		postCategoryBorderDesktopCssStyle,
		postCategoryBorderTablet,
		postCategoryBorderTabletCssStyle,
		postCategoryBorderMobile,
		postCategoryBorderMobileCssStyle,
		postCategoryBorderLink,

		postCategoryBorderRadiusUnits,
		postCategoryBorderRadiusDesktop,
		postCategoryBorderRadiusDesktopCssStyle,
		postCategoryBorderRadiusTablet,
		postCategoryBorderRadiusTabletCssStyle,
		postCategoryBorderRadiusMobile,
		postCategoryBorderRadiusMobileCssStyle,
		postCategoryBorderRadiusLink,

		postCategoryBoxShadowValuesSwitcher,
		postCategoryBoxShadowValues,
		postCategoryBoxShadowCssValue,
		postCategoryBoxShadowHoverValues,
		postCategoryBoxShadowHoverCssValue,

		postCategoryGap,
		postCategoryGapUnits,

		postCategoryMarginUnits,
		postCategoryDesktopMargin,
		postCategoryDesktopMarginCssStyle,
		postCategoryTabletMargin,
		postCategoryTabletMarginCssStyle,
		postCategoryMobileMargin,
		postCategoryMobileMarginCssStyle,
		postCategoryMarginLink,

		postCategoryPaddingUnits,
		postCategoryDesktopPadding,
		postCategoryDesktopPaddingCssStyle,
		postCategoryTabletPadding,
		postCategoryTabletPaddingCssStyle,
		postCategoryMobilePadding,
		postCategoryMobilePaddingCssStyle,
		postCategoryPaddingLink,

		postCategoryItemPaddingUnits,
		postCategoryItemDesktopPadding,
		postCategoryItemDesktopPaddingCssStyle,
		postCategoryItemTabletPadding,
		postCategoryItemTabletPaddingCssStyle,
		postCategoryItemMobilePadding,
		postCategoryItemMobilePaddingCssStyle,
		postCategoryItemPaddingLink,
		/** End Post Category Styling */

		/** Start Post Tag Styling */
		postTagAlign,

		postTagFontFamily,
		postTagFontSize,
		postTagFontSizeUnits,
		postTagFontWeight,
		postTagFontStyle,
		postTagTextTransform,
		postTagTextDecoration,
		postTagLineHeight,
		postTagLineHeightUnits,
		postTagLetterSpacing,
		postTagLetterSpacingUnits,
		postTagWordSpacing,
		postTagWordSpacingUnits,

		postTagColorSwitcher,
		postTagColor,
		postTagColorHover,

		postTagNormalBackgroundType,
		postTagNormalClassicColor,
		postTagNormalGradientColor,
		postTagNormalCustomGradientSwitcher,
		postTagNormalCustomGradientInputValue,
		postTagHoverBackgroundType,
		postTagHoverClassicColor,
		postTagHoverGradientColor,
		postTagHoverCustomGradientSwitcher,
		postTagHoverCustomGradientInputValue,

		postTagBorder,
		postTagBorderColorSwitcher,
		postTagBorderColor,
		postTagBorderHoverColor,
		postTagBorderUnits,
		postTagBorderDesktop,
		postTagBorderDesktopCssStyle,
		postTagBorderTablet,
		postTagBorderTabletCssStyle,
		postTagBorderMobile,
		postTagBorderMobileCssStyle,
		postTagBorderLink,

		postTagBorderRadiusUnits,
		postTagBorderRadiusDesktop,
		postTagBorderRadiusDesktopCssStyle,
		postTagBorderRadiusTablet,
		postTagBorderRadiusTabletCssStyle,
		postTagBorderRadiusMobile,
		postTagBorderRadiusMobileCssStyle,
		postTagBorderRadiusLink,

		postTagBoxShadowValuesSwitcher,
		postTagBoxShadowValues,
		postTagBoxShadowCssValue,
		postTagBoxShadowHoverValues,
		postTagBoxShadowHoverCssValue,

		postTagGap,
		postTagGapUnits,

		postTagMarginUnits,
		postTagDesktopMargin,
		postTagDesktopMarginCssStyle,
		postTagTabletMargin,
		postTagTabletMarginCssStyle,
		postTagMobileMargin,
		postTagMobileMarginCssStyle,
		postTagMarginLink,

		postTagPaddingUnits,
		postTagDesktopPadding,
		postTagDesktopPaddingCssStyle,
		postTagTabletPadding,
		postTagTabletPaddingCssStyle,
		postTagMobilePadding,
		postTagMobilePaddingCssStyle,
		postTagPaddingLink,

		postTagItemPaddingUnits,
		postTagItemDesktopPadding,
		postTagItemDesktopPaddingCssStyle,
		postTagItemTabletPadding,
		postTagItemTabletPaddingCssStyle,
		postTagItemMobilePadding,
		postTagItemMobilePaddingCssStyle,
		postTagItemPaddingLink,
		/** End Post Tag Styling */

		/** Start Author Image Style */
		authorImageSize,
		authorImageSizeUnits,

		authorImageBorder,
		authorImageBorderColorSwitcher,
		authorImageBorderColor,
		authorImageBorderHoverColor,
		authorImageBorderWidthUnits,
		authorImageDesktopBorderWidth,
		authorImageDesktopBorderWidthCssStyle,
		authorImageTabletBorderWidth,
		authorImageTabletBorderWidthCssStyle,
		authorImageMobileBorderWidth,
		authorImageMobileBorderWidthCssStyle,
		authorImageBorderWidthLink,

		authorImageBorderRadiusUnits,
		authorImageDesktopBorderRadius,
		authorImageDesktopBorderRadiusCssStyle,
		authorImageTabletBorderRadius,
		authorImageTabletBorderRadiusCssStyle,
		authorImageMobileBorderRadius,
		authorImageMobileBorderRadiusCssStyle,
		authorImageBorderRadiusLink,

		authorImageMarginUnits,
		authorImageDesktopMargin,
		authorImageDesktopMarginCssStyle,
		authorImageTabletMargin,
		authorImageTabletMarginCssStyle,
		authorImageMobileMargin,
		authorImageMobileMarginCssStyle,
		authorImageMarginLink,

		authorImagePaddingUnits,
		authorImageDesktopPadding,
		authorImageDesktopPaddingCssStyle,
		authorImageTabletPadding,
		authorImageTabletPaddingCssStyle,
		authorImageMobilePadding,
		authorImageMobilePaddingCssStyle,
		authorImagePaddingLink,
		/** End Author Image Style */

		/** Start Author Name Typography, Color, Margin & Padding */
		authorNameFontFamily,
		authorNameFontSize,
		authorNameFontSizeUnits,
		authorNameFontWeight,
		authorNameFontStyle,
		authorNameTextTransform,
		authorNameTextDecoration,
		authorNameLineHeight,
		authorNameLineHeightUnits,
		authorNameLetterSpacing,
		authorNameLetterSpacingUnits,
		authorNameWordSpacing,
		authorNameWordSpacingUnits,

		authorNameColorSwitcher,
		authorNameColor,
		authorNameColorHover,

		authorNameMarginUnits,
		authorNameDesktopMargin,
		authorNameDesktopMarginCssStyle,
		authorNameTabletMargin,
		authorNameTabletMarginCssStyle,
		authorNameMobileMargin,
		authorNameMobileMarginCssStyle,
		authorNameMarginLink,

		authorNamePaddingUnits,
		authorNameDesktopPadding,
		authorNameDesktopPaddingCssStyle,
		authorNameTabletPadding,
		authorNameTabletPaddingCssStyle,
		authorNameMobilePadding,
		authorNameMobilePaddingCssStyle,
		authorNamePaddingLink,
		/** End Author Name Typography, Color, Margin & Padding */

		/** Start Post Date Typography, Color, Margin & Padding */
		postDateFontFamily,
		postDateFontSize,
		postDateFontSizeUnits,
		postDateFontWeight,
		postDateFontStyle,
		postDateTextTransform,
		postDateTextDecoration,
		postDateLineHeight,
		postDateLineHeightUnits,
		postDateLetterSpacing,
		postDateLetterSpacingUnits,
		postDateWordSpacing,
		postDateWordSpacingUnits,

		postDateColorSwitcher,
		postDateColor,
		postDateColorHover,

		postDateMarginUnits,
		postDateDesktopMargin,
		postDateDesktopMarginCssStyle,
		postDateTabletMargin,
		postDateTabletMarginCssStyle,
		postDateMobileMargin,
		postDateMobileMarginCssStyle,
		postDateMarginLink,

		postDatePaddingUnits,
		postDateDesktopPadding,
		postDateDesktopPaddingCssStyle,
		postDateTabletPadding,
		postDateTabletPaddingCssStyle,
		postDateMobilePadding,
		postDateMobilePaddingCssStyle,
		postDatePaddingLink,
		/** End Post Date Typography, Color, Margin & Padding */

		/** Start Read More Button Settings */
		showReadMoreButton,
		readMoreButtonText,
		readMoreButtonLinkType,
		readMoreButtonLink,
		readMoreButtonTargetLink,
		readMoreButtonNofollow,
		readMoreButtonSponsored,
		readMoreButtonAlign,
		readMoreButtonWidth,
		readMoreButtonHoverAnimation,
		/** End Read More Button Settings */

		/** Start Read More Button Icon */
		readMoreButtonIconSwitcher,
		readMoreButtonIconType,
		readMoreButtonIconPosition,
		readMoreButtonIcon,
		readMoreButtonIconHtml,
		readMoreButtonIconImageUrl,
		readMoreButtonIconImageAlt,
		readMoreButtonIconImageID,
		readMoreButtonIconHoverAnimation,
		/** End Read More Button Icon */

		/** Start Read More Button Typography */
		readMoreButtonFontFamily,
		readMoreButtonFontSize,
		readMoreButtonFontSizeUnits,
		readMoreButtonFontWeight,
		readMoreButtonFontStyle,
		readMoreButtonTextTransform,
		readMoreButtonTextDecoration,
		readMoreButtonLineHeight,
		readMoreButtonLineHeightUnits,
		readMoreButtonLetterSpacing,
		readMoreButtonLetterSpacingUnits,
		readMoreButtonWordSpacing,
		readMoreButtonWordSpacingUnits,
		/** End Read More Button Typography */

		/** Start Read More Button Color */
		readMoreButtonColorSwitcher,
		readMoreButtonColor,
		readMoreButtonColorHover,
		/** End Read More Button Color */

		/** Start Read More Button Background */
		readMoreButtonNormalBackgroundType,
		readMoreButtonNormalClassicColor,
		readMoreButtonNormalGradientColor,
		readMoreButtonNormalCustomGradientSwitcher,
		readMoreButtonNormalCustomGradientInputValue,
		readMoreButtonHoverBackgroundType,
		readMoreButtonHoverClassicColor,
		readMoreButtonHoverGradientColor,
		readMoreButtonHoverCustomGradientSwitcher,
		readMoreButtonHoverCustomGradientInputValue,
		/** End Read More Button Background */

		/** Start Read More Button Border */
		readMoreButtonBorder,
		readMoreButtonBorderColorSwitcher,
		readMoreButtonBorderColor,
		readMoreButtonBorderHoverColor,
		readMoreButtonBorderUnits,
		readMoreButtonDesktopBorder,
		readMoreButtonDesktopBorderCssStyle,
		readMoreButtonTabletBorder,
		readMoreButtonTabletBorderCssStyle,
		readMoreButtonMobileBorder,
		readMoreButtonMobileBorderCssStyle,
		readMoreButtonBorderLink,
		/** End Read More Button Border */

		/** Start Read More Button Border Radius */
		readMoreButtonBorderRadiusUnits,
		readMoreButtonDesktopBorderRadius,
		readMoreButtonDesktopBorderRadiusCssStyle,
		readMoreButtonTabletBorderRadius,
		readMoreButtonTabletBorderRadiusCssStyle,
		readMoreButtonMobileBorderRadius,
		readMoreButtonMobileBorderRadiusCssStyle,
		readMoreButtonBorderRadiusLink,
		/** End Read More Button Border Radius */

		/** Start Read More Button Box Shadow */
		readMoreButtonBoxShadowValuesSwitcher,
		readMoreButtonBoxShadowValues,
		readMoreButtonBoxShadowCssValue,
		readMoreButtonBoxShadowHoverValues,
		readMoreButtonBoxShadowHoverCssValue,
		/** End Read More Button Box Shadow */

		/** Start Read More Button Margin */
		readMoreButtonMarginUnits,
		readMoreButtonDesktopMargin,
		readMoreButtonDesktopMarginCssStyle,
		readMoreButtonTabletMargin,
		readMoreButtonTabletMarginCssStyle,
		readMoreButtonMobileMargin,
		readMoreButtonMobileMarginCssStyle,
		readMoreButtonMarginLink,
		/** End Read More Button Margin */

		/** Start Read More Button Padding */
		readMoreButtonPaddingUnits,
		readMoreButtonDesktopPadding,
		readMoreButtonDesktopPaddingCssStyle,
		readMoreButtonTabletPadding,
		readMoreButtonTabletPaddingCssStyle,
		readMoreButtonMobilePadding,
		readMoreButtonMobilePaddingCssStyle,
		readMoreButtonPaddingLink,
		/** End Read More Button Padding */

		/** Start Read More Button Icon Style */
		readMoreButtonIconSize,
		readMoreButtonIconSizeUnits,
		/** End Read More Button Icon Style */

		/** Start Read More Button Icon Dimensions */
		readMoreButtonIconWidth,
		readMoreButtonIconWidthUnits,
		readMoreButtonIconHeight,
		readMoreButtonIconHeightUnits,
		/** End Read More Button Icon Dimensions */

		/** Start Read More Button Icon Gap */
		readMoreButtonIconGap,
		readMoreButtonIconGapUnits,
		/** End Read More Button Icon Gap */

		/** Start Read More Button Icon Rotation */
		readMoreButtonIconRotationSwitcher,
		readMoreButtonIconRotation,
		readMoreButtonIconHoverRotation,
		/** End Read More Button Icon Rotation */

		/** Start Read More Button Icon Color */
		readMoreButtonIconColorSwitcher,
		readMoreButtonIconColor,
		readMoreButtonIconColorHover,
		/** End Read More Button Icon Color */

		/** Start Read More Button Icon Background */
		readMoreButtonIconNormalBackgroundType,
		readMoreButtonIconNormalClassicColor,
		readMoreButtonIconNormalGradientColor,
		readMoreButtonIconNormalCustomGradientSwitcher,
		readMoreButtonIconNormalCustomGradientInputValue,

		readMoreButtonIconHoverBackgroundType,
		readMoreButtonIconHoverClassicColor,
		readMoreButtonIconHoverGradientColor,
		readMoreButtonIconHoverCustomGradientSwitcher,
		readMoreButtonIconHoverCustomGradientInputValue,
		/** End Read More Button Icon Background */

		/** Start Read More Button Icon Border */
		readMoreButtonIconBorder,
		readMoreButtonIconBorderColorSwitcher,
		readMoreButtonIconBorderColor,
		readMoreButtonIconBorderHoverColor,
		readMoreButtonIconBorderUnits,
		readMoreButtonIconDesktopBorder,
		readMoreButtonIconDesktopBorderCssStyle,
		readMoreButtonIconTabletBorder,
		readMoreButtonIconTabletBorderCssStyle,
		readMoreButtonIconMobileBorder,
		readMoreButtonIconMobileBorderCssStyle,
		readMoreButtonIconBorderLink,
		/** End Read More Button Icon Border */

		/** Start Read More Button Icon Border Radius */
		readMoreButtonIconBorderRadiusUnits,
		readMoreButtonIconDesktopBorderRadius,
		readMoreButtonIconDesktopBorderRadiusCssStyle,
		readMoreButtonIconTabletBorderRadius,
		readMoreButtonIconTabletBorderRadiusCssStyle,
		readMoreButtonIconMobileBorderRadius,
		readMoreButtonIconMobileBorderRadiusCssStyle,
		readMoreButtonIconBorderRadiusLink,
		/** End Read More Button Icon Border Radius */

		/** Start Read More Button Icon Box Shadow */
		readMoreButtonIconBoxShadowValuesSwitcher,
		readMoreButtonIconBoxShadowValues,
		readMoreButtonIconBoxShadowCssValue,
		readMoreButtonIconBoxShadowHoverValues,
		readMoreButtonIconBoxShadowHoverCssValue,
		/** End Read More Button Icon Box Shadow */
	} = attributes;

	/** Get Current Device Type and set device Type */
	const currentDeviceType = useDeviceType();

	useEffect( () => {
		setAttributes( { deviceType: currentDeviceType } );
	}, [ currentDeviceType ] );

	/** Normalize content order */
	const normalizedContentOrder = normalizeContentOrder( contentOrder );

	/** Load Google Font */
	if ( postTitleFontFamily && postTitleFontFamily !== 'Default' ) {
		LoadGoogleFont( postTitleFontFamily );
	}
	if ( postExcerptFontFamily && postExcerptFontFamily !== 'Default' ) {
		LoadGoogleFont( postExcerptFontFamily );
	}
	if ( postCategoryFontFamily && postCategoryFontFamily !== 'Default' ) {
		LoadGoogleFont( postCategoryFontFamily );
	}
	if ( postTagFontFamily && postTagFontFamily !== 'Default' ) {
		LoadGoogleFont( postTagFontFamily );
	}
	if ( authorNameFontFamily !== 'Default' ) {
		LoadGoogleFont( authorNameFontFamily );
	}
	if ( postDateFontFamily && postDateFontFamily !== 'Default' ) {
		LoadGoogleFont( postDateFontFamily );
	}
	if ( readMoreButtonFontFamily !== 'Default' ) {
		LoadGoogleFont( readMoreButtonFontFamily );
	}

	/** Default Open Panels */
	const defaultOpenPanels = {
		general: 'show-hide-elements',
		styles: 'post-card',
		advanced: 'layout',
	};

	const [ openPanels, setOpenPanels ] = useState( defaultOpenPanels );

	const togglePanel = useCallback( ( tabName, panelKey ) => {
		setOpenPanels( ( prev ) => ( {
			...prev,
			[ tabName ]: prev[ tabName ] === panelKey ? null : panelKey,
		} ) );
	}, [] );

	/**
	 * Format Spacing
	 * @param spacing
	 * @param units
	 */
	const spacingFormat = ( spacing, units ) => {
		return spacing.top || spacing.right || spacing.bottom || spacing.left
			? `${ spacing.top }${ units } ${ spacing.right }${ units } ${ spacing.bottom }${ units } ${ spacing.left }${ units }`
			: '';
	};

	/** set the css style if have default padding */
	useEffect( () => {
		setAttributes( {
			navigationArrowDesktopBorderRadiusCssStyle: spacingFormat(
				navigationArrowDesktopBorderRadius,
				navigationArrowBorderRadiusUnits.Desktop
			),
			navigationArrowTabletBorderRadiusCssStyle: spacingFormat(
				navigationArrowTabletBorderRadius,
				navigationArrowBorderRadiusUnits.Tablet
			),
			navigationArrowMobileBorderRadiusCssStyle: spacingFormat(
				navigationArrowMobileBorderRadius,
				navigationArrowBorderRadiusUnits.Mobile
			),

			paginationNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsDesktopBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Desktop
			),
			paginationNormalDotsTabletBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsTabletBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Tablet
			),
			paginationNormalDotsMobileBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsMobileBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Mobile
			),

			postTitleDesktopMarginCssStyle: spacingFormat(
				postTitleDesktopMargin,
				postTitleMarginUnits.Desktop
			),
			postTitleTabletMarginCssStyle: spacingFormat(
				postTitleTabletMargin,
				postTitleMarginUnits.Tablet
			),
			postTitleMobileMarginCssStyle: spacingFormat(
				postTitleMobileMargin,
				postTitleMarginUnits.Mobile
			),

			postExcerptDesktopMarginCssStyle: spacingFormat(
				postExcerptDesktopMargin,
				postExcerptMarginUnits.Desktop
			),
			postExcerptTabletMarginCssStyle: spacingFormat(
				postExcerptTabletMargin,
				postExcerptMarginUnits.Tablet
			),
			postExcerptMobileMarginCssStyle: spacingFormat(
				postExcerptMobileMargin,
				postExcerptMarginUnits.Mobile
			),

			postExcerptDesktopPaddingCssStyle: spacingFormat(
				postExcerptDesktopPadding,
				postExcerptPaddingUnits.Desktop
			),
			postExcerptTabletPaddingCssStyle: spacingFormat(
				postExcerptTabletPadding,
				postExcerptPaddingUnits.Tablet
			),
			postExcerptMobilePaddingCssStyle: spacingFormat(
				postExcerptMobilePadding,
				postExcerptPaddingUnits.Mobile
			),

			postCategoryDesktopMarginCssStyle: spacingFormat(
				postCategoryDesktopMargin,
				postCategoryMarginUnits.Desktop
			),
			postCategoryTabletMarginCssStyle: spacingFormat(
				postCategoryTabletMargin,
				postCategoryMarginUnits.Tablet
			),
			postCategoryMobileMarginCssStyle: spacingFormat(
				postCategoryMobileMargin,
				postCategoryMarginUnits.Mobile
			),

			postCategoryDesktopPaddingCssStyle: spacingFormat(
				postCategoryDesktopPadding,
				postCategoryPaddingUnits.Desktop
			),
			postCategoryTabletPaddingCssStyle: spacingFormat(
				postCategoryTabletPadding,
				postCategoryPaddingUnits.Tablet
			),
			postCategoryMobilePaddingCssStyle: spacingFormat(
				postCategoryMobilePadding,
				postCategoryPaddingUnits.Mobile
			),

			postCategoryItemDesktopPaddingCssStyle: spacingFormat(
				postCategoryItemDesktopPadding,
				postCategoryItemPaddingUnits.Desktop
			),
			postCategoryItemTabletPaddingCssStyle: spacingFormat(
				postCategoryItemTabletPadding,
				postCategoryItemPaddingUnits.Tablet
			),
			postCategoryItemMobilePaddingCssStyle: spacingFormat(
				postCategoryItemMobilePadding,
				postCategoryItemPaddingUnits.Mobile
			),

			postCategoryBorderDesktopCssStyle: spacingFormat(
				postCategoryBorderDesktop,
				postCategoryBorderUnits.Desktop
			),
			postCategoryBorderTabletCssStyle: spacingFormat(
				postCategoryBorderTablet,
				postCategoryBorderUnits.Tablet
			),
			postCategoryBorderMobileCssStyle: spacingFormat(
				postCategoryBorderMobile,
				postCategoryBorderUnits.Mobile
			),

			postCategoryBorderRadiusDesktopCssStyle: spacingFormat(
				postCategoryBorderRadiusDesktop,
				postCategoryBorderRadiusUnits.Desktop
			),
			postCategoryBorderRadiusTabletCssStyle: spacingFormat(
				postCategoryBorderRadiusTablet,
				postCategoryBorderRadiusUnits.Tablet
			),
			postCategoryBorderRadiusMobileCssStyle: spacingFormat(
				postCategoryBorderRadiusMobile,
				postCategoryBorderRadiusUnits.Mobile
			),

			postTagDesktopMarginCssStyle: spacingFormat(
				postTagDesktopMargin,
				postTagMarginUnits.Desktop
			),
			postTagTabletMarginCssStyle: spacingFormat(
				postTagTabletMargin,
				postTagMarginUnits.Tablet
			),
			postTagMobileMarginCssStyle: spacingFormat(
				postTagMobileMargin,
				postTagMarginUnits.Mobile
			),

			postTagDesktopPaddingCssStyle: spacingFormat(
				postTagDesktopPadding,
				postTagPaddingUnits.Desktop
			),
			postTagTabletPaddingCssStyle: spacingFormat(
				postTagTabletPadding,
				postTagPaddingUnits.Tablet
			),
			postTagMobilePaddingCssStyle: spacingFormat(
				postTagMobilePadding,
				postTagPaddingUnits.Mobile
			),

			postTagItemDesktopPaddingCssStyle: spacingFormat(
				postTagItemDesktopPadding,
				postTagItemPaddingUnits.Desktop
			),
			postTagItemTabletPaddingCssStyle: spacingFormat(
				postTagItemTabletPadding,
				postTagItemPaddingUnits.Tablet
			),
			postTagItemMobilePaddingCssStyle: spacingFormat(
				postTagItemMobilePadding,
				postTagItemPaddingUnits.Mobile
			),

			postTagBorderDesktopCssStyle: spacingFormat(
				postTagBorderDesktop,
				postTagBorderUnits.Desktop
			),
			postTagBorderTabletCssStyle: spacingFormat(
				postTagBorderTablet,
				postTagBorderUnits.Tablet
			),
			postTagBorderMobileCssStyle: spacingFormat(
				postTagBorderMobile,
				postTagBorderUnits.Mobile
			),

			postTagBorderRadiusDesktopCssStyle: spacingFormat(
				postTagBorderRadiusDesktop,
				postTagBorderRadiusUnits.Desktop
			),
			postTagBorderRadiusTabletCssStyle: spacingFormat(
				postTagBorderRadiusTablet,
				postTagBorderRadiusUnits.Tablet
			),
			postTagBorderRadiusMobileCssStyle: spacingFormat(
				postTagBorderRadiusMobile,
				postTagBorderRadiusUnits.Mobile
			),

			readMoreButtonDesktopBorderRadiusCssStyle: spacingFormat(
				readMoreButtonDesktopBorderRadius,
				readMoreButtonBorderRadiusUnits.Desktop
			),
			readMoreButtonTabletBorderRadiusCssStyle: spacingFormat(
				readMoreButtonTabletBorderRadius,
				readMoreButtonBorderRadiusUnits.Tablet
			),
			readMoreButtonMobileBorderRadiusCssStyle: spacingFormat(
				readMoreButtonMobileBorderRadius,
				readMoreButtonBorderRadiusUnits.Mobile
			),

			postCardMarginDesktopCssStyle: spacingFormat(
				postCardMarginDesktop,
				postCardMarginUnits.Desktop
			),
			postCardMarginTabletCssStyle: spacingFormat(
				postCardMarginTablet,
				postCardMarginUnits.Tablet
			),
			postCardMarginMobileCssStyle: spacingFormat(
				postCardMarginMobile,
				postCardMarginUnits.Mobile
			),

			postCardPaddingDesktopCssStyle: spacingFormat(
				postCardPaddingDesktop,
				postCardPaddingUnits.Desktop
			),
			postCardPaddingTabletCssStyle: spacingFormat(
				postCardPaddingTablet,
				postCardPaddingUnits.Tablet
			),
			postCardPaddingMobileCssStyle: spacingFormat(
				postCardPaddingMobile,
				postCardPaddingUnits.Mobile
			),

			postCardBorderDesktopCssStyle: spacingFormat(
				postCardBorderDesktop,
				postCardBorderUnits.Desktop
			),
			postCardBorderTabletCssStyle: spacingFormat(
				postCardBorderTablet,
				postCardBorderUnits.Tablet
			),
			postCardBorderMobileCssStyle: spacingFormat(
				postCardBorderMobile,
				postCardBorderUnits.Mobile
			),

			postCardBorderRadiusDesktopCssStyle: spacingFormat(
				postCardBorderRadiusDesktop,
				postCardBorderRadiusUnits.Desktop
			),
			postCardBorderRadiusTabletCssStyle: spacingFormat(
				postCardBorderRadiusTablet,
				postCardBorderRadiusUnits.Tablet
			),
			postCardBorderRadiusMobileCssStyle: spacingFormat(
				postCardBorderRadiusMobile,
				postCardBorderRadiusUnits.Mobile
			),
		} );
	}, [
		navigationArrowDesktopBorderRadius,
		navigationArrowTabletBorderRadius,
		navigationArrowMobileBorderRadius,
		navigationArrowBorderRadiusUnits,

		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsBorderRadiusUnits,

		postTitleDesktopMargin,
		postTitleTabletMargin,
		postTitleMobileMargin,
		postTitleMarginUnits,

		postExcerptDesktopMargin,
		postExcerptTabletMargin,
		postExcerptMobileMargin,
		postExcerptMarginUnits,

		postExcerptDesktopPadding,
		postExcerptTabletPadding,
		postExcerptMobilePadding,
		postExcerptPaddingUnits,

		postCategoryDesktopMargin,
		postCategoryTabletMargin,
		postCategoryMobileMargin,
		postCategoryMarginUnits,

		postCategoryDesktopPadding,
		postCategoryTabletPadding,
		postCategoryMobilePadding,
		postCategoryPaddingUnits,

		postCategoryItemDesktopPadding,
		postCategoryItemTabletPadding,
		postCategoryItemMobilePadding,
		postCategoryItemPaddingUnits,

		postCategoryBorderDesktop,
		postCategoryBorderTablet,
		postCategoryBorderMobile,
		postCategoryBorderUnits,

		postCategoryBorderRadiusDesktop,
		postCategoryBorderRadiusTablet,
		postCategoryBorderRadiusMobile,
		postCategoryBorderRadiusUnits,

		postTagDesktopMargin,
		postTagTabletMargin,
		postTagMobileMargin,
		postTagMarginUnits,

		postTagDesktopPadding,
		postTagTabletPadding,
		postTagMobilePadding,
		postTagPaddingUnits,

		postTagItemDesktopPadding,
		postTagItemTabletPadding,
		postTagItemMobilePadding,
		postTagItemPaddingUnits,

		postTagBorderDesktop,
		postTagBorderTablet,
		postTagBorderMobile,
		postTagBorderUnits,

		postTagBorderRadiusDesktop,
		postTagBorderRadiusTablet,
		postTagBorderRadiusMobile,
		postTagBorderRadiusUnits,

		readMoreButtonDesktopBorderRadius,
		readMoreButtonTabletBorderRadius,
		readMoreButtonMobileBorderRadius,

		postCardMarginDesktop,
		postCardMarginTablet,
		postCardMarginMobile,
		postCardMarginUnits,

		postCardPaddingDesktop,
		postCardPaddingTablet,
		postCardPaddingMobile,
		postCardPaddingUnits,

		postCardBorderDesktop,
		postCardBorderTablet,
		postCardBorderMobile,
		postCardBorderUnits,

		postCardBorderRadiusDesktop,
		postCardBorderRadiusTablet,
		postCardBorderRadiusMobile,
		postCardBorderRadiusUnits,
	] );
	/** end if have default padding then set the css style */

	/**
	 * Navigation Custom Arrows
	 * @param IconName
	 */
	const navigationArrowsIconLeftHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconLeft: IconName } );
	};
	const navigationArrowsIconRightHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconRight: IconName } );
	};
	/** End Navigation Custom Arrows */

	/**
	 * Start Read more button icon
	 * @param IconName
	 */
	const readMoreButtonIconHandler = ( IconName ) => {
		setAttributes( { readMoreButtonIcon: IconName } );
	};
	/** End Read more button icon */

	/** Generate svg icon for frontend */
	useEffect( () => {
		setAttributes( {
			readMoreButtonIconHtml: generateSvgIcon( readMoreButtonIcon ),
		} );
	}, [ readMoreButtonIcon ] );

	useEffect( () => {
		setAttributes( {
			navigationArrowsIconLeftHtml: generateSvgIcon(
				navigationArrowsIconLeft
			),
		} );
	}, [ navigationArrowsIconLeft ] );

	useEffect( () => {
		setAttributes( {
			navigationArrowsIconRightHtml: generateSvgIcon(
				navigationArrowsIconRight
			),
		} );
	}, [ navigationArrowsIconRight ] );
	/** End Generate svg icon for frontend */

	/**
	 * Inspector General Controls
	 * @param value
	 * @param newOrder
	 */
	const generalControls = (
		<>
			<PanelBody
				title={ __( 'Show / Hide Elements', 'gslider-blocks' ) }
				opened={ openPanels.general === 'show-hide-elements' }
				onToggle={ () =>
					togglePanel( 'general', 'show-hide-elements' )
				}
			>
				<ResponsiveToggleControl
					label={ __( 'Show Navigation', 'gslider-blocks' ) }
					toggleValue={ showNavigation }
					setToggleValue={ ( value ) =>
						setAttributes( { showNavigation: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Pagination', 'gslider-blocks' ) }
					toggleValue={ showPagination }
					setToggleValue={ ( value ) =>
						setAttributes( { showPagination: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Featured Image', 'gslider-blocks' ) }
					toggleValue={ showFeaturedImage }
					setToggleValue={ ( value ) =>
						setAttributes( { showFeaturedImage: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Post Title', 'gslider-blocks' ) }
					toggleValue={ showPostTitle }
					setToggleValue={ ( value ) =>
						setAttributes( { showPostTitle: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Excerpt', 'gslider-blocks' ) }
					toggleValue={ showExcerpt }
					setToggleValue={ ( value ) =>
						setAttributes( { showExcerpt: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Post Meta', 'gslider-blocks' ) }
					toggleValue={ showMeta }
					setToggleValue={ ( value ) =>
						setAttributes( { showMeta: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Taxonomy', 'gslider-blocks' ) }
					toggleValue={ showTaxonomy }
					setToggleValue={ ( value ) =>
						setAttributes( { showTaxonomy: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Read More Button', 'gslider-blocks' ) }
					toggleValue={ showReadMoreButton }
					setToggleValue={ ( value ) =>
						setAttributes( { showReadMoreButton: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Layout & Content Setting', 'gslider-blocks' ) }
				opened={ openPanels.general === 'layout-content-setting' }
				onToggle={ () =>
					togglePanel( 'general', 'layout-content-setting' )
				}
			>
				<ResponsiveRangeControl
					label={ __( 'Height', 'gslider-blocks' ) }
					rangeValue={ layoutHeight }
					onChangeValue={ ( value ) =>
						setAttributes( { layoutHeight: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { layoutHeightUnits: value } )
					}
					deviceType={ deviceType }
					units={ layoutHeightUnits }
					resetFallbackValue={ {
						px: '150',
						'%': '50',
						vh: '50',
						vw: '50',
						em: '20',
						rem: '20',
					} }
				/>

				<ResponsiveAlignmentControl
					label={ __( 'Vertical Alignment', 'gslider-blocks' ) }
					options={ VERTICAL_ALIGN }
					alignmentValue={ verticalAlign }
					setAlignmentValue={ ( value ) =>
						setAttributes( { verticalAlign: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
					className="gslider-vertical-alignment"
				/>

				<HtmlTagControl
					label={ __( 'Title Tag', 'gslider-blocks' ) }
					options={ HTML_TAGS }
					value={ postTitleHtmlTag }
					onChange={ ( value ) =>
						setAttributes( { postTitleHtmlTag: value } )
					}
				/>
			</PanelBody>

			<AnimationControl
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				opened={ openPanels.general === 'animation-settings' }
				onToggle={ () =>
					togglePanel( 'general', 'animation-settings' )
				}
			/>

			<QuerySettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				opened={ openPanels.general === 'query-settings' }
				onToggle={ () => togglePanel( 'general', 'query-settings' ) }
				panelTitle={ __( 'Query Settings', 'gslider-blocks' ) }
				deviceType={ deviceType }
				showRelatedPostsQuery={ true }
			/>

			<PanelBody
				title={ __( 'Content Order', 'gslider-blocks' ) }
				opened={ openPanels.general === 'content-order' }
				onToggle={ () => togglePanel( 'general', 'content-order' ) }
			>
				<ContentOrderControl
					label={ __( 'Post Elements Order', 'gslider-blocks' ) }
					items={ [
						{
							key: 'thumbnail',
							label: __( 'Featured Image', 'gslider-blocks' ),
							icon: 'format-image',
						},
						{
							key: 'categories',
							label: __( 'Categories', 'gslider-blocks' ),
							icon: 'category',
						},
						{
							key: 'title',
							label: __( 'Title', 'gslider-blocks' ),
							icon: 'editor-textcolor',
						},
						{
							key: 'excerpt',
							label: __( 'Excerpt', 'gslider-blocks' ),
							icon: 'editor-alignleft',
						},
						{
							key: 'meta',
							label: __( 'Author & Date Meta', 'gslider-blocks' ),
							icon: 'admin-users',
						},
						{
							key: 'readmore',
							label: __( 'Read More Link', 'gslider-blocks' ),
							icon: 'admin-links',
						},
					] }
					order={ normalizedContentOrder }
					onChange={ ( newOrder ) =>
						setAttributes( { contentOrder: newOrder } )
					}
					help={ __(
						'Drag items to reorder inside the post card',
						'gslider-blocks'
					) }
				/>

				<Select2Control
					label={ __( 'Taxonomy to Display', 'gslider-blocks' ) }
					value={ postTaxonomyDisplay }
					options={ [
						{
							label: __( 'Category', 'gslider-blocks' ),
							value: 'category',
						},
						{ label: __( 'Tag', 'gslider-blocks' ), value: 'tag' },
						{
							label: __(
								'Both (Category & Tag)',
								'gslider-blocks'
							),
							value: 'both',
						},
						{
							label: __( 'None', 'gslider-blocks' ),
							value: 'none',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { postTaxonomyDisplay: value } )
					}
				/>

				{ postTaxonomyDisplay !== 'none' && (
					<>
						<ToggleControl
							label={ __(
								'Overlay Badge on Image',
								'gslider-blocks'
							) }
							checked={ !! enableTaxonomyBadgeOverlay }
							onChange={ ( value ) =>
								setAttributes( {
									enableTaxonomyBadgeOverlay: value,
								} )
							}
						/>

						{ !! enableTaxonomyBadgeOverlay && (
							<>
								<Select2Control
									label={ __(
										'Badge Position',
										'gslider-blocks'
									) }
									value={ taxonomyBadgeOverlayPosition }
									options={ [
										{
											label: __(
												'Top Left',
												'gslider-blocks'
											),
											value: 'top-left',
										},
										{
											label: __(
												'Top Right',
												'gslider-blocks'
											),
											value: 'top-right',
										},
										{
											label: __(
												'Bottom Left',
												'gslider-blocks'
											),
											value: 'bottom-left',
										},
										{
											label: __(
												'Bottom Right',
												'gslider-blocks'
											),
											value: 'bottom-right',
										},
									] }
									onChange={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayPosition: value,
										} )
									}
								/>

								<SwitcherControl
									label={ __(
										'Badge Visibility',
										'gslider-blocks'
									) }
									options={ [
										{
											label: __(
												'Always',
												'gslider-blocks'
											),
											value: 'always',
										},
										{
											label: __(
												'On Hover',
												'gslider-blocks'
											),
											value: 'hover',
										},
									] }
									value={ taxonomyBadgeOverlayVisibility }
									onChange={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayVisibility:
												value,
										} )
									}
								/>

								<ResponsiveRangeControl
									label={ __(
										'Badge Vertical Offset (Top/Bottom)',
										'gslider-blocks'
									) }
									rangeValue={ taxonomyBadgeOverlayTopOffset }
									onChangeValue={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayTopOffset:
												value,
										} )
									}
									onUnitChange={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayTopOffsetUnits:
												value,
										} )
									}
									deviceType={ deviceType }
									units={ taxonomyBadgeOverlayTopOffsetUnits }
									resetFallbackValue={ {
										px: '15',
										'%': '5',
										vh: '5',
										vw: '5',
										em: '1',
										rem: '1',
									} }
									unitBounds={ {
										px: { min: 0, max: 100, step: 1 },
										em: { min: 0, max: 10, step: 0.1 },
										rem: { min: 0, max: 10, step: 0.1 },
										'%': { min: 0, max: 100, step: 1 },
									} }
								/>

								<ResponsiveRangeControl
									label={ __(
										'Badge Horizontal Offset (Left/Right)',
										'gslider-blocks'
									) }
									rangeValue={
										taxonomyBadgeOverlayLeftOffset
									}
									onChangeValue={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayLeftOffset:
												value,
										} )
									}
									onUnitChange={ ( value ) =>
										setAttributes( {
											taxonomyBadgeOverlayLeftOffsetUnits:
												value,
										} )
									}
									deviceType={ deviceType }
									units={
										taxonomyBadgeOverlayLeftOffsetUnits
									}
									resetFallbackValue={ {
										px: '15',
										'%': '5',
										vh: '5',
										vw: '5',
										em: '1',
										rem: '1',
									} }
									unitBounds={ {
										px: { min: 0, max: 100, step: 1 },
										em: { min: 0, max: 10, step: 0.1 },
										rem: { min: 0, max: 10, step: 0.1 },
										'%': { min: 0, max: 100, step: 1 },
									} }
								/>
							</>
						) }
					</>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Carousel Settings', 'gslider-blocks' ) }
				opened={ openPanels.general === 'carousel-settings' }
				onToggle={ () => togglePanel( 'general', 'carousel-settings' ) }
			>
				<ResponsiveRangeControl
					min={ 1 }
					max={ 12 }
					label={ __( 'Number of Columns', 'gslider-blocks' ) }
					rangeValue={ carouselPerColumn }
					onChangeValue={ ( value ) =>
						setAttributes( { carouselPerColumn: value } )
					}
					deviceType={ deviceType }
					step={ 1 }
					resetFallbackValue={ '2' }
					isRangeUnit={ false }
				/>
				<ResponsiveRangeControl
					min={ 0 }
					max={ 200 }
					label={ __( 'Column Gap (px)', 'gslider-blocks' ) }
					rangeValue={ carouselPerColumnGap }
					onChangeValue={ ( value ) =>
						setAttributes( { carouselPerColumnGap: value } )
					}
					deviceType={ deviceType }
					step={ 1 }
					resetFallbackValue={ '' }
					isRangeUnit={ false }
				/>
				<ToggleControl
					label={ __( 'Infinite Loop', 'gslider-blocks' ) }
					checked={ infiniteLoop }
					onChange={ ( value ) =>
						setAttributes( { infiniteLoop: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Touch Swipe Control', 'gslider-blocks' ) }
					checked={ allowTouchMove }
					onChange={ ( value ) =>
						setAttributes( { allowTouchMove: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Pause on Hover', 'gslider-blocks' ) }
					checked={ pauseOnHover }
					onChange={ ( value ) =>
						setAttributes( { pauseOnHover: value } )
					}
				/>
				<ToggleControl
					label={ __(
						'Stop Autoplay at Last Slide',
						'gslider-blocks'
					) }
					checked={ stopOnLastSlide }
					onChange={ ( value ) => {
						setAttributes( { stopOnLastSlide: value } );
						if ( value ) {
							setAttributes( { infiniteLoop: false } );
							setAttributes( { autoplay: true } );
						}
					} }
				/>
				<ToggleControl
					label={ __(
						'Reverse Autoplay Direction',
						'gslider-blocks'
					) }
					checked={ reverseDirection }
					onChange={ ( value ) => {
						setAttributes( { reverseDirection: value } );
						if ( value ) {
							setAttributes( { autoplay: true } );
						}
					} }
				/>
				<ToggleControl
					label={ __( 'Mousewheel Navigation', 'gslider-blocks' ) }
					checked={ mousewheelControl }
					onChange={ ( value ) =>
						setAttributes( { mousewheelControl: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Keyboard Navigation', 'gslider-blocks' ) }
					checked={ keyboardNavigation }
					onChange={ ( value ) =>
						setAttributes( { keyboardNavigation: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Autoplay', 'gslider-blocks' ) }
					checked={ autoplay }
					onChange={ ( value ) =>
						setAttributes( { autoplay: value } )
					}
				/>
				{ autoplay && (
					<ResponsiveRangeControl
						min={ 500 }
						max={ 20000 }
						label={ __( 'Autoplay Delay (ms)', 'gslider-blocks' ) }
						rangeValue={ autoplayDelay }
						onChangeValue={ ( value ) =>
							setAttributes( { autoplayDelay: value } )
						}
						deviceType={ deviceType }
						step={ 100 }
						resetFallbackValue={ '1000' }
						isRangeUnit={ false }
					/>
				) }

				<ResponsiveRangeControl
					min={ 100 }
					max={ 5000 }
					label={ __( 'Transition Speed (ms)', 'gslider-blocks' ) }
					rangeValue={ speed }
					onChangeValue={ ( value ) =>
						setAttributes( { speed: value } )
					}
					deviceType={ deviceType }
					step={ 50 }
					resetFallbackValue={ '800' }
					isRangeUnit={ false }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Carousel Effect', 'gslider-blocks' ) }
				opened={ openPanels.general === 'carousel-effect' }
				onToggle={ () => togglePanel( 'general', 'carousel-effect' ) }
			>
				<Select2Control
					label={ __( 'Effect Type', 'gslider-blocks' ) }
					options={ CAROUSEL_EFFECT_OPTIONS }
					value={ carouselEffect }
					onChange={ ( value ) =>
						setAttributes( { carouselEffect: value } )
					}
				/>
			</PanelBody>

			{ showReadMoreButton?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Read More Button', 'gslider-blocks' ) }
					opened={ openPanels.general === 'read-more-button' }
					onToggle={ () =>
						togglePanel( 'general', 'read-more-button' )
					}
				>
					<TextControl
						label={ __(
							'Read More Button Text',
							'gslider-blocks'
						) }
						value={ readMoreButtonText }
						onChange={ ( value ) =>
							setAttributes( { readMoreButtonText: value } )
						}
					/>
					<SwitcherControl
						label={ __( 'Link Type', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'Post Permalink', 'gslider-blocks' ),
								value: 'post',
							},
							{
								label: __( 'Custom Link', 'gslider-blocks' ),
								value: 'custom',
							},
						] }
						value={ readMoreButtonLinkType }
						onChange={ ( value ) =>
							setAttributes( { readMoreButtonLinkType: value } )
						}
					/>
					{ readMoreButtonLinkType === 'custom' ? (
						<UrlControl
							url={ readMoreButtonLink }
							onChangeUrl={ ( value ) =>
								setAttributes( { readMoreButtonLink: value } )
							}
							openInNewTab={ readMoreButtonTargetLink }
							onChangeOpenInNewTab={ ( value ) =>
								setAttributes( {
									readMoreButtonTargetLink: value,
								} )
							}
							nofollow={ readMoreButtonNofollow }
							onChangeNofollow={ ( value ) =>
								setAttributes( {
									readMoreButtonNofollow: value,
								} )
							}
							sponsored={ readMoreButtonSponsored }
							onChangeSponsored={ ( value ) =>
								setAttributes( {
									readMoreButtonSponsored: value,
								} )
							}
						/>
					) : (
						<>
							<ToggleControl
								label={ __(
									'Open in New Tab',
									'gslider-blocks'
								) }
								checked={ readMoreButtonTargetLink }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreButtonTargetLink: value,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Add Nofollow rel',
									'gslider-blocks'
								) }
								checked={ readMoreButtonNofollow }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreButtonNofollow: value,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Add Sponsored rel',
									'gslider-blocks'
								) }
								checked={ readMoreButtonSponsored }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreButtonSponsored: value,
									} )
								}
							/>
						</>
					) }

					<ToggleControl
						label={ __( 'Show Read More Icon', 'gslider-blocks' ) }
						checked={ readMoreButtonIconSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								readMoreButtonIconSwitcher: value,
							} )
						}
					/>

					{ readMoreButtonIconSwitcher && (
						<>
							<BaseControl>
								<SwitcherControl
									label={ __(
										'Icon Type',
										'gslider-blocks'
									) }
									options={ ICON_TYPE }
									value={ readMoreButtonIconType }
									onChange={ ( value ) =>
										setAttributes( {
											readMoreButtonIconType: value,
										} )
									}
								/>

								{ readMoreButtonIconType === 'icon' && (
									<IconPicker
										value={ readMoreButtonIcon }
										setIconHandler={
											readMoreButtonIconHandler
										}
									/>
								) }

								{ readMoreButtonIconType === 'image' && (
									<ImageControl
										imageUrl={ readMoreButtonIconImageUrl }
										setImageUrl={ ( value ) =>
											setAttributes( {
												readMoreButtonIconImageUrl:
													value,
											} )
										}
										imageAlt={ readMoreButtonIconImageAlt }
										setImageAlt={ ( value ) =>
											setAttributes( {
												readMoreButtonIconImageAlt:
													value,
											} )
										}
										imageID={ readMoreButtonIconImageID }
										setImageID={ ( value ) =>
											setAttributes( {
												readMoreButtonIconImageID:
													value,
											} )
										}
										isImageSize={ false }
									/>
								) }
							</BaseControl>
							<SwitcherControl
								label={ __(
									'Icon Position',
									'gslider-blocks'
								) }
								options={ ICON_POSITION }
								value={ readMoreButtonIconPosition }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreButtonIconPosition: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showNavigation?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Navigation', 'gslider-blocks' ) }
					opened={ openPanels.general === 'navigation' }
					onToggle={ () => togglePanel( 'general', 'navigation' ) }
				>
					<ToggleControl
						label={ __( 'Custom Icon', 'gslider-blocks' ) }
						checked={ navigationArrowsIconSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowsIconSwitcher: value,
							} )
						}
					/>

					{ navigationArrowsIconSwitcher && (
						<>
							<BaseControl>
								<SwitcherControl
									label={ __(
										'Left Icon',
										'gslider-blocks'
									) }
									options={ ARROW_ICON_ALIGN }
									value={ navigationArrowsIconLeftAlign }
									onChange={ ( value ) =>
										setAttributes( {
											navigationArrowsIconLeftAlign:
												value,
										} )
									}
								/>

								{ navigationArrowsIconLeftAlign === 'icon' && (
									<IconPicker
										value={ navigationArrowsIconLeft }
										setIconHandler={
											navigationArrowsIconLeftHandler
										}
									/>
								) }

								{ navigationArrowsIconLeftAlign === 'image' && (
									<ImageControl
										imageUrl={
											navigationArrowsIconLeftImageUrl
										}
										setImageUrl={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageUrl:
													value,
											} )
										}
										imageAlt={
											navigationArrowsIconLeftImageAlt
										}
										setImageAlt={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageAlt:
													value,
											} )
										}
										imageID={
											navigationArrowsIconLeftImageID
										}
										setImageID={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageID:
													value,
											} )
										}
										isImageSize={ false }
									/>
								) }
							</BaseControl>

							<BaseControl>
								<SwitcherControl
									label={ __(
										'Right Icon',
										'gslider-blocks'
									) }
									options={ ARROW_ICON_ALIGN }
									value={ navigationArrowsIconRightAlign }
									onChange={ ( value ) =>
										setAttributes( {
											navigationArrowsIconRightAlign:
												value,
										} )
									}
								/>

								{ navigationArrowsIconRightAlign === 'icon' && (
									<IconPicker
										value={ navigationArrowsIconRight }
										setIconHandler={
											navigationArrowsIconRightHandler
										}
									/>
								) }

								{ navigationArrowsIconRightAlign ===
									'image' && (
									<ImageControl
										imageUrl={
											navigationArrowsIconRightImageUrl
										}
										setImageUrl={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageUrl:
													value,
											} )
										}
										imageAlt={
											navigationArrowsIconRightImageAlt
										}
										setImageAlt={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageAlt:
													value,
											} )
										}
										imageID={
											navigationArrowsIconRightImageID
										}
										setImageID={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageID:
													value,
											} )
										}
										isImageSize={ false }
									/>
								) }
							</BaseControl>
						</>
					) }

					<SwitcherControl
						label={ __( 'Positioning', 'gslider-blocks' ) }
						options={ NAVIGATION_ARROW_POSITION_TYPE }
						value={ navigationArrowPositionType }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowPositionType: value,
							} )
						}
					/>

					<Select2Control
						label={ __( 'Position', 'gslider-blocks' ) }
						options={ NAVIGATION_ARROW_POSITION }
						value={ navigationArrowPosition }
						onChange={ ( value ) =>
							setAttributes( { navigationArrowPosition: value } )
						}
					/>

					{ navigationArrowPosition !== 'center' && (
						<Select2Control
							label={ __( 'Arrow Direction', 'gslider-blocks' ) }
							options={ NAVIGATION_ARROW_DIRECTION }
							value={ navigationArrowDirection }
							onChange={ ( value ) =>
								setAttributes( {
									navigationArrowDirection: value,
								} )
							}
						/>
					) }

					{ navigationArrowPosition === 'top-left' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }
					{ navigationArrowPosition === 'top-center' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'top-right' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Right Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionRightOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionRightOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'bottom-left' && (
						<>
							<ResponsiveRangeControl
								label={ __(
									'Bottom Offset',
									'gslider-blocks'
								) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }
					{ navigationArrowPosition === 'bottom-center' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'bottom-right' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Right Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionRightOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionRightOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition !== 'center' && (
						<ResponsiveRangeControl
							label={ __( 'Gap', 'gslider-blocks' ) }
							rangeValue={ navigationArrowGap }
							onChangeValue={ ( value ) =>
								setAttributes( { navigationArrowGap: value } )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									navigationArrowGapUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ navigationArrowGapUnits }
							resetFallbackValue={ {
								px: '10',
								'%': '2',
								vh: '2',
								vw: '2',
								em: '0.75',
								rem: '0.75',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					{ navigationArrowPositionType === 'outside' && (
						<ResponsiveRangeControl
							label={ __( 'Padding', 'gslider-blocks' ) }
							rangeValue={ navigationArrowPositionOutsidePadding }
							onChangeValue={ ( value ) =>
								setAttributes( {
									navigationArrowPositionOutsidePadding:
										value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									navigationArrowPositionOutsidePaddingUnits:
										value,
								} )
							}
							deviceType={ deviceType }
							units={ navigationArrowPositionOutsidePaddingUnits }
							resetFallbackValue={ {
								px: '60',
								'%': '5',
								vh: '5',
								vw: '5',
								em: '3.75',
								rem: '3.75',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }
				</PanelBody>
			) }

			{ showPagination?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Pagination', 'gslider-blocks' ) }
					opened={ openPanels.general === 'pagination' }
					onToggle={ () => togglePanel( 'general', 'pagination' ) }
				>
					<SwitcherControl
						label={ __( 'Position', 'gslider-blocks' ) }
						options={ PAGINATION_POSITION_TYPE }
						value={ paginationPositionType }
						onChange={ ( value ) =>
							setAttributes( { paginationPositionType: value } )
						}
					/>

					<Select2Control
						label={ __( 'Type', 'gslider-blocks' ) }
						options={ PAGINATION_TYPE }
						value={ paginationType }
						onChange={ ( value ) =>
							setAttributes( { paginationType: value } )
						}
					/>

					{ paginationType === 'bullets' && (
						<ToggleControl
							label={ __( 'Dynamic Bullets', 'slider-blocks' ) }
							checked={ dynamicBullets }
							onChange={ ( value ) =>
								setAttributes( { dynamicBullets: value } )
							}
						/>
					) }
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Performance Settings', 'gslider-blocks' ) }
				opened={ openPanels.general === 'performance-settings' }
				onToggle={ () =>
					togglePanel( 'general', 'performance-settings' )
				}
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Enable Lazy Loading', 'gslider-blocks' ) }
					help={ __(
						'Delay loading of images until they are in the viewport.',
						'gslider-blocks'
					) }
					checked={ enableLazyLoad }
					onChange={ ( value ) =>
						setAttributes( { enableLazyLoad: value } )
					}
				/>
			</PanelBody>
		</>
	);

	/**
	 * Inspector Style Controls
	 * @param value
	 */
	const styleControls = (
		<>
			<PanelBody
				title={ __( 'Post Card', 'gslider-blocks' ) }
				opened={ openPanels.styles === 'post-card' }
				onToggle={ () => togglePanel( 'styles', 'post-card' ) }
			>
				<ResponsiveSpacingControl
					label={ __( 'Margin', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ postCardMarginUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { postCardMarginUnits: value } )
					}
					desktopSpacing={ postCardMarginDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { postCardMarginDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardMarginDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ postCardMarginTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { postCardMarginTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { postCardMarginTabletCssStyle: value } )
					}
					mobileSpacing={ postCardMarginMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { postCardMarginMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { postCardMarginMobileCssStyle: value } )
					}
					isLinked={ postCardMarginLink }
					onChangeLink={ ( value ) =>
						setAttributes( { postCardMarginLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ postCardPaddingUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { postCardPaddingUnits: value } )
					}
					desktopSpacing={ postCardPaddingDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { postCardPaddingDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardPaddingDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ postCardPaddingTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { postCardPaddingTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardPaddingTabletCssStyle: value,
						} )
					}
					mobileSpacing={ postCardPaddingMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { postCardPaddingMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardPaddingMobileCssStyle: value,
						} )
					}
					isLinked={ postCardPaddingLink }
					onChangeLink={ ( value ) =>
						setAttributes( { postCardPaddingLink: value } )
					}
				/>

				<BackgroundControl
					label={ __( 'Background Color', 'gslider-blocks' ) }
					deviceType={ deviceType }
					normalBackgroundType={ postCardNormalBackgroundType }
					setNormalBackgroundType={ ( value ) =>
						setAttributes( { postCardNormalBackgroundType: value } )
					}
					normalClassicColor={ postCardNormalClassicColor }
					setNormalClassicColor={ ( value ) =>
						setAttributes( { postCardNormalClassicColor: value } )
					}
					normalGradientColor={ postCardNormalGradientColor }
					setNormalGradientColor={ ( value ) =>
						setAttributes( { postCardNormalGradientColor: value } )
					}
					normalCustomGradientSwitcher={
						postCardNormalCustomGradientSwitcher
					}
					setNormalCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							postCardNormalCustomGradientSwitcher: value,
						} )
					}
					normalCustomGradientInputValue={
						postCardNormalCustomGradientInputValue
					}
					setNormalCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							postCardNormalCustomGradientInputValue: value,
						} )
					}
					hoverBackgroundType={ postCardHoverBackgroundType }
					setHoverBackgroundType={ ( value ) =>
						setAttributes( { postCardHoverBackgroundType: value } )
					}
					hoverClassicColor={ postCardHoverClassicColor }
					setHoverClassicColor={ ( value ) =>
						setAttributes( { postCardHoverClassicColor: value } )
					}
					hoverGradientColor={ postCardHoverGradientColor }
					setHoverGradientColor={ ( value ) =>
						setAttributes( { postCardHoverGradientColor: value } )
					}
					hoverCustomGradientSwitcher={
						postCardHoverCustomGradientSwitcher
					}
					setHoverCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							postCardHoverCustomGradientSwitcher: value,
						} )
					}
					hoverCustomGradientInputValue={
						postCardHoverCustomGradientInputValue
					}
					setHoverCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							postCardHoverCustomGradientInputValue: value,
						} )
					}
					setAttributes={ setAttributes }
					isBackgroundImage={ false }
				/>

				<Select2Control
					label={ __( 'Border Style', 'gslider-blocks' ) }
					options={ BORDER_STYLES }
					value={ postCardBorder }
					onChange={ ( value ) =>
						setAttributes( { postCardBorder: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Border Color', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ postCardBorderColorSwitcher }
					onChange={ ( value ) =>
						setAttributes( { postCardBorderColorSwitcher: value } )
					}
				/>

				{ postCardBorderColorSwitcher === 'normal' && (
					<ColorControl
						label={ __( 'Normal Color', 'gslider-blocks' ) }
						color={ postCardBorderColor }
						onChangeColor={ ( value ) =>
							setAttributes( { postCardBorderColor: value } )
						}
					/>
				) }

				{ postCardBorderColorSwitcher === 'hover' && (
					<ColorControl
						label={ __( 'Hover Color', 'gslider-blocks' ) }
						color={ postCardBorderHoverColor }
						onChangeColor={ ( value ) =>
							setAttributes( { postCardBorderHoverColor: value } )
						}
					/>
				) }

				<ResponsiveSpacingControl
					label={ __( 'Border Width', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ postCardBorderUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { postCardBorderUnits: value } )
					}
					desktopSpacing={ postCardBorderDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { postCardBorderDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardBorderDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ postCardBorderTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { postCardBorderTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { postCardBorderTabletCssStyle: value } )
					}
					mobileSpacing={ postCardBorderMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { postCardBorderMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { postCardBorderMobileCssStyle: value } )
					}
					isLinked={ postCardBorderLink }
					onChangeLink={ ( value ) =>
						setAttributes( { postCardBorderLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Border Radius', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ postCardBorderRadiusUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { postCardBorderRadiusUnits: value } )
					}
					desktopSpacing={ postCardBorderRadiusDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { postCardBorderRadiusDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardBorderRadiusDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ postCardBorderRadiusTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { postCardBorderRadiusTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardBorderRadiusTabletCssStyle: value,
						} )
					}
					mobileSpacing={ postCardBorderRadiusMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { postCardBorderRadiusMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( {
							postCardBorderRadiusMobileCssStyle: value,
						} )
					}
					isLinked={ postCardBorderRadiusLink }
					onChangeLink={ ( value ) =>
						setAttributes( { postCardBorderRadiusLink: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Box Shadow', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ postCardBoxShadowValuesSwitcher }
					onChange={ ( value ) =>
						setAttributes( {
							postCardBoxShadowValuesSwitcher: value,
						} )
					}
				/>

				{ postCardBoxShadowValuesSwitcher === 'normal' && (
					<BoxShadowSettingsControl
						label={ __( 'Normal Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( { postCardBoxShadowValues: value } )
						}
						initialShadowValue={ postCardBoxShadowValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( {
								postCardBoxShadowCssValue: value,
							} )
						}
					/>
				) }

				{ postCardBoxShadowValuesSwitcher === 'hover' && (
					<BoxShadowSettingsControl
						label={ __( 'Hover Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( {
								postCardBoxShadowHoverValues: value,
							} )
						}
						initialShadowValue={ postCardBoxShadowHoverValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( {
								postCardBoxShadowHoverCssValue: value,
							} )
						}
					/>
				) }
			</PanelBody>

			{ showFeaturedImage?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Image', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'image' }
					onToggle={ () => togglePanel( 'styles', 'image' ) }
				>
					<ResponsiveRangeControl
						label={ __( 'Max Width', 'gslider-blocks' ) }
						rangeValue={ imageMaxWidth }
						onChangeValue={ ( value ) =>
							setAttributes( { imageMaxWidth: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { imageMaxWidthUnits: value } )
						}
						deviceType={ deviceType }
						units={ imageMaxWidthUnits }
						resetFallbackValue={ '' }
						unitBounds={ {
							px: { min: 0, max: 1000, step: 1 },
						} }
					/>

					<ResponsiveRangeControl
						label={ __( 'Height', 'gslider-blocks' ) }
						rangeValue={ imageHeight }
						onChangeValue={ ( value ) =>
							setAttributes( { imageHeight: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { imageHeightUnits: value } )
						}
						deviceType={ deviceType }
						units={ imageHeightUnits }
						resetFallbackValue={ '' }
						unitBounds={ {
							px: { min: 0, max: 1000, step: 1 },
						} }
					/>

					<Select2Control
						label={ __( 'Object Fit', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'Cover', 'gslider-blocks' ),
								value: 'cover',
							},
							{
								label: __( 'Contain', 'gslider-blocks' ),
								value: 'contain',
							},
							{
								label: __( 'Fill', 'gslider-blocks' ),
								value: 'fill',
							},
							{
								label: __( 'None', 'gslider-blocks' ),
								value: 'none',
							},
						] }
						value={ imageObjectFit }
						onChange={ ( value ) =>
							setAttributes( { imageObjectFit: value } )
						}
					/>

					<Select2Control
						label={ __( 'Object Position', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'Center', 'gslider-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Top', 'gslider-blocks' ),
								value: 'top',
							},
							{
								label: __( 'Bottom', 'gslider-blocks' ),
								value: 'bottom',
							},
							{
								label: __( 'Left', 'gslider-blocks' ),
								value: 'left',
							},
							{
								label: __( 'Right', 'gslider-blocks' ),
								value: 'right',
							},
							{
								label: __( 'Left Top', 'gslider-blocks' ),
								value: 'left top',
							},
							{
								label: __( 'Right Top', 'gslider-blocks' ),
								value: 'right top',
							},
							{
								label: __( 'Left Bottom', 'gslider-blocks' ),
								value: 'left bottom',
							},
							{
								label: __( 'Right Bottom', 'gslider-blocks' ),
								value: 'right bottom',
							},
						] }
						value={ imageObjectPosition }
						onChange={ ( value ) =>
							setAttributes( { imageObjectPosition: value } )
						}
					/>

					<Select2Control
						label={ __( 'Hover Effect', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'None', 'gslider-blocks' ),
								value: 'none',
							},
							{
								label: __( 'Opacity', 'gslider-blocks' ),
								value: 'opacity',
							},
							{
								label: __( 'Scale', 'gslider-blocks' ),
								value: 'scale',
							},
							{
								label: __( 'Move Up', 'gslider-blocks' ),
								value: 'move-up',
							},
							{
								label: __(
									'Grayscale to Color',
									'gslider-blocks'
								),
								value: 'grayscale',
							},
							{
								label: __(
									'Opacity & Scale',
									'gslider-blocks'
								),
								value: 'both',
							},
							{
								label: __( 'Shine Sweep', 'gslider-blocks' ),
								value: 'shine-sweep',
							},
							{
								label: __( 'Overlay Fade', 'gslider-blocks' ),
								value: 'overlay-fade',
							},
							{
								label: __(
									'Overlay Slide Up',
									'gslider-blocks'
								),
								value: 'overlay-slide',
							},
							{
								label: __( 'Pan Left', 'gslider-blocks' ),
								value: 'pan-left',
							},
							{
								label: __( 'Pan Right', 'gslider-blocks' ),
								value: 'pan-right',
							},
							{
								label: __( 'Blur to Clear', 'gslider-blocks' ),
								value: 'blur-to-clear',
							},
							{
								label: __( 'Zoom Out', 'gslider-blocks' ),
								value: 'zoom-out',
							},
							{
								label: __( 'Zoom & Rotate', 'gslider-blocks' ),
								value: 'zoom-rotate',
							},
						] }
						value={ imageHoverEffect }
						onChange={ ( value ) =>
							setAttributes( { imageHoverEffect: value } )
						}
					/>

					{ ( imageHoverEffect === 'opacity' ||
						imageHoverEffect === 'both' ) && (
						<ResponsiveRangeControl
							min={ 0 }
							max={ 1 }
							step={ 0.05 }
							label={ __( 'Hover Opacity', 'gslider-blocks' ) }
							rangeValue={ imageHoverOpacity }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverOpacity: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '0.8' }
							isRangeUnit={ false }
						/>
					) }

					{ ( imageHoverEffect === 'scale' ||
						imageHoverEffect === 'both' ||
						imageHoverEffect === 'zoom-out' ||
						imageHoverEffect === 'zoom-rotate' ) && (
						<ResponsiveRangeControl
							min={ 0.8 }
							max={ 1.5 }
							step={ 0.05 }
							label={ __( 'Hover Scale', 'gslider-blocks' ) }
							rangeValue={ imageHoverScale }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverScale: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '1.05' }
							isRangeUnit={ false }
						/>
					) }

					{ imageHoverEffect === 'move-up' && (
						<ResponsiveRangeControl
							label={ __( 'Lift Amount', 'gslider-blocks' ) }
							rangeValue={ imageHoverLift }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverLift: value } )
							}
							onUnitChange={ ( value ) =>
								setAttributes( { imageHoverLiftUnits: value } )
							}
							deviceType={ deviceType }
							units={ imageHoverLiftUnits }
							resetFallbackValue={ {
								px: '10',
								'%': '5',
								em: '1',
								rem: '1',
								vw: '1',
								vh: '1',
							} }
							isRangeUnit={ true }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
								em: { min: 0, max: 10, step: 0.1 },
								rem: { min: 0, max: 10, step: 0.1 },
								'%': { min: 0, max: 100, step: 1 },
							} }
						/>
					) }

					{ imageHoverEffect === 'blur-to-clear' && (
						<ResponsiveRangeControl
							min={ 0 }
							max={ 20 }
							step={ 1 }
							label={ __( 'Hover Blur (px)', 'gslider-blocks' ) }
							rangeValue={ imageHoverBlur }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverBlur: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '4' }
							isRangeUnit={ false }
						/>
					) }

					{ imageHoverEffect === 'zoom-rotate' && (
						<ResponsiveRangeControl
							min={ -45 }
							max={ 45 }
							step={ 1 }
							label={ __( 'Hover Rotate (°)', 'gslider-blocks' ) }
							rangeValue={ imageHoverRotate }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverRotate: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '3' }
							isRangeUnit={ false }
						/>
					) }

					{ imageHoverEffect === 'grayscale' && (
						<ResponsiveRangeControl
							min={ 0 }
							max={ 100 }
							step={ 5 }
							label={ __(
								'Hover Grayscale (%)',
								'gslider-blocks'
							) }
							rangeValue={ imageHoverGrayscale }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverGrayscale: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '100' }
							isRangeUnit={ false }
						/>
					) }

					{ ( imageHoverEffect === 'pan-left' ||
						imageHoverEffect === 'pan-right' ) && (
						<ResponsiveRangeControl
							min={ 0 }
							max={ 30 }
							step={ 1 }
							label={ __( 'Pan Distance (%)', 'gslider-blocks' ) }
							rangeValue={ imageHoverPan }
							onChangeValue={ ( value ) =>
								setAttributes( { imageHoverPan: value } )
							}
							deviceType={ deviceType }
							resetFallbackValue={ '5' }
							isRangeUnit={ false }
						/>
					) }

					<ResponsiveRangeControl
						min={ 100 }
						max={ 1000 }
						step={ 50 }
						label={ __(
							'Transition Duration (ms)',
							'gslider-blocks'
						) }
						rangeValue={ imageTransitionDuration }
						onChangeValue={ ( value ) =>
							setAttributes( { imageTransitionDuration: value } )
						}
						deviceType={ deviceType }
						resetFallbackValue={ '300' }
						isRangeUnit={ false }
					/>

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageMarginUnits: value } )
						}
						desktopSpacing={ imageMarginDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { imageMarginDesktop: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageMarginDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageMarginTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imageMarginTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageMarginTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageMarginMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imageMarginMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageMarginMobileCssStyle: value,
							} )
						}
						isLinked={ imageMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imagePaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imagePaddingUnits: value } )
						}
						desktopSpacing={ imagePaddingDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { imagePaddingDesktop: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imagePaddingDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imagePaddingTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imagePaddingTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imagePaddingTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imagePaddingMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imagePaddingMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imagePaddingMobileCssStyle: value,
							} )
						}
						isLinked={ imagePaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imagePaddingLink: value } )
						}
					/>

					<BackgroundControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						deviceType={ deviceType }
						normalBackgroundType={ imageNormalBackgroundType }
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								imageNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ imageNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( { imageNormalClassicColor: value } )
						}
						normalGradientColor={ imageNormalGradientColor }
						setNormalGradientColor={ ( value ) =>
							setAttributes( { imageNormalGradientColor: value } )
						}
						normalCustomGradientSwitcher={
							imageNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								imageNormalCustomGradientSwitcher: value,
							} )
						}
						normalCustomGradientInputValue={
							imageNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								imageNormalCustomGradientInputValue: value,
							} )
						}
						hoverBackgroundType={ imageHoverBackgroundType }
						setHoverBackgroundType={ ( value ) =>
							setAttributes( { imageHoverBackgroundType: value } )
						}
						hoverClassicColor={ imageHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( { imageHoverClassicColor: value } )
						}
						hoverGradientColor={ imageHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( { imageHoverGradientColor: value } )
						}
						hoverCustomGradientSwitcher={
							imageHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								imageHoverCustomGradientSwitcher: value,
							} )
						}
						hoverCustomGradientInputValue={
							imageHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								imageHoverCustomGradientInputValue: value,
							} )
						}
						setAttributes={ setAttributes }
						isBackgroundImage={ false }
					/>

					<Select2Control
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ imageBorder }
						onChange={ ( value ) =>
							setAttributes( { imageBorder: value } )
						}
					/>

					<SwitcherControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ imageBorderColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( { imageBorderColorSwitcher: value } )
						}
					/>

					{ imageBorderColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ imageBorderColor }
							onChangeColor={ ( value ) =>
								setAttributes( { imageBorderColor: value } )
							}
						/>
					) }

					{ imageBorderColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ imageBorderHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									imageBorderHoverColor: value,
								} )
							}
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border Width', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageBorderUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageBorderUnits: value } )
						}
						desktopSpacing={ imageBorderDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { imageBorderDesktop: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageBorderTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imageBorderTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageBorderMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imageBorderMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderMobileCssStyle: value,
							} )
						}
						isLinked={ imageBorderLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageBorderLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageBorderRadiusUnits: value } )
						}
						desktopSpacing={ imageBorderRadiusDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { imageBorderRadiusDesktop: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderRadiusDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageBorderRadiusTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imageBorderRadiusTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderRadiusTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageBorderRadiusMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imageBorderRadiusMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageBorderRadiusMobileCssStyle: value,
							} )
						}
						isLinked={ imageBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageBorderRadiusLink: value } )
						}
					/>

					<SwitcherControl
						label={ __( 'Box Shadow', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ imageBoxShadowValuesSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								imageBoxShadowValuesSwitcher: value,
							} )
						}
					/>

					{ imageBoxShadowValuesSwitcher === 'normal' && (
						<BoxShadowSettingsControl
							label={ __( 'Normal Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( { imageBoxShadowValues: value } )
							}
							initialShadowValue={ imageBoxShadowValues }
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									imageBoxShadowCssValue: value,
								} )
							}
						/>
					) }

					{ imageBoxShadowValuesSwitcher === 'hover' && (
						<BoxShadowSettingsControl
							label={ __( 'Hover Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									imageBoxShadowHoverValues: value,
								} )
							}
							initialShadowValue={ imageBoxShadowHoverValues }
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									imageBoxShadowHoverCssValue: value,
								} )
							}
						/>
					) }
				</PanelBody>
			) }

			{ showTaxonomy?.[ deviceType ] &&
				( postTaxonomyDisplay === 'category' ||
					postTaxonomyDisplay === 'both' ) && (
					<PanelBody
						title={ __( 'Categories', 'gslider-blocks' ) }
						opened={ openPanels.styles === 'post-categories' }
						onToggle={ () =>
							togglePanel( 'styles', 'post-categories' )
						}
					>
						<ResponsiveTypographyControl
							fontFamily={ postCategoryFontFamily }
							onChangeFontFamily={ ( value ) =>
								setAttributes( {
									postCategoryFontFamily: value,
								} )
							}
							fontSize={ postCategoryFontSize }
							onChangeFontSize={ ( value ) =>
								setAttributes( { postCategoryFontSize: value } )
							}
							fontSizeUnits={ postCategoryFontSizeUnits }
							onChangeFontSizeUnit={ ( value ) =>
								setAttributes( {
									postCategoryFontSizeUnits: value,
								} )
							}
							fontWeight={ postCategoryFontWeight }
							onChangeFontWeight={ ( value ) =>
								setAttributes( {
									postCategoryFontWeight: value,
								} )
							}
							fontStyle={ postCategoryFontStyle }
							onChangeFontStyle={ ( value ) =>
								setAttributes( {
									postCategoryFontStyle: value,
								} )
							}
							textTransform={ postCategoryTextTransform }
							onChangeTextTransform={ ( value ) =>
								setAttributes( {
									postCategoryTextTransform: value,
								} )
							}
							textDecoration={ postCategoryTextDecoration }
							onChangeTextDecoration={ ( value ) =>
								setAttributes( {
									postCategoryTextDecoration: value,
								} )
							}
							lineHeight={ postCategoryLineHeight }
							onChangeLineHeight={ ( value ) =>
								setAttributes( {
									postCategoryLineHeight: value,
								} )
							}
							lineHeightUnits={ postCategoryLineHeightUnits }
							onChangeLineHeightUnit={ ( value ) =>
								setAttributes( {
									postCategoryLineHeightUnits: value,
								} )
							}
							letterSpacing={ postCategoryLetterSpacing }
							onChangeLetterSpacing={ ( value ) =>
								setAttributes( {
									postCategoryLetterSpacing: value,
								} )
							}
							letterSpacingUnits={
								postCategoryLetterSpacingUnits
							}
							onChangeLetterSpacingUnit={ ( value ) =>
								setAttributes( {
									postCategoryLetterSpacingUnits: value,
								} )
							}
							wordSpacing={ postCategoryWordSpacing }
							onChangeWordSpacing={ ( value ) =>
								setAttributes( {
									postCategoryWordSpacing: value,
								} )
							}
							wordSpacingUnits={ postCategoryWordSpacingUnits }
							onChangeWordSpacingUnit={ ( value ) =>
								setAttributes( {
									postCategoryWordSpacingUnits: value,
								} )
							}
							deviceType={ deviceType }
						/>

						<ResponsiveAlignmentControl
							label={ __( 'Alignment', 'gslider-blocks' ) }
							options={ TEXT_ALIGN }
							alignmentValue={ postCategoryAlign }
							setAlignmentValue={ ( value ) =>
								setAttributes( { postCategoryAlign: value } )
							}
							deviceType={ deviceType }
							setAttributes={ setAttributes }
						/>

						<SwitcherControl
							label={ __( 'Text Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ postCategoryColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									postCategoryColorSwitcher: value,
								} )
							}
						/>

						{ postCategoryColorSwitcher === 'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ postCategoryColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										postCategoryColor: value,
									} )
								}
								defaultColor=""
							/>
						) }

						{ postCategoryColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ postCategoryColorHover }
								onChangeColor={ ( value ) =>
									setAttributes( {
										postCategoryColorHover: value,
									} )
								}
								defaultColor=""
							/>
						) }

						<BackgroundControl
							label={ __( 'Background Color', 'gslider-blocks' ) }
							deviceType={ deviceType }
							normalBackgroundType={
								postCategoryNormalBackgroundType
							}
							setNormalBackgroundType={ ( value ) =>
								setAttributes( {
									postCategoryNormalBackgroundType: value,
								} )
							}
							normalClassicColor={
								postCategoryNormalClassicColor
							}
							setNormalClassicColor={ ( value ) =>
								setAttributes( {
									postCategoryNormalClassicColor: value,
								} )
							}
							normalGradientColor={
								postCategoryNormalGradientColor
							}
							setNormalGradientColor={ ( value ) =>
								setAttributes( {
									postCategoryNormalGradientColor: value,
								} )
							}
							normalCustomGradientSwitcher={
								postCategoryNormalCustomGradientSwitcher
							}
							setNormalCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									postCategoryNormalCustomGradientSwitcher:
										value,
								} )
							}
							normalCustomGradientInputValue={
								postCategoryNormalCustomGradientInputValue
							}
							setNormalCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									postCategoryNormalCustomGradientInputValue:
										value,
								} )
							}
							hoverBackgroundType={
								postCategoryHoverBackgroundType
							}
							setHoverBackgroundType={ ( value ) =>
								setAttributes( {
									postCategoryHoverBackgroundType: value,
								} )
							}
							hoverClassicColor={ postCategoryHoverClassicColor }
							setHoverClassicColor={ ( value ) =>
								setAttributes( {
									postCategoryHoverClassicColor: value,
								} )
							}
							hoverGradientColor={
								postCategoryHoverGradientColor
							}
							setHoverGradientColor={ ( value ) =>
								setAttributes( {
									postCategoryHoverGradientColor: value,
								} )
							}
							hoverCustomGradientSwitcher={
								postCategoryHoverCustomGradientSwitcher
							}
							setHoverCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									postCategoryHoverCustomGradientSwitcher:
										value,
								} )
							}
							hoverCustomGradientInputValue={
								postCategoryHoverCustomGradientInputValue
							}
							setHoverCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									postCategoryHoverCustomGradientInputValue:
										value,
								} )
							}
							setAttributes={ setAttributes }
							isBackgroundImage={ false }
						/>

						<Select2Control
							label={ __( 'Border Style', 'gslider-blocks' ) }
							options={ BORDER_STYLES }
							value={ postCategoryBorder }
							onChange={ ( value ) =>
								setAttributes( { postCategoryBorder: value } )
							}
						/>

						{ postCategoryBorder !== 'none' && (
							<>
								<SwitcherControl
									label={ __(
										'Border Color',
										'gslider-blocks'
									) }
									options={ NORMAL_HOVER }
									value={ postCategoryBorderColorSwitcher }
									onChange={ ( value ) =>
										setAttributes( {
											postCategoryBorderColorSwitcher:
												value,
										} )
									}
								/>

								{ postCategoryBorderColorSwitcher ===
									'normal' && (
									<ColorControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										color={ postCategoryBorderColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												postCategoryBorderColor: value,
											} )
										}
									/>
								) }

								{ postCategoryBorderColorSwitcher ===
									'hover' && (
									<ColorControl
										label={ __(
											'Hover Color',
											'gslider-blocks'
										) }
										color={ postCategoryBorderHoverColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												postCategoryBorderHoverColor:
													value,
											} )
										}
									/>
								) }

								<ResponsiveSpacingControl
									label={ __(
										'Border Width',
										'gslider-blocks'
									) }
									deviceType={ deviceType }
									onChangeDeviceType={ ( value ) =>
										setAttributes( { deviceType: value } )
									}
									units={ postCategoryBorderUnits }
									onChangeUnits={ ( value ) =>
										setAttributes( {
											postCategoryBorderUnits: value,
										} )
									}
									desktopSpacing={ postCategoryBorderDesktop }
									onChangeDesktopSpacing={ ( value ) =>
										setAttributes( {
											postCategoryBorderDesktop: value,
										} )
									}
									desktopSpacingStyle={ ( value ) =>
										setAttributes( {
											postCategoryBorderDesktopCssStyle:
												value,
										} )
									}
									tabletSpacing={ postCategoryBorderTablet }
									onChangeTabletSpacing={ ( value ) =>
										setAttributes( {
											postCategoryBorderTablet: value,
										} )
									}
									tabletSpacingStyle={ ( value ) =>
										setAttributes( {
											postCategoryBorderTabletCssStyle:
												value,
										} )
									}
									mobileSpacing={ postCategoryBorderMobile }
									onChangeMobileSpacing={ ( value ) =>
										setAttributes( {
											postCategoryBorderMobile: value,
										} )
									}
									mobileSpacingStyle={ ( value ) =>
										setAttributes( {
											postCategoryBorderMobileCssStyle:
												value,
										} )
									}
									isLinked={ postCategoryBorderLink }
									onChangeLink={ ( value ) =>
										setAttributes( {
											postCategoryBorderLink: value,
										} )
									}
								/>
							</>
						) }

						<ResponsiveSpacingControl
							label={ __( 'Border Radius', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postCategoryBorderRadiusUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusUnits: value,
								} )
							}
							desktopSpacing={ postCategoryBorderRadiusDesktop }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusDesktop: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusDesktopCssStyle:
										value,
								} )
							}
							tabletSpacing={ postCategoryBorderRadiusTablet }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusTablet: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusTabletCssStyle:
										value,
								} )
							}
							mobileSpacing={ postCategoryBorderRadiusMobile }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusMobile: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusMobileCssStyle:
										value,
								} )
							}
							isLinked={ postCategoryBorderRadiusLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postCategoryBorderRadiusLink: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Box Shadow', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ postCategoryBoxShadowValuesSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									postCategoryBoxShadowValuesSwitcher: value,
								} )
							}
						/>

						{ postCategoryBoxShadowValuesSwitcher === 'normal' && (
							<BoxShadowSettingsControl
								label={ __(
									'Normal Shadow',
									'gslider-blocks'
								) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										postCategoryBoxShadowValues: value,
									} )
								}
								initialShadowValue={
									postCategoryBoxShadowValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										postCategoryBoxShadowCssValue: value,
									} )
								}
							/>
						) }

						{ postCategoryBoxShadowValuesSwitcher === 'hover' && (
							<BoxShadowSettingsControl
								label={ __( 'Hover Shadow', 'gslider-blocks' ) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										postCategoryBoxShadowHoverValues: value,
									} )
								}
								initialShadowValue={
									postCategoryBoxShadowHoverValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										postCategoryBoxShadowHoverCssValue:
											value,
									} )
								}
							/>
						) }

						<ResponsiveRangeControl
							min={ 0 }
							max={ 100 }
							label={ __( 'Gap', 'gslider-blocks' ) }
							rangeValue={ postCategoryGap }
							onChangeValue={ ( value ) =>
								setAttributes( { postCategoryGap: value } )
							}
							onUnitChange={ ( value ) =>
								setAttributes( { postCategoryGapUnits: value } )
							}
							deviceType={ deviceType }
							units={ postCategoryGapUnits }
							resetFallbackValue={ {
								px: '5',
								em: '0.5',
								rem: '0.5',
							} }
						/>

						<ResponsiveSpacingControl
							label={ __( 'Margin', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postCategoryMarginUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postCategoryMarginUnits: value,
								} )
							}
							desktopSpacing={ postCategoryDesktopMargin }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postCategoryDesktopMargin: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryDesktopMarginCssStyle: value,
								} )
							}
							tabletSpacing={ postCategoryTabletMargin }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postCategoryTabletMargin: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryTabletMarginCssStyle: value,
								} )
							}
							mobileSpacing={ postCategoryMobileMargin }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postCategoryMobileMargin: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryMobileMarginCssStyle: value,
								} )
							}
							isLinked={ postCategoryMarginLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postCategoryMarginLink: value,
								} )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Padding', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postCategoryPaddingUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postCategoryPaddingUnits: value,
								} )
							}
							desktopSpacing={ postCategoryDesktopPadding }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postCategoryDesktopPadding: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryDesktopPaddingCssStyle: value,
								} )
							}
							tabletSpacing={ postCategoryTabletPadding }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postCategoryTabletPadding: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryTabletPaddingCssStyle: value,
								} )
							}
							mobileSpacing={ postCategoryMobilePadding }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postCategoryMobilePadding: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryMobilePaddingCssStyle: value,
								} )
							}
							isLinked={ postCategoryPaddingLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postCategoryPaddingLink: value,
								} )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Item Padding', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postCategoryItemPaddingUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postCategoryItemPaddingUnits: value,
								} )
							}
							desktopSpacing={ postCategoryItemDesktopPadding }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postCategoryItemDesktopPadding: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryItemDesktopPaddingCssStyle:
										value,
								} )
							}
							tabletSpacing={ postCategoryItemTabletPadding }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postCategoryItemTabletPadding: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryItemTabletPaddingCssStyle:
										value,
								} )
							}
							mobileSpacing={ postCategoryItemMobilePadding }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postCategoryItemMobilePadding: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postCategoryItemMobilePaddingCssStyle:
										value,
								} )
							}
							isLinked={ postCategoryItemPaddingLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postCategoryItemPaddingLink: value,
								} )
							}
						/>
					</PanelBody>
				) }

			{ showTaxonomy?.[ deviceType ] &&
				( postTaxonomyDisplay === 'tag' ||
					postTaxonomyDisplay === 'both' ) && (
					<PanelBody
						title={ __( 'Tags', 'gslider-blocks' ) }
						opened={ openPanels.styles === 'post-tags' }
						onToggle={ () => togglePanel( 'styles', 'post-tags' ) }
					>
						<ResponsiveTypographyControl
							fontFamily={ postTagFontFamily }
							onChangeFontFamily={ ( value ) =>
								setAttributes( { postTagFontFamily: value } )
							}
							fontSize={ postTagFontSize }
							onChangeFontSize={ ( value ) =>
								setAttributes( { postTagFontSize: value } )
							}
							fontSizeUnits={ postTagFontSizeUnits }
							onChangeFontSizeUnit={ ( value ) =>
								setAttributes( { postTagFontSizeUnits: value } )
							}
							fontWeight={ postTagFontWeight }
							onChangeFontWeight={ ( value ) =>
								setAttributes( { postTagFontWeight: value } )
							}
							fontStyle={ postTagFontStyle }
							onChangeFontStyle={ ( value ) =>
								setAttributes( { postTagFontStyle: value } )
							}
							textTransform={ postTagTextTransform }
							onChangeTextTransform={ ( value ) =>
								setAttributes( { postTagTextTransform: value } )
							}
							textDecoration={ postTagTextDecoration }
							onChangeTextDecoration={ ( value ) =>
								setAttributes( {
									postTagTextDecoration: value,
								} )
							}
							lineHeight={ postTagLineHeight }
							onChangeLineHeight={ ( value ) =>
								setAttributes( { postTagLineHeight: value } )
							}
							lineHeightUnits={ postTagLineHeightUnits }
							onChangeLineHeightUnit={ ( value ) =>
								setAttributes( {
									postTagLineHeightUnits: value,
								} )
							}
							letterSpacing={ postTagLetterSpacing }
							onChangeLetterSpacing={ ( value ) =>
								setAttributes( { postTagLetterSpacing: value } )
							}
							letterSpacingUnits={ postTagLetterSpacingUnits }
							onChangeLetterSpacingUnit={ ( value ) =>
								setAttributes( {
									postTagLetterSpacingUnits: value,
								} )
							}
							wordSpacing={ postTagWordSpacing }
							onChangeWordSpacing={ ( value ) =>
								setAttributes( { postTagWordSpacing: value } )
							}
							wordSpacingUnits={ postTagWordSpacingUnits }
							onChangeWordSpacingUnit={ ( value ) =>
								setAttributes( {
									postTagWordSpacingUnits: value,
								} )
							}
							deviceType={ deviceType }
						/>

						<ResponsiveAlignmentControl
							label={ __( 'Alignment', 'gslider-blocks' ) }
							options={ TEXT_ALIGN }
							alignmentValue={ postTagAlign }
							setAlignmentValue={ ( value ) =>
								setAttributes( { postTagAlign: value } )
							}
							deviceType={ deviceType }
							setAttributes={ setAttributes }
						/>

						<SwitcherControl
							label={ __( 'Text Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ postTagColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( { postTagColorSwitcher: value } )
							}
						/>

						{ postTagColorSwitcher === 'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ postTagColor }
								onChangeColor={ ( value ) =>
									setAttributes( { postTagColor: value } )
								}
								defaultColor=""
							/>
						) }

						{ postTagColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ postTagColorHover }
								onChangeColor={ ( value ) =>
									setAttributes( {
										postTagColorHover: value,
									} )
								}
								defaultColor=""
							/>
						) }

						<BackgroundControl
							label={ __( 'Background Color', 'gslider-blocks' ) }
							deviceType={ deviceType }
							normalBackgroundType={ postTagNormalBackgroundType }
							setNormalBackgroundType={ ( value ) =>
								setAttributes( {
									postTagNormalBackgroundType: value,
								} )
							}
							normalClassicColor={ postTagNormalClassicColor }
							setNormalClassicColor={ ( value ) =>
								setAttributes( {
									postTagNormalClassicColor: value,
								} )
							}
							normalGradientColor={ postTagNormalGradientColor }
							setNormalGradientColor={ ( value ) =>
								setAttributes( {
									postTagNormalGradientColor: value,
								} )
							}
							normalCustomGradientSwitcher={
								postTagNormalCustomGradientSwitcher
							}
							setNormalCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									postTagNormalCustomGradientSwitcher: value,
								} )
							}
							normalCustomGradientInputValue={
								postTagNormalCustomGradientInputValue
							}
							setNormalCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									postTagNormalCustomGradientInputValue:
										value,
								} )
							}
							hoverBackgroundType={ postTagHoverBackgroundType }
							setHoverBackgroundType={ ( value ) =>
								setAttributes( {
									postTagHoverBackgroundType: value,
								} )
							}
							hoverClassicColor={ postTagHoverClassicColor }
							setHoverClassicColor={ ( value ) =>
								setAttributes( {
									postTagHoverClassicColor: value,
								} )
							}
							hoverGradientColor={ postTagHoverGradientColor }
							setHoverGradientColor={ ( value ) =>
								setAttributes( {
									postTagHoverGradientColor: value,
								} )
							}
							hoverCustomGradientSwitcher={
								postTagHoverCustomGradientSwitcher
							}
							setHoverCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									postTagHoverCustomGradientSwitcher: value,
								} )
							}
							hoverCustomGradientInputValue={
								postTagHoverCustomGradientInputValue
							}
							setHoverCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									postTagHoverCustomGradientInputValue: value,
								} )
							}
							setAttributes={ setAttributes }
							isBackgroundImage={ false }
						/>

						<Select2Control
							label={ __( 'Border Style', 'gslider-blocks' ) }
							options={ BORDER_STYLES }
							value={ postTagBorder }
							onChange={ ( value ) =>
								setAttributes( { postTagBorder: value } )
							}
						/>

						{ postTagBorder !== 'none' && (
							<>
								<SwitcherControl
									label={ __(
										'Border Color',
										'gslider-blocks'
									) }
									options={ NORMAL_HOVER }
									value={ postTagBorderColorSwitcher }
									onChange={ ( value ) =>
										setAttributes( {
											postTagBorderColorSwitcher: value,
										} )
									}
								/>

								{ postTagBorderColorSwitcher === 'normal' && (
									<ColorControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										color={ postTagBorderColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												postTagBorderColor: value,
											} )
										}
									/>
								) }

								{ postTagBorderColorSwitcher === 'hover' && (
									<ColorControl
										label={ __(
											'Hover Color',
											'gslider-blocks'
										) }
										color={ postTagBorderHoverColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												postTagBorderHoverColor: value,
											} )
										}
									/>
								) }

								<ResponsiveSpacingControl
									label={ __(
										'Border Width',
										'gslider-blocks'
									) }
									deviceType={ deviceType }
									onChangeDeviceType={ ( value ) =>
										setAttributes( { deviceType: value } )
									}
									units={ postTagBorderUnits }
									onChangeUnits={ ( value ) =>
										setAttributes( {
											postTagBorderUnits: value,
										} )
									}
									desktopSpacing={ postTagBorderDesktop }
									onChangeDesktopSpacing={ ( value ) =>
										setAttributes( {
											postTagBorderDesktop: value,
										} )
									}
									desktopSpacingStyle={ ( value ) =>
										setAttributes( {
											postTagBorderDesktopCssStyle: value,
										} )
									}
									tabletSpacing={ postTagBorderTablet }
									onChangeTabletSpacing={ ( value ) =>
										setAttributes( {
											postTagBorderTablet: value,
										} )
									}
									tabletSpacingStyle={ ( value ) =>
										setAttributes( {
											postTagBorderTabletCssStyle: value,
										} )
									}
									mobileSpacing={ postTagBorderMobile }
									onChangeMobileSpacing={ ( value ) =>
										setAttributes( {
											postTagBorderMobile: value,
										} )
									}
									mobileSpacingStyle={ ( value ) =>
										setAttributes( {
											postTagBorderMobileCssStyle: value,
										} )
									}
									isLinked={ postTagBorderLink }
									onChangeLink={ ( value ) =>
										setAttributes( {
											postTagBorderLink: value,
										} )
									}
								/>
							</>
						) }

						<ResponsiveSpacingControl
							label={ __( 'Border Radius', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postTagBorderRadiusUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusUnits: value,
								} )
							}
							desktopSpacing={ postTagBorderRadiusDesktop }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusDesktop: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusDesktopCssStyle: value,
								} )
							}
							tabletSpacing={ postTagBorderRadiusTablet }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusTablet: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusTabletCssStyle: value,
								} )
							}
							mobileSpacing={ postTagBorderRadiusMobile }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusMobile: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusMobileCssStyle: value,
								} )
							}
							isLinked={ postTagBorderRadiusLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postTagBorderRadiusLink: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Box Shadow', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ postTagBoxShadowValuesSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									postTagBoxShadowValuesSwitcher: value,
								} )
							}
						/>

						{ postTagBoxShadowValuesSwitcher === 'normal' && (
							<BoxShadowSettingsControl
								label={ __(
									'Normal Shadow',
									'gslider-blocks'
								) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										postTagBoxShadowValues: value,
									} )
								}
								initialShadowValue={ postTagBoxShadowValues }
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										postTagBoxShadowCssValue: value,
									} )
								}
							/>
						) }

						{ postTagBoxShadowValuesSwitcher === 'hover' && (
							<BoxShadowSettingsControl
								label={ __( 'Hover Shadow', 'gslider-blocks' ) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										postTagBoxShadowHoverValues: value,
									} )
								}
								initialShadowValue={
									postTagBoxShadowHoverValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										postTagBoxShadowHoverCssValue: value,
									} )
								}
							/>
						) }

						<ResponsiveRangeControl
							min={ 0 }
							max={ 100 }
							label={ __( 'Gap', 'gslider-blocks' ) }
							rangeValue={ postTagGap }
							onChangeValue={ ( value ) =>
								setAttributes( { postTagGap: value } )
							}
							onUnitChange={ ( value ) =>
								setAttributes( { postTagGapUnits: value } )
							}
							deviceType={ deviceType }
							units={ postTagGapUnits }
							resetFallbackValue={ {
								px: '5',
								em: '0.5',
								rem: '0.5',
							} }
						/>

						<ResponsiveSpacingControl
							label={ __( 'Margin', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postTagMarginUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( { postTagMarginUnits: value } )
							}
							desktopSpacing={ postTagDesktopMargin }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( { postTagDesktopMargin: value } )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagDesktopMarginCssStyle: value,
								} )
							}
							tabletSpacing={ postTagTabletMargin }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( { postTagTabletMargin: value } )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagTabletMarginCssStyle: value,
								} )
							}
							mobileSpacing={ postTagMobileMargin }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( { postTagMobileMargin: value } )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagMobileMarginCssStyle: value,
								} )
							}
							isLinked={ postTagMarginLink }
							onChangeLink={ ( value ) =>
								setAttributes( { postTagMarginLink: value } )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Padding', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postTagPaddingUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( { postTagPaddingUnits: value } )
							}
							desktopSpacing={ postTagDesktopPadding }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postTagDesktopPadding: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagDesktopPaddingCssStyle: value,
								} )
							}
							tabletSpacing={ postTagTabletPadding }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( { postTagTabletPadding: value } )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagTabletPaddingCssStyle: value,
								} )
							}
							mobileSpacing={ postTagMobilePadding }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( { postTagMobilePadding: value } )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagMobilePaddingCssStyle: value,
								} )
							}
							isLinked={ postTagPaddingLink }
							onChangeLink={ ( value ) =>
								setAttributes( { postTagPaddingLink: value } )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Item Padding', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ postTagItemPaddingUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									postTagItemPaddingUnits: value,
								} )
							}
							desktopSpacing={ postTagItemDesktopPadding }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									postTagItemDesktopPadding: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagItemDesktopPaddingCssStyle: value,
								} )
							}
							tabletSpacing={ postTagItemTabletPadding }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									postTagItemTabletPadding: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagItemTabletPaddingCssStyle: value,
								} )
							}
							mobileSpacing={ postTagItemMobilePadding }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									postTagItemMobilePadding: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									postTagItemMobilePaddingCssStyle: value,
								} )
							}
							isLinked={ postTagItemPaddingLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									postTagItemPaddingLink: value,
								} )
							}
						/>
					</PanelBody>
				) }

			{ showPostTitle?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Title', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'post-title' }
					onToggle={ () => togglePanel( 'styles', 'post-title' ) }
				>
					<ToggleControl
						label={ __( 'Limit Title Length', 'gslider-blocks' ) }
						checked={ enablePostTitleLimit }
						onChange={ ( value ) =>
							setAttributes( { enablePostTitleLimit: value } )
						}
					/>

					{ enablePostTitleLimit && (
						<>
							<SwitcherControl
								label={ __( 'Limit Type', 'gslider-blocks' ) }
								options={ [
									{
										label: __( 'Words', 'gslider-blocks' ),
										value: 'words',
									},
									{
										label: __(
											'Characters',
											'gslider-blocks'
										),
										value: 'characters',
									},
								] }
								value={ postTitleLimitType }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleLimitType: value,
									} )
								}
							/>
							<ResponsiveRangeControl
								min={ 1 }
								max={
									postTitleLimitType === 'words' ? 100 : 500
								}
								label={
									postTitleLimitType === 'words'
										? __( 'Word Limit', 'gslider-blocks' )
										: __(
												'Character Limit',
												'gslider-blocks'
										  )
								}
								rangeValue={ postTitleLimit }
								onChangeValue={ ( value ) =>
									setAttributes( { postTitleLimit: value } )
								}
								deviceType={ deviceType }
								step={ 1 }
								resetFallbackValue={
									postTitleLimitType === 'words' ? '10' : '50'
								}
								isRangeUnit={ false }
							/>
							<TextControl
								label={ __( 'Trim Suffix', 'gslider-blocks' ) }
								value={ postTitleLimitSuffix }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleLimitSuffix: value,
									} )
								}
							/>
						</>
					) }

					<ToggleControl
						label={ __( 'Link Title', 'gslider-blocks' ) }
						checked={ enablePostTitleLink }
						onChange={ ( value ) =>
							setAttributes( { enablePostTitleLink: value } )
						}
					/>

					{ enablePostTitleLink && (
						<>
							<ToggleControl
								label={ __(
									'Open in New Tab',
									'gslider-blocks'
								) }
								checked={ postTitleLinkTarget }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleLinkTarget: value,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Add nofollow rel',
									'gslider-blocks'
								) }
								checked={ postTitleLinkNofollow }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleLinkNofollow: value,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Add sponsored rel',
									'gslider-blocks'
								) }
								checked={ postTitleLinkSponsored }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleLinkSponsored: value,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Underline Hover Animation',
									'gslider-blocks'
								) }
								checked={ enablePostTitleHoverUnderlineAnim }
								onChange={ ( value ) =>
									setAttributes( {
										enablePostTitleHoverUnderlineAnim:
											value,
									} )
								}
							/>
							{ enablePostTitleHoverUnderlineAnim && (
								<>
									<ColorControl
										label={ __(
											'Underline Hover Color',
											'gslider-blocks'
										) }
										color={ postTitleHoverUnderlineColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												postTitleHoverUnderlineColor:
													value,
											} )
										}
										defaultColor=""
									/>
									<ResponsiveRangeControl
										label={ __(
											'Underline Thickness (Height)',
											'gslider-blocks'
										) }
										rangeValue={
											postTitleHoverUnderlineHeight
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												postTitleHoverUnderlineHeight:
													value,
											} )
										}
										deviceType={ deviceType }
										isRangeUnit={ false }
										min={ 1 }
										max={ 10 }
										step={ 1 }
										resetFallbackValue="2"
									/>
									<ResponsiveRangeControl
										label={ __(
											'Underline Bottom Offset',
											'gslider-blocks'
										) }
										rangeValue={
											postTitleHoverUnderlineBottomOffset
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												postTitleHoverUnderlineBottomOffset:
													value,
											} )
										}
										deviceType={ deviceType }
										isRangeUnit={ false }
										min={ -20 }
										max={ 20 }
										step={ 1 }
										resetFallbackValue="-2"
									/>
									<ResponsiveRangeControl
										label={ __(
											'Underline Transition Speed (Seconds)',
											'gslider-blocks'
										) }
										rangeValue={
											postTitleHoverUnderlineTransitionSpeed
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												postTitleHoverUnderlineTransitionSpeed:
													value,
											} )
										}
										deviceType={ deviceType }
										isRangeUnit={ false }
										min={ 0.1 }
										max={ 2 }
										step={ 0.1 }
										resetFallbackValue="0.3"
									/>
								</>
							) }
						</>
					) }

					<ResponsiveTypographyControl
						fontFamily={ postTitleFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( { postTitleFontFamily: value } )
						}
						fontSize={ postTitleFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { postTitleFontSize: value } )
						}
						fontSizeUnits={ postTitleFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( { postTitleFontSizeUnits: value } )
						}
						fontWeight={ postTitleFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( { postTitleFontWeight: value } )
						}
						fontStyle={ postTitleFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { postTitleFontStyle: value } )
						}
						textTransform={ postTitleTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( { postTitleTextTransform: value } )
						}
						textDecoration={ postTitleTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( { postTitleTextDecoration: value } )
						}
						lineHeight={ postTitleLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( { postTitleLineHeight: value } )
						}
						lineHeightUnits={ postTitleLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( { postTitleLineHeightUnits: value } )
						}
						letterSpacing={ postTitleLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( { postTitleLetterSpacing: value } )
						}
						letterSpacingUnits={ postTitleLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								postTitleLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ postTitleWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( { postTitleWordSpacing: value } )
						}
						wordSpacingUnits={ postTitleWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								postTitleWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>

					<ResponsiveAlignmentControl
						label={ __( 'Alignment', 'gslider-blocks' ) }
						options={ TEXT_ALIGN }
						alignmentValue={ postTitleAlign }
						setAlignmentValue={ ( value ) =>
							setAttributes( { postTitleAlign: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>

					<BackgroundControl
						label={ __( 'Title Color', 'gslider-blocks' ) }
						deviceType={ deviceType }
						backgroundTypeLabel={ __(
							'Color Type',
							'gslider-blocks'
						) }
						normalClassicColorLabel={ __(
							'Color',
							'gslider-blocks'
						) }
						hoverClassicColorLabel={ __(
							'Hover Color',
							'gslider-blocks'
						) }
						normalBackgroundType={ postTitleNormalBackgroundType }
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								postTitleNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ postTitleNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( {
								postTitleNormalClassicColor: value,
							} )
						}
						normalGradientColor={ postTitleNormalGradientColor }
						setNormalGradientColor={ ( value ) =>
							setAttributes( {
								postTitleNormalGradientColor: value,
							} )
						}
						normalCustomGradientSwitcher={
							postTitleNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								postTitleNormalCustomGradientSwitcher: value,
							} )
						}
						normalCustomGradientInputValue={
							postTitleNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								postTitleNormalCustomGradientInputValue: value,
							} )
						}
						hoverBackgroundType={ postTitleHoverBackgroundType }
						setHoverBackgroundType={ ( value ) =>
							setAttributes( {
								postTitleHoverBackgroundType: value,
							} )
						}
						hoverClassicColor={ postTitleHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( {
								postTitleHoverClassicColor: value,
							} )
						}
						hoverGradientColor={ postTitleHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( {
								postTitleHoverGradientColor: value,
							} )
						}
						hoverCustomGradientSwitcher={
							postTitleHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								postTitleHoverCustomGradientSwitcher: value,
							} )
						}
						hoverCustomGradientInputValue={
							postTitleHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								postTitleHoverCustomGradientInputValue: value,
							} )
						}
						setAttributes={ setAttributes }
						isBackgroundImage={ false }
					/>

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ postTitleMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { postTitleMarginUnits: value } )
						}
						desktopSpacing={ postTitleDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { postTitleDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ postTitleTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { postTitleTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ postTitleMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { postTitleMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleMobileMarginCssStyle: value,
							} )
						}
						isLinked={ postTitleMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { postTitleMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ postTitlePaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { postTitlePaddingUnits: value } )
						}
						desktopSpacing={ postTitleDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { postTitleDesktopPadding: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ postTitleTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { postTitleTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ postTitleMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { postTitleMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								postTitleMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ postTitlePaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { postTitlePaddingLink: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Bottom Divider', 'gslider-blocks' ) }
						checked={ showPostTitleDivider }
						onChange={ ( value ) =>
							setAttributes( { showPostTitleDivider: value } )
						}
					/>

					{ showPostTitleDivider && (
						<>
							<Select2Control
								label={ __(
									'Divider Style',
									'gslider-blocks'
								) }
								options={ [
									{
										label: __( 'Solid', 'gslider-blocks' ),
										value: 'solid',
									},
									{
										label: __( 'Dashed', 'gslider-blocks' ),
										value: 'dashed',
									},
									{
										label: __( 'Dotted', 'gslider-blocks' ),
										value: 'dotted',
									},
									{
										label: __( 'Double', 'gslider-blocks' ),
										value: 'double',
									},
									{
										label: __(
											'Gradient',
											'gslider-blocks'
										),
										value: 'gradient',
									},
								] }
								value={ postTitleDividerStyle }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleDividerStyle: value,
									} )
								}
							/>
							{ postTitleDividerStyle !== 'gradient' && (
								<>
									<SwitcherControl
										label={ __(
											'Divider Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={ postTitleDividerColorSwitcher }
										onChange={ ( value ) =>
											setAttributes( {
												postTitleDividerColorSwitcher:
													value,
											} )
										}
									/>
									{ postTitleDividerColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={ postTitleDividerColor }
											onChangeColor={ ( value ) =>
												setAttributes( {
													postTitleDividerColor:
														value,
												} )
											}
											defaultColor="#333333"
										/>
									) }
									{ postTitleDividerColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={ postTitleDividerHoverColor }
											onChangeColor={ ( value ) =>
												setAttributes( {
													postTitleDividerHoverColor:
														value,
												} )
											}
											defaultColor=""
										/>
									) }
								</>
							) }
							<ResponsiveRangeControl
								label={ __(
									'Divider Width',
									'gslider-blocks'
								) }
								rangeValue={ postTitleDividerWidth }
								onChangeValue={ ( value ) =>
									setAttributes( {
										postTitleDividerWidth: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										postTitleDividerWidthUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ postTitleDividerWidthUnits }
								resetFallbackValue={ {
									px: '50',
									'%': '30',
								} }
							/>
							<ResponsiveRangeControl
								label={ __(
									'Divider Height (Thickness)',
									'gslider-blocks'
								) }
								rangeValue={ postTitleDividerHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										postTitleDividerHeight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										postTitleDividerHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ postTitleDividerHeightUnits }
								resetFallbackValue={ {
									px: '2',
								} }
							/>
							<ToggleControl
								label={ __(
									'Expand Divider on Hover',
									'gslider-blocks'
								) }
								checked={ enablePostTitleDividerHoverExpand }
								onChange={ ( value ) =>
									setAttributes( {
										enablePostTitleDividerHoverExpand:
											value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showExcerpt?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Excerpt', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'post-excerpt' }
					onToggle={ () => togglePanel( 'styles', 'post-excerpt' ) }
				>
					<HtmlTagControl
						label={ __( 'Html Tag', 'gslider-blocks' ) }
						options={ HTML_TAGS }
						value={ postExcerptHtmlTag }
						onChange={ ( value ) =>
							setAttributes( { postExcerptHtmlTag: value } )
						}
					/>

					<Select2Control
						label={ __( 'Excerpt Source', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'Auto Fallback', 'gslider-blocks' ),
								value: 'auto',
							},
							{
								label: __(
									'Manual Excerpt Only',
									'gslider-blocks'
								),
								value: 'excerpt',
							},
							{
								label: __(
									'Post Content Only',
									'gslider-blocks'
								),
								value: 'content',
							},
						] }
						value={ postExcerptSource }
						onChange={ ( value ) =>
							setAttributes( { postExcerptSource: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Limit Excerpt Length', 'gslider-blocks' ) }
						checked={ enablePostExcerptLimit }
						onChange={ ( value ) =>
							setAttributes( { enablePostExcerptLimit: value } )
						}
					/>

					{ enablePostExcerptLimit && (
						<>
							<SwitcherControl
								label={ __( 'Limit Type', 'gslider-blocks' ) }
								options={ [
									{
										label: __( 'Words', 'gslider-blocks' ),
										value: 'words',
									},
									{
										label: __(
											'Characters',
											'gslider-blocks'
										),
										value: 'characters',
									},
								] }
								value={ postExcerptLimitType }
								onChange={ ( value ) =>
									setAttributes( {
										postExcerptLimitType: value,
									} )
								}
							/>
							<ResponsiveRangeControl
								min={ 1 }
								max={
									postExcerptLimitType === 'words'
										? 200
										: 1000
								}
								label={
									postExcerptLimitType === 'words'
										? __( 'Word Limit', 'gslider-blocks' )
										: __(
												'Character Limit',
												'gslider-blocks'
										  )
								}
								rangeValue={ postExcerptLimit }
								onChangeValue={ ( value ) =>
									setAttributes( { postExcerptLimit: value } )
								}
								deviceType={ deviceType }
								step={ 1 }
								resetFallbackValue={
									postExcerptLimitType === 'words'
										? '20'
										: '100'
								}
								isRangeUnit={ false }
							/>
							<TextControl
								label={ __( 'Trim Suffix', 'gslider-blocks' ) }
								value={ postExcerptLimitSuffix }
								onChange={ ( value ) =>
									setAttributes( {
										postExcerptLimitSuffix: value,
									} )
								}
							/>
						</>
					) }

					<ResponsiveRangeControl
						min={ 1 }
						max={ 10 }
						label={ __(
							'Line Clamp (CSS Lines Limit)',
							'gslider-blocks'
						) }
						rangeValue={ postExcerptLineClamp }
						onChangeValue={ ( value ) =>
							setAttributes( { postExcerptLineClamp: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue=""
						isRangeUnit={ false }
					/>

					<ResponsiveTypographyControl
						fontFamily={ postExcerptFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( { postExcerptFontFamily: value } )
						}
						fontSize={ postExcerptFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { postExcerptFontSize: value } )
						}
						fontSizeUnits={ postExcerptFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( { postExcerptFontSizeUnits: value } )
						}
						fontWeight={ postExcerptFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( { postExcerptFontWeight: value } )
						}
						fontStyle={ postExcerptFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { postExcerptFontStyle: value } )
						}
						textTransform={ postExcerptTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( { postExcerptTextTransform: value } )
						}
						textDecoration={ postExcerptTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								postExcerptTextDecoration: value,
							} )
						}
						lineHeight={ postExcerptLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( { postExcerptLineHeight: value } )
						}
						lineHeightUnits={ postExcerptLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								postExcerptLineHeightUnits: value,
							} )
						}
						letterSpacing={ postExcerptLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( { postExcerptLetterSpacing: value } )
						}
						letterSpacingUnits={ postExcerptLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								postExcerptLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ postExcerptWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( { postExcerptWordSpacing: value } )
						}
						wordSpacingUnits={ postExcerptWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								postExcerptWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>

					<ResponsiveAlignmentControl
						label={ __( 'Alignment', 'gslider-blocks' ) }
						options={ TEXT_ALIGN }
						alignmentValue={ postExcerptAlign }
						setAlignmentValue={ ( value ) =>
							setAttributes( { postExcerptAlign: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>

					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ postExcerptColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( { postExcerptColorSwitcher: value } )
						}
					/>

					{ postExcerptColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ postExcerptColor }
							onChangeColor={ ( value ) =>
								setAttributes( { postExcerptColor: value } )
							}
							defaultColor=""
						/>
					) }

					{ postExcerptColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ postExcerptColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									postExcerptColorHover: value,
								} )
							}
							defaultColor=""
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ postExcerptMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { postExcerptMarginUnits: value } )
						}
						desktopSpacing={ postExcerptDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { postExcerptDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ postExcerptTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { postExcerptTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ postExcerptMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { postExcerptMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptMobileMarginCssStyle: value,
							} )
						}
						isLinked={ postExcerptMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { postExcerptMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ postExcerptPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { postExcerptPaddingUnits: value } )
						}
						desktopSpacing={ postExcerptDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								postExcerptDesktopPadding: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ postExcerptTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { postExcerptTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ postExcerptMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { postExcerptMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								postExcerptMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ postExcerptPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { postExcerptPaddingLink: value } )
						}
					/>
				</PanelBody>
			) }

			{ showMeta?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Author Image', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'authorImage' }
					onToggle={ () => togglePanel( 'styles', 'authorImage' ) }
				>
					<ResponsiveToggleControl
						label={ __( 'Show Author Avatar', 'gslider-blocks' ) }
						toggleValue={ showMetaAvatar }
						setToggleValue={ ( value ) =>
							setAttributes( { showMetaAvatar: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>
					{ ( showMetaAvatar?.[ deviceType ] ?? true ) && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Size', 'gslider-blocks' ) }
								rangeValue={ authorImageSize }
								onChangeValue={ ( value ) =>
									setAttributes( { authorImageSize: value } )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										authorImageSizeUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ authorImageSizeUnits }
								resetFallbackValue={ {
									px:
										deviceType === 'Desktop'
											? '80'
											: deviceType === 'Tablet'
											? '64'
											: '56',
									'%':
										deviceType === 'Desktop'
											? '5'
											: deviceType === 'Tablet'
											? '4'
											: '3.5',
									vh:
										deviceType === 'Desktop'
											? '5'
											: deviceType === 'Tablet'
											? '4'
											: '3.5',
									vw:
										deviceType === 'Desktop'
											? '5'
											: deviceType === 'Tablet'
											? '4'
											: '3.5',
									em:
										deviceType === 'Desktop'
											? '5'
											: deviceType === 'Tablet'
											? '4'
											: '3.5',
									rem:
										deviceType === 'Desktop'
											? '5'
											: deviceType === 'Tablet'
											? '4'
											: '3.5',
								} }
								unitBounds={ {
									px: { min: 0, max: 500, step: 1 },
								} }
							/>

							<Select2Control
								label={ __( 'Border Style', 'gslider-blocks' ) }
								options={ BORDER_STYLES }
								value={ authorImageBorder }
								onChange={ ( value ) =>
									setAttributes( {
										authorImageBorder: value,
									} )
								}
							/>

							{ authorImageBorder !== 'none' && (
								<>
									<SwitcherControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={ authorImageBorderColorSwitcher }
										onChange={ ( value ) =>
											setAttributes( {
												authorImageBorderColorSwitcher:
													value,
											} )
										}
									/>

									{ authorImageBorderColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={ authorImageBorderColor }
											onChangeColor={ ( value ) =>
												setAttributes( {
													authorImageBorderColor:
														value,
												} )
											}
											defaultColor=""
										/>
									) }

									{ authorImageBorderColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={
												authorImageBorderHoverColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													authorImageBorderHoverColor:
														value,
												} )
											}
											defaultColor=""
										/>
									) }

									<ResponsiveSpacingControl
										label={ __(
											'Border Width',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={ authorImageBorderWidthUnits }
										onChangeUnits={ ( value ) =>
											setAttributes( {
												authorImageBorderWidthUnits:
													value,
											} )
										}
										desktopSpacing={
											authorImageDesktopBorderWidth
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												authorImageDesktopBorderWidth:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												authorImageDesktopBorderWidthCssStyle:
													value,
											} )
										}
										tabletSpacing={
											authorImageTabletBorderWidth
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												authorImageTabletBorderWidth:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												authorImageTabletBorderWidthCssStyle:
													value,
											} )
										}
										mobileSpacing={
											authorImageMobileBorderWidth
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												authorImageMobileBorderWidth:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												authorImageMobileBorderWidthCssStyle:
													value,
											} )
										}
										isLinked={ authorImageBorderWidthLink }
										onChangeLink={ ( value ) =>
											setAttributes( {
												authorImageBorderWidthLink:
													value,
											} )
										}
									/>
								</>
							) }

							<ResponsiveSpacingControl
								label={ __(
									'Border Radius',
									'gslider-blocks'
								) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorImageBorderRadiusUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorImageBorderRadiusUnits: value,
									} )
								}
								desktopSpacing={
									authorImageDesktopBorderRadius
								}
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorImageDesktopBorderRadius: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageDesktopBorderRadiusCssStyle:
											value,
									} )
								}
								tabletSpacing={ authorImageTabletBorderRadius }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorImageTabletBorderRadius: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageTabletBorderRadiusCssStyle:
											value,
									} )
								}
								mobileSpacing={ authorImageMobileBorderRadius }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorImageMobileBorderRadius: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageMobileBorderRadiusCssStyle:
											value,
									} )
								}
								isLinked={ authorImageBorderRadiusLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorImageBorderRadiusLink: value,
									} )
								}
							/>

							<ResponsiveSpacingControl
								label={ __( 'Margin', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorImageMarginUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorImageMarginUnits: value,
									} )
								}
								desktopSpacing={ authorImageDesktopMargin }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorImageDesktopMargin: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageDesktopMarginCssStyle: value,
									} )
								}
								tabletSpacing={ authorImageTabletMargin }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorImageTabletMargin: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageTabletMarginCssStyle: value,
									} )
								}
								mobileSpacing={ authorImageMobileMargin }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorImageMobileMargin: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageMobileMarginCssStyle: value,
									} )
								}
								isLinked={ authorImageMarginLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorImageMarginLink: value,
									} )
								}
							/>

							<ResponsiveSpacingControl
								label={ __( 'Padding', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorImagePaddingUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorImagePaddingUnits: value,
									} )
								}
								desktopSpacing={ authorImageDesktopPadding }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorImageDesktopPadding: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageDesktopPaddingCssStyle:
											value,
									} )
								}
								tabletSpacing={ authorImageTabletPadding }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorImageTabletPadding: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageTabletPaddingCssStyle: value,
									} )
								}
								mobileSpacing={ authorImageMobilePadding }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorImageMobilePadding: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageMobilePaddingCssStyle: value,
									} )
								}
								isLinked={ authorImagePaddingLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorImagePaddingLink: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showMeta?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Author Name', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'authorName' }
					onToggle={ () => togglePanel( 'styles', 'authorName' ) }
				>
					<ResponsiveToggleControl
						label={ __( 'Show Author Name', 'gslider-blocks' ) }
						toggleValue={ showMetaAuthor }
						setToggleValue={ ( value ) =>
							setAttributes( { showMetaAuthor: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>
					{ ( showMetaAuthor?.[ deviceType ] ?? true ) && (
						<>
							<ResponsiveTypographyControl
								fontFamily={ authorNameFontFamily }
								onChangeFontFamily={ ( value ) =>
									setAttributes( {
										authorNameFontFamily: value,
									} )
								}
								fontSize={ authorNameFontSize }
								onChangeFontSize={ ( value ) =>
									setAttributes( {
										authorNameFontSize: value,
									} )
								}
								fontSizeUnits={ authorNameFontSizeUnits }
								onChangeFontSizeUnit={ ( value ) =>
									setAttributes( {
										authorNameFontSizeUnits: value,
									} )
								}
								fontWeight={ authorNameFontWeight }
								onChangeFontWeight={ ( value ) =>
									setAttributes( {
										authorNameFontWeight: value,
									} )
								}
								fontStyle={ authorNameFontStyle }
								onChangeFontStyle={ ( value ) =>
									setAttributes( {
										authorNameFontStyle: value,
									} )
								}
								textTransform={ authorNameTextTransform }
								onChangeTextTransform={ ( value ) =>
									setAttributes( {
										authorNameTextTransform: value,
									} )
								}
								textDecoration={ authorNameTextDecoration }
								onChangeTextDecoration={ ( value ) =>
									setAttributes( {
										authorNameTextDecoration: value,
									} )
								}
								lineHeight={ authorNameLineHeight }
								onChangeLineHeight={ ( value ) =>
									setAttributes( {
										authorNameLineHeight: value,
									} )
								}
								lineHeightUnits={ authorNameLineHeightUnits }
								onChangeLineHeightUnit={ ( value ) =>
									setAttributes( {
										authorNameLineHeightUnits: value,
									} )
								}
								letterSpacing={ authorNameLetterSpacing }
								onChangeLetterSpacing={ ( value ) =>
									setAttributes( {
										authorNameLetterSpacing: value,
									} )
								}
								letterSpacingUnits={
									authorNameLetterSpacingUnits
								}
								onChangeLetterSpacingUnit={ ( value ) =>
									setAttributes( {
										authorNameLetterSpacingUnits: value,
									} )
								}
								wordSpacing={ authorNameWordSpacing }
								onChangeWordSpacing={ ( value ) =>
									setAttributes( {
										authorNameWordSpacing: value,
									} )
								}
								wordSpacingUnits={ authorNameWordSpacingUnits }
								onChangeWordSpacingUnit={ ( value ) =>
									setAttributes( {
										authorNameWordSpacingUnits: value,
									} )
								}
								deviceType={ deviceType }
							/>
							<SwitcherControl
								label={ __( 'Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ authorNameColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										authorNameColorSwitcher: value,
									} )
								}
							/>

							{ authorNameColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ authorNameColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											authorNameColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ authorNameColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ authorNameColorHover }
									onChangeColor={ ( value ) =>
										setAttributes( {
											authorNameColorHover: value,
										} )
									}
									defaultColor=""
								/>
							) }
							<ResponsiveSpacingControl
								label={ __( 'Margin', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorNameMarginUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorNameMarginUnits: value,
									} )
								}
								desktopSpacing={ authorNameDesktopMargin }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorNameDesktopMargin: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameDesktopMarginCssStyle: value,
									} )
								}
								tabletSpacing={ authorNameTabletMargin }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorNameTabletMargin: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameTabletMarginCssStyle: value,
									} )
								}
								mobileSpacing={ authorNameMobileMargin }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorNameMobileMargin: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameMobileMarginCssStyle: value,
									} )
								}
								isLinked={ authorNameMarginLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorNameMarginLink: value,
									} )
								}
							/>

							<ResponsiveSpacingControl
								label={ __( 'Padding', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorNamePaddingUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorNamePaddingUnits: value,
									} )
								}
								desktopSpacing={ authorNameDesktopPadding }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorNameDesktopPadding: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameDesktopPaddingCssStyle: value,
									} )
								}
								tabletSpacing={ authorNameTabletPadding }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorNameTabletPadding: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameTabletPaddingCssStyle: value,
									} )
								}
								mobileSpacing={ authorNameMobilePadding }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorNameMobilePadding: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorNameMobilePaddingCssStyle: value,
									} )
								}
								isLinked={ authorNamePaddingLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorNamePaddingLink: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showMeta?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Post Date', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'postDate' }
					onToggle={ () => togglePanel( 'styles', 'postDate' ) }
				>
					<ResponsiveToggleControl
						label={ __( 'Show Date', 'gslider-blocks' ) }
						toggleValue={ showMetaDate }
						setToggleValue={ ( value ) =>
							setAttributes( { showMetaDate: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>
					{ ( showMetaDate?.[ deviceType ] ?? true ) && (
						<>
							<ResponsiveTypographyControl
								fontFamily={ postDateFontFamily }
								onChangeFontFamily={ ( value ) =>
									setAttributes( {
										postDateFontFamily: value,
									} )
								}
								fontSize={ postDateFontSize }
								onChangeFontSize={ ( value ) =>
									setAttributes( { postDateFontSize: value } )
								}
								fontSizeUnits={ postDateFontSizeUnits }
								onChangeFontSizeUnit={ ( value ) =>
									setAttributes( {
										postDateFontSizeUnits: value,
									} )
								}
								fontWeight={ postDateFontWeight }
								onChangeFontWeight={ ( value ) =>
									setAttributes( {
										postDateFontWeight: value,
									} )
								}
								fontStyle={ postDateFontStyle }
								onChangeFontStyle={ ( value ) =>
									setAttributes( {
										postDateFontStyle: value,
									} )
								}
								textTransform={ postDateTextTransform }
								onChangeTextTransform={ ( value ) =>
									setAttributes( {
										postDateTextTransform: value,
									} )
								}
								textDecoration={ postDateTextDecoration }
								onChangeTextDecoration={ ( value ) =>
									setAttributes( {
										postDateTextDecoration: value,
									} )
								}
								lineHeight={ postDateLineHeight }
								onChangeLineHeight={ ( value ) =>
									setAttributes( {
										postDateLineHeight: value,
									} )
								}
								lineHeightUnits={ postDateLineHeightUnits }
								onChangeLineHeightUnit={ ( value ) =>
									setAttributes( {
										postDateLineHeightUnits: value,
									} )
								}
								letterSpacing={ postDateLetterSpacing }
								onChangeLetterSpacing={ ( value ) =>
									setAttributes( {
										postDateLetterSpacing: value,
									} )
								}
								letterSpacingUnits={
									postDateLetterSpacingUnits
								}
								onChangeLetterSpacingUnit={ ( value ) =>
									setAttributes( {
										postDateLetterSpacingUnits: value,
									} )
								}
								wordSpacing={ postDateWordSpacing }
								onChangeWordSpacing={ ( value ) =>
									setAttributes( {
										postDateWordSpacing: value,
									} )
								}
								wordSpacingUnits={ postDateWordSpacingUnits }
								onChangeWordSpacingUnit={ ( value ) =>
									setAttributes( {
										postDateWordSpacingUnits: value,
									} )
								}
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
							/>

							<SwitcherControl
								label={ __( 'Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ postDateColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										postDateColorSwitcher: value,
									} )
								}
							/>
							{ postDateColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ postDateColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											postDateColor: value,
										} )
									}
									defaultColor=""
								/>
							) }
							{ postDateColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ postDateColorHover }
									onChangeColor={ ( value ) =>
										setAttributes( {
											postDateColorHover: value,
										} )
									}
									defaultColor=""
								/>
							) }

							<ResponsiveSpacingControl
								label={ __( 'Margin', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ postDateMarginUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										postDateMarginUnits: value,
									} )
								}
								desktopSpacing={ postDateDesktopMargin }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										postDateDesktopMargin: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateDesktopMarginCssStyle: value,
									} )
								}
								tabletSpacing={ postDateTabletMargin }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										postDateTabletMargin: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateTabletMarginCssStyle: value,
									} )
								}
								mobileSpacing={ postDateMobileMargin }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										postDateMobileMargin: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateMobileMarginCssStyle: value,
									} )
								}
								isLinked={ postDateMarginLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										postDateMarginLink: value,
									} )
								}
							/>

							<ResponsiveSpacingControl
								label={ __( 'Padding', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ postDatePaddingUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										postDatePaddingUnits: value,
									} )
								}
								desktopSpacing={ postDateDesktopPadding }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										postDateDesktopPadding: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateDesktopPaddingCssStyle: value,
									} )
								}
								tabletSpacing={ postDateTabletPadding }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										postDateTabletPadding: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateTabletPaddingCssStyle: value,
									} )
								}
								mobileSpacing={ postDateMobilePadding }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										postDateMobilePadding: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										postDateMobilePaddingCssStyle: value,
									} )
								}
								isLinked={ postDatePaddingLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										postDatePaddingLink: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showReadMoreButton?.[ deviceType ] && (
				<>
					<PanelBody
						title={ __( 'Read More Button', 'gslider-blocks' ) }
						opened={ openPanels.styles === 'read-more-button' }
						onToggle={ () =>
							togglePanel( 'styles', 'read-more-button' )
						}
					>
						<ResponsiveTypographyControl
							fontFamily={ readMoreButtonFontFamily }
							onChangeFontFamily={ ( value ) =>
								setAttributes( {
									readMoreButtonFontFamily: value,
								} )
							}
							fontSize={ readMoreButtonFontSize }
							onChangeFontSize={ ( value ) =>
								setAttributes( {
									readMoreButtonFontSize: value,
								} )
							}
							fontSizeUnits={ readMoreButtonFontSizeUnits }
							onChangeFontSizeUnit={ ( value ) =>
								setAttributes( {
									readMoreButtonFontSizeUnits: value,
								} )
							}
							fontWeight={ readMoreButtonFontWeight }
							onChangeFontWeight={ ( value ) =>
								setAttributes( {
									readMoreButtonFontWeight: value,
								} )
							}
							fontStyle={ readMoreButtonFontStyle }
							onChangeFontStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonFontStyle: value,
								} )
							}
							textTransform={ readMoreButtonTextTransform }
							onChangeTextTransform={ ( value ) =>
								setAttributes( {
									readMoreButtonTextTransform: value,
								} )
							}
							textDecoration={ readMoreButtonTextDecoration }
							onChangeTextDecoration={ ( value ) =>
								setAttributes( {
									readMoreButtonTextDecoration: value,
								} )
							}
							lineHeight={ readMoreButtonLineHeight }
							onChangeLineHeight={ ( value ) =>
								setAttributes( {
									readMoreButtonLineHeight: value,
								} )
							}
							lineHeightUnits={ readMoreButtonLineHeightUnits }
							onChangeLineHeightUnit={ ( value ) =>
								setAttributes( {
									readMoreButtonLineHeightUnits: value,
								} )
							}
							letterSpacing={ readMoreButtonLetterSpacing }
							onChangeLetterSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonLetterSpacing: value,
								} )
							}
							letterSpacingUnits={
								readMoreButtonLetterSpacingUnits
							}
							onChangeLetterSpacingUnit={ ( value ) =>
								setAttributes( {
									readMoreButtonLetterSpacingUnits: value,
								} )
							}
							wordSpacing={ readMoreButtonWordSpacing }
							onChangeWordSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonWordSpacing: value,
								} )
							}
							wordSpacingUnits={ readMoreButtonWordSpacingUnits }
							onChangeWordSpacingUnit={ ( value ) =>
								setAttributes( {
									readMoreButtonWordSpacingUnits: value,
								} )
							}
							deviceType={ deviceType }
						/>

						<SwitcherControl
							label={ __( 'Button Width', 'gslider-blocks' ) }
							options={ WIDTH_MODE }
							value={ readMoreButtonWidth }
							onChange={ ( value ) =>
								setAttributes( { readMoreButtonWidth: value } )
							}
						/>

						{ readMoreButtonWidth !== 'full' && (
							<ResponsiveAlignmentControl
								label={ __(
									'Button Alignment',
									'gslider-blocks'
								) }
								options={ TEXT_ALIGN }
								alignmentValue={ readMoreButtonAlign }
								setAlignmentValue={ ( value ) =>
									setAttributes( {
										readMoreButtonAlign: value,
									} )
								}
								deviceType={ deviceType }
								setAttributes={ setAttributes }
							/>
						) }

						<Select2Control
							label={ __(
								'Button Hover Animation',
								'gslider-blocks'
							) }
							options={ [
								{
									label: __( 'None', 'gslider-blocks' ),
									value: 'none',
								},
								{
									label: __( 'Grow', 'gslider-blocks' ),
									value: 'grow',
								},
								{
									label: __( 'Shrink', 'gslider-blocks' ),
									value: 'shrink',
								},
								{
									label: __( 'Float Up', 'gslider-blocks' ),
									value: 'float',
								},
								{
									label: __(
										'Shift Right',
										'gslider-blocks'
									),
									value: 'shift-right',
								},
								{
									label: __(
										'Shimmer (Shiny Sweep)',
										'gslider-blocks'
									),
									value: 'shimmer',
								},
								{
									label: __( 'Pulse', 'gslider-blocks' ),
									value: 'pulse',
								},
							] }
							value={ readMoreButtonHoverAnimation }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverAnimation: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonColorSwitcher: value,
								} )
							}
						/>

						{ readMoreButtonColorSwitcher === 'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ readMoreButtonColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonColor: value,
									} )
								}
								defaultColor=""
							/>
						) }

						{ readMoreButtonColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ readMoreButtonColorHover }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonColorHover: value,
									} )
								}
								defaultColor=""
							/>
						) }

						<BackgroundControl
							label={ __( 'Background Color', 'gslider-blocks' ) }
							normalBackgroundType={
								readMoreButtonNormalBackgroundType
							}
							setNormalBackgroundType={ ( value ) =>
								setAttributes( {
									readMoreButtonNormalBackgroundType: value,
								} )
							}
							normalClassicColor={
								readMoreButtonNormalClassicColor
							}
							setNormalClassicColor={ ( value ) =>
								setAttributes( {
									readMoreButtonNormalClassicColor: value,
								} )
							}
							normalGradientColor={
								readMoreButtonNormalGradientColor
							}
							setNormalGradientColor={ ( value ) =>
								setAttributes( {
									readMoreButtonNormalGradientColor: value,
								} )
							}
							normalCustomGradientSwitcher={
								readMoreButtonNormalCustomGradientSwitcher
							}
							setNormalCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									readMoreButtonNormalCustomGradientSwitcher:
										value,
								} )
							}
							normalCustomGradientInputValue={
								readMoreButtonNormalCustomGradientInputValue
							}
							setNormalCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									readMoreButtonNormalCustomGradientInputValue:
										value,
								} )
							}
							normalClassicDefaultColor={ '#d2d2d2c7' }
							hoverBackgroundType={
								readMoreButtonHoverBackgroundType
							}
							setHoverBackgroundType={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverBackgroundType: value,
								} )
							}
							hoverClassicColor={
								readMoreButtonHoverClassicColor
							}
							setHoverClassicColor={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverClassicColor: value,
								} )
							}
							hoverGradientColor={
								readMoreButtonHoverGradientColor
							}
							setHoverGradientColor={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverGradientColor: value,
								} )
							}
							hoverCustomGradientSwitcher={
								readMoreButtonHoverCustomGradientSwitcher
							}
							setHoverCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverCustomGradientSwitcher:
										value,
								} )
							}
							hoverCustomGradientInputValue={
								readMoreButtonHoverCustomGradientInputValue
							}
							setHoverCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									readMoreButtonHoverCustomGradientInputValue:
										value,
								} )
							}
							hoverClassicDefaultColor={ '#787878b8' }
							isBackgroundImage={ false }
						/>

						<Select2Control
							label={ __( 'Border Style', 'gslider-blocks' ) }
							options={ BORDER_STYLES }
							value={ readMoreButtonBorder }
							onChange={ ( value ) =>
								setAttributes( { readMoreButtonBorder: value } )
							}
						/>

						<SwitcherControl
							label={ __( 'Border Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonBorderColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonBorderColorSwitcher: value,
								} )
							}
						/>

						{ readMoreButtonBorderColorSwitcher === 'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ readMoreButtonBorderColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonBorderColor: value,
									} )
								}
							/>
						) }

						{ readMoreButtonBorderColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ readMoreButtonBorderHoverColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonBorderHoverColor: value,
									} )
								}
							/>
						) }

						<ResponsiveSpacingControl
							label={ __( 'Border Width', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonBorderUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonBorderUnits: value,
								} )
							}
							desktopSpacing={ readMoreButtonDesktopBorder }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopBorder: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopBorderCssStyle: value,
								} )
							}
							tabletSpacing={ readMoreButtonTabletBorder }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletBorder: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletBorderCssStyle: value,
								} )
							}
							mobileSpacing={ readMoreButtonMobileBorder }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileBorder: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileBorderCssStyle: value,
								} )
							}
							isLinked={ readMoreButtonBorderLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonBorderLink: value,
								} )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Border Radius', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonBorderRadiusUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonBorderRadiusUnits: value,
								} )
							}
							desktopSpacing={ readMoreButtonDesktopBorderRadius }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopBorderRadius: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopBorderRadiusCssStyle:
										value,
								} )
							}
							tabletSpacing={ readMoreButtonTabletBorderRadius }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletBorderRadius: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletBorderRadiusCssStyle:
										value,
								} )
							}
							mobileSpacing={ readMoreButtonMobileBorderRadius }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileBorderRadius: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileBorderRadiusCssStyle:
										value,
								} )
							}
							isLinked={ readMoreButtonBorderRadiusLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonBorderRadiusLink: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Box Shadow', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonBoxShadowValuesSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonBoxShadowValuesSwitcher:
										value,
								} )
							}
						/>

						{ readMoreButtonBoxShadowValuesSwitcher ===
							'normal' && (
							<BoxShadowSettingsControl
								label={ __(
									'Normal Shadow',
									'gslider-blocks'
								) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										readMoreButtonBoxShadowValues: value,
									} )
								}
								initialShadowValue={
									readMoreButtonBoxShadowValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										readMoreButtonBoxShadowCssValue: value,
									} )
								}
							/>
						) }

						{ readMoreButtonBoxShadowValuesSwitcher === 'hover' && (
							<BoxShadowSettingsControl
								label={ __( 'Hover Shadow', 'gslider-blocks' ) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										readMoreButtonBoxShadowHoverValues:
											value,
									} )
								}
								initialShadowValue={
									readMoreButtonBoxShadowHoverValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										readMoreButtonBoxShadowHoverCssValue:
											value,
									} )
								}
							/>
						) }

						<ResponsiveSpacingControl
							label={ __( 'Margin', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonMarginUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonMarginUnits: value,
								} )
							}
							desktopSpacing={ readMoreButtonDesktopMargin }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopMargin: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopMarginCssStyle: value,
								} )
							}
							tabletSpacing={ readMoreButtonTabletMargin }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletMargin: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletMarginCssStyle: value,
								} )
							}
							mobileSpacing={ readMoreButtonMobileMargin }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileMargin: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonMobileMarginCssStyle: value,
								} )
							}
							isLinked={ readMoreButtonMarginLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonMarginLink: value,
								} )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Padding', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonPaddingUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonPaddingUnits: value,
								} )
							}
							desktopSpacing={ readMoreButtonDesktopPadding }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopPadding: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonDesktopPaddingCssStyle: value,
								} )
							}
							tabletSpacing={ readMoreButtonTabletPadding }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletPadding: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonTabletPaddingCssStyle: value,
								} )
							}
							mobileSpacing={ readMoreButtonMobilePadding }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonMobilePadding: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonMobilePaddingCssStyle: value,
								} )
							}
							isLinked={ readMoreButtonPaddingLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonPaddingLink: value,
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Read More Button Icon',
							'gslider-blocks'
						) }
						opened={ openPanels.styles === 'readMoreButtonIcon' }
						onToggle={ () =>
							togglePanel( 'styles', 'readMoreButtonIcon' )
						}
					>
						<ResponsiveRangeControl
							label={ __( 'Icon Size', 'gslider-blocks' ) }
							rangeValue={ readMoreButtonIconSize }
							onChangeValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconSize: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconSizeUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ readMoreButtonIconSizeUnits }
							resetFallbackValue={ {
								px: '16',
								'%': '5',
								vh: '',
								vw: '',
								em: '1',
								rem: '1',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>

						<Select2Control
							label={ __(
								'Icon Hover Animation',
								'gslider-blocks'
							) }
							options={ [
								{
									label: __( 'None', 'gslider-blocks' ),
									value: 'none',
								},
								{
									label: __(
										'Slide Right',
										'gslider-blocks'
									),
									value: 'slide-right',
								},
								{
									label: __( 'Slide Left', 'gslider-blocks' ),
									value: 'slide-left',
								},
								{
									label: __( 'Zoom In', 'gslider-blocks' ),
									value: 'zoom-in',
								},
								{
									label: __( 'Zoom Out', 'gslider-blocks' ),
									value: 'zoom-out',
								},
							] }
							value={ readMoreButtonIconHoverAnimation }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverAnimation: value,
								} )
							}
						/>

						<ResponsiveRangeControl
							label={ __( 'Width', 'gslider-blocks' ) }
							rangeValue={ readMoreButtonIconWidth }
							onChangeValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconWidth: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconWidthUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ readMoreButtonIconWidthUnits }
							resetFallbackValue={ {
								px: '46',
								'%': '5',
								vh: '',
								vw: '',
								em: '2.875',
								rem: '2.875',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
						<ResponsiveRangeControl
							label={ __( 'Height', 'gslider-blocks' ) }
							rangeValue={ readMoreButtonIconHeight }
							onChangeValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHeight: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHeightUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ readMoreButtonIconHeightUnits }
							resetFallbackValue={ {
								px: '16',
								'%': '5',
								vh: '',
								vw: '',
								em: '1',
								rem: '1',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>

						<ResponsiveRangeControl
							min={ 0 }
							max={ 100 }
							label={ __( 'Gap', 'gslider-blocks' ) }
							rangeValue={ readMoreButtonIconGap }
							onChangeValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconGap: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconGapUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ readMoreButtonIconGapUnits }
							resetFallbackValue={ {
								px: '8',
								em: '0.5',
								rem: '0.5',
							} }
						/>

						<SwitcherControl
							label={ __( 'Icon Rotation', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonIconRotationSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconRotationSwitcher: value,
								} )
							}
						/>

						{ readMoreButtonIconRotationSwitcher === 'normal' && (
							<ResponsiveRangeControl
								min={ -360 }
								max={ 360 }
								label={ __(
									'Icon Rotation (deg)',
									'gslider-blocks'
								) }
								rangeValue={ readMoreButtonIconRotation }
								onChangeValue={ ( value ) =>
									setAttributes( {
										readMoreButtonIconRotation: value,
									} )
								}
								deviceType={ deviceType }
								step={ 1 }
								resetFallbackValue={ '0' }
								isRangeUnit={ false }
							/>
						) }

						{ readMoreButtonIconRotationSwitcher === 'hover' && (
							<ResponsiveRangeControl
								min={ -360 }
								max={ 360 }
								label={ __(
									'Icon Hover Rotation (deg)',
									'gslider-blocks'
								) }
								rangeValue={ readMoreButtonIconHoverRotation }
								onChangeValue={ ( value ) =>
									setAttributes( {
										readMoreButtonIconHoverRotation: value,
									} )
								}
								deviceType={ deviceType }
								step={ 1 }
								resetFallbackValue={ '0' }
								isRangeUnit={ false }
							/>
						) }

						<SwitcherControl
							label={ __( 'Icon Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonIconColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconColorSwitcher: value,
								} )
							}
						/>

						{ readMoreButtonIconColorSwitcher === 'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ readMoreButtonIconColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonIconColor: value,
									} )
								}
								defaultColor="#333333"
							/>
						) }

						{ readMoreButtonIconColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ readMoreButtonIconColorHover }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonIconColorHover: value,
									} )
								}
							/>
						) }

						<BackgroundControl
							label={ __( 'Background Color', 'gslider-blocks' ) }
							normalBackgroundType={
								readMoreButtonIconNormalBackgroundType
							}
							setNormalBackgroundType={ ( value ) =>
								setAttributes( {
									readMoreButtonIconNormalBackgroundType:
										value,
								} )
							}
							normalClassicColor={
								readMoreButtonIconNormalClassicColor
							}
							setNormalClassicColor={ ( value ) =>
								setAttributes( {
									readMoreButtonIconNormalClassicColor: value,
								} )
							}
							normalGradientColor={
								readMoreButtonIconNormalGradientColor
							}
							setNormalGradientColor={ ( value ) =>
								setAttributes( {
									readMoreButtonIconNormalGradientColor:
										value,
								} )
							}
							normalCustomGradientSwitcher={
								readMoreButtonIconNormalCustomGradientSwitcher
							}
							setNormalCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									readMoreButtonIconNormalCustomGradientSwitcher:
										value,
								} )
							}
							normalCustomGradientInputValue={
								readMoreButtonIconNormalCustomGradientInputValue
							}
							setNormalCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconNormalCustomGradientInputValue:
										value,
								} )
							}
							normalClassicDefaultColor={ '#d2d2d2c7' }
							hoverBackgroundType={
								readMoreButtonIconHoverBackgroundType
							}
							setHoverBackgroundType={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverBackgroundType:
										value,
								} )
							}
							hoverClassicColor={
								readMoreButtonIconHoverClassicColor
							}
							setHoverClassicColor={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverClassicColor: value,
								} )
							}
							hoverGradientColor={
								readMoreButtonIconHoverGradientColor
							}
							setHoverGradientColor={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverGradientColor: value,
								} )
							}
							hoverCustomGradientSwitcher={
								readMoreButtonIconHoverCustomGradientSwitcher
							}
							setHoverCustomGradientSwitcher={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverCustomGradientSwitcher:
										value,
								} )
							}
							hoverCustomGradientInputValue={
								readMoreButtonIconHoverCustomGradientInputValue
							}
							setHoverCustomGradientInputValue={ ( value ) =>
								setAttributes( {
									readMoreButtonIconHoverCustomGradientInputValue:
										value,
								} )
							}
							hoverClassicDefaultColor={ '#787878b8' }
							isBackgroundImage={ false }
						/>

						<Select2Control
							label={ __( 'Border Style', 'gslider-blocks' ) }
							options={ BORDER_STYLES }
							value={ readMoreButtonIconBorder }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorder: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Border Color', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonIconBorderColorSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorderColorSwitcher:
										value,
								} )
							}
						/>

						{ readMoreButtonIconBorderColorSwitcher ===
							'normal' && (
							<ColorControl
								label={ __( 'Normal Color', 'gslider-blocks' ) }
								color={ readMoreButtonIconBorderColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBorderColor: value,
									} )
								}
							/>
						) }

						{ readMoreButtonIconBorderColorSwitcher === 'hover' && (
							<ColorControl
								label={ __( 'Hover Color', 'gslider-blocks' ) }
								color={ readMoreButtonIconBorderHoverColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBorderHoverColor:
											value,
									} )
								}
							/>
						) }

						<ResponsiveSpacingControl
							label={ __( 'Border Width', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonIconBorderUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorderUnits: value,
								} )
							}
							desktopSpacing={ readMoreButtonIconDesktopBorder }
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconDesktopBorder: value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconDesktopBorderCssStyle:
										value,
								} )
							}
							tabletSpacing={ readMoreButtonIconTabletBorder }
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconTabletBorder: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconTabletBorderCssStyle:
										value,
								} )
							}
							mobileSpacing={ readMoreButtonIconMobileBorder }
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconMobileBorder: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconMobileBorderCssStyle:
										value,
								} )
							}
							isLinked={ readMoreButtonIconBorderLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorderLink: value,
								} )
							}
						/>

						<ResponsiveSpacingControl
							label={ __( 'Border Radius', 'gslider-blocks' ) }
							deviceType={ deviceType }
							onChangeDeviceType={ ( value ) =>
								setAttributes( { deviceType: value } )
							}
							units={ readMoreButtonIconBorderRadiusUnits }
							onChangeUnits={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorderRadiusUnits: value,
								} )
							}
							desktopSpacing={
								readMoreButtonIconDesktopBorderRadius
							}
							onChangeDesktopSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconDesktopBorderRadius:
										value,
								} )
							}
							desktopSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconDesktopBorderRadiusCssStyle:
										value,
								} )
							}
							tabletSpacing={
								readMoreButtonIconTabletBorderRadius
							}
							onChangeTabletSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconTabletBorderRadius: value,
								} )
							}
							tabletSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconTabletBorderRadiusCssStyle:
										value,
								} )
							}
							mobileSpacing={
								readMoreButtonIconMobileBorderRadius
							}
							onChangeMobileSpacing={ ( value ) =>
								setAttributes( {
									readMoreButtonIconMobileBorderRadius: value,
								} )
							}
							mobileSpacingStyle={ ( value ) =>
								setAttributes( {
									readMoreButtonIconMobileBorderRadiusCssStyle:
										value,
								} )
							}
							isLinked={ readMoreButtonIconBorderRadiusLink }
							onChangeLink={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBorderRadiusLink: value,
								} )
							}
						/>

						<SwitcherControl
							label={ __( 'Box Shadow', 'gslider-blocks' ) }
							options={ NORMAL_HOVER }
							value={ readMoreButtonIconBoxShadowValuesSwitcher }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconBoxShadowValuesSwitcher:
										value,
								} )
							}
						/>

						{ readMoreButtonIconBoxShadowValuesSwitcher ===
							'normal' && (
							<BoxShadowSettingsControl
								label={ __(
									'Normal Shadow',
									'gslider-blocks'
								) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBoxShadowValues:
											value,
									} )
								}
								initialShadowValue={
									readMoreButtonIconBoxShadowValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBoxShadowCssValue:
											value,
									} )
								}
							/>
						) }

						{ readMoreButtonIconBoxShadowValuesSwitcher ===
							'hover' && (
							<BoxShadowSettingsControl
								label={ __( 'Hover Shadow', 'gslider-blocks' ) }
								onBoxShadowChange={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBoxShadowHoverValues:
											value,
									} )
								}
								initialShadowValue={
									readMoreButtonIconBoxShadowHoverValues
								}
								onBoxShadowStyleChange={ ( value ) =>
									setAttributes( {
										readMoreButtonIconBoxShadowHoverCssValue:
											value,
									} )
								}
							/>
						) }
					</PanelBody>
				</>
			) }

			{ showNavigation?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Navigation', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'navigation' }
					onToggle={ () => togglePanel( 'styles', 'navigation' ) }
				>
					<ResponsiveRangeControl
						label={ __( 'Icon Size', 'gslider-blocks' ) }
						rangeValue={ navigationArrowSize }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { navigationArrowSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ navigationArrowSizeUnits }
						resetFallbackValue={ {
							px: '16',
							'%': '5',
							vh: '',
							vw: '',
							em: '1',
							rem: '1',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>

					<ResponsiveRangeControl
						label={ __( 'Width', 'gslider-blocks' ) }
						rangeValue={ navigationArrowWidth }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowWidth: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								navigationArrowWidthUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ navigationArrowWidthUnits }
						resetFallbackValue={ {
							px: '46',
							'%': '5',
							vh: '',
							vw: '',
							em: '2.875',
							rem: '2.875',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>
					<ResponsiveRangeControl
						label={ __( 'Height', 'gslider-blocks' ) }
						rangeValue={ navigationArrowHeight }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowHeight: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								navigationArrowHeightUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ navigationArrowHeightUnits }
						resetFallbackValue={ {
							px: '46',
							'%': '5',
							vh: '',
							vw: '',
							em: '2.875',
							rem: '2.875',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>

					<SwitcherControl
						label={ __( 'Icon Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowColorSwitcher: value,
							} )
						}
					/>

					{ navigationArrowColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ navigationArrowColor }
							onChangeColor={ ( value ) =>
								setAttributes( { navigationArrowColor: value } )
							}
							defaultColor="#333333"
						/>
					) }

					{ navigationArrowColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ navigationArrowColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowColorHover: value,
								} )
							}
						/>
					) }

					<BackgroundControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						normalBackgroundType={
							navigationArrowNormalBackgroundType
						}
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								navigationArrowNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ navigationArrowNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( {
								navigationArrowNormalClassicColor: value,
							} )
						}
						normalGradientColor={
							navigationArrowNormalGradientColor
						}
						setNormalGradientColor={ ( value ) =>
							setAttributes( {
								navigationArrowNormalGradientColor: value,
							} )
						}
						normalCustomGradientSwitcher={
							navigationArrowNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								navigationArrowNormalCustomGradientSwitcher:
									value,
							} )
						}
						normalCustomGradientInputValue={
							navigationArrowNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								navigationArrowNormalCustomGradientInputValue:
									value,
							} )
						}
						normalClassicDefaultColor={ '#d2d2d2c7' }
						hoverBackgroundType={
							navigationArrowHoverBackgroundType
						}
						setHoverBackgroundType={ ( value ) =>
							setAttributes( {
								navigationArrowHoverBackgroundType: value,
							} )
						}
						hoverClassicColor={ navigationArrowHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( {
								navigationArrowHoverClassicColor: value,
							} )
						}
						hoverGradientColor={ navigationArrowHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( {
								navigationArrowHoverGradientColor: value,
							} )
						}
						hoverCustomGradientSwitcher={
							navigationArrowHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								navigationArrowHoverCustomGradientSwitcher:
									value,
							} )
						}
						hoverCustomGradientInputValue={
							navigationArrowHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								navigationArrowHoverCustomGradientInputValue:
									value,
							} )
						}
						hoverClassicDefaultColor={ '#787878b8' }
						isBackgroundImage={ false }
					/>

					<Select2Control
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ navigationArrowBorder }
						onChange={ ( value ) =>
							setAttributes( { navigationArrowBorder: value } )
						}
					/>

					<SwitcherControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowBorderColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowBorderColorSwitcher: value,
							} )
						}
					/>

					{ navigationArrowBorderColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ navigationArrowBorderColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowBorderColor: value,
								} )
							}
						/>
					) }

					{ navigationArrowBorderColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ navigationArrowBorderHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowBorderHoverColor: value,
								} )
							}
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border Width', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ navigationArrowBorderUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								navigationArrowBorderUnits: value,
							} )
						}
						desktopSpacing={ navigationArrowDesktopBorder }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorder: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderCssStyle: value,
							} )
						}
						tabletSpacing={ navigationArrowTabletBorder }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorder: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderCssStyle: value,
							} )
						}
						mobileSpacing={ navigationArrowMobileBorder }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorder: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderCssStyle: value,
							} )
						}
						isLinked={ navigationArrowBorderLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								navigationArrowBorderLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ navigationArrowBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								navigationArrowBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ navigationArrowDesktopBorderRadius }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderRadius: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderRadiusCssStyle:
									value,
							} )
						}
						tabletSpacing={ navigationArrowTabletBorderRadius }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderRadius: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderRadiusCssStyle:
									value,
							} )
						}
						mobileSpacing={ navigationArrowMobileBorderRadius }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderRadius: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderRadiusCssStyle:
									value,
							} )
						}
						isLinked={ navigationArrowBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								navigationArrowBorderRadiusLink: value,
							} )
						}
					/>

					<SwitcherControl
						label={ __( 'Box Shadow', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowBoxShadowValuesSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowBoxShadowValuesSwitcher: value,
							} )
						}
					/>

					{ navigationArrowBoxShadowValuesSwitcher === 'normal' && (
						<BoxShadowSettingsControl
							label={ __( 'Normal Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowValues: value,
								} )
							}
							initialShadowValue={
								navigationArrowBoxShadowValues
							}
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowCssValue: value,
								} )
							}
						/>
					) }

					{ navigationArrowBoxShadowValuesSwitcher === 'hover' && (
						<BoxShadowSettingsControl
							label={ __( 'Hover Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowHoverValues: value,
								} )
							}
							initialShadowValue={
								navigationArrowBoxShadowHoverValues
							}
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowHoverCssValue:
										value,
								} )
							}
						/>
					) }
				</PanelBody>
			) }

			{ showPagination?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Pagination', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'pagination' }
					onToggle={ () => togglePanel( 'styles', 'pagination' ) }
				>
					{ ( paginationType === 'bullets' ||
						paginationType === 'fraction' ) && (
						<ResponsiveRangeControl
							label={ __( 'Position', 'gslider-blocks' ) }
							rangeValue={ paginationDotsPosition }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationDotsPosition: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationDotsPositionUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationDotsPositionUnits }
							resetFallbackValue={ '' }
							unitBounds={ {
								px: { min: -200, max: 200, step: 1 },
							} }
						/>
					) }

					{ paginationType === 'progressbar' && (
						<ResponsiveRangeControl
							label={ __( 'Position', 'gslider-blocks' ) }
							rangeValue={ paginationProgressbarPosition }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationProgressbarPosition: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationProgressbarPositionUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationProgressbarPositionUnits }
							resetFallbackValue={ '' }
							unitBounds={ {
								px: { min: -200, max: 200, step: 1 },
							} }
						/>
					) }

					{ paginationPositionType === 'outside' && (
						<ResponsiveRangeControl
							label={ __( 'Outside Offset', 'gslider-blocks' ) }
							rangeValue={ paginationOutsideOffset }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationOutsideOffset: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationOutsideOffsetUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationOutsideOffsetUnits }
							resetFallbackValue={ {
								px: '30',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ paginationDotsMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								paginationDotsMarginUnits: value,
							} )
						}
						desktopSpacing={ paginationDotsDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsDesktopMargin: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ paginationDotsTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsTabletMargin: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ paginationDotsMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsMobileMargin: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsMobileMarginCssStyle: value,
							} )
						}
						isLinked={ paginationDotsMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { paginationDotsMarginLink: value } )
						}
					/>

					{ paginationType === 'bullets' && (
						<>
							<SwitcherControl
								label={ __(
									'Bullets Style',
									'gslider-blocks'
								) }
								options={ NORMAL_ACTIVE }
								value={ paginationDotsSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationDotsSwitcher: value,
									} )
								}
							/>
							{ paginationDotsSwitcher === 'normal' && (
								<>
									<ResponsiveRangeControl
										label={ __(
											'Width',
											'gslider-blocks'
										) }
										rangeValue={ paginationNormalDotsWidth }
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationNormalDotsWidth:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsWidthUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={ paginationNormalDotsWidthUnits }
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ResponsiveRangeControl
										label={ __(
											'Height',
											'gslider-blocks'
										) }
										rangeValue={
											paginationNormalDotsHeight
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationNormalDotsHeight:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsHeightUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={
											paginationNormalDotsHeightUnits
										}
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ColorControl
										label={ __(
											'Color',
											'gslider-blocks'
										) }
										color={ paginationNormalDotsBgColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBgColor:
													value,
											} )
										}
										defaultColor="#333333"
									/>

									<Select2Control
										label={ __(
											'Border Style',
											'gslider-blocks'
										) }
										options={ BORDER_STYLES }
										value={ paginationNormalDotsBorder }
										onChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorder:
													value,
											} )
										}
									/>

									<SwitcherControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={
											paginationNormalDotsBorderColorSwitcher
										}
										onChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderColorSwitcher:
													value,
											} )
										}
									/>

									{ paginationNormalDotsBorderColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={
												paginationNormalDotsBorderColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationNormalDotsBorderColor:
														value,
												} )
											}
										/>
									) }

									{ paginationNormalDotsBorderColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={
												paginationNormalDotsBorderHoverColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationNormalDotsBorderHoverColor:
														value,
												} )
											}
										/>
									) }

									<ResponsiveSpacingControl
										label={ __(
											'Border Width',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationNormalDotsBorderUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationNormalDotsDesktopBorder
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorder:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationNormalDotsTabletBorder
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorder:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationNormalDotsMobileBorder
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorder:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderCssStyle:
													value,
											} )
										}
										isLinked={
											paginationNormalDotsBorderLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderLink:
													value,
											} )
										}
									/>

									<ResponsiveSpacingControl
										label={ __(
											'Border Radius',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationNormalDotsBorderRadiusUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderRadiusUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationNormalDotsDesktopBorderRadius
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderRadius:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderRadiusCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationNormalDotsTabletBorderRadius
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderRadius:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderRadiusCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationNormalDotsMobileBorderRadius
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderRadius:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderRadiusCssStyle:
													value,
											} )
										}
										isLinked={
											paginationNormalDotsBorderRadiusLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderRadiusLink:
													value,
											} )
										}
									/>
								</>
							) }

							{ paginationDotsSwitcher === 'active' && (
								<>
									<ResponsiveRangeControl
										label={ __(
											'Width',
											'gslider-blocks'
										) }
										rangeValue={ paginationActiveDotsWidth }
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationActiveDotsWidth:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsWidthUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={ paginationActiveDotsWidthUnits }
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ResponsiveRangeControl
										label={ __(
											'Height',
											'gslider-blocks'
										) }
										rangeValue={
											paginationActiveDotsHeight
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationActiveDotsHeight:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsHeightUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={
											paginationActiveDotsHeightUnits
										}
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ColorControl
										label={ __(
											'Color',
											'gslider-blocks'
										) }
										color={ paginationActiveDotsBgColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBgColor:
													value,
											} )
										}
									/>

									<Select2Control
										label={ __(
											'Border Style',
											'gslider-blocks'
										) }
										options={ BORDER_STYLES }
										value={ paginationActiveDotsBorder }
										onChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorder:
													value,
											} )
										}
									/>

									<SwitcherControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={
											paginationActiveDotsBorderColorSwitcher
										}
										onChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderColorSwitcher:
													value,
											} )
										}
									/>

									{ paginationActiveDotsBorderColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={
												paginationActiveDotsBorderColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationActiveDotsBorderColor:
														value,
												} )
											}
										/>
									) }

									{ paginationActiveDotsBorderColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={
												paginationActiveDotsBorderHoverColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationActiveDotsBorderHoverColor:
														value,
												} )
											}
										/>
									) }

									<ResponsiveSpacingControl
										label={ __(
											'Border Width',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationActiveDotsBorderUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationActiveDotsDesktopBorder
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorder:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationActiveDotsTabletBorder
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorder:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationActiveDotsMobileBorder
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorder:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderCssStyle:
													value,
											} )
										}
										isLinked={
											paginationActiveDotsBorderLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderLink:
													value,
											} )
										}
									/>

									<ResponsiveSpacingControl
										label={ __(
											'Border Radius',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationActiveDotsBorderRadiusUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderRadiusUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationActiveDotsDesktopBorderRadius
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderRadius:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderRadiusCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationActiveDotsTabletBorderRadius
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderRadius:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderRadiusCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationActiveDotsMobileBorderRadius
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderRadius:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderRadiusCssStyle:
													value,
											} )
										}
										isLinked={
											paginationActiveDotsBorderRadiusLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderRadiusLink:
													value,
											} )
										}
									/>
								</>
							) }
						</>
					) }

					{ paginationType === 'fraction' && (
						<>
							<ResponsiveTypographyControl
								fontFamily={ paginationFractionFontFamily }
								onChangeFontFamily={ ( value ) =>
									setAttributes( {
										paginationFractionFontFamily: value,
									} )
								}
								fontSize={ paginationFractionFontSize }
								onChangeFontSize={ ( value ) =>
									setAttributes( {
										paginationFractionFontSize: value,
									} )
								}
								fontSizeUnits={
									paginationFractionFontSizeUnits
								}
								onChangeFontSizeUnit={ ( value ) =>
									setAttributes( {
										paginationFractionFontSizeUnits: value,
									} )
								}
								fontWeight={ paginationFractionFontWeight }
								onChangeFontWeight={ ( value ) =>
									setAttributes( {
										paginationFractionFontWeight: value,
									} )
								}
								fontStyle={ paginationFractionFontStyle }
								onChangeFontStyle={ ( value ) =>
									setAttributes( {
										paginationFractionFontStyle: value,
									} )
								}
								textTransform={
									paginationFractionTextTransform
								}
								onChangeTextTransform={ ( value ) =>
									setAttributes( {
										paginationFractionTextTransform: value,
									} )
								}
								textDecoration={
									paginationFractionTextDecoration
								}
								onChangeTextDecoration={ ( value ) =>
									setAttributes( {
										paginationFractionTextDecoration: value,
									} )
								}
								lineHeight={ paginationFractionLineHeight }
								onChangeLineHeight={ ( value ) =>
									setAttributes( {
										paginationFractionLineHeight: value,
									} )
								}
								lineHeightUnits={
									paginationFractionLineHeightUnits
								}
								onChangeLineHeightUnit={ ( value ) =>
									setAttributes( {
										paginationFractionLineHeightUnits:
											value,
									} )
								}
								letterSpacing={
									paginationFractionLetterSpacing
								}
								onChangeLetterSpacing={ ( value ) =>
									setAttributes( {
										paginationFractionLetterSpacing: value,
									} )
								}
								letterSpacingUnits={
									paginationFractionLetterSpacingUnits
								}
								onChangeLetterSpacingUnit={ ( value ) =>
									setAttributes( {
										paginationFractionLetterSpacingUnits:
											value,
									} )
								}
								wordSpacing={ paginationFractionWordSpacing }
								onChangeWordSpacing={ ( value ) =>
									setAttributes( {
										paginationFractionWordSpacing: value,
									} )
								}
								wordSpacingUnits={
									paginationFractionWordSpacingUnits
								}
								onChangeWordSpacingUnit={ ( value ) =>
									setAttributes( {
										paginationFractionWordSpacingUnits:
											value,
									} )
								}
								deviceType={ deviceType }
							/>

							<SwitcherControl
								label={ __( 'Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ paginationFractionColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationFractionColorSwitcher: value,
									} )
								}
							/>

							{ paginationFractionColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ paginationFractionColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationFractionColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ paginationFractionColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ paginationFractionColorHover }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationFractionColorHover: value,
										} )
									}
									defaultColor=""
								/>
							) }
						</>
					) }

					{ paginationType === 'progressbar' && (
						<>
							<SwitcherControl
								label={ __(
									'Background Color',
									'gslider-blocks'
								) }
								options={ NORMAL_ACTIVE }
								value={ paginationProgressbarBGColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationProgressbarBGColorSwitcher:
											value,
									} )
								}
							/>

							{ paginationProgressbarBGColorSwitcher ===
								'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ paginationProgressbarBGColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationProgressbarBGColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ paginationProgressbarBGColorSwitcher ===
								'active' && (
								<ColorControl
									label={ __(
										'Active Color',
										'gslider-blocks'
									) }
									color={ paginationProgressbarBGActiveColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationProgressbarBGActiveColor:
												value,
										} )
									}
									defaultColor=""
								/>
							) }

							<ResponsiveRangeControl
								label={ __( 'Height', 'gslider-blocks' ) }
								rangeValue={ paginationProgressbarHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationProgressbarHeight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationProgressbarHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationProgressbarHeightUnits }
								resetFallbackValue={ {
									px: '4',
									'%': '',
									vh: '',
									vw: '',
									em: '0.25',
									rem: '0.25',
								} }
								unitBounds={ {
									px: { min: 0, max: 200, step: 1 },
								} }
							/>
						</>
					) }
				</PanelBody>
			) }
		</>
	);

	/**
	 * Inspector Advanced Controls
	 * @param value
	 */
	const advancedControls = (
		<>
			<PanelBody
				title={ __( 'Layout', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'layout' }
				onToggle={ () => togglePanel( 'advanced', 'layout' ) }
			>
				<ResponsiveSpacingControl
					label={ __( 'Margin', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalMarginUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalMarginUnits: value } )
					}
					desktopSpacing={ globalMarginDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalMarginDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginDesktopCssStyle: value } )
					}
					tabletSpacing={ globalMarginTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalMarginTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginTabletCssStyle: value } )
					}
					mobileSpacing={ globalMarginMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalMarginMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginMobileCssStyle: value } )
					}
					isLinked={ globalMarginLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalMarginLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalPaddingUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalPaddingUnits: value } )
					}
					desktopSpacing={ globalPaddingDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalPaddingDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingDesktopCssStyle: value } )
					}
					tabletSpacing={ globalPaddingTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalPaddingTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingTabletCssStyle: value } )
					}
					mobileSpacing={ globalPaddingMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalPaddingMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingMobileCssStyle: value } )
					}
					isLinked={ globalPaddingLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalPaddingLink: value } )
					}
				/>

				<ResponsiveRangeControl
					min={ -999 }
					max={ 9999 }
					label={ __( 'Z Index', 'gslider-blocks' ) }
					rangeValue={ globalZIndex }
					onChangeValue={ ( value ) =>
						setAttributes( { globalZIndex: value } )
					}
					deviceType={ deviceType }
					step={ 1 }
					resetFallbackValue={ '' }
					isRangeUnit={ false }
				/>

				<InputControls
					label={ __( 'CSS ID', 'gslider-blocks' ) }
					value={ globalID }
					onChangeValue={ ( value ) =>
						setAttributes( { globalID: value } )
					}
					helpText={ __(
						'Add an ID to the block wrapper.',
						'gslider-blocks'
					) }
				/>

				<InputControls
					label={ __( 'CSS Classes', 'gslider-blocks' ) }
					value={ globalClass }
					onChangeValue={ ( value ) =>
						setAttributes( { globalClass: value } )
					}
					helpText={ __(
						'Separate with spaces key.',
						'gslider-blocks'
					) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Background', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'background' }
				onToggle={ () => togglePanel( 'advanced', 'background' ) }
			>
				<BackgroundControl
					label={ __( 'Background', 'gslider-blocks' ) }
					deviceType={ deviceType }
					normalBackgroundType={ globalNormalBackgroundType }
					setNormalBackgroundType={ ( value ) =>
						setAttributes( { globalNormalBackgroundType: value } )
					}
					normalClassicColor={ globalNormalClassicColor }
					setNormalClassicColor={ ( value ) =>
						setAttributes( { globalNormalClassicColor: value } )
					}
					normalGradientColor={ globalNormalGradientColor }
					setNormalGradientColor={ ( value ) =>
						setAttributes( { globalNormalGradientColor: value } )
					}
					normalCustomGradientSwitcher={
						globalNormalCustomGradientSwitcher
					}
					setNormalCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							globalNormalCustomGradientSwitcher: value,
						} )
					}
					normalCustomGradientInputValue={
						globalNormalCustomGradientInputValue
					}
					setNormalCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							globalNormalCustomGradientInputValue: value,
						} )
					}
					normalBackgroundImageUrl={ globalNormalBackgroundImageUrl }
					setNormalBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageUrl: value,
						} )
					}
					normalBackgroundImagePosition={
						globalNormalBackgroundImagePosition
					}
					setNormalBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImagePosition: value,
						} )
					}
					normalBackgroundImageAttachment={
						globalNormalBackgroundImageAttachment
					}
					setNormalBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageAttachment: value,
						} )
					}
					normalBackgroundImageRepeat={
						globalNormalBackgroundImageRepeat
					}
					setNormalBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageRepeat: value,
						} )
					}
					normalBackgroundImageSize={
						globalNormalBackgroundImageSize
					}
					setNormalBackgroundImageSize={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageSize: value,
						} )
					}
					hoverBackgroundType={ globalHoverBackgroundType }
					setHoverBackgroundType={ ( value ) =>
						setAttributes( { globalHoverBackgroundType: value } )
					}
					hoverClassicColor={ globalHoverClassicColor }
					setHoverClassicColor={ ( value ) =>
						setAttributes( { globalHoverClassicColor: value } )
					}
					hoverGradientColor={ globalHoverGradientColor }
					setHoverGradientColor={ ( value ) =>
						setAttributes( { globalHoverGradientColor: value } )
					}
					hoverCustomGradientSwitcher={
						globalHoverCustomGradientSwitcher
					}
					setHoverCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							globalHoverCustomGradientSwitcher: value,
						} )
					}
					hoverCustomGradientInputValue={
						globalHoverCustomGradientInputValue
					}
					setHoverCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							globalHoverCustomGradientInputValue: value,
						} )
					}
					hoverBackgroundImageUrl={ globalHoverBackgroundImageUrl }
					setHoverBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageUrl: value,
						} )
					}
					hoverBackgroundImagePosition={
						globalHoverBackgroundImagePosition
					}
					setHoverBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImagePosition: value,
						} )
					}
					hoverBackgroundImageAttachment={
						globalHoverBackgroundImageAttachment
					}
					setHoverBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageAttachment: value,
						} )
					}
					hoverBackgroundImageRepeat={
						globalHoverBackgroundImageRepeat
					}
					setHoverBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageRepeat: value,
						} )
					}
					hoverBackgroundImageSize={ globalHoverBackgroundImageSize }
					setHoverBackgroundImageSize={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageSize: value,
						} )
					}
					setAttributes={ setAttributes }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Border and Shadow', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'border-shadow' }
				onToggle={ () => togglePanel( 'advanced', 'border-shadow' ) }
			>
				<Select2Control
					label={ __( 'Border Style', 'gslider-blocks' ) }
					options={ BORDER_STYLES }
					value={ globalBorder }
					onChange={ ( value ) =>
						setAttributes( { globalBorder: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Border Color', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ globalBorderColorSwitcher }
					onChange={ ( value ) =>
						setAttributes( { globalBorderColorSwitcher: value } )
					}
				/>

				{ globalBorderColorSwitcher === 'normal' && (
					<ColorControl
						label={ __( 'Normal Color', 'gslider-blocks' ) }
						color={ globalBorderColor }
						onChangeColor={ ( value ) =>
							setAttributes( { globalBorderColor: value } )
						}
					/>
				) }

				{ globalBorderColorSwitcher === 'hover' && (
					<ColorControl
						label={ __( 'Hover Color', 'gslider-blocks' ) }
						color={ globalBorderHoverColor }
						onChangeColor={ ( value ) =>
							setAttributes( { globalBorderHoverColor: value } )
						}
					/>
				) }

				<ResponsiveSpacingControl
					label={ __( 'Border', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalBorderUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalBorderUnits: value } )
					}
					desktopSpacing={ globalBorderDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalBorderDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderDesktopCssStyle: value } )
					}
					tabletSpacing={ globalBorderTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalBorderTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderTabletCssStyle: value } )
					}
					mobileSpacing={ globalBorderMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalBorderMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderMobileCssStyle: value } )
					}
					isLinked={ globalBorderLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalBorderLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Border Radius', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalBorderRadiusUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalBorderRadiusUnits: value } )
					}
					desktopSpacing={ globalBorderRadiusDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ globalBorderRadiusTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusTabletCssStyle: value,
						} )
					}
					mobileSpacing={ globalBorderRadiusMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusMobileCssStyle: value,
						} )
					}
					isLinked={ globalBorderRadiusLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalBorderRadiusLink: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Box Shadow', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ globalBoxShadowValuesSwitcher }
					onChange={ ( value ) =>
						setAttributes( {
							globalBoxShadowValuesSwitcher: value,
						} )
					}
				/>

				{ globalBoxShadowValuesSwitcher === 'normal' && (
					<BoxShadowSettingsControl
						label={ __( 'Normal Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( { globalBoxShadowValues: value } )
						}
						initialShadowValue={ globalBoxShadowValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( { globalBoxShadowCssValue: value } )
						}
					/>
				) }

				{ globalBoxShadowValuesSwitcher === 'hover' && (
					<BoxShadowSettingsControl
						label={ __( 'Hover Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( {
								globalBoxShadowHoverValues: value,
							} )
						}
						initialShadowValue={ globalBoxShadowHoverValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( {
								globalBoxShadowHoverCssValue: value,
							} )
						}
					/>
				) }
			</PanelBody>
		</>
	);

	return (
		<>
			<InspectorControl
				generalControls={ generalControls }
				styleControls={ styleControls }
				advancedControls={ advancedControls }
			/>
		</>
	);
};

export default memo( Inspector );
