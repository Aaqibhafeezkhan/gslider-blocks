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

$enqueued_styles   = [];
$enqueued_scripts  = [];
$localized_scripts = [];

function wp_enqueue_style( $handle, $src = '', $deps = [], $ver = false, $media = 'all' ) {
	global $enqueued_styles;
	$enqueued_styles[ $handle ] = [
		'src'   => $src,
		'deps'  => $deps,
		'ver'   => $ver,
		'media' => $media,
	];
}

function wp_enqueue_script( $handle, $src = '', $deps = [], $ver = false, $in_footer = false ) {
	global $enqueued_scripts;
	$enqueued_scripts[ $handle ] = [
		'src'       => $src,
		'deps'      => $deps,
		'ver'       => $ver,
		'in_footer' => $in_footer,
	];
}

function wp_localize_script( $handle, $object_name, $l10n ) {
	global $localized_scripts;
	$localized_scripts[ $handle ][ $object_name ] = $l10n;
	return true;
}

function site_url( $path = '' ) {
	return 'http://example.org' . ( $path ? '/' . ltrim( $path, '/' ) : '' );
}

function admin_url( $path = '' ) {
	return 'http://example.org/wp-admin/' . ltrim( $path, '/' );
}

function rest_url( $path = '' ) {
	return 'http://example.org/wp-json/' . ltrim( $path, '/' );
}

function wp_create_nonce( $action = -1 ) {
	return 'mock_nonce_' . $action;
}

