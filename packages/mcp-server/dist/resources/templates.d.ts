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
export declare const SLIDER_TEMPLATES: SliderTemplate[];
/**
 * Lists all available slider templates for MCP resource discovery.
 */
export declare function listTemplates(): SliderTemplate[];
/**
 * Retrieves a specific slider template by its URI.
 */
export declare function getTemplateByUri(uri: string): SliderTemplate | undefined;
//# sourceMappingURL=templates.d.ts.map