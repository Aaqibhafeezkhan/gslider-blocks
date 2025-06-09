import { __ } from '@wordpress/i18n';
import { 
	BaseControl,
	Button,
	SelectControl,
	Dropdown,
	Dashicon,
} from '@wordpress/components';

import {
    FONT_FAMILYS,
    FONT_WEIGHT,
    FONT_STYLE,
    TEXT_TRANSFORM,
    TEXT_DECORATION,
} from '@Constants';

import ResponsiveRangeControl from '@Components/responsive-range-control';
import SelectControls from '@Components/select-controls';

const ResponsiveTypographyControl = ({
    fontFamily,
	onChangeFontFamily,
	fontSize,
	onChangeFontSize,
	fontSizeUnits,
	onChangeFontSizeUnit,
    fontWeight,
    onChangeFontWeight,
    fontStyle,
    onChangeFontStyle,
    textTransform,
    onChangeTextTransform,
    textDecoration,
    onChangeTextDecoration,
    letterSpacing,
	onChangeLetterSpacing,
	letterSpacingUnits,
	onChangeLetterSpacingUnit,
    lineHeight,
	onChangeLineHeight,
	lineHeightUnits,
	onChangeLineHeightUnit,
    deviceType,
}) => {
	const handleFontFamilyChange = (newFontFamily) => {
		onChangeFontFamily(newFontFamily);
	};

	const handleFontSizeChange = (newFontSize) => {
		onChangeFontSize(newFontSize);
	};

	const handleFontSizeUnitChange = (newFontSizeUnit) => {
		onChangeFontSizeUnit(newFontSizeUnit);
	};

	const handleFontWeightChange = (newFontWeight) => {
		onChangeFontWeight(newFontWeight);
	};

    const handleFontStyleChange = (newFontStyle) => {
		onChangeFontStyle(newFontStyle);
	};

    const handleTextTransformChange = (newTextTransform) => {
		onChangeTextTransform(newTextTransform);
	};

    const handleTextDecorationChange = (newTextDecoration) => {
		onChangeTextDecoration(newTextDecoration);
	};

    const handleLetterSpacingChange = (newLetterSpacing) => {
        onChangeLetterSpacing(newLetterSpacing);
    };

    const handleLetterSpacingUnitChange = (newLetterSpacingUnit) => {
        onChangeLetterSpacingUnit(newLetterSpacingUnit);
    };
    
    const handleLineHeightChange = (newLineHeight) => {
        onChangeLineHeight(newLineHeight);
    };

    const handleLineHeightUnitChange = (newLineHeightUnit) => {
        onChangeLineHeightUnit(newLineHeightUnit);
    };

    return (
        <BaseControl
            label={__("Typography", "gslider-blocks")}
            className="gslider-setting-typography"
        >
            <Dropdown
                className="gslider-setting-dropdown-icon-wrapper"
                contentClassName="gslider-setting-dropdown-icon-content"
                popoverProps={{ placement: 'bottom-start' }}
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        variant="primary"
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        aria-label={__("Toggle Typography Settings", "gslider-blocks")}
                        className="gslider-setting-dropdown-icon-btn"
                    >
                        <Dashicon icon="edit" className="gslider-setting-dropdown-icon" />
                    </Button>
                )}
                renderContent={() => (
                    <div className="gslider-setting-typography-popup">
                        <BaseControl className="gslider-setting-typography-popup-inner">
                            <SelectControl
                                label={__("Font Family", "gslider-blocks")}
                                options={FONT_FAMILYS}
                                value={fontFamily}
                                onChange={handleFontFamilyChange}
                            />
                            <ResponsiveRangeControl
                                min={1}
                                max={100}
                                label={__("Font Size", "gslider-blocks")}
                                rangeValue={fontSize}
                                onChangeValue={handleFontSizeChange}
                                onUnitChange={handleFontSizeUnitChange}
                                deviceType={deviceType}
                                units={fontSizeUnits}
                                step={1}
                                resetFallbackValue={""}
                            />
                            <SelectControls
                                label={__("Font Weight", "gslider-blocks")}
                                value={fontWeight}
                                options={FONT_WEIGHT}
                                onChange={handleFontWeightChange}
                            />
                            <SelectControls
                                label={__("Font Style", "gslider-blocks")}
                                value={fontStyle}
                                options={FONT_STYLE}
                                onChange={handleFontStyleChange}
                            />
                            <SelectControls
                                label={__("Text Transform", "gslider-blocks")}
                                value={textTransform}
                                options={TEXT_TRANSFORM}
                                onChange={handleTextTransformChange}
                            />
                            <SelectControls
                                label={__("Text Decoration", "gslider-blocks")}
                                value={textDecoration}
                                options={TEXT_DECORATION}
                                onChange={handleTextDecorationChange}
                            />
                            <ResponsiveRangeControl
                                min={-20}
                                max={20}
                                label={__("Letter Spacing", "gslider-blocks")}
                                rangeValue={letterSpacing}
                                onChangeValue={handleLetterSpacingChange}
                                onUnitChange={handleLetterSpacingUnitChange}
                                deviceType={deviceType}
                                units={letterSpacingUnits}
                                step={.1}
                                resetFallbackValue={""}
                            />
                            <ResponsiveRangeControl
                                min={1}
                                max={100}
                                label={__("Line Height", "gslider-blocks")}
                                rangeValue={lineHeight}
                                onChangeValue={handleLineHeightChange}
                                onUnitChange={handleLineHeightUnitChange}
                                deviceType={deviceType}
                                units={lineHeightUnits}
                                step={1}
                                resetFallbackValue={""}
                            />
                        </BaseControl>
                    </div>
                )}
            />
        </BaseControl>
    );
};

export default ResponsiveTypographyControl;
