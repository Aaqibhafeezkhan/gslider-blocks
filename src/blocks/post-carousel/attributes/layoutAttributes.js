const layoutAttributes = {
	blockId: {
		type: 'string',
		default: '',
	},
	deviceType: {
		type: 'string',
		default: 'Desktop',
	},
	blockStyle: {
		type: 'string',
		default: '',
	},

	/** Start Show/Hide Elements */
	paginationPositionType: {
		type: 'string',
		default: 'outside',
	},
	showNavigation: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showPagination: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	/** End Show/Hide Elements */

	/** Layout & Content Setting */
	layoutHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	layoutHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	verticalAlign: {
		type: 'object',
		default: {
			Desktop: 'center',
			Tablet: 'center',
			Mobile: 'center',
		},
	},
	/** End Layout & Content Setting */

	/** Content Order */
	contentOrder: {
		type: 'array',
		default: [
			'thumbnail',
			'categories',
			'title',
			'excerpt',
			'meta',
			'readmore',
		],
	},
	postTaxonomyDisplay: {
		type: 'string',
		default: 'category',
	},
	enableTaxonomyBadgeOverlay: {
		type: 'boolean',
		default: true,
	},
	taxonomyBadgeOverlayPosition: {
		type: 'string',
		default: 'top-left',
	},
	taxonomyBadgeOverlayVisibility: {
		type: 'string',
		default: 'always',
	},
	taxonomyBadgeOverlayTopOffset: {
		type: 'object',
		default: {
			Desktop: '15',
			Tablet: '15',
			Mobile: '12',
		},
	},
	taxonomyBadgeOverlayTopOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	taxonomyBadgeOverlayLeftOffset: {
		type: 'object',
		default: {
			Desktop: '15',
			Tablet: '15',
			Mobile: '12',
		},
	},
	taxonomyBadgeOverlayLeftOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Content Order */

	/** Query Attributes */

	useRelatedPostsQuery: {
		type: 'boolean',
		default: false,
	},
	relatedPostsTaxonomy: {
		type: 'string',
		default: 'category',
	},

	/** Start Element Visibility Toggles */
	showFeaturedImage: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showPostTitle: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showExcerpt: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showTaxonomy: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMeta: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaAuthor: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaAvatar: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showMetaDate: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showReadMoreButton: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	/** End Element Visibility Toggles */
};

export default layoutAttributes;
