// background-color.js
import { __ } from '@wordpress/i18n';
import { 
    Button, 
    ButtonGroup, 
    BaseControl, 
    Dropdown,
    Dashicon,
    TabPanel,

} from '@wordpress/components';

import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import GradientColorControl from '@Components/gradient-color-control';
import ColorControl from '@Components/color-control';
import SwitcherControl from '@Components/switcher-control';
import './editor.lazy.scss';

const BackgroundColorControl = ({
    label = __("Background Color", "gutenslider-blocks"),
    deviceType,
    bgColorSwitcher,
    setBgColorSwitcher,

    normalBackgroundType,
    setNormalBackgroundType,
    normalClassicColor,
    setNormalClassicColor,
    normalGradientColor=null,
    setNormalGradientColor,
    normalCustomGradientSwitcher,
    setNormalCustomGradientSwitcher,
    normalCustomGradientInputValue,
    setNormalCustomGradientInputValue,
    normalBackgroundImageUrl,
    setNormalBackgroundImageUrl,
    normalBackgroundImageAlt,
    setNormalBackgroundImageAlt,
    normalBackgroundImageID,
    setNormalBackgroundImageID,
    normalBackgroundImagePosition = { x: 0.5, y: 0.5 },
    setNormalBackgroundImagePosition,
    normalBackgroundImageAttachment = 'scroll',
    setNormalBackgroundImageAttachment,
    normalBackgroundImageRepeat = 'no-repeat',
    setNormalBackgroundImageRepeat,
    normalBackgroundImageSize = 'cover',
    setNormalBackgroundImageSize,

    hoverBackgroundType,
    setHoverBackgroundType,
    hoverClassicColor,
    setHoverClassicColor,
    hoverGradientColor=null,
    setHoverGradientColor,
    hoverCustomGradientSwitcher,
    setHoverCustomGradientSwitcher,
    hoverCustomGradientInputValue,
    setHoverCustomGradientInputValue,
    hoverBackgroundImageUrl,
    setHoverBackgroundImageUrl,
    hoverBackgroundImageAlt,
    setHoverBackgroundImageAlt,
    hoverBackgroundImageID,
    setHoverBackgroundImageID,
    hoverBackgroundImagePosition = { x: 0.5, y: 0.5 },
    setHoverBackgroundImagePosition,
    hoverBackgroundImageAttachment = 'scroll',
    setHoverBackgroundImageAttachment,
    hoverBackgroundImageRepeat = 'no-repeat',
    setHoverBackgroundImageRepeat,
    hoverBackgroundImageSize = 'cover',
    setHoverBackgroundImageSize,
    setAttributes,

    isBackgroundImage = true,

}) => {

    const BACKGROUND_TYPES = [
        { label: __('Classic', 'gutenslider-blocks'), value: 'classic' },
        { label: __('Gradient', 'gutenslider-blocks'), value: 'gradient' },
    ];

    return (

        <>
            <BaseControl
                label={__("Background", "gutenslider-blocks")}
                    className="gutenslider-background-color-control-wrapper-label global-setting-switcher-container"
                >
                <TabPanel
                    className="gutenslider-bg-tab-panel"
                    activeClass="active-tab"
                    tabs={[
                        { name: "normal", title: __("Normal", "gutenslider-blocks"), className: "gutenslider-bg-tab" },
                        { name: "hover", title: __("Hover", "gutenslider-blocks"), className: "gutenslider-bg-tab" },
                    ]}
                >
                    {(tab) => (
                        <div className={`gutenslider-tab-panel-wrapper ${tab.name}`}>
                            {tab.name === "normal" && (
                                <>
                                    <BaseControl
                                        label={__("Background Type", "gutenslider-blocks")}
                                        className="global-setting-switcher-panel-wrapper"
                                    >
                                        <ButtonGroup className="global-setting-switcher-panel-btn">
                                            {BACKGROUND_TYPES.map((item) => (
                                                <Button
                                                    key={item.value}
                                                    onClick={() => setNormalBackgroundType(item.value)}
                                                    className={`global-setting-switcher-panel-btn-switcher ${normalBackgroundType === item.value ? 'active' : ''}`}
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>

                                    {normalBackgroundType === 'classic' && (

                                        <>
                                            <ColorControl
                                                label={__("Normal Color", "gutenslider-blocks")}
                                                color={normalClassicColor}
                                                onChangeColor={(value) => setNormalClassicColor(value)}
                                            />

                                            {isBackgroundImage && (
                                                <ResponsiveBackgroundImageControl
                                                    label={__("Background Image", "gutenslider-blocks")}
                                                    deviceType={deviceType}
                                                    globalBackgroundImageUrl={normalBackgroundImageUrl}
                                                    setGlobalBackgroundImageUrl={(value) => setNormalBackgroundImageUrl(value)}
                                                    globalBackgroundImageAlt={normalBackgroundImageAlt}
                                                    setGlobalBackgroundImageAlt={(value) => setNormalBackgroundImageAlt(value)}
                                                    globalBackgroundImageID={normalBackgroundImageID}
                                                    setGlobalBackgroundImageID={(value) => setNormalBackgroundImageID(value)}
                                                    globalBackgroundImagePosition={normalBackgroundImagePosition}
                                                    setGlobalBackgroundImagePosition={(value) => setNormalBackgroundImagePosition(value)}
                                                    globalBackgroundImageAttachment={normalBackgroundImageAttachment}
                                                    setGlobalBackgroundImageAttachment={(value) => setNormalBackgroundImageAttachment(value)}
                                                    globalBackgroundImageRepeat={normalBackgroundImageRepeat}
                                                    setGlobalBackgroundImageRepeat={(value) => setNormalBackgroundImageRepeat(value)}
                                                    globalBackgroundImageSize={normalBackgroundImageSize}
                                                    setGlobalBackgroundImageSize={(value) => setNormalBackgroundImageSize(value)}
                                                    setAttributes={setAttributes}
                                                />
                                            )}
                                                    
                                        </>
                                    )}

                                    {normalBackgroundType === 'gradient' && (
                                        <GradientColorControl
                                            globalCustomGradientSwitcher={normalCustomGradientSwitcher}
                                            setGlobalCustomGradientSwitcher={(value) => setNormalCustomGradientSwitcher(value)}
                                            globalCustomGradientInputValue={normalCustomGradientInputValue}
                                            setGlobalCustomGradientInputValue={(value) => setNormalCustomGradientInputValue(value)}
                                            globalGradientColor={normalGradientColor}
                                            setGlobalGradientColor={(value) => setNormalGradientColor(value)}
                                        />
                                    )}
                                </>
                            )}
                            {tab.name === "hover" && (
                                <>
                                    <BaseControl
                                        label={__("Background Type", "gutenslider-blocks")}
                                        className="global-setting-switcher-panel-wrapper"
                                    >
                                        <ButtonGroup className="global-setting-switcher-panel-btn"> 
                                            {BACKGROUND_TYPES.map((item) => (
                                                <Button
                                                    key={item.value}
                                                    onClick={() => setHoverBackgroundType(item.value)}
                                                    className={`global-setting-switcher-panel-btn-switcher ${hoverBackgroundType === item.value ? 'active' : ''}`}
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </BaseControl>

                                    {hoverBackgroundType === 'classic' && (

                                        <>
                                            <ColorControl
                                                label={__("Hover Color", "gutenslider-blocks")}
                                                color={hoverClassicColor}
                                                onChangeColor={(value) => setHoverClassicColor(value)}
                                            />

                                            {isBackgroundImage && (
                                                <ResponsiveBackgroundImageControl
                                                    label={__("Background Image", "gutenslider-blocks")}
                                                    deviceType={deviceType}
                                                    globalBackgroundImageUrl={hoverBackgroundImageUrl}
                                                    setGlobalBackgroundImageUrl={(value) => setHoverBackgroundImageUrl(value)}
                                                    globalBackgroundImageAlt={hoverBackgroundImageAlt}
                                                    setGlobalBackgroundImageAlt={(value) => setHoverBackgroundImageAlt(value)}
                                                    globalBackgroundImageID={hoverBackgroundImageID}
                                                    setGlobalBackgroundImageID={(value) => setHoverBackgroundImageID(value)}
                                                    globalBackgroundImagePosition={hoverBackgroundImagePosition}
                                                    setGlobalBackgroundImagePosition={(value) => setHoverBackgroundImagePosition(value)}
                                                    globalBackgroundImageAttachment={hoverBackgroundImageAttachment}
                                                    setGlobalBackgroundImageAttachment={(value) => setHoverBackgroundImageAttachment(value)}
                                                    globalBackgroundImageRepeat={hoverBackgroundImageRepeat}
                                                    setGlobalBackgroundImageRepeat={(value) => setHoverBackgroundImageRepeat(value)}
                                                    globalBackgroundImageSize={hoverBackgroundImageSize}
                                                    setGlobalBackgroundImageSize={(value) => setHoverBackgroundImageSize(value)}
                                                    setAttributes={setAttributes}
                                                />
                                            )}
                                        </>
                                    )}

                                    {hoverBackgroundType === 'gradient' && (
                                        <GradientColorControl
                                            globalCustomGradientSwitcher={hoverCustomGradientSwitcher}
                                            setGlobalCustomGradientSwitcher={(value) => setHoverCustomGradientSwitcher(value)}
                                            globalCustomGradientInputValue={hoverCustomGradientInputValue}
                                            setGlobalCustomGradientInputValue={(value) => setHoverCustomGradientInputValue(value)}
                                            globalGradientColor={hoverGradientColor}
                                            setGlobalGradientColor={(value) => setHoverGradientColor(value)}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </TabPanel>
            </BaseControl>
        </>
    );
};

export default BackgroundColorControl;
