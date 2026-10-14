<?php
/**
 * CSS sanitizer for GSlider Blocks.
 *
 * Cleans the blockStyle attribute before it is served to the
 * frontend stylesheet or to headless REST consumers.
 *
 * @package GSlider\Utils
 * @since   1.1.9
 */

namespace GSlider\Utils;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( CssSanitizer::class, false ) ) {

    /**
     * Removes HTML and dangerous constructs from block CSS.
     *
     * @since 1.1.9
     */
    class CssSanitizer {

        /**
         * Patterns removed from block CSS.
         *
         * @since 1.1.9
         *
         * @var string[]
         */
        const PATTERNS = [
            '/<\s*\/?\s*style/i',
            '/@import\b[^;]*;?/i',
            '/@[\w-]*\\\\[^;{}]*;?/',
            '/expression\s*\([^)]*\)?/i',
            '/javascript\s*:/i',
            '/-moz-binding\s*:[^;}]*;?/i',
            '/behavior\s*:[^;}]*;?/i',
            '/url\s*\(\s*[\'"]?\s*data\s*:[^)]*\)?/i',
        ];

        /**
         * Sanitizes a block CSS string.
         *
         * Plugin-generated rules are kept unchanged. Patterns are
         * re-applied until stable so that nested payloads such as
         * "@im@importport" cannot re-form after a removal.
         *
         * @since 1.1.9
         *
         * @param mixed $css CSS from the block attribute.
         * @return string Sanitized CSS, or an empty string.
         */
        public static function sanitize( $css ): string {
            if ( ! is_string( $css ) || '' === $css ) {
                return '';
            }

            $css = wp_strip_all_tags( $css );

            for ( $pass = 0; $pass < 10; $pass++ ) {
                $clean = preg_replace( self::PATTERNS, '', $css );
                if ( ! is_string( $clean ) ) {
                    return '';
                }
                if ( $clean === $css ) {
                    return trim( $css );
                }
                $css = $clean;
            }

            return '';
        }
    }
}
