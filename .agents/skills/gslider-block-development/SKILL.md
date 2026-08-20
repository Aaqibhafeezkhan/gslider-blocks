---
name: gslider-block-development
description: >-
  Use this skill when creating a new Gutenberg block, refactoring an existing slider block,
  modifying block attributes, creating deprecation migrations, or updating inspector controls in GSlider Blocks.
---

# GSlider Block Development Skill

This skill provides the comprehensive guide, standard attribute patterns, and workflow for building and modifying Gutenberg blocks within the **GSlider Blocks** plugin architecture.

---

## 📁 Standard Block File Structure

Every block under `src/blocks/<block-slug>/` must adhere to this exact file layout:

```text
src/blocks/<block-slug>/
├── block.json       # Block metadata (API v3, name, title, keywords, supports, script/style handles)
├── index.js         # Block registration entrypoint (registerBlockType)
├── attributes.js    # Comprehensive schema of all block attributes and responsive defaults
├── edit.js          # Editor React component (inspector, Swiper preview lifecycle, block props)
├── save.js          # Frontend save component (clean HTML, data-swiper-settings JSON)
├── styling.js       # Dynamic responsive CSS generator function (Desktop, Tablet, Mobile)
├── view.js          # Frontend vanilla JS Swiper initialization script
├── inspector.js     # Inspector Controls sidebar tabs (General, Style, Advanced)
├── style.scss       # Frontend and editor shared CSS styles
├── editor.scss      # Editor-only CSS styles
├── deprecated.js    # Backward compatibility migrations for previous block versions
└── icon.js          # Block icon React component (SVG icon)
```

> 📄 **Production Boilerplate for All 12 Files**: See [`references/file-templates-and-patterns.md`](./references/file-templates-and-patterns.md) for copy-paste ready, standard boilerplate code for each of the 12 files.


---

## 📋 Standard `attributes.js` Architecture & Patterns

> 📖 **Full Reference Guide**: For exhaustive schemas across all 6 block types (Base, Flexi Content, Item, Image Slider, Logo Carousel, and Testimonial), see [`references/attribute-patterns.md`](./references/attribute-patterns.md).

When creating a new block or adding new features to an existing block, **YOU MUST FOLLOW THE EXACT ATTRIBUTE NAMING CONVENTIONS AND OBJECT SCHEMAS** outlined below:

### 1. Mandatory Block Identity & Device State
Every `attributes.js` file MUST start with:
```javascript
const attributes = {
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

### 2. Standard Carousel / Slider Configuration Attributes
```javascript
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
        default: true,
    },
    autoplayDelay: {
        type: "object",
        default: { Desktop: 3000, Tablet: 3000, Mobile: 3000 },
    },
    infiniteLoop: {
        type: "boolean",
        default: true,
    },
    allowTouchMove: {
        type: "boolean",
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
        type: "boolean",
        default: false,
    },
    enableLazyLoad: {
        type: "boolean",
        default: false,
    },
```

---

### 3. Standard Show / Hide Switch Attributes
Always use `{ Desktop: true, Tablet: true, Mobile: true }` for responsive visibility, or boolean if device-independent:
```javascript
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
```

---

### 4. Standard Layout & Height Attributes
```javascript
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
```

---

### 5. Standard 8-Key Spacing (Padding & Margin) Pattern
For any component requiring padding or margin (e.g., `<prefix>Padding` or `<prefix>Margin`), ALWAYS generate all 8 keys:
```javascript
    // Example for 'contentPadding'
    contentPaddingUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    contentPaddingDesktop: {
        type: "object",
        default: { top: "20", right: "20", bottom: "20", left: "20" },
    },
    contentPaddingDesktopCssStyle: {
        type: "string",
        default: "20px 20px 20px 20px",
    },
    contentPaddingTablet: {
        type: "object",
        default: { top: "15", right: "15", bottom: "15", left: "15" },
    },
    contentPaddingTabletCssStyle: {
        type: "string",
        default: "15px 15px 15px 15px",
    },
    contentPaddingMobile: {
        type: "object",
        default: { top: "10", right: "10", bottom: "10", left: "10" },
    },
    contentPaddingMobileCssStyle: {
        type: "string",
        default: "10px 10px 10px 10px",
    },
    contentPaddingLink: {
        type: "boolean",
        default: true,
    },
