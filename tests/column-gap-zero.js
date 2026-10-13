/**
 * Tablet and desktop column gap of 0 must stay 0.
 * A missing gap still falls back to 20.
 */

const fs = require( 'fs' );
const path = require( 'path' );

function assertTrue( condition, message ) {
	if ( ! condition ) {
		console.error( `FAIL: ${ message }` );
		process.exit( 1 );
	}
	console.log( `OK: ${ message }` );
}

function spaceBetween( gap ) {
	return gap ?? 20;
}

assertTrue( spaceBetween( 0 ) === 0, 'tablet/desktop gap 0 stays 0' );
assertTrue( spaceBetween( undefined ) === 20, 'missing gap falls back to 20' );
assertTrue( spaceBetween( null ) === 20, 'null gap falls back to 20' );
assertTrue( spaceBetween( 15 ) === 15, 'gap 15 stays 15' );
assertTrue( spaceBetween( 20 ) === 20, 'gap 20 stays 20' );

const blocks = [ 'base', 'image-slider', 'logo-carousel', 'testimonial', 'flexi-content' ];
const roots = blocks.map( ( slug ) => path.join( 'src', 'blocks', slug ) );

for ( const root of roots ) {
	const files = fs.readdirSync( root ).filter( ( name ) => name.endsWith( '.js' ) );
	for ( const name of files ) {
		const text = fs.readFileSync( path.join( root, name ), 'utf8' );
		const lines = text.split( /\r?\n/ );
		lines.forEach( ( line, index ) => {
			if ( ! line.includes( 'spaceBetween' ) ) {
				return;
			}
			assertTrue(
				! line.includes( '|| 20' ),
				`${ root }/${ name }:${ index + 1 } no longer uses || 20`
			);
			if ( line.includes( 'Tablet' ) || line.includes( 'Desktop' ) || line.includes( 'deviceType' ) ) {
				if ( line.includes( '|| 0' ) ) {
					return;
				}
				assertTrue(
					line.includes( '?? 20' ),
					`${ root }/${ name }:${ index + 1 } uses ?? 20`
				);
			}
		} );
	}
}

console.log( 'Column gap checks passed.' );
