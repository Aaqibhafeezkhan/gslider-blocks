# Complete Block File Templates & Boilerplate Patterns

Every block in **GSlider Blocks** is constructed from exactly 12 standard files. This document provides the complete, production-ready blueprint and common patterns for each file.

---

## 📑 12-File Blueprint Index

| File | Role | Key Pattern / Responsibility |
| :--- | :--- | :--- |
| **1. `block.json`** | Block Metadata | API v3, category, keywords, script/style handles |
| **2. `index.js`** | Registration Entrypoint | Imports styles/components & calls `registerBlockType` |
| **3. `attributes.js`** | Attribute Schema | 15-section standard attribute definitions & defaults |
| **4. `edit.js`** | Editor React Component | ID generator, Swiper lifecycle, Inspector tabs, refs |
| **5. `save.js`** | Frontend HTML Save | Clean DOM markup & `data-swiper-settings` JSON |
| **6. `styling.js`** | Dynamic CSS Engine | Scoped CSS, breakpoints (1024px, 767px), custom CSS |
| **7. `view.js`** | Frontend Script | Vanilla JS Swiper initializer on `DOMContentLoaded` |
| **8. `inspector.js`** | Inspector Controls | 3 tabs (`General`, `Style`, `Advanced`) & `@Components` |
| **9. `style.scss`** | Core / Frontend CSS | Base layout, swiper overrides, navigation, pagination |
| **10. `editor.scss`** | Editor-only CSS | Drag-and-drop handles, selection outlines, canvas fixes |
| **11. `deprecated.js`** | Deprecation Migrations | Previous version schemas to prevent invalid block errors |
| **12. `icon.js`** | Block Inserter Icon | React SVG icon component |

---

## 1. `block.json` Boilerplate Pattern

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "gslider-blocks/<block-slug>",
  "version": "1.1.8",
  "title": "<Block Title>",
  "category": "gslider-blocks",
  "description": "<Block description text>",
  "keywords": [
    "slider",
    "carousel",
    "gslider"
  ],
  "example": {
    "attributes": {
      "preview": true
    },
    "viewportWidth": 410
  },
  "supports": {
    "html": false,
    "anchor": false,
    "align": [
      "wide",
      "full"
    ]
  },
  "textdomain": "gslider-blocks",
  "editorScript": [
    "file:./index.js",
    "gslider-blocks-swiper-script",
    "gslider-blocks-fslightbox-script"
  ],
  "editorStyle": [
    "file:./index.css",
    "gslider-blocks-swiper-style"
  ],
  "style": [
    "file:./style-index.css",
    "gslider-blocks-swiper-style"
  ],
  "viewScript": [
    "file:./view.js",
    "gslider-blocks-swiper-script",
    "gslider-blocks-fslightbox-script"
  ]
}
```

---

## 2. `index.js` Boilerplate Pattern

```javascript
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import attributes from './attributes';
import Icon from './icon';

registerBlockType(metadata.name, {
    attributes,
    edit: Edit,
    save,
    deprecated,
    icon: Icon,
});
```

---

## 3. `edit.js` Boilerplate Pattern

```javascript
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect, useRef } from '@wordpress/element';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import Inspector from './inspector';
import generateBlockStyle from './styling';

