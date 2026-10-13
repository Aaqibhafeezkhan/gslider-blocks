---
name: gslider-ui-controls
description: >-
  Use this skill when implementing, extending, or using custom React UI controls in inspector panels,
  including responsive range, typography, spacing, color, gradient, icon picker, and preset controls.
---

# GSlider Custom UI Controls Reference & Design System

This skill documents the complete library of **23 reusable React Gutenberg UI controls** located in `src/components/`.

---

> [!CAUTION]
> ### 🛑 STRICT OPEN SOURCE PR REJECTION POLICY
> **GSlider Blocks maintains a strict, unified Design System.**
> 1. **ZERO Raw Gutenberg Controls:** Pull Requests introducing raw `@wordpress/components` controls (such as `<RangeControl>`, `<ColorPicker>`, `<FontSizePicker>`, `<ToggleControl>`, `<TextControl>`) directly into Inspector panels **WILL BE REJECTED**.
> 2. **Mandatory GSlider Components:** Contributors and developers MUST use the corresponding components from `@Components/...` listed below.
> 3. **Design Consistency:** All inspector panels across all blocks must feel visually consistent, responsive-ready, and cohesive. If a required control does not exist, propose or create a new reusable component in `src/components/` first before using it in blocks.

---

## 🗂️ The 23 Approved UI Components Catalog

All components are imported using the `@Components/<component-name>` webpack alias.

---

### 1. Panel & Container Controls

#### 1.1 `InspectorControl` (`@Components/inspector-controls`)
Provides the standard 3-tab layout (`General`, `Style`, `Advanced`) for all blocks.
```jsx
import InspectorControl from '@Components/inspector-controls';

<InspectorControl
    generalControls={<GeneralPanel attributes={attributes} setAttributes={setAttributes} />}
    styleControls={<StylePanel attributes={attributes} setAttributes={setAttributes} />}
    advancedControls={<AdvancedPanel attributes={attributes} setAttributes={setAttributes} />}
/>
```

#### 1.2 `ResponsiveDeviceControl` (`@Components/responsive-device-control`)
Renders the Desktop, Tablet, and Mobile device switcher buttons in panel headers to control the active viewport.
```jsx
import ResponsiveDeviceControl from '@Components/responsive-device-control';

<ResponsiveDeviceControl />
```

---

### 2. Responsive Controls (Redux `@Store` Synchronized)

All responsive controls automatically listen to and interact with the Redux store (`deviceType`: `'Desktop' | 'Tablet' | 'Mobile'`).

#### 2.1 `ResponsiveRangeControl` (`@Components/responsive-range-control`)
Responsive slider with numeric input, min/max bounds, step increments, and unit handling.
```jsx
import ResponsiveRangeControl from '@Components/responsive-range-control';

<ResponsiveRangeControl
    label={__('Columns per Row', 'gslider-blocks')}
    controlKey="carouselPerColumn"
    attributes={attributes}
    setAttributes={setAttributes}
    min={1}
    max={12}
    step={1}
/>
```

#### 2.2 `ResponsiveTypographyControl` (`@Components/responsive-typography-control`)
Comprehensive typography manager handling Google Fonts loader, Font Size, Font Weight, Line Height, Letter Spacing, Word Spacing, Text Transform, and Text Decoration across all devices.
```jsx
import ResponsiveTypographyControl from '@Components/responsive-typography-control';

<ResponsiveTypographyControl
    label={__('Title Typography', 'gslider-blocks')}
    prefix="title" // Automatically manages titleFontFamily, titleFontSize, titleFontWeight, etc.
    attributes={attributes}
    setAttributes={setAttributes}
/>
```

#### 2.3 `ResponsiveSpacingControl` (`@Components/responsive-spacing-control`)
Manages 4-sided linked or unlinked dimensions (Top, Right, Bottom, Left) with unit selectors (`px`, `%`, `em`, `rem`) and auto-generates responsive CSS shorthand strings.
```jsx
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';

<ResponsiveSpacingControl
    label={__('Container Padding', 'gslider-blocks')}
    controlKey="containerPadding"
    attributes={attributes}
    setAttributes={setAttributes}
/>
```

