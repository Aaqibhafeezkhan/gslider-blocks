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
import Select2 from "react-select";
import SelectControls from '@Components/select-controls';
import ResponsiveRangeControl from '@Components/responsive-range-control';

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
    lineHeight,
	onChangeLineHeight,
	lineHeightUnits,
	onChangeLineHeightUnit,
    letterSpacing,
	onChangeLetterSpacing,
	letterSpacingUnits,
	onChangeLetterSpacingUnit,
    wordSpacing,
	onChangeWordSpacing,
	wordSpacingUnits,
	onChangeWordSpacingUnit,
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
    
    const handleLineHeightChange = (newLineHeight) => {
        onChangeLineHeight(newLineHeight);
    };

    const handleLineHeightUnitChange = (newLineHeightUnit) => {
        onChangeLineHeightUnit(newLineHeightUnit);
    };

    const handleLetterSpacingChange = (newLetterSpacing) => {
        onChangeLetterSpacing(newLetterSpacing);
    };

    const handleLetterSpacingUnitChange = (newLetterSpacingUnit) => {
        onChangeLetterSpacingUnit(newLetterSpacingUnit);
    };

    const handleWordSpacingChange = (newWordSpacing) => {
        onChangeWordSpacing(newWordSpacing);
    };

    const handleWordSpacingUnitChange = (newWordSpacingUnit) => {
        onChangeWordSpacingUnit(newWordSpacingUnit);
    };

    const gsliderSelect2ControlStyles = {
        control: (base, state) => ({
          ...base,
          backgroundColor: '#fff',
          borderColor: '#ededed',
          borderWidth: '1px',
          boxShadow: 'none',
          borderRadius: '4px',
          minHeight: '30px', // total height match
          height: '30px',
          outline: 'none',
          '&:hover': {
            borderColor: '#ededed',
          },
        }),
      
        valueContainer: (base) => ({
          ...base,
          padding: '0 8px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
        }),
      
        indicatorsContainer: (base) => ({
          ...base,
          height: '30px',
        }),


        dropdownIndicator: (base, state) => ({
            ...base,
            color: '#1e1e1e',
            transition: 'all 0.2s ease',
            '&:hover': {
                color: '#007cba',
            },
            
            svg: {
              width: 16,
              height: 16,
              fill: 'currentColor',
            },
        }),
      
        input: (base) => ({
          ...base,
          color: '#1e1e1e',
          fontSize: '12px',
          padding: 0,
          margin: 0,
          height: '30px',
          lineHeight: 1,
          outline: 'none',
          boxShadow: 'none',
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        }),
      
        singleValue: (base) => ({
          ...base,
          color: '#1e1e1e',
          lineHeight: 1,
        }),
      
        menu: (base) => ({
          ...base,
          backgroundColor: '#fff',
          border: '1px solid #ededed',
          borderRadius: '4px',
          boxShadow: 'none',
          marginTop: '2px',
          zIndex: 999,
        }),
      
        menuList: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: '4px',
          border: 'none',
          maxHeight: '200px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }),
      
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? '#ededed'
            : state.isFocused
            ? '#dcf2ff'
            : '#fff',
          color: state.isFocused ? '#007cba' : '#1e1e1e',
          fontSize: '12px',
          fontWeight: 400,
          textTransform: 'capitalize',
          lineHeight: 1.3,
          padding: '6px 12px',
          cursor: 'pointer',
          outline: 'none',
        }),
      
        placeholder: (base) => ({
          ...base,
          color: '#1e1e1e',
          fontSize: '12px',
        }),
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
                        <div className="gslider-setting-typography-popup-inner">

                            <BaseControl
                                label={__("Family", "gslider-blocks")}
                            >
                                <Select2 
                                    options={FONT_FAMILYS}
                                    value={fontFamily}
                                    onChange={handleFontFamilyChange}
                                    className="gslider-select2-control"
                                     classNamePrefix="react-select"
                                    styles={gsliderSelect2ControlStyles}
                                />
                            </BaseControl>
                            <ResponsiveRangeControl
                                min={1}
                                max={100}
                                label={__("Size", "gslider-blocks")}
                                rangeValue={fontSize}
                                onChangeValue={handleFontSizeChange}
                                onUnitChange={handleFontSizeUnitChange}
                                deviceType={deviceType}
                                units={fontSizeUnits}
                                step={1}
                                resetFallbackValue={""}
                            />

                            <SelectControls
                                label={__("Weight", "gslider-blocks")}
                                value={fontWeight}
                                options={FONT_WEIGHT}
                                onChange={handleFontWeightChange}
                            />
                            <SelectControls
                                label={__("Transform", "gslider-blocks")}
                                value={textTransform}
                                options={TEXT_TRANSFORM}
                                onChange={handleTextTransformChange}
                            />
                            <SelectControls
                                label={__("Style", "gslider-blocks")}
                                value={fontStyle}
                                options={FONT_STYLE}
                                onChange={handleFontStyleChange}
                            />
                            <SelectControls
                                label={__("Decoration", "gslider-blocks")}
                                value={textDecoration}
                                options={TEXT_DECORATION}
                                onChange={handleTextDecorationChange}
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
                                min={0}
                                max={100}
                                label={__("Word Spacing", "gslider-blocks")}
                                rangeValue={wordSpacing}
                                onChangeValue={handleWordSpacingChange}
                                onUnitChange={handleWordSpacingUnitChange}
                                deviceType={deviceType}
                                units={wordSpacingUnits}
                                step={1}
                                resetFallbackValue={""}
                            />
                        </div>
                    </div>
                )}
            />
        </BaseControl>
    );
};

export default ResponsiveTypographyControl;
