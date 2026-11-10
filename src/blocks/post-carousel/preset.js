import presetClassicCard, {
	classicCardStyles,
} from './presets/presetClassicCard';
import presetModernOverlay, {
	modernOverlayStyles,
} from './presets/presetModernOverlay';
import presetEditorialSplit, {
	editorialSplitStyles,
} from './presets/presetEditorialSplit';

/**
 * Post Carousel Block — Preset Styles Data Object
 *
 * Maps preset slugs to their attribute override objects (used by MCP schema extraction).
 */
export const presetStyles = {
	'classic-card': classicCardStyles,
	'modern-overlay': modernOverlayStyles,
	'editorial-split': editorialSplitStyles,
};

/**
 * Post Carousel Block Presets
 *
 * Consumed by @Components/preset-selector in LayoutModePanel.
 */
export const POST_CAROUSEL_PRESETS = [
	presetClassicCard,
	presetModernOverlay,
	presetEditorialSplit,
];

export default POST_CAROUSEL_PRESETS;
