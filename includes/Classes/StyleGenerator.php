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
            add_action( 'wp_footer', [ $this, 'generate_css_file' ], 10 );
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_dynamic_styles' ] );
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
                $raw_style = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';
                $clean_style = wp_strip_all_tags( $raw_style );
                $clean_style = preg_replace( '/(<\/?(?:script|style)[^>]*>|javascript:|expression\(|behavior:)/i', '', $clean_style );
                if ( ! empty( $clean_style ) ) {
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

            if ( ! function_exists( 'WP_Filesystem' ) ) {
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

