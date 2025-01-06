import { useBlockProps, RichText } from '@wordpress/block-editor';
import renderSVG from "../../components/icon-picker/components/icon-picker/controls/renderIcon";

export default function save({ attributes }) {
    const {
        blockId,
        buttonAlignment,
        buttonText,
        buttonUrl,
        buttonTargetUrl,
        buttonIconAlign,
        buttonIcon,
        buttonIconPosition,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `${blockId}`,
    });
    

    return (
        <>
            <div {...blockProps}>
                <div className={`bb-advanced-button-wrapper`} style={{ textAlign: buttonAlignment }}>
                    <a 
                        className="bb-advanced-button" 
                        href={buttonUrl} 
                        target={buttonTargetUrl ? '_blank' : undefined}
                        rel={buttonTargetUrl ? 'noopener noreferrer' : undefined}
                    >
                        {buttonIconPosition === 'left' && buttonIconAlign === 'icon-text' && (
                            <div className={`bb-advanced-button-icon-wrapper ${buttonIconPosition}`}>
                                <div className="bb-advanced-button-icon">{renderSVG(buttonIcon)}</div>
                            </div>
                        )}
                        {buttonIconAlign !== 'icon-only' && (
                            <RichText.Content
                                tagName="span"
                                value={buttonText}
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
