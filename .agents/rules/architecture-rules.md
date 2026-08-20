# GSlider Blocks Architectural Guardrails

The following architectural rules MUST be preserved across all tasks, refactors, and feature additions in this repository:

---

## 🚫 Critical Constraints (What NOT to do)

1. **NO Inline Style Attributes for Dynamic CSS**:
   - **Forbidden**: `<div style={{ color: attributes.titleColor, fontSize: attributes.fontSize }}>` in `save.js`.
   - **Required**: Dynamic styles MUST be generated in `styling.js`, stored into `attributes.blockStyle`, collected by `StyleGenerator.php` during `render_block`, and compiled to an external minified per-page CSS file.

2. **NO Hardcoded Block Identifiers**:
   - Every block must have an automated, unique `blockId` (e.g., `gslider-a1b2c3d4`) managed by `useBlockIdGenerator`.

3. **NO Ad-hoc Attribute Naming (Strict Attribute Schema Enforcement)**:
   - When creating a new block or modifying an existing block, you MUST adhere to the plugin's standardized attribute naming patterns (defined in `gslider-block-development` skill):
     - **Spacing**: 8-key pattern (`<prefix>PaddingUnits`, `<prefix>PaddingDesktop`, `<prefix>PaddingDesktopCssStyle`, `<prefix>PaddingTablet`, `<prefix>PaddingTabletCssStyle`, `<prefix>PaddingMobile`, `<prefix>PaddingMobileCssStyle`, `<prefix>PaddingLink`).
     - **Typography**: 13-key pattern (`<prefix>FontFamily`, `<prefix>FontSize`, `<prefix>FontSizeUnits`, `<prefix>FontWeight`, `<prefix>FontStyle`, `<prefix>TextTransform`, `<prefix>TextDecoration`, `<prefix>LineHeight`, `<prefix>LineHeightUnits`, `<prefix>LetterSpacing`, `<prefix>LetterSpacingUnits`, `<prefix>WordSpacing`, `<prefix>WordSpacingUnits`).
     - **Colors**: `<prefix>ColorSwitcher`, `<prefix>Color`, `<prefix>ColorHover`.
     - **Responsive Units**: Always `{ Desktop: "...", Tablet: "...", Mobile: "..." }`.
     - **Mandatory Globals**: `blockId`, `deviceType`, `blockStyle`, `globalID`, `globalClass`, `globalCustomCSS`, `zIndex`.

4. **NO Direct DOM Mutations Outside Swiper Element**:
   - Do not use `document.querySelector` or direct DOM manipulation inside `edit.js` to change block content or layouts. Rely solely on React state and Gutenberg attributes.

5. **NO Breaking Schema Changes Without Deprecation**:
   - When modifying `save.js` markup or block attribute structures of existing blocks, always provide a migration function in `deprecated.js`. This guarantees that existing user pages do not encounter Gutenberg block validation errors ("This block contains unexpected or invalid content").

6. **NO Direct File IO in PHP**:
   - Never use PHP native `file_put_contents()` or `mkdir()`. Always use WordPress Filesystem API (`WP_Filesystem`).

---

## 🧭 Directory Structure Conventions

1. **Block Folder**: `src/blocks/<slug>/`
   - Must contain: `block.json`, `index.js`, `attributes.js`, `edit.js`, `save.js`, `styling.js`, `view.js`, `inspector.js`, `style.scss`, `editor.scss`, `deprecated.js`, `icon.js`.

2. **PHP Services**: `includes/Classes/`
   - Must follow PSR-4, declare `namespace GSlider\Classes;`, and use `SingletonTrait`.

3. **Custom UI Components**: `src/components/`
   - All custom inspector components must be modular, accept `attributes` and `setAttributes`, and handle responsive devices cleanly.
