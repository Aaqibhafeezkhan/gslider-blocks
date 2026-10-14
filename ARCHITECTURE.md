# GSlider Blocks — Engineering Principles, Architecture & Patterns

A comprehensive architectural specification explaining the core software engineering principles, structural design patterns, quality checklists, and anti-patterns applied across the **GSlider Blocks** codebase.

---

## 🧭 Terminology: Principles vs. Patterns vs. Checklists

In professional software engineering, system design is divided into four distinct layers:
1. **Core Principles (The "Why"):** Foundational philosophies governing block development, backwards compatibility, and WordPress stability (e.g., Zero Block Invalidation, Scoped Collision Isolation, Responsive-First).
2. **Design Patterns (The "How"):** Proven structural blueprints solving concrete technical challenges in React and PHP (e.g., Dynamic CSS Pipeline, Swiper Lifecycle Cleanup, Deprecation Migrations, MCP Stdio Bridge).
3. **Engineering Checklists (The "What to Verify"):** Step-by-step verification rules executed prior to pushing code to safeguard production WordPress installations.
4. **Code Smells (The "What to Avoid"):** Surface symptoms indicating architectural debt, DOM memory leaks, or WordPress.org compliance risks.

---

# Part I: Core Software Engineering Principles

### 1. Zero Block Invalidation Principle (The Gutenberg Sacred Law)
- **Concept:** In standard React apps, updating component JSX seamlessly re-renders the new DOM in the browser. In Gutenberg, however, `save.js` serializes static HTML directly into the WordPress database (`wp_posts.post_content`).
- **The Failure Mode:** If `save.js` markup or HTML attributes change by even a single class, tag, or whitespace without a deprecation migration, WordPress fails the parser comparison and triggers the catastrophic:
  > *"This block contains unexpected or invalid content."*
- **In GSlider Blocks:** **Never edit `save.js` directly on existing blocks without registering a backwards-compatible migration in `deprecated.js`.** Existing post content created by users months or years ago must continue to parse cleanly without requiring manual block recovery.

### 2. Co-location Principle (Locality of Behavior)
- **Concept:** Code, assets, stylesheets, and test specifications that change together must live together.
- **In GSlider Blocks:** Every block inside `src/blocks/<slug>/` is a fully autonomous, self-contained module containing its complete 11-file anatomy:
  - `block.json` (Gutenberg block metadata)
  - `attributes.js` (State schema & responsive defaults)
  - `edit.js` (React editor interface & controls)
  - `save.js` (Static HTML serialization)
  - `styling.js` (Dynamic responsive CSS generator)
  - `view.js` (Frontend Swiper.js runtime)
  - `inspector.js` (Sidebar controls)
  - `style.scss` & `editor.scss` (Frontend & editor stylesheets)
  - `deprecated.js` (Historical schema migrations)
  - `icon.js` (SVG block icon)
- **Rule:** *Never place block-specific styles, scripts, or view logic in global files. If it belongs to a block, keep it in that block's folder.*

### 3. Dynamic CSS Pipeline Principle (The `blockStyle` Engine)
- **Concept:** Never write hardcoded inline CSS (`style="..."`) inside `save.js`. Inline styles bloat database storage, break caching, prevent server-side media query handling, and fail WordPress.org coding standards.
- **In GSlider Blocks:**
  1. When an editor modifies visual attributes (margin, typography, colors), React executes `styling.js`.
  2. `styling.js` compiles clean CSS string rules (Desktop, Tablet, Mobile) and updates the block's `blockStyle` attribute.
  3. On frontend rendering, PHP (`StyleGenerator.php`) parses `blockStyle`, compiles all active block styles into a per-page minified CSS file (`wp-content/uploads/gslider-blocks/css/gslider-blocks-dynamic-styles-{$page_id}.min.css`), and enqueues it cleanly via `wp_enqueue_style()` with `filemtime` cache busting.
- **Rule:** *Markup belongs in `save.js`; dynamic styling belongs in `styling.js` and `StyleGenerator.php`.*

### 4. Scoping & Collision Isolation Principle (`useBlockIdGenerator`)
- **Concept:** A single WordPress page may host 5 to 10 distinct slider instances simultaneously (e.g. Hero Slider, Logo Carousel, Testimonials).
- **In GSlider Blocks:**
  - Every block instance automatically calls `useBlockIdGenerator` in `edit.js` to assign a globally unique identifier: `gslider-xxxxxxxx`.
  - All dynamic CSS rules emitted by `styling.js` are strictly prefixed with `.${blockId}`.
  - Swiper container classes are scoped so navigation arrows or pagination on Slider A never accidentally trigger slide transitions on Slider B.

