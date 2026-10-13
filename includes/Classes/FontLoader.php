<?php
/**
 * Google Font loader for GSlider Blocks.
 *
 * Handles dynamic loading of Google Fonts based on block
 * attributes found during block rendering.
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

if ( ! class_exists( 'FontLoader' ) ) {

    /**
     * Loads Google Fonts used by GSlider blocks.
     *
     * Scans rendered blocks for font family attributes,
     * collects unique fonts, and enqueues them from Google Fonts API.
     *
     * @since 1.0.0
     */
    class FontLoader implements Registrable {

        use SingletonTrait;

        /**
         * Comma-separated list of all font weight variants to load.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private const FONT_WEIGHTS = '100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

        /**
         * Base URL for the Google Fonts CSS API.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private const GOOGLE_FONTS_URL = '//fonts.googleapis.com/css';

        /**
         * Collection of Google Font families to load.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $gfonts = [];

        /**
         * Registers hooks for font collection and loading.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'get_fonts_on_render_block' ], 10, 2 );
            add_action( 'wp_footer', [ $this, 'fonts_loader' ], 10 );
        }

        /**
         * Collects font families from rendered block attributes.
         *
         * Extracts font family attributes from each block during
         * rendering and adds them to the fonts collection.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The unmodified block content.
         */
        public function get_fonts_on_render_block( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['attrs'] ) ) {
                return $block_content;
            }

            $fonts = self::get_fonts_family( $block['attrs'] );
            if ( ! empty( $fonts ) ) {
                self::$gfonts = array_unique( array_merge( self::$gfonts, $fonts ) );
            }

            return $block_content;
        }

        /**
         * Extracts font family names from block attributes.
         *
         * Searches for attribute keys matching the pattern
         * `*FontFamily` and returns their sanitized values.
         *
         * @since 1.0.0
         *
         * @param array $attributes Block attributes to search.
         * @return string[] Array of font family names keyed by family name.
         */
        public static function get_fonts_family( $attributes ) {
            if ( ! is_array( $attributes ) ) {
                return [];
            }

            $keys              = preg_grep( '/^(\w+)FontFamily$/i', array_keys( $attributes ) );
            $googleFontFamily = [];

            foreach ( $keys as $key ) {
                if ( isset( $attributes[ $key ] ) && is_string( $attributes[ $key ] ) ) {
                    $fontFamily                    = sanitize_text_field( $attributes[ $key ] );
                    $googleFontFamily[ $fontFamily ] = $fontFamily;
                }
            }

            return $googleFontFamily;
        }

        /**
         * Registers and enqueues a Google Fonts stylesheet.
         *
         * Builds the Google Fonts URL from the collected font families
         * with all weight variants and enqueues it as a stylesheet.
         *
         * @since 1.0.0
         *
         * @param string[] $fonts Array of font family names to load.
         * @return void
         */
        private function load_google_font( $fonts ) {
            if ( empty( $fonts ) ) {
                return;
            }

            $gfonts = '';
            foreach ( $fonts as $font ) {
                $gfonts .= sprintf(
                    '%s:%s|',
                    str_replace( ' ', '+', trim( $font ) ),
                    self::FONT_WEIGHTS
                );
            }

            if ( empty( $gfonts ) ) {
                return;
            }

            $query_args = [
                'family'  => rtrim( $gfonts, '|' ),
                'display' => 'swap',
            ];

            $font_url = add_query_arg( $query_args, self::GOOGLE_FONTS_URL );

            wp_register_style(
                'gslider-blocks-fonts',
                esc_url( $font_url ),
                [],
                defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.1.5',
            );

            wp_enqueue_style( 'gslider-blocks-fonts' );
        }

        /**
         * Loads collected Google Fonts in the footer.
         *
         * Filters and loads all collected font families,
         * then resets the collection. Logs errors on failure.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function fonts_loader() {
            try {
                $fonts = array_filter( self::$gfonts );
                if ( ! empty( $fonts ) ) {
                    $this->load_google_font( $fonts );
                }
            } catch ( \Exception $e ) {
                if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                    // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                    error_log( 'GSlider Blocks: Font loading error: ' . $e->getMessage() );
                }
            } finally {
                self::$gfonts = [];
            }
        }
    }
}

