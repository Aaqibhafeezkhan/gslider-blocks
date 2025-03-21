<?php
/**
 * Plugin Name: GutenSlider Blocks
 * Description: Enhance your site with dynamic, customizable, and multi-functional slider blocks to create a more engaging and functional experience.
 * Author: 		Noruzzaman
 * Author URI: 	https://github.com/noruzzamans/
 * Version: 	1.0.0
 * Text Domain: gutenslider-blocks
 * Domain Path: /languages
 * License: 	GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package GutenSlider_Blocks
 */

// Ensure the file is not accessed directly for security purposes.
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Check if the class already exists to avoid redeclaration.
if ( ! class_exists( 'GutenSlider_Blocks' ) ) {

	/**
	 * GutenSlider_Blocks Final Class
	 *
	 * Main class for the GutenSlider Blocks plugin.
	 *
	 * @since 1.0.0
	 * @package GutenSlider_Blocks
	 */
	final class GutenSlider_Blocks {

		/**
		 * The instance of the class (Singleton pattern).
		 *
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Constructor for the class.
		 * Initializes the plugin by defining constants, initializing hooks, and including necessary files.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function __construct() {
			$this->define_constants(); // Define plugin constants
			$this->init();             // Initialize plugin actions and filters
			$this->includes();         // Include required files
		}

		/**
		 * Define essential plugin constants.
		 *
		 * These constants are used throughout the plugin to store version, paths, and URLs.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function define_constants() {
			// Define plugin version constant
			if ( ! defined( 'GutenSlider_Blocks_VERSION' ) ) {
				define( 'GutenSlider_Blocks_VERSION', '1.0.0' );
			}
		
			// Define the file path of the plugin
			if ( ! defined( 'GutenSlider_Blocks__FILE__' ) ) {
				define( 'GutenSlider_Blocks__FILE__', __FILE__ );
			}
		
			// Define plugin base directory
			if ( ! defined( 'GutenSlider_Blocks_PLUGIN_DIR' ) ) {
				define( 'GutenSlider_Blocks_PLUGIN_DIR', plugin_dir_path( GutenSlider_Blocks__FILE__ ) );
			}
		
			// Define plugin base URL
			if ( ! defined( 'GutenSlider_Blocks_URL' ) ) {
				define( 'GutenSlider_Blocks_URL', plugin_dir_url( GutenSlider_Blocks__FILE__ ) );
			}
		
			// Define assets URL
			if ( ! defined( 'GutenSlider_Blocks_ASSETS_URL' ) ) {
				define( 'GutenSlider_Blocks_ASSETS_URL', GutenSlider_Blocks_URL . 'assets/' );
			}
		}

		/**
		 * Initialize the plugin by setting up actions and filters.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function init() {
			// Load plugin text domain for translation purposes
			add_action( 'init', array( $this, 'load_textdomain' ) );
		}

		/**
		 * Load the plugin text domain for translations.
		 *
		 * This ensures that the plugin is ready for localization.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			// Load plugin's text domain from the 'languages' folder
			load_plugin_textdomain( 'gutenslider-blocks', false, basename( GutenSlider_Blocks_PLUGIN_DIR ) . '/languages' );
		}

		/**
		 * Get the Singleton instance of the GutenSlider_Blocks class.
		 *
		 * This method ensures that only one instance of the class exists.
		 *
		 * @since 1.0.0
		 * @return GutenSlider_Blocks
		 */
		public static function get_instance() {
			// If the instance is not yet created, create it.
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Include necessary files for the plugin.
		 *
		 * This method includes additional files that handle the plugin's functionality.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			// Include the loader file to register blocks and related features
			require_once trailingslashit( GutenSlider_Blocks_PLUGIN_DIR ) . 'includes/gutenslider-blocks-loader.php';
		}
	}
}

// Define a global function to get the instance of the plugin class.
function GutenSlider_Blocks() {
	return GutenSlider_Blocks::get_instance();
}

// Initialize the plugin by calling the function.
GutenSlider_Blocks(); // Initialize the GutenSlider_Blocks class.
