import { createBlock } from '@wordpress/blocks';

/**
 * Convert a rich-text caption (HTML markup) to plain text. The slider stores
 * and renders captions as plain strings, so formatting tags must not leak in.
 *
 * @param {string|*} value The caption value from a core/image block.
 * @return {string} Plain text without HTML tags or entities.
 */
const toPlainText = ( value ) => {
	if ( ! value ) {
		return '';
	}
	const doc = new window.DOMParser().parseFromString(
		String( value ),
		'text/html'
	);
	return doc.body.textContent || '';
};

/**
 * Check whether an inner block is a `core/image` entry with a usable image URL.
 *
 * @param {Object} block Inner block inside `core/gallery`.
 * @return {boolean} True when the block can be converted into a slide.
 */
const isConvertibleImage = ( block ) =>
	block?.name === 'core/image' && !! block?.attributes?.url;

/**
 * Check whether an inner `core/image` block uses WordPress Block Bindings.
 *
 * @param {Object} block Inner block inside `core/gallery`.
 * @return {boolean} True when any image attribute is dynamically bound.
 */
const hasImageBindings = ( block ) => {
	const bindings = block?.attributes?.metadata?.bindings;
	return (
		block?.name === 'core/image' &&
		!! bindings &&
		typeof bindings === 'object' &&
		Object.keys( bindings ).length > 0
	);
};

/**
 * Transform that converts a native core/gallery block into an Image Slider block.
 * Each gallery image becomes one slide entry.
 *
 * Gallery image blocks carry `id`, `url`, `alt`, `caption`, `href`, and optional
 * `lightbox` settings in their attributes. The slider's image item schema is
 * `{ id, url, alt, link, caption, tooltipText }`, so we map the known fields and
 * leave `tooltipText` empty so the editor controls can fill it in.
 *
 * @param {Object} [attributes={}]     The gallery's own attributes.
 * @param {string} [attributes.anchor] Optional HTML anchor carried over as `globalID`.
 * @param {string} [attributes.linkTo] Optional gallery link destination (`lightbox`, `media`, etc.).
 * @param {Array}  [innerBlocks=[]]    The gallery's child blocks (core/image entries).
 * @return {Object} The transformed Image Slider block.
 */
const toImageSlider = ( { anchor, linkTo } = {}, innerBlocks = [] ) => {
	// Every entry needs a distinct positive ID: the editor uses it for React keys
	// and per-item actions, while WP_Query absint() turns negative IDs into real
	// post IDs inside MediaUpload. Start fallback IDs from Date.now() so they
	// stay unique without colliding with WordPress attachment IDs.
	const usedIds = new Set();
	let nextFallbackId = Date.now();

	const convertibleImages = innerBlocks.filter( isConvertibleImage );

	const images = convertibleImages.map( ( { attributes: image } ) => {
		let id;
		if (
			Number.isInteger( image.id ) &&
			image.id > 0 &&
			! usedIds.has( image.id )
		) {
			id = image.id;
		} else {
			while ( usedIds.has( nextFallbackId ) ) {
				nextFallbackId++;
			}
			id = nextFallbackId++;
		}
		usedIds.add( id );

		return {
			id,
			url: image.url,
			alt: image.alt || image.title || '',
			caption: toPlainText( image.caption ),
			link: image.href || '',
			tooltipText: '',
		};
	} );

	const hasLinks = images.some( ( image ) => !! image.link );
	const hasCaptions = images.some( ( image ) => !! image.caption );
	const hasLightbox =
		! hasLinks &&
		( linkTo === 'lightbox' ||
			convertibleImages.some(
				( { attributes: image } ) => !! image?.lightbox?.enabled
			) );

	return createBlock( 'gslider-blocks/image-slider', {
		globalID: anchor || '',
		images,
		enableimageLinks: hasLinks,
		enableLightbox: {
			Desktop: hasLightbox,
			Tablet: hasLightbox,
			Mobile: hasLightbox,
		},
		showCaption: {
			Desktop: hasCaptions,
			Tablet: hasCaptions,
			Mobile: hasCaptions,
		},
	} );
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			// Dynamic galleries, bound images, empty galleries, or galleries without populated images cannot be converted without losing data.
			isMatch: ( { dynamicContent }, block ) =>
				! dynamicContent &&
				! block?.innerBlocks?.some( hasImageBindings ) &&
				block?.innerBlocks?.some( isConvertibleImage ),
			transform: toImageSlider,
		},
	],
};

export default transforms;
