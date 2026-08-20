# Inspector Controls Panel Architecture Guide

This guide outlines the standard layout and section architecture for `inspector.js` in all GSlider blocks.

---

## 🏛️ Standard 3-Tab Structure

Every block's `inspector.js` must be structured into three main control sections matching `InspectorControl` tabs:
1. **`General Controls`** (`generalControls`)
2. **`Style Controls`** (`styleControls`)
3. **`Advanced Controls`** (`advancedControls`)

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import InspectorControl from '@Components/inspector-controls';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

export default function Inspector({ attributes, setAttributes }) {
    const generalControls = (
        <>
            {/* Panel 1: Slider Settings */}
            {/* Panel 2: Slide Items / Content */}
            {/* Panel 3: Presets (if applicable) */}
        </>
    );

    const styleControls = (
        <>
            {/* Panel 1: Container / Item Styles */}
            {/* Panel 2: Typography & Colors (Subtitle, Title, Description, Buttons) */}
            {/* Panel 3: Navigation Arrows Styling */}
            {/* Panel 4: Pagination Styling */}
        </>
    );

    const advancedControls = (
        <>
            {/* Panel 1: Responsive Visibility & Z-Index */}
            {/* Panel 2: Custom CSS Editor */}
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

## 📑 Detailed Panel Breakdown by Tab

### Tab 1: General
- **Slider Settings Panel** (`initialOpen={true}`):
  - `sliderType` (Slider / Carousel)
  - `carouselPerColumn` (Responsive columns)
  - `carouselPerColumnGap` (Responsive gap)
  - `speed`, `autoplay`, `autoplayDelay`, `infiniteLoop`, `allowTouchMove`, `pauseOnHover`, `stopOnLastSlide`, `reverseDirection`
  - `slideEffect` / `carouselEffect`
  - `mousewheelControl`, `keyboardNavigation`, `enableLazyLoad`
- **Content / Items Panel** (`initialOpen={false}`):
  - Add/Edit/Remove/Sort items (via `@dnd-kit/sortable` or media uploader)
  - Show/Hide switches (`showSubTitle`, `showTitle`, `showDescription`, `showButton`, `showNavigation`, `showPagination`)
  - Semantic HTML tags (`subTitleHtmlTag`, `titleHtmlTag`, `descriptionHtmlTag`)
- **Preset Panel** (Testimonial & Card layouts):
  - Visual template cards to quickly switch design themes.

### Tab 2: Style
- **Slide Item / Container Styles** (`initialOpen={false}`):
  - Layout height (`fixed` vs `adapt`, with responsive height slider)
  - Content width & alignment (`contentWidth`, `contentAlignment`, `contentVerticalAlignment`)
  - Padding & margin (via `ResponsiveSpacingControl`)
  - Background (via `BackgroundControl`: classic color, gradient, background image)
  - Overlay (color, opacity slider)
  - Border & Border Radius (via standard border controls)
  - Box Shadow (normal & hover)
- **Typography & Colors**:
  - Subtitle: `ResponsiveTypographyControl`, `ColorControl`, `ResponsiveSpacingControl`
  - Title: `ResponsiveTypographyControl`, `ColorControl`, `ResponsiveSpacingControl`
  - Description: `ResponsiveTypographyControl`, `ColorControl`, `ResponsiveSpacingControl`
  - Buttons: Primary & Secondary button typography, normal/hover colors, normal/hover backgrounds, padding, margin, border, radius, shadow
- **Navigation Arrows Style** (`initialOpen={false}`):
  - Position type (`inside` / `outside`), Position (`center`, `top-right`, etc.)
  - Arrow width, height, size, gap
  - Normal & hover arrow color, background color, border, radius, shadow
- **Pagination Style** (`initialOpen={false}`):
  - Position type (`inside` / `outside`), Position offset
  - Bullets normal & active width, height, border, radius, colors
  - Fraction typography and colors
  - Progressbar height and colors

### Tab 3: Advanced
- **Layout & Positioning**:
  - `zIndex` (responsive object: `{ Desktop, Tablet, Mobile }`)
  - Additional CSS classes (`globalClass`) and HTML ID (`globalID`)
- **Custom CSS Editor**:
  - Monaco code editor (`CustomCssEditor`) scoped to `.${blockId}`.
