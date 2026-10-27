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
        // Register vendor scripts early (before blocks register on init:10) so block
        // view scripts can declare Swiper as a real dependency.
        add_action( 'init', [ $this, 'register_vendor_scripts' ], 5 );
        add_action( 'enqueue_block_assets', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Registers the Swiper and fsLightbox scripts once, deferred and in the footer.
     *
     * Safe to call multiple times: already registered handles are left untouched.
     *
     * @since 1.2.0
     *
     * @return void
     */
    public function register_vendor_scripts(): void {
        $scripts = [
            'gslider-blocks-swiper-script'     => 'assets/js/swiper-bundle.min.js',
            'gslider-blocks-fslightbox-script' => 'assets/js/fslightbox.min.js',
        ];

        foreach ( $scripts as $handle => $path ) {
            if ( wp_script_is( $handle, 'registered' ) ) {
                continue;
            }

            wp_register_script(
                $handle,
                GSLIDER_PLUGIN_URL . $path,
                [],
                GSLIDER_VERSION,
                [
                    'in_footer' => true,
                    'strategy'  => 'defer',
                ]
            );
        }
    }

    /**
     * Registers and enqueues frontend styles and scripts.
     *
     * Registers the Swiper CSS bundle, makes sure the vendor scripts are
     * registered, and enqueues fsLightbox in the admin editor only.
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

        $this->register_vendor_scripts();

        // Enqueue fsLightbox for admin editor only.
        if ( is_admin() ) {
            wp_enqueue_script( 'gslider-blocks-fslightbox-script' );
        }
    }
}
