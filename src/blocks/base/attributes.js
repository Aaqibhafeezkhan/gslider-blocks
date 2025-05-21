const attributes = {
    blockId: {
        type: "string",
        default: ""
    },
    deviceType: {
        type: "string",
        default: "Desktop",
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

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl:{
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageAlt: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageID: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: 'scroll',
                    Tablet: 'scroll',
                    Mobile: 'scroll',
                },
                normalBackgroundImageRepeat: {
                    Desktop: 'no-repeat',
                    Tablet: 'no-repeat',
                    Mobile: 'no-repeat',
                },
                normalBackgroundImageSize: {
                    Desktop: 'cover',
                    Tablet: 'cover',
                    Mobile: 'cover',
                },

                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: 'classic',
                itemBackgroundOverlayClassicColor: '#000',
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: '',
                itemBackgroundOverlayOpacity: 0.5,
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

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl:{
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageAlt: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageID: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: 'scroll',
                    Tablet: 'scroll',
                    Mobile: 'scroll',
                },
                normalBackgroundImageRepeat: {
                    Desktop: 'no-repeat',
                    Tablet: 'no-repeat',
                    Mobile: 'no-repeat',
                },
                normalBackgroundImageSize: {
                    Desktop: 'cover',
                    Tablet: 'cover',
                    Mobile: 'cover',
                },
                
                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: 'classic',
                itemBackgroundOverlayClassicColor: '#000',
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: '',
                itemBackgroundOverlayOpacity: 0.5,

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

                normalItemBackgroundType: 'classic',
                normalItemClassicColor: '#EDEDED',
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: '',

                normalBackgroundImageUrl:{
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageAlt: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImageID: {
                    Desktop: '',
                    Tablet: '',
                    Mobile: '',
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: 'scroll',
                    Tablet: 'scroll',
                    Mobile: 'scroll',
                },
                normalBackgroundImageRepeat: {
                    Desktop: 'no-repeat',
                    Tablet: 'no-repeat',
                    Mobile: 'no-repeat',
                },
                normalBackgroundImageSize: {
                    Desktop: 'cover',
                    Tablet: 'cover',
                    Mobile: 'cover',
                },
                
                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: 'classic',
                itemBackgroundOverlayClassicColor: '#000',
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: '',
                itemBackgroundOverlayOpacity: 0.5,
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
                    type: "object",
                    default: {
                        Desktop: "",
                        Tablet: "",
                        Mobile: ""
                    }
                },
                normalBackgroundImageAlt: {
                    type: "object",
                    default: {
                        Desktop: "",
                        Tablet: "",
                        Mobile: ""
                    }
                },
                normalBackgroundImageID: {
                    type: "object",
                    default: {
                        Desktop: "",
                        Tablet: "",
                        Mobile: ""
                    }
                },
                normalBackgroundImagePosition: {
                    type: "object",
                    default: {
                        Desktop: { x: 0.5, y: 0.5 },
                        Tablet: { x: 0.5, y: 0.5 },
                        Mobile: { x: 0.5, y: 0.5 },
                    }
                },
                normalBackgroundImageAttachment: {
                    type: "object",
                    default: {
                        Desktop: "scroll",
                        Tablet: "scroll",
                        Mobile: "scroll",
                    }
                },
                normalBackgroundImageRepeat: {
                    type: "object",
                    default: {
                        Desktop: "no-repeat",
                        Tablet: "no-repeat",
                        Mobile: "no-repeat",
                    }
                },
                normalBackgroundImageSize: {
                    type: "object",
                    default: {
                        Desktop: "cover",
                        Tablet: "cover",
                        Mobile: "cover",
                    }
                },

                itemBackgroundOverlaySwitcher: {
                    type: "boolean",
                    default: false,
                },

                itemBackgroundOverlayType: {
                    type: "string",
                    default: "classic",
                },
                itemBackgroundOverlayClassicColor: {
                    type: "string",
                    default: "",
                },
                itemBackgroundOverlayGradientColor: {
                    type: "string",
                    default: null,
                },
                itemBackgroundOverlayCustomGradientSwitcher: {
                    type: "boolean",
                    default: false,
                },
                itemBackgroundOverlayCustomGradientInputValue: {
                    type: "string",
                    default: "",
                },
                itemBackgroundOverlayOpacity: {
                    type: "number",
                    default: 0.5,
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
        "default": "slide"
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
    
	/** Start Arrows Style */
	sliderArrowsSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '16',
		},
	},
	sliderArrowsSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
    /** End Arrows Size */

    /** Start Arrows Color */
	sliderArrowsColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	sliderArrowsColor: {
		type: 'string',
		default: '#333333',
	},
	sliderArrowsColorHover: {
		type: 'string',
		default: '',
	},
    /** End Arrows Color */

    /** Start Background */
    sliderArrowsBackgroundColorSwitcher: {  
        type: "string",
        default: "normal",
    },

    sliderArrowsNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    sliderArrowsNormalClassicColor: {
        type: "string",
        default: "#d2d2d2c7",
    },
    sliderArrowsNormalGradientColor: {
        type: "string",
        default: null,
    },
    sliderArrowsNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    sliderArrowsNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    sliderArrowsHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    sliderArrowsHoverClassicColor: {
        type: "string",
        default: "#787878b8",
    },
    sliderArrowsHoverGradientColor: {
        type: "string",
        default: null,
    },
    sliderArrowsHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    sliderArrowsHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
	/** End Background */

    /** Start Arrows Size */
	sliderArrowsWidth: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '46',
		},
	},
	sliderArrowsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	sliderArrowsHeight: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '46',
		},
	},
	sliderArrowsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
    /** End Arrows Size */

    /** Start Border */
	sliderArrowsBorder: {
		type: 'string',
		default: 'none',
	},
	sliderArrowsBorderColorSwitcher : {
		type: 'string',
		default: 'normal'
	},
	sliderArrowsBorderColor: {
		type: 'string',
		default: '' 
	},
	sliderArrowsBorderHoverColor: {
		type: 'string',
		default: ''
	},
	sliderArrowsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	sliderArrowsDesktopBorder: {
		type: 'object', 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderArrowsDesktopBorderCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsTabletBorder: {
		type: 'object',  
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderArrowsTabletBorderCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsMobileBorder: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderArrowsMobileBorderCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsBorderLink : {
		type : 'boolean',
		default: true
	},
	/** End Border */

	/** Start Border Radius */
	sliderArrowsBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	sliderArrowsDesktopBorderRadius: {
		type: 'object', 
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderArrowsDesktopBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsTabletBorderRadius: {
		type: 'object',  
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderArrowsTabletBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsMobileBorderRadius: {
		type: 'object',  
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderArrowsMobileBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderArrowsBorderRadiusLink : {
		type : 'boolean',
		default: true
	},
	/** End Border Radius */

	/** Start Box Shadow */
    sliderArrowsBoxShadowValuesSwitcher : {
		type: 'string',
		default: 'normal'
	},
	sliderArrowsBoxShadowValues: {
        type: 'array',
        default: [],
    },
    sliderArrowsBoxShadowCssValue: {
        type: 'string',
        default: '',
    },
    sliderArrowsBoxShadowHoverValues: {
        type: 'array',
        default: [],
    },
    sliderArrowsBoxShadowHoverCssValue: {
        type: 'string',
        default: '',
    },
	/** End Box Shadow */

    /** Start Position */
    sliderArrowsPosition: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	sliderArrowsPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	sliderArrowsRightOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderArrowsRightOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	sliderArrowsLeftOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderArrowsLeftOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},  
	/** End Position */


    /** Start Dots Margin */
	sliderDotsMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	sliderDotsDesktopMargin: {
		type: 'object', 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderDotsDesktopMarginCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderDotsTabletMargin: {
		type: 'object',  
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderDotsTabletMarginCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderDotsMobileMargin: {
		type: 'object',  
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderDotsMobileMarginCssStyle: { 
        type: 'string',
        default: '',
    },
	sliderDotsMarginLink : {
		type : 'boolean',
		default: true
	},
    /** End Dots Margin */

    /** Start Dots Position */
    sliderDotsPosition: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderDotsPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
    /** End Dots Position */

    /** Start Dots Style */
    sliderDotsSwitcher: {
		type: 'string',
		default: 'normal',
	},
	sliderNormalDotsBgColor: {
		type: 'string',
		default: '#333333',
	},
	sliderActiveDotsBgColor: {
		type: 'string',
		default: '',
	},
	sliderNormalDotsWidth: {
		type: 'object',
		default: {
			Desktop: '8',
			Tablet: '8',
			Mobile: '8',
		},
	},
	sliderNormalDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	sliderNormalDotsHeight: {
		type: 'object',
		default: {
			Desktop: '8',
			Tablet: '8',
			Mobile: '8',
		},
	},
	sliderNormalDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
    /** End Dots Style */

    /** Start Dots Border */
    sliderNormalDotsBorder: { 
		type: 'string',
		default: "none",
	},
	sliderNormalDotsBorderColorSwitcher : {
		type: "string",
		default: "normal"
	},
	sliderNormalDotsBorderColor: {
		type: 'string',
		default: ""
	},
	sliderNormalDotsBorderHoverColor: {
		type: 'string',
	},
    
    sliderNormalDotsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	sliderNormalDotsDesktopBorder: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderNormalDotsDesktopBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsTabletBorder: {
		type: 'object',  
		default: {  
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderNormalDotsTabletBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsMobileBorder: {
		type: 'object',  
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    sliderNormalDotsMobileBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsBorderLink : {
		type : 'boolean',
		default: true
	},
    /** End Dots Border */

    /** Start Dots Border Radius */
    sliderNormalDotsBorderRadius: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
    sliderNormalDotsBorderRadiusUnits: {
		type: 'object',
		default: {  
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
    sliderNormalDotsDesktopBorderRadius: {
		type: "object", 
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderNormalDotsDesktopBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsTabletBorderRadius: {
		type: 'object',  
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderNormalDotsTabletBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsMobileBorderRadius: {
		type: 'object',  
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
    sliderNormalDotsMobileBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderNormalDotsBorderRadiusLink : {
		type : 'boolean',
		default: true
	},
    /** End Dots Border Radius */

    /** Start Active Dots */
    sliderActiveDotsWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderActiveDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	sliderActiveDotsHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderActiveDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},

    /** Start Active Dots Border */
    sliderActiveDotsBorder: { 
        type: 'string',
        default: "none",
    },
    sliderActiveDotsBorderColorSwitcher : {
        type: "string",
        default: "normal"
    },
    sliderActiveDotsBorderColor: {
        type: 'string',
        default: ""
    },
    sliderActiveDotsBorderHoverColor: {
        type: 'string',
    },
    
    sliderActiveDotsBorderUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    sliderActiveDotsDesktopBorder: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsDesktopBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsTabletBorder: {
        type: 'object',  
        default: {  
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsTabletBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsMobileBorder: {
        type: 'object',  
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsMobileBorderCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsBorderLink : {
        type : 'boolean',
        default: true
    },
    /** End Active Dots Border */

    /** Start Active Dots Border Radius */
    sliderActiveDotsBorderRadius: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: '',
        },
    },
    sliderActiveDotsBorderRadiusUnits: {
        type: 'object',
        default: {  
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    sliderActiveDotsDesktopBorderRadius: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsDesktopBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsTabletBorderRadius: {
        type: 'object',  
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsTabletBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsMobileBorderRadius: {
        type: 'object',  
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    sliderActiveDotsMobileBorderRadiusCssStyle: { 
        type: 'string',
        default: '',
    },
    sliderActiveDotsBorderRadiusLink : {
        type : 'boolean',
        default: true
    },
    /** End Active Dots Border Radius */


    /** Start Global Setting */
	sliderGlobalZIndex: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },

    	/** Bg Normal Image for fb container */
	sliderBgNormalBackgroundImageUrl: {  
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    sliderBgNormalBackgroundImagePosition: {
        type: 'object',
        default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
        }
    },
    sliderBgNormalBackgroundImageAttachment: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    sliderBgNormalBackgroundImageRepeat: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    sliderBgNormalBackgroundImageSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
	/** End Global Setting */



    /** Start Global Setting */
    globalSliderItemBgColorSwitcher: {
        type: "string",
        default: "normal",
    },

    globalNormalItemBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalNormalItemClassicColor: {
        type: "string",
        default: "",
    },
    globalNormalItemGradientColor: {
        type: "string",
        default: null,
    },
    globalNormalItemCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalNormalItemCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    globalNormalBackgroundImageUrl: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalNormalBackgroundImageAlt: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalNormalBackgroundImageID: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalNormalBackgroundImagePosition: {
        type: "object",
        default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
        }
    },
    globalNormalBackgroundImageAttachment: {
        type: "object",
        default: {
            Desktop: "scroll",
            Tablet: "scroll",
            Mobile: "scroll"
        }
    },
    globalNormalBackgroundImageRepeat: {
        type: "object",
        default: {
            Desktop: "no-repeat",
            Tablet: "no-repeat",
            Mobile: "no-repeat"
        }
    },
    globalNormalBackgroundImageSize: {
        type: "object",
        default: {
            Desktop: "cover",
            Tablet: "cover",
            Mobile: "cover"
        }
    },

    globalHoverItemBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalHoverItemClassicColor: {
        type: "string",
        default: "",
    },
    globalHoverItemGradientColor: {
        type: "string",
        default: null,
    },
    globalHoverItemCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalHoverItemCustomGradientInputValue: {
        type: "string",
        default: "",
    },

    globalHoverBackgroundImageUrl: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },

    globalHoverBackgroundImageAlt: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },  

    globalHoverBackgroundImageID: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },  

    globalHoverBackgroundImagePosition: {
        type: "object", 
        default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
        }
    },  

    globalHoverBackgroundImageAttachment: {
        type: "object",
        default: {
            Desktop: "scroll",
            Tablet: "scroll",
            Mobile: "scroll"
        }
    },    

    globalHoverBackgroundImageRepeat: {
        type: "object",
        default: {
            Desktop: "no-repeat",
            Tablet: "no-repeat",
            Mobile: "no-repeat"
        }
    },            

    globalHoverBackgroundImageSize: {
        type: "object",
        default: {
            Desktop: "cover",
            Tablet: "cover",
            Mobile: "cover"
        }
    },

};

export default attributes;
