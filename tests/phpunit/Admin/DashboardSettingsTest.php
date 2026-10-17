<?php
/**
 * Unit tests for GSlider Settings Tab: GDPR Font Privacy and CSS Delivery Preferences.
 *
 * Verifies that:
 * 1. POST /wp-json/gslider/v1/dashboard/settings is registered and capability checks are enforced.
 * 2. Saving settings updates the gslider_settings option with sanitized values.
 * 3. Default settings maintain 100% backward compatibility for existing sites.
 * 4. FontLoader suppresses external Google Fonts requests when privacy mode is enabled.
 * 5. StyleGenerator switches from file writing to direct inline <style> injection when configured.
 *
 * @package GSlider\Tests\Admin
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

use GSlider\Admin\DashboardController;
use GSlider\Classes\FontLoader;
use GSlider\Classes\StyleGenerator;

/**
 * Test class for GSlider Admin Settings.
 */
class DashboardSettingsTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		$this->test_settings_route_registration();
		$this->test_permissions_check_blocks_unauthorized_users();
		$this->test_permissions_check_allows_administrators();
		$this->test_default_settings_backward_compatibility();
		$this->test_get_item_includes_settings_in_response_and_schema();
		$this->test_save_settings_persists_valid_options();
		$this->test_save_settings_fallback_for_invalid_css_delivery();
		$this->test_font_loader_privacy_mode_suppression();
		$this->test_style_generator_renders_dynamic_inline_styles();
		$this->test_style_generator_sanitization_and_script_neutralization();
		$this->test_style_generator_resets_and_retrieves_in_memory_styles();

		// Clean up options after test execution.
		delete_option( 'gslider_settings' );

		echo "\nAll 11 Admin Settings & Privacy tests passed successfully!\n";
	}

	/**
	 * Test 1: Verify POST /gslider/v1/dashboard/settings route registration.
	 *
	 * @return void
	 */
	public function test_settings_route_registration(): void {
		global $wp_rest_routes;

		$controller = DashboardController::getInstance();
		$controller->register();
		$controller->register_routes();

		if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard/settings'] ) ) {
			fwrite( STDERR, "FAIL: Route /dashboard/settings must be registered\n" );
			exit( 1 );
		}

		$settings_route = $wp_rest_routes['gslider/v1']['/dashboard/settings'][0];

		if ( 'POST' !== $settings_route['methods'] ) {
			fwrite( STDERR, "FAIL: Settings endpoint must accept POST requests\n" );
			exit( 1 );
		}

		if ( ! is_callable( $settings_route['callback'] ) ) {
			fwrite( STDERR, "FAIL: Settings route callback must be callable\n" );
			exit( 1 );
		}

		if ( ! is_callable( $settings_route['permission_callback'] ) ) {
			fwrite( STDERR, "FAIL: Settings route permission callback must be callable\n" );
			exit( 1 );
		}

		echo "OK: Test 1 - POST /gslider/v1/dashboard/settings route registered successfully\n";
	}

	/**
	 * Test 2: Permission check blocks unauthorized users (401).
	 *
	 * @return void
	 */
	public function test_permissions_check_blocks_unauthorized_users(): void {
		global $current_caps;

		$controller   = DashboardController::getInstance();
		$current_caps = []; // No manage_options.
		$req          = new WP_REST_Request();
		$perm_result  = $controller->save_settings_permissions_check( $req );

		if ( ! ( $perm_result instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: Permission check must return WP_Error for non-admins\n" );
			exit( 1 );
		}

		if ( 'rest_forbidden' !== $perm_result->get_error_code() ) {
			fwrite( STDERR, "FAIL: Error code must be rest_forbidden\n" );
			exit( 1 );
		}

		if ( 401 !== $perm_result->get_error_data()['status'] ) {
			fwrite( STDERR, "FAIL: Status code must be 401\n" );
			exit( 1 );
		}

		echo "OK: Test 2 - Permission check blocks unauthorized users with 401\n";
	}

	/**
	 * Test 3: Permission check allows administrators with manage_options.
	 *
	 * @return void
	 */
	public function test_permissions_check_allows_administrators(): void {
		global $current_caps;

		$controller   = DashboardController::getInstance();
		$current_caps = [ 'manage_options' => true ];
		$req          = new WP_REST_Request();
		$perm_result  = $controller->save_settings_permissions_check( $req );

		if ( true !== $perm_result ) {
			fwrite( STDERR, "FAIL: Permission check must return true for manage_options\n" );
			exit( 1 );
		}

		echo "OK: Test 3 - Permission check allows administrators with manage_options\n";
	}

	/**
	 * Test 4: Default settings are backward-compatible (privacy: false, delivery: 'file').
	 *
	 * @return void
	 */
	public function test_default_settings_backward_compatibility(): void {
		$controller = DashboardController::getInstance();
		delete_option( 'gslider_settings' );
		$defaults = $controller->get_settings();

		if ( false !== $defaults['google_fonts_privacy'] ) {
			fwrite( STDERR, "FAIL: Default google_fonts_privacy must be false\n" );
			exit( 1 );
		}

		if ( 'file' !== $defaults['css_delivery'] ) {
			fwrite( STDERR, "FAIL: Default css_delivery must be file\n" );
			exit( 1 );
		}

		echo "OK: Test 4 - Default settings are backward-compatible (privacy: false, delivery: 'file')\n";
	}

	/**
	 * Test 5: GET /dashboard includes settings in response and schema.
	 *
	 * @return void
	 */
	public function test_get_item_includes_settings_in_response_and_schema(): void {
		$controller     = DashboardController::getInstance();
		$dashboard_res  = $controller->get_item( new WP_REST_Request() );
		$dashboard_data = $dashboard_res->get_data();

		if ( ! isset( $dashboard_data['settings'] ) ) {
			fwrite( STDERR, "FAIL: get_item must return settings object\n" );
			exit( 1 );
		}

		if ( false !== $dashboard_data['settings']['google_fonts_privacy'] ) {
			fwrite( STDERR, "FAIL: Dashboard settings must have default privacy false\n" );
			exit( 1 );
		}

		if ( 'file' !== $dashboard_data['settings']['css_delivery'] ) {
			fwrite( STDERR, "FAIL: Dashboard settings must have default delivery file\n" );
			exit( 1 );
		}

		$schema = $controller->get_item_schema();

		if ( ! isset( $schema['properties']['settings'] ) ) {
			fwrite( STDERR, "FAIL: Schema must define settings property\n" );
			exit( 1 );
		}

		if ( 'object' !== $schema['properties']['settings']['type'] ) {
			fwrite( STDERR, "FAIL: Settings schema type must be object\n" );
			exit( 1 );
		}

		echo "OK: Test 5 - GET /dashboard returns settings and schema defines settings property\n";
	}

	/**
	 * Test 6: save_settings persists valid privacy and css_delivery options.
	 *
	 * @return void
	 */
	public function test_save_settings_persists_valid_options(): void {
		$controller = DashboardController::getInstance();
		$save_req   = new WP_REST_Request( [
			'google_fonts_privacy' => true,
			'css_delivery'         => 'inline',
		] );
		$save_res   = $controller->save_settings( $save_req );
		$save_data  = $save_res->get_data();

		if ( 'success' !== $save_data['status'] ) {
			fwrite( STDERR, "FAIL: save_settings response status must be success\n" );
			exit( 1 );
		}

		if ( true !== $save_data['settings']['google_fonts_privacy'] ) {
			fwrite( STDERR, "FAIL: Saved privacy must be true\n" );
			exit( 1 );
		}

		if ( 'inline' !== $save_data['settings']['css_delivery'] ) {
			fwrite( STDERR, "FAIL: Saved delivery must be inline\n" );
			exit( 1 );
		}

		// Verify option in mock database.
		$stored_option = get_option( 'gslider_settings' );

		if ( true !== $stored_option['google_fonts_privacy'] ) {
			fwrite( STDERR, "FAIL: Option google_fonts_privacy must be true in DB\n" );
			exit( 1 );
		}

		if ( 'inline' !== $stored_option['css_delivery'] ) {
			fwrite( STDERR, "FAIL: Option css_delivery must be inline in DB\n" );
			exit( 1 );
		}

		echo "OK: Test 6 - save_settings persists settings to gslider_settings option\n";
	}

	/**
	 * Test 7: save_settings falls back to 'file' for invalid css_delivery values.
	 *
	 * @return void
	 */
	public function test_save_settings_fallback_for_invalid_css_delivery(): void {
		$controller  = DashboardController::getInstance();
		$invalid_req = new WP_REST_Request( [
			'css_delivery' => 'invalid_unsupported_mode',
		] );
		$controller->save_settings( $invalid_req );
		$stored = $controller->get_settings();

		if ( 'file' !== $stored['css_delivery'] ) {
			fwrite( STDERR, "FAIL: Invalid css_delivery must fallback to file\n" );
			exit( 1 );
		}

		echo "OK: Test 7 - Invalid css_delivery values safely fallback to file\n";
	}

	/**
	 * Test 8: FontLoader privacy mode suppression.
	 *
	 * @return void
	 */
	public function test_font_loader_privacy_mode_suppression(): void {
		global $wp_styles;

		$font_loader = FontLoader::getInstance();

		// When privacy mode is off:
		update_option( 'gslider_settings', [ 'google_fonts_privacy' => false ] );

		if ( false !== FontLoader::is_privacy_mode_enabled() ) {
			fwrite( STDERR, "FAIL: Privacy mode should be inactive\n" );
			exit( 1 );
		}

		FontLoader::reset_collected_fonts();
		$block_data = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'titleFontFamily' => 'Roboto',
				'titleFontWeight' => '700',
			],
		];
		$font_loader->get_fonts_on_render_block( '<div>slider</div>', $block_data );

		// Now enable privacy mode.
		update_option( 'gslider_settings', [ 'google_fonts_privacy' => true ] );

		if ( true !== FontLoader::is_privacy_mode_enabled() ) {
			fwrite( STDERR, "FAIL: Privacy mode should be active\n" );
			exit( 1 );
		}

		// Reset styles and verify get_fonts_on_render_block returns unmodified and doesn't collect.
		FontLoader::reset_collected_fonts();
		$out = $font_loader->get_fonts_on_render_block( '<div>slider</div>', $block_data );

		if ( '<div>slider</div>' !== $out ) {
			fwrite( STDERR, "FAIL: get_fonts_on_render_block does not return unmodified content\n" );
			exit( 1 );
		}

		// Verify fonts_loader resets collection without errors.
		$wp_styles = [];
		$font_loader->fonts_loader();

		if ( isset( $wp_styles['gslider-blocks-fonts'] ) ) {
			fwrite( STDERR, "FAIL: Google Fonts stylesheet must NOT be registered when privacy is enabled\n" );
			exit( 1 );
		}

		echo "OK: Test 8 - FontLoader suppresses Google Fonts requests when privacy mode is enabled\n";
	}

	/**
	 * Test 9: StyleGenerator collects and renders dynamic inline styles on render_block.
	 *
	 * @return void
	 */
	public function test_style_generator_renders_dynamic_inline_styles(): void {
		$style_gen = StyleGenerator::getInstance();
		StyleGenerator::reset_styles();

		$block_data = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => 'slider-abc123',
				'blockStyle' => '.slider-abc123 { border-radius: 8px; }',
			],
		];

		$rendered_output = $style_gen->collect_and_render_dynamic_styles( '<div>slider content</div>', $block_data );

		if ( false === strpos( $rendered_output, '<style id="gslider-style-slider-abc123">' ) ) {
			fwrite( STDERR, "FAIL: Inline style tag must be printed directly\n" );
			exit( 1 );
		}

		if ( false === strpos( $rendered_output, '.slider-abc123{border-radius:8px}' ) ) {
			fwrite( STDERR, "FAIL: Sanitized block style must be inside inline style tag\n" );
			exit( 1 );
		}

		if ( false === strpos( $rendered_output, '<div>slider content</div>' ) ) {
			fwrite( STDERR, "FAIL: Original block content must be appended\n" );
			exit( 1 );
		}

		echo "OK: Test 9 - StyleGenerator outputs sanitized inline <style> tag directly with block content\n";
	}

	/**
	 * Test 10: StyleGenerator strictly sanitizes CSS and neutralizes malicious injections.
	 *
	 * @return void
	 */
	public function test_style_generator_sanitization_and_script_neutralization(): void {
		$style_gen        = StyleGenerator::getInstance();
		$malicious_block  = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => 'slider-sec456',
				'blockStyle' => '.slider-sec456 { color: red; } </style><script>alert(1)</script> body { background: black; }',
			],
		];

		$safe_output = $style_gen->collect_and_render_dynamic_styles( '<div>safe</div>', $malicious_block );

		if ( false !== strpos( $safe_output, '<script>' ) ) {
			fwrite( STDERR, "FAIL: Malicious <script> tag must be stripped\n" );
			exit( 1 );
		}

		if ( false !== strpos( $safe_output, 'body' ) ) {
			fwrite( STDERR, "FAIL: Unscoped external body selector must be stripped\n" );
			exit( 1 );
		}

		if ( false === strpos( $safe_output, '.slider-sec456{color:red}' ) ) {
			fwrite( STDERR, "FAIL: Legitimate scoped style must be retained\n" );
			exit( 1 );
		}

		echo "OK: Test 10 - StyleGenerator strictly strips malicious scripts and unscoped selectors\n";
	}

	/**
	 * Test 11: StyleGenerator resets and retrieves in-memory styles.
	 *
	 * @return void
	 */
	public function test_style_generator_resets_and_retrieves_in_memory_styles(): void {
		$collected = StyleGenerator::get_collected_styles();

		if ( ! isset( $collected['slider-abc123'] ) ) {
			fwrite( STDERR, "FAIL: slider-abc123 must be present in collected styles\n" );
			exit( 1 );
		}

		if ( ! isset( $collected['slider-sec456'] ) ) {
			fwrite( STDERR, "FAIL: slider-sec456 must be present in collected styles\n" );
			exit( 1 );
		}

		StyleGenerator::reset_styles();
		$cleared = StyleGenerator::get_collected_styles();

		if ( ! empty( $cleared ) ) {
			fwrite( STDERR, "FAIL: Collected styles must be empty after reset_styles()\n" );
			exit( 1 );
		}

		echo "OK: Test 11 - StyleGenerator successfully resets and manages in-memory styles\n";
	}
}

// Standalone execution entry point.
( new DashboardSettingsTest() )->run_all_tests();
