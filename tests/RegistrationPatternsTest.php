<?php
/**
 * Unit tests for GSlider\Classes\RegistrationPatterns.
 *
 * Verifies that:
 * 1. RegistrationPatterns implements Registrable interface and SingletonTrait.
 * 2. register() hooks into WordPress 'init'.
 * 3. register_patterns() registers the 'gslider-blocks' category.
 * 4. All curated starter patterns are registered with valid metadata and content.
 * 5. Plugin services array contains RegistrationPatterns::class.
 * 6. File-based directory architecture exists and contains bundled patterns.
 * 7. Every bundled pattern file has complete entries in get_pattern_translations().
 *
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

global $wp_actions, $wp_filters, $wp_block_patterns, $wp_pattern_categories;
$wp_actions            = [];
$wp_filters            = [];
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

if ( ! function_exists( 'apply_filters' ) ) {
	function apply_filters( $tag, $value ) {
		return $value;
	}
}

if ( ! function_exists( 'trailingslashit' ) ) {
	function trailingslashit( $string ) {
		return rtrim( $string, '/\\' ) . '/';
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

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'esc_html__' ) ) {
	function esc_html__( $text, $domain = 'default' ) {
		return $text;
	}
}

global $is_admin_mock;
$is_admin_mock = false;

if ( ! function_exists( 'is_admin' ) ) {
	function is_admin() {
		global $is_admin_mock;
		return (bool) $is_admin_mock;
	}
}

if ( ! function_exists( 'esc_url_raw' ) ) {
	function esc_url_raw( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'plugins_url' ) ) {
	function plugins_url( $path = '', $plugin = '' ) {
		return 'https://example.com/wp-content/plugins/gslider-blocks/' . ltrim( $path, '/' );
	}
}

if ( ! defined( 'GSLIDER_PLUGIN_URL' ) ) {
	define( 'GSLIDER_PLUGIN_URL', 'https://example.com/wp-content/plugins/gslider-blocks/' );
}

// Require Core Classes Under Test
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/RegistrationPatterns.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Classes\RegistrationPatterns;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for RegistrationPatterns.
 */
class RegistrationPatternsTest {