```

---

### 6. Standard 13-Key Typography Pattern
For any text element (e.g., `title`, `subtitle`, `description`, `primaryButton`), ALWAYS declare all 13 keys:
```javascript
    // Example for '<prefix>' = 'title'
    titleFontFamily: {
        type: "string",
        default: "",
    },
    titleFontSize: {
        type: "object",
        default: { Desktop: "28", Tablet: "24", Mobile: "20" },
    },
    titleFontSizeUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    titleFontWeight: {
        type: "string",
        default: "inherit",
    },
    titleFontStyle: {
        type: "string",
        default: "inherit",
    },
    titleTextTransform: {
        type: "string",
        default: "inherit",
    },
    titleTextDecoration: {
        type: "string",
        default: "inherit",
    },
    titleLineHeight: {
        type: "object",
        default: { Desktop: "", Tablet: "", Mobile: "" },
    },
    titleLineHeightUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    titleLetterSpacing: {
        type: "object",
        default: { Desktop: "", Tablet: "", Mobile: "" },
    },
    titleLetterSpacingUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    titleWordSpacing: {
        type: "object",
        default: { Desktop: "", Tablet: "", Mobile: "" },
    },
    titleWordSpacingUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
```

---

### 7. Standard Color & Hover Pattern
```javascript
    titleColorSwitcher: {
        type: "boolean",
        default: false,
    },
    titleColor: {
        type: "string",
        default: "#1e1e1e",
    },
    titleColorHover: {
        type: "string",
        default: "",
    },
```

---

### 8. Standard Border & Border Radius Pattern
```javascript
    buttonBorderStyle: {
        type: "string",
        default: "none",
    },
    buttonBorderColor: {
        type: "string",
        default: "",
    },
    buttonBorderHoverColor: {
        type: "string",
        default: "",
    },
    buttonBorderUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    buttonDesktopBorder: {
        type: "object",
        default: { top: "1", right: "1", bottom: "1", left: "1" },
    },
    buttonDesktopBorderCssStyle: {
        type: "string",
        default: "1px 1px 1px 1px",
    },
    buttonTabletBorder: {
        type: "object",
        default: { top: "1", right: "1", bottom: "1", left: "1" },
    },
    buttonTabletBorderCssStyle: {
        type: "string",
        default: "1px 1px 1px 1px",
    },
    buttonMobileBorder: {
        type: "object",
        default: { top: "1", right: "1", bottom: "1", left: "1" },
    },
    buttonMobileBorderCssStyle: {
        type: "string",
        default: "1px 1px 1px 1px",
    },
    buttonBorderLink: {
        type: "boolean",
        default: true,
    },

    buttonBorderRadiusUnits: {
        type: "object",
        default: { Desktop: "px", Tablet: "px", Mobile: "px" },
    },
    buttonDesktopBorderRadius: {
        type: "object",
        default: { top: "4", right: "4", bottom: "4", left: "4" },
    },
    buttonDesktopBorderRadiusCssStyle: {
        type: "string",
        default: "4px 4px 4px 4px",
    },
    buttonTabletBorderRadius: {
        type: "object",
        default: { top: "4", right: "4", bottom: "4", left: "4" },
    },
    buttonTabletBorderRadiusCssStyle: {
        type: "string",
        default: "4px 4px 4px 4px",
    },
    buttonMobileBorderRadius: {
        type: "object",
        default: { top: "4", right: "4", bottom: "4", left: "4" },
    },
    buttonMobileBorderRadiusCssStyle: {
        type: "string",
        default: "4px 4px 4px 4px",
    },
    buttonBorderRadiusLink: {
        type: "boolean",
        default: true,
    },
