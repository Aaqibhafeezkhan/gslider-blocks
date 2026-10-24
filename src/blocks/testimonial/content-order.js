/* eslint-disable no-nested-ternary, jsdoc/require-returns-description */
export const DEFAULT_TESTIMONIAL_CONTENT_ORDER = [
	'quote',
	'content',
	'rating',
	'author',
];

/**
 * Preserve old saved `contentOrder` values while ensuring the new rating group
 * is always available and defaults to immediately after content.
 *
 * @param {string[]} order
 * @return {string[]}
 */
export const normalizeContentOrder = ( order ) => {
	if ( ! Array.isArray( order ) || order.length === 0 ) {
		return [ ...DEFAULT_TESTIMONIAL_CONTENT_ORDER ];
	}

	const normalizedOrder = order.filter(
		( key, index ) =>
			DEFAULT_TESTIMONIAL_CONTENT_ORDER.includes( key ) &&
			order.indexOf( key ) === index
	);

	if ( ! normalizedOrder.includes( 'rating' ) ) {
		const contentIndex = normalizedOrder.indexOf( 'content' );
		const authorIndex = normalizedOrder.indexOf( 'author' );
		const insertIndex =
			contentIndex !== -1
				? contentIndex + 1
				: authorIndex !== -1
				? authorIndex
				: normalizedOrder.length;

		normalizedOrder.splice( insertIndex, 0, 'rating' );
	}

	DEFAULT_TESTIMONIAL_CONTENT_ORDER.forEach( ( key ) => {
		if ( ! normalizedOrder.includes( key ) ) {
			normalizedOrder.push( key );
		}
	} );

	return normalizedOrder;
};
