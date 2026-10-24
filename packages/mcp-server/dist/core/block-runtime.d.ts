import { type BlockDetail } from './registry.js';
export interface BundledBlock {
    meta: {
        name: string;
        title?: string;
        [key: string]: unknown;
    };
    attributes: Record<string, {
        type?: string;
        default?: unknown;
    }>;
    save: (props: {
        attributes: Record<string, unknown>;
    }) => unknown;
    styling: (attributes: Record<string, unknown>) => string;
    deprecated: unknown[];
}
interface BlocksApi {
    registerBlockType: (name: string, settings: Record<string, unknown>) => unknown;
    createBlock: (name: string, attributes: Record<string, unknown>, innerBlocks?: unknown[]) => {
        innerBlocks?: unknown[];
    };
    serialize: (blocks: unknown[]) => string;
    parse: (markup: string) => Array<{
        name: string;
        attributes: Record<string, unknown>;
        innerBlocks?: unknown[];
    }>;
    validateBlock: (block: unknown) => unknown;
}
/**
 * @wordpress/block-editor reads `window` as soon as it loads. The block
 * bundles require it, so the window has to exist before the first require.
 */
export declare function ensureDom(): void;
export declare function loadBundledBlock(slug: string): BundledBlock;
export declare function attributeDefaults(attributes: BundledBlock['attributes']): Record<string, unknown>;
/**
 * Registers the core blocks a Flexi slide may contain, using the save
 * functions bundled from @wordpress/block-library. Only those saves are
 * loaded, so the server does not start the whole block library.
 */
export declare function registerCoreBlocksOnce(): void;
export declare function wordpressBlocks(): BlocksApi;
/**
 * Registers the block with its real attributes, save, and deprecated, once.
 * @param slug
 */
export declare function prepareBlock(slug: string): {
    blocks: BlocksApi;
    bundled: BundledBlock;
    schema: BlockDetail;
};
export declare function validationOf(raw: unknown): {
    isValid: boolean;
    issues: unknown[];
};
export {};
//# sourceMappingURL=block-runtime.d.ts.map