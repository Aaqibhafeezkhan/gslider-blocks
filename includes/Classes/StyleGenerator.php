<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering and generates
 * minified per-page CSS files in the uploads directory.
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
     * Generates and manages dynamic CSS files for GSlider blocks.
     *
     * Collects inline styles from rendered blocks, combines them
     * into a single minified CSS file per page, and enqueues it.
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
         * Collected block styles keyed by block ID.
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
         * Registers hooks for style collection and generation.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_dynamic_styles' ], 10, 2 );

            if ( 'inline' === self::get_css_delivery_mode() ) {
                add_action( 'wp_head', [ $this, 'print_inline_styles' ], 100 );
                add_action( 'wp_footer', [ $this, 'print_inline_styles' ], 100 );
            } else {
                add_action( 'wp_footer', [ $this, 'generate_css_file' ], 10 );
                add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_dynamic_styles' ] );
            }
        }

        /**
         * Sets up the CSS output directory paths.
         *
         * Creates the CSS directory inside wp-content/uploads
         * if it does not already exist.
         *
         * @since 1.0.0
         *
         * @return void
         */
        private function setup_directories() {
            $upload_dir    = wp_upload_dir();
            $this->css_dir = $upload_dir['basedir'] . self::CSS_SUBDIR;
            $this->css_url = $upload_dir['baseurl'] . self::CSS_SUBDIR;

            if ( ! file_exists( $this->css_dir ) ) {
                if ( ! wp_mkdir_p( $this->css_dir ) ) {
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                        error_log( 'GSlider Blocks: Failed to create CSS directory at: ' . $this->css_dir );
                    }
                }
            }
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
         * @return string The unmodified block content.
         */
        public function collect_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            if ( false !== strpos( $block['blockName'], 'gslider-blocks/' ) && ! empty( $block['attrs']['blockStyle'] ) ) {
                $block_id = isset( $block['attrs']['blockId'] ) ?
                    sanitize_key( $block['attrs']['blockId'] ) :
                    'gslider-blocks-' . md5( serialize( $block['attrs'] ) );

                // In inline mode, skip re-collecting if this block was already output in wp_head.
                if ( 'inline' === self::get_css_delivery_mode() && ! empty( self::$printed_styles[ $block_id ] ) ) {
                    return $block_content;
                }

                $clean_style = CssSanitizer::sanitize( $block['attrs']['blockStyle'] );
                if ( '' !== $clean_style ) {
                    self::$styles[ $block_id ] = $clean_style;
                }
            }

            return $block_content;
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
        public function generate_css_file() {
            if ( 'inline' === self::get_css_delivery_mode() ) {
                return;
            }

            if ( empty( self::$styles ) ) {
                return;
            }

            clearstatcache();
            $page_id      = get_queried_object_id();
            $css_filename = 'gslider-blocks-dynamic-styles-' . $page_id . '.min.css';
            $css_file     = $this->css_dir . '/' . $css_filename;

            $css_content = '';
            foreach ( self::$styles as $block_id => $style ) {
                $css_content .= $style;
            }

            $css_content = "/* GSlider Blocks Dynamic Styles - Page ID: $page_id - Generated on " .
                current_time( 'mysql' ) . " */\n" . $this->minify_css( $css_content );

            if ( ! function_exists( 'WP_Filesystem' ) && file_exists( ABSPATH . 'wp-admin/includes/file.php' ) ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            global $wp_filesystem;
            if ( empty( $wp_filesystem ) ) {
                WP_Filesystem();
            }

            if ( ! is_dir( $this->css_dir ) ) {
                if ( ! wp_mkdir_p( $this->css_dir ) ) {
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                        error_log( 'GSlider Blocks: Failed to create CSS directory: ' . $this->css_dir );
                    }
                    return;
                }
            }

            if ( file_exists( $css_file ) ) {
                $existing_content = $wp_filesystem->get_contents( $css_file );
                if ( $existing_content === $css_content ) {
                    return;
                }
            }

            if ( ! $wp_filesystem->put_contents( $css_file, $css_content, self::FILE_PERMISSIONS ) ) {
                if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                    // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                    error_log( 'GSlider Blocks: Failed to write CSS file: ' . $css_file );
                }
            }

            self::$styles = [];
        }

        /**
         * Enqueues the generated dynamic CSS file.
         *
         * Loads the per-page CSS file if it exists, using the file
         * modification time for cache busting.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function enqueue_dynamic_styles() {
            if ( 'inline' === self::get_css_delivery_mode() ) {
                return;
            }

            clearstatcache();
            $page_id       = get_queried_object_id();
            $css_filename  = 'gslider-blocks-dynamic-styles-' . $page_id . '.min.css';
            $css_file_path = $this->css_dir . '/' . $css_filename;
            $css_file_url  = $this->css_url . '/' . $css_filename;

            if ( ! file_exists( $css_file_path ) ) {
                $this->generate_css_file();
            }

            if ( file_exists( $css_file_path ) ) {
                wp_enqueue_style(
                    'gslider-blocks-dynamic-styles-' . $page_id,
                    $css_file_url,
                    [],
                    filemtime( $css_file_path )
                );
            }
        }

        /**
         * Retrieves the current dynamic CSS delivery mode ('file' or 'inline').
         *
         * @since 1.2.0
         *
         * @return string Delivery mode: 'file' or 'inline'.
         */
        public static function get_css_delivery_mode(): string {
            $settings = get_option( 'gslider_settings', [] );
            $mode     = is_array( $settings ) && isset( $settings['css_delivery'] ) && in_array( $settings['css_delivery'], [ 'file', 'inline' ], true )
                ? (string) $settings['css_delivery']
                : 'file';

            /**
             * Filters the dynamic CSS delivery mode.
             *
             * @since 1.2.0
             *
             * @param string $mode Delivery mode ('file' or 'inline').
             */
            return (string) apply_filters( 'gslider_css_delivery_mode', $mode );
        }

        /**
         * Outputs dynamic styles directly into the HTML head or footer in inline mode.
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

            // In wp_head, attempt to extract styles from the queried post before the body renders.
            if ( $is_head ) {
                $this->collect_styles_from_queried_post();
            }

            // Filter out any block styles that have already been printed in this request.
            $unprinted = [];
            foreach ( self::$styles as $block_id => $style ) {
                if ( empty( self::$printed_styles[ $block_id ] ) ) {
                    $unprinted[ $block_id ]             = $style;
                    self::$printed_styles[ $block_id ] = true;
                }
            }

            if ( empty( $unprinted ) ) {
                self::$styles = [];
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

                        $clean_style = CssSanitizer::sanitize( $block['attrs']['blockStyle'] );
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
        private function minify_css( $css ) {
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

