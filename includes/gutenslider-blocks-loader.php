<?php
/**
 * GutenSlider Blocks Main Loader
 *
 * The main loader class for GutenSlider Blocks that includes required files
 * and sets up the necessary hooks for the plugin.
 *
 * @since 1.0.0
 * @package gutenslider-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'GutenSlider_Blocks_Loader' ) ) {

	/**
	 * Class for loading the GutenSlider Blocks.
	 *
	 * This class is responsible for including necessary files, initializing hooks,
	 * and providing a singleton instance for the GutenSlider Blocks functionality.
	 *
	 * @since 1.0.0
	 * @package gutenslider-blocks
	 */
	class GutenSlider_Blocks_Loader {

		/**
		 * Singleton instance of the GutenSlider_Blocks_Loader class.
		 *
		 * @since 1.0.0
		 * @var GutenSlider_Blocks_Loader
		 */
		private static $instance = null;

		/**
		 * Constructor function.
		 *
		 * Initializes the loader by including necessary files and setting up hooks.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function __construct() {
			$this->includes();
		}

		/**
		 * Includes necessary files for functionality.
		 *
		 * This method loads the required files such as block registration, category registration,
		 * dynamic styling, and font loader.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			// Include necessary PHP files from the plugin's includes folder.
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . '/includes/classes/register-blocks.php';
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . '/includes/classes/register-category.php';
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . '/includes/classes/dynamic-style.php';
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . '/includes/classes/FontLoader.php';
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . '/includes/classes/enqueue-assets.php';
		}

		/**
		 * Singleton method to get the instance of the loader class.
		 *
		 * This method ensures that only one instance of the class exists at a time.
		 *
		 * @since 1.0.0
		 * @return GutenSlider_Blocks_Loader The instance of the class.
		 */
		public static function get_instance() {
			// Create the instance if it doesn't exist.
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance; // Return the instance.
		}
	}

}

// Initialize the GutenSlider_Blocks_Loader class to kick off the functionality.
GutenSlider_Blocks_Loader::get_instance();
