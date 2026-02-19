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

    // ── Pro Presets ───────────────────────────────────────
    {
        value: 'preset-bubble',
        label: __('Bubble Chat', 'gslider-blocks'),
        icon: 'format-chat',
        description: __('Speech bubble with tail', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-social',
        label: __('Social Media', 'gslider-blocks'),
        icon: 'share',
        description: __('Twitter/Google review card style', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-fullbg',
        label: __('Full Background', 'gslider-blocks'),
        icon: 'cover-image',
        description: __('Text overlay on background image', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-company',
        label: __('Company', 'gslider-blocks'),
        icon: 'building',
        description: __('Logo and company focused B2B style', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-timeline',
        label: __('Timeline', 'gslider-blocks'),
        icon: 'clock',
        description: __('Vertical timeline with date badge', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-video',
        label: __('Video', 'gslider-blocks'),
        icon: 'video-alt3',
        description: __('Video testimonial with embed', 'gslider-blocks'),
        isPro: true,
    },
    {
        value: 'preset-masonry',
        label: __('Masonry', 'gslider-blocks'),
        icon: 'tagcloud',
        description: __('Pinterest-style staggered grid', 'gslider-blocks'),
        isPro: true,
    },
];
