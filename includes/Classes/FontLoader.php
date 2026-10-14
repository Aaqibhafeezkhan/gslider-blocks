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
         * Weight requested when a block does not store a numeric weight.
         *
         * @since 1.1.9
         *
         * @var string
         */
        const DEFAULT_FONT_WEIGHT = '400';

        /**
         * Font family values that mean "no Google font selected".
         *
         * @since 1.1.9
         *
         * @var string[]
         */
        const IGNORED_FONT_FAMILIES = [ 'default', 'inherit' ];

        /**
         * Base URL for the Google Fonts CSS API.
         *
         * @since 1.0.0
         *
         * @var string
         */
        const GOOGLE_FONTS_URL = '//fonts.googleapis.com/css';

        /**
         * Google Font variants to load, keyed by family then variant.
         *
         * @since 1.0.0
         *
         * @var array<string, array<string, bool>>
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
         * Collects font variants from rendered GSlider block attributes.
         *
         * Only `gslider-blocks/*` blocks are inspected, so other plugins'
         * `*FontFamily` attributes never trigger a Google Fonts request.
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

            if ( empty( $block['blockName'] ) || 0 !== strpos( $block['blockName'], 'gslider-blocks/' ) ) {
                return $block_content;
            }

            foreach ( self::get_fonts_family( $block['attrs'] ) as $family => $variants ) {
                if ( ! isset( self::$gfonts[ $family ] ) ) {
                    self::$gfonts[ $family ] = [];
                }
                self::$gfonts[ $family ] += $variants;
            }

            return $block_content;
        }

        /**
         * Extracts Google Font families and their used variants from block attributes.
         *
         * For each `<prefix>FontFamily` attribute, the matching
         * `<prefix>FontWeight` and `<prefix>FontStyle` attributes decide
         * the variant, e.g. `400`, `700` or `600italic`.
         *
         * @since 1.0.0
         *
         * @param array $attributes Block attributes to search.
         * @return array<string, array<string, bool>> Variants keyed by family name.
         */
        public static function get_fonts_family( $attributes ) {
            if ( ! is_array( $attributes ) ) {
                return [];
            }

            $fonts = [];

            foreach ( array_keys( $attributes ) as $key ) {
                if ( ! is_string( $key ) || ! preg_match( '/^(\w+)FontFamily$/', $key, $matches ) ) {
                    continue;
                }

                if ( ! is_string( $attributes[ $key ] ) ) {
                    continue;
                }

                $family = trim( sanitize_text_field( $attributes[ $key ] ) );

                // Google family names only contain letters, digits and spaces.
                if ( '' === $family
                    || in_array( strtolower( $family ), self::IGNORED_FONT_FAMILIES, true )
                    || ! preg_match( '/^[A-Za-z0-9 ]+$/', $family )
                ) {
                    continue;
                }

                $prefix = $matches[1];
                $weight = isset( $attributes[ $prefix . 'FontWeight' ] ) ? (string) $attributes[ $prefix . 'FontWeight' ] : '';
                $style  = isset( $attributes[ $prefix . 'FontStyle' ] ) ? (string) $attributes[ $prefix . 'FontStyle' ] : '';

                if ( ! preg_match( '/^[1-9]00$/', $weight ) ) {
                    $weight = self::DEFAULT_FONT_WEIGHT;
                }

                $variant = in_array( $style, [ 'italic', 'oblique' ], true ) ? $weight . 'italic' : $weight;

                $fonts[ $family ][ $variant ] = true;
            }

            return $fonts;
        }

        /**
         * Registers and enqueues a Google Fonts stylesheet.
         *
         * Builds one Google Fonts URL that requests only the
         * variants collected for each family.
         *
         * @since 1.0.0
         *
         * @param array<string, array<string, bool>> $fonts Variants keyed by family name.
         * @return void
         */
        private function load_google_font( $fonts ) {
            if ( empty( $fonts ) ) {
                return;
            }

            ksort( $fonts );

            $gfonts = '';
            foreach ( $fonts as $family => $variants ) {
                $variants = array_keys( $variants );
                sort( $variants, SORT_STRING );

                $gfonts .= sprintf(
                    '%s:%s|',
                    str_replace( ' ', '+', $family ),
                    implode( ',', $variants )
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
                defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.1.5'
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

