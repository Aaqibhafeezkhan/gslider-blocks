#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const SERVER_NAME = 'gslider-mcp-server';
const SERVER_VERSION = '1.0.0';

/**
 * Main entry point for the GSlider Model Context Protocol (MCP) server.
 *
 * Runs locally via stdio transport to provide AI assistants (Claude, Cursor, Antigravity)
 * with direct capabilities to list, inspect, and generate GSlider blocks with zero cloud cost.
 */
async function main(): Promise<void> {
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

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
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'gslider_ping') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'ok',
                server: SERVER_NAME,
                version: SERVER_VERSION,
                timestamp: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Diagnostic output MUST go to stderr.
  // Standard output (stdout) is reserved strictly for JSON-RPC MCP messages.
  console.error(`[gslider-mcp] ${SERVER_NAME} v${SERVER_VERSION} initialized on stdio`);
}

main().catch((error: unknown) => {
  console.error('[gslider-mcp] Fatal error:', error);
  process.exit(1);
});