	/**
	 * Runs all unit test assertions for RegistrationPatterns.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider Blocks Patterns Registration Tests ===\n\n";

		$this->test_singleton_and_interface();
		$this->test_plugin_services_registration();
		$this->test_init_hook_registration();
		$this->test_pattern_and_category_registration();
		$this->test_curated_starter_patterns();
		$this->test_directory_architecture_and_translations();

		echo "\nAll GSlider Block Patterns Registration tests passed successfully!\n";
	}

	/**
	 * Test 1: Class Interface and Singleton Implementation.
	 *
	 * @return void
	 */
	public function test_singleton_and_interface(): void {
		$patterns = RegistrationPatterns::getInstance();
		if ( ! ( $patterns instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns implements Registrable interface\n";

		if ( $patterns !== RegistrationPatterns::getInstance() ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns does not follow Singleton pattern\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns follows Singleton pattern\n";
	}

	/**
	 * Test 2: Plugin services array contains RegistrationPatterns::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_registration(): void {
		$ref           = new ReflectionClass( Plugin::class );
		$services_prop = $ref->getProperty( 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$services_prop->setAccessible( true );
		}
		$services = $services_prop->getValue( Plugin::getInstance() );
		if ( ! in_array( RegistrationPatterns::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::services does not contain RegistrationPatterns::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin services array contains RegistrationPatterns::class\n";
	}

	/**
	 * Test 3: Hook into WordPress 'init'.
	 *
	 * @return void
	 */
	public function test_init_hook_registration(): void {
		global $wp_actions;
		$patterns   = RegistrationPatterns::getInstance();
		$patterns->register();
		$init_hooks = $wp_actions['init'] ?? [];
		$hook_found = false;

		foreach ( $init_hooks as $hook ) {
			if ( isset( $hook['callback'][0], $hook['callback'][1] ) &&
				$hook['callback'][0] === $patterns &&
				'register_patterns' === $hook['callback'][1] ) {
				$hook_found = true;
				break;
			}
		}

		if ( ! $hook_found ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns did not hook register_patterns into 'init'\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns hooks register_patterns into WordPress 'init'\n";
	}

	/**
	 * Test 4: Pattern & Category Registration on 'init' for Any Request Type.
	 *
	 * @return void
	 */
	public function test_pattern_and_category_registration(): void {
		global $wp_pattern_categories, $wp_block_patterns, $is_admin_mock;
		$is_admin_mock = false;
		$patterns      = RegistrationPatterns::getInstance();
		$patterns->register_patterns();

		if ( ! isset( $wp_pattern_categories['gslider-blocks'] ) ) {
			fwrite( STDERR, "FAIL: Block pattern category 'gslider-blocks' not registered on init hook\n" );
			exit( 1 );
		}
		if ( 'GSlider Blocks' !== $wp_pattern_categories['gslider-blocks']['label'] ) {
			fwrite( STDERR, "FAIL: Block pattern category label mismatch\n" );
			exit( 1 );
		}
		if ( empty( $wp_block_patterns ) ) {
			fwrite( STDERR, "FAIL: Patterns were not registered on init hook\n" );
			exit( 1 );
		}
		echo "OK: Patterns and categories are registered on 'init' for any request type\n";
	}

	/**
	 * Test 5: Verify Registered Curated Patterns.
	 *
	 * @return void
	 */
	public function test_curated_starter_patterns(): void {
		global $wp_block_patterns;
		$expected_patterns = [
			'gslider-blocks/full-width-hero-slider'       => [
				'slug'  => 'image-slider',
				'title' => 'Full-Width Hero Slider',
				'cat'   => 'header',
			],
			'gslider-blocks/product-showcase-carousel'    => [
				'slug'  => 'image-slider',
				'title' => 'E-commerce Product Showcase Carousel',
				'cat'   => 'gallery',
			],
			'gslider-blocks/social-proof-testimonial-cards' => [
				'slug'  => 'testimonial',
				'title' => 'Social Proof Testimonial Cards',
				'cat'   => 'testimonials',
			],
			'gslider-blocks/partner-brand-logo-carousel'  => [
				'slug'  => 'logo-carousel',
				'title' => 'Partner Brand Logo Carousel',
				'cat'   => 'clients',
			],
			'gslider-blocks/content-hero-slider'          => [
				'slug'  => 'base',
				'title' => 'Content Hero Slider',
				'cat'   => 'call-to-action',
			],
		];

		foreach ( $expected_patterns as $pattern_name => $expected ) {
			if ( ! isset( $wp_block_patterns[ $pattern_name ] ) ) {
				fwrite( STDERR, "FAIL: Expected pattern '$pattern_name' was not registered\n" );
				exit( 1 );
			}

			$pat = $wp_block_patterns[ $pattern_name ];

			if ( empty( $pat['title'] ) || $expected['title'] !== $pat['title'] ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' title mismatch\n" );
				exit( 1 );
			}

			if ( ! in_array( 'gslider-blocks', $pat['categories'], true ) ||
				! in_array( $expected['cat'], $pat['categories'], true ) ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' missing required categories\n" );
				exit( 1 );
			}

			if ( empty( $pat['keywords'] ) || ! is_array( $pat['keywords'] ) ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' has invalid or empty keywords\n" );
				exit( 1 );
			}

			$content          = $pat['content'];
			$expected_opening = '<!-- wp:gslider-blocks/' . $expected['slug'];
			$expected_closing = '<!-- /wp:gslider-blocks/' . $expected['slug'] . ' -->';

			if ( 0 !== strpos( $content, $expected_opening ) ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' content does not start with '$expected_opening'\n" );
				exit( 1 );
			}

			if ( substr( $content, -strlen( $expected_closing ) ) !== $expected_closing ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' content does not end with '$expected_closing'\n" );
				exit( 1 );
			}

			if ( false === strpos( $content, 'data-swiper-settings' ) ) {
				fwrite( STDERR, "FAIL: Pattern '$pattern_name' content missing 'data-swiper-settings' attribute\n" );
				exit( 1 );
			}

			echo "OK: Pattern '$pattern_name' verified (title, categories, keywords, and valid Gutenberg markup)\n";
		}
	}

	/**
	 * Test 6 & 7: Verify File-Based Directory Architecture & Translations.
	 *
	 * @return void
	 */
	public function test_directory_architecture_and_translations(): void {
		$patterns     = RegistrationPatterns::getInstance();
		$patterns_dir = $patterns->get_patterns_dir();

		if ( ! is_dir( $patterns_dir ) ) {
			fwrite( STDERR, "FAIL: Patterns directory '$patterns_dir' does not exist\n" );
			exit( 1 );
		}
		echo "OK: Patterns directory exists at $patterns_dir\n";

		$pattern_files = glob( $patterns_dir . '/*.php' );
		if ( count( $pattern_files ) < 5 ) {
			fwrite( STDERR, "FAIL: Expected at least 5 pattern files in '$patterns_dir', found " . count( $pattern_files ) . "\n" );
			exit( 1 );
		}

		$ref = new ReflectionMethod( $patterns, 'get_pattern_translations' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$translations = $ref->invoke( $patterns );

		foreach ( $pattern_files as $file ) {
			$slug = 'gslider-blocks/' . basename( $file, '.php' );
			if ( ! isset( $translations[ $slug ] ) ) {
				fwrite( STDERR, "FAIL: Bundled pattern file '" . basename( $file ) . "' has no entry in get_pattern_translations() for slug '$slug'\n" );
				exit( 1 );
			}
			if ( empty( $translations[ $slug ]['title'] ) || empty( $translations[ $slug ]['description'] ) || empty( $translations[ $slug ]['keywords'] ) ) {
				fwrite( STDERR, "FAIL: Bundled pattern '$slug' has incomplete translation metadata in get_pattern_translations()\n" );
				exit( 1 );
			}
		}
		echo "OK: All " . count( $pattern_files ) . " bundled pattern files have complete entries in get_pattern_translations()\n";
	}
}

// Standalone execution entrypoint
( new RegistrationPatternsTest() )->run_all_tests();
