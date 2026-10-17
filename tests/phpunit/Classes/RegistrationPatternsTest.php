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
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

global $is_admin_mock;
$is_admin_mock = false;

if ( ! function_exists( 'plugins_url' ) ) {
	function plugins_url( $path = '', $plugin = '' ) {
		return 'https://example.com/wp-content/plugins/gslider-blocks/' . ltrim( $path, '/' );
	}
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
 * Test class for GSlider\Classes\RegistrationPatterns.
 */
class RegistrationPatternsTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider Blocks Patterns Registration Tests ===\n\n";

		$this->test_implements_registrable_and_singleton();
		$this->test_plugin_services_contains_class();
		$this->test_register_hooks_into_init();
		$this->test_register_patterns_registers_category_and_patterns();
		$this->test_curated_starter_patterns();
		$this->test_directory_architecture_and_translations();

		echo "\nAll GSlider Block Patterns Registration tests passed successfully!\n";
	}

	/**
	 * Test 1 & 2: Verify RegistrationPatterns implements Registrable and follows Singleton pattern.
	 *
	 * @return void
	 */
	public function test_implements_registrable_and_singleton(): void {
		$patterns = RegistrationPatterns::getInstance();
		if ( ! ( $patterns instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns implements Registrable interface\n";

		$patterns_again = RegistrationPatterns::getInstance();
		if ( $patterns !== $patterns_again ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns getInstance() returned different instances\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns follows Singleton pattern\n";
	}

	/**
	 * Test 3: Verify Plugin services array includes RegistrationPatterns::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_class(): void {
		$plugin_reflection = new ReflectionClass( Plugin::class );
		$services_property = $plugin_reflection->getProperty( 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$services_property->setAccessible( true );
		}

		$plugin_instance = Plugin::getInstance();
		$services        = $services_property->getValue( $plugin_instance );

		if ( ! in_array( RegistrationPatterns::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns::class is not registered in Plugin::\$services\n" );
			exit( 1 );
		}
		echo "OK: Plugin services array contains RegistrationPatterns::class\n";
	}

	/**
	 * Test 4: Verify register() hooks into WordPress 'init'.
	 *
	 * @return void
	 */
	public function test_register_hooks_into_init(): void {
		global $wp_actions;
		$patterns = RegistrationPatterns::getInstance();
		$patterns->register();

		$has_init_hook = false;
		foreach ( $wp_actions['init'] ?? [] as $hook_entry ) {
			if (
				is_array( $hook_entry['callback'] ) &&
				$hook_entry['callback'][0] === $patterns &&
				$hook_entry['callback'][1] === 'register_patterns'
			) {
				$has_init_hook = true;
				break;
			}
		}

		if ( ! $has_init_hook ) {
			fwrite( STDERR, "FAIL: RegistrationPatterns::register() did not hook register_patterns into 'init'\n" );
			exit( 1 );
		}
		echo "OK: RegistrationPatterns hooks register_patterns into WordPress 'init'\n";
	}

	/**
	 * Test 5: Verify patterns and category registration.
	 *
	 * @return void
	 */
	public function test_register_patterns_registers_category_and_patterns(): void {
		global $wp_block_patterns, $wp_pattern_categories, $is_admin_mock;
		$patterns = RegistrationPatterns::getInstance();

		$wp_block_patterns     = [];
		$wp_pattern_categories = [];
		$is_admin_mock         = false;

		$patterns->register_patterns();

		if ( ! isset( $wp_pattern_categories['gslider-blocks'] ) ) {
			fwrite( STDERR, "FAIL: Pattern category 'gslider-blocks' was not registered\n" );
			exit( 1 );
		}

		$category_props = $wp_pattern_categories['gslider-blocks'];
		if ( empty( $category_props['label'] ) || $category_props['label'] !== 'GSlider Blocks' ) {
			fwrite( STDERR, "FAIL: Pattern category 'gslider-blocks' label mismatch\n" );
			exit( 1 );
		}

		if ( count( $wp_block_patterns ) < 5 ) {
			fwrite( STDERR, "FAIL: Expected at least 5 registered patterns, found " . count( $wp_block_patterns ) . "\n" );
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
