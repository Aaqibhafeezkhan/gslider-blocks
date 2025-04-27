<?php
/**
 * Enqueue Assets 
 * @package GSliderBlocks 
 */

// Exit if accessed directly to prevent security vulnerabilities.
if (!defined('ABSPATH')) {
    exit;
}

// Check if the class already exists to avoid redeclaration errors.
if (!class_exists('GSlider_Blocks_Assets')) {

    class GSlider_Blocks_Assets {

        /**
         * Singleton instance of the GSlider_Blocks_Assets class.
         *
         * @since 1.0.0
         * @var GSlider_Blocks_Assets
         */
        private static $instance = null;

        /**
         * Constructor
         * Initialize the class by hooking into WordPress actions.
         */
        public function __construct() {
            add_action('enqueue_block_assets', [$this, 'enqueue_assets']);

            var_dump(GSLIDER_PLUGIN_URL . 'assets/css/swiper-bundle.min.css');
        }

        /**
         * Enqueue assets
         * Register and enqueue styles and scripts for the blocks.
         */
        public function enqueue_assets() {

            // Register styles
            wp_register_style(
                'gslider-blocks-swiper-style',
                GSLIDER_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
                [],
                GSLIDER_VERSION
            );

            // Register scripts
            wp_register_script(
                'gslider-blocks-swiper-script',
                GSLIDER_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
                [],
                GSLIDER_VERSION,
                true
            );
        }

        /**
         * Retrieves the singleton instance of the class.
         *
         * Ensures only one instance of the class exists (singleton pattern).
         *
         * @return self
         */
        public static function get_instance(): self {
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }

}

// Initialize the block registration process.
GSlider_Blocks_Assets::get_instance(); 
