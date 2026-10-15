<?php
/**
 * Unit tests for GSlider block visibility filtering and toggle REST endpoint.
 *
 * Verifies that:
 * 1. POST /wp-json/gslider/v1/dashboard/toggle-block is registered and permissions are enforced.
 * 2. Toggling blocks updates gslider_disabled_blocks with full block names.
 * 3. Toggling flexi-content automatically ties flexi-content-item child dependency.
 * 4. allowed_block_types_all filter safely hides disabled blocks without unregistering them.
 * 5. All core WordPress blocks are preserved when allowed_block_types === true.
 *
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

if ( ! defined( 'GSLIDER_VERSION' ) ) {
	define( 'GSLIDER_VERSION', '1.2.0' );
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

if ( ! class_exists( 'WP_Block_Type_Registry' ) ) {
	class WP_Block_Type_Registry {
		private static $instance = null;
		private $registered_blocks = [];

		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		public function set_registered( array $blocks ) {
			$this->registered_blocks = $blocks;
		}

		public function get_all_registered() {
			return $this->registered_blocks;
		}
	}
}

function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	global $wp_actions;
	$wp_actions[ $hook ][] = [
		'callback'      => $callback,
		'priority'      => $priority,
		'accepted_args' => $accepted_args,
	];
}

function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	global $wp_filters;
	$wp_filters[ $hook ][] = [
		'callback'      => $callback,
		'priority'      => $priority,
		'accepted_args' => $accepted_args,
	];
}

function apply_filters( $tag, $value ) {
	return $value;
}

function register_rest_route( $namespace, $route, $args = [] ) {
	global $wp_rest_routes;
	$wp_rest_routes[ $namespace ][ $route ] = $args;
	return true;
}

function current_user_can( $capability ) {
	global $current_caps;
	return ! empty( $current_caps[ $capability ] );
}

function get_option( $option, $default = false ) {
	global $wp_options;
	return array_key_exists( $option, $wp_options ) ? $wp_options[ $option ] : $default;
}

function update_option( $option, $value, $autoload = null ) {
	global $wp_options;
	$wp_options[ $option ] = $value;
	return true;
}

function rest_ensure_response( $response ) {
	if ( $response instanceof WP_REST_Response ) {
		return $response;
	}
	return new WP_REST_Response( $response );
}

function rest_authorization_required_code() {
	return 401;
}

function sanitize_text_field( $str ) {
	return is_string( $str ) ? trim( strip_tags( $str ) ) : '';
}

function __( $text, $domain = 'default' ) {
	return $text;
}

require_once dirname( __DIR__ ) . '/vendor/autoload.php';

use GSlider\Admin\DashboardController;
use GSlider\Admin\Dashboard;

echo "--- Running Block Visibility & Toggle REST Tests ---\n";

// Test 1: Routes registered including /gslider/v1/dashboard/toggle-block.
$controller = DashboardController::getInstance();
$controller->register_routes();

global $wp_rest_routes;
if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard/toggle-block'] ) ) {
	fwrite( STDERR, "FAIL: /dashboard/toggle-block route not registered\n" );
	exit( 1 );
}
$toggle_route = $wp_rest_routes['gslider/v1']['/dashboard/toggle-block'][0];
if ( $toggle_route['methods'] !== 'POST' ) {
	fwrite( STDERR, "FAIL: Expected method POST for toggle-block, got: {$toggle_route['methods']}\n" );
	exit( 1 );
}
echo "OK: POST /gslider/v1/dashboard/toggle-block endpoint registered\n";

// Test 2: Permission check on toggle-block.
$current_caps = []; // Unauthorized.
$perm_result  = $controller->get_item_permissions_check( new WP_REST_Request() );
if ( ! ( $perm_result instanceof WP_Error ) || $perm_result->get_error_data()['status'] !== 401 ) {
	fwrite( STDERR, "FAIL: Unauthorized toggle request was not blocked with 401\n" );
	exit( 1 );
}
echo "OK: Unauthorized users cannot access toggle-block\n";

// Test 3: Authorized user toggles block off.
$current_caps['manage_options'] = true;
$wp_options['gslider_disabled_blocks'] = [];

$request  = new WP_REST_Request( [ 'slug' => 'logo-carousel', 'enabled' => false ] );
$response = $controller->toggle_block( $request );
$data     = $response->get_data();

if ( $data['status'] !== 'success' || $data['enabled'] !== false ) {
	fwrite( STDERR, "FAIL: Toggle response mismatch for disabling block\n" );
	exit( 1 );
}
if ( ! in_array( 'gslider-blocks/logo-carousel', $wp_options['gslider_disabled_blocks'], true ) ) {
	fwrite( STDERR, "FAIL: gslider_disabled_blocks option does not contain full block name 'gslider-blocks/logo-carousel'\n" );
	exit( 1 );
}
echo "OK: Toggling block off stores full block name in gslider_disabled_blocks\n";

// Test 4: Toggling flexi-content off automatically ties flexi-content-item.
$request  = new WP_REST_Request( [ 'slug' => 'gslider-blocks/flexi-content', 'enabled' => false ] );
$response = $controller->toggle_block( $request );
$data     = $response->get_data();

if ( ! in_array( 'gslider-blocks/flexi-content', $wp_options['gslider_disabled_blocks'], true ) ||
     ! in_array( 'gslider-blocks/flexi-content-item', $wp_options['gslider_disabled_blocks'], true ) ) {
	fwrite( STDERR, "FAIL: Disabling flexi-content did not automatically disable flexi-content-item\n" );
	exit( 1 );
}
echo "OK: Disabling flexi-content automatically disables child flexi-content-item\n";

// Test 5: Toggling flexi-content back on removes both.
$request  = new WP_REST_Request( [ 'slug' => 'flexi-content', 'enabled' => true ] );
$response = $controller->toggle_block( $request );
$data     = $response->get_data();

if ( in_array( 'gslider-blocks/flexi-content', $wp_options['gslider_disabled_blocks'], true ) ||
     in_array( 'gslider-blocks/flexi-content-item', $wp_options['gslider_disabled_blocks'], true ) ) {
	fwrite( STDERR, "FAIL: Enabling flexi-content did not remove both parent and child item\n" );
	exit( 1 );
}
echo "OK: Enabling flexi-content restores both parent and child item\n";

// Test 6: Toggling logo-carousel back on removes it.
$request  = new WP_REST_Request( [ 'slug' => 'logo-carousel', 'enabled' => true ] );
$response = $controller->toggle_block( $request );
if ( in_array( 'gslider-blocks/logo-carousel', $wp_options['gslider_disabled_blocks'], true ) ) {
	fwrite( STDERR, "FAIL: Enabling logo-carousel did not remove it from disabled list\n" );
	exit( 1 );
}
echo "OK: Enabling logo-carousel clears it from disabled list\n";

// Test 6b: Bulk deactivate all blocks with slug: 'all'.
$request  = new WP_REST_Request( [ 'slug' => 'all', 'enabled' => false ] );
$response = $controller->toggle_block( $request );
$data     = $response->get_data();
if ( count( $wp_options['gslider_disabled_blocks'] ) !== 6 ) {
	fwrite( STDERR, "FAIL: Deactivating all blocks did not add all 6 blocks to disabled list\n" );
	exit( 1 );
}
echo "OK: Bulk deactivating all blocks disables all 6 blocks\n";

// Test 6c: Bulk activate all blocks with slug: 'all'.
$request  = new WP_REST_Request( [ 'slug' => 'all', 'enabled' => true ] );
$response = $controller->toggle_block( $request );
if ( ! empty( $wp_options['gslider_disabled_blocks'] ) ) {
	fwrite( STDERR, "FAIL: Activating all blocks did not empty disabled list\n" );
	exit( 1 );
}
echo "OK: Bulk activating all blocks enables all blocks\n";

// Test 7: Dashboard hooks allowed_block_types_all.
$dashboard = Dashboard::getInstance();
$dashboard->register();

global $wp_filters;
$has_filter = false;
foreach ( $wp_filters['allowed_block_types_all'] ?? [] as $hook_entry ) {
	if ( is_array( $hook_entry['callback'] ) && $hook_entry['callback'][0] === $dashboard && $hook_entry['callback'][1] === 'filter_allowed_block_types' ) {
		$has_filter = true;
		break;
	}
}
if ( ! $has_filter ) {
	fwrite( STDERR, "FAIL: Dashboard register() did not hook into allowed_block_types_all\n" );
	exit( 1 );
}
echo "OK: Dashboard hooks into allowed_block_types_all filter\n";

// Test 8: Empty disabled list leaves allowed_block_types unchanged.
$wp_options['gslider_disabled_blocks'] = [];
$result = $dashboard->filter_allowed_block_types( true );
if ( true !== $result ) {
	fwrite( STDERR, "FAIL: Expected true when disabled list is empty\n" );
	exit( 1 );
}
echo "OK: Empty disabled list preserves default allowed_block_types value\n";

// Test 9: Safe filter when $allowed_block_types === true preserves core blocks and hides disabled GSlider blocks.
WP_Block_Type_Registry::get_instance()->set_registered( [
	'core/paragraph'               => true,
	'core/heading'                 => true,
	'core/image'                   => true,
	'gslider-blocks/base'          => true,
	'gslider-blocks/image-slider'  => true,
	'gslider-blocks/logo-carousel' => true,
] );
$wp_options['gslider_disabled_blocks'] = [ 'gslider-blocks/logo-carousel' ];

$filtered = $dashboard->filter_allowed_block_types( true );
if ( ! is_array( $filtered ) ) {
	fwrite( STDERR, "FAIL: Filtered result is not an array\n" );
	exit( 1 );
}
if ( in_array( 'gslider-blocks/logo-carousel', $filtered, true ) ) {
	fwrite( STDERR, "FAIL: Disabled block 'gslider-blocks/logo-carousel' was not filtered out\n" );
	exit( 1 );
}
if ( ! in_array( 'core/paragraph', $filtered, true ) || ! in_array( 'core/heading', $filtered, true ) || ! in_array( 'gslider-blocks/image-slider', $filtered, true ) ) {
	fwrite( STDERR, "FAIL: Core blocks were accidentally stripped by filter\n" );
	exit( 1 );
}
echo "OK: allowed_block_types_all preserves all core blocks and removes disabled GSlider block\n";

// Test 10: Safe filter when $allowed_block_types is an explicit array.
$custom_allowed = [
	'core/paragraph',
	'gslider-blocks/base',
	'gslider-blocks/logo-carousel',
];
$filtered_custom = $dashboard->filter_allowed_block_types( $custom_allowed );
if ( in_array( 'gslider-blocks/logo-carousel', $filtered_custom, true ) ) {
	fwrite( STDERR, "FAIL: Disabled block in custom array was not filtered\n" );
	exit( 1 );
}
if ( ! in_array( 'core/paragraph', $filtered_custom, true ) || ! in_array( 'gslider-blocks/base', $filtered_custom, true ) ) {
	fwrite( STDERR, "FAIL: Valid blocks in custom array were removed\n" );
	exit( 1 );
}
echo "OK: Array of allowed blocks correctly filtered\n";

echo "All Block Visibility & Toggle REST tests passed successfully!\n";
