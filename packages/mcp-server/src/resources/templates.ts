/**
 * Curated GSlider Design Templates & Presets
 *
 * Exposes production-ready slider configurations as read-only MCP resources
 * so AI agents can inspect and reuse proven layout patterns.
 */

export interface SliderTemplate {
  uri: string;
  name: string;
  description: string;
  mimeType: 'application/json';
  blockSlug: string;
  data: Record<string, unknown>;
}

export const SLIDER_TEMPLATES: SliderTemplate[] = [
  {
    uri: 'gslider://templates/hero-slider',
    name: 'Full-Width Hero Slider',
    description: 'High-impact full-width slider with fade transitions, auto-play, navigation arrows, and bullet pagination.',
    mimeType: 'application/json',
    blockSlug: 'image-slider',
    data: {
      blockType: 'image-slider',
      slides: [
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
      layout: {
        columns: { Desktop: 1, Tablet: 1, Mobile: 1 },
        gap: { Desktop: 0, Tablet: 0, Mobile: 0 },
        speed: 900,
        autoplay: true,
        autoplayDelay: 4500,
        effect: 'fade',
        navigation: true,
        pagination: true,
        infiniteLoop: true,
      },
    },
  },

  {
    uri: 'gslider://templates/product-carousel',
    name: 'E-commerce Product Showcase Carousel',
    description: 'Responsive 3-column card carousel with smooth sliding and hover pause.',
    mimeType: 'application/json',
    blockSlug: 'image-slider',
    data: {
      blockType: 'image-slider',
      slides: [
        {
          id: 11,
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          alt: 'Wireless Headphones',
          caption: 'Studio Headphones - $299',
          link: '#shop',
        },
        {
          id: 12,
          url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
          alt: 'Minimalist Watch',
          caption: 'Chronograph Classic - $189',
          link: '#shop',
        },
        {
          id: 13,
          url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
          alt: 'Smart Watch',
          caption: 'Smart Band Series - $149',
          link: '#shop',
        },
      ],
      layout: {
        columns: { Desktop: 3, Tablet: 2, Mobile: 1 },
        gap: { Desktop: 24, Tablet: 16, Mobile: 12 },
        speed: 700,
        autoplay: false,
        effect: 'slide',
        navigation: true,
        pagination: true,
        infiniteLoop: true,
      },
    },
  },

  {
    uri: 'gslider://templates/testimonial-cards',
    name: 'Social Proof Testimonial Cards',
    description: 'Two-column client review cards with 5-star ratings, reviewer designations, and avatar photos.',
    mimeType: 'application/json',
    blockSlug: 'testimonial',
    data: {
      blockType: 'testimonial',
      presetStyle: 'preset-card',
      slides: [
        {
          id: 'item-1',
          testimonialTitle: 'Game changer for our agency',
          testimonialText: 'We migrated 40 client sites to GSlider. The responsive controls and dynamic styling save us hours every sprint.',
          authorName: 'Marcus Vance',
          authorDesignation: 'CTO, Vertex Media',
          authorImage: {
            url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
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
            alt: 'Elena Rostova',
          },
          ratingNumber: 5,
        },
      ],
      layout: {
        columns: { Desktop: 2, Tablet: 2, Mobile: 1 },
        gap: { Desktop: 24, Tablet: 16, Mobile: 12 },
        speed: 800,
        autoplay: false,
        effect: 'slide',
        navigation: true,
        pagination: true,
        infiniteLoop: true,
      },
    },
  },

  {
    uri: 'gslider://templates/brand-logos',
    name: 'Continuous Brand Logo Ticker',
    description: 'Seamless continuous scrolling logo carousel for trusted brands and client showcases.',
    mimeType: 'application/json',
    blockSlug: 'logo-carousel',
    data: {
      blockType: 'logo-carousel',
      slides: [
        { id: 101, url: 'https://dummyimage.com/200x80/222/fff.png&text=Google', alt: 'Google' },
        { id: 102, url: 'https://dummyimage.com/200x80/222/fff.png&text=Stripe', alt: 'Stripe' },
        { id: 103, url: 'https://dummyimage.com/200x80/222/fff.png&text=Vercel', alt: 'Vercel' },
        { id: 104, url: 'https://dummyimage.com/200x80/222/fff.png&text=Automattic', alt: 'Automattic' },
        { id: 105, url: 'https://dummyimage.com/200x80/222/fff.png&text=GitHub', alt: 'GitHub' },
      ],
      layout: {
        columns: { Desktop: 5, Tablet: 3, Mobile: 2 },
        gap: { Desktop: 32, Tablet: 20, Mobile: 16 },
        speed: 600,
        autoplay: true,
        autoplayDelay: 2000,
        effect: 'slide',
        navigation: false,
        pagination: false,
        infiniteLoop: true,
      },
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
