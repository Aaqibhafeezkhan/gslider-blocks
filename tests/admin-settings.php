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
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

if ( ! defined( 'GSLIDER_VERSION' ) ) {
	define( 'GSLIDER_VERSION', '1.2.0' );
}

if ( ! defined( 'HOUR_IN_SECONDS' ) ) {
	define( 'HOUR_IN_SECONDS', 3600 );
}

// --------------------------------------------------------------------------
// WordPress Core Stubs & Mock Framework
// --------------------------------------------------------------------------

global $wp_actions, $wp_filters, $wp_rest_routes, $current_caps, $wp_options, $wp_styles, $wp_post_content, $wp_current_action;
$wp_actions        = [];
$wp_filters        = [];
$wp_rest_routes    = [];
$current_caps      = [];
$wp_options        = [];
$wp_styles         = [];
$wp_post_content   = '';
$wp_current_action = '';

if ( ! class_exists( 'WP_REST_Controller' ) ) {
	class WP_REST_Controller {
		protected $namespace;
		protected $rest_base;
		protected $schema;
		public function add_additional_fields_schema( $schema ) {
			return $schema;
		}
	}
}

if ( ! class_exists( 'WP_REST_Server' ) ) {
	class WP_REST_Server {
		const READABLE  = 'GET';
		const CREATABLE = 'POST';
	}
}

if ( ! class_exists( 'WP_REST_Request' ) ) {
	class WP_REST_Request {
		public $params = [];
		public function __construct( array $params = [] ) {
			$this->params = $params;
		}
		public function get_param( $key ) {
			return $this->params[ $key ] ?? null;
		}
		public function has_param( $key ) {
			return array_key_exists( $key, $this->params );
		}
	}
}

if ( ! class_exists( 'WP_REST_Response' ) ) {
	class WP_REST_Response {
		public $data;
		public $status;
		public function __construct( $data = null, $status = 200 ) {
			$this->data   = $data;
			$this->status = $status;
		}
		public function get_data() {
			return $this->data;
		}
		public function get_status() {
			return $this->status;
		}
	}
}

if ( ! class_exists( 'WP_Error' ) ) {
	class WP_Error {
		public $code;
		public $message;
		public $data;
		public function __construct( $code = '', $message = '', $data = [] ) {
			$this->code    = $code;
			$this->message = $message;
			$this->data    = $data;
		}
		public function get_error_code() {
			return $this->code;
		}
		public function get_error_data() {
			return $this->data;
		}
	}
}

if ( ! function_exists( 'add_action' ) ) {
	function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		global $wp_actions;
		$wp_actions[ $hook ][] = [
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		];
	}
}

if ( ! function_exists( 'add_filter' ) ) {
	function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		global $wp_filters;
		$wp_filters[ $hook ][] = [
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		];
	}
}

if ( ! function_exists( 'apply_filters' ) ) {
	function apply_filters( $hook, $value ) {
		return $value;
	}
}

if ( ! function_exists( 'register_rest_route' ) ) {
	function register_rest_route( $namespace, $route, $args = [] ) {
		global $wp_rest_routes;
		$wp_rest_routes[ $namespace ][ $route ] = $args;
	}
}

if ( ! function_exists( 'rest_ensure_response' ) ) {
	function rest_ensure_response( $response ) {
		if ( $response instanceof WP_REST_Response ) {
			return $response;
		}
		return new WP_REST_Response( $response, 200 );
	}
}

if ( ! function_exists( 'current_user_can' ) ) {
	function current_user_can( $cap ) {
		global $current_caps;
		return ! empty( $current_caps[ $cap ] );
	}
}

if ( ! function_exists( 'get_option' ) ) {
	function get_option( $name, $default = false ) {
		global $wp_options;
		return array_key_exists( $name, $wp_options ) ? $wp_options[ $name ] : $default;
	}
}

if ( ! function_exists( 'update_option' ) ) {
	function update_option( $name, $value, $autoload = null ) {
		global $wp_options;
		$wp_options[ $name ] = $value;
		return true;
	}
}

if ( ! function_exists( 'delete_option' ) ) {
	function delete_option( $name ) {
		global $wp_options;
		unset( $wp_options[ $name ] );
		return true;
	}
}

if ( ! function_exists( 'get_transient' ) ) {
	function get_transient( $key ) {
		return false;
	}
}

if ( ! function_exists( 'set_transient' ) ) {
	function set_transient( $key, $value, $expiration = 0 ) {
		return true;
	}
}

if ( ! function_exists( 'delete_transient' ) ) {
	function delete_transient( $key ) {
		return true;
	}
}

if ( ! function_exists( 'sanitize_text_field' ) ) {
	function sanitize_text_field( $str ) {
		return is_string( $str ) ? trim( strip_tags( $str ) ) : '';
	}
}

