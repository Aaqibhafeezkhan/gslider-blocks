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
	{ label: __("H1", "gutenslider-blocks"), value: "h1" },
	{ label: __("H2", "gutenslider-blocks"), value: "h2" },
	{ label: __("H3", "gutenslider-blocks"), value: "h3" },
	{ label: __("H4", "gutenslider-blocks"), value: "h4" },
	{ label: __("H5", "gutenslider-blocks"), value: "h5" },
	{ label: __("H6", "gutenslider-blocks"), value: "h6" },
	{ label: __("P", "gutenslider-blocks"), value: "p" },
	{ label: __("Div", "gutenslider-blocks"), value: "span" },
];

export const SEPERATOR_STYLES = [
	{ label: __("Solid", "gutenslider-blocks"), value: "solid" },
	{ label: __("Dashed", "gutenslider-blocks"), value: "dashed" },
	{ label: __("Dotted", "gutenslider-blocks"), value: "dotted" },
	{ label: __("Double", "gutenslider-blocks"), value: "double" },
	{ label: __("Groove", "gutenslider-blocks"), value: "groove" },
	{ label: __("Outset", "gutenslider-blocks"), value: "outset" },
	{ label: __("Ridge", "gutenslider-blocks"), value: "ridge" },
];

export const BORDER_STYLES = [
	{ label: __("None", "gutenslider-blocks"), value: "none" },
	{ label: __("Solid", "gutenslider-blocks"), value: "solid" },
	{ label: __("Dashed", "gutenslider-blocks"), value: "dashed" },
	{ label: __("Dotted", "gutenslider-blocks"), value: "dotted" },
	{ label: __("Double", "gutenslider-blocks"), value: "double" },
	{ label: __("Groove", "gutenslider-blocks"), value: "groove" },
	{ label: __("Outset", "gutenslider-blocks"), value: "outset" },
	{ label: __("Ridge", "gutenslider-blocks"), value: "ridge" },
];

export const SLIDER_EFFECT_OPTIONS = [
	{ value: 'slide', label: __('Slide', 'gutenslider-blocks') },
	{ value: 'fade', label: __('Fade', 'gutenslider-blocks') },
	{ value: 'coverflow', label: __('Coverflow', 'gutenslider-blocks') },
	{ value: 'flip', label: __('Flip', 'gutenslider-blocks') },
	{ value: 'creative', label: __('Creative', 'gutenslider-blocks') },
];

export const CAROUSEL_EFFECT_OPTIONS = [
	{ value: 'slide', label: __('Slide', 'gutenslider-blocks') },
	{ value: 'coverflow', label: __('Coverflow', 'gutenslider-blocks') },
];

export const SLIDER_TYPE = [
	{ value: 'slider', label: __('Slider', 'gutenslider-blocks') },
	{ value: 'carousel', label: __('Carousel', 'gutenslider-blocks') },
];

export const PAGINATION_TYPE = [
	{ value: 'bullets', label: __('Bullets', 'gutenslider-blocks') },
	{ value: 'fraction', label: __('Fraction', 'gutenslider-blocks') },
	{ value: 'progressbar', label: __('Progress Bar', 'gutenslider-blocks') }
];

export const NORMAL_ACTIVE = [
	{ label: __('Normal', 'gutenslider-blocks'), value: 'normal' },
	{ label: __('Active', 'gutenslider-blocks'), value: 'active' },
];