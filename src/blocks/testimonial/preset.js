import { __ } from '@wordpress/i18n';
import { DEFAULT_TESTIMONIAL_CONTENT_ORDER } from './content-order';

/**
 * Testimonial Block — Preset Styles Data Object
 *
 * Each preset defines attribute overrides that get applied via setAttributes()
 * when the preset is selected. Pattern follows Frontis Blocks approach.
 */
export const presetStyles = {
    "preset-classic": {
        contentOrder: [...DEFAULT_TESTIMONIAL_CONTENT_ORDER],
        showTestimonialTitle: true,
        showTestimonialText: true,
        showAuthorName: true,
        showAuthorDesignation: true,
        showAuthorImage: true,
        showRating: true,
        showQuoteIcon: false,
        contentAlignment: {
            Desktop: "center",
            Tablet: "center",
            Mobile: "center",
        },
        // Spacing
        contentPaddingDesktop: {
            top: "30",
            bottom: "30",
            left: "30",
            right: "30"
        },
        testimonialTitleDesktopMargin: {
            top: "0",
            bottom: "12",
            left: "0",
            right: "0"
        },
        testimonialTextDesktopMargin: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0"
        },
        authorNameDesktopMargin: {
            top: "8",
            bottom: "4",
            left: "0",
            right: "0"
        },
        authorDesignationDesktopMargin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        },
        authorImageDesktopMargin: {
            top: "12",
            bottom: "0",
            left: "0",
            right: "0"
        },
    },
};

/**
 * Testimonial Block Presets
 *
 * Each preset defines: value (CSS class), label, dashicon, attributes, and isPro flag.
 * Used with the PresetSelector component in inspector.js
 */
export const TESTIMONIAL_PRESETS = [
    // ── Presets ───────────────────────────────────────────
    {
        value: 'preset-classic',
        label: __('Classic', 'gslider-blocks'),
        icon: 'align-center',
        description: __('Centered layout with image on top', 'gslider-blocks'),
        isDefault: true,
        attributes: Object.entries(presetStyles['preset-classic']).map(([label, value]) => ({ label, value })),
    },

    // Planned later: bubble, social, fullbg, company, timeline, video, masonry
];
