const attributes = {
    blockId: {
        type: "string",
        default: ""
    },
    blockStyle: {
        type: "string",
        default: ""
    },
    sliderItems: {
        type: "array",
        default: [
            { 
                id: 'item-1',
                title: 'Slider Item 1',

                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#399CFF',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: ''
            },
            { 
                id: 'item-2',
                title: 'Slider Item 2',

                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#399CFF',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: ''
            },
            { 
                id: 'item-3',
                title: 'Slider Item 3',

                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#399CFF',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: ''
            },
        ],
        items: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    default: ""
                },
                title: {
                    type: "string",
                    default: "Slider Item"
                },
                sliderItemBgColorSwitcher: {
                    type: "string",
                    default: "normal",
                },

                normalItemBackgroundType: {
                    type: "string",
                    default: "classic",
                },
                normalItemClassicColor: {
                    type: "string",
                    default: "",
                },
                normalItemGradientColor: {
                    type: "string",
                    default: null,
                },
                normalItemCustomGradientSwitcher: {
                    type: "boolean",
                    default: false,
                },
                normalItemCustomGradientInputValue: {
                    type: "string",
                    default: "",
                },

                hoverItemBackgroundType: {
                    type: "string",
                    default: "classic",
                },
                hoverItemClassicColor: {
                    type: "string",
                    default: "",
                },
                hoverItemGradientColor: {
                    type: "string",
                    default: null,
                },
                hoverItemCustomGradientSwitcher: {
                    type: "boolean",
                    default: false,
                },
                hoverItemCustomGradientInputValue: {
                    type: "string",
                    default: "",
                },
            }
        }
    },
    sliderType: {
        type: "string",
        default: "slider"
    },
    carouselPerColumn: {
        type: 'number',
        default: 2,
    },
    carouselPerColumnGap: {
        type: 'number',
        default: 20,
    },
	speed: {
		type: 'number',
        default: 800,
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
    autoplayDelay: {
        type: 'number',
        default: 1000,
    },
	infiniteLoop: {
		type: 'boolean',
		default: true,
	},
    allowTouchMove: {
		type: 'boolean',
		default: true,
	},
    pauseOnHover: {
        "type": "boolean",
        "default": false
    },
    stopOnLastSlide: {
        "type": "boolean",
        "default": false
    },
    reverseDirection: {
        "type": "boolean",
        "default": false
    },
    slideEffect: {
        "type": "string",
        "default": "creative"
    },
    carouselEffect: {
        "type": "string",
        "default": "slide"
    },
    mousewheelControl: {
        "type": "boolean",
        "default": false
    },
    showNavigation: {
		type: 'boolean',
		default: true,
	},
	showPagination: {
		type: 'boolean',
		default: true,
	},
};

export default attributes;
