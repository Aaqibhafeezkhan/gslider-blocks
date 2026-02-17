# Testimonial Block — Remaining FREE Features

> **Created**: February 15, 2026
> **Reference**: `log/testimonial-block-strategy.md`

---

## 🔑 Summary — Remaining Feature Groups

| # | Feature Group | Items | Size |
|---|--------------|-------|------|
| 1 | Company Logo render (data আছে, render নেই) | edit/save render + toggle + styling | 🟡 Medium |
| 2 | Review Date field (নতুন) | attribute + sortable input + render + toggle + styling | 🟡 Medium |
| 3 | Review Link field (নতুন) | attribute + sortable input + render + toggle + styling | 🟡 Medium |
| 4 | Quote Icon system | toggle + position + icon + size + color + opacity | 🟡 Medium |
| 5 | Schema Markup toggle | LD+JSON output in save | 🟢 Small |
| 6 | Preloader toggle | simple CSS loader | 🟢 Small |
| 7 | Layout System (Grid, List) | Grid + List layout বাকি (Slider ও Carousel done) | 🟡 Medium |
| 8 | Theme System (Theme One, v2) | card design templates | 🔴 Large |
| 9 | Testimonial Form (Free version) | সম্পূর্ণ নতুন feature | 🔴 Very Large |

---

## ✅ Already Done (Current State)

- Testimonial Title — field, toggle (`showTestimonialTitle`), typography styling
- Testimonial Text — field, typography styling
- Author Name — field, toggle, typography styling
- Designation — field, toggle, typography styling
- Company Name — field, toggle, typography styling
- Author Image — render in edit/save, placeholder fallback, show/hide toggle, responsive
- Star Rating — basic render (edit.js + save.js), icon/image mode switch
- Content Order — drag-and-drop reorder via `contentOrder` attribute
- Container/Card Styling — background (color/gradient/image), overlay, border, radius, shadow, padding
- Slider — Swiper.js integration, autoplay, loop, speed, pause on hover
- Navigation Arrows — show/hide, icon customization, colors, position
- Pagination — bullets, dynamic, fraction, position
- Responsive Columns

---

## 🔴 Remaining FREE Features

### 1. Company Logo Render

**Status**: Data attributes exist (`companyLogo` in `sliderItems`) but **NOT rendered** in `edit.js` or `save.js`.

**What to do**:
- [ ] Render `<img>` for company logo in `edit.js` slide markup
- [ ] Render `<img>` for company logo in `save.js` slide markup
- [ ] Add placeholder fallback image (like author image)
- [ ] Add `showCompanyLogo` responsive toggle in inspector (Display panel)
- [ ] Add Company Logo **styling panel** in inspector:
  - Max Width/Height (responsive)
  - Border & Border Radius
  - Margin & Padding
- [ ] Add company logo styles in `styling.js`

**Files**: `edit.js`, `save.js`, `inspector.js`, `attributes.js`, `styling.js`

---

### 2. Review Date Field

**Status**: ❌ Not started. Marked as `⏳ Future` in strategy.

**What to do**:
- [ ] Add `reviewDate` to `sliderItems` default objects in `attributes.js`
- [ ] Add `reviewDate` to item schema properties in `attributes.js`
- [ ] Add date input in `sortableItem.js` (TextControl or DatePicker)
- [ ] Render review date in `edit.js` slide markup
- [ ] Render review date in `save.js` slide markup
- [ ] Add `showReviewDate` responsive toggle in inspector (Display panel)
- [ ] Add Review Date **typography panel** in inspector:
  - Font Family, Weight, Size, Line Height, Align, Transform, Letter Spacing, Color, Margin
  - Default: Open Sans Regular, 15px, #444444
- [ ] Add review date styles in `styling.js`

**Files**: `attributes.js`, `sortableItem.js`, `edit.js`, `save.js`, `inspector.js`, `styling.js`

---

### 3. Review Link Field

**Status**: ❌ Not started. Marked as `⏳ Future` in strategy. Free in Strong Testimonials.

**What to do**:
- [ ] Add `reviewLink` to `sliderItems` default objects in `attributes.js`
- [ ] Add `reviewLink` to item schema properties in `attributes.js`
- [ ] Add URL input in `sortableItem.js` (TextControl with type="url")
- [ ] Render link in `edit.js` (non-clickable in editor, just visual)
- [ ] Render `<a>` link in `save.js` (opens in new tab)
- [ ] Add `showReviewLink` responsive toggle in inspector (Display panel)
- [ ] Add Review Link **styling** in inspector (color, hover color, font size)
- [ ] Add review link styles in `styling.js`

**Files**: `attributes.js`, `sortableItem.js`, `edit.js`, `save.js`, `inspector.js`, `styling.js`

---

### 4. Quote Icon

**Status**: ❌ Not started.