if ( ! function_exists( 'sanitize_key' ) ) {
	function sanitize_key( $key ) {
		return is_string( $key ) ? strtolower( preg_replace( '/[^a-z0-9_\-]/i', '', $key ) ) : '';
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	function wp_strip_all_tags( $text ) {
		return strip_tags( $text );
	}
}

if ( ! function_exists( 'esc_attr' ) ) {
	function esc_attr( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return filter_var( $url, FILTER_SANITIZE_URL ) ?: '';
	}
}

if ( ! function_exists( 'add_query_arg' ) ) {
	function add_query_arg( $args, $url ) {
		$query = http_build_query( $args );
		return $url . '?' . $query;
	}
}

if ( ! function_exists( 'wp_register_style' ) ) {
	function wp_register_style( $handle, $src, $deps = [], $ver = false ) {
		global $wp_styles;
		$wp_styles[ $handle ] = [
			'src'  => $src,
			'deps' => $deps,
			'ver'  => $ver,
		];
	}
}

if ( ! function_exists( 'wp_enqueue_style' ) ) {
	function wp_enqueue_style( $handle ) {
		global $wp_styles;
		if ( isset( $wp_styles[ $handle ] ) ) {
			$wp_styles[ $handle ]['enqueued'] = true;
		}
	}
}

if ( ! function_exists( 'wp_upload_dir' ) ) {
	function wp_upload_dir() {
		return [
			'basedir' => '/tmp/wp-uploads',
			'baseurl' => 'https://example.com/wp-content/uploads',
		];
	}
}

if ( ! function_exists( 'wp_mkdir_p' ) ) {
	function wp_mkdir_p( $dir ) {
		return true;
	}
}

if ( ! function_exists( 'get_queried_object_id' ) ) {
	function get_queried_object_id() {
		return 42;
	}
}

if ( ! function_exists( 'get_post' ) ) {
	function get_post( $id ) {
		global $wp_post_content;
		$post = new stdClass();
		$post->ID = $id;
		$post->post_content = $wp_post_content;
		return $post;
	}
}

if ( ! function_exists( 'doing_action' ) ) {
	function doing_action( $hook ) {
		global $wp_current_action;
		return $wp_current_action === $hook;
	}
}

if ( ! function_exists( 'parse_blocks' ) ) {
	function parse_blocks( $content ) {
		// Simple parser mock for testing inline style extraction
		if ( false !== strpos( $content, 'wp:gslider-blocks/image-slider' ) ) {
			return [
				[
					'blockName'   => 'gslider-blocks/image-slider',
					'attrs'       => [
						'blockId'    => 'slider-abc123',
						'blockStyle' => '.slider-abc123 { border-radius: 8px; }',
					],
					'innerBlocks' => [],
				],
			];
		}
		return [];
	}
}

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'current_time' ) ) {
	function current_time( $type ) {
		return '2026-10-15 18:00:00';
	}
}

// --------------------------------------------------------------------------
// Require Plugin Classes
// --------------------------------------------------------------------------

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/Classes/FontLoader.php';
require_once ABSPATH . 'includes/Classes/StyleGenerator.php';
require_once ABSPATH . 'includes/Admin/DashboardController.php';

use GSlider\Admin\DashboardController;
use GSlider\Classes\FontLoader;
use GSlider\Classes\StyleGenerator;

echo "=======================================================\n";
echo "Running GSlider Admin Settings & Privacy Tests\n";
echo "=======================================================\n";

$controller = DashboardController::getInstance();
$controller->register();
$controller->register_routes();

// --------------------------------------------------------------------------
// Test 1: Verify POST /gslider/v1/dashboard/settings route registration
// --------------------------------------------------------------------------
global $wp_rest_routes;
assert( isset( $wp_rest_routes['gslider/v1']['/dashboard/settings'] ), 'Route /dashboard/settings must be registered' );
$settings_route = $wp_rest_routes['gslider/v1']['/dashboard/settings'][0];
assert( $settings_route['methods'] === 'POST', 'Settings endpoint must accept POST requests' );
assert( is_callable( $settings_route['callback'] ), 'Settings route callback must be callable' );
assert( is_callable( $settings_route['permission_callback'] ), 'Settings route permission callback must be callable' );
echo "OK: Test 1 - POST /gslider/v1/dashboard/settings route registered successfully\n";

