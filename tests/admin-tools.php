<?php
/**
 * Unit tests for GSlider Tools Tab: Dynamic CSS Cache Purger & System Diagnostics Report.
 *
 * Verifies that:
 * 1. POST /wp-json/gslider/v1/dashboard/clear-cache is registered and capability checks are enforced.
 * 2. GET /wp-json/gslider/v1/dashboard/system-report is registered and capability checks are enforced.
 * 3. StyleGenerator::clear_dynamic_css_cache() deletes only gslider-blocks-dynamic-styles-*.min.css
 *    and preserves non-matching files and subdirectories.
 * 4. StyleGenerator::get_cache_stats() reports accurate file count and size.
 * 5. GET /wp-json/gslider/v1/dashboard includes 'cache' object matching schema.
 * 6. System report generator strictly sanitizes environment data, preventing path or credential leaks.
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

global $wp_actions, $wp_filters, $wp_rest_routes, $current_caps, $wp_options;
$wp_actions     = [];
$wp_filters     = [];
$wp_rest_routes = [];
$current_caps   = [];
$wp_options     = [];

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

if ( ! function_exists( 'esc_html__' ) ) {
	function esc_html__( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'rest_authorization_required_code' ) ) {
	function rest_authorization_required_code() {
		return 401;
	}
}

if ( ! function_exists( '_n' ) ) {
	function _n( $single, $plural, $number, $domain = 'default' ) {
		return 1 === (int) $number ? $single : $plural;
	}
}

if ( ! function_exists( 'wp_get_theme' ) ) {
	function wp_get_theme() {
		return new class {
			public function exists() {
				return true;
			}
			public function get( $header ) {
				if ( 'Name' === $header ) {
					return 'Twenty Twenty-Four';
				}
				if ( 'Version' === $header ) {
					return '1.0';
				}
				return '';
			}
			public function parent() {
				return false;
			}
		};
	}
}

if ( ! function_exists( 'wp_upload_dir' ) ) {
	function wp_upload_dir() {
		return [
			'basedir' => '/tmp/wp-test-gslider-uploads',
			'baseurl' => 'https://example.com/wp-content/uploads',
		];
	}
}

if ( ! function_exists( 'wp_mkdir_p' ) ) {
	function wp_mkdir_p( $dir ) {
		return is_dir( $dir ) || mkdir( $dir, 0777, true );
	}
}

if ( ! function_exists( 'WP_Filesystem' ) ) {
	function WP_Filesystem() {
		global $wp_filesystem;
		if ( empty( $wp_filesystem ) ) {
			$wp_filesystem = new class {
				public function delete( $file ) {
					return @unlink( $file );
				}
			};
		}
		return true;
	}
}

if ( ! function_exists( 'current_time' ) ) {
	function current_time( $type ) {
		return '2026-10-15 18:00:00';
	}
}

// --------------------------------------------------------------------------
// Autoload Classes Under Test
// --------------------------------------------------------------------------

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/Classes/StyleGenerator.php';
require_once ABSPATH . 'includes/Admin/DashboardController.php';

use GSlider\Classes\StyleGenerator;
use GSlider\Admin\DashboardController;

echo "=== GSlider Blocks Admin Tools & Cache Purger Tests ===\n\n";

// Test 1: Verify REST API Route Registration for /clear-cache and /system-report
$controller = DashboardController::getInstance();
$controller->register_routes();

if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard/clear-cache'] ) ) {
	fwrite( STDERR, "FAIL: Route '/dashboard/clear-cache' is not registered\n" );
	exit( 1 );
}
$clear_cache_route = $wp_rest_routes['gslider/v1']['/dashboard/clear-cache'][0];
if ( 'POST' !== $clear_cache_route['methods'] ) {
	fwrite( STDERR, "FAIL: Route '/dashboard/clear-cache' method is not POST\n" );
	exit( 1 );
}
echo "OK: POST /wp-json/gslider/v1/dashboard/clear-cache registered correctly\n";

if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard/system-report'] ) ) {
	fwrite( STDERR, "FAIL: Route '/dashboard/system-report' is not registered\n" );
	exit( 1 );
}
$system_report_route = $wp_rest_routes['gslider/v1']['/dashboard/system-report'][0];
if ( 'GET' !== $system_report_route['methods'] ) {
	fwrite( STDERR, "FAIL: Route '/dashboard/system-report' method is not GET\n" );
	exit( 1 );
}
echo "OK: GET /wp-json/gslider/v1/dashboard/system-report registered correctly\n";

// Test 2: Permission Checks for Tools Endpoints
$current_caps = []; // Non-authenticated / non-admin user
$request      = new WP_REST_Request();

$check_cache = $controller->get_item_permissions_check( $request );
if ( ! ( $check_cache instanceof WP_Error ) || 401 !== $check_cache->get_error_data()['status'] ) {
	fwrite( STDERR, "FAIL: Unauthorized user was not blocked from tools endpoints (status 401 expected)\n" );
	exit( 1 );
}

$current_caps = [ 'manage_options' => true ]; // Administrator
$check_admin  = $controller->get_item_permissions_check( $request );
if ( true !== $check_admin ) {
	fwrite( STDERR, "FAIL: Administrator with 'manage_options' was rejected from tools endpoints\n" );
	exit( 1 );
}
echo "OK: Permissions check enforces 'manage_options' on clear-cache and system-report endpoints\n";

// Test 3: StyleGenerator::clear_dynamic_css_cache() Surgical File Purging
$test_upload_dir = sys_get_temp_dir() . '/gslider-test-purge-' . uniqid();
$test_css_dir    = $test_upload_dir . '/gslider-blocks/css';
mkdir( $test_css_dir, 0777, true );

// Create matching generated dynamic CSS files
file_put_contents( $test_css_dir . '/gslider-blocks-dynamic-styles-1.min.css', '.gslider-test-1{color:red;}' );
file_put_contents( $test_css_dir . '/gslider-blocks-dynamic-styles-42.min.css', '.gslider-test-42{color:blue;}' );
file_put_contents( $test_css_dir . '/gslider-blocks-dynamic-styles-global.min.css', '.gslider-test-global{color:green;}' );

// Create non-matching files that MUST NOT be touched
file_put_contents( $test_css_dir . '/custom-theme-styles.css', '/* preserve this */' );
file_put_contents( $test_css_dir . '/other-plugin-asset.min.css', '/* preserve this */' );
mkdir( $test_css_dir . '/subfolder' );
file_put_contents( $test_css_dir . '/subfolder/nested.css', '/* preserve nested */' );

