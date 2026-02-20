import { __ } from '@wordpress/i18n';

/**
 * Testimonial Block Presets
 *
 * Each preset defines: value (CSS class), label, dashicon, and isPro flag.
 * Used with the PresetSelector component in inspector.js
 *
 * Usage:
 *   import { TESTIMONIAL_PRESETS } from '@Constants/presets/testimonial';
 */

export const TESTIMONIAL_PRESETS = [
    // ── Free Presets ──────────────────────────────────────
    {
        value: 'preset-classic',
        label: __('Classic', 'gslider-blocks'),
        icon: 'align-center',
        description: __('Centered layout with image on top', 'gslider-blocks'),
    },
    {
        value: 'preset-card-quote',
        label: __('Card Quote', 'gslider-blocks'),
        icon: 'format-quote',
        description: __('Card with decorative quote icon', 'gslider-blocks'),
    },
    {
        value: 'preset-minimal',
        label: __('Minimal', 'gslider-blocks'),
        icon: 'editor-alignleft',
        description: __('Clean minimal with large text', 'gslider-blocks'),
    },
    {
        value: 'preset-side-by-side',
        label: __('Side by Side', 'gslider-blocks'),
        icon: 'columns',
        description: __('Image left, content right', 'gslider-blocks'),
    },
    {
        value: 'preset-compact',
        label: __('Compact', 'gslider-blocks'),
        icon: 'grid-view',
        description: __('Compact card for multi-column carousel', 'gslider-blocks'),
    },

    // ── Pro Presets (Future) ─────────────────────────────
    // See: log/testimonial-deep-research.md for full Pro preset plan
    // Planned: bubble, social, fullbg, company, timeline, video, masonry
];
