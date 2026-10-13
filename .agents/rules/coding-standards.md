# Coding Standards & Best Practices

All code written in the **GSlider Blocks** repository must adhere to the following standards:

---

## 🐘 PHP Standards

1. **WordPress Coding Standards (WPCS)**:
   - Follow standard WordPress PHP syntax, indentation (tabs for indentation, spaces for alignment), and naming conventions.
   - Use strict type annotations where applicable.
2. **Security & Sanitization**:
   - Always verify nonces when processing AJAX or form submissions.
   - Sanitize all input: `sanitize_text_field()`, `sanitize_key()`, `absint()`, `wp_unslash()`.
   - Escape all output: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`.
   - Never query the database directly with unsanitized values; use `$wpdb->prepare()`.
3. **Internationalization (i18n)**:
   - Always wrap user-facing strings in translation functions using the `'gslider-blocks'` text domain:
     - `__( 'String', 'gslider-blocks' )`
     - `esc_html__( 'String', 'gslider-blocks' )`
     - `_e( 'String', 'gslider-blocks' )`
4. **Architecture**:
   - Follow PSR-4 under the `GSlider\` namespace.
   - Use `SingletonTrait` for all service classes.

---

## ⚛️ JavaScript & React Standards

1. **WordPress Gutenberg API Standards**:
   - Use React 18+ hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`) from `@wordpress/element`.
   - Use `@wordpress/block-editor` components (`useBlockProps`, `RichText`, `InspectorControls`).
   - Use `@wordpress/components` ONLY for structural containers (`PanelBody`). NEVER use raw input controls (`RangeControl`, `ColorPicker`, `FontSizePicker`, `ToggleControl`, etc.).
   - **MANDATORY**: All Inspector controls MUST use the 23 approved GSlider Design System components from `@Components/...`. PRs using raw input controls will be rejected.
   - **LOCKED CORE**: `src/components/` is maintained exclusively by `@noruzzamans`. External PRs modifying `src/components/` will be rejected to protect 2,000+ live sites.
   - Use `@wordpress/i18n` for translations (`__('Label', 'gslider-blocks')`).
2. **No jQuery Dependency**:
   - Never use jQuery for block interactions or animations.
   - Use vanilla JavaScript or Swiper.js API.
3. **Immutability in Attributes**:
   - When updating attributes with objects or arrays, always create copies:
     `setAttributes({ speed: { ...speed, [deviceType]: newValue } })`.
4. **Clean Lifecycles & Memory Management**:
   - Always destroy Swiper instances (`destroy(true, true)`) in `useEffect` cleanup handlers before re-instantiating.

---

## 🎨 CSS & SCSS Standards

1. **Scoping**:
   - Every CSS selector generated dynamically in `styling.js` must be prefixed with `.${blockId}`.
2. **Naming Conventions**:
   - Use BEM-like naming for block components: `.gslider-<block-name>-wrapper`, `.gslider-<block-name>-inner`, `.gslider-title`, `.gslider-btn`.
3. **Responsive Design**:
   - Standardize responsive breakpoints:
     - Desktop: Base rules
     - Tablet: `@media (max-width: 1024px)`
     - Mobile: `@media (max-width: 767px)`
