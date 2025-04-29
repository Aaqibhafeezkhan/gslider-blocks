<?php

namespace GSlider\Classes;
use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('FontLoader')) {

    class FontLoader {

        use SingletonTrait;

        /**
         * Font Weights
         */
        private const FONT_WEIGHTS = '100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
        
        /**
         * Google Fonts API URL
         */
        private const GOOGLE_FONTS_URL = '//fonts.googleapis.com/css';

        /**
         * Google Fonts
         */
        private static $gfonts = [];

        /**
         * Constructor
         */
        public function __construct() {
            $this->init();
        }

        /**
         * Initialize the Class
         */
        private function init() {
            add_filter('render_block', [$this, 'get_fonts_on_render_block'], 10, 2);
            add_action('wp_footer', [$this, 'fonts_loader'], 10);
        }

        /**
         * Get Fonts on Render Block
         */
        public function get_fonts_on_render_block($block_content, $block) {
            if (!is_array($block) || empty($block['attrs'])) {
                return $block_content;
            }

            // Extract font families defined in the block attributes
            $fonts = self::get_fonts_family($block['attrs']);
            if (!empty($fonts)) {
                self::$gfonts = array_unique(array_merge(self::$gfonts, $fonts));
            }

            return $block_content;
        }

        /**
         * Get Fonts Family
         */
        public static function get_fonts_family($attributes) {
            if (!is_array($attributes)) {
                return [];
            }

            // Find keys in the attributes that match font family names
            $keys = preg_grep('/^(\w+)FontFamily$/i', array_keys($attributes));
            $googleFontFamily = [];
            
            // Loop through found font family keys and add them to the list
            foreach ($keys as $key) {
                if (isset($attributes[$key]) && is_string($attributes[$key])) {
                    $fontFamily = sanitize_text_field($attributes[$key]);
                    $googleFontFamily[$fontFamily] = $fontFamily;
                }
            }

            return $googleFontFamily;
        }

        /**
         * Load Google Fonts
         */
        private function load_google_font($fonts) {
            if (empty($fonts)) {
                return;
            }

            $gfonts = '';
            foreach ($fonts as $font) {
                // Construct the URL for each font with the defined weights
                $gfonts .= sprintf(
                    '%s:%s|',
                    str_replace(' ', '+', trim($font)),
                    self::FONT_WEIGHTS
                );
            }

            if (empty($gfonts)) {
                return;
            }

            // Prepare query arguments for the Google Fonts URL
            $query_args = [
                'family' => rtrim($gfonts, '|'),
                'display' => 'swap'
            ];

            $font_url = add_query_arg($query_args, self::GOOGLE_FONTS_URL);

            // Register and enqueue the font styles
            wp_register_style(
                'gslider-blocks-fonts', 
                esc_url($font_url),
                [], // No dependencies
                defined('GSLIDER_VERSION') ? GSLIDER_VERSION : '1.0.1' 
            );

            wp_enqueue_style('gslider-blocks-fonts');
        }

        /**
         * Load Fonts in the Footer
         */
        public function fonts_loader() {
            try {
                // Filter and remove any empty values from the fonts array
                $fonts = array_filter(self::$gfonts);
                if (!empty($fonts)) {
                    $this->load_google_font($fonts);
                }
            } catch (\Exception $e) {
                error_log('Font loading error: ' . $e->getMessage());
            } finally {
                self::$gfonts = [];
            }
        }
    }
}