### 5. Responsive-First Schema Standard (The 3-Device Object Pattern)
- **Concept:** Modern sliders must be pixel-perfect across all screen viewports without requiring custom CSS from merchants.
- **In GSlider Blocks:** Every visual attribute schema follows standard responsive object structures `{ Desktop, Tablet, Mobile }`:
  - **Spacing (8-Key Standard):** `<prefix>PaddingUnits`, `<prefix>PaddingDesktop`, `<prefix>PaddingDesktopCssStyle`, `<prefix>PaddingTablet`, `<prefix>PaddingTabletCssStyle`, `<prefix>PaddingMobile`, `<prefix>PaddingMobileCssStyle`, `<prefix>PaddingLink`.
  - **Typography (13-Key Standard):** `<prefix>FontFamily`, `<prefix>FontSize`, `<prefix>FontSizeUnits`, `<prefix>FontWeight`, `<prefix>FontStyle`, `<prefix>TextTransform`, `<prefix>TextDecoration`, `<prefix>LineHeight`, `<prefix>LineHeightUnits`, `<prefix>LetterSpacing`, `<prefix>LetterSpacingUnits`, `<prefix>WordSpacing`, `<prefix>WordSpacingUnits`.

### 6. Protected Component Design System (Maintainer-Only Gate)
- **Concept:** Core foundational components must be locked down to prevent cascading regressions across existing blocks.
- **In GSlider Blocks:**
  - `src/components/` hosts the 23 foundational React controls (Responsive range, typography, spacing, color, gradient, etc.).
  - **The Lock:** `src/components/` is strictly locked: **NO ONE EXCEPT `@noruzzamans` IS PERMITTED TO EDIT OR ADD FILES TO `src/components/`**.
  - **Zero Raw Gutenberg Controls:** Blocks must exclusively consume approved `@Components/*` controls. Creating ad-hoc inputs using raw `@wordpress/components` is strictly forbidden.

### 7. WordPress Security Hardening (Sanitize on Ingest, Escape on Output)
- **Concept:** Plugins distributed to the global WordPress directory must be impervious to CSRF, Stored XSS, SSRF, and XML External Entity (XXE) attacks.
- **In GSlider Blocks:**
  - **Input Sanitization:** Every PHP request input is sanitized using `sanitize_text_field()`, `sanitize_key()`, and `wp_unslash()`.
  - **Output Escaping:** Every dynamic string printed to HTML is escaped using `esc_html__()`, `esc_attr__()`, `esc_url()`, or `wp_kses_post()`.
  - **SVG Upload Protection:** SVG uploads are hardened with `LIBXML_NONET` to prevent XXE entity expansion, verified by MIME sniffing, and strictly rejected if containing prohibited elements (`<script>`, `<foreignobject>`) or SMIL animation tags (`<animate>`, `<set>`) to eliminate Stored XSS vectors.

### 8. Accessibility (a11y) & Semantic HTML First
- **Concept:** Sliders must be fully operable by assistive technology and keyboard-only users (WCAG 2.1 AA).
- **In GSlider Blocks:**
  - Swiper containers declare `role="region"` and `aria-roledescription="carousel"`.
  - Navigation buttons have descriptive `aria-label` tags (`"Previous slide"`, `"Next slide"`).
  - Autoplay pauses on hover or keyboard focus, preventing cognitive disorientation.
  - Tab navigation respects natural focus order across active slides.

### 9. YAGNI & Chesterton's Fence in WordPress
- **Concept:** *"You Aren't Gonna Need It"* vs. *"Never tear down a fence until you understand why it was built."*
- **In GSlider Blocks:**
  - **YAGNI:** Dead code, experimental features, or non-compliant panels (like custom CSS textareas that violate WordPress.org repository rules) are pruned immediately.
  - **Chesterton's Fence:** Before deleting any defensive check (such as loop guards in Reusable Block parsers or fallback numeric resets), developers must inspect git history and PR rationale. Defensive checks frequently exist to resolve edge-case crashes reported on live merchant sites.

---

# Part II: Architectural & UI/UX Design Patterns

### 10. Swiper.js React Lifecycle & Memory Leak Cleanup Pattern
- **Problem:** Swiper attaches direct DOM mutation listeners, touch handlers, and resize observers. In the Gutenberg editor, blocks unmount, re-render, and duplicate frequently.
- **Solution:** Swiper instances in `edit.js` and `view.js` must be instantiated via element references (`useRef`) and strictly disposed within the effect cleanup return:
```javascript
useEffect(() => {
    if (!sliderRef.current) return;

    const swiper = new Swiper(sliderRef.current, {
        /* configuration */
    });

    return () => {
        if (swiper && typeof swiper.destroy === 'function') {
            swiper.destroy(true, true);
        }
    };
}, [/* reactive block attributes */]);
```

### 11. Deprecation & Migration Pattern (`deprecated.js`)
- **Problem:** Adding a new wrapper `<div>` or altering attribute structures in `save.js` invalidates existing blocks in the database.
- **Solution:** Every modification to `save.js` is paired with an immutable entry in `deprecated.js`:
```javascript
export const v1_0_0 = {
    attributes: previousAttributesSchema,
    save: PreviousSaveComponent,
    migrate(attributes) {
        return {
            ...attributes,
            // provide sensible defaults for newly introduced attributes
            hasPagination: Boolean(attributes.showPagination?.Desktop),
        };
    },
};

export default [v1_0_0];
```

