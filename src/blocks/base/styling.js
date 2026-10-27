/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-tag-names */
/**
 * Base Slider Block - Style Generation
 * Returns Dynamic Generated CSS
 */

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @returns {string} CSS string
 */
const generateBaseSliderStyle = ( attributes ) => {
	const {
		blockId,
		deviceType,
		sliderItems,
		blockStyle,
		sliderType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		slideEffect,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		/** Start Show/Hide Elements */
		showSubTitle,
		showTitle,
		showDescription,
		showButton,
		showNavigation,
		showPagination,
		paginationPositionType,
		/** End Show/Hide Elements */

		/** Start Layout & Content Setting */
		layoutHeightSwitcher,
		layoutHeight,
		layoutHeightUnits,
		contentWidth,
		contentWidthUnits,
		contentAlignment,
		contentVerticalAlignment,
		contentHorizontalAlignment,
		subTitleHtmlTag,
		titleHtmlTag,
		descriptionHtmlTag,
		/** End Layout & Content Setting */

		/** Start Content Padding */
		contentPaddingUnits,
		contentPaddingDesktop,
		contentPaddingDesktopCssStyle,
		contentPaddingTablet,
		contentPaddingTabletCssStyle,
		contentPaddingMobile,
		contentPaddingMobileCssStyle,
		contentPaddingLink,
		/** End Content Padding */

		/** Start Subtitle Typography, Color, Margin & Padding */
		subtitleFontFamily,
		subtitleFontSize,
		subtitleFontSizeUnits,
		subtitleFontWeight,
		subtitleFontStyle,
		subtitleTextTransform,
		subtitleTextDecoration,
		subtitleLineHeight,
		subtitleLineHeightUnits,
		subtitleLetterSpacing,
		subtitleLetterSpacingUnits,
		subtitleWordSpacing,
		subtitleWordSpacingUnits,

		subtitleColorSwitcher,
		subtitleColor,
		subtitleColorHover,

		subtitleMarginUnits,
		subtitleDesktopMargin,
		subtitleDesktopMarginCssStyle,
		subtitleTabletMargin,
		subtitleTabletMarginCssStyle,
		subtitleMobileMargin,
		subtitleMobileMarginCssStyle,
		subtitleMarginLink,

		subtitlePaddingUnits,
		subtitleDesktopPadding,
		subtitleDesktopPaddingCssStyle,
		subtitleTabletPadding,
		subtitleTabletPaddingCssStyle,
		subtitleMobilePadding,
		subtitleMobilePaddingCssStyle,
		subtitlePaddingLink,
		/** End Subtitle Typography, Color, Margin & Padding */

		/** Start Title Typography, Color, Margin & Padding */
		titleFontFamily,
		titleFontSize,
		titleFontSizeUnits,
		titleFontWeight,
		titleFontStyle,
		titleTextTransform,
		titleTextDecoration,
		titleLineHeight,
		titleLineHeightUnits,
		titleLetterSpacing,
		titleLetterSpacingUnits,
		titleWordSpacing,
		titleWordSpacingUnits,

		titleColorSwitcher,
		titleColor,
		titleColorHover,

		titleMarginUnits,
		titleDesktopMargin,
		titleDesktopMarginCssStyle,
		titleTabletMargin,
		titleTabletMarginCssStyle,
		titleMobileMargin,
		titleMobileMarginCssStyle,
		titleMarginLink,

		titlePaddingUnits,
		titleDesktopPadding,
		titleDesktopPaddingCssStyle,
		titleTabletPadding,
		titleTabletPaddingCssStyle,
		titleMobilePadding,
		titleMobilePaddingCssStyle,
		titlePaddingLink,
		/** End Title Typography, Color, Margin & Padding */

		/** Start Description Typography, Color, Margin & Padding */
		descriptionFontFamily,
		descriptionFontSize,
		descriptionFontSizeUnits,
		descriptionFontWeight,
		descriptionFontStyle,
		descriptionTextTransform,
		descriptionTextDecoration,
		descriptionLineHeight,
		descriptionLineHeightUnits,
		descriptionLetterSpacing,
		descriptionLetterSpacingUnits,
		descriptionWordSpacing,
		descriptionWordSpacingUnits,

		descriptionColorSwitcher,
		descriptionColor,
		descriptionColorHover,

		descriptionMarginUnits,
		descriptionDesktopMargin,
		descriptionDesktopMarginCssStyle,
		descriptionTabletMargin,
		descriptionTabletMarginCssStyle,
		descriptionMobileMargin,
		descriptionMobileMarginCssStyle,
		descriptionMarginLink,

		descriptionPaddingUnits,
		descriptionDesktopPadding,
		descriptionDesktopPaddingCssStyle,
		descriptionTabletPadding,
		descriptionTabletPaddingCssStyle,
		descriptionMobilePadding,
		descriptionMobilePaddingCssStyle,
		descriptionPaddingLink,
		/** End Description Typography, Color, Margin & Padding */

		/** Start Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
		primaryButtonFontFamily,
		primaryButtonFontSize,
		primaryButtonFontSizeUnits,
		primaryButtonFontWeight,
		primaryButtonFontStyle,
		primaryButtonTextTransform,
		primaryButtonTextDecoration,
		primaryButtonLineHeight,
		primaryButtonLineHeightUnits,
		primaryButtonLetterSpacing,
		primaryButtonLetterSpacingUnits,
		primaryButtonWordSpacing,
		primaryButtonWordSpacingUnits,

		primaryButtonColorSwitcher,
		primaryButtonColor,
		primaryButtonColorHover,

		primaryButtonNormalBackgroundType,
		primaryButtonNormalClassicColor,
		primaryButtonNormalGradientColor,
		primaryButtonNormalCustomGradientSwitcher,
		primaryButtonNormalCustomGradientInputValue,
		primaryButtonHoverBackgroundType,
		primaryButtonHoverClassicColor,
		primaryButtonHoverGradientColor,
		primaryButtonHoverCustomGradientSwitcher,
		primaryButtonHoverCustomGradientInputValue,

		primaryButtonBorder,
		primaryButtonBorderColorSwitcher,
		primaryButtonBorderColor,
		primaryButtonBorderHoverColor,
		primaryButtonBorderUnits,
		primaryButtonDesktopBorder,
		primaryButtonDesktopBorderCssStyle,
		primaryButtonTabletBorder,
		primaryButtonTabletBorderCssStyle,
		primaryButtonMobileBorder,
		primaryButtonMobileBorderCssStyle,
		primaryButtonBorderLink,

		primaryButtonBorderRadiusUnits,
		primaryButtonDesktopBorderRadius,
		primaryButtonDesktopBorderRadiusCssStyle,
		primaryButtonTabletBorderRadius,
		primaryButtonTabletBorderRadiusCssStyle,
		primaryButtonMobileBorderRadius,
		primaryButtonMobileBorderRadiusCssStyle,
		primaryButtonBorderRadiusLink,

		primaryButtonBoxShadowValuesSwitcher,
		primaryButtonBoxShadowValues,
		primaryButtonBoxShadowCssValue,
		primaryButtonBoxShadowHoverValues,
		primaryButtonBoxShadowHoverCssValue,

		primaryButtonMarginUnits,
		primaryButtonDesktopMargin,
		primaryButtonDesktopMarginCssStyle,
		primaryButtonTabletMargin,
		primaryButtonTabletMarginCssStyle,
		primaryButtonMobileMargin,
		primaryButtonMobileMarginCssStyle,
		primaryButtonMarginLink,

		primaryButtonPaddingUnits,
		primaryButtonDesktopPadding,
		primaryButtonDesktopPaddingCssStyle,
		primaryButtonTabletPadding,
		primaryButtonTabletPaddingCssStyle,
		primaryButtonMobilePadding,
		primaryButtonMobilePaddingCssStyle,
		primaryButtonPaddingLink,
		/** End Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

		/** Start Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
		secondaryButtonFontFamily,
		secondaryButtonFontSize,
		secondaryButtonFontSizeUnits,
		secondaryButtonFontWeight,
		secondaryButtonFontStyle,
		secondaryButtonTextTransform,
		secondaryButtonTextDecoration,
		secondaryButtonLineHeight,
		secondaryButtonLineHeightUnits,
		secondaryButtonLetterSpacing,
		secondaryButtonLetterSpacingUnits,
		secondaryButtonWordSpacing,
		secondaryButtonWordSpacingUnits,

		secondaryButtonColorSwitcher,
		secondaryButtonColor,
		secondaryButtonColorHover,

		secondaryButtonNormalBackgroundType,
		secondaryButtonNormalClassicColor,
		secondaryButtonNormalGradientColor,
		secondaryButtonNormalCustomGradientSwitcher,
		secondaryButtonNormalCustomGradientInputValue,
		secondaryButtonHoverBackgroundType,
		secondaryButtonHoverClassicColor,
		secondaryButtonHoverGradientColor,
		secondaryButtonHoverCustomGradientSwitcher,
		secondaryButtonHoverCustomGradientInputValue,

		secondaryButtonBorder,
		secondaryButtonBorderColorSwitcher,
		secondaryButtonBorderColor,
		secondaryButtonBorderHoverColor,
		secondaryButtonBorderUnits,
		secondaryButtonDesktopBorder,
		secondaryButtonDesktopBorderCssStyle,
		secondaryButtonTabletBorder,
		secondaryButtonTabletBorderCssStyle,
		secondaryButtonMobileBorder,
		secondaryButtonMobileBorderCssStyle,
		secondaryButtonBorderLink,

		secondaryButtonBorderRadiusUnits,
		secondaryButtonDesktopBorderRadius,
		secondaryButtonDesktopBorderRadiusCssStyle,
		secondaryButtonTabletBorderRadius,
		secondaryButtonTabletBorderRadiusCssStyle,
		secondaryButtonMobileBorderRadius,
		secondaryButtonMobileBorderRadiusCssStyle,
		secondaryButtonBorderRadiusLink,

		secondaryButtonBoxShadowValuesSwitcher,
		secondaryButtonBoxShadowValues,
		secondaryButtonBoxShadowCssValue,
		secondaryButtonBoxShadowHoverValues,
		secondaryButtonBoxShadowHoverCssValue,

		secondaryButtonMarginUnits,
		secondaryButtonDesktopMargin,
		secondaryButtonDesktopMarginCssStyle,
		secondaryButtonTabletMargin,
		secondaryButtonTabletMarginCssStyle,
		secondaryButtonMobileMargin,
		secondaryButtonMobileMarginCssStyle,
		secondaryButtonMarginLink,

		secondaryButtonPaddingUnits,
		secondaryButtonDesktopPadding,
		secondaryButtonDesktopPaddingCssStyle,
		secondaryButtonTabletPadding,
		secondaryButtonTabletPaddingCssStyle,
		secondaryButtonMobilePadding,
		secondaryButtonMobilePaddingCssStyle,
		secondaryButtonPaddingLink,
		/** End Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */

		/** Start Navigation Custom Arrows */
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,
		navigationArrowsIconLeftImageID,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,
		navigationArrowsIconRightImageID,
		/** End Navigation Custom Arrows */

		/** Start Arrows Style */
		navigationArrowSize,
		navigationArrowSizeUnits,

		/** Start Arrows Color */
		navigationArrowColorSwitcher,
		navigationArrowColor,
		navigationArrowColorHover,
		/** End Arrows Color */

		/** Start Background */
		navigationArrowNormalBackgroundType,
		navigationArrowNormalClassicColor,
		navigationArrowNormalGradientColor,
		navigationArrowNormalCustomGradientSwitcher,
		navigationArrowNormalCustomGradientInputValue,
		navigationArrowHoverBackgroundType,
		navigationArrowHoverClassicColor,
		navigationArrowHoverGradientColor,
		navigationArrowHoverCustomGradientSwitcher,
		navigationArrowHoverCustomGradientInputValue,
		/** End Background */

		/** Start Arrows Dimensions */
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
		/** End Arrows Dimensions */

		/** Start Border */
		navigationArrowBorder,
		navigationArrowBorderColorSwitcher,
		navigationArrowBorderColor,
		navigationArrowBorderHoverColor,
		navigationArrowBorderUnits,
		navigationArrowDesktopBorder,
		navigationArrowDesktopBorderCssStyle,
		navigationArrowTabletBorder,
		navigationArrowTabletBorderCssStyle,
		navigationArrowMobileBorder,
		navigationArrowMobileBorderCssStyle,
		navigationArrowBorderLink,
		/** End Border */

		/** Start Border Radius */
		navigationArrowBorderRadiusUnits,
		navigationArrowDesktopBorderRadius,
		navigationArrowDesktopBorderRadiusCssStyle,
		navigationArrowTabletBorderRadius,
		navigationArrowTabletBorderRadiusCssStyle,
		navigationArrowMobileBorderRadius,
		navigationArrowMobileBorderRadiusCssStyle,
		navigationArrowBorderRadiusLink,
		/** End Border Radius */

		/** Start Box Shadow */
		navigationArrowBoxShadowValuesSwitcher,
		navigationArrowBoxShadowValues,
		navigationArrowBoxShadowCssValue,
		navigationArrowBoxShadowHoverValues,
		navigationArrowBoxShadowHoverCssValue,
		/** End Box Shadow */

		/** Start Position */
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,

		navigationArrowPositionTopOffset,
		navigationArrowPositionTopOffsetUnits,
		navigationArrowPositionLeftOffset,
		navigationArrowPositionLeftOffsetUnits,
		navigationArrowPositionRightOffset,
		navigationArrowPositionRightOffsetUnits,
		navigationArrowPositionBottomOffset,
		navigationArrowPositionBottomOffsetUnits,

		navigationArrowGap,
		navigationArrowGapUnits,

		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
		/** End Position */

		/** Start Dots Margin */
		paginationDotsMarginUnits,
		paginationDotsDesktopMargin,
		paginationDotsDesktopMarginCssStyle,
		paginationDotsTabletMargin,
		paginationDotsTabletMarginCssStyle,
		paginationDotsMobileMargin,
		paginationDotsMobileMarginCssStyle,
		paginationDotsMarginLink,
		/** End Dots Margin */

		/** Start Dots Position */
		paginationDotsPosition,
		paginationDotsPositionUnits,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		/** End Dots Position */

		/** Start Pagination Outside Offset */
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		/** End Pagination Outside Offset */

		/** Start Dots Style */
		paginationDotsSwitcher,
		paginationNormalDotsBgColor,
		paginationActiveDotsBgColor,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		/** End Dots Style */

		/** Start Dots Border */
		paginationNormalDotsBorder,
		paginationNormalDotsBorderColorSwitcher,
		paginationNormalDotsBorderColor,
		paginationNormalDotsBorderHoverColor,
		paginationNormalDotsBorderUnits,
		paginationNormalDotsDesktopBorder,
		paginationNormalDotsDesktopBorderCssStyle,
		paginationNormalDotsTabletBorder,
		paginationNormalDotsTabletBorderCssStyle,
		paginationNormalDotsMobileBorder,
		paginationNormalDotsMobileBorderCssStyle,
		paginationNormalDotsBorderLink,
		/** End Dots Border */

		/** Start Dots Border Radius */
		paginationNormalDotsBorderRadius,
		paginationNormalDotsBorderRadiusUnits,
		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsDesktopBorderRadiusCssStyle,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsTabletBorderRadiusCssStyle,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsMobileBorderRadiusCssStyle,
		paginationNormalDotsBorderRadiusLink,
		/** End Dots Border Radius */

		/** Start Active Dots */
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		/** End Active Dots */

		/** Start Active Dots Border */
		paginationActiveDotsBorder,
		paginationActiveDotsBorderColorSwitcher,
		paginationActiveDotsBorderColor,
		paginationActiveDotsBorderHoverColor,
		/** End Active Dots Border */

		/** Start Active Dots Border */
		paginationActiveDotsBorderUnits,
		paginationActiveDotsDesktopBorder,
		paginationActiveDotsDesktopBorderCssStyle,
		paginationActiveDotsTabletBorder,
		paginationActiveDotsTabletBorderCssStyle,
		paginationActiveDotsMobileBorder,
		paginationActiveDotsMobileBorderCssStyle,
		paginationActiveDotsBorderLink,
		/** End Active Dots Border */

		/** Start Active Dots Border Radius */
		paginationActiveDotsBorderRadiusUnits,
		paginationActiveDotsDesktopBorderRadius,
		paginationActiveDotsDesktopBorderRadiusCssStyle,
		paginationActiveDotsTabletBorderRadius,
		paginationActiveDotsTabletBorderRadiusCssStyle,
		paginationActiveDotsMobileBorderRadius,
		paginationActiveDotsMobileBorderRadiusCssStyle,
		paginationActiveDotsBorderRadiusLink,
		/** End Active Dots Border Radius */

		/** start Fraction Typography and Color */
		paginationFractionFontFamily,
		paginationFractionFontSize,
		paginationFractionFontSizeUnits,
		paginationFractionFontWeight,
		paginationFractionFontStyle,
		paginationFractionTextTransform,
		paginationFractionTextDecoration,
		paginationFractionLineHeight,
		paginationFractionLineHeightUnits,
		paginationFractionLetterSpacing,
		paginationFractionLetterSpacingUnits,
		paginationFractionWordSpacing,
		paginationFractionWordSpacingUnits,
		paginationFractionColorSwitcher,
		paginationFractionColor,
		paginationFractionColorHover,
		/** End Fraction Typography and Color */

		/** start pagination Progressbar Color */
		paginationProgressbarBGColorSwitcher,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
		/** End pagination Progressbar Color */

		/** Global Settings */

		/** Start Global Margin */
		globalMarginUnits,
		globalMarginDesktop,
		globalMarginDesktopCssStyle,
		globalMarginTablet,
		globalMarginTabletCssStyle,
		globalMarginMobile,
		globalMarginMobileCssStyle,
		globalMarginLink,
		/** End Global Margin */

		/** Start Global Padding */
		globalPaddingUnits,
		globalPaddingDesktop,
		globalPaddingDesktopCssStyle,
		globalPaddingTablet,
		globalPaddingTabletCssStyle,
		globalPaddingMobile,
		globalPaddingMobileCssStyle,
		globalPaddingLink,
		/** End Global Padding */

		/** Start Global Z-Index */
		globalZIndex,
		globalID,
		globalClass,
		/** End Global Z-Index */

		/** Start Global Background */
		globalNormalBackgroundType,
		globalNormalClassicColor,
		globalNormalGradientColor,
		globalNormalCustomGradientSwitcher,
		globalNormalCustomGradientInputValue,
		globalNormalBackgroundImageUrl,
		globalNormalBackgroundImagePosition,
		globalNormalBackgroundImageAttachment,
		globalNormalBackgroundImageRepeat,
		globalNormalBackgroundImageSize,

		globalHoverBackgroundType,
		globalHoverClassicColor,
		globalHoverGradientColor,
		globalHoverCustomGradientSwitcher,
		globalHoverCustomGradientInputValue,
		globalHoverBackgroundImageUrl,
		globalHoverBackgroundImagePosition,
		globalHoverBackgroundImageAttachment,
		globalHoverBackgroundImageRepeat,
		globalHoverBackgroundImageSize,
		/** End Global Setting */

		/** Start Global Border */
		globalBorder,
		globalBorderColorSwitcher,
		globalBorderColor,
		globalBorderHoverColor,

		globalBorderUnits,
		globalBorderDesktop,
		globalBorderDesktopCssStyle,
		globalBorderTablet,
		globalBorderTabletCssStyle,
		globalBorderMobile,
		globalBorderMobileCssStyle,
		globalBorderLink,
		/** End Global Border */

		/** Start Global Border Radius */
		globalBorderRadiusUnits,
		globalBorderRadiusDesktop,
		globalBorderRadiusDesktopCssStyle,
		globalBorderRadiusTablet,
		globalBorderRadiusTabletCssStyle,
		globalBorderRadiusMobile,
		globalBorderRadiusMobileCssStyle,
		globalBorderRadiusLink,
		/** End Global Border Radius */

		/** Start Global Box Shadow */
		globalBoxShadowValuesSwitcher,
		globalBoxShadowValues,
		globalBoxShadowCssValue,
		globalBoxShadowHoverValues,
		globalBoxShadowHoverCssValue,
		/** End Global Box Shadow */
	} = attributes;

	/** Start Slider Item Color Style */
	let sliderItemColorStyle = '';
	sliderItems.forEach( ( item ) => {
		const normalItemBackgroundType = item.normalItemBackgroundType;
		const normalItemGradientColor =
			item.normalItemGradientColor || item.normalItemClassicColor;

		if ( normalItemBackgroundType === 'gradient' ) {
			const gradientValue =
				item.normalItemCustomGradientSwitcher &&
				item.normalItemCustomGradientInputValue
					? item.normalItemCustomGradientInputValue
					: normalItemGradientColor;

			if ( gradientValue ) {
				const gradientStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                        background: ${ gradientValue };
                        transition: all .3s ease-in-out;
                    }`;
				sliderItemColorStyle += gradientStyle;
			}
		} else if ( item.normalBackgroundImageUrl.Desktop ) {
			let backgroundImageStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                    background-image: url(${ item.normalBackgroundImageUrl.Desktop });`;

			if ( item.normalBackgroundImagePosition.Desktop ) {
				const backgroundPosition = `${
					item.normalBackgroundImagePosition.Desktop.x * 100
				}% ${ item.normalBackgroundImagePosition.Desktop.y * 100 }%`;
				backgroundImageStyle += `
                    background-position: ${ backgroundPosition };`;
			}

			if ( item.normalBackgroundImageAttachment.Desktop ) {
				backgroundImageStyle += `
                    background-attachment: ${ item.normalBackgroundImageAttachment.Desktop };`;
			}

			if ( item.normalBackgroundImageRepeat.Desktop ) {
				backgroundImageStyle += `
                    background-repeat: ${ item.normalBackgroundImageRepeat.Desktop };`;
			}

			if ( item.normalBackgroundImageSize.Desktop ) {
				backgroundImageStyle += `
                    background-size: ${ item.normalBackgroundImageSize.Desktop };`;
			}

			backgroundImageStyle += `
                    transition: all .3s ease-in-out;
                }`;
			sliderItemColorStyle += backgroundImageStyle;
		} else if ( item.normalItemClassicColor ) {
			const classicStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                    background: ${ item.normalItemClassicColor };
                    transition: all .3s ease-in-out;
                }`;
			sliderItemColorStyle += classicStyle;
		}

		if ( item.itemBackgroundOverlaySwitcher ) {
			const overlayColor =
				item.itemBackgroundOverlayType === 'classic'
					? item.itemBackgroundOverlayClassicColor
					: item.itemBackgroundOverlayGradientColor;

			const overlayGradient =
				item.itemBackgroundOverlayCustomGradientSwitcher &&
				item.itemBackgroundOverlayCustomGradientInputValue
					? item.itemBackgroundOverlayCustomGradientInputValue
					: overlayColor;

			const overlayStyle = `.${ blockId } .gslider-content-wrapper.${
				item.id
			}::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: ${ overlayGradient || 'transparent' };
                    opacity: ${ item.itemBackgroundOverlayOpacity };
                    z-index: -1;
                    pointer-events: none;
                    transition: all .3s ease-in-out;
                }
                .${ blockId } .gslider-content-wrapper.${ item.id } {
                    position: relative;
                    z-index: 1;
                }`;
			sliderItemColorStyle += overlayStyle;
		}

		// Tablet styles (max-width: 1024px)
		sliderItemColorStyle += `
            @media only screen and (max-width: 1024px) {
                .${ blockId } .gslider-content-wrapper.${ item.id } {`;

		if (
			normalItemBackgroundType === 'gradient' &&
			item.normalItemGradientColor
		) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemGradientColor };`;
		} else if (
			item.normalBackgroundImageUrl.Tablet ||
			item.normalBackgroundImageUrl.Desktop
		) {
			sliderItemColorStyle += `
                    background-image: url(${
						item.normalBackgroundImageUrl.Tablet ||
						item.normalBackgroundImageUrl.Desktop
					});`;
			if (
				item.normalBackgroundImageSize.Tablet ||
				item.normalBackgroundImageSize.Desktop
			) {
				sliderItemColorStyle += `
                    background-size: ${
						item.normalBackgroundImageSize.Tablet ||
						item.normalBackgroundImageSize.Desktop
					};`;
			}
			sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
		} else if ( item.normalItemClassicColor ) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemClassicColor };`;
		}
		sliderItemColorStyle += `
                }
            }`;

		// Mobile styles (max-width: 767px)
		sliderItemColorStyle += `
            @media only screen and (max-width: 767px) {
                .${ blockId } .gslider-content-wrapper.${ item.id } {`;

		if (
			normalItemBackgroundType === 'gradient' &&
			item.normalItemGradientColor
		) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemGradientColor };`;
		} else if (
			item.normalBackgroundImageUrl.Mobile ||
			item.normalBackgroundImageUrl.Tablet ||
			item.normalBackgroundImageUrl.Desktop
		) {
			sliderItemColorStyle += `
                    background-image: url(${
						item.normalBackgroundImageUrl.Mobile ||
						item.normalBackgroundImageUrl.Tablet ||
						item.normalBackgroundImageUrl.Desktop
					});`;
			if (
				item.normalBackgroundImageSize.Mobile ||
				item.normalBackgroundImageSize.Tablet ||
				item.normalBackgroundImageSize.Desktop
			) {
				sliderItemColorStyle += `
                    background-size: ${
						item.normalBackgroundImageSize.Mobile ||
						item.normalBackgroundImageSize.Tablet ||
						item.normalBackgroundImageSize.Desktop
					};`;
			}
			sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
		} else if ( item.normalItemClassicColor ) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemClassicColor };`;
		}
		sliderItemColorStyle += `
                }
            }`;
	} );
	/* End Slider Item Color Style */

	/**
	 * Get global background normal styles
	 */
	const getGlobalBackgroundNormalStyles = ( device ) => {
		const bgType = globalNormalBackgroundType;
		const bgColor = globalNormalClassicColor;
		const bgGradient = globalNormalGradientColor;
		const customGradient = globalNormalCustomGradientInputValue;
		const customGradientEnabled = globalNormalCustomGradientSwitcher;

		const bgImageUrl = globalNormalBackgroundImageUrl?.[ device ];
		const bgImagePosition = globalNormalBackgroundImagePosition?.[ device ];
		const bgAttachment = globalNormalBackgroundImageAttachment?.[ device ];
		const bgRepeat = globalNormalBackgroundImageRepeat?.[ device ];
		const bgSize = globalNormalBackgroundImageSize?.[ device ];

		if ( bgType === 'gradient' ) {
			if ( customGradientEnabled && customGradient ) {
				return { background: customGradient };
			} else if ( bgGradient ) {
				return { background: bgGradient };
			} else if ( bgColor ) {
				return { background: bgColor };
			}
			return {};
		}

		let styles = bgColor ? { background: bgColor } : {};

		if ( bgType !== 'gradient' && bgImageUrl ) {
			styles = {
				...styles,
				'background-image': `url(${ bgImageUrl })`,
				'background-position': bgImagePosition
					? `${ bgImagePosition.x * 100 }% ${
							bgImagePosition.y * 100
					  }%`
					: '50% 50%',
				'background-attachment': bgAttachment || undefined,
				'background-repeat': bgRepeat || undefined,
				'background-size': bgSize || undefined,
			};
		}

		return styles;
	};

	/**
	 * Get global background hover styles
	 */
	const getGlobalBackgroundHoverStyles = ( device ) => {
		const bgType = globalHoverBackgroundType;
		const bgColor = globalHoverClassicColor;
		const bgGradient = globalHoverGradientColor;
		const customGradient = globalHoverCustomGradientInputValue;
		const customGradientEnabled = globalHoverCustomGradientSwitcher;

		const bgImageUrl = globalHoverBackgroundImageUrl?.[ device ];
		const bgImagePosition = globalHoverBackgroundImagePosition?.[ device ];
		const bgAttachment = globalHoverBackgroundImageAttachment?.[ device ];
		const bgRepeat = globalHoverBackgroundImageRepeat?.[ device ];
		const bgSize = globalHoverBackgroundImageSize?.[ device ];

		if ( bgType === 'gradient' ) {
			if ( customGradientEnabled && customGradient ) {
				return { background: customGradient };
			} else if ( bgGradient ) {
				return { background: bgGradient };
			} else if ( bgColor ) {
				return { background: bgColor };
			}
			return {};
		}

		let styles = bgColor ? { background: bgColor } : {};

		if ( bgType !== 'gradient' && bgImageUrl ) {
			styles = {
				...styles,
				'background-image': `url(${ bgImageUrl })`,
				'background-position': bgImagePosition
					? `${ bgImagePosition.x * 100 }% ${
							bgImagePosition.y * 100
					  }%`
					: '50% 50%',
				'background-attachment': bgAttachment || undefined,
				'background-repeat': bgRepeat || undefined,
				'background-size': bgSize || undefined,
			};
		}

		return styles;
	};

	/**
	 * Convert object to string
	 */
	const globalBackgroundStyleObjectToString = ( styleObj ) =>
		Object.entries( styleObj )
			.map( ( [ key, value ] ) => `${ key }: ${ value };` )
			.join( ' ' );

	/**
	 * Get global background styles
	 */
	const globalDesktopBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Desktop' )
		);
	const globalTabletBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Tablet' )
		);
	const globalMobileBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Mobile' )
		);

	const globalDesktopBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Desktop' )
		);
	const globalTabletBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Tablet' )
		);
	const globalMobileBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Mobile' )
		);

	/** Start All Block Style */
	const baseSliderCSS = `
        .${ blockId }.gslider-base-wrapper {
            ${ globalDesktopBackgroundNormalStyles }
            ${
				globalMarginDesktopCssStyle
					? `margin: ${ globalMarginDesktopCssStyle };`
					: ''
			} 
            ${
				globalPaddingDesktopCssStyle
					? `padding: ${ globalPaddingDesktopCssStyle };`
					: ''
			}
            ${ globalBorder ? `border: ${ globalBorder };` : '' }
			${
				globalBorderDesktopCssStyle
					? `border-width: ${ globalBorderDesktopCssStyle };`
					: ''
			}  
			${
				globalBorderRadiusDesktopCssStyle
					? `border-radius: ${ globalBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				globalBorderColor ? `border-color: ${ globalBorderColor };` : ''
			}
            ${
				globalBoxShadowCssValue
					? `box-shadow: ${ globalBoxShadowCssValue } !important;`
					: ''
			}
            ${
				globalZIndex.Desktop
					? `z-index: ${ globalZIndex.Desktop };`
					: ''
			}
            box-sizing: border-box;
            position: relative;
        }
        .${ blockId }.gslider-base-wrapper:hover {
            ${ globalDesktopBackgroundHoverStyles }
            ${
				globalBorderHoverColor
					? `border-color: ${ globalBorderHoverColor };`
					: ''
			}
            ${
				globalBoxShadowHoverCssValue
					? `box-shadow: ${ globalBoxShadowHoverCssValue } !important;`
					: ''
			}
        }

        .${ blockId } .swiper-wrapper {
            ${ layoutHeightSwitcher !== 'adapt' ? `height: auto;` : '' }
            ${
				layoutHeight.Desktop && layoutHeightSwitcher === 'fixed'
					? `min-height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
        }

        .${ blockId } .swiper-slide{
            ${
				layoutHeightSwitcher !== 'adapt'
					? `height: auto !important;`
					: ''
			}
            ${
				layoutHeight.Desktop && layoutHeightSwitcher === 'fixed'
					? `min-height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
        }
        
        .${ blockId }.gslider-base-wrapper .gslider-content-wrapper {
            ${
				layoutHeightSwitcher !== 'adapt'
					? `height: 100% !important;`
					: ''
			}
            ${
				contentVerticalAlignment?.Desktop
					? `justify-content: ${ contentVerticalAlignment.Desktop };`
					: ''
			}
        }

        .${ blockId }.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${
				contentWidth?.Desktop
					? `max-width: ${ contentWidth.Desktop }${ contentWidthUnits?.Desktop };`
					: ''
			}
            ${
				contentAlignment?.Desktop
					? `text-align: ${ contentAlignment.Desktop };`
					: ''
			}

            ${
				contentHorizontalAlignment?.Desktop === 'left'
					? `margin-right: auto; margin-left: 0;`
					: ''
			}
            ${
				contentHorizontalAlignment?.Desktop === 'center'
					? `margin-left: auto; margin-right: auto;`
					: ''
			}
            ${
				contentHorizontalAlignment?.Desktop === 'right'
					? `margin-left: auto; margin-right: 0;`
					: ''
			}
            ${
				contentPaddingDesktopCssStyle
					? `padding: ${ contentPaddingDesktopCssStyle };`
					: ''
			}
        }

        .${ blockId }.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
            ${
				subtitleFontFamily
					? `font-family: ${ subtitleFontFamily };`
					: ''
			}
            ${
				subtitleFontSize.Desktop && subtitleFontSizeUnits.Desktop
					? `font-size: ${ subtitleFontSize.Desktop }${ subtitleFontSizeUnits.Desktop };`
					: ''
			}
            ${
				subtitleFontWeight
					? `font-weight: ${ subtitleFontWeight };`
					: ''
			}
            ${ subtitleFontStyle ? `font-style: ${ subtitleFontStyle };` : '' }
            ${
				subtitleTextTransform
					? `text-transform: ${ subtitleTextTransform };`
					: ''
			}
            ${
				subtitleTextDecoration
					? `text-decoration: ${ subtitleTextDecoration };`
					: ''
			}
            ${
				subtitleLineHeight.Desktop && subtitleLineHeightUnits.Desktop
					? `line-height: ${ subtitleLineHeight.Desktop }${ subtitleLineHeightUnits.Desktop };`
					: ''
			}
            ${
				subtitleLetterSpacing.Desktop &&
				subtitleLetterSpacingUnits.Desktop
					? `letter-spacing: ${ subtitleLetterSpacing.Desktop }${ subtitleLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				subtitleWordSpacing.Desktop && subtitleWordSpacingUnits.Desktop
					? `word-spacing: ${ subtitleWordSpacing.Desktop }${ subtitleWordSpacingUnits.Desktop };`
					: ''
			}
            ${ subtitleColor ? `color: ${ subtitleColor };` : '' }
            ${
				subtitleDesktopMarginCssStyle
					? `margin: ${ subtitleDesktopMarginCssStyle };`
					: ''
			} 
            ${
				subtitleDesktopPaddingCssStyle
					? `padding: ${ subtitleDesktopPaddingCssStyle };`
					: ''
			}
            transition: all .3s ease-in-out;
        }
        .${ blockId }.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle:hover {
            ${ subtitleColorHover ? `color: ${ subtitleColorHover };` : '' }
        }

        .${ blockId }.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
            ${ titleFontFamily ? `font-family: ${ titleFontFamily };` : '' }
            ${
				titleFontSize.Desktop && titleFontSizeUnits.Desktop
					? `font-size: ${ titleFontSize.Desktop }${ titleFontSizeUnits.Desktop };`
					: ''
			}
            ${ titleFontWeight ? `font-weight: ${ titleFontWeight };` : '' }
            ${ titleFontStyle ? `font-style: ${ titleFontStyle };` : '' }
            ${
				titleTextTransform
					? `text-transform: ${ titleTextTransform };`
					: ''
			}
            ${
				titleTextDecoration
					? `text-decoration: ${ titleTextDecoration };`
					: ''
			}
            ${
				titleLineHeight.Desktop && titleLineHeightUnits.Desktop
					? `line-height: ${ titleLineHeight.Desktop }${ titleLineHeightUnits.Desktop };`
					: ''
			}
            ${
				titleLetterSpacing.Desktop && titleLetterSpacingUnits.Desktop
					? `letter-spacing: ${ titleLetterSpacing.Desktop }${ titleLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				titleWordSpacing.Desktop && titleWordSpacingUnits.Desktop
					? `word-spacing: ${ titleWordSpacing.Desktop }${ titleWordSpacingUnits.Desktop };`
					: ''
			}
            ${ titleColor ? `color: ${ titleColor };` : '' }
            ${
				titleDesktopMarginCssStyle
					? `margin: ${ titleDesktopMarginCssStyle };`
					: ''
			} 
            ${
				titleDesktopPaddingCssStyle
					? `padding: ${ titleDesktopPaddingCssStyle };`
					: ''
			}
            transition: all .3s ease-in-out;
        }
        .${ blockId }.gslider-base-wrapper .gslider-title-wrapper .gslider-title:hover {
            ${ titleColorHover ? `color: ${ titleColorHover };` : '' }
        }

        .${ blockId }.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
            ${
				descriptionFontFamily
					? `font-family: ${ descriptionFontFamily };`
					: ''
			}
            ${
				descriptionFontSize.Desktop && descriptionFontSizeUnits.Desktop
					? `font-size: ${ descriptionFontSize.Desktop }${ descriptionFontSizeUnits.Desktop };`
					: ''
			}
            ${
				descriptionFontWeight
					? `font-weight: ${ descriptionFontWeight };`
					: ''
			}
            ${
				descriptionFontStyle
					? `font-style: ${ descriptionFontStyle };`
					: ''
			}
            ${
				descriptionTextTransform
					? `text-transform: ${ descriptionTextTransform };`
					: ''
			}
            ${
				descriptionTextDecoration
					? `text-decoration: ${ descriptionTextDecoration };`
					: ''
			}
            ${
				descriptionLineHeight.Desktop &&
				descriptionLineHeightUnits.Desktop
					? `line-height: ${ descriptionLineHeight.Desktop }${ descriptionLineHeightUnits.Desktop };`
					: ''
			}
            ${
				descriptionLetterSpacing.Desktop &&
				descriptionLetterSpacingUnits.Desktop
					? `letter-spacing: ${ descriptionLetterSpacing.Desktop }${ descriptionLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				descriptionWordSpacing.Desktop &&
				descriptionWordSpacingUnits.Desktop
					? `word-spacing: ${ descriptionWordSpacing.Desktop }${ descriptionWordSpacingUnits.Desktop };`
					: ''
			}
            ${ descriptionColor ? `color: ${ descriptionColor };` : '' }
            ${
				descriptionDesktopMarginCssStyle
					? `margin: ${ descriptionDesktopMarginCssStyle };`
					: ''
			} 
            ${
				descriptionDesktopPaddingCssStyle
					? `padding: ${ descriptionDesktopPaddingCssStyle };`
					: ''
			}
            transition: all .3s ease-in-out;
        }
        .${ blockId }.gslider-base-wrapper .gslider-description-wrapper .gslider-description:hover {
            ${
				descriptionColorHover
					? `color: ${ descriptionColorHover };`
					: ''
			}
        }

        .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
            ${
				primaryButtonFontFamily
					? `font-family: ${ primaryButtonFontFamily };`
					: ''
			}
            ${
				primaryButtonFontSize.Desktop &&
				primaryButtonFontSizeUnits.Desktop
					? `font-size: ${ primaryButtonFontSize.Desktop }${ primaryButtonFontSizeUnits.Desktop };`
					: ''
			}
            ${
				primaryButtonFontWeight
					? `font-weight: ${ primaryButtonFontWeight };`
					: ''
			}
            ${
				primaryButtonFontStyle
					? `font-style: ${ primaryButtonFontStyle };`
					: ''
			}
            ${
				primaryButtonTextTransform
					? `text-transform: ${ primaryButtonTextTransform };`
					: ''
			}
            ${
				primaryButtonTextDecoration
					? `text-decoration: ${ primaryButtonTextDecoration };`
					: ''
			}
            ${
				primaryButtonLineHeight.Desktop &&
				primaryButtonLineHeightUnits.Desktop
					? `line-height: ${ primaryButtonLineHeight.Desktop }${ primaryButtonLineHeightUnits.Desktop };`
					: ''
			}
            ${
				primaryButtonLetterSpacing.Desktop &&
				primaryButtonLetterSpacingUnits.Desktop
					? `letter-spacing: ${ primaryButtonLetterSpacing.Desktop }${ primaryButtonLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				primaryButtonWordSpacing.Desktop &&
				primaryButtonWordSpacingUnits.Desktop
					? `word-spacing: ${ primaryButtonWordSpacing.Desktop }${ primaryButtonWordSpacingUnits.Desktop };`
					: ''
			}
            ${ primaryButtonColor ? `color: ${ primaryButtonColor };` : '' }
            ${
				primaryButtonNormalBackgroundType === 'gradient'
					? `  
                background: ${
					primaryButtonNormalCustomGradientSwitcher &&
					primaryButtonNormalCustomGradientInputValue
						? primaryButtonNormalCustomGradientInputValue
						: primaryButtonNormalGradientColor ||
						  primaryButtonNormalClassicColor
				};
            `
					: `
                ${
					primaryButtonNormalClassicColor
						? `background: ${ primaryButtonNormalClassicColor };`
						: ''
				}
            `
			}
            ${ primaryButtonBorder ? `border: ${ primaryButtonBorder };` : '' }
            ${
				primaryButtonBorderColor
					? `border-color: ${ primaryButtonBorderColor };`
					: ''
			}
			${
				primaryButtonDesktopBorderCssStyle
					? `border-width: ${ primaryButtonDesktopBorderCssStyle };`
					: ''
			}  
			${
				primaryButtonDesktopBorderRadiusCssStyle
					? `border-radius: ${ primaryButtonDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				primaryButtonBoxShadowCssValue
					? `box-shadow: ${ primaryButtonBoxShadowCssValue };`
					: ''
			}
            ${
				primaryButtonDesktopMarginCssStyle
					? `margin: ${ primaryButtonDesktopMarginCssStyle };`
					: ''
			} 
            ${
				primaryButtonDesktopPaddingCssStyle
					? `padding: ${ primaryButtonDesktopPaddingCssStyle };`
					: ''
			}
            display: inline-block;
            transition: all .3s ease-in-out;
        }

        .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn:hover {
            ${
				primaryButtonColorHover
					? `color: ${ primaryButtonColorHover };`
					: ''
			}
            ${
				primaryButtonHoverBackgroundType === 'gradient'
					? `   
                background: ${
					primaryButtonHoverCustomGradientSwitcher &&
					primaryButtonHoverCustomGradientInputValue
						? primaryButtonHoverCustomGradientInputValue
						: primaryButtonHoverGradientColor ||
						  primaryButtonHoverClassicColor
				};
            `
					: `
                ${
					primaryButtonHoverClassicColor
						? `background: ${ primaryButtonHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				primaryButtonBorderHoverColor
					? `border-color: ${ primaryButtonBorderHoverColor };`
					: ''
			}
            ${
				primaryButtonBoxShadowHoverCssValue
					? `box-shadow: ${ primaryButtonBoxShadowHoverCssValue };`
					: ''
			}
        }

        .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
            ${
				secondaryButtonFontFamily
					? `font-family: ${ secondaryButtonFontFamily };`
					: ''
			}
            ${
				secondaryButtonFontSize.Desktop &&
				secondaryButtonFontSizeUnits.Desktop
					? `font-size: ${ secondaryButtonFontSize.Desktop }${ secondaryButtonFontSizeUnits.Desktop };`
					: ''
			}
            ${
				secondaryButtonFontWeight
					? `font-weight: ${ secondaryButtonFontWeight };`
					: ''
			}
            ${
				secondaryButtonFontStyle
					? `font-style: ${ secondaryButtonFontStyle };`
					: ''
			}
            ${
				secondaryButtonTextTransform
					? `text-transform: ${ secondaryButtonTextTransform };`
					: ''
			}
            ${
				secondaryButtonTextDecoration
					? `text-decoration: ${ secondaryButtonTextDecoration };`
					: ''
			}
            ${
				secondaryButtonLineHeight.Desktop &&
				secondaryButtonLineHeightUnits.Desktop
					? `line-height: ${ secondaryButtonLineHeight.Desktop }${ secondaryButtonLineHeightUnits.Desktop };`
					: ''
			}
            ${
				secondaryButtonLetterSpacing.Desktop &&
				secondaryButtonLetterSpacingUnits.Desktop
					? `letter-spacing: ${ secondaryButtonLetterSpacing.Desktop }${ secondaryButtonLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				secondaryButtonWordSpacing.Desktop &&
				secondaryButtonWordSpacingUnits.Desktop
					? `word-spacing: ${ secondaryButtonWordSpacing.Desktop }${ secondaryButtonWordSpacingUnits.Desktop };`
					: ''
			}
            ${ secondaryButtonColor ? `color: ${ secondaryButtonColor };` : '' }
            ${
				secondaryButtonNormalBackgroundType === 'gradient'
					? `  
                background: ${
					secondaryButtonNormalCustomGradientSwitcher &&
					secondaryButtonNormalCustomGradientInputValue
						? secondaryButtonNormalCustomGradientInputValue
						: secondaryButtonNormalGradientColor ||
						  secondaryButtonNormalClassicColor
				};
            `
					: `
                ${
					secondaryButtonNormalClassicColor
						? `background: ${ secondaryButtonNormalClassicColor };`
						: ''
				}
            `
			}
            ${
				secondaryButtonBorder
					? `border: ${ secondaryButtonBorder };`
					: ''
			}
            ${
				secondaryButtonBorderColor
					? `border-color: ${ secondaryButtonBorderColor };`
					: ''
			}
			${
				secondaryButtonDesktopBorderCssStyle
					? `border-width: ${ secondaryButtonDesktopBorderCssStyle };`
					: ''
			}  
			${
				secondaryButtonDesktopBorderRadiusCssStyle
					? `border-radius: ${ secondaryButtonDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				secondaryButtonBoxShadowCssValue
					? `box-shadow: ${ secondaryButtonBoxShadowCssValue };`
					: ''
			}
            ${
				secondaryButtonDesktopMarginCssStyle
					? `margin: ${ secondaryButtonDesktopMarginCssStyle };`
					: ''
			} 
            ${
				secondaryButtonDesktopPaddingCssStyle
					? `padding: ${ secondaryButtonDesktopPaddingCssStyle };`
					: ''
			}
            display: inline-block;
            transition: all .3s ease-in-out;
        }

        .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn:hover {
            ${
				secondaryButtonColorHover
					? `color: ${ secondaryButtonColorHover };`
					: ''
			}
            ${
				secondaryButtonHoverBackgroundType === 'gradient'
					? `   
                background: ${
					secondaryButtonHoverCustomGradientSwitcher &&
					secondaryButtonHoverCustomGradientInputValue
						? secondaryButtonHoverCustomGradientInputValue
						: secondaryButtonHoverGradientColor ||
						  secondaryButtonHoverClassicColor
				};
            `
					: `
                ${
					secondaryButtonHoverClassicColor
						? `background: ${ secondaryButtonHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				secondaryButtonBorderHoverColor
					? `border-color: ${ secondaryButtonBorderHoverColor };`
					: ''
			}
            ${
				secondaryButtonBoxShadowHoverCssValue
					? `box-shadow: ${ secondaryButtonBoxShadowHoverCssValue };`
					: ''
			}
        }

        .${ blockId }.gslider-base-wrapper.outside {
            ${
				navigationArrowPosition === 'top-left' ||
				navigationArrowPosition === 'top-center' ||
				navigationArrowPosition === 'top-right'
					? `
                padding: ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop } 0 0;
            `
					: ''
			}
    
            ${
				navigationArrowPosition === 'bottom-left' ||
				navigationArrowPosition === 'bottom-center' ||
				navigationArrowPosition === 'bottom-right'
					? `
                padding: 0 0 ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop };
            `
					: ''
			}

            ${
				navigationArrowPosition === 'center'
					? `
                padding: 0 ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop };

            `
					: ''
			}
        }

            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                z-index: 100 !important;
            }

        ${
			navigationArrowPosition && navigationArrowPosition !== 'center'
				? `

            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${ navigationArrowDirection };
                gap: ${
					navigationArrowGap.Desktop
						? `${ navigationArrowGap.Desktop }${ navigationArrowGapUnits.Desktop }`
						: '10px'
				};
                position: absolute;
                z-index: 100;
        
                ${
					navigationArrowPosition === 'top-left'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'top-center'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '50%'
					};
                    transform: translateX(-50%);
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'top-right'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    right: ${
						navigationArrowPositionRightOffset.Desktop
							? `${ navigationArrowPositionRightOffset.Desktop }${ navigationArrowPositionRightOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-center'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '50%'
					};
                    transform: translateX(-50%);
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-right'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    right: ${
						navigationArrowPositionRightOffset.Desktop
							? `${ navigationArrowPositionRightOffset.Desktop }${ navigationArrowPositionRightOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
            }
        
            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-prev,
            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-next,
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-prev,
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-next {
                position: relative;
                top: auto;
                right: auto;
                bottom: auto;
                left: auto;
                margin: 0 !important;
            }
        `
				: ''
		}

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev:after,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next:after {
            display: none !important;
        }
        
        .${ blockId } .swiper-button-prev,
        .${ blockId } .swiper-button-next {
            ${ navigationArrowColor ? `color: ${ navigationArrowColor };` : '' }
            ${
				navigationArrowNormalBackgroundType === 'gradient'
					? `  
                background: ${
					navigationArrowNormalCustomGradientSwitcher &&
					navigationArrowNormalCustomGradientInputValue
						? navigationArrowNormalCustomGradientInputValue
						: navigationArrowNormalGradientColor ||
						  navigationArrowNormalClassicColor
				};
            `
					: `
                ${
					navigationArrowNormalClassicColor
						? `background: ${ navigationArrowNormalClassicColor };`
						: ''
				}
            `
			}
            ${
				navigationArrowBorder
					? `border: ${ navigationArrowBorder };`
					: ''
			}
			${
				navigationArrowDesktopBorderCssStyle
					? `border-width: ${ navigationArrowDesktopBorderCssStyle };`
					: ''
			}  
			${
				navigationArrowDesktopBorderRadiusCssStyle
					? `border-radius: ${ navigationArrowDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				navigationArrowBorderColor
					? `border-color: ${ navigationArrowBorderColor };`
					: ''
			}
            ${
				navigationArrowBoxShadowCssValue
					? `box-shadow: ${ navigationArrowBoxShadowCssValue };`
					: ''
			}
            ${
				navigationArrowWidth.Desktop
					? `width: ${ navigationArrowWidth.Desktop }${ navigationArrowWidthUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowHeight.Desktop
					? `height: ${ navigationArrowHeight.Desktop }${ navigationArrowHeightUnits.Desktop };`
					: ''
			}
            transition: all .3s ease-in-out;
        }
        .${ blockId } .swiper-button-prev:hover,
        .${ blockId } .swiper-button-next:hover {
            ${
				navigationArrowColorHover
					? `color: ${ navigationArrowColorHover };`
					: ''
			}
            ${
				navigationArrowHoverBackgroundType === 'gradient'
					? `
                background: ${
					navigationArrowHoverCustomGradientSwitcher &&
					navigationArrowHoverCustomGradientInputValue
						? navigationArrowHoverCustomGradientInputValue
						: navigationArrowHoverGradientColor ||
						  navigationArrowHoverClassicColor
				};
            `
					: `
                ${
					navigationArrowHoverClassicColor
						? `background: ${ navigationArrowHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				navigationArrowBorderHoverColor
					? `border-color: ${ navigationArrowBorderHoverColor };`
					: ''
			}
            ${
				navigationArrowBoxShadowHoverCssValue
					? `box-shadow: ${ navigationArrowBoxShadowHoverCssValue };`
					: ''
			}
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${ navigationArrowColor ? `fill: ${ navigationArrowColor };` : '' }
            ${
				navigationArrowSize.Desktop
					? `width: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowSize.Desktop
					? `height: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${
				navigationArrowSize.Desktop
					? `width: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowSize.Desktop
					? `height: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
            ${
				navigationArrowColorHover
					? `fill: ${ navigationArrowColorHover };`
					: ''
			}
        }

        .${ blockId } .swiper-button-prev:after,
        .${ blockId } .swiper-button-next:after {
            ${
				navigationArrowSize.Desktop
					? `font-size: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination {
            ${ ( () => {
				if ( paginationType === 'progressbar' ) {
					return paginationProgressbarPosition.Desktop
						? `top: ${ paginationProgressbarPosition.Desktop }${ paginationProgressbarPositionUnits.Desktop } !important;`
						: '';
				}
				return paginationDotsPosition.Desktop
					? `bottom: ${ paginationDotsPosition.Desktop }${ paginationDotsPositionUnits.Desktop } !important;`
					: '';
			} )() }
            ${
				paginationDotsDesktopMarginCssStyle
					? `margin: ${ paginationDotsDesktopMarginCssStyle };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet {
            ${
				paginationNormalDotsBgColor
					? `background-color: ${ paginationNormalDotsBgColor };`
					: ''
			}
            ${
				paginationNormalDotsBorder
					? `border: ${ paginationNormalDotsBorder };`
					: ''
			}
			${
				paginationNormalDotsDesktopBorderCssStyle
					? `border-width: ${ paginationNormalDotsDesktopBorderCssStyle };`
					: ''
			}   
			${
				paginationNormalDotsDesktopBorderRadiusCssStyle
					? `border-radius: ${ paginationNormalDotsDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				paginationNormalDotsBorderColor
					? `border-color: ${ paginationNormalDotsBorderColor };`
					: ''
			}
            ${
				paginationNormalDotsWidth.Desktop
					? `width: ${ paginationNormalDotsWidth.Desktop }${ paginationNormalDotsWidthUnits.Desktop };`
					: ''
			}
            ${
				paginationNormalDotsHeight.Desktop
					? `height: ${ paginationNormalDotsHeight.Desktop }${ paginationNormalDotsHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet-active {
            ${
				paginationActiveDotsBgColor
					? `background-color: ${ paginationActiveDotsBgColor };`
					: ''
			}
            ${
				paginationActiveDotsBorder
					? `border: ${ paginationActiveDotsBorder };`
					: ''
			}
			${
				paginationActiveDotsDesktopBorderCssStyle
					? `border-width: ${ paginationActiveDotsDesktopBorderCssStyle };`
					: ''
			}   
			${
				paginationActiveDotsDesktopBorderRadiusCssStyle
					? `border-radius: ${ paginationActiveDotsDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				paginationActiveDotsBorderColor
					? `border-color: ${ paginationActiveDotsBorderColor };`
					: ''
			}
            ${
				paginationActiveDotsWidth.Desktop
					? `width: ${ paginationActiveDotsWidth.Desktop }${ paginationActiveDotsWidthUnits.Desktop };`
					: ''
			}
            ${
				paginationActiveDotsHeight.Desktop
					? `height: ${ paginationActiveDotsHeight.Desktop }${ paginationActiveDotsHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet:hover {
            ${
				paginationNormalDotsBorderHoverColor
					? `border-color: ${ paginationNormalDotsBorderHoverColor };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet-active:hover {
            ${
				paginationActiveDotsBorderHoverColor
					? `border-color: ${ paginationActiveDotsBorderHoverColor };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-fraction { 
            ${
				paginationFractionFontFamily
					? `font-family: ${ paginationFractionFontFamily };`
					: ''
			}
            ${
				paginationFractionFontSize.Desktop &&
				paginationFractionFontSizeUnits.Desktop
					? `font-size: ${ paginationFractionFontSize.Desktop }${ paginationFractionFontSizeUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionFontWeight
					? `font-weight: ${ paginationFractionFontWeight };`
					: ''
			}
            ${
				paginationFractionFontStyle
					? `font-style: ${ paginationFractionFontStyle };`
					: ''
			}
            ${
				paginationFractionTextTransform
					? `text-transform: ${ paginationFractionTextTransform };`
					: ''
			}
            ${
				paginationFractionTextDecoration
					? `text-decoration: ${ paginationFractionTextDecoration };`
					: ''
			}
            ${
				paginationFractionLineHeight.Desktop &&
				paginationFractionLineHeightUnits.Desktop
					? `line-height: ${ paginationFractionLineHeight.Desktop }${ paginationFractionLineHeightUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionLetterSpacing.Desktop &&
				paginationFractionLetterSpacingUnits.Desktop
					? `letter-spacing: ${ paginationFractionLetterSpacing.Desktop }${ paginationFractionLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionWordSpacing.Desktop &&
				paginationFractionWordSpacingUnits.Desktop
					? `word-spacing: ${ paginationFractionWordSpacing.Desktop }${ paginationFractionWordSpacingUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionColor
					? `color: ${ paginationFractionColor };`
					: ''
			}
            transition: all .3s ease-in-out;
        }

        .${ blockId } .swiper-pagination-fraction:hover {
            ${
				paginationFractionColorHover
					? `color: ${ paginationFractionColorHover };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-progressbar {
            ${
				paginationProgressbarBGColor
					? `background-color: ${ paginationProgressbarBGColor };`
					: ''
			}
            ${
				paginationProgressbarHeight.Desktop
					? `height: ${ paginationProgressbarHeight.Desktop }${ paginationProgressbarHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
            ${
				paginationProgressbarBGActiveColor
					? `background-color: ${ paginationProgressbarBGActiveColor };`
					: ''
			}
        }

        ${
			paginationPositionType === 'outside'
				? `   
            .${ blockId }.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${ blockId }.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${ blockId }.gslider-base-wrapper .swiper-pagination-custom,
            .${ blockId }.gslider-base-wrapper .swiper-pagination-fraction {
                bottom: -${
					paginationOutsideOffset?.Desktop
						? `${ paginationOutsideOffset.Desktop }${
								paginationOutsideOffsetUnits?.Desktop || 'px'
						  }`
						: '30px'
				} !important;
            }
        `
				: ''
		}

        ${
			paginationPositionType === 'outside' && showPagination?.Desktop
				? `
        .${ blockId }.gslider-base-wrapper.has-pagination {
            margin-bottom: ${
				paginationOutsideOffset?.Desktop
					? `${ paginationOutsideOffset.Desktop }${
							paginationOutsideOffsetUnits?.Desktop || 'px'
					  }`
					: '30px'
			};
        }
        `
				: ''
		}

        @media only screen and (max-width: 1024px) {

            .${ blockId }.gslider-base-wrapper {
                ${ globalTabletBackgroundNormalStyles }
                ${
					globalMarginTabletCssStyle
						? `margin: ${ globalMarginTabletCssStyle };`
						: ''
				} 
                ${
					globalPaddingTabletCssStyle
						? `padding: ${ globalPaddingTabletCssStyle };`
						: ''
				}
                ${
					globalBorderTabletCssStyle
						? `border-width: ${ globalBorderTabletCssStyle };`
						: ''
				}  
                ${
					globalBorderRadiusTabletCssStyle
						? `border-radius: ${ globalBorderRadiusTabletCssStyle };`
						: ''
				}
                ${
					globalZIndex.Tablet
						? `z-index: ${ globalZIndex.Tablet };`
						: ''
				}
            }
            .${ blockId }.gslider-base-wrapper:hover { 
                ${ globalTabletBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper {
                ${
					layoutHeight.Tablet && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }

            .${ blockId } .swiper-slide{
                ${
					layoutHeight.Tablet && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-base-wrapper .gslider-content-wrapper {
                ${
					contentVerticalAlignment?.Tablet
						? `justify-content: ${ contentVerticalAlignment.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${
					contentWidth?.Tablet
						? `max-width: ${ contentWidth.Tablet }${ contentWidthUnits?.Tablet };`
						: ''
				}
                ${
					contentAlignment?.Tablet
						? `text-align: ${ contentAlignment.Tablet };`
						: ''
				}

                ${
					contentHorizontalAlignment?.Tablet === 'left'
						? `margin-right: auto; margin-left: 0;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Tablet === 'center'
						? `margin-left: auto; margin-right: auto;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Tablet === 'right'
						? `margin-left: auto; margin-right: 0;`
						: ''
				}
                ${
					contentPaddingTabletCssStyle
						? `padding: ${ contentPaddingTabletCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${
					subtitleFontSize.Tablet && subtitleFontSizeUnits.Tablet
						? `font-size: ${ subtitleFontSize.Tablet }${ subtitleFontSizeUnits.Tablet };`
						: ''
				}
                ${
					subtitleLineHeight.Tablet && subtitleLineHeightUnits.Tablet
						? `line-height: ${ subtitleLineHeight.Tablet }${ subtitleLineHeightUnits.Tablet };`
						: ''
				}
                ${
					subtitleLetterSpacing.Tablet &&
					subtitleLetterSpacingUnits.Tablet
						? `letter-spacing: ${ subtitleLetterSpacing.Tablet }${ subtitleLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					subtitleWordSpacing.Tablet &&
					subtitleWordSpacingUnits.Tablet
						? `word-spacing: ${ subtitleWordSpacing.Tablet }${ subtitleWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					subtitleTabletMarginCssStyle
						? `margin: ${ subtitleTabletMarginCssStyle };`
						: ''
				} 
                ${
					subtitleTabletPaddingCssStyle
						? `padding: ${ subtitleTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${
					titleFontSize.Tablet && titleFontSizeUnits.Tablet
						? `font-size: ${ titleFontSize.Tablet }${ titleFontSizeUnits.Tablet };`
						: ''
				}
                ${
					titleLineHeight.Tablet && titleLineHeightUnits.Tablet
						? `line-height: ${ titleLineHeight.Tablet }${ titleLineHeightUnits.Tablet };`
						: ''
				}
                ${
					titleLetterSpacing.Tablet && titleLetterSpacingUnits.Tablet
						? `letter-spacing: ${ titleLetterSpacing.Tablet }${ titleLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					titleWordSpacing.Tablet && titleWordSpacingUnits.Tablet
						? `word-spacing: ${ titleWordSpacing.Tablet }${ titleWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					titleTabletMarginCssStyle
						? `margin: ${ titleTabletMarginCssStyle };`
						: ''
				} 
                ${
					titleTabletPaddingCssStyle
						? `padding: ${ titleTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${
					descriptionFontSize.Tablet &&
					descriptionFontSizeUnits.Tablet
						? `font-size: ${ descriptionFontSize.Tablet }${ descriptionFontSizeUnits.Tablet };`
						: ''
				}
                ${
					descriptionLineHeight.Tablet &&
					descriptionLineHeightUnits.Tablet
						? `line-height: ${ descriptionLineHeight.Tablet }${ descriptionLineHeightUnits.Tablet };`
						: ''
				}
                ${
					descriptionLetterSpacing.Tablet &&
					descriptionLetterSpacingUnits.Tablet
						? `letter-spacing: ${ descriptionLetterSpacing.Tablet }${ descriptionLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					descriptionWordSpacing.Tablet &&
					descriptionWordSpacingUnits.Tablet
						? `word-spacing: ${ descriptionWordSpacing.Tablet }${ descriptionWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					descriptionTabletMarginCssStyle
						? `margin: ${ descriptionTabletMarginCssStyle };`
						: ''
				} 
                ${
					descriptionTabletPaddingCssStyle
						? `padding: ${ descriptionTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${
					primaryButtonFontSize.Tablet &&
					primaryButtonFontSizeUnits.Tablet
						? `font-size: ${ primaryButtonFontSize.Tablet }${ primaryButtonFontSizeUnits.Tablet };`
						: ''
				}
                ${
					primaryButtonLineHeight.Tablet &&
					primaryButtonLineHeightUnits.Tablet
						? `line-height: ${ primaryButtonLineHeight.Tablet }${ primaryButtonLineHeightUnits.Tablet };`
						: ''
				}
                ${
					primaryButtonLetterSpacing.Tablet &&
					primaryButtonLetterSpacingUnits.Tablet
						? `letter-spacing: ${ primaryButtonLetterSpacing.Tablet }${ primaryButtonLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					primaryButtonWordSpacing.Tablet &&
					primaryButtonWordSpacingUnits.Tablet
						? `word-spacing: ${ primaryButtonWordSpacing.Tablet }${ primaryButtonWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					primaryButtonTabletBorderCssStyle
						? `border-width: ${ primaryButtonTabletBorderCssStyle };`
						: ''
				}  
                ${
					primaryButtonTabletBorderRadiusCssStyle
						? `border-radius: ${ primaryButtonTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					primaryButtonTabletMarginCssStyle
						? `margin: ${ primaryButtonTabletMarginCssStyle };`
						: ''
				} 
                ${
					primaryButtonTabletPaddingCssStyle
						? `padding: ${ primaryButtonTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${
					secondaryButtonFontSize.Tablet &&
					secondaryButtonFontSizeUnits.Tablet
						? `font-size: ${ secondaryButtonFontSize.Tablet }${ secondaryButtonFontSizeUnits.Tablet };`
						: ''
				}
                ${
					secondaryButtonLineHeight.Tablet &&
					secondaryButtonLineHeightUnits.Tablet
						? `line-height: ${ secondaryButtonLineHeight.Tablet }${ secondaryButtonLineHeightUnits.Tablet };`
						: ''
				}
                ${
					secondaryButtonLetterSpacing.Tablet &&
					secondaryButtonLetterSpacingUnits.Tablet
						? `letter-spacing: ${ secondaryButtonLetterSpacing.Tablet }${ secondaryButtonLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					secondaryButtonWordSpacing.Tablet &&
					secondaryButtonWordSpacingUnits.Tablet
						? `word-spacing: ${ secondaryButtonWordSpacing.Tablet }${ secondaryButtonWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					secondaryButtonTabletBorderCssStyle
						? `border-width: ${ secondaryButtonTabletBorderCssStyle };`
						: ''
				}  
                ${
					secondaryButtonTabletBorderRadiusCssStyle
						? `border-radius: ${ secondaryButtonTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					secondaryButtonTabletMarginCssStyle
						? `margin: ${ secondaryButtonTabletMarginCssStyle };`
						: ''
				} 
                ${
					secondaryButtonTabletPaddingCssStyle
						? `padding: ${ secondaryButtonTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper.outside {
                ${
					navigationArrowPosition === 'top-left' ||
					navigationArrowPosition === 'top-center' ||
					navigationArrowPosition === 'top-right'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet } 0 0;
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left' ||
					navigationArrowPosition === 'bottom-center' ||
					navigationArrowPosition === 'bottom-right'
						? `
                    padding: 0 0 ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet };
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'center'
						? `
                    padding: 0 ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet };

                `
						: ''
				}
            }

            ${
				navigationArrowPosition && navigationArrowPosition !== 'center'
					? `

                .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
                .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } { 
                    gap: ${
						navigationArrowGap.Tablet
							? `${ navigationArrowGap.Tablet }${ navigationArrowGapUnits.Tablet }`
							: '10px'
					};
                    ${
						navigationArrowPosition === 'top-left'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-center'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-right'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Tablet
								? `${ navigationArrowPositionRightOffset.Tablet }${ navigationArrowPositionRightOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-left'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-center'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-right'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Tablet
								? `${ navigationArrowPositionRightOffset.Tablet }${ navigationArrowPositionRightOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
                }
                    
            `
					: ''
			}

            .${ blockId } .swiper-button-prev,
            .${ blockId } .swiper-button-next {
                ${
					navigationArrowTabletBorderCssStyle
						? `border-width: ${ navigationArrowTabletBorderCssStyle };`
						: ''
				}  
                ${
					navigationArrowTabletBorderRadiusCssStyle
						? `border-radius: ${ navigationArrowTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					navigationArrowWidth.Tablet
						? `width: ${ navigationArrowWidth.Tablet }${ navigationArrowWidthUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowHeight.Tablet
						? `height: ${ navigationArrowHeight.Tablet }${ navigationArrowHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${
					navigationArrowSize.Tablet
						? `width: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowSize.Tablet
						? `height: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${
					navigationArrowSize.Tablet
						? `width: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowSize.Tablet
						? `height: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-button-prev:after,
            .${ blockId } .swiper-button-next:after {
                ${
					navigationArrowSize.Tablet
						? `font-size: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination {
                ${ ( () => {
					if ( paginationType === 'progressbar' ) {
						return paginationProgressbarPosition.Tablet
							? `top: ${ paginationProgressbarPosition.Tablet }${ paginationProgressbarPositionUnits.Tablet } !important;`
							: '';
					}
					return paginationDotsPosition.Tablet
						? `bottom: ${ paginationDotsPosition.Tablet }${ paginationDotsPositionUnits.Tablet } !important;`
						: '';
				} )() }
                ${
					paginationDotsTabletMarginCssStyle
						? `margin: ${ paginationDotsTabletMarginCssStyle };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet {
                ${
					paginationNormalDotsTabletBorderCssStyle
						? `border-width: ${ paginationNormalDotsTabletBorderCssStyle };`
						: ''
				}   
                ${
					paginationNormalDotsTabletBorderRadiusCssStyle
						? `border-radius: ${ paginationNormalDotsTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationNormalDotsWidth.Tablet
						? `width: ${ paginationNormalDotsWidth.Tablet }${ paginationNormalDotsWidthUnits.Tablet };`
						: ''
				}
                ${
					paginationNormalDotsHeight.Tablet
						? `height: ${ paginationNormalDotsHeight.Tablet }${ paginationNormalDotsHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet-active {
                ${
					paginationActiveDotsTabletBorderCssStyle
						? `border-width: ${ paginationActiveDotsTabletBorderCssStyle };`
						: ''
				}   
                ${
					paginationActiveDotsTabletBorderRadiusCssStyle
						? `border-radius: ${ paginationActiveDotsTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationActiveDotsWidth.Tablet
						? `width: ${ paginationActiveDotsWidth.Tablet }${ paginationActiveDotsWidthUnits.Tablet };`
						: ''
				}
                ${
					paginationActiveDotsHeight.Tablet
						? `height: ${ paginationActiveDotsHeight.Tablet }${ paginationActiveDotsHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-fraction { 
                ${
					paginationFractionFontSize.Tablet &&
					paginationFractionFontSizeUnits.Tablet
						? `font-size: ${ paginationFractionFontSize.Tablet }${ paginationFractionFontSizeUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionLineHeight.Tablet &&
					paginationFractionLineHeightUnits.Tablet
						? `line-height: ${ paginationFractionLineHeight.Tablet }${ paginationFractionLineHeightUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionLetterSpacing.Tablet &&
					paginationFractionLetterSpacingUnits.Tablet
						? `letter-spacing: ${ paginationFractionLetterSpacing.Tablet }${ paginationFractionLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionWordSpacing.Tablet &&
					paginationFractionWordSpacingUnits.Tablet
						? `word-spacing: ${ paginationFractionWordSpacing.Tablet }${ paginationFractionWordSpacingUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-progressbar {
                ${
					paginationProgressbarHeight.Tablet
						? `height: ${ paginationProgressbarHeight.Tablet }${ paginationProgressbarHeightUnits.Tablet };`
						: ''
				}
            }

            ${
				paginationPositionType === 'outside'
					? `   
                .${ blockId }.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-fraction {
                    bottom: -${ ( () => {
						if ( paginationOutsideOffset?.Tablet ) {
							return `${ paginationOutsideOffset.Tablet }${
								paginationOutsideOffsetUnits?.Tablet || 'px'
							}`;
						}
						if ( paginationOutsideOffset?.Desktop ) {
							return `${ paginationOutsideOffset.Desktop }${
								paginationOutsideOffsetUnits?.Desktop || 'px'
							}`;
						}
						return '30px';
					} )() } !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside'
					? `
                ${ ( () => {
					if ( showPagination?.Tablet ) {
						const tabletOffset = ( () => {
							if ( paginationOutsideOffset?.Tablet ) {
								return `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
								}`;
							}
							if ( paginationOutsideOffset?.Desktop ) {
								return `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
								}`;
							}
							return '30px';
						} )();
						return `
                    .${ blockId }.gslider-base-wrapper.has-pagination {
                        margin-bottom: ${ tabletOffset };
                    }
                `;
					}
					if ( showPagination?.Desktop ) {
						return `
                    .${ blockId }.gslider-base-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `;
					}
					return '';
				} )() }
            `
					: ''
			}
        }
        
        @media only screen and (max-width: 767px) {

            .${ blockId }.gslider-base-wrapper {
                ${ globalMobileBackgroundNormalStyles }
                ${
					globalMarginMobileCssStyle
						? `margin: ${ globalMarginMobileCssStyle };`
						: ''
				} 
                ${
					globalPaddingMobileCssStyle
						? `padding: ${ globalPaddingMobileCssStyle };`
						: ''
				}
                ${
					globalBorderMobileCssStyle
						? `border-width: ${ globalBorderMobileCssStyle };`
						: ''
				}  
                ${
					globalBorderRadiusMobileCssStyle
						? `border-radius: ${ globalBorderRadiusMobileCssStyle };`
						: ''
				}
                ${
					globalZIndex.Mobile
						? `z-index: ${ globalZIndex.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper:hover { 
                ${ globalMobileBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper {
                ${
					layoutHeight.Mobile && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }

            .${ blockId } .swiper-slide{
                ${
					layoutHeight.Mobile && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-base-wrapper .gslider-content-wrapper {
                ${
					contentVerticalAlignment?.Mobile
						? `justify-content: ${ contentVerticalAlignment.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${
					contentWidth?.Mobile
						? `max-width: ${ contentWidth.Mobile }${ contentWidthUnits?.Mobile };`
						: ''
				}
                ${
					contentAlignment?.Mobile
						? `text-align: ${ contentAlignment.Mobile };`
						: ''
				}

                ${
					contentHorizontalAlignment?.Mobile === 'left'
						? `margin-right: auto; margin-left: 0;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Mobile === 'center'
						? `margin-left: auto; margin-right: auto;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Mobile === 'right'
						? `margin-left: auto; margin-right: 0;`
						: ''
				}
                ${
					contentPaddingMobileCssStyle
						? `padding: ${ contentPaddingMobileCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${
					subtitleFontSize.Mobile && subtitleFontSizeUnits.Mobile
						? `font-size: ${ subtitleFontSize.Mobile }${ subtitleFontSizeUnits.Mobile };`
						: ''
				}
                ${
					subtitleLineHeight.Mobile && subtitleLineHeightUnits.Mobile
						? `line-height: ${ subtitleLineHeight.Mobile }${ subtitleLineHeightUnits.Mobile };`
						: ''
				}
                ${
					subtitleLetterSpacing.Mobile &&
					subtitleLetterSpacingUnits.Mobile
						? `letter-spacing: ${ subtitleLetterSpacing.Mobile }${ subtitleLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					subtitleWordSpacing.Mobile &&
					subtitleWordSpacingUnits.Mobile
						? `word-spacing: ${ subtitleWordSpacing.Mobile }${ subtitleWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					subtitleMobileMarginCssStyle
						? `margin: ${ subtitleMobileMarginCssStyle };`
						: ''
				} 
                ${
					subtitleMobilePaddingCssStyle
						? `padding: ${ subtitleMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${
					titleFontSize.Mobile && titleFontSizeUnits.Mobile
						? `font-size: ${ titleFontSize.Mobile }${ titleFontSizeUnits.Mobile };`
						: ''
				}
                ${
					titleLineHeight.Mobile && titleLineHeightUnits.Mobile
						? `line-height: ${ titleLineHeight.Mobile }${ titleLineHeightUnits.Mobile };`
						: ''
				}
                ${
					titleLetterSpacing.Mobile && titleLetterSpacingUnits.Mobile
						? `letter-spacing: ${ titleLetterSpacing.Mobile }${ titleLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					titleWordSpacing.Mobile && titleWordSpacingUnits.Mobile
						? `word-spacing: ${ titleWordSpacing.Mobile }${ titleWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					titleMobileMarginCssStyle
						? `margin: ${ titleMobileMarginCssStyle };`
						: ''
				} 
                ${
					titleMobilePaddingCssStyle
						? `padding: ${ titleMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${
					descriptionFontSize.Mobile &&
					descriptionFontSizeUnits.Mobile
						? `font-size: ${ descriptionFontSize.Mobile }${ descriptionFontSizeUnits.Mobile };`
						: ''
				}
                ${
					descriptionLineHeight.Mobile &&
					descriptionLineHeightUnits.Mobile
						? `line-height: ${ descriptionLineHeight.Mobile }${ descriptionLineHeightUnits.Mobile };`
						: ''
				}
                ${
					descriptionLetterSpacing.Mobile &&
					descriptionLetterSpacingUnits.Mobile
						? `letter-spacing: ${ descriptionLetterSpacing.Mobile }${ descriptionLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					descriptionWordSpacing.Mobile &&
					descriptionWordSpacingUnits.Mobile
						? `word-spacing: ${ descriptionWordSpacing.Mobile }${ descriptionWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					descriptionMobileMarginCssStyle
						? `margin: ${ descriptionMobileMarginCssStyle };`
						: ''
				} 
                ${
					descriptionMobilePaddingCssStyle
						? `padding: ${ descriptionMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${
					primaryButtonFontSize.Mobile &&
					primaryButtonFontSizeUnits.Mobile
						? `font-size: ${ primaryButtonFontSize.Mobile }${ primaryButtonFontSizeUnits.Mobile };`
						: ''
				}
                ${
					primaryButtonLineHeight.Mobile &&
					primaryButtonLineHeightUnits.Mobile
						? `line-height: ${ primaryButtonLineHeight.Mobile }${ primaryButtonLineHeightUnits.Mobile };`
						: ''
				}
                ${
					primaryButtonLetterSpacing.Mobile &&
					primaryButtonLetterSpacingUnits.Mobile
						? `letter-spacing: ${ primaryButtonLetterSpacing.Mobile }${ primaryButtonLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					primaryButtonWordSpacing.Mobile &&
					primaryButtonWordSpacingUnits.Mobile
						? `word-spacing: ${ primaryButtonWordSpacing.Mobile }${ primaryButtonWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					primaryButtonMobileBorderCssStyle
						? `border-width: ${ primaryButtonMobileBorderCssStyle };`
						: ''
				}  
                ${
					primaryButtonMobileBorderRadiusCssStyle
						? `border-radius: ${ primaryButtonMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					primaryButtonMobileMarginCssStyle
						? `margin: ${ primaryButtonMobileMarginCssStyle };`
						: ''
				} 
                ${
					primaryButtonMobilePaddingCssStyle
						? `padding: ${ primaryButtonMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${
					secondaryButtonFontSize.Mobile &&
					secondaryButtonFontSizeUnits.Mobile
						? `font-size: ${ secondaryButtonFontSize.Mobile }${ secondaryButtonFontSizeUnits.Mobile };`
						: ''
				}
                ${
					secondaryButtonLineHeight.Mobile &&
					secondaryButtonLineHeightUnits.Mobile
						? `line-height: ${ secondaryButtonLineHeight.Mobile }${ secondaryButtonLineHeightUnits.Mobile };`
						: ''
				}
                ${
					secondaryButtonLetterSpacing.Mobile &&
					secondaryButtonLetterSpacingUnits.Mobile
						? `letter-spacing: ${ secondaryButtonLetterSpacing.Mobile }${ secondaryButtonLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					secondaryButtonWordSpacing.Mobile &&
					secondaryButtonWordSpacingUnits.Mobile
						? `word-spacing: ${ secondaryButtonWordSpacing.Mobile }${ secondaryButtonWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					secondaryButtonMobileBorderCssStyle
						? `border-width: ${ secondaryButtonMobileBorderCssStyle };`
						: ''
				}  
                ${
					secondaryButtonMobileBorderRadiusCssStyle
						? `border-radius: ${ secondaryButtonMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					secondaryButtonMobileMarginCssStyle
						? `margin: ${ secondaryButtonMobileMarginCssStyle };`
						: ''
				} 
                ${
					secondaryButtonMobilePaddingCssStyle
						? `padding: ${ secondaryButtonMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-base-wrapper.outside {
                ${
					navigationArrowPosition === 'top-left' ||
					navigationArrowPosition === 'top-center' ||
					navigationArrowPosition === 'top-right'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile } 0 0;
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left' ||
					navigationArrowPosition === 'bottom-center' ||
					navigationArrowPosition === 'bottom-right'
						? `
                    padding: 0 0 ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile };
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'center'
						? `
                    padding: 0 ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile };

                `
						: ''
				}
            }

            ${
				navigationArrowPosition && navigationArrowPosition !== 'center'
					? `

                .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
                .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                    gap: ${
						navigationArrowGap.Mobile
							? `${ navigationArrowGap.Mobile }${ navigationArrowGapUnits.Mobile }`
							: '10px'
					};
                    ${
						navigationArrowPosition === 'top-left'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-center'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-right'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Mobile
								? `${ navigationArrowPositionRightOffset.Mobile }${ navigationArrowPositionRightOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-left'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-center'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-right'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Mobile
								? `${ navigationArrowPositionRightOffset.Mobile }${ navigationArrowPositionRightOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
                }
                    
            `
					: ''
			}

            .${ blockId } .swiper-button-prev,
            .${ blockId } .swiper-button-next {
                ${
					navigationArrowMobileBorderCssStyle
						? `border-width: ${ navigationArrowMobileBorderCssStyle };`
						: ''
				}  
                ${
					navigationArrowMobileBorderRadiusCssStyle
						? `border-radius: ${ navigationArrowMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					navigationArrowWidth.Mobile
						? `width: ${ navigationArrowWidth.Mobile }${ navigationArrowWidthUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowHeight.Mobile
						? `height: ${ navigationArrowHeight.Mobile }${ navigationArrowHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${
					navigationArrowSize.Mobile
						? `width: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowSize.Mobile
						? `height: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${
					navigationArrowSize.Mobile
						? `width: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowSize.Mobile
						? `height: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-button-prev:after,
            .${ blockId } .swiper-button-next:after {
                ${
					navigationArrowSize.Mobile
						? `font-size: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination {
                ${ ( () => {
					if ( paginationType === 'progressbar' ) {
						return paginationProgressbarPosition.Mobile
							? `top: ${ paginationProgressbarPosition.Mobile }${ paginationProgressbarPositionUnits.Mobile } !important;`
							: '';
					}
					return paginationDotsPosition.Mobile
						? `bottom: ${ paginationDotsPosition.Mobile }${ paginationDotsPositionUnits.Mobile } !important;`
						: '';
				} )() }
                ${
					paginationDotsMobileMarginCssStyle
						? `margin: ${ paginationDotsMobileMarginCssStyle };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet {
                ${
					paginationNormalDotsMobileBorderCssStyle
						? `border-width: ${ paginationNormalDotsMobileBorderCssStyle };`
						: ''
				}   
                ${
					paginationNormalDotsMobileBorderRadiusCssStyle
						? `border-radius: ${ paginationNormalDotsMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationNormalDotsWidth.Mobile
						? `width: ${ paginationNormalDotsWidth.Mobile }${ paginationNormalDotsWidthUnits.Mobile };`
						: ''
				}
                ${
					paginationNormalDotsHeight.Mobile
						? `height: ${ paginationNormalDotsHeight.Mobile }${ paginationNormalDotsHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet-active {
                ${
					paginationActiveDotsMobileBorderCssStyle
						? `border-width: ${ paginationActiveDotsMobileBorderCssStyle };`
						: ''
				}   
                ${
					paginationActiveDotsMobileBorderRadiusCssStyle
						? `border-radius: ${ paginationActiveDotsMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationActiveDotsWidth.Mobile
						? `width: ${ paginationActiveDotsWidth.Mobile }${ paginationActiveDotsWidthUnits.Mobile };`
						: ''
				}
                ${
					paginationActiveDotsHeight.Mobile
						? `height: ${ paginationActiveDotsHeight.Mobile }${ paginationActiveDotsHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-fraction { 
                ${
					paginationFractionFontSize.Mobile &&
					paginationFractionFontSizeUnits.Mobile
						? `font-size: ${ paginationFractionFontSize.Mobile }${ paginationFractionFontSizeUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionLineHeight.Mobile &&
					paginationFractionLineHeightUnits.Mobile
						? `line-height: ${ paginationFractionLineHeight.Mobile }${ paginationFractionLineHeightUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionLetterSpacing.Mobile &&
					paginationFractionLetterSpacingUnits.Mobile
						? `letter-spacing: ${ paginationFractionLetterSpacing.Mobile }${ paginationFractionLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionWordSpacing.Mobile &&
					paginationFractionWordSpacingUnits.Mobile
						? `word-spacing: ${ paginationFractionWordSpacing.Mobile }${ paginationFractionWordSpacingUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-progressbar {
                ${
					paginationProgressbarHeight.Mobile
						? `height: ${ paginationProgressbarHeight.Mobile }${ paginationProgressbarHeightUnits.Mobile };`
						: ''
				}
            }

            ${
				paginationPositionType === 'outside'
					? `
                .${ blockId }.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-base-wrapper .swiper-pagination-fraction {
                    bottom: -${ ( () => {
						if ( paginationOutsideOffset?.Mobile ) {
							return `${ paginationOutsideOffset.Mobile }${
								paginationOutsideOffsetUnits?.Mobile || 'px'
							}`;
						}
						if ( paginationOutsideOffset?.Tablet ) {
							return `${ paginationOutsideOffset.Tablet }${
								paginationOutsideOffsetUnits?.Tablet || 'px'
							}`;
						}
						if ( paginationOutsideOffset?.Desktop ) {
							return `${ paginationOutsideOffset.Desktop }${
								paginationOutsideOffsetUnits?.Desktop || 'px'
							}`;
						}
						return '30px';
					} )() } !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside'
					? `
                ${ ( () => {
					if ( showPagination?.Mobile ) {
						const mobileOffset = ( () => {
							if ( paginationOutsideOffset?.Mobile ) {
								return `${ paginationOutsideOffset.Mobile }${
									paginationOutsideOffsetUnits?.Mobile || 'px'
								}`;
							}
							if ( paginationOutsideOffset?.Tablet ) {
								return `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
								}`;
							}
							if ( paginationOutsideOffset?.Desktop ) {
								return `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
								}`;
							}
							return '30px';
						} )();
						return `
                    .${ blockId }.gslider-base-wrapper.has-pagination {
                        margin-bottom: ${ mobileOffset };
                    }
                `;
					}
					if ( showPagination?.Desktop || showPagination?.Tablet ) {
						return `
                    .${ blockId }.gslider-base-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `;
					}
					return '';
				} )() }
            `
					: ''
			}
        }
    `;
	/** End All Block Style */

	return `${ baseSliderCSS } ${ sliderItemColorStyle }`
		.replace( /\s+/g, ' ' )
		.trim();
};

export default generateBaseSliderStyle;
