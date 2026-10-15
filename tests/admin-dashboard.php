<?php
/**
 * Unit tests for GSlider\Admin\Dashboard and Plugin service registration.
 *
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

// Global test stubs.
$wp_actions      = [];
$wp_menu_pages   = [];
$current_caps    = [];

function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	global $wp_actions;
	$wp_actions[ $hook ][] = [
		'callback'      => $callback,
		'priority'      => $priority,
		'accepted_args' => $accepted_args,
	];
}

function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	global $wp_actions;
	$wp_actions[ $hook ][] = [
		'callback'      => $callback,
		'priority'      => $priority,
		'accepted_args' => $accepted_args,
	];
}

function add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $callback = '', $icon_url = '', $position = null ) {
	global $wp_menu_pages;
	$wp_menu_pages[] = [
		'page_title' => $page_title,
		'menu_title' => $menu_title,
		'capability' => $capability,
		'menu_slug'  => $menu_slug,
		'callback'   => $callback,
		'icon_url'   => $icon_url,
		'position'   => $position,
	];
	return 'toplevel_page_' . $menu_slug;
}

function current_user_can( $capability ) {
	global $current_caps;
	return ! empty( $current_caps[ $capability ] );
}

function esc_html__( $text, $domain = 'default' ) {
	return $text;
}

function __( $text, $domain = 'default' ) {
	return $text;
}

function is_admin() {
	return true;
}

require_once dirname( __DIR__ ) . '/vendor/autoload.php';

use GSlider\Admin\Dashboard;
use GSlider\Interfaces\Registrable;

// Test 1: Class exists and implements Registrable.
$dashboard = Dashboard::getInstance();
if ( ! ( $dashboard instanceof Registrable ) ) {
	fwrite( STDERR, "FAIL: Dashboard does not implement Registrable\n" );
	exit( 1 );
}
echo "OK: Dashboard implements Registrable\n";

// Test 2: Singleton guarantees identical instance.
if ( Dashboard::getInstance() !== $dashboard ) {
	fwrite( STDERR, "FAIL: Dashboard is not a true singleton\n" );
	exit( 1 );
}
echo "OK: Dashboard implements SingletonTrait correctly\n";

// Test 3: Constants match specifications.
if ( Dashboard::MENU_SLUG !== 'gslider-blocks' ) {
	fwrite( STDERR, "FAIL: Expected MENU_SLUG 'gslider-blocks', got " . Dashboard::MENU_SLUG . "\n" );
	exit( 1 );
}
if ( Dashboard::CAPABILITY !== 'manage_options' ) {
	fwrite( STDERR, "FAIL: Expected CAPABILITY 'manage_options', got " . Dashboard::CAPABILITY . "\n" );
	exit( 1 );
}
if ( Dashboard::MENU_POSITION !== 61 ) {
	fwrite( STDERR, "FAIL: Expected MENU_POSITION 61, got " . Dashboard::MENU_POSITION . "\n" );
	exit( 1 );
}
echo "OK: Dashboard constants verified (slug, capability, position)\n";

// Test 4: Hook registration.
$dashboard->register();
$has_admin_menu_hook = false;
foreach ( $wp_actions['admin_menu'] ?? [] as $hook_entry ) {
	if ( is_array( $hook_entry['callback'] ) && $hook_entry['callback'][0] === $dashboard && $hook_entry['callback'][1] === 'register_admin_menu' ) {
		$has_admin_menu_hook = true;
		break;
	}
}
if ( ! $has_admin_menu_hook ) {
	fwrite( STDERR, "FAIL: Dashboard register() did not hook into admin_menu\n" );
	exit( 1 );
}
echo "OK: Dashboard hooks into admin_menu\n";

// Test 5: add_menu_page call parameters.
$dashboard->register_admin_menu();
if ( empty( $wp_menu_pages ) ) {
	fwrite( STDERR, "FAIL: add_menu_page was not called\n" );
	exit( 1 );
}
$menu = end( $wp_menu_pages );
if ( $menu['menu_slug'] !== 'gslider-blocks' ) {
	fwrite( STDERR, "FAIL: Unexpected menu slug {$menu['menu_slug']}\n" );
	exit( 1 );
}
if ( $menu['capability'] !== 'manage_options' ) {
	fwrite( STDERR, "FAIL: Unexpected capability {$menu['capability']}\n" );
	exit( 1 );
}
if ( $menu['position'] !== 61 ) {
	fwrite( STDERR, "FAIL: Unexpected position {$menu['position']}\n" );
	exit( 1 );
}
if ( ! is_callable( $menu['callback'] ) ) {
	fwrite( STDERR, "FAIL: Menu callback is not callable\n" );
	exit( 1 );
}
echo "OK: add_menu_page parameters match specification\n";

// Test 6: SVG Icon format.
$icon = $dashboard->get_menu_icon();
if ( strpos( $icon, 'data:image/svg+xml;base64,' ) !== 0 ) {
	fwrite( STDERR, "FAIL: Icon is not a base64 SVG data URI\n" );
	exit( 1 );
}
$decoded_svg = base64_decode( substr( $icon, strlen( 'data:image/svg+xml;base64,' ) ) );
if ( strpos( $decoded_svg, '<svg' ) === false || strpos( $decoded_svg, '</svg>' ) === false ) {
	fwrite( STDERR, "FAIL: Decoded SVG is invalid XML\n" );
	exit( 1 );
}
echo "OK: Menu icon is valid base64-encoded SVG data URI\n";

// Test 7: Capability check blocks unauthorized users from outputting root container.
$current_caps = []; // No caps.
ob_start();
$dashboard->render_dashboard_page();
$unauthorized_output = ob_get_clean();
if ( ! empty( $unauthorized_output ) ) {
	fwrite( STDERR, "FAIL: Unauthorized user received output\n" );
	exit( 1 );
}
echo "OK: Unauthorized users receive zero output\n";

// Test 8: Authorized users receive root container markup.
$current_caps['manage_options'] = true;
ob_start();
$dashboard->render_dashboard_page();
$authorized_output = ob_get_clean();
if ( strpos( $authorized_output, 'id="gslider-admin-dashboard"' ) === false ) {
	fwrite( STDERR, "FAIL: Output missing id='gslider-admin-dashboard'\n" );
	exit( 1 );
}
if ( strpos( $authorized_output, 'class="wrap gslider-admin-wrap"' ) === false ) {
	fwrite( STDERR, "FAIL: Output missing class='wrap gslider-admin-wrap'\n" );
	exit( 1 );
}
echo "OK: Authorized user receives correct root mounting container\n";

// Test 9: Plugin services array contains Dashboard::class.
$plugin_reflection = new ReflectionClass( 'GSlider\Plugin' );
$services_prop = $plugin_reflection->getProperty( 'services' );
if ( PHP_VERSION_ID < 80100 ) {
	$services_prop->setAccessible( true );
}
$plugin_instance = \GSlider\Plugin::getInstance();
$services = $services_prop->getValue( $plugin_instance );
if ( ! in_array( Dashboard::class, $services, true ) ) {
	fwrite( STDERR, "FAIL: Dashboard::class is not in Plugin::services array\n" );
	exit( 1 );
}
echo "OK: Plugin services array contains Dashboard::class\n";

echo "All Admin Dashboard tests passed successfully!\n";
