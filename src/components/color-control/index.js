import { __ } from '@wordpress/i18n';
import { BaseControl, Dropdown, ColorPicker, ColorPalette, Dashicon, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.lazy.scss';

const ColorControl = ({ label, color, onChangeColor }) => {

    const themeColors = useSelect((select) => {
		return select("core/editor").getEditorSettings().colors;
	}, []);

    return (
        <div className="global-setting-color-container">
            <BaseControl 
                label={__(label, "gutenslider-blocks")}
                className="global-setting-color-switcher-wrapper"
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
                        <div className="global-setting-panel-icon-popup">
                            <BaseControl className="global-setting-panel-icon-popup-inner">
                                <div className="global-setting-color">
                                    <ColorPicker
                                        color={color}
                                        onChange={onChangeColor}
                                        enableAlpha={true}
                                    />
                                    <div className="global-setting-color-label">{__("Default Colors", "gutenslider-blocks")}</div>
                                    <ColorPalette
                                        colors={[
                                            { color: '#2563eb' },
                                            { color: '#FFFFFF' },
                                            { color: '#000000' },
                                            { color: '#4285F4' },
                                            { color: '#FBBC05' },
                                            { color: '#34A853' },
                                            { color: '#EA4335' },
                                            { color: '#55ACEE' },
                                            { color: '#66757F' },
                                            { color: '#3B5998' },
                                            { color: '#8B9DC3' },
                                            { color: '#F65314' },
                                            { color: '#7CBB00' },
                                            { color: '#00A1F1' },
                                            { color: '#0F7DC2' },
                                            { color: '#3F729B' },
                                            { color: '#006699' },
                                            { color: '#7B0099' },
                                            { color: '#FF9900' },
                                            { color: '#A4C639' },
                                            { color: '#F72585' },
                                            { color: '#3A0CA3' },
                                            { color: '#4CC9F0' },
                                            { color: '#2FF3E0' },
                                            { color: '#F8D210' },
                                            { color: '#B7AC44' },
                                            { color: '#FF8300' },
                                            { color: '#B6E2D3' },
                                            { color: '#FF4500' },
                                            { color: '#4040a1' },
                                            { color: '#EEB5EB' },
                                            { color: '#C26DBC' },
                                            { color: '#C8F4F9' },
                                            { color: '#3CACAE' },
                                            { color: '#4C5270' },
                                            { color: '#C8DF52' },
                                            { color: '#000C66' },
                                            { color: '#0000FF' },
                                            { color: '#D8A7B1' },
                                            { color: '#7EC8E3' },
                                            { color: '#FDB750' },
                                            { color: '#116530' },
                                            { color: '#21B6A8' },
                                            { color: '#A3EBB1' },
                                            { color: '#76B947' },
                                            { color: '#B1D8B7' },
                                            { color: '#00FF22' },
                                            { color: '#94C973' },
                                            { color: '#EF7C8E' },
                                            { color: '#FAE8E0' },
                                        ]}
                                        disableCustomColors={true}
                                        value={color}
                                        onChange={onChangeColor}
                                    />
                                    {themeColors.length > 0 && (
                                        <>
                                            <div className="global-setting-color-label">{__("Theme Colors", "gutenslider-blocks")}</div>
                                            <ColorPalette
                                                colors={themeColors}
                                                disableCustomColors={true}
                                                value={color}
                                                onChange={onChangeColor}
                                            />
                                        </>
                                    )}
                                </div>
                            </BaseControl>
                        </div>
                    )}
                />
            </BaseControl>
        </div>
    );
};

export default ColorControl;
