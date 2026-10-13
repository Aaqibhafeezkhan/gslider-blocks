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

function loadRegistry(): Record<string, BlockDetail> {
  const url = new URL('./generated-registry.json', import.meta.url);
  return JSON.parse(fs.readFileSync(url, 'utf8'));
}

export const BLOCKS_REGISTRY: Record<string, BlockDetail> = loadRegistry();

/**
 * Returns a summary list of all registered GSlider blocks.
 */
export function listBlocks(): BlockSummary[] {
  return Object.values(BLOCKS_REGISTRY).map(
    ({
      slug,
      name,
      title,
      description,
      category,
      slideField,
      totalAttributes,
      presets,
      allowedEffects,
    }) => ({
      slug,
      name,
      title,
      description,
      category,
      slideField,
      totalAttributes,
      presets,
      allowedEffects,
    })
  );
}

/**
 * Returns the comprehensive schema, real defaults, and full attribute dictionary
 * for a given block slug directly from GSlider source definitions.
 */
export function getBlockSchema(slug: string): BlockDetail {
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
export function isValidBlockSlug(slug: string): boolean {
  return slug in BLOCKS_REGISTRY;
}
