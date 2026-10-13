/**
 * GSlider Blocks Schema Registry
 *
 * Single Source of Truth (SSoT) defining the metadata, slide structures,
 * Swiper controls, and attribute schemas for all GSlider blocks.
 *
 * Prevents AI hallucinations by providing strict types and allowed options.
 */
export interface ResponsiveValue<T> {
    Desktop: T;
    Tablet: T;
    Mobile: T;
}
export interface BlockSummary {
    slug: string;
    name: string;
    title: string;
    description: string;
    category: string;
    slideField: string;
    supportedFeatures: string[];
}
export interface BlockDetail extends BlockSummary {
    supportedEffects: string[];
    presets?: string[];
    slideItemSchema: Record<string, unknown>;
    defaultSwiperConfig: {
        columns: ResponsiveValue<number>;
        gap: ResponsiveValue<number>;
        speed: ResponsiveValue<number>;
        autoplay: boolean;
        autoplayDelay: ResponsiveValue<number>;
        infiniteLoop: boolean;
        effect: string;
    };
    sampleSlide: Record<string, unknown>;
}
export declare const BLOCKS_REGISTRY: Record<string, BlockDetail>;
/**
 * Returns a summary list of all registered GSlider blocks.
 */
export declare function listBlocks(): BlockSummary[];
/**
 * Returns the comprehensive schema and default settings for a given block slug.
 */
export declare function getBlockSchema(slug: string): BlockDetail;
/**
 * Checks whether a given slug is a valid GSlider block.
 */
export declare function isValidBlockSlug(slug: string): boolean;
//# sourceMappingURL=registry.d.ts.map