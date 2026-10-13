import { z } from 'zod';
import { getBlockSchema, BLOCKS_REGISTRY } from '../core/registry.js';
const validSlugs = Object.keys(BLOCKS_REGISTRY);
export const getBlockSchemaInputZod = z.object({
    blockSlug: z
        .enum(validSlugs)
        .describe('Slug of the GSlider block to inspect (e.g. image-slider, testimonial, logo-carousel, flexi-content, base)'),
});
export const getBlockSchemaToolDefinition = {
    name: 'get_block_schema',
    description: 'Retrieves the complete attribute schema, slide structure, default Swiper configuration, and allowed options for a specific GSlider block.',
    inputSchema: {
        type: 'object',
        properties: {
            blockSlug: {
                type: 'string',
                enum: validSlugs,
                description: 'Slug of the GSlider block (e.g. image-slider, testimonial, logo-carousel, flexi-content, base)',
            },
        },
        required: ['blockSlug'],
    },
};
/**
 * Handles the get_block_schema MCP tool request.
 */
export async function handleGetBlockSchema(args) {
    const parsed = getBlockSchemaInputZod.safeParse(args);
    if (!parsed.success) {
        const errorMsg = parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid arguments for get_block_schema: ${errorMsg}`);
    }
    const { blockSlug } = parsed.data;
    const schema = getBlockSchema(blockSlug);
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    status: 'success',
                    blockSlug,
                    schema,
                }, null, 2),
            },
        ],
    };
}
//# sourceMappingURL=get-schema.js.map