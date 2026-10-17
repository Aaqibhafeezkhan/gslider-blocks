<?php
/**
 * PHPUnit test suite bootstrap for GSlider Blocks.
 *
 * Configures test environment constants, loads Composer PSR-4 autoloader,
 * and provides safe WordPress runtime stubs for standalone CLI and PHPUnit execution.
 *
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__, 2 ) . '/' );
}

if ( ! defined( 'GSLIDER_PLUGIN_URL' ) ) {
	define( 'GSLIDER_PLUGIN_URL', 'http://example.org/wp-content/plugins/gslider-blocks/' );
}

if ( ! defined( 'GSLIDER_DIR_PATH' ) ) {
	define( 'GSLIDER_DIR_PATH', dirname( __DIR__, 2 ) . '/' );
}

if ( ! defined( 'GSLIDER_VERSION' ) ) {
	define( 'GSLIDER_VERSION', '1.1.9' );
}

// Global state registries.
global $wp_actions, $wp_filters, $wp_menu_pages, $current_caps, $enqueued_styles, $enqueued_scripts, $localized_scripts, $wp_block_patterns, $wp_pattern_categories;
$wp_actions            = [];
$wp_filters            = [];
$wp_menu_pages         = [];
$current_caps          = [];
$enqueued_styles       = [];
$enqueued_scripts      = [];
$localized_scripts     = [];
$wp_block_patterns     = [];
$wp_pattern_categories = [];

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
	function apply_filters( $tag, $value ) {
		return $value;
	}
}

if ( ! function_exists( 'do_action' ) ) {
	function do_action( $tag, ...$args ) {
		// Mock do_action.
	}
}

if ( ! function_exists( 'trailingslashit' ) ) {
	function trailingslashit( $string ) {
		return rtrim( $string, '/\\' ) . '/';
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

if ( ! function_exists( '_e' ) ) {
	function _e( $text, $domain = 'default' ) {
		echo $text;
	}
}

if ( ! function_exists( 'esc_attr__' ) ) {
	function esc_attr__( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'esc_url_raw' ) ) {
	function esc_url_raw( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'is_admin' ) ) {
	function is_admin() {
		global $is_admin_mock;
		return isset( $is_admin_mock ) ? (bool) $is_admin_mock : true;
	}
}

if ( ! function_exists( 'site_url' ) ) {
	function site_url( $path = '' ) {
		return 'http://example.org' . ( $path ? '/' . ltrim( $path, '/' ) : '' );
	}
}

if ( ! function_exists( 'admin_url' ) ) {
	function admin_url( $path = '' ) {
		return 'http://example.org/wp-admin/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'rest_url' ) ) {
	function rest_url( $path = '' ) {
		return 'http://example.org/wp-json/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'wp_create_nonce' ) ) {
	function wp_create_nonce( $action = -1 ) {
		return 'mock_nonce_' . $action;
	}
}

if ( ! function_exists( 'current_user_can' ) ) {
	function current_user_can( $capability ) {
		global $current_caps;
		return ! empty( $current_caps[ $capability ] );
	}
}

if ( ! function_exists( 'wp_enqueue_style' ) ) {
	function wp_enqueue_style( $handle, $src = '', $deps = [], $ver = false, $media = 'all' ) {
		global $enqueued_styles;
		$enqueued_styles[ $handle ] = [
			'src'   => $src,
			'deps'  => $deps,
			'ver'   => $ver,
			'media' => $media,
		];
	}
}

if ( ! function_exists( 'wp_enqueue_script' ) ) {
	function wp_enqueue_script( $handle, $src = '', $deps = [], $ver = false, $in_footer = false ) {
		global $enqueued_scripts;
		$enqueued_scripts[ $handle ] = [
			'src'       => $src,
			'deps'      => $deps,
			'ver'       => $ver,
			'in_footer' => $in_footer,
		];
	}
}

if ( ! function_exists( 'wp_localize_script' ) ) {
	function wp_localize_script( $handle, $object_name, $l10n ) {
		global $localized_scripts;
		$localized_scripts[ $handle ][ $object_name ] = $l10n;
		return true;
	}
}

if ( ! function_exists( 'add_menu_page' ) ) {
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
}

if ( ! function_exists( 'register_block_pattern_category' ) ) {
	function register_block_pattern_category( $category_name, $category_properties ) {
		global $wp_pattern_categories;
		$wp_pattern_categories[ $category_name ] = $category_properties;
		return true;
	}
}

if ( ! function_exists( 'register_block_pattern' ) ) {
	function register_block_pattern( $pattern_name, $pattern_properties ) {
		global $wp_block_patterns;
		$wp_block_patterns[ $pattern_name ] = $pattern_properties;
		return true;
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	function wp_strip_all_tags( $text, $remove_breaks = false ) {
		$text = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', (string) $text );
		$text = strip_tags( $text );
		if ( $remove_breaks ) {
			$text = preg_replace( '/[\r\n\t ]+/', ' ', $text );
		}
		return trim( $text );
	}
}

if ( ! function_exists( 'wp_kses_post' ) ) {
	function wp_kses_post( $text ) {
		return (string) $text;
	}
}

if ( ! function_exists( 'render_block' ) ) {
	function render_block( $block ) {
		return '<p>flexi</p>';
	}
}

// Composer autoloader.
$gslider_autoloader = dirname( __DIR__, 2 ) . '/vendor/autoload.php';
if ( file_exists( $gslider_autoloader ) ) {
	require_once $gslider_autoloader;
}
