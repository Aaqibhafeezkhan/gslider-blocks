<?php
/**
 * REST API controller for the GSlider Blocks admin dashboard.
 *
 * Provides real-time metrics, system environment information,
 * and block status to authorized administrators.
 *
 * @package GSlider\Admin
 * @since   1.2.0
 */

namespace GSlider\Admin;

use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( DashboardController::class, false ) ) {

	/**
	 * Controller for the /wp-json/gslider/v1/dashboard endpoint.
	 *
	 * Extends WP_REST_Controller to provide secure, cached system metrics
	 * and block status for the React Single Page Application dashboard.
	 *
	 * @since 1.2.0
	 */
	class DashboardController extends WP_REST_Controller implements Registrable {

		use SingletonTrait;

		/**
		 * Transient key for caching published sliders count.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const CACHE_KEY_SLIDER_COUNT = 'gslider_slider_count_cache';

		/**
		 * REST API namespace for GSlider.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		protected $namespace = 'gslider/v1';

		/**
		 * REST API base resource path.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		protected $rest_base = 'dashboard';

		/**
		 * Registers WordPress hooks for REST API routes and cache invalidation.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'rest_api_init', [ $this, 'register_routes' ] );
			add_action( 'save_post', [ $this, 'flush_slider_count_cache' ] );
			add_action( 'deleted_post', [ $this, 'flush_slider_count_cache' ] );
		}

		/**
		 * Registers REST API routes for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_routes() {
			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base,
				[
					[
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => [ $this, 'get_item' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
						'schema'              => [ $this, 'get_item_schema' ],
					],
				]
			);

			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/toggle-block',
				[
					[
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => [ $this, 'toggle_block' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
						'args'                => [
							'slug'    => [
								'description'       => __( 'Block slug or full name.', 'gslider-blocks' ),
								'type'              => 'string',
								'required'          => true,
								'sanitize_callback' => 'sanitize_text_field',
							],
							'enabled' => [
								'description' => __( 'Whether the block is enabled.', 'gslider-blocks' ),
								'type'        => 'boolean',
								'required'    => true,
							],
						],
					],
				]
			);

			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/settings',
				[
					[
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => [ $this, 'save_settings' ],
						'permission_callback' => [ $this, 'save_settings_permissions_check' ],
						'args'                => [
							'google_fonts_privacy' => [
								'description' => __( 'Whether Google Fonts privacy mode is enabled.', 'gslider-blocks' ),
								'type'        => 'boolean',
								'required'    => false,
								'default'     => false,
							],
							'css_delivery'         => [
								'description'       => __( 'Dynamic CSS delivery method (file or inline).', 'gslider-blocks' ),
								'type'              => 'string',
								'enum'              => [ 'file', 'inline' ],
								'required'          => false,
								'default'           => 'file',
								'sanitize_callback' => 'sanitize_key',
							],
						],
					],
				]
			);

			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/clear-cache',
				[
					[
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => [ $this, 'clear_cache' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
					],
				]
			);

			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/system-report',
				[
					[
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => [ $this, 'get_system_report' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
					],
				]
			);
		}

		/**
		 * Checks whether the current user has permission to access dashboard data.
		 *
		 * Requires the 'manage_options' capability. Returns a WP_Error with
		 * the appropriate authorization status code if permission is denied.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return true|WP_Error True if user has manage_options capability, WP_Error otherwise.
		 */
		public function get_item_permissions_check( $request ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				$status_code = function_exists( 'rest_authorization_required_code' )
					? rest_authorization_required_code()
					: 401;

				return new WP_Error(
					'rest_forbidden',
					__( 'Sorry, you are not allowed to view the dashboard metrics.', 'gslider-blocks' ),
					[ 'status' => $status_code ]
				);
			}

			return true;
		}

		/**
		 * Checks whether the current user has permission to update dashboard settings.
		 *
		 * Requires the 'manage_options' capability.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return true|WP_Error True if user has manage_options capability, WP_Error otherwise.
		 */
		public function save_settings_permissions_check( $request ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				$status_code = function_exists( 'rest_authorization_required_code' )
					? rest_authorization_required_code()
					: 401;

				return new WP_Error(
					'rest_forbidden',
					__( 'Sorry, you are not allowed to manage GSlider settings.', 'gslider-blocks' ),
					[ 'status' => $status_code ]
				);
			}

			return true;
		}

		/**
		 * Retrieves dashboard data including system metrics and block status.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object containing dashboard metrics.
		 */
		public function get_item( $request ) {
			$version = defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.1.9';

			$data = [
				'status'        => 'success',
				'version'       => $version,
				'sliders_count' => $this->get_sliders_count(),
				'blocks'        => $this->get_blocks_status(),
				'settings'      => $this->get_settings(),
				'cache'         => \GSlider\Classes\StyleGenerator::getInstance()->get_cache_stats(),
				'system'        => $this->get_system_metrics(),
			];

			return rest_ensure_response( $data );
		}

		/**
		 * Toggles the enabled status of a specific slider block.
		 *
		 * Updates the 'gslider_disabled_blocks' option by adding or removing
		 * the block's full name. Automatically ties 'flexi-content-item' to
		 * 'flexi-content' to prevent broken slider dependencies.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object with updated block status.
		 */
		public function toggle_block( $request ) {
			$raw_slug = (string) $request->get_param( 'slug' );
			$enabled  = (bool) $request->get_param( 'enabled' );

			$disabled_blocks = get_option( 'gslider_disabled_blocks', [] );
			if ( ! is_array( $disabled_blocks ) ) {
				$disabled_blocks = [];
			}

			if ( 'all' === $raw_slug ) {
				if ( $enabled ) {
					$disabled_blocks = [];
				} else {
					$disabled_blocks = [
						'gslider-blocks/base',
						'gslider-blocks/flexi-content',
						'gslider-blocks/flexi-content-item',
						'gslider-blocks/image-slider',
						'gslider-blocks/logo-carousel',
						'gslider-blocks/testimonial',
					];
				}
				update_option( 'gslider_disabled_blocks', $disabled_blocks );

				return rest_ensure_response( [
					'status'          => 'success',
					'slug'            => 'all',
					'enabled'         => $enabled,
					'blocks'          => $this->get_blocks_status(),
					'disabled_blocks' => $disabled_blocks,
				] );
			}

			$short_slug = str_replace( 'gslider-blocks/', '', $raw_slug );
			$full_slug  = 'gslider-blocks/' . $short_slug;

			if ( $enabled ) {
				$to_remove = [ $short_slug, $full_slug ];
				if ( 'flexi-content' === $short_slug ) {
					$to_remove[] = 'flexi-content-item';
					$to_remove[] = 'gslider-blocks/flexi-content-item';
				}
				$disabled_blocks = array_diff( $disabled_blocks, $to_remove );
			} else {
				if ( ! in_array( $full_slug, $disabled_blocks, true ) ) {
					$disabled_blocks[] = $full_slug;
				}
				if ( 'flexi-content' === $short_slug && ! in_array( 'gslider-blocks/flexi-content-item', $disabled_blocks, true ) ) {
					$disabled_blocks[] = 'gslider-blocks/flexi-content-item';
				}
			}

			$disabled_blocks = array_values( array_unique( $disabled_blocks ) );
			update_option( 'gslider_disabled_blocks', $disabled_blocks );

			return rest_ensure_response( [
				'status'          => 'success',
				'slug'            => $full_slug,
				'enabled'         => $enabled,
				'blocks'          => $this->get_blocks_status(),
				'disabled_blocks' => $disabled_blocks,
			] );
		}

		/**
		 * Counts total published sliders across posts and pages with transient caching.
		 *
		 * Queries published posts and pages containing GSlider block markup and
		 * counts each individual slider block instance (image-slider, testimonial,
		 * logo-carousel, flexi-content, base) while excluding child slide items.
		 *
		 * To avoid expensive table scans on high-traffic sites, the count is
		 * cached in a transient and flushed automatically on save_post and deleted_post.
		 *
		 * @since 1.2.0
		 *
		 * @return int Total number of published slider blocks.
		 */
		public function get_sliders_count(): int {
			$cached = get_transient( self::CACHE_KEY_SLIDER_COUNT );
			if ( false !== $cached && is_numeric( $cached ) ) {
				return (int) $cached;
			}

			global $wpdb;
			if ( ! isset( $wpdb ) || ! is_object( $wpdb ) ) {
				return 0;
			}

			$query = "SELECT post_content FROM {$wpdb->posts}
				WHERE post_status = 'publish'
				AND post_type IN ('post', 'page')
				AND post_content LIKE '%wp:gslider-blocks/%'";

			$posts_content = method_exists( $wpdb, 'get_col' )
				? $wpdb->get_col( $query )
				: [];

			$count = 0;
			if ( is_array( $posts_content ) && ! empty( $posts_content ) ) {
				foreach ( $posts_content as $content ) {
					if ( ! is_string( $content ) || '' === $content ) {
						continue;
					}

					// Count every top-level GSlider slider block instance (excluding child items).
					$matches = null;
					$matched = preg_match_all(
						'/<!--\s+wp:gslider-blocks\/(image-slider|testimonial|logo-carousel|flexi-content|base)(?![-\w])/i',
						$content,
						$matches
					);

					if ( false !== $matched ) {
						$count += (int) $matched;
					}
				}
			}

			$expiration = defined( 'HOUR_IN_SECONDS' ) ? 12 * HOUR_IN_SECONDS : 43200;
			set_transient( self::CACHE_KEY_SLIDER_COUNT, $count, $expiration );

			return $count;
		}

		/**
		 * Flushes the cached slider count transient.
		 *
		 * Hooked to 'save_post' and 'deleted_post' actions.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function flush_slider_count_cache(): void {
			delete_transient( self::CACHE_KEY_SLIDER_COUNT );
		}

		/**
		 * Checks whether a specific block slug is currently enabled.
		 *
		 * Supports both short slug ('image-slider') and full block name
		 * ('gslider-blocks/image-slider') in the disabled blocks array.
		 *
		 * @since 1.2.0
		 *
		 * @param string        $slug            The block slug without prefix.
		 * @param array<string> $disabled_blocks The list of disabled blocks.
		 * @return bool True if block is enabled, false if disabled.
		 */
		public function is_block_enabled( string $slug, array $disabled_blocks ): bool {
			return ! in_array( $slug, $disabled_blocks, true )
				&& ! in_array( 'gslider-blocks/' . $slug, $disabled_blocks, true );
		}

		/**
		 * Retrieves the list of available blocks with their active status.
		 *
		 * @since 1.2.0
		 *
		 * @return array<int, array{slug: string, name: string, enabled: bool}>
		 */
		public function get_blocks_status(): array {
			$disabled_blocks = get_option( 'gslider_disabled_blocks', [] );
			if ( ! is_array( $disabled_blocks ) ) {
				$disabled_blocks = [];
			}

			$all_blocks = [
				[
					'slug'    => 'base',
					'name'    => __( 'Base', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'base', $disabled_blocks ),
				],
				[
					'slug'    => 'flexi-content',
					'name'    => __( 'Flexi Content', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'flexi-content', $disabled_blocks ),
				],
				[
					'slug'    => 'image-slider',
					'name'    => __( 'Image Slider', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'image-slider', $disabled_blocks ),
				],
				[
					'slug'    => 'logo-carousel',
					'name'    => __( 'Logo Carousel', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'logo-carousel', $disabled_blocks ),
				],
				[
					'slug'    => 'testimonial',
					'name'    => __( 'Testimonial', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'testimonial', $disabled_blocks ),
				],
			];

			/**
			 * Filters the list of dashboard blocks and their enabled status.
			 *
			 * @since 1.2.0
			 *
			 * @param array $all_blocks List of block status objects.
			 */
			return apply_filters( 'gslider_dashboard_blocks_status', $all_blocks );
		}

		/**
		 * Retrieves server and WordPress environment metrics.
		 *
		 * @since 1.2.0
		 *
		 * @return array{php_version: string, wp_version: string, memory_limit: string}
		 */
		public function get_system_metrics(): array {
			global $wp_version;

			$memory_limit = ini_get( 'memory_limit' );
			if ( ! $memory_limit ) {
				$memory_limit = defined( 'WP_MEMORY_LIMIT' ) ? WP_MEMORY_LIMIT : '256M';
			}

			$current_wp_version = function_exists( 'get_bloginfo' )
				? (string) get_bloginfo( 'version' )
				: ( isset( $wp_version ) ? (string) $wp_version : '6.7.1' );

			return [
				'php_version'  => PHP_VERSION,
				'wp_version'   => $current_wp_version,
				'memory_limit' => (string) $memory_limit,
			];
		}

		/**
		 * Retrieves the global plugin settings with backward-compatible defaults.
		 *
		 * @since 1.2.0
		 *
		 * @return array{google_fonts_privacy: bool, css_delivery: string}
		 */
		public function get_settings(): array {
			$settings = get_option( 'gslider_settings', [] );
			if ( ! is_array( $settings ) ) {
				$settings = [];
			}

			$css_delivery = isset( $settings['css_delivery'] ) && in_array( $settings['css_delivery'], [ 'file', 'inline' ], true )
				? (string) $settings['css_delivery']
				: 'file';

			$defaults = [
				'google_fonts_privacy' => ! empty( $settings['google_fonts_privacy'] ),
				'css_delivery'         => $css_delivery,
			];

			/**
			 * Filters the global GSlider settings array.
			 *
			 * @since 1.2.0
			 *
			 * @param array $defaults Default settings values.
			 */
			return apply_filters( 'gslider_dashboard_settings', $defaults );
		}

		/**
		 * Updates global plugin preferences from REST request.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object containing updated settings.
		 */
		public function save_settings( $request ) {
			$existing = get_option( 'gslider_settings', [] );
			if ( ! is_array( $existing ) ) {
				$existing = [];
			}

			$google_fonts_privacy = $request->has_param( 'google_fonts_privacy' )
				? (bool) $request->get_param( 'google_fonts_privacy' )
				: ( ! empty( $existing['google_fonts_privacy'] ) );

			$css_delivery = $request->has_param( 'css_delivery' )
				? sanitize_key( (string) $request->get_param( 'css_delivery' ) )
				: ( isset( $existing['css_delivery'] ) ? (string) $existing['css_delivery'] : 'file' );

			if ( ! in_array( $css_delivery, [ 'file', 'inline' ], true ) ) {
				$css_delivery = 'file';
			}

			$updated = [
				'google_fonts_privacy' => $google_fonts_privacy,
				'css_delivery'         => $css_delivery,
			];

			update_option( 'gslider_settings', $updated );

			return rest_ensure_response( [
				'status'   => 'success',
				'message'  => __( 'Settings saved successfully.', 'gslider-blocks' ),
				'settings' => $this->get_settings(),
			] );
		}

		/**
		 * Purges dynamic CSS cache files from uploads directory.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object with deleted file count and updated cache stats.
		 */
		public function clear_cache( $request ) {
			$style_generator = \GSlider\Classes\StyleGenerator::getInstance();
			$deleted_count   = $style_generator->clear_dynamic_css_cache();

			return rest_ensure_response( [
				'status'        => 'success',
				'message'       => sprintf(
					/* translators: %d: number of files deleted */
					_n(
						'Successfully deleted %d dynamic CSS cache file.',
						'Successfully deleted %d dynamic CSS cache files.',
						$deleted_count,
						'gslider-blocks'
					),
					$deleted_count
				),
				'deleted'       => $deleted_count,
				'deleted_files' => $deleted_count,
				'cache'         => $style_generator->get_cache_stats(),
			] );
		}

		/**
		 * Retrieves formatted diagnostic system report.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object containing diagnostic report.
		 */
		public function get_system_report( $request ) {
			$report = $this->generate_system_report();

			return rest_ensure_response( [
				'status' => 'success',
				'data'   => $report,
				'report' => $report,
			] );
		}

		/**
		 * Generates a sanitized diagnostic system report.
		 *
		 * Gathers server environment, WordPress versions, theme info,
		 * and active plugins without leaking sensitive paths or credentials.
		 *
		 * @since 1.2.0
		 *
		 * @return array{metrics: array, plugins: array, formatted_text: string}
		 */
		public function generate_system_report(): array {
			$system_metrics = $this->get_system_metrics();
			$settings       = $this->get_settings();
			$version        = defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.1.9';

			// Web server software (sanitized)
			$server_software = isset( $_SERVER['SERVER_SOFTWARE'] )
				? sanitize_text_field( (string) $_SERVER['SERVER_SOFTWARE'] )
				: 'Unknown';

			// Theme info
			$theme_name    = 'Unknown';
			$theme_version = 'Unknown';
			$theme_author  = 'Unknown';
			$is_child      = false;
			if ( function_exists( 'wp_get_theme' ) ) {
				$theme = wp_get_theme();
				if ( is_object( $theme ) && method_exists( $theme, 'exists' ) && $theme->exists() ) {
					$theme_name    = (string) $theme->get( 'Name' );
					$theme_version = (string) $theme->get( 'Version' );
					$theme_author  = (string) $theme->get( 'Author' );
					$is_child      = function_exists( 'is_child_theme' ) && is_child_theme();
				}
			}

			// Active plugins (sanitized name and version, zero server paths)
			$active_plugins_list = [];
			$raw_plugins         = (array) get_option( 'active_plugins', [] );

			if ( ! function_exists( 'get_plugin_data' ) && defined( 'ABSPATH' ) ) {
				$admin_plugin_file = ABSPATH . 'wp-admin/includes/plugin.php';
				if ( file_exists( $admin_plugin_file ) ) {
					require_once $admin_plugin_file;
				}
			}

			if ( function_exists( 'get_plugin_data' ) && defined( 'WP_PLUGIN_DIR' ) ) {
				foreach ( $raw_plugins as $plugin_file ) {
					$full_plugin_path = WP_PLUGIN_DIR . '/' . $plugin_file;
					if ( file_exists( $full_plugin_path ) ) {
						$plugin_data = get_plugin_data( $full_plugin_path, false, false );
						if ( ! empty( $plugin_data['Name'] ) ) {
							$active_plugins_list[] = [
								'name'    => sanitize_text_field( (string) $plugin_data['Name'] ),
								'version' => sanitize_text_field( isset( $plugin_data['Version'] ) ? (string) $plugin_data['Version'] : 'N/A' ),
								'author'  => sanitize_text_field( isset( $plugin_data['AuthorName'] ) ? (string) $plugin_data['AuthorName'] : 'N/A' ),
							];
						}
					}
				}
			}

			$memory_limit = $system_metrics['memory_limit'];
			$max_execution_time = ini_get( 'max_execution_time' );
			if ( ! $max_execution_time ) {
				$max_execution_time = 'N/A';
			} else {
				$max_execution_time = $max_execution_time . 's';
			}

			$delivery_label = ( 'inline' === $settings['css_delivery'] )
				? __( 'Inline Header Style', 'gslider-blocks' )
				: __( 'External Generated Stylesheet', 'gslider-blocks' );

			$privacy_label = ! empty( $settings['google_fonts_privacy'] )
				? __( 'Enabled (GDPR Privacy Compliant)', 'gslider-blocks' )
				: __( 'Disabled (Google Fonts Allowed)', 'gslider-blocks' );

			$total_sliders = $this->get_sliders_count();
			$is_multisite  = function_exists( 'is_multisite' ) && is_multisite();

			// Generate clean markdown text for 1-click clipboard copying
			$timestamp = function_exists( 'current_time' ) ? current_time( 'mysql' ) : gmdate( 'Y-m-d H:i:s' );
			$report_lines = [
				'### GSlider Blocks System Diagnostics Report',
				'- Generated: ' . $timestamp,
				'',
				'#### WordPress Environment',
				'- GSlider Blocks Version: ' . $version,
				'- WordPress Version: ' . $system_metrics['wp_version'],
				'- Multisite: ' . ( $is_multisite ? 'Yes' : 'No' ),
				'- Active Theme: ' . $theme_name . ' (' . $theme_version . ')' . ( $is_child ? ' [Child Theme]' : '' ),
				'',
				'#### Server Environment',
				'- PHP Version: ' . $system_metrics['php_version'],
				'- Web Server: ' . $server_software,
				'- Memory Limit: ' . $memory_limit,
				'- Max Execution Time: ' . $max_execution_time,
				'',
				'#### GSlider Configuration',
				'- Dynamic CSS Delivery: ' . $delivery_label,
				'- Google Fonts Privacy: ' . $privacy_label,
				'- Total Published Sliders: ' . $total_sliders,
				'',
				'#### Active Plugins (' . count( $active_plugins_list ) . ')',
			];

			if ( ! empty( $active_plugins_list ) ) {
				foreach ( $active_plugins_list as $plug ) {
					$report_lines[] = '- ' . $plug['name'] . ' (v' . $plug['version'] . ')';
				}
			} else {
				$report_lines[] = '- None detected';
			}

			$formatted_text = implode( "\n", $report_lines );

			return [
				'metrics' => [
					'gslider_version'      => $version,
					'wp_version'           => $system_metrics['wp_version'],
					'php_version'          => $system_metrics['php_version'],
					'web_server'           => $server_software,
					'memory_limit'         => $memory_limit,
					'max_execution_time'   => $max_execution_time,
					'is_multisite'         => $is_multisite,
					'theme_name'           => $theme_name,
					'theme_version'        => $theme_version,
					'is_child_theme'       => $is_child,
					'css_delivery'         => $settings['css_delivery'],
					'google_fonts_privacy' => $settings['google_fonts_privacy'],
					'sliders_count'        => $total_sliders,
				],
				'plugins'        => $active_plugins_list,
				'formatted_text' => $formatted_text,
			];
		}

		/**
		 * Retrieves the item schema for the dashboard endpoint.
		 *
		 * @since 1.2.0
		 *
		 * @return array Item schema definition.
		 */
		public function get_item_schema(): array {
			if ( $this->schema ) {
				return $this->add_additional_fields_schema( $this->schema );
			}

			$this->schema = [
				'$schema'    => 'http://json-schema.org/draft-04/schema#',
				'title'      => 'gslider_dashboard',
				'type'       => 'object',
				'properties' => [
					'status'        => [
						'description' => __( 'Response status.', 'gslider-blocks' ),
						'type'        => 'string',
						'enum'        => [ 'success', 'error' ],
						'readonly'    => true,
					],
					'version'       => [
						'description' => __( 'Plugin version.', 'gslider-blocks' ),
						'type'        => 'string',
						'readonly'    => true,
					],
					'sliders_count' => [
						'description' => __( 'Total number of published sliders across posts and pages.', 'gslider-blocks' ),
						'type'        => 'integer',
						'readonly'    => true,
					],
					'blocks'        => [
						'description' => __( 'List of available blocks with active status.', 'gslider-blocks' ),
						'type'        => 'array',
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'slug'    => [
									'type'     => 'string',
									'readonly' => true,
								],
								'name'    => [
									'type'     => 'string',
									'readonly' => true,
								],
								'enabled' => [
									'type'     => 'boolean',
									'readonly' => true,
								],
							],
						],
						'readonly'    => true,
					],
					'settings'      => [
						'description' => __( 'Global plugin settings and delivery preferences.', 'gslider-blocks' ),
						'type'        => 'object',
						'properties'  => [
							'google_fonts_privacy' => [
								'type'     => 'boolean',
								'readonly' => true,
							],
							'css_delivery'         => [
								'type'     => 'string',
								'enum'     => [ 'file', 'inline' ],
								'readonly' => true,
							],
						],
						'readonly'    => true,
					],
					'system'        => [
						'description' => __( 'Server and WordPress environment metrics.', 'gslider-blocks' ),
						'type'        => 'object',
						'properties'  => [
							'php_version'  => [
								'type'     => 'string',
								'readonly' => true,
							],
							'wp_version'   => [
								'type'     => 'string',
								'readonly' => true,
							],
							'memory_limit' => [
								'type'     => 'string',
								'readonly' => true,
							],
						],
						'readonly'    => true,
					],
					'cache'         => [
						'description' => __( 'Dynamic CSS cache statistics.', 'gslider-blocks' ),
						'type'        => 'object',
						'properties'  => [
							'files_count'          => [
								'type'     => 'integer',
								'readonly' => true,
							],
							'total_size_bytes'     => [
								'type'     => 'integer',
								'readonly' => true,
							],
							'total_size_formatted' => [
								'type'     => 'string',
								'readonly' => true,
							],
						],
						'readonly'    => true,
					],
				],
			];

			return $this->add_additional_fields_schema( $this->schema );
		}

	}

}
