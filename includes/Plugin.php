<?php
/**
 * Main plugin bootstrap file for GSlider Blocks.
 *
 * Initializes all plugin services including assets, blocks,
 * fonts, styles, SVG support, and text domain loading.
 *
 * @package GSlider
 * @since   1.0.0
 */

namespace GSlider;

use GSlider\Traits\SingletonTrait;
use GSlider\Classes\StyleGenerator;
use GSlider\Assets\FrontendAssets;
use GSlider\Assets\AdminAssets;
use GSlider\Classes\RegistrationBlocks;
use GSlider\Classes\RegistrationCategory;
use GSlider\Classes\FontLoader;
use GSlider\Classes\SupportSVG;
use GSlider\Utils\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Plugin' ) ) {

	/**
	 * Main plugin class for GSlider Blocks.
	 *
	 * Acts as the central bootstrap, initializing all plugin
	 * components on the plugins_loaded hook.
	 *
	 * @since 1.0.0
	 */
	class Plugin {

		use SingletonTrait;

		/**
		 * Sets up core plugin hooks.
		 *
		 * Registers the plugins_loaded action for component initialization.
		 * Translation loading is handled automatically by WordPress for
		 * plugins hosted on WordPress.org (since WordPress 4.6).
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ] );
		}

		/**
		 * Initializes all plugin components.
		 *
		 * Registers style generation, frontend and admin assets,
		 * block registration, block categories, font loading,
		 * analytics tracking, and SVG support (admin only).
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function plugins_loaded() {
			StyleGenerator::getInstance()->register();
			FrontendAssets::getInstance()->register();
			AdminAssets::getInstance()->register();
			RegistrationBlocks::getInstance()->register();
			RegistrationCategory::getInstance()->register();
			FontLoader::getInstance()->register();
			Utils::getInstance()->register();

			// SVG Support (admin only).
			if ( is_admin() ) {
				SupportSVG::getInstance()->register();
			}
		}

	}

}

Plugin::getInstance();