### 12. PSR-4 Singleton Service Pattern (PHP Backend)
- **Problem:** WordPress procedural hooks (`add_action`, `add_filter`) scattered across loose files create namespace pollution and multiple instances.
- **Solution:** GSlider uses PSR-4 autoloading (`GSlider\` -> `includes/`) and a reusable `SingletonTrait`:
```php
namespace GSlider\Classes;

use GSlider\Traits\SingletonTrait;

class StyleGenerator {
    use SingletonTrait;

    public function init(): void {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_styles']);
    }
}
```

### 13. Model Context Protocol (MCP) Stdio Architecture
- **Problem:** AI coding assistants and agentic IDEs (Cursor, Claude Desktop, Windsurf, Antigravity, etc.) cannot introspect WordPress block schemas without expensive cloud APIs or manual copy-pasting.
- **Solution:** `packages/mcp-server` implements a lightweight TypeScript server communicating via local `stdio`:
  - **$0 Cloud Cost:** Runs entirely locally on Node.js without third-party API subscriptions.
  - **Tools Exposed:** `gslider_ping`, `list_gslider_blocks`, `get_block_schema`.
  - **Resources Exposed:** Design presets (`gslider://templates/hero-slider`, `brand-logos`).

### 14. Headless WordPress & REST API Serialization Pattern
- **Problem:** Decoupled modern frontend frameworks (Next.js 14/15, Astro, Remix) consume WordPress via REST API and cannot execute server-side PHP hooks.
- **Solution:** GSlider blocks provide dedicated REST endpoints via `BlocksController.php` (`GET /wp-json/gslider/v1/blocks/<id>`) and expose a `gslider_blocks` field on standard `/wp/v2/pages` and `/wp/v2/posts`. Decoupled frontend frameworks (Next.js, Astro) consume structured slider data directly and render with Swiper React.

---

# Part III: Pre-Flight Developer Verification Checklist

Before opening a pull request, every contributor (human or AI) must verify:

| Step | Area | Verification Rule |
| :---: | :--- | :--- |
| **1** | **Component Lock** | Did you leave `src/components/` completely untouched? (Only `@noruzzamans` is authorized). |
| **2** | **Design System** | Did you use approved `@Components/*` controls? (Zero raw `@wordpress/components` inputs). |
| **3** | **Zero Invalidation** | Did you test existing blocks in WordPress editor? (Must show 0 validation errors). |
| **4** | **Deprecations** | If `save.js` or attributes changed, did you register a version in `deprecated.js`? |
| **5** | **CSS Scoping** | Are dynamic styles generated in `styling.js` and properly scoped to `.${blockId}`? |
| **6** | **Security** | Are all PHP inputs sanitized (`sanitize_text_field`) and outputs escaped (`esc_html__`)? |
| **7** | **Memory Cleanup** | Does your Swiper `useEffect` return `swiper.destroy(true, true)`? |
| **8** | **Code Standards** | Did you run `npm run lint:js`, `npm run lint:css`, and `npm run build`? |
| **9** | **Issue-First PR** | Does the PR link to an approved issue with `Closes #<issue_number>` (Zero Orphan PRs)? |

---

# Part IV: Code Smells & Anti-patterns to Avoid

| Anti-Pattern / Code Smell | Diagnostic Symptom | Violated Principle | GSlider Architectural Cure |
| :--- | :--- | :--- | :--- |
| **1. Hardcoded Inline Styles** | Writing `style={{ color: attributes.titleColor }}` directly inside `save.js`. | **Dynamic CSS Pipeline** (Principle 3) | Move color rule to `styling.js`, store in `blockStyle`, render via `StyleGenerator.php`. |
| **2. Unversioned Markup Change** | Altering HTML markup in `save.js` without updating `deprecated.js`. | **Zero Block Invalidation** (Principle 1) | Create a historical migration snapshot in `deprecated.js`. |
| **3. Raw Gutenberg Input Usage** | Importing raw `<RangeControl />` or `<ColorPicker />` from `@wordpress/components`. | **Protected Component System** (Principle 6) | Import `<ResponsiveRange />` or `<ColorControl />` from `@Components`. |
| **4. Unscoped CSS Leak** | Writing `.swiper-slide { height: 400px; }` in `styling.js` without block scoping. | **Scoping & Collision Isolation** (Principle 4) | Always scope: `.${blockId} .swiper-slide { height: 400px; }`. |
| **5. Orphaned DOM Listeners** | Initializing Swiper without returning `destroy()` in `useEffect`. | **Instance Lifecycle Pattern** (Pattern 10) | Store swiper instance in a ref and destroy on unmount/re-render. |
| **6. Raw Superglobal Access** | Accessing `$_POST['title']` or `$_GET['id']` directly without sanitization or nonces. | **WordPress Security Hardening** (Principle 7) | Always verify nonces and sanitize via `sanitize_text_field(wp_unslash($_POST['title']))`. |
