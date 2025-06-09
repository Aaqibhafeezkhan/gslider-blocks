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
        subtitleLetterSpacing,
        subtitleLetterSpacingUnits,
        subtitleLineHeight,
        subtitleLineHeightUnits,

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
        titleLetterSpacing,
        titleLetterSpacingUnits,
        titleLineHeight,
        titleLineHeightUnits,

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
        descriptionLetterSpacing,
        descriptionLetterSpacingUnits,
        descriptionLineHeight,
        descriptionLineHeightUnits,

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

        /** Start Arrows Style */
        sliderArrowsSize,
        sliderArrowsSizeUnits,

        /** Start Arrows Color */
        sliderArrowsColorSwitcher,
        sliderArrowsColor,
        sliderArrowsColorHover,
        /** End Arrows Color */

        /** Start Background */
        sliderArrowsNormalBackgroundType,
        sliderArrowsNormalClassicColor,
        sliderArrowsNormalGradientColor,
        sliderArrowsNormalCustomGradientSwitcher,
        sliderArrowsNormalCustomGradientInputValue,
        sliderArrowsHoverBackgroundType,
        sliderArrowsHoverClassicColor,
        sliderArrowsHoverGradientColor,
        sliderArrowsHoverCustomGradientSwitcher,
        sliderArrowsHoverCustomGradientInputValue,
        /** End Background */

        /** Start Arrows Dimensions */
        sliderArrowsWidth,
        sliderArrowsWidthUnits,
        sliderArrowsHeight,
        sliderArrowsHeightUnits,
        /** End Arrows Dimensions */

        /** Start Border */
        sliderArrowsBorder,
        sliderArrowsBorderColorSwitcher,
        sliderArrowsBorderColor,
        sliderArrowsBorderHoverColor,
        sliderArrowsBorderUnits,
        sliderArrowsDesktopBorder,
        sliderArrowsDesktopBorderCssStyle,
        sliderArrowsTabletBorder,
        sliderArrowsTabletBorderCssStyle,
        sliderArrowsMobileBorder,
        sliderArrowsMobileBorderCssStyle,
        sliderArrowsBorderLink,
        /** End Border */

        /** Start Border Radius */
        sliderArrowsBorderRadiusUnits,
        sliderArrowsDesktopBorderRadius,
        sliderArrowsDesktopBorderRadiusCssStyle,
        sliderArrowsTabletBorderRadius,
        sliderArrowsTabletBorderRadiusCssStyle,
        sliderArrowsMobileBorderRadius,
        sliderArrowsMobileBorderRadiusCssStyle,
        sliderArrowsBorderRadiusLink,
        /** End Border Radius */

        /** Start Box Shadow */
        sliderArrowsBoxShadowValuesSwitcher,
        sliderArrowsBoxShadowValues,
        sliderArrowsBoxShadowCssValue,
        sliderArrowsBoxShadowHoverValues,
        sliderArrowsBoxShadowHoverCssValue,
        /** End Box Shadow */

        /** Start Position */
        sliderArrowsPosition,
        sliderArrowsPositionUnits,
        sliderArrowsRightOffset,
        sliderArrowsRightOffsetUnits,
        sliderArrowsLeftOffset,
        sliderArrowsLeftOffsetUnits,
        /** End Position */

        /** Start Dots Margin */
        sliderDotsMarginUnits,
        sliderDotsDesktopMargin,
        sliderDotsDesktopMarginCssStyle,
        sliderDotsTabletMargin,
        sliderDotsTabletMarginCssStyle,
        sliderDotsMobileMargin,
        sliderDotsMobileMarginCssStyle,
        sliderDotsMarginLink,
        /** End Dots Margin */

        /** Start Dots Position */
        sliderDotsPosition,
        sliderDotsPositionUnits,
        /** End Dots Position */

        /** Start Dots Style */
        sliderDotsSwitcher,
        sliderNormalDotsBgColor,
        sliderActiveDotsBgColor,
        sliderNormalDotsWidth,
        sliderNormalDotsWidthUnits,
        sliderNormalDotsHeight,
        sliderNormalDotsHeightUnits,
        /** End Dots Style */

        /** Start Dots Border */
        sliderNormalDotsBorder,
        sliderNormalDotsBorderColorSwitcher,
        sliderNormalDotsBorderColor,
        sliderNormalDotsBorderHoverColor,
        sliderNormalDotsBorderUnits,
        sliderNormalDotsDesktopBorder,
        sliderNormalDotsDesktopBorderCssStyle,
        sliderNormalDotsTabletBorder,
        sliderNormalDotsTabletBorderCssStyle,
        sliderNormalDotsMobileBorder,
        sliderNormalDotsMobileBorderCssStyle,
        sliderNormalDotsBorderLink,
        /** End Dots Border */

        /** Start Dots Border Radius */
        sliderNormalDotsBorderRadius,
        sliderNormalDotsBorderRadiusUnits,
        sliderNormalDotsDesktopBorderRadius,
        sliderNormalDotsDesktopBorderRadiusCssStyle,
        sliderNormalDotsTabletBorderRadius,
        sliderNormalDotsTabletBorderRadiusCssStyle,
        sliderNormalDotsMobileBorderRadius,
        sliderNormalDotsMobileBorderRadiusCssStyle,
        sliderNormalDotsBorderRadiusLink,
        /** End Dots Border Radius */

        /** Start Active Dots */
        sliderActiveDotsWidth,
        sliderActiveDotsWidthUnits,
        sliderActiveDotsHeight,
        sliderActiveDotsHeightUnits,
        /** End Active Dots */

        /** Start Active Dots Border */
        sliderActiveDotsBorder,
        sliderActiveDotsBorderColorSwitcher,
        sliderActiveDotsBorderColor,
        sliderActiveDotsBorderHoverColor,
        /** End Active Dots Border */

        /** Start Active Dots Border */
        sliderActiveDotsBorderUnits,
        sliderActiveDotsDesktopBorder,
        sliderActiveDotsDesktopBorderCssStyle,
        sliderActiveDotsTabletBorder,
        sliderActiveDotsTabletBorderCssStyle,
        sliderActiveDotsMobileBorder,
        sliderActiveDotsMobileBorderCssStyle,
        sliderActiveDotsBorderLink,
        /** End Active Dots Border */

        /** Start Active Dots Border Radius */
        sliderActiveDotsBorderRadiusUnits,
        sliderActiveDotsDesktopBorderRadius,
        sliderActiveDotsDesktopBorderRadiusCssStyle,
        sliderActiveDotsTabletBorderRadius,
        sliderActiveDotsTabletBorderRadiusCssStyle,
        sliderActiveDotsMobileBorderRadius,
        sliderActiveDotsMobileBorderRadiusCssStyle,
        sliderActiveDotsBorderRadiusLink,
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
        general: 'g1',
        styles: 's1',
        advanced: 'a1',
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
            sliderArrowsDesktopBorderRadiusCssStyle: spacingFormat(sliderArrowsDesktopBorderRadius, sliderArrowsBorderRadiusUnits.Desktop),
            sliderArrowsTabletBorderRadiusCssStyle: spacingFormat(sliderArrowsTabletBorderRadius, sliderArrowsBorderRadiusUnits.Tablet),
            sliderArrowsMobileBorderRadiusCssStyle: spacingFormat(sliderArrowsMobileBorderRadius, sliderArrowsBorderRadiusUnits.Mobile),

            sliderNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(sliderNormalDotsDesktopBorderRadius, sliderNormalDotsBorderRadiusUnits.Desktop),
            sliderNormalDotsTabletBorderRadiusCssStyle: spacingFormat(sliderNormalDotsTabletBorderRadius, sliderNormalDotsBorderRadiusUnits.Tablet),
            sliderNormalDotsMobileBorderRadiusCssStyle: spacingFormat(sliderNormalDotsMobileBorderRadius, sliderNormalDotsBorderRadiusUnits.Mobile),
        });
    }, [
        sliderArrowsDesktopBorderRadius,
        sliderArrowsTabletBorderRadius,
        sliderArrowsMobileBorderRadius,
        sliderArrowsBorderRadiusUnits,

        sliderNormalDotsDesktopBorderRadius,
        sliderNormalDotsTabletBorderRadius,
        sliderNormalDotsMobileBorderRadius,
        sliderNormalDotsBorderRadiusUnits,
    ]);
    /** end if have default padding then set the css style */

    /** Load Google Font */
    // useEffect(() => {
    //     if (subtitleFontFamily !== 'Default') {
    //         LoadGoogleFont(subtitleFontFamily);
    //     }
    //     if (titleFontFamily !== 'Default') {
    //         LoadGoogleFont(titleFontFamily);
    //     }
    //     if (descriptionFontFamily !== 'Default') {
    //         LoadGoogleFont(descriptionFontFamily);
    //     }
    // }, [subtitleFontFamily, titleFontFamily, descriptionFontFamily]);


    /**
	 * Inspector General Controls
	 */
	const generalControls = (
        <>
            <PanelBody
                title={__("Show / Hide Elements", "gslider-blocks")}
                opened={openPanels.general === "g1"}
                onToggle={() => togglePanel("general", "g1")}
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
                title={__("Layout & Content Setting", "gslider-blocks")}
                opened={openPanels.general === "g2"}
                onToggle={() => togglePanel("general", "g2")}
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
                title={__("Slider Items", "gslider-blocks")}
                opened={openPanels.general === "g3"}
                onToggle={() => togglePanel("general", "g3")}
            >
                <div className="gslider-wrapper">
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
                    <Button isPrimary onClick={handleAddItem}>
                        {__("Add Slide", "gslider-blocks")}
                    </Button>
                </div>
            </PanelBody>
            <PanelBody 
                title={__("Slider Type", "gslider-blocks")} 
                opened={openPanels.general === "g4"}
                onToggle={() => togglePanel("general", "g4")}
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
                opened={openPanels.general === "g5"}
                onToggle={() => togglePanel("general", "g5")}
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
                <RangeControl
                    label={__('Autoplay Delay (ms)', 'gslider-blocks')}
                    value={autoplayDelay}
                    onChange={(value) => setAttributes({ autoplayDelay: value })}
                    min={1000}
                    max={10000}
                />
                )}
                <RangeControl
                    label={__("Transition Speed (ms)", "gslider-blocks")}
                    value={speed}
                    onChange={(value) => setAttributes({ speed: value })}
                    min={100}
                    max={5000}
                />
            </PanelBody>
            {sliderType === 'carousel' && (
                <PanelBody 
                    title={__("Carousel Settings", "gslider-blocks")} 
                    opened={openPanels.general === "g6"}
                    onToggle={() => togglePanel("general", "g6")}
                >
                    <RangeControl
                        label={__('Number of Columns', 'gslider-blocks')}
                        value={carouselPerColumn}
                        onChange={(value) => setAttributes({ carouselPerColumn: value })}
                        min={1}
                        max={10}
                        step={1}
                        initialPosition={1}
                    />
                    <RangeControl
                        label={__('Column Gap (px)', 'gslider-blocks')}
                        value={carouselPerColumnGap}
                        onChange={(value) => setAttributes({ carouselPerColumnGap: value })}
                        min={0}
                        max={200}
                        step={1}
                        initialPosition={1}
                    />
                </PanelBody>
            )}
            {sliderType === 'carousel' && (
                <PanelBody 
                    title={__("Carousel Effect", "gslider-blocks")} 
                    opened={openPanels.general === "g7"}
                    onToggle={() => togglePanel("general", "g7")}
                >
                    <SelectControl
                        label={__('Select Carousel Effect', 'gslider-blocks')}
                        value={carouselEffect}
                        options={CAROUSEL_EFFECT_OPTIONS}
                        onChange={(value) => setAttributes({ carouselEffect: value })}
                    />
                </PanelBody>
            )}
            {sliderType === 'slider' && (
                <PanelBody 
                    title={__("Slider Effect", "gslider-blocks")} 
                    opened={openPanels.general === "g8"}
                    onToggle={() => togglePanel("general", "g8")}
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
                    opened={openPanels.general === "g9"}
                    onToggle={() => togglePanel("general", "g9")}
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
                opened={openPanels.styles === "s1"}
                onToggle={() => togglePanel("styles", "s1")}
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
                    
                    letterSpacing={subtitleLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ subtitleLetterSpacing: value })}
                    
                    letterSpacingUnits={subtitleLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ subtitleLetterSpacingUnits: value })}
                    
                    lineHeight={subtitleLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ subtitleLineHeight: value })}
                    
                    lineHeightUnits={subtitleLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ subtitleLineHeightUnits: value })}
                    
                    deviceType={deviceType}
                    setAttributes={setAttributes}
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
                opened={openPanels.styles === "s2"}
                onToggle={() => togglePanel("styles", "s2")}
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
                    
                    letterSpacing={titleLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ titleLetterSpacing: value })}
                    
                    letterSpacingUnits={titleLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ titleLetterSpacingUnits: value })}
                    
                    lineHeight={titleLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ titleLineHeight: value })}
                    
                    lineHeightUnits={titleLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ titleLineHeightUnits: value })}
                    
                    deviceType={deviceType}
                    setAttributes={setAttributes}
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
                opened={openPanels.styles === "s3"}
                onToggle={() => togglePanel("styles", "s3")}
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
                    
                    letterSpacing={descriptionLetterSpacing}
                    onChangeLetterSpacing={(value) => setAttributes({ descriptionLetterSpacing: value })}
                    
                    letterSpacingUnits={descriptionLetterSpacingUnits}
                    onChangeLetterSpacingUnit={(value) => setAttributes({ descriptionLetterSpacingUnits: value })}
                    
                    lineHeight={descriptionLineHeight}
                    onChangeLineHeight={(value) => setAttributes({ titleLineHeight: value })}
                    
                    lineHeightUnits={descriptionLineHeightUnits}
                    onChangeLineHeightUnit={(value) => setAttributes({ descriptionLineHeightUnits: value })}
                    
                    deviceType={deviceType}
                    setAttributes={setAttributes}
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
                title={__("Navigation", "gslider-blocks")}  
                opened={openPanels.styles === "sdxjk"}
                onToggle={() => togglePanel("styles", "sdxjk")}
            >
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Icon Size", "gslider-blocks")}
                    rangeValue={sliderArrowsSize}
                    onChangeValue={(value) => setAttributes({ sliderArrowsSize: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsSizeUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsSizeUnits}
                    step={1}
                    resetFallbackValue={"16"}
                />

                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Width", "gslider-blocks")}
                    rangeValue={sliderArrowsWidth}
                    onChangeValue={(value) => setAttributes({ sliderArrowsWidth: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsWidthUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsWidthUnits}
                    step={1}
                    resetFallbackValue={"46"}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Height", "gslider-blocks")}
                    rangeValue={sliderArrowsHeight}
                    onChangeValue={(value) => setAttributes({ sliderArrowsHeight: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsHeightUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsHeightUnits}
                    step={1}
                    resetFallbackValue={"46"}
                />
                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Position", "gslider-blocks")}
                    rangeValue={sliderArrowsPosition}
                    onChangeValue={(value) => setAttributes({ sliderArrowsPosition: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsPositionUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsPositionUnits}
                    step={1}
                    resetFallbackValue={"50"}
                />

                <ResponsiveRangeControl
                    min={-100}
                    max={100}
                    label={__("Left", "gslider-blocks")}
                    rangeValue={sliderArrowsLeftOffset}
                    onChangeValue={(value) => setAttributes({ sliderArrowsLeftOffset: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsLeftOffsetUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsLeftOffsetUnits}
                    step={1}
                    resetFallbackValue={"-20"}
                />

                <ResponsiveRangeControl
                    min={-100}
                    max={100}
                    label={__("Right", "gslider-blocks")}
                    rangeValue={sliderArrowsRightOffset}
                    onChangeValue={(value) => setAttributes({ sliderArrowsRightOffset: value })}
                    onUnitChange={(value) => setAttributes({ sliderArrowsRightOffsetUnits: value })}
                    deviceType={deviceType}
                    units={sliderArrowsRightOffsetUnits}
                    step={1}
                    resetFallbackValue={"-20"}
                />

                <SwitcherControl
                    label={__("Icon Color", "gslider-blocks")}
                    globalSwitcher={sliderArrowsColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ sliderArrowsColorSwitcher: value })}
                />

                {sliderArrowsColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={sliderArrowsColor}
                        onChangeColor={(value) => setAttributes({ sliderArrowsColor: value })}
                        defaultColor='#333333'
                    />
                )}

                {sliderArrowsColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={sliderArrowsColorHover}
                        onChangeColor={(value) => setAttributes({ sliderArrowsColorHover: value })}
                    />
                )}

                <BackgroundControl 
                    label={__("Background Color", "gslider-blocks")}
                            
                    normalBackgroundType={sliderArrowsNormalBackgroundType}
                    setNormalBackgroundType={(value) => setAttributes({ sliderArrowsNormalBackgroundType: value })}
                    normalClassicColor={sliderArrowsNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ sliderArrowsNormalClassicColor: value })}
                    normalGradientColor={sliderArrowsNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ sliderArrowsNormalGradientColor: value })}
                    normalCustomGradientSwitcher={sliderArrowsNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ sliderArrowsNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={sliderArrowsNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ sliderArrowsNormalCustomGradientInputValue: value })}
                    normalClassicDefaultColor={'#d2d2d2c7'}

                    hoverBackgroundType={sliderArrowsHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ sliderArrowsHoverBackgroundType: value })}
                    hoverClassicColor={sliderArrowsHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ sliderArrowsHoverClassicColor: value })}
                    hoverGradientColor={sliderArrowsHoverGradientColor} 
                    setHoverGradientColor={(value) => setAttributes({ sliderArrowsHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={sliderArrowsHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ sliderArrowsHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={sliderArrowsHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ sliderArrowsHoverCustomGradientInputValue: value })}
                    hoverClassicDefaultColor={'#787878b8'}
                    isBackgroundImage={false}
                />

                <SelectControls
                    label={__("Border Style", "gslider-blocks")}
                    value={sliderArrowsBorder}
                    options={BORDER_STYLES}
                    onChange={(value) => setAttributes({ sliderArrowsBorder: value })}
                />

                <SwitcherControl
                    label={__("Border Color", "gslider-blocks")}
                    globalSwitcher={sliderArrowsBorderColorSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ sliderArrowsBorderColorSwitcher: value })}
                />

                {sliderArrowsBorderColorSwitcher === 'normal' && (
                    <ColorControl
                        label={__("Normal Color", "gslider-blocks")}
                        color={sliderArrowsBorderColor}
                        onChangeColor={(value) => setAttributes({ sliderArrowsBorderColor: value })}
                    />
                )}

                {sliderArrowsBorderColorSwitcher === 'hover' && (
                    <ColorControl
                        label={__("Hover Color", "gslider-blocks")}
                        color={sliderArrowsBorderHoverColor}
                        onChangeColor={(value) => setAttributes({ sliderArrowsBorderHoverColor: value })}
                    />
                )}

                <ResponsiveSpacingControl
                    label={__("Border Width", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={sliderArrowsBorderUnits}
                    onChangeUnits={(value) => setAttributes({ sliderArrowsBorderUnits: value })}
                    desktopSpacing={sliderArrowsDesktopBorder} 
                    onChangeDesktopSpacing={(value) => setAttributes({ sliderArrowsDesktopBorder: value })}
                    desktopSpacingStyle={(value) => setAttributes({ sliderArrowsDesktopBorderCssStyle: value })}
                    tabletSpacing={sliderArrowsTabletBorder} 
                    onChangeTabletSpacing={(value) => setAttributes({ sliderArrowsTabletBorder: value })}
                    tabletSpacingStyle={(value) => setAttributes({ sliderArrowsTabletBorderCssStyle: value })}
                    mobileSpacing={sliderArrowsMobileBorder}
                    onChangeMobileSpacing={(value) => setAttributes({ sliderArrowsMobileBorder: value })}
                    mobileSpacingStyle={(value) => setAttributes({ sliderArrowsMobileBorderCssStyle: value })}
                    isLinked={sliderArrowsBorderLink}
                    onChangeLink={(value) => setAttributes({ sliderArrowsBorderLink: value })} 
                />

                <ResponsiveSpacingControl
                    label={__("Border Radius", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={sliderArrowsBorderRadiusUnits}
                    onChangeUnits={(value) => setAttributes({ sliderArrowsBorderRadiusUnits: value })}
                    desktopSpacing={sliderArrowsDesktopBorderRadius}
                    onChangeDesktopSpacing={(value) => setAttributes({ sliderArrowsDesktopBorderRadius: value })}
                    desktopSpacingStyle={(value) => setAttributes({ sliderArrowsDesktopBorderRadiusCssStyle: value })}
                    tabletSpacing={sliderArrowsTabletBorderRadius}
                    onChangeTabletSpacing={(value) => setAttributes({ sliderArrowsTabletBorderRadius: value })}
                    tabletSpacingStyle={(value) => setAttributes({ sliderArrowsTabletBorderRadiusCssStyle: value })}
                    mobileSpacing={sliderArrowsMobileBorderRadius}
                    onChangeMobileSpacing={(value) => setAttributes({ sliderArrowsMobileBorderRadius: value })}
                    mobileSpacingStyle={(value) => setAttributes({ sliderArrowsMobileBorderRadiusCssStyle: value })}
                    isLinked={sliderArrowsBorderRadiusLink}
                    onChangeLink={(value) => setAttributes({ sliderArrowsBorderRadiusLink: value })} 
                />

                <SwitcherControl
                    label={__("Box Shadow", "gslider-blocks")}
                    globalSwitcher={sliderArrowsBoxShadowValuesSwitcher}
                    setGlobalSwitcher={(value) => setAttributes({ sliderArrowsBoxShadowValuesSwitcher: value })}
                />

                {sliderArrowsBoxShadowValuesSwitcher === 'normal' && (
                    <BoxShadowSettingsControl
                        label={__("Normal Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ sliderArrowsBoxShadowValues: value })}
                        initialShadowValue={sliderArrowsBoxShadowValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ sliderArrowsBoxShadowCssValue: value })}
                    />
                )}

                {sliderArrowsBoxShadowValuesSwitcher === 'hover' && (
                    <BoxShadowSettingsControl
                        label={__("Hover Shadow", "gslider-blocks")}
                        onBoxShadowChange={(value) => setAttributes({ sliderArrowsBoxShadowHoverValues: value })}
                        initialShadowValue={sliderArrowsBoxShadowHoverValues}
                        onBoxShadowStyleChange={(value) => setAttributes({ sliderArrowsBoxShadowHoverCssValue: value })}
                    />
                )}

            </PanelBody>

            <PanelBody 
                title={__("Pagination", "gslider-blocks")}  
                opened={openPanels.styles === "fgkjf"}
                onToggle={() => togglePanel("styles", "fgkjf")}
            >

                <ResponsiveRangeControl
                    min={0}
                    max={100}
                    label={__("Position", "gslider-blocks")}
                    rangeValue={sliderDotsPosition}
                    onChangeValue={(value) => setAttributes({ sliderDotsPosition: value })}
                    onUnitChange={(value) => setAttributes({ sliderDotsPositionUnits: value })}
                    deviceType={deviceType}
                    units={sliderDotsPositionUnits}
                    step={1}
                    resetFallbackValue={""}
                />

                <ResponsiveSpacingControl
                    label={__("Margin", "gslider-blocks")}
                    deviceType={deviceType}
                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                    units={sliderDotsMarginUnits}
                    onChangeUnits={(value) => setAttributes({ sliderDotsMarginUnits: value })}
                    desktopSpacing={sliderDotsDesktopMargin}
                    onChangeDesktopSpacing={(value) => setAttributes({ sliderDotsDesktopMargin: value })}
                    desktopSpacingStyle={(value) => setAttributes({ sliderDotsDesktopMarginCssStyle: value })}
                    tabletSpacing={sliderDotsTabletMargin}
                    onChangeTabletSpacing={(value) => setAttributes({ sliderDotsTabletMargin: value })}
                    tabletSpacingStyle={(value) => setAttributes({ sliderDotsTabletMarginCssStyle: value })}
                    mobileSpacing={sliderDotsMobileMargin}
                    onChangeMobileSpacing={(value) => setAttributes({ sliderDotsMobileMargin: value })}
                    mobileSpacingStyle={(value) => setAttributes({ sliderDotsMobileMarginCssStyle: value })}
                    isLinked={sliderDotsMarginLink}
                    onChangeLink={(value) => setAttributes({ sliderDotsMarginLink: value })} 
                />

                {paginationType === 'bullets' && (
                    <>
                        <BaseControl>
                            <ButtonGroup className="gslider-setting-switcher-panel-btn">
                                {NORMAL_ACTIVE.map((item, key) => (
                                    <Button
                                key={key}
                                        onClick={() => setAttributes({ sliderDotsSwitcher: item.value })} 
                                        className={`gslider-setting-switcher-panel-btn-switcher ${sliderDotsSwitcher === item.value ? 'active' : ''}`}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {sliderDotsSwitcher === 'normal' && (
                            <>
                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Width", "gslider-blocks")}
                                    rangeValue={sliderNormalDotsWidth}
                                    onChangeValue={(value) => setAttributes({ sliderNormalDotsWidth: value })}
                                    onUnitChange={(value) => setAttributes({ sliderNormalDotsWidthUnits: value })}
                                    deviceType={deviceType}
                                    units={sliderNormalDotsWidthUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Height", "gslider-blocks")}
                                    rangeValue={sliderNormalDotsHeight}
                                    onChangeValue={(value) => setAttributes({ sliderNormalDotsHeight: value })}
                                    onUnitChange={(value) => setAttributes({ sliderNormalDotsHeightUnits: value })}
                                    deviceType={deviceType}
                                    units={sliderNormalDotsHeightUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ColorControl
                                    label={__("Color", "gslider-blocks")}
                                    color={sliderNormalDotsBgColor}
                                    onChangeColor={(value) => setAttributes({ sliderNormalDotsBgColor: value })}
                                    defaultColor='#333333'
                                />

                                <SelectControls
                                    label={__("Border Style", "gslider-blocks")}
                                    value={sliderNormalDotsBorder}
                                    options={BORDER_STYLES}
                                    onChange={(value) => setAttributes({ sliderNormalDotsBorder: value })}
                                />

                                <SwitcherControl
                                    label={__("Border Color", "gslider-blocks")}
                                    globalSwitcher={sliderNormalDotsBorderColorSwitcher}
                                    setGlobalSwitcher={(value) => setAttributes({ sliderNormalDotsBorderColorSwitcher: value })}
                                />

                                {sliderNormalDotsBorderColorSwitcher === 'normal' && (
                                    <ColorControl
                                        label={__("Normal Color", "gslider-blocks")}
                                        color={sliderNormalDotsBorderColor}
                                        onChangeColor={(value) => setAttributes({ sliderNormalDotsBorderColor: value })}
                                    />
                                )}

                                {sliderNormalDotsBorderColorSwitcher === 'hover' && (
                                    <ColorControl
                                        label={__("Hover Color", "gslider-blocks")}
                                        color={sliderNormalDotsBorderHoverColor}
                                        onChangeColor={(value) => setAttributes({ sliderNormalDotsBorderHoverColor: value })}
                                    />
                                )}

                                <ResponsiveSpacingControl
                                    label={__("Border Width", "gslider-blocks")}
                                    deviceType={deviceType}
                                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                    units={sliderNormalDotsBorderUnits}
                                    onChangeUnits={(value) => setAttributes({ sliderNormalDotsBorderUnits: value })}
                                    desktopSpacing={sliderNormalDotsDesktopBorder} 
                                    onChangeDesktopSpacing={(value) => setAttributes({ sliderNormalDotsDesktopBorder: value })}
                                    desktopSpacingStyle={(value) => setAttributes({ sliderNormalDotsDesktopBorderCssStyle: value })}
                                    tabletSpacing={sliderNormalDotsTabletBorder} 
                                    onChangeTabletSpacing={(value) => setAttributes({ sliderNormalDotsTabletBorder: value })}
                                    tabletSpacingStyle={(value) => setAttributes({ sliderNormalDotsTabletBorderCssStyle: value })}
                                    mobileSpacing={sliderNormalDotsMobileBorder}
                                    onChangeMobileSpacing={(value) => setAttributes({ sliderNormalDotsMobileBorder: value })}
                                    mobileSpacingStyle={(value) => setAttributes({ sliderNormalDotsMobileBorderCssStyle: value })}
                                    isLinked={sliderNormalDotsBorderLink}
                                    onChangeLink={(value) => setAttributes({ sliderNormalDotsBorderLink: value })} 
                                />

                                <ResponsiveSpacingControl
                                    label={__("Border Radius", "gslider-blocks")}
                                    deviceType={deviceType}
                                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                    units={sliderNormalDotsBorderRadiusUnits}
                                    onChangeUnits={(value) => setAttributes({ sliderNormalDotsBorderRadiusUnits: value })}
                                    desktopSpacing={sliderNormalDotsDesktopBorderRadius}
                                    onChangeDesktopSpacing={(value) => setAttributes({ sliderNormalDotsDesktopBorderRadius: value })}
                                    desktopSpacingStyle={(value) => setAttributes({ sliderNormalDotsDesktopBorderRadiusCssStyle: value })}
                                    tabletSpacing={sliderNormalDotsTabletBorderRadius}
                                    onChangeTabletSpacing={(value) => setAttributes({ sliderNormalDotsTabletBorderRadius: value })}
                                    tabletSpacingStyle={(value) => setAttributes({ sliderNormalDotsTabletBorderRadiusCssStyle: value })}
                                    mobileSpacing={sliderNormalDotsMobileBorderRadius}
                                    onChangeMobileSpacing={(value) => setAttributes({ sliderNormalDotsMobileBorderRadius: value })}
                                    mobileSpacingStyle={(value) => setAttributes({ sliderNormalDotsMobileBorderRadiusCssStyle: value })}
                                    isLinked={sliderNormalDotsBorderRadiusLink}
                                    onChangeLink={(value) => setAttributes({ sliderNormalDotsBorderRadiusLink: value })} 
                                />
                            </>
                        )}

                        {sliderDotsSwitcher === 'active' && (
                            <>
                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Width", "gslider-blocks")}
                                    rangeValue={sliderActiveDotsWidth}
                                    onChangeValue={(value) => setAttributes({ sliderActiveDotsWidth: value })}
                                    onUnitChange={(value) => setAttributes({ sliderActiveDotsWidthUnits: value })}
                                    deviceType={deviceType}
                                    units={sliderActiveDotsWidthUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ResponsiveRangeControl
                                    min={0}
                                    max={100}
                                    label={__("Height", "gslider-blocks")}
                                    rangeValue={sliderActiveDotsHeight}
                                    onChangeValue={(value) => setAttributes({ sliderActiveDotsHeight: value })}
                                    onUnitChange={(value) => setAttributes({ sliderActiveDotsHeightUnits: value })}
                                    deviceType={deviceType}
                                    units={sliderActiveDotsHeightUnits}
                                    step={1}
                                    resetFallbackValue={"8"}
                                />

                                <ColorControl
                                    label={__("Color", "gslider-blocks")}
                                    color={sliderActiveDotsBgColor}
                                    onChangeColor={(value) => setAttributes({ sliderActiveDotsBgColor: value })}
                                />

                                <SelectControls
                                    label={__("Border Style", "gslider-blocks")}
                                    value={sliderActiveDotsBorder}
                                    options={BORDER_STYLES}
                                    onChange={(value) => setAttributes({ sliderActiveDotsBorder: value })}
                                />

                                <SwitcherControl
                                    label={__("Border Color", "gslider-blocks")}
                                    globalSwitcher={sliderActiveDotsBorderColorSwitcher}
                                    setGlobalSwitcher={(value) => setAttributes({ sliderActiveDotsBorderColorSwitcher: value })}
                                />

                                {sliderActiveDotsBorderColorSwitcher === 'normal' && (
                                    <ColorControl
                                        label={__("Normal Color", "gslider-blocks")}
                                        color={sliderActiveDotsBorderColor}
                                        onChangeColor={(value) => setAttributes({ sliderActiveDotsBorderColor: value })}
                                    />
                                )}

                                {sliderActiveDotsBorderColorSwitcher === 'hover' && (
                                    <ColorControl
                                        label={__("Hover Color", "gslider-blocks")}
                                        color={sliderActiveDotsBorderHoverColor}
                                        onChangeColor={(value) => setAttributes({ sliderActiveDotsBorderHoverColor: value })}
                                    />
                                )}

                                <ResponsiveSpacingControl
                                    label={__("Border Width", "gslider-blocks")}
                                    deviceType={deviceType}
                                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                    units={sliderActiveDotsBorderUnits}
                                    onChangeUnits={(value) => setAttributes({ sliderActiveDotsBorderUnits: value })}
                                    desktopSpacing={sliderActiveDotsDesktopBorder} 
                                    onChangeDesktopSpacing={(value) => setAttributes({ sliderActiveDotsDesktopBorder: value })}
                                    desktopSpacingStyle={(value) => setAttributes({ sliderActiveDotsDesktopBorderCssStyle: value })}
                                    tabletSpacing={sliderActiveDotsTabletBorder} 
                                    onChangeTabletSpacing={(value) => setAttributes({ sliderActiveDotsTabletBorder: value })}
                                    tabletSpacingStyle={(value) => setAttributes({ sliderActiveDotsTabletBorderCssStyle: value })}
                                    mobileSpacing={sliderActiveDotsMobileBorder}
                                    onChangeMobileSpacing={(value) => setAttributes({ sliderActiveDotsMobileBorder: value })}
                                    mobileSpacingStyle={(value) => setAttributes({ sliderActiveDotsMobileBorderCssStyle: value })}
                                    isLinked={sliderActiveDotsBorderLink}
                                    onChangeLink={(value) => setAttributes({ sliderActiveDotsBorderLink: value })} 
                                />

                                <ResponsiveSpacingControl
                                    label={__("Border Radius", "gslider-blocks")}
                                    deviceType={deviceType}
                                    onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                    units={sliderActiveDotsBorderRadiusUnits}
                                    onChangeUnits={(value) => setAttributes({ sliderActiveDotsBorderRadiusUnits: value })}
                                    desktopSpacing={sliderActiveDotsDesktopBorderRadius}
                                    onChangeDesktopSpacing={(value) => setAttributes({ sliderActiveDotsDesktopBorderRadius: value })}
                                    desktopSpacingStyle={(value) => setAttributes({ sliderActiveDotsDesktopBorderRadiusCssStyle: value })}
                                    tabletSpacing={sliderActiveDotsTabletBorderRadius}
                                    onChangeTabletSpacing={(value) => setAttributes({ sliderActiveDotsTabletBorderRadius: value })}
                                    tabletSpacingStyle={(value) => setAttributes({ sliderActiveDotsTabletBorderRadiusCssStyle: value })}
                                    mobileSpacing={sliderActiveDotsMobileBorderRadius}
                                    onChangeMobileSpacing={(value) => setAttributes({ sliderActiveDotsMobileBorderRadius: value })}
                                    mobileSpacingStyle={(value) => setAttributes({ sliderActiveDotsMobileBorderRadiusCssStyle: value })}
                                    isLinked={sliderActiveDotsBorderRadiusLink}
                                    onChangeLink={(value) => setAttributes({ sliderActiveDotsBorderRadiusLink: value })} 
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
                opened={openPanels.advanced === "a1"}
                onToggle={() => togglePanel("advanced", "a1")}
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
                opened={openPanels.advanced === "a2"}
                onToggle={() => togglePanel("advanced", "a2")}
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
                opened={openPanels.advanced === "a3"}
                onToggle={() => togglePanel("advanced", "a3")}
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
                opened={openPanels.advanced === "a4"}
                onToggle={() => togglePanel("advanced", "a4")}
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
            ${subtitleLetterSpacing.Desktop && subtitleLetterSpacingUnits.Desktop ? `letter-spacing: ${subtitleLetterSpacing.Desktop}${subtitleLetterSpacingUnits.Desktop};` : ''}
            ${subtitleLineHeight.Desktop && subtitleLineHeightUnits.Desktop ? `line-height: ${subtitleLineHeight.Desktop}${subtitleLineHeightUnits.Desktop};` : ''}
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
            ${titleLetterSpacing.Desktop && titleLetterSpacingUnits.Desktop ? `letter-spacing: ${titleLetterSpacing.Desktop}${titleLetterSpacingUnits.Desktop};` : ''}
            ${titleLineHeight.Desktop && titleLineHeightUnits.Desktop ? `line-height: ${titleLineHeight.Desktop}${titleLineHeightUnits.Desktop};` : ''}
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
            ${descriptionLetterSpacing.Desktop && descriptionLetterSpacingUnits.Desktop ? `letter-spacing: ${descriptionLetterSpacing.Desktop}${descriptionLetterSpacingUnits.Desktop};` : ''}
            ${descriptionLineHeight.Desktop && descriptionLineHeightUnits.Desktop ? `line-height: ${descriptionLineHeight.Desktop}${descriptionLineHeightUnits.Desktop};` : ''}
            ${descriptionColor ? `color: ${descriptionColor};` : ''}
            ${descriptionDesktopMarginCssStyle ? `margin: ${descriptionDesktopMarginCssStyle};` : ''} 
            ${descriptionDesktopPaddingCssStyle ? `padding: ${descriptionDesktopPaddingCssStyle};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description:hover {
            ${descriptionColorHover ? `color: ${descriptionColorHover};` : ''}
        }
        
        .${blockId} .swiper-button-prev,
        .${blockId} .swiper-button-next {
            ${sliderArrowsColor ? `color: ${sliderArrowsColor};` : ''}
            ${sliderArrowsNormalBackgroundType === 'gradient' ? `  
                background: ${sliderArrowsNormalCustomGradientSwitcher && sliderArrowsNormalCustomGradientInputValue ? sliderArrowsNormalCustomGradientInputValue : sliderArrowsNormalGradientColor ? sliderArrowsNormalGradientColor : sliderArrowsNormalClassicColor};
            ` : `
                ${sliderArrowsNormalClassicColor ? `background: ${sliderArrowsNormalClassicColor};` : ''}
            `}
            ${sliderArrowsBorder ? `border: ${sliderArrowsBorder};` : ''}
			${sliderArrowsDesktopBorderCssStyle ? `border-width: ${sliderArrowsDesktopBorderCssStyle};` : ''}  
			${sliderArrowsDesktopBorderRadiusCssStyle ? `border-radius: ${sliderArrowsDesktopBorderRadiusCssStyle};` : ''}
            ${sliderArrowsBorderColor ? `border-color: ${sliderArrowsBorderColor};` : ''}
            ${sliderArrowsBoxShadowCssValue ? `box-shadow: ${sliderArrowsBoxShadowCssValue};` : ''}
            ${sliderArrowsWidth.Desktop ? `width: ${sliderArrowsWidth.Desktop}${sliderArrowsWidthUnits.Desktop};` : ''}
            ${sliderArrowsHeight.Desktop ? `height: ${sliderArrowsHeight.Desktop}${sliderArrowsHeightUnits.Desktop};` : ''}
            ${sliderArrowsPosition.Desktop ? `top: ${sliderArrowsPosition.Desktop}${sliderArrowsPositionUnits.Desktop};` : ''}
            transition: all .3s ease-in-out;
        }
        .${blockId} .swiper-button-prev:hover,
        .${blockId} .swiper-button-next:hover {
            ${sliderArrowsColorHover ? `color: ${sliderArrowsColorHover};` : ''}
            ${sliderArrowsHoverBackgroundType === 'gradient' ? `
                background: ${sliderArrowsHoverCustomGradientSwitcher && sliderArrowsHoverCustomGradientInputValue ? sliderArrowsHoverCustomGradientInputValue : sliderArrowsHoverGradientColor ? sliderArrowsHoverGradientColor : sliderArrowsHoverClassicColor};
            ` : `
                ${sliderArrowsHoverClassicColor ? `background: ${sliderArrowsHoverClassicColor};` : ''}
            `}
            ${sliderArrowsBorderHoverColor ? `border-color: ${sliderArrowsBorderHoverColor};` : ''}
            ${sliderArrowsBoxShadowHoverCssValue ? `box-shadow: ${sliderArrowsBoxShadowHoverCssValue};` : ''}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${sliderArrowsSize.Desktop ? `font-size: ${sliderArrowsSize.Desktop}${sliderArrowsSizeUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-button-prev {
            ${sliderArrowsLeftOffset.Desktop ? `left: ${sliderArrowsLeftOffset.Desktop}${sliderArrowsLeftOffsetUnits.Desktop};` : ''}
        }
        .${blockId} .swiper-button-next {
            ${sliderArrowsRightOffset.Desktop ? `right: ${sliderArrowsRightOffset.Desktop}${sliderArrowsRightOffsetUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination {
            ${sliderDotsPosition.Desktop ? `bottom: ${sliderDotsPosition.Desktop}${sliderDotsPositionUnits.Desktop} !important;` : ''}
            ${sliderDotsDesktopMarginCssStyle ? `margin: ${sliderDotsDesktopMarginCssStyle};` : ''}
        }

        .${blockId} .swiper-pagination-bullet {
            ${sliderNormalDotsBgColor ? `background-color: ${sliderNormalDotsBgColor};` : ''}
            ${sliderNormalDotsBorder ? `border: ${sliderNormalDotsBorder};` : ''}
			${sliderNormalDotsDesktopBorderCssStyle ? `border-width: ${sliderNormalDotsDesktopBorderCssStyle};` : ''}   
			${sliderNormalDotsDesktopBorderRadiusCssStyle ? `border-radius: ${sliderNormalDotsDesktopBorderRadiusCssStyle};` : ''}
            ${sliderNormalDotsBorderColor ? `border-color: ${sliderNormalDotsBorderColor};` : ''}
            ${sliderNormalDotsWidth.Desktop ? `width: ${sliderNormalDotsWidth.Desktop}${sliderNormalDotsWidthUnits.Desktop};` : ''}
            ${sliderNormalDotsHeight.Desktop ? `height: ${sliderNormalDotsHeight.Desktop}${sliderNormalDotsHeightUnits.Desktop};` : ''}
        }

        .${blockId} .swiper-pagination-bullet-active {
            ${sliderActiveDotsBgColor ? `background-color: ${sliderActiveDotsBgColor};` : ''}
            ${sliderActiveDotsBorder ? `border: ${sliderActiveDotsBorder};` : ''}
			${sliderActiveDotsDesktopBorderCssStyle ? `border-width: ${sliderActiveDotsDesktopBorderCssStyle};` : ''}   
			${sliderActiveDotsDesktopBorderRadiusCssStyle ? `border-radius: ${sliderActiveDotsDesktopBorderRadiusCssStyle};` : ''}
            ${sliderActiveDotsBorderColor ? `border-color: ${sliderActiveDotsBorderColor};` : ''}
            ${sliderActiveDotsWidth.Desktop ? `width: ${sliderActiveDotsWidth.Desktop}${sliderActiveDotsWidthUnits.Desktop};` : ''}
            ${sliderActiveDotsHeight.Desktop ? `height: ${sliderActiveDotsHeight.Desktop}${sliderActiveDotsHeightUnits.Desktop};` : ''}
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
                ${subtitleLetterSpacing.Tablet && subtitleLetterSpacingUnits.Tablet ? `letter-spacing: ${subtitleLetterSpacing.Tablet}${subtitleLetterSpacingUnits.Tablet};` : ''}
                ${subtitleLineHeight.Tablet && subtitleLineHeightUnits.Tablet ? `line-height: ${subtitleLineHeight.Tablet}${subtitleLineHeightUnits.Tablet};` : ''}
                ${subtitleTabletMarginCssStyle ? `margin: ${subtitleTabletMarginCssStyle};` : ''} 
                ${subtitleTabletPaddingCssStyle ? `padding: ${subtitleTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Tablet && titleFontSizeUnits.Tablet ? `font-size: ${titleFontSize.Tablet}${titleFontSizeUnits.Tablet};` : ''}
                ${titleLetterSpacing.Tablet && titleLetterSpacingUnits.Tablet ? `letter-spacing: ${titleLetterSpacing.Tablet}${titleLetterSpacingUnits.Tablet};` : ''}
                ${titleLineHeight.Tablet && titleLineHeightUnits.Tablet ? `line-height: ${titleLineHeight.Tablet}${titleLineHeightUnits.Tablet};` : ''}
                ${titleTabletMarginCssStyle ? `margin: ${titleTabletMarginCssStyle};` : ''} 
                ${titleTabletPaddingCssStyle ? `padding: ${titleTabletPaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Tablet && descriptionFontSizeUnits.Tablet ? `font-size: ${descriptionFontSize.Tablet}${descriptionFontSizeUnits.Tablet};` : ''}
                ${descriptionLetterSpacing.Tablet && descriptionLetterSpacingUnits.Tablet ? `letter-spacing: ${descriptionLetterSpacing.Tablet}${descriptionLetterSpacingUnits.Tablet};` : ''}
                ${descriptionLineHeight.Tablet && descriptionLineHeightUnits.Tablet ? `line-height: ${descriptionLineHeight.Tablet}${descriptionLineHeightUnits.Tablet};` : ''}
                ${descriptionTabletMarginCssStyle ? `margin: ${descriptionTabletMarginCssStyle};` : ''} 
                ${descriptionTabletPaddingCssStyle ? `padding: ${descriptionTabletPaddingCssStyle};` : ''}
            }

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${sliderArrowsTabletBorderCssStyle ? `border-width: ${sliderArrowsTabletBorderCssStyle};` : ''}  
                ${sliderArrowsTabletBorderRadiusCssStyle ? `border-radius: ${sliderArrowsTabletBorderRadiusCssStyle};` : ''}
                ${sliderArrowsWidth.Tablet ? `width: ${sliderArrowsWidth.Tablet}${sliderArrowsWidthUnits.Tablet};` : ''}
                ${sliderArrowsHeight.Tablet ? `height: ${sliderArrowsHeight.Tablet}${sliderArrowsHeightUnits.Tablet};` : ''}
                ${sliderArrowsPosition.Tablet ? `top: ${sliderArrowsPosition.Tablet}${sliderArrowsPositionUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${sliderArrowsSize.Tablet ? `font-size: ${sliderArrowsSize.Tablet}${sliderArrowsSizeUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-button-prev {
                ${sliderArrowsLeftOffset.Tablet ? `left: ${sliderArrowsLeftOffset.Tablet}${sliderArrowsLeftOffsetUnits.Tablet};` : ''}
            }
            .${blockId} .swiper-button-next {
                ${sliderArrowsRightOffset.Tablet ? `right: ${sliderArrowsRightOffset.Tablet}${sliderArrowsRightOffsetUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${sliderDotsPosition.Tablet ? `bottom: ${sliderDotsPosition.Tablet}${sliderDotsPositionUnits.Tablet} !important;` : ''}
                ${sliderDotsTabletMarginCssStyle ? `margin: ${sliderDotsTabletMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${sliderNormalDotsTabletBorderCssStyle ? `border-width: ${sliderNormalDotsTabletBorderCssStyle};` : ''}   
                ${sliderNormalDotsTabletBorderRadiusCssStyle ? `border-radius: ${sliderNormalDotsTabletBorderRadiusCssStyle};` : ''}
                ${sliderNormalDotsWidth.Tablet ? `width: ${sliderNormalDotsWidth.Tablet}${sliderNormalDotsWidthUnits.Tablet};` : ''}
                ${sliderNormalDotsHeight.Tablet ? `height: ${sliderNormalDotsHeight.Tablet}${sliderNormalDotsHeightUnits.Tablet};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${sliderActiveDotsTabletBorderCssStyle ? `border-width: ${sliderActiveDotsTabletBorderCssStyle};` : ''}   
                ${sliderActiveDotsTabletBorderRadiusCssStyle ? `border-radius: ${sliderActiveDotsTabletBorderRadiusCssStyle};` : ''}
                ${sliderActiveDotsWidth.Tablet ? `width: ${sliderActiveDotsWidth.Tablet}${sliderActiveDotsWidthUnits.Tablet};` : ''}
                ${sliderActiveDotsHeight.Tablet ? `height: ${sliderActiveDotsHeight.Tablet}${sliderActiveDotsHeightUnits.Tablet};` : ''}
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
                ${subtitleLetterSpacing.Mobile && subtitleLetterSpacingUnits.Mobile ? `letter-spacing: ${subtitleLetterSpacing.Mobile}${subtitleLetterSpacingUnits.Mobile};` : ''}
                ${subtitleLineHeight.Mobile && subtitleLineHeightUnits.Mobile ? `line-height: ${subtitleLineHeight.Mobile}${subtitleLineHeightUnits.Mobile};` : ''}
                ${subtitleMobileMarginCssStyle ? `margin: ${subtitleMobileMarginCssStyle};` : ''} 
                ${subtitleMobilePaddingCssStyle ? `padding: ${subtitleMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Mobile && titleFontSizeUnits.Mobile ? `font-size: ${titleFontSize.Mobile}${titleFontSizeUnits.Mobile};` : ''}
                ${titleLetterSpacing.Mobile && titleLetterSpacingUnits.Mobile ? `letter-spacing: ${titleLetterSpacing.Mobile}${titleLetterSpacingUnits.Mobile};` : ''}
                ${titleLineHeight.Mobile && titleLineHeightUnits.Mobile ? `line-height: ${titleLineHeight.Mobile}${titleLineHeightUnits.Mobile};` : ''}
                ${titleMobileMarginCssStyle ? `margin: ${titleMobileMarginCssStyle};` : ''} 
                ${titleMobilePaddingCssStyle ? `padding: ${titleMobilePaddingCssStyle};` : ''}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Mobile && descriptionFontSizeUnits.Mobile ? `font-size: ${descriptionFontSize.Mobile}${descriptionFontSizeUnits.Mobile};` : ''}
                ${descriptionLetterSpacing.Mobile && descriptionLetterSpacingUnits.Mobile ? `letter-spacing: ${descriptionLetterSpacing.Mobile}${descriptionLetterSpacingUnits.Mobile};` : ''}
                ${descriptionLineHeight.Mobile && descriptionLineHeightUnits.Mobile ? `line-height: ${descriptionLineHeight.Mobile}${descriptionLineHeightUnits.Mobile};` : ''}
                ${descriptionMobileMarginCssStyle ? `margin: ${descriptionMobileMarginCssStyle};` : ''} 
                ${descriptionMobilePaddingCssStyle ? `padding: ${descriptionMobilePaddingCssStyle};` : ''}
            }

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${sliderArrowsMobileBorderCssStyle ? `border-width: ${sliderArrowsMobileBorderCssStyle};` : ''}  
                ${sliderArrowsMobileBorderRadiusCssStyle ? `border-radius: ${sliderArrowsMobileBorderRadiusCssStyle};` : ''}
                ${sliderArrowsWidth.Mobile ? `width: ${sliderArrowsWidth.Mobile}${sliderArrowsWidthUnits.Mobile};` : ''}
                ${sliderArrowsHeight.Mobile ? `height: ${sliderArrowsHeight.Mobile}${sliderArrowsHeightUnits.Mobile};` : ''}
                ${sliderArrowsPosition.Mobile ? `top: ${sliderArrowsPosition.Mobile}${sliderArrowsPositionUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${sliderArrowsSize.Mobile ? `font-size: ${sliderArrowsSize.Mobile}${sliderArrowsSizeUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-button-prev {
                ${sliderArrowsLeftOffset.Mobile ? `left: ${sliderArrowsLeftOffset.Mobile}${sliderArrowsLeftOffsetUnits.Mobile};` : ''}
            }
            .${blockId} .swiper-button-next {
                ${sliderArrowsRightOffset.Mobile ? `right: ${sliderArrowsRightOffset.Mobile}${sliderArrowsRightOffsetUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination {
                ${sliderDotsPosition.Mobile ? `bottom: ${sliderDotsPosition.Mobile}${sliderDotsPositionUnits.Mobile} !important;` : ''}
                ${sliderDotsMobileMarginCssStyle ? `margin: ${sliderDotsMobileMarginCssStyle};` : ''}
            }

            .${blockId} .swiper-pagination-bullet {
                ${sliderNormalDotsMobileBorderCssStyle ? `border-width: ${sliderNormalDotsMobileBorderCssStyle};` : ''}   
                ${sliderNormalDotsMobileBorderRadiusCssStyle ? `border-radius: ${sliderNormalDotsMobileBorderRadiusCssStyle};` : ''}
                ${sliderNormalDotsWidth.Mobile ? `width: ${sliderNormalDotsWidth.Mobile}${sliderNormalDotsWidthUnits.Mobile};` : ''}
                ${sliderNormalDotsHeight.Mobile ? `height: ${sliderNormalDotsHeight.Mobile}${sliderNormalDotsHeightUnits.Mobile};` : ''}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${sliderActiveDotsMobileBorderCssStyle ? `border-width: ${sliderActiveDotsMobileBorderCssStyle};` : ''}   
                ${sliderActiveDotsMobileBorderRadiusCssStyle ? `border-radius: ${sliderActiveDotsMobileBorderRadiusCssStyle};` : ''}
                ${sliderActiveDotsWidth.Mobile ? `width: ${sliderActiveDotsWidth.Mobile}${sliderActiveDotsWidthUnits.Mobile};` : ''}
                ${sliderActiveDotsHeight.Mobile ? `height: ${sliderActiveDotsHeight.Mobile}${sliderActiveDotsHeightUnits.Mobile};` : ''}
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
        subtitleLetterSpacing,
        subtitleLetterSpacingUnits,
        subtitleLineHeight,
        subtitleLineHeightUnits,

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
        titleLetterSpacing,
        titleLetterSpacingUnits,
        titleLineHeight,
        titleLineHeightUnits,

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
        descriptionLetterSpacing,
        descriptionLetterSpacingUnits,
        descriptionLineHeight,
        descriptionLineHeightUnits,

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

        /** Start Arrows Style */
        sliderArrowsSize,
        sliderArrowsSizeUnits,

        /** Start Arrows Color */
        sliderArrowsColorSwitcher,
        sliderArrowsColor,
        sliderArrowsColorHover,
        /** End Arrows Color */

        /** Start Background */
        sliderArrowsNormalBackgroundType,
        sliderArrowsNormalClassicColor,
        sliderArrowsNormalGradientColor,
        sliderArrowsNormalCustomGradientSwitcher,
        sliderArrowsNormalCustomGradientInputValue,
        sliderArrowsHoverBackgroundType,
        sliderArrowsHoverClassicColor,
        sliderArrowsHoverGradientColor,
        sliderArrowsHoverCustomGradientSwitcher,
        sliderArrowsHoverCustomGradientInputValue,
        /** End Background */

        /** Start Arrows Dimensions */
        sliderArrowsWidth,
        sliderArrowsWidthUnits,
        sliderArrowsHeight,
        sliderArrowsHeightUnits,
        /** End Arrows Dimensions */

        /** Start Border */
        sliderArrowsBorder,
        sliderArrowsBorderColorSwitcher,
        sliderArrowsBorderColor,
        sliderArrowsBorderHoverColor,
        sliderArrowsBorderUnits,
        sliderArrowsDesktopBorder,
        sliderArrowsDesktopBorderCssStyle,
        sliderArrowsTabletBorder,
        sliderArrowsTabletBorderCssStyle,
        sliderArrowsMobileBorder,
        sliderArrowsMobileBorderCssStyle,
        sliderArrowsBorderLink,
        /** End Border */

        /** Start Border Radius */
        sliderArrowsBorderRadiusUnits,
        sliderArrowsDesktopBorderRadius,
        sliderArrowsDesktopBorderRadiusCssStyle,
        sliderArrowsTabletBorderRadius,
        sliderArrowsTabletBorderRadiusCssStyle,
        sliderArrowsMobileBorderRadius,
        sliderArrowsMobileBorderRadiusCssStyle,
        sliderArrowsBorderRadiusLink,
        /** End Border Radius */

        /** Start Box Shadow */
        sliderArrowsBoxShadowValuesSwitcher,
        sliderArrowsBoxShadowValues,
        sliderArrowsBoxShadowCssValue,
        sliderArrowsBoxShadowHoverValues,
        sliderArrowsBoxShadowHoverCssValue,
        /** End Box Shadow */

        /** Start Position */
        sliderArrowsPosition,
        sliderArrowsPositionUnits,
        sliderArrowsRightOffset,
        sliderArrowsRightOffsetUnits,
        sliderArrowsLeftOffset,
        sliderArrowsLeftOffsetUnits,
        /** End Position */

        /** Start Dots Margin */
        sliderDotsMarginUnits,
        sliderDotsDesktopMargin,
        sliderDotsDesktopMarginCssStyle,
        sliderDotsTabletMargin,
        sliderDotsTabletMarginCssStyle,
        sliderDotsMobileMargin,
        sliderDotsMobileMarginCssStyle,
        sliderDotsMarginLink,
        /** End Dots Margin */

        /** Start Dots Position */
        sliderDotsPosition,
        sliderDotsPositionUnits,
        /** End Dots Position */

        /** Start Dots Style */
        sliderDotsSwitcher,
        sliderNormalDotsBgColor,
        sliderActiveDotsBgColor,
        sliderNormalDotsWidth,
        sliderNormalDotsWidthUnits,
        sliderNormalDotsHeight,
        sliderNormalDotsHeightUnits,
        /** End Dots Style */

        /** Start Dots Border */
        sliderNormalDotsBorder,
        sliderNormalDotsBorderColorSwitcher,
        sliderNormalDotsBorderColor,
        sliderNormalDotsBorderHoverColor,
        sliderNormalDotsBorderUnits,
        sliderNormalDotsDesktopBorder,
        sliderNormalDotsDesktopBorderCssStyle,
        sliderNormalDotsTabletBorder,
        sliderNormalDotsTabletBorderCssStyle,
        sliderNormalDotsMobileBorder,
        sliderNormalDotsMobileBorderCssStyle,
        sliderNormalDotsBorderLink,
        /** End Dots Border */

        /** Start Dots Border Radius */
        sliderNormalDotsBorderRadius,
        sliderNormalDotsBorderRadiusUnits,
        sliderNormalDotsDesktopBorderRadius,
        sliderNormalDotsDesktopBorderRadiusCssStyle,
        sliderNormalDotsTabletBorderRadius,
        sliderNormalDotsTabletBorderRadiusCssStyle,
        sliderNormalDotsMobileBorderRadius,
        sliderNormalDotsMobileBorderRadiusCssStyle,
        sliderNormalDotsBorderRadiusLink,
        /** End Dots Border Radius */

        /** Start Active Dots */
        sliderActiveDotsWidth,
        sliderActiveDotsWidthUnits,
        sliderActiveDotsHeight,
        sliderActiveDotsHeightUnits,
        /** End Active Dots */

        /** Start Active Dots Border */
        sliderActiveDotsBorder,
        sliderActiveDotsBorderColorSwitcher,
        sliderActiveDotsBorderColor,
        sliderActiveDotsBorderHoverColor,
        /** End Active Dots Border */

        /** Start Active Dots Border */
        sliderActiveDotsBorderUnits,
        sliderActiveDotsDesktopBorder,
        sliderActiveDotsDesktopBorderCssStyle,
        sliderActiveDotsTabletBorder,
        sliderActiveDotsTabletBorderCssStyle,
        sliderActiveDotsMobileBorder,
        sliderActiveDotsMobileBorderCssStyle,
        sliderActiveDotsBorderLink,
        /** End Active Dots Border */

        /** Start Active Dots Border Radius */
        sliderActiveDotsBorderRadiusUnits,
        sliderActiveDotsDesktopBorderRadius,
        sliderActiveDotsDesktopBorderRadiusCssStyle,
        sliderActiveDotsTabletBorderRadius,
        sliderActiveDotsTabletBorderRadiusCssStyle,
        sliderActiveDotsMobileBorderRadius,
        sliderActiveDotsMobileBorderRadiusCssStyle,
        sliderActiveDotsBorderRadiusLink,
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
