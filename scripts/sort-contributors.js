/**
 * scripts/sort-contributors.js
 *
 * Sorts .all-contributorsrc contributors by GitHub contribution count descending,
 * ensuring the repository maintainer (@noruzzamans) remains at index 0,
 * and filtering out bot/AI accounts (e.g. dependabot, github-actions, claude).
 *
 * @since 1.2.2
 */

const fs = require( 'fs' );
const path = require( 'path' );
const { execSync } = require( 'child_process' );

const RC_PATH = path.resolve( __dirname, '../.all-contributorsrc' );
const REPO_OWNER = 'noruzzamans';
const REPO_NAME = 'gslider-blocks';

const EXCLUDED_PATTERNS = [
	/\[bot\]$/i,
	/-bot$/i,
	/^dependabot$/i,
	/^github-actions$/i,
	/claude/i,
];

function isExcluded( login ) {
	if ( ! login ) {
		return true;
	}
	return EXCLUDED_PATTERNS.some( ( pattern ) => pattern.test( login ) );
}

function truncateName( name, max = 14 ) {
	if ( ! name ) {
		return '';
	}
	let trimmed = name.trim();
	if ( trimmed.length > max ) {
		trimmed = trimmed.slice( 0, max - 3 ).trim() + '...';
	}
	return trimmed.replace( / /g, '&nbsp;' );
}

async function getContributionCounts() {
	const token = process.env.PRIVATE_TOKEN || process.env.GITHUB_TOKEN;
	const countMap = {};

	// 1. Try direct GitHub REST API fetch
	try {
		const headers = {
			'User-Agent': 'gslider-contributor-sorter',
			Accept: 'application/vnd.github.v3+json',
		};
		if ( token ) {
			headers.Authorization = `Bearer ${ token }`;
		}

		const url = `https://api.github.com/repos/${ REPO_OWNER }/${ REPO_NAME }/contributors?per_page=100`;
		const res = await fetch( url, { headers } );
		if ( res.ok ) {
			const data = await res.json();
			if ( Array.isArray( data ) ) {
				for ( const item of data ) {
					if ( item && item.login ) {
						countMap[ item.login.toLowerCase() ] =
							item.contributions || 0;
					}
				}
				return countMap;
			}
		}
	} catch ( err ) {
		// Fallback to gh cli if fetch fails
	}

	// 2. Fallback to GitHub CLI
	try {
		const raw = execSync(
			`gh api repos/${ REPO_OWNER }/${ REPO_NAME }/contributors --paginate`,
			{
				encoding: 'utf8',
				stdio: [ 'ignore', 'pipe', 'ignore' ],
			}
		);
		const data = JSON.parse( raw );
		if ( Array.isArray( data ) ) {
			for ( const item of data ) {
				if ( item && item.login ) {
					countMap[ item.login.toLowerCase() ] =
						item.contributions || 0;
				}
			}
		}
	} catch ( err ) {
		// Ignore if gh cli is not available
	}

	return countMap;
}

async function main() {
	if ( ! fs.existsSync( RC_PATH ) ) {
		console.error( 'Cannot find .all-contributorsrc at', RC_PATH );
		process.exit( 1 );
	}

	const rc = JSON.parse( fs.readFileSync( RC_PATH, 'utf8' ) );
	if ( ! Array.isArray( rc.contributors ) ) {
		console.error( 'Invalid .all-contributorsrc structure' );
		process.exit( 1 );
	}

	const countMap = await getContributionCounts();

	const owner = rc.contributors.find(
		( c ) => c.login.toLowerCase() === REPO_OWNER.toLowerCase()
	);

	const humans = rc.contributors.filter(
		( c ) =>
			c.login.toLowerCase() !== REPO_OWNER.toLowerCase() &&
			! isExcluded( c.login )
	);

	// Sort descending by contribution count; break ties alphabetically
	humans.sort( ( a, b ) => {
		const countA = countMap[ a.login.toLowerCase() ] || 0;
		const countB = countMap[ b.login.toLowerCase() ] || 0;
		if ( countB !== countA ) {
			return countB - countA;
		}
		return a.login.localeCompare( b.login );
	} );

	rc.contributors = ( owner ? [ owner, ...humans ] : humans ).map(
		( c ) => ( {
			...c,
			name: truncateName( c.name ),
		} )
	);

	fs.writeFileSync( RC_PATH, JSON.stringify( rc, null, 2 ) + '\n', 'utf8' );
	console.log(
		`Successfully sorted ${ rc.contributors.length } contributors by contribution count (bots excluded).`
	);
}

main().catch( ( err ) => {
	console.error( 'Error sorting contributors:', err );
	process.exit( 1 );
} );
