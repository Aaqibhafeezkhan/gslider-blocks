import { listBlocks } from '../core/registry.js';

export const listBlocksToolDefinition = {
  name: 'list_gslider_blocks',
  description:
    'Lists all available GSlider Gutenberg blocks with their slugs, titles, categories, and supported features.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

/**
 * Handles the list_gslider_blocks MCP tool request.
 *
 * Returns raw blocks array directly without wrapper noise.
 */
export async function handleListBlocks() {
  const blocks = listBlocks();
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(blocks, null, 2),
      },
    ],
  };
}
