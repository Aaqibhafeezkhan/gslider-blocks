import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import InspectorControl from '@Components/inspector-controls';
import BackgroundControl from '@Components/background-control';
import {useDeviceType} from "@Utils/displayType";
import './editor.scss';

export default function Inspector({ attributes, setAttributes, clientId }) {
    const { 
        blockId,
        deviceType,
        blockStyle,

        /** Start slider Item Background */
        sliderItemNormalBackgroundType,  
        sliderItemNormalClassicColor,
        sliderItemNormalGradientColor,
        sliderItemNormalCustomGradientSwitcher,
        sliderItemNormalCustomGradientInputValue,
        sliderItemNormalBackgroundImageUrl,
        sliderItemNormalBackgroundImagePosition,
        sliderItemNormalBackgroundImageAttachment,
        sliderItemNormalBackgroundImageRepeat,
        sliderItemNormalBackgroundImageSize,

        sliderItemHoverBackgroundType,
        sliderItemHoverClassicColor,
        sliderItemHoverGradientColor,
        sliderItemHoverCustomGradientSwitcher,
        sliderItemHoverCustomGradientInputValue,
        sliderItemHoverBackgroundImageUrl,
        sliderItemHoverBackgroundImagePosition,
        sliderItemHoverBackgroundImageAttachment,
        sliderItemHoverBackgroundImageRepeat,
        sliderItemHoverBackgroundImageSize,
        /** End slider Item Background */

    } = attributes;

    /** Get Current Device Type */
    const currentDeviceType = useDeviceType();

    /** Set Device Type */
    useEffect(() => {
        setAttributes({ deviceType: currentDeviceType });
    }, [currentDeviceType]);

    useEffect(() => {
        if (clientId && typeof clientId === "string") {
            setAttributes({ blockId: `gslider-flexi-content-item-${clientId.slice(0, 8)}` });
        }
    }, [clientId]);

    /**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
            <PanelBody title={__("General", "gslider-blocks")} initialOpen>
                <p>{__("No settings available. Move to Style Tab", "gslider-blocks")}</p>
            </PanelBody>
		</>
	);

	/**
	 * Inspector Style Controls
	 */
	const styleControls = (
		<>
            <PanelBody 
                title={__("Background", "gslider-blocks")}
            >
                <BackgroundControl
                    label={__("Background", "gslider-blocks")}
                    deviceType={deviceType}
                            
                    normalBackgroundType={sliderItemNormalBackgroundType} 
                    setNormalBackgroundType={(value) => setAttributes({ sliderItemNormalBackgroundType: value })}
                    normalClassicColor={sliderItemNormalClassicColor}
                    setNormalClassicColor={(value) => setAttributes({ sliderItemNormalClassicColor: value })}
                    normalGradientColor={sliderItemNormalGradientColor}
                    setNormalGradientColor={(value) => setAttributes({ sliderItemNormalGradientColor: value })}
                    normalCustomGradientSwitcher={sliderItemNormalCustomGradientSwitcher}
                    setNormalCustomGradientSwitcher={(value) => setAttributes({ sliderItemNormalCustomGradientSwitcher: value })}
                    normalCustomGradientInputValue={sliderItemNormalCustomGradientInputValue}
                    setNormalCustomGradientInputValue={(value) => setAttributes({ sliderItemNormalCustomGradientInputValue: value })}
                    normalBackgroundImageUrl={sliderItemNormalBackgroundImageUrl}
                    setNormalBackgroundImageUrl={(value) => setAttributes({ sliderItemNormalBackgroundImageUrl: value })}
                    normalBackgroundImagePosition={sliderItemNormalBackgroundImagePosition}
                    setNormalBackgroundImagePosition={(value) => setAttributes({ sliderItemNormalBackgroundImagePosition: value })}
                    normalBackgroundImageAttachment={sliderItemNormalBackgroundImageAttachment}
                    setNormalBackgroundImageAttachment={(value) => setAttributes({ sliderItemNormalBackgroundImageAttachment: value })}
                    normalBackgroundImageRepeat={sliderItemNormalBackgroundImageRepeat}
                    setNormalBackgroundImageRepeat={(value) => setAttributes({ sliderItemNormalBackgroundImageRepeat: value })}
                    normalBackgroundImageSize={sliderItemNormalBackgroundImageSize}
                    setNormalBackgroundImageSize={(value) => setAttributes({ sliderItemNormalBackgroundImageSize: value })}
                    
                    hoverBackgroundType={sliderItemHoverBackgroundType}
                    setHoverBackgroundType={(value) => setAttributes({ sliderItemHoverBackgroundType: value })}
                    hoverClassicColor={sliderItemHoverClassicColor}
                    setHoverClassicColor={(value) => setAttributes({ sliderItemHoverClassicColor: value })}
                    hoverGradientColor={sliderItemHoverGradientColor} 
                    setHoverGradientColor={(value) => setAttributes({ sliderItemHoverGradientColor: value })}
                    hoverCustomGradientSwitcher={sliderItemHoverCustomGradientSwitcher}
                    setHoverCustomGradientSwitcher={(value) => setAttributes({ sliderItemHoverCustomGradientSwitcher: value })}
                    hoverCustomGradientInputValue={sliderItemHoverCustomGradientInputValue}
                    setHoverCustomGradientInputValue={(value) => setAttributes({ sliderItemHoverCustomGradientInputValue: value })}
                    hoverBackgroundImageUrl={sliderItemHoverBackgroundImageUrl}
                    setHoverBackgroundImageUrl={(value) => setAttributes({ sliderItemHoverBackgroundImageUrl: value })}
                    hoverBackgroundImagePosition={sliderItemHoverBackgroundImagePosition}
                    setHoverBackgroundImagePosition={(value) => setAttributes({ sliderItemHoverBackgroundImagePosition: value })}
                    hoverBackgroundImageAttachment={sliderItemHoverBackgroundImageAttachment}
                    setHoverBackgroundImageAttachment={(value) => setAttributes({ sliderItemHoverBackgroundImageAttachment: value })}
                    hoverBackgroundImageRepeat={sliderItemHoverBackgroundImageRepeat}
                    setHoverBackgroundImageRepeat={(value) => setAttributes({ sliderItemHoverBackgroundImageRepeat: value })}
                    hoverBackgroundImageSize={sliderItemHoverBackgroundImageSize}
                    setHoverBackgroundImageSize={(value) => setAttributes({ sliderItemHoverBackgroundImageSize: value })}
                    setAttributes={setAttributes}
                    
                />
            </PanelBody>
		</>
	);
		
	/**
	 * Inspector Advanced Controls
	 */
	const advancedControls = (
		<>
            <PanelBody title={__("Layout", "gslider-blocks")} initialOpen>
                {/* Add advanced settings here */}
            </PanelBody>
		</>
	);

    /**
     * Get slider item background normal styles
     */
    const getSliderItemBackgroundNormalStyles = (device) => {
        const bgType = sliderItemNormalBackgroundType;
        const bgColor = sliderItemNormalClassicColor;
        const bgGradient = sliderItemNormalGradientColor;
        const customGradient = sliderItemNormalCustomGradientInputValue;
        const customGradientEnabled = sliderItemNormalCustomGradientSwitcher;

        const bgImageUrl = sliderItemNormalBackgroundImageUrl?.[device];
        const bgImagePosition = sliderItemNormalBackgroundImagePosition?.[device];
        const bgAttachment = sliderItemNormalBackgroundImageAttachment?.[device];
        const bgRepeat = sliderItemNormalBackgroundImageRepeat?.[device];
        const bgSize = sliderItemNormalBackgroundImageSize?.[device];

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
     * Get slider item background hover styles
     */
    const getSliderItemBackgroundHoverStyles = (device) => {
        const bgType = sliderItemHoverBackgroundType;
        const bgColor = sliderItemHoverClassicColor;
        const bgGradient = sliderItemHoverGradientColor;
        const customGradient = sliderItemHoverCustomGradientInputValue;
        const customGradientEnabled = sliderItemHoverCustomGradientSwitcher;

        const bgImageUrl = sliderItemHoverBackgroundImageUrl?.[device];
        const bgImagePosition = sliderItemHoverBackgroundImagePosition?.[device];
        const bgAttachment = sliderItemHoverBackgroundImageAttachment?.[device];
        const bgRepeat = sliderItemHoverBackgroundImageRepeat?.[device];
        const bgSize = sliderItemHoverBackgroundImageSize?.[device];

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
    const sliderItemBackgroundStyleObjectToString = (styleObj) =>
        Object.entries(styleObj)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
        
    /**
     * Get slider item background styles
     */
    const sliderItemDesktopBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundNormalStyles('Desktop'));
    const sliderItemTabletBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundNormalStyles('Tablet'));
    const sliderItemMobileBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundNormalStyles('Mobile'));

    const sliderItemDesktopBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundHoverStyles('Desktop'));
    const sliderItemTabletBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundHoverStyles('Tablet'));
    const sliderItemMobileBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(getSliderItemBackgroundHoverStyles('Mobile'));  
    
    /** Start Block Style */
    const allBlockStyle = useMemo(() => `

        .${blockId}.flexi-content-item {
            ${sliderItemDesktopBackgroundNormalStyles}
            box-sizing: border-box;
            position: relative;
            transition: all 0.3s ease;
        }
        .${blockId}.flexi-content-item:hover {
            ${sliderItemDesktopBackgroundHoverStyles}
            box-sizing: border-box;
            position: relative;
        }

        @media only screen and (max-width: 1024px) {

            .${blockId}.flexi-content-item {
                ${sliderItemTabletBackgroundNormalStyles}
            }
            .${blockId}.flexi-content-item:hover {
                ${sliderItemTabletBackgroundHoverStyles}
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.flexi-content-item {
                ${sliderItemMobileBackgroundNormalStyles}
            }
            .${blockId}.flexi-content-item:hover {
                ${sliderItemMobileBackgroundHoverStyles}
            }
        }

    `, [
        blockId,
        deviceType,
        blockStyle,

        /** Start slider Item Background */
        sliderItemNormalBackgroundType,  
        sliderItemNormalClassicColor,
        sliderItemNormalGradientColor,
        sliderItemNormalCustomGradientSwitcher,
        sliderItemNormalCustomGradientInputValue,
        sliderItemNormalBackgroundImageUrl,
        sliderItemNormalBackgroundImagePosition,
        sliderItemNormalBackgroundImageAttachment,
        sliderItemNormalBackgroundImageRepeat,
        sliderItemNormalBackgroundImageSize,

        sliderItemHoverBackgroundType,
        sliderItemHoverClassicColor,
        sliderItemHoverGradientColor,
        sliderItemHoverCustomGradientSwitcher,
        sliderItemHoverCustomGradientInputValue,
        sliderItemHoverBackgroundImageUrl,
        sliderItemHoverBackgroundImagePosition,
        sliderItemHoverBackgroundImageAttachment,
        sliderItemHoverBackgroundImageRepeat,
        sliderItemHoverBackgroundImageSize,
        /** End slider Item Background */

    ]);

    /** Set Block Style */
    useEffect(() => {
        setAttributes({blockStyle: `${allBlockStyle}`.replace(/\s+/g, ' ').trim()});
    }, [allBlockStyle]);

    /** Set Editor Style */
    const editorStyle = `${allBlockStyle}`.replace(/\s+/g, ' ').trim();

    return (

        <>
            <style>
            	{editorStyle}
            </style>
            <InspectorControl
                generalControls={null}
                styleControls={styleControls}
                advancedControls={null}
            />
        </>
    );
}
