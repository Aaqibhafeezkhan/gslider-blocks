---
name: gslider-ui-controls
description: >-
  Use this skill when implementing, extending, or using custom React UI controls in inspector panels,
  including responsive range, typography, spacing, color, gradient, icon picker, and preset controls.
---

# GSlider Custom UI Controls Reference

This skill documents the library of 23+ reusable React Gutenberg UI controls located in `src/components/`.

---

## 🗂️ Component Directory & Usage Guide

### 1. `InspectorControl` (`@Components/inspector-controls`)
Provides the standard 3-tab layout (`General`, `Style`, `Advanced`) for all blocks.
```jsx
import InspectorControl from '@Components/inspector-controls';

<InspectorControl
    generalControls={<GeneralPanel attributes={attributes} setAttributes={setAttributes} />}
    styleControls={<StylePanel attributes={attributes} setAttributes={setAttributes} />}
    advancedControls={<AdvancedPanel attributes={attributes} setAttributes={setAttributes} />}
/>
```

---

### 2. Responsive Controls
These controls automatically interact with the `@Store` Redux store to switch device states (`Desktop`, `Tablet`, `Mobile`):

- **`ResponsiveRangeControl`** (`@Components/responsive-range-control`):
  ```jsx
  <ResponsiveRangeControl
      label={__('Columns', 'gslider-blocks')}
      controlKey="carouselPerColumn"
      attributes={attributes}
      setAttributes={setAttributes}
      min={1}
      max={10}
      step={1}
  />
  ```

- **`ResponsiveTypographyControl`** (`@Components/responsive-typography-control`):
  Manages font family (Google Fonts), font size, weight, line height, letter spacing, word spacing, text transform, and text decoration.
  ```jsx
  <ResponsiveTypographyControl
      label={__('Title Typography', 'gslider-blocks')}
      prefix="title" // Binds to titleFontFamily, titleFontSize, titleFontWeight, etc.
      attributes={attributes}
      setAttributes={setAttributes}
  />
  ```

- **`ResponsiveSpacingControl`** (`@Components/responsive-spacing-control`):
  Manages 4-sided linked/unlinked spacing (margin or padding) with unit switcher and pre-formatted CSS output.
  ```jsx
  <ResponsiveSpacingControl
      label={__('Content Padding', 'gslider-blocks')}
      controlKey="contentPadding" // Generates contentPaddingDesktop, contentPaddingTablet, contentPaddingMobileCssStyle
      attributes={attributes}
      setAttributes={setAttributes}
  />
  ```

- **`ResponsiveAlignmentControl`** (`@Components/responsive-alignment-control`):
  ```jsx
  <ResponsiveAlignmentControl
      label={__('Text Alignment', 'gslider-blocks')}
      controlKey="contentAlignment"
      attributes={attributes}
      setAttributes={setAttributes}
  />
  ```

---

### 3. Color & Visual Styling Controls

- **`ColorControl`** (`@Components/color-control`):
  Supports normal & hover tabs, alpha channel, and color palette presets.
  ```jsx
  <ColorControl
      label={__('Text Color', 'gslider-blocks')}
      color={titleColor}
      colorHover={titleColorHover}
      onChange={(val) => setAttributes({ titleColor: val })}
      onChangeHover={(val) => setAttributes({ titleColorHover: val })}
  />
  ```

- **`GradientColorControl`** (`@Components/gradient-color-control`):
  Linear and radial gradient generator.

- **`BackgroundControl`** (`@Components/background-control`):
  Comprehensive background manager supporting Solid color, Gradient, and Image with overlay, position, repeat, and size.

- **`BoxShadowControl`** (`@Components/box-shadow-control`):
  Full shadow control (X offset, Y offset, blur, spread, color, and inset mode).

---

### 4. Content & Asset Controls

- **`IconPicker`** (`@Components/icon-picker`):
  Provides searchable icon library (Dashicons, FontAwesome, SVG upload) and custom image upload.
  ```jsx
  <IconPicker
      label={__('Navigation Icon', 'gslider-blocks')}
      icon={navigationArrowIcon}
      onChange={(icon) => setAttributes({ navigationArrowIcon: icon })}
  />
  ```

- **`ImageControl`** (`@Components/image-control`):
  WordPress Media Library image selector with preview, replace, and remove capabilities.

- **`HtmlTagControl`** (`@Components/html-tag-control`):
  Select dropdown for semantic tags (`H1` - `H6`, `P`, `Span`, `Div`).

- **`ContentOrderControl`** (`@Components/content-order-control`):
  Drag-and-drop layer reordering using `@dnd-kit/core` and `@dnd-kit/sortable`.

- **`PresetSelector`** (`@Components/preset-selector`):
  Visual layout preset cards for instant design template application.

- **`CustomCssEditor`** (`@Components/custom-css-editor`):
  Monaco / Code editor for scoped custom CSS with live preview.

---

## ⚡ Redux Store Integration (`@Store`)

The plugin maintains an active `@wordpress/data` store registered under the name `gslider-blocks`.
- Use `useSelect((select) => select('gslider-blocks').getDeviceType(), [])` to query the current active device.
- Use `useDispatch('gslider-blocks').setDeviceType('Mobile')` to update the active device globally across all inspector controls.
