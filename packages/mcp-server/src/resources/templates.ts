/**
 * Curated GSlider Design Templates & Presets
 *
 * Exposes production-ready slider configurations matching real GSlider
 * block attributes and responsive `{ Desktop, Tablet, Mobile }` shapes.
 *
 * Every key in `data` is a real attribute of `gslider-blocks/<blockSlug>`.
 * `blockId` and `blockStyle` are left empty: the editor sets `blockId` to
 * `<blockIdPrefix>-` plus 8 characters and writes `blockStyle` from the
 * block's `styling.js`, so a template only renders fully after it is opened
 * and saved in the block editor.
 */

import { getBlockSchema } from '../core/registry.js';

export interface SliderTemplate {
  uri: string;
  name: string;
  description: string;
  mimeType: 'application/json';
  blockSlug: string;
  blockName: string;
  blockIdPrefix: string;
  data: Record<string, unknown>;
}

/**
 * Fills each slide with the block's first default slide item, so templates
 * carry the same per-slide fields the editor writes.
 */
function withDefaultSlideFields(
  slug: string,
  slides: Record<string, unknown>[]
): Record<string, unknown>[] {
  const schema = getBlockSchema(slug);
  const defaults = schema.attributes[schema.slideField]?.default;
  const base = Array.isArray(defaults) && defaults.length > 0 ? defaults[0] : {};
  return slides.map((slide) => ({ ...structuredClone(base), ...slide }));
}

