# GSlider Blocks - Project Architecture & AI Agent Guide

Welcome to **GSlider Blocks**, an advanced WordPress Gutenberg Carousel and Slider Block plugin built with modern React (Gutenberg Block Editor) and PHP (PSR-4 Singleton architecture).

This document outlines the core architecture, conventions, and links to specialized skills for AI agents and developers working on this codebase.

---

## 🏗️ Architecture Overview

```
gslider-blocks/
├── gslider-blocks.php         # Main plugin bootstrap file (constants, singleton init)
├── composer.json              # PSR-4 Autoloading configuration (`GSlider\` -> `includes/`)
├── package.json               # Build scripts & npm dependencies (@wordpress/scripts)
├── webpack.config.js          # Custom webpack configuration with path aliases
├── webpack.config.admin.js    # Dedicated webpack build for admin styles
├── webpack.zip.js             # Production zip package generator
├── includes/                  # PHP Backend Services (PSR-4, Singleton Pattern)
│   ├── Plugin.php             # Core bootstrap on `plugins_loaded`
│   ├── Assets/                # Asset managers (FrontendAssets, AdminAssets)
│   ├── Classes/               # Service classes (RegistrationBlocks, StyleGenerator, FontLoader, SupportSVG)
│   ├── Traits/                # Reusable traits (SingletonTrait)
│   └── Utils/                 # Utility services (Telemetry/Appsero)
├── src/                       # Gutenberg React Frontend Source
│   ├── blocks/                # Block modules (base, flexi-content, image-slider, logo-carousel, testimonial)
│   ├── components/            # 23+ Reusable UI controls (Responsive controls, color, typography, etc.)
│   ├── constants/             # Global options, bounds, alignment definitions, font lists
│   ├── store/                 # Redux store for deviceType and editor state
│   └── utils/                 # Helpers (useBlockIdGenerator, getCustomCss, loadGoogleFont, etc.)
├── admin/                     # Admin SCSS stylesheets
├── assets/                    # Compiled assets, vendor libraries (Swiper, fsLightbox, Google Fonts)
└── build/                     # Compiled Gutenberg blocks output directory
```

---

## 🧭 Core Specialized Skills

When developing or modifying code in this repository, reference the dedicated workspace skills located in `.agents/skills/`:

| Skill Name | Purpose & Scope |
| :--- | :--- |
| **[`gslider-block-development`](.agents/skills/gslider-block-development/SKILL.md)** | Step-by-step procedure for creating new blocks, modifying existing blocks, managing attributes, deprecations, and block lifecycle. |
| **[`gslider-style-engine`](.agents/skills/gslider-style-engine/SKILL.md)** | Dynamic CSS generation pipeline (`styling.js` -> `blockStyle` attribute -> `StyleGenerator.php`), responsive breakpoints (`Desktop`, `Tablet`, `Mobile`), unit parsing, and custom CSS. |
| **[`gslider-swiper-integration`](.agents/skills/gslider-swiper-integration/SKILL.md)** | Swiper.js integration in editor (`edit.js` lifecycle with cleanup) and frontend (`save.js` + `view.js`), handling transitions, pagination, navigation, and autoplay. |
| **[`gslider-ui-controls`](.agents/skills/gslider-ui-controls/SKILL.md)** | Guide to using the 23+ custom React UI controls in `src/components/` (Responsive range/typography/spacing, color pickers, icon picker, etc.). |
| **[`gslider-php-backend`](.agents/skills/gslider-php-backend/SKILL.md)** | Backend architecture, PSR-4 autoloading, WordPress hooks, Singleton pattern, security/sanitization, and dynamic block registration. |
| **[`gslider-qa-and-release`](.agents/skills/gslider-qa-and-release/SKILL.md)** | Quality Assurance, testing, linting, version synchronization, production builds, and distributable zip packaging. |

---

## ⚡ Development & Build Workflows

### Essential NPM Scripts
- `npm run start` : Watch mode for block development (`wp-scripts start`)
- `npm run build` : Production build of blocks (`wp-scripts build`)
- `npm run admin` : Watch mode for admin SCSS (`webpack --config webpack.config.admin.js --watch`)
- `npm run admin:build` : Production build of admin assets
- `npm run format` : Format code according to WordPress coding standards
- `npm run lint:js` : Lint JavaScript code
- `npm run lint:css` : Lint CSS/SCSS code
- `npm run zip` : Generate distributable plugin zip archive

---

## 📐 Golden Architectural Rules

1. **Strict Block Directory Structure**: Every block in `src/blocks/<slug>/` MUST contain:
   - `block.json`, `index.js`, `attributes.js`, `edit.js`, `save.js`, `styling.js`, `view.js`, `inspector.js`, `style.scss`, `editor.scss`, `deprecated.js`, `icon.js`.
2. **Standardized Attribute Schemas**: Every `attributes.js` file must strictly follow the existing blocks' attribute conventions:
   - **Spacing**: 8-key pattern (`<prefix>PaddingUnits`, `<prefix>PaddingDesktop`, `<prefix>PaddingDesktopCssStyle`, `<prefix>PaddingTablet`, `<prefix>PaddingTabletCssStyle`, `<prefix>PaddingMobile`, `<prefix>PaddingMobileCssStyle`, `<prefix>PaddingLink`).
   - **Typography**: 13-key pattern (`<prefix>FontFamily`, `<prefix>FontSize`, `<prefix>FontSizeUnits`, `<prefix>FontWeight`, `<prefix>FontStyle`, `<prefix>TextTransform`, `<prefix>TextDecoration`, `<prefix>LineHeight`, `<prefix>LineHeightUnits`, `<prefix>LetterSpacing`, `<prefix>LetterSpacingUnits`, `<prefix>WordSpacing`, `<prefix>WordSpacingUnits`).
   - **Colors**: `<prefix>ColorSwitcher`, `<prefix>Color`, `<prefix>ColorHover`.
   - **Mandatory Defaults**: `blockId`, `deviceType`, `blockStyle`, `globalID`, `globalClass`, `globalCustomCSS`, `zIndex`.
3. **Dynamic CSS Generation**: Never write hardcoded inline CSS in `save.js`. Dynamic styles MUST be generated via `styling.js`, saved into the `blockStyle` attribute, and rendered via `StyleGenerator.php`.
4. **Unique Block ID**: Always call `useBlockIdGenerator` in `edit.js` to ensure unique scoping (`gslider-xxxxxxxx`) for styling and Swiper instances.
5. **Responsive-First Architecture**: All visual and layout attributes must support responsive objects: `{ Desktop: value, Tablet: value, Mobile: value }`.
6. **No Direct DOM Mutations Outside Swiper**: Let React manage the editor DOM; Swiper is initialized using container refs in `useEffect` and cleaned up with `swiper.destroy(true, true)` on changes.
7. **WordPress Security Standards**: In PHP, always sanitize inputs (`sanitize_text_field`, `sanitize_key`), escape outputs (`esc_html__`, `esc_attr__`, `esc_url`), verify nonces, and use `WP_Filesystem` for disk operations.
8. **Strict Design System Enforcement**: Never use raw `@wordpress/components` input controls (`RangeControl`, `ColorPicker`, `ToggleControl`, `FontSizePicker`, etc.) in block inspector panels. All controls MUST use the 23 approved GSlider Design System components from `@Components/...`. PRs with raw controls will be automatically rejected.
