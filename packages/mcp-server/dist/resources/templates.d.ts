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
export declare const SLIDER_TEMPLATES: SliderTemplate[];
/**
 * Lists all available slider templates for MCP resource discovery.
 */
export declare function listTemplates(): SliderTemplate[];
/**
 * Retrieves a specific slider template by its URI.
 * @param uri
 */
export declare function getTemplateByUri(uri: string): SliderTemplate | undefined;
//# sourceMappingURL=templates.d.ts.map