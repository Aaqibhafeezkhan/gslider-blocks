# PHP Actions & Filters Reference

This document provides exhaustive reference tables and code recipes for the WordPress filter hooks provided by **GSlider Blocks**. Developers and theme authors can hook into these filters to customize block registration, REST API serialization, CSS generation, and pattern directories.

---

## 🪝 Complete Filters Reference Table

| Hook Name | Parameters | Default Return | Location | Purpose |
| :--- | :--- | :---: | :--- | :--- |
| `gslider_rest_field_post_types` | `(array $post_types)` | `['post', 'page']` | `BlocksController.php` | Determines which post types expose the `gslider_blocks` REST field. |
| `gslider_normalized_block_data` | `(array $data, array $block)` | `$data` | `BlockParser.php` | Filters the pre-parsed block data before returning via REST API. |
| `gslider_block_attribute_defaults` | `(array $defaults, string $block_name)` | `$defaults` | `BlockParser.php` | Filters the default attributes used to backfill omitted block attributes. |
| `gslider_style_nonce` | `(string $nonce)` | `''` | `StyleGenerator.php` | Supplies a Content Security Policy (CSP) nonce string for dynamic `<style>` tags. |
| `gslider_csp_nonce` | `(string $nonce)` | `''` | `StyleGenerator.php` | Secondary CSP nonce filter for dynamic `<style>` tags. |
| `gslider_lcp_optimize` | `(bool $optimize)` | `true` | `StyleGenerator.php` | Toggles automated LCP image priority optimization on the first slide. |
| `gslider_registered_blocks` | `(array $blocks)` | Available block slugs | `RegistrationBlocks.php` | Modifies the list of blocks registered with Gutenberg. |
| `gslider_google_fonts_privacy_enabled` | `(bool $is_enabled)` | `false` | `FontLoader.php` | Enables or disables GDPR-compliant local hosting for Google Fonts. |
| `gslider_blocks_enable_patterns` | `(bool $enable)` | `true` | `RegistrationPatterns.php` | Toggles whether bundled starter block patterns register on `init`. |
| `gslider_blocks_patterns_dir` | `(string $dir)` | Plugin `patterns/` path | `RegistrationPatterns.php` | Customizes filesystem directory from which starter patterns load. |
| `gslider_blocks_patterns` | `(array $patterns)` | Parsed pattern list | `RegistrationPatterns.php` | Filters the complete loaded pattern templates array. |
| `gslider_dashboard_blocks_status` | `(array $blocks)` | Active blocks status | `DashboardController.php` | Modifies active/inactive block toggles in the admin dashboard. |

---

## 💡 Practical Implementation Recipes

### 1. Enable Headless REST API for Custom Post Types

By default, the `gslider_blocks` field attaches to standard `post` and `page` endpoints. To attach it to custom post types (e.g. WooCommerce `product` or a custom `portfolio` post type):

```php
add_filter( 'gslider_rest_field_post_types', function( array $post_types ): array {
    $post_types[] = 'product';
    $post_types[] = 'portfolio';
    return $post_types;
} );
```

---

### 2. Supply a Content Security Policy (CSP) Nonce

If your site enforces a strict CSP without `'unsafe-inline'`, provide your per-request nonce to attach it automatically to all dynamic block `<style>` tags:

```php
add_filter( 'gslider_style_nonce', function( string $nonce ): string {
    return my_custom_csp_nonce();
} );
```

---

### 3. Load Custom Block Patterns from a Child Theme

You can redirect the starter pattern loader to load curated block patterns directly from your child theme:

```php
add_filter( 'gslider_blocks_patterns_dir', function( string $dir ): string {
    $theme_dir = get_stylesheet_directory() . '/gslider-patterns';
    if ( is_dir( $theme_dir ) ) {
        return $theme_dir;
    }
    return $dir;
} );
```

---

### 4. Transform REST Output for Decoupled Frontends

To inject custom metadata (e.g. CDN image transformations, analytics tracking IDs) into the REST block output:

```php
add_filter( 'gslider_normalized_block_data', function( array $data, array $block ): array {
    // Append custom tracking attribute to every slider
    $data['analytics_id'] = 'slider-' . ( $data['blockId'] ?? 'unknown' );
    
    // Rewrite image URLs to a custom CDN endpoint
    if ( ! empty( $data['slides'] ) && is_array( $data['slides'] ) ) {
        foreach ( $data['slides'] as &$slide ) {
            if ( isset( $slide['url'] ) ) {
                $slide['url'] = str_replace( 'https://example.com', 'https://cdn.example.com', $slide['url'] );
            }
        }
    }
    
    return $data;
}, 10, 2 );
```

---

### 5. Disable Starter Patterns Completely

If your organization uses a bespoke design system and wants to hide all default starter patterns:

```php
add_filter( 'gslider_blocks_enable_patterns', '__return_false' );
```