// --------------------------------------------------------------------------
// Test 2: Permission check blocks unauthorized users (401)
// --------------------------------------------------------------------------
global $current_caps;
$current_caps = []; // No manage_options
$req = new WP_REST_Request();
$perm_result = $controller->save_settings_permissions_check( $req );
assert( $perm_result instanceof WP_Error, 'Permission check must return WP_Error for non-admins' );
assert( $perm_result->get_error_code() === 'rest_forbidden', 'Error code must be rest_forbidden' );
assert( $perm_result->get_error_data()['status'] === 401, 'Status code must be 401' );
echo "OK: Test 2 - Permission check blocks unauthorized users with 401\n";

// --------------------------------------------------------------------------
// Test 3: Permission check allows administrators with manage_options
// --------------------------------------------------------------------------
$current_caps = [ 'manage_options' => true ];
$perm_result = $controller->save_settings_permissions_check( $req );
assert( $perm_result === true, 'Permission check must return true for manage_options' );
echo "OK: Test 3 - Permission check allows administrators with manage_options\n";

// --------------------------------------------------------------------------
// Test 4: Default settings are backward-compatible (privacy: false, delivery: 'file')
// --------------------------------------------------------------------------
delete_option( 'gslider_settings' );
$defaults = $controller->get_settings();
assert( $defaults['google_fonts_privacy'] === false, 'Default google_fonts_privacy must be false' );
assert( $defaults['css_delivery'] === 'file', 'Default css_delivery must be file' );
echo "OK: Test 4 - Default settings are backward-compatible (privacy: false, delivery: 'file')\n";

// --------------------------------------------------------------------------
// Test 5: GET /dashboard includes settings in response and schema
// --------------------------------------------------------------------------
$dashboard_res = $controller->get_item( new WP_REST_Request() );
$dashboard_data = $dashboard_res->get_data();
assert( isset( $dashboard_data['settings'] ), 'get_item must return settings object' );
assert( $dashboard_data['settings']['google_fonts_privacy'] === false, 'Dashboard settings must have default privacy false' );
assert( $dashboard_data['settings']['css_delivery'] === 'file', 'Dashboard settings must have default delivery file' );

$schema = $controller->get_item_schema();
assert( isset( $schema['properties']['settings'] ), 'Schema must define settings property' );
assert( $schema['properties']['settings']['type'] === 'object', 'Settings schema type must be object' );
echo "OK: Test 5 - GET /dashboard returns settings and schema defines settings property\n";

// --------------------------------------------------------------------------
// Test 6: save_settings persists valid privacy and css_delivery options
// --------------------------------------------------------------------------
$save_req = new WP_REST_Request( [
	'google_fonts_privacy' => true,
	'css_delivery'         => 'inline',
] );
$save_res = $controller->save_settings( $save_req );
$save_data = $save_res->get_data();

assert( $save_data['status'] === 'success', 'save_settings response status must be success' );
assert( $save_data['settings']['google_fonts_privacy'] === true, 'Saved privacy must be true' );
assert( $save_data['settings']['css_delivery'] === 'inline', 'Saved delivery must be inline' );

// Verify option in mock database
$stored_option = get_option( 'gslider_settings' );
assert( $stored_option['google_fonts_privacy'] === true, 'Option google_fonts_privacy must be true in DB' );
assert( $stored_option['css_delivery'] === 'inline', 'Option css_delivery must be inline in DB' );
echo "OK: Test 6 - save_settings persists settings to gslider_settings option\n";

// --------------------------------------------------------------------------
// Test 7: save_settings falls back to 'file' for invalid css_delivery values
// --------------------------------------------------------------------------
$invalid_req = new WP_REST_Request( [
	'css_delivery' => 'invalid_unsupported_mode',
] );
$controller->save_settings( $invalid_req );
$stored = $controller->get_settings();
assert( $stored['css_delivery'] === 'file', 'Invalid css_delivery must fallback to file' );
echo "OK: Test 7 - Invalid css_delivery values safely fallback to file\n";

// --------------------------------------------------------------------------
// Test 8: FontLoader privacy mode suppression
// --------------------------------------------------------------------------
$font_loader = FontLoader::getInstance();

// When privacy mode is off:
update_option( 'gslider_settings', [ 'google_fonts_privacy' => false ] );
assert( FontLoader::is_privacy_mode_enabled() === false, 'Privacy mode should be inactive' );

FontLoader::reset_collected_fonts();
$block_data = [
	'blockName' => 'gslider-blocks/image-slider',
	'attrs'     => [
		'titleFontFamily' => 'Roboto',
		'titleFontWeight' => '700',
	],
];
$font_loader->get_fonts_on_render_block( '<div>slider</div>', $block_data );

// Now enable privacy mode
update_option( 'gslider_settings', [ 'google_fonts_privacy' => true ] );
assert( FontLoader::is_privacy_mode_enabled() === true, 'Privacy mode should be active' );

