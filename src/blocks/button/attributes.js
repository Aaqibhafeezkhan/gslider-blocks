const attributes = {
    blockId: {
        type: "string",
        default: ""
    },
    deviceType: {
        type: "string",
        default: "Desktop"
    },
    buttonAlignment: {
        type: "string",
        default: "left",
    },
    buttonText: {
        type: "string",
        default: "Add Text",
    },
    buttonUrl: {
        type: "string",
        default: "",
    },
    buttonTargetUrl: {
        type: "boolean",
    },
    buttonWidth: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    buttonWidthUnits: {
        type: 'object',
        default: {
            Desktop: '%',
            Tablet: '%',
            Mobile: '%',
        }
    },

    /** Start Typography */
    buttonFontFamily: {
        type: "string",
        default: "",
    },
    buttonFontSize: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    buttonFontSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    buttonFontWeight: {
        type: "string",
        default: "",
    },
    buttonFontStyle: {
        type: "string",
        default: "",
    },
    buttonTextTransform: {
        type: "string",
        default: "",
    },
    buttonTextDecoration: {
        type: "string",
        default: "",
    },
    buttonLetterSpacing: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    buttonLetterSpacingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    buttonLineHeight: {
        type: 'object',
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },
    buttonLineHeightUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Typography */

    /** Start Color */
    buttonColorSwitcher: {
        type: "string",
        default: "normal"
    },
    buttonColor: {
        type: "string",
        default: "#ffffff",
    },
    buttonHoverColor: {
        type: 'string',
    },
    /** End Color */

    /** Start Background */
    buttonBgColorSwitcher : {
		type: "string",
		default: "normal"
	},
	buttonBgType: {  
		type: "string",
		default: "classic",
	},
	buttonBgClassicColor: {
		type: "string",
		default: "#2563eb",
	},
	buttonBgGradientColor: {
		type: "string",
		default: null,
	},
	buttonBgCustomGradientSwitcher: {
		type: "boolean",
		default: false,
	},
	buttonBgCustomGradientInputValue: {
		type: "string",
		default: "",
	},

	buttonHoverBgType: {
		type: "string",
		default: "classic",
	},
	buttonHoverBgClassicColor: {
		type: "string",
		default: "",
	},
	buttonHoverBgGradientColor: {
		type: "string",
		default: null,
	},
	buttonHoverBgCustomGradientSwitcher: {
		type: "boolean",
		default: false,
	},
	buttonHoverBgCustomGradientInputValue: {
		type: "string",
		default: "",
	},
	/** End Background */

    /** Start Padding */
    buttonPaddingUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonPaddingDesktop: {
        type: "object",
        default: {
            top: "12",
            bottom: "12",
            left: "24",
            right: "24",
        },
    },
    buttonPaddingDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonPaddingTablet: {
        type: "object",
        default: {
            top: "12",
            bottom: "12",
            left: "24",
            right: "24",
        },
    },
    buttonPaddingTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonPaddingMobile: {
        type: "object",
        default: {
            top: "12",
            bottom: "12",
            left: "24",
            right: "24",
        },
    },
    buttonPaddingMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonPaddingLink: {
        type: "boolean",
        default: true
    },
    /** End Padding */

    /** Start Margin */
    buttonMarginUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonMarginDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonMarginDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonMarginTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonMarginTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonMarginMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonMarginMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonMarginLink: {
        type: "boolean",
        default: true
    },
    /** End Margin */

    /** Start Border */
    buttonBorder: {
        type: 'string',
        default: "none",
    },
    buttonBorderColorSwitcher: {
        type: "string",
        default: "normal"
    },
    buttonBorderColor: {
        type: 'string',
    },
    buttonBorderHoverColor: {
        type: 'string',
    },
    buttonBorderUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonBorderDesktop: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonBorderDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderTablet: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonBorderTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderMobile: {
        type: "object",
        default: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
    },
    buttonBorderMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderLink: {
        type: "boolean",
        default: true
    },
    buttonBorderRadiusUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonBorderRadiusDesktop: {
        type: "object",
        default: {
            top: "4",
            bottom: "4",
            left: "4",
            right: "4",
        },
    },
    buttonBorderRadiusDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderRadiusTablet: {
        type: "object",
        default: {
            top: "4",
            bottom: "4",
            left: "4",
            right: "4",
        },
    },
    buttonBorderRadiusTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderRadiusMobile: {
        type: "object",
        default: {
            top: "4",
            bottom: "4",
            left: "4",
            right: "4",
        },
    },
    buttonBorderRadiusMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonBorderRadiusLink: {
        type: "boolean",
        default: true
    },
    buttonboxShadowValuesSwitcher : {
		type: "string",
		default: "normal"
	},
    buttonboxShadowValues: {
        type: 'array',
        default: [],
    },
    buttonboxShadowCssValue: {
        type: 'string',
        default: '',
    },
    buttonboxShadowHoverValues: {
        type: 'array',
        default: [],
    },
    buttonboxShadowHoverCssValue: {
        type: 'string',
        default: '',
    },
    /** End Border */

    /** Icon Settings */
    buttonIconAlign: {
        type: "string",
        default: "none",
    },
    buttonIcon: {
        type: 'string',
        default: 'angle-right',
    },
    buttonIconPosition: {
        type: "string",
        default: "right",
    },
    /** End Icon Settings */

    /** Icon Styles */
    buttonIconSize: {
        type: 'object',
        default: {
            Desktop: "16",
            Tablet: "16",
            Mobile: "16",
        }
    },
    buttonIconSizeUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    buttonIconColorSwitcher: {
        type: "string",
        default: "normal"
    },
    buttonIconColor: {
        type: "string",
        default: "#fff"
    },
    buttonIconHoverColor: {
        type: 'string',
        default: ""
    },

    buttonIconBgColorSwitcher : {
        type: "string",
        default: "normal"
    },
    buttonIconBgColor : {
        type: "string",
        default: ""
    },
    buttonIconBgHoverColor: {
        type: 'string',
        default: ""
    },
    buttonIconBorder: {
        type: 'string',
        default: "none",
    },
    buttonIconBorderColorSwitcher : {
        type: "string",
        default: "normal"
    },
    buttonIconBorderColor: {
        type: 'string',
    },
    buttonIconBorderHoverColor: {
        type: 'string',
    },
    buttonIconBorderUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonIconBorderDesktop: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderTablet: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderMobile: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderLink : {
        type : "boolean",
        default: true
    },
    buttonIconBorderRadiusUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px'
        }
    },
    buttonIconBorderRadiusDesktop: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderRadiusDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderRadiusTablet: {
        type: "object", 
        default: {
            top: '', 
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderRadiusTabletCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderRadiusMobile: {
        type: "object", 
        default: {
            top: '',
            bottom: '',
            left: '',
            right: '',
        },
    },
    buttonIconBorderRadiusMobileCssStyle: { 
        type: 'string',
        default: '',
    },
    buttonIconBorderRadiusLink : {
        type : "boolean",
        default: true
    },
    buttonIconGapSize: {
        type: 'object',
        default: {
            Desktop: "10",
            Tablet: "10",
            Mobile: "10",
        }
    },
    buttonIconGapUnits: {
        type: 'object',
        default: {
            Desktop: 'px',
            Tablet: 'px',
            Mobile: 'px',
        }
    },
    /** End Icon Styles */

    /** global Style */
    buttonZIndex : {
        type: "object",
        default: {
            Desktop: '',
            Tablet: '',
            Mobile: ''
        }
    },

    /** Start Background */
    buttonGlobalBgColorSwitcher : {
        type: "string",
        default: "normal"
    },
    buttonGlobalBgType: {  
        type: "string",
        default: "classic",
    },
    buttonGlobalBgClassicColor: {
        type: "string",
        default: "",
    },
    buttonGlobalBgGradientColor: {
        type: "string",
        default: null,
    },
    buttonGlobalBgCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    buttonGlobalBgCustomGradientInputValue: {
        type: "string",
        default: "",
    },

    buttonGlobalHoverBgType: {
        type: "string",
        default: "classic",
    },
    buttonGlobalHoverBgClassicColor: {
        type: "string",
        default: "",
    },
    buttonGlobalHoverBgGradientColor: {
        type: "string",
        default: null,
    },
    buttonGlobalHoverBgCustomGradientSwitcher: {
        type: "boolean",
        default: false,
    },
    buttonGlobalHoverBgCustomGradientInputValue: {
        type: "string",
        default: "",
    },
    /** End Background */

    /** Start Padding */
	buttonGlobalPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	buttonGlobalPaddingDesktop: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalPaddingDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalPaddingTablet: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalPaddingTabletCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalPaddingMobile: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalPaddingMobileCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalPaddingLink : {
		type : "boolean",
		default: true
	},
	/** End Padding */

	/** Start Margin */
	buttonGlobalMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	buttonGlobalMarginDesktop: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalMarginDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalMarginTablet: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalMarginTabletCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalMarginMobile: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalMarginMobileCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalMarginLink : {
		type : "boolean",
		default: true
	},
	/** End Margin */

	/** Start Border */
	buttonGlobalBorder: {
		type: 'string',
		default: "none",
	},
	buttonGlobalBorderColorSwitcher : {
		type: "string",
		default: "normal"
	},
	buttonGlobalBorderColor: {
		type: 'string',
		default: ""
	},
	buttonGlobalBorderHoverColor: {
		type: 'string',
	},
	buttonGlobalBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	buttonGlobalBorderDesktop: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderTablet: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderTabletCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderMobile: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderMobileCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderLink : {
		type : "boolean",
		default: true
	},
	/** End Border */

	/** Start Border Radius */
	buttonGlobalBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px'
		}
	},
	buttonGlobalBorderRadiusDesktop: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderRadiusDesktopCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderRadiusTablet: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderRadiusTabletCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderRadiusMobile: {
		type: "object", 
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
    buttonGlobalBorderRadiusMobileCssStyle: { 
        type: 'string',
        default: '',
    },
	buttonGlobalBorderRadiusLink : {
		type : "boolean",
		default: true
	},
	/** End Border Radius */

	/** Start Box Shadow */
    buttonGlobalBoxShadowValuesSwitcher : {
		type: "string",
		default: "normal"
	},
	buttonGlobalBoxShadowValues: {
        type: 'array',
        default: [],
    },
    buttonGlobalBoxShadowCssValue: {
        type: 'string',
        default: '',
    },
    buttonGlobalBoxShadowHoverValues: {
        type: 'array',
        default: [],
    },
    buttonGlobalBoxShadowHoverCssValue: {
        type: 'string',
        default: '',
    },
    /** End Global Style */
    blockStyle: {
        type: 'string',
        default: '',
    },
    
}
export default attributes;

