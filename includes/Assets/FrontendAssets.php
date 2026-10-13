<?php
/**
 * Frontend asset management for GSlider Blocks.
 *
 * Handles registration and enqueueing of frontend-specific
 * styles and scripts including Swiper and fsLightbox.
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
 * Manages frontend asset loading.
 *
 * Registers Swiper CSS/JS and fsLightbox JS for use
 * by individual blocks on the frontend.
 *
 * @since 1.0.0
 */
class FrontendAssets implements Registrable {
    use SingletonTrait;

    /**
     * Registers frontend asset hooks.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register(): void {
        add_action( 'enqueue_block_assets', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Registers and enqueues frontend styles and scripts.
     *
     * Registers Swiper CSS and JS bundles, and the fsLightbox
     * script. Enqueues fsLightbox in the admin editor only.
     *
     * @since 1.0.0
     *
     * @return void
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

        wp_register_script(
            'gslider-blocks-fslightbox-script',
            GSLIDER_PLUGIN_URL . 'assets/js/fslightbox.min.js',
            [],
            GSLIDER_VERSION,
            true
        );

        // Enqueue fsLightbox for admin editor only.
        if ( is_admin() ) {
            wp_enqueue_script( 'gslider-blocks-fslightbox-script' );
        }
    }
}
