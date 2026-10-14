/**
 * Writes includes/RestApi/block-defaults.json from the MCP block schemas.
 *
 * The schemas in packages/mcp-server/src/core/schemas are extracted from each
 * block's attributes.js, so this keeps PHP defaults in step with the editor.
 * Attributes without a default are left out, as Gutenberg does.
 */
const fs = require( 'fs' );
const path = require( 'path' );

const rootDir = path.resolve( __dirname, '..' );
const schemasDir = path.join( rootDir, 'packages/mcp-server/src/core/schemas' );
const outFile = path.join( rootDir, 'includes/RestApi/block-defaults.json' );

const BLOCK_SLUGS = [ 'base', 'testimonial', 'image-slider', 'logo-carousel', 'flexi-content' ];

const defaults = {};

for ( const slug of BLOCK_SLUGS ) {
	const schemaFile = path.join( schemasDir, `${ slug }.json` );
	if ( ! fs.existsSync( schemaFile ) ) {
		console.error( `Missing schema: ${ path.relative( rootDir, schemaFile ) }. Run "npm run mcp:build" first.` );
		process.exit( 1 );
	}

	const schema = JSON.parse( fs.readFileSync( schemaFile, 'utf8' ) );
	const blockDefaults = {};

	for ( const [ name, definition ] of Object.entries( schema.attributes || {} ) ) {
		if ( definition && Object.prototype.hasOwnProperty.call( definition, 'default' ) ) {
			blockDefaults[ name ] = definition.default;
		}
	}

	defaults[ schema.name || `gslider-blocks/${ slug }` ] = blockDefaults;
}

fs.writeFileSync( outFile, JSON.stringify( defaults, null, '\t' ) + '\n', 'utf8' );
console.log( `Wrote ${ path.relative( rootDir, outFile ) } (${ Object.keys( defaults ).length } blocks).` );