if ( ! defined( 'GSLIDER_PLUGIN_URL' ) ) {
	define( 'GSLIDER_PLUGIN_URL', 'http://example.org/wp-content/plugins/gslider-blocks/' );
}
if ( ! defined( 'GSLIDER_DIR_PATH' ) ) {
	define( 'GSLIDER_DIR_PATH', dirname( __DIR__ ) . '/' );
}
if ( ! defined( 'GSLIDER_VERSION' ) ) {
	define( 'GSLIDER_VERSION', '1.1.9' );
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

// Test 10: Hook registration for admin_enqueue_scripts.
$has_enqueue_hook = false;
foreach ( $wp_actions['admin_enqueue_scripts'] ?? [] as $hook_entry ) {
	if ( is_array( $hook_entry['callback'] ) && $hook_entry['callback'][0] === $dashboard && $hook_entry['callback'][1] === 'enqueue_dashboard_assets' ) {
		$has_enqueue_hook = true;
		break;
	}
}
if ( ! $has_enqueue_hook ) {
	fwrite( STDERR, "FAIL: Dashboard register() did not hook into admin_enqueue_scripts\n" );
	exit( 1 );
}
echo "OK: Dashboard hooks into admin_enqueue_scripts\n";

// Test 11: Screen hook suffix isolation.
$enqueued_styles   = [];
$enqueued_scripts  = [];
$localized_scripts = [];
$current_caps['manage_options'] = true;

$dashboard->enqueue_dashboard_assets( 'edit.php' );
$dashboard->enqueue_dashboard_assets( 'settings_page_general' );

if ( ! empty( $enqueued_styles ) || ! empty( $enqueued_scripts ) || ! empty( $localized_scripts ) ) {
	fwrite( STDERR, "FAIL: Assets were enqueued on non-dashboard screen hook\n" );
	exit( 1 );
}
echo "OK: Non-matching screen hooks do not enqueue any assets\n";

// Test 12: Capability check prevents asset enqueue for unauthorized users.
$current_caps = [];
$dashboard->enqueue_dashboard_assets( 'toplevel_page_gslider-blocks' );

if ( ! empty( $enqueued_styles ) || ! empty( $enqueued_scripts ) || ! empty( $localized_scripts ) ) {
	fwrite( STDERR, "FAIL: Assets were enqueued for unauthorized user\n" );
	exit( 1 );
}
echo "OK: Unauthorized users cannot trigger asset enqueueing on dashboard hook\n";

// Test 13: Asset enqueueing on matching hook suffix for authorized user.
$current_caps['manage_options'] = true;
$dashboard->enqueue_dashboard_assets( 'toplevel_page_gslider-blocks' );

if ( ! isset( $enqueued_styles['wp-components'] ) ) {
	fwrite( STDERR, "FAIL: wp-components style not enqueued\n" );
	exit( 1 );
}
if ( ! isset( $enqueued_styles['gslider-dashboard-style'] ) ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-style not enqueued\n" );
	exit( 1 );
}
$style = $enqueued_styles['gslider-dashboard-style'];
if ( $style['src'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/admin/css/dashboard.css' ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-style src mismatch\n" );
	exit( 1 );
}
if ( $style['deps'] !== [ 'wp-components' ] ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-style dependencies mismatch\n" );
	exit( 1 );
}
if ( $style['ver'] !== '1.1.9' ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-style version mismatch\n" );
	exit( 1 );
}

if ( ! isset( $enqueued_scripts['gslider-dashboard-script'] ) ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-script not enqueued\n" );
	exit( 1 );
}
$script = $enqueued_scripts['gslider-dashboard-script'];
if ( $script['src'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/admin/js/dashboard.js' ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-script src mismatch\n" );
	exit( 1 );
}
if ( empty( $script['in_footer'] ) ) {
	fwrite( STDERR, "FAIL: gslider-dashboard-script not enqueued in footer\n" );
	exit( 1 );
}
echo "OK: Dashboard style and script enqueued with correct attributes and dependencies\n";

// Test 14: Data localization on gslider-dashboard-script.
if ( ! isset( $localized_scripts['gslider-dashboard-script']['GSliderDashboardData'] ) ) {
	fwrite( STDERR, "FAIL: GSliderDashboardData not localized on gslider-dashboard-script\n" );
	exit( 1 );
}
$l10n = $localized_scripts['gslider-dashboard-script']['GSliderDashboardData'];
$expected_keys = [ 'siteUrl', 'adminUrl', 'ajaxUrl', 'restUrl', 'nonce', 'version', 'pluginUrl', 'assetsUrl' ];
foreach ( $expected_keys as $key ) {
	if ( ! array_key_exists( $key, $l10n ) ) {
		fwrite( STDERR, "FAIL: GSliderDashboardData missing key '$key'\n" );
		exit( 1 );
	}
}
if ( $l10n['siteUrl'] !== 'http://example.org' ) {
	fwrite( STDERR, "FAIL: Unexpected siteUrl {$l10n['siteUrl']}\n" );
	exit( 1 );
}
if ( $l10n['adminUrl'] !== 'http://example.org/wp-admin/' ) {
	fwrite( STDERR, "FAIL: Unexpected adminUrl {$l10n['adminUrl']}\n" );
	exit( 1 );
}
if ( $l10n['ajaxUrl'] !== 'http://example.org/wp-admin/admin-ajax.php' ) {
	fwrite( STDERR, "FAIL: Unexpected ajaxUrl {$l10n['ajaxUrl']}\n" );
	exit( 1 );
}
if ( $l10n['restUrl'] !== 'http://example.org/wp-json/gslider/v1/' ) {
	fwrite( STDERR, "FAIL: Unexpected restUrl {$l10n['restUrl']}\n" );
	exit( 1 );
}
if ( $l10n['nonce'] !== 'mock_nonce_wp_rest' ) {
	fwrite( STDERR, "FAIL: Unexpected nonce {$l10n['nonce']}\n" );
	exit( 1 );
}
if ( $l10n['version'] !== '1.1.9' ) {
	fwrite( STDERR, "FAIL: Unexpected version {$l10n['version']}\n" );
	exit( 1 );
}
if ( $l10n['pluginUrl'] !== 'http://example.org/wp-content/plugins/gslider-blocks/' ) {
	fwrite( STDERR, "FAIL: Unexpected pluginUrl {$l10n['pluginUrl']}\n" );
	exit( 1 );
}
if ( $l10n['assetsUrl'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/' ) {
	fwrite( STDERR, "FAIL: Unexpected assetsUrl {$l10n['assetsUrl']}\n" );
	exit( 1 );
}
echo "OK: GSliderDashboardData localized correctly with all 8 runtime configuration keys\n";

// Test 15: Compiled dashboard stylesheet exists and contains scoped layout rules.
$dashboard_css_file = dirname( __DIR__ ) . '/assets/admin/css/dashboard.css';
if ( ! file_exists( $dashboard_css_file ) ) {
	fwrite( STDERR, "FAIL: Compiled assets/admin/css/dashboard.css not found\n" );
	exit( 1 );
}
$dashboard_css_content = file_get_contents( $dashboard_css_file );
if ( strpos( $dashboard_css_content, 'body.toplevel_page_gslider-blocks' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.css missing scoped body.toplevel_page_gslider-blocks rule\n" );
	exit( 1 );
}
if ( strpos( $dashboard_css_content, '.gslider-dashboard-wrap' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.css missing .gslider-dashboard-wrap class\n" );
	exit( 1 );
}
if ( strpos( $dashboard_css_content, 'prefers-reduced-motion' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.css missing prefers-reduced-motion accessibility media query\n" );
	exit( 1 );
}
echo "OK: Compiled dashboard stylesheet verified (scoped selector, layout classes, reduced-motion)\n";

// Test 16: Compiled dashboard header component and styles verification.
$required_header_classes = [
	'.gslider-dashboard-header',
	'.gslider-dashboard-brand',
	'.gslider-dashboard-logo',
	'.gslider-dashboard-title',
	'.gslider-dashboard-version-pill',
	'.gslider-dashboard-actions',
	'.gslider-dashboard-btn',
];
foreach ( $required_header_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing header class '$class_name'\n" );
		exit( 1 );
	}
}
$dashboard_js_file = dirname( __DIR__ ) . '/assets/admin/js/dashboard.js';
if ( ! file_exists( $dashboard_js_file ) ) {
	fwrite( STDERR, "FAIL: Compiled assets/admin/js/dashboard.js not found\n" );
	exit( 1 );
}
$dashboard_js_content = file_get_contents( $dashboard_js_file );
if ( strpos( $dashboard_js_content, 'https://github.com/noruzzamans/gslider-blocks#readme' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.js missing documentation URL\n" );
	exit( 1 );
}
if ( strpos( $dashboard_js_content, 'https://wordpress.org/support/plugin/gslider-blocks/' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.js missing support forum URL\n" );
	exit( 1 );
}
echo "OK: Header component styles and resource URLs verified in compiled assets\n";

// Test 17: Compiled dashboard tabs navigation styles and state logic verification.
$dashboard_css_content = file_get_contents( $dashboard_css_file );
$dashboard_js_content  = file_get_contents( $dashboard_js_file );

$required_nav_classes = [
	'.gslider-dashboard-nav',
	'.gslider-dashboard-tabs',
	'.gslider-dashboard-tab',
	'.gslider-dashboard-tab-icon',
	'.gslider-dashboard-tab-label',
	'.gslider-dashboard-tab-badge',
	'.is-active',
];
foreach ( $required_nav_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing navigation class '$class_name'\n" );
		exit( 1 );
	}
}

$required_tabs = [ 'overview', 'blocks', 'settings', 'tools' ];
foreach ( $required_tabs as $tab_id ) {
	if ( strpos( $dashboard_js_content, $tab_id ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.js missing tab identifier '$tab_id'\n" );
		exit( 1 );
	}
}

if ( strpos( $dashboard_js_content, 'hashchange' ) === false ) {
	fwrite( STDERR, "FAIL: dashboard.js missing hashchange event listener\n" );
	exit( 1 );
}
echo "OK: Navigation tabs component styles and URL hash sync logic verified in compiled assets\n";

// Test 18: Compiled Overview tab, metric cards, and quickstart guide verification.
$required_card_classes = [
	'.gslider-dashboard-hero',
	'.gslider-dashboard-hero-title',
	'.gslider-dashboard-btn-primary',
	'.gslider-dashboard-metrics-grid',
	'.gslider-dashboard-metric-card',
	'.gslider-dashboard-metric-value',
	'.gslider-dashboard-quickstart',
	'.gslider-dashboard-steps-grid',
	'.gslider-dashboard-step-item',
	'.gslider-dashboard-skeleton',
];
foreach ( $required_card_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing card class '$class_name'\n" );
		exit( 1 );
	}
}

$required_overview_strings = [
	'/gslider/v1/dashboard',
	'post-new.php?post_type=page',
	'Sliders',
	'On published posts and pages',
	'Active Core Blocks',
	'Modern Architecture',
	'Create Your First Slider in 3 Simple Steps',
	'Pure Swiper.js + React runtime',
];
foreach ( $required_overview_strings as $str ) {
	if ( strpos( $dashboard_js_content, $str ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.js missing overview string '$str'\n" );
		exit( 1 );
	}
}

$asset_php_file = dirname( __DIR__ ) . '/assets/admin/js/dashboard.asset.php';
$asset_data     = require $asset_php_file;
if ( ! in_array( 'wp-api-fetch', $asset_data['dependencies'], true ) ) {
	fwrite( STDERR, "FAIL: dashboard.asset.php missing 'wp-api-fetch' dependency\n" );
	exit( 1 );
}
echo "OK: Overview tab hero, live metric cards, quickstart guide, and REST API integration verified\n";

// Test 19: Compiled Blocks Manager tab, iOS toggle switches, and REST sync verification.
$required_block_classes = [
	'.gslider-toggle-switch',
	'.gslider-toggle-track',
	'.gslider-toggle-thumb',
	'.gslider-dashboard-blocks-header',
	'.gslider-dashboard-blocks-title',
	'.gslider-dashboard-blocks-badge',
	'.gslider-dashboard-blocks-grid',
	'.gslider-dashboard-block-card',
	'.gslider-dashboard-block-icon',
	'.gslider-dashboard-block-status-tag',
	'.gslider-dashboard-toast',
];
foreach ( $required_block_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing block manager class '$class_name'\n" );
		exit( 1 );
	}
}

$required_block_strings = [
	'/gslider/v1/dashboard/toggle-block',
	'Core Slider Blocks',
	'Base Slider',
	'Flexi Content Slider',
	'Image Slider',
	'Logo Carousel',
	'Testimonial Slider',
	'Active',
	'Disabled',
];
foreach ( $required_block_strings as $str ) {
	if ( strpos( $dashboard_js_content, $str ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.js missing block manager string '$str'\n" );
		exit( 1 );
	}
}
echo "OK: Blocks Manager tab, iOS toggle switches, and REST endpoint integration verified\n";

// Test 20: Compiled Settings tab, GDPR font privacy, CSS delivery, and SVG security shield verification.
$required_settings_classes = [
	'.gslider-dashboard-settings-container',
	'.gslider-dashboard-settings-title',
	'.gslider-settings-card',
	'.gslider-settings-badge',
	'.gslider-settings-status-box',
	'.gslider-settings-radio-grid',
	'.gslider-settings-radio-card',
	'.gslider-settings-save-btn',
	'.gslider-settings-toast',
];
foreach ( $required_settings_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing settings class '$class_name'\n" );
		exit( 1 );
	}
}

$required_settings_strings = [
	'/gslider/v1/dashboard/settings',
	'Google Fonts Privacy Mode (GDPR)',
	'Dynamic CSS Delivery Method',
	'Generated External Stylesheet',
	'Direct Inline <style> in <head>',
	'SVG Upload Security Shield',
	'Active & Enforced',
	'Save Settings',
];
foreach ( $required_settings_strings as $str ) {
	if ( strpos( $dashboard_js_content, $str ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.js missing settings string '$str'\n" );
		exit( 1 );
	}
}
echo "OK: Settings tab, GDPR font privacy, CSS delivery preferences, and security shield verified\n";

// Test 21: Compiled Tools tab, Dynamic CSS cache purger, and System Report verification.
$required_tools_classes = [
	'.gslider-dashboard-tools-container',
	'.gslider-dashboard-tools-title',
	'.gslider-tools-card',
	'.gslider-tools-badge',
	'.gslider-tools-stats-grid',
	'.gslider-tools-stat-card',
	'.gslider-tools-action-btn',
	'.gslider-tools-system-grid',
	'.gslider-tools-report-container',
	'.gslider-tools-report-pre',
];
foreach ( $required_tools_classes as $class_name ) {
	if ( strpos( $dashboard_css_content, $class_name ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.css missing tools class '$class_name'\n" );
		exit( 1 );
	}
}

$required_tools_strings = [
	'/gslider/v1/dashboard/clear-cache',
	'/gslider/v1/dashboard/system-report',
	'Dynamic CSS Cache Purger',
	'Purge Dynamic CSS Cache',
	'System Status & Diagnostic Report',
	'Copy System Report',
	'Diagnostics Report Preview',
];
foreach ( $required_tools_strings as $str ) {
	if ( strpos( $dashboard_js_content, $str ) === false ) {
		fwrite( STDERR, "FAIL: dashboard.js missing tools string '$str'\n" );
		exit( 1 );
	}
}
echo "OK: Tools tab, dynamic CSS cache purger, and system diagnostic report exporter verified\n";

echo "All Admin Dashboard tests passed successfully!\n";