```

---

### 9. Standard Navigation Arrows Attributes
```javascript
    navigationArrowPositionType: {
        type: "string",
        default: "inside", // 'inside' | 'outside'
    },
    navigationArrowPosition: {
        type: "string",
        default: "center", // 'center' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
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
```

---

### 10. Standard Pagination Attributes
```javascript
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
```

---

### 11. Mandatory Global & Advanced Attributes
Every `attributes.js` MUST end with:
```javascript
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
};

export default attributes;
```

---

## 🚀 Step-by-Step Block Creation Workflow

### 1. `block.json` Configuration
- Use `apiVersion: 3`.
- Set `category: "gslider-blocks"`.
- Text domain must be `"gslider-blocks"`.
- Set script handles:
  - `editorScript`: `["file:./index.js", "gslider-blocks-swiper-script", "gslider-blocks-fslightbox-script"]` (if lightbox needed)
  - `editorStyle`: `["file:./index.css", "gslider-blocks-swiper-style"]`
  - `style`: `["file:./style-index.css", "gslider-blocks-swiper-style"]`
  - `viewScript`: `["file:./view.js", "gslider-blocks-swiper-script", "gslider-blocks-fslightbox-script"]`

### 2. `index.js`
Register the block using WordPress's `registerBlockType`:
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

### 3. `edit.js` Implementation Rules
- **Block ID Generation**: Always call `useBlockIdGenerator`:
  ```javascript
  useBlockIdGenerator({
      clientId,
      blockId,
      blockPrefix: 'gslider',
      isSelected,
      attributes,
      setAttributes,
  });
  ```
- **Style Generation**: Update `blockStyle` in `useEffect` when attributes change:
  ```javascript
  useEffect(() => {
      if (blockId) {
          const css = generateBlockStyle(attributes);
          setAttributes({ blockStyle: css });
      }
  }, [attributes, blockId]);
  ```
- **Swiper Lifecycle**: Initialize vanilla Swiper inside `useEffect`, store in `useRef(null)`, and destroy on every re-render or setting change:
  ```javascript
  useEffect(() => {
      if (!window.Swiper || !swiperContainerRef.current) return;

      if (swiperInstanceRef.current) {
          swiperInstanceRef.current.destroy(true, true);
          swiperInstanceRef.current = null;
      }

      swiperInstanceRef.current = new window.Swiper(swiperContainerRef.current, swiperSettings);

      return () => {
          if (swiperInstanceRef.current) {
              swiperInstanceRef.current.destroy(true, true);
              swiperInstanceRef.current = null;
          }
      };
  }, [sliderItems, sliderType, speed, autoplay, autoplayDelay, ...keySettings]);
  ```
- **Inspector Tabs**: Render `InspectorControl` with `generalControls`, `styleControls`, and `advancedControls`.

### 4. `save.js` Structure
- Renders outer wrapper with `useBlockProps.save()`.
- Wrapper includes class names: `gslider-<slug>-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`.
- Outputs `data-swiper-settings={JSON.stringify(swiperSettings)}` on the outer wrapper or container.
- Clean semantic HTML structure matching the editor.

### 5. `styling.js` Dynamic CSS
- Return scoped CSS string: Desktop styles at top level, Tablet in `@media (max-width: 1024px)`, Mobile in `@media (max-width: 767px)`.
- Append `getCustomCss(globalCustomCSS, `.${blockId}`)`.
- Scope every selector with `.${blockId}`.

### 6. `view.js` Frontend Initializer
- Listens to `DOMContentLoaded` and `wp.hooks.addAction('blocks.blockRendered', 'gslider', ...)`
- Iterates over all `.gslider-<slug>-wrapper` elements, parses `dataset.swiperSettings`, and initializes Swiper.

### 7. `deprecated.js` Migrations
- Whenever attributes or `save.js` markup changes in a released version, create a deprecation entry with the old `attributes`, `save`, and `migrate` function.

---

## 🧪 Verification & Build
After making any block changes, run:
```bash
npm run build
```
Verify that no build errors occur and that assets are properly emitted into `build/blocks/<block-slug>/`.
