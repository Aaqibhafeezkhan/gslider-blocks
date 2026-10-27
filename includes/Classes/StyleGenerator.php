<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering, applies strict CSS sanitization
 * to prevent arbitrary CSS injection, enforces block-level scoping, and
 * outputs safe scoped styles inline.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;
use GSlider\Utils\CssSanitizer;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( StyleGenerator::class, false ) ) {

    /**
     * Generates and manages safe dynamic CSS for GSlider blocks.
     *
     * Collects styles from rendered blocks, sanitizes them to ensure
     * all rules are scoped to the block ID and free of arbitrary code,
     * and injects them via WordPress core inline style APIs.
     *
     * @since 1.0.0
     */
    class StyleGenerator implements Registrable {

        use SingletonTrait;

        /**
         * Collected and sanitized block styles keyed by block ID.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $styles = [];

        /**
         * Track block IDs whose style tags have already been rendered on the current request.
         *
         * Prevents duplicate <style> tags for the same block ID (e.g. in query loops or synced patterns).
         *
         * @since 1.2.0
         *
         * @var array<string, bool>
         */
        private static $printed = [];

        /**
         * Track whether the LCP image priority has been applied to the first slide on the page.
         *
         * @since 1.2.0
         *
         * @var bool
         */
        private static $lcp_optimized = false;

        /**
         * Depth counter for headless renders that must keep inline styles inside REST responses.
         *
         * @since 1.2.0
         *
         * @var int
         */
        private static $headless_depth = 0;

        /**
         * Registers hooks for style collection, sanitization, and rendering.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_and_render_dynamic_styles' ], 10, 2 );
            add_action( 'wp_footer', [ $this, 'print_footer_styles' ], 20 );
            add_action( 'wp_enqueue_scripts', [ $this, 'register_style_handle' ], 20 );
        }

        /**
         * Registers the dynamic style handle for WordPress enqueue system.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function register_style_handle(): void {
            if ( ! wp_style_is( 'gslider-blocks-dynamic-styles', 'registered' ) ) {
                wp_register_style( 'gslider-blocks-dynamic-styles', false, [], GSLIDER_VERSION );
                wp_enqueue_style( 'gslider-blocks-dynamic-styles' );
            }
        }

        /**
         * Collects, sanitizes, and renders dynamic styles for GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block,
         * strictly validates that all CSS rules are scoped to the block ID,
         * strips dangerous properties/protocols, and injects safe scoped CSS.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_and_render_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            // Never print styles or touch markup inside RSS/Atom feeds (#312).
            if ( function_exists( 'is_feed' ) && is_feed() ) {
                return $block_content;
            }

            $headless = self::$headless_depth > 0;

            // Generic REST responses (e.g. content.rendered) get no inline CSS (#312), except
            // the plugin's own headless renders (BlockParser), which need per-slide CSS.
            if ( ! $headless && self::is_rest_request() ) {
                return $block_content;
            }

            if ( false === strpos( $block['blockName'], 'gslider-blocks/' ) ) {
                return $block_content;
            }

            if ( ! $headless ) {
                // Apply LCP image priority to the first slide image on the page (frontend only).
                $block_content = $this->optimize_lcp_image( $block_content );
            }

            if ( empty( $block['attrs']['blockStyle'] ) ) {
                return $block_content;
            }

            $block_id = isset( $block['attrs']['blockId'] ) ?
                sanitize_key( $block['attrs']['blockId'] ) :
                'gslider-blocks-' . md5( serialize( $block['attrs'] ) );

            $raw_style = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';

            // Strictly sanitize CSS to prevent arbitrary CSS injection.
            $clean_style = $this->sanitize_css( $raw_style, $block_id );

            if ( empty( $clean_style ) ) {
                return $block_content;
            }

            self::$styles[ $block_id ] = $clean_style;

            // Headless slide HTML is consumed piece by piece, so every slide keeps its own style tag.
            // On normal pages, render the <style> tag only once per unique block ID per request.
            if ( ! $headless ) {
                if ( ! empty( self::$printed[ $block_id ] ) ) {
                    return $block_content;
                }
                self::$printed[ $block_id ] = true;
            }

            $style_tag = '<style id="gslider-style-' . esc_attr( $block_id ) . '">' . $clean_style . '</style>';

            return $style_tag . $block_content;
        }

        /**
         * Renders a block for the plugin's headless REST output while keeping its inline styles.
         *
         * Used by BlockParser::normalize_flexi_content() so /gslider/v1 consumers still receive
         * per-slide CSS even though generic REST responses are stripped of inline styles.
         *
         * @since 1.2.0
         *
         * @param array $block Parsed block array.
         * @return string Rendered block HTML including scoped <style> tags.
         */
        public static function render_block_with_styles( array $block ): string {
            self::$headless_depth++;

            try {
                $html = render_block( $block );
            } finally {
                self::$headless_depth--;
            }

            return is_string( $html ) ? $html : '';
        }

        /**
         * Determines whether the current request is a WordPress REST API request.
         *
         * Deliberately does not use wp_is_json_request(), which is also true for
         * front-end AJAX loaders that send a JSON Accept header.
         *
         * @since 1.2.0
         *
         * @return bool True when serving a REST API request.
         */
        private static function is_rest_request(): bool {
            if ( function_exists( 'wp_is_serving_rest_request' ) ) {
                return (bool) wp_is_serving_rest_request();
            }

            return defined( 'REST_REQUEST' ) && REST_REQUEST;
        }

        /**
         * Prioritizes the first real slide image of the first GSlider slider on the page for LCP.
         *
         * Uses WP_HTML_Tag_Processor so attribute values are never rewritten as raw text.
         * Sets fetchpriority="high" and decoding="async", and switches loading="lazy" to
         * loading="eager". Images outside a slide and testimonial rating icons are skipped.
         *
         * @since 1.2.0
         *
         * @param string $block_content The block HTML content.
         * @return string Optimized block HTML content, or the original HTML when nothing applies.
         */
        public function optimize_lcp_image( string $block_content ): string {
            if ( self::$lcp_optimized || '' === $block_content ) {
                return $block_content;
            }

            // Only run on frontend page loads (skip admin, REST requests, and feeds).
            if ( is_admin() || self::is_rest_request() || ( function_exists( 'is_feed' ) && is_feed() ) ) {
                return $block_content;
            }

            if ( false === stripos( $block_content, '<img' ) || false === strpos( $block_content, 'swiper-slide' ) ) {
                return $block_content;
            }

            if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
                return $block_content;
            }

            /**
             * Filters whether to optimize the first slider image for LCP on the frontend.
             *
             * Return false to disable automatic fetchpriority="high", loading="eager"
             * and decoding="async" on the first slide image.
             *
             * @since 1.2.0
             *
             * @param bool   $optimize      Whether to optimize the LCP image. Default true.
             * @param string $block_content The block HTML content.
             */
            if ( ! apply_filters( 'gslider_lcp_optimize', true, $block_content ) ) {
                return $block_content;
            }

            $processor    = new \WP_HTML_Tag_Processor( $block_content );
            $in_slide     = false;
            $after_rating = false;
            $optimized    = false;

            while ( $processor->next_tag() ) {
                if ( $processor->is_tag_closer() ) {
                    continue;
                }

                $classes = $processor->get_attribute( 'class' );
                $classes = is_string( $classes ) ? ' ' . preg_replace( '/\s+/', ' ', $classes ) . ' ' : '';

                if ( 'IMG' !== $processor->get_tag() ) {
                    if ( false !== strpos( $classes, ' swiper-slide ' ) ) {
                        $in_slide = true;
                    }
                    // Testimonial rating images sit directly inside .gslider-testimonial-rating-icon.
                    $after_rating = false !== strpos( $classes, 'rating-icon' );
                    continue;
                }

                if ( ! $in_slide || $after_rating || false !== strpos( $classes, 'rating' ) ) {
                    $after_rating = false;
                    continue;
                }

                if ( null === $processor->get_attribute( 'fetchpriority' ) ) {
                    $processor->set_attribute( 'fetchpriority', 'high' );
                }
                if ( null === $processor->get_attribute( 'decoding' ) ) {
                    $processor->set_attribute( 'decoding', 'async' );
                }

                $loading = $processor->get_attribute( 'loading' );
                if ( is_string( $loading ) && 'lazy' === strtolower( $loading ) ) {
                    $processor->set_attribute( 'loading', 'eager' );
                }

                $optimized = true;
                break;
            }

            if ( ! $in_slide ) {
                return $block_content;
            }

            // The first slider on the page has been handled (with or without an image).
            self::$lcp_optimized = true;

            return $optimized ? $processor->get_updated_html() : $block_content;
        }

        /**
         * Backward-compatible alias for collect_dynamic_styles.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_dynamic_styles( $block_content, $block ) {
            return $this->collect_and_render_dynamic_styles( $block_content, $block );
        }

        /**
         * Strictly sanitizes CSS rules to prevent arbitrary CSS injection.
         *
         * Enforces:
         * 1. Removal of all HTML/XML tags.
         * 2. Removal of comments to avoid filter bypasses.
         * 3. Blocking of dangerous protocols (javascript, data, expression, behavior, -moz-binding, vbscript).
         * 4. Stripping of risky at-rules (@import, @charset, @namespace, etc.).
         * 5. Sanitization of url() values to only allow safe HTTP/HTTPS image URLs.
         * 6. Scoping: every selector MUST contain the specific block ID.
         *
         * @since 1.2.0
         *
         * @param string $css      The raw CSS string to sanitize.
         * @param string $block_id The unique block identifier to enforce scoping against.
         * @return string The sanitized and minified CSS string.
         */
        public function sanitize_css( $css, $block_id ): string {
            if ( empty( $css ) || ! is_string( $css ) ) {
                return '';
            }

            // Layer 1: Run comprehensive CssSanitizer to strip nested exploit patterns.
            $css = CssSanitizer::sanitize( $css );
            if ( empty( $css ) ) {
                return '';
            }

            // 1. Strip all HTML/XML tags.
            $css = wp_strip_all_tags( $css );

            // 2. Strip comments to prevent comment-based filter bypasses.
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );

            // 3. Block and strip dangerous CSS functions, protocols, and keywords.
            $dangerous_patterns = [
                '/javascript\s*:/i',
                '/expression\s*\(/i',
                '/behavior\s*:/i',
                '/-moz-binding\s*:/i',
                '/vbscript\s*:/i',
                '/@import\b[^;]*;?/i',
                '/@charset\b[^;]*;?/i',
                '/@namespace\b[^;]*;?/i',
                '/<\/?(?:script|style|iframe|object|embed)[^>]*>/i',
                '/data\s*:\s*text\/html/i',
            ];
            $css = preg_replace( $dangerous_patterns, '', $css );

            // 4. Sanitize and validate url(...) values: only allow safe image URLs.
            $css = preg_replace_callback( '/url\s*\(\s*([\'"]?)(.*?)\1\s*\)/i', function( $matches ) {
                $url = trim( $matches[2] );
                // If it contains quotes, parentheses, semicolons, or dangerous protocols, reject it.
                if ( preg_match( '/[\'"\(\);\s]/', $url ) || preg_match( '/^(javascript|data|vbscript):/i', $url ) ) {
                    return 'none';
                }
                $clean_url = esc_url_raw( $url );
                return empty( $clean_url ) ? 'none' : "url('{$clean_url}')";
            }, $css );

            // 5. Enforce Block Scoping:
            // Extract media queries and normal rules, ensuring EVERY selector is scoped to $block_id.
            $output = '';

            // Handle media queries.
            $media_regex = '/@media[^{]+\{(?:[^{}]*\{[^{}]*\})+[^{}]*\}/i';
            if ( preg_match_all( $media_regex, $css, $media_matches, PREG_SET_ORDER ) ) {
                foreach ( $media_matches as $match ) {
                    $media_full   = $match[0];
                    $open_pos     = strpos( $media_full, '{' );
                    $media_header = trim( substr( $media_full, 0, $open_pos ) );
                    $media_inner  = trim( substr( $media_full, $open_pos + 1, -1 ) );

                    $sanitized_inner = $this->filter_rules_by_scope( $media_inner, $block_id );
                    if ( ! empty( $sanitized_inner ) ) {
                        $output .= $media_header . ' { ' . $sanitized_inner . " }\n";
                    }
                    $css = str_replace( $media_full, '', $css );
                }
            }

            // Handle remaining standard rules.
            $sanitized_normal = $this->filter_rules_by_scope( $css, $block_id );
            if ( ! empty( $sanitized_normal ) ) {
                $output .= $sanitized_normal;
            }

            return $this->minify_css( $output );
        }

        /**
         * Filters CSS rules so that only selectors containing the specific block ID are retained.
         *
         * Drops any selectors that attempt to target outside elements (e.g. body, html, input, *).
         *
         * @since 1.2.0
         *
         * @param string $css      CSS rules chunk.
         * @param string $block_id Block identifier to match against.
         * @return string Filtered CSS rules.
         */
        private function filter_rules_by_scope( $css, $block_id ): string {
            $rules       = explode( '}', $css );
            $valid_rules = [];

            foreach ( $rules as $rule ) {
                $rule = trim( $rule );
                if ( empty( $rule ) ) {
                    continue;
                }

                $parts = explode( '{', $rule );
                if ( count( $parts ) < 2 ) {
                    continue;
                }

                $selectors_str = trim( $parts[0] );
                $props_str     = trim( $parts[1] );

                if ( empty( $selectors_str ) || empty( $props_str ) ) {
                    continue;
                }

                $selectors       = explode( ',', $selectors_str );
                $valid_selectors = [];

                foreach ( $selectors as $sel ) {
                    $sel = trim( $sel );
                    // Must contain the specific block ID to prevent targeting arbitrary page elements.
                    if ( false !== strpos( $sel, $block_id ) ) {
                        $valid_selectors[] = $sel;
                    }
                }

                if ( ! empty( $valid_selectors ) ) {
                    $valid_rules[] = implode( ', ', $valid_selectors ) . ' { ' . $props_str . ' }';
                }
            }

            return implode( ' ', $valid_rules );
        }

        /**
         * Resets collected styles and optimization flags in memory (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return void
         */
        public static function reset_styles(): void {
            self::$styles        = [];
            self::$printed       = [];
            self::$lcp_optimized = false;
        }

        /**
         * Gets collected styles array (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return string[]
         */
        public static function get_collected_styles(): array {
            return self::$styles;
        }

        /**
         * Clears collected in-memory styles.
         *
         * @since 1.2.0
         *
         * @return int Number of cached files purged (always 0 since styles are inline).
         */
        public function clear_dynamic_css_cache(): int {
            self::reset_styles();
            return 0;
        }

        /**
         * Retrieves dynamic CSS cache statistics.
         *
         * @since 1.2.0
         *
         * @return array{files_count: int, total_size_bytes: int, total_size_formatted: string}
         */
        public function get_cache_stats(): array {
            return [
                'files_count'          => 0,
                'total_size_bytes'     => 0,
                'total_size_formatted' => '0 KB',
            ];
        }

        /**
         * Prints any collected dynamic styles in wp_footer as fallback.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function print_footer_styles(): void {
            self::$styles = [];
        }

        /**
         * Minifies a CSS string.
         *
         * Removes comments, unnecessary whitespace, and trailing
         * semicolons before closing braces.
         *
         * @since 1.0.0
         *
         * @param string $css The raw CSS string to minify.
         * @return string The minified CSS string.
         */
        private function minify_css( $css ): string {
            if ( empty( $css ) ) {
                return '';
            }

            $css = wp_strip_all_tags( $css );
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
            $css = preg_replace( '/\s*([:,;{}])\s*/', '$1', $css );
            $css = preg_replace( '/;}/', '}', $css );

            return trim( $css );
        }
    }
}
