/* eslint-disable no-console */
const fs = require( 'fs' );
const path = require( 'path' );
const archiver = require( 'archiver' );

// Top-level folder inside the archive, so the zip installs to
// wp-content/plugins/gslider-blocks/ (WordPress admin upload and Playground).
const PLUGIN_SLUG = 'gslider-blocks';

const zip = async () => {
	// Strictly whitelist production runtime files and directories
	const filesAndFolders = [
		'assets',
		'build',
		'includes',
		'languages',
		'patterns',
		'vendor',
		'gslider-blocks.php',
		'readme.txt',
	];

	const output = path.resolve( __dirname, 'gslider-blocks.zip' );
	const outputStream = fs.createWriteStream( output );
	const archive = archiver( 'zip', { zlib: { level: 9 } } );

	archive.on( 'error', ( err ) => {
		throw err;
	} );

	archive.pipe( outputStream );

	for ( const item of filesAndFolders ) {
		const fullPath = path.resolve( __dirname, item );

		if ( fs.existsSync( fullPath ) ) {
			const stats = fs.statSync( fullPath );

			if ( stats.isDirectory() ) {
				archive.directory(
					fullPath,
					`${ PLUGIN_SLUG }/${ item }`,
					( entry ) => {
						// Normalize Windows path separators to POSIX forward slashes
						const relativePath = entry.name.replace( /\\/g, '/' );

						// Exclude ALL hidden files and directories (dot-files and dot-directories anywhere in path)
						// WordPress.org Plugin Check does not allow hidden files.
						if (
							relativePath
								.split( '/' )
								.some( ( part ) => part.startsWith( '.' ) )
						) {
							return false;
						}

						// Exclude empty/dummy admin JS and asset side-effect files from SCSS compilation
						const basename = path.basename( entry.name );
						const dummyAdminFiles = [
							'block-controls.js',
							'block-controls.asset.php',
						];
						if ( dummyAdminFiles.includes( basename ) ) {
							return false;
						}

						// Exclude monorepo packages (e.g. packages/mcp-server) from release archive
						if (
							relativePath.startsWith( 'packages' ) ||
							relativePath.includes( '/packages/' )
						) {
							return false;
						}

						// Exclude developer/testing packages leftover in vendor (both with and without vendor prefix)
						if (
							item === 'vendor' &&
							( relativePath.startsWith( 'phpunit' ) ||
								relativePath.startsWith( 'vendor/phpunit' ) ||
								relativePath.startsWith( 'sebastian' ) ||
								relativePath.startsWith( 'vendor/sebastian' ) )
						) {
							return false;
						}

						// Exclude development configs and documentation inside vendor dependencies
						if ( item === 'vendor' ) {
							if (
								basename === 'composer.json' ||
								basename === 'composer.lock' ||
								basename.endsWith( '.md' ) ||
								basename.startsWith( 'phpcs.xml' )
							) {
								return false;
							}
						}

						return entry;
					}
				);
			} else {
				archive.file( fullPath, {
					name: `${ PLUGIN_SLUG }/${ item }`,
				} ); // Add individual file
			}
		} else {
			console.warn(
				`Warning: ${ item } does not exist and will not be included.`
			);
		}
	}

	await archive.finalize();

	console.log( `✅ Zip file created successfully: ${ output }` );
};

zip();
