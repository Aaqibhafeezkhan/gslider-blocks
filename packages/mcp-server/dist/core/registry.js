/**
 * GSlider Blocks Schema Registry
 *
 * Single Source of Truth (SSoT) defining the metadata, slide structures,
 * Swiper controls, and attribute schemas for all GSlider blocks.
 *
 * Prevents AI hallucinations by providing strict types and allowed options.
 */
export const BLOCKS_REGISTRY = {
    'image-slider': {
        slug: 'image-slider',
        name: 'gslider-blocks/image-slider',
        title: 'Image Slider',
        description: 'Versatile image slider with captions, lightbox, and interactive responsive effects.',
        category: 'gslider-blocks',
        slideField: 'images',
        supportedFeatures: [
            'responsive-columns',
            'responsive-gap',
            'speed',
            'autoplay',
            'infinite-loop',
            'touch-swipe',
            'keyboard-nav',
            'mousewheel',
            'lightbox-fslightbox',
            'custom-css',
        ],
        supportedEffects: ['slide', 'fade', 'cube', 'coverflow', 'flip', 'creative', 'cards'],
        defaultSwiperConfig: {
            columns: { Desktop: 1, Tablet: 1, Mobile: 1 },
            gap: { Desktop: 0, Tablet: 0, Mobile: 0 },
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            effect: 'slide',
        },
        slideItemSchema: {
            type: 'object',
            properties: {
                id: { type: 'number', description: 'WordPress media attachment ID' },
                url: { type: 'string', format: 'uri', description: 'Image asset URL' },
                alt: { type: 'string', description: 'Image alternative text for accessibility' },
                link: { type: 'string', format: 'uri', description: 'Target hyperlink URL when slide is clicked' },
                caption: { type: 'string', description: 'Caption overlay text displayed on slide' },
                tooltipText: { type: 'string', description: 'Tooltip text on hover' },
            },
            required: ['url'],
        },
        sampleSlide: {
            id: 101,
            url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
            alt: 'Artistic landscape banner',
            caption: 'Explore Our New Collection',
            link: '#',
        },
    },
    'testimonial': {
        slug: 'testimonial',
        name: 'gslider-blocks/testimonial',
        title: 'Testimonial Slider',
        description: 'Display customer reviews and social proof in slider, carousel, or grid layout with star ratings.',
        category: 'gslider-blocks',
        slideField: 'sliderItems',
        supportedFeatures: [
            'star-ratings',
            'author-images',
            'preset-styles',
            'responsive-columns',
            'responsive-gap',
            'speed',
            'autoplay',
            'infinite-loop',
            'custom-css',
        ],
        supportedEffects: ['slide', 'fade', 'cube', 'coverflow', 'flip'],
        presets: ['preset-classic', 'preset-modern', 'preset-bubble', 'preset-card'],
        defaultSwiperConfig: {
            columns: { Desktop: 2, Tablet: 2, Mobile: 1 },
            gap: { Desktop: 20, Tablet: 20, Mobile: 10 },
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 3000, Tablet: 3000, Mobile: 3000 },
            infiniteLoop: true,
            effect: 'slide',
        },
        slideItemSchema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Unique slide item ID (e.g. item-1)' },
                testimonialTitle: { type: 'string', description: 'Headline of the testimonial review' },
                testimonialText: { type: 'string', description: 'Full body content of customer feedback' },
                authorName: { type: 'string', description: 'Name of the reviewer' },
                authorDesignation: { type: 'string', description: 'Role and company of the reviewer' },
                authorImage: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', format: 'uri' },
                        alt: { type: 'string' },
                    },
                },
                ratingNumber: {
                    type: 'number',
                    minimum: 1,
                    maximum: 5,
                    description: 'Rating out of 5 stars',
                },
            },
            required: ['authorName', 'testimonialText'],
        },
        sampleSlide: {
            id: 'item-1',
            testimonialTitle: 'Incredible Performance',
            testimonialText: 'GSlider made our hero section twice as fast and visually stunning. Highly recommend!',
            authorName: 'Sarah Jenkins',
            authorDesignation: 'Lead Designer at StudioPulse',
            authorImage: {
                url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
                alt: 'Sarah Jenkins profile photo',
            },
            ratingNumber: 5,
        },
    },
    'logo-carousel': {
        slug: 'logo-carousel',
        name: 'gslider-blocks/logo-carousel',
        title: 'Logo Carousel',
        description: 'Scrollable carousel for client and partner logos with continuous ticker animation and grayscale hover.',
        category: 'gslider-blocks',
        slideField: 'logos',
        supportedFeatures: [
            'continuous-ticker',
            'grayscale-hover',
            'clickable-partner-links',
            'responsive-columns',
            'speed',
            'autoplay',
            'infinite-loop',
            'custom-css',
        ],
        supportedEffects: ['slide', 'fade'],
        defaultSwiperConfig: {
            columns: { Desktop: 4, Tablet: 3, Mobile: 2 },
            gap: { Desktop: 30, Tablet: 20, Mobile: 15 },
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: true,
            autoplayDelay: { Desktop: 2000, Tablet: 2000, Mobile: 2000 },
            infiniteLoop: true,
            effect: 'slide',
        },
        slideItemSchema: {
            type: 'object',
            properties: {
                id: { type: 'number', description: 'WordPress media ID' },
                url: { type: 'string', format: 'uri', description: 'Brand/client logo image URL' },
                alt: { type: 'string', description: 'Brand name / alt text' },
                link: { type: 'string', format: 'uri', description: 'Partner website link' },
            },
            required: ['url'],
        },
        sampleSlide: {
            id: 201,
            url: 'https://dummyimage.com/200x80/222/fff.png&text=Acme+Corp',
            alt: 'Acme Corp Partner Logo',
            link: 'https://example.com',
        },
    },
    'flexi-content': {
        slug: 'flexi-content',
        name: 'gslider-blocks/flexi-content',
        title: 'Flexi Content Slider',
        description: 'Display any Gutenberg blocks seamlessly in slide or carousel modes using inner block containers.',
        category: 'gslider-blocks',
        slideField: 'innerBlocks',
        supportedFeatures: [
            'nested-inner-blocks',
            'custom-layout',
            'responsive-columns',
            'speed',
            'autoplay',
            'infinite-loop',
            'custom-css',
        ],
        supportedEffects: ['slide', 'fade', 'cube', 'coverflow', 'flip'],
        defaultSwiperConfig: {
            columns: { Desktop: 2, Tablet: 2, Mobile: 1 },
            gap: { Desktop: 20, Tablet: 20, Mobile: 0 },
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            effect: 'slide',
        },
        slideItemSchema: {
            type: 'object',
            description: 'Inner block container structure (gslider-blocks/flexi-content-item)',
            properties: {
                blockName: { type: 'string', enum: ['gslider-blocks/flexi-content-item'] },
                innerBlocks: { type: 'array', description: 'Child Gutenberg blocks (headings, paragraphs, buttons, images)' },
            },
        },
        sampleSlide: {
            blockName: 'gslider-blocks/flexi-content-item',
            innerBlocks: [],
        },
    },
    'base': {
        slug: 'base',
        name: 'gslider-blocks/base',
        title: 'Base Slider',
        description: 'Lightweight foundation slider for standard carousels.',
        category: 'gslider-blocks',
        slideField: 'images',
        supportedFeatures: ['responsive-columns', 'speed', 'autoplay', 'infinite-loop'],
        supportedEffects: ['slide', 'fade'],
        defaultSwiperConfig: {
            columns: { Desktop: 1, Tablet: 1, Mobile: 1 },
            gap: { Desktop: 0, Tablet: 0, Mobile: 0 },
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            effect: 'slide',
        },
        slideItemSchema: {
            type: 'object',
            properties: {
                url: { type: 'string', format: 'uri' },
            },
            required: ['url'],
        },
        sampleSlide: {
            url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200',
        },
    },
};
/**
 * Returns a summary list of all registered GSlider blocks.
 */
export function listBlocks() {
    return Object.values(BLOCKS_REGISTRY).map(({ slug, name, title, description, category, slideField, supportedFeatures }) => ({
        slug,
        name,
        title,
        description,
        category,
        slideField,
        supportedFeatures,
    }));
}
/**
 * Returns the comprehensive schema and default settings for a given block slug.
 */
export function getBlockSchema(slug) {
    const block = BLOCKS_REGISTRY[slug];
    if (!block) {
        const validSlugs = Object.keys(BLOCKS_REGISTRY).join(', ');
        throw new Error(`Unknown block slug: "${slug}". Valid block slugs are: ${validSlugs}`);
    }
    return block;
}
/**
 * Checks whether a given slug is a valid GSlider block.
 */
export function isValidBlockSlug(slug) {
    return slug in BLOCKS_REGISTRY;
}
//# sourceMappingURL=registry.js.map