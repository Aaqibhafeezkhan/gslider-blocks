<?php
/**
 * REST API controller for GSlider blocks.
 *
 * Exposes structured JSON endpoints for decoupled and
 * Headless WordPress applications.
 *
 * @package GSlider\RestApi
 * @since   1.1.9
 */

namespace GSlider\RestApi;

use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use WP_Post;
use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BlocksController' ) ) {

	/**
	 * Controller for the /wp-json/gslider/v1/blocks endpoint.
	 *
	 * Extends the WordPress core REST controller to provide
	 * clean, machine-readable GSlider block data for Next.js,
	 * Astro, Remix, and headless architectures.
	 *
	 * @since 1.1.9
	 */
	class BlocksController extends WP_REST_Controller implements Registrable {

		use SingletonTrait;

		/**
		 * REST API namespace for GSlider.
		 *
		 * @since 1.1.9
		 *
		 * @var string
		 */
		protected $namespace = 'gslider/v1';

		/**
		 * REST API base resource path.
		 *
		 * @since 1.1.9
		 *
		 * @var string
		 */
		protected $rest_base = 'blocks';

		/**
		 * Registers WordPress hooks for REST API routes and fields.
		 *
		 * @since 1.1.9
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'rest_api_init', [ $this, 'register_routes' ] );
			add_action( 'rest_api_init', [ $this, 'register_rest_fields' ] );
		}

		/**
		 * Registers REST API routes for GSlider blocks.
		 *
		 * @since 1.1.9
		 *
		 * @return void
		 */
		public function register_routes() {
			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/(?P<id>[\d]+)',
				[
					'args'   => [
						'id' => [
							'description'       => __( 'Unique identifier for the post or page.', 'gslider-blocks' ),
							'type'              => 'integer',
							'required'          => true,
							'validate_callback' => static function ( $param ) {
								return is_numeric( $param ) && (int) $param > 0;
							},
							'sanitize_callback' => 'absint',
						],
					],
					[
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => [ $this, 'get_item' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
						'schema'              => [ $this, 'get_item_schema' ],
					],
				]
			);
		}

		/**
		 * Registers the gslider_blocks REST field on WordPress core post and page endpoints.
		 *
		 * Enables decoupled and headless consumers (e.g. Next.js, Astro) to retrieve
		 * parsed slider data directly in the standard /wp/v2/posts and /wp/v2/pages responses.
		 *
		 * @since 1.1.9
		 *
		 * @return void
		 */
		public function register_rest_fields(): void {
			$post_types = apply_filters( 'gslider_rest_field_post_types', [ 'post', 'page' ] );

			register_rest_field(
				$post_types,
				'gslider_blocks',
				[
					'get_callback' => [ $this, 'get_gslider_blocks_field' ],
					'schema'       => [ $this, 'get_gslider_blocks_schema' ],
				]
			);
		}

		/**
		 * Handler for the gslider_blocks REST field.
		 *
		 * Extracts and normalizes GSlider blocks for the given post or page.
		 *
		 * @since 1.1.9
		 *
		 * @param array $post_response Core REST response data for the post.
		 * @return array Array of normalized GSlider blocks, or empty array if none found.
		 */
		public function get_gslider_blocks_field( array $post_response ): array {
			$post_id = (int) ( $post_response['id'] ?? 0 );

			if ( ! $post_id ) {
				return [];
			}

			$blocks = BlockParser::parse_post_blocks( $post_id );

			return is_array( $blocks ) ? $blocks : [];
		}

		/**
		 * Retrieves the JSON schema definition for the gslider_blocks field and collection.
		 *
		 * @since 1.1.9
		 *
		 * @return array JSON schema definition.
		 */
		public function get_gslider_blocks_schema(): array {
			return [
				'description' => __( 'List of parsed GSlider blocks.', 'gslider-blocks' ),
				'type'        => 'array',
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'blockId'      => [ 'type' => 'string' ],
						'blockName'    => [ 'type' => 'string' ],
						'sliderType'   => [ 'type' => 'string' ],
						'totalSlides'  => [ 'type' => 'integer' ],
						'swiperConfig' => [ 'type' => 'object' ],
						'css'          => [ 'type' => 'string' ],
						'slides'       => [ 'type' => 'array' ],
						'attrs'        => [ 'type' => 'object' ],
					],
				],
				'readonly'    => true,
			];
		}

		/**
		 * Checks whether the current user has permission to read blocks for the post.
		 *
		 * Published posts are publicly accessible. Non-published posts require
		 * standard read_post capability for the post type.
		 *
		 * @since 1.1.9
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return true|WP_Error True if the request has read access, WP_Error otherwise.
		 */
		public function get_item_permissions_check( $request ) {
			$post_id = (int) $request->get_param( 'id' );
			$post    = get_post( $post_id );

			if ( ! $post instanceof WP_Post ) {
				return new WP_Error(
					'rest_post_invalid_id',
					__( 'Invalid post ID.', 'gslider-blocks' ),
					[ 'status' => 404 ]
				);
			}

			// Published posts are publicly readable.
			if ( 'publish' === $post->post_status ) {
				return true;
			}

			// Non-published posts (draft, private, pending) require permission.
			$post_type = get_post_type_object( $post->post_type );
			if ( ! $post_type || ! current_user_can( $post_type->cap->read_post, $post_id ) ) {
				return new WP_Error(
					'rest_cannot_read_post',
					__( 'Sorry, you are not allowed to view blocks for this post.', 'gslider-blocks' ),
					[ 'status' => rest_authorization_required_code() ]
				);
			}

			return true;
		}

		/**
		 * Retrieves GSlider blocks for the specified post.
		 *
		 * @since 1.1.9
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error on failure.
		 */
		public function get_item( $request ) {
			$post_id = (int) $request->get_param( 'id' );
			$post    = get_post( $post_id );

			if ( ! $post instanceof WP_Post ) {
				return new WP_Error(
					'rest_post_invalid_id',
					__( 'Invalid post ID.', 'gslider-blocks' ),
					[ 'status' => 404 ]
				);
			}

			$gslider_blocks = BlockParser::parse_post_blocks( $post );

			$data = [
				'post_id'       => $post_id,
				'post_title'    => get_the_title( $post ),
				'total_sliders' => count( $gslider_blocks ),
				'blocks'        => $gslider_blocks,
			];

			return rest_ensure_response( $data );
		}

		/**
		 * Retrieves the item schema for the GSlider blocks endpoint.
		 *
		 * @since 1.1.9
		 *
		 * @return array Item schema definition.
		 */
		public function get_item_schema() {
			if ( $this->schema ) {
				return $this->add_additional_fields_schema( $this->schema );
			}

			$this->schema = [
				'$schema'    => 'http://json-schema.org/draft-04/schema#',
				'title'      => 'gslider_blocks',
				'type'       => 'object',
				'properties' => [
					'post_id'       => [
						'description' => __( 'The ID of the queried post.', 'gslider-blocks' ),
						'type'        => 'integer',
						'readonly'    => true,
					],
					'post_title'    => [
						'description' => __( 'The title of the queried post.', 'gslider-blocks' ),
						'type'        => 'string',
						'readonly'    => true,
					],
					'total_sliders' => [
						'description' => __( 'The total number of GSlider blocks on this post.', 'gslider-blocks' ),
						'type'        => 'integer',
						'readonly'    => true,
					],
					'blocks'        => $this->get_gslider_blocks_schema(),
				],
			];

			return $this->add_additional_fields_schema( $this->schema );
		}

	}

}
