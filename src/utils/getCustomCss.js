const getCustomCss = (css, prefix) => {
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
            .map(sel => `${prefix} ${sel.trim()}`)
            .join(', ');
        result.push(`${prefixedSelectors} { ${properties} }`);
    });

    mediaMatches.forEach(media => {
        const openIndex = media.indexOf('{');
        const mediaQuery = media.slice(0, openIndex).trim();
        const inner = media.slice(openIndex + 1, -1).trim();

        const processedInner = getCustomCss(inner, prefix);
        if (processedInner) {
            result.push(`${mediaQuery} {\n${processedInner}\n}`);
        }
    });

    return result.join('\n');
};

export default getCustomCss;


