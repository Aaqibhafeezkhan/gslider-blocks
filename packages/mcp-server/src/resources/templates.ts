/**
 * Curated GSlider Design Templates & Presets
 *
 * Exposes production-ready slider configurations matching real GSlider
 * block attributes and responsive `{ Desktop, Tablet, Mobile }` shapes.
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
    description: 'High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.',
    mimeType: 'application/json',
    blockSlug: 'image-slider',
    data: {
      blockType: 'image-slider',
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
    data: {
      blockType: 'image-slider',
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
    description: 'Two-column client review cards using preset-classic with 5-star ratings and reviewer details.',
    mimeType: 'application/json',
    blockSlug: 'testimonial',
    data: {
      blockType: 'testimonial',
      presetStyle: 'preset-classic',
      sliderItems: [
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
    description: 'Smooth scrolling logo carousel for trusted brands and client showcases.',
    mimeType: 'application/json',
    blockSlug: 'logo-carousel',
    data: {
      blockType: 'logo-carousel',
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
