/**
 * Generates prefixed CSS from a raw CSS string.
 *
 * @param {string} css       The raw CSS string to process.
 * @param {string} prefix    The selector prefix (e.g., "#block-id" or ".class-name").
 * @param {string} separator The separator between prefix and selector. 
 *                           Defaults to ' ' (space) for descendant selectors (e.g., "#id .class").
 *                           Pass '' (empty string) for chained selectors (e.g., "#id.class").
 * @returns {string}         The processed CSS string with prefixed selectors.
 */
const getCustomCss = (css, prefix, separator = ' ') => {
    if (!css || typeof css !== 'string') return '';

    const mediaRegex = /@media[^{]+\{([^{}]*\{[^{}]*\})+[^}]*\}/g;
    let mediaMatches = css.match(mediaRegex) || [];
    mediaMatches.forEach(mq => {
        css = css.replace(mq, '');
    });

    const normalRules = css
        .split('}')
        .map(rule => rule.trim())
        .filter(Boolean);

    const result = [];

    normalRules.forEach(rule => {
        const [selectors, properties] = rule.split('{').map(part => part.trim());
        if (!selectors || !properties) return;

    const prefixedSelectors = selectors
            .split(',')
            .map(sel => `${prefix}${separator}${sel.trim()}`)
            .join(', ');
        result.push(`${prefixedSelectors} { ${properties} }`);
    });

    mediaMatches.forEach(media => {
        const openIndex = media.indexOf('{');
        const mediaQuery = media.slice(0, openIndex).trim();
        const inner = media.slice(openIndex + 1, -1).trim();

        const processedInner = getCustomCss(inner, prefix, separator);
        if (processedInner) {
            result.push(`${mediaQuery} {\n${processedInner}\n}`);
        }
    });

    return result.join('\n');
};

export default getCustomCss;
