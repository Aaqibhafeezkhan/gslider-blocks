<?php

namespace GSlider\Classes;
use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('Enqueues')) {

    class Enqueues {

        use SingletonTrait;

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
            add_action('enqueue_block_assets', [$this, 'enqueue_assets']);
        }

        /**
         * Enqueue assets
         */
        public function enqueue_assets() {

            wp_register_style(
                'gslider-blocks-swiper-style',
                GSLIDER_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
                [],
                GSLIDER_VERSION
            );

            wp_register_script(
                'gslider-blocks-swiper-script',
                GSLIDER_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
                [],
                GSLIDER_VERSION,
                true
            );

            if (!is_admin()) {
                wp_enqueue_style('gslider-blocks-swiper-style');
                wp_enqueue_script('gslider-blocks-swiper-script');
            }
        }
    }

}