export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
    const {
        blockId,
        deviceType,
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
        showNavigation,
        showPagination,
        paginationPositionType,
        navigationArrowPositionType,
        navigationArrowPosition,
        layoutHeightSwitcher,
    } = attributes;

    // 1. Generate & synchronize unique blockId
    useBlockIdGenerator({
        clientId,
        blockId,
        blockPrefix: 'gslider',
        isSelected,
        attributes,
        setAttributes,
    });

    // 2. Generate and update blockStyle
    useEffect(() => {
        if (blockId) {
            const css = generateBlockStyle(attributes);
            setAttributes({ blockStyle: css });
        }
    }, [attributes, blockId]);

    // 3. Setup refs
    const swiperContainerRef = useRef(null);
    const swiperInstanceRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationInsideRef = useRef(null);
    const paginationOutsideRef = useRef(null);
    const panelRef = useRef(null);

    SwitchToBlockSettings(panelRef);

    // 4. Swiper Lifecycle in Editor (Destroy & Recreate)
    useEffect(() => {
        if (!window.Swiper || !swiperContainerRef.current) return;

        if (swiperInstanceRef.current) {
            swiperInstanceRef.current.destroy(true, true);
            swiperInstanceRef.current = null;
        }

        if (paginationInsideRef.current) paginationInsideRef.current.innerHTML = '';
        if (paginationOutsideRef.current) paginationOutsideRef.current.innerHTML = '';

        const swiperSettings = {
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
            ...(sliderType === 'carousel' && {
                breakpoints: {
                    0: {
                        slidesPerView: carouselPerColumn?.[deviceType] || 1,
                        spaceBetween: carouselPerColumnGap?.[deviceType] || 0,
                    },
                    768: {
                        slidesPerView: carouselPerColumn?.[deviceType] || 2,
                        spaceBetween: carouselPerColumnGap?.[deviceType] || 20,
                    },
                    1025: {
                        slidesPerView: carouselPerColumn?.[deviceType] || 3,
                        spaceBetween: carouselPerColumnGap?.[deviceType] || 30,
                    },
                },
            }),
            ...(layoutHeightSwitcher === 'adapt' && { autoHeight: true }),
            loop: infiniteLoop,
            autoplay: autoplay
                ? {
                    delay: autoplayDelay?.[deviceType] || 3000,
                    pauseOnMouseEnter: pauseOnHover,
                    disableOnInteraction: false,
                    stopOnLastSlide: stopOnLastSlide,
                    reverseDirection: reverseDirection,
                }
                : false,
            speed: speed?.[deviceType] || 800,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            keyboard: keyboardNavigation ? { enabled: true, onlyInViewport: true } : false,
            navigation: showNavigation?.[deviceType]
                ? { prevEl: prevRef.current, nextEl: nextRef.current }
                : false,
            pagination: showPagination?.[deviceType]
                ? {
                    el: paginationPositionType === 'outside'
                        ? paginationOutsideRef.current
                        : paginationInsideRef.current,
                    type: paginationType,
                    dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                    clickable: true,
                }
                : false,
        };

        swiperInstanceRef.current = new window.Swiper(swiperContainerRef.current, swiperSettings);

        return () => {
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.destroy(true, true);
                swiperInstanceRef.current = null;
            }
        };
    }, [
        sliderType,
        carouselPerColumn,
        carouselPerColumnGap,
        speed,
        autoplay,
        autoplayDelay,
        infiniteLoop,
        allowTouchMove,
        slideEffect,
        carouselEffect,
        showNavigation,
        showPagination,
        paginationPositionType,
        paginationType,
        deviceType,
    ]);

    const blockProps = useBlockProps({
        className: `gslider-<slug>-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.[deviceType] ? 'has-pagination' : ''}`,
    });

    return (
        <div {...blockProps}>
            <Inspector attributes={attributes} setAttributes={setAttributes} panelRef={panelRef} />

            <div className="swiper" ref={swiperContainerRef}>
                <div className="swiper-wrapper">
                    {/* Slides markup */}
                </div>

                {/* Navigation inside */}
                {showNavigation?.[deviceType] && navigationArrowPositionType === 'inside' && (
                    <>
                        <div className="swiper-button-prev" ref={prevRef}></div>
                        <div className="swiper-button-next" ref={nextRef}></div>
                    </>
                )}

                {/* Pagination inside */}
                {showPagination?.[deviceType] && paginationPositionType === 'inside' && (
                    <div className="swiper-pagination" ref={paginationInsideRef}></div>
                )}
            </div>

            {/* Navigation outside */}
            {showNavigation?.[deviceType] && navigationArrowPositionType === 'outside' && (
                <div className={`gslider-navigation-wrapper outside ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev" ref={prevRef}></div>
                    <div className="swiper-button-next" ref={nextRef}></div>
                </div>
            )}

            {/* Pagination outside */}
            {showPagination?.[deviceType] && paginationPositionType === 'outside' && (
                <div className="swiper-pagination outside" ref={paginationOutsideRef}></div>
            )}
        </div>
    );
}
```

---

## 4. `save.js` Boilerplate Pattern

```javascript
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        blockId,
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
        showNavigation,
        showPagination,
        paginationPositionType,
        navigationArrowPositionType,
        navigationArrowPosition,
        layoutHeightSwitcher,
    } = attributes;

    const navigationEnabled = {
        Mobile: !!showNavigation?.Mobile,
        Tablet: !!showNavigation?.Tablet,
        Desktop: !!showNavigation?.Desktop,
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;

    const paginationEnabled = {
        Mobile: !!showPagination?.Mobile,
        Tablet: !!showPagination?.Tablet,
        Desktop: !!showPagination?.Desktop,
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;

    const swiperSettings = JSON.stringify({
        effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
        breakpoints: {
            0: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Mobile || 1,
                    spaceBetween: carouselPerColumnGap?.Mobile || 0,
                }),
                speed: speed?.Mobile || 800,
                autoplay: autoplay ? { delay: autoplayDelay?.Mobile || 3000 } : false,
                navigation: { enabled: navigationEnabled.Mobile },
                pagination: { enabled: paginationEnabled.Mobile },
            },
            768: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Tablet || 2,
                    spaceBetween: carouselPerColumnGap?.Tablet || 20,
                }),
                speed: speed?.Tablet || 800,
                autoplay: autoplay ? { delay: autoplayDelay?.Tablet || 3000 } : false,
                navigation: { enabled: navigationEnabled.Tablet },
                pagination: { enabled: paginationEnabled.Tablet },
            },
            1025: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Desktop || 3,
                    spaceBetween: carouselPerColumnGap?.Desktop || 30,
                }),
                speed: speed?.Desktop || 800,
                autoplay: autoplay ? { delay: autoplayDelay?.Desktop || 3000 } : false,
                navigation: { enabled: navigationEnabled.Desktop },
                pagination: { enabled: paginationEnabled.Desktop },
            },
        },
        ...(layoutHeightSwitcher === 'adapt' && { autoHeight: true }),
        loop: infiniteLoop,
        autoplay: autoplay
            ? {
                delay: autoplayDelay?.Desktop || 3000,
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            }
            : false,
        speed: speed?.Desktop || 800,
        allowTouchMove: allowTouchMove,
        mousewheel: mousewheelControl,
        keyboard: keyboardNavigation ? { enabled: true, onlyInViewport: true } : false,
        navigation: anyNavigationEnabled
            ? {
                prevEl: `.${blockId} .swiper-button-prev`,
                nextEl: `.${blockId} .swiper-button-next`,
            }
            : false,
        pagination: anyPaginationEnabled
            ? {
                el: `.${blockId} .swiper-pagination`,
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            }
            : false,
    });

    const blockProps = useBlockProps.save({
        className: `gslider-<slug>-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${anyPaginationEnabled ? 'has-pagination' : ''}`,
        'data-swiper-settings': swiperSettings,
    });

    return (
        <div {...blockProps}>
            <div className="swiper">
                <div className="swiper-wrapper">
                    {/* Rendered Slides */}
                </div>

                {anyNavigationEnabled && navigationArrowPositionType === 'inside' && (
                    <>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </>
                )}

                {anyPaginationEnabled && paginationPositionType === 'inside' && (
                    <div className="swiper-pagination"></div>
                )}
            </div>

            {anyNavigationEnabled && navigationArrowPositionType === 'outside' && (
                <div className={`gslider-navigation-wrapper outside ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            )}

            {anyPaginationEnabled && paginationPositionType === 'outside' && (
                <div className="swiper-pagination outside"></div>
            )}
        </div>
    );
}
```

---

## 5. `styling.js` Boilerplate Pattern

```javascript
import getCustomCss from '@Utils/getCustomCss';

