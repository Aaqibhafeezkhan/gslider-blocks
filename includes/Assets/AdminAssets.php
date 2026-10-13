<?php
/**
 * Admin asset management for GSlider Blocks.
 *
 * Handles registration and enqueueing of admin-specific
 * styles, scripts, and localized data.
 *
 * @package GSlider\Assets
 * @since   1.0.0
 */

namespace GSlider\Assets;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Manages admin-side asset loading.
 *
 * Registers and enqueues CSS and JavaScript files for the
 * WordPress admin area and the block editor.
 *
 * @since 1.0.0
 */
class AdminAssets implements Registrable {
    use SingletonTrait;

    /**
     * Registers admin asset hooks.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register(): void {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
    }

    /**
     * Enqueues admin styles, scripts, and localized data.
     *
     * Registers and enqueues the admin CSS and JS files,
     * and passes site data to the admin script via wp_localize_script.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_assets() {
        wp_register_style(
            'gslider-admin-style',
            GSLIDER_PLUGIN_URL . 'assets/admin/css/admin.css',
            [],
            GSLIDER_VERSION
        );

        wp_enqueue_style( 'gslider-admin-style' );
    }

    /**
     * Enqueues editor assets and localizes data for blocks.
     *
     * Passes site data to the block editor via wp_localize_script
     * using the wp-block-editor handle for global access.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_editor_assets() {
        $localize_array = [
            'site_url'   => site_url(),
            'ajax_url'   => admin_url( 'admin-ajax.php' ),
            'nonce'      => wp_create_nonce( 'gslider_nonce' ),
            'pluginUrl'  => GSLIDER_PLUGIN_URL,
        ];

        // We use a global handle for localization that blocks can access.
        wp_localize_script( 'wp-block-editor', 'GSliderBlocksData', $localize_array );
    }
}