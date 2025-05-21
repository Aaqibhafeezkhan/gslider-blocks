import { __ } from '@wordpress/i18n';
import { Button, BaseControl, ButtonGroup } from '@wordpress/components';


const SwitcherControl = ({ label, globalSwitcher, setGlobalSwitcher }) => {

    const NORMAL_HOVER = [
        { label: __('Normal', 'gslider-blocks'), value: 'normal' },
        { label: __('Hover', 'gslider-blocks'), value: 'hover' },
    ];

    return (
        <div className="gslider-setting-switcher-container">
            <BaseControl
                label={label}
                className="gslider-setting-switcher-panel-wrapper"
            >
                <ButtonGroup className="gslider-setting-switcher-panel-btn">
                    {NORMAL_HOVER.map((item, key) => (
                        <Button
                            key={key}
                            onClick={() => setGlobalSwitcher(item.value)} 
                            className={`gslider-setting-switcher-panel-btn-switcher ${globalSwitcher === item.value ? 'active' : ''}`}
                        >
                            {item.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </BaseControl>
        </div>
    );
};

export default SwitcherControl;
