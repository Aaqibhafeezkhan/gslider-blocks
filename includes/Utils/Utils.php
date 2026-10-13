<?php
/**
 * Utility functions for GSlider Blocks.
 *
 * Handles plugin tracking and analytics integration
 * via the Appsero client.
 *
 * @package GSlider\Utils
 * @since   1.0.0
 */

namespace GSlider\Utils;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'Utils' ) ) {

    /**
     * Provides utility services for the GSlider plugin.
     *
     * Currently handles Appsero analytics tracking
     * for plugin usage insights.
     *
     * @since 1.0.0
     */
    class Utils implements Registrable {

        use SingletonTrait;

        /**
         * Registers utility hooks and services.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            $this->gslider_init_tracker_gslider_blocks();
        }

        /**
         * Initializes the Appsero plugin tracker.
         *
         * Sets up the Appsero client for usage tracking
         * and active insights collection.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function gslider_init_tracker_gslider_blocks() {

            $client = new \Appsero\Client(
                '3b9e5a5d-b238-4acf-b1e2-3c1faee503bb',
                'GSlider Blocks',
                GSLIDER_DIR_PATH . 'gslider-blocks.php'
            );

            // Active insights.
            $client->insights()->init();
        }
    }
}

