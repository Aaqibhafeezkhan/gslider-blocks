<?php

namespace GSlider\Classes;
use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('RegistrationBlocks')) {

    class RegistrationBlocks {

        use SingletonTrait;

        /**
        * List of blocks to be registered
        */
        private const BLOCKS = [
            'gslider',
        ];

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
            add_action('init', [$this, 'register_blocks']);
        }

        /**
         * Register Blocks
         */
        public function register_blocks() {
            // Check if the plugin directory constant is defined
            if (!defined('GSLIDER_DIR_PATH')) {
                error_log('GSlider Blocks: Plugin directory constant not defined.');
                return;
            }

            // Build directory for blocks
            $build_dir = trailingslashit(GSLIDER_DIR_PATH) . 'build/blocks/';
            
            // Check if the build directory is readable
            if (!is_readable($build_dir)) {
                error_log('GSlider Blocks: Main build directory is not readable: ' . $build_dir);
                return;
            }

            // Iterate over each block and register it
            foreach (self::BLOCKS as $block) {
                try {
                    $this->register_single_block($build_dir, $block);
                } catch (Exception $e) {
                    // Log errors encountered during block registration
                    error_log('GSlider Blocks: Error registering block ' . $block . ': ' . $e->getMessage()); 
                }
            }
        }

        /**
         * Register a single block
         */
        private function register_single_block(string $build_dir, string $block): void {
            // Construct the block directory path
            $block_dir = trailingslashit($build_dir . sanitize_file_name($block));
            
            // Check if the block directory is readable
            if (!is_readable($block_dir)) {
                throw new Exception(esc_html("Build directory not readable: {$block_dir}"));
            }

            // Check if the block.json file exists
            if (!file_exists($block_dir . 'block.json')) {
                throw new Exception(esc_html("block.json not found for {$block}"));
            }

            // Attempt to register the block
            $registration_result = register_block_type($block_dir);
            
            // Check if registration failed
            if (false === $registration_result) {
                throw new Exception(esc_html("Block registration failed for {$block}"));
            }
        }

    }
}
