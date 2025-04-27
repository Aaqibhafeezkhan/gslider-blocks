<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'GSlider_Blocks_Loader' ) ) {

	class GSlider_Blocks_Loader {

		private static $instance = null;

		private function __construct() {
			$this->includes();
		}

		private function includes() {
			// Include necessary PHP files from the plugin's includes folder.
			require_once trailingslashit( GSLIDER_DIR_PATH ) . '/includes/classes/register-blocks.php';
			require_once trailingslashit( GSLIDER_DIR_PATH ) . '/includes/classes/register-category.php';
			require_once trailingslashit( GSLIDER_DIR_PATH ) . '/includes/classes/dynamic-style.php';
			require_once trailingslashit( GSLIDER_DIR_PATH ) . '/includes/classes/FontLoader.php';
			require_once trailingslashit( GSLIDER_DIR_PATH ) . '/includes/classes/enqueue-assets.php';
		}

		public static function get_instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}
	}

}

GSlider_Blocks_Loader::get_instance();
