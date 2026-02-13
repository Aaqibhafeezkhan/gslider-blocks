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
                id: "item-1",
                testimonialText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
                authorName: "Author Name",
                authorDesignation: "CEO, Google",
                authorImage: {
                    url: "",
                    id: "",
                    alt: "",
                },
                rating: 5,

                normalItemBackgroundType: "classic",
                normalItemClassicColor: "#EDEDED",
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: "",

                normalBackgroundImageUrl:{
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageAlt: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageID: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: "scroll",
                    Tablet: "scroll",
                    Mobile: "scroll",
                },
                normalBackgroundImageRepeat: {
                    Desktop: "no-repeat",
                    Tablet: "no-repeat",
                    Mobile: "no-repeat",
                },
                normalBackgroundImageSize: {
                    Desktop: "cover",
                    Tablet: "cover",
                    Mobile: "cover",
                },

                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: "classic",
                itemBackgroundOverlayClassicColor: "#000",
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: "",
                itemBackgroundOverlayOpacity: 0.5,
            },
            { 
                id: "item-2",

                testimonialText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
                authorName: "Author Name",
                authorDesignation: "CEO, Google",
                authorImage: {
                    url: "",
                    id: "",
                    alt: "",
                },
                rating: 5,

                normalItemBackgroundType: "classic",
                normalItemClassicColor: "#EDEDED",
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: "",

                normalBackgroundImageUrl:{
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageAlt: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageID: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: "scroll",
                    Tablet: "scroll",
                    Mobile: "scroll",
                },
                normalBackgroundImageRepeat: {
                    Desktop: "no-repeat",
                    Tablet: "no-repeat",
                    Mobile: "no-repeat",
                },
                normalBackgroundImageSize: {
                    Desktop: "cover",
                    Tablet: "cover",
                    Mobile: "cover",
                },
                
                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: "classic",
                itemBackgroundOverlayClassicColor: "#000",
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: "",
                itemBackgroundOverlayOpacity: 0.5,

            },
            { 
                id: "item-3",

                testimonialText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
                authorName: "Author Name",
                authorDesignation: "CEO, Google",
                authorImage: {
                    url: "",
                    id: "",
                    alt: "",
                },
                rating: 5,

                normalItemBackgroundType: "classic",
                normalItemClassicColor: "#EDEDED",
                normalItemGradientColor: null,
                normalItemCustomGradientSwitcher: false,
                normalItemCustomGradientInputValue: "",

                normalBackgroundImageUrl:{
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageAlt: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImageID: {
                    Desktop: "",
                    Tablet: "",
                    Mobile: "",
                },
                normalBackgroundImagePosition: {
                    Desktop: { x: 0.5, y: 0.5 },
                    Tablet: { x: 0.5, y: 0.5 },
                    Mobile: { x: 0.5, y: 0.5 },
                },
                normalBackgroundImageAttachment: {
                    Desktop: "scroll",
                    Tablet: "scroll",
                    Mobile: "scroll",
                },
                normalBackgroundImageRepeat: {
                    Desktop: "no-repeat",
                    Tablet: "no-repeat",
                    Mobile: "no-repeat",
                },
                normalBackgroundImageSize: {
                    Desktop: "cover",
                    Tablet: "cover",
                    Mobile: "cover",
                },
                
                itemBackgroundOverlaySwitcher: false,
                itemBackgroundOverlayType: "classic",
                itemBackgroundOverlayClassicColor: "#000",
                itemBackgroundOverlayGradientColor: null,
                itemBackgroundOverlayCustomGradientSwitcher: false,
                itemBackgroundOverlayCustomGradientInputValue: "",
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
                testimonialText: {
                    type: "string",
                    default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum."
                },
                authorName: {
                    type: "string",
                    default: "Author Name"
                },
                authorDesignation: {
                    type: "string",
                    default: "CEO, Google"
                },
                authorImage: {
                    type: "object",
                    default: {
                        url: "",
                        id: "",
                        alt: "",
                    }
                },
                rating: {
                    type: "number",
                    default: 5
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

    /** Start Slider Settings */
    sliderType: {
        type: "string",
        default: "slider"
    },
    carouselPerColumn: {
        type: "object",
        default: {
            Desktop: 2,
            Tablet: 2,
            Mobile: 1,
        },
    },
    carouselPerColumnGap: {
        type: "object",
        default: {
            Desktop: 20,
            Tablet: 20,
            Mobile: 0,
        },
    },
	speed: {
		type: "object",
        default: {
            Desktop: 800,
            Tablet: 800,
            Mobile: 800,
        },
	},
	autoplay: {
		type: "boolean",
		default: false,
	},
    autoplayDelay: {
        type: "object",
        default: {
            Desktop: 1000,
            Tablet: 1000,
            Mobile: 1000,
        },
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
        type: "boolean",
        default: false
    },
    stopOnLastSlide: {
        type: "boolean",
        default: false
    },
    reverseDirection: {
        type: "boolean",
        default: false
    },
    slideEffect: {
        type: "string",
        default: "slide"
    },
    carouselEffect: {
        type: "string",
        default: "slide"
    },
    mousewheelControl: {
        type: "boolean",
        default: false
    },
    keyboardNavigation: {
		type: 'boolean',
		default: false
	},
    paginationType: {
        type: "string",
        default: "bullets"
    },
    dynamicBullets: {
        type: "boolean",
		default: false,
    },
    /** End Slider Settings */

    /** Start Show/Hide Elements */
    showAuthorName: {
        type: "boolean",
        default: true,
    },
    showAuthorDesignation: {
        type: "boolean",
        default: true,
    },
    showTestimonialText: {
        type: "boolean",
        default: true,
    },
    showAuthorImage: {
        type: "boolean",
        default: true,
    },
    showRating: {
        type: "boolean",
        default: true,
    },
    showNavigation: {
        type: "object",
        default: {
            Desktop: true,
            Tablet: true,
            Mobile: true,
        },
    },
	showPagination: {
        type: "object",
        default: {
            Desktop: true,
            Tablet: true,
            Mobile: true,
        },
	},
    paginationPositionType: {
        type: "string",
        default: "inside",
    },
    /** End Show/Hide Elements */

    /** Layout & Content Setting */
    layoutHeightSwitcher: {
        type: "string",
        default: "fixed",
    },
    layoutHeight: {
        type: "object",
        default: {
            Desktop: "500",
            Tablet: "400",
            Mobile: "300",
        },
    },
    layoutHeightUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    contentWidth: {
        type: "object",
        default: {
            Desktop: "80",
            Tablet: "80",
            Mobile: "80",
        },
    },
    contentWidthUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    contentAlignment: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    contentVerticalAlignment: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    contentHorizontalAlignment: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    authorNameHtmlTag: {
        type: "string",
        default: "h3",
    },
    authorDesignationHtmlTag: {
        type: "string",
        default: "p",
    },
    testimonialTextHtmlTag: {
        type: "string",
        default: "p",
    },
    /** End Layout & Content Setting */

    /** Start Content Padding */
    contentPaddingUnits: {
        type: "object",
        default: {  
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    contentPaddingDesktop: {
        type: "object", 
        default: {
            top: "30",
            bottom: "30",
            left: "30",
            right: "30",
        },
    },
    contentPaddingDesktopCssStyle: { 
        type: "string",
        default: "",
    },
    contentPaddingTablet: {
        type: "object",  
        default: {
            top: "20",
            bottom: "20",
            left: "20",
            right: "20",
        },
    },
    contentPaddingTabletCssStyle: { 
        type: "string",
        default: "",
    },
    contentPaddingMobile: {
        type: "object",  
        default: {
            top: "15",
            bottom: "15",
            left: "15",
            right: "15",
        },
    },
    contentPaddingMobileCssStyle: { 
        type: "string",
        default: "",
    },
    contentPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Content Padding */

    /** Start Author Name Typography */
    authorNameFontFamily: {
        type: "string",
        default: "",
    },
    authorNameFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorNameFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorNameFontWeight: {
        type: "string",
        default: "",
    },
    authorNameFontStyle: {
        type: "string",
        default: "",
    },
    authorNameTextTransform: {
        type: "string",
        default: "",
    },
    authorNameTextDecoration: {
        type: "string",
        default: "",
    },
    authorNameLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorNameLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorNameLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorNameLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorNameWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    authorNameWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Author Name Typography */

    /** Start Author Name Color */
    authorNameColorSwitcher: {
		type: "string",
		default: "normal",
	},
	authorNameColor: {
		type: "string",
		default: "",
	},
	authorNameColorHover: {
		type: "string",
		default: "",
	},
    /** End Author Name Color */

    /** Start Author Name Margin */
	authorNameMarginUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	authorNameDesktopMargin: {
		type: "object", 
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorNameDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorNameTabletMargin: {
		type: "object",  
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorNameTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorNameMobileMargin: {
		type: "object",  
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorNameMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorNameMarginLink : {
		type : "boolean",
		default: true
	},
    /** End Author Name Margin */

    /** Start Author Name Padding */
	authorNamePaddingUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	authorNameDesktopPadding: {
		type: "object", 
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorNameDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorNameTabletPadding: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorNameTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorNameMobilePadding: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorNameMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorNamePaddingLink : {
		type : "boolean",
		default: true
	},
    /** End Author Name Padding */
    
    /** End Author Name */

    /** Start Author Designation */

    /** Start Author Designation Typography */
    authorDesignationFontFamily: {
        type: "string",
        default: "",
    },
    authorDesignationFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorDesignationFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorDesignationFontWeight: {
        type: "string",
        default: "",
    },
    authorDesignationFontStyle: {
        type: "string",
        default: "",
    },
    authorDesignationTextTransform: {
        type: "string",
        default: "",
    },
    authorDesignationTextDecoration: {
        type: "string",
        default: "",
    },
    authorDesignationLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorDesignationLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorDesignationLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    authorDesignationLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    authorDesignationWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    authorDesignationWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Author Designation Typography */

    /** Start Author Designation Color */
    authorDesignationColorSwitcher: {
		type: "string",
		default: "normal",
	},
	authorDesignationColor: {
		type: "string",
		default: "",
	},
	authorDesignationColorHover: {
		type: "string",
		default: "",
	},
    /** End Author Designation Color */

    /** Start Author Designation Margin */
	authorDesignationMarginUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	authorDesignationDesktopMargin: {
		type: "object", 
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorDesignationDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationTabletMargin: {
		type: "object",  
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorDesignationTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationMobileMargin: {
		type: "object",  
		default: {
			top: "0",
			bottom: "16",
			left: "0",
			right: "0",
		},
	},
    authorDesignationMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationMarginLink : {
		type : "boolean",
		default: true
	},
    /** End Author Designation Margin */

    /** Start Author Designation Padding */
	authorDesignationPaddingUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	authorDesignationDesktopPadding: {
		type: "object", 
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorDesignationDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationTabletPadding: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorDesignationTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationMobilePadding: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    authorDesignationMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
	authorDesignationPaddingLink : {
		type : "boolean",
		default: true
	},
    /** End Author Designation Padding */
    
    /** End Author Designation */

    /** Start Testimonial Text Typography */
    testimonialTextFontFamily: {
        type: "string",
        default: "",
    },
    testimonialTextFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    testimonialTextFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    testimonialTextFontWeight: {
        type: "string",
        default: "",
    },
    testimonialTextFontStyle: {
        type: "string",
        default: "",
    },
    testimonialTextTextTransform: {
        type: "string",
        default: "",
    },
    testimonialTextTextDecoration: {
        type: "string",
        default: "",
    },
    testimonialTextLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    testimonialTextLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    testimonialTextLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    testimonialTextLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    testimonialTextWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    testimonialTextWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Testimonial Text Typography */

    /** Start Testimonial Text Color */
    testimonialTextColorSwitcher: {
        type: "string",
        default: "normal",
    },
    testimonialTextColor: {
        type: "string",
        default: "",
    },
    testimonialTextColorHover: {
        type: "string",
        default: "",
    },
    /** End Testimonial Text Color */

    /** Start Testimonial Text Margin */
    testimonialTextMarginUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    testimonialTextDesktopMargin: {
        type: "object", 
        default: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0",
        },
    },
    testimonialTextDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextTabletMargin: {
        type: "object",  
        default: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0",
        },
    },
    testimonialTextTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextMobileMargin: {
        type: "object",  
        default: {
            top: "0",
            bottom: "16",
            left: "0",
            right: "0",
        },
    },
    testimonialTextMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextMarginLink : {
        type : "boolean",
        default: true
    },
    /** End Testimonial Text Margin */

    /** Start Testimonial Text Padding */
    testimonialTextPaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    testimonialTextDesktopPadding: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    testimonialTextDesktopPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextTabletPadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    testimonialTextTabletPaddingCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextMobilePadding: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    testimonialTextMobilePaddingCssStyle: { 
        type: "string",
        default: "",
    },
    testimonialTextPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Testimonial Text Padding */
    
    /** End Testimonial Text */

    /** Start Navigation Custom Arrows */
    navigationArrowsIconSwitcher: {
        type: "boolean",
        default: false,
    },

	navigationArrowsIconLeftAlign: {
		type: "string",
		default: "icon",
	},

	navigationArrowsIconLeft: {
		type: 'string',
		default: 'arrow-left',
	},

	navigationArrowsIconLeftImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconLeftImageAlt: {
		type: 'string',
		default: 'Left Arrow',
	},
	navigationArrowsIconLeftImageID: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconRightAlign: {
		type: "string",
		default: "icon",
	},

	navigationArrowsIconRight: {
		type: 'string',
		default: 'arrow-right',
	},

	navigationArrowsIconRightImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconRightImageAlt: {
		type: 'string',
		default: 'Right Arrow',
	},
	navigationArrowsIconRightImageID: {
		type: 'string',
		default: '',
	},
    /** End Navigation Custom Arrows */

    /** Start Navigation Arrow Size */
	navigationArrowSize: {
		type: "object",
		default: {
			Desktop: "16",
			Tablet: "16",
			Mobile: "14",
		},
	},
	navigationArrowSizeUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
    /** End Navigation Arrow Size */

    /** Start Navigation Arrow Color */
	navigationArrowColorSwitcher: {
		type: "string",
		default: "normal",
	},
	navigationArrowColor: {
		type: "string",
		default: "#333333",
	},
	navigationArrowColorHover: {
		type: "string",
		default: "",
	},
    /** End Navigation Arrow Color */

    /** Start Navigation Arrow Background */
    navigationArrowNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    navigationArrowNormalClassicColor: {
        type: "string",
        default: "#d2d2d2c7",
    },
    navigationArrowNormalGradientColor: {
        type: "string",
        default: null,
    },
    navigationArrowNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    navigationArrowNormalCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    navigationArrowHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    navigationArrowHoverClassicColor: {
        type: "string",
        default: "#787878b8",
    },
    navigationArrowHoverGradientColor: {
        type: "string",
        default: null,
    },
    navigationArrowHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    navigationArrowHoverCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    /** End Navigation Arrow Background */

    /** Start Navigation Arrow Width & Height */
	navigationArrowWidth: {
		type: "object",
		default: {
			Desktop: "46",
			Tablet: "46",
			Mobile: "32",
		},
	},
	navigationArrowWidthUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	navigationArrowHeight: {
		type: "object",
		default: {
			Desktop: "46",
			Tablet: "46",
			Mobile: "32",
		},
	},
	navigationArrowHeightUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
    /** End Navigation Arrow Width & Height */

    /** Start Navigation Arrow Border */
	navigationArrowBorder: {
		type: "string",
		default: "none",
	},
	navigationArrowBorderColorSwitcher : {
		type: "string",
		default: "normal"
	},
	navigationArrowBorderColor: {
		type: "string",
		default: "",
	},
	navigationArrowBorderHoverColor: {
		type: "string",
		default: "",
	},
	navigationArrowBorderUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	navigationArrowDesktopBorder: {
		type: "object",
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    navigationArrowDesktopBorderCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowTabletBorder: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    navigationArrowTabletBorderCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowMobileBorder: {
		type: "object", 
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    navigationArrowMobileBorderCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowBorderLink : {
		type : "boolean",
		default: true
	},
    /** End Navigation Arrow Border */

    /** Start Navigation Arrow Border Radius */
	navigationArrowBorderRadiusUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	navigationArrowDesktopBorderRadius: {
		type: "object", 
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    navigationArrowDesktopBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowTabletBorderRadius: {
		type: "object",  
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    navigationArrowTabletBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowMobileBorderRadius: {
		type: "object",  
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    navigationArrowMobileBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
	navigationArrowBorderRadiusLink : {
		type : "boolean",
		default: true
	},
    /** End Navigation Arrow Border Radius */

    /** Start Navigation Arrow Box Shadow */
    navigationArrowBoxShadowValuesSwitcher : {
		type: "string",
		default: "normal"
	},
	navigationArrowBoxShadowValues: {
        type: "array",
        default: [],
    },
    navigationArrowBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    navigationArrowBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    navigationArrowBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End Navigation Arrow Box Shadow */
    
    /** Start Navigation Arrow Position */
    navigationArrowPositionType: {
        type: "string",
        default: "inside",
    },

    navigationArrowPosition: {
        type: "string",
        default: "center",
    },
    navigationArrowDirection: {
        type: "string",
        default: "row",
    },
    navigationArrowPositionTopOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionTopOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionLeftOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionLeftOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionRightOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionRightOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowPositionBottomOffset: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: "",
        },
    },
    navigationArrowPositionBottomOffsetUnits: {
        type: "object",
        default: {
            Desktop: "%",
            Tablet: "%",
            Mobile: "%",
        },
    },
    navigationArrowGap: {
        type: "object",
        default: {
            Desktop: "10",
            Tablet: "10",
            Mobile: "10",
        },
    },
    navigationArrowGapUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    navigationArrowPositionOutsidePadding: {
        type: "object",
        default: {
            Desktop: "60",
            Tablet: "60",
            Mobile: "45",
        },
    },
    navigationArrowPositionOutsidePaddingUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px",
        },
    },
    /** End Navigation Arrow Position */

    /** Start Pagination Dots Margin */
	paginationDotsMarginUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	paginationDotsDesktopMargin: {
		type: "object", 
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationDotsDesktopMarginCssStyle: { 
        type: "string",
        default: "",
    },
	paginationDotsTabletMargin: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationDotsTabletMarginCssStyle: { 
        type: "string",
        default: "",
    },
	paginationDotsMobileMargin: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationDotsMobileMarginCssStyle: { 
        type: "string",
        default: "",
    },
	paginationDotsMarginLink : {
		type : "boolean",
		default: true
	},
    /** End Pagination Dots Margin */

    /** Start Pagination Dots Position */
    paginationDotsPosition: {
		type: "object",
		default: {
			Desktop: "",
			Tablet: "",
			Mobile: "",
		},
	},
	paginationDotsPositionUnits: {
		type: "object",
		default: {
			Desktop: "%",
			Tablet: "%",
			Mobile: "%",
		},
	},
    paginationProgressbarPosition: {
		type: "object",
		default: {
			Desktop: "",
			Tablet: "",
			Mobile: "",
		},
	},
	paginationProgressbarPositionUnits: {
		type: "object",
		default: {
			Desktop: "%",
			Tablet: "%",
			Mobile: "%",
		},
	},
    /** End Pagination Dots Position */

    /** Start Pagination Dots Style */
    paginationDotsSwitcher: {
		type: "string",
		default: "normal",
	},
	paginationNormalDotsBgColor: {
		type: "string",
		default: "#333333",
	},
	paginationActiveDotsBgColor: {
		type: "string",
		default: "",
	},
	paginationNormalDotsWidth: {
		type: "object",
		default: {
			Desktop: "8",
			Tablet: "8",
			Mobile: "8",
		},
	},
	paginationNormalDotsWidthUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	paginationNormalDotsHeight: {
		type: "object",
		default: {
			Desktop: "8",
			Tablet: "8",
			Mobile: "8",
		},
	},
	paginationNormalDotsHeightUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
    /** End Pagination Dots Style */

    /** Start Pagination Dots Border */
    paginationNormalDotsBorder: { 
		type: "string",
		default: "none",
	},
	paginationNormalDotsBorderColorSwitcher : {
		type: "string",
		default: "normal"
	},
	paginationNormalDotsBorderColor: {
		type: "string",
		default: ""
	},
	paginationNormalDotsBorderHoverColor: {
		type: "string",
	},
    
    paginationNormalDotsBorderUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	paginationNormalDotsDesktopBorder: {
		type: "object", 
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationNormalDotsDesktopBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsTabletBorder: {
		type: "object",  
		default: {  
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationNormalDotsTabletBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsMobileBorder: {
		type: "object",  
		default: {
			top: "",
			bottom: "",
			left: "",
			right: "",
		},
	},
    paginationNormalDotsMobileBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsBorderLink : {
		type : "boolean",
		default: true
	},
    /** End Pagination Dots Border */

    /** Start Pagination Dots Border Radius */
    paginationNormalDotsBorderRadius: {
		type: "object",
		default: {
			Desktop: "",
			Tablet: "",
			Mobile: "",
		},
	},
    paginationNormalDotsBorderRadiusUnits: {
		type: "object",
		default: {  
			Desktop: "px",
			Tablet: "px",
			Mobile: "px"
		}
	},
    paginationNormalDotsDesktopBorderRadius: {
		type: "object", 
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    paginationNormalDotsDesktopBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsTabletBorderRadius: {
		type: "object",  
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    paginationNormalDotsTabletBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsMobileBorderRadius: {
		type: "object",  
		default: {
			top: "50",
			bottom: "50",
			left: "50",
			right: "50",
		},
	},
    paginationNormalDotsMobileBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationNormalDotsBorderRadiusLink : {
		type : "boolean",
		default: true
	},
    /** End Pagination Dots Border Radius */

    /** Start Active Pagination Dots Width & Height */
    paginationActiveDotsWidth: {
		type: "object",
		default: {
			Desktop: "",
			Tablet: "",
			Mobile: "",
		},
	},
	paginationActiveDotsWidthUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
	paginationActiveDotsHeight: {
		type: "object",
		default: {
			Desktop: "",
			Tablet: "",
			Mobile: "",
		},
	},
	paginationActiveDotsHeightUnits: {
		type: "object",
		default: {
			Desktop: "px",
			Tablet: "px",
			Mobile: "px",
		},
	},
    /** End Active Pagination Dots Width & Height */

    /** Start Active Pagination Dots Border */
    paginationActiveDotsBorder: { 
        type: "string",
        default: "none",
    },
    paginationActiveDotsBorderColorSwitcher : {
        type: "string",
        default: "normal"
    },
    paginationActiveDotsBorderColor: {
        type: "string",
        default: ""
    },
    paginationActiveDotsBorderHoverColor: {
        type: "string",
    },
    
    paginationActiveDotsBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    paginationActiveDotsDesktopBorder: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsDesktopBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsTabletBorder: {
        type: "object",  
        default: {  
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsTabletBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsMobileBorder: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsMobileBorderCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsBorderLink : {
        type : "boolean",
        default: true
    },
    /** End Active Pagination Dots Border */

    /** Start Active Pagination Dots Border Radius */
    paginationActiveDotsBorderRadiusUnits: {
        type: "object",
        default: {  
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    paginationActiveDotsDesktopBorderRadius: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsDesktopBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsTabletBorderRadius: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsTabletBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsMobileBorderRadius: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    paginationActiveDotsMobileBorderRadiusCssStyle: { 
        type: "string",
        default: "",
    },
    paginationActiveDotsBorderRadiusLink : {
        type : "boolean",
        default: true
    },
    /** End Active Pagination Dots Border Radius */

    /** Start Fraction Typography */
    paginationFractionFontFamily: {
        type: "string",
        default: "",
    },
    paginationFractionFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionFontWeight: {
        type: "string",
        default: "",
    },
    paginationFractionFontStyle: {
        type: "string",
        default: "",
    },
    paginationFractionTextTransform: {
        type: "string",
        default: "",
    },
    paginationFractionTextDecoration: {
        type: "string",
        default: "",
    },
    paginationFractionLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    paginationFractionLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    paginationFractionWordSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },  
    paginationFractionWordSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Fraction Typography */

    /** Start Fraction Color */
    paginationFractionColorSwitcher: {
        type: "string",
        default: "normal",
    },
    paginationFractionColor: {
        type: "string",
        default: "",
    },
    paginationFractionColorHover: {
        type: "string",
        default: "",
    },
    /** End Fraction Color */

    /** Start Progressbar */
	paginationProgressbarBGColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationProgressbarBGColor: {
		type: 'string',
		default: '',
	},
	paginationProgressbarBGActiveColor: {
		type: 'string',
	},
	paginationProgressbarHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationProgressbarHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Progressbar */


    /** Start Global Setting */

    /** Start Global Margin */
    globalMarginUnits: {
        type: "object",
        default: {  
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalMarginDesktop: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginDesktopCssStyle: { 
        type: "string",
        default: "",
    },
    globalMarginTablet: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginTabletCssStyle: { 
        type: "string",
        default: "",
    },
    globalMarginMobile: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalMarginMobileCssStyle: { 
        type: "string",
        default: "",
    },
    globalMarginLink : {
        type : "boolean",
        default: true
    },
    /** End Global Margin */

    /** Start Global Padding */
    globalPaddingUnits: {
        type: "object",
        default: {  
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalPaddingDesktop: {
        type: "object", 
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingDesktopCssStyle: { 
        type: "string",
        default: "",
    },
    globalPaddingTablet: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingTabletCssStyle: { 
        type: "string",
        default: "",
    },
    globalPaddingMobile: {
        type: "object",  
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalPaddingMobileCssStyle: { 
        type: "string",
        default: "",
    },
    globalPaddingLink : {
        type : "boolean",
        default: true
    },
    /** End Global Padding */

    /** Start Global Z-Index */
	globalZIndex: {
        type: "object",
        default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
        }
    },
    globalID: {
        type: "string",
        default: "",
    },
    globalClass: {
        type: "string",
        default: "",
    },
    /** End Global Z-Index */

    /** Start Global Background */     
    globalNormalBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalNormalClassicColor: {
        type: "string",
        default: "",
    },
    globalNormalGradientColor: {
        type: "string",
        default: null,
    },
    globalNormalCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalNormalCustomGradientInputValue: {
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

    globalHoverBackgroundType: {
        type: "string",
        default: "classic",
    },
    globalHoverClassicColor: {
        type: "string",
        default: "",
    },
    globalHoverGradientColor: {
        type: "string",
        default: null,
    },
    globalHoverCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    globalHoverCustomGradientInputValue: {
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
    /** End Global Background */

    /** Start Global Border */
    globalBorder: {
        type: "string",
        default: "none",
    },
    globalBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    globalBorderColor: {
        type: "string",
    },
    globalBorderHoverColor: {
        type: "string",
    },
    globalBorderUnits: {
        type: "object",
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalBorderDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderDesktopCssStyle: { 
        type: "string",
        default: "",
    },
    globalBorderTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderTabletCssStyle: { 
        type: "string",
        default: "",
    },
    globalBorderMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderMobileCssStyle: { 
        type: "string",
        default: "",
    },
    globalBorderLink: {
        type: "boolean",
        default: true
    },
    globalBorderRadiusUnits: {
        type: 'object',
        default: {
            Desktop: "px",
            Tablet: "px",
            Mobile: "px"
        }
    },
    globalBorderRadiusDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    globalBorderRadiusTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    globalBorderRadiusMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    globalBorderRadiusMobileCssStyle: { 
        type: "string",
        default: "",
    },
    globalBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    globalBoxShadowValuesSwitcher : {
        type: "string",
        default: "normal"
    },
    globalBoxShadowValues: {
        type: "array",
        default: [],
    },
    globalBoxShadowCssValue: {
        type: "string",
        default: "",
    },
    globalBoxShadowHoverValues: {
        type: "array",
        default: [],
    },
    globalBoxShadowHoverCssValue: {
        type: "string",
        default: "",
    },
    /** End Global Border */


    /** Start Global Custom CSS */
    globalCustomCSS: {
        type: "string",
        default: "",
    },
    /** End Global Custom CSS */
};

export default attributes;
