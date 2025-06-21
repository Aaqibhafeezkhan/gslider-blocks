import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo, useCallback } from '@wordpress/element';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PanelBody, TabPanel, ToggleControl, RangeControl, SelectControl, BaseControl, Button, ButtonGroup } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { 
    BORDER_STYLES,
    SLIDER_EFFECT_OPTIONS,
    CAROUSEL_EFFECT_OPTIONS,
    SLIDER_TYPE,
    PAGINATION_TYPE,
    NORMAL_ACTIVE

} from "@Constants";

import './editor.scss';
import SortableItem from './sortableItem';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import InspectorControl from '@Components/inspector-controls';
import CustomCSSEditor from '@Components/custom-css-editor';
import getCustomCss from '@Utils/getCustomCss';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import {useDeviceType} from "@Utils/displayType";
import InputControls from '@Components/input-control';
import HtmlTagControl from '@Components/html-tag-control';
import SelectControls from '@Components/select-controls';

export default function Inspector({ attributes, setAttributes, clientId, handleAddItem, handleChangeItem, handleDuplicateItem, handleDragEnd, handleDeleteItem }) {
    const { 
        blockId,
        deviceType,
        sliderItems,
        blockStyle,
        sliderType,
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
        slideEffect,
        carouselEffect,
        mousewheelControl,
        paginationType,
        dynamicBullets,

        /** Start Show/Hide Elements */
        showSubTitle,
        showTitle,
        showDescription,
        showButton,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */

        /** Start Layout & Content Setting */
        layoutHeight,
        layoutHeightUnits,
        contentWidth,
        contentWidthUnits,
        contentAlignment,
        contentVerticalAlignment,
        contentHorizontalAlignment,
        subTitleHtmlTag,
        titleHtmlTag,
        descriptionHtmlTag,
        /** End Layout & Content Setting */

        /** Start Subtitle Typography, Color, Margin & Padding */
        subtitleFontFamily,
        subtitleFontSize,
        subtitleFontSizeUnits,
        subtitleFontWeight,
        subtitleFontStyle,
        subtitleTextTransform,
        subtitleTextDecoration,
        subtitleLineHeight,
        subtitleLineHeightUnits,
        subtitleLetterSpacing,
        subtitleLetterSpacingUnits,
        subtitleWordSpacing,
        subtitleWordSpacingUnits,

        subtitleColorSwitcher,
        subtitleColor,
        subtitleColorHover,

        subtitleMarginUnits,
        subtitleDesktopMargin,
        subtitleDesktopMarginCssStyle,
        subtitleTabletMargin,
        subtitleTabletMarginCssStyle,
        subtitleMobileMargin,
        subtitleMobileMarginCssStyle,
        subtitleMarginLink,

        subtitlePaddingUnits,
        subtitleDesktopPadding,
        subtitleDesktopPaddingCssStyle,
        subtitleTabletPadding,
        subtitleTabletPaddingCssStyle,
        subtitleMobilePadding,
        subtitleMobilePaddingCssStyle,
        subtitlePaddingLink,
        /** End Subtitle Typography, Color, Margin & Padding */

        /** Start Title Typography, Color, Margin & Padding */
        titleFontFamily,
        titleFontSize,
        titleFontSizeUnits,
        titleFontWeight,
        titleFontStyle,
        titleTextTransform,
        titleTextDecoration,
        titleLineHeight,
        titleLineHeightUnits,
        titleLetterSpacing,
        titleLetterSpacingUnits,
        titleWordSpacing,
        titleWordSpacingUnits,

        titleColorSwitcher,
        titleColor,
        titleColorHover,

        titleMarginUnits,
        titleDesktopMargin,
        titleDesktopMarginCssStyle,
        titleTabletMargin,
        titleTabletMarginCssStyle,
        titleMobileMargin,
        titleMobileMarginCssStyle,
        titleMarginLink,

        titlePaddingUnits,
        titleDesktopPadding,
        titleDesktopPaddingCssStyle,
        titleTabletPadding,
        titleTabletPaddingCssStyle,
        titleMobilePadding,
        titleMobilePaddingCssStyle,
        titlePaddingLink,
        /** End Title Typography, Color, Margin & Padding */

        /** Start Description Typography, Color, Margin & Padding */
        descriptionFontFamily,
        descriptionFontSize,
        descriptionFontSizeUnits,
        descriptionFontWeight,
        descriptionFontStyle,
        descriptionTextTransform,
        descriptionTextDecoration,
        descriptionLineHeight,
        descriptionLineHeightUnits,
        descriptionLetterSpacing,
        descriptionLetterSpacingUnits,
        descriptionWordSpacing,
        descriptionWordSpacingUnits,

        descriptionColorSwitcher,
        descriptionColor,
        descriptionColorHover,

        descriptionMarginUnits,
        descriptionDesktopMargin,
        descriptionDesktopMarginCssStyle,
        descriptionTabletMargin,
        descriptionTabletMarginCssStyle,
        descriptionMobileMargin,
        descriptionMobileMarginCssStyle,
        descriptionMarginLink,

        descriptionPaddingUnits,
        descriptionDesktopPadding,
        descriptionDesktopPaddingCssStyle,
        descriptionTabletPadding,
        descriptionTabletPaddingCssStyle,
        descriptionMobilePadding,
        descriptionMobilePaddingCssStyle,
        descriptionPaddingLink,
        /** End Description Typography, Color, Margin & Padding */

        /** Start Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
        primaryButtonFontFamily,
        primaryButtonFontSize,
        primaryButtonFontSizeUnits,
        primaryButtonFontWeight,
        primaryButtonFontStyle,
        primaryButtonTextTransform,
        primaryButtonTextDecoration,
        primaryButtonLineHeight,
        primaryButtonLineHeightUnits,
        primaryButtonLetterSpacing,
        primaryButtonLetterSpacingUnits,
        primaryButtonWordSpacing,
        primaryButtonWordSpacingUnits,

        primaryButtonColorSwitcher,
        primaryButtonColor,
        primaryButtonColorHover,

        primaryButtonNormalBackgroundType,
        primaryButtonNormalClassicColor,
        primaryButtonNormalGradientColor,
        primaryButtonNormalCustomGradientSwitcher,
        primaryButtonNormalCustomGradientInputValue,
        primaryButtonHoverBackgroundType,
        primaryButtonHoverClassicColor,
        primaryButtonHoverGradientColor,
        primaryButtonHoverCustomGradientSwitcher,
        primaryButtonHoverCustomGradientInputValue,

        primaryButtonBorder,
        primaryButtonBorderColorSwitcher,
        primaryButtonBorderColor,
        primaryButtonBorderHoverColor,
        primaryButtonBorderUnits,
        primaryButtonDesktopBorder,
        primaryButtonDesktopBorderCssStyle,
        primaryButtonTabletBorder,
        primaryButtonTabletBorderCssStyle,
        primaryButtonMobileBorder,
        primaryButtonMobileBorderCssStyle,
        primaryButtonBorderLink,

        primaryButtonBorderRadiusUnits,
        primaryButtonDesktopBorderRadius,
        primaryButtonDesktopBorderRadiusCssStyle,
        primaryButtonTabletBorderRadius,
        primaryButtonTabletBorderRadiusCssStyle,
        primaryButtonMobileBorderRadius,
        primaryButtonMobileBorderRadiusCssStyle,
        primaryButtonBorderRadiusLink,

        primaryButtonBoxShadowValuesSwitcher,
        primaryButtonBoxShadowValues,
        primaryButtonBoxShadowCssValue,
        primaryButtonBoxShadowHoverValues,
        primaryButtonBoxShadowHoverCssValue,

        primaryButtonMarginUnits,
        primaryButtonDesktopMargin,
        primaryButtonDesktopMarginCssStyle,
        primaryButtonTabletMargin,
        primaryButtonTabletMarginCssStyle,
        primaryButtonMobileMargin,
        primaryButtonMobileMarginCssStyle,
        primaryButtonMarginLink,

        primaryButtonPaddingUnits,
        primaryButtonDesktopPadding,
        primaryButtonDesktopPaddingCssStyle,
        primaryButtonTabletPadding,
        primaryButtonTabletPaddingCssStyle,
        primaryButtonMobilePadding,
        primaryButtonMobilePaddingCssStyle,
        primaryButtonPaddingLink,
        /** End Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

        /** Start Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
        secondaryButtonFontFamily,
        secondaryButtonFontSize,
        secondaryButtonFontSizeUnits,
        secondaryButtonFontWeight,
        secondaryButtonFontStyle,
        secondaryButtonTextTransform,
        secondaryButtonTextDecoration,
        secondaryButtonLineHeight,
        secondaryButtonLineHeightUnits,
        secondaryButtonLetterSpacing,
        secondaryButtonLetterSpacingUnits,
        secondaryButtonWordSpacing,
        secondaryButtonWordSpacingUnits,

        secondaryButtonColorSwitcher,
        secondaryButtonColor,
        secondaryButtonColorHover,

        secondaryButtonNormalBackgroundType,
        secondaryButtonNormalClassicColor,
        secondaryButtonNormalGradientColor,
        secondaryButtonNormalCustomGradientSwitcher,
        secondaryButtonNormalCustomGradientInputValue,
        secondaryButtonHoverBackgroundType,
        secondaryButtonHoverClassicColor,
        secondaryButtonHoverGradientColor,
        secondaryButtonHoverCustomGradientSwitcher,
        secondaryButtonHoverCustomGradientInputValue,

        secondaryButtonBorder,
        secondaryButtonBorderColorSwitcher,
        secondaryButtonBorderColor,
        secondaryButtonBorderHoverColor,
        secondaryButtonBorderUnits,
        secondaryButtonDesktopBorder,
        secondaryButtonDesktopBorderCssStyle,
        secondaryButtonTabletBorder,
        secondaryButtonTabletBorderCssStyle,
        secondaryButtonMobileBorder,
        secondaryButtonMobileBorderCssStyle,
        secondaryButtonBorderLink,

        secondaryButtonBorderRadiusUnits,
        secondaryButtonDesktopBorderRadius,
        secondaryButtonDesktopBorderRadiusCssStyle,
        secondaryButtonTabletBorderRadius,
        secondaryButtonTabletBorderRadiusCssStyle,
        secondaryButtonMobileBorderRadius,
        secondaryButtonMobileBorderRadiusCssStyle,
        secondaryButtonBorderRadiusLink,

        secondaryButtonBoxShadowValuesSwitcher,
        secondaryButtonBoxShadowValues,
        secondaryButtonBoxShadowCssValue,
        secondaryButtonBoxShadowHoverValues,
        secondaryButtonBoxShadowHoverCssValue,

        secondaryButtonMarginUnits,
        secondaryButtonDesktopMargin,
        secondaryButtonDesktopMarginCssStyle,
        secondaryButtonTabletMargin,
        secondaryButtonTabletMarginCssStyle,
        secondaryButtonMobileMargin,
        secondaryButtonMobileMarginCssStyle,
        secondaryButtonMarginLink,

        secondaryButtonPaddingUnits,
        secondaryButtonDesktopPadding,
        secondaryButtonDesktopPaddingCssStyle,
        secondaryButtonTabletPadding,
        secondaryButtonTabletPaddingCssStyle,
        secondaryButtonMobilePadding,
        secondaryButtonMobilePaddingCssStyle,
        secondaryButtonPaddingLink,
        /** End Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

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
        navigationArrowPosition,
        navigationArrowPositionUnits,
        navigationArrowRightOffset,
        navigationArrowRightOffsetUnits,
        navigationArrowLeftOffset,
        navigationArrowLeftOffsetUnits,
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
        styles: 'subtitle',
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
            subtitleDesktopMarginCssStyle: spacingFormat(subtitleDesktopMargin, subtitleMarginUnits.Desktop),
            subtitleTabletMarginCssStyle: spacingFormat(subtitleTabletMargin, subtitleMarginUnits.Tablet),
            subtitleMobileMarginCssStyle: spacingFormat(subtitleMobileMargin, subtitleMarginUnits.Mobile),
            
            titleDesktopMarginCssStyle: spacingFormat(titleDesktopMargin, titleMarginUnits.Desktop),
            titleTabletMarginCssStyle: spacingFormat(titleTabletMargin, titleMarginUnits.Tablet),
            titleMobileMarginCssStyle: spacingFormat(titleMobileMargin, titleMarginUnits.Mobile),
            
            descriptionDesktopMarginCssStyle: spacingFormat(descriptionDesktopMargin, descriptionMarginUnits.Desktop),
            descriptionTabletMarginCssStyle: spacingFormat(descriptionTabletMargin, descriptionMarginUnits.Tablet),
            descriptionMobileMarginCssStyle: spacingFormat(descriptionMobileMargin, descriptionMarginUnits.Mobile),

            primaryButtonDesktopBorderRadiusCssStyle: spacingFormat(primaryButtonDesktopBorderRadius, primaryButtonBorderRadiusUnits.Desktop),
            primaryButtonTabletBorderRadiusCssStyle: spacingFormat(primaryButtonTabletBorderRadius, primaryButtonBorderRadiusUnits.Tablet),
            primaryButtonMobileBorderRadiusCssStyle: spacingFormat(primaryButtonMobileBorderRadius, primaryButtonBorderRadiusUnits.Mobile),

            primaryButtonDesktopPaddingCssStyle: spacingFormat(primaryButtonDesktopPadding, primaryButtonPaddingUnits.Desktop), 
            primaryButtonTabletPaddingCssStyle: spacingFormat(primaryButtonTabletPadding, primaryButtonPaddingUnits.Tablet),
            primaryButtonMobilePaddingCssStyle: spacingFormat(primaryButtonMobilePadding, primaryButtonPaddingUnits.Mobile),

            secondaryButtonDesktopBorderRadiusCssStyle: spacingFormat(secondaryButtonDesktopBorderRadius, secondaryButtonBorderRadiusUnits.Desktop),
            secondaryButtonTabletBorderRadiusCssStyle: spacingFormat(secondaryButtonTabletBorderRadius, secondaryButtonBorderRadiusUnits.Tablet),
            secondaryButtonMobileBorderRadiusCssStyle: spacingFormat(secondaryButtonMobileBorderRadius, secondaryButtonBorderRadiusUnits.Mobile),

            secondaryButtonDesktopMarginCssStyle: spacingFormat(secondaryButtonDesktopMargin, secondaryButtonMarginUnits.Desktop), 
            secondaryButtonTabletMarginCssStyle: spacingFormat(secondaryButtonTabletMargin, secondaryButtonMarginUnits.Tablet),
            secondaryButtonMobileMarginCssStyle: spacingFormat(secondaryButtonMobileMargin, secondaryButtonMarginUnits.Mobile),

            secondaryButtonDesktopPaddingCssStyle: spacingFormat(secondaryButtonDesktopPadding, secondaryButtonPaddingUnits.Desktop), 
            secondaryButtonTabletPaddingCssStyle: spacingFormat(secondaryButtonTabletPadding, secondaryButtonPaddingUnits.Tablet),
            secondaryButtonMobilePaddingCssStyle: spacingFormat(secondaryButtonMobilePadding, secondaryButtonPaddingUnits.Mobile),

            navigationArrowDesktopBorderRadiusCssStyle: spacingFormat(navigationArrowDesktopBorderRadius, navigationArrowBorderRadiusUnits.Desktop),
            navigationArrowTabletBorderRadiusCssStyle: spacingFormat(navigationArrowTabletBorderRadius, navigationArrowBorderRadiusUnits.Tablet),
            navigationArrowMobileBorderRadiusCssStyle: spacingFormat(navigationArrowMobileBorderRadius, navigationArrowBorderRadiusUnits.Mobile),

            paginationNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(paginationNormalDotsDesktopBorderRadius, paginationNormalDotsBorderRadiusUnits.Desktop),
            paginationNormalDotsTabletBorderRadiusCssStyle: spacingFormat(paginationNormalDotsTabletBorderRadius, paginationNormalDotsBorderRadiusUnits.Tablet),
            paginationNormalDotsMobileBorderRadiusCssStyle: spacingFormat(paginationNormalDotsMobileBorderRadius, paginationNormalDotsBorderRadiusUnits.Mobile),
        });
    }, [
        subtitleDesktopMargin,
        subtitleTabletMargin,
        subtitleMobileMargin,

        titleDesktopMargin,
        titleTabletMargin,
        titleMobileMargin,

        descriptionDesktopMargin,
        descriptionTabletMargin,
        descriptionMobileMargin,
        
        primaryButtonDesktopBorderRadius,
        primaryButtonTabletBorderRadius,
        primaryButtonMobileBorderRadius,

        primaryButtonDesktopPadding,
        primaryButtonTabletPadding,
        primaryButtonMobilePadding,

        secondaryButtonDesktopBorderRadius,
        secondaryButtonTabletBorderRadius,
        secondaryButtonMobileBorderRadius,

        secondaryButtonDesktopMargin,
        secondaryButtonTabletMargin,
        secondaryButtonMobileMargin,

        secondaryButtonDesktopPadding,
        secondaryButtonTabletPadding,
        secondaryButtonMobilePadding,

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

    /** Load Google Font */
    if (subtitleFontFamily !== 'Default') {
        LoadGoogleFont(subtitleFontFamily);
    }

    if (titleFontFamily !== 'Default') {
        LoadGoogleFont(titleFontFamily);
    }

    if (descriptionFontFamily !== 'Default') {
        LoadGoogleFont(descriptionFontFamily);
    }

    if (primaryButtonFontFamily !== 'Default') {
        LoadGoogleFont(primaryButtonFontFamily);
    }

    if (secondaryButtonFontFamily !== 'Default') {
        LoadGoogleFont(secondaryButtonFontFamily);
    }
    /** End Load Google Font */

    /** Show Secondary Button Style if have secondary button enabled in slider items */
    const [secondaryButtonSwitcher, setSecondaryButtonSwitcher] = useState([]);

    useEffect(() => {
        if (Array.isArray(sliderItems)) {
            const updatedSwitchers = sliderItems.map(item => item.secondaryButtonSwitcher);
            setSecondaryButtonSwitcher(updatedSwitchers);
        }
    }, [sliderItems]);
    
    const showSecondarybtnStyle = secondaryButtonSwitcher.includes(true);

    /** End Secondary Button Style */ 

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
                <ToggleControl
                    label={ __( "Show Sub Title", "gslider-blocks" ) }
                    checked={ showSubTitle }
                    onChange={(value) => setAttributes({ showSubTitle: value })}
                />
                <ToggleControl
                    label={ __( "Show Title", "gslider-blocks" ) }
                    checked={ showTitle }
                    onChange={(value) => setAttributes({ showTitle: value })}
                />
                <ToggleControl
                    label={ __( "Show Description", "gslider-blocks" ) }
                    checked={ showDescription }
                    onChange={(value) => setAttributes({ showDescription: value })}
                />
                <ToggleControl
                    label={ __( "Show Button", "gslider-blocks" ) }
                    checked={ showButton }
                    onChange={(value) => setAttributes({ showButton: value })}
                />
                <ToggleControl
                    label={ __( "Show Navigation", "gslider-blocks" ) }
                    checked={ showNavigation }
                    onChange={(value) => setAttributes({ showNavigation: value })}
                />
                <ToggleControl
                    label={ __( "Show Pagination", "gslider-blocks" ) }
                    checked={ showPagination }
                    onChange={(value) => setAttributes({ showPagination: value })}
                />
            </PanelBody>
            <PanelBody
                title={__("Slider Items", "gslider-blocks")}
                opened={openPanels.general === "slider-items"}
                onToggle={() => togglePanel("general", "slider-items")}
            >
                <div className="gslider-repeat-item-wrapper">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={sliderItems.map((item) => item.id)}>
                            <ul className="dnd-items-wrapper">
                                {sliderItems.map((item, index) => (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        item={item}
                                        handleChangeItem={handleChangeItem}
                                        handleDeleteItem={handleDeleteItem}
                                        handleDuplicateItem={handleDuplicateItem}
                                        index={index}
                                        deviceType={deviceType}
                                        setAttributes={setAttributes}
                                    />
                                ))}
                            </ul>
                        </SortableContext>
                    </DndContext>
                    <Button isPrimary onClick={handleAddItem}
                        className="gslider-add-item-btn"
                    >
                        {__("Add Slide", "gslider-blocks")}
                    </Button>
                </div>
            </PanelBody>
            <PanelBody
                title={__("Layout & Content Setting", "gslider-blocks")}
                opened={openPanels.general === "layout-content-setting"}
                onToggle={() => togglePanel("general", "layout-content-setting")}
            >
                <ResponsiveRangeControl
                    min={0}
                    max={1000}
                    label={__("Layout Height", "gslider-blocks")}
                    rangeValue={layoutHeight}
                    onChangeValue={(value) => setAttributes({ layoutHeight: value })}
                    onUnitChange={(value) => setAttributes({ layoutHeightUnits: value })}
                    deviceType={deviceType}
                    units={layoutHeightUnits}
                    step={1}
                    resetFallbackValue={""}
                />

                <ResponsiveRangeControl
                    min={0}
                    max={contentWidthUnits?.[deviceType] === '%' ? 100 : 1000}
                    label={__("Max Width", "gslider-blocks")}
                    rangeValue={contentWidth}
                    onChangeValue={(value) => setAttributes({ contentWidth: value })}
                    onUnitChange={(value) => setAttributes({ contentWidthUnits: value })}
                    deviceType={deviceType}
                    units={contentWidthUnits}
                    step={1}
                    resetFallbackValue={""}
                /> 

                <ResponsiveAlignmentControl
                    label={__("Vertical Alignment", "gslider-blocks")}
                    globalAlignment={contentVerticalAlignment}
                    setGlobalAlignment={(value) => setAttributes({ contentVerticalAlignment: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                    textAlignment={false}
                    verticalAlignment={true}
                    horizontalAlignment={false}
                />

                <ResponsiveAlignmentControl
                    label={__("Horizontal Alignment", "gslider-blocks")}
                    globalAlignment={contentHorizontalAlignment}
                    setGlobalAlignment={(value) => setAttributes({ contentHorizontalAlignment: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                    textAlignment={false}
                    verticalAlignment={false}
                    horizontalAlignment={true}
                />

                <ResponsiveAlignmentControl
                    label={__("Text Alignment", "gslider-blocks")}
                    globalAlignment={contentAlignment}
                    setGlobalAlignment={(value) => setAttributes({ contentAlignment: value })}
                    deviceType={deviceType}
                    setAttributes={setAttributes}
                    verticalAlignment={false}
                    horizontalAlignment={false}
                />

                <HtmlTagControl
                    label={__("Sub Title Tag", "gslider-blocks")}
                    globalHtmlTag={subTitleHtmlTag}
                    setGlobalHtmlTag={(value) => setAttributes({ subTitleHtmlTag: value })}
                />

                <HtmlTagControl
                    label={__("Title Tag", "gslider-blocks")}
                    globalHtmlTag={titleHtmlTag}
                    setGlobalHtmlTag={(value) => setAttributes({ titleHtmlTag: value })}
                />

                <HtmlTagControl
                    label={__("Description Tag", "gslider-blocks")}
                    globalHtmlTag={descriptionHtmlTag}
                    setGlobalHtmlTag={(value) => setAttributes({ descriptionHtmlTag: value })}
                />
                
            </PanelBody>
            <PanelBody 
                title={__("Slider Type", "gslider-blocks")} 
                opened={openPanels.general === "slider-type"}
                onToggle={() => togglePanel("general", "slider-type")}
            >
                <BaseControl
                    label={__("Slider Type", "gslider-blocks")}
                >
                    <ButtonGroup className="gslider-setting-switcher-panel-btn">
                        {SLIDER_TYPE.map((item, key) => (
                            <Button
                                key={key}
                                onClick={() => setAttributes({ sliderType: item.value })}
                                className={`gslider-setting-switcher-panel-btn-switcher ${sliderType === item.value ? 'active' : ''}`}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                </BaseControl>
            </PanelBody>
            <PanelBody 
                title={__("Slider Settings", "gslider-blocks")} 
                opened={openPanels.general === "slider-settings"}
                onToggle={() => togglePanel("general", "slider-settings")}
            >
                <ToggleControl
                    label={ __( 'Infinite Loop', 'gslider-blocks' ) }
                    checked={ infiniteLoop }
                    onChange={(value) => setAttributes({ infiniteLoop: value })}
                />
                <ToggleControl
                    label={ __( 'Touch Swipe Control', 'gslider-blocks' ) }
                    checked={ allowTouchMove }
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
                    label={ __( 'Autoplay', 'gslider-blocks' ) }
                    checked={ autoplay }
                    onChange={(value) => setAttributes({ autoplay: value })}
                />
                { autoplay && (
                    <ResponsiveRangeControl
                        min={1000}
                        max={10000}
                        label={__("Autoplay Delay (ms)", "gslider-blocks")}
                        rangeValue={autoplayDelay} 
                        onChangeValue={(value) => setAttributes({ autoplayDelay: value })}
                        deviceType={deviceType}
                        step={1}
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
                    step={1}
                    resetFallbackValue={"800"}
                    isRangeUnit={false}
                />
            </PanelBody>
            {sliderType === 'carousel' && (
                <PanelBody 
                    title={__("Carousel Settings", "gslider-blocks")} 
                    opened={openPanels.general === "carousel-settings"}
                    onToggle={() => togglePanel("general", "carousel-settings")}
                >

                    <ResponsiveRangeControl
                        min={1}
                        max={10}
                        label={__("Number of Columns", "gslider-blocks")}
                        rangeValue={carouselPerColumn}
                        onChangeValue={(value) => setAttributes({ carouselPerColumn: value })}
                        deviceType={deviceType}
                        step={1}
                        resetFallbackValue={""}
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
                </PanelBody>
            )}
            {sliderType === 'carousel' && (
                <PanelBody 
                    title={__("Carousel Effect", "gslider-blocks")} 
                    opened={openPanels.general === "carousel-effect"}
                    onToggle={() => togglePanel("general", "carousel-effect")}
                >
                    <SelectControls
                        label={__('Effect Type', 'gslider-blocks')}
                        value={carouselEffect}
                        options={CAROUSEL_EFFECT_OPTIONS}
                        onChange={(value) => setAttributes({ carouselEffect: value })}
                    />
                </PanelBody>
            )}
            {sliderType === 'slider' && (
                <PanelBody 
                    title={__("Slider Effect", "gslider-blocks")} 
                    opened={openPanels.general === "slider-effect"}
                    onToggle={() => togglePanel("general", "slider-effect")}
                >
                    <SelectControls
                        label={__('Effect Type', 'gslider-blocks')}
                        value={slideEffect}
                        options={SLIDER_EFFECT_OPTIONS}
                        onChange={(value) => setAttributes({ slideEffect: value })}
                    />
                </PanelBody>
            )}

            {showPagination && (
                <PanelBody 
                    title={__("Pagination", "gslider-blocks")} 
                    opened={openPanels.general === "pagination"}
                    onToggle={() => togglePanel("general", "pagination")}
                >
                    <SelectControls
                        label={__("Pagination Type", "gslider-blocks")}
                        value={paginationType}
                        options={PAGINATION_TYPE}
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
            
        </>
    );

    /**
	 * Inspector Style Controls
	 */
	const styleControls = (
        <>

            <PanelBody 
                title={__("Subtitle", "gslider-blocks")}  
                opened={openPanels.styles === "subtitle"}
                onToggle={() => togglePanel("styles", "subtitle")}
            >
                <ResponsiveTypographyControl 
                    fontFamily={subtitleFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ subtitleFontFamily: value })}
                    
                    fontSize={subtitleFontSize}
                    onChangeFontSize={(value) => setAttributes({ subtitleFontSize: value })}
                    
                    fontSizeUnits={subtitleFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ subtitleFontSizeUnits: value })}
                    
                    fontWeight={subtitleFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ subtitleFontWeight: value })}
                    
                    fontStyle={subtitleFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ subtitleFontStyle: value })}
                    
                    textTransform={subtitleTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ subtitleTextTransform: value })}
                    
                    textDecoration={subtitleTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ subtitleTextDecoration: value })}
                    
                    lineHeight={subtitleLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ subtitleLineHeight: value })}
                    
                    lineHeightUnits={subtitleLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ subtitleLineHeightUnits: value })}

                    letterSpacing={subtitleLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ subtitleLetterSpacing: value })}
                    
                    letterSpacingUnits={subtitleLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ subtitleLetterSpacingUnits: value })}

                    wordSpacing={subtitleWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ subtitleWordSpacing: value })}
                    
                    wordSpacingUnits={subtitleWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ subtitleWordSpacingUnits: value })}
                    
                    deviceType={deviceType}
                />
                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    globalSwitcher={subtitleColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ subtitleColorSwitcher: value })}
                />

                {subtitleColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={subtitleColor}
                        onChangeColor={(value) => setAttributes({ subtitleColor: value })}
                        defaultColor=''
                    />
                )}

                {subtitleColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={subtitleColorHover}
                        onChangeColor={(value) => setAttributes({ subtitleColorHover: value })}
                        defaultColor=''
                    />
                )}
                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={subtitleMarginUnits}
                    onChangeUnits={(value) => setAttributes({ subtitleMarginUnits: value })}
                    desktopSpacing={subtitleDesktopMargin} 
                    onChangeDesktopSpacing={(value) => setAttributes({ subtitleDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ subtitleDesktopMarginCssStyle: value })}
                    tabletSpacing={subtitleTabletMargin} 
                    onChangeTabletSpacing={(value) => setAttributes({ subtitleTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ subtitleTabletMarginCssStyle: value })}
                    mobileSpacing={subtitleMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ subtitleMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ subtitleMobileMarginCssStyle: value })}
                    isLinked={subtitleMarginLink}
                    onChangeLink={(value) => setAttributes({ subtitleMarginLink: value })} 
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={subtitlePaddingUnits}
                    onChangeUnits={(value) => setAttributes({ subtitlePaddingUnits: value })}
                    desktopSpacing={subtitleDesktopPadding} 
                    onChangeDesktopSpacing={(value) => setAttributes({ subtitleDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ subtitleDesktopPaddingCssStyle: value })}
                    tabletSpacing={subtitleTabletPadding} 
                    onChangeTabletSpacing={(value) => setAttributes({ subtitleTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ subtitleTabletPaddingCssStyle: value })}
                    mobileSpacing={subtitleMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ subtitleMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ subtitleMobilePaddingCssStyle: value })}
                    isLinked={subtitlePaddingLink}
                    onChangeLink={(value) => setAttributes({ subtitlePaddingLink: value })} 
                />
            </PanelBody>

            <PanelBody 
                title={__("Title", "gslider-blocks")}  
                opened={openPanels.styles === "title"}
                onToggle={() => togglePanel("styles", "title")}
            >
                <ResponsiveTypographyControl 
                    fontFamily={titleFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ titleFontFamily: value })}
                    
                    fontSize={titleFontSize}
                    onChangeFontSize={(value) => setAttributes({ titleFontSize: value })}
                    
                    fontSizeUnits={titleFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ titleFontSizeUnits: value })}
                    
                    fontWeight={titleFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ titleFontWeight: value })}
                    
                    fontStyle={titleFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ titleFontStyle: value })}
                    
                    textTransform={titleTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ titleTextTransform: value })}
                    
                    textDecoration={titleTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ titleTextDecoration: value })}
                    
                    lineHeight={titleLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ titleLineHeight: value })}
                    
                    lineHeightUnits={titleLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ titleLineHeightUnits: value })}

                    letterSpacing={titleLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ titleLetterSpacing: value })}
                    
                    letterSpacingUnits={titleLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ titleLetterSpacingUnits: value })}

                    wordSpacing={titleWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ titleWordSpacing: value })}
                    
                    wordSpacingUnits={titleWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ titleWordSpacingUnits: value })}
                    
                    deviceType={deviceType}
                />
                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    globalSwitcher={titleColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ titleColorSwitcher: value })}
                />

                {titleColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={titleColor}
                        onChangeColor={(value) => setAttributes({ titleColor: value })}
                        defaultColor=''
                    />
                )}

                {titleColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={titleColorHover}
                        onChangeColor={(value) => setAttributes({ titleColorHover: value })}
                        defaultColor=''
                    />
                )}
                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={titleMarginUnits}
                    onChangeUnits={(value) => setAttributes({ titleMarginUnits: value })}
                    desktopSpacing={titleDesktopMargin} 
                    onChangeDesktopSpacing={(value) => setAttributes({ titleDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ titleDesktopMarginCssStyle: value })}
                    tabletSpacing={titleTabletMargin} 
                    onChangeTabletSpacing={(value) => setAttributes({ titleTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ titleTabletMarginCssStyle: value })}
                    mobileSpacing={titleMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ titleMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ titleMobileMarginCssStyle: value })}
                    isLinked={titleMarginLink}
                    onChangeLink={(value) => setAttributes({ titleMarginLink: value })} 
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={titlePaddingUnits}
                    onChangeUnits={(value) => setAttributes({ titlePaddingUnits: value })}
                    desktopSpacing={titleDesktopPadding} 
                    onChangeDesktopSpacing={(value) => setAttributes({ titleDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ titleDesktopPaddingCssStyle: value })}
                    tabletSpacing={titleTabletPadding} 
                    onChangeTabletSpacing={(value) => setAttributes({ titleTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ titleTabletPaddingCssStyle: value })}
                    mobileSpacing={titleMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ titleMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ titleMobilePaddingCssStyle: value })}
                    isLinked={titlePaddingLink}
                    onChangeLink={(value) => setAttributes({ titlePaddingLink: value })} 
                />
            </PanelBody>

            <PanelBody 
                title={__("Description", "gslider-blocks")}  
                opened={openPanels.styles === "description"}
                onToggle={() => togglePanel("styles", "description")}
            >
                <ResponsiveTypographyControl 
                    fontFamily={descriptionFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ descriptionFontFamily: value })}
                    
                    fontSize={descriptionFontSize}
                    onChangeFontSize={(value) => setAttributes({ descriptionFontSize: value })}
                    
                    fontSizeUnits={descriptionFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ descriptionFontSizeUnits: value })}
                    
                    fontWeight={descriptionFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ descriptionFontWeight: value })}
                    
                    fontStyle={descriptionFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ descriptionFontStyle: value })}
                    
                    textTransform={descriptionTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ descriptionTextTransform: value })}
                    
                    textDecoration={descriptionTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ descriptionTextDecoration: value })}
                    
                    lineHeight={descriptionLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ titleLineHeight: value })}
                    
                    lineHeightUnits={descriptionLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ descriptionLineHeightUnits: value })}

                    letterSpacing={descriptionLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ descriptionLetterSpacing: value })}
                    
                    letterSpacingUnits={descriptionLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ descriptionLetterSpacingUnits: value })}

                    wordSpacing={descriptionWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ descriptionWordSpacing: value })}
                    
                    wordSpacingUnits={descriptionWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ descriptionWordSpacingUnits: value })}
                    
                    deviceType={deviceType}
                />
                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    globalSwitcher={descriptionColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ descriptionColorSwitcher: value })}
                />

                {descriptionColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={descriptionColor}
                        onChangeColor={(value) => setAttributes({ descriptionColor: value })}
                        defaultColor=''
                    />
                )}

                {descriptionColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={descriptionColorHover}
                        onChangeColor={(value) => setAttributes({ descriptionColorHover: value })}
                        defaultColor=''
                    />
                )}
                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={descriptionMarginUnits}
                    onChangeUnits={(value) => setAttributes({ descriptionMarginUnits: value })}
                    desktopSpacing={descriptionDesktopMargin} 
                    onChangeDesktopSpacing={(value) => setAttributes({ descriptionDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ descriptionDesktopMarginCssStyle: value })}
                    tabletSpacing={descriptionTabletMargin} 
                    onChangeTabletSpacing={(value) => setAttributes({ descriptionTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ descriptionTabletMarginCssStyle: value })}
                    mobileSpacing={descriptionMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ descriptionMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ descriptionMobileMarginCssStyle: value })}
                    isLinked={descriptionMarginLink}
                    onChangeLink={(value) => setAttributes({ descriptionMarginLink: value })} 
                />
                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={descriptionPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ descriptionPaddingUnits: value })}
                    desktopSpacing={descriptionDesktopPadding} 
                    onChangeDesktopSpacing={(value) => setAttributes({ descriptionDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ descriptionDesktopPaddingCssStyle: value })}
                    tabletSpacing={descriptionTabletPadding} 
                    onChangeTabletSpacing={(value) => setAttributes({ descriptionTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ descriptionTabletPaddingCssStyle: value })}
                    mobileSpacing={descriptionMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ descriptionMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ descriptionMobilePaddingCssStyle: value })}
                    isLinked={descriptionPaddingLink}
                    onChangeLink={(value) => setAttributes({ descriptionPaddingLink: value })} 
                />
            </PanelBody>

            <PanelBody 
                title={__("Primary Button", "gslider-blocks")}  
                opened={openPanels.styles === "primary-button"}
                onToggle={() => togglePanel("styles", "primary-button")}
            >
                <ResponsiveTypographyControl 
                    fontFamily={primaryButtonFontFamily}
                    onChangeFontFamily={(value) => setAttributes({ primaryButtonFontFamily: value })}
                    
                    fontSize={primaryButtonFontSize}
                    onChangeFontSize={(value) => setAttributes({ primaryButtonFontSize: value })}
                    
                    fontSizeUnits={primaryButtonFontSizeUnits}
                    onChangeFontSizeUnit={(value) => setAttributes({ primaryButtonFontSizeUnits: value })}
                    
                    fontWeight={primaryButtonFontWeight}
                    onChangeFontWeight={(value) => setAttributes({ primaryButtonFontWeight: value })}
                    
                    fontStyle={primaryButtonFontStyle}
                    onChangeFontStyle={(value) => setAttributes({ primaryButtonFontStyle: value })}
                    
                    textTransform={primaryButtonTextTransform}
                    onChangeTextTransform={(value) => setAttributes({ primaryButtonTextTransform: value })}
                    
                    textDecoration={primaryButtonTextDecoration}
                    onChangeTextDecoration={(value) => setAttributes({ primaryButtonTextDecoration: value })}
                    
                    lineHeight={primaryButtonLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ primaryButtonLineHeight: value })}
                    
                    lineHeightUnits={primaryButtonLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ primaryButtonLineHeightUnits: value })}

                    letterSpacing={primaryButtonLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ primaryButtonLetterSpacing: value })}
                    
                    letterSpacingUnits={primaryButtonLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ primaryButtonLetterSpacingUnits: value })}

                    wordSpacing={primaryButtonWordSpacing}
                    onChangeWordSpacing={(value) => setAttributes({ primaryButtonWordSpacing: value })}
                    
                    wordSpacingUnits={primaryButtonWordSpacingUnits}
                    onChangeWordSpacingUnit={(value) => setAttributes({ primaryButtonWordSpacingUnits: value })}
                    
                    deviceType={deviceType}
                />
                <SwitcherControl
                    label={__("Color", "gslider-blocks")}
                    globalSwitcher={primaryButtonColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ primaryButtonColorSwitcher: value })}
                />

                {primaryButtonColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={primaryButtonColor}
                        onChangeColor={(value) => setAttributes({ primaryButtonColor: value })}
                        defaultColor=''
                    />
                )}

                {primaryButtonColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={primaryButtonColorHover}
                        onChangeColor={(value) => setAttributes({ primaryButtonColorHover: value })}
                        defaultColor=''
                    />
                )}

                <BackgroundControl 
                    label={__("Background Color", "gslider-blocks")}
                            
                    normalBackgroundType={primaryButtonNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ primaryButtonNormalBackgroundType: value })}
                    normalClassicColor={primaryButtonNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ primaryButtonNormalClassicColor: value })}
                    normalGradientColor={primaryButtonNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ primaryButtonNormalGradientColor: value })}
                    normalCustomGradientSwitcher={primaryButtonNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ primaryButtonNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={primaryButtonNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ primaryButtonNormalCustomGradientInputValue: value })}
                    normalClassicDefaultColor={'#d2d2d2c7'}

                    hoverBackgroundType={primaryButtonHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ primaryButtonHoverBackgroundType: value })}
                    hoverClassicColor={primaryButtonHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ primaryButtonHoverClassicColor: value })}
                    hoverGradientColor={primaryButtonHoverGradientColor} 
                    setHoverGradientColor={(value) => setAttributes({ primaryButtonHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={primaryButtonHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ primaryButtonHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={primaryButtonHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ primaryButtonHoverCustomGradientInputValue: value })}
                    hoverClassicDefaultColor={'#787878b8'}
                    isBackgroundImage={false}
                />

                <SelectControls
                    label={__("Border Style", "gslider-blocks")}
                    value={primaryButtonBorder}
                    options={BORDER_STYLES}
                    onChange={(value) => setAttributes({ primaryButtonBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    globalSwitcher={primaryButtonBorderColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ primaryButtonBorderColorSwitcher: value })}
                />

                {primaryButtonBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={primaryButtonBorderColor}
                        onChangeColor={(value) => setAttributes({ primaryButtonBorderColor: value })}
                    />
                )}

                {primaryButtonBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={primaryButtonBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ primaryButtonBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border Width", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={primaryButtonBorderUnits}
                    onChangeUnits={(value) => setAttributes({ primaryButtonBorderUnits: value })}
                    desktopSpacing={primaryButtonDesktopBorder} 
                    onChangeDesktopSpacing={(value) => setAttributes({ primaryButtonDesktopBorder: value })}
                    desktopSpacingStyle={(value) => setAttributes({ primaryButtonDesktopBorderCssStyle: value })}
                    tabletSpacing={primaryButtonTabletBorder} 
                    onChangeTabletSpacing={(value) => setAttributes({ primaryButtonTabletBorder: value })}
                    tabletSpacingStyle={(value) => setAttributes({ primaryButtonTabletBorderCssStyle: value })}
                    mobileSpacing={primaryButtonMobileBorder}
                    onChangeMobileSpacing={(value) => setAttributes({ primaryButtonMobileBorder: value })}
                    mobileSpacingStyle={(value) => setAttributes({ primaryButtonMobileBorderCssStyle: value })}
                    isLinked={primaryButtonBorderLink}
                    onChangeLink={(value) => setAttributes({ primaryButtonBorderLink: value })} 
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={primaryButtonBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ primaryButtonBorderRadiusUnits: value })}
                    desktopSpacing={primaryButtonDesktopBorderRadius}
                    onChangeDesktopSpacing={(value) => setAttributes({ primaryButtonDesktopBorderRadius: value })}
                    desktopSpacingStyle={(value) => setAttributes({ primaryButtonDesktopBorderRadiusCssStyle: value })}
                    tabletSpacing={primaryButtonTabletBorderRadius}
                    onChangeTabletSpacing={(value) => setAttributes({ primaryButtonTabletBorderRadius: value })}
                    tabletSpacingStyle={(value) => setAttributes({ primaryButtonTabletBorderRadiusCssStyle: value })}
                    mobileSpacing={primaryButtonMobileBorderRadius}
                    onChangeMobileSpacing={(value) => setAttributes({ primaryButtonMobileBorderRadius: value })}
                    mobileSpacingStyle={(value) => setAttributes({ primaryButtonMobileBorderRadiusCssStyle: value })}
                    isLinked={primaryButtonBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ primaryButtonBorderRadiusLink: value })} 
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    globalSwitcher={primaryButtonBoxShadowValuesSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ primaryButtonBoxShadowValuesSwitcher: value })}
                />

                {primaryButtonBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ primaryButtonBoxShadowValues: value })}
                        initialShadowValue={primaryButtonBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ primaryButtonBoxShadowCssValue: value })}
                    />
                )}

                {primaryButtonBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ primaryButtonBoxShadowHoverValues: value })}
                        initialShadowValue={primaryButtonBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ primaryButtonBoxShadowHoverCssValue: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={primaryButtonMarginUnits}
                    onChangeUnits={(value) => setAttributes({ primaryButtonMarginUnits: value })}
                    desktopSpacing={primaryButtonDesktopMargin} 
                    onChangeDesktopSpacing={(value) => setAttributes({ primaryButtonDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ primaryButtonDesktopMarginCssStyle: value })}
                    tabletSpacing={primaryButtonTabletMargin} 
                    onChangeTabletSpacing={(value) => setAttributes({ primaryButtonTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ primaryButtonTabletMarginCssStyle: value })}
                    mobileSpacing={primaryButtonMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ primaryButtonMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ primaryButtonMobileMarginCssStyle: value })}
                    isLinked={primaryButtonMarginLink}
                    onChangeLink={(value) => setAttributes({ primaryButtonMarginLink: value })} 
                />

                <ResponsiveSpacingControl
                    label={__("Padding", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={primaryButtonPaddingUnits}
                    onChangeUnits={(value) => setAttributes({ primaryButtonPaddingUnits: value })}
                    desktopSpacing={primaryButtonDesktopPadding} 
                    onChangeDesktopSpacing={(value) => setAttributes({ primaryButtonDesktopPadding: value })}
                    desktopSpacingStyle={(value) => setAttributes({ primaryButtonDesktopPaddingCssStyle: value })}
                    tabletSpacing={primaryButtonTabletPadding} 
                    onChangeTabletSpacing={(value) => setAttributes({ primaryButtonTabletPadding: value })}
                    tabletSpacingStyle={(value) => setAttributes({ primaryButtonTabletPaddingCssStyle: value })}
                    mobileSpacing={primaryButtonMobilePadding}
                    onChangeMobileSpacing={(value) => setAttributes({ primaryButtonMobilePadding: value })}
                    mobileSpacingStyle={(value) => setAttributes({ primaryButtonMobilePaddingCssStyle: value })}
                    isLinked={primaryButtonPaddingLink}
                    onChangeLink={(value) => setAttributes({ primaryButtonPaddingLink: value })} 
                />
            </PanelBody>

            {showSecondarybtnStyle && (
                <PanelBody 
                    title={__("Secondary Button", "gslider-blocks")}  
                    opened={openPanels.styles === "secondary-button"}
                    onToggle={() => togglePanel("styles", "secondary-button")}
                >
                    <ResponsiveTypographyControl 
                        fontFamily={secondaryButtonFontFamily}
                        onChangeFontFamily={(value) => setAttributes({ secondaryButtonFontFamily: value })}
                        
                        fontSize={secondaryButtonFontSize}
                        onChangeFontSize={(value) => setAttributes({ secondaryButtonFontSize: value })}
                        
                        fontSizeUnits={secondaryButtonFontSizeUnits}
                        onChangeFontSizeUnit={(value) => setAttributes({ secondaryButtonFontSizeUnits: value })}
                        
                        fontWeight={secondaryButtonFontWeight}
                        onChangeFontWeight={(value) => setAttributes({ secondaryButtonFontWeight: value })}
                        
                        fontStyle={secondaryButtonFontStyle}
                        onChangeFontStyle={(value) => setAttributes({ secondaryButtonFontStyle: value })}
                        
                        textTransform={secondaryButtonTextTransform}
                        onChangeTextTransform={(value) => setAttributes({ secondaryButtonTextTransform: value })}
                        
                        textDecoration={secondaryButtonTextDecoration}
                        onChangeTextDecoration={(value) => setAttributes({ secondaryButtonTextDecoration: value })}
                        
                        lineHeight={secondaryButtonLineHeight}
                        onChangeLineHeight={(value) => setAttributes({ secondaryButtonLineHeight: value })}
                        
                        lineHeightUnits={secondaryButtonLineHeightUnits}
                        onChangeLineHeightUnit={(value) => setAttributes({ secondaryButtonLineHeightUnits: value })}

                        letterSpacing={secondaryButtonLetterSpacing}
                        onChangeLetterSpacing={(value) => setAttributes({ secondaryButtonLetterSpacing: value })}
                        
                        letterSpacingUnits={secondaryButtonLetterSpacingUnits}
                        onChangeLetterSpacingUnit={(value) => setAttributes({ secondaryButtonLetterSpacingUnits: value })}

                        wordSpacing={secondaryButtonWordSpacing}
                        onChangeWordSpacing={(value) => setAttributes({ secondaryButtonWordSpacing: value })}
                        
                        wordSpacingUnits={secondaryButtonWordSpacingUnits}
                        onChangeWordSpacingUnit={(value) => setAttributes({ secondaryButtonWordSpacingUnits: value })}
                        
                        deviceType={deviceType}
                    />
                    <SwitcherControl
                        label={__("Color", "gslider-blocks")}
                        globalSwitcher={secondaryButtonColorSwitcher}
                        setGlobalSwitcher={(value) => setAttributes({ secondaryButtonColorSwitcher: value })}
                    />

                    {secondaryButtonColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={secondaryButtonColor}
                            onChangeColor={(value) => setAttributes({ secondaryButtonColor: value })}
                            defaultColor=''
                        />
                    )}

                    {secondaryButtonColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={secondaryButtonColorHover}
                            onChangeColor={(value) => setAttributes({ secondaryButtonColorHover: value })}
                            defaultColor=''
                        />
                    )}

                    <BackgroundControl 
                        label={__("Background Color", "gslider-blocks")}
                                
                        normalBackgroundType={secondaryButtonNormalBackgroundType}
                        setNormalBackgroundType={(value) => setAttributes({ secondaryButtonNormalBackgroundType: value })}
                        normalClassicColor={secondaryButtonNormalClassicColor}
                        setNormalClassicColor={(value) => setAttributes({ secondaryButtonNormalClassicColor: value })}
                        normalGradientColor={secondaryButtonNormalGradientColor}
                        setNormalGradientColor={(value) => setAttributes({ secondaryButtonNormalGradientColor: value })}
                        normalCustomGradientSwitcher={secondaryButtonNormalCustomGradientSwitcher}
                        setNormalCustomGradientSwitcher={(value) => setAttributes({ secondaryButtonNormalCustomGradientSwitcher: value })}
                        normalCustomGradientInputValue={secondaryButtonNormalCustomGradientInputValue}
                        setNormalCustomGradientInputValue={(value) => setAttributes({ secondaryButtonNormalCustomGradientInputValue: value })}
                        normalClassicDefaultColor={'#d2d2d2c7'}

                        hoverBackgroundType={secondaryButtonHoverBackgroundType} 
                        setHoverBackgroundType={(value) => setAttributes({ secondaryButtonHoverBackgroundType: value })}
                        hoverClassicColor={secondaryButtonHoverClassicColor}
                        setHoverClassicColor={(value) => setAttributes({ secondaryButtonHoverClassicColor: value })}
                        hoverGradientColor={secondaryButtonHoverGradientColor} 
                        setHoverGradientColor={(value) => setAttributes({ secondaryButtonHoverGradientColor: value })}
                        hoverCustomGradientSwitcher={secondaryButtonHoverCustomGradientSwitcher}
                        setHoverCustomGradientSwitcher={(value) => setAttributes({ secondaryButtonHoverCustomGradientSwitcher: value })}
                        hoverCustomGradientInputValue={secondaryButtonHoverCustomGradientInputValue}
                        setHoverCustomGradientInputValue={(value) => setAttributes({ secondaryButtonHoverCustomGradientInputValue: value })}
                        hoverClassicDefaultColor={'#787878b8'}
                        isBackgroundImage={false}
                    />

                    <SelectControls
                        label={__("Border Style", "gslider-blocks")}
                        value={secondaryButtonBorder}
                        options={BORDER_STYLES}
                        onChange={(value) => setAttributes({ secondaryButtonBorder: value })}
                    />

                    <SwitcherControl
                        label={__("Border Color", "gslider-blocks")}
                        globalSwitcher={secondaryButtonBorderColorSwitcher}
                        setGlobalSwitcher={(value) => setAttributes({ secondaryButtonBorderColorSwitcher: value })}
                    />

                    {secondaryButtonBorderColorSwitcher === 'normal' && (
                        <ColorControl
                            label={__("Normal Color", "gslider-blocks")}
                            color={secondaryButtonBorderColor}
                            onChangeColor={(value) => setAttributes({ secondaryButtonBorderColor: value })}
                        />
                    )}

                    {secondaryButtonBorderColorSwitcher === 'hover' && (
                        <ColorControl
                            label={__("Hover Color", "gslider-blocks")}
                            color={secondaryButtonBorderHoverColor}
                            onChangeColor={(value) => setAttributes({ secondaryButtonBorderHoverColor: value })}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Border Width", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={secondaryButtonBorderUnits}
                        onChangeUnits={(value) => setAttributes({ secondaryButtonBorderUnits: value })}
                        desktopSpacing={secondaryButtonDesktopBorder} 
                        onChangeDesktopSpacing={(value) => setAttributes({ secondaryButtonDesktopBorder: value })}
                        desktopSpacingStyle={(value) => setAttributes({ secondaryButtonDesktopBorderCssStyle: value })}
                        tabletSpacing={secondaryButtonTabletBorder} 
                        onChangeTabletSpacing={(value) => setAttributes({ secondaryButtonTabletBorder: value })}
                        tabletSpacingStyle={(value) => setAttributes({ secondaryButtonTabletBorderCssStyle: value })}
                        mobileSpacing={secondaryButtonMobileBorder}
                        onChangeMobileSpacing={(value) => setAttributes({ secondaryButtonMobileBorder: value })}
                        mobileSpacingStyle={(value) => setAttributes({ secondaryButtonMobileBorderCssStyle: value })}
                        isLinked={secondaryButtonBorderLink}
                        onChangeLink={(value) => setAttributes({ secondaryButtonBorderLink: value })} 
                    />

                    <ResponsiveSpacingControl
                        label={__("Border Radius", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={secondaryButtonBorderRadiusUnits}
                        onChangeUnits={(value) => setAttributes({ secondaryButtonBorderRadiusUnits: value })}
                        desktopSpacing={secondaryButtonDesktopBorderRadius}
                        onChangeDesktopSpacing={(value) => setAttributes({ secondaryButtonDesktopBorderRadius: value })}
                        desktopSpacingStyle={(value) => setAttributes({ secondaryButtonDesktopBorderRadiusCssStyle: value })}
                        tabletSpacing={secondaryButtonTabletBorderRadius}
                        onChangeTabletSpacing={(value) => setAttributes({ secondaryButtonTabletBorderRadius: value })}
                        tabletSpacingStyle={(value) => setAttributes({ secondaryButtonTabletBorderRadiusCssStyle: value })}
                        mobileSpacing={secondaryButtonMobileBorderRadius}
                        onChangeMobileSpacing={(value) => setAttributes({ secondaryButtonMobileBorderRadius: value })}
                        mobileSpacingStyle={(value) => setAttributes({ secondaryButtonMobileBorderRadiusCssStyle: value })}
                        isLinked={secondaryButtonBorderRadiusLink}
                        onChangeLink={(value) => setAttributes({ secondaryButtonBorderRadiusLink: value })} 
                    />

                    <SwitcherControl
                        label={__("Box Shadow", "gslider-blocks")}
                        globalSwitcher={secondaryButtonBoxShadowValuesSwitcher}
                        setGlobalSwitcher={(value) => setAttributes({ secondaryButtonBoxShadowValuesSwitcher: value })}
                    />

                    {secondaryButtonBoxShadowValuesSwitcher === 'normal' && (
                        <BoxShadowSettingsControl
                            label={__("Normal Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ secondaryButtonBoxShadowValues: value })}
                            initialShadowValue={secondaryButtonBoxShadowValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ secondaryButtonBoxShadowCssValue: value })}
                        />
                    )}

                    {secondaryButtonBoxShadowValuesSwitcher === 'hover' && (
                        <BoxShadowSettingsControl
                            label={__("Hover Shadow", "gslider-blocks")}
                            onBoxShadowChange={(value) => setAttributes({ secondaryButtonBoxShadowHoverValues: value })}
                            initialShadowValue={secondaryButtonBoxShadowHoverValues}
                            onBoxShadowStyleChange={(value) => setAttributes({ secondaryButtonBoxShadowHoverCssValue: value })}
                        />
                    )}

                    <ResponsiveSpacingControl
                        label={__("Margin", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={secondaryButtonMarginUnits}
                        onChangeUnits={(value) => setAttributes({ secondaryButtonMarginUnits: value })}
                        desktopSpacing={secondaryButtonDesktopMargin} 
                        onChangeDesktopSpacing={(value) => setAttributes({ secondaryButtonDesktopMargin: value })}
                        desktopSpacingStyle={(value) => setAttributes({ secondaryButtonDesktopMarginCssStyle: value })}
                        tabletSpacing={secondaryButtonTabletMargin} 
                        onChangeTabletSpacing={(value) => setAttributes({ secondaryButtonTabletMargin: value })}
                        tabletSpacingStyle={(value) => setAttributes({ secondaryButtonTabletMarginCssStyle: value })}
                        mobileSpacing={secondaryButtonMobileMargin}
                        onChangeMobileSpacing={(value) => setAttributes({ secondaryButtonMobileMargin: value })}
                        mobileSpacingStyle={(value) => setAttributes({ secondaryButtonMobileMarginCssStyle: value })}
                        isLinked={secondaryButtonMarginLink}
                        onChangeLink={(value) => setAttributes({ secondaryButtonMarginLink: value })} 
                    />

                    <ResponsiveSpacingControl
                        label={__("Padding", "gslider-blocks")}
                        deviceType={deviceType}
                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                        units={secondaryButtonPaddingUnits}
                        onChangeUnits={(value) => setAttributes({ secondaryButtonPaddingUnits: value })}
                        desktopSpacing={secondaryButtonDesktopPadding} 
                        onChangeDesktopSpacing={(value) => setAttributes({ secondaryButtonDesktopPadding: value })}
                        desktopSpacingStyle={(value) => setAttributes({ secondaryButtonDesktopPaddingCssStyle: value })}
                        tabletSpacing={secondaryButtonTabletPadding} 
                        onChangeTabletSpacing={(value) => setAttributes({ secondaryButtonTabletPadding: value })}
                        tabletSpacingStyle={(value) => setAttributes({ secondaryButtonTabletPaddingCssStyle: value })}
                        mobileSpacing={secondaryButtonMobilePadding}
                        onChangeMobileSpacing={(value) => setAttributes({ secondaryButtonMobilePadding: value })}
                        mobileSpacingStyle={(value) => setAttributes({ secondaryButtonMobilePaddingCssStyle: value })}
                        isLinked={secondaryButtonPaddingLink}
                        onChangeLink={(value) => setAttributes({ secondaryButtonPaddingLink: value })} 
                    />
                </PanelBody>
            )}

            <PanelBody 
                title={__("Navigation", "gslider-blocks")}  
                opened={openPanels.styles === "navigation"}
                onToggle={() => togglePanel("styles", "navigation")}
            >
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Icon Size", "gslider-blocks")}
                    rangeValue={navigationArrowSize}
                    onChangeValue={(value) => setAttributes({ navigationArrowSize: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowSizeUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowSizeUnits}
                    step={1}
                    resetFallbackValue={"16"}
                />

                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Width", "gslider-blocks")}
                    rangeValue={navigationArrowWidth}
                    onChangeValue={(value) => setAttributes({ navigationArrowWidth: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowWidthUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowWidthUnits}
                    step={1}
                    resetFallbackValue={"46"}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Height", "gslider-blocks")}
                    rangeValue={navigationArrowHeight}
                    onChangeValue={(value) => setAttributes({ navigationArrowHeight: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowHeightUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowHeightUnits}
                    step={1}
                    resetFallbackValue={"46"}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Position", "gslider-blocks")}
                    rangeValue={navigationArrowPosition}
                    onChangeValue={(value) => setAttributes({ navigationArrowPosition: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowPositionUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowPositionUnits}
                    step={1}
                    resetFallbackValue={"50"}
                />

                <ResponsiveRangeControl
                    min={-100}
                    max={100}
                    label={__("Left", "gslider-blocks")}
                    rangeValue={navigationArrowLeftOffset}
                    onChangeValue={(value) => setAttributes({ navigationArrowLeftOffset: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowLeftOffsetUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowLeftOffsetUnits}
                    step={1}
                    resetFallbackValue={"-20"}
                />

                <ResponsiveRangeControl
                    min={-100}
                    max={100}
                    label={__("Right", "gslider-blocks")}
                    rangeValue={navigationArrowRightOffset}
                    onChangeValue={(value) => setAttributes({ navigationArrowRightOffset: value })}
                    onUnitChange={(value) => setAttributes({ navigationArrowRightOffsetUnits: value })}
                    deviceType={deviceType}
                    units={navigationArrowRightOffsetUnits}
                    step={1}
                    resetFallbackValue={"-20"}
                />

                <SwitcherControl
                    label={__("Icon Color", "gslider-blocks")}
                    globalSwitcher={navigationArrowColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ navigationArrowColorSwitcher: value })}
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
                    value={navigationArrowBorder}
                    options={BORDER_STYLES}
                    onChange={(value) => setAttributes({ navigationArrowBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    globalSwitcher={navigationArrowBorderColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ navigationArrowBorderColorSwitcher: value })}
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
                    globalSwitcher={navigationArrowBoxShadowValuesSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ navigationArrowBoxShadowValuesSwitcher: value })}
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

            <PanelBody 
                title={__("Pagination", "gslider-blocks")}  
                opened={openPanels.styles === "pagination"}
                onToggle={() => togglePanel("styles", "pagination")}
            >

                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Position", "gslider-blocks")}
                    rangeValue={paginationDotsPosition}
                    onChangeValue={(value) => setAttributes({ paginationDotsPosition: value })}
                    onUnitChange={(value) => setAttributes({ paginationDotsPositionUnits: value })}
                    deviceType={deviceType}
                    units={paginationDotsPositionUnits}
                    step={1}
                    resetFallbackValue={""}
                />

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
                        <BaseControl>
                            <ButtonGroup className="gslider-setting-switcher-panel-btn">
                                {NORMAL_ACTIVE.map((item, key) => (
                                    <Button
                                key={key}
                                        onClick={() => setAttributes({ paginationDotsSwitcher: item.value })} 
                                        className={`gslider-setting-switcher-panel-btn-switcher ${paginationDotsSwitcher === item.value ? 'active' : ''}`}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {paginationDotsSwitcher === 'normal' && (
                            <>
                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Width", "gslider-blocks")}
                                    rangeValue={paginationNormalDotsWidth}
                                    onChangeValue={(value) => setAttributes({ paginationNormalDotsWidth: value })}
                                    onUnitChange={(value) => setAttributes({ paginationNormalDotsWidthUnits: value })}
                                    deviceType={deviceType}
                                    units={paginationNormalDotsWidthUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Height", "gslider-blocks")}
                                    rangeValue={paginationNormalDotsHeight}
                                    onChangeValue={(value) => setAttributes({ paginationNormalDotsHeight: value })}
                                    onUnitChange={(value) => setAttributes({ paginationNormalDotsHeightUnits: value })}
                                    deviceType={deviceType}
                                    units={paginationNormalDotsHeightUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ColorControl
                                    label={__("Color", "gslider-blocks")}
                                    color={paginationNormalDotsBgColor}
                                    onChangeColor={(value) => setAttributes({ paginationNormalDotsBgColor: value })}
                                    defaultColor='#333333'
                                />

                                <SelectControls
                                    label={__("Border Style", "gslider-blocks")}
                                    value={paginationNormalDotsBorder}
                                    options={BORDER_STYLES}
                                    onChange={(value) => setAttributes({ paginationNormalDotsBorder: value })}
                                />

                                <SwitcherControl
                                    label={__("Border Color", "gslider-blocks")}
                                    globalSwitcher={paginationNormalDotsBorderColorSwitcher}
                                    setGlobalSwitcher={(value) => setAttributes({ paginationNormalDotsBorderColorSwitcher: value })}
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
                                    min={0}
                                    max={100}
                                    label={__("Width", "gslider-blocks")}
                                    rangeValue={paginationActiveDotsWidth}
                                    onChangeValue={(value) => setAttributes({ paginationActiveDotsWidth: value })}
                                    onUnitChange={(value) => setAttributes({ paginationActiveDotsWidthUnits: value })}
                                    deviceType={deviceType}
                                    units={paginationActiveDotsWidthUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Height", "gslider-blocks")}
                                    rangeValue={paginationActiveDotsHeight}
                                    onChangeValue={(value) => setAttributes({ paginationActiveDotsHeight: value })}
                                    onUnitChange={(value) => setAttributes({ paginationActiveDotsHeightUnits: value })}
                                    deviceType={deviceType}
                                    units={paginationActiveDotsHeightUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ColorControl
                                    label={__("Color", "gslider-blocks")}
                                    color={paginationActiveDotsBgColor}
                                    onChangeColor={(value) => setAttributes({ paginationActiveDotsBgColor: value })}
                                />

                                <SelectControls
                                    label={__("Border Style", "gslider-blocks")}
                                    value={paginationActiveDotsBorder}
                                    options={BORDER_STYLES}
                                    onChange={(value) => setAttributes({ paginationActiveDotsBorder: value })}
                                />

                                <SwitcherControl
                                    label={__("Border Color", "gslider-blocks")}
                                    globalSwitcher={paginationActiveDotsBorderColorSwitcher}
                                    setGlobalSwitcher={(value) => setAttributes({ paginationActiveDotsBorderColorSwitcher: value })}
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
            </PanelBody>
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
                    min={0}
                    max={10000000}
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
                    value={globalBorder}
                    options={BORDER_STYLES}
                    onChange={(value) => setAttributes({ globalBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    globalSwitcher={globalBorderColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ globalBorderColorSwitcher: value })}
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
                    globalSwitcher={globalBoxShadowValuesSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ globalBoxShadowValuesSwitcher: value })}
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


    /** Start Slider Item Color Style */
    const sliderItemColorStyle = useMemo(() => {
        let style = '';
        sliderItems.forEach(item => {
            const normalItemBackgroundType = item.normalItemBackgroundType;
            const normalItemGradientColor = item.normalItemGradientColor || item.normalItemClassicColor;
            
            if (normalItemBackgroundType === 'gradient') {
                const gradientValue = item.normalItemCustomGradientSwitcher && item.normalItemCustomGradientInputValue 
                    ? item.normalItemCustomGradientInputValue 
                    : normalItemGradientColor;
                
                if (gradientValue) {
                    const gradientStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                        background: ${gradientValue};
                        transition: all .3s ease-in-out;
                    }`;
                    style += gradientStyle;
                }
            } else if (item.normalBackgroundImageUrl.Desktop) {
                let backgroundImageStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                    background-image: url(${item.normalBackgroundImageUrl.Desktop});`;
                
                if (item.normalBackgroundImagePosition.Desktop) {
                    const backgroundPosition = `${item.normalBackgroundImagePosition.Desktop.x * 100}% ${item.normalBackgroundImagePosition.Desktop.y * 100}%`;
                    backgroundImageStyle += `
                    background-position: ${backgroundPosition};`;
                }
                
                if (item.normalBackgroundImageAttachment.Desktop) {
                    backgroundImageStyle += `
                    background-attachment: ${item.normalBackgroundImageAttachment.Desktop};`;
                }
                
                if (item.normalBackgroundImageRepeat.Desktop) {
                    backgroundImageStyle += `
                    background-repeat: ${item.normalBackgroundImageRepeat.Desktop};`;
                }
                
                if (item.normalBackgroundImageSize.Desktop) {
                    backgroundImageStyle += `
                    background-size: ${item.normalBackgroundImageSize.Desktop};`;
                }
                
                backgroundImageStyle += `
                    transition: all .3s ease-in-out;
                }`;
                style += backgroundImageStyle;
            } else if (item.normalItemClassicColor) {
                const classicStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                    background: ${item.normalItemClassicColor};
                    transition: all .3s ease-in-out;
                }`;
                style += classicStyle;
            }

            if (item.itemBackgroundOverlaySwitcher) {
                const overlayColor = item.itemBackgroundOverlayType === 'classic'
                    ? item.itemBackgroundOverlayClassicColor
                    : item.itemBackgroundOverlayGradientColor;
            
                const overlayGradient = item.itemBackgroundOverlayCustomGradientSwitcher && item.itemBackgroundOverlayCustomGradientInputValue
                    ? item.itemBackgroundOverlayCustomGradientInputValue
                    : overlayColor;
            
                const overlayStyle = `.${blockId} .gslider-content-wrapper.${item.id}::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: ${overlayGradient || 'transparent'};
                    opacity: ${item.itemBackgroundOverlayOpacity};
                    z-index: -1;
                    pointer-events: none;
                    transition: all .3s ease-in-out;
                }
                .${blockId} .gslider-content-wrapper.${item.id} {
                    position: relative;
                    z-index: 1;
                }`;
                style += overlayStyle;
            }

            // Tablet styles (max-width: 1024px)
            style += `
            @media only screen and (max-width: 1024px) {
                .${blockId} .gslider-content-wrapper.${item.id} {`;
            
            if (normalItemBackgroundType === 'gradient' && item.normalItemGradientColor) {
                style += `
                    background: ${item.normalItemGradientColor};`;
            } else if (item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop) {
                style += `
                    background-image: url(${item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop});`;
                if (item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop) {
                    style += `
                    background-size: ${item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop};`;
                }
                style += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
            } else if (item.normalItemClassicColor) {
                style += `
                    background: ${item.normalItemClassicColor};`;
            }
            style += `
                }
            }`;

            // Mobile styles (max-width: 767px)
            style += `
            @media only screen and (max-width: 767px) {
                .${blockId} .gslider-content-wrapper.${item.id} {`;
            
            if (normalItemBackgroundType === 'gradient' && item.normalItemGradientColor) {
                style += `
                    background: ${item.normalItemGradientColor};`;
            } else if (item.normalBackgroundImageUrl.Mobile || item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop) {
                style += `
                    background-image: url(${item.normalBackgroundImageUrl.Mobile || item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop});`;
                if (item.normalBackgroundImageSize.Mobile || item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop) {
                    style += `
                    background-size: ${item.normalBackgroundImageSize.Mobile || item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop};`;
                }
                style += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
            } else if (item.normalItemClassicColor) {
                style += `
                    background: ${item.normalItemClassicColor};`;
            }
            style += `
                }
            }`;
        });
        return style;
    }, [sliderItems, blockId, deviceType]);

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

        .${blockId} .swiper-wrapper {
            align-items: center;
        }

        .${blockId}.gslider-base-wrapper {
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
        }
        .${blockId}.gslider-base-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ''}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ''}
        }
        
        .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
            height: ${layoutHeight?.Desktop ? `${layoutHeight.Desktop}${layoutHeightUnits?.Desktop}` : 'clamp(300px, 60vh, 500px)'};
            ${contentVerticalAlignment?.Desktop ? `justify-content: ${contentVerticalAlignment.Desktop};` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${contentWidth?.Desktop ? `max-width: ${contentWidth.Desktop}${contentWidthUnits?.Desktop};` : ''}
            ${contentAlignment?.Desktop ? `text-align: ${contentAlignment.Desktop};` : ''}

            ${contentHorizontalAlignment?.Desktop === 'left' ? `margin-right: auto; margin-left: 0;` : ''}
            ${contentHorizontalAlignment?.Desktop === 'center' ? `margin-left: auto; margin-right: auto;` : ''}
            ${contentHorizontalAlignment?.Desktop === 'right' ? `margin-left: auto; margin-right: 0;` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
            ${subtitleFontFamily ? `font-family: ${subtitleFontFamily};` : ''}
            ${subtitleFontSize.Desktop && subtitleFontSizeUnits.Desktop ? `font-size: ${subtitleFontSize.Desktop}${subtitleFontSizeUnits.Desktop};` : ''}
            ${subtitleFontWeight ? `font-weight: ${subtitleFontWeight};` : ''}
            ${subtitleFontStyle ? `font-style: ${subtitleFontStyle};` : ''}
            ${subtitleTextTransform ? `text-transform: ${subtitleTextTransform};` : ''}
            ${subtitleTextDecoration ? `text-decoration: ${subtitleTextDecoration};` : ''}
            ${subtitleLineHeight.Desktop && subtitleLineHeightUnits.Desktop ? `line-height: ${subtitleLineHeight.Desktop}${subtitleLineHeightUnits.Desktop};` : ''}
            ${subtitleLetterSpacing.Desktop && subtitleLetterSpacingUnits.Desktop ? `letter-spacing: ${subtitleLetterSpacing.Desktop}${subtitleLetterSpacingUnits.Desktop};` : ''}
            ${subtitleWordSpacing.Desktop && subtitleWordSpacingUnits.Desktop ? `word-spacing: ${subtitleWordSpacing.Desktop}${subtitleWordSpacingUnits.Desktop};` : ''}
            ${subtitleColor ? `color: ${subtitleColor};` : ''}
            ${subtitleDesktopMarginCssStyle ? `margin: ${subtitleDesktopMarginCssStyle};` : ''} 
            ${subtitleDesktopPaddingCssStyle ? `padding: ${subtitleDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle:hover {
            ${subtitleColorHover ? `color: ${subtitleColorHover};` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
            ${titleFontFamily ? `font-family: ${titleFontFamily};` : ''}
            ${titleFontSize.Desktop && titleFontSizeUnits.Desktop ? `font-size: ${titleFontSize.Desktop}${titleFontSizeUnits.Desktop};` : ''}
            ${titleFontWeight ? `font-weight: ${titleFontWeight};` : ''}
            ${titleFontStyle ? `font-style: ${titleFontStyle};` : ''}
            ${titleTextTransform ? `text-transform: ${titleTextTransform};` : ''}
            ${titleTextDecoration ? `text-decoration: ${titleTextDecoration};` : ''}
            ${titleLineHeight.Desktop && titleLineHeightUnits.Desktop ? `line-height: ${titleLineHeight.Desktop}${titleLineHeightUnits.Desktop};` : ''}
            ${titleLetterSpacing.Desktop && titleLetterSpacingUnits.Desktop ? `letter-spacing: ${titleLetterSpacing.Desktop}${titleLetterSpacingUnits.Desktop};` : ''}
            ${titleWordSpacing.Desktop && titleWordSpacingUnits.Desktop ? `word-spacing: ${titleWordSpacing.Desktop}${titleWordSpacingUnits.Desktop};` : ''}
            ${titleColor ? `color: ${titleColor};` : ''}
            ${titleDesktopMarginCssStyle ? `margin: ${titleDesktopMarginCssStyle};` : ''} 
            ${titleDesktopPaddingCssStyle ? `padding: ${titleDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title:hover {
            ${titleColorHover ? `color: ${titleColorHover};` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
            ${descriptionFontFamily ? `font-family: ${descriptionFontFamily};` : ''}
            ${descriptionFontSize.Desktop && descriptionFontSizeUnits.Desktop ? `font-size: ${descriptionFontSize.Desktop}${descriptionFontSizeUnits.Desktop};` : ''}
            ${descriptionFontWeight ? `font-weight: ${descriptionFontWeight};` : ''}
            ${descriptionFontStyle ? `font-style: ${descriptionFontStyle};` : ''}
            ${descriptionTextTransform ? `text-transform: ${descriptionTextTransform};` : ''}
            ${descriptionTextDecoration ? `text-decoration: ${descriptionTextDecoration};` : ''}
            ${descriptionLineHeight.Desktop && descriptionLineHeightUnits.Desktop ? `line-height: ${descriptionLineHeight.Desktop}${descriptionLineHeightUnits.Desktop};` : ''}
            ${descriptionLetterSpacing.Desktop && descriptionLetterSpacingUnits.Desktop ? `letter-spacing: ${descriptionLetterSpacing.Desktop}${descriptionLetterSpacingUnits.Desktop};` : ''}
            ${descriptionWordSpacing.Desktop && descriptionWordSpacingUnits.Desktop ? `word-spacing: ${descriptionWordSpacing.Desktop}${descriptionWordSpacingUnits.Desktop};` : ''}
            ${descriptionColor ? `color: ${descriptionColor};` : ''}
            ${descriptionDesktopMarginCssStyle ? `margin: ${descriptionDesktopMarginCssStyle};` : ''} 
            ${descriptionDesktopPaddingCssStyle ? `padding: ${descriptionDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description:hover {
            ${descriptionColorHover ? `color: ${descriptionColorHover};` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
            ${primaryButtonFontFamily ? `font-family: ${primaryButtonFontFamily};` : ''}
            ${primaryButtonFontSize.Desktop && primaryButtonFontSizeUnits.Desktop ? `font-size: ${primaryButtonFontSize.Desktop}${primaryButtonFontSizeUnits.Desktop};` : ''}
            ${primaryButtonFontWeight ? `font-weight: ${primaryButtonFontWeight};` : ''}
            ${primaryButtonFontStyle ? `font-style: ${primaryButtonFontStyle};` : ''}
            ${primaryButtonTextTransform ? `text-transform: ${primaryButtonTextTransform};` : ''}
            ${primaryButtonTextDecoration ? `text-decoration: ${primaryButtonTextDecoration};` : ''}
            ${primaryButtonLineHeight.Desktop && primaryButtonLineHeightUnits.Desktop ? `line-height: ${primaryButtonLineHeight.Desktop}${primaryButtonLineHeightUnits.Desktop};` : ''}
            ${primaryButtonLetterSpacing.Desktop && primaryButtonLetterSpacingUnits.Desktop ? `letter-spacing: ${primaryButtonLetterSpacing.Desktop}${primaryButtonLetterSpacingUnits.Desktop};` : ''}
            ${primaryButtonWordSpacing.Desktop && primaryButtonWordSpacingUnits.Desktop ? `word-spacing: ${primaryButtonWordSpacing.Desktop}${primaryButtonWordSpacingUnits.Desktop};` : ''}
            ${primaryButtonColor ? `color: ${primaryButtonColor};` : ''}
            ${primaryButtonNormalBackgroundType === 'gradient' ? `  
                background: ${primaryButtonNormalCustomGradientSwitcher && primaryButtonNormalCustomGradientInputValue ? primaryButtonNormalCustomGradientInputValue : primaryButtonNormalGradientColor ? primaryButtonNormalGradientColor : primaryButtonNormalClassicColor};
            ` : `
                ${primaryButtonNormalClassicColor ? `background: ${primaryButtonNormalClassicColor};` : ''}
            `}
            ${primaryButtonBorder ? `border: ${primaryButtonBorder};` : ''}
            ${primaryButtonBorderColor ? `border-color: ${primaryButtonBorderColor};` : ''}
			${primaryButtonDesktopBorderCssStyle ? `border-width: ${primaryButtonDesktopBorderCssStyle};` : ''}  
			${primaryButtonDesktopBorderRadiusCssStyle ? `border-radius: ${primaryButtonDesktopBorderRadiusCssStyle};` : ''}
            ${primaryButtonBoxShadowCssValue ? `box-shadow: ${primaryButtonBoxShadowCssValue};` : ''}
            ${primaryButtonDesktopMarginCssStyle ? `margin: ${primaryButtonDesktopMarginCssStyle};` : ''} 
            ${primaryButtonDesktopPaddingCssStyle ? `padding: ${primaryButtonDesktopPaddingCssStyle};` : ''}
            display: inline-block;
            transition: all .3s ease-in-out;
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn:hover {
            ${primaryButtonColorHover ? `color: ${primaryButtonColorHover};` : ''}
            ${primaryButtonHoverBackgroundType === 'gradient' ? `   
                background: ${primaryButtonHoverCustomGradientSwitcher && primaryButtonHoverCustomGradientInputValue ? primaryButtonHoverCustomGradientInputValue : primaryButtonHoverGradientColor ? primaryButtonHoverGradientColor : primaryButtonHoverClassicColor};
            ` : `
                ${primaryButtonHoverClassicColor ? `background: ${primaryButtonHoverClassicColor};` : ''}
            `}
            ${primaryButtonBorderHoverColor ? `border-color: ${primaryButtonBorderHoverColor};` : ''}
            ${primaryButtonBoxShadowHoverCssValue ? `box-shadow: ${primaryButtonBoxShadowHoverCssValue};` : ''}
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
            ${secondaryButtonFontFamily ? `font-family: ${secondaryButtonFontFamily};` : ''}
            ${secondaryButtonFontSize.Desktop && secondaryButtonFontSizeUnits.Desktop ? `font-size: ${secondaryButtonFontSize.Desktop}${secondaryButtonFontSizeUnits.Desktop};` : ''}
            ${secondaryButtonFontWeight ? `font-weight: ${secondaryButtonFontWeight};` : ''}
            ${secondaryButtonFontStyle ? `font-style: ${secondaryButtonFontStyle};` : ''}
            ${secondaryButtonTextTransform ? `text-transform: ${secondaryButtonTextTransform};` : ''}
            ${secondaryButtonTextDecoration ? `text-decoration: ${secondaryButtonTextDecoration};` : ''}
            ${secondaryButtonLineHeight.Desktop && secondaryButtonLineHeightUnits.Desktop ? `line-height: ${secondaryButtonLineHeight.Desktop}${secondaryButtonLineHeightUnits.Desktop};` : ''}
            ${secondaryButtonLetterSpacing.Desktop && secondaryButtonLetterSpacingUnits.Desktop ? `letter-spacing: ${secondaryButtonLetterSpacing.Desktop}${secondaryButtonLetterSpacingUnits.Desktop};` : ''}
            ${secondaryButtonWordSpacing.Desktop && secondaryButtonWordSpacingUnits.Desktop ? `word-spacing: ${secondaryButtonWordSpacing.Desktop}${secondaryButtonWordSpacingUnits.Desktop};` : ''}
            ${secondaryButtonColor ? `color: ${secondaryButtonColor};` : ''}
            ${secondaryButtonNormalBackgroundType === 'gradient' ? `  
                background: ${secondaryButtonNormalCustomGradientSwitcher && secondaryButtonNormalCustomGradientInputValue ? secondaryButtonNormalCustomGradientInputValue : secondaryButtonNormalGradientColor ? secondaryButtonNormalGradientColor : secondaryButtonNormalClassicColor};
            ` : `
                ${secondaryButtonNormalClassicColor ? `background: ${secondaryButtonNormalClassicColor};` : ''}
            `}
            ${secondaryButtonBorder ? `border: ${secondaryButtonBorder};` : ''}
            ${secondaryButtonBorderColor ? `border-color: ${secondaryButtonBorderColor};` : ''}
			${secondaryButtonDesktopBorderCssStyle ? `border-width: ${secondaryButtonDesktopBorderCssStyle};` : ''}  
			${secondaryButtonDesktopBorderRadiusCssStyle ? `border-radius: ${secondaryButtonDesktopBorderRadiusCssStyle};` : ''}
            ${secondaryButtonBoxShadowCssValue ? `box-shadow: ${secondaryButtonBoxShadowCssValue};` : ''}
            ${secondaryButtonDesktopMarginCssStyle ? `margin: ${secondaryButtonDesktopMarginCssStyle};` : ''} 
            ${secondaryButtonDesktopPaddingCssStyle ? `padding: ${secondaryButtonDesktopPaddingCssStyle};` : ''}
            display: inline-block;
            transition: all .3s ease-in-out;
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn:hover {
            ${secondaryButtonColorHover ? `color: ${secondaryButtonColorHover};` : ''}
            ${secondaryButtonHoverBackgroundType === 'gradient' ? `   
                background: ${secondaryButtonHoverCustomGradientSwitcher && secondaryButtonHoverCustomGradientInputValue ? secondaryButtonHoverCustomGradientInputValue : secondaryButtonHoverGradientColor ? secondaryButtonHoverGradientColor : secondaryButtonHoverClassicColor};
            ` : `
                ${secondaryButtonHoverClassicColor ? `background: ${secondaryButtonHoverClassicColor};` : ''}
            `}
            ${secondaryButtonBorderHoverColor ? `border-color: ${secondaryButtonBorderHoverColor};` : ''}
            ${secondaryButtonBoxShadowHoverCssValue ? `box-shadow: ${secondaryButtonBoxShadowHoverCssValue};` : ''}
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
            ${navigationArrowPosition.Desktop ? `top: ${navigationArrowPosition.Desktop}${navigationArrowPositionUnits.Desktop};` : ''}
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

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${navigationArrowSize.Desktop ? `font-size: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-button-prev {
            ${navigationArrowLeftOffset.Desktop ? `left: ${navigationArrowLeftOffset.Desktop}${navigationArrowLeftOffsetUnits.Desktop};` : ''}
        }
        .${blockId} .swiper-button-next {
            ${navigationArrowRightOffset.Desktop ? `right: ${navigationArrowRightOffset.Desktop}${navigationArrowRightOffsetUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination {
            ${paginationDotsPosition.Desktop ? `bottom: ${paginationDotsPosition.Desktop}${paginationDotsPositionUnits.Desktop} !important;` : ''}
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


        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-base-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ''} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ''}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ''}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ''}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ''}
            }
            .${blockId}.gslider-base-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
                height: ${layoutHeight?.Tablet ? `${layoutHeight.Tablet}${layoutHeightUnits?.Tablet}` : 'clamp(300px, 60vh, 500px)'};
                ${contentVerticalAlignment?.Tablet ? `justify-content: ${contentVerticalAlignment.Tablet};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Tablet ? `max-width: ${contentWidth.Tablet}${contentWidthUnits?.Tablet};` : ''}
                ${contentAlignment?.Tablet ? `text-align: ${contentAlignment.Tablet};` : ''}

                ${contentHorizontalAlignment?.Tablet === 'left' ? `margin-right: auto; margin-left: 0;` : ''}
                ${contentHorizontalAlignment?.Tablet === 'center' ? `margin-left: auto; margin-right: auto;` : ''}
                ${contentHorizontalAlignment?.Tablet === 'right' ? `margin-left: auto; margin-right: 0;` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${subtitleFontSize.Tablet && subtitleFontSizeUnits.Tablet ? `font-size: ${subtitleFontSize.Tablet}${subtitleFontSizeUnits.Tablet};` : ''}
                ${subtitleLineHeight.Tablet && subtitleLineHeightUnits.Tablet ? `line-height: ${subtitleLineHeight.Tablet}${subtitleLineHeightUnits.Tablet};` : ''}
                ${subtitleLetterSpacing.Tablet && subtitleLetterSpacingUnits.Tablet ? `letter-spacing: ${subtitleLetterSpacing.Tablet}${subtitleLetterSpacingUnits.Tablet};` : ''}
                ${subtitleWordSpacing.Tablet && subtitleWordSpacingUnits.Tablet ? `word-spacing: ${subtitleWordSpacing.Tablet}${subtitleWordSpacingUnits.Tablet};` : ''}
                ${subtitleTabletMarginCssStyle ? `margin: ${subtitleTabletMarginCssStyle};` : ''} 
                ${subtitleTabletPaddingCssStyle ? `padding: ${subtitleTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Tablet && titleFontSizeUnits.Tablet ? `font-size: ${titleFontSize.Tablet}${titleFontSizeUnits.Tablet};` : ''}
                ${titleLineHeight.Tablet && titleLineHeightUnits.Tablet ? `line-height: ${titleLineHeight.Tablet}${titleLineHeightUnits.Tablet};` : ''}
                ${titleLetterSpacing.Tablet && titleLetterSpacingUnits.Tablet ? `letter-spacing: ${titleLetterSpacing.Tablet}${titleLetterSpacingUnits.Tablet};` : ''}
                ${titleWordSpacing.Tablet && titleWordSpacingUnits.Tablet ? `word-spacing: ${titleWordSpacing.Tablet}${titleWordSpacingUnits.Tablet};` : ''}
                ${titleTabletMarginCssStyle ? `margin: ${titleTabletMarginCssStyle};` : ''} 
                ${titleTabletPaddingCssStyle ? `padding: ${titleTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Tablet && descriptionFontSizeUnits.Tablet ? `font-size: ${descriptionFontSize.Tablet}${descriptionFontSizeUnits.Tablet};` : ''}
                ${descriptionLineHeight.Tablet && descriptionLineHeightUnits.Tablet ? `line-height: ${descriptionLineHeight.Tablet}${descriptionLineHeightUnits.Tablet};` : ''}
                ${descriptionLetterSpacing.Tablet && descriptionLetterSpacingUnits.Tablet ? `letter-spacing: ${descriptionLetterSpacing.Tablet}${descriptionLetterSpacingUnits.Tablet};` : ''}
                ${descriptionWordSpacing.Tablet && descriptionWordSpacingUnits.Tablet ? `word-spacing: ${descriptionWordSpacing.Tablet}${descriptionWordSpacingUnits.Tablet};` : ''}
                ${descriptionTabletMarginCssStyle ? `margin: ${descriptionTabletMarginCssStyle};` : ''} 
                ${descriptionTabletPaddingCssStyle ? `padding: ${descriptionTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${primaryButtonFontSize.Tablet && primaryButtonFontSizeUnits.Tablet ? `font-size: ${primaryButtonFontSize.Tablet}${primaryButtonFontSizeUnits.Tablet};` : ''}
                ${primaryButtonLineHeight.Tablet && primaryButtonLineHeightUnits.Tablet ? `line-height: ${primaryButtonLineHeight.Tablet}${primaryButtonLineHeightUnits.Tablet};` : ''}
                ${primaryButtonLetterSpacing.Tablet && primaryButtonLetterSpacingUnits.Tablet ? `letter-spacing: ${primaryButtonLetterSpacing.Tablet}${primaryButtonLetterSpacingUnits.Tablet};` : ''}
                ${primaryButtonWordSpacing.Tablet && primaryButtonWordSpacingUnits.Tablet ? `word-spacing: ${primaryButtonWordSpacing.Tablet}${primaryButtonWordSpacingUnits.Tablet};` : ''}
                ${primaryButtonTabletBorderCssStyle ? `border-width: ${primaryButtonTabletBorderCssStyle};` : ''}  
                ${primaryButtonTabletBorderRadiusCssStyle ? `border-radius: ${primaryButtonTabletBorderRadiusCssStyle};` : ''}
                ${primaryButtonTabletMarginCssStyle ? `margin: ${primaryButtonTabletMarginCssStyle};` : ''} 
                ${primaryButtonTabletPaddingCssStyle ? `padding: ${primaryButtonTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${secondaryButtonFontSize.Tablet && secondaryButtonFontSizeUnits.Tablet ? `font-size: ${secondaryButtonFontSize.Tablet}${secondaryButtonFontSizeUnits.Tablet};` : ''}
                ${secondaryButtonLineHeight.Tablet && secondaryButtonLineHeightUnits.Tablet ? `line-height: ${secondaryButtonLineHeight.Tablet}${secondaryButtonLineHeightUnits.Tablet};` : ''}
                ${secondaryButtonLetterSpacing.Tablet && secondaryButtonLetterSpacingUnits.Tablet ? `letter-spacing: ${secondaryButtonLetterSpacing.Tablet}${secondaryButtonLetterSpacingUnits.Tablet};` : ''}
                ${secondaryButtonWordSpacing.Tablet && secondaryButtonWordSpacingUnits.Tablet ? `word-spacing: ${secondaryButtonWordSpacing.Tablet}${secondaryButtonWordSpacingUnits.Tablet};` : ''}
                ${secondaryButtonTabletBorderCssStyle ? `border-width: ${secondaryButtonTabletBorderCssStyle};` : ''}  
                ${secondaryButtonTabletBorderRadiusCssStyle ? `border-radius: ${secondaryButtonTabletBorderRadiusCssStyle};` : ''}
                ${secondaryButtonTabletMarginCssStyle ? `margin: ${secondaryButtonTabletMarginCssStyle};` : ''} 
                ${secondaryButtonTabletPaddingCssStyle ? `padding: ${secondaryButtonTabletPaddingCssStyle};` : ''}
            }

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowTabletBorderCssStyle ? `border-width: ${navigationArrowTabletBorderCssStyle};` : ''}  
                ${navigationArrowTabletBorderRadiusCssStyle ? `border-radius: ${navigationArrowTabletBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Tablet ? `width: ${navigationArrowWidth.Tablet}${navigationArrowWidthUnits.Tablet};` : ''}
                ${navigationArrowHeight.Tablet ? `height: ${navigationArrowHeight.Tablet}${navigationArrowHeightUnits.Tablet};` : ''}
                ${navigationArrowPosition.Tablet ? `top: ${navigationArrowPosition.Tablet}${navigationArrowPositionUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Tablet ? `font-size: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev {
                ${navigationArrowLeftOffset.Tablet ? `left: ${navigationArrowLeftOffset.Tablet}${navigationArrowLeftOffsetUnits.Tablet};` : ''}
            }
            .${blockId} .swiper-button-next {
                ${navigationArrowRightOffset.Tablet ? `right: ${navigationArrowRightOffset.Tablet}${navigationArrowRightOffsetUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationDotsPosition.Tablet ? `bottom: ${paginationDotsPosition.Tablet}${paginationDotsPositionUnits.Tablet} !important;` : ''}
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
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-base-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ''} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ''}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ''}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ''}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ''}
            }
            .${blockId}.gslider-base-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
                height: ${layoutHeight?.Mobile ? `${layoutHeight.Mobile}${layoutHeightUnits?.Mobile}` : 'clamp(300px, 60vh, 500px)'};
                ${contentVerticalAlignment?.Mobile ? `justify-content: ${contentVerticalAlignment.Mobile};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Mobile ? `max-width: ${contentWidth.Mobile}${contentWidthUnits?.Mobile};` : ''}
                ${contentAlignment?.Mobile ? `text-align: ${contentAlignment.Mobile};` : ''}

                ${contentHorizontalAlignment?.Mobile === 'left' ? `margin-right: auto; margin-left: 0;` : ''}
                ${contentHorizontalAlignment?.Mobile === 'center' ? `margin-left: auto; margin-right: auto;` : ''}
                ${contentHorizontalAlignment?.Mobile === 'right' ? `margin-left: auto; margin-right: 0;` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${subtitleFontSize.Mobile && subtitleFontSizeUnits.Mobile ? `font-size: ${subtitleFontSize.Mobile}${subtitleFontSizeUnits.Mobile};` : ''}
                ${subtitleLineHeight.Mobile && subtitleLineHeightUnits.Mobile ? `line-height: ${subtitleLineHeight.Mobile}${subtitleLineHeightUnits.Mobile};` : ''}
                ${subtitleLetterSpacing.Mobile && subtitleLetterSpacingUnits.Mobile ? `letter-spacing: ${subtitleLetterSpacing.Mobile}${subtitleLetterSpacingUnits.Mobile};` : ''}
                ${subtitleWordSpacing.Mobile && subtitleWordSpacingUnits.Mobile ? `word-spacing: ${subtitleWordSpacing.Mobile}${subtitleWordSpacingUnits.Mobile};` : ''}
                ${subtitleMobileMarginCssStyle ? `margin: ${subtitleMobileMarginCssStyle};` : ''} 
                ${subtitleMobilePaddingCssStyle ? `padding: ${subtitleMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Mobile && titleFontSizeUnits.Mobile ? `font-size: ${titleFontSize.Mobile}${titleFontSizeUnits.Mobile};` : ''}
                ${titleLineHeight.Mobile && titleLineHeightUnits.Mobile ? `line-height: ${titleLineHeight.Mobile}${titleLineHeightUnits.Mobile};` : ''}
                ${titleLetterSpacing.Mobile && titleLetterSpacingUnits.Mobile ? `letter-spacing: ${titleLetterSpacing.Mobile}${titleLetterSpacingUnits.Mobile};` : ''}
                ${titleWordSpacing.Mobile && titleWordSpacingUnits.Mobile ? `word-spacing: ${titleWordSpacing.Mobile}${titleWordSpacingUnits.Mobile};` : ''}
                ${titleMobileMarginCssStyle ? `margin: ${titleMobileMarginCssStyle};` : ''} 
                ${titleMobilePaddingCssStyle ? `padding: ${titleMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Mobile && descriptionFontSizeUnits.Mobile ? `font-size: ${descriptionFontSize.Mobile}${descriptionFontSizeUnits.Mobile};` : ''}
                ${descriptionLineHeight.Mobile && descriptionLineHeightUnits.Mobile ? `line-height: ${descriptionLineHeight.Mobile}${descriptionLineHeightUnits.Mobile};` : ''}
                ${descriptionLetterSpacing.Mobile && descriptionLetterSpacingUnits.Mobile ? `letter-spacing: ${descriptionLetterSpacing.Mobile}${descriptionLetterSpacingUnits.Mobile};` : ''}
                ${descriptionWordSpacing.Mobile && descriptionWordSpacingUnits.Mobile ? `word-spacing: ${descriptionWordSpacing.Mobile}${descriptionWordSpacingUnits.Mobile};` : ''}
                ${descriptionMobileMarginCssStyle ? `margin: ${descriptionMobileMarginCssStyle};` : ''} 
                ${descriptionMobilePaddingCssStyle ? `padding: ${descriptionMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${primaryButtonFontSize.Mobile && primaryButtonFontSizeUnits.Mobile ? `font-size: ${primaryButtonFontSize.Mobile}${primaryButtonFontSizeUnits.Mobile};` : ''}
                ${primaryButtonLineHeight.Mobile && primaryButtonLineHeightUnits.Mobile ? `line-height: ${primaryButtonLineHeight.Mobile}${primaryButtonLineHeightUnits.Mobile};` : ''}
                ${primaryButtonLetterSpacing.Mobile && primaryButtonLetterSpacingUnits.Mobile ? `letter-spacing: ${primaryButtonLetterSpacing.Mobile}${primaryButtonLetterSpacingUnits.Mobile};` : ''}
                ${primaryButtonWordSpacing.Mobile && primaryButtonWordSpacingUnits.Mobile ? `word-spacing: ${primaryButtonWordSpacing.Mobile}${primaryButtonWordSpacingUnits.Mobile};` : ''}
                ${primaryButtonMobileBorderCssStyle ? `border-width: ${primaryButtonMobileBorderCssStyle};` : ''}  
                ${primaryButtonMobileBorderRadiusCssStyle ? `border-radius: ${primaryButtonMobileBorderRadiusCssStyle};` : ''}
                ${primaryButtonMobileMarginCssStyle ? `margin: ${primaryButtonMobileMarginCssStyle};` : ''} 
                ${primaryButtonMobilePaddingCssStyle ? `padding: ${primaryButtonMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${secondaryButtonFontSize.Mobile && secondaryButtonFontSizeUnits.Mobile ? `font-size: ${secondaryButtonFontSize.Mobile}${secondaryButtonFontSizeUnits.Mobile};` : ''}
                ${secondaryButtonLineHeight.Mobile && secondaryButtonLineHeightUnits.Mobile ? `line-height: ${secondaryButtonLineHeight.Mobile}${secondaryButtonLineHeightUnits.Mobile};` : ''}
                ${secondaryButtonLetterSpacing.Mobile && secondaryButtonLetterSpacingUnits.Mobile ? `letter-spacing: ${secondaryButtonLetterSpacing.Mobile}${secondaryButtonLetterSpacingUnits.Mobile};` : ''}
                ${secondaryButtonWordSpacing.Mobile && secondaryButtonWordSpacingUnits.Mobile ? `word-spacing: ${secondaryButtonWordSpacing.Mobile}${secondaryButtonWordSpacingUnits.Mobile};` : ''}
                ${secondaryButtonMobileBorderCssStyle ? `border-width: ${secondaryButtonMobileBorderCssStyle};` : ''}  
                ${secondaryButtonMobileBorderRadiusCssStyle ? `border-radius: ${secondaryButtonMobileBorderRadiusCssStyle};` : ''}
                ${secondaryButtonMobileMarginCssStyle ? `margin: ${secondaryButtonMobileMarginCssStyle};` : ''} 
                ${secondaryButtonMobilePaddingCssStyle ? `padding: ${secondaryButtonMobilePaddingCssStyle};` : ''}
            }

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowMobileBorderCssStyle ? `border-width: ${navigationArrowMobileBorderCssStyle};` : ''}  
                ${navigationArrowMobileBorderRadiusCssStyle ? `border-radius: ${navigationArrowMobileBorderRadiusCssStyle};` : ''}
                ${navigationArrowWidth.Mobile ? `width: ${navigationArrowWidth.Mobile}${navigationArrowWidthUnits.Mobile};` : ''}
                ${navigationArrowHeight.Mobile ? `height: ${navigationArrowHeight.Mobile}${navigationArrowHeightUnits.Mobile};` : ''}
                ${navigationArrowPosition.Mobile ? `top: ${navigationArrowPosition.Mobile}${navigationArrowPositionUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Mobile ? `font-size: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev {
                ${navigationArrowLeftOffset.Mobile ? `left: ${navigationArrowLeftOffset.Mobile}${navigationArrowLeftOffsetUnits.Mobile};` : ''}
            }
            .${blockId} .swiper-button-next {
                ${navigationArrowRightOffset.Mobile ? `right: ${navigationArrowRightOffset.Mobile}${navigationArrowRightOffsetUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${paginationDotsPosition.Mobile ? `bottom: ${paginationDotsPosition.Mobile}${paginationDotsPositionUnits.Mobile} !important;` : ''}
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
        }

    `, [
        blockId,
        deviceType,
        sliderItems,
        blockStyle,
        sliderType,
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
        slideEffect,
        carouselEffect,
        mousewheelControl,
        paginationType,
        dynamicBullets,

        /** Start Show/Hide Elements */
        showSubTitle,
        showTitle,
        showDescription,
        showButton,
        showNavigation,
        showPagination,
        /** End Show/Hide Elements */

        /** Start Layout & Content Setting */
        layoutHeight,
        layoutHeightUnits,
        contentWidth,
        contentWidthUnits,
        contentAlignment,
        contentVerticalAlignment,
        contentHorizontalAlignment,
        /** End Layout & Content Setting */

        /** Start Subtitle Typography, Color, Margin & Padding */
        subtitleFontFamily,
        subtitleFontSize,
        subtitleFontSizeUnits,
        subtitleFontWeight,
        subtitleFontStyle,
        subtitleTextTransform,
        subtitleTextDecoration,
        subtitleLineHeight,
        subtitleLineHeightUnits,
        subtitleLetterSpacing,
        subtitleLetterSpacingUnits,
        subtitleWordSpacing,
        subtitleWordSpacingUnits,

        subtitleColorSwitcher,
        subtitleColor,
        subtitleColorHover,

        subtitleMarginUnits,
        subtitleDesktopMargin,
        subtitleDesktopMarginCssStyle,
        subtitleTabletMargin,
        subtitleTabletMarginCssStyle,
        subtitleMobileMargin,
        subtitleMobileMarginCssStyle,
        subtitleMarginLink,

        subtitlePaddingUnits,
        subtitleDesktopPadding,
        subtitleDesktopPaddingCssStyle,
        subtitleTabletPadding,
        subtitleTabletPaddingCssStyle,
        subtitleMobilePadding,
        subtitleMobilePaddingCssStyle,
        subtitlePaddingLink,
        /** End Subtitle Typography, Color, Margin & Padding */

        /** Start Title Typography, Color, Margin & Padding */
        titleFontFamily,
        titleFontSize,
        titleFontSizeUnits,
        titleFontWeight,
        titleFontStyle,
        titleTextTransform,
        titleTextDecoration,
        titleLineHeight,
        titleLineHeightUnits,
        titleLetterSpacing,
        titleLetterSpacingUnits,
        titleWordSpacing,
        titleWordSpacingUnits,

        titleColorSwitcher,
        titleColor,
        titleColorHover,

        titleMarginUnits,
        titleDesktopMargin,
        titleDesktopMarginCssStyle,
        titleTabletMargin,
        titleTabletMarginCssStyle,
        titleMobileMargin,
        titleMobileMarginCssStyle,
        titleMarginLink,

        titlePaddingUnits,
        titleDesktopPadding,
        titleDesktopPaddingCssStyle,
        titleTabletPadding,
        titleTabletPaddingCssStyle,
        titleMobilePadding,
        titleMobilePaddingCssStyle,
        titlePaddingLink,
        /** End Title Typography, Color, Margin & Padding */

        /** Start Description Typography, Color, Margin & Padding */
        descriptionFontFamily,
        descriptionFontSize,
        descriptionFontSizeUnits,
        descriptionFontWeight,
        descriptionFontStyle,
        descriptionTextTransform,
        descriptionTextDecoration,
        descriptionLineHeight,
        descriptionLineHeightUnits,
        descriptionLetterSpacing,
        descriptionLetterSpacingUnits,
        descriptionWordSpacing,
        descriptionWordSpacingUnits,

        descriptionColorSwitcher,
        descriptionColor,
        descriptionColorHover,

        descriptionMarginUnits,
        descriptionDesktopMargin,
        descriptionDesktopMarginCssStyle,
        descriptionTabletMargin,
        descriptionTabletMarginCssStyle,
        descriptionMobileMargin,
        descriptionMobileMarginCssStyle,
        descriptionMarginLink,

        descriptionPaddingUnits,
        descriptionDesktopPadding,
        descriptionDesktopPaddingCssStyle,
        descriptionTabletPadding,
        descriptionTabletPaddingCssStyle,
        descriptionMobilePadding,
        descriptionMobilePaddingCssStyle,
        descriptionPaddingLink,
        /** End Description Typography, Color, Margin & Padding */

        /** Start Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
        primaryButtonFontFamily,
        primaryButtonFontSize,
        primaryButtonFontSizeUnits,
        primaryButtonFontWeight,
        primaryButtonFontStyle,
        primaryButtonTextTransform,
        primaryButtonTextDecoration,
        primaryButtonLineHeight,
        primaryButtonLineHeightUnits,
        primaryButtonLetterSpacing,
        primaryButtonLetterSpacingUnits,
        primaryButtonWordSpacing,
        primaryButtonWordSpacingUnits,

        primaryButtonColorSwitcher,
        primaryButtonColor,
        primaryButtonColorHover,

        primaryButtonNormalBackgroundType,
        primaryButtonNormalClassicColor,
        primaryButtonNormalGradientColor,
        primaryButtonNormalCustomGradientSwitcher,
        primaryButtonNormalCustomGradientInputValue,
        primaryButtonHoverBackgroundType,
        primaryButtonHoverClassicColor,
        primaryButtonHoverGradientColor,
        primaryButtonHoverCustomGradientSwitcher,
        primaryButtonHoverCustomGradientInputValue,

        primaryButtonBorder,
        primaryButtonBorderColorSwitcher,
        primaryButtonBorderColor,
        primaryButtonBorderHoverColor,
        primaryButtonBorderUnits,
        primaryButtonDesktopBorder,
        primaryButtonDesktopBorderCssStyle,
        primaryButtonTabletBorder,
        primaryButtonTabletBorderCssStyle,
        primaryButtonMobileBorder,
        primaryButtonMobileBorderCssStyle,
        primaryButtonBorderLink,

        primaryButtonBorderRadiusUnits,
        primaryButtonDesktopBorderRadius,
        primaryButtonDesktopBorderRadiusCssStyle,
        primaryButtonTabletBorderRadius,
        primaryButtonTabletBorderRadiusCssStyle,
        primaryButtonMobileBorderRadius,
        primaryButtonMobileBorderRadiusCssStyle,
        primaryButtonBorderRadiusLink,

        primaryButtonBoxShadowValuesSwitcher,
        primaryButtonBoxShadowValues,
        primaryButtonBoxShadowCssValue,
        primaryButtonBoxShadowHoverValues,
        primaryButtonBoxShadowHoverCssValue,

        primaryButtonMarginUnits,
        primaryButtonDesktopMargin,
        primaryButtonDesktopMarginCssStyle,
        primaryButtonTabletMargin,
        primaryButtonTabletMarginCssStyle,
        primaryButtonMobileMargin,
        primaryButtonMobileMarginCssStyle,
        primaryButtonMarginLink,

        primaryButtonPaddingUnits,
        primaryButtonDesktopPadding,
        primaryButtonDesktopPaddingCssStyle,
        primaryButtonTabletPadding,
        primaryButtonTabletPaddingCssStyle,
        primaryButtonMobilePadding,
        primaryButtonMobilePaddingCssStyle,
        primaryButtonPaddingLink,
        /** End Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

        /** Start Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
        secondaryButtonFontFamily,
        secondaryButtonFontSize,
        secondaryButtonFontSizeUnits,
        secondaryButtonFontWeight,
        secondaryButtonFontStyle,
        secondaryButtonTextTransform,
        secondaryButtonTextDecoration,
        secondaryButtonLineHeight,
        secondaryButtonLineHeightUnits,
        secondaryButtonLetterSpacing,
        secondaryButtonLetterSpacingUnits,
        secondaryButtonWordSpacing,
        secondaryButtonWordSpacingUnits,

        secondaryButtonColorSwitcher,
        secondaryButtonColor,
        secondaryButtonColorHover,

        secondaryButtonNormalBackgroundType,
        secondaryButtonNormalClassicColor,
        secondaryButtonNormalGradientColor,
        secondaryButtonNormalCustomGradientSwitcher,
        secondaryButtonNormalCustomGradientInputValue,
        secondaryButtonHoverBackgroundType,
        secondaryButtonHoverClassicColor,
        secondaryButtonHoverGradientColor,
        secondaryButtonHoverCustomGradientSwitcher,
        secondaryButtonHoverCustomGradientInputValue,

        secondaryButtonBorder,
        secondaryButtonBorderColorSwitcher,
        secondaryButtonBorderColor,
        secondaryButtonBorderHoverColor,
        secondaryButtonBorderUnits,
        secondaryButtonDesktopBorder,
        secondaryButtonDesktopBorderCssStyle,
        secondaryButtonTabletBorder,
        secondaryButtonTabletBorderCssStyle,
        secondaryButtonMobileBorder,
        secondaryButtonMobileBorderCssStyle,
        secondaryButtonBorderLink,

        secondaryButtonBorderRadiusUnits,
        secondaryButtonDesktopBorderRadius,
        secondaryButtonDesktopBorderRadiusCssStyle,
        secondaryButtonTabletBorderRadius,
        secondaryButtonTabletBorderRadiusCssStyle,
        secondaryButtonMobileBorderRadius,
        secondaryButtonMobileBorderRadiusCssStyle,
        secondaryButtonBorderRadiusLink,

        secondaryButtonBoxShadowValuesSwitcher,
        secondaryButtonBoxShadowValues,
        secondaryButtonBoxShadowCssValue,
        secondaryButtonBoxShadowHoverValues,
        secondaryButtonBoxShadowHoverCssValue,

        secondaryButtonMarginUnits,
        secondaryButtonDesktopMargin,
        secondaryButtonDesktopMarginCssStyle,
        secondaryButtonTabletMargin,
        secondaryButtonTabletMarginCssStyle,
        secondaryButtonMobileMargin,
        secondaryButtonMobileMarginCssStyle,
        secondaryButtonMarginLink,

        secondaryButtonPaddingUnits,
        secondaryButtonDesktopPadding,
        secondaryButtonDesktopPaddingCssStyle,
        secondaryButtonTabletPadding,
        secondaryButtonTabletPaddingCssStyle,
        secondaryButtonMobilePadding,
        secondaryButtonMobilePaddingCssStyle,
        secondaryButtonPaddingLink,
        /** End Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

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
        navigationArrowPosition,
        navigationArrowPositionUnits,
        navigationArrowRightOffset,
        navigationArrowRightOffsetUnits,
        navigationArrowLeftOffset,
        navigationArrowLeftOffsetUnits,
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
        setAttributes({blockStyle: `${allBlockStyle} ${sliderItemColorStyle} ${customCss}`.replace(/\s+/g, ' ').trim()});
    }, [allBlockStyle, sliderItemColorStyle, customCss]);

    /** Set Editor Style */
    const editorStyle = `${allBlockStyle} ${sliderItemColorStyle} ${customCss}`.replace(/\s+/g, ' ').trim();

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
