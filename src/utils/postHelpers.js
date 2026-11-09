/* eslint-disable no-unused-vars, jsdoc/require-param-type */
import { __ } from '@wordpress/i18n';

/**
 * Decode HTML entities in text (e.g. converting &amp; to &)
 *
 * @param {string} text Raw text string with HTML entities.
 * @return {string} Decoded plain text string.
 */
export const decodeHtmlEntities = ( text ) => {
	if ( ! text ) {
		return '';
	}
	const textArea = document.createElement( 'textarea' );
	textArea.innerHTML = text;
	return textArea.value;
};

/**
 * Get featured image URL from embedded post REST API data, supporting fallback sizes.
 *
 * @param {Object} post          Embedded post record from WP REST API.
 * @param {string} preferredSize Preferred image size slug (default 'medium_large').
 * @return {string|null}        Featured image URL or null if not found.
 */
export const getFeaturedImageUrl = ( post, preferredSize = 'medium_large' ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:featuredmedia' ] &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ]
	) {
		const media = post._embedded[ 'wp:featuredmedia' ][ 0 ];

		if ( media.media_details && media.media_details.sizes ) {
			const sizes = media.media_details.sizes;
			if ( sizes[ preferredSize ] ) {
				return sizes[ preferredSize ].source_url;
			}
			// Fallbacks
			if ( sizes.large ) {
				return sizes.large.source_url;
			}
			if ( sizes.full ) {
				return sizes.full.source_url;
			}
		}
		return media.source_url;
	}
	return null;
};

/**
 * Get categories array from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {Array}     List of category term objects.
 */
export const getPostCategories = ( post ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:term' ] &&
		post._embedded[ 'wp:term' ][ 0 ]
	) {
		return post._embedded[ 'wp:term' ][ 0 ].filter(
			( term ) => term.taxonomy === 'category'
		);
	}
	return [];
};

/**
 * Get cleaned excerpt text from post, stripping HTML and limiting by word count.
 *
 * @param {Object} post      Embedded post record from WP REST API.
 * @param {number} wordLimit Maximum number of words to return.
 * @param          options
 * @return {string}         Truncated plain excerpt text.
 */
export const getExcerpt = ( post, wordLimit = 20, options = {} ) => {
	if ( typeof options !== 'object' || options === null ) {
		options = {};
	}

	const {
		enablePostExcerptLimit = options.enablePostExcerptLimit !== undefined
			? options.enablePostExcerptLimit
			: true,
		postExcerptLimitType = 'words',
		postExcerptLimit = {
			Desktop: String( wordLimit ),
			Tablet: String( wordLimit ),
			Mobile: String( wordLimit ),
		},
		postExcerptLimitSuffix = '...',
		postExcerptSource = 'auto',
		deviceType = 'Desktop',
	} = options;

	let text = '';
	if ( postExcerptSource === 'excerpt' ) {
		text = post?.excerpt?.rendered || '';
	} else if ( postExcerptSource === 'content' ) {
		text = post?.content?.rendered || '';
	} else {
		text = post?.excerpt?.rendered || post?.content?.rendered || '';
	}

	if ( ! text ) {
		return '';
	}

	const div = document.createElement( 'div' );
	div.innerHTML = text;
	text = div.textContent || div.innerText || '';
	text = text.trim();

	if ( options.enablePostExcerptLimit === false ) {
		return text;
	}

	let limitValue = parseInt(
		postExcerptLimit?.[ deviceType ] || wordLimit,
		10
	);
	if ( isNaN( limitValue ) || limitValue <= 0 ) {
		limitValue = parseInt( wordLimit, 10 ) || 20;
	}

	if ( postExcerptLimitType === 'characters' ) {
		if ( text.length > limitValue ) {
			return text.substring( 0, limitValue ) + postExcerptLimitSuffix;
		}
		return text;
	}
	const words = text.split( /\s+/ );
	if ( words.length > limitValue ) {
		return (
			words.slice( 0, limitValue ).join( ' ' ) + postExcerptLimitSuffix
		);
	}
	return text;
};

/**
 * Get author display name from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {string}    Author name.
 */
export const getAuthorName = ( post ) => {
	if (
		post?._embedded &&
		post._embedded.author &&
		post._embedded.author[ 0 ]
	) {
		return (
			post._embedded.author[ 0 ].name ||
			post._embedded.author[ 0 ].slug ||
			''
		);
	}
	return '';
};

/**
 * Get author avatar URL from embedded post REST API data.
 * WordPress REST API provides avatar_urls with sizes: 24, 48, 96.
 *
 * @param {Object} post          Embedded post record from WP REST API.
 * @param {number} preferredSize Preferred avatar size (24, 48, or 96). Default 96.
 * @return {string}            Avatar image URL or empty string if not available.
 */
export const getAuthorAvatarUrl = ( post, preferredSize = 96 ) => {
	if (
		post?._embedded &&
		post._embedded.author &&
		post._embedded.author[ 0 ]
	) {
		const author = post._embedded.author[ 0 ];
		if ( author.avatar_urls ) {
			// Try preferred size, then fallback to largest available
			return (
				author.avatar_urls[ preferredSize ] ||
				author.avatar_urls[ 96 ] ||
				author.avatar_urls[ 48 ] ||
				author.avatar_urls[ 24 ] ||
				''
			);
		}
	}
	return '';
};

/**
 * Get formatted post date using localized date string.
 *
 * @param {Object} post    Post record.
 * @param {string} locale  Locale string (default 'en-US').
 * @param {Object} options DateTimeFormat options.
 * @return {string}       Formatted date string.
 */
export const getFormattedDate = (
	post,
	locale = 'en-US',
	options = { year: 'numeric', month: 'short', day: 'numeric' }
) => {
	if ( ! post?.date ) {
		return '';
	}
	const date = new Date( post.date );
	return date.toLocaleDateString( locale, options );
};

/**
 * Get tags array from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {Array}     List of tag term objects.
 */
export const getPostTags = ( post ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:term' ] &&
		post._embedded[ 'wp:term' ][ 1 ]
	) {
		return post._embedded[ 'wp:term' ][ 1 ].filter(
			( term ) => term.taxonomy === 'post_tag'
		);
	}
	return [];
};