#### 2.4 `ResponsiveAlignmentControl` (`@Components/responsive-alignment-control`)
Responsive horizontal or flex alignment switcher (`left`, `center`, `right`, `justify`).
```jsx
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';

<ResponsiveAlignmentControl
    label={__('Alignment', 'gslider-blocks')}
    controlKey="contentAlignment"
    attributes={attributes}
    setAttributes={setAttributes}
/>
```

#### 2.5 `ResponsiveToggleControl` (`@Components/responsive-toggle-control`)
Responsive boolean toggle switch allowing distinct visibility or behavior per device.
```jsx
import ResponsiveToggleControl from '@Components/responsive-toggle-control';

<ResponsiveToggleControl
    label={__('Show Arrows', 'gslider-blocks')}
    toggleValue={showNavigation}
    setToggleValue={(val) => setAttributes({ showNavigation: val })}
/>
```

#### 2.6 `ResponsiveBackgroundImageControl` (`@Components/responsive-background-image-control`)
Device-specific background image picker supporting responsive focal point, image size, repeat, and attachment.
```jsx
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';

<ResponsiveBackgroundImageControl
    label={__('Slide Background', 'gslider-blocks')}
    attributes={attributes}
    setAttributes={setAttributes}
    controlKey="slideBg"
/>
```

---

### 3. Color & Visual Styling Controls

#### 3.1 `ColorControl` (`@Components/color-control`)
Solid color picker supporting Normal and Hover states, transparency/alpha slider, and color palette presets.
```jsx
import ColorControl from '@Components/color-control';

<ColorControl
    label={__('Text Color', 'gslider-blocks')}
    color={textColor}
    colorHover={textColorHover}
    onChangeColor={(val) => setAttributes({ textColor: val })}
    onChangeHoverColor={(val) => setAttributes({ textColorHover: val })}
/>
```

#### 3.2 `GradientColorControl` (`@Components/gradient-color-control`)
Advanced gradient generator with support for linear and radial gradients, angle controls, and multiple color stops.
```jsx
import GradientColorControl from '@Components/gradient-color-control';

<GradientColorControl
    label={__('Overlay Gradient', 'gslider-blocks')}
    gradientValue={gradient}
    onChange={(val) => setAttributes({ gradient: val })}
/>
```

#### 3.3 `BackgroundControl` (`@Components/background-control`)
Multi-mode background manager supporting Classic Color, Gradient, and Image with overlay, position, repeat, and size.
```jsx
import BackgroundControl from '@Components/background-control';

<BackgroundControl
    label={__('Card Background', 'gslider-blocks')}
    attributes={attributes}
    setAttributes={setAttributes}
    prefix="cardBg"
/>
```

#### 3.4 `BoxShadowControl` (`@Components/box-shadow-control`)
Complete box-shadow generator with controls for horizontal/vertical offsets, blur radius, spread radius, shadow color, and inset mode.
```jsx
import BoxShadowControl from '@Components/box-shadow-control';

<BoxShadowControl
    label={__('Card Box Shadow', 'gslider-blocks')}
    attributes={attributes}
    setAttributes={setAttributes}
    controlKey="cardShadow"
/>
```

---

### 4. Content & Asset Controls

#### 4.1 `IconPicker` (`@Components/icon-picker`)
Searchable icon picker supporting Dashicons, FontAwesome, custom SVG code upload, and custom image upload.
```jsx
import IconPicker from '@Components/icon-picker';

<IconPicker
    label={__('Navigation Arrow Icon', 'gslider-blocks')}
    icon={arrowIcon}
    onChange={(val) => setAttributes({ arrowIcon: val })}
/>
```

#### 4.2 `ImageControl` (`@Components/image-control`)
WordPress Media Library image uploader with preview thumbnail, replace button, and remove action.
```jsx
import ImageControl from '@Components/image-control';

<ImageControl
    label={__('Author Avatar', 'gslider-blocks')}
    imageUrl={authorImage}
    imageId={authorImageId}
    onSelect={(media) => setAttributes({ authorImage: media.url, authorImageId: media.id })}
    onRemove={() => setAttributes({ authorImage: '', authorImageId: 0 })}
/>
```

#### 4.3 `HtmlTagControl` (`@Components/html-tag-control`)
Dropdown for selecting semantic HTML tags (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `div`).
```jsx
import HtmlTagControl from '@Components/html-tag-control';

<HtmlTagControl
    label={__('Title HTML Tag', 'gslider-blocks')}
    selectedTag={titleTag}
    onChange={(val) => setAttributes({ titleTag: val })}
/>
```

