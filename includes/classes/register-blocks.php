<?php
/**
 * GutenSlider Blocks Registration
 *
 * Handles the registration of Gutenberg blocks for the GutenSlider plugin.
 *
 * @since 1.0.0
 * @package GutenSlider
 */

// Exit if accessed directly to prevent security vulnerabilities.
if (!defined('ABSPATH')) {
    exit;
}

// Check if the class already exists to avoid redeclaration errors.
if (!class_exists('GutenSlider_Blocks_Registration')) {
    /**
     * Class GutenSlider_Blocks_Registration
     *
     * Responsible for registering blocks for the GutenSlider plugin.
     */
    class GutenSlider_Blocks_Registration {
        /**
         * List of blocks to be registered.
         *
         * @since 1.0.0
         */
        private const BLOCKS = [
            'gutenslider',
        ];

        /**
         * Singleton instance of the class.
         *
         * @var null|self
         * @since 1.0.0
         */
        private static $instance = null;

        /**
         * Constructor.
         *
         * Initializes the class by calling the init method.
         */
        public function __construct() {
            $this->init();
        }

        /**
         * Initialization.
         *
         * Hooks the block registration method to the `init` action.
         */
        private function init() {
            add_action('init', [$this, 'register_blocks']);
        }

        /**
         * Registers all blocks listed in the BLOCKS constant.
         *
         * Ensures the plugin directory constant is defined and readable.
         * Logs errors for debugging if block registration fails.
         */
        public function register_blocks() {
            // Check if the plugin directory constant is defined.
            if (!defined('GutenSlider_Blocks_PLUGIN_DIR')) {
                error_log('GutenSlider Blocks: Plugin directory constant not defined.');
                return;
            }

            // Build directory for blocks.
            $build_dir = trailingslashit(GutenSlider_Blocks_PLUGIN_DIR) . 'build/blocks/';
            
            // Check if the build directory is readable.
            if (!is_readable($build_dir)) {
                error_log('GutenSlider Blocks: Main build directory is not readable: ' . $build_dir);
                return;
            }

            // Iterate over each block and register it.
            foreach (self::BLOCKS as $block) {
                try {
                    $this->register_single_block($build_dir, $block);
                } catch (Exception $e) {
                    // Log errors encountered during block registration.
                    error_log('GutenSlider Blocks: Error registering block ' . $block . ': ' . $e->getMessage());
                }
            }
        }

        /**
         * Registers a single block.
         *
         * @param string $build_dir The base directory for block builds.
         * @param string $block The block name to register.
         * @throws Exception If the block directory or block.json is not found, or if registration fails.
         */
        private function register_single_block(string $build_dir, string $block): void {
            // Construct the block directory path.
            $block_dir = trailingslashit($build_dir . sanitize_file_name($block));
            
            // Check if the block directory is readable.
            if (!is_readable($block_dir)) {
                throw new Exception(esc_html("Build directory not readable: {$block_dir}"));
            }

            // Check if the block.json file exists.
            if (!file_exists($block_dir . 'block.json')) {
                throw new Exception(esc_html("block.json not found for {$block}"));
            }

            // Attempt to register the block.
            $registration_result = register_block_type($block_dir);
            
            // Check if registration failed.
            if (false === $registration_result) {
                throw new Exception(esc_html("Block registration failed for {$block}"));
            }
        }

        /**
         * Retrieves the singleton instance of the class.
         *
         * Ensures only one instance of the class exists (singleton pattern).
         *
         * @return self
         */
        public static function get_instance(): self {
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }
}

// Initialize the block registration process.
GutenSlider_Blocks_Registration::get_instance();
