<?php

namespace GSlider\Assets;

use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

class AdminAssets {
    use SingletonTrait;

    public function register() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
    }

    public function enqueue_assets() {
        wp_register_style(
            'gslider-admin-style',
            GSLIDER_PLUGIN_URL . 'assets/admin/css/admin.css',
            [],
            GSLIDER_VERSION
        );

        wp_register_script(
            'gslider-admin-script',
            GSLIDER_PLUGIN_URL . 'assets/admin/js/admin.js',
            [],
            GSLIDER_VERSION,
            true
        );

        wp_enqueue_style('gslider-admin-style');
        wp_enqueue_script('gslider-admin-script');

        /**
         * Localize script for admin
         * This will pass data to the admin script
         * such as site URL, AJAX URL, nonce, plugin URL, and version.
         * This is useful for making AJAX requests and other dynamic functionalities.
         */
        $localize_array = [
            'site_url'   => site_url(),
            'ajax_url'   => admin_url('admin-ajax.php'),
            'nonce'      => wp_create_nonce('gslider_nonce'),
            'pluginUrl'  => GSLIDER_PLUGIN_URL,
        ];

        wp_localize_script('gslider-admin-script', 'GSliderBlocksData', $localize_array);
    }

    /**
     * Enqueue editor assets and localize data for blocks.
     */
    public function enqueue_editor_assets() {
        $localize_array = [
            'site_url'   => site_url(),
            'ajax_url'   => admin_url('admin-ajax.php'),
            'nonce'      => wp_create_nonce('gslider_nonce'),
            'pluginUrl'  => GSLIDER_PLUGIN_URL,
        ];

        // We use a global handle for localization that blocks can access
        wp_localize_script('wp-block-editor', 'GSliderBlocksData', $localize_array);
    }
}