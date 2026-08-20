# Comprehensive GSlider Block Attribute Patterns & Taxonomies

This document catalogs every attribute pattern, data structure, and UI control schema across all 6 existing GSlider blocks:
1. **Base Slider** (`src/blocks/base/attributes.js`)
2. **Flexi Content Container** (`src/blocks/flexi-content/attributes.js`)
3. **Flexi Content Item** (`src/blocks/flexi-content-item/attributes.js`)
4. **Image Slider** (`src/blocks/image-slider/attributes.js`)
5. **Logo Carousel** (`src/blocks/logo-carousel/attributes.js`)
6. **Testimonial Slider** (`src/blocks/testimonial/attributes.js`)

---

## 📑 Table of Contents
1. [Core Identification & State Attributes](#1-core-identification--state-attributes)
2. [Data Model / Slide Items Schema](#2-data-model--slide-items-schema)
3. [Swiper Settings & Playback Attributes](#3-swiper-settings--playback-attributes)
4. [Element Visibility & Semantic HTML Tags](#4-element-visibility--semantic-html-tags)
5. [Layout, Dimensions & Alignment](#5-layout-dimensions--alignment)
6. [Standard 8-Key Spacing (Padding & Margin)](#6-standard-8-key-spacing-padding--margin)
7. [Standard 13-Key Typography](#7-standard-13-key-typography)
8. [Color, Background & Gradient Schema](#8-color-background--gradient-schema)
9. [Border, Border Radius & Box Shadow Schema](#9-border-border-radius--box-shadow-schema)
10. [Navigation Arrows Complete Schema](#10-navigation-arrows-complete-schema)
11. [Pagination Complete Schema](#11-pagination-complete-schema)
12. [Media & Image Attributes (Image Slider & Logo Carousel)](#12-media--image-attributes)
13. [Testimonial Specific Attributes (Rating, Author, Content Order)](#13-testimonial-specific-attributes)
14. [Nested / InnerBlocks Attributes (Flexi Content)](#14-nested--innerblocks-attributes)
15. [Global & Advanced Attributes](#15-global--advanced-attributes)

---

## 1. Core Identification & State Attributes
Every block MUST declare these first three attributes:
```javascript
blockId: {
    type: "string",
    default: "",
},
deviceType: {
    type: "string",
    default: "Desktop",
},
blockStyle: {
    type: "string",
    default: "",
},
```

---

## 2. Data Model / Slide Items Schema

### A. Static Item-Based (Base Slider / Testimonial)
```javascript
sliderItems: {
    type: "array",
    default: [
        {
            id: "item-1",
            // Content fields
            subTitle: "Sub Title",
            title: "Slider Item 1",
            description: "Description text...",
            primaryButtonText: "Get Started",
            primaryButtonLink: "#",
            primaryButtonTargetLink: true,
            primaryButtonNofollow: false,
            primaryButtonSponsored: false,

            secondaryButtonSwitcher: false,
            secondaryButtonText: "Get Started",
            secondaryButtonLink: "#",
            secondaryButtonTargetLink: true,
            secondaryButtonNofollow: false,
            secondaryButtonSponsored: false,

            // Item background (classic, gradient, image)
            normalItemBackgroundType: "classic",
            normalItemClassicColor: "#EDEDED",
            normalItemGradientColor: null,
            normalItemCustomGradientSwitcher: false,
            normalItemCustomGradientInputValue: "",

            normalBackgroundImageUrl: { Desktop: "", Tablet: "", Mobile: "" },
            normalBackgroundImageAlt: { Desktop: "", Tablet: "", Mobile: "" },
            normalBackgroundImageID: { Desktop: "", Tablet: "", Mobile: "" },
            normalBackgroundImagePosition: {
                Desktop: { x: 0.5, y: 0.5 },
                Tablet: { x: 0.5, y: 0.5 },
                Mobile: { x: 0.5, y: 0.5 },
            },
            normalBackgroundImageAttachment: { Desktop: "scroll", Tablet: "scroll", Mobile: "scroll" },
            normalBackgroundImageRepeat: { Desktop: "no-repeat", Tablet: "no-repeat", Mobile: "no-repeat" },
            normalBackgroundImageSize: { Desktop: "cover", Tablet: "cover", Mobile: "cover" },

            // Overlay
            itemBackgroundOverlaySwitcher: false,
            itemBackgroundOverlayType: "classic",
            itemBackgroundOverlayClassicColor: "#000000",
            itemBackgroundOverlayGradientColor: null,
            itemBackgroundOverlayCustomGradientSwitcher: false,
            itemBackgroundOverlayCustomGradientInputValue: "",
            itemBackgroundOverlayOpacity: 0.5,
        }
    ]
}
```

### B. Media Array (Image Slider & Logo Carousel)
```javascript
images: { // or 'logos'
    type: 'array',
    default: [],
    items: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            url: { type: 'string' },
            alt: { type: 'string' },
            link: { type: 'string' },
            caption: { type: 'string' },
            tooltipText: { type: 'string' }
        }
    }
}
```

---

## 3. Swiper Settings & Playback Attributes
```javascript
/** Start Carousel Settings */
sliderType: {
    type: "string",
    default: "slider", // 'slider' | 'carousel'
},
carouselPerColumn: {
    type: "object",
    default: { Desktop: 3, Tablet: 2, Mobile: 1 },
},
carouselPerColumnGap: {
    type: "object",
    default: { Desktop: 20, Tablet: 15, Mobile: 10 },
},
speed: {
    type: "object",
    default: { Desktop: 800, Tablet: 800, Mobile: 800 },
},
autoplay: {
    type: "boolean",
    default: false,
},
enableLazyLoad: {
    type: "boolean",
    default: false,
},
autoplayDelay: {
    type: "object",
    default: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
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
    default: false,
},
stopOnLastSlide: {
    type: "boolean",
    default: false,
},
reverseDirection: {
    type: "boolean",
    default: false,
},
slideEffect: {
    type: "string",
    default: "slide", // 'slide' | 'fade' | 'coverflow' | 'flip' | 'creative'
},
carouselEffect: {
    type: "string",
    default: "slide", // 'slide' | 'coverflow'
},
mousewheelControl: {
    type: "boolean",
    default: false,
},
keyboardNavigation: {
    type: 'boolean',
    default: false,
},
/** End Carousel Settings */
```

---

## 4. Element Visibility & Semantic HTML Tags
```javascript
/** Start Show/Hide Elements */
showSubTitle: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
showTitle: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
showDescription: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
showButton: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
showNavigation: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
showPagination: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
subTitleHtmlTag: {
    type: "string",
    default: "h4",
},
titleHtmlTag: {
    type: "string",
    default: "h2",
},
descriptionHtmlTag: {
    type: "string",
    default: "p",
},
/** End Show/Hide Elements */
```

---

## 5. Layout, Dimensions & Alignment
```javascript
/** Start Layout & Content Setting */
layoutHeightSwitcher: {
    type: "string",
    default: "fixed", // 'fixed' | 'adapt'
},
layoutHeight: {
    type: "object",
    default: { Desktop: "500", Tablet: "400", Mobile: "300" },
},
layoutHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
contentWidth: {
    type: "object",
    default: { Desktop: "800", Tablet: "600", Mobile: "100" },
},
contentWidthUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "%" },
},
contentAlignment: {
    type: "object",
    default: { Desktop: "center", Tablet: "center", Mobile: "center" },
},
contentVerticalAlignment: {
    type: "object",
    default: { Desktop: "center", Tablet: "center", Mobile: "center" },
},
contentHorizontalAlignment: {
    type: "object",
    default: { Desktop: "center", Tablet: "center", Mobile: "center" },
},
/** End Layout & Content Setting */
```

---

## 6. Standard 8-Key Spacing (Padding & Margin)
For ANY padding or margin control, ALWAYS produce these 8 attributes:
```javascript
// Pattern for '<prefix>Padding' or '<prefix>Margin'
<prefix>PaddingUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>PaddingDesktop: {
    type: "object",
    default: { top: "20", right: "20", bottom: "20", left: "20" },
},
<prefix>PaddingDesktopCssStyle: {
    type: "string",
    default: "20px 20px 20px 20px",
},
<prefix>PaddingTablet: {
    type: "object",
    default: { top: "15", right: "15", bottom: "15", left: "15" },
},
<prefix>PaddingTabletCssStyle: {
    type: "string",
    default: "15px 15px 15px 15px",
},
<prefix>PaddingMobile: {
    type: "object",
    default: { top: "10", right: "10", bottom: "10", left: "10" },
},
<prefix>PaddingMobileCssStyle: {
    type: "string",
    default: "10px 10px 10px 10px",
},
<prefix>PaddingLink: {
    type: "boolean",
    default: true,
},
```

---

## 7. Standard 13-Key Typography
For ANY text element (`title`, `subtitle`, `description`, `authorName`, `authorDesignation`, `caption`, `primaryButton`), ALWAYS produce these 13 attributes:
```javascript
<prefix>FontFamily: {
    type: "string",
    default: "",
},
<prefix>FontSize: {
    type: "object",
    default: { Desktop: "24", Tablet: "20", Mobile: "18" },
},
<prefix>FontSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>FontWeight: {
    type: "string",
    default: "inherit",
},
<prefix>FontStyle: {
    type: "string",
    default: "inherit",
},
<prefix>TextTransform: {
    type: "string",
    default: "inherit",
},
<prefix>TextDecoration: {
    type: "string",
    default: "inherit",
},
<prefix>LineHeight: {
    type: "object",
    default: { Desktop: "", Tablet: "", Mobile: "" },
},
<prefix>LineHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>LetterSpacing: {
    type: "object",
    default: { Desktop: "", Tablet: "", Mobile: "" },
},
<prefix>LetterSpacingUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>WordSpacing: {
    type: "object",
    default: { Desktop: "", Tablet: "", Mobile: "" },
},
<prefix>WordSpacingUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
```

---

## 8. Color, Background & Gradient Schema

### Color & Hover
```javascript
<prefix>ColorSwitcher: {
    type: "boolean",
    default: false,
},
<prefix>Color: {
    type: "string",
    default: "#333333",
},
<prefix>ColorHover: {
    type: "string",
    default: "",
},
```

### Background Control Schema (Classic, Gradient, Image, Overlay)
```javascript
<prefix>BackgroundType: {
    type: "string",
    default: "classic", // 'classic' | 'gradient'
},
<prefix>ClassicColor: {
    type: "string",
    default: "#ffffff",
},
<prefix>GradientColor: {
    type: "string",
    default: null,
},
<prefix>CustomGradientSwitcher: {
    type: "boolean",
    default: false,
},
<prefix>CustomGradientInputValue: {
    type: "string",
    default: "",
},
```

---

## 9. Border, Border Radius & Box Shadow Schema

### Border (11 Keys)
```javascript
<prefix>BorderStyle: {
    type: "string",
    default: "none",
},
<prefix>BorderColor: {
    type: "string",
    default: "",
},
<prefix>BorderHoverColor: {
    type: "string",
    default: "",
},
<prefix>BorderUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>DesktopBorder: {
    type: "object",
    default: { top: "1", right: "1", bottom: "1", left: "1" },
},
<prefix>DesktopBorderCssStyle: {
    type: "string",
    default: "1px 1px 1px 1px",
},
<prefix>TabletBorder: {
    type: "object",
    default: { top: "1", right: "1", bottom: "1", left: "1" },
},
<prefix>TabletBorderCssStyle: {
    type: "string",
    default: "1px 1px 1px 1px",
},
<prefix>MobileBorder: {
    type: "object",
    default: { top: "1", right: "1", bottom: "1", left: "1" },
},
<prefix>MobileBorderCssStyle: {
    type: "string",
    default: "1px 1px 1px 1px",
},
<prefix>BorderLink: {
    type: "boolean",
    default: true,
},
```

### Border Radius (8 Keys)
```javascript
<prefix>BorderRadiusUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
<prefix>DesktopBorderRadius: {
    type: "object",
    default: { top: "4", right: "4", bottom: "4", left: "4" },
},
<prefix>DesktopBorderRadiusCssStyle: {
    type: "string",
    default: "4px 4px 4px 4px",
},
<prefix>TabletBorderRadius: {
    type: "object",
    default: { top: "4", right: "4", bottom: "4", left: "4" },
},
<prefix>TabletBorderRadiusCssStyle: {
    type: "string",
    default: "4px 4px 4px 4px",
},
<prefix>MobileBorderRadius: {
    type: "object",
    default: { top: "4", right: "4", bottom: "4", left: "4" },
},
<prefix>MobileBorderRadiusCssStyle: {
    type: "string",
    default: "4px 4px 4px 4px",
},
<prefix>BorderRadiusLink: {
    type: "boolean",
    default: true,
},
```

### Box Shadow (Normal & Hover)
```javascript
<prefix>BoxShadowSwitcher: {
    type: "boolean",
    default: false,
},
<prefix>BoxShadowX: {
    type: "number",
    default: 0,
},
<prefix>BoxShadowY: {
    type: "number",
    default: 4,
},
<prefix>BoxShadowBlur: {
    type: "number",
    default: 10,
},
<prefix>BoxShadowSpread: {
    type: "number",
    default: 0,
},
<prefix>BoxShadowColor: {
    type: "string",
    default: "rgba(0,0,0,0.1)",
},
<prefix>BoxShadowInset: {
    type: "boolean",
    default: false,
},
<prefix>BoxShadowHoverSwitcher: {
    type: "boolean",
    default: false,
},
<prefix>BoxShadowHoverX: {
    type: "number",
    default: 0,
},
<prefix>BoxShadowHoverY: {
    type: "number",
    default: 8,
},
<prefix>BoxShadowHoverBlur: {
    type: "number",
    default: 20,
},
<prefix>BoxShadowHoverSpread: {
    type: "number",
    default: 0,
},
<prefix>BoxShadowHoverColor: {
    type: "string",
    default: "rgba(0,0,0,0.15)",
},
<prefix>BoxShadowHoverInset: {
    type: "boolean",
    default: false,
},
```

---

## 10. Navigation Arrows Complete Schema
```javascript
/** Start Navigation Arrow */
navigationArrowPositionType: {
    type: "string",
    default: "inside", // 'inside' | 'outside'
},
navigationArrowPosition: {
    type: "string",
    default: "center", // 'center' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
},
navigationArrowPositionOutsidePadding: {
    type: "object",
    default: { Desktop: "50", Tablet: "40", Mobile: "30" },
},
navigationArrowPositionOutsidePaddingUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowPositionTopOffset: {
    type: "object",
    default: { Desktop: "0", Tablet: "0", Mobile: "0" },
},
navigationArrowPositionTopOffsetUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowPositionLeftOffset: {
    type: "object",
    default: { Desktop: "0", Tablet: "0", Mobile: "0" },
},
navigationArrowPositionLeftOffsetUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowPositionRightOffset: {
    type: "object",
    default: { Desktop: "0", Tablet: "0", Mobile: "0" },
},
navigationArrowPositionRightOffsetUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowPositionBottomOffset: {
    type: "object",
    default: { Desktop: "0", Tablet: "0", Mobile: "0" },
},
navigationArrowPositionBottomOffsetUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowWidth: {
    type: "object",
    default: { Desktop: "40", Tablet: "36", Mobile: "32" },
},
navigationArrowWidthUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowHeight: {
    type: "object",
    default: { Desktop: "40", Tablet: "36", Mobile: "32" },
},
navigationArrowHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowSize: {
    type: "object",
    default: { Desktop: "20", Tablet: "18", Mobile: "16" },
},
navigationArrowSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowGap: {
    type: "object",
    default: { Desktop: "10", Tablet: "10", Mobile: "10" },
},
navigationArrowGapUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
navigationArrowsIconSwitcher: {
    type: "boolean",
    default: false,
},
navigationArrowsIconLeftAlign: {
    type: "string",
    default: "icon",
},
navigationArrowsIconLeft: {
    type: "string",
    default: "fas fa-chevron-left",
},
navigationArrowsIconRightAlign: {
    type: "string",
    default: "icon",
},
navigationArrowsIconRight: {
    type: "string",
    default: "fas fa-chevron-right",
},
navigationArrowColor: {
    type: "string",
    default: "#ffffff",
},
navigationArrowColorHover: {
    type: "string",
    default: "#ffffff",
},
navigationArrowBackgroundColor: {
    type: "string",
    default: "rgba(0,0,0,0.5)",
},
navigationArrowBackgroundColorHover: {
    type: "string",
    default: "rgba(0,0,0,0.8)",
},
/** End Navigation Arrow */
```

---

## 11. Pagination Complete Schema
```javascript
/** Start Pagination */
paginationType: {
    type: "string",
    default: "bullets", // 'bullets' | 'fraction' | 'progressbar'
},
paginationPositionType: {
    type: "string",
    default: "inside", // 'inside' | 'outside'
},
dynamicBullets: {
    type: "boolean",
    default: false,
},
paginationDotsPosition: {
    type: "object",
    default: { Desktop: "10", Tablet: "10", Mobile: "10" },
},
paginationDotsPositionUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationProgressbarPosition: {
    type: "object",
    default: { Desktop: "0", Tablet: "0", Mobile: "0" },
},
paginationProgressbarPositionUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationNormalDotsWidth: {
    type: "object",
    default: { Desktop: "8", Tablet: "8", Mobile: "8" },
},
paginationNormalDotsWidthUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationNormalDotsHeight: {
    type: "object",
    default: { Desktop: "8", Tablet: "8", Mobile: "8" },
},
paginationNormalDotsHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationNormalDotsColor: {
    type: "string",
    default: "rgba(0,0,0,0.3)",
},
paginationActiveDotsWidth: {
    type: "object",
    default: { Desktop: "24", Tablet: "24", Mobile: "24" },
},
paginationActiveDotsWidthUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationActiveDotsHeight: {
    type: "object",
    default: { Desktop: "8", Tablet: "8", Mobile: "8" },
},
paginationActiveDotsHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationActiveDotsColor: {
    type: "string",
    default: "#0073aa",
},
paginationFractionFontSize: {
    type: "object",
    default: { Desktop: "14", Tablet: "14", Mobile: "12" },
},
paginationFractionFontSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationFractionColor: {
    type: "string",
    default: "#333333",
},
paginationProgressbarHeight: {
    type: "object",
    default: { Desktop: "4", Tablet: "4", Mobile: "4" },
},
paginationProgressbarHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
paginationProgressbarColor: {
    type: "string",
    default: "#0073aa",
},
/** End Pagination */
```

---

## 12. Media & Image Attributes (Image Slider & Logo Carousel)
```javascript
/** Image / Logo Display Attributes */
imageSize: {
    type: "string",
    default: "full", // 'full' | 'large' | 'medium' | 'thumbnail' | 'custom'
},
imageCustomWidth: {
    type: "object",
    default: { Desktop: "100", Tablet: "100", Mobile: "100" },
},
imageCustomWidthUnits: {
    type: "object",
    default: { Desktop: "%", Tablet: "%", Mobile: "%" },
},
imageCustomHeight: {
    type: "object",
    default: { Desktop: "400", Tablet: "300", Mobile: "200" },
},
imageCustomHeightUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
imageObjectFit: {
    type: "string",
    default: "cover", // 'cover' | 'contain' | 'fill' | 'scale-down'
},
enableLightbox: {
    type: "boolean",
    default: false,
},
showCaption: {
    type: "object",
    default: { Desktop: false, Tablet: false, Mobile: false },
},
captionPosition: {
    type: "string",
    default: "overlay", // 'overlay' | 'below' | 'above'
},
showTooltip: {
    type: "boolean",
    default: false,
},
imageFilter: {
    type: "string",
    default: "none", // 'none' | 'grayscale' | 'blur' | 'sepia'
},
imageHoverFilter: {
    type: "string",
    default: "none",
},
imageHoverAnimation: {
    type: "string",
    default: "scale-up", // 'scale-up' | 'scale-down' | 'lift' | 'none'
},
```

---

## 13. Testimonial Specific Attributes (Rating, Author, Content Order)
```javascript
presetStyle: {
    type: "string",
    default: "preset-classic", // 'preset-classic' | 'preset-modern' | 'preset-card' | 'preset-bubble'
},
contentOrder: {
    type: "array",
    default: DEFAULT_TESTIMONIAL_CONTENT_ORDER, // ['title', 'rating', 'text', 'author']
},
showRating: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
ratingNumber: {
    type: "number",
    default: 5,
},
ratingSize: {
    type: "object",
    default: { Desktop: "18", Tablet: "16", Mobile: "14" },
},
ratingSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
ratingColor: {
    type: "string",
    default: "#f5a623",
},
showAuthorImage: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
authorImageSize: {
    type: "object",
    default: { Desktop: "60", Tablet: "50", Mobile: "40" },
},
authorImageSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
showQuoteIcon: {
    type: "object",
    default: { Desktop: true, Tablet: true, Mobile: true },
},
quoteIconPosition: {
    type: "string",
    default: "top-left",
},
quoteIconSize: {
    type: "object",
    default: { Desktop: "32", Tablet: "28", Mobile: "24" },
},
quoteIconSizeUnits: {
    type: "object",
    default: { Desktop: "px", Tablet: "px", Mobile: "px" },
},
quoteIconColor: {
    type: "string",
    default: "rgba(0,0,0,0.1)",
},
```

---

## 14. Nested / InnerBlocks Attributes (Flexi Content)

### Parent Block (`flexi-content`)
Contains all Swiper controls, responsive breakpoints, autoplay, transitions, layout height mode, navigation, and pagination.

### Child Slide Item Block (`flexi-content-item`)
```javascript
sliderItemNormalBackgroundType: {
    type: "string",
    default: "classic",
},
sliderItemNormalClassicColor: {
    type: "string",
    default: "",
},
sliderItemNormalGradientColor: {
    type: "string",
    default: null,
},
sliderItemNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false,
},
sliderItemNormalCustomGradientInputValue: {
    type: "string",
    default: "",
},
sliderItemNormalBackgroundImageUrl: {
    type: "object",
    default: { Desktop: "", Tablet: "", Mobile: "" },
},
sliderItemNormalBackgroundImagePosition: {
    type: "object",
    default: {
        Desktop: { x: 0.5, y: 0.5 },
        Tablet: { x: 0.5, y: 0.5 },
        Mobile: { x: 0.5, y: 0.5 },
    },
},
sliderItemNormalBackgroundImageAttachment: {
    type: "object",
    default: { Desktop: "scroll", Tablet: "scroll", Mobile: "scroll" },
},
sliderItemNormalBackgroundImageRepeat: {
    type: "object",
    default: { Desktop: "no-repeat", Tablet: "no-repeat", Mobile: "no-repeat" },
},
sliderItemNormalBackgroundImageSize: {
    type: "object",
    default: { Desktop: "cover", Tablet: "cover", Mobile: "cover" },
},
sliderItemHoverBackgroundType: {
    type: "string",
    default: "classic",
},
sliderItemHoverClassicColor: {
    type: "string",
    default: "",
},
// ... Hover background image, overlay, border, radius, shadow
```

---

## 15. Global & Advanced Attributes
Every `attributes.js` file MUST conclude with:
```javascript
/** Start Advanced Setting */
globalID: {
    type: "string",
    default: "",
},
globalClass: {
    type: "string",
    default: "",
},
globalCustomCSS: {
    type: "string",
    default: "",
},
zIndex: {
    type: "object",
    default: { Desktop: 1, Tablet: 1, Mobile: 1 },
},
/** End Advanced Setting */
};

export default attributes;
```
