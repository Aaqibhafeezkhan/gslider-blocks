import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Dashicon, Tooltip } from '@wordpress/components';

/**
 * PresetSelector — Reusable visual preset picker for all GSlider blocks.
 *
 * Uses CSS-only card grid with Dashicons + text labels.
 * Zero image assets — works for 50+ blocks without bloat.
 *
 * Styles: admin/scss/components/_preset-selector.scss
 *
 * @param {Object}   props
 * @param {string}   props.label       - Control label
 * @param {Array}    props.presets     - Array of { value, label, icon, isPro?, description? }
 * @param {string}   props.value       - Currently selected preset value
 * @param {Function} props.onChange    - Callback when preset changes
 * @param {boolean}  props.isProActive - Whether Pro plugin is active (unlocks pro presets)
 * @param {number}   props.columns     - Number of columns in grid (default: 2)
 * @param {string}   props.help        - Optional help text
 */
const PresetSelector = ({
    label = '',
    presets = [],
    value,
    onChange,
    isProActive = false,
    columns = 2,
    help = '',
}) => {
    // Build wrapper class with column variant
    const controlClass = [
        'gslider-preset-selector-control',
        columns !== 2 ? `gslider-preset-columns-${columns}` : '',
    ].filter(Boolean).join(' ');

    return (
        <BaseControl
            label={label}
            help={help}
            className={controlClass}
        >
            <div className="gslider-preset-selector-grid">
                {presets.map((preset) => {
                    const isActive = value === preset.value;
                    // Only lock if preset is marked Pro AND Pro is not active
                    const isLocked = preset.isPro === true && !isProActive;

                    const wrapperClass = [
                        'gslider-preset-card-wrapper',
                        isActive ? 'is-active' : '',
                        isLocked ? 'is-pro-locked' : '',
                    ].filter(Boolean).join(' ');

                    return (
                        <Tooltip
                            key={preset.value}
                            text={preset.description || preset.label}
                        >
                            <div className={wrapperClass}>
                                {/* Pro Badge — outside button, on wrapper */}
                                {isLocked && (
                                    <span className="gslider-preset-pro-badge">
                                        {__('Pro', 'gslider-blocks')}
                                    </span>
                                )}

                                <Button
                                    className="gslider-preset-selector-card"
                                    onClick={() => {
                                        if (!isLocked) {
                                            onChange(preset.value);
                                        }
                                    }}
                                    aria-pressed={isActive}
                                >
                                    {/* Dashicon */}
                                    {preset.icon && (
                                        <Dashicon icon={preset.icon} />
                                    )}

                                    {/* Label */}
                                    <span className="gslider-preset-selector-label">
                                        {preset.label}
                                    </span>
                                </Button>
                            </div>
                        </Tooltip>
                    );
                })}
            </div>
        </BaseControl>
    );
};

export default PresetSelector;