$style_gen = StyleGenerator::getInstance();
// Use reflection to point css_dir to test directory
$ref = new ReflectionClass( $style_gen );
$css_dir_prop = $ref->getProperty( 'css_dir' );
if ( PHP_VERSION_ID < 80100 ) {
	$css_dir_prop->setAccessible( true );
}
$css_dir_prop->setValue( $style_gen, $test_css_dir );

$deleted_files_count = $style_gen->clear_dynamic_css_cache();
if ( 3 !== $deleted_files_count ) {
	fwrite( STDERR, "FAIL: clear_dynamic_css_cache() expected to delete 3 files, got $deleted_files_count\n" );
	exit( 1 );
}

// Verify dynamic files were deleted
if ( file_exists( $test_css_dir . '/gslider-blocks-dynamic-styles-1.min.css' ) ||
     file_exists( $test_css_dir . '/gslider-blocks-dynamic-styles-42.min.css' ) ||
     file_exists( $test_css_dir . '/gslider-blocks-dynamic-styles-global.min.css' ) ) {
	fwrite( STDERR, "FAIL: Dynamic CSS files were not deleted by clear_dynamic_css_cache()\n" );
	exit( 1 );
}

// Verify non-matching files were safely PRESERVED
if ( ! file_exists( $test_css_dir . '/custom-theme-styles.css' ) ||
     ! file_exists( $test_css_dir . '/other-plugin-asset.min.css' ) ||
     ! is_dir( $test_css_dir . '/subfolder' ) ||
     ! file_exists( $test_css_dir . '/subfolder/nested.css' ) ) {
	fwrite( STDERR, "FAIL: Non-matching files or subfolders were improperly deleted by cache purger\n" );
	exit( 1 );
}
echo "OK: clear_dynamic_css_cache() deleted 3 matching files and preserved non-matching files/directories\n";

// Test 4: StyleGenerator::get_cache_stats()
$empty_stats = $style_gen->get_cache_stats();
if ( 0 !== $empty_stats['files_count'] || 0 !== $empty_stats['total_size_bytes'] || '0 KB' !== $empty_stats['total_size_formatted'] ) {
	fwrite( STDERR, "FAIL: get_cache_stats() on empty cache returned incorrect values\n" );
	exit( 1 );
}

// Add a test file and verify stats calculation
file_put_contents( $test_css_dir . '/gslider-blocks-dynamic-styles-99.min.css', str_repeat( 'a', 2048 ) );
$populated_stats = $style_gen->get_cache_stats();
if ( 1 !== $populated_stats['files_count'] || 2048 !== $populated_stats['total_size_bytes'] || '2 KB' !== $populated_stats['total_size_formatted'] ) {
	fwrite( STDERR, "FAIL: get_cache_stats() returned incorrect file count or size calculations\n" );
	exit( 1 );
}