const generateBlockStyle = (attributes) => {
    const {
        blockId,
        globalCustomCSS,
        // Typography & Colors
        titleFontSize,
        titleFontSizeUnits,
        titleColor,
        titleColorHover,
        titleDesktopMarginCssStyle,
        titleTabletMarginCssStyle,
        titleMobileMarginCssStyle,
    } = attributes;

    const blockCss = `
        /* ================= Desktop Base Styles ================= */
        .${blockId}.gslider-<slug>-wrapper {
            position: relative;
        }
        .${blockId} .gslider-title {
            ${titleFontSize?.Desktop ? `font-size: ${titleFontSize.Desktop}${titleFontSizeUnits?.Desktop || 'px'};` : ''}
            ${titleColor ? `color: ${titleColor};` : ''}
            ${titleDesktopMarginCssStyle ? `margin: ${titleDesktopMarginCssStyle};` : ''}
        }
        .${blockId} .gslider-title:hover {
            ${titleColorHover ? `color: ${titleColorHover};` : ''}
        }

        /* ================= Tablet Styles (<= 1024px) ================= */
        @media (max-width: 1024px) {
            .${blockId} .gslider-title {
                ${titleFontSize?.Tablet ? `font-size: ${titleFontSize.Tablet}${titleFontSizeUnits?.Tablet || 'px'};` : ''}
                ${titleTabletMarginCssStyle ? `margin: ${titleTabletMarginCssStyle};` : ''}
            }
        }

        /* ================= Mobile Styles (<= 767px) ================= */
        @media (max-width: 767px) {
            .${blockId} .gslider-title {
                ${titleFontSize?.Mobile ? `font-size: ${titleFontSize.Mobile}${titleFontSizeUnits?.Mobile || 'px'};` : ''}
                ${titleMobileMarginCssStyle ? `margin: ${titleMobileMarginCssStyle};` : ''}
            }
        }
    `;

    const customCss = getCustomCss(globalCustomCSS, `.${blockId}`);

    return `${blockCss} ${customCss}`.replace(/\s+/g, ' ').trim();
};

