<?php
/**
 * Native Gutenberg block pattern registration for GSlider Blocks.
 *
 * Dynamically registers curated block pattern templates from the patterns/
 * directory into the Gutenberg block editor.
 *
 * @package GSlider\Classes
 * @since   1.2.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( RegistrationPatterns::class, false ) ) {

	/**
	 * Registers native Gutenberg block patterns and categories from files.
	 *
	 * Supports modular, file-based patterns stored in the patterns/ directory.
	 * New patterns can be added as standalone PHP files with standard WordPress
	 * pattern headers without modifying this class.
	 *
	 * @since 1.2.0
	 */
	class RegistrationPatterns implements Registrable {

		use SingletonTrait;

		/**
		 * The slug for the GSlider block pattern category.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const CATEGORY_SLUG = 'gslider-blocks';

		/**
		 * In-memory cache for parsed patterns.
		 *
		 * @since 1.2.0
		 *
		 * @var array<string, array<string, mixed>>|null
		 */
		private ?array $patterns_cache = null;

		/**
		 * Attaches WordPress hooks for block pattern registration.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'init', [ $this, 'register_patterns' ] );
		}

		/**
		 * Gets the directory containing block pattern files.
		 *
		 * @since 1.2.0
		 *
		 * @return string Absolute path to patterns directory.
		 */
		public function get_patterns_dir(): string {
			$default_dir = defined( 'GSLIDER_DIR_PATH' )
				? ( function_exists( 'trailingslashit' ) ? trailingslashit( GSLIDER_DIR_PATH ) : rtrim( GSLIDER_DIR_PATH, '/\\' ) . '/' ) . 'patterns'
				: dirname( __DIR__, 2 ) . '/patterns';

			/**
			 * Filters the directory path where GSlider block patterns are stored.
			 *
			 * @since 1.2.0
			 *
			 * @param string $default_dir Default patterns directory path.
			 */
			return function_exists( 'apply_filters' )
				? (string) apply_filters( 'gslider_blocks_patterns_dir', $default_dir )
				: $default_dir;
		}

		/**
		 * Registers block pattern categories and curated slider templates.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_patterns(): void {
			if ( ! function_exists( 'register_block_pattern' ) ) {
				return;
			}

			/**
			 * Filters whether GSlider block patterns registration is enabled.
			 *
			 * @since 1.2.0
			 *
			 * @param bool $enabled True to register patterns, false otherwise.
			 */
			if ( function_exists( 'apply_filters' ) && ! apply_filters( 'gslider_blocks_enable_patterns', true ) ) {
				return;
			}

			if ( function_exists( 'register_block_pattern_category' ) ) {
				register_block_pattern_category(
					self::CATEGORY_SLUG,
					[
						'label' => function_exists( '__' ) ? __( 'GSlider Blocks', 'gslider-blocks' ) : 'GSlider Blocks',
					]
				);
			}

			foreach ( $this->get_patterns() as $pattern_name => $properties ) {
				register_block_pattern( $pattern_name, $properties );
			}
		}

		/**
		 * Scans the patterns directory and retrieves all parsed patterns.
		 *
		 * Results are cached in-memory so files are scanned and parsed only once per request.
		 * Supports flat patterns directory or nested category subdirectories.
		 *
		 * @since 1.2.0
		 *
		 * @return array<string, array<string, mixed>> Registered patterns array.
		 */
		public function get_patterns(): array {
			if ( null !== $this->patterns_cache ) {
				return $this->patterns_cache;
			}

			$this->patterns_cache = [];
			$patterns_dir         = $this->get_patterns_dir();

			if ( is_dir( $patterns_dir ) ) {
				$pattern_files = $this->scan_pattern_files( $patterns_dir );
				sort( $pattern_files );

				foreach ( $pattern_files as $file ) {
					$parsed = $this->parse_pattern_file( $file );
					if ( is_array( $parsed ) && ! empty( $parsed['slug'] ) ) {
						$slug = $parsed['slug'];
						unset( $parsed['slug'] );
						$this->patterns_cache[ $slug ] = $parsed;
					}
				}
			}

			/**
			 * Filters the collected GSlider block patterns before registration.
			 *
			 * Allows themes or add-ons to add, remove, or modify registered patterns.
			 *
			 * @since 1.2.0
			 *
			 * @param array<string, array<string, mixed>> $patterns Array of patterns indexed by slug.
			 */
			if ( function_exists( 'apply_filters' ) ) {
				$this->patterns_cache = (array) apply_filters( 'gslider_blocks_patterns', $this->patterns_cache );
			}

			return $this->patterns_cache;
		}

		/**
		 * Scans a directory recursively for pattern PHP files.
		 *
		 * @since 1.2.0
		 *
		 * @param string $dir Root directory to scan.
		 * @return array<int, string> List of absolute file paths.
		 */
		private function scan_pattern_files( string $dir ): array {
			$files = [];

			if ( ! is_dir( $dir ) || ! is_readable( $dir ) ) {
				return $files;
			}

			try {
				$iterator = new \RecursiveIteratorIterator(
					new \RecursiveDirectoryIterator( $dir, \FilesystemIterator::SKIP_DOTS ),
					\RecursiveIteratorIterator::SELF_FIRST
				);

				foreach ( $iterator as $item ) {
					if ( $item->isFile() && 'php' === strtolower( $item->getExtension() ) ) {
						$files[] = $item->getPathname();
					}
				}
			} catch ( \Throwable $e ) {
				// Fallback to simple non-recursive glob if iterator fails
				$glob_files = glob( $dir . '/*.php' );
				if ( is_array( $glob_files ) ) {
					$files = $glob_files;
				}
			}

			return $files;
		}

		/**
		 * Parses a single block pattern PHP file.
		 *
		 * Extracts header metadata (Title, Slug, Categories, Keywords, Description)
		 * and captures the Gutenberg block content via output buffering.
		 *
		 * @since 1.2.0
		 *
		 * @param string $file Absolute path to pattern file.
		 * @return array<string, mixed>|null Pattern data array or null on failure.
		 */
		public function parse_pattern_file( string $file ): ?array {
			if ( ! is_file( $file ) || ! is_readable( $file ) ) {
				return null;
			}

			$headers = [
				'title'       => 'Title',
				'slug'        => 'Slug',
				'categories'  => 'Categories',
				'keywords'    => 'Keywords',
				'description' => 'Description',
				'inserter'    => 'Inserter',
			];

			$meta = [];
			if ( function_exists( 'get_file_data' ) ) {
				$meta = get_file_data( $file, $headers );
			} else {
				$file_content = file_get_contents( $file );
				if ( false === $file_content ) {
					return null;
				}

				foreach ( $headers as $field => $regex ) {
					if ( preg_match( '/^[ \t\/*#@]*' . preg_quote( $regex, '/' ) . ':(.*)$/mi', $file_content, $match ) ) {
						$meta[ $field ] = trim( $match[1] );
					} else {
						$meta[ $field ] = '';
					}
				}
			}

			if ( empty( $meta['title'] ) ) {
				return null;
			}

			$slug = ! empty( $meta['slug'] )
				? trim( $meta['slug'] )
				: self::CATEGORY_SLUG . '/' . basename( $file, '.php' );

			$categories = array_filter( array_map( 'trim', explode( ',', $meta['categories'] ?? '' ) ) );
			if ( ! in_array( self::CATEGORY_SLUG, $categories, true ) ) {
				array_unshift( $categories, self::CATEGORY_SLUG );
			}

			// Capture the markup output
			ob_start();
			include $file;
			$content = trim( (string) ob_get_clean() );

			$translations = $this->get_pattern_translations();
			if ( isset( $translations[ $slug ] ) ) {
				$title       = $translations[ $slug ]['title'];
				$description = $translations[ $slug ]['description'];
				$keywords    = $translations[ $slug ]['keywords'];
			} else {
				$title       = $meta['title'];
				$description = $meta['description'] ?? '';
				$keywords    = array_values( array_filter( array_map( 'trim', explode( ',', $meta['keywords'] ?? '' ) ) ) );
			}

			$pattern = [
				'slug'        => $slug,
				'title'       => $title,
				'description' => $description,
				'categories'  => array_values( $categories ),
				'keywords'    => array_values( $keywords ),
				'content'     => $content,
			];

			if ( isset( $meta['inserter'] ) && '' !== $meta['inserter'] ) {
				$inserter_val = strtolower( trim( $meta['inserter'] ) );
				if ( in_array( $inserter_val, [ 'no', 'false', '0' ], true ) ) {
					$pattern['inserter'] = false;
				}
			}

			return $pattern;
		}

		/**
		 * Translatable metadata dictionary for curated core patterns.
		 *
		 * Exposes static string literals to gettext/wp-cli make-pot,
		 * enabling multi-lingual localization for curated starter patterns.
		 *
		 * @since 1.2.0
		 *
		 * @return array<string, array{title: string, description: string, keywords: array<int, string>}>
		 */
		private function get_pattern_translations(): array {
			if ( ! function_exists( '__' ) ) {
				return [];
			}

			return [
				'gslider-blocks/full-width-hero-slider' => [
					'title'       => __( 'Full-Width Hero Slider', 'gslider-blocks' ),
					'description' => __( 'High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.', 'gslider-blocks' ),
					'keywords'    => [
						__( 'slider', 'gslider-blocks' ),
						__( 'hero', 'gslider-blocks' ),
						__( 'carousel', 'gslider-blocks' ),
						__( 'banner', 'gslider-blocks' ),
						__( 'image', 'gslider-blocks' ),
					],
				],
				'gslider-blocks/product-showcase-carousel' => [
					'title'       => __( 'E-commerce Product Showcase Carousel', 'gslider-blocks' ),
					'description' => __( 'Responsive 3-column card carousel with space between items and navigation controls.', 'gslider-blocks' ),
					'keywords'    => [
						__( 'product', 'gslider-blocks' ),
						__( 'ecommerce', 'gslider-blocks' ),
						__( 'shop', 'gslider-blocks' ),
						__( 'carousel', 'gslider-blocks' ),
						__( 'slider', 'gslider-blocks' ),
					],
				],
				'gslider-blocks/social-proof-testimonial-cards' => [
					'title'       => __( 'Social Proof Testimonial Cards', 'gslider-blocks' ),
					'description' => __( 'Two-column client review cards with 5-star ratings and reviewer details.', 'gslider-blocks' ),
					'keywords'    => [
						__( 'testimonial', 'gslider-blocks' ),
						__( 'reviews', 'gslider-blocks' ),
						__( 'social proof', 'gslider-blocks' ),
						__( 'quotes', 'gslider-blocks' ),
						__( 'rating', 'gslider-blocks' ),
					],
				],
				'gslider-blocks/partner-brand-logo-carousel' => [
					'title'       => __( 'Partner Brand Logo Carousel', 'gslider-blocks' ),
					'description' => __( 'Two-column logo carousel for trusted brands and client showcases, with autoplay off.', 'gslider-blocks' ),
					'keywords'    => [
						__( 'logo', 'gslider-blocks' ),
						__( 'carousel', 'gslider-blocks' ),
						__( 'brand', 'gslider-blocks' ),
						__( 'partners', 'gslider-blocks' ),
						__( 'clients', 'gslider-blocks' ),
					],
				],
				'gslider-blocks/content-hero-slider' => [
					'title'       => __( 'Content Hero Slider', 'gslider-blocks' ),
					'description' => __( 'Single-column content slider with titles, descriptions, and call-to-action buttons, using a fade transition and autoplay.', 'gslider-blocks' ),
					'keywords'    => [
						__( 'content', 'gslider-blocks' ),
						__( 'hero', 'gslider-blocks' ),
						__( 'slider', 'gslider-blocks' ),
						__( 'cta', 'gslider-blocks' ),
						__( 'banner', 'gslider-blocks' ),
					],
				],
			];
		}

	}
}
