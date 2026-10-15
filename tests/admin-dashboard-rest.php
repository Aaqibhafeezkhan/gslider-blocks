<?php
/**
 * Unit tests for GSlider\Admin\DashboardController and REST API endpoint.
 *
 * Verifies route registration, permission checks, transient caching,
 * SQL query structure, system metrics, and block status responses.
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

global $wp_actions, $wp_filters, $wp_rest_routes, $current_caps, $wp_transients, $wp_options, $wpdb;
$wp_actions     = [];
$wp_filters     = [];
$wp_rest_routes = [];
$current_caps   = [];
$wp_transients  = [];
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
		public function get_error_message() {
			return $this->message;
		}
		public function get_error_data() {
			return $this->data;
		}
	}
}

class MockWPDB {
	public $posts      = 'wp_posts';
	public $last_query = '';
	public $return_col = [];

	public function get_col( $query ) {
		$this->last_query = $query;
		return $this->return_col;
	}

	public function get_var( $query ) {
		$this->last_query = $query;
		return count( $this->return_col );
	}
}

$wpdb = new MockWPDB();

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

if ( ! function_exists( 'current_user_can' ) ) {
	function current_user_can( $capability ) {
		global $current_caps;
		return ! empty( $current_caps[ $capability ] );
	}
}

if ( ! function_exists( 'rest_authorization_required_code' ) ) {
	function rest_authorization_required_code() {
		return 401;
	}
}

if ( ! function_exists( 'rest_ensure_response' ) ) {
	function rest_ensure_response( $response ) {
		if ( $response instanceof WP_REST_Response ) {
			return $response;
		}
		return new WP_REST_Response( $response );
	}
}

if ( ! function_exists( 'get_transient' ) ) {
	function get_transient( $transient ) {
		global $wp_transients;
		return isset( $wp_transients[ $transient ] ) ? $wp_transients[ $transient ] : false;
	}
}

if ( ! function_exists( 'set_transient' ) ) {
	function set_transient( $transient, $value, $expiration = 0 ) {
		global $wp_transients;
		$wp_transients[ $transient ] = $value;
		return true;
	}
}

if ( ! function_exists( 'delete_transient' ) ) {
	function delete_transient( $transient ) {
		global $wp_transients;
		unset( $wp_transients[ $transient ] );
		return true;
	}
}

if ( ! function_exists( 'get_option' ) ) {
	function get_option( $option, $default = false ) {
		global $wp_options;
		return isset( $wp_options[ $option ] ) ? $wp_options[ $option ] : $default;
	}
}

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'get_bloginfo' ) ) {
	function get_bloginfo( $show = '' ) {
		return '6.7.1';
	}
}

// Load Composer Autoloader.
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

use GSlider\Admin\DashboardController;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

// Assertion helper.
function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
	echo "OK: {$message}\n";
}

// --------------------------------------------------------------------------
// Test 1: Class Interface and Singleton Implementation
// --------------------------------------------------------------------------
$controller = DashboardController::getInstance();
assert_true( $controller instanceof Registrable, 'DashboardController implements Registrable' );
assert_true( $controller instanceof WP_REST_Controller, 'DashboardController extends WP_REST_Controller' );
assert_true( $controller === DashboardController::getInstance(), 'DashboardController implements SingletonTrait correctly' );

// --------------------------------------------------------------------------
// Test 2: Hook Registration in register()
// --------------------------------------------------------------------------
$controller->register();

assert_true( ! empty( $wp_actions['rest_api_init'] ), 'DashboardController hooks into rest_api_init' );
assert_true( ! empty( $wp_actions['save_post'] ), 'DashboardController hooks into save_post' );
assert_true( ! empty( $wp_actions['deleted_post'] ), 'DashboardController hooks into deleted_post' );

$has_rest_hook = false;
foreach ( $wp_actions['rest_api_init'] as $action ) {
	if ( is_array( $action['callback'] ) && $action['callback'][0] === $controller && $action['callback'][1] === 'register_routes' ) {
		$has_rest_hook = true;
		break;
	}
}
assert_true( $has_rest_hook, 'register_routes callback registered on rest_api_init' );

// --------------------------------------------------------------------------
// Test 3: Route Registration
// --------------------------------------------------------------------------
$controller->register_routes();

assert_true( isset( $wp_rest_routes['gslider/v1']['/dashboard'] ), 'REST route /gslider/v1/dashboard is registered' );
$endpoint_config = $wp_rest_routes['gslider/v1']['/dashboard'][0];
assert_true( 'GET' === $endpoint_config['methods'], 'Endpoint method is GET' );
assert_true( is_callable( $endpoint_config['callback'] ), 'Endpoint callback is callable' );
assert_true( is_callable( $endpoint_config['permission_callback'] ), 'Endpoint permission_callback is callable' );

// --------------------------------------------------------------------------
// Test 4: Permissions Check (manage_options capability)
// --------------------------------------------------------------------------
$request = new WP_REST_Request();

// Case A: Unauthorized user (no manage_options).
$current_caps = [];
$perm_result  = $controller->get_item_permissions_check( $request );
assert_true( $perm_result instanceof WP_Error, 'Unauthorized user receives WP_Error' );
assert_true( 401 === $perm_result->get_error_data()['status'], 'Unauthorized user receives 401 status' );
assert_true( 'rest_forbidden' === $perm_result->get_error_code(), 'Unauthorized user receives rest_forbidden code' );

// Case B: Authorized user (has manage_options).
$current_caps['manage_options'] = true;
$perm_result                    = $controller->get_item_permissions_check( $request );
assert_true( true === $perm_result, 'Authorized administrator receives true for permissions check' );

// --------------------------------------------------------------------------
// Test 5: Sliders Count Query & Transient Caching
// --------------------------------------------------------------------------
$wp_transients = [];
// Mock 2 posts: Post 1 has 2 image sliders and 1 child item; Post 2 has 1 testimonial and 1 base slider.
// Total actual slider instances = 4 (excluding child items).
$wpdb->return_col = [
	'<!-- wp:gslider-blocks/image-slider {"blockId":"img-1"} /--> <p>Hello</p> <!-- wp:gslider-blocks/flexi-content-item /--> <!-- wp:gslider-blocks/image-slider {"blockId":"img-2"} /-->',
	'<!-- wp:gslider-blocks/testimonial {"blockId":"testi-1"} /--> <!-- wp:gslider-blocks/base {"blockId":"base-1"} /-->',
];

// Fetch count when transient is empty (triggers DB query).
$count = $controller->get_sliders_count();
assert_true( 4 === $count, 'get_sliders_count accurately counts total published slider blocks (4 instances across 2 posts)' );
assert_true( strpos( $wpdb->last_query, "post_status = 'publish'" ) !== false, 'Query filters strictly by publish status' );
assert_true( strpos( $wpdb->last_query, "post_type IN ('post', 'page')" ) !== false, 'Query filters strictly by post and page post_types' );
assert_true( strpos( $wpdb->last_query, "post_content LIKE '%wp:gslider-blocks/%'" ) !== false, 'Query matches GSlider block markup' );
assert_true( isset( $wp_transients['gslider_slider_count_cache'] ), 'Slider count is cached in gslider_slider_count_cache transient' );
assert_true( 4 === $wp_transients['gslider_slider_count_cache'], 'Transient holds correct count value' );

// Modify return_col to verify cached value is returned without hitting DB again.
$wpdb->return_col = [ '<!-- wp:gslider-blocks/base /-->' ];
$cached_count     = $controller->get_sliders_count();
assert_true( 4 === $cached_count, 'get_sliders_count returns cached transient value without re-querying DB' );

// Invalidate cache via flush_slider_count_cache().
$controller->flush_slider_count_cache();
assert_true( ! isset( $wp_transients['gslider_slider_count_cache'] ), 'flush_slider_count_cache clears the transient' );

// Next fetch should retrieve updated value (1 slider).
$refreshed_count = $controller->get_sliders_count();
assert_true( 1 === $refreshed_count, 'Refreshed fetch retrieves updated value after transient flush' );

// --------------------------------------------------------------------------
// Test 6: Block Status Listing & Disabling Toggle (Short slug & Prefixed name)
// --------------------------------------------------------------------------
$wp_options = [];
$blocks = $controller->get_blocks_status();
$expected_slugs = [ 'base', 'flexi-content', 'image-slider', 'logo-carousel', 'testimonial' ];
$actual_slugs   = array_column( $blocks, 'slug' );
assert_true( $expected_slugs === $actual_slugs, 'Block slugs match core specification in alphabetical order' );

foreach ( $blocks as $block ) {
	assert_true( true === $block['enabled'], "Block {$block['slug']} is enabled by default" );
	assert_true( ! empty( $block['name'] ), "Block {$block['slug']} has non-empty human name" );
}

// Test with disabled blocks using both short slug ('testimonial') and full block name ('gslider-blocks/base').
$wp_options['gslider_disabled_blocks'] = [ 'testimonial', 'gslider-blocks/base' ];
$blocks_with_disabled = $controller->get_blocks_status();
foreach ( $blocks_with_disabled as $block ) {
	if ( in_array( $block['slug'], [ 'testimonial', 'base' ], true ) ) {
		assert_true( false === $block['enabled'], "Disabled block {$block['slug']} has enabled => false" );
	} else {
		assert_true( true === $block['enabled'], "Active block {$block['slug']} has enabled => true" );
	}
}

// --------------------------------------------------------------------------
// Test 7: System Metrics Payload
// --------------------------------------------------------------------------
$system = $controller->get_system_metrics();
assert_true( isset( $system['php_version'] ) && PHP_VERSION === $system['php_version'], 'System metrics contains accurate PHP_VERSION' );
assert_true( isset( $system['wp_version'] ) && '6.7.1' === $system['wp_version'], 'System metrics contains accurate WP version' );
assert_true( isset( $system['memory_limit'] ) && ! empty( $system['memory_limit'] ), 'System metrics contains valid memory_limit' );

// --------------------------------------------------------------------------
// Test 8: Full Endpoint Response Payload Structure
// --------------------------------------------------------------------------
$wp_transients['gslider_slider_count_cache'] = 5;
$wp_options['gslider_disabled_blocks']       = [];

$response = $controller->get_item( $request );
assert_true( $response instanceof WP_REST_Response, 'get_item returns WP_REST_Response instance' );

$data = $response->get_data();
assert_true( 'success' === $data['status'], 'Response status is success' );
assert_true( '1.2.0' === $data['version'], 'Response version matches GSLIDER_VERSION' );
assert_true( 5 === $data['sliders_count'], 'Response sliders_count matches cached value' );
assert_true( is_array( $data['blocks'] ) && 5 === count( $data['blocks'] ), 'Response blocks has 5 block items' );
assert_true( is_array( $data['system'] ) && 3 === count( $data['system'] ), 'Response system has 3 metric fields' );

// --------------------------------------------------------------------------
// Test 9: REST Schema Definition
// --------------------------------------------------------------------------
$schema = $controller->get_item_schema();
assert_true( 'gslider_dashboard' === $schema['title'], 'Schema title is gslider_dashboard' );
assert_true( 'object' === $schema['type'], 'Schema type is object' );
assert_true( isset( $schema['properties']['status'] ), 'Schema includes status property' );
assert_true( isset( $schema['properties']['version'] ), 'Schema includes version property' );
assert_true( isset( $schema['properties']['sliders_count'] ), 'Schema includes sliders_count property' );
assert_true( isset( $schema['properties']['blocks'] ), 'Schema includes blocks property' );
assert_true( isset( $schema['properties']['system'] ), 'Schema includes system property' );

// --------------------------------------------------------------------------
// Test 10: Plugin Service Registration
// --------------------------------------------------------------------------
$plugin_reflection = new ReflectionClass( Plugin::class );
$services_property = $plugin_reflection->getProperty( 'services' );
if ( PHP_VERSION_ID < 80100 ) {
	$services_property->setAccessible( true );
}
$plugin_instance   = Plugin::getInstance();
$services_list     = $services_property->getValue( $plugin_instance );

assert_true( in_array( DashboardController::class, $services_list, true ), 'Plugin::$services array contains DashboardController::class' );

echo "\nAll DashboardController REST API tests passed successfully!\n";
