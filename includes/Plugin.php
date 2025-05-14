<?php
/**
 * GSliderBlocks Plugin
 *
 * @package GSliderBlocks
 */

 use GSlider\Traits\SingletonTrait;
 use GSlider\Classes\StyleGenerator;
 use GSlider\Assets\FrontendAssets;
 use GSlider\Assets\AdminAssets;
 use GSlider\Classes\RegistrationBlocks;
 use GSlider\Classes\RegistrationCategory;
 use GSlider\Classes\FontLoader;
 use GSlider\Classes\SupportSVG;

if (! defined('ABSPATH')) {
    exit; 
}

if ( ! class_exists( 'Plugin' ) ) {

	class Plugin {

		use SingletonTrait;

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action('plugins_loaded', [$this, 'plugins_loaded']);
			add_action( 'init', [$this, 'gslider_load_textdomain'] );
		}

		/**
		 * Initialize the plugin
		 */
		public function plugins_loaded() {
			StyleGenerator::getInstance();
			FrontendAssets::getInstance()->register();
			AdminAssets::getInstance()->register();
			RegistrationBlocks::getInstance();
			RegistrationCategory::getInstance();
			FontLoader::getInstance();

			// SVG Support
			if (is_admin()) {
				SupportSVG::getInstance();
			}
		}

		/**
		 * Load the plugin text domain
		 */
		public function gslider_load_textdomain() {
			load_plugin_textdomain( 'gslider-blocks', false, basename( GSLIDER_DIR_PATH ) . '/languages' );
		}
	}

}

Plugin::getInstance();
