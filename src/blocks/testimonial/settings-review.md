# Testimonial Block — Settings Review

## Current Settings Overview

### Inspector Panel (Global Settings)

#### General Tab

| Panel | Setting | Type | Status |
|-------|---------|------|--------|
| **Show/Hide Elements** | Show Testimonial Title | Toggle | ✅ |
| | Show Testimonial Text | Toggle | ✅ |
| | Show Author Name | Toggle | ✅ |
| | Show Author Designation | Toggle | ✅ |
| | Show Author Image | Toggle | ✅ |
| | Show Rating | Toggle | ✅ |
| | Show Navigation | Responsive Toggle | ✅ |
| | Show Pagination | Responsive Toggle | ✅ |
| **Slider Items** | Add/Delete/Duplicate/Reorder slides | DnD + Buttons | ✅ |
| **Layout & Content** | Layout Height (auto/fixed) | Switcher + Range | ✅ |
| | Content Width | Responsive Range | ✅ |
| | Content Alignment | Responsive Alignment | ✅ |
| | Content Vertical/Horizontal Align | Switcher | ✅ |
| | HTML Tags (Author, Designation, Title, Text) | Select | ✅ |
| **Content Order** | Drag-and-drop content order | DnD Sortable | ✅ |
| **Slider Settings** | Slider Type (Slider/Carousel) | Switcher | ✅ |
| | Speed, Autoplay, Delay | Range/Toggle | ✅ |
| | Infinite Loop, Touch, Pause on Hover | Toggle | ✅ |
| | Slide Effect (fade/cube/flip/coverflow) | Select | ✅ |
| | Mousewheel, Keyboard Navigation | Toggle | ✅ |

#### Styles Tab

| Panel | Setting | Type | Status |
|-------|---------|------|--------|
| **Content** | Content Padding | Responsive Spacing | ✅ |
| **Testimonial Title** | Typography (family, size, weight, style, transform, decoration, line-height, letter-spacing, word-spacing) | Responsive Typography | ✅ |
| | Color (normal/hover) | Color Control | ✅ |
| | Margin & Padding | Responsive Spacing | ✅ |
| **Testimonial Text** | Typography | Responsive Typography | ✅ |
| | Color (normal/hover) | Color Control | ✅ |
| | Margin & Padding | Responsive Spacing | ✅ |
| **Author Name** | Typography | Responsive Typography | ✅ |
| | Color (normal/hover) | Color Control | ✅ |
| | Margin & Padding | Responsive Spacing | ✅ |
| **Author Designation** | Typography | Responsive Typography | ✅ |
| | Color (normal/hover) | Color Control | ✅ |
| | Margin & Padding | Responsive Spacing | ✅ |
| **Author Image** | ❌ No style controls | — | ⚠️ Missing |
| **Rating** | ❌ No style controls | — | ⚠️ Missing |
| **Navigation Arrows** | Custom Icons (left/right) | IconPicker/ImageControl | ✅ |
| | Arrow Size | Responsive Range | ✅ |
| | Arrow Color (normal/hover) | Color Control | ✅ |
| | Background (normal/hover) | Background Control | ✅ |
| | Width & Height | Range | ✅ |
| | Border, Border Radius | Responsive Spacing | ✅ |
| | Box Shadow (normal/hover) | Box Shadow | ✅ |
| | Position (inside/outside/custom) | Switcher | ✅ |
| | Position Offsets, Gap | Range | ✅ |
| **Pagination Dots** | Dot Colors (normal/active) | Color | ✅ |
| | Dot Size (normal/active) | Range | ✅ |
| | Border, Border Radius (normal/active) | Responsive | ✅ |
| | Dot Margin, Position | Spacing/Range | ✅ |
| **Pagination Fraction** | Typography, Color | Typography/Color | ✅ |
| **Pagination Progressbar** | BG Color (normal/active), Height | Color/Range | ✅ |

#### Advanced Tab

| Panel | Setting | Type | Status |
|-------|---------|------|--------|
| **Layout** | Global Margin & Padding | Responsive Spacing | ✅ |
| | Z-Index, Custom ID, Custom Class | Input | ✅ |
| **Background** | Background (normal/hover) | Background Control | ✅ |
| **Border** | Border, Border Radius | Responsive | ✅ |
| **Box Shadow** | Box Shadow (normal/hover) | Box Shadow | ✅ |
| **Custom CSS** | Custom CSS Editor | Textarea | ✅ |

---

### Per-Item Settings (SortableItem — Inside each slide)

| Dropdown | Setting | Type | Status |
|----------|---------|------|--------|
| **Slide Content** | Testimonial Title | RichText | ✅ |
| | Testimonial Text | RichText | ✅ |
| | Author Name | RichText | ✅ |
| | Author Designation | RichText | ✅ |
| | Author Image | ImageControl | ✅ |
| | Rating Icon Type (None/Icon/Image) | SwitcherControl | ✅ |
| | Rating Image (for image mode) | ImageControl | ✅ |
| | Rating Number (icon: 0-5 step 0.1, image: 0-5 step 1) | RangeControl | ✅ |
| **Background** | Background Type (Classic/Gradient) | Background Control | ✅ |
| | Responsive Background Image | Image Control | ✅ |

---

## ⚠️ Missing Rating Style Settings (To Be Added)

These settings need to be added to the **Styles tab** in the Inspector panel:

### Priority: High
| Setting | Component | Description |
|---------|-----------|-------------|
| **Star Color** | ColorControl | Color for filled stars (default: #ffb700) |
| **Empty Star Color** | ColorControl | Color for empty/outline stars (default: #d4d4d4) |
| **Star Size** | ResponsiveRangeControl | Size of stars in px (default: 20px, range: 10-50) |

### Priority: Medium
| Setting | Component | Description |
|---------|-----------|-------------|
| **Rating Margin** | ResponsiveSpacingControl | Margin around rating wrapper |
| **Rating Padding** | ResponsiveSpacingControl | Padding inside rating wrapper |
| **Star Gap** | RangeControl | Space between individual stars (default: 5px) |

### Priority: Low
| Setting | Component | Description |
|---------|-----------|-------------|
| **Show Rating Number** | ToggleControl | Show numeric value (e.g., "4.5/5") next to stars |
| **Rating Number Typography** | ResponsiveTypographyControl | Typography for the numeric display |
| **Rating Number Color** | ColorControl | Color for the numeric display |

---

## ⚠️ Missing Author Image Style Settings (To Be Added)

### Priority: Medium
| Setting | Component | Description |
|---------|-----------|-------------|
| **Image Size** | ResponsiveRangeControl | Width/Height (default: 80px) |
| **Image Border Radius** | ResponsiveSpacingControl | Corner rounding (default: 50%) |
| **Image Border** | BorderControl | Border style, width, color |
| **Image Margin** | ResponsiveSpacingControl | Spacing around image |
