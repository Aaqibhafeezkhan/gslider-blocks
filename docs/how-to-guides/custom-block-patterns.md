# Custom Block Patterns Guide

Welcome to the **GSlider Blocks Custom Patterns Guide**. This document explains how GSlider Blocks registers native Gutenberg block patterns, how the patterns subsystem is architected, and how theme developers and agencies can build, customize, and register custom slider patterns with zero block invalidation errors.

---

## 🏗️ 1. Architecture Overview

GSlider Blocks bundles high-impact, production-ready block patterns for hero sliders, client logo clouds, testimonial cards, and product showcases.

```text
patterns/
├── content-hero-slider.php              # Full-height split hero slider with CTA buttons
├── full-width-hero-slider.php          # High-impact edge-to-edge image slider
├── partner-brand-logo-carousel.php      # Continuous loop client logo carousel
├── product-showcase-carousel.php        # Multi-column eCommerce product card slider
└── social-proof-testimonial-cards.php   # Star-rated testimonial review card carousel
```

### Registration Lifecycle

All bundled patterns are handled by [`RegistrationPatterns.php`](file:///includes/Classes/RegistrationPatterns.php):

1. **Native Gutenberg Category:** Registers the `gslider-blocks` category (`GSlider Blocks`) via `register_block_pattern_category()`.
2. **Automatic File Discovery:** Recursively scans the `patterns/` directory on the WordPress `init` hook.
3. **In-Memory Caching:** Parses pattern headers once per request and caches metadata in memory.
4. **Universal Availability:** Registers patterns unconditionally across all WordPress contexts (Block Editor, Full Site Editing / FSE, Site Editor, and REST API).

---

## 📝 2. Pattern File Header Format

Every pattern file in `patterns/` must start with standard WordPress block pattern headers wrapped in a PHP docblock:

```php
<?php
/**
 * Title: Luxury Real Estate Hero Slider
 * Slug: my-agency/luxury-real-estate-slider
 * Categories: gslider-blocks, header, featured
 * Keywords: slider, real estate, luxury, hero, carousel
 * Description: Premium full-width property showcase slider with autoplay and blur overlays.
 *
 * @package My_Agency_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
```

### Supported Header Fields

| Header Key | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `Title` | **Yes** | Human-readable pattern name in the Gutenberg Inserter | `Title: Partner Brand Logo Cloud` |
| `Slug` | **Yes** | Unique namespaced identifier (`<namespace>/<slug>`) | `Slug: gslider-blocks/partner-brand-logo-carousel` |
| `Categories` | **Yes** | Comma-separated list of category slugs | `Categories: gslider-blocks, featured` |
| `Keywords` | No | Comma-separated search terms for the Inserter | `Keywords: logos, clients, partners, swiper` |
| `Description` | No | Accessible description for screen readers | `Description: Seamless continuous logo carousel` |
| `Viewport Width` | No | Preview width in the pattern modal (default: 1200) | `Viewport Width: 1400` |

---

## 🔒 3. Golden Rules for Pattern Development

When building block patterns for GSlider Blocks, strictly follow these core rules:

### Rule 1: Escaping in Block Delimiters vs. HTML Attributes

Gutenberg stores block attributes in serialized JSON comments (`<!-- wp:... {...} -->`). You must use the correct escaping function depending on the context:

```php
<?php
$slide_image_url = get_stylesheet_directory_uri() . '/assets/images/slide-1.svg';
?>

<!-- 1. INSIDE BLOCK DELIMITER JSON: ALWAYS USE esc_url_raw() -->
<!-- wp:gslider-blocks/image-slider {"images":[{"id":1,"url":"<?php echo esc_url_raw( $slide_image_url ); ?>","alt":"Slide 1"}]} -->
<div class="wp-block-gslider-blocks-image-slider gslider-image-slider-wrapper">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <!-- 2. INSIDE HTML ATTRIBUTES: ALWAYS USE esc_url() -->
        <img src="<?php echo esc_url( $slide_image_url ); ?>" alt="<?php esc_attr_e( 'Slide 1', 'my-theme' ); ?>" />
      </div>
    </div>
  </div>
</div>
<!-- /wp:gslider-blocks/image-slider -->
```

> [!WARNING]
> Never use `esc_url()` inside JSON block delimiters. `esc_url()` converts `&` to `&amp;`, which breaks JSON parsing and causes Gutenberg block invalidation errors (`This block contains unexpected or invalid content`).

---

### Rule 2: Zero Third-Party Hotlinking (GDPR & Privacy Compliance)

Bundled patterns must **never** load images or fonts from external third-party CDNs (e.g., Unsplash, Placehold.co, Google CDN):
- Hotlinking external assets leaks visitor IP addresses to third parties, violating European GDPR regulations.
- External CDNs can experience downtime or remove images without notice.
- **Solution:** Always store lightweight, local vector SVGs or optimized WebP images inside your theme or plugin assets folder.

```php
// Correct: Safe local asset resolution
$base_url = trailingslashit( get_stylesheet_directory_uri() );
$logo_1   = $base_url . 'assets/images/partner-1.svg';
```

---

### Rule 3: Zero Block Invalidation (Markup Exactness)

The HTML markup inside the pattern **must exactly match** what `save.js` renders for the given attributes:
- If attributes specify navigation arrows, the `.swiper-button-next` and `.swiper-button-prev` elements must be included.
- If pagination is enabled, the pagination container element (`.swiper-pagination`) must be present with the matching class.
- Always test inserting your pattern in Gutenberg and verify that the browser console reports **0 block invalidation warnings**.

---

## 🛠️ 4. Registering Custom Patterns in a Theme or Plugin

### Method A: Programmatic Registration via `register_block_pattern`

To register custom GSlider patterns from your child theme or agency plugin, hook into `init`:

```php
<?php
/**
 * Register custom agency slider patterns.
 */
add_action( 'init', function() {
	if ( ! function_exists( 'register_block_pattern' ) ) {
		return;
	}

	$theme_url = trailingslashit( get_stylesheet_directory_uri() );

	register_block_pattern(
		'my-agency/hero-showcase-slider',
		[
			'title'       => __( 'Hero Showcase Slider', 'my-agency' ),
			'description' => __( 'Full-bleed agency portfolio showcase slider.', 'my-agency' ),
			'categories'  => [ 'gslider-blocks', 'header' ],
			'keywords'    => [ 'slider', 'portfolio', 'agency', 'hero' ],
			'content'     => '<!-- wp:gslider-blocks/image-slider {"autoplay":true,"autoplayDelay":{"Desktop":5000,"Tablet":5000,"Mobile":5000}} -->
<div class="wp-block-gslider-blocks-image-slider gslider-image-slider-wrapper inside center has-pagination" data-swiper-settings="{&quot;effect&quot;:&quot;fade&quot;,&quot;loop&quot;:true}"><div class="swiper"><div class="swiper-wrapper"><div class="swiper-slide"><img src="' . esc_url( $theme_url . 'assets/images/hero-1.svg' ) . '" alt="' . esc_attr__( 'Project One', 'my-agency' ) . '"/></div></div><div class="swiper-pagination"></div></div></div>
<!-- /wp:gslider-blocks/image-slider -->',
		]
	);
} );
```

---

### Method B: Block Themes (Full Site Editing - FSE)

If you are using a modern WordPress Block Theme (e.g. Twenty Twenty-Four or a custom FSE theme):

1. Create a `patterns/` directory in your theme root: `my-theme/patterns/`.
2. Add your pattern PHP file (e.g. `patterns/agency-hero-slider.php`).
3. Add the pattern header with `Categories: gslider-blocks, header`.
4. WordPress 6.0+ will automatically discover and register the pattern into the Gutenberg block inserter without writing any PHP code!

---

## 🪝 5. GSlider Patterns PHP Hooks Reference

GSlider Blocks provides 3 specialized filter hooks to customize the patterns subsystem:

### 1. `gslider_blocks_enable_patterns`
Conditionally disable all bundled GSlider starter patterns (useful for whitelabel client builds):

```php
// Disable default starter patterns in production
add_filter( 'gslider_blocks_enable_patterns', '__return_false' );
```

### 2. `gslider_blocks_patterns_dir`
Change the directory where GSlider scans for pattern files:

```php
add_filter( 'gslider_blocks_patterns_dir', function( $dir ) {
	return get_stylesheet_directory() . '/custom-gslider-patterns';
} );
```

### 3. `gslider_blocks_patterns`
Filter the collected patterns array before registration to dynamically modify, hide, or append patterns:

```php
add_filter( 'gslider_blocks_patterns', function( array $patterns ) {
	// Remove a specific bundled pattern if not needed
	unset( $patterns['gslider-blocks/product-showcase-carousel'] );
	return $patterns;
} );
```

---

## 🌐 6. Internationalization (i18n) & Localization

All bundled pattern metadata in GSlider Blocks is compatible with the standard WordPress translation tools (`wp i18n make-pot`):

- Dynamic file headers in `patterns/*.php` are parsed at runtime.
- For `make-pot` translation catalog extraction, literal strings are maintained in `RegistrationPatterns::get_pattern_translations()`:

```php
public static function get_pattern_translations(): array {
    return [
        'full-width-hero-slider' => [
            'title'       => __( 'Full-Width Hero Slider', 'gslider-blocks' ),
            'description' => __( 'High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.', 'gslider-blocks' ),
        ],
        // ...
    ];
}
```

---

## 🧪 7. Validation Checklist for New Patterns

Before shipping a new custom pattern to production, verify the following checklist:

- [ ] **Valid Headers:** File contains valid `Title`, `Slug`, and `Categories`.
- [ ] **Proper Escaping:** Uses `esc_url_raw()` in block JSON delimiter comments and `esc_url()` in HTML tags.
- [ ] **No External Assets:** All images and SVG icons are loaded locally via theme or plugin URLs.
- [ ] **Zero Invalidation Errors:** Inserts cleanly in the Gutenberg editor across Desktop, Tablet, and Mobile.
- [ ] **Responsive Swiper Config:** `data-swiper-settings` contains valid JSON with appropriate breakpoint configurations.
