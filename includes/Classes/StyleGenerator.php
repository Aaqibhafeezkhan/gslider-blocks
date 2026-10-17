<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering, applies strict CSS sanitization
 * to prevent arbitrary CSS injection, enforces block-level scoping, and
 * outputs safe scoped styles via inline <style> injection or dynamic stylesheets.
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
     * and delivers them either via inline style injection or cached files.
     *
     * @since 1.0.0
     */
    class StyleGenerator implements Registrable {

        use SingletonTrait;

        /**
         * Subdirectory path for CSS files within the uploads folder.
         *
         * @since 1.0.0
         *
         * @var string
         */
        const CSS_SUBDIR = '/gslider-blocks/css';

        /**
         * File permissions for generated CSS files.
         *
         * @since 1.0.0
         *
         * @var int
         */
        const FILE_PERMISSIONS = 0644;

        /**
         * Collected and sanitized block styles keyed by block ID.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $styles = [];

        /**
         * Block IDs whose styles have already been output in inline mode.
         *
         * @since 1.2.0
         *
         * @var array<string, bool>
         */
        private static $printed_styles = [];

        /**
         * Absolute path to the CSS output directory.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private $css_dir;

        /**
         * URL to the CSS output directory.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private $css_url;

        /**
         * Initializes the style generator and sets up directories.
         *
         * @since 1.0.0
         */
        private function __construct() {
            $this->setup_directories();
        }

        /**
         * Registers hooks for style collection, sanitization, and rendering.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_and_render_dynamic_styles' ], 10, 2 );
            add_action( 'wp_head', [ $this, 'print_inline_styles' ], 100 );
            add_action( 'wp_footer', [ $this, 'print_footer_styles' ], 20 );
            add_action( 'wp_footer', [ $this, 'print_inline_styles' ], 100 );
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
         * Sets up the CSS output directory paths in memory.
         *
         * Preserves directory path reference for purging legacy cache files
         * without creating directories or writing to disk.
         *
         * @since 1.0.0
         *
         * @return void
         */
        private function setup_directories(): void {
            $upload_dir    = wp_upload_dir();
            $this->css_dir = $upload_dir['basedir'] . self::CSS_SUBDIR;
            $this->css_url = $upload_dir['baseurl'] . self::CSS_SUBDIR;
        }

        /**
         * Collects dynamic styles from rendered GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block
         * during rendering and stores it keyed by block ID.
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
         * Collects, sanitizes, and renders dynamic styles for GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block,
         * strictly validates that all CSS rules are scoped to the block ID,
         * strips dangerous properties/protocols, and injects safe scoped CSS.
         *
         * @since 1.2.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_and_render_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            if ( false !== strpos( $block['blockName'], 'gslider-blocks/' ) && ! empty( $block['attrs']['blockStyle'] ) ) {
                $block_id = isset( $block['attrs']['blockId'] ) ?
                    sanitize_key( $block['attrs']['blockId'] ) :
                    'gslider-blocks-' . md5( serialize( $block['attrs'] ) );

                $raw_style   = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';
                $clean_style = $this->sanitize_css( $raw_style, $block_id );

                if ( '' !== $clean_style ) {
                    self::$styles[ $block_id ] = $clean_style;

                    if ( function_exists( 'wp_style_is' ) && wp_style_is( 'gslider-blocks-dynamic-styles', 'registered' ) ) {
                        wp_add_inline_style( 'gslider-blocks-dynamic-styles', $clean_style );
                    }

                    // Avoid duplicate style tags if already printed in wp_head.
                    if ( ! empty( self::$printed_styles[ $block_id ] ) ) {
                        return $block_content;
                    }

                    self::$printed_styles[ $block_id ] = true;

                    // Render inline style tag directly scoped to this block for zero-FOUC and full compatibility.
                    $style_tag = '<style id="gslider-style-' . esc_attr( $block_id ) . '">' . $clean_style . '</style>';
                    return $style_tag . $block_content;
                }
            }

            return $block_content;
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

            // Layer 2: Strip comments to prevent comment-based filter bypasses.
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );

            // Layer 3: Block and strip dangerous CSS functions, protocols, and keywords.
            $dangerous_patterns = [
                '/expression\s*\([^)]*\)?/i',
                '/javascript\s*:[^;}]*;?/i',
                '/behavior\s*:[^;}]*;?/i',
                '/-moz-binding\s*:[^;}]*;?/i',
                '/vbscript\s*:[^;}]*;?/i',
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
                if ( preg_match( '/[\'"\(\);\s]/', $url ) || preg_match( '/^(javascript|data|vbscript):/i', $url ) ) {
                    return 'none';
                }
                $clean_url = esc_url_raw( $url );
                return empty( $clean_url ) ? 'none' : "url('{$clean_url}')";
            }, $css );

            // 5. Enforce Block Scoping:
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

                if ( empty( $valid_selectors ) ) {
                    continue;
                }

                // Sanitize property declarations to drop any risky declarations.
                $declarations = explode( ';', $props_str );
                $valid_decls  = [];
                foreach ( $declarations as $decl ) {
                    $decl = trim( $decl );
                    if ( empty( $decl ) ) {
                        continue;
                    }
                    if ( preg_match( '/(javascript|expression|behavior|-moz-binding|vbscript)/i', $decl ) ||
                         preg_match( '/:\s*[\)\s]*$/', $decl ) ||
                         preg_match( '/\bnone\)/i', $decl ) ) {
                        continue;
                    }
                    $valid_decls[] = $decl;
                }

                if ( ! empty( $valid_decls ) ) {
                    $valid_rules[] = implode( ', ', $valid_selectors ) . ' { ' . implode( '; ', $valid_decls ) . ' }';
                }
            }

            return implode( ' ', $valid_rules );
        }

        /**
         * Generates a minified CSS file from collected styles.
         *
         * Combines all collected block styles into a single CSS file
         * per page using WP_Filesystem. Skips writing if content
         * has not changed.
         *
         * @since 1.0.0
         *
         * @global WP_Filesystem_Base $wp_filesystem WordPress filesystem abstraction.
         *
         * @return void
         */
        public function generate_css_file(): void {
            // Disabled: Writing dynamic CSS files to wp-content/uploads/ was strictly prohibited by WordPress.org Plugin Review.
            // All dynamic styles are securely scoped and rendered inline.
            self::$styles = [];
        }

        /**
         * Enqueues the generated dynamic CSS file.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function enqueue_dynamic_styles(): void {
            // Disabled: Stylesheets from wp-content/uploads/ are disabled. Styles are output inline.
        }

        /**
         * Retrieves the configured CSS delivery mode.
         *
         * Reads from the consolidated 'gslider_settings' option.
         * Defaults to 'file' for backward compatibility.
         *
         * @since 1.2.0
         *
         * @return string Either 'file' or 'inline'.
         */
        public static function get_css_delivery_mode(): string {
            $settings = get_option( 'gslider_settings', [] );
            if ( is_array( $settings ) && ! empty( $settings['css_delivery'] ) ) {
                return in_array( $settings['css_delivery'], [ 'file', 'inline' ], true )
                    ? $settings['css_delivery']
                    : 'file';
            }

            $legacy = get_option( 'gslider_css_delivery_mode', 'file' );
            return in_array( $legacy, [ 'file', 'inline' ], true ) ? $legacy : 'file';
        }

        /**
         * Prints dynamic styles directly as an inline <style> tag.
         *
         * Enforces strict de-duplication between wp_head and wp_footer.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function print_inline_styles(): void {
            if ( 'inline' !== self::get_css_delivery_mode() ) {
                return;
            }

            $is_head = function_exists( 'doing_action' ) && doing_action( 'wp_head' );

            if ( $is_head ) {
                $this->collect_styles_from_queried_post();
            }

            if ( empty( self::$styles ) ) {
                return;
            }

            $unprinted = [];
            foreach ( self::$styles as $block_id => $style ) {
                if ( empty( self::$printed_styles[ $block_id ] ) ) {
                    $unprinted[ $block_id ]              = $style;
                    self::$printed_styles[ $block_id ] = true;
                }
            }

            if ( empty( $unprinted ) ) {
                return;
            }

            $css_content = '';
            foreach ( $unprinted as $block_id => $style ) {
                $css_content .= $style;
            }

            $minified = $this->minify_css( $css_content );
            if ( '' !== $minified ) {
                $tag_id = $is_head ? 'gslider-blocks-dynamic-styles-inline' : 'gslider-blocks-dynamic-styles-inline-footer';
                printf(
                    "<style id=\"%s\">\n%s\n</style>\n",
                    esc_attr( $tag_id ),
                    $minified
                );
            }

            // Clear styles so subsequent actions only process new, unprinted styles.
            self::$styles = [];
        }

        /**
         * Extracts block styles from the currently queried post in wp_head.
         *
         * @since 1.2.0
         *
         * @return void
         */
        private function collect_styles_from_queried_post(): void {
            $page_id = get_queried_object_id();
            if ( ! $page_id ) {
                return;
            }

            $post = get_post( $page_id );
            if ( ! $post || empty( $post->post_content ) ) {
                return;
            }

            if ( false === strpos( $post->post_content, 'wp:gslider-blocks/' ) ) {
                return;
            }

            if ( function_exists( 'parse_blocks' ) ) {
                $blocks = parse_blocks( $post->post_content );
                if ( is_array( $blocks ) ) {
                    $this->extract_styles_from_blocks( $blocks );
                }
            }
        }

        /**
         * Recursively extracts and sanitizes dynamic styles from parsed Gutenberg blocks.
         *
         * @since 1.2.0
         *
         * @param array $blocks Array of parsed block structures.
         * @return void
         */
        private function extract_styles_from_blocks( array $blocks ): void {
            foreach ( $blocks as $block ) {
                if ( ! is_array( $block ) ) {
                    continue;
                }

                if ( ! empty( $block['blockName'] ) && 0 === strpos( $block['blockName'], 'gslider-blocks/' ) ) {
                    if ( ! empty( $block['attrs']['blockStyle'] ) ) {
                        $block_id = isset( $block['attrs']['blockId'] )
                            ? sanitize_key( $block['attrs']['blockId'] )
                            : 'gslider-blocks-' . md5( serialize( $block['attrs'] ) );

                        $raw_style   = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';
                        $clean_style = $this->sanitize_css( $raw_style, $block_id );
                        if ( '' !== $clean_style ) {
                            self::$styles[ $block_id ] = $clean_style;
                        }
                    }
                }

                if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
                    $this->extract_styles_from_blocks( $block['innerBlocks'] );
                }
            }
        }

        /**
         * Resets collected styles in memory (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return void
         */
        public static function reset_styles(): void {
            self::$styles         = [];
            self::$printed_styles = [];
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
         * Purges all generated dynamic CSS files from the uploads directory.
         *
         * Deletes only files matching 'gslider-blocks-dynamic-styles-*.min.css'
         * using WP_Filesystem. Leaves all other files and directories intact.
         *
         * @since 1.2.0
         *
         * @return int Number of CSS cache files deleted.
         */
        public function clear_dynamic_css_cache(): int {
            if ( ! function_exists( 'WP_Filesystem' ) && file_exists( ABSPATH . 'wp-admin/includes/file.php' ) ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            global $wp_filesystem;
            if ( empty( $wp_filesystem ) ) {
                WP_Filesystem();
            }

            if ( ! is_dir( $this->css_dir ) ) {
                self::reset_styles();
                return 0;
            }

            $deleted_count = 0;
            $files         = scandir( $this->css_dir );

            if ( is_array( $files ) ) {
                foreach ( $files as $file ) {
                    if ( '.' === $file || '..' === $file ) {
                        continue;
                    }

                    // Delete only generated dynamic CSS stylesheets.
                    if ( preg_match( '/^gslider-blocks-dynamic-styles-.*\.min\.css$/', $file ) ) {
                        $full_path = $this->css_dir . '/' . $file;
                        if ( is_file( $full_path ) ) {
                            if ( $wp_filesystem && method_exists( $wp_filesystem, 'delete' ) ) {
                                $wp_filesystem->delete( $full_path );
                            } else {
                                @unlink( $full_path );
                            }
                            $deleted_count++;
                        }
                    }
                }
            }

            self::reset_styles();
            clearstatcache();

            return $deleted_count;
        }

        /**
         * Retrieves statistics about currently cached dynamic CSS files.
         *
         * @since 1.2.0
         *
         * @return array{files_count: int, total_size_bytes: int, total_size_formatted: string}
         */
        public function get_cache_stats(): array {
            $stats = [
                'files_count'          => 0,
                'total_size_bytes'     => 0,
                'total_size_formatted' => '0 KB',
            ];

            if ( ! is_dir( $this->css_dir ) ) {
                return $stats;
            }

            $files = scandir( $this->css_dir );
            if ( ! is_array( $files ) ) {
                return $stats;
            }

            foreach ( $files as $file ) {
                if ( '.' === $file || '..' === $file ) {
                    continue;
                }

                if ( preg_match( '/^gslider-blocks-dynamic-styles-.*\.min\.css$/', $file ) ) {
                    $full_path = $this->css_dir . '/' . $file;
                    if ( is_file( $full_path ) ) {
                        $stats['files_count']++;
                        $size = (int) filesize( $full_path );
                        $stats['total_size_bytes'] += $size;
                    }
                }
            }

            if ( $stats['total_size_bytes'] > 1048576 ) {
                $stats['total_size_formatted'] = round( $stats['total_size_bytes'] / 1048576, 2 ) . ' MB';
            } elseif ( $stats['total_size_bytes'] > 0 ) {
                $stats['total_size_formatted'] = round( $stats['total_size_bytes'] / 1024, 1 ) . ' KB';
            }

            return $stats;
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
