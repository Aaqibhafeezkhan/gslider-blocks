<?php
/**
 * Block registration handler for GSlider Blocks.
 *
 * Dynamically discovers and registers all Gutenberg blocks
 * found in the build/blocks directory.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;
use GSlider\Assets\FrontendAssets;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( RegistrationBlocks::class, false ) ) {

    /**
     * Handles dynamic registration of Gutenberg blocks.
     *
     * Scans the build/blocks directory for valid block folders
     * containing block.json and registers each one automatically.
     *
     * @since 1.0.0
     */
    class RegistrationBlocks implements Registrable {
        use SingletonTrait;

        /**
         * Attaches hooks for block registration.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_action( 'init', [ $this, 'register_blocks' ] );
        }

        /**
         * Registers all blocks dynamically from build/blocks directory.
         *
         * Scans for available block folders, applies the
         * 'gslider_registered_blocks' filter, and registers each block.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register_blocks() {
            // Swiper must be registered before block view scripts so it can be a real dependency.
            if ( class_exists( FrontendAssets::class ) ) {
                FrontendAssets::getInstance()->register_vendor_scripts();
            }

            $plugin_dir = defined( 'GSLIDER_DIR_PATH' ) ? GSLIDER_DIR_PATH : plugin_dir_path( __FILE__ );
            $build_dir  = trailingslashit( $plugin_dir ) . 'build/blocks/';

            if ( ! is_readable( $build_dir ) ) {
                if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                    // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                    error_log( 'GSlider Blocks: Build directory is not readable: ' . $build_dir );
                }
                return;
            }

            // Get block folders dynamically.
            $blocks = apply_filters( 'gslider_registered_blocks', $this->get_available_blocks( $build_dir ) );

            foreach ( $blocks as $block ) {
                try {
                    $this->register_single_block( $build_dir, $block );
                } catch ( \Exception $e ) {
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
                        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                        error_log( 'GSlider Blocks: Error registering block "' . $block . '": ' . $e->getMessage() );
                    }
                }
            }
        }

        /**
         * Registers a single block if valid.
         *
         * Validates that the block directory is readable and contains
         * a block.json file before attempting registration.
         *
         * @since 1.0.0
         *
         * @param string $build_dir Path to the build/blocks directory.
         * @param string $block     The block folder name.
         * @return void
         *
         * @throws \Exception If the block directory is not readable,
         *                    block.json is missing, or registration fails.
         */
        private function register_single_block( string $build_dir, string $block ) {
            $block_dir = trailingslashit( $build_dir . sanitize_file_name( $block ) );

            if ( ! is_readable( $block_dir ) ) {
                throw new \Exception( 'Build directory not readable: ' . esc_html( $block_dir ) );
            }

            if ( ! file_exists( $block_dir . 'block.json' ) ) {
                throw new \Exception( 'block.json not found for ' . esc_html( $block ) );
            }

            if ( false === register_block_type( $block_dir ) ) {
                throw new \Exception( 'Block registration failed for ' . esc_html( $block ) );
            }

            $this->prepare_view_script( sanitize_file_name( $block ) );
        }

        /**
         * Applies defer and the Swiper dependency to a block's generated view-script handle.
         *
         * This is the single place where block view scripts get the defer strategy.
         *
         * @since 1.2.0
         *
         * @param string $slug Block folder slug (e.g. "image-slider").
         * @return void
         */
        private function prepare_view_script( string $slug ) {
            $view_handle   = 'gslider-blocks-' . $slug . '-view-script';
            $swiper_handle = 'gslider-blocks-swiper-script';

            if ( ! wp_script_is( $view_handle, 'registered' ) ) {
                return;
            }

            wp_script_add_data( $view_handle, 'strategy', 'defer' );

            // Only depend on Swiper when it is registered, otherwise WordPress would drop the view script.
            if ( ! wp_script_is( $swiper_handle, 'registered' ) ) {
                return;
            }

            $scripts = wp_scripts();
            if ( ! isset( $scripts->registered[ $view_handle ] ) || ! is_array( $scripts->registered[ $view_handle ]->deps ) ) {
                return;
            }

            if ( ! in_array( $swiper_handle, $scripts->registered[ $view_handle ]->deps, true ) ) {
                $scripts->registered[ $view_handle ]->deps[] = $swiper_handle;
            }
        }

        /**
         * Scans for available block folders in the build directory.
         *
         * Returns an array of folder names that contain a valid
         * block.json file inside the build/blocks directory.
         *
         * @since 1.0.0
         *
         * @param string $build_dir Path to the build/blocks directory.
         * @return string[] Array of block folder names.
         */
        private function get_available_blocks( string $build_dir ) {
            if ( ! is_dir( $build_dir ) ) {
                return [];
            }

            $blocks = [];
            $dirs   = scandir( $build_dir );

            foreach ( $dirs as $dir ) {
                if ( '.' === $dir || '..' === $dir ) {
                    continue;
                }

                $block_path = trailingslashit( $build_dir . $dir );

                if ( is_dir( $block_path ) && file_exists( $block_path . 'block.json' ) ) {
                    $blocks[] = $dir;
                }
            }

            return $blocks;
        }
    }
}