// Reset styles and verify get_fonts_on_render_block returns unmodified and doesn't collect
FontLoader::reset_collected_fonts();
$out = $font_loader->get_fonts_on_render_block( '<div>slider</div>', $block_data );
assert( $out === '<div>slider</div>', 'get_fonts_on_render_block returns unmodified content' );

// Verify fonts_loader resets collection without errors
global $wp_styles;
$wp_styles = [];
$font_loader->fonts_loader();
assert( ! isset( $wp_styles['gslider-blocks-fonts'] ), 'Google Fonts stylesheet must NOT be registered when privacy is enabled' );
echo "OK: Test 8 - FontLoader suppresses Google Fonts requests when privacy mode is enabled\n";

// --------------------------------------------------------------------------
// Test 9: StyleGenerator delivery mode switching and inline style printing
// --------------------------------------------------------------------------
$style_gen = StyleGenerator::getInstance();

// When delivery is file:
update_option( 'gslider_settings', [ 'css_delivery' => 'file' ] );
assert( StyleGenerator::get_css_delivery_mode() === 'file', 'Delivery mode must be file' );

// In file mode, print_inline_styles does nothing
ob_start();
$style_gen->print_inline_styles();
$printed = ob_get_clean();
assert( empty( $printed ), 'print_inline_styles must output nothing in file mode' );

// When delivery is inline:
update_option( 'gslider_settings', [ 'css_delivery' => 'inline' ] );
assert( StyleGenerator::get_css_delivery_mode() === 'inline', 'Delivery mode must be inline' );

// Test print_inline_styles in wp_head
global $wp_post_content, $wp_current_action;
$wp_post_content = '<!-- wp:gslider-blocks/image-slider {"blockId":"slider-abc123","blockStyle":".slider-abc123 { border-radius: 8px; }"} -->';
$wp_current_action = 'wp_head';

StyleGenerator::reset_styles();
ob_start();
$style_gen->print_inline_styles();
$output = ob_get_clean();

assert( false !== strpos( $output, '<style id="gslider-blocks-dynamic-styles-inline">' ), 'Inline style tag must be printed' );
assert( false !== strpos( $output, '.slider-abc123' ), 'Sanitized block style must be inside inline style tag' );
assert( false !== strpos( $output, '</style>' ), 'Closing style tag must be present' );
echo "OK: Test 9 - StyleGenerator outputs sanitized inline <style> tag in wp_head when inline mode is active\n";

// --------------------------------------------------------------------------
// Test 10: In inline mode, generate_css_file and enqueue_dynamic_styles do not write or enqueue files
// --------------------------------------------------------------------------
global $wp_styles;
$wp_styles = [];
$style_gen->generate_css_file();
$style_gen->enqueue_dynamic_styles();
assert( empty( $wp_styles ), 'No stylesheet handles should be enqueued in inline mode' );
echo "OK: Test 10 - StyleGenerator skips file generation and enqueuing in inline mode\n";

// --------------------------------------------------------------------------
// Test 11: StyleGenerator deduplicates inline styles and never prints duplicate tags in footer
// --------------------------------------------------------------------------
StyleGenerator::reset_styles();
update_option( 'gslider_settings', [ 'css_delivery' => 'inline' ] );

// 1. In wp_head, styles for slider-abc123 are extracted and printed
$wp_post_content = '<!-- wp:gslider-blocks/image-slider {"blockId":"slider-abc123","blockStyle":".slider-abc123 { border-radius: 8px; }"} -->';
$wp_current_action = 'wp_head';

ob_start();
$style_gen->print_inline_styles();
$head_output = ob_get_clean();
assert( false !== strpos( $head_output, '.slider-abc123' ), 'Head output contains slider-abc123' );

// 2. During body render, render_block attempts to collect the same block's style
$wp_current_action = '';
$block_rendered = [
	'blockName' => 'gslider-blocks/image-slider',
	'attrs'     => [
		'blockId'    => 'slider-abc123',
		'blockStyle' => '.slider-abc123 { border-radius: 8px; }',
	],
];
$style_gen->collect_dynamic_styles( '<div>slider</div>', $block_rendered );

// 3. In wp_footer, print_inline_styles runs again. It must NOT print a duplicate tag!
$wp_current_action = 'wp_footer';
ob_start();
$style_gen->print_inline_styles();
$footer_output = ob_get_clean();

assert( empty( $footer_output ), 'Footer output must be completely empty since styles were already printed in head' );
echo "OK: Test 11 - StyleGenerator successfully deduplicates inline styles between wp_head and wp_footer\n";

// Reset options back to clean state
delete_option( 'gslider_settings' );
echo "\n=======================================================\n";
echo "All 11 Admin Settings & Privacy tests passed successfully!\n";
echo "=======================================================\n";
