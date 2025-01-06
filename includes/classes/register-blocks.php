<?php
/**
 * GutenSlider Blocks Registration
 *
 * Registers custom Gutenberg blocks for the GutenSlider plugin.
 * It checks the build directory, reads the block configurations, and registers the blocks.
 *
 * @since 1.0.0
 * @package gutenslider-blocks
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access to the file.
}

if (!class_exists('GutenSlider_Blocks_Registration')) {
    /**
     * Class for registering GutenSlider custom blocks.
     *
     * @since 1.0.0
     * @package gutenslider-blocks
     */
    class GutenSlider_Blocks_Registration {
        // List of blocks to register.
        private const BLOCKS = [
            'button', // Example block, you can add more blocks here.
        ];

        /**
         * Singleton instance of the class.
         *
         * @var null|self
         */
        private static $instance = null;

        /**
         * Constructor to initialize the block registration process.
         *
         * @since 1.0.0
         * @return void
         */
        public function __construct() {
            $this->init();
        }

        /**
         * Initializes hooks for registering blocks.
         *
         * @since 1.0.0
         * @return void
         */
        private function init() {
            // Register blocks when WordPress initializes.
            add_action('init', [$this, 'register_blocks']);
        }

        /**
         * Registers all blocks defined in the `BLOCKS` constant.
         *
         * @since 1.0.0
         * @return void
         */
        public function register_blocks() {
            // Ensure the plugin directory constant is defined.
            if (!defined('GUTENSLIDER_BLOCKS_PLUGIN_DIR')) {
                error_log('GutenSlider Blocks: Plugin directory constant not defined.');
                return;
            }

            // Define the build directory path.
            $build_dir = trailingslashit(GUTENSLIDER_BLOCKS_PLUGIN_DIR) . 'build/blocks/';
            
            // Check if the build directory is readable.
            if (!is_readable($build_dir)) {
                error_log('GutenSlider Blocks: Main build directory is not readable: ' . $build_dir);
                return;
            }

            // Loop through all blocks and register them.
            foreach (self::BLOCKS as $block) {
                try {
                    $this->register_single_block($build_dir, $block); // Register each block.
                } catch (Exception $e) {
                    error_log('GutenSlider Blocks: Error registering block ' . $block . ': ' . $e->getMessage());
                }
            }
        }

        /**
         * Registers a single block by loading its block configuration and calling `register_block_type`.
         *
         * @param string $build_dir Path to the build directory.
         * @param string $block The block name to register.
         * @throws Exception If the block directory or block configuration file is missing or unreadable.
         * @return void
         */
        private function register_single_block(string $build_dir, string $block): void {
            // Define the block directory path.
            $block_dir = trailingslashit($build_dir . sanitize_file_name($block));

            // Check if the block directory is readable.
            if (!is_readable($block_dir)) {
                throw new Exception("Build directory not readable: {$block_dir}");
            }

            // Check if the block configuration file (`block.json`) exists.
            if (!file_exists($block_dir . 'block.json')) {
                throw new Exception("block.json not found for {$block}");
            }

            // Attempt to register the block using the block directory.
            $registration_result = register_block_type($block_dir);

            // Throw an error if the block registration fails.
            if (false === $registration_result) {
                throw new Exception("Block registration failed for {$block}");
            }
        }

        /**
         * Singleton method to get the instance of the class.
         *
         * @since 1.0.0
         * @return self The instance of the class.
         */
        public static function get_instance(): self {
            // Create a new instance if it doesn't exist.
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }
}

// Initialize the block registration process.
GutenSlider_Blocks_Registration::get_instance();
