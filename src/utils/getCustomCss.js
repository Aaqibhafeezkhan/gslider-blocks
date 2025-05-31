const getCustomCss = (css, prefix) => {
    if (!css || typeof css !== 'string') return ''; // Ensure css is a valid string

    return css
        .split('}')
        .map(rule => {
            const trimmedRule = rule.trim();
            if (!trimmedRule) return ''; // Skip empty rules

            if (trimmedRule.startsWith('@media')) {
                // Handle media queries properly
                const openBraceIndex = trimmedRule.indexOf('{');
                if (openBraceIndex === -1) return ''; // Skip invalid media query

                const mediaQuery = trimmedRule.substring(0, openBraceIndex).trim();
                const innerCss = trimmedRule.substring(openBraceIndex + 1).trim();

                const processedInnerCss = getCustomCss(innerCss, prefix); // Recursively process inner CSS

                return processedInnerCss ? `${mediaQuery} { ${processedInnerCss} }` : '';
            } else {
                // Handle normal CSS rules
                const [selectors, properties] = trimmedRule.split('{').map(part => part.trim());
                if (!selectors || !properties) return ''; // Skip if invalid

                const prefixedSelectors = selectors
                    .split(',')
                    .map(selector => `${prefix} ${selector.trim()}`)
                    .join(', ');

                return `${prefixedSelectors} { ${properties} }`;
            }
        })
        .filter(Boolean)
        .join('\n'); // Ensure proper formatting
};

export default getCustomCss;


