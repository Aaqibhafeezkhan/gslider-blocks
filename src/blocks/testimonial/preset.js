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
    "preset-card-quote": {
        contentOrder: [...DEFAULT_TESTIMONIAL_CONTENT_ORDER],
        showTestimonialTitle: true,
        showTestimonialText: true,
        showAuthorName: true,
        showAuthorDesignation: true,
        showAuthorImage: true,
        showRating: true,
        showQuoteIcon: true,
        contentAlignment: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
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
            top: "0",
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
            top: "0",
            bottom: "0",
            left: "0",
            right: "12"
        },
    },
    "preset-minimal": {
        contentOrder: [...DEFAULT_TESTIMONIAL_CONTENT_ORDER],
        showTestimonialTitle: false,
        showTestimonialText: true,
        showAuthorName: true,
        showAuthorDesignation: true,
        showAuthorImage: false,
        showRating: true,
        showQuoteIcon: true,
        contentAlignment: {
            Desktop: "center",
            Tablet: "center",
            Mobile: "center",
        },
        contentWidth: {
            Desktop: "68",
            Tablet: "80",
            Mobile: "92",
        },
        quoteIconSize: {
            Desktop: "52",
            Tablet: "46",
            Mobile: "40",
        },
        quoteIconOpacity: {
            Desktop: "0.14",
            Tablet: "0.14",
            Mobile: "0.18",
        },
        quoteIconDesktopMargin: {
            top: "0",
            bottom: "12",
            left: "0",
            right: "0"
        },
        quoteIconTabletMargin: {
            top: "0",
            bottom: "10",
            left: "0",
            right: "0"
        },
        quoteIconMobileMargin: {
            top: "0",
            bottom: "8",
            left: "0",
            right: "0"
        },
        // Spacing
        contentPaddingDesktop: {
            top: "44",
            bottom: "44",
            left: "28",
            right: "28"
        },
        contentPaddingTablet: {
            top: "32",
            bottom: "32",
            left: "24",
            right: "24"
        },
        contentPaddingMobile: {
            top: "24",
            bottom: "24",
            left: "16",
            right: "16"
        },
        testimonialTextDesktopMargin: {
            top: "0",
            bottom: "20",
            left: "0",
            right: "0"
        },
        testimonialTextTabletMargin: {
            top: "0",
            bottom: "18",
            left: "0",
            right: "0"
        },
        testimonialTextMobileMargin: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0"
        },
        authorNameDesktopMargin: {
            top: "6",
            bottom: "2",
            left: "0",
            right: "0"
        },
        authorNameTabletMargin: {
            top: "4",
            bottom: "2",
            left: "0",
            right: "0"
        },
        authorNameMobileMargin: {
            top: "4",
            bottom: "2",
            left: "0",
            right: "0"
        },
        authorDesignationDesktopMargin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        },
        authorDesignationTabletMargin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        },
        authorDesignationMobileMargin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        },
    },
    "preset-side-by-side": {
        contentOrder: [...DEFAULT_TESTIMONIAL_CONTENT_ORDER],
        showTestimonialTitle: true,
        showTestimonialText: true,
        showAuthorName: true,
        showAuthorDesignation: true,
        showAuthorImage: true,
        showRating: true,
        showQuoteIcon: false,
        contentAlignment: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
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
            top: "0",
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
            top: "0",
            bottom: "0",
            left: "0",
            right: "20"
        },
    },
    "preset-compact": {
        contentOrder: ['quote', 'rating', 'content', 'author'],
        showTestimonialTitle: false,
        showTestimonialText: true,
        showAuthorName: true,
        showAuthorDesignation: true,
        showAuthorImage: true,
        showRating: true,
        showQuoteIcon: false,
        contentAlignment: {
            Desktop: "left",
            Tablet: "left",
            Mobile: "left",
        },
        // Spacing
        contentPaddingDesktop: {
            top: "20",
            bottom: "20",
            left: "20",
            right: "20"
        },
        testimonialTextDesktopMargin: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0"
        },
        authorNameDesktopMargin: {
            top: "0",
            bottom: "2",
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
            top: "0",
            bottom: "0",
            left: "0",
            right: "12"
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
    // ── Free Presets ──────────────────────────────────────
    {
        value: 'preset-classic',
        label: __('Classic', 'gslider-blocks'),
        icon: 'align-center',
        description: __('Centered layout with image on top', 'gslider-blocks'),
        isDefault: true,
        attributes: Object.entries(presetStyles['preset-classic']).map(([label, value]) => ({ label, value })),
    },
    {
        value: 'preset-card-quote',
        label: __('Card Quote', 'gslider-blocks'),
        icon: 'format-quote',
        description: __('Card with decorative quote icon', 'gslider-blocks'),
        attributes: Object.entries(presetStyles['preset-card-quote']).map(([label, value]) => ({ label, value })),
    },
    {
        value: 'preset-minimal',
        label: __('Minimal', 'gslider-blocks'),
        icon: 'editor-alignleft',
        description: __('Clean minimal with large text', 'gslider-blocks'),
        attributes: Object.entries(presetStyles['preset-minimal']).map(([label, value]) => ({ label, value })),
    },
    {
        value: 'preset-side-by-side',
        label: __('Side by Side', 'gslider-blocks'),
        icon: 'columns',
        description: __('Image left, content right', 'gslider-blocks'),
        attributes: Object.entries(presetStyles['preset-side-by-side']).map(([label, value]) => ({ label, value })),
    },
    {
        value: 'preset-compact',
        label: __('Compact', 'gslider-blocks'),
        icon: 'grid-view',
        description: __('Compact card for multi-column carousel', 'gslider-blocks'),
        attributes: Object.entries(presetStyles['preset-compact']).map(([label, value]) => ({ label, value })),
    },

    // ── Pro Presets (Future) ─────────────────────────────
    // See: log/testimonial-deep-research.md for full Pro preset plan
    // Planned: bubble, social, fullbg, company, timeline, video, masonry
];
