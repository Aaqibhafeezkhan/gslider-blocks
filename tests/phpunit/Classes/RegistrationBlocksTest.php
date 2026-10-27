<?php
/**
 * Unit tests for GSlider\Classes\RegistrationBlocks.
 *
 * Verifies that:
 * 1. RegistrationBlocks implements Registrable interface and SingletonTrait.
 * 2. register() hooks into WordPress 'init'.
 * 3. Plugin services array contains RegistrationBlocks::class.
 * 4. On the real init order (vendor scripts at init:5, blocks at init:10) every block
 *    view-script handle gets 'defer' and the Swiper dependency, without enqueue_assets().
 * 5. register_blocks() registers Swiper itself, even when build/ is missing.
 * 6. Swiper dependency is not added if Swiper script is not registered.
 * 7. Swiper dependency is not duplicated if already present.
 *
 * Block registration uses temporary fixture block.json files, never the git-ignored build/ folder.
 *
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

// Require Core Classes Under Test.
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/RegistrationBlocks.php';
require_once ABSPATH . 'includes/Assets/FrontendAssets.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Classes\RegistrationBlocks;
use GSlider\Assets\FrontendAssets;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Classes\RegistrationBlocks.
 *
 * @package GSlider\Tests\Classes
 */
class RegistrationBlocksTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider RegistrationBlocks Unit Tests ===\n\n";

		$this->test_implements_registrable_and_singleton();
		$this->test_plugin_services_contains_class();
		$this->test_register_hooks();
		$this->test_init_order_registers_swiper_before_blocks();
		$this->test_view_script_defer_and_swiper_dependency();
		$this->test_register_blocks_registers_swiper_without_build();
		$this->test_swiper_dependency_not_added_when_unregistered();
		$this->test_swiper_dependency_not_duplicated();

		echo "\nAll RegistrationBlocks unit tests passed successfully!\n";
	}

	/**
	 * Block slugs used as fixtures.
	 *
	 * @var string[]
	 */
	private $slugs = [ 'base', 'flexi-content', 'image-slider', 'logo-carousel', 'testimonial' ];

	/**
	 * Temporary fixture build/blocks directory.
	 *
	 * @var string
	 */
	private $fixture_dir = '';

	/**
	 * Creates temporary block.json fixtures outside the plugin folder.
	 *
	 * @return string Fixture build/blocks path with trailing slash.
	 */
	private function fixture_build_dir(): string {
		if ( '' !== $this->fixture_dir ) {
			return $this->fixture_dir;
		}

		$dir = rtrim( sys_get_temp_dir(), '/' ) . '/gslider-blocks-fixture-' . getmypid() . '/';
		foreach ( $this->slugs as $slug ) {
			if ( ! is_dir( $dir . $slug ) ) {
				mkdir( $dir . $slug, 0777, true );
			}
			file_put_contents( $dir . $slug . '/block.json', json_encode( [ 'name' => "gslider-blocks/{$slug}" ] ) );
		}

		register_shutdown_function(
			static function () use ( $dir ) {
				foreach ( glob( $dir . '*/block.json' ) as $file ) {
					unlink( $file );
					rmdir( dirname( $file ) );
				}
				rmdir( $dir );
			}
		);

		$this->fixture_dir = $dir;
		return $dir;
	}

	/**
	 * Resets the mocked script registry.
	 *
	 * @return void
	 */
	private function reset_scripts(): void {
		global $wp_scripts, $wp_scripts_obj;
		$wp_scripts     = [];
		$wp_scripts_obj = new \WP_Scripts();
	}

	/**
	 * Calls the private register_single_block() method.
	 *
	 * @param string $build_dir Build directory.
	 * @param string $slug      Block slug.
	 * @return void
	 */
	private function register_single( string $build_dir, string $slug ): void {
		$method = new \ReflectionMethod( RegistrationBlocks::class, 'register_single_block' );
		if ( PHP_VERSION_ID < 80100 ) {
			$method->setAccessible( true );
		}
		$method->invoke( RegistrationBlocks::getInstance(), $build_dir, $slug );
	}

	/**
	 * Fails the test run with a message.
	 *
	 * @param string $message Failure message.
	 * @return void
	 */
	private function fail( string $message ): void {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}

	/**
	 * Test 1: Verify RegistrationBlocks implements Registrable and follows Singleton pattern.
	 *
	 * @return void
	 */
	public function test_implements_registrable_and_singleton(): void {
		$instance = RegistrationBlocks::getInstance();
		if ( ! ( $instance instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: RegistrationBlocks does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: RegistrationBlocks implements Registrable interface\n";

		$instance_again = RegistrationBlocks::getInstance();
		if ( $instance !== $instance_again ) {
			fwrite( STDERR, "FAIL: RegistrationBlocks does not maintain singleton identity\n" );
			exit( 1 );
		}
		echo "OK: RegistrationBlocks implements SingletonTrait correctly\n";
	}

	/**
	 * Test 2: Verify Plugin::$services array contains RegistrationBlocks::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_class(): void {
		$ref = new ReflectionProperty( Plugin::class, 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$services = $ref->getValue( Plugin::getInstance() );

		if ( ! in_array( RegistrationBlocks::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::\$services array does not contain RegistrationBlocks::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin::\$services contains RegistrationBlocks::class\n";
	}

	/**
	 * Test 3: Verify register() hooks register_blocks into 'init'.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_actions;

		$instance = RegistrationBlocks::getInstance();
		$instance->register();

		$has_hook = false;
		if ( ! empty( $wp_actions['init'] ) ) {
			foreach ( $wp_actions['init'] as $action ) {
				if ( is_array( $action['callback'] ) && $action['callback'][0] instanceof RegistrationBlocks && 'register_blocks' === $action['callback'][1] ) {
					$has_hook = true;
					break;
				}
			}
		}

		if ( ! $has_hook ) {
			fwrite( STDERR, "FAIL: RegistrationBlocks does not hook register_blocks into init\n" );
			exit( 1 );
		}
		echo "OK: RegistrationBlocks hooks into init action\n";
	}

	/**
	 * Test 4: Verify vendor scripts are hooked on init before blocks are registered.
	 *
	 * @return void
	 */
	public function test_init_order_registers_swiper_before_blocks(): void {
		global $wp_actions;

		FrontendAssets::getInstance()->register();

		$vendor_priority = null;
		$blocks_priority = null;
		foreach ( $wp_actions['init'] ?? [] as $action ) {
			if ( ! is_array( $action['callback'] ) ) {
				continue;
			}
			if ( $action['callback'][0] instanceof FrontendAssets && 'register_vendor_scripts' === $action['callback'][1] ) {
				$vendor_priority = $action['priority'];
			}
			if ( $action['callback'][0] instanceof RegistrationBlocks && 'register_blocks' === $action['callback'][1] ) {
				$blocks_priority = $action['priority'];
			}
		}

		if ( null === $vendor_priority || null === $blocks_priority || $vendor_priority >= $blocks_priority ) {
			$this->fail( 'register_vendor_scripts must run on init before register_blocks' );
		}
		echo "OK: Vendor scripts register on init:{$vendor_priority}, before blocks on init:{$blocks_priority}\n";
	}

	/**
	 * Test 5: Simulate init (vendor scripts, then blocks) and check every view-script handle.
	 *
	 * Does not call enqueue_assets() and does not use build/.
	 *
	 * @return void
	 */
	public function test_view_script_defer_and_swiper_dependency(): void {
		$this->reset_scripts();
		$build_dir = $this->fixture_build_dir();

		// init:5.
		FrontendAssets::getInstance()->register_vendor_scripts();

		// init:10.
		foreach ( $this->slugs as $slug ) {
			$this->register_single( $build_dir, $slug );
		}

		$scripts = wp_scripts();
		foreach ( $this->slugs as $slug ) {
			$handle = "gslider-blocks-{$slug}-view-script";

			if ( ! isset( $scripts->registered[ $handle ] ) ) {
				$this->fail( "Block view script '{$handle}' is not registered" );
			}

			$script_obj = $scripts->registered[ $handle ];
			if ( ( $script_obj->extra['strategy'] ?? null ) !== 'defer' ) {
				$this->fail( "Block view script '{$handle}' does not have strategy => defer" );
			}
			if ( ! in_array( 'gslider-blocks-swiper-script', $script_obj->deps, true ) ) {
				$this->fail( "Block view script '{$handle}' does not depend on gslider-blocks-swiper-script" );
			}
			if ( isset( $scripts->registered[ "gslider-{$slug}-view-script" ] ) ) {
				$this->fail( "Legacy handle gslider-{$slug}-view-script must not be registered" );
			}

			echo "OK: View script '{$handle}' has strategy => defer and Swiper in deps\n";
		}
	}

	/**
	 * Test 6: register_blocks() registers Swiper first, even when the build folder is missing.
	 *
	 * @return void
	 */
	public function test_register_blocks_registers_swiper_without_build(): void {
		$this->reset_scripts();

		RegistrationBlocks::getInstance()->register_blocks();

		if ( ! wp_script_is( 'gslider-blocks-swiper-script', 'registered' ) ) {
			$this->fail( 'register_blocks() did not register gslider-blocks-swiper-script' );
		}

		$args = wp_scripts()->registered['gslider-blocks-swiper-script']->args;
		if ( ! is_array( $args ) || empty( $args['in_footer'] ) || ( $args['strategy'] ?? null ) !== 'defer' ) {
			$this->fail( 'Swiper registered by register_blocks() is not deferred in the footer' );
		}
		echo "OK: register_blocks() registers deferred Swiper before any block\n";
	}

	/**
	 * Test 7: Verify Swiper dependency is NOT added if Swiper script is not registered.
	 *
	 * @return void
	 */
	public function test_swiper_dependency_not_added_when_unregistered(): void {

		$this->reset_scripts();

		// Register block view script without Swiper script registered.
		$handle = 'gslider-blocks-test-mock-view-script';
		wp_register_script( $handle, 'mock-view.js', [ 'dummy-dep' ] );

		// Simulate RegistrationBlocks logic via reflection.
		$instance = RegistrationBlocks::getInstance();
		$method   = new \ReflectionMethod( RegistrationBlocks::class, 'register_single_block' );
		if ( PHP_VERSION_ID < 80100 ) {
			$method->setAccessible( true );
		}

		// Use base block directory.
		$build_dir = $this->fixture_build_dir();

		$method->invoke( $instance, $build_dir, 'base' );

		$base_handle = 'gslider-blocks-base-view-script';
		$scripts     = wp_scripts();

		if ( in_array( 'gslider-blocks-swiper-script', $scripts->registered[ $base_handle ]->deps, true ) ) {
			fwrite( STDERR, "FAIL: Swiper was added to deps even though Swiper script was not registered\n" );
			exit( 1 );
		}
		echo "OK: Swiper dependency is not added when Swiper is not registered\n";
	}

	/**
	 * Test 8: Verify Swiper dependency is not duplicated if already present in deps.
	 *
	 * @return void
	 */
	public function test_swiper_dependency_not_duplicated(): void {
		$this->reset_scripts();
		FrontendAssets::getInstance()->register_vendor_scripts();

		$instance = RegistrationBlocks::getInstance();
		$method   = new \ReflectionMethod( RegistrationBlocks::class, 'register_single_block' );
		if ( PHP_VERSION_ID < 80100 ) {
			$method->setAccessible( true );
		}

		$build_dir = $this->fixture_build_dir();

		// Invoke multiple times.
		$method->invoke( $instance, $build_dir, 'base' );
		$method->invoke( $instance, $build_dir, 'base' );

		$base_handle = 'gslider-blocks-base-view-script';
		$scripts     = wp_scripts();

		$occurrences = array_count_values( $scripts->registered[ $base_handle ]->deps );
		if ( ( $occurrences['gslider-blocks-swiper-script'] ?? 0 ) !== 1 ) {
			fwrite( STDERR, "FAIL: Swiper dependency was duplicated in deps\n" );
			exit( 1 );
		}
		echo "OK: Swiper dependency is not duplicated when already present\n";
	}
}

// Standalone execution entrypoint.
( new RegistrationBlocksTest() )->run_all_tests();
