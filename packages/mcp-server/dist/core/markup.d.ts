/**
 * Reads the attribute JSON out of the first block comment.
 * Gutenberg's parser fills in defaults, so the comment itself is the list of
 * attributes that were actually stored.
 * @param markup
 */
export declare function commentAttributes(markup: string): Record<string, unknown> | null;
export declare function blockNameFromMarkup(markup: string): string | null;
//# sourceMappingURL=markup.d.ts.map