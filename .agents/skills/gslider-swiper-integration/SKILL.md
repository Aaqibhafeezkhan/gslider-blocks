---
name: gslider-swiper-integration
description: >-
  Use this skill when configuring Swiper.js behavior, carousel/slider settings, transitions,
  touch navigation, breakpoints, pagination, custom navigation arrows, or debugging Swiper in editor and frontend.
---

# GSlider Swiper.js Integration Skill

This skill documents how **Swiper.js** is integrated into **GSlider Blocks** across both the WordPress Gutenberg Block Editor and the frontend runtime.

---

## 🏗️ Architecture: Editor vs Frontend

### 1. Gutenberg Editor Environment (`edit.js`)
- Swiper is loaded globally in the editor via `FrontendAssets.php` (`swiper-bundle.min.js`).
- Swiper is managed via React `useRef` and `useEffect`.
- On every attribute update (autoplay, effects, speed, slidesPerView), the old Swiper instance is explicitly destroyed (`destroy(true, true)`) and re-created to provide live, reactive editor previews.
- **Pagination Clear Rule**: Always clear pagination container HTML (`ref.current.innerHTML = ''`) before re-initializing to avoid duplicate or ghost pagination bullets.

### 2. Frontend Runtime (`save.js` + `view.js`)
- `save.js` serializes all Swiper options into a data attribute: `data-swiper-settings='{"effect":"slide",...}'`.
- `view.js` runs on `DOMContentLoaded` and hooks into `wp.hooks.addAction('blocks.blockRendered', ...)` to initialize Swiper with parsed settings on matching wrapper elements.

---

## ⚙️ Swiper Settings Matrix

### Standard Swiper Config Object
```javascript
const swiperSettings = {
    // 1. Effects
    effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    // Supported effects: 'slide' | 'fade' | 'coverflow' | 'flip' | 'cards' | 'creative'

    // 2. Responsive Breakpoints (Desktop, Tablet, Mobile)
    breakpoints: {
        0: {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0,
            speed: speed?.Mobile || 800,
            autoplay: autoplay ? { delay: autoplayDelay?.Mobile || 3000 } : false,
            navigation: { enabled: !!showNavigation?.Mobile },
            pagination: { enabled: !!showPagination?.Mobile },
        },
        768: {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20,
            speed: speed?.Tablet || 800,
            autoplay: autoplay ? { delay: autoplayDelay?.Tablet || 3000 } : false,
            navigation: { enabled: !!showNavigation?.Tablet },
            pagination: { enabled: !!showPagination?.Tablet },
        },
        1025: {
            slidesPerView: carouselPerColumn?.Desktop || 3,
            spaceBetween: carouselPerColumnGap?.Desktop || 30,
            speed: speed?.Desktop || 800,
            autoplay: autoplay ? { delay: autoplayDelay?.Desktop || 3000 } : false,
            navigation: { enabled: !!showNavigation?.Desktop },
            pagination: { enabled: !!showPagination?.Desktop },
        },
    },

    // 3. Playback & Loops
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

    // 4. Dimensions & Layout
    ...(layoutHeightSwitcher === 'adapt' && { autoHeight: true }),
    allowTouchMove: allowTouchMove,
    mousewheel: mousewheelControl,
    keyboard: keyboardNavigation ? { enabled: true, onlyInViewport: true } : false,

    // 5. Navigation Arrows
    navigation: showNavigation?.[deviceType]
        ? {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        }
        : false,

    // 6. Pagination
    pagination: showPagination?.[deviceType]
        ? {
            el: paginationPositionType === 'outside'
                ? paginationOutsideRef.current
                : paginationInsideRef.current,
            type: paginationType, // 'bullets' | 'fraction' | 'progressbar'
            dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
            clickable: true,
        }
        : false,
};
```

---

## 📋 Common Patterns & Troubleshooting

1. **Destroy Before Recreate**:
   ```javascript
   if (swiperInstanceRef.current) {
       swiperInstanceRef.current.destroy(true, true);
       swiperInstanceRef.current = null;
   }
   ```
2. **Outside vs Inside Navigation / Pagination**:
   - `paginationPositionType === 'outside'`: Place the pagination `div` outside the `.swiper` container but inside the `.gslider-wrapper`.
   - `paginationPositionType === 'inside'`: Place the pagination `div` inside the `.swiper` container.
3. **FsLightbox Integration**:
   - For image sliders, ensure slides with lightbox links have `data-fslightbox="gslider-lightbox-${blockId}"` and refresh lightbox on init with `if (window.refreshFsLightbox) window.refreshFsLightbox();`.
