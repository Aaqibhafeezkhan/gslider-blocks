# Quick Start Guide

This guide walks you through installing **GSlider Blocks** and creating your first high-performance slider or carousel in the WordPress Block Editor (Gutenberg).

---

## 📦 Installation & Activation

### Option 1: Install from WordPress Plugin Directory (Recommended)

1. Log into your WordPress Admin Dashboard (`/wp-admin`).
2. Navigate to **Plugins ➔ Add New Plugin**.
3. Search for **"GSlider Blocks"**.
4. Click **Install Now**, then click **Activate**.

### Option 2: Manual ZIP Archive Upload

1. Download the latest `gslider-blocks.zip` from the [GitHub Releases](https://github.com/noruzzamans/gslider-blocks/releases) page.
2. In WordPress Admin, navigate to **Plugins ➔ Add New Plugin ➔ Upload Plugin**.
3. Choose the downloaded `.zip` file and click **Install Now**.
4. Once installed, click **Activate Plugin**.

---

## 🎯 Adding Your First Slider Block

GSlider Blocks provides three fast ways to insert sliders into any page, post, or full-site editing (FSE) template:

### 1. The Block Inserter (`+`)
1. Open the Gutenberg editor on any post or page.
2. Click the **`+` (Block Inserter)** button in the top toolbar.
3. Scroll to the **GSlider Blocks** category (or type "slider" in the search box).
4. Click on any of the 5 available blocks:
   - 🎯 **Base Slider**: Hero sliders with titles, descriptions, and CTA buttons.
   - 📝 **Flexi Content**: Nest arbitrary Gutenberg blocks inside responsive slides.
   - 🏢 **Logo Carousel**: Client/partner brand showcases with hover effects.
   - 🖼️ **Image Slider**: Image carousels with lightbox, captions, and links.
   - ⭐ **Testimonial Carousel**: Customer reviews with star ratings and author avatars.

### 2. Slash Command
Type `/gslider` or `/slider` directly inside an empty editor paragraph, and select your desired block from the autocomplete menu:

```text
/gslider-base
/gslider-image
/gslider-logo
/gslider-testimonial
/gslider-flexi
```

### 3. Starter Block Patterns (Fastest)
1. Click the **`+` (Block Inserter)** button in the top toolbar.
2. Select the **Patterns** tab and choose **GSlider Blocks**.
3. Select from 5 pre-built production templates:
   - *Full-Width Hero Slider*
   - *Product Showcase Carousel*
   - *Social Proof Testimonial Cards*
   - *Partner Brand Logo Carousel*
   - *Content Hero Slider*

---

## ⚙️ Essential Configuration Steps

Once your block is inserted:

### 1. Slide Management
- Use the **Add Slide** button in the editor canvas or the block inspector sidebar to append new slides.
- Drag and drop slides to reorder them instantly.

### 2. Layout & Transitions
In the right-hand **Block Inspector** panel:
- **Slider Type**: Choose between `"slider"` (single-slide focus) or `"carousel"` (multi-column grid).
- **Effect**: Select from smooth hardware-accelerated transitions: `Slide`, `Fade`, `Coverflow`, `Flip`, `Cube`, `Cards`, or `Creative`.
- **Responsive Columns**: Configure how many slides appear on Desktop, Tablet, and Mobile screens.

### 3. Autoplay & Navigation
- Toggle **Autoplay** and set transition delay (e.g. `3000ms`).
- Toggle **Navigation Arrows** and **Pagination Dots/Numbers**.
- Enable **Allow Touch Move** for mobile swipe gestures.

---

## 📱 Responsive Previewing

GSlider Blocks features native responsive preview synchronization:
- Toggle the Gutenberg device switcher (top right toolbar: **Desktop**, **Tablet**, **Mobile**).
- GSlider's inspector controls automatically adapt, displaying the active viewport's typography, spacing, and column settings in real time.

---

## 🚀 Next Steps

- Explore the **[Developer Handbook](../README.md)** for architecture deep dives.
- Build decoupled frontends with our **[Headless REST API Guide](../how-to-guides/headless-rest-api.md)**.
- Connect your AI assistant via the **[Model Context Protocol (MCP) Guide](../how-to-guides/mcp-server-ai-workflows.md)**.
