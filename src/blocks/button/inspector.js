import { __ } from '@wordpress/i18n';

import { 
    InspectorControls, 
} from '@wordpress/block-editor';

import { 
    SelectControl,
    PanelBody,
    TabPanel,
    BaseControl,
    Button,
    ButtonGroup,
    ToggleControl,
    TextControl,
    TextareaControl,
    Dropdown,
    Dashicon,
    RangeControl,
    ColorPicker,
    ColorPalette,
} from '@wordpress/components';

/**
 * Internal depencencies
 */
import {
    NORMAL_HOVER,
    UNIT_TYPES,
    TEXT_ALIGN,
    ICON_ALIGN,
    FONT_FAMILYS,
    BORDER_STYLES,
} from "@Constants";

import { useEffect, useMemo } from "@wordpress/element";
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundColorControl from '@Components/background-color-control';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import FBIconPicker from "../../components/icon-picker";
import './editor.scss';

export default function Inspector ({ attributes, setAttributes,  clientId}) {
    const {
        blockId,
        deviceType,
        buttonAlignment,
        buttonText,
        buttonUrl,
        buttonTargetUrl,
        buttonWidth,
        buttonWidthUnits,
    
        /** Typography */
        buttonFontFamily,
        buttonFontSize,
        buttonFontSizeUnits,
        buttonFontWeight,
        buttonFontStyle,
        buttonTextTransform,
        buttonTextDecoration,
        buttonLetterSpacing,
        buttonLetterSpacingUnits,
        buttonLineHeight,
        buttonLineHeightUnits,
    
        /** Color */
        buttonColorSwitcher,
        buttonColor,
        buttonHoverColor,

        /** Button Background Color */
        buttonBgColorSwitcher,
        buttonBgType,
        buttonBgClassicColor,
        buttonBgGradientColor,
        buttonBgCustomGradientSwitcher,
        buttonBgCustomGradientInputValue,
    
        buttonHoverBgType,
        buttonHoverBgClassicColor,
        buttonHoverBgGradientColor,
        buttonHoverBgCustomGradientSwitcher,
        buttonHoverBgCustomGradientInputValue,

        /** Padding */
        buttonPaddingUnits,
        buttonPaddingDesktop,
        buttonPaddingDesktopCssStyle,
        buttonPaddingTablet,
        buttonPaddingTabletCssStyle,
        buttonPaddingMobile,
        buttonPaddingMobileCssStyle,
        buttonPaddingLink,

        /** Margin */
        buttonMarginUnits,
        buttonMarginDesktop,
        buttonMarginDesktopCssStyle,
        buttonMarginTablet,
        buttonMarginTabletCssStyle,
        buttonMarginMobile,
        buttonMarginMobileCssStyle,
        buttonMarginLink,
    
        /** Border */
        buttonBorder,
        buttonBorderColorSwitcher,
        buttonBorderColor,
        buttonBorderHoverColor,
        buttonBorderUnits,
        buttonBorderDesktop,
        buttonBorderDesktopCssStyle,
        buttonBorderTablet,
        buttonBorderTabletCssStyle,
        buttonBorderMobile,
        buttonBorderMobileCssStyle,
        buttonBorderLink,

        /** Border Radius */
        buttonBorderRadiusUnits,
        buttonBorderRadiusDesktop,
        buttonBorderRadiusDesktopCssStyle,
        buttonBorderRadiusTablet,
        buttonBorderRadiusTabletCssStyle,
        buttonBorderRadiusMobile,
        buttonBorderRadiusMobileCssStyle,
        buttonBorderRadiusLink,

        /** Box Shadow */
        buttonboxShadowValuesSwitcher,
        buttonboxShadowValues,
        buttonboxShadowCssValue,
        buttonboxShadowHoverValues,
        buttonboxShadowHoverCssValue,

        /** Icon */
        buttonIconAlign,
        buttonIcon,
        buttonIconPosition,

        buttonIconSize,
        buttonIconSizeUnits,
        buttonIconColorSwitcher,
        buttonIconColor,
        buttonIconHoverColor,
		buttonIconBgColorSwitcher,
        buttonIconBgColor,
        buttonIconBgHoverColor,

        buttonIconBorder,
        buttonIconBorderColorSwitcher,
        buttonIconBorderColor,
        buttonIconBorderHoverColor,

        buttonIconBorderUnits,
        buttonIconBorderDesktop,
        buttonIconBorderDesktopCssStyle,
        buttonIconBorderTablet,
        buttonIconBorderTabletCssStyle,
        buttonIconBorderMobile,
        buttonIconBorderMobileCssStyle,
        buttonIconBorderLink,

        buttonIconBorderRadiusUnits,
        buttonIconBorderRadiusDesktop,
        buttonIconBorderRadiusDesktopCssStyle,
        buttonIconBorderRadiusTablet,
        buttonIconBorderRadiusTabletCssStyle,
        buttonIconBorderRadiusMobile,
        buttonIconBorderRadiusMobileCssStyle,
        buttonIconBorderRadiusLink,

        buttonIconGapSize,
        buttonIconGapUnits,
    
        /** Global Styles */
        /** Z-index */
        buttonZIndex,

        /** Start Background */
        buttonGlobalBgColorSwitcher,
        buttonGlobalBgType,
        buttonGlobalBgClassicColor,
        buttonGlobalBgGradientColor,
        buttonGlobalBgCustomGradientSwitcher,
        buttonGlobalBgCustomGradientInputValue,

        buttonGlobalHoverBgType,
        buttonGlobalHoverBgClassicColor,
        buttonGlobalHoverBgGradientColor,
        buttonGlobalHoverBgCustomGradientSwitcher,
        buttonGlobalHoverBgCustomGradientInputValue,
        /** End Background */

        /** Padding */
        buttonGlobalPaddingUnits,
        buttonGlobalPaddingDesktop,
        buttonGlobalPaddingDesktopCssStyle,
        buttonGlobalPaddingTablet,
        buttonGlobalPaddingTabletCssStyle,
        buttonGlobalPaddingMobile,
        buttonGlobalPaddingMobileCssStyle,
        buttonGlobalPaddingLink,

        /** Margin */
        buttonGlobalMarginUnits,
        buttonGlobalMarginDesktop,
        buttonGlobalMarginDesktopCssStyle,
        buttonGlobalMarginTablet,
        buttonGlobalMarginTabletCssStyle,
        buttonGlobalMarginMobile,
        buttonGlobalMarginMobileCssStyle,
        buttonGlobalMarginLink,

        /** Border */
        buttonGlobalBorder,
        buttonGlobalBorderColorSwitcher,
        buttonGlobalBorderColor,
        buttonGlobalBorderHoverColor,
        buttonGlobalBorderUnits,
        buttonGlobalBorderDesktop,
        buttonGlobalBorderDesktopCssStyle,
        buttonGlobalBorderTablet,
        buttonGlobalBorderTabletCssStyle,
        buttonGlobalBorderMobile,
        buttonGlobalBorderMobileCssStyle,
        buttonGlobalBorderLink,

        /** Border Radius */
        buttonGlobalBorderRadiusUnits,
        buttonGlobalBorderRadiusDesktop,
        buttonGlobalBorderRadiusDesktopCssStyle,
        buttonGlobalBorderRadiusTablet,
        buttonGlobalBorderRadiusTabletCssStyle,
        buttonGlobalBorderRadiusMobile,
        buttonGlobalBorderRadiusMobileCssStyle,
        buttonGlobalBorderRadiusLink,

        /** Box Shadow */
        buttonGlobalBoxShadowValuesSwitcher,
        buttonGlobalBoxShadowValues,
        buttonGlobalBoxShadowCssValue,
        buttonGlobalBoxShadowHoverValues,
        buttonGlobalBoxShadowHoverCssValue,

        /** Other Styles */
        blockStyle
        
    } = attributes;

    useEffect(() => {
        if (!blockId) {
            setAttributes({
                blockId: "bb-advanced-button-" + clientId.slice(0, 8),
            });
        }
    }, [blockId, clientId, setAttributes]);

    /** Load Google Font */
    LoadGoogleFont(buttonFontFamily);

    /** Format Spacing */
    const spacingFormat = (spacing, units) => {
        return spacing.top || spacing.right || spacing.bottom || spacing.left
            ? `${spacing.top}${units} ${spacing.right}${units} ${spacing.bottom}${units} ${spacing.left}${units}`
            : '';
    };

    /** set the css style if have default padding */
    useEffect(() => {
        setAttributes({
            buttonPaddingDesktopCssStyle: spacingFormat(buttonPaddingDesktop, buttonPaddingUnits.Desktop),
            buttonPaddingTabletCssStyle: spacingFormat(buttonPaddingTablet, buttonPaddingUnits.Tablet),
            buttonPaddingMobileCssStyle: spacingFormat(buttonPaddingMobile, buttonPaddingUnits.Mobile),

            buttonBorderRadiusDesktopCssStyle: spacingFormat(buttonBorderRadiusDesktop, buttonBorderRadiusUnits.Desktop),
            buttonBorderRadiusTabletCssStyle: spacingFormat(buttonBorderRadiusTablet, buttonBorderRadiusUnits.Tablet),
            buttonBorderRadiusMobileCssStyle: spacingFormat(buttonBorderRadiusMobile, buttonBorderRadiusUnits.Mobile),
        });
    }, [
        buttonPaddingDesktop,
        buttonPaddingTablet,
        buttonPaddingMobile,
        buttonPaddingUnits,
        buttonBorderRadiusDesktop,
        buttonBorderRadiusTablet,
        buttonBorderRadiusMobile,
        buttonBorderRadiusUnits,
    ]);
    /** end if have default padding then set the css style */
 
    const allBlockStyle = useMemo(() => `

        .${blockId} .bb-advanced-button-wrapper {
            ${buttonZIndex.Desktop ? `z-index: ${buttonZIndex.Desktop};` : ''}
            ${buttonGlobalBgType === 'gradient' ? `  
                background: ${buttonGlobalBgCustomGradientSwitcher && buttonGlobalBgCustomGradientInputValue ? buttonGlobalBgCustomGradientInputValue : buttonGlobalBgGradientColor ? buttonGlobalBgGradientColor : buttonGlobalBgClassicColor};
            ` : `
                background: ${buttonGlobalBgClassicColor};
            `}
			${buttonGlobalPaddingDesktopCssStyle ? `padding: ${buttonGlobalPaddingDesktopCssStyle};` : ''}
			${buttonGlobalMarginDesktopCssStyle ? `margin: ${buttonGlobalMarginDesktopCssStyle};` : ''} 
			${buttonGlobalBorder ? `border: ${buttonGlobalBorder};` : ''} 
			${buttonGlobalBorderDesktopCssStyle ? `border-width: ${buttonGlobalBorderDesktopCssStyle};` : ''}
			${buttonGlobalBorderRadiusDesktopCssStyle ? `border-radius: ${buttonGlobalBorderRadiusDesktopCssStyle};` : ''}
			${buttonGlobalBorderColor ? `border-color: ${buttonGlobalBorderColor};` : ''}
			${buttonGlobalBoxShadowCssValue ? `box-shadow: ${buttonGlobalBoxShadowCssValue};` : ''}
            position: relative;
        }
        .${blockId} .bb-advanced-button-wrapper:hover {
            ${buttonGlobalHoverBgType === 'gradient' ? `  
                background: ${buttonGlobalHoverBgCustomGradientSwitcher && buttonGlobalHoverBgCustomGradientInputValue ? buttonGlobalHoverBgCustomGradientInputValue : buttonGlobalHoverBgGradientColor ? buttonGlobalHoverBgGradientColor : buttonGlobalHoverBgClassicColor};
            ` : `
                background: ${buttonGlobalHoverBgClassicColor};
            `}
			${buttonGlobalBorderHoverColor ? `border-color: ${buttonGlobalBorderHoverColor};` : ''}
            ${buttonGlobalBoxShadowHoverCssValue ? `box-shadow: ${buttonGlobalBoxShadowHoverCssValue};` : ''}
        }

        .${blockId} .bb-advanced-button-wrapper .bb-advanced-button {
            ${buttonFontFamily ? `font-family: ${buttonFontFamily};` : ''}
            ${buttonFontSize.Desktop && buttonFontSizeUnits.Desktop ? `font-size: ${buttonFontSize.Desktop}${buttonFontSizeUnits.Desktop};` : ''}
            ${buttonFontWeight ? `font-weight: ${buttonFontWeight};` : ''}
            ${buttonFontStyle ? `font-style: ${buttonFontStyle};` : ''}
            ${buttonTextTransform ? `text-transform: ${buttonTextTransform};` : ''}
            ${buttonTextDecoration ? `text-decoration: ${buttonTextDecoration};` : ''}
            ${buttonLetterSpacing.Desktop && buttonLetterSpacingUnits.Desktop ? `letter-spacing: ${buttonLetterSpacing.Desktop}${buttonLetterSpacingUnits.Desktop};` : ''}
            ${buttonLineHeight.Desktop && buttonLineHeightUnits.Desktop ? `line-height: ${buttonLineHeight.Desktop}${buttonLineHeightUnits.Desktop};` : ''}
            ${buttonColor ? `color: ${buttonColor} !important;` : ''}
            ${buttonBgType === 'gradient' ? `  
                background: ${buttonBgCustomGradientSwitcher && buttonBgCustomGradientInputValue ? buttonBgCustomGradientInputValue : buttonBgGradientColor ? buttonBgGradientColor : buttonBgClassicColor};
            `: `
                background: ${buttonBgClassicColor};
            `}
            ${buttonPaddingDesktopCssStyle ? `padding: ${buttonPaddingDesktopCssStyle};` : ''}
            ${buttonMarginDesktopCssStyle ? `margin: ${buttonMarginDesktopCssStyle};` : ''}
            ${buttonBorder ? `border: ${buttonBorder};` : ''}
            ${buttonBorderDesktopCssStyle ? `border-width: ${buttonBorderDesktopCssStyle};` : ''}
            ${buttonBorderRadiusDesktopCssStyle ? `border-radius: ${buttonBorderRadiusDesktopCssStyle} !important;` : ''}
            ${buttonBorderColor ? `border-color: ${buttonBorderColor};` : ''}
            ${buttonboxShadowCssValue ? `box-shadow: ${buttonboxShadowCssValue};` : ''}
            ${buttonWidth.Desktop && buttonWidthUnits.Desktop ? `width: ${buttonWidth.Desktop}${buttonWidthUnits.Desktop};` : ''}
            display: ${buttonAlignment === 'justify' ? 'flex' : 'inline-flex'};
            transition: all .3s ease-in-out;
        }

        .${blockId} .bb-advanced-button-wrapper .bb-advanced-button:hover {
            ${buttonHoverColor ? `color: ${buttonHoverColor} !important;` : ''}
            ${buttonBorderHoverColor ? `border-color: ${buttonBorderHoverColor};` : ''}
            ${buttonHoverBgType === 'gradient' ? `  
                background: ${buttonHoverBgCustomGradientSwitcher && buttonHoverBgCustomGradientInputValue ? buttonHoverBgCustomGradientInputValue : buttonHoverBgGradientColor ? buttonHoverBgGradientColor : buttonHoverBgClassicColor};
            `: `
                background: ${buttonHoverBgClassicColor}; 
            `}
            ${buttonboxShadowHoverCssValue ? `box-shadow: ${buttonboxShadowHoverCssValue};` : ''}
        }
        
        @media only screen and (max-width: 1024px) {

            .${blockId} .bb-advanced-button-wrapper {
                ${buttonZIndex.Desktop ? `z-index: ${buttonZIndex.Desktop};` : ''}
                ${buttonGlobalBgType === 'gradient' ? `  
                    background: ${buttonGlobalBgCustomGradientSwitcher && buttonGlobalBgCustomGradientInputValue ? buttonGlobalBgCustomGradientInputValue : buttonGlobalBgGradientColor ? buttonGlobalBgGradientColor : buttonGlobalBgClassicColor};
                ` : `
                    background: ${buttonGlobalBgClassicColor};
                `}
                ${buttonGlobalPaddingTabletCssStyle ? `padding: ${buttonGlobalPaddingTabletCssStyle};` : ''}
                ${buttonGlobalMarginTabletCssStyle ? `margin: ${buttonGlobalMarginTabletCssStyle};` : ''} 
                ${buttonGlobalBorder ? `border: ${buttonGlobalBorder};` : ''} 
                ${buttonGlobalBorderTabletCssStyle ? `border-width: ${buttonGlobalBorderTabletCssStyle};` : ''}
                ${buttonGlobalBorderRadiusTabletCssStyle ? `border-radius: ${buttonGlobalBorderRadiusTabletCssStyle};` : ''}
                ${buttonGlobalBorderColor ? `border-color: ${buttonGlobalBorderColor};` : ''}
                ${buttonGlobalBoxShadowCssValue ? `box-shadow: ${buttonGlobalBoxShadowCssValue};` : ''}
                position: relative;
            }
            .${blockId} .bb-advanced-button-wrapper:hover {
                ${buttonGlobalHoverBgType === 'gradient' ? `  
                    background: ${buttonGlobalHoverBgCustomGradientSwitcher && buttonGlobalHoverBgCustomGradientInputValue ? buttonGlobalHoverBgCustomGradientInputValue : buttonGlobalHoverBgGradientColor ? buttonGlobalHoverBgGradientColor : buttonGlobalHoverBgClassicColor};
                ` : `
                    background: ${buttonGlobalHoverBgClassicColor};
                `}
                ${buttonGlobalBorderHoverColor ? `border-color: ${buttonGlobalBorderHoverColor};` : ''}
                ${buttonGlobalBoxShadowHoverCssValue ? `box-shadow: ${buttonGlobalBoxShadowHoverCssValue};` : ''}
            }
            .${blockId} .bb-advanced-button-wrapper .bb-advanced-button {
                ${buttonFontFamily ? `font-family: ${buttonFontFamily};` : ''}
                ${buttonFontSize.Tablet && buttonFontSizeUnits.Tablet ? `font-size: ${buttonFontSize.Tablet}${buttonFontSizeUnits.Tablet};` : ''}
                ${buttonFontWeight ? `font-weight: ${buttonFontWeight};` : ''}
                ${buttonFontStyle ? `font-style: ${buttonFontStyle};` : ''}
                ${buttonTextTransform ? `text-transform: ${buttonTextTransform};` : ''}
                ${buttonTextDecoration ? `text-decoration: ${buttonTextDecoration};` : ''}
                ${buttonLetterSpacing.Tablet && buttonLetterSpacingUnits.Tablet ? `letter-spacing: ${buttonLetterSpacing.Tablet}${buttonLetterSpacingUnits.Tablet};` : ''}
                ${buttonLineHeight.Tablet && buttonLineHeightUnits.Tablet ? `line-height: ${buttonLineHeight.Tablet}${buttonLineHeightUnits.Tablet};` : ''}
                ${buttonColor ? `color: ${buttonColor} !important;` : ''}
                ${buttonBgType === 'gradient' ? `  
                    background: ${buttonBgCustomGradientSwitcher && buttonBgCustomGradientInputValue ? buttonBgCustomGradientInputValue : buttonBgGradientColor ? buttonBgGradientColor : buttonBgClassicColor};
                `: `
                    background: ${buttonBgClassicColor}; 
                `}
                ${buttonPaddingTabletCssStyle ? `padding: ${buttonPaddingTabletCssStyle};` : ''}
                ${buttonMarginTabletCssStyle ? `margin: ${buttonMarginTabletCssStyle};` : ''}
                ${buttonBorder ? `border: ${buttonBorder};` : ''}
                ${buttonBorderTabletCssStyle ? `border-width: ${buttonBorderTabletCssStyle};` : ''}
                ${buttonBorderRadiusTabletCssStyle ? `border-radius: ${buttonBorderRadiusTabletCssStyle} !important;` : ''}
                ${buttonBorderColor ? `border-color: ${buttonBorderColor};` : ''}
                ${buttonboxShadowCssValue ? `box-shadow: ${buttonboxShadowCssValue};` : ''}
                ${buttonWidth.Tablet && buttonWidthUnits.Tablet ? `width: ${buttonWidth.Tablet}${buttonWidthUnits.Tablet};` : ''}
                display: ${buttonAlignment === 'justify' ? 'flex' : 'inline-flex'};
                transition: all .3s ease-in-out;
            }

            .${blockId} .bb-advanced-button-wrapper .bb-advanced-button:hover {
                ${buttonHoverColor ? `color: ${buttonHoverColor} !important;` : ''}
                ${buttonBorderHoverColor ? `border-color: ${buttonBorderHoverColor};` : ''}
                ${buttonHoverBgType === 'gradient' ? `  
                    background: ${buttonHoverBgCustomGradientSwitcher && buttonHoverBgCustomGradientInputValue ? buttonHoverBgCustomGradientInputValue : buttonHoverBgGradientColor ? buttonHoverBgGradientColor : buttonHoverBgClassicColor};
                `: `
                    background: ${buttonHoverBgClassicColor}; 
                `}
                ${buttonboxShadowHoverCssValue ? `box-shadow: ${buttonboxShadowHoverCssValue};` : ''}
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId} .bb-advanced-button-wrapper {
                ${buttonZIndex.Desktop ? `z-index: ${buttonZIndex.Desktop};` : ''}
                ${buttonGlobalBgType === 'gradient' ? `  
                    background: ${buttonGlobalBgCustomGradientSwitcher && buttonGlobalBgCustomGradientInputValue ? buttonGlobalBgCustomGradientInputValue : buttonGlobalBgGradientColor ? buttonGlobalBgGradientColor : buttonGlobalBgClassicColor};
                ` : `
                    background: ${buttonGlobalBgClassicColor};
                `}
                ${buttonGlobalPaddingMobileCssStyle ? `padding: ${buttonGlobalPaddingMobileCssStyle};` : ''}
                ${buttonGlobalMarginMobileCssStyle ? `margin: ${buttonGlobalMarginMobileCssStyle};` : ''} 
                ${buttonGlobalBorder ? `border: ${buttonGlobalBorder};` : ''} 
                ${buttonGlobalBorderMobileCssStyle ? `border-width: ${buttonGlobalBorderMobileCssStyle};` : ''}
                ${buttonGlobalBorderRadiusMobileCssStyle ? `border-radius: ${buttonGlobalBorderRadiusMobileCssStyle};` : ''}
                ${buttonGlobalBorderColor ? `border-color: ${buttonGlobalBorderColor};` : ''}
                ${buttonGlobalBoxShadowCssValue ? `box-shadow: ${buttonGlobalBoxShadowCssValue};` : ''}
                position: relative;
            }
            .${blockId} .bb-advanced-button-wrapper:hover {
                ${buttonGlobalHoverBgType === 'gradient' ? `  
                    background: ${buttonGlobalHoverBgCustomGradientSwitcher && buttonGlobalHoverBgCustomGradientInputValue ? buttonGlobalHoverBgCustomGradientInputValue : buttonGlobalHoverBgGradientColor ? buttonGlobalHoverBgGradientColor : buttonGlobalHoverBgClassicColor};
                ` : `
                    background: ${buttonGlobalHoverBgClassicColor};
                `}
                ${buttonGlobalBorderHoverColor ? `border-color: ${buttonGlobalBorderHoverColor};` : ''}
                ${buttonGlobalBoxShadowHoverCssValue ? `box-shadow: ${buttonGlobalBoxShadowHoverCssValue};` : ''}
            }
            .${blockId} .bb-advanced-button-wrapper .bb-advanced-button {
                ${buttonFontFamily ? `font-family: ${buttonFontFamily};` : ''}
                ${buttonFontSize.Mobile && buttonFontSizeUnits.Mobile ? `font-size: ${buttonFontSize.Mobile}${buttonFontSizeUnits.Mobile};` : ''}
                ${buttonFontWeight ? `font-weight: ${buttonFontWeight};` : ''}
                ${buttonFontStyle ? `font-style: ${buttonFontStyle};` : ''}
                ${buttonTextTransform ? `text-transform: ${buttonTextTransform};` : ''}
                ${buttonTextDecoration ? `text-decoration: ${buttonTextDecoration};` : ''}
                ${buttonLetterSpacing.Mobile && buttonLetterSpacingUnits.Mobile ? `letter-spacing: ${buttonLetterSpacing.Mobile}${buttonLetterSpacingUnits.Mobile};` : ''}
                ${buttonLineHeight.Mobile && buttonLineHeightUnits.Mobile ? `line-height: ${buttonLineHeight.Mobile}${buttonLineHeightUnits.Mobile};` : ''}
                ${buttonColor ? `color: ${buttonColor} !important;` : ''}
                ${buttonBgType === 'gradient' ? `  
                    background: ${buttonBgCustomGradientSwitcher && buttonBgCustomGradientInputValue ? buttonBgCustomGradientInputValue : buttonBgGradientColor ? buttonBgGradientColor : buttonBgClassicColor};
                `: `
                    background: ${buttonBgClassicColor}; 
                `}
                ${buttonPaddingMobileCssStyle ? `padding: ${buttonPaddingMobileCssStyle};` : ''}
                ${buttonMarginMobileCssStyle ? `margin: ${buttonMarginMobileCssStyle};` : ''}
                ${buttonBorder ? `border: ${buttonBorder};` : ''}
                ${buttonBorderMobileCssStyle ? `border-width: ${buttonBorderMobileCssStyle};` : ''}
                ${buttonBorderRadiusMobileCssStyle ? `border-radius: ${buttonBorderRadiusMobileCssStyle} !important;` : ''}
                ${buttonBorderColor ? `border-color: ${buttonBorderColor};` : ''}
                ${buttonboxShadowCssValue ? `box-shadow: ${buttonboxShadowCssValue};` : ''}
                ${buttonWidth.Mobile && buttonWidthUnits.Mobile ? `width: ${buttonWidth.Mobile}${buttonWidthUnits.Mobile};` : ''}
                display: ${buttonAlignment === 'justify' ? 'flex' : 'inline-flex'};
                transition: all .3s ease-in-out;
            }

            .${blockId} .bb-advanced-button-wrapper .bb-advanced-button:hover {
                ${buttonHoverColor ? `color: ${buttonHoverColor} !important;` : ''}
                ${buttonBorderHoverColor ? `border-color: ${buttonBorderHoverColor};` : ''}
                ${buttonHoverBgType === 'gradient' ? `  
                    background: ${buttonHoverBgCustomGradientSwitcher && buttonHoverBgCustomGradientInputValue ? buttonHoverBgCustomGradientInputValue : buttonHoverBgGradientColor ? buttonHoverBgGradientColor : buttonHoverBgClassicColor};
                `: `
                    background: ${buttonHoverBgClassicColor}; 
                `}
                ${buttonboxShadowHoverCssValue ? `box-shadow: ${buttonboxShadowHoverCssValue};` : ''}
            }
        }

    `, [
        blockId,
        deviceType,
        buttonAlignment,
        buttonText,
        buttonUrl,
        buttonTargetUrl,
        buttonWidth,
        buttonWidthUnits,
    
        /** Typography */
        buttonFontFamily,
        buttonFontSize,
        buttonFontSizeUnits,
        buttonFontWeight,
        buttonFontStyle,
        buttonTextTransform,
        buttonTextDecoration,
        buttonLetterSpacing,
        buttonLetterSpacingUnits,
        buttonLineHeight,
        buttonLineHeightUnits,
    
        /** Color */
        buttonColorSwitcher,
        buttonColor,
        buttonHoverColor,

        /** Button Background Color */
        buttonBgColorSwitcher,
        buttonBgType,
        buttonBgClassicColor,
        buttonBgGradientColor,
        buttonBgCustomGradientSwitcher,
        buttonBgCustomGradientInputValue,
    
        buttonHoverBgType,
        buttonHoverBgClassicColor,
        buttonHoverBgGradientColor,
        buttonHoverBgCustomGradientSwitcher,
        buttonHoverBgCustomGradientInputValue,

        /** Padding */
        buttonPaddingUnits,
        buttonPaddingDesktop,
        buttonPaddingDesktopCssStyle,
        buttonPaddingTablet,
        buttonPaddingTabletCssStyle,
        buttonPaddingMobile,
        buttonPaddingMobileCssStyle,
        buttonPaddingLink,

        /** Margin */
        buttonMarginUnits,
        buttonMarginDesktop,
        buttonMarginDesktopCssStyle,
        buttonMarginTablet,
        buttonMarginTabletCssStyle,
        buttonMarginMobile,
        buttonMarginMobileCssStyle,
        buttonMarginLink,
    
        /** Border */
        buttonBorder,
        buttonBorderColorSwitcher,
        buttonBorderColor,
        buttonBorderHoverColor,
        buttonBorderUnits,
        buttonBorderDesktop,
        buttonBorderDesktopCssStyle,
        buttonBorderTablet,
        buttonBorderTabletCssStyle,
        buttonBorderMobile,
        buttonBorderMobileCssStyle,
        buttonBorderLink,

        /** Border Radius */
        buttonBorderRadiusUnits,
        buttonBorderRadiusDesktop,
        buttonBorderRadiusDesktopCssStyle,
        buttonBorderRadiusTablet,
        buttonBorderRadiusTabletCssStyle,
        buttonBorderRadiusMobile,
        buttonBorderRadiusMobileCssStyle,
        buttonBorderRadiusLink,

        /** Box Shadow */
        buttonboxShadowValuesSwitcher,
        buttonboxShadowValues,
        buttonboxShadowCssValue,
        buttonboxShadowHoverValues,
        buttonboxShadowHoverCssValue,

        /** Icon */
        buttonIconAlign,
        buttonIcon,
        buttonIconPosition,

        buttonIconSize,
        buttonIconSizeUnits,
        buttonIconColorSwitcher,
        buttonIconColor,
        buttonIconHoverColor,
        buttonIconBgColorSwitcher,
        buttonIconBgColor,
        buttonIconBgHoverColor,

        buttonIconBorder,
        buttonIconBorderColorSwitcher,
        buttonIconBorderColor,
        buttonIconBorderHoverColor,

        buttonIconBorderUnits,
        buttonIconBorderDesktop,
        buttonIconBorderDesktopCssStyle,
        buttonIconBorderTablet,
        buttonIconBorderTabletCssStyle,
        buttonIconBorderMobile,
        buttonIconBorderMobileCssStyle,
        buttonIconBorderLink,

        buttonIconBorderRadiusUnits,
        buttonIconBorderRadiusDesktop,
        buttonIconBorderRadiusDesktopCssStyle,
        buttonIconBorderRadiusTablet,
        buttonIconBorderRadiusTabletCssStyle,
        buttonIconBorderRadiusMobile,
        buttonIconBorderRadiusMobileCssStyle,
        buttonIconBorderRadiusLink,

        buttonIconGapSize,
        buttonIconGapUnits,
    
        /** Global Styles */
        /** Z-index */
        buttonZIndex,

        /** Start Background */
        buttonGlobalBgColorSwitcher,
        buttonGlobalBgType,
        buttonGlobalBgClassicColor,
        buttonGlobalBgGradientColor,
        buttonGlobalBgCustomGradientSwitcher,
        buttonGlobalBgCustomGradientInputValue,

        buttonGlobalHoverBgType,
        buttonGlobalHoverBgClassicColor,
        buttonGlobalHoverBgGradientColor,
        buttonGlobalHoverBgCustomGradientSwitcher,
        buttonGlobalHoverBgCustomGradientInputValue,
        /** End Background */

        /** Padding */
        buttonGlobalPaddingUnits,
        buttonGlobalPaddingDesktop,
        buttonGlobalPaddingDesktopCssStyle,
        buttonGlobalPaddingTablet,
        buttonGlobalPaddingTabletCssStyle,
        buttonGlobalPaddingMobile,
        buttonGlobalPaddingMobileCssStyle,
        buttonGlobalPaddingLink,

        /** Margin */
        buttonGlobalMarginUnits,
        buttonGlobalMarginDesktop,
        buttonGlobalMarginDesktopCssStyle,
        buttonGlobalMarginTablet,
        buttonGlobalMarginTabletCssStyle,
        buttonGlobalMarginMobile,
        buttonGlobalMarginMobileCssStyle,
        buttonGlobalMarginLink,

        /** Border */
        buttonGlobalBorder,
        buttonGlobalBorderColorSwitcher,
        buttonGlobalBorderColor,
        buttonGlobalBorderHoverColor,
        buttonGlobalBorderUnits,
        buttonGlobalBorderDesktop,
        buttonGlobalBorderDesktopCssStyle,
        buttonGlobalBorderTablet,
        buttonGlobalBorderTabletCssStyle,
        buttonGlobalBorderMobile,
        buttonGlobalBorderMobileCssStyle,
        buttonGlobalBorderLink,

        /** Border Radius */
        buttonGlobalBorderRadiusUnits,
        buttonGlobalBorderRadiusDesktop,
        buttonGlobalBorderRadiusDesktopCssStyle,
        buttonGlobalBorderRadiusTablet,
        buttonGlobalBorderRadiusTabletCssStyle,
        buttonGlobalBorderRadiusMobile,
        buttonGlobalBorderRadiusMobileCssStyle,
        buttonGlobalBorderRadiusLink,

        /** Box Shadow */
        buttonGlobalBoxShadowValuesSwitcher,
        buttonGlobalBoxShadowValues,
        buttonGlobalBoxShadowCssValue,
        buttonGlobalBoxShadowHoverValues,
        buttonGlobalBoxShadowHoverCssValue,

        /** Other Styles */
        blockStyle

    ]);

    useEffect(() => {
        setAttributes({blockStyle: `${allBlockStyle}`.replace(/\s+/g, ' ').trim()});
    }, [allBlockStyle]);


    const editorStyle = allBlockStyle.replace(/\s+/g, ' ').trim();

    
    return (
        <>
            <style>{editorStyle}</style>
            <InspectorControls key="controls">
                <div className="bb-inspector-control">
                    <TabPanel
                        className="bb-parent-tab-panel"
                        activeClass="active-tab"
                        tabs={[
                            {
                                name: "general",
                                title: "General",
                                className: "bb-tab general",
                            },
                            {
                                name: "styles",
                                title: "Style",
                                className: "bb-tab styles",
                            },
                            {
                                name: "advanced",
                                title: "Advanced",
                                className: "bb-tab advanced",
                            },
                        ]}
                    >
                        {(tab) => (
                            <div className={"bb-tab-controls" + tab.name}>
                                {tab.name === 'general' && (
                                    <>
                                        <div className="bb-advanced-button-wrapper">
                                            <PanelBody
                                                title={__("Button", "button-blocks")}
                                                initialOpen={true}
                                            >
                                                <BaseControl
                                                    label={__("Alignment", "button-blocks")}
                                                    id="bb-setting-text-alignment"
                                                    className="bb-setting-text-alignment"
                                                >
                                                    <ButtonGroup
                                                        className="bb-setting-text-alignment-group-btn"
                                                    >
                                                        {TEXT_ALIGN.map((item, key) => (
                                                            <Button
                                                                key={key}
                                                                onClick={() => setAttributes({ buttonAlignment: item.value })}
                                                                className={`bb-setting-text-alignment-single-btn ${buttonAlignment === item.value ? 'active' : ''}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </ButtonGroup>
                                                </BaseControl>

                                                <TextControl
                                                    label={__("Text", "button-blocks")}
                                                    value={buttonText}
                                                    onChange={(value) => setAttributes({ buttonText: value })}
                                                    className="bb-advanced-button-text"
                                                />

                                                <div className='global-advanced-btn-icon-wrapper'>
                                                    <BaseControl
                                                        label={__("Icon", "gutenslider-blocks")}
                                                            id="global-setting-text-alignment"
                                                            className="global-setting-text-alignment"
                                                    >
                                                        <ButtonGroup
                                                            className="global-setting-text-alignment-group-btn"
                                                        >
                                                            {ICON_ALIGN.map((item, key) => (
                                                                <Button
                                                                    key={key}
                                                                    onClick={() => setAttributes({ buttonIconAlign: item.value })}
                                                                    className={`global-setting-text-alignment-single-btn ${buttonIconAlign === item.value ? 'active' : ''}`}
                                                                >
                                                                    {item.label}
                                                                </Button>
                                                            ))}
                                                        </ButtonGroup>
                                                        {(buttonIconAlign === 'icon-text' || buttonIconAlign === 'icon-only') && (
                                                            <FBIconPicker
                                                                value={buttonIcon}
                                                                setIconHandler={(value) => setAttributes({ buttonIcon: value })}
                                                            />
                                                        )}
                                                    </BaseControl>
                                                </div>
                                                <div className="bb-link-control-wrapper">
                                                    <BaseControl 
                                                        label={__("URL", "button-blocks")}
                                                    >
                                                        <div className="bb-link-control-inner-wrapper">
                                                            <TextControl
                                                                value={buttonUrl}
                                                                onChange={(value) => setAttributes({ buttonUrl: value })}
                                                                className="bb-advanced-button-url"
                                                                placeholder={__('https://', 'button-blocks')}
                                                            />
                                                            <Dropdown
                                                                className="bb-setting-dropdown-icon-wrapper"
                                                                contentClassName="bb-setting-dropdown-icon-content"
                                                                popoverProps={{ placement: 'bottom-start' }}
                                                                renderToggle={({ isOpen, onToggle }) => (
                                                                    <Button
                                                                        variant="primary"
                                                                        onClick={onToggle}
                                                                        aria-expanded={isOpen}
                                                                        aria-label={__("Toggle Typography Settings", "button-blocks")}
                                                                        className="bb-setting-dropdown-icon-btn"
                                                                    >
                                                                        <Dashicon icon="color-picker" className="bb-setting-dropdown-icon" />
                                                                    </Button>
                                                                )}
                                                                renderContent={() => (
                                                                    <div className="bb-advanced-button-icon-popup">
                                                                        <BaseControl className="bb-advanced-button-icon-popup-inner">
                                                                            <ToggleControl
                                                                                label={__("Open in new tab", "button-blocks")}
                                                                                checked={buttonTargetUrl}
                                                                                onChange={(value) => setAttributes({ buttonTargetUrl: value })}
                                                                            />
                                                                        </BaseControl>
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                    </BaseControl>
                                                </div>
                                            </PanelBody>
                                        </div>
                                    </>
                                )}

                                {tab.name === "styles" && (
                                    <>
                                        <PanelBody
                                            title={__("Styles", "button-blocks")}
                                            initialOpen={true}
                                        >
                                            <ResponsiveRangeControl
                                                min={1}
                                                max={100}
                                                label={__("Width", "button-blocks")}
                                                value={buttonWidth}
                                                onChange={(value) => setAttributes({ buttonWidth: value })}
                                                onUnitChange={(value) => setAttributes({ buttonWidthUnits: value })}
                                                deviceType={deviceType}
                                                units={buttonWidthUnits}
                                                setAttributes={setAttributes}
                                                step={1}
                                                defaultValue={""}
                                            />
                                            <ResponsiveTypographyControl 
                                                fontFamily={buttonFontFamily}
                                                onChangeFontFamily={(value) => setAttributes({ buttonFontFamily: value })}
                                                
                                                fontSize={buttonFontSize}
                                                onChangeFontSize={(value) => setAttributes({ buttonFontSize: value })}
                                                
                                                fontSizeUnits={buttonFontSizeUnits}
                                                onChangeFontSizeUnit={(value) => setAttributes({ buttonFontSizeUnits: value })}
                                                
                                                fontWeight={buttonFontWeight}
                                                onChangeFontWeight={(value) => setAttributes({ buttonFontWeight: value })}
                                                
                                                fontStyle={buttonFontStyle}
                                                onChangeFontStyle={(value) => setAttributes({ buttonFontStyle: value })}
                                                
                                                textTransform={buttonTextTransform}
                                                onChangeTextTransform={(value) => setAttributes({ buttonTextTransform: value })}
                                                
                                                textDecoration={buttonTextDecoration}
                                                onChangeTextDecoration={(value) => setAttributes({ buttonTextDecoration: value })}
                                                
                                                letterSpacing={buttonLetterSpacing}
                                                onChangeLetterSpacing={(value) => setAttributes({ buttonLetterSpacing: value })}
                                                
                                                letterSpacingUnits={buttonLetterSpacingUnits}
                                                onChangeLetterSpacingUnit={(value) => setAttributes({ buttonLetterSpacingUnits: value })}
                                                
                                                lineHeight={buttonLineHeight}
                                                onChangeLineHeight={(value) => setAttributes({ buttonLineHeight: value })}
                                                
                                                lineHeightUnits={buttonLineHeightUnits}
                                                onChangeLineHeightUnit={(value) => setAttributes({ buttonLineHeightUnits: value })}
                                                
                                                deviceType={deviceType}
                                                setAttributes={setAttributes}
                                            />

                                            <SwitcherControl
                                                label={__("Color", "button-blocks")}
                                                globalSwitcher={buttonColorSwitcher}
                                                setGlobalSwitcher={(value) => setAttributes({ buttonColorSwitcher: value })}
                                            />

                                            {buttonColorSwitcher === 'normal' && (
                                                <ColorControl
                                                    label={__("Normal Color", "button-blocks")}
                                                    color={buttonColor}
                                                    onChangeColor={(value) => setAttributes({ buttonColor: value })} 
                                                />
                                            )}

                                            {buttonColorSwitcher === 'hover' && (
                                                <ColorControl
                                                    label={__("Hover Color", "button-blocks")}
                                                    color={buttonHoverColor}
                                                    onChangeColor={(value) => setAttributes({ buttonHoverColor: value })}
                                                />
                                            )}

                                            <BackgroundColorControl
                                                label={__("Background Color", "button-blocks")}
                                                bgColorSwitcher={buttonBgColorSwitcher}
                                                setBgColorSwitcher={(value) => setAttributes({ buttonBgColorSwitcher: value })}
                                                        
                                                normalBackgroundType={buttonBgType}
                                                setNormalBackgroundType={(value) => setAttributes({ buttonBgType: value })}
                                                normalClassicColor={buttonBgClassicColor}
                                                setNormalClassicColor={(value) => setAttributes({ buttonBgClassicColor: value })}
                                                normalGradientColor={buttonBgGradientColor}
                                                setNormalGradientColor={(value) => setAttributes({ buttonBgGradientColor: value })}
                                                normalCustomGradientSwitcher={buttonBgCustomGradientSwitcher}
                                                setNormalCustomGradientSwitcher={(value) => setAttributes({ buttonBgCustomGradientSwitcher: value })}
                                                normalCustomGradientInputValue={buttonBgCustomGradientInputValue}
                                                setNormalCustomGradientInputValue={(value) => setAttributes({ buttonBgCustomGradientInputValue: value })}
                                                        
                                                hoverBackgroundType={buttonHoverBgType}
                                                setHoverBackgroundType={(value) => setAttributes({ buttonHoverBgType: value })}
                                                hoverClassicColor={buttonHoverBgClassicColor}
                                                setHoverClassicColor={(value) => setAttributes({ buttonHoverBgClassicColor: value })}
                                                hoverGradientColor={buttonHoverBgGradientColor} 
                                                setHoverGradientColor={(value) => setAttributes({ buttonHoverBgGradientColor: value })}
                                                hoverCustomGradientSwitcher={buttonHoverBgCustomGradientSwitcher}
                                                setHoverCustomGradientSwitcher={(value) => setAttributes({ buttonHoverBgCustomGradientSwitcher: value })}
                                                hoverCustomGradientInputValue={buttonHoverBgCustomGradientInputValue}
                                                setHoverCustomGradientInputValue={(value) => setAttributes({ buttonHoverBgCustomGradientInputValue: value })}

                                                isBackgroundImage={false}
                                            />

                                        </PanelBody>
                                        <PanelBody
                                            title={__("Padding and Margin", "button-blocks")}
                                            initialOpen={false}
                                        >

                                            <ResponsiveSpacingControl
                                                label={__("Padding", "button-blocks")}
                                                deviceType={deviceType}
                                                onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                units={buttonPaddingUnits}
                                                onChangeUnits={(value) => setAttributes({ buttonPaddingUnits: value })}
                                                desktopSpacing={buttonPaddingDesktop}
                                                onChangeDesktopSpacing={(value) => setAttributes({ buttonPaddingDesktop: value })}
                                                desktopSpacingStyle={(value) => setAttributes({ buttonPaddingDesktopCssStyle: value })}
                                                tabletSpacing={buttonPaddingTablet}
                                                onChangeTabletSpacing={(value) => setAttributes({ buttonPaddingTablet: value })}
                                                tabletSpacingStyle={(value) => setAttributes({ buttonPaddingTabletCssStyle: value })}
                                                mobileSpacing={buttonPaddingMobile}
                                                onChangeMobileSpacing={(value) => setAttributes({ buttonPaddingMobile: value })}
                                                mobileSpacingStyle={(value) => setAttributes({ buttonPaddingMobileCssStyle: value })}
                                                isLinked={buttonPaddingLink}
                                                onChangeLink={(value) => setAttributes({ buttonPaddingLink: value })} 
                                            />

                                            <ResponsiveSpacingControl
                                                label={__("Margin", "button-blocks")}
                                                deviceType={deviceType}
                                                onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                units={buttonMarginUnits}
                                                onChangeUnits={(value) => setAttributes({ buttonMarginUnits: value })}
                                                desktopSpacing={buttonMarginDesktop}
                                                onChangeDesktopSpacing={(value) => setAttributes({ buttonMarginDesktop: value })}
                                                desktopSpacingStyle={(value) => setAttributes({ buttonMarginDesktopCssStyle: value })}
                                                tabletSpacing={buttonMarginTablet}
                                                onChangeTabletSpacing={(value) => setAttributes({ buttonMarginTablet: value })}
                                                tabletSpacingStyle={(value) => setAttributes({ buttonMarginTabletCssStyle: value })}
                                                mobileSpacing={buttonMarginMobile}
                                                onChangeMobileSpacing={(value) => setAttributes({ buttonMarginMobile: value })}
                                                mobileSpacingStyle={(value) => setAttributes({ buttonMarginMobileCssStyle: value })}
                                                isLinked={buttonMarginLink}
                                                onChangeLink={(value) => setAttributes({ buttonMarginLink: value })} 
                                            />

                                        </PanelBody>
                                        <PanelBody
                                            title={__("Border and Shadow", "button-blocks")}
                                            initialOpen={false}
                                        >
                                            <SelectControl
                                                label={__("Border Style", "button-blocks")}
                                                value={buttonBorder}
                                                options={BORDER_STYLES}
                                                onChange={(value) => setAttributes({ buttonBorder: value })}
                                            />


                                            <SwitcherControl
                                                label={__("Border Color", "button-blocks")}
                                                globalSwitcher={buttonBorderColorSwitcher}
                                                setGlobalSwitcher={(value) => setAttributes({ buttonBorderColorSwitcher: value })}
                                            />

                                            {buttonBorderColorSwitcher === 'normal' && (
                                                <ColorControl
                                                    label={__("Normal Color", "button-blocks")}
                                                    color={buttonBorderColor}
                                                    onChangeColor={(value) => setAttributes({ buttonBorderColor: value })}
                                                />
                                            )}

                                            {buttonBorderColorSwitcher === 'hover' && (
                                                <ColorControl
                                                    label={__("Hover Color", "button-blocks")}
                                                    color={buttonBorderHoverColor}
                                                    onChangeColor={(value) => setAttributes({ buttonBorderHoverColor: value })}
                                                />
                                            )}

                                            <ResponsiveSpacingControl
                                                label={__("Border", "button-blocks")}
                                                deviceType={deviceType}
                                                onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                units={buttonBorderUnits}
                                                onChangeUnits={(value) => setAttributes({ buttonBorderUnits: value })}
                                                desktopSpacing={buttonBorderDesktop}
                                                onChangeDesktopSpacing={(value) => setAttributes({ buttonBorderDesktop: value })}
                                                desktopSpacingStyle={(value) => setAttributes({ buttonBorderDesktopCssStyle: value })}
                                                tabletSpacing={buttonBorderTablet}
                                                onChangeTabletSpacing={(value) => setAttributes({ buttonBorderTablet: value })}
                                                tabletSpacingStyle={(value) => setAttributes({ buttonBorderTabletCssStyle: value })}
                                                mobileSpacing={buttonBorderMobile}
                                                onChangeMobileSpacing={(value) => setAttributes({ buttonBorderMobile: value })}
                                                mobileSpacingStyle={(value) => setAttributes({ buttonBorderMobileCssStyle: value })}
                                                isLinked={buttonBorderLink}
                                                onChangeLink={(value) => setAttributes({ buttonBorderLink: value })} 
                                            />

                                            <ResponsiveSpacingControl
                                                label={__("Border Radius", "button-blocks")}
                                                deviceType={deviceType}
                                                onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                units={buttonBorderRadiusUnits}
                                                onChangeUnits={(value) => setAttributes({ buttonBorderRadiusUnits: value })}
                                                desktopSpacing={buttonBorderRadiusDesktop}
                                                onChangeDesktopSpacing={(value) => setAttributes({ buttonBorderRadiusDesktop: value })}
                                                desktopSpacingStyle={(value) => setAttributes({ buttonBorderRadiusDesktopCssStyle: value })}
                                                tabletSpacing={buttonBorderRadiusTablet}
                                                onChangeTabletSpacing={(value) => setAttributes({ buttonBorderRadiusTablet: value })}
                                                tabletSpacingStyle={(value) => setAttributes({ buttonBorderRadiusTabletCssStyle: value })}
                                                mobileSpacing={buttonBorderRadiusMobile}
                                                onChangeMobileSpacing={(value) => setAttributes({ buttonBorderRadiusMobile: value })}
                                                mobileSpacingStyle={(value) => setAttributes({ buttonBorderRadiusMobileCssStyle: value })}
                                                isLinked={buttonBorderRadiusLink}
                                                onChangeLink={(value) => setAttributes({ buttonBorderRadiusLink: value })} 
                                            />

                                            <SwitcherControl
                                                label={__("Box Shadow", "button-blocks")}
                                                globalSwitcher={buttonboxShadowValuesSwitcher}
                                                setGlobalSwitcher={(value) => setAttributes({ buttonboxShadowValuesSwitcher: value })}
                                            />

                                            {buttonboxShadowValuesSwitcher === 'normal' && (
                                                <BoxShadowSettingsControl
                                                    label={__("Normal Shadow", "button-blocks")}
                                                    onBoxShadowChange={(value) => setAttributes({ buttonboxShadowValues: value })}
                                                    initialShadowValue={buttonboxShadowValues}
                                                    onBoxShadowStyleChange={(value) => setAttributes({ buttonboxShadowCssValue: value })}
                                                />
                                            )}

                                            {buttonboxShadowValuesSwitcher === 'hover' && (
                                                <BoxShadowSettingsControl
                                                    label={__("Hover Shadow", "button-blocks")}
                                                    onBoxShadowChange={(value) => setAttributes({ buttonboxShadowHoverValues: value })}
                                                    initialShadowValue={buttonboxShadowHoverValues}
                                                    onBoxShadowStyleChange={(value) => setAttributes({ buttonboxShadowHoverCssValue: value })}
                                                />
                                            )}

                                        </PanelBody>
                                    </>
                                )}
                            {tab.name === "advanced" && (
                                    <>
                                        <div className="bb-setting-advanced-tab-wrapper">
                                            <div className="bb-setting-z-index-wrapper">
                                                <PanelBody
                                                    title={__("Advanced", "button-blocks")}
                                                    initialOpen={true}
                                                    className='bb-setting-z-index-header'
                                                >
                                                    <ResponsiveRangeControl
                                                        min={0}
                                                        max={10000000}
                                                        label={__("Z Index", "button-blocks")}
                                                        value={buttonZIndex}
                                                        onChange={(value) => setAttributes({ buttonZIndex: value })}
                                                        deviceType={deviceType}
                                                        setAttributes={setAttributes}
                                                        step={1}
                                                        defaultValue={""}
                                                        isRangeUnit={false}
                                                    />
                                                    <BackgroundColorControl
                                                        label={__("Background Color", "button-blocks")}
                                                        bgColorSwitcher={buttonGlobalBgColorSwitcher}
                                                        setBgColorSwitcher={(value) => setAttributes({ buttonGlobalBgColorSwitcher: value })}

                                                        normalBackgroundType={buttonGlobalBgType}
                                                        setNormalBackgroundType={(value) => setAttributes({ buttonGlobalBgType: value })}
                                                        normalClassicColor={buttonGlobalBgClassicColor}
                                                        setNormalClassicColor={(value) => setAttributes({ buttonGlobalBgClassicColor: value })}
                                                        normalGradientColor={buttonGlobalBgGradientColor}
                                                        setNormalGradientColor={(value) => setAttributes({ buttonGlobalBgGradientColor: value })}
                                                        normalCustomGradientSwitcher={buttonGlobalBgCustomGradientSwitcher}
                                                        setNormalCustomGradientSwitcher={(value) => setAttributes({ buttonGlobalBgCustomGradientSwitcher: value })}
                                                        normalCustomGradientInputValue={buttonGlobalBgCustomGradientInputValue}
                                                        setNormalCustomGradientInputValue={(value) => setAttributes({ buttonGlobalBgCustomGradientInputValue: value })}

                                                        hoverBackgroundType={buttonGlobalHoverBgType}
                                                        setHoverBackgroundType={(value) => setAttributes({ buttonGlobalHoverBgType: value })}
                                                        hoverClassicColor={buttonGlobalHoverBgClassicColor}
                                                        setHoverClassicColor={(value) => setAttributes({ buttonGlobalHoverBgClassicColor: value })}
                                                        hoverGradientColor={buttonGlobalHoverBgGradientColor}
                                                        setHoverGradientColor={(value) => setAttributes({ buttonGlobalHoverBgGradientColor: value })}
                                                        hoverCustomGradientSwitcher={buttonGlobalHoverBgCustomGradientSwitcher}
                                                        setHoverCustomGradientSwitcher={(value) => setAttributes({ buttonGlobalHoverBgCustomGradientSwitcher: value })}
                                                        hoverCustomGradientInputValue={buttonGlobalHoverBgCustomGradientInputValue}
                                                        setHoverCustomGradientInputValue={(value) => setAttributes({ buttonGlobalHoverBgCustomGradientInputValue: value })}

                                                        isBackgroundImage={false}
                                                    />

                                                </PanelBody>
                                                <PanelBody
                                                    title={__("Padding and Margin", "button-blocks")}
                                                    initialOpen={false}
                                                >
                                                    <ResponsiveSpacingControl
                                                        label={__("Padding", "button-blocks")}
                                                        deviceType={deviceType}
                                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                        units={buttonGlobalPaddingUnits}
                                                        onChangeUnits={(value) => setAttributes({ buttonGlobalPaddingUnits: value })}
                                                        desktopSpacing={buttonGlobalPaddingDesktop}
                                                        onChangeDesktopSpacing={(value) => setAttributes({ buttonGlobalPaddingDesktop: value })}
                                                        desktopSpacingStyle={(value) => setAttributes({ buttonGlobalPaddingDesktopCssStyle: value })}
                                                        tabletSpacing={buttonGlobalPaddingTablet}
                                                        onChangeTabletSpacing={(value) => setAttributes({ buttonGlobalPaddingTablet: value })}
                                                        tabletSpacingStyle={(value) => setAttributes({ buttonGlobalPaddingTabletCssStyle: value })}
                                                        mobileSpacing={buttonGlobalPaddingMobile}
                                                        onChangeMobileSpacing={(value) => setAttributes({ buttonGlobalPaddingMobile: value })}
                                                        mobileSpacingStyle={(value) => setAttributes({ buttonGlobalPaddingMobileCssStyle: value })}
                                                        isLinked={buttonGlobalPaddingLink}
                                                        onChangeLink={(value) => setAttributes({ buttonGlobalPaddingLink: value })}
                                                    />

                                                    <ResponsiveSpacingControl
                                                        label={__("Margin", "button-blocks")}
                                                        deviceType={deviceType}
                                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                        units={buttonGlobalMarginUnits}
                                                        onChangeUnits={(value) => setAttributes({ buttonGlobalMarginUnits: value })}
                                                        desktopSpacing={buttonGlobalMarginDesktop}
                                                        onChangeDesktopSpacing={(value) => setAttributes({ buttonGlobalMarginDesktop: value })}
                                                        desktopSpacingStyle={(value) => setAttributes({ buttonGlobalMarginDesktopCssStyle: value })}
                                                        tabletSpacing={buttonGlobalMarginTablet}
                                                        onChangeTabletSpacing={(value) => setAttributes({ buttonGlobalMarginTablet: value })}
                                                        tabletSpacingStyle={(value) => setAttributes({ buttonGlobalMarginTabletCssStyle: value })}
                                                        mobileSpacing={buttonGlobalMarginMobile}
                                                        onChangeMobileSpacing={(value) => setAttributes({ buttonGlobalMarginMobile: value })}
                                                        mobileSpacingStyle={(value) => setAttributes({ buttonGlobalMarginMobileCssStyle: value })}
                                                        isLinked={buttonGlobalMarginLink}
                                                        onChangeLink={(value) => setAttributes({ buttonGlobalMarginLink: value })}
                                                    />
                                                </PanelBody>

                                                <PanelBody
                                                    title={__("Border and Shadow", "button-blocks")}
                                                    initialOpen={false}
                                                >
                                                    <SelectControl
                                                        label={__("Border Style", "button-blocks")}
                                                        value={buttonGlobalBorder}
                                                        options={BORDER_STYLES}
                                                        onChange={(value) => setAttributes({ buttonGlobalBorder: value })}
                                                    />

                                                    <SwitcherControl
                                                        label={__("Border Color", "button-blocks")}
                                                        globalSwitcher={buttonGlobalBorderColorSwitcher}
                                                        setGlobalSwitcher={(value) => setAttributes({ buttonGlobalBorderColorSwitcher: value })}
                                                    />

                                                    {buttonGlobalBorderColorSwitcher === 'normal' && (
                                                        <ColorControl
                                                            label={__("Normal Color", "button-blocks")}
                                                            color={buttonGlobalBorderColor}
                                                            onChangeColor={(value) => setAttributes({ buttonGlobalBorderColor: value })}
                                                        />
                                                    )}

                                                    {buttonGlobalBorderColorSwitcher === 'hover' && (
                                                        <ColorControl
                                                            label={__("Hover Color", "button-blocks")}
                                                            color={buttonGlobalBorderHoverColor}
                                                            onChangeColor={(value) => setAttributes({ buttonGlobalBorderHoverColor: value })}
                                                        />
                                                    )}

                                                    <ResponsiveSpacingControl
                                                        label={__("Border", "button-blocks")}
                                                        deviceType={deviceType}
                                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                        units={buttonGlobalBorderUnits}
                                                        onChangeUnits={(value) => setAttributes({ buttonGlobalBorderUnits: value })}
                                                        desktopSpacing={buttonGlobalBorderDesktop}
                                                        onChangeDesktopSpacing={(value) => setAttributes({ buttonGlobalBorderDesktop: value })}
                                                        desktopSpacingStyle={(value) => setAttributes({ buttonGlobalBorderDesktopCssStyle: value })}
                                                        tabletSpacing={buttonGlobalBorderTablet}
                                                        onChangeTabletSpacing={(value) => setAttributes({ buttonGlobalBorderTablet: value })}
                                                        tabletSpacingStyle={(value) => setAttributes({ buttonGlobalBorderTabletCssStyle: value })}
                                                        mobileSpacing={buttonGlobalBorderMobile}
                                                        onChangeMobileSpacing={(value) => setAttributes({ buttonGlobalBorderMobile: value })}
                                                        mobileSpacingStyle={(value) => setAttributes({ buttonGlobalBorderMobileCssStyle: value })}
                                                        isLinked={buttonGlobalBorderLink}
                                                        onChangeLink={(value) => setAttributes({ buttonGlobalBorderLink: value })}
                                                    />

                                                    <ResponsiveSpacingControl
                                                        label={__("Border Radius", "button-blocks")}
                                                        deviceType={deviceType}
                                                        onChangeDeviceType={(value) => setAttributes({ deviceType: value })}
                                                        units={buttonGlobalBorderRadiusUnits}
                                                        onChangeUnits={(value) => setAttributes({ buttonGlobalBorderRadiusUnits: value })}
                                                        desktopSpacing={buttonGlobalBorderRadiusDesktop}
                                                        onChangeDesktopSpacing={(value) => setAttributes({ buttonGlobalBorderRadiusDesktop: value })}
                                                        desktopSpacingStyle={(value) => setAttributes({ buttonGlobalBorderRadiusDesktopCssStyle: value })}
                                                        tabletSpacing={buttonGlobalBorderRadiusTablet}
                                                        onChangeTabletSpacing={(value) => setAttributes({ buttonGlobalBorderRadiusTablet: value })}
                                                        tabletSpacingStyle={(value) => setAttributes({ buttonGlobalBorderRadiusTabletCssStyle: value })}
                                                        mobileSpacing={buttonGlobalBorderRadiusMobile}
                                                        onChangeMobileSpacing={(value) => setAttributes({ buttonGlobalBorderRadiusMobile: value })}
                                                        mobileSpacingStyle={(value) => setAttributes({ buttonGlobalBorderRadiusMobileCssStyle: value })}
                                                        isLinked={buttonGlobalBorderRadiusLink}
                                                        onChangeLink={(value) => setAttributes({ buttonGlobalBorderRadiusLink: value })}
                                                    />

                                                    <SwitcherControl
                                                        label={__("Box Shadow", "button-blocks")}
                                                        globalSwitcher={buttonGlobalBoxShadowValuesSwitcher}
                                                        setGlobalSwitcher={(value) => setAttributes({ buttonGlobalBoxShadowValuesSwitcher: value })}
                                                    />

                                                    {buttonGlobalBoxShadowValuesSwitcher === 'normal' && (
                                                        <BoxShadowSettingsControl
                                                            label={__("Normal Shadow", "button-blocks")}
                                                            onBoxShadowChange={(value) => setAttributes({ buttonGlobalBoxShadowValues: value })}
                                                            initialShadowValue={buttonGlobalBoxShadowValues}
                                                            onBoxShadowStyleChange={(value) => setAttributes({ buttonGlobalBoxShadowCssValue: value })}
                                                        />
                                                    )}

                                                    {buttonGlobalBoxShadowValuesSwitcher === 'hover' && (
                                                        <BoxShadowSettingsControl
                                                            label={__("Hover Shadow", "button-blocks")}
                                                            onBoxShadowChange={(value) => setAttributes({ buttonGlobalBoxShadowHoverValues: value })}
                                                            initialShadowValue={buttonGlobalBoxShadowHoverValues}
                                                            onBoxShadowStyleChange={(value) => setAttributes({ buttonGlobalBoxShadowHoverCssValue: value })}
                                                        />
                                                    )}
                                                </PanelBody>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </TabPanel>
                </div>
            </InspectorControls>
            </>
    );
}