**What to do**:
- [ ] Add `showQuoteIcon` responsive toggle attribute in `attributes.js`
- [ ] Add `quoteIconPosition` attribute — values: `top`, `bottom`, `both` (default: `top`)
- [ ] Add `quoteIcon` attribute — default SVG quote icon
- [ ] Add `quoteIconSize` responsive attribute
- [ ] Add `quoteIconColor` attribute
- [ ] Add `quoteIconOpacity` attribute (0-1)
- [ ] Render quote icon SVG in `edit.js` based on position
- [ ] Render quote icon SVG in `save.js` based on position
- [ ] Add Quote Icon **settings panel** in inspector:
  - Show/Hide toggle (responsive)
  - Position selector (Top/Bottom/Both)
  - Icon picker (default quote + custom)
  - Size (responsive)
  - Color picker
  - Opacity slider
- [ ] Add quote icon styles in `styling.js`

**Files**: `attributes.js`, `edit.js`, `save.js`, `inspector.js`, `styling.js`

---

### 5. Schema Markup (Basic)

**Status**: ❌ Not started. (Attempted but postponed by user).

**What to do**:
- [ ] Add `enableSchema` toggle attribute (default: false)
- [ ] Add toggle in inspector (Display panel)
- [ ] Implement schema JSON-LD output (PHP render_block)
  - Include: author name, review body, rating value
- [ ] Wrap schema in `<script type="application/ld+json">` tag

**Files**: `attributes.js`, `inspector.js`, `save.js`

---

### 6. Preloader

**Status**: ❌ Not started.

**What to do**:
- [ ] Add `enablePreloader` toggle attribute (default: false)
- [ ] Add toggle in inspector (Display panel)
- [ ] Add preloader HTML/CSS (spinner or skeleton) that shows before Swiper initializes
- [ ] Hide preloader after Swiper `init` event in `view.js`
- [ ] Add preloader CSS in `style.scss`

**Files**: `attributes.js`, `inspector.js`, `save.js`, `view.js`, `style.scss`

---

### 7. Layout System (Grid, List)

**Status**: Slider ✅ and Carousel ✅ already implemented. Only **Grid** and **List** layouts remaining.

**What to do**:
- [ ] Add `grid` and `list` values to existing `layoutType` / `sliderType` attribute
- [ ] **Grid Layout**:
  - Static CSS grid, no Swiper
  - Responsive columns already exist, reuse them
  - Remove navigation/pagination when Grid selected
- [ ] **List Layout**:
  - Vertical single-column list, no Swiper
  - Simple stacked cards
- [ ] Conditional rendering in `edit.js` — Swiper for slider/carousel, static for grid/list
- [ ] Conditional rendering in `save.js` — same logic
- [ ] Conditional Swiper init in `view.js` — skip for grid/list
- [ ] Layout-specific CSS in `style.scss`
- [ ] Update `styling.js` for layout-specific styles

**Files**: `attributes.js`, `edit.js`, `save.js`, `view.js`, `inspector.js`, `styling.js`, `style.scss`

---

### 8. Theme System (Theme One + v2)

**Status**: ❌ No theme system exists. Strategy says 2 free themes.

**What to do**:
- [ ] Add `themeStyle` attribute — values: `theme-one`, `theme-one-v2` (default: `theme-one`)
- [ ] Add Theme selector UI in inspector (visual preset cards)
- [ ] **Theme One** (Default centered):
  - Centered text, image on top, name/designation below text
  - This is roughly what currently exists
- [ ] **Theme One v2** (Variation):
  - Design a variation — e.g., image left-aligned, text right, different card style
- [ ] Apply theme class to wrapper: `.gs-theme-one`, `.gs-theme-one-v2`
- [ ] Add theme-specific CSS in `style.scss`
- [ ] Ensure themes work across all layouts (slider, grid, list, carousel)

**Files**: `attributes.js`, `inspector.js`, `edit.js`, `save.js`, `style.scss`

---

### 9. Testimonial Form (Free Version)

**Status**: ❌ Not started. This is a completely separate feature.

**What to do**:
- [ ] Create new block or shortcode for frontend submission form
- [ ] Form fields (Free): Full Name, Email, Designation, Title, Content, Photo, Star Rating, Company Name, Company Website, Submit
- [ ] Form validation (required fields)
- [ ] Submission handler (save as custom post type or post meta)
- [ ] Submission status: Pending Review (default)
- [ ] Labels & Messages customization
- [ ] Success/Error messages
- [ ] Basic email notification to admin
- [ ] Form styling controls

> ⚠️ **This is the LARGEST feature** — practically a separate plugin/block. Consider deferring to Phase 2.

---

## 📊 Priority Recommendation

| Priority | Features | Effort |
|----------|----------|--------|
| 🥇 P1 | Company Logo render | Medium |
| 🥈 P2 | Quote Icon, Review Date, Review Link | Medium |
| 🥉 P3 | Schema, Preloader | Small |
| 🏗️ P4 | Layout System (Grid + List) | Medium |
| 🏗️ P5 | Theme System | Large |
| 📋 P6 | Testimonial Form | Very Large (consider Phase 2) |