// Clean up test file
$style_gen->clear_dynamic_css_cache();
unlink( $test_css_dir . '/custom-theme-styles.css' );
unlink( $test_css_dir . '/other-plugin-asset.min.css' );
unlink( $test_css_dir . '/subfolder/nested.css' );
rmdir( $test_css_dir . '/subfolder' );
rmdir( $test_css_dir );
rmdir( $test_upload_dir . '/gslider-blocks' );
rmdir( $test_upload_dir );
echo "OK: get_cache_stats() accurately calculates file counts and human-readable byte sizes\n";

// Test 5: DashboardController::clear_cache() REST Endpoint Response
$clear_response = $controller->clear_cache( new WP_REST_Request() );
if ( ! ( $clear_response instanceof WP_REST_Response ) || 200 !== $clear_response->get_status() ) {
	fwrite( STDERR, "FAIL: clear_cache() REST endpoint did not return HTTP 200\n" );
	exit( 1 );
}
$clear_data = $clear_response->get_data();
if ( 'success' !== $clear_data['status'] || ! isset( $clear_data['deleted_files'] ) ) {
	fwrite( STDERR, "FAIL: clear_cache() response missing 'status' or 'deleted_files'\n" );
	exit( 1 );
}
echo "OK: clear_cache() endpoint returns HTTP 200 with success status and deleted files count\n";

// Test 6: DashboardController::get_system_report() REST Endpoint & Security Sanitization
$report_response = $controller->get_system_report( new WP_REST_Request() );
if ( ! ( $report_response instanceof WP_REST_Response ) || 200 !== $report_response->get_status() ) {
	fwrite( STDERR, "FAIL: get_system_report() REST endpoint did not return HTTP 200\n" );
	exit( 1 );
}
$report_data = $report_response->get_data();
if ( 'success' !== $report_data['status'] || empty( $report_data['data']['formatted_text'] ) ) {
	fwrite( STDERR, "FAIL: get_system_report() response missing formatted_text\n" );
	exit( 1 );
}

$formatted_text = $report_data['data']['formatted_text'];

// Crucial Security Checks: Ensure no server filesystem root paths or sensitive credentials leak
$sensitive_patterns = [
	'/Users/',
	'/home/',
	'/var/www/',
	'DB_PASSWORD',
	'DB_USER',
	'AUTH_KEY',
	'SECURE_AUTH_KEY',
];
foreach ( $sensitive_patterns as $pattern ) {
	if ( stripos( $formatted_text, $pattern ) !== false ) {
		fwrite( STDERR, "FAIL: System diagnostic report leaked sensitive pattern '$pattern'\n" );
		exit( 1 );
	}
}

// Verify required report sections exist
$required_sections = [
	'GSlider Blocks System Diagnostics Report',
	'WordPress Environment',
	'GSlider Blocks Version',
	'WordPress Version',
	'Active Theme',
	'Server Environment',
	'PHP Version',
	'Dynamic CSS Delivery',
	'Google Fonts Privacy',
];
foreach ( $required_sections as $sec ) {
	if ( stripos( $formatted_text, $sec ) === false ) {
		fwrite( STDERR, "FAIL: System diagnostic report missing section or metric '$sec'\n" );
		exit( 1 );
	}
}
echo "OK: System report generated cleanly with all required metrics and zero path/credential leaks\n";

// Test 7: DashboardController::get_item() and get_item_schema() include 'cache' object
$schema = $controller->get_item_schema();
if ( ! isset( $schema['properties']['cache'] ) ) {
	fwrite( STDERR, "FAIL: get_item_schema() missing 'cache' property definition\n" );
	exit( 1 );
}
if ( ! isset( $schema['properties']['cache']['properties']['files_count'] ) ||
     ! isset( $schema['properties']['cache']['properties']['total_size_formatted'] ) ) {
	fwrite( STDERR, "FAIL: get_item_schema() 'cache' property missing required child schemas\n" );
	exit( 1 );
}

$dashboard_response = $controller->get_item( new WP_REST_Request() );
$dashboard_data     = $dashboard_response->get_data();
if ( ! isset( $dashboard_data['cache'] ) || ! is_array( $dashboard_data['cache'] ) ) {
	fwrite( STDERR, "FAIL: GET /dashboard response missing 'cache' object\n" );
	exit( 1 );
}
if ( ! array_key_exists( 'files_count', $dashboard_data['cache'] ) ||
     ! array_key_exists( 'total_size_formatted', $dashboard_data['cache'] ) ) {
	fwrite( STDERR, "FAIL: GET /dashboard 'cache' object missing 'files_count' or 'total_size_formatted'\n" );
	exit( 1 );
}
echo "OK: GET /dashboard includes 'cache' object matching schema specifications\n";

echo "\nAll GSlider Tools & Cache Purger tests passed successfully!\n";
