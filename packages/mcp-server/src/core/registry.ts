import fs from 'fs';

export interface BlockSummary {
  slug: string;
  name: string;
  title: string;
  description: string;
  category: string;
  slideField: string;
  totalAttributes: number;
  presets: string[];
  allowedEffects: {
    carouselEffect: string[];
    slideEffect?: string[];
    sliderType?: string[];
  };
}

export interface BlockDetail extends BlockSummary {
  slideItemSchema: Record<string, unknown>;
  attributes: Record<
    string,
    {
      type: string;
      default?: unknown;
      items?: Record<string, unknown>;
      properties?: Record<string, unknown>;
    }
  >;
}

export const SUPPORTED_BLOCK_SLUGS = [
  'image-slider',
  'testimonial',
  'logo-carousel',
  'flexi-content',
  'base',
] as const;

export type SupportedBlockSlug = (typeof SUPPORTED_BLOCK_SLUGS)[number];

function loadBlockSchema(slug: string): BlockDetail {
  const url = new URL(`./schemas/${slug}.json`, import.meta.url);
  if (!fs.existsSync(url)) {
    const validSlugs = SUPPORTED_BLOCK_SLUGS.join(', ');
    throw new Error(`Unknown block slug: "${slug}". Valid block slugs are: ${validSlugs}`);
  }
  return JSON.parse(fs.readFileSync(url, 'utf8'));
}

/**
 * Returns a summary list of all registered GSlider blocks.
 */
export function listBlocks(): BlockSummary[] {
  return SUPPORTED_BLOCK_SLUGS.map((slug) => {
    const block = loadBlockSchema(slug);
    return {
      slug: block.slug,
      name: block.name,
      title: block.title,
      description: block.description,
      category: block.category,
      slideField: block.slideField,
      totalAttributes: block.totalAttributes,
      presets: block.presets,
      allowedEffects: block.allowedEffects,
    };
  });
}

/**
 * Returns the comprehensive schema, real defaults, and full attribute dictionary
 * for a specific block slug loaded directly from its dedicated schema file.
 */
export function getBlockSchema(slug: string): BlockDetail {
  return loadBlockSchema(slug);
}

/**
 * Checks whether a given slug is a valid GSlider block.
 */
export function isValidBlockSlug(slug: string): boolean {
  return (SUPPORTED_BLOCK_SLUGS as readonly string[]).includes(slug);
}
