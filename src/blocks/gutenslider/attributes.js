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
                subTitle: 'Sub Title',
                title: 'Slider Item 1',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
                buttonText: 'Click Here',
                buttonLink: '#',
                buttonTargetLink: false,
                nofollow: false,
                sponsored: false,

                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl: '',
                normalBackgroundImageAlt: '',
                normalBackgroundImageID: '',
                normalBackgroundImagePosition: { x: 0.5, y: 0.5 },
                normalBackgroundImageAttachment: 'scroll',
                normalBackgroundImageRepeat: 'no-repeat',
                normalBackgroundImageSize: 'cover',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: '',

                hoverBackgroundImageUrl: '',
                hoverBackgroundImageAlt: '',
                hoverBackgroundImageID: '',
                hoverBackgroundImagePosition: { x: 0.5, y: 0.5 },
                hoverBackgroundImageAttachment: 'scroll',
                hoverBackgroundImageRepeat: 'no-repeat',
                hoverBackgroundImageSize: 'cover',

            },
            { 
                id: 'item-2',

                subTitle: 'Sub Title',
                title: 'Slider Item 2',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
                buttonText: 'Click Here',
                buttonLink: '#',
                buttonTargetLink: false,
                nofollow: false,
                sponsored: false,


                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl: '',
                normalBackgroundImageAlt: '',
                normalBackgroundImageID: '',
                normalBackgroundImagePosition: { x: 0.5, y: 0.5 },
                normalBackgroundImageAttachment: 'scroll',
                normalBackgroundImageRepeat: 'no-repeat',
                normalBackgroundImageSize: 'cover',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: '',

                hoverBackgroundImageUrl: '',
                hoverBackgroundImageAlt: '',
                hoverBackgroundImageID: '',
                hoverBackgroundImagePosition: { x: 0.5, y: 0.5 },
                hoverBackgroundImageAttachment: 'scroll',
                hoverBackgroundImageRepeat: 'no-repeat',
                hoverBackgroundImageSize: 'cover',

            },
            { 
                id: 'item-3',


                subTitle: 'Sub Title',
                title: 'Slider Item 3',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
                buttonText: 'Click Here',
                buttonLink: '#',
                buttonTargetLink: false,
                nofollow: false,
                sponsored: false,


                sliderItemBgColorSwitcher: 'normal',

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl: '',
                normalBackgroundImageAlt: '',
                normalBackgroundImageID: '',
                normalBackgroundImagePosition: { x: 0.5, y: 0.5 },
                normalBackgroundImageAttachment: 'scroll',
                normalBackgroundImageRepeat: 'no-repeat',
                normalBackgroundImageSize: 'cover',

                hoverItemBackgroundType: 'classic',
                hoverItemClassicColor: '',
                hoverItemGradientColor: null,
                hoverItemCustomGradientSwitcher: false,
                hoverItemCustomGradientInputValue: '',

                hoverBackgroundImageUrl: '',
                hoverBackgroundImageAlt: '',
                hoverBackgroundImageID: '',
                hoverBackgroundImagePosition: { x: 0.5, y: 0.5 },
                hoverBackgroundImageAttachment: 'scroll',
                hoverBackgroundImageRepeat: 'no-repeat',
                hoverBackgroundImageSize: 'cover',

            },
        ],
        items: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    default: ""
                },
                subTitle: {
                    type: "string",
                    default: "Sub Title"
                },
                title: {
                    type: "string",
                    default: "Slider Item"
                },
                description: {
                    type: "string",
                    default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum."
                },
                buttonText: {
                    type: "string",
                    default: "Click Here"
                },
                buttonLink: {
                    type: "string",
                    default: "#"
                },
                buttonTargetLink: {
                    type: "boolean",
                    default: false
                },
                nofollow: {
                    type: "boolean",
                    default: false
                },
                sponsored: {
                    type: "boolean",
                    default: false
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
                normalBackgroundImageUrl: {
                    type: "string",
                    default: ""
                },
                normalBackgroundImageAlt: {
                    type: "string",
                    default: ""
                },
                normalBackgroundImageID: {
                    type: "string",
                    default: ""
                },
                normalBackgroundImagePosition: {
                    type: "object",
                    default: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    type: "string",
                    default: "scroll"
                },
                normalBackgroundImageRepeat: {
                    type: "string",
                    default: "no-repeat"
                },
                normalBackgroundImageSize: {
                    type: "string",
                    default: "cover"
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

                hoverBackgroundImageUrl: {
                    type: "string",
                    default: ""
                },

                hoverBackgroundImageAlt: {
                    type: "string",
                    default: ""
                },  

                hoverBackgroundImageID: {
                    type: "string",
                    default: ""
                },  

                hoverBackgroundImagePosition: {
                    type: "object", 
                    default: { x: 0.5, y: 0.5 },
                },  

                hoverBackgroundImageAttachment: {
                    type: "string",
                    default: ""
                },    

                hoverBackgroundImageRepeat: {
                    type: "string",
                    default: ""
                },            

                hoverBackgroundImageSize: {
                    type: "string",
                    default: ""
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
    paginationType: {
        type: "string",
        default: "bullets"
    },
    dynamicBullets: {
        type: 'boolean',
		default: false,
    },














    /** Start Global Setting */
	sliderGlobalZIndex: {
        type: "object",
        default: {
            Desktop: '10',
            Tablet: '20',
            Mobile: '30'
        }
    },
};

export default attributes;
