<?php
/**
 * Plugin Name: GSlider Blocks
 * Description: Enhance your site with dynamic, customizable, and multi-functional slider blocks to create a more engaging and functional experience.
 * Author: 		Noruzzaman
 * Author URI: 	https://github.com/noruzzamans/
 * Version: 	1.1.8
 * Text Domain: gslider-blocks
 * Domain Path: /languages
 * License: 	GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package GSlider_Blocks
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loads the Composer autoloader if available.
 *
 * @since 1.0.0
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

if ( ! class_exists( 'GSliderBlocks' ) ) {

	/**
	 * Main entry point class for the GSlider Blocks plugin.
	 *
	 * Defines plugin constants, loads dependencies, and
	 * bootstraps the plugin via a singleton pattern.
	 *
	 * @since 1.0.0
	 */
	final class GSliderBlocks {

		/**
		 * The single instance of the plugin class.
		 *
		 * @since 1.0.0
		 *
		 * @var GSliderBlocks|null
		 */
		private static $instance;

		/**
		 * Returns the singleton instance of the plugin.
		 *
		 * Creates a new instance if one does not already exist.
		 *
		 * @since 1.0.0
		 *
		 * @return GSliderBlocks The singleton instance.
		 */
		public static function getInstance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Initializes the plugin by defining constants and loading files.
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			$this->define_constants();
			$this->includes();
		}

		/**
		 * Defines plugin-wide constants.
		 *
		 * Sets up file paths, URLs, version numbers, and
		 * environment information used throughout the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function define_constants() {
			define( 'GSLIDER_FILE', __FILE__ );
			define( 'GSLIDER_SLUG', 'gslider-blocks' );
			define( 'GSLIDER_VERSION', '1.1.8' );
			define( 'GSLIDER_DIR_PATH', plugin_dir_path( __FILE__ ) );
			define( 'GSLIDER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			define( 'GSLIDER_WP_VERSION', (float) get_bloginfo( 'version' ) );
			define( 'GSLIDER_PHP_VERSION', (float) phpversion() );
		}

		/**
		 * Includes required plugin files.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		private function includes() {
			require_once trailingslashit( GSLIDER_DIR_PATH ) . 'includes/Plugin.php';
		}
	}
}

/**
 * Returns the singleton instance of the GSliderBlocks plugin.
 *
 * Global helper function for convenient access to the
 * plugin instance from anywhere in the codebase.
 *
 * @since 1.0.0
 *
 * @return GSliderBlocks The plugin instance.
 */
function GSliderBlocks() {
	return GSliderBlocks::getInstance();
}

/**
 * Initialize the plugin.
 *
 * @since 1.0.0
 */
GSliderBlocks::getInstance();