export default generateBlockStyle;
```

---

## 6. `view.js` Boilerplate Pattern

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const initializeSliders = () => {
        const sliders = document.querySelectorAll('.gslider-<slug>-wrapper');

        sliders.forEach((sliderContainer) => {
            try {
                const swiperSettings = sliderContainer.dataset.swiperSettings;

                if (swiperSettings) {
                    const settings = JSON.parse(swiperSettings);
                    const swiperEl = sliderContainer.querySelector('.swiper');

                    if (swiperEl && !swiperEl.swiper) {
                        new Swiper(swiperEl, settings);
                    }
                }
            } catch (error) {
                console.error('GSlider Blocks: Error initializing slider:', error);
            }
        });
    };

    initializeSliders();

    // Support dynamic blocks rendering (FSE / Gutenberg dynamic events)
    if (window.wp && window.wp.hooks) {
        window.wp.hooks.addAction('blocks.blockRendered', 'gslider', () => {
            initializeSliders();
        });
    }
});
```

---

## 7. `inspector.js` Boilerplate Pattern

```jsx
import { __ } from '@wordpress/i18n';
import InspectorControl from '@Components/inspector-controls';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import CustomCssEditor from '@Components/custom-css-editor';
import { SLIDER_TYPE, SLIDER_EFFECT_OPTIONS, CAROUSEL_EFFECT_OPTIONS } from '@Constants';

export default function Inspector({ attributes, setAttributes, panelRef }) {
    const {
        sliderType,
        carouselEffect,
        slideEffect,
        autoplay,
        titleColor,
        titleColorHover,
        globalCustomCSS,
    } = attributes;

    const generalControls = (
        <div ref={panelRef}>
            <PanelBody title={__('Slider Settings', 'gslider-blocks')} initialOpen={true}>
                <SelectControl
                    label={__('Slider Type', 'gslider-blocks')}
                    value={sliderType}
                    options={SLIDER_TYPE}
                    onChange={(val) => setAttributes({ sliderType: val })}
                />
                <ResponsiveRangeControl
                    label={__('Columns', 'gslider-blocks')}
                    controlKey="carouselPerColumn"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    min={1}
                    max={10}
                    step={1}
                />
                <ToggleControl
                    label={__('Autoplay', 'gslider-blocks')}
                    checked={autoplay}
                    onChange={(val) => setAttributes({ autoplay: val })}
                />
            </PanelBody>
        </div>
    );

    const styleControls = (
        <>
            <PanelBody title={__('Title Styling', 'gslider-blocks')} initialOpen={false}>
                <ResponsiveTypographyControl
                    label={__('Typography', 'gslider-blocks')}
                    prefix="title"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ColorControl
                    label={__('Color', 'gslider-blocks')}
                    color={titleColor}
                    colorHover={titleColorHover}
                    onChange={(val) => setAttributes({ titleColor: val })}
                    onChangeHover={(val) => setAttributes({ titleColorHover: val })}
                />
                <ResponsiveSpacingControl
                    label={__('Margin', 'gslider-blocks')}
                    controlKey="title"
                    type="margin"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            </PanelBody>
        </>
    );

    const advancedControls = (
        <>
            <PanelBody title={__('Custom CSS', 'gslider-blocks')} initialOpen={false}>
                <CustomCssEditor
                    value={globalCustomCSS}
                    onChange={(val) => setAttributes({ globalCustomCSS: val })}
                />
            </PanelBody>
        </>
    );

    return (
        <InspectorControl
            generalControls={generalControls}
            styleControls={styleControls}
            advancedControls={advancedControls}
        />
    );
}
```

