<?php

namespace GSlider\Classes;
use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('RegistrationCategory')) {

    class RegistrationCategory {

        use SingletonTrait;

        /**
         * Category Slug
         */
        private const CATEGORY_SLUG = 'gslider-blocks';

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
            // Register the custom block category when Gutenberg is loading
            add_filter('block_categories_all', [$this, 'register_category'], 10, 2);
        }

        /**
         * Register the custom block category
         */
        public function register_category($categories): array {
            // Ensure categories is an array before processing
            if (!is_array($categories)) {
                return $categories;
            }

            // Define the new custom block category
            $new_category = [
                'slug' => self::CATEGORY_SLUG,
                'title' => esc_html__('GSlider Blocks', 'gslider-blocks'),
                'icon' => null
            ];

            // Add the new category at the beginning of the list
            array_unshift($categories, $new_category);
            
            return $categories;
        }
    }
}
