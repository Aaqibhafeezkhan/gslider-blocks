<?php

namespace GSlider\Assets;

use GSlider\Traits\SingletonTrait;

class AdminAssets {
    use SingletonTrait;

    public function register() {
        add_action('admin_enqueue_scripts', [$this, 'gslider_enqueue_assets']);
    }

    public function gslider_enqueue_assets() {
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
    }
}