---

## 8. `style.scss` Boilerplate Pattern

```scss
.gslider-<slug>-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;

    .swiper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform;
        box-sizing: content-box;
    }

    .swiper-slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        transition-property: transform;
    }

    /* Navigation styling */
    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    /* Pagination styling */
    .swiper-pagination {
        position: absolute;
        text-align: center;
        transition: 300ms opacity;
        transform: translate3d(0, 0, 0);
        z-index: 10;

        .swiper-pagination-bullet {
            display: inline-block;
            cursor: pointer;
            transition: all 0.3s ease;
        }
    }
}
```

---

## 9. `editor.scss` Boilerplate Pattern

```scss
.wp-block[data-type="gslider-blocks/<slug>"] {
    position: relative;

    .gslider-<slug>-wrapper {
        /* Editor reset and focus management */
        user-select: none;
    }

    /* Sortable drag items */
    .dnd-sortable-item {
        cursor: grab;
        &:active {
            cursor: grabbing;
        }
    }
}
```

---

## 10. `deprecated.js` Boilerplate Pattern

```javascript
import { useBlockProps } from '@wordpress/block-editor';
import attributes from './attributes';

const v1_1_5 = {
    attributes,
    supports: {
        html: false,
        className: false,
    },
    save({ attributes }) {
        const { blockId } = attributes;
        const blockProps = useBlockProps.save({
            className: `gslider-<slug>-wrapper ${blockId}`,
        });

        return (
            <div {...blockProps}>
                <div className="swiper">
                    <div className="swiper-wrapper"></div>
                </div>
            </div>
        );
    },
    migrate(attributes) {
        return {
            ...attributes,
        };
    },
};

const deprecated = [
    v1_1_5,
];

export default deprecated;
```

---

## 11. `icon.js` Boilerplate Pattern

```javascript
export default (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M4 6h16v12H4V6zm2 2v8h12V8H6zm-4 2h2v4H2v-4zm18 0h2v4h-2v-4z" />
    </svg>
);
```
