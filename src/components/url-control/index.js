import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    TextControl,
    Dropdown,
    Button,
    Dashicon,
    ToggleControl
} from '@wordpress/components';
import './editor.lazy.scss';

const UrlControl = ({ label, url, onChangeUrl, openInNewTab, onChangeOpenInNewTab }) => {
    const handleUrlChange = (newUrl) => {
        onChangeUrl(newUrl);
    };

    const handleOpenInNewTabChange = (newOpenInNewTab) => {
        onChangeOpenInNewTab(newOpenInNewTab);
    };

    return (
        <BaseControl
            label={label}
            id="global-setting-url" 
            className="global-url-control-wrapper"
        >
            <div className="global-url-control-inner-wrapper">
                <TextControl
                    value={url}
                    onChange={handleUrlChange}
                    className="global-url-control-input"
                    placeholder={__('https://', 'gutenslider-blocks')}
                />
                <Dropdown
                    className="global-url-control-dropdown-wrapper"
                    contentClassName="global-url-control-dropdown-content"
                    popoverProps={{ placement: 'bottom-start' }}
                    renderToggle={({ isOpen, onToggle }) => (
                        <Button
                            variant="primary"
                            onClick={onToggle}
                            aria-expanded={isOpen}
                            aria-label={__("Toggle URL Settings", "gutenslider-blocks")}
                                className="global-setting-icon-btn"
                        >
                            <Dashicon icon="admin-generic" className="global-setting-panel-icon" />
                        </Button>
                    )}
                    renderContent={() => (
                        <div className="global-url-control-dropdown-popup">
                            <BaseControl className="global-url-control-dropdown-popup-inner">
                                <ToggleControl
                                    label={__("Open in new tab", "gutenslider-blocks")}
                                    checked={openInNewTab}
                                    onChange={handleOpenInNewTabChange}
                                />
                            </BaseControl>
                        </div>
                    )}
                />
            </div>
        </BaseControl>
    );
};

export default UrlControl;