<?php
/**
 * Block data normalization and parsing service for GSlider Blocks.
 *
 * Extracts and formats machine-readable slider slide data from
 * Gutenberg block comments and attributes for Headless frontends.
 *
 * @package GSlider\RestApi
 * @since   1.1.9
 */

namespace GSlider\RestApi;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BlockParser' ) ) {

	/**
	 * Parses and normalizes GSlider Gutenberg blocks.
	 *
	 * Converts raw block attributes into unified, clean JSON data
	 * structures tailored for Next.js, Astro, and headless consumers.
	 *
	 * @since 1.1.9
	 */
	class BlockParser {

		/**
		 * Parses all GSlider blocks from a post's content.
		 *
		 * @since 1.1.9
		 *
		 * @param int|string $post_or_id Post ID or raw post content string.
		 * @return array Array of normalized GSlider block structures.
		 */
		public static function parse_post_blocks( $post_or_id ): array {
			$content = '';

			if ( is_numeric( $post_or_id ) ) {
				$post = get_post( (int) $post_or_id );
				if ( ! $post ) {
					return [];
				}
				$content = $post->post_content;
			} elseif ( is_string( $post_or_id ) ) {
				$content = $post_or_id;
			}

			if ( empty( $content ) ) {
				return [];
			}

			$raw_blocks = parse_blocks( $content );
			return self::extract_and_normalize_blocks( $raw_blocks );
		}

		/**
		 * Recursively traverses parsed block tree to extract and normalize GSlider blocks.
		 *
		 * Handles top-level blocks and nested blocks (inside groups, columns, etc.).
		 *
		 * @since 1.1.9
		 *
		 * @param array $blocks Array of parsed block structures from parse_blocks().
		 * @return array Array of normalized GSlider blocks.
		 */
		public static function extract_and_normalize_blocks( array $blocks ): array {
			$sliders = [];

			foreach ( $blocks as $block ) {
				if ( empty( $block['blockName'] ) ) {
					continue;
				}

				// Only process top-level GSlider parent blocks (flexi-content-item is handled as a child slide).
				if ( 0 === strpos( $block['blockName'], 'gslider-blocks/' ) && 'gslider-blocks/flexi-content-item' !== $block['blockName'] ) {
					$sliders[] = self::normalize_block( $block );
				}

				// Recursively inspect inner blocks for nested sliders (e.g. inside core/columns).
				if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
					// If this is flexi-content, its innerBlocks are slides and already handled in normalize_block.
					if ( 'gslider-blocks/flexi-content' !== $block['blockName'] ) {
						$nested_sliders = self::extract_and_normalize_blocks( $block['innerBlocks'] );
						if ( ! empty( $nested_sliders ) ) {
							$sliders = array_merge( $sliders, $nested_sliders );
						}
					}
				}
			}

			return $sliders;
		}

		/**
		 * Normalizes a single GSlider block into a clean, uniform object.
		 *
		 * @since 1.1.9
		 *
		 * @param array $block Raw block data from parse_blocks().
		 * @return array Normalized block payload.
		 */
		public static function normalize_block( array $block ): array {
			$block_name   = sanitize_text_field( $block['blockName'] ?? '' );
			$attrs        = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];
			$inner_blocks = isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ? $block['innerBlocks'] : [];
			$block_slug   = str_replace( 'gslider-blocks/', '', $block_name );

			$block_id = isset( $attrs['blockId'] ) ? sanitize_key( $attrs['blockId'] ) : '';
			$slides   = [];

			switch ( $block_name ) {
				case 'gslider-blocks/image-slider':
					$slides = self::normalize_image_slider( $attrs );
					break;

				case 'gslider-blocks/logo-carousel':
					$slides = self::normalize_logo_carousel( $attrs );
					break;

				case 'gslider-blocks/testimonial':
					$slides = self::normalize_testimonial( $attrs );
					break;

				case 'gslider-blocks/flexi-content':
					$slides = self::normalize_flexi_content( $inner_blocks );
					break;

				default:
					$slides = [];
					break;
			}

			return [
				'blockId'     => $block_id,
				'blockName'   => $block_name,
				'sliderType'  => $block_slug,
				'totalSlides' => count( $slides ),
				'slides'      => $slides,
				'attrs'       => $attrs,
			];
		}

		/**
		 * Normalizes Image Slider slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_image_slider( array $attrs ): array {
			$images = isset( $attrs['images'] ) && is_array( $attrs['images'] ) ? $attrs['images'] : [];
			$slides = [];

			foreach ( $images as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$slides[] = [
					'id'          => $item['id'] ?? ( $index + 1 ),
					'url'         => esc_url_raw( $item['url'] ?? '' ),
					'alt'         => sanitize_text_field( $item['alt'] ?? '' ),
					'caption'     => sanitize_text_field( $item['caption'] ?? '' ),
					'link'        => esc_url_raw( $item['link'] ?? '' ),
					'tooltipText' => sanitize_text_field( $item['tooltipText'] ?? '' ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Logo Carousel slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_logo_carousel( array $attrs ): array {
			$logos  = isset( $attrs['logos'] ) && is_array( $attrs['logos'] ) ? $attrs['logos'] : [];
			$slides = [];

			foreach ( $logos as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$slides[] = [
					'id'          => $item['id'] ?? ( $index + 1 ),
					'url'         => esc_url_raw( $item['url'] ?? '' ),
					'alt'         => sanitize_text_field( $item['alt'] ?? '' ),
					'caption'     => sanitize_text_field( $item['caption'] ?? '' ),
					'link'        => esc_url_raw( $item['link'] ?? '' ),
					'tooltipText' => sanitize_text_field( $item['tooltipText'] ?? '' ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Testimonial slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_testimonial( array $attrs ): array {
			$items  = isset( $attrs['sliderItems'] ) && is_array( $attrs['sliderItems'] ) ? $attrs['sliderItems'] : [];
			$slides = [];

			foreach ( $items as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$author_image_url = '';
				$author_image_alt = '';
				if ( ! empty( $item['authorImage'] ) && is_array( $item['authorImage'] ) ) {
					$author_image_url = esc_url_raw( $item['authorImage']['url'] ?? '' );
					$author_image_alt = sanitize_text_field( $item['authorImage']['alt'] ?? '' );
				}

				$rating = isset( $item['ratingNumber'] ) ? (float) $item['ratingNumber'] : 5.0;

				$slides[] = [
					'id'                => $item['id'] ?? ( $index + 1 ),
					'authorName'        => wp_kses_post( $item['authorName'] ?? '' ),
					'authorDesignation' => wp_kses_post( $item['authorDesignation'] ?? '' ),
					'authorImageUrl'    => $author_image_url,
					'authorImageAlt'    => $author_image_alt,
					'testimonialTitle'  => wp_kses_post( $item['testimonialTitle'] ?? '' ),
					'testimonialText'   => wp_kses_post( $item['testimonialText'] ?? '' ),
					'ratingNumber'      => max( 0.0, min( 5.0, $rating ) ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Flexi Content slides from inner blocks.
		 *
		 * @since 1.1.9
		 *
		 * @param array $inner_blocks Array of child blocks from parse_blocks().
		 * @return array Normalized array of slides.
		 */
		public static function normalize_flexi_content( array $inner_blocks ): array {
			$slides = [];

			foreach ( $inner_blocks as $index => $inner_block ) {
				if ( ! is_array( $inner_block ) ) {
					continue;
				}

				$inner_name  = $inner_block['blockName'] ?? '';
				$inner_attrs = isset( $inner_block['attrs'] ) && is_array( $inner_block['attrs'] ) ? $inner_block['attrs'] : [];
				$slide_id    = isset( $inner_attrs['blockId'] ) ? sanitize_key( $inner_attrs['blockId'] ) : ( 'slide-' . ( $index + 1 ) );

				$slides[] = [
					'id'          => $slide_id,
					'blockName'   => $inner_name,
					'innerHtml'   => render_block( $inner_block ),
					'innerBlocks' => $inner_block['innerBlocks'] ?? [],
				];
			}

			return $slides;
		}

	}

}
