import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    TextControl,
    Dropdown,
    Button,
    Dashicon,
    ToggleControl
} from '@wordpress/components';

const UrlControl = ({ label, url, onChangeUrl, openInNewTab, onChangeOpenInNewTab, nofollow, onChangeNofollow, sponsored, onChangeSponsored }) => {
    const handleUrlChange = (newUrl) => {
        onChangeUrl(newUrl);
    };

    const handleOpenInNewTabChange = (newOpenInNewTab) => {
        onChangeOpenInNewTab(newOpenInNewTab);
    };

    const handleNofollowChange = (newNofollow) => {
        onChangeNofollow(newNofollow);
    };

    const handleSponsoredChange = (newSponsored) => {
        onChangeSponsored(newSponsored);
    };

    return (
        <BaseControl
            label={label}
            className="gslider-control-wrapper"
        >
            <div className="gslider-control-inner-wrapper">
                <TextControl
                    value={url}
                    onChange={handleUrlChange}
                    className="gslider-control-input"
                    placeholder={__('https://', 'gslider-blocks')}
                />
                <Dropdown
                    className="gslider-control-dropdown-wrapper"
                    contentClassName="gslider-control-dropdown-content"
                    popoverProps={{ placement: 'bottom-start' }}
                    renderToggle={({ isOpen, onToggle }) => (
                        <Button
                            variant="primary"
                            onClick={onToggle}
                            aria-expanded={isOpen}
                            aria-label={__("Toggle URL Settings", "gslider-blocks")}
                                className="gslider-setting-icon-btn"
                        >
                            <Dashicon icon="admin-generic" className="gslider-setting-panel-icon" />
                        </Button>
                    )}
                    renderContent={() => (
                        <div className="gslider-control-dropdown-popup">
                            <BaseControl className="gslider-control-dropdown-popup-inner">
                                <ToggleControl
                                    label={__("Open in new tab", "gslider-blocks")}
                                    checked={openInNewTab}
                                    onChange={handleOpenInNewTabChange}
                                />
                                <ToggleControl
                                    label={__("Add Nofollow rel", "gslider-blocks")}
                                    checked={nofollow}
                                    onChange={handleNofollowChange}
                                />
                                <ToggleControl
                                    label={__("Add Sponsored rel", "gslider-blocks")}
                                    checked={sponsored}
                                    onChange={handleSponsoredChange}
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