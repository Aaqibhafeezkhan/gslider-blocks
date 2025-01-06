// background-color.js
import { __ } from '@wordpress/i18n';
import { 
    BaseControl, 
    SelectControl,
} from '@wordpress/components';
import './editor.lazy.scss';

const ImageControl = ({
    label = '',
    globalBackgroundImageUrl,
    setGlobalBackgroundImageUrl,
    globalBackgroundImageAlt,
    setGlobalBackgroundImageAlt,
    globalBackgroundImageID,
    setGlobalBackgroundImageID,
    globalBackgroundImagePosition = '',
    setGlobalBackgroundImagePosition,
    globalBackgroundImageAttachment = '',
    setGlobalBackgroundImageAttachment,
    globalBackgroundImageRepeat = '',
    setGlobalBackgroundImageRepeat,
    globalBackgroundImageSize = '',
    setGlobalBackgroundImageSize,

}) => {



    return (

        <BaseControl
            label={label}
            className="global-image-control-wrapper"
        >
            {globalBackgroundImageUrl ? ( 
                <div className="global-image-control" style={{backgroundImage: `url(${globalBackgroundImageUrl})`}}> 
                    <button
                        className='global-image-delete'
                        onClick={() => {
                            setGlobalBackgroundImageUrl(null);
                            setGlobalBackgroundImageAlt(null);
                            setGlobalBackgroundImageID(null);
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4D4D4D" strokeWidth="1.5"></path><path d="M15 9L9 15" stroke="#4D4D4D" strokeWidth="1.5"></path><path d="M9 9L15 15" stroke="#4D4D4D" strokeWidth="1.5"></path></svg>
                    </button>
                    <button
                        className='global-image-replace-btn'
                        onClick={() => {
                            const mediaUploader = wp.media({
                                title: __('Select or Upload background Image', 'button-blocks'),
                                button: {
                                    text: __('Use this image', 'button-blocks'),
                                },
                                multiple: false
                            });

                            mediaUploader.on('select', function() {
                                const attachment = mediaUploader.state().get('selection').first().toJSON();
                                setGlobalBackgroundImageUrl(attachment.url);
                                setGlobalBackgroundImageAlt(attachment.alt);
                                setGlobalBackgroundImageID(attachment.id);
                            });

                            mediaUploader.open();
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.827 16.379C9.77912 16.9085 8.60041 17.1235 7.43311 16.9979C6.2658 16.8722 5.15981 16.4115 4.24861 15.6711C3.33741 14.9308 2.65996 13.9426 2.29804 12.8257C1.93611 11.7088 1.90518 10.5111 2.20897 9.37703L7.62097 10.827C7.09144 9.77918 6.87652 8.60047 7.00213 7.43317C7.12774 6.26586 7.58853 5.15987 8.32886 4.24867C9.06919 3.33747 10.0574 2.66003 11.1743 2.2981C12.2912 1.93617 13.4889 1.90524 14.623 2.20903L13.173 7.62103C14.2208 7.0915 15.3995 6.87658 16.5668 7.00219C17.7341 7.1278 18.8401 7.58859 19.7513 8.32892C20.6625 9.06926 21.34 10.0575 21.7019 11.1744C22.0638 12.2912 22.0948 13.489 21.791 14.623L16.379 13.173C16.9085 14.2209 17.1234 15.3996 16.9978 16.5669C16.8722 17.7342 16.4114 18.8402 15.6711 19.7514C14.9307 20.6626 13.9425 21.34 12.8256 21.702C11.7088 22.0639 10.511 22.0948 9.37697 21.791L10.827 16.379Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12V12.01" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        Replace
                    </button>
                </div>
            ) : (
                <button
                    className='global-image-upload-btn'
                    onClick={() => {
                        const mediaUploader = wp.media({
                            title: __('Select or Upload background Image', 'button-blocks'),
                            button: {
                                text: __('Use this image', 'button-blocks'),
                            },
                            multiple: false
                        });

                        mediaUploader.on('select', function() {
                            const attachment = mediaUploader.state().get('selection').first().toJSON();
                            setGlobalBackgroundImageUrl(attachment.url);
                            setGlobalBackgroundImageAlt(attachment.alt);
                            setGlobalBackgroundImageID(attachment.id);
                        });

                        mediaUploader.open();
                    }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"></path></svg>
                    Upload
                </button>
            )}
            {globalBackgroundImageUrl && (
                <div className="global-image-control-setting-wrapper">
                    <BaseControl
                    >
                        <SelectControl
                            label={__("Image Position", "button-blocks")}
                            className="global-image-label"
                            value={globalBackgroundImagePosition}
                            options={(
                                [
                                    {label: __("Default", "button-blocks"), value: ""},
                                    {label: __("Center Center", "button-blocks"), value: "center center"},
                                    {label: __("Center Left", "button-blocks"), value: "center left"},
                                    {label: __("Center Right", "button-blocks"), value: "center right"},
                                    {label: __("Top Center", "button-blocks"), value: "top center"},
                                    {label: __("Top Left", "button-blocks"), value: "top left"},
                                    {label: __("Top Right", "button-blocks"), value: "top right"},
                                    {label: __("Bottom Center", "button-blocks"), value: "bottom center"},
                                    {label: __("Bottom Left", "button-blocks"), value: "bottom left"},
                                    {label: __("Bottom Right", "button-blocks"), value: "bottom right"},
                                    {label: __("Left Center", "button-blocks"), value: "left center"},
                                    {label: __("Left Top", "button-blocks"), value: "left top"},
                                    {label: __("Left Bottom", "button-blocks"), value: "left bottom"},
                                    {label: __("Right Center", "button-blocks"), value: "right center"},
                                    {label: __("Right Top", "button-blocks"), value: "right top"},
                                    {label: __("Right Bottom", "button-blocks"), value: "right bottom"},
                                ]
                            )}
                            onChange={setGlobalBackgroundImagePosition} 
                        />
                        <SelectControl
                            label={__("Image Attachment", "button-blocks")}
                            className="global-image-label"
                            value={globalBackgroundImageAttachment}
                            options={(
                                [
                                    {label: __("Default", "button-blocks"), value: ""},
                                    {label: __("Scroll", "button-blocks"), value: "scroll"},
                                    {label: __("Fixed", "button-blocks"), value: "fixed"},
                                ]
                            )}
                            onChange={setGlobalBackgroundImageAttachment}
                        />
                        <SelectControl
                            label={__("Image Repeat", "button-blocks")}
                            className="global-image-label"
                            value={globalBackgroundImageRepeat}
                            options={(
                                [
                                    {label: __("Default", "button-blocks"), value: ""},
                                    {label: __("Repeat", "button-blocks"), value: "repeat"},
                                    {label: __("Repeat X", "button-blocks"), value: "repeat-x"},
                                    {label: __("Repeat Y", "button-blocks"), value: "repeat-y"},
                                    {label: __("No Repeat", "button-blocks"), value: "no-repeat"},
                                ]
                            )}
                            onChange={setGlobalBackgroundImageRepeat} 
                        />
                        <SelectControl
                            label={__("Image Size", "button-blocks")}
                            className="global-image-label"
                            value={globalBackgroundImageSize}
                            options={(
                                [
                                    {label: __("Default", "button-blocks"), value: ""},
                                    {label: __("Auto", "button-blocks"), value: "auto"},
                                    {label: __("Cover", "button-blocks"), value: "cover"},
                                    {label: __("Contain", "button-blocks"), value: "contain"},
                                ]
                            )}
                            onChange={setGlobalBackgroundImageSize}
                        />
                    </BaseControl>
                    
                </div>
            )} 

        </BaseControl>
    );
};

export default ImageControl;
