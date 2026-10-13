<?php
/**
 * Block category registration for GSlider Blocks.
 *
 * Registers a custom block category in the Gutenberg editor
 * to group all GSlider blocks together.
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

if ( ! class_exists( 'RegistrationCategory' ) ) {

    /**
     * Registers the GSlider Blocks custom block category.
     *
     * Adds a new category at the top of the block inserter
     * so all GSlider blocks are grouped together.
     *
     * @since 1.0.0
     */
    class RegistrationCategory implements Registrable {

        use SingletonTrait;

        /**
         * The slug for the GSlider block category.
         *
         * @since 1.0.0
         *
         * @var string
         */
        private const CATEGORY_SLUG = 'gslider-blocks';

        /**
         * Attaches WordPress hooks for category registration.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'block_categories_all', [ $this, 'register_category' ], 99999999, 2 );
        }

        /**
         * Registers the custom block category.
         *
         * Prepends the GSlider Blocks category to the beginning
         * of the block categories list.
         *
         * @since 1.0.0
         *
         * @param array[] $categories Array of registered block categories.
         * @return array[] Modified array with GSlider category prepended.
         */
        public function register_category( $categories ) {
            if ( ! is_array( $categories ) ) {
                return $categories;
            }

            $new_category = [
                'slug'  => self::CATEGORY_SLUG,
                'title' => esc_html__( 'GSlider Blocks', 'gslider-blocks' ),
                'icon'  => null,
            ];

            array_unshift( $categories, $new_category );

            return $categories;
        }
    }
}