#### 4.4 `ContentOrderControl` (`@Components/content-order-control`)
Visual drag-and-drop layer reordering using `@dnd-kit/core` and `@dnd-kit/sortable` to let users sort content elements.
```jsx
import ContentOrderControl from '@Components/content-order-control';

<ContentOrderControl
    label={__('Content Order', 'gslider-blocks')}
    items={contentOrder}
    onChange={(newOrder) => setAttributes({ contentOrder: newOrder })}
/>
```

#### 4.5 `PresetSelector` (`@Components/preset-selector`)
Card-based visual layout preset selector for one-click template styling.
```jsx
import PresetSelector from '@Components/preset-selector';

<PresetSelector
    label={__('Layout Preset', 'gslider-blocks')}
    presets={PRESET_OPTIONS}
    selectedPreset={presetStyle}
    onChange={(val) => setAttributes({ presetStyle: val })}
/>
```

#### 4.6 `CustomCssEditor` (`@Components/custom-css-editor`)
Code editor with syntax highlighting for scoped custom CSS input targeting the block container.
```jsx
import CustomCssEditor from '@Components/custom-css-editor';

<CustomCssEditor
    value={customCss}
    onChange={(val) => setAttributes({ customCss: val })}
/>
```

---

### 5. Utility & Input Controls

#### 5.1 `InputControl` (`@Components/input-control`)
Text and number input control styled to match the GSlider design system with label, tooltip, and placeholder.
```jsx
import InputControl from '@Components/input-control';

<InputControl
    label={__('Custom CSS Class', 'gslider-blocks')}
    value={globalClass}
    onChange={(val) => setAttributes({ globalClass: val })}
/>
```

#### 5.2 `SelectControls` (`@Components/select-controls`)
Custom styled dropdown select with searchable options and custom chevron icon.
```jsx
import SelectControls from '@Components/select-controls';

<SelectControls
    label={__('Carousel Effect', 'gslider-blocks')}
    options={[
        { label: __('Slide', 'gslider-blocks'), value: 'slide' },
        { label: __('Fade', 'gslider-blocks'), value: 'fade' },
        { label: __('Cube', 'gslider-blocks'), value: 'cube' },
    ]}
    value={carouselEffect}
    onChange={(val) => setAttributes({ carouselEffect: val })}
/>
```

#### 5.3 `SwitcherControl` (`@Components/switcher-control`)
Segmented button group / tab switcher for toggling between 2-4 distinct modes.
```jsx
import SwitcherControl from '@Components/switcher-control';

<SwitcherControl
    label={__('Arrow Position', 'gslider-blocks')}
    options={[
        { label: __('Inside', 'gslider-blocks'), value: 'inside' },
        { label: __('Outside', 'gslider-blocks'), value: 'outside' },
    ]}
    value={navigationArrowPositionType}
    onChange={(val) => setAttributes({ navigationArrowPositionType: val })}
/>
```

#### 5.4 `UnitControl` (`@Components/unit-control`)
Unit selector button group (`px`, `%`, `em`, `rem`, `vw`, `vh`).
```jsx
import UnitControl from '@Components/unit-control';

<UnitControl
    selectedUnit={sizeUnit}
    units={['px', 'em', 'rem', '%']}
    onChange={(val) => setAttributes({ sizeUnit: val })}
/>
```

#### 5.5 `UrlControl` (`@Components/url-control`)
URL input control with target switch (`_blank` / `_self`), rel attributes (`nofollow`, `noopener`), and lightbox toggle.
```jsx
import UrlControl from '@Components/url-control';

<UrlControl
    label={__('Slide Link', 'gslider-blocks')}
    url={item.link}
    target={item.linkTarget}
    rel={item.linkRel}
    onChange={(linkData) => updateSlideLink(item.id, linkData)}
/>
```

---

## ⚡ Redux Store Integration (`@Store`)

The plugin maintains an active `@wordpress/data` store registered under the name `'gslider-blocks'`.
- Query active device: `useSelect((select) => select('gslider-blocks').getDeviceType(), [])`
- Switch active device: `useDispatch('gslider-blocks').setDeviceType('Mobile')`
- All responsive controls consume this store automatically.
