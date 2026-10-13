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
    attributes: Record<string, {
        type: string;
        default?: unknown;
        items?: Record<string, unknown>;
        properties?: Record<string, unknown>;
    }>;
}
export declare const BLOCKS_REGISTRY: Record<string, BlockDetail>;
/**
 * Returns a summary list of all registered GSlider blocks.
 */
export declare function listBlocks(): BlockSummary[];
/**
 * Returns the comprehensive schema, real defaults, and full attribute dictionary
 * for a given block slug directly from GSlider source definitions.
 */
export declare function getBlockSchema(slug: string): BlockDetail;
/**
 * Checks whether a given slug is a valid GSlider block.
 */
export declare function isValidBlockSlug(slug: string): boolean;
//# sourceMappingURL=registry.d.ts.map