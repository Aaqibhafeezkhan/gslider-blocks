<?php
/**
 * GSlider Blocks FontLoader 
 *
 * Handles dynamic loading of Google Fonts for GSlider blocks.
 *
 * @since 1.0.0
 * @package gslider-blocks
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access to the file.
}

if (!class_exists('GSlider_Blocks_FontLoader')) {
    /**
     * Class responsible for loading Google Fonts for GSlider blocks.
     *
     * @since 1.0.0
     * @package gslider-blocks
     */
    class GSlider_Blocks_FontLoader {
        // List of supported font weights for Google Fonts.
        private const FONT_WEIGHTS = '100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
        
        // Google Fonts API URL.
        private const GOOGLE_FONTS_URL = '//fonts.googleapis.com/css';

        /**
         * Singleton instance of the class.
         *
         * @var null|self
         */
        private static $instance = null;

        /**
         * Array to store Google Fonts that need to be loaded.
         *
         * @var array<string>
         */
        private static $gfonts = [];

        /**
         * Constructor method to initialize the class.
         *
         * @since 1.0.0
         * @return void
         */
        public function __construct() {
            $this->init();
        }

        /**
         * Initializes hooks for rendering blocks and footer output.
         *
         * @since 1.0.0
         * @return void
         */
        private function init() {
            // Hook to capture fonts when rendering blocks.
            add_filter('render_block', [$this, 'get_fonts_on_render_block'], 10, 2);

            // Hook to load fonts in the footer of the page.
            add_action('wp_footer', [$this, 'fonts_loader'], 10);
        }

        /**
         * Captures font families defined in block attributes.
         *
         * @param string $block_content Block HTML content.
         * @param array  $block Block attributes.
         * @return string The block content unchanged.
         */
        public function get_fonts_on_render_block($block_content, $block) {
            if (!is_array($block) || empty($block['attrs'])) {
                return $block_content; // Return block content as is if no attributes.
            }

            // Extract font families defined in the block attributes.
            $fonts = self::get_fonts_family($block['attrs']);
            if (!empty($fonts)) {
                self::$gfonts = array_unique(array_merge(self::$gfonts, $fonts));
            }

            return $block_content; // Return the original block content.
        }

        /**
         * Extracts Google Fonts from block attributes.
         *
         * @param array<string, mixed> $attributes Block attributes.
         * @return array<string> List of Google Fonts found in the block.
         */
        public static function get_fonts_family($attributes) {
            if (!is_array($attributes)) {
                return []; // Return an empty array if attributes are not provided.
            }

            // Find keys in the attributes that match font family names.
            $keys = preg_grep('/^(\w+)FontFamily$/i', array_keys($attributes));
            $googleFontFamily = [];
            
            // Loop through found font family keys and add them to the list.
            foreach ($keys as $key) {
                if (isset($attributes[$key]) && is_string($attributes[$key])) {
                    $fontFamily = sanitize_text_field($attributes[$key]);
                    $googleFontFamily[$fontFamily] = $fontFamily; // Store the font family in an array.
                }
            }

            return $googleFontFamily; // Return the array of font families.
        }

        /**
         * Loads Google Fonts by constructing the URL and enqueueing the stylesheet.
         *
         * @param array<string> $fonts List of Google Fonts to load.
         */
        private function load_google_font($fonts) {
            if (empty($fonts)) {
                return; // Return early if no fonts are provided.
            }

            $gfonts = '';
            foreach ($fonts as $font) {
                // Construct the URL for each font with the defined weights.
                $gfonts .= sprintf(
                    '%s:%s|',
                    str_replace(' ', '+', trim($font)),
                    self::FONT_WEIGHTS
                );
            }

            if (empty($gfonts)) {
                return; // Return early if no valid font strings are created.
            }

            // Prepare query arguments for the Google Fonts URL.
            $query_args = [
                'family' => rtrim($gfonts, '|'),
                'display' => 'swap'
            ];

            $font_url = add_query_arg($query_args, self::GOOGLE_FONTS_URL);

            // Register and enqueue the font styles.
            wp_register_style(
                'gslider-blocks-fonts', 
                esc_url($font_url),
                [], // No dependencies
                defined('GSLIDER_VERSION') ? GSLIDER_VERSION : '1.0.1' 
            );

            wp_enqueue_style('gslider-blocks-fonts'); // Enqueue the font stylesheet.
        }

        /**
         * Loads the fonts in the footer.
         *
         * @since 1.0.0
         * @return void
         */
        public function fonts_loader() {
            try {
                // Filter and remove any empty values from the fonts array.
                $fonts = array_filter(self::$gfonts);
                if (!empty($fonts)) {
                    $this->load_google_font($fonts); // Load the fonts if any are present.
                }
            } catch (Exception $e) {
                // Log any errors that occur during font loading.
                error_log('Font loading error: ' . $e->getMessage());
            } finally {
                self::$gfonts = []; // Clear the fonts array after processing.
            }
        }

        /**
         * Singleton method to get the class instance.
         *
         * @since 1.0.0
         * @return self The instance of the class.
         */
        public static function get_instance() {
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }
}

// Initialize the FontLoader singleton.
GSlider_Blocks_FontLoader::get_instance();
