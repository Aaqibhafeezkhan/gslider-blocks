<?php
/**
 * Stand-in for BlockParser used by the permission check script.
 *
 * @package GSlider
 */

namespace GSlider\RestApi;

class BlockParser {

	public static function parse_post_blocks( $post ) {
		$GLOBALS['parsed_posts'][] = $post;
		return [
			[
				'slides' => [
					[
						'text' => 'Visible slide',
						'url'  => 'https://example.com/slide.jpg',
					],
				],
				'attrs'  => [ 'carouselEffect' => 'slide' ],
				'css'    => '.gslider{display:block;}',
			],
		];
	}
}
