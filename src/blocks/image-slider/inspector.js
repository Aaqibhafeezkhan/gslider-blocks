import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo, useCallback } from '@wordpress/element';
import { PanelBody, ToggleControl, BaseControl, Button, } from '@wordpress/components';

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

} from "@Constants";

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
import CustomCSSEditor from '@Components/custom-css-editor';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import getCustomCss from '@Utils/getCustomCss';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import { useDeviceType } from "@Utils/displayType";
import InputControls from '@Components/input-control';
import SelectControls from '@Components/select-controls';
import IconPicker from '@Components/icon-picker';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';

export default function Inspector({ attributes, setAttributes, clientId }) {
    const {
        blockId,
        deviceType,
        blockStyle,
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

        images,
        showCaption,

        /** Start Show/Hide Elements */
        paginationPositionType,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */

        /** Start image Link Settings */
        enableimageLinks,
        enableLightbox,
        showTooltip,
        imageLinkTarget,
        imageLinkRel,
        imageLinkHoverEffect,
        imageLinkHoverOpacity,
        imageLinkHoverScale,
        imageLinkHoverLift,
        imageLinkHoverLiftUnits,
        imageLinkTransitionDuration,
        /** End image Link Settings */

        /** Start Layout & Content Setting */
        layoutHeight,
        layoutHeightUnits,
        /** End Layout & Content Setting */

        /** Start image Max Width */
        imageMaxWidth,
        imageMaxWidthUnits,
        /** End image Max Width */

        /** Start image Padding */
        imagePaddingUnits,
        imagePaddingDesktop,
        imagePaddingDesktopCssStyle,
        imagePaddingTablet,
        imagePaddingTabletCssStyle,
        imagePaddingMobile,
        imagePaddingMobileCssStyle,
        imagePaddingLink,
        /** End image Padding */

        /** Start image Background */
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
        /** End image Background */

        /** Start image Border */
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
        /** End image Border */

        /** Start image Border Radius */
        imageBorderRadiusUnits,
        imageBorderRadiusDesktop,
        imageBorderRadiusDesktopCssStyle,
        imageBorderRadiusTablet,
        imageBorderRadiusTabletCssStyle,
        imageBorderRadiusMobile,
        imageBorderRadiusMobileCssStyle,
        imageBorderRadiusLink,
        /** End image Border Radius */

        /** Start image Box Shadow */
        imageBoxShadowValuesSwitcher,
        imageBoxShadowValues,
        imageBoxShadowCssValue,
        imageBoxShadowHoverValues,
        imageBoxShadowHoverCssValue,
        /** End image Box Shadow */

        /** Start image Caption Typography */
        imageCaptionFontFamily,
        imageCaptionFontSize,
        imageCaptionFontSizeUnits,
        imageCaptionFontWeight,
        imageCaptionFontStyle,
        imageCaptionTextTransform,
        imageCaptionTextDecoration,
        imageCaptionLineHeight,
        imageCaptionLineHeightUnits,
        imageCaptionLetterSpacing,
        imageCaptionLetterSpacingUnits,
        imageCaptionWordSpacing,
        imageCaptionWordSpacingUnits,
        /** End image Caption Typography */

        /** Start image Caption Color */
        imageCaptionColorSwitcher,
        imageCaptionColor,
        imageCaptionColorHover,
        /** End image Caption Color */

        /** Start image Caption Background */
        imageCaptionNormalBackgroundType,
        imageCaptionNormalClassicColor,
        imageCaptionNormalGradientColor,
        imageCaptionNormalCustomGradientSwitcher,
        imageCaptionNormalCustomGradientInputValue,
        imageCaptionHoverBackgroundType,
        imageCaptionHoverClassicColor,
        imageCaptionHoverGradientColor,
        imageCaptionHoverCustomGradientSwitcher,
        imageCaptionHoverCustomGradientInputValue,
        /** End image Caption Background */

        /** Start image Caption Border and color */
        imageCaptionBorder,
        imageCaptionBorderColorSwitcher,
        imageCaptionBorderColor,
        imageCaptionBorderHoverColor,
        /** End image Caption Border and color */

        /** Start image Caption Border */
        imageCaptionBorderUnits,
        imageCaptionBorderDesktop,
        imageCaptionBorderDesktopCssStyle,
        imageCaptionBorderTablet,
        imageCaptionBorderTabletCssStyle,
        imageCaptionBorderMobile,
        imageCaptionBorderMobileCssStyle,
        imageCaptionBorderLink,
        /** End image Caption Border */

        /** Start image Caption Border Radius */
        imageCaptionBorderRadiusUnits,
        imageCaptionBorderRadiusDesktop,
        imageCaptionBorderRadiusDesktopCssStyle,
        imageCaptionBorderRadiusTablet,
        imageCaptionBorderRadiusTabletCssStyle,
        imageCaptionBorderRadiusMobile,
        imageCaptionBorderRadiusMobileCssStyle,
        imageCaptionBorderRadiusLink,
        /** End image Caption Border Radius */

        /** Start image Caption Padding */
        imageCaptionPaddingUnits,
        imageCaptionPaddingDesktop,
        imageCaptionPaddingDesktopCssStyle,
        imageCaptionPaddingTablet,
        imageCaptionPaddingTabletCssStyle,
        imageCaptionPaddingMobile,
        imageCaptionPaddingMobileCssStyle,
        imageCaptionPaddingLink,
        /** End image Caption Padding */

        /** Start image Tooltip Typography */
        imageTooltipFontFamily,
        imageTooltipFontSize,
        imageTooltipFontSizeUnits,
        imageTooltipFontWeight,
        imageTooltipFontStyle,
        imageTooltipTextTransform,
        imageTooltipTextDecoration,
        imageTooltipLineHeight,
        imageTooltipLineHeightUnits,
        imageTooltipLetterSpacing,
        imageTooltipLetterSpacingUnits,
        imageTooltipWordSpacing,
        imageTooltipWordSpacingUnits,
        /** End image Tooltip Typography */

        /** Start image Tooltip Color */
        imageTooltipColor,
        imageTooltipBgColor,
        /** End image Tooltip Color */

        /** Start image Tooltip Border and color */
        imageTooltipBorder,
        imageTooltipBorderColor,
        /** End image Tooltip Border and color */

        /** Start image Tooltip Border */
        imageTooltipBorderUnits,
        imageTooltipBorderDesktop,
        imageTooltipBorderDesktopCssStyle,
        imageTooltipBorderTablet,
        imageTooltipBorderTabletCssStyle,
        imageTooltipBorderMobile,
        imageTooltipBorderMobileCssStyle,
        imageTooltipBorderLink,
        /** End image Tooltip Border */

        /** Start image Tooltip Border Radius */
        imageTooltipBorderRadiusUnits,
        imageTooltipBorderRadiusDesktop,
        imageTooltipBorderRadiusDesktopCssStyle,
        imageTooltipBorderRadiusTablet,
        imageTooltipBorderRadiusTabletCssStyle,
        imageTooltipBorderRadiusMobile,
        imageTooltipBorderRadiusMobileCssStyle,
        imageTooltipBorderRadiusLink,
        /** End image Tooltip Border Radius */

        /** Start image Tooltip Padding */
        imageTooltipPaddingUnits,
        imageTooltipPaddingDesktop,
        imageTooltipPaddingDesktopCssStyle,
        imageTooltipPaddingTablet,
        imageTooltipPaddingTabletCssStyle,
        imageTooltipPaddingMobile,
        imageTooltipPaddingMobileCssStyle,
        imageTooltipPaddingLink,
        /** End image Tooltip Padding */

        /** Start image Tooltip Position */
        imageTooltipTopPosition,
        imageTooltipTopPositionUnits,
        imageTooltipLeftPosition,
        imageTooltipLeftPositionUnits,
        /** End image Tooltip Position */

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
        /** End Active Dots Border */

        /** Start Active Dots Border */
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

        /** Global Settings */

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
        /** End Global Setting */

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

    } = attributes;

    /** Get Current Device Type */
    const currentDeviceType = useDeviceType();

    /** Set Device Type */
    useEffect(() => {
        setAttributes({ deviceType: currentDeviceType });
    }, [currentDeviceType]);

    /** Set Block ID */
    useEffect(() => {
        if (clientId) {
            setAttributes({ blockId: `gslider-${clientId.slice(0, 8)}` });
        }
    }, [clientId]);

    const defaultOpenPanels = {
        general: 'show-hide-elements',
        styles: 'content',
        advanced: 'layout',
    };

    const [openPanels, setOpenPanels] = useState(defaultOpenPanels);

    const togglePanel = useCallback((tabName, panelKey) => {
        setOpenPanels((prev) => ({
            ...prev,
            [tabName]: prev[tabName] === panelKey ? null : panelKey,
        }));
    }, []);

    /** Format Spacing */
    const spacingFormat = (spacing, units) => {
        return spacing.top || spacing.right || spacing.bottom || spacing.left
            ? `${spacing.top}${units} ${spacing.right}${units} ${spacing.bottom}${units} ${spacing.left}${units}`
            : '';
    };

    /** set the css style if have default padding */
    useEffect(() => {
        setAttributes({
            navigationArrowDesktopBorderRadiusCssStyle: spacingFormat(navigationArrowDesktopBorderRadius, navigationArrowBorderRadiusUnits.Desktop),
            navigationArrowTabletBorderRadiusCssStyle: spacingFormat(navigationArrowTabletBorderRadius, navigationArrowBorderRadiusUnits.Tablet),
            navigationArrowMobileBorderRadiusCssStyle: spacingFormat(navigationArrowMobileBorderRadius, navigationArrowBorderRadiusUnits.Mobile),

            paginationNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(paginationNormalDotsDesktopBorderRadius, paginationNormalDotsBorderRadiusUnits.Desktop),
            paginationNormalDotsTabletBorderRadiusCssStyle: spacingFormat(paginationNormalDotsTabletBorderRadius, paginationNormalDotsBorderRadiusUnits.Tablet),
            paginationNormalDotsMobileBorderRadiusCssStyle: spacingFormat(paginationNormalDotsMobileBorderRadius, paginationNormalDotsBorderRadiusUnits.Mobile),
        });
    }, [
        navigationArrowDesktopBorderRadius,
        navigationArrowTabletBorderRadius,
        navigationArrowMobileBorderRadius,
        navigationArrowBorderRadiusUnits,

        paginationNormalDotsDesktopBorderRadius,
        paginationNormalDotsTabletBorderRadius,
        paginationNormalDotsMobileBorderRadius,
        paginationNormalDotsBorderRadiusUnits,
    ]);
    /** end if have default padding then set the css style */

    /** Navigation Custom Arrows */
    const navigationArrowsIconLeftHandler = (IconName) => {
        setAttributes({ navigationArrowsIconLeft: IconName })

    }
    const navigationArrowsIconRightHandler = (IconName) => {
        setAttributes({ navigationArrowsIconRight: IconName })
    }
    /** End Navigation Custom Arrows */

    /** Start Load Google Font */
    if (imageCaptionFontFamily !== 'Default') {
        LoadGoogleFont(imageCaptionFontFamily);
    }
    if (imageTooltipFontFamily !== 'Default') {
        LoadGoogleFont(imageTooltipFontFamily);
    }
    /** End Load Google Font */


    /**
     * Inspector General Controls
     */
    const generalControls = (
        <>
            <PanelBody
                title={__("Show / Hide Elements", "gslider-blocks")}
                opened={openPanels.general === "show-hide-elements"}
                onToggle={() => togglePanel("general", "show-hide-elements")}
            >
                <ResponsiveToggleControl
                    label={__("Show Caption", "gslider-blocks")}
                    toggleValue={showCaption}
                    setToggleValue={(value) => setAttributes({ showCaption: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
                <ResponsiveToggleControl
                    label={__("Show Navigation", "gslider-blocks")}
                    toggleValue={showNavigation}
                    setToggleValue={(value) => setAttributes({ showNavigation: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
                <ResponsiveToggleControl
                    label={__("Show Pagination", "gslider-blocks")}
                    toggleValue={showPagination}
                    setToggleValue={(value) => setAttributes({ showPagination: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                />
                <ToggleControl
                    label={__('Enable image Links', 'gslider-blocks')}
                    help={__('Allow images to be clickable with custom URLs', 'gslider-blocks')}
                    checked={enableimageLinks}
                    onChange={(value) => setAttributes({ enableimageLinks: value })}
                />
                <ToggleControl
                    label={__('Enable Lightbox', 'gslider-blocks')}
                    help={__('Open images in a lightbox on click', 'gslider-blocks')}
                    checked={enableLightbox}
                    onChange={(value) => setAttributes({ enableLightbox: value })}
                />
                <ToggleControl
                    label={__('Enable Tooltip', 'gslider-blocks')}
                    help={__('Show custom tooltip text when hovering over images', 'gslider-blocks')}
                    checked={showTooltip}
                    onChange={(value) => setAttributes({ showTooltip: value })}
                />
            </PanelBody>
            <PanelBody
                title={__("Layout & Content Setting", "gslider-blocks")}
                opened={openPanels.general === "layout-content-setting"}
                onToggle={() => togglePanel("general", "layout-content-setting")}
            >
                <ResponsiveRangeControl
                    label={__("Height", "gslider-blocks")}
                    rangeValue={layoutHeight}
                    onChangeValue={(value) => setAttributes({ layoutHeight: value })}
                    onUnitChange={(value) => setAttributes({ layoutHeightUnits: value })}
                    deviceType={deviceType}
                    units={layoutHeightUnits}
                    resetFallbackValue={{
                        px: "500",
                        "%": "50",
                        vh: "50",
                        vw: "50",
                        em: "20",
                        rem: "20",
                    }}
                />

                <ResponsiveAlignmentControl
                    label={__("Vertical Alignment", "gslider-blocks")}
                    options={VERTICAL_ALIGN}
                    alignmentValue={verticalAlign}
                    setAlignmentValue={(value) => setAttributes({ verticalAlign: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                    className="gslider-vertical-alignment"
                />

            </PanelBody>

            <PanelBody
                title={__("Carousel Settings", "gslider-blocks")}
                opened={openPanels.general === "carousel-settings"}
                onToggle={() => togglePanel("general", "carousel-settings")}
            >
                <ResponsiveRangeControl
                    min={1}
                    max={12}
                    label={__("Number of Columns", "gslider-blocks")}
                    rangeValue={carouselPerColumn}
                    onChangeValue={(value) => setAttributes({ carouselPerColumn: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={"2"}
                    isRangeUnit={false}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={200}
                    label={__("Column Gap (px)", "gslider-blocks")}
                    rangeValue={carouselPerColumnGap}
                    onChangeValue={(value) => setAttributes({ carouselPerColumnGap: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={""}
                    isRangeUnit={false}
                />
                <ToggleControl
                    label={__('Infinite Loop', 'gslider-blocks')}
                    checked={infiniteLoop}
                    onChange={(value) => setAttributes({ infiniteLoop: value })}
                />
                <ToggleControl
                    label={__('Touch Swipe Control', 'gslider-blocks')}
                    checked={allowTouchMove}
                    onChange={(value) => setAttributes({ allowTouchMove: value })}
                />
                <ToggleControl
                    label={__("Pause on Hover", "gslider-blocks")}
                    checked={pauseOnHover}
                    onChange={(value) => setAttributes({ pauseOnHover: value })}
                />
                <ToggleControl
                    label={__("Stop Autoplay at Last Slide", "gslider-blocks")}
                    checked={stopOnLastSlide}
                    onChange={(value) => {
                        setAttributes({ stopOnLastSlide: value });
                        if (value) {
                            setAttributes({ infiniteLoop: false });
                            setAttributes({ autoplay: true });
                        }
                    }}
                />
                <ToggleControl
                    label={__("Reverse Autoplay Direction", "gslider-blocks")}
                    checked={reverseDirection}
                    onChange={(value) => {
                        setAttributes({ reverseDirection: value });
                        if (value) {
                            setAttributes({ autoplay: true });
                        }
                    }}
                />
                <ToggleControl
                    label={__("Mousewheel Navigation", "gslider-blocks")}
                    checked={mousewheelControl}
                    onChange={(value) => setAttributes({ mousewheelControl: value })}
                />
                <ToggleControl
                    label={__("Keyboard Navigation", "gslider-blocks")}
                    checked={keyboardNavigation}
                    onChange={(value) => setAttributes({ keyboardNavigation: value })}
                />
                <ToggleControl
                    label={__('Autoplay', 'gslider-blocks')}
                    checked={autoplay}
                    onChange={(value) => setAttributes({ autoplay: value })}
                />
                {autoplay && (
                    <ResponsiveRangeControl
                        min={500}
                        max={20000}
                        label={__("Autoplay Delay (ms)", "gslider-blocks")}
                        rangeValue={autoplayDelay}
                        onChangeValue={(value) => setAttributes({ autoplayDelay: value })}
                        deviceType={deviceType}
                        step={100}
                        resetFallbackValue={"1000"}
                        isRangeUnit={false}
                    />
                )}

                <ResponsiveRangeControl
                    min={100}
                    max={5000}
                    label={__("Transition Speed (ms)", "gslider-blocks")}
                    rangeValue={speed}
                    onChangeValue={(value) => setAttributes({ speed: value })}
                    deviceType={deviceType}
                    step={50}
                    resetFallbackValue={"800"}
                    isRangeUnit={false}
                />
            </PanelBody>

            <PanelBody
                title={__("image Hover Effect", "gslider-blocks")}
                opened={openPanels.general === "image-hover-effect"}
                onToggle={() => togglePanel("general", "image-hover-effect")}
            >
                <SelectControls
                    label={__('Hover Effect', 'gslider-blocks')}
                    options={[
                        { label: __('None', 'gslider-blocks'), value: 'none' },
                        { label: __('Opacity', 'gslider-blocks'), value: 'opacity' },
                        { label: __('Scale', 'gslider-blocks'), value: 'scale' },
                        { label: __('Move Up', 'gslider-blocks'), value: 'move-up' },
                        { label: __('Grayscale to Color', 'gslider-blocks'), value: 'grayscale' },
                        { label: __('Opacity & Scale', 'gslider-blocks'), value: 'both' },
                    ]}
                    value={imageLinkHoverEffect}
                    onChange={(value) => setAttributes({ imageLinkHoverEffect: value })}
                />

                {(imageLinkHoverEffect === 'opacity' || imageLinkHoverEffect === 'both') && (
                    <ResponsiveRangeControl
                        min={0}
                        max={1}
                        step={0.05}
                        label={__("Hover Opacity", "gslider-blocks")}
                        rangeValue={imageLinkHoverOpacity}
                        onChangeValue={(value) => setAttributes({ imageLinkHoverOpacity: value })}
                        deviceType={deviceType}
                        resetFallbackValue={"0.8"}
                        isRangeUnit={false}
                    />
                )}

                {(imageLinkHoverEffect === 'scale' || imageLinkHoverEffect === 'both') && (
                    <ResponsiveRangeControl
                        min={0.8}
                        max={1.5}
                        step={0.05}
                        label={__("Hover Scale", "gslider-blocks")}
                        rangeValue={imageLinkHoverScale}
                        onChangeValue={(value) => setAttributes({ imageLinkHoverScale: value })}
                        deviceType={deviceType}
                        resetFallbackValue={"1.05"}
                        isRangeUnit={false}
                    />
                )}

                {(imageLinkHoverEffect === 'move-up') && (
                    <ResponsiveRangeControl
                        label={__("Lift Amount", "gslider-blocks")}
                        rangeValue={imageLinkHoverLift}
                        onChangeValue={(value) => setAttributes({ imageLinkHoverLift: value })}
                        onUnitChange={(value) => setAttributes({ imageLinkHoverLiftUnits: value })}
                        deviceType={deviceType}
                        units={imageLinkHoverLiftUnits}
                        resetFallbackValue={{
                            px: "10",
                            "%": "5",
                            em: "1",
                            rem: "1",
                            vw: "1",
                            vh: "1"
                        }}
                        isRangeUnit={true}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                            em: { min: 0, max: 10, step: 0.1 },
                            rem: { min: 0, max: 10, step: 0.1 },
                            '%': { min: 0, max: 100, step: 1 },
                        }}
                    />



                )}

                <ResponsiveRangeControl
                    min={100}
                    max={1000}
                    step={50}
                    label={__("Transition Duration (ms)", "gslider-blocks")}
                    rangeValue={imageLinkTransitionDuration}
                    onChangeValue={(value) => setAttributes({ imageLinkTransitionDuration: value })}
                    deviceType={deviceType}
                    resetFallbackValue={"300"}
                    isRangeUnit={false}
                />
            </PanelBody>
            <PanelBody
                title={__("Carousel Effect", "gslider-blocks")}
                opened={openPanels.general === "carousel-effect"}
                onToggle={() => togglePanel("general", "carousel-effect")}
            >
                <SelectControls
                    label={__('Effect Type', 'gslider-blocks')}
                    options={CAROUSEL_EFFECT_OPTIONS}
                    value={carouselEffect}
                    onChange={(value) => setAttributes({ carouselEffect: value })}
                />
            </PanelBody>

            {showNavigation?.[deviceType] && (
                <PanelBody
                    title={__("Navigation", "gslider-blocks")}
                    opened={openPanels.general === "navigation"}
                    onToggle={() => togglePanel("general", "navigation")}
                >
                    <ToggleControl
                        label={__('Custom Icon', 'gslider-blocks')}
                        checked={navigationArrowsIconSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowsIconSwitcher: value })}
                    />

                    {navigationArrowsIconSwitcher && (
                        <>
                            <BaseControl>
                                <SwitcherControl
                                    label={__("Left Icon", "gslider-blocks")}
                                    options={ARROW_ICON_ALIGN}
                                    value={navigationArrowsIconLeftAlign}
                                    onChange={(value) => setAttributes({ navigationArrowsIconLeftAlign: value })}
                                />

                                {navigationArrowsIconLeftAlign === 'icon' && (
                                    <IconPicker value={navigationArrowsIconLeft} setIconHandler={navigationArrowsIconLeftHandler} />
                                )}

                                {navigationArrowsIconLeftAlign === 'image' && (
                                    <ImageControl
                                        imageUrl={navigationArrowsIconLeftImageUrl}
                                        setImageUrl={(value) => setAttributes({ navigationArrowsIconLeftImageUrl: value })}
                                        imageAlt={navigationArrowsIconLeftImageAlt}
                                        setImageAlt={(value) => setAttributes({ navigationArrowsIconLeftImageAlt: value })}
                                        imageID={navigationArrowsIconLeftImageID}
                                        setImageID={(value) => setAttributes({ navigationArrowsIconLeftImageID: value })}
                                        isImageSize={false}
                                    />
                                )}
                            </BaseControl>

                            <BaseControl>
                                <SwitcherControl
                                    label={__("Right Icon", "gslider-blocks")}
                                    options={ARROW_ICON_ALIGN}
                                    value={navigationArrowsIconRightAlign}
                                    onChange={(value) => setAttributes({ navigationArrowsIconRightAlign: value })}
                                />

                                {navigationArrowsIconRightAlign === 'icon' && (
                                    <IconPicker value={navigationArrowsIconRight} setIconHandler={navigationArrowsIconRightHandler} />
                                )}

                                {navigationArrowsIconRightAlign === 'image' && (
                                    <ImageControl
                                        imageUrl={navigationArrowsIconRightImageUrl}
                                        setImageUrl={(value) => setAttributes({ navigationArrowsIconRightImageUrl: value })}
                                        imageAlt={navigationArrowsIconRightImageAlt}
                                        setImageAlt={(value) => setAttributes({ navigationArrowsIconRightImageAlt: value })}
                                        imageID={navigationArrowsIconRightImageID}
                                        setImageID={(value) => setAttributes({ navigationArrowsIconRightImageID: value })}
                                        isImageSize={false}
                                    />
                                )}
                            </BaseControl>
                        </>
                    )}

                    <SwitcherControl
                        label={__("Position Type", "gslider-blocks")}
                        options={NAVIGATION_ARROW_POSITION_TYPE}
                        value={navigationArrowPositionType}
                        onChange={(value) => setAttributes({ navigationArrowPositionType: value })}
                    />

                    <SelectControls
                        label={__("Position", "gslider-blocks")}
                        options={NAVIGATION_ARROW_POSITION}
                        value={navigationArrowPosition}
                        onChange={(value) => setAttributes({ navigationArrowPosition: value })}
                    />

                    {navigationArrowPosition !== 'center' && (
                        <SelectControls
                            label={__("Arrow Direction", "gslider-blocks")}
                            options={NAVIGATION_ARROW_DIRECTION}
                            value={navigationArrowDirection}
                            onChange={(value) => setAttributes({ navigationArrowDirection: value })}
                        />
                    )}

                    {navigationArrowPosition === 'top-left' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}
                    {navigationArrowPosition === 'top-center' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'top-right' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionTopOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionTopOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionTopOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionTopOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Right Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionRightOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionRightOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionRightOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionRightOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'bottom-left' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Bottom Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}
                    {navigationArrowPosition === 'bottom-center' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Left Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionLeftOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionLeftOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionLeftOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionLeftOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition === 'bottom-right' && (
                        <>
                            <ResponsiveRangeControl
                                label={__("Top Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionBottomOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionBottomOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionBottomOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionBottomOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                            <ResponsiveRangeControl
                                label={__("Right Offset", "gslider-blocks")}
                                rangeValue={navigationArrowPositionRightOffset}
                                onChangeValue={(value) => setAttributes({ navigationArrowPositionRightOffset: value })}
                                onUnitChange={(value) => setAttributes({ navigationArrowPositionRightOffsetUnits: value })}
                                deviceType={deviceType}
                                units={navigationArrowPositionRightOffsetUnits}
                                resetFallbackValue={""}
                                unitBounds={{
                                    px: { min: 0, max: 1000, step: 1 },
                                }}
                            />
                        </>
                    )}

                    {navigationArrowPosition !== 'center' && (
                        <ResponsiveRangeControl
                            label={__("Gap", "gslider-blocks")}
                            rangeValue={navigationArrowGap}
                            onChangeValue={(value) => setAttributes({ navigationArrowGap: value })}
                            onUnitChange={(value) => setAttributes({ navigationArrowGapUnits: value })}
                            deviceType={deviceType}
                            units={navigationArrowGapUnits}
                            resetFallbackValue={{
                                px: "10",
                                "%": "2",
                                vh: "2",
                                vw: "2",
                                em: "0.75",
                                rem: "0.75",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />
                    )}

                    {navigationArrowPositionType === 'outside' && (
                        <ResponsiveRangeControl
                            label={__("Padding", "gslider-blocks")}
                            rangeValue={navigationArrowPositionOutsidePadding}
                            onChangeValue={(value) => setAttributes({ navigationArrowPositionOutsidePadding: value })}
                            onUnitChange={(value) => setAttributes({ navigationArrowPositionOutsidePaddingUnits: value })}
                            deviceType={deviceType}
                            units={navigationArrowPositionOutsidePaddingUnits}
                            resetFallbackValue={{
                                px: "60",
                                "%": "5",
                                vh: "5",
                                vw: "5",
                                em: "3.75",
                                rem: "3.75",
                            }}
                            unitBounds={{
                                px: { min: 0, max: 200, step: 1 },
                            }}
                        />
                    )}

                </PanelBody>
            )}

            {showPagination?.[deviceType] && (
                <PanelBody
                    title={__("Pagination", "gslider-blocks")}
                    opened={openPanels.general === "pagination"}
                    onToggle={() => togglePanel("general", "pagination")}
                >
                    <SwitcherControl
                        label={__("Position Type", "gslider-blocks")}
                        options={PAGINATION_POSITION_TYPE}
                        value={paginationPositionType}
                        onChange={(value) => setAttributes({ paginationPositionType: value })}
                    />

                    <SelectControls
                        label={__("Pagination Type", "gslider-blocks")}
                        options={PAGINATION_TYPE}
                        value={paginationType}
                        onChange={(value) => setAttributes({ paginationType: value })}
                    />

                    {paginationType === 'bullets' && (
                        <ToggleControl
                            label={__("Dynamic Bullets", "slider-blocks")}
                            checked={dynamicBullets}
                            onChange={(value) => setAttributes({ dynamicBullets: value })}
                        />
                    )}
                </PanelBody>
            )}

            {enableimageLinks && (
                <PanelBody
                    title={__("image Link Settings", "gslider-blocks")}
                    opened={openPanels.general === "image-link-settings"}
                    onToggle={() => togglePanel("general", "image-link-settings")}
                >
                    <SelectControls
                        label={__('Link Target', 'gslider-blocks')}
                        help={__('Choose where to open the link', 'gslider-blocks')}
                        options={[
                            { label: __('New Tab', 'gslider-blocks'), value: '_blank' },
                            { label: __('Same Tab', 'gslider-blocks'), value: '_self' },
                        ]}
                        value={imageLinkTarget}
                        onChange={(value) => setAttributes({ imageLinkTarget: value })}
                    />

                    <InputControls
                        label={__('Link Rel Attribute', 'gslider-blocks')}
                        help={__('Relationship between current and linked document', 'gslider-blocks')}
                        value={imageLinkRel}
                        onChange={(value) => setAttributes({ imageLinkRel: value })}
                        placeholder="noopener noreferrer"
                    />
                </PanelBody>
            )}

            <PanelBody
                title={__("Performance Settings", "gslider-blocks")}
                opened={openPanels.general === "performance-settings"}
                onToggle={() => togglePanel("general", "performance-settings")}
                initialOpen={false}
            >
                <ToggleControl
                    label={__("Enable Lazy Loading", "gslider-blocks")}
                    help={__("Delay loading of images until they are in the viewport.", "gslider-blocks")}
                    checked={enableLazyLoad}
                    onChange={(value) => setAttributes({ enableLazyLoad: value })}
                />
            </PanelBody>
        </>
    );

    /**
     * Inspector Style Controls
     */
    const styleControls = (
        <>
            <PanelBody
                title={__("image", "gslider-blocks")}
                opened={openPanels.styles === "content"}
                onToggle={() => togglePanel("styles", "content")}
            >

                <ResponsiveRangeControl
                    label={__("Max Width", "gslider-blocks")}
                    rangeValue={imageMaxWidth}
                    onChangeValue={(value) => setAttributes({ imageMaxWidth: value })}
                    onUnitChange={(value) => setAttributes({ imageMaxWidthUnits: value })}
                    deviceType={deviceType}
                    units={imageMaxWidthUnits}
                    resetFallbackValue={""}
                    unitBounds={{
                        px: { min: 0, max: 1000, step: 1 },
                    }}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imagePaddingUnits}
                    onChangeUnits={(value) => setAttributes({ imagePaddingUnits: value })}
                    desktopSpacing={imagePaddingDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imagePaddingDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imagePaddingDesktopCssStyle: value })}
                    tabletSpacing={imagePaddingTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imagePaddingTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imagePaddingTabletCssStyle: value })}
                    mobileSpacing={imagePaddingMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imagePaddingMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imagePaddingMobileCssStyle: value })}
                    isLinked={imagePaddingLink}
                    onChangeLink={(value) => setAttributes({ imagePaddingLink: value })}
                />

                <BackgroundControl
                    label={__("Background Color", "gslider-blocks")}
                    deviceType={deviceType}

                    normalBackgroundType={imageNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ imageNormalBackgroundType: value })}
                    normalClassicColor={imageNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ imageNormalClassicColor: value })}
                    normalGradientColor={imageNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ imageNormalGradientColor: value })}
                    normalCustomGradientSwitcher={imageNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ imageNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={imageNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ imageNormalCustomGradientInputValue: value })}

                    hoverBackgroundType={imageHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ imageHoverBackgroundType: value })}
                    hoverClassicColor={imageHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ imageHoverClassicColor: value })}
                    hoverGradientColor={imageHoverGradientColor}
                    setHoverGradientColor={(value) => setAttributes({ imageHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={imageHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ imageHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={imageHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ imageHoverCustomGradientInputValue: value })}
                    setAttributes={setAttributes}
                    isBackgroundImage={false}
                />

                <SelectControls
                    label={__("Border Style", "gslider-blocks")}
                    options={BORDER_STYLES}
                    value={imageBorder}
                    onChange={(value) => setAttributes({ imageBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={imageBorderColorSwitcher}
                    onChange={(value) => setAttributes({ imageBorderColorSwitcher: value })}
                />

                {imageBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={imageBorderColor}
                        onChangeColor={(value) => setAttributes({ imageBorderColor: value })}
                    />
                )}

                {imageBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={imageBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ imageBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imageBorderUnits}
                    onChangeUnits={(value) => setAttributes({ imageBorderUnits: value })}
                    desktopSpacing={imageBorderDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imageBorderDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imageBorderDesktopCssStyle: value })}
                    tabletSpacing={imageBorderTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imageBorderTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imageBorderTabletCssStyle: value })}
                    mobileSpacing={imageBorderMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imageBorderMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imageBorderMobileCssStyle: value })}
                    isLinked={imageBorderLink}
                    onChangeLink={(value) => setAttributes({ imageBorderLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={imageBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ imageBorderRadiusUnits: value })}
                    desktopSpacing={imageBorderRadiusDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ imageBorderRadiusDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ imageBorderRadiusDesktopCssStyle: value })}
                    tabletSpacing={imageBorderRadiusTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ imageBorderRadiusTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ imageBorderRadiusTabletCssStyle: value })}
                    mobileSpacing={imageBorderRadiusMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ imageBorderRadiusMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ imageBorderRadiusMobileCssStyle: value })}
                    isLinked={imageBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ imageBorderRadiusLink: value })}
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={imageBoxShadowValuesSwitcher}
                    onChange={(value) => setAttributes({ imageBoxShadowValuesSwitcher: value })}
                />

                {imageBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ imageBoxShadowValues: value })}
                        initialShadowValue={imageBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ imageBoxShadowCssValue: value })}
                    />
                )}

                {imageBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ imageBoxShadowHoverValues: value })}
                        initialShadowValue={imageBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ imageBoxShadowHoverCssValue: value })}
                    />
                )}

            </PanelBody>

            {showCaption?.[deviceType] && (
                <PanelBody
                    title={__("Caption", "gslider-blocks")}
                    opened={openPanels.styles === "caption"}
                    onToggle={() => togglePanel("styles", "caption")}
                >

                    <ResponsiveTypographyControl
                        fontFamily={imageCaptionFontFamily}
                        onChangeFontFamily={(value) => setAttributes({ imageCaptionFontFamily: value })}

                        fontSize={imageCaptionFontSize}
                        onChangeFontSize={(value) => setAttributes({ imageCaptionFontSize: value })}

                        fontSizeUnits={imageCaptionFontSizeUnits}
                        onChangeFontSizeUnit={(value) => setAttributes({ imageCaptionFontSizeUnits: value })}

                        fontWeight={imageCaptionFontWeight}
                        onChangeFontWeight={(value) => setAttributes({ imageCaptionFontWeight: value })}

                        fontStyle={imageCaptionFontStyle}
                        onChangeFontStyle={(value) => setAttributes({ imageCaptionFontStyle: value })}

                        textTransform={imageCaptionTextTransform}
                        onChangeTextTransform={(value) => setAttributes({ imageCaptionTextTransform: value })}

                        textDecoration={imageCaptionTextDecoration}
                        onChangeTextDecoration={(value) => setAttributes({ imageCaptionTextDecoration: value })}

                        lineHeight={imageCaptionLineHeight}
                        onChangeLineHeight={(value) => setAttributes({ imageCaptionLineHeight: value })}

                        lineHeightUnits={imageCaptionLineHeightUnits}
                        onChangeLineHeightUnit={(value) => setAttributes({ imageCaptionLineHeightUnits: value })}

                        letterSpacing={imageCaptionLetterSpacing}
                        onChangeLetterSpacing={(value) => setAttributes({ imageCaptionLetterSpacing: value })}

                        letterSpacingUnits={imageCaptionLetterSpacingUnits}
                        onChangeLetterSpacingUnit={(value) => setAttributes({ imageCaptionLetterSpacingUnits: value })}

                        wordSpacing={imageCaptionWordSpacing}
                        onChangeWordSpacing={(value) => setAttributes({ imageCaptionWordSpacing: value })}

                        wordSpacingUnits={imageCaptionWordSpacingUnits}
                        onChangeWordSpacingUnit={(value) => setAttributes({ imageCaptionWordSpacingUnits: value })}

                        deviceType={deviceType}
                    />

                    <SwitcherControl
                        label={__("Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={imageCaptionColorSwitcher}
                        onChange={(value) => setAttributes({ imageCaptionColorSwitcher: value })}
                    />

                    {imageCaptionColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={imageCaptionColor}
                            onChangeColor={(value) => setAttributes({ imageCaptionColor: value })}
                            defaultColor=''
                        />
                    )}

                    {imageCaptionColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={imageCaptionColorHover}
                            onChangeColor={(value) => setAttributes({ imageCaptionColorHover: value })}
                            defaultColor=''
                        />
                    )}


                    <BackgroundControl
                        label={__("Background Color", "gslider-blocks")}

                        normalBackgroundType={imageCaptionNormalBackgroundType}
                        setNormalBackgroundType={(value) => setAttributes({ imageCaptionNormalBackgroundType: value })}
                        normalClassicColor={imageCaptionNormalClassicColor}
                        setNormalClassicColor={(value) => setAttributes({ imageCaptionNormalClassicColor: value })}
                        normalGradientColor={imageCaptionNormalGradientColor}
                        setNormalGradientColor={(value) => setAttributes({ imageCaptionNormalGradientColor: value })}
                        normalCustomGradientSwitcher={imageCaptionNormalCustomGradientSwitcher}
                        setNormalCustomGradientSwitcher={(value) => setAttributes({ imageCaptionNormalCustomGradientSwitcher: value })}
                        normalCustomGradientInputValue={imageCaptionNormalCustomGradientInputValue}
                        setNormalCustomGradientInputValue={(value) => setAttributes({ imageCaptionNormalCustomGradientInputValue: value })}
                        normalClassicDefaultColor={'#00000075'}

                        hoverBackgroundType={imageCaptionHoverBackgroundType}
                        setHoverBackgroundType={(value) => setAttributes({ imageCaptionHoverBackgroundType: value })}
                        hoverClassicColor={imageCaptionHoverClassicColor}
                        setHoverClassicColor={(value) => setAttributes({ imageCaptionHoverClassicColor: value })}
                        hoverGradientColor={imageCaptionHoverGradientColor}
                        setHoverGradientColor={(value) => setAttributes({ imageCaptionHoverGradientColor: value })}
                        hoverCustomGradientSwitcher={imageCaptionHoverCustomGradientSwitcher}
                        setHoverCustomGradientSwitcher={(value) => setAttributes({ imageCaptionHoverCustomGradientSwitcher: value })}
                        hoverCustomGradientInputValue={imageCaptionHoverCustomGradientInputValue}
                        setHoverCustomGradientInputValue={(value) => setAttributes({ imageCaptionHoverCustomGradientInputValue: value })}
                        hoverClassicDefaultColor={''}
                        isBackgroundImage={false}
                    />

                    <SelectControls
                        label={__("Border Style", "gslider-blocks")}
                        options={BORDER_STYLES}
                        value={imageCaptionBorder}
                        onChange={(value) => setAttributes({ imageCaptionBorder: value })}
                    />

                    <SwitcherControl
                        label={__("Border Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={imageCaptionBorderColorSwitcher}
                        onChange={(value) => setAttributes({ imageCaptionBorderColorSwitcher: value })}
                    />

                    {imageCaptionBorderColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={imageCaptionBorderColor}
                            onChangeColor={(value) => setAttributes({ imageCaptionBorderColor: value })}
                        />
                    )}

                    {imageCaptionBorderColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={imageCaptionBorderHoverColor}
                            onChangeColor={(value) => setAttributes({ imageCaptionBorderHoverColor: value })}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Border", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageCaptionBorderUnits}
                        onChangeUnits={(value) => setAttributes({ imageCaptionBorderUnits: value })}
                        desktopSpacing={imageCaptionBorderDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageCaptionBorderDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageCaptionBorderDesktopCssStyle: value })}
                        tabletSpacing={imageCaptionBorderTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageCaptionBorderTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageCaptionBorderTabletCssStyle: value })}
                        mobileSpacing={imageCaptionBorderMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageCaptionBorderMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageCaptionBorderMobileCssStyle: value })}
                        isLinked={imageCaptionBorderLink}
                        onChangeLink={(value) => setAttributes({ imageCaptionBorderLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Border Radius", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageCaptionBorderRadiusUnits}
                        onChangeUnits={(value) => setAttributes({ imageCaptionBorderRadiusUnits: value })}
                        desktopSpacing={imageCaptionBorderRadiusDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageCaptionBorderRadiusDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageCaptionBorderRadiusDesktopCssStyle: value })}
                        tabletSpacing={imageCaptionBorderRadiusTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageCaptionBorderRadiusTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageCaptionBorderRadiusTabletCssStyle: value })}
                        mobileSpacing={imageCaptionBorderRadiusMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageCaptionBorderRadiusMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageCaptionBorderRadiusMobileCssStyle: value })}
                        isLinked={imageCaptionBorderRadiusLink}
                        onChangeLink={(value) => setAttributes({ imageCaptionBorderRadiusLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Padding", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageCaptionPaddingUnits}
                        onChangeUnits={(value) => setAttributes({ imageCaptionPaddingUnits: value })}
                        desktopSpacing={imageCaptionPaddingDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageCaptionPaddingDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageCaptionPaddingDesktopCssStyle: value })}
                        tabletSpacing={imageCaptionPaddingTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageCaptionPaddingTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageCaptionPaddingTabletCssStyle: value })}
                        mobileSpacing={imageCaptionPaddingMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageCaptionPaddingMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageCaptionPaddingMobileCssStyle: value })}
                        isLinked={imageCaptionPaddingLink}
                        onChangeLink={(value) => setAttributes({ imageCaptionPaddingLink: value })}
                    />

                </PanelBody>
            )}


            {showTooltip && (
                <PanelBody
                    title={__("Tooltip", "gslider-blocks")}
                    opened={openPanels.styles === "tooltip"}
                    onToggle={() => togglePanel("styles", "tooltip")}
                >
                    <ResponsiveTypographyControl
                        fontFamily={imageTooltipFontFamily}
                        onChangeFontFamily={(value) => setAttributes({ imageTooltipFontFamily: value })}

                        fontSize={imageTooltipFontSize}
                        onChangeFontSize={(value) => setAttributes({ imageTooltipFontSize: value })}

                        fontSizeUnits={imageTooltipFontSizeUnits}
                        onChangeFontSizeUnit={(value) => setAttributes({ imageTooltipFontSizeUnits: value })}

                        fontWeight={imageTooltipFontWeight}
                        onChangeFontWeight={(value) => setAttributes({ imageTooltipFontWeight: value })}

                        fontStyle={imageTooltipFontStyle}
                        onChangeFontStyle={(value) => setAttributes({ imageTooltipFontStyle: value })}

                        textTransform={imageTooltipTextTransform}
                        onChangeTextTransform={(value) => setAttributes({ imageTooltipTextTransform: value })}

                        textDecoration={imageTooltipTextDecoration}
                        onChangeTextDecoration={(value) => setAttributes({ imageTooltipTextDecoration: value })}

                        lineHeight={imageTooltipLineHeight}
                        onChangeLineHeight={(value) => setAttributes({ imageTooltipLineHeight: value })}

                        lineHeightUnits={imageTooltipLineHeightUnits}
                        onChangeLineHeightUnit={(value) => setAttributes({ imageTooltipLineHeightUnits: value })}

                        letterSpacing={imageTooltipLetterSpacing}
                        onChangeLetterSpacing={(value) => setAttributes({ imageTooltipLetterSpacing: value })}

                        letterSpacingUnits={imageTooltipLetterSpacingUnits}
                        onChangeLetterSpacingUnit={(value) => setAttributes({ imageTooltipLetterSpacingUnits: value })}

                        wordSpacing={imageTooltipWordSpacing}
                        onChangeWordSpacing={(value) => setAttributes({ imageTooltipWordSpacing: value })}

                        wordSpacingUnits={imageTooltipWordSpacingUnits}
                        onChangeWordSpacingUnit={(value) => setAttributes({ imageTooltipWordSpacingUnits: value })}

                        deviceType={deviceType}
                    />

                    <ColorControl
                        label={__("Text Color", "gslider-blocks")}
                        color={imageTooltipColor}
                        onChangeColor={(value) => setAttributes({ imageTooltipColor: value })}
                        defaultColor=''
                    />

                    <ColorControl
                        label={__("Background Color", "gslider-blocks")}
                        color={imageTooltipBgColor}
                        onChangeColor={(value) => setAttributes({ imageTooltipBgColor: value })}
                        defaultColor=''
                    />

                    <SelectControls
                        label={__("Border Style", "gslider-blocks")}
                        options={BORDER_STYLES}
                        value={imageTooltipBorder}
                        onChange={(value) => setAttributes({ imageTooltipBorder: value })}
                    />

                    <ColorControl
                        label={__("Border Color", "gslider-blocks")}
                        color={imageTooltipBorderColor}
                        onChangeColor={(value) => setAttributes({ imageTooltipBorderColor: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Border", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageTooltipBorderUnits}
                        onChangeUnits={(value) => setAttributes({ imageTooltipBorderUnits: value })}
                        desktopSpacing={imageTooltipBorderDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageTooltipBorderDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageTooltipBorderDesktopCssStyle: value })}
                        tabletSpacing={imageTooltipBorderTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageTooltipBorderTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageTooltipBorderTabletCssStyle: value })}
                        mobileSpacing={imageTooltipBorderMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageTooltipBorderMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageTooltipBorderMobileCssStyle: value })}
                        isLinked={imageTooltipBorderLink}
                        onChangeLink={(value) => setAttributes({ imageTooltipBorderLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Border Radius", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageTooltipBorderRadiusUnits}
                        onChangeUnits={(value) => setAttributes({ imageTooltipBorderRadiusUnits: value })}
                        desktopSpacing={imageTooltipBorderRadiusDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageTooltipBorderRadiusDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageTooltipBorderRadiusDesktopCssStyle: value })}
                        tabletSpacing={imageTooltipBorderRadiusTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageTooltipBorderRadiusTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageTooltipBorderRadiusTabletCssStyle: value })}
                        mobileSpacing={imageTooltipBorderRadiusMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageTooltipBorderRadiusMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageTooltipBorderRadiusMobileCssStyle: value })}
                        isLinked={imageTooltipBorderRadiusLink}
                        onChangeLink={(value) => setAttributes({ imageTooltipBorderRadiusLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Padding", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={imageTooltipPaddingUnits}
                        onChangeUnits={(value) => setAttributes({ imageTooltipPaddingUnits: value })}
                        desktopSpacing={imageTooltipPaddingDesktop}
                        onChangeDesktopSpacing={(value) => setAttributes({ imageTooltipPaddingDesktop: value })}
                        desktopSpacingStyle={(value) => setAttributes({ imageTooltipPaddingDesktopCssStyle: value })}
                        tabletSpacing={imageTooltipPaddingTablet}
                        onChangeTabletSpacing={(value) => setAttributes({ imageTooltipPaddingTablet: value })}
                        tabletSpacingStyle={(value) => setAttributes({ imageTooltipPaddingTabletCssStyle: value })}
                        mobileSpacing={imageTooltipPaddingMobile}
                        onChangeMobileSpacing={(value) => setAttributes({ imageTooltipPaddingMobile: value })}
                        mobileSpacingStyle={(value) => setAttributes({ imageTooltipPaddingMobileCssStyle: value })}
                        isLinked={imageTooltipPaddingLink}
                        onChangeLink={(value) => setAttributes({ imageTooltipPaddingLink: value })}
                    />

                    <ResponsiveRangeControl
                        label={__("Top Position", "gslider-blocks")}
                        rangeValue={imageTooltipTopPosition}
                        onChangeValue={(value) => setAttributes({ imageTooltipTopPosition: value })}
                        onUnitChange={(value) => setAttributes({ imageTooltipTopPositionUnits: value })}
                        deviceType={deviceType}
                        units={imageTooltipTopPositionUnits}
                        resetFallbackValue={{
                            "%": "50",
                        }}
                        unitBounds={{
                            '%': { min: 0, max: 100, step: 1 },
                            px: { min: 0, max: 500, step: 1 },
                        }}
                    />


                    <ResponsiveRangeControl
                        label={__("Left Position", "gslider-blocks")}
                        rangeValue={imageTooltipLeftPosition}
                        onChangeValue={(value) => setAttributes({ imageTooltipLeftPosition: value })}
                        onUnitChange={(value) => setAttributes({ imageTooltipLeftPositionUnits: value })}
                        deviceType={deviceType}
                        units={imageTooltipLeftPositionUnits}
                        resetFallbackValue={{
                            "%": "50",
                        }}
                        unitBounds={{
                            '%': { min: 0, max: 100, step: 1 },
                            px: { min: 0, max: 500, step: 1 },
                        }}
                    />


                </PanelBody>
            )}

            {showNavigation?.[deviceType] && (
                <PanelBody
                    title={__("Navigation", "gslider-blocks")}
                    opened={openPanels.styles === "navigation"}
                    onToggle={() => togglePanel("styles", "navigation")}
                >
                    <ResponsiveRangeControl
                        label={__("Icon Size", "gslider-blocks")}
                        rangeValue={navigationArrowSize}
                        onChangeValue={(value) => setAttributes({ navigationArrowSize: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowSizeUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowSizeUnits}
                        resetFallbackValue={{
                            px: "16",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "1",
                            rem: "1",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />

                    <ResponsiveRangeControl
                        label={__("Width", "gslider-blocks")}
                        rangeValue={navigationArrowWidth}
                        onChangeValue={(value) => setAttributes({ navigationArrowWidth: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowWidthUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowWidthUnits}
                        resetFallbackValue={{
                            px: "46",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "2.875",
                            rem: "2.875",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />
                    <ResponsiveRangeControl
                        label={__("Height", "gslider-blocks")}
                        rangeValue={navigationArrowHeight}
                        onChangeValue={(value) => setAttributes({ navigationArrowHeight: value })}
                        onUnitChange={(value) => setAttributes({ navigationArrowHeightUnits: value })}
                        deviceType={deviceType}
                        units={navigationArrowHeightUnits}
                        resetFallbackValue={{
                            px: "46",
                            "%": "5",
                            vh: "",
                            vw: "",
                            em: "2.875",
                            rem: "2.875",
                        }}
                        unitBounds={{
                            px: { min: 0, max: 200, step: 1 },
                        }}
                    />

                    <SwitcherControl
                        label={__("Icon Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowColorSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowColorSwitcher: value })}
                    />

                    {navigationArrowColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={navigationArrowColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowColor: value })}
                            defaultColor='#333333'
                        />
                    )}

                    {navigationArrowColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={navigationArrowColorHover}
                            onChangeColor={(value) => setAttributes({ navigationArrowColorHover: value })}
                        />
                    )}

                    <BackgroundControl
                        label={__("Background Color", "gslider-blocks")}

                        normalBackgroundType={navigationArrowNormalBackgroundType}
                        setNormalBackgroundType={(value) => setAttributes({ navigationArrowNormalBackgroundType: value })}
                        normalClassicColor={navigationArrowNormalClassicColor}
                        setNormalClassicColor={(value) => setAttributes({ navigationArrowNormalClassicColor: value })}
                        normalGradientColor={navigationArrowNormalGradientColor}
                        setNormalGradientColor={(value) => setAttributes({ navigationArrowNormalGradientColor: value })}
                        normalCustomGradientSwitcher={navigationArrowNormalCustomGradientSwitcher}
                        setNormalCustomGradientSwitcher={(value) => setAttributes({ navigationArrowNormalCustomGradientSwitcher: value })}
                        normalCustomGradientInputValue={navigationArrowNormalCustomGradientInputValue}
                        setNormalCustomGradientInputValue={(value) => setAttributes({ navigationArrowNormalCustomGradientInputValue: value })}
                        normalClassicDefaultColor={'#d2d2d2c7'}

                        hoverBackgroundType={navigationArrowHoverBackgroundType}
                        setHoverBackgroundType={(value) => setAttributes({ navigationArrowHoverBackgroundType: value })}
                        hoverClassicColor={navigationArrowHoverClassicColor}
                        setHoverClassicColor={(value) => setAttributes({ navigationArrowHoverClassicColor: value })}
                        hoverGradientColor={navigationArrowHoverGradientColor}
                        setHoverGradientColor={(value) => setAttributes({ navigationArrowHoverGradientColor: value })}
                        hoverCustomGradientSwitcher={navigationArrowHoverCustomGradientSwitcher}
                        setHoverCustomGradientSwitcher={(value) => setAttributes({ navigationArrowHoverCustomGradientSwitcher: value })}
                        hoverCustomGradientInputValue={navigationArrowHoverCustomGradientInputValue}
                        setHoverCustomGradientInputValue={(value) => setAttributes({ navigationArrowHoverCustomGradientInputValue: value })}
                        hoverClassicDefaultColor={'#787878b8'}
                        isBackgroundImage={false}
                    />

                    <SelectControls
                        label={__("Border Style", "gslider-blocks")}
                        options={BORDER_STYLES}
                        value={navigationArrowBorder}
                        onChange={(value) => setAttributes({ navigationArrowBorder: value })}
                    />

                    <SwitcherControl
                        label={__("Border Color", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowBorderColorSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowBorderColorSwitcher: value })}
                    />

                    {navigationArrowBorderColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={navigationArrowBorderColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowBorderColor: value })}
                        />
                    )}

                    {navigationArrowBorderColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={navigationArrowBorderHoverColor}
                            onChangeColor={(value) => setAttributes({ navigationArrowBorderHoverColor: value })}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Border Width", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={navigationArrowBorderUnits}
                        onChangeUnits={(value) => setAttributes({ navigationArrowBorderUnits: value })}
                        desktopSpacing={navigationArrowDesktopBorder}
                        onChangeDesktopSpacing={(value) => setAttributes({ navigationArrowDesktopBorder: value })}
                        desktopSpacingStyle={(value) => setAttributes({ navigationArrowDesktopBorderCssStyle: value })}
                        tabletSpacing={navigationArrowTabletBorder}
                        onChangeTabletSpacing={(value) => setAttributes({ navigationArrowTabletBorder: value })}
                        tabletSpacingStyle={(value) => setAttributes({ navigationArrowTabletBorderCssStyle: value })}
                        mobileSpacing={navigationArrowMobileBorder}
                        onChangeMobileSpacing={(value) => setAttributes({ navigationArrowMobileBorder: value })}
                        mobileSpacingStyle={(value) => setAttributes({ navigationArrowMobileBorderCssStyle: value })}
                        isLinked={navigationArrowBorderLink}
                        onChangeLink={(value) => setAttributes({ navigationArrowBorderLink: value })}
                    />

                    <ResponsiveSpacingControl
                        label={__("Border Radius", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={navigationArrowBorderRadiusUnits}
                        onChangeUnits={(value) => setAttributes({ navigationArrowBorderRadiusUnits: value })}
                        desktopSpacing={navigationArrowDesktopBorderRadius}
                        onChangeDesktopSpacing={(value) => setAttributes({ navigationArrowDesktopBorderRadius: value })}
                        desktopSpacingStyle={(value) => setAttributes({ navigationArrowDesktopBorderRadiusCssStyle: value })}
                        tabletSpacing={navigationArrowTabletBorderRadius}
                        onChangeTabletSpacing={(value) => setAttributes({ navigationArrowTabletBorderRadius: value })}
                        tabletSpacingStyle={(value) => setAttributes({ navigationArrowTabletBorderRadiusCssStyle: value })}
                        mobileSpacing={navigationArrowMobileBorderRadius}
                        onChangeMobileSpacing={(value) => setAttributes({ navigationArrowMobileBorderRadius: value })}
                        mobileSpacingStyle={(value) => setAttributes({ navigationArrowMobileBorderRadiusCssStyle: value })}
                        isLinked={navigationArrowBorderRadiusLink}
                        onChangeLink={(value) => setAttributes({ navigationArrowBorderRadiusLink: value })}
                    />

                    <SwitcherControl
                        label={__("Box Shadow", "gslider-blocks")}
                        options={NORMAL_HOVER}
                        value={navigationArrowBoxShadowValuesSwitcher}
                        onChange={(value) => setAttributes({ navigationArrowBoxShadowValuesSwitcher: value })}
                    />

                    {navigationArrowBoxShadowValuesSwitcher === 'normal' && (
                        <BoxShadowSettingsControl
                            label={__("Normal Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ navigationArrowBoxShadowValues: value })}
                            initialShadowValue={navigationArrowBoxShadowValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ navigationArrowBoxShadowCssValue: value })}
                        />
                    )}

                    {navigationArrowBoxShadowValuesSwitcher === 'hover' && (
                        <BoxShadowSettingsControl
                            label={__("Hover Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ navigationArrowBoxShadowHoverValues: value })}
                            initialShadowValue={navigationArrowBoxShadowHoverValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ navigationArrowBoxShadowHoverCssValue: value })}
                        />
                    )}

                </PanelBody>
            )}

            {showPagination?.[deviceType] && (
                <PanelBody
                    title={__("Pagination", "gslider-blocks")}
                    opened={openPanels.styles === "pagination"}
                    onToggle={() => togglePanel("styles", "pagination")}
                >

                    {(paginationType === 'bullets' || paginationType === 'fraction') && (
                        <ResponsiveRangeControl
                            label={__("Position", "gslider-blocks")}
                            rangeValue={paginationDotsPosition}
                            onChangeValue={(value) => setAttributes({ paginationDotsPosition: value })}
                            onUnitChange={(value) => setAttributes({ paginationDotsPositionUnits: value })}
                            deviceType={deviceType}
                            units={paginationDotsPositionUnits}
                            resetFallbackValue={""}
                            unitBounds={{
                                px: { min: -200, max: 200, step: 1 },
                            }}
                        />
                    )}

                    {paginationType === 'progressbar' && (
                        <ResponsiveRangeControl
                            label={__("Position", "gslider-blocks")}
                            rangeValue={paginationProgressbarPosition}
                            onChangeValue={(value) => setAttributes({ paginationProgressbarPosition: value })}
                            onUnitChange={(value) => setAttributes({ paginationProgressbarPositionUnits: value })}
                            deviceType={deviceType}
                            units={paginationProgressbarPositionUnits}
                            resetFallbackValue={""}
                            unitBounds={{
                                px: { min: -200, max: 200, step: 1 },
                            }}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Margin", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={paginationDotsMarginUnits}
                        onChangeUnits={(value) => setAttributes({ paginationDotsMarginUnits: value })}
                        desktopSpacing={paginationDotsDesktopMargin}
                        onChangeDesktopSpacing={(value) => setAttributes({ paginationDotsDesktopMargin: value })}
                        desktopSpacingStyle={(value) => setAttributes({ paginationDotsDesktopMarginCssStyle: value })}
                        tabletSpacing={paginationDotsTabletMargin}
                        onChangeTabletSpacing={(value) => setAttributes({ paginationDotsTabletMargin: value })}
                        tabletSpacingStyle={(value) => setAttributes({ paginationDotsTabletMarginCssStyle: value })}
                        mobileSpacing={paginationDotsMobileMargin}
                        onChangeMobileSpacing={(value) => setAttributes({ paginationDotsMobileMargin: value })}
                        mobileSpacingStyle={(value) => setAttributes({ paginationDotsMobileMarginCssStyle: value })}
                        isLinked={paginationDotsMarginLink}
                        onChangeLink={(value) => setAttributes({ paginationDotsMarginLink: value })}
                    />

                    {paginationType === 'bullets' && (
                        <>
                            <SwitcherControl
                                label={__("Bullets Style", "gslider-blocks")}
                                options={NORMAL_ACTIVE}
                                value={paginationDotsSwitcher}
                                onChange={(value) => setAttributes({ paginationDotsSwitcher: value })}
                            />
                            {paginationDotsSwitcher === 'normal' && (
                                <>
                                    <ResponsiveRangeControl
                                        label={__("Width", "gslider-blocks")}
                                        rangeValue={paginationNormalDotsWidth}
                                        onChangeValue={(value) => setAttributes({ paginationNormalDotsWidth: value })}
                                        onUnitChange={(value) => setAttributes({ paginationNormalDotsWidthUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationNormalDotsWidthUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ResponsiveRangeControl
                                        label={__("Height", "gslider-blocks")}
                                        rangeValue={paginationNormalDotsHeight}
                                        onChangeValue={(value) => setAttributes({ paginationNormalDotsHeight: value })}
                                        onUnitChange={(value) => setAttributes({ paginationNormalDotsHeightUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationNormalDotsHeightUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ColorControl
                                        label={__("Color", "gslider-blocks")}
                                        color={paginationNormalDotsBgColor}
                                        onChangeColor={(value) => setAttributes({ paginationNormalDotsBgColor: value })}
                                        defaultColor='#333333'
                                    />

                                    <SelectControls
                                        label={__("Border Style", "gslider-blocks")}
                                        options={BORDER_STYLES}
                                        value={paginationNormalDotsBorder}
                                        onChange={(value) => setAttributes({ paginationNormalDotsBorder: value })}
                                    />

                                    <SwitcherControl
                                        label={__("Border Color", "gslider-blocks")}
                                        options={NORMAL_HOVER}
                                        value={paginationNormalDotsBorderColorSwitcher}
                                        onChange={(value) => setAttributes({ paginationNormalDotsBorderColorSwitcher: value })}
                                    />

                                    {paginationNormalDotsBorderColorSwitcher === 'normal' && (
                                        <ColorControl
                                            label={__("Normal Color", "gslider-blocks")}
                                            color={paginationNormalDotsBorderColor}
                                            onChangeColor={(value) => setAttributes({ paginationNormalDotsBorderColor: value })}
                                        />
                                    )}

                                    {paginationNormalDotsBorderColorSwitcher === 'hover' && (
                                        <ColorControl
                                            label={__("Hover Color", "gslider-blocks")}
                                            color={paginationNormalDotsBorderHoverColor}
                                            onChangeColor={(value) => setAttributes({ paginationNormalDotsBorderHoverColor: value })}
                                        />
                                    )}

                                    <ResponsiveSpacingControl
                                        label={__("Border Width", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationNormalDotsBorderUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationNormalDotsBorderUnits: value })}
                                        desktopSpacing={paginationNormalDotsDesktopBorder}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationNormalDotsDesktopBorder: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationNormalDotsDesktopBorderCssStyle: value })}
                                        tabletSpacing={paginationNormalDotsTabletBorder}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationNormalDotsTabletBorder: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationNormalDotsTabletBorderCssStyle: value })}
                                        mobileSpacing={paginationNormalDotsMobileBorder}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationNormalDotsMobileBorder: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationNormalDotsMobileBorderCssStyle: value })}
                                        isLinked={paginationNormalDotsBorderLink}
                                        onChangeLink={(value) => setAttributes({ paginationNormalDotsBorderLink: value })}
                                    />

                                    <ResponsiveSpacingControl
                                        label={__("Border Radius", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationNormalDotsBorderRadiusUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationNormalDotsBorderRadiusUnits: value })}
                                        desktopSpacing={paginationNormalDotsDesktopBorderRadius}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationNormalDotsDesktopBorderRadius: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationNormalDotsDesktopBorderRadiusCssStyle: value })}
                                        tabletSpacing={paginationNormalDotsTabletBorderRadius}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationNormalDotsTabletBorderRadius: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationNormalDotsTabletBorderRadiusCssStyle: value })}
                                        mobileSpacing={paginationNormalDotsMobileBorderRadius}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationNormalDotsMobileBorderRadius: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationNormalDotsMobileBorderRadiusCssStyle: value })}
                                        isLinked={paginationNormalDotsBorderRadiusLink}
                                        onChangeLink={(value) => setAttributes({ paginationNormalDotsBorderRadiusLink: value })}
                                    />
                                </>
                            )}

                            {paginationDotsSwitcher === 'active' && (
                                <>
                                    <ResponsiveRangeControl
                                        label={__("Width", "gslider-blocks")}
                                        rangeValue={paginationActiveDotsWidth}
                                        onChangeValue={(value) => setAttributes({ paginationActiveDotsWidth: value })}
                                        onUnitChange={(value) => setAttributes({ paginationActiveDotsWidthUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationActiveDotsWidthUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ResponsiveRangeControl
                                        label={__("Height", "gslider-blocks")}
                                        rangeValue={paginationActiveDotsHeight}
                                        onChangeValue={(value) => setAttributes({ paginationActiveDotsHeight: value })}
                                        onUnitChange={(value) => setAttributes({ paginationActiveDotsHeightUnits: value })}
                                        deviceType={deviceType}
                                        units={paginationActiveDotsHeightUnits}
                                        resetFallbackValue={{
                                            px: "8",
                                            "%": "",
                                            vh: "",
                                            vw: "",
                                            em: "0.5",
                                            rem: "0.5",
                                        }}
                                        unitBounds={{
                                            px: { min: 0, max: 200, step: 1 },
                                        }}
                                    />

                                    <ColorControl
                                        label={__("Color", "gslider-blocks")}
                                        color={paginationActiveDotsBgColor}
                                        onChangeColor={(value) => setAttributes({ paginationActiveDotsBgColor: value })}
                                    />

                                    <SelectControls
                                        label={__("Border Style", "gslider-blocks")}
                                        options={BORDER_STYLES}
                                        value={paginationActiveDotsBorder}
                                        onChange={(value) => setAttributes({ paginationActiveDotsBorder: value })}
                                    />

                                    <SwitcherControl
                                        label={__("Border Color", "gslider-blocks")}
                                        options={NORMAL_HOVER}
                                        value={paginationActiveDotsBorderColorSwitcher}
                                        onChange={(value) => setAttributes({ paginationActiveDotsBorderColorSwitcher: value })}
                                    />

                                    {paginationActiveDotsBorderColorSwitcher === 'normal' && (
                                        <ColorControl
                                            label={__("Normal Color", "gslider-blocks")}
                                            color={paginationActiveDotsBorderColor}
                                            onChangeColor={(value) => setAttributes({ paginationActiveDotsBorderColor: value })}
                                        />
                                    )}

                                    {paginationActiveDotsBorderColorSwitcher === 'hover' && (
                                        <ColorControl
                                            label={__("Hover Color", "gslider-blocks")}
                                            color={paginationActiveDotsBorderHoverColor}
                                            onChangeColor={(value) => setAttributes({ paginationActiveDotsBorderHoverColor: value })}
                                        />
                                    )}

                                    <ResponsiveSpacingControl
                                        label={__("Border Width", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationActiveDotsBorderUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationActiveDotsBorderUnits: value })}
                                        desktopSpacing={paginationActiveDotsDesktopBorder}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationActiveDotsDesktopBorder: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationActiveDotsDesktopBorderCssStyle: value })}
                                        tabletSpacing={paginationActiveDotsTabletBorder}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationActiveDotsTabletBorder: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationActiveDotsTabletBorderCssStyle: value })}
                                        mobileSpacing={paginationActiveDotsMobileBorder}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationActiveDotsMobileBorder: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationActiveDotsMobileBorderCssStyle: value })}
                                        isLinked={paginationActiveDotsBorderLink}
                                        onChangeLink={(value) => setAttributes({ paginationActiveDotsBorderLink: value })}
                                    />

                                    <ResponsiveSpacingControl
                                        label={__("Border Radius", "gslider-blocks")}
                                        deviceType={deviceType}
                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                        units={paginationActiveDotsBorderRadiusUnits}
                                        onChangeUnits={(value) => setAttributes({ paginationActiveDotsBorderRadiusUnits: value })}
                                        desktopSpacing={paginationActiveDotsDesktopBorderRadius}
                                        onChangeDesktopSpacing={(value) => setAttributes({ paginationActiveDotsDesktopBorderRadius: value })}
                                        desktopSpacingStyle={(value) => setAttributes({ paginationActiveDotsDesktopBorderRadiusCssStyle: value })}
                                        tabletSpacing={paginationActiveDotsTabletBorderRadius}
                                        onChangeTabletSpacing={(value) => setAttributes({ paginationActiveDotsTabletBorderRadius: value })}
                                        tabletSpacingStyle={(value) => setAttributes({ paginationActiveDotsTabletBorderRadiusCssStyle: value })}
                                        mobileSpacing={paginationActiveDotsMobileBorderRadius}
                                        onChangeMobileSpacing={(value) => setAttributes({ paginationActiveDotsMobileBorderRadius: value })}
                                        mobileSpacingStyle={(value) => setAttributes({ paginationActiveDotsMobileBorderRadiusCssStyle: value })}
                                        isLinked={paginationActiveDotsBorderRadiusLink}
                                        onChangeLink={(value) => setAttributes({ paginationActiveDotsBorderRadiusLink: value })}
                                    />
                                </>
                            )}
                        </>
                    )}

                    {paginationType === 'fraction' && (
                        <>
                            <ResponsiveTypographyControl
                                fontFamily={paginationFractionFontFamily}
                                onChangeFontFamily={(value) => setAttributes({ paginationFractionFontFamily: value })}

                                fontSize={paginationFractionFontSize}
                                onChangeFontSize={(value) => setAttributes({ paginationFractionFontSize: value })}

                                fontSizeUnits={paginationFractionFontSizeUnits}
                                onChangeFontSizeUnit={(value) => setAttributes({ paginationFractionFontSizeUnits: value })}

                                fontWeight={paginationFractionFontWeight}
                                onChangeFontWeight={(value) => setAttributes({ paginationFractionFontWeight: value })}

                                fontStyle={paginationFractionFontStyle}
                                onChangeFontStyle={(value) => setAttributes({ paginationFractionFontStyle: value })}

                                textTransform={paginationFractionTextTransform}
                                onChangeTextTransform={(value) => setAttributes({ paginationFractionTextTransform: value })}

                                textDecoration={paginationFractionTextDecoration}
                                onChangeTextDecoration={(value) => setAttributes({ paginationFractionTextDecoration: value })}

                                lineHeight={paginationFractionLineHeight}
                                onChangeLineHeight={(value) => setAttributes({ paginationFractionLineHeight: value })}

                                lineHeightUnits={paginationFractionLineHeightUnits}
                                onChangeLineHeightUnit={(value) => setAttributes({ paginationFractionLineHeightUnits: value })}

                                letterSpacing={paginationFractionLetterSpacing}
                                onChangeLetterSpacing={(value) => setAttributes({ paginationFractionLetterSpacing: value })}

                                letterSpacingUnits={paginationFractionLetterSpacingUnits}
                                onChangeLetterSpacingUnit={(value) => setAttributes({ paginationFractionLetterSpacingUnits: value })}

                                wordSpacing={paginationFractionWordSpacing}
                                onChangeWordSpacing={(value) => setAttributes({ paginationFractionWordSpacing: value })}

                                wordSpacingUnits={paginationFractionWordSpacingUnits}
                                onChangeWordSpacingUnit={(value) => setAttributes({ paginationFractionWordSpacingUnits: value })}

                                deviceType={deviceType}
                            />

                            <SwitcherControl
                                label={__("Color", "gslider-blocks")}
                                options={NORMAL_HOVER}
                                value={paginationFractionColorSwitcher}
                                onChange={(value) => setAttributes({ paginationFractionColorSwitcher: value })}
                            />

                            {paginationFractionColorSwitcher === 'normal' && (
                                <ColorControl
                                    label={__("Normal Color", "gslider-blocks")}
                                    color={paginationFractionColor}
                                    onChangeColor={(value) => setAttributes({ paginationFractionColor: value })}
                                    defaultColor=''
                                />
                            )}

                            {paginationFractionColorSwitcher === 'hover' && (
                                <ColorControl
                                    label={__("Hover Color", "gslider-blocks")}
                                    color={paginationFractionColorHover}
                                    onChangeColor={(value) => setAttributes({ paginationFractionColorHover: value })}
                                    defaultColor=''
                                />
                            )}

                        </>
                    )}

                    {paginationType === 'progressbar' && (
                        <>
                            <SwitcherControl
                                label={__("Background Color", "gslider-blocks")}
                                options={NORMAL_ACTIVE}
                                value={paginationProgressbarBGColorSwitcher}
                                onChange={(value) => setAttributes({ paginationProgressbarBGColorSwitcher: value })}
                            />

                            {paginationProgressbarBGColorSwitcher === 'normal' && (
                                <ColorControl
                                    label={__("Normal Color", "gslider-blocks")}
                                    color={paginationProgressbarBGColor}
                                    onChangeColor={(value) => setAttributes({ paginationProgressbarBGColor: value })}
                                    defaultColor=''
                                />
                            )}

                            {paginationProgressbarBGColorSwitcher === 'active' && (
                                <ColorControl
                                    label={__("Active Color", "gslider-blocks")}
                                    color={paginationProgressbarBGActiveColor}
                                    onChangeColor={(value) => setAttributes({ paginationProgressbarBGActiveColor: value })}
                                    defaultColor=''
                                />
                            )}

                            <ResponsiveRangeControl
                                label={__("Height", "gslider-blocks")}
                                rangeValue={paginationProgressbarHeight}
                                onChangeValue={(value) => setAttributes({ paginationProgressbarHeight: value })}
                                onUnitChange={(value) => setAttributes({ paginationProgressbarHeightUnits: value })}
                                deviceType={deviceType}
                                units={paginationProgressbarHeightUnits}
                                resetFallbackValue={{
                                    px: "4",
                                    "%": "",
                                    vh: "",
                                    vw: "",
                                    em: "0.25",
                                    rem: "0.25",
                                }}
                                unitBounds={{
                                    px: { min: 0, max: 200, step: 1 },
                                }}
                            />

                        </>
                    )}

                </PanelBody>
            )}
        </>
    );

    /**
     * Inspector Advanced Controls
     */
    const advancedControls = (
        <>
            <PanelBody
                title={__("Layout", "gslider-blocks")}
                opened={openPanels.advanced === "layout"}
                onToggle={() => togglePanel("advanced", "layout")}
            >
                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalMarginUnits}
                    onChangeUnits={(value) => setAttributes({ globalMarginUnits: value })}
                    desktopSpacing={globalMarginDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalMarginDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalMarginDesktopCssStyle: value })}
                    tabletSpacing={globalMarginTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalMarginTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalMarginTabletCssStyle: value })}
                    mobileSpacing={globalMarginMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalMarginMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalMarginMobileCssStyle: value })}
                    isLinked={globalMarginLink}
                    onChangeLink={(value) => setAttributes({ globalMarginLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ globalPaddingUnits: value })}
                    desktopSpacing={globalPaddingDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalPaddingDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalPaddingDesktopCssStyle: value })}
                    tabletSpacing={globalPaddingTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalPaddingTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalPaddingTabletCssStyle: value })}
                    mobileSpacing={globalPaddingMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalPaddingMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalPaddingMobileCssStyle: value })}
                    isLinked={globalPaddingLink}
                    onChangeLink={(value) => setAttributes({ globalPaddingLink: value })}
                />

                <ResponsiveRangeControl
                    min={-999}
                    max={9999}
                    label={__("Z Index", "gslider-blocks")}
                    rangeValue={globalZIndex}
                    onChangeValue={(value) => setAttributes({ globalZIndex: value })}
                    deviceType={deviceType}
                    step={1}
                    resetFallbackValue={""}
                    isRangeUnit={false}
                />

                <InputControls
                    label={__("CSS ID", "gslider-blocks")}
                    value={globalID}
                    onChangeValue={(value) => setAttributes({ globalID: value })}
                    helpText={__("Add an ID to the block wrapper.", "gslider-blocks")}
                />

                <InputControls
                    label={__("CSS Classes", "gslider-blocks")}
                    value={globalClass}
                    onChangeValue={(value) => setAttributes({ globalClass: value })}
                    helpText={__("Separate with spaces key.", "gslider-blocks")}
                />

            </PanelBody>

            <PanelBody
                title={__("Background", "gslider-blocks")}
                opened={openPanels.advanced === "background"}
                onToggle={() => togglePanel("advanced", "background")}
            >
                <BackgroundControl
                    label={__("Background", "gslider-blocks")}
                    deviceType={deviceType}

                    normalBackgroundType={globalNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ globalNormalBackgroundType: value })}
                    normalClassicColor={globalNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ globalNormalClassicColor: value })}
                    normalGradientColor={globalNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ globalNormalGradientColor: value })}
                    normalCustomGradientSwitcher={globalNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ globalNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={globalNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ globalNormalCustomGradientInputValue: value })}
                    normalBackgroundImageUrl={globalNormalBackgroundImageUrl}
                    setNormalBackgroundImageUrl={(value) => setAttributes({ globalNormalBackgroundImageUrl: value })}
                    normalBackgroundImagePosition={globalNormalBackgroundImagePosition}
                    setNormalBackgroundImagePosition={(value) => setAttributes({ globalNormalBackgroundImagePosition: value })}
                    normalBackgroundImageAttachment={globalNormalBackgroundImageAttachment}
                    setNormalBackgroundImageAttachment={(value) => setAttributes({ globalNormalBackgroundImageAttachment: value })}
                    normalBackgroundImageRepeat={globalNormalBackgroundImageRepeat}
                    setNormalBackgroundImageRepeat={(value) => setAttributes({ globalNormalBackgroundImageRepeat: value })}
                    normalBackgroundImageSize={globalNormalBackgroundImageSize}
                    setNormalBackgroundImageSize={(value) => setAttributes({ globalNormalBackgroundImageSize: value })}

                    hoverBackgroundType={globalHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ globalHoverBackgroundType: value })}
                    hoverClassicColor={globalHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ globalHoverClassicColor: value })}
                    hoverGradientColor={globalHoverGradientColor}
                    setHoverGradientColor={(value) => setAttributes({ globalHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={globalHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ globalHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={globalHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ globalHoverCustomGradientInputValue: value })}
                    hoverBackgroundImageUrl={globalHoverBackgroundImageUrl}
                    setHoverBackgroundImageUrl={(value) => setAttributes({ globalHoverBackgroundImageUrl: value })}
                    hoverBackgroundImagePosition={globalHoverBackgroundImagePosition}
                    setHoverBackgroundImagePosition={(value) => setAttributes({ globalHoverBackgroundImagePosition: value })}
                    hoverBackgroundImageAttachment={globalHoverBackgroundImageAttachment}
                    setHoverBackgroundImageAttachment={(value) => setAttributes({ globalHoverBackgroundImageAttachment: value })}
                    hoverBackgroundImageRepeat={globalHoverBackgroundImageRepeat}
                    setHoverBackgroundImageRepeat={(value) => setAttributes({ globalHoverBackgroundImageRepeat: value })}
                    hoverBackgroundImageSize={globalHoverBackgroundImageSize}
                    setHoverBackgroundImageSize={(value) => setAttributes({ globalHoverBackgroundImageSize: value })}
                    setAttributes={setAttributes}

                />
            </PanelBody>

            <PanelBody
                title={__("Border and Shadow", "gslider-blocks")}
                opened={openPanels.advanced === "border-shadow"}
                onToggle={() => togglePanel("advanced", "border-shadow")}
            >
                <SelectControls
                    label={__("Border Style", "gslider-blocks")}
                    options={BORDER_STYLES}
                    value={globalBorder}
                    onChange={(value) => setAttributes({ globalBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={globalBorderColorSwitcher}
                    onChange={(value) => setAttributes({ globalBorderColorSwitcher: value })}
                />

                {globalBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={globalBorderColor}
                        onChangeColor={(value) => setAttributes({ globalBorderColor: value })}
                    />
                )}

                {globalBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={globalBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ globalBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalBorderUnits}
                    onChangeUnits={(value) => setAttributes({ globalBorderUnits: value })}
                    desktopSpacing={globalBorderDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalBorderDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalBorderDesktopCssStyle: value })}
                    tabletSpacing={globalBorderTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalBorderTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalBorderTabletCssStyle: value })}
                    mobileSpacing={globalBorderMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalBorderMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalBorderMobileCssStyle: value })}
                    isLinked={globalBorderLink}
                    onChangeLink={(value) => setAttributes({ globalBorderLink: value })}
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={globalBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ globalBorderRadiusUnits: value })}
                    desktopSpacing={globalBorderRadiusDesktop}
                    onChangeDesktopSpacing={(value) => setAttributes({ globalBorderRadiusDesktop: value })}
                    desktopSpacingStyle={(value) => setAttributes({ globalBorderRadiusDesktopCssStyle: value })}
                    tabletSpacing={globalBorderRadiusTablet}
                    onChangeTabletSpacing={(value) => setAttributes({ globalBorderRadiusTablet: value })}
                    tabletSpacingStyle={(value) => setAttributes({ globalBorderRadiusTabletCssStyle: value })}
                    mobileSpacing={globalBorderRadiusMobile}
                    onChangeMobileSpacing={(value) => setAttributes({ globalBorderRadiusMobile: value })}
                    mobileSpacingStyle={(value) => setAttributes({ globalBorderRadiusMobileCssStyle: value })}
                    isLinked={globalBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ globalBorderRadiusLink: value })}
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    options={NORMAL_HOVER}
                    value={globalBoxShadowValuesSwitcher}
                    onChange={(value) => setAttributes({ globalBoxShadowValuesSwitcher: value })}
                />

                {globalBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ globalBoxShadowValues: value })}
                        initialShadowValue={globalBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ globalBoxShadowCssValue: value })}
                    />
                )}

                {globalBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ globalBoxShadowHoverValues: value })}
                        initialShadowValue={globalBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ globalBoxShadowHoverCssValue: value })}
                    />
                )}
            </PanelBody>

            <PanelBody
                title={__("Custom CSS", "gslider-blocks")}
                opened={openPanels.advanced === "custom-css"}
                onToggle={() => togglePanel("advanced", "custom-css")}
            >
                <CustomCSSEditor
                    value={globalCustomCSS}
                    onChangeValue={(value) => setAttributes({ globalCustomCSS: value })}
                />
            </PanelBody>
        </>
    );

    /**
     * Get global background normal styles
     */
    const getGlobalBackgroundNormalStyles = (device) => {
        const bgType = globalNormalBackgroundType;
        const bgColor = globalNormalClassicColor;
        const bgGradient = globalNormalGradientColor;
        const customGradient = globalNormalCustomGradientInputValue;
        const customGradientEnabled = globalNormalCustomGradientSwitcher;

        const bgImageUrl = globalNormalBackgroundImageUrl?.[device];
        const bgImagePosition = globalNormalBackgroundImagePosition?.[device];
        const bgAttachment = globalNormalBackgroundImageAttachment?.[device];
        const bgRepeat = globalNormalBackgroundImageRepeat?.[device];
        const bgSize = globalNormalBackgroundImageSize?.[device];

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        let styles = bgColor ? { background: bgColor } : {};

        if (bgType !== 'gradient' && bgImageUrl) {
            styles = {
                ...styles,
                'background-image': `url(${bgImageUrl})`,
                'background-position': bgImagePosition
                    ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%`
                    : "50% 50%",
                'background-attachment': bgAttachment || undefined,
                'background-repeat': bgRepeat || undefined,
                'background-size': bgSize || undefined,
            };
        }

        return styles;
    };

    /**
     * Get global background hover styles
     */
    const getGlobalBackgroundHoverStyles = (device) => {
        const bgType = globalHoverBackgroundType;
        const bgColor = globalHoverClassicColor;
        const bgGradient = globalHoverGradientColor;
        const customGradient = globalHoverCustomGradientInputValue;
        const customGradientEnabled = globalHoverCustomGradientSwitcher;

        const bgImageUrl = globalHoverBackgroundImageUrl?.[device];
        const bgImagePosition = globalHoverBackgroundImagePosition?.[device];
        const bgAttachment = globalHoverBackgroundImageAttachment?.[device];
        const bgRepeat = globalHoverBackgroundImageRepeat?.[device];
        const bgSize = globalHoverBackgroundImageSize?.[device];

        if (bgType === 'gradient') {
            if (customGradientEnabled && customGradient) {
                return { background: customGradient };
            } else if (bgGradient) {
                return { background: bgGradient };
            } else if (bgColor) {
                return { background: bgColor };
            }
            return {};
        }

        let styles = bgColor ? { background: bgColor } : {};

        if (bgType !== 'gradient' && bgImageUrl) {
            styles = {
                ...styles,
                'background-image': `url(${bgImageUrl})`,
                'background-position': bgImagePosition
                    ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%`
                    : "50% 50%",
                'background-attachment': bgAttachment || undefined,
                'background-repeat': bgRepeat || undefined,
                'background-size': bgSize || undefined,
            };
        }

        return styles;
    };

    /**
     * Convert object to string
     */
    const globalBackgroundStyleObjectToString = (styleObj) =>
        Object.entries(styleObj)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');

    /**
     * Get global background styles
     */
    const globalDesktopBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Desktop'));
    const globalTabletBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Tablet'));
    const globalMobileBackgroundNormalStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundNormalStyles('Mobile'));

    const globalDesktopBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Desktop'));
    const globalTabletBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Tablet'));
    const globalMobileBackgroundHoverStyles = globalBackgroundStyleObjectToString(getGlobalBackgroundHoverStyles('Mobile'));

    /** Start Block Style */
    const allBlockStyle = useMemo(() => `

        .${blockId}.gslider-image-slider-wrapper {
            ${globalDesktopBackgroundNormalStyles}
            ${globalMarginDesktopCssStyle ? `margin: ${globalMarginDesktopCssStyle};` : ''} 
            ${globalPaddingDesktopCssStyle ? `padding: ${globalPaddingDesktopCssStyle};` : ''}
            ${globalBorder ? `border: ${globalBorder};` : ''}
			${globalBorderDesktopCssStyle ? `border-width: ${globalBorderDesktopCssStyle};` : ''}  
			${globalBorderRadiusDesktopCssStyle ? `border-radius: ${globalBorderRadiusDesktopCssStyle} !important;` : ''}
            ${globalBorderColor ? `border-color: ${globalBorderColor};` : ''}
            ${globalBoxShadowCssValue ? `box-shadow: ${globalBoxShadowCssValue} !important;` : ''}
            ${globalZIndex.Desktop ? `z-index: ${globalZIndex.Desktop};` : ''}
            box-sizing: border-box;
            position: relative;
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-image-slider-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ''}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ''}
        }

        .${blockId} .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
            ${layoutHeight.Desktop ? `height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : 'auto'}
            ${imagePaddingDesktopCssStyle ? `padding: ${imagePaddingDesktopCssStyle};` : ''}
            ${imageBorder ? `border: ${imageBorder};` : ''}
			${imageBorderDesktopCssStyle ? `border-width: ${imageBorderDesktopCssStyle};` : ''}  
			${imageBorderRadiusDesktopCssStyle ? `border-radius: ${imageBorderRadiusDesktopCssStyle} !important;` : ''}
            ${imageBorderColor ? `border-color: ${imageBorderColor};` : ''}
            ${imageBoxShadowCssValue ? `box-shadow: ${imageBoxShadowCssValue} !important;` : ''}
            display: flex;
            align-items: center;
            justify-content: ${verticalAlign.Desktop || 'center'};
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper:hover {
            ${imageBorderHoverColor ? `border-color: ${imageBorderHoverColor};` : ''}
            ${imageBoxShadowHoverCssValue ? `box-shadow: ${imageBoxShadowHoverCssValue} !important;` : ''}
        }
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
            ${imageMaxWidth.Desktop ? `max-width: ${imageMaxWidth.Desktop}${imageMaxWidthUnits.Desktop};` : ''}
            display: block;
            height: auto;
            margin: 0 auto;
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
            display: block;
            transition: all ${imageLinkTransitionDuration?.Desktop || 300}ms ease;
            --hover-opacity: ${imageLinkHoverOpacity?.Desktop || 0.8};
            --hover-scale: ${imageLinkHoverScale?.Desktop || 1.05};
            --hover-lift: ${imageLinkHoverLift?.Desktop || 10}${imageLinkHoverLiftUnits?.Desktop || 'px'};
            --transition-duration: ${imageLinkTransitionDuration?.Desktop || 300}ms;
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {           
        
            ${imageCaptionFontFamily ? `font-family: ${imageCaptionFontFamily};` : ''} 
            ${imageCaptionFontSize.Desktop && imageCaptionFontSizeUnits.Desktop ? `font-size: ${imageCaptionFontSize.Desktop}${imageCaptionFontSizeUnits.Desktop};` : ''}
            ${imageCaptionFontWeight ? `font-weight: ${imageCaptionFontWeight};` : ''}
            ${imageCaptionFontStyle ? `font-style: ${imageCaptionFontStyle};` : ''}
            ${imageCaptionTextTransform ? `text-transform: ${imageCaptionTextTransform};` : ''}
            ${imageCaptionTextDecoration ? `text-decoration: ${imageCaptionTextDecoration};` : ''}
            ${imageCaptionLineHeight.Desktop && imageCaptionLineHeightUnits.Desktop ? `line-height: ${imageCaptionLineHeight.Desktop}${imageCaptionLineHeightUnits.Desktop};` : ''}
            ${imageCaptionLetterSpacing.Desktop && imageCaptionLetterSpacingUnits.Desktop ? `letter-spacing: ${imageCaptionLetterSpacing.Desktop}${imageCaptionLetterSpacingUnits.Desktop};` : ''}
            ${imageCaptionWordSpacing.Desktop && imageCaptionWordSpacingUnits.Desktop ? `word-spacing: ${imageCaptionWordSpacing.Desktop}${imageCaptionWordSpacingUnits.Desktop};` : ''}

            ${imageCaptionColor ? `color: ${imageCaptionColor};` : ''}
            ${imageCaptionNormalBackgroundType === 'gradient' ? `  
                background: ${imageCaptionNormalCustomGradientSwitcher && imageCaptionNormalCustomGradientInputValue ? imageCaptionNormalCustomGradientInputValue : imageCaptionNormalGradientColor ? imageCaptionNormalGradientColor : imageCaptionNormalClassicColor};
            ` : `
                ${imageCaptionNormalClassicColor ? `background: ${imageCaptionNormalClassicColor};` : ''}
            `}
            ${imageCaptionPaddingDesktopCssStyle ? `padding: ${imageCaptionPaddingDesktopCssStyle};` : ''}
            ${imageCaptionBorder ? `border: ${imageCaptionBorder};` : ''}
			${imageCaptionBorderDesktopCssStyle ? `border-width: ${imageCaptionBorderDesktopCssStyle};` : ''}  
			${imageCaptionBorderRadiusDesktopCssStyle ? `border-radius: ${imageCaptionBorderRadiusDesktopCssStyle} !important;` : ''}
            ${imageCaptionBorderColor ? `border-color: ${imageCaptionBorderColor};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption:hover {
            ${imageCaptionColorHover ? `color: ${imageCaptionColorHover};` : ''}
            ${imageCaptionHoverBackgroundType === 'gradient' ? `  
                background: ${imageCaptionHoverCustomGradientSwitcher && imageCaptionHoverCustomGradientInputValue ? imageCaptionHoverCustomGradientInputValue : imageCaptionHoverGradientColor ? imageCaptionHoverGradientColor : imageCaptionHoverClassicColor};
            ` : `
                ${imageCaptionHoverClassicColor ? `background: ${imageCaptionHoverClassicColor};` : ''}
            `}
            ${imageCaptionBorderHoverColor ? `border-color: ${imageCaptionBorderHoverColor};` : ''}
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {           
            ${imageTooltipFontFamily ? `font-family: ${imageTooltipFontFamily};` : ''} 
            ${imageTooltipFontSize.Desktop && imageTooltipFontSizeUnits.Desktop ? `font-size: ${imageTooltipFontSize.Desktop}${imageTooltipFontSizeUnits.Desktop};` : ''}
            ${imageTooltipFontWeight ? `font-weight: ${imageTooltipFontWeight};` : ''}
            ${imageTooltipFontStyle ? `font-style: ${imageTooltipFontStyle};` : ''}
            ${imageTooltipTextTransform ? `text-transform: ${imageTooltipTextTransform};` : ''}
            ${imageTooltipTextDecoration ? `text-decoration: ${imageTooltipTextDecoration};` : ''}
            ${imageTooltipLineHeight.Desktop && imageTooltipLineHeightUnits.Desktop ? `line-height: ${imageTooltipLineHeight.Desktop}${imageTooltipLineHeightUnits.Desktop};` : ''}
            ${imageTooltipLetterSpacing.Desktop && imageTooltipLetterSpacingUnits.Desktop ? `letter-spacing: ${imageTooltipLetterSpacing.Desktop}${imageTooltipLetterSpacingUnits.Desktop};` : ''}
            ${imageTooltipWordSpacing.Desktop && imageTooltipWordSpacingUnits.Desktop ? `word-spacing: ${imageTooltipWordSpacing.Desktop}${imageTooltipWordSpacingUnits.Desktop};` : ''}

            ${imageTooltipColor ? `color: ${imageTooltipColor};` : ''}
            ${imageTooltipBgColor ? `background-color: ${imageTooltipBgColor};` : ''}
            ${imageTooltipPaddingDesktopCssStyle ? `padding: ${imageTooltipPaddingDesktopCssStyle};` : ''}
            ${imageTooltipBorder ? `border: ${imageTooltipBorder};` : ''}
			${imageTooltipBorderDesktopCssStyle ? `border-width: ${imageTooltipBorderDesktopCssStyle};` : ''}  
			${imageTooltipBorderRadiusDesktopCssStyle ? `border-radius: ${imageTooltipBorderRadiusDesktopCssStyle} !important;` : ''}
            ${imageTooltipBorderColor ? `border-color: ${imageTooltipBorderColor};` : ''}
            ${imageTooltipTopPosition.Desktop && imageTooltipTopPositionUnits.Desktop ? `top: ${imageTooltipTopPosition.Desktop}${imageTooltipTopPositionUnits.Desktop};` : ''}
            ${imageTooltipLeftPosition.Desktop && imageTooltipLeftPositionUnits.Desktop ? `left: ${imageTooltipLeftPosition.Desktop}${imageTooltipLeftPositionUnits.Desktop};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId}.gslider-image-slider-wrapper.outside {
            ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                padding: ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop} 0 0;
            ` : ''}
    
            ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                padding: 0 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};
            ` : ''}

            ${navigationArrowPosition === 'center' ? `
                padding: 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};

            ` : ''}
        }

        ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${navigationArrowDirection};
                gap: ${navigationArrowGap.Desktop ? `${navigationArrowGap.Desktop}${navigationArrowGapUnits.Desktop}` : '10px'};
                position: absolute;
                z-index: 100;
        
                ${navigationArrowPosition === 'top-left' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'top-center' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '50%'};
                    transform: translateX(-50%);
                ` : ''}
        
                ${navigationArrowPosition === 'top-right' ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : '0'};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '0'};
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-center' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : '50%'};
                    transform: translateX(-50%);
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-right' ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : '0'};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : '0'};
                ` : ''}
            }
        
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next {
                position: relative;
                top: auto;
                right: auto;
                bottom: auto;
                left: auto;
                margin: 0 !important;
            }
        ` : ''}

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:after,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:after {
            display: none !important;
        }
        
        .${blockId} .swiper-button-prev,
        .${blockId} .swiper-button-next {
            ${navigationArrowColor ? `color: ${navigationArrowColor};` : ''}
            ${navigationArrowNormalBackgroundType === 'gradient' ? `  
                background: ${navigationArrowNormalCustomGradientSwitcher && navigationArrowNormalCustomGradientInputValue ? navigationArrowNormalCustomGradientInputValue : navigationArrowNormalGradientColor ? navigationArrowNormalGradientColor : navigationArrowNormalClassicColor};
            ` : `
                ${navigationArrowNormalClassicColor ? `background: ${navigationArrowNormalClassicColor};` : ''}
            `}
            ${navigationArrowBorder ? `border: ${navigationArrowBorder};` : ''}
			${navigationArrowDesktopBorderCssStyle ? `border-width: ${navigationArrowDesktopBorderCssStyle};` : ''}  
			${navigationArrowDesktopBorderRadiusCssStyle ? `border-radius: ${navigationArrowDesktopBorderRadiusCssStyle};` : ''}
            ${navigationArrowBorderColor ? `border-color: ${navigationArrowBorderColor};` : ''}
            ${navigationArrowBoxShadowCssValue ? `box-shadow: ${navigationArrowBoxShadowCssValue};` : ''}
            ${navigationArrowWidth.Desktop ? `width: ${navigationArrowWidth.Desktop}${navigationArrowWidthUnits.Desktop};` : ''}
            ${navigationArrowHeight.Desktop ? `height: ${navigationArrowHeight.Desktop}${navigationArrowHeightUnits.Desktop};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId} .swiper-button-prev:hover,
        .${blockId} .swiper-button-next:hover {
            ${navigationArrowColorHover ? `color: ${navigationArrowColorHover};` : ''}
            ${navigationArrowHoverBackgroundType === 'gradient' ? `
                background: ${navigationArrowHoverCustomGradientSwitcher && navigationArrowHoverCustomGradientInputValue ? navigationArrowHoverCustomGradientInputValue : navigationArrowHoverGradientColor ? navigationArrowHoverGradientColor : navigationArrowHoverClassicColor};
            ` : `
                ${navigationArrowHoverClassicColor ? `background: ${navigationArrowHoverClassicColor};` : ''}
            `}
            ${navigationArrowBorderHoverColor ? `border-color: ${navigationArrowBorderHoverColor};` : ''}
            ${navigationArrowBoxShadowHoverCssValue ? `box-shadow: ${navigationArrowBoxShadowHoverCssValue};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${navigationArrowColor ? `fill: ${navigationArrowColor};` : ''}
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
            ${navigationArrowColorHover ? `fill: ${navigationArrowColorHover};` : ''}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${navigationArrowSize.Desktop ? `font-size: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination {
            ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Desktop ? `top: ${paginationProgressbarPosition.Desktop}${paginationProgressbarPositionUnits.Desktop} !important;` : ''
        ) : (
            paginationDotsPosition.Desktop ? `bottom: ${paginationDotsPosition.Desktop}${paginationDotsPositionUnits.Desktop} !important;` : ''
        )}
            ${paginationDotsDesktopMarginCssStyle ? `margin: ${paginationDotsDesktopMarginCssStyle};` : ''}
        }

        .${blockId} .swiper-pagination-bullet {
            ${paginationNormalDotsBgColor ? `background-color: ${paginationNormalDotsBgColor};` : ''}
            ${paginationNormalDotsBorder ? `border: ${paginationNormalDotsBorder};` : ''}
			${paginationNormalDotsDesktopBorderCssStyle ? `border-width: ${paginationNormalDotsDesktopBorderCssStyle};` : ''}   
			${paginationNormalDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsDesktopBorderRadiusCssStyle};` : ''}
            ${paginationNormalDotsBorderColor ? `border-color: ${paginationNormalDotsBorderColor};` : ''}
            ${paginationNormalDotsWidth.Desktop ? `width: ${paginationNormalDotsWidth.Desktop}${paginationNormalDotsWidthUnits.Desktop};` : ''}
            ${paginationNormalDotsHeight.Desktop ? `height: ${paginationNormalDotsHeight.Desktop}${paginationNormalDotsHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-bullet-active {
            ${paginationActiveDotsBgColor ? `background-color: ${paginationActiveDotsBgColor};` : ''}
            ${paginationActiveDotsBorder ? `border: ${paginationActiveDotsBorder};` : ''}
			${paginationActiveDotsDesktopBorderCssStyle ? `border-width: ${paginationActiveDotsDesktopBorderCssStyle};` : ''}   
			${paginationActiveDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsDesktopBorderRadiusCssStyle};` : ''}
            ${paginationActiveDotsBorderColor ? `border-color: ${paginationActiveDotsBorderColor};` : ''}
            ${paginationActiveDotsWidth.Desktop ? `width: ${paginationActiveDotsWidth.Desktop}${paginationActiveDotsWidthUnits.Desktop};` : ''}
            ${paginationActiveDotsHeight.Desktop ? `height: ${paginationActiveDotsHeight.Desktop}${paginationActiveDotsHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-fraction { 
            ${paginationFractionFontFamily ? `font-family: ${paginationFractionFontFamily};` : ''}
            ${paginationFractionFontSize.Desktop && paginationFractionFontSizeUnits.Desktop ? `font-size: ${paginationFractionFontSize.Desktop}${paginationFractionFontSizeUnits.Desktop};` : ''}
            ${paginationFractionFontWeight ? `font-weight: ${paginationFractionFontWeight};` : ''}
            ${paginationFractionFontStyle ? `font-style: ${paginationFractionFontStyle};` : ''}
            ${paginationFractionTextTransform ? `text-transform: ${paginationFractionTextTransform};` : ''}
            ${paginationFractionTextDecoration ? `text-decoration: ${paginationFractionTextDecoration};` : ''}
            ${paginationFractionLineHeight.Desktop && paginationFractionLineHeightUnits.Desktop ? `line-height: ${paginationFractionLineHeight.Desktop}${paginationFractionLineHeightUnits.Desktop};` : ''}
            ${paginationFractionLetterSpacing.Desktop && paginationFractionLetterSpacingUnits.Desktop ? `letter-spacing: ${paginationFractionLetterSpacing.Desktop}${paginationFractionLetterSpacingUnits.Desktop};` : ''}
            ${paginationFractionWordSpacing.Desktop && paginationFractionWordSpacingUnits.Desktop ? `word-spacing: ${paginationFractionWordSpacing.Desktop}${paginationFractionWordSpacingUnits.Desktop};` : ''}
            ${paginationFractionColor ? `color: ${paginationFractionColor};` : ''}
            transition: all .3s ease-in-out;
        }

        .${blockId} .swiper-pagination-fraction:hover {
            ${paginationFractionColorHover ? `color: ${paginationFractionColorHover};` : ''}
        }

        .${blockId} .swiper-pagination-progressbar {
            ${paginationProgressbarBGColor ? `background-color: ${paginationProgressbarBGColor};` : ''}
            ${paginationProgressbarHeight.Desktop ? `height: ${paginationProgressbarHeight.Desktop}${paginationProgressbarHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
            ${paginationProgressbarBGActiveColor ? `background-color: ${paginationProgressbarBGActiveColor};` : ''}
        }

        ${paginationPositionType === 'outside' ? `   
            .${blockId}.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-fraction {
                bottom: -30px !important;
            }
        ` : ''}

        .${blockId}.gslider-image-slider-wrapper.has-pagination {
            margin-bottom: 30px;
        }


        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-image-slider-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ''} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ''}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ''}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ''}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ''}
            }
            .${blockId}.gslider-image-slider-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${layoutHeight.Tablet ? `height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : 'auto'}
                ${imagePaddingTabletCssStyle ? `padding: ${imagePaddingTabletCssStyle};` : ''}
			    ${imageBorderTabletCssStyle ? `border-width: ${imageBorderTabletCssStyle};` : ''}  
                ${imageBorderRadiusTabletCssStyle ? `border-radius: ${imageBorderRadiusTabletCssStyle};` : ''}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Tablet || 'center'};
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${imageMaxWidth.Tablet ? `max-width: ${imageMaxWidth.Tablet}${imageMaxWidthUnits.Tablet};` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: all ${imageLinkTransitionDuration?.Tablet || 300}ms ease;
                --hover-opacity: ${imageLinkHoverOpacity?.Tablet || 0.8};
                --hover-scale: ${imageLinkHoverScale?.Tablet || 1.05};
                --hover-lift: ${imageLinkHoverLift?.Tablet || 10}${imageLinkHoverLiftUnits?.Tablet || 'px'};
                --transition-duration: ${imageLinkTransitionDuration?.Tablet || 300}ms;
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${imageCaptionFontSize.Tablet && imageCaptionFontSizeUnits.Tablet ? `font-size: ${imageCaptionFontSize.Tablet}${imageCaptionFontSizeUnits.Tablet};` : ''}
                ${imageCaptionLineHeight.Tablet && imageCaptionLineHeightUnits.Tablet ? `line-height: ${imageCaptionLineHeight.Tablet}${imageCaptionLineHeightUnits.Tablet};` : ''}
                ${imageCaptionLetterSpacing.Tablet && imageCaptionLetterSpacingUnits.Tablet ? `letter-spacing: ${imageCaptionLetterSpacing.Tablet}${imageCaptionLetterSpacingUnits.Tablet};` : ''}
                ${imageCaptionWordSpacing.Tablet && imageCaptionWordSpacingUnits.Tablet ? `word-spacing: ${imageCaptionWordSpacing.Tablet}${imageCaptionWordSpacingUnits.Tablet};` : ''}
                ${imageCaptionPaddingTabletCssStyle ? `padding: ${imageCaptionPaddingTabletCssStyle};` : ''}
                ${imageCaptionBorderTabletCssStyle ? `border-width: ${imageCaptionBorderTabletCssStyle};` : ''}  
                ${imageCaptionBorderRadiusTabletCssStyle ? `border-radius: ${imageCaptionBorderRadiusTabletCssStyle} !important;` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${imageTooltipFontSize.Tablet && imageTooltipFontSizeUnits.Tablet ? `font-size: ${imageTooltipFontSize.Tablet}${imageTooltipFontSizeUnits.Tablet};` : ''}
                ${imageTooltipLineHeight.Tablet && imageTooltipLineHeightUnits.Tablet ? `line-height: ${imageTooltipLineHeight.Tablet}${imageTooltipLineHeightUnits.Tablet};` : ''}
                ${imageTooltipLetterSpacing.Tablet && imageTooltipLetterSpacingUnits.Tablet ? `letter-spacing: ${imageTooltipLetterSpacing.Tablet}${imageTooltipLetterSpacingUnits.Tablet};` : ''}
                ${imageTooltipWordSpacing.Tablet && imageTooltipWordSpacingUnits.Tablet ? `word-spacing: ${imageTooltipWordSpacing.Tablet}${imageTooltipWordSpacingUnits.Tablet};` : ''}
                ${imageTooltipPaddingTabletCssStyle ? `padding: ${imageTooltipPaddingTabletCssStyle};` : ''}
                ${imageTooltipBorderTabletCssStyle ? `border-width: ${imageTooltipBorderTabletCssStyle};` : ''}  
                ${imageTooltipBorderRadiusTabletCssStyle ? `border-radius: ${imageTooltipBorderRadiusTabletCssStyle} !important;` : ''}
                ${imageTooltipTopPosition.Tablet && imageTooltipTopPositionUnits.Tablet ? `top: ${imageTooltipTopPosition.Tablet}${imageTooltipTopPositionUnits.Tablet};` : ''}
                ${imageTooltipLeftPosition.Tablet && imageTooltipLeftPositionUnits.Tablet ? `left: ${imageTooltipLeftPosition.Tablet}${imageTooltipLeftPositionUnits.Tablet};` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper.outside {
                ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                    padding: ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet} 0 0;
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};
                ` : ''}
        
                ${navigationArrowPosition === 'center' ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};

                ` : ''}
            }

            ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} { 
                    gap: ${navigationArrowGap.Tablet ? `${navigationArrowGap.Tablet}${navigationArrowGapUnits.Tablet}` : '10px'};
                    ${navigationArrowPosition === 'top-left' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-center' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-right' ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-left' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-center' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-right' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : '0'};
                    ` : ''}
                }
                    
            ` : ''}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowTabletBorderCssStyle ? `border-width: ${navigationArrowTabletBorderCssStyle};` : ''}  
                ${navigationArrowTabletBorderRadiusCssStyle ? `border-radius: ${navigationArrowTabletBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Tablet ? `width: ${navigationArrowWidth.Tablet}${navigationArrowWidthUnits.Tablet};` : ''}
                ${navigationArrowHeight.Tablet ? `height: ${navigationArrowHeight.Tablet}${navigationArrowHeightUnits.Tablet};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Tablet ? `font-size: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Tablet ? `top: ${paginationProgressbarPosition.Tablet}${paginationProgressbarPositionUnits.Tablet} !important;` : ''
        ) : (
            paginationDotsPosition.Tablet ? `bottom: ${paginationDotsPosition.Tablet}${paginationDotsPositionUnits.Tablet} !important;` : ''
        )}
                ${paginationDotsTabletMarginCssStyle ? `margin: ${paginationDotsTabletMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsTabletBorderCssStyle ? `border-width: ${paginationNormalDotsTabletBorderCssStyle};` : ''}   
                ${paginationNormalDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsTabletBorderRadiusCssStyle};` : ''}
                ${paginationNormalDotsWidth.Tablet ? `width: ${paginationNormalDotsWidth.Tablet}${paginationNormalDotsWidthUnits.Tablet};` : ''}
                ${paginationNormalDotsHeight.Tablet ? `height: ${paginationNormalDotsHeight.Tablet}${paginationNormalDotsHeightUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsTabletBorderCssStyle ? `border-width: ${paginationActiveDotsTabletBorderCssStyle};` : ''}   
                ${paginationActiveDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsTabletBorderRadiusCssStyle};` : ''}
                ${paginationActiveDotsWidth.Tablet ? `width: ${paginationActiveDotsWidth.Tablet}${paginationActiveDotsWidthUnits.Tablet};` : ''}
                ${paginationActiveDotsHeight.Tablet ? `height: ${paginationActiveDotsHeight.Tablet}${paginationActiveDotsHeightUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Tablet && paginationFractionFontSizeUnits.Tablet ? `font-size: ${paginationFractionFontSize.Tablet}${paginationFractionFontSizeUnits.Tablet};` : ''}
                ${paginationFractionLineHeight.Tablet && paginationFractionLineHeightUnits.Tablet ? `line-height: ${paginationFractionLineHeight.Tablet}${paginationFractionLineHeightUnits.Tablet};` : ''}
                ${paginationFractionLetterSpacing.Tablet && paginationFractionLetterSpacingUnits.Tablet ? `letter-spacing: ${paginationFractionLetterSpacing.Tablet}${paginationFractionLetterSpacingUnits.Tablet};` : ''}
                ${paginationFractionWordSpacing.Tablet && paginationFractionWordSpacingUnits.Tablet ? `word-spacing: ${paginationFractionWordSpacing.Tablet}${paginationFractionWordSpacingUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Tablet ? `height: ${paginationProgressbarHeight.Tablet}${paginationProgressbarHeightUnits.Tablet};` : ''}
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-image-slider-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ''} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ''}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ''}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ''}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ''}
            }
            .${blockId}.gslider-image-slider-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${layoutHeight.Mobile ? `height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : 'auto'}
                ${imagePaddingMobileCssStyle ? `padding: ${imagePaddingMobileCssStyle};` : ''}
                ${imageBorderMobileCssStyle ? `border-width: ${imageBorderMobileCssStyle};` : ''}  
                ${imageBorderRadiusMobileCssStyle ? `border-radius: ${imageBorderRadiusMobileCssStyle};` : ''}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Mobile || 'center'};
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${imageMaxWidth.Mobile ? `max-width: ${imageMaxWidth.Mobile}${imageMaxWidthUnits.Mobile};` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: all ${imageLinkTransitionDuration?.Mobile || 300}ms ease;
                --hover-opacity: ${imageLinkHoverOpacity?.Mobile || 0.8};
                --hover-scale: ${imageLinkHoverScale?.Mobile || 1.05};
                --hover-lift: ${imageLinkHoverLift?.Mobile || 10}${imageLinkHoverLiftUnits?.Mobile || 'px'};
                --transition-duration: ${imageLinkTransitionDuration?.Mobile || 300}ms;
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${imageCaptionFontSize.Mobile && imageCaptionFontSizeUnits.Mobile ? `font-size: ${imageCaptionFontSize.Mobile}${imageCaptionFontSizeUnits.Mobile};` : ''}
                ${imageCaptionLineHeight.Mobile && imageCaptionLineHeightUnits.Mobile ? `line-height: ${imageCaptionLineHeight.Mobile}${imageCaptionLineHeightUnits.Mobile};` : ''}
                ${imageCaptionLetterSpacing.Mobile && imageCaptionLetterSpacingUnits.Mobile ? `letter-spacing: ${imageCaptionLetterSpacing.Mobile}${imageCaptionLetterSpacingUnits.Mobile};` : ''}
                ${imageCaptionWordSpacing.Mobile && imageCaptionWordSpacingUnits.Mobile ? `word-spacing: ${imageCaptionWordSpacing.Mobile}${imageCaptionWordSpacingUnits.Mobile};` : ''}
                ${imageCaptionPaddingMobileCssStyle ? `padding: ${imageCaptionPaddingMobileCssStyle};` : ''}
                ${imageCaptionBorderMobileCssStyle ? `border-width: ${imageCaptionBorderMobileCssStyle};` : ''}  
                ${imageCaptionBorderRadiusMobileCssStyle ? `border-radius: ${imageCaptionBorderRadiusMobileCssStyle} !important;` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${imageTooltipFontSize.Mobile && imageTooltipFontSizeUnits.Mobile ? `font-size: ${imageTooltipFontSize.Mobile}${imageTooltipFontSizeUnits.Mobile};` : ''}
                ${imageTooltipLineHeight.Mobile && imageTooltipLineHeightUnits.Mobile ? `line-height: ${imageTooltipLineHeight.Mobile}${imageTooltipLineHeightUnits.Mobile};` : ''}
                ${imageTooltipLetterSpacing.Mobile && imageTooltipLetterSpacingUnits.Mobile ? `letter-spacing: ${imageTooltipLetterSpacing.Mobile}${imageTooltipLetterSpacingUnits.Mobile};` : ''}
                ${imageTooltipWordSpacing.Mobile && imageTooltipWordSpacingUnits.Mobile ? `word-spacing: ${imageTooltipWordSpacing.Mobile}${imageTooltipWordSpacingUnits.Mobile};` : ''}
                ${imageTooltipPaddingMobileCssStyle ? `padding: ${imageTooltipPaddingMobileCssStyle};` : ''}
                ${imageTooltipBorderMobileCssStyle ? `border-width: ${imageTooltipBorderMobileCssStyle};` : ''}  
                ${imageTooltipBorderRadiusMobileCssStyle ? `border-radius: ${imageTooltipBorderRadiusMobileCssStyle} !important;` : ''}
                ${imageTooltipTopPosition.Mobile && imageTooltipTopPositionUnits.Mobile ? `top: ${imageTooltipTopPosition.Mobile}${imageTooltipTopPositionUnits.Mobile};` : ''}
                ${imageTooltipLeftPosition.Mobile && imageTooltipLeftPositionUnits.Mobile ? `left: ${imageTooltipLeftPosition.Mobile}${imageTooltipLeftPositionUnits.Mobile};` : ''}
            }

            .${blockId}.gslider-image-slider-wrapper.outside {
                ${navigationArrowPosition === 'top-left' || navigationArrowPosition === 'top-center' || navigationArrowPosition === 'top-right' ? `
                    padding: ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile} 0 0;
                ` : ''}
        
                ${navigationArrowPosition === 'bottom-left' || navigationArrowPosition === 'bottom-center' || navigationArrowPosition === 'bottom-right' ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};
                ` : ''}
        
                ${navigationArrowPosition === 'center' ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};

                ` : ''}
            }

            ${navigationArrowPosition && navigationArrowPosition !== 'center' ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition}
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                    gap: ${navigationArrowGap.Mobile ? `${navigationArrowGap.Mobile}${navigationArrowGapUnits.Mobile}` : '10px'};
                    ${navigationArrowPosition === 'top-left' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-center' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'top-right' ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-left' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '0'};
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-center' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : '50%'};
                        transform: translateX(-50%);
                    ` : ''}
            
                    ${navigationArrowPosition === 'bottom-right' ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : '0'};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : '0'};
                    ` : ''}
                }
                    
            ` : ''}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowMobileBorderCssStyle ? `border-width: ${navigationArrowMobileBorderCssStyle};` : ''}  
                ${navigationArrowMobileBorderRadiusCssStyle ? `border-radius: ${navigationArrowMobileBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Mobile ? `width: ${navigationArrowWidth.Mobile}${navigationArrowWidthUnits.Mobile};` : ''}
                ${navigationArrowHeight.Mobile ? `height: ${navigationArrowHeight.Mobile}${navigationArrowHeightUnits.Mobile};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Mobile ? `font-size: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationType === 'progressbar' ? (
            paginationProgressbarPosition.Mobile ? `top: ${paginationProgressbarPosition.Mobile}${paginationProgressbarPositionUnits.Mobile} !important;` : ''
        ) : (
            paginationDotsPosition.Mobile ? `bottom: ${paginationDotsPosition.Mobile}${paginationDotsPositionUnits.Mobile} !important;` : ''
        )}
                ${paginationDotsMobileMarginCssStyle ? `margin: ${paginationDotsMobileMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsMobileBorderCssStyle ? `border-width: ${paginationNormalDotsMobileBorderCssStyle};` : ''}   
                ${paginationNormalDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsMobileBorderRadiusCssStyle};` : ''}
                ${paginationNormalDotsWidth.Mobile ? `width: ${paginationNormalDotsWidth.Mobile}${paginationNormalDotsWidthUnits.Mobile};` : ''}
                ${paginationNormalDotsHeight.Mobile ? `height: ${paginationNormalDotsHeight.Mobile}${paginationNormalDotsHeightUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsMobileBorderCssStyle ? `border-width: ${paginationActiveDotsMobileBorderCssStyle};` : ''}   
                ${paginationActiveDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsMobileBorderRadiusCssStyle};` : ''}
                ${paginationActiveDotsWidth.Mobile ? `width: ${paginationActiveDotsWidth.Mobile}${paginationActiveDotsWidthUnits.Mobile};` : ''}
                ${paginationActiveDotsHeight.Mobile ? `height: ${paginationActiveDotsHeight.Mobile}${paginationActiveDotsHeightUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Mobile && paginationFractionFontSizeUnits.Mobile ? `font-size: ${paginationFractionFontSize.Mobile}${paginationFractionFontSizeUnits.Mobile};` : ''}
                ${paginationFractionLineHeight.Mobile && paginationFractionLineHeightUnits.Mobile ? `line-height: ${paginationFractionLineHeight.Mobile}${paginationFractionLineHeightUnits.Mobile};` : ''}
                ${paginationFractionLetterSpacing.Mobile && paginationFractionLetterSpacingUnits.Mobile ? `letter-spacing: ${paginationFractionLetterSpacing.Mobile}${paginationFractionLetterSpacingUnits.Mobile};` : ''}
                ${paginationFractionWordSpacing.Mobile && paginationFractionWordSpacingUnits.Mobile ? `word-spacing: ${paginationFractionWordSpacing.Mobile}${paginationFractionWordSpacingUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Mobile ? `height: ${paginationProgressbarHeight.Mobile}${paginationProgressbarHeightUnits.Mobile};` : ''}
            }
        }

    `, [
        blockId,
        deviceType,
        images,
        blockStyle,
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
        carouselEffect,
        mousewheelControl,
        keyboardNavigation,
        paginationType,
        dynamicBullets,

        /** Start Show/Hide Elements */
        paginationPositionType,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */

        /** Start image Link Settings */
        enableimageLinks,
        showTooltip,
        imageLinkTarget,
        imageLinkRel,
        imageLinkHoverEffect,
        imageLinkHoverOpacity,
        imageLinkHoverScale,
        imageLinkHoverLift,
        imageLinkHoverLiftUnits,
        imageLinkTransitionDuration,
        /** End image Link Settings */

        /** Start Layout & Content Setting */
        verticalAlign,
        layoutHeight,
        layoutHeightUnits,
        /** End Layout & Content Setting */

        /** Start image Max Width */
        imageMaxWidth,
        imageMaxWidthUnits,
        /** End image Max Width */

        /** Start Content Padding */
        imagePaddingUnits,
        imagePaddingDesktop,
        imagePaddingDesktopCssStyle,
        imagePaddingTablet,
        imagePaddingTabletCssStyle,
        imagePaddingMobile,
        imagePaddingMobileCssStyle,
        imagePaddingLink,
        /** End Content Padding */

        /** Start image Background */
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
        /** End image Background */

        /** Start image Border */
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
        /** End image Border */

        /** Start image Border Radius */
        imageBorderRadiusUnits,
        imageBorderRadiusDesktop,
        imageBorderRadiusDesktopCssStyle,
        imageBorderRadiusTablet,
        imageBorderRadiusTabletCssStyle,
        imageBorderRadiusMobile,
        imageBorderRadiusMobileCssStyle,
        imageBorderRadiusLink,
        /** End image Border Radius */

        /** Start image Box Shadow */
        imageBoxShadowValuesSwitcher,
        imageBoxShadowValues,
        imageBoxShadowCssValue,
        imageBoxShadowHoverValues,
        imageBoxShadowHoverCssValue,
        /** End image Box Shadow */

        /** Start image Caption Typography */
        imageCaptionFontFamily,
        imageCaptionFontSize,
        imageCaptionFontSizeUnits,
        imageCaptionFontWeight,
        imageCaptionFontStyle,
        imageCaptionTextTransform,
        imageCaptionTextDecoration,
        imageCaptionLineHeight,
        imageCaptionLineHeightUnits,
        imageCaptionLetterSpacing,
        imageCaptionLetterSpacingUnits,
        imageCaptionWordSpacing,
        imageCaptionWordSpacingUnits,
        /** End image Caption Typography */

        /** Start image Caption Color */
        imageCaptionColorSwitcher,
        imageCaptionColor,
        imageCaptionColorHover,
        /** End image Caption Color */

        /** Start image Caption Background */
        imageCaptionNormalBackgroundType,
        imageCaptionNormalClassicColor,
        imageCaptionNormalGradientColor,
        imageCaptionNormalCustomGradientSwitcher,
        imageCaptionNormalCustomGradientInputValue,
        imageCaptionHoverBackgroundType,
        imageCaptionHoverClassicColor,
        imageCaptionHoverGradientColor,
        imageCaptionHoverCustomGradientSwitcher,
        imageCaptionHoverCustomGradientInputValue,
        /** End image Caption Background */

        /** Start image Caption Border and color */
        imageCaptionBorder,
        imageCaptionBorderColorSwitcher,
        imageCaptionBorderColor,
        imageCaptionBorderHoverColor,
        /** End image Caption Border and color */

        /** Start image Caption Border */
        imageCaptionBorderUnits,
        imageCaptionBorderDesktop,
        imageCaptionBorderDesktopCssStyle,
        imageCaptionBorderTablet,
        imageCaptionBorderTabletCssStyle,
        imageCaptionBorderMobile,
        imageCaptionBorderMobileCssStyle,
        imageCaptionBorderLink,
        /** End image Caption Border */

        /** Start image Caption Border Radius */
        imageCaptionBorderRadiusUnits,
        imageCaptionBorderRadiusDesktop,
        imageCaptionBorderRadiusDesktopCssStyle,
        imageCaptionBorderRadiusTablet,
        imageCaptionBorderRadiusTabletCssStyle,
        imageCaptionBorderRadiusMobile,
        imageCaptionBorderRadiusMobileCssStyle,
        imageCaptionBorderRadiusLink,
        /** End image Caption Border Radius */

        /** Start image Caption Padding */
        imageCaptionPaddingUnits,
        imageCaptionPaddingDesktop,
        imageCaptionPaddingDesktopCssStyle,
        imageCaptionPaddingTablet,
        imageCaptionPaddingTabletCssStyle,
        imageCaptionPaddingMobile,
        imageCaptionPaddingMobileCssStyle,
        imageCaptionPaddingLink,
        /** End image Caption Padding */

        /** Start image Tooltip Typography */
        imageTooltipFontFamily,
        imageTooltipFontSize,
        imageTooltipFontSizeUnits,
        imageTooltipFontWeight,
        imageTooltipFontStyle,
        imageTooltipTextTransform,
        imageTooltipTextDecoration,
        imageTooltipLineHeight,
        imageTooltipLineHeightUnits,
        imageTooltipLetterSpacing,
        imageTooltipLetterSpacingUnits,
        imageTooltipWordSpacing,
        imageTooltipWordSpacingUnits,
        /** End image Tooltip Typography */

        /** Start image Tooltip Color */
        imageTooltipColor,
        imageTooltipBgColor,
        /** End image Tooltip Color */

        /** Start image Tooltip Border and color */
        imageTooltipBorder,
        imageTooltipBorderColor,
        /** End image Tooltip Border and color */

        /** Start image Tooltip Border */
        imageTooltipBorderUnits,
        imageTooltipBorderDesktop,
        imageTooltipBorderDesktopCssStyle,
        imageTooltipBorderTablet,
        imageTooltipBorderTabletCssStyle,
        imageTooltipBorderMobile,
        imageTooltipBorderMobileCssStyle,
        imageTooltipBorderLink,
        /** End image Tooltip Border */

        /** Start image Tooltip Border Radius */
        imageTooltipBorderRadiusUnits,
        imageTooltipBorderRadiusDesktop,
        imageTooltipBorderRadiusDesktopCssStyle,
        imageTooltipBorderRadiusTablet,
        imageTooltipBorderRadiusTabletCssStyle,
        imageTooltipBorderRadiusMobile,
        imageTooltipBorderRadiusMobileCssStyle,
        imageTooltipBorderRadiusLink,
        /** End image Tooltip Border Radius */

        /** Start image Tooltip Padding */
        imageTooltipPaddingUnits,
        imageTooltipPaddingDesktop,
        imageTooltipPaddingDesktopCssStyle,
        imageTooltipPaddingTablet,
        imageTooltipPaddingTabletCssStyle,
        imageTooltipPaddingMobile,
        imageTooltipPaddingMobileCssStyle,
        imageTooltipPaddingLink,
        /** End image Tooltip Padding */

        /** Start image Tooltip Position */
        imageTooltipTopPosition,
        imageTooltipTopPositionUnits,
        imageTooltipLeftPosition,
        imageTooltipLeftPositionUnits,
        /** End image Tooltip Position */

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
        /** End Active Dots Border */

        /** Start Active Dots Border */
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

        /** Global Settings */

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
        /** End Global Setting */

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

    ]);

    const customCss = getCustomCss(globalCustomCSS, `.${blockId}`);

    /** Set Block Style */
    useEffect(() => {
        setAttributes({ blockStyle: `${allBlockStyle} ${customCss}`.replace(/\s+/g, ' ').trim() });
    }, [allBlockStyle, customCss]);

    /** Set Editor Style */
    const editorStyle = `${allBlockStyle} ${customCss}`.replace(/\s+/g, ' ').trim();

    return (
        <>
            <style>
                {editorStyle}
            </style>
            <InspectorControl
                generalControls={generalControls}
                styleControls={styleControls}
                advancedControls={advancedControls}
            />
        </>
    );
}
