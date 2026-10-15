/**
 * Reads the attribute JSON out of the first block comment.
 * Gutenberg's parser fills in defaults, so the comment itself is the list of
 * attributes that were actually stored.
 */
export function commentAttributes(markup: string): Record<string, unknown> | null {
  const commentAt = markup.indexOf('<!-- wp:');
  if (commentAt < 0) {
    return null;
  }
  const jsonAt = markup.indexOf('{', commentAt);
  if (jsonAt < 0) {
    return null;
  }
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = jsonAt; index < markup.length; index += 1) {
    const character = markup[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }
    if (character === '"') {
      inString = true;
      continue;
    }
    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(markup.slice(jsonAt, index + 1)) as Record<string, unknown>;
      }
    }
  }
  return null;
}

export function blockNameFromMarkup(markup: string): string | null {
  const match = markup.match(/<!--\s+wp:([a-z0-9/-]+)/);
  return match ? match[1] : null;
}
