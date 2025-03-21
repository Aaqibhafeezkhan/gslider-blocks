<?php
/**
 * GutenSlider Blocks Category
 *
 * Registers a custom category for blocks created by the GutenSlider plugin in the Gutenberg editor.
 *
 * @since 1.0.0
 * @package gutenslider-blocks
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access to the file.
}

if (!class_exists('GutenSlider_Blocks_Category')) {
    /**
     * Class for registering a custom block category in Gutenberg.
     *
     * @since 1.0.0
     * @package gutenslider-blocks
     */
    class GutenSlider_Blocks_Category {
        // Slug for the custom block category.
        private const CATEGORY_SLUG = 'gutenslider-blocks';
        /**
         * Singleton instance of the class.
         *
         * @var null|self
         */
        private static $instance = null;

        /**
         * Constructor to initialize the category registration process.
         *
         * @since 1.0.0
         * @return void
         */
        public function __construct() {
            $this->init();
        }

        /**
         * Initializes hooks for registering the custom block category.
         *
         * @since 1.0.0
         * @return void
         */
        private function init() {
            // Register the custom block category when Gutenberg is loading.
            add_filter('block_categories_all', [$this, 'register_category'], 10, 2);
        }

        /**
         * Registers the custom block category by modifying the list of existing categories.
         *
         * @param array $categories The existing list of block categories.
         * @return array The modified list of categories, including the custom category.
         */
        public function register_category($categories): array {
            // Ensure categories is an array before processing.
            if (!is_array($categories)) {
                return $categories;
            }

            // Define the new custom block category.
            $new_category = [
                'slug' => self::CATEGORY_SLUG,
                'title' => esc_html__('GutenSlider Blocks', 'gutenslider-blocks'),
                'icon' => null
            ];

            // Add the new category at the beginning of the list.
            array_unshift($categories, $new_category);
            
            return $categories; // Return the modified categories array.
        }

        /**
         * Singleton method to get the instance of the class.
         *
         * @since 1.0.0
         * @return self The instance of the class.
         */
        public static function get_instance(): self {
            // Create a new instance if it doesn't exist.
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }
}

// Initialize the block category registration process.
GutenSlider_Blocks_Category::get_instance();
