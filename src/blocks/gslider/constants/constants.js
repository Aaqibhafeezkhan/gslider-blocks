import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const TITLE_MARGIN = "titleMargin";
export const SUBTITLE_MARGIN = "subtitleMargin";
export const separator_MARGIN = "separatorMargin";
export const separator_LINE_SIZE = "separatorLineSize";
export const separator_ICON_SIZE = "separatorIconSize";
export const separator_WIDTH = "separatorWidth";

export const UNIT_TYPES = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "em", value: "em" },
];

export const NORMAL_HOVER = [
	{ label: "Normal", value: "normal" },
	{ label: "Hover", value: "hover" },
];

export const ICON_ALIGN = [
	{ label: __(<Dashicon icon={"remove"} />), value: "none" },
	{ label: __(<Dashicon icon={"admin-generic"} />), value: "icon" },
];

export const TEXT_ALIGN = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

export const HEADING = [
	{ label: __("H1", "gslider-blocks"), value: "h1" },
	{ label: __("H2", "gslider-blocks"), value: "h2" },
	{ label: __("H3", "gslider-blocks"), value: "h3" },
	{ label: __("H4", "gslider-blocks"), value: "h4" },
	{ label: __("H5", "gslider-blocks"), value: "h5" },
	{ label: __("H6", "gslider-blocks"), value: "h6" },
	{ label: __("P", "gslider-blocks"), value: "p" },
	{ label: __("Div", "gslider-blocks"), value: "span" },
];

export const SEPERATOR_STYLES = [
	{ label: __("Solid", "gslider-blocks"), value: "solid" },
	{ label: __("Dashed", "gslider-blocks"), value: "dashed" },
	{ label: __("Dotted", "gslider-blocks"), value: "dotted" },
	{ label: __("Double", "gslider-blocks"), value: "double" },
	{ label: __("Groove", "gslider-blocks"), value: "groove" },
	{ label: __("Outset", "gslider-blocks"), value: "outset" },
	{ label: __("Ridge", "gslider-blocks"), value: "ridge" },
];

export const BORDER_STYLES = [
	{ label: __("None", "gslider-blocks"), value: "none" },
	{ label: __("Solid", "gslider-blocks"), value: "solid" },
	{ label: __("Dashed", "gslider-blocks"), value: "dashed" },
	{ label: __("Dotted", "gslider-blocks"), value: "dotted" },
	{ label: __("Double", "gslider-blocks"), value: "double" },
	{ label: __("Groove", "gslider-blocks"), value: "groove" },
	{ label: __("Outset", "gslider-blocks"), value: "outset" },
	{ label: __("Ridge", "gslider-blocks"), value: "ridge" },
];

export const SLIDER_EFFECT_OPTIONS = [
	{ value: 'slide', label: __('Slide', 'gslider-blocks') },
	{ value: 'fade', label: __('Fade', 'gslider-blocks') },
	{ value: 'coverflow', label: __('Coverflow', 'gslider-blocks') },
	{ value: 'flip', label: __('Flip', 'gslider-blocks') },
	{ value: 'creative', label: __('Creative', 'gslider-blocks') },
];

export const CAROUSEL_EFFECT_OPTIONS = [
	{ value: 'slide', label: __('Slide', 'gslider-blocks') },
	{ value: 'coverflow', label: __('Coverflow', 'gslider-blocks') },
];

export const SLIDER_TYPE = [
	{ value: 'slider', label: __('Slider', 'gslider-blocks') },
	{ value: 'carousel', label: __('Carousel', 'gslider-blocks') },
];

export const PAGINATION_TYPE = [
	{ value: 'bullets', label: __('Bullets', 'gslider-blocks') },
	{ value: 'fraction', label: __('Fraction', 'gslider-blocks') },
	{ value: 'progressbar', label: __('Progress Bar', 'gslider-blocks') }
];

export const NORMAL_ACTIVE = [
	{ label: __('Normal', 'gslider-blocks'), value: 'normal' },
	{ label: __('Active', 'gslider-blocks'), value: 'active' },
];