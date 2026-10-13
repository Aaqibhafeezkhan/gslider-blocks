import { z } from 'zod';
export declare const getBlockSchemaInputZod: z.ZodObject<{
    blockSlug: z.ZodEnum<[string, ...string[]]>;
}, "strip", z.ZodTypeAny, {
    blockSlug: string;
}, {
    blockSlug: string;
}>;
export declare const getBlockSchemaToolDefinition: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            blockSlug: {
                type: string;
                enum: [string, ...string[]];
                description: string;
            };
        };
        required: string[];
    };
};
/**
 * Handles the get_block_schema MCP tool request.
 */
export declare function handleGetBlockSchema(args: unknown): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=get-schema.d.ts.map