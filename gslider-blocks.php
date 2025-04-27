<?php
/**
 * Plugin Name: GSlider Blocks
 * Description: Enhance your site with dynamic, customizable, and multi-functional slider blocks to create a more engaging and functional experience.
 * Author: 		Noruzzaman
 * Author URI: 	https://github.com/noruzzamans/
 * Version: 	1.0.1
 * Text Domain: gslider-blocks
 * Domain Path: /languages
 * License: 	GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package GSlider_Blocks
 */

 if (!defined('ABSPATH')) {
    exit;
}
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Final Class for GSlider Blocks
 */
if ( ! class_exists( 'GSliderBlocks' ) ) {

	final class GSliderBlocks {

		private static $instance;

		/**
		 * GSlider Blocks Instance
		 */
		public static function get_instance() {
			if (!isset(self::$instance)) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			$this->define_constants();
			$this->init();
			$this->includes();
		}

		/**
		 * Define gslider constants.
		 */
		public function define_constants() {
			define('GSLIDER_FILE', __FILE__);
			define('GSLIDER_SLUG', 'gslider-blocks');
			define('GSLIDER_VERSION', '1.0.1');
			define('GSLIDER_DIR_PATH', plugin_dir_path(__FILE__));
			define('GSLIDER_PLUGIN_URL', plugin_dir_url(__FILE__)); 
			define('GSLIDER_WP_VERSION', (float) get_bloginfo('version'));
			define('GSLIDER_PHP_VERSION', (float) phpversion());
		}

		/**
		 * Initialize the plugin by setting up actions and filters.
		 */
		public function init() {
			add_action( 'init', array( $this, 'load_textdomain' ) );
		}

		/**
		 * Load the plugin text domain for translations.
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'gslider-blocks', false, basename( GSLIDER_DIR_PATH ) . '/languages' );
		}

		/**
		 * Include necessary files for the plugin.
		 */
		private function includes() {
			require_once trailingslashit( GSLIDER_DIR_PATH ) . 'includes/gslider-blocks-loader.php';
		}
	}
}

GSliderBlocks::get_instance();

/**
 * Define a global function to get the instance of the plugin class.
 */
function GSliderBlocks() {
	return GSliderBlocks::get_instance();
}

/**
 * Initialize the plugin
 */
GSliderBlocks(); 