export const SLIDER_TEMPLATES: SliderTemplate[] = [
  {
    uri: 'gslider://templates/hero-slider',
    name: 'Full-Width Hero Slider',
    description: 'High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.',
    mimeType: 'application/json',
    blockSlug: 'image-slider',
    blockName: 'gslider-blocks/image-slider',
    blockIdPrefix: 'gslider-image-slider',
    data: {
      blockId: '',
      blockStyle: '',
      images: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
          alt: 'Digital Transformation Banner',
          caption: 'Build Modern Digital Experiences',
          link: '#get-started',
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
          alt: 'Creative Architecture',
          caption: 'Design Without Limitations',
          link: '#explore',
        },
      ],
      carouselPerColumn: { Desktop: 1, Tablet: 1, Mobile: 1 },
      carouselPerColumnGap: { Desktop: 0, Tablet: 0, Mobile: 0 },
      carouselEffect: 'slide',
      speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
      autoplay: true,
      autoplayDelay: { Desktop: 4000, Tablet: 4000, Mobile: 4000 },
      infiniteLoop: true,
      showNavigation: { Desktop: true, Tablet: true, Mobile: true },
      showPagination: { Desktop: true, Tablet: true, Mobile: true },
      paginationType: 'bullets',
    },
  },

  {
    uri: 'gslider://templates/product-carousel',
    name: 'E-commerce Product Showcase Carousel',
    description: 'Responsive 3-column card carousel with space between items and navigation controls.',
    mimeType: 'application/json',
    blockSlug: 'image-slider',
    blockName: 'gslider-blocks/image-slider',
    blockIdPrefix: 'gslider-image-slider',
    data: {
      blockId: '',
      blockStyle: '',
      images: [
        {
          id: 11,
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          alt: 'Wireless Headphones',
          caption: 'Studio Headphones',
          link: '#shop',
        },
        {
          id: 12,
          url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
          alt: 'Minimalist Watch',
          caption: 'Chronograph Classic',
          link: '#shop',
        },
        {
          id: 13,
          url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
          alt: 'Smart Watch',
          caption: 'Smart Band Series',
          link: '#shop',
        },
      ],
      carouselPerColumn: { Desktop: 3, Tablet: 2, Mobile: 1 },
      carouselPerColumnGap: { Desktop: 20, Tablet: 15, Mobile: 10 },
      carouselEffect: 'slide',
      speed: { Desktop: 700, Tablet: 700, Mobile: 700 },
      autoplay: false,
      autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
      infiniteLoop: true,
      showNavigation: { Desktop: true, Tablet: true, Mobile: true },
      showPagination: { Desktop: true, Tablet: true, Mobile: false },
      paginationType: 'bullets',
    },
  },

  {
    uri: 'gslider://templates/testimonial-cards',
    name: 'Social Proof Testimonial Cards',
    description: 'Two-column client review cards with 5-star ratings and reviewer details.',
    mimeType: 'application/json',
    blockSlug: 'testimonial',
    blockName: 'gslider-blocks/testimonial',
    blockIdPrefix: 'gslider',
    data: {
      blockId: '',
      blockStyle: '',
      sliderItems: withDefaultSlideFields('testimonial', [
        {
          id: 'item-1',
          testimonialTitle: 'Game changer for our agency',
          testimonialText: 'We migrated 40 client sites to GSlider. The responsive controls and dynamic styling save us hours every sprint.',
          authorName: 'Marcus Vance',
          authorDesignation: 'CTO, Vertex Media',
          authorImage: {
            url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            id: '',
            alt: 'Marcus Vance',
          },
          ratingNumber: 5,
        },
        {
          id: 'item-2',
          testimonialTitle: 'Flawless headless integration',
          testimonialText: 'Our Next.js frontend fetches the pre-parsed Swiper settings directly. Zero runtime CSS calculation needed!',
          authorName: 'Elena Rostova',
          authorDesignation: 'Lead Frontend Architect',
          authorImage: {
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
            id: '',
            alt: 'Elena Rostova',
          },
          ratingNumber: 5,
        },
      ]),
      sliderType: 'carousel',
      carouselPerColumn: { Desktop: 2, Tablet: 2, Mobile: 1 },
      carouselPerColumnGap: { Desktop: 20, Tablet: 20, Mobile: 0 },
      carouselEffect: 'slide',
      speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
      autoplay: false,
      autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
      infiniteLoop: true,
      showNavigation: { Desktop: true, Tablet: true, Mobile: true },
      showPagination: { Desktop: true, Tablet: true, Mobile: true },
      paginationType: 'bullets',
    },
  },

  {
    uri: 'gslider://templates/brand-logos',
    name: 'Partner Brand Logo Carousel',
    description: 'Two-column logo carousel for trusted brands and client showcases, with autoplay off.',
    mimeType: 'application/json',
    blockSlug: 'logo-carousel',
    blockName: 'gslider-blocks/logo-carousel',
    blockIdPrefix: 'gslider-logo-carousel',
    data: {
      blockId: '',
      blockStyle: '',
      logos: [
        { id: 101, url: 'https://dummyimage.com/200x80/222/fff.png&text=Google', alt: 'Google', link: '#' },
        { id: 102, url: 'https://dummyimage.com/200x80/222/fff.png&text=Stripe', alt: 'Stripe', link: '#' },
        { id: 103, url: 'https://dummyimage.com/200x80/222/fff.png&text=Vercel', alt: 'Vercel', link: '#' },
        { id: 104, url: 'https://dummyimage.com/200x80/222/fff.png&text=Automattic', alt: 'Automattic', link: '#' },
      ],
      carouselPerColumn: { Desktop: 2, Tablet: 2, Mobile: 1 },
      carouselPerColumnGap: { Desktop: 10, Tablet: 10, Mobile: 10 },
      carouselEffect: 'slide',
      speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
      autoplay: false,
      autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
      infiniteLoop: true,
      showNavigation: { Desktop: true, Tablet: true, Mobile: true },
      showPagination: { Desktop: false, Tablet: false, Mobile: false },
    },
  },

  {
    uri: 'gslider://templates/content-hero',
    name: 'Content Hero Slider',
    description: 'Single-column content slider with titles, descriptions, and call-to-action buttons, using a fade transition and autoplay.',
    mimeType: 'application/json',
    blockSlug: 'base',
    blockName: 'gslider-blocks/base',
    blockIdPrefix: 'gslider',
    data: {
      blockId: '',
      blockStyle: '',
      sliderItems: withDefaultSlideFields('base', [
        {
          id: 'item-1',
          subTitle: 'New Release',
          title: 'Launch Faster With GSlider',
          description: 'Build responsive sliders in the block editor without writing code.',
          primaryButtonText: 'Get Started',
          primaryButtonLink: '#get-started',
        },
        {
          id: 'item-2',
          subTitle: 'Headless Ready',
          title: 'Ship To Any Frontend',
          description: 'Read pre-parsed Swiper settings and styles from the REST API.',
          primaryButtonText: 'Read The Docs',
          primaryButtonLink: '#docs',
        },
      ]),
      sliderType: 'slider',
      slideEffect: 'fade',
      speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
      autoplay: true,
      autoplayDelay: { Desktop: 5000, Tablet: 5000, Mobile: 5000 },
      infiniteLoop: true,
      showNavigation: { Desktop: true, Tablet: true, Mobile: false },
      showPagination: { Desktop: true, Tablet: true, Mobile: true },
      paginationType: 'bullets',
    },
  },
];

/**
 * Lists all available slider templates for MCP resource discovery.
 */
export function listTemplates(): SliderTemplate[] {
  return SLIDER_TEMPLATES;
}

/**
 * Retrieves a specific slider template by its URI.
 */
export function getTemplateByUri(uri: string): SliderTemplate | undefined {
  return SLIDER_TEMPLATES.find((tpl) => tpl.uri === uri);
}
