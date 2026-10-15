<?php
/**
 * Admin Dashboard management for GSlider Blocks.
 *
 * Registers the top-level WordPress admin menu page and
 * the root container for the React SPA dashboard.
 *
 * @package GSlider\Admin
 * @since   1.2.0
 */

namespace GSlider\Admin;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Dashboard::class, false ) ) {

	/**
	 * Manages the GSlider Blocks admin dashboard menu page.
	 *
	 * Registers a top-level admin menu page and outputs the
	 * root HTML mounting container for the React dashboard.
	 *
	 * @since 1.2.0
	 */
	class Dashboard implements Registrable {

		use SingletonTrait;

		/**
		 * The menu slug for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const MENU_SLUG = 'gslider-blocks';

		/**
		 * Capability required to access the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const CAPABILITY = 'manage_options';

		/**
		 * Position in the WordPress admin menu.
		 *
		 * Positioned directly below Appearance.
		 *
		 * @since 1.2.0
		 *
		 * @var int
		 */
		public const MENU_POSITION = 61;

		/**
		 * Registers WordPress hooks for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'admin_menu', [ $this, 'register_admin_menu' ] );
		}

		/**
		 * Registers the top-level admin menu page.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_admin_menu(): void {
			add_menu_page(
				esc_html__( 'GSlider Blocks - Modern Slider & Carousel Studio', 'gslider-blocks' ),
				esc_html__( 'GSlider Blocks', 'gslider-blocks' ),
				self::CAPABILITY,
				self::MENU_SLUG,
				[ $this, 'render_dashboard_page' ],
				$this->get_menu_icon(),
				self::MENU_POSITION
			);
		}

		/**
		 * Returns the base64-encoded SVG icon for the admin menu.
		 *
		 * @since 1.2.0
		 *
		 * @return string Data URI of the SVG icon.
		 */
		public function get_menu_icon(): string {
			$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">'
				. '<rect x="4.5" y="3.5" width="11" height="11" rx="1.5" fill="#a7aaad" fill-opacity="0.25" stroke="#a7aaad" stroke-width="1.5"/>'
				. '<path d="M1.5 5.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H3" stroke="#a7aaad" stroke-width="1.5" stroke-linecap="round"/>'
				. '<path d="M18.5 5.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H17" stroke="#a7aaad" stroke-width="1.5" stroke-linecap="round"/>'
				. '<circle cx="7" cy="17" r="0.8" fill="#a7aaad"/>'
				. '<circle cx="10" cy="17" r="1" fill="#a7aaad"/>'
				. '<circle cx="13" cy="17" r="0.8" fill="#a7aaad"/>'
				. '</svg>';

			return 'data:image/svg+xml;base64,' . base64_encode( $svg );
		}

		/**
		 * Renders the admin dashboard mounting container.
		 *
		 * Checks user permissions and outputs the root DOM container
		 * where the React SPA admin dashboard mounts.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function render_dashboard_page(): void {
			if ( ! current_user_can( self::CAPABILITY ) ) {
				return;
			}

			echo '<div class="wrap gslider-admin-wrap">'
				. '<div id="gslider-admin-dashboard" class="gslider-admin-dashboard-root">'
				. '<!-- React SPA mounts here -->'
				. '</div>'
				. '</div>';
		}
	}
}
