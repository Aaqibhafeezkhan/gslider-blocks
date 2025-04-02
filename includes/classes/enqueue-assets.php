<?php
/**
 * Enqueue Assets 
 * @package GutenSliderBlocks
 */

// Exit if accessed directly to prevent security vulnerabilities.
if (!defined('ABSPATH')) {
    exit;
}

// Check if the class already exists to avoid redeclaration errors.
if (!class_exists('GutenSlider_Blocks_Assets')) {

    class GutenSlider_Blocks_Assets {

        /**
         * Singleton instance of the GutenSlider_Blocks_Assets class.
         *
         * @since 1.0.0
         * @var GutenSlider_Blocks_Assets
         */
        private static $instance = null;

        /**
         * Constructor
         * Initialize the class by hooking into WordPress actions.
         */
        public function __construct() {
            add_action('enqueue_block_assets', [$this, 'enqueue_assets']);
        }

        /**
         * Enqueue assets
         * Register and enqueue styles and scripts for the blocks.
         */
        public function enqueue_assets() {

            // Register styles
            wp_register_style(
                'gutenslider-blocks-swiper-style',
                GutenSlider_Blocks_ASSETS_URL . 'css/swiper-bundle.min.css',
                [],
                GutenSlider_Blocks_VERSION
            );

            // Register scripts
            wp_register_script(
                'gutenslider-blocks-swiper-script',
                GutenSlider_Blocks_ASSETS_URL . 'js/swiper-bundle.min.js',
                [],
                GutenSlider_Blocks_VERSION,
                true
            );

            if (!is_admin()) {
                wp_enqueue_style('gutenslider-blocks-swiper-style');
                wp_enqueue_script('gutenslider-blocks-swiper-script');
            }
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
GutenSlider_Blocks_Assets::get_instance();
