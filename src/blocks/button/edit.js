import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    RichText, 
    BlockControls,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import SwitchToBlockSettings  from '@Utils/switchToBlockSettings';
import renderSVG from "../../components/icon-picker/components/icon-picker/controls/renderIcon";
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
    const {
        blockId,
        deviceType,
        buttonAlignment,
        buttonText,
        buttonUrl,
        buttonTargetUrl,
        buttonWidth,
        buttonWidthUnits,
        buttonIcon,
        buttonIconAlign,
        buttonIconPosition,

    } = attributes;
    

    const blockProps = useBlockProps({
        className: `${blockId}`,
    });

    /**
     * Manages tab button settings and switches to block settings on click
     */
    const panelRef = useRef(null);
    SwitchToBlockSettings(panelRef);
    

    // Prevent link navigation in the editor and focus on text
    const handleButtonClick = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
                clientId = {clientId}
            />

            <BlockControls>
                <AlignmentToolbar
                    value={buttonAlignment}
                    onChange={(value) => setAttributes({ buttonAlignment: value })}
                    controls={['left', 'center', 'right', 'justify']}
                />
            </BlockControls>
            
            <div {...blockProps}>
                <div className={`bb-advanced-button-wrapper`} style={{ textAlign: buttonAlignment }} ref={panelRef}>
                    <a 
                        className="bb-advanced-button" 
                        href={buttonUrl} 
                        target={buttonTargetUrl ? '_blank' : undefined}
                        rel={buttonTargetUrl ? 'noopener noreferrer' : undefined}
                        onClick={handleButtonClick}
                    >
                        {buttonIconPosition === 'left' && buttonIconAlign === 'icon-text' && (
                            <div className={`bb-advanced-button-icon-wrapper ${buttonIconPosition}`}>
                                <div className="bb-advanced-button-icon">{renderSVG(buttonIcon)}</div>
                            </div>
                        )}
                        {buttonIconAlign !== 'icon-only' && (
                            <RichText
                                tagName="span"
                                value={buttonText}
                                onChange={(value) => setAttributes({ buttonText: value })}
                                placeholder={__('Enter button text...', 'gutenslider-blocks')}
                                className="bb-advanced-button-text"
                            />
                        )}
                        {buttonIconPosition === 'right' && buttonIconAlign === 'icon-text' && (
                            <div className={`bb-advanced-button-icon-wrapper ${buttonIconPosition}`}>
                                <div className="bb-advanced-button-icon">{renderSVG(buttonIcon)}</div>
                            </div>
                        )}

                        {buttonIconAlign === 'icon-only' && (
                            <div className={`bb-advanced-button-icon-wrapper`}>
                                <div className="bb-advanced-button-icon">{renderSVG(buttonIcon)}</div>
                            </div>
                        )}
                    </a>
                </div>
            </div>
        </>
    );
}
