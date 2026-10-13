export declare const listBlocksToolDefinition: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {};
    };
};
/**
 * Handles the list_gslider_blocks MCP tool request.
 */
export declare function handleListBlocks(): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=list-blocks.d.ts.map