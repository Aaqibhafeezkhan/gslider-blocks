// background-color.js
import { __ } from '@wordpress/i18n';
import { 
    Button, 
    ButtonGroup, 
    BaseControl, 
    Dropdown,
    Dashicon,

} from '@wordpress/components';

import BackgroundImageControl from '@Components/background-image-control';
import GradientColorControl from '@Components/gradient-color-control';
import ColorControl from '@Components/color-control';
import SwitcherControl from '@Components/switcher-control';
import './editor.lazy.scss';

const BackgroundColorControl = ({
    label = __("Background Color", "gutenslider-blocks"),
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

    isBackgroundImage = true,

}) => {

    const BACKGROUND_TYPES = [
        { label: __('Classic', 'gutenslider-blocks'), value: 'classic' },
        { label: __('Gradient', 'gutenslider-blocks'), value: 'gradient' },
    ];

    return (

        <>
            <SwitcherControl
                label={label}
                globalSwitcher={bgColorSwitcher}
                setGlobalSwitcher={(value) => setBgColorSwitcher(value)}
            />

            {bgColorSwitcher === 'normal' && (
                <BaseControl
                    className="global-setting-background-color-setting-wrapper"
                    label={__("Background Type", "gutenslider-blocks")}
                >
                    <Dropdown
                        className="global-setting-icon-dropdown"
                        contentClassName="global-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-icon-btn"
                            >
                                <Dashicon icon="admin-generic" className="global-setting-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-background-color-popup-wrapper">
                                <BaseControl
                                    className="global-setting-background-color-popup-inner-wrapper"
                                >
                                    <ButtonGroup className="global-setting-background-color-panel-btn">
                                        {BACKGROUND_TYPES.map((item) => (
                                            <Button
                                                key={item.value}
                                                onClick={() => setNormalBackgroundType(item.value)}
                                                className={`global-setting-background-color-panel-btn-switcher ${normalBackgroundType === item.value ? 'active' : ''}`}
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
                                            <BackgroundImageControl
                                                label={__("Background Image", "gutenslider-blocks")}
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
                            </div>
                        )}
                    />
                </BaseControl>
            )}
            {bgColorSwitcher === 'hover' && (
                <BaseControl
                    className="global-setting-background-color-setting-wrapper"
                    label={__("Background Type", "gutenslider-blocks")}
                >
                    <Dropdown
                        className="global-setting-icon-dropdown"
                        contentClassName="global-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-icon-btn"
                            >
                                <Dashicon icon="admin-generic" className="global-setting-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-background-color-popup-wrapper">
                                <BaseControl
                                    className="global-setting-background-color-popup-inner-wrapper"
                                >
                                    <ButtonGroup className="global-setting-background-color-panel-btn">
                                        {BACKGROUND_TYPES.map((item) => (
                                            <Button
                                                key={item.value}
                                                onClick={() => setHoverBackgroundType(item.value)}
                                                className={`global-setting-background-color-panel-btn-switcher ${hoverBackgroundType === item.value ? 'active' : ''}`}
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
                                            <BackgroundImageControl
                                                label={__("Background Image", "gutenslider-blocks")}
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
                            </div>
                        )}
                    />
                </BaseControl>
            )}
        </>
    );
};

export default BackgroundColorControl;
