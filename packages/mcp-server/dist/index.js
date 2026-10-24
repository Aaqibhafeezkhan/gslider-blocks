#!/usr/bin/env node
/* eslint-disable no-console */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { listBlocksToolDefinition, handleListBlocks, } from './tools/list-blocks.js';
import { getBlockSchemaToolDefinition, handleGetBlockSchema, } from './tools/get-schema.js';
import { generateBlockToolDefinition, handleGenerateBlock, } from './tools/generate-block.js';
import { validateBlockToolDefinition, handleValidateBlock, } from './tools/validate-block.js';
import { listTemplates, getTemplateByUri } from './resources/templates.js';
const SERVER_NAME = 'gslider-mcp-server';
const SERVER_VERSION = '1.0.0';
/**
 * Main entry point for the GSlider Model Context Protocol (MCP) server.
 *
 * Runs locally via stdio transport to provide AI assistants (Claude, Cursor, Antigravity)
 * with direct capabilities to list, inspect, and generate GSlider blocks with zero cloud cost.
 */
async function main() {
    const server = new Server({
        name: SERVER_NAME,
        version: SERVER_VERSION,
    }, {
        capabilities: {
            tools: {},
            resources: {},
        },
    });
    // 1. Tool Listing
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: 'gslider_ping',
                    description: 'Health check tool to verify GSlider MCP server connection and version.',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                    },
                },
                listBlocksToolDefinition,
                getBlockSchemaToolDefinition,
                generateBlockToolDefinition,
                validateBlockToolDefinition,
            ],
        };
    });
    // 2. Tool Execution
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        if (name === 'gslider_ping') {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            status: 'ok',
                            server: SERVER_NAME,
                            version: SERVER_VERSION,
                            timestamp: new Date().toISOString(),
                        }, null, 2),
                    },
                ],
            };
        }
        if (name === 'gslider_list_blocks' ||
            name === 'list_gslider_blocks') {
            return await handleListBlocks();
        }
        if (name === 'gslider_get_block_schema' ||
            name === 'get_block_schema') {
            return await handleGetBlockSchema(args);
        }
        if (name === 'gslider_generate_block') {
            return await handleGenerateBlock(args);
        }
        if (name === 'gslider_validate_block') {
            return await handleValidateBlock(args);
        }
        throw new Error(`Unknown tool: ${name}`);
    });
    // 3. Resource Listing
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        const templates = listTemplates();
        return {
            resources: templates.map((tpl) => ({
                uri: tpl.uri,
                name: tpl.name,
                description: tpl.description,
                mimeType: tpl.mimeType,
            })),
        };
    });
    // 4. Resource Reading
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const { uri } = request.params;
        const template = getTemplateByUri(uri);
        if (!template) {
            throw new Error(`Resource not found for URI: ${uri}`);
        }
        return {
            contents: [
                {
                    uri: template.uri,
                    mimeType: template.mimeType,
                    text: JSON.stringify(template.data, null, 2),
                },
            ],
        };
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Diagnostic output MUST go to stderr.
    // Standard output (stdout) is reserved strictly for JSON-RPC MCP messages.
    console.error(`[gslider-mcp] ${SERVER_NAME} v${SERVER_VERSION} initialized on stdio`);
}
main().catch((error) => {
    console.error('[gslider-mcp] Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map