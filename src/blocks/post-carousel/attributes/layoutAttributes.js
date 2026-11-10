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
	postLayoutMode: {
		type: 'string',
		default: 'classic',
	},
	presetStyle: {
		type: 'string',
		default: 'classic-card',
	},
	heroHeightDesktop: {
		type: 'number',
		default: 520,
	},
	heroHeightTablet: {
		type: 'number',
		default: 420,
	},
	heroHeightMobile: {
		type: 'number',
		default: 340,
	},
	heroContentAlignment: {
		type: 'string',
		default: 'bottom-left',
	},
	enableSpotlight: {
		type: 'boolean',
		default: false,
	},
	spotlightScaleSide: {
		type: 'number',
		default: 0.92,
	},
	spotlightOpacitySide: {
		type: 'number',
		default: 0.65,
	},
	newsroomMainWidth: {
		type: 'number',
		default: 65,
	},
	newsroomQueuePosition: {
		type: 'string',
		default: 'right',
	},
	horizontalMediaWidth: {
		type: 'number',
		default: 45,
	},
	horizontalMediaPosition: {
		type: 'string',
		default: 'left',
	},
	overlayGradientScrim: {
		type: 'string',
		default:
			'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
	},
	overlayScrimHeight: {
		type: 'number',
		default: 75,
	},
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
	equalHeight: {
		type: 'boolean',
		default: true,
	},
	enableCardClickableLink: {
		type: 'boolean',
		default: false,
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
