/**
 * GSlider Blocks - Unified PR Meta Comment Manager
 *
 * Implements a single, idempotent automation comment on GitHub Pull Requests,
 * strictly matching the architecture from WordPress/gutenberg (tools/pr-meta).
 *
 * Sections:
 * - welcome: Welcome greeting for new contributors
 * - props: Contributor attribution, props list, and Co-authored-by Git trailers
 * - labels: Required type labels enforcement
 */

const PR_META_IDENTIFIER = '<!-- gslider-pr-meta -->';
const PR_META_HEADING = '### 🤖 PR meta 🤖';

/**
 * Known section configuration and fixed render order (matching Gutenberg).
 */
const SECTIONS_CONFIG = [
	{
		id: 'welcome',
		heading: '👋 Welcome',
	},
	{
		id: 'playground',
		heading: '🛝 WordPress Playgrounds',
	},
	{
		id: 'props',
		heading: '🎉 Props',
	},
	{
		id: 'labels',
		heading: '🏷️ Labels',
	},
];

/**
 * Parse individual marker-delimited sections from a comment body.
 *
 * @param {string} body - The raw markdown body of the comment.
 * @return {Map<string, string>} Map of section IDs to section contents.
 */
function parseCommentSections( body ) {
	const sections = new Map();
	if ( ! body || typeof body !== 'string' ) {
		return sections;
	}

	const normalizedBody = body.replace( /\r\n/g, '\n' );
	const regex =
		/<!-- pr-meta:section:([a-z0-9-]+) -->\n([\s\S]*?)\n<!-- \/pr-meta:section:\1 -->/g;
	let match;
	while ( ( match = regex.exec( normalizedBody ) ) !== null ) {
		sections.set( match[ 1 ], match[ 2 ].trim() );
	}
	return sections;
}

/**
 * Rebuild the unified markdown comment body from the sections map.
 *
 * @param {Map<string, string>} sections - Map of section IDs to section contents.
 * @return {string} The fully assembled PR meta markdown.
 */
function buildCommentBody( sections ) {
	let body = `${ PR_META_IDENTIFIER }\n${ PR_META_HEADING }\n\n`;

	// Render known sections in fixed Gutenberg order
	for ( const config of SECTIONS_CONFIG ) {
		if ( sections.has( config.id ) ) {
			const content = sections.get( config.id );
			if ( content && content.trim() ) {
				if ( config.heading ) {
					body += `#### ${ config.heading }\n\n`;
				}
				body += `<!-- pr-meta:section:${ config.id } -->\n${ content.trim() }\n<!-- /pr-meta:section:${ config.id } -->\n\n`;
			}
		}
	}

	// Render any unknown future sections at the bottom
	for ( const [ key, content ] of sections.entries() ) {
		const isKnown = SECTIONS_CONFIG.some( ( c ) => c.id === key );
		if ( ! isKnown && content && content.trim() ) {
			body += `<!-- pr-meta:section:${ key } -->\n${ content.trim() }\n<!-- /pr-meta:section:${ key } -->\n\n`;
		}
	}

	return body.trim();
}

/**
 * Updates a specific section inside the PR meta comment for a pull request.
 * If the comment doesn't exist, it creates it.
 * Also cleans up any legacy standalone comments (Playground or Props).
 *
 * @param {Object} options
 * @param {Object} options.github - Octokit REST client instance.
 * @param {Object} options.context - GitHub Actions context object.
 * @param {number} options.prNumber - Pull request number.
 * @param {string} options.sectionId - Section ID to update (e.g., 'playground', 'props').
 * @param {string} options.content - Markdown content for the section.
 * @return {Promise<void>}
 */
async function updatePrMetaComment( {
	github,
	context,
	prNumber,
	sectionId,
	content,
} ) {
	const owner = context.repo.owner;
	const repo = context.repo.repo;

	// 1. Fetch all comments using pagination
	const allComments = await github.paginate(
		github.rest.issues.listComments,
		{
			owner,
			repo,
			issue_number: prNumber,
			per_page: 100,
		}
	);

	// 2. Locate existing unified PR meta comment (authored by Bot)
	const prMetaComment = allComments.find(
		( c ) =>
			c.body &&
			typeof c.body === 'string' &&
			c.body.includes( PR_META_IDENTIFIER ) &&
			c.user?.type === 'Bot'
	);

	// Also check if an older PR meta comment was authored by a non-bot user
	const nonBotMetaComment = allComments.find(
		( c ) =>
			c.body &&
			typeof c.body === 'string' &&
			c.body.includes( PR_META_IDENTIFIER ) &&
			c.user?.type !== 'Bot'
	);

	// Extract existing sections from bot or non-bot meta comment
	const existingSource = prMetaComment || nonBotMetaComment;
	const sections = parseCommentSections(
		existingSource ? existingSource.body : ''
	);

	// 3. Clean up legacy standalone comments & any non-bot PR meta comments
	const legacyComments = allComments.filter(
		( c ) =>
			c.body &&
			typeof c.body === 'string' &&
			( ( c.body.includes( PR_META_IDENTIFIER ) && c.user?.type !== 'Bot' ) ||
				c.body.includes( '<!-- PROPS-BOT-MANAGED-COMMENT -->' ) ||
				c.body.includes( '<!-- wp-playground-preview-comment -->' ) ||
				c.body.includes( '<!-- gslider-blocks:playground-preview -->' ) )
	);

	for ( const legacy of legacyComments ) {
		try {
			await github.rest.issues.deleteComment( {
				owner,
				repo,
				comment_id: legacy.id,
			} );
			console.log(
				`[PR Meta] Retired legacy comment #${ legacy.id }`
			);
		} catch ( err ) {
			console.log(
				`[PR Meta] Notice: Could not remove legacy comment #${ legacy.id }: ${ err.message }`
			);
		}
	}

	// 4. Update the requested section
	if ( content && content.trim() ) {
		sections.set( sectionId, content.trim() );
	} else {
		sections.delete( sectionId );
	}

	const newBody = buildCommentBody( sections );

	// 6. Update or Create comment
	if ( prMetaComment ) {
		const currentNormalizedBody = prMetaComment.body
			.replace( /\r\n/g, '\n' )
			.trim();
		if ( currentNormalizedBody !== newBody.trim() ) {
			await github.rest.issues.updateComment( {
				owner,
				repo,
				comment_id: prMetaComment.id,
				body: newBody,
			} );
			console.log(
				`[PR Meta] Updated section "${ sectionId }" in PR meta comment on PR #${ prNumber }`
			);
		} else {
			console.log(
				`[PR Meta] Section "${ sectionId }" already up to date on PR #${ prNumber }`
			);
		}
	} else {
		await github.rest.issues.createComment( {
			owner,
			repo,
			issue_number: prNumber,
			body: newBody,
		} );
		console.log(
			`[PR Meta] Created new PR meta comment with section "${ sectionId }" on PR #${ prNumber }`
		);
	}
}

module.exports = {
	PR_META_IDENTIFIER,
	PR_META_HEADING,
	SECTIONS_CONFIG,
	parseCommentSections,
	buildCommentBody,
	updatePrMetaComment,
};
