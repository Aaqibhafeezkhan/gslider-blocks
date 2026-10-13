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
		 * @param int|string|\WP_Post $post_or_id Post ID, WP_Post instance, or raw post content string.
		 * @return array Array of normalized GSlider block structures.
		 */
		public static function parse_post_blocks( $post_or_id ): array {
			$content = '';

			if ( $post_or_id instanceof \WP_Post ) {
				$content = $post_or_id->post_content;
			} elseif ( is_numeric( $post_or_id ) ) {
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

			$swiper_config = self::extract_swiper_config( $attrs );
			$css           = self::extract_block_styles( $attrs );

			$data = [
				'blockId'      => $block_id,
				'blockName'    => $block_name,
				'sliderType'   => $block_slug,
				'totalSlides'  => count( $slides ),
				'swiperConfig' => $swiper_config,
				'css'          => $css,
				'slides'       => $slides,
				'attrs'        => $attrs,
			];

			/**
			 * Filters the normalized block payload for a GSlider block.
			 *
			 * @since 1.1.9
			 *
			 * @param array $data  Normalized block payload.
			 * @param array $block Raw Gutenberg block structure.
			 */
			return apply_filters( 'gslider_normalized_block_data', $data, $block );
		}

		/**
		 * Extracts and normalizes Swiper.js configuration from block attributes.
		 *
		 * Generates clean responsive breakpoints and control settings
		 * ready to be passed directly to Swiper / Swiper React in Next.js.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Swiper.js configuration object.
		 */
		public static function extract_swiper_config( array $attrs ): array {
			$slider_type     = $attrs['sliderType'] ?? 'carousel';
			$carousel_effect = $attrs['carouselEffect'] ?? 'slide';
			$slide_effect    = $attrs['slideEffect'] ?? 'slide';
			$effect          = 'carousel' === $slider_type ? $carousel_effect : $slide_effect;

			$per_column      = is_array( $attrs['carouselPerColumn'] ?? null ) ? $attrs['carouselPerColumn'] : [];
			$gap             = is_array( $attrs['carouselPerColumnGap'] ?? null ) ? $attrs['carouselPerColumnGap'] : [];
			$speed           = is_array( $attrs['speed'] ?? null ) ? $attrs['speed'] : [];
			$autoplay        = ! empty( $attrs['autoplay'] );
			$autoplay_delay  = is_array( $attrs['autoplayDelay'] ?? null ) ? $attrs['autoplayDelay'] : [];

			$show_nav        = is_array( $attrs['showNavigation'] ?? null ) ? $attrs['showNavigation'] : [];
			$show_pagi       = is_array( $attrs['showPagination'] ?? null ) ? $attrs['showPagination'] : [];

			$nav_mobile      = ! empty( $show_nav['Mobile'] );
			$nav_tablet      = ! empty( $show_nav['Tablet'] );
			$nav_desktop     = ! empty( $show_nav['Desktop'] );
			$any_nav         = $nav_mobile || $nav_tablet || $nav_desktop;

			$pagi_mobile     = ! empty( $show_pagi['Mobile'] );
			$pagi_tablet     = ! empty( $show_pagi['Tablet'] );
			$pagi_desktop    = ! empty( $show_pagi['Desktop'] );
			$any_pagi        = $pagi_mobile || $pagi_tablet || $pagi_desktop;

			$pagination_type = $attrs['paginationType'] ?? 'bullets';
			$dynamic_bullets = 'bullets' === $pagination_type && ! empty( $attrs['dynamicBullets'] );

			$breakpoints = [
				0    => [
					'slidesPerView' => (float) ( $per_column['Mobile'] ?? 1 ),
					'spaceBetween'  => (int) ( $gap['Mobile'] ?? 0 ),
					'speed'         => (int) ( $speed['Mobile'] ?? 800 ),
					'autoplay'      => $autoplay ? [ 'delay' => (int) ( $autoplay_delay['Mobile'] ?? 1000 ) ] : false,
					'navigation'    => [ 'enabled' => $nav_mobile ],
					'pagination'    => [ 'enabled' => $pagi_mobile ],
				],
				768  => [
					'slidesPerView' => (float) ( $per_column['Tablet'] ?? 2 ),
					'spaceBetween'  => (int) ( $gap['Tablet'] ?? 20 ),
					'speed'         => (int) ( $speed['Tablet'] ?? 800 ),
					'autoplay'      => $autoplay ? [ 'delay' => (int) ( $autoplay_delay['Tablet'] ?? 1000 ) ] : false,
					'navigation'    => [ 'enabled' => $nav_tablet ],
					'pagination'    => [ 'enabled' => $pagi_tablet ],
				],
				1025 => [
					'slidesPerView' => (float) ( $per_column['Desktop'] ?? 2 ),
					'spaceBetween'  => (int) ( $gap['Desktop'] ?? 20 ),
					'speed'         => (int) ( $speed['Desktop'] ?? 800 ),
					'autoplay'      => $autoplay ? [ 'delay' => (int) ( $autoplay_delay['Desktop'] ?? 1000 ) ] : false,
					'navigation'    => [ 'enabled' => $nav_desktop ],
					'pagination'    => [ 'enabled' => $pagi_desktop ],
				],
			];

			$config = [
				'effect'         => $effect,
				'loop'           => ! empty( $attrs['infiniteLoop'] ),
				'allowTouchMove' => ! isset( $attrs['allowTouchMove'] ) || ! empty( $attrs['allowTouchMove'] ),
				'mousewheel'     => ! empty( $attrs['mousewheelControl'] ),
				'keyboard'       => ! empty( $attrs['keyboardNavigation'] ) ? [ 'enabled' => true, 'onlyInViewport' => true ] : false,
				'breakpoints'    => $breakpoints,
				'navigation'     => [
					'enabled' => $any_nav,
				],
				'pagination'     => [
					'enabled'        => $any_pagi,
					'type'           => $pagination_type,
					'dynamicBullets' => $dynamic_bullets,
					'clickable'      => true,
				],
			];

			if ( $autoplay ) {
				$config['autoplay'] = [
					'pauseOnMouseEnter'    => ! empty( $attrs['pauseOnHover'] ),
					'disableOnInteraction' => false,
					'stopOnLastSlide'      => ! empty( $attrs['stopOnLastSlide'] ),
					'reverseDirection'     => ! empty( $attrs['reverseDirection'] ),
				];
			} else {
				$config['autoplay'] = false;
			}

			if ( isset( $attrs['layoutHeightSwitcher'] ) && 'adapt' === $attrs['layoutHeightSwitcher'] ) {
				$config['autoHeight'] = true;
			}

			return $config;
		}

		/**
		 * Extracts the pre-generated blockStyle CSS string from attributes.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return string CSS stylesheet string.
		 */
		public static function extract_block_styles( array $attrs ): string {
			if ( ! empty( $attrs['blockStyle'] ) && is_string( $attrs['blockStyle'] ) ) {
				return trim( $attrs['blockStyle'] );
			}

			return '';
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
