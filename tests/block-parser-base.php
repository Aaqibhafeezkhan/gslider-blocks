<?php
/**
 * Focused checks for base-block slide parsing.
 *
 * @package GSlider
 */

define( 'ABSPATH', __DIR__ );

function sanitize_text_field( $text ) {
	return is_string( $text ) ? trim( strip_tags( $text ) ) : $text;
}

function sanitize_key( $key ) {
	$key = strtolower( (string) $key );
	return preg_replace( '/[^a-z0-9_\-]/', '', $key );
}

function esc_url_raw( $url ) {
	return (string) $url;
}

function wp_kses_post( $text ) {
	return (string) $text;
}

function apply_filters( $hook, $value, ...$extra ) {
	return $value;
}

function render_block( $block ) {
	return '<p>flexi</p>';
}

function wp_strip_all_tags( $text ) {
	return trim( strip_tags( preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', (string) $text ) ) );
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require dirname( __DIR__ ) . '/includes/Utils/CssSanitizer.php';
require dirname( __DIR__ ) . '/includes/RestApi/BlockParser.php';

use GSlider\RestApi\BlockParser;
use GSlider\Utils\CssSanitizer;

function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
	fwrite( STDOUT, "OK: {$message}\n" );
}

function normalize( array $attrs, string $name ) {
	return BlockParser::normalize_block(
		[
			'blockName' => $name,
			'attrs'     => $attrs,
		]
	);
}

$one = normalize(
	[
		'blockId'     => 'gslider-base',
		'images'      => [
			[
				'id'  => 9,
				'url' => 'https://example.com/not-a-base-slide.jpg',
			],
		],
		'sliderItems' => [
			[
				'id'                      => 'item-1',
				'subTitle'                => 'Sub Title',
				'title'                   => 'Slider Item 1',
				'description'             => 'First slide copy',
				'primaryButtonText'       => 'Get Started',
				'primaryButtonLink'       => '#',
				'primaryButtonTargetLink' => false,
				'secondaryButtonSwitcher' => true,
				'secondaryButtonText'     => 'Learn more',
				'secondaryButtonLink'     => 'https://example.com/more',
			],
		],
	],
	'gslider-blocks/base'
);

assert_true( 'gslider-blocks/base' === $one['blockName'], 'blockName stays gslider-blocks/base' );
assert_true( 1 === $one['totalSlides'], 'one default item counts as one slide' );
assert_true( 'Slider Item 1' === $one['slides'][0]['title'], 'slides[0].title is the item title' );
assert_true( 'item-1' === $one['slides'][0]['id'], 'slide id is copied' );
assert_true( 'Sub Title' === $one['slides'][0]['subTitle'], 'subTitle is copied' );
assert_true( 'First slide copy' === $one['slides'][0]['description'], 'description is copied' );
assert_true( 'Get Started' === $one['slides'][0]['primaryButtonText'], 'primary button text is copied' );
assert_true( false === $one['slides'][0]['primaryButtonTargetLink'] && is_bool( $one['slides'][0]['primaryButtonTargetLink'] ), 'primaryButtonTargetLink stays boolean false' );
assert_true( true === $one['slides'][0]['secondaryButtonSwitcher'] && is_bool( $one['slides'][0]['secondaryButtonSwitcher'] ), 'secondaryButtonSwitcher stays boolean true' );
assert_true( ! isset( $one['slides'][0]['url'], $one['slides'][0]['authorName'], $one['slides'][0]['ratingNumber'] ), 'base slides are not image or testimonial items' );
assert_true( 'Slider Item 1' === $one['attrs']['sliderItems'][0]['title'], 'raw attrs.sliderItems stays on the payload' );

$two = normalize(
	[
		'sliderItems' => [
			[ 'id' => 'item-1', 'title' => 'Slider Item 1' ],
			[ 'id' => 'item-2', 'title' => 'Slider Item 2' ],
			'not-an-item',
		],
	],
	'gslider-blocks/base'
);
assert_true( 2 === $two['totalSlides'] && 2 === count( $two['slides'] ), 'two slider items return two slides' );
assert_true( 'Slider Item 2' === $two['slides'][1]['title'], 'the second slide title is copied' );
assert_true( true === $two['slides'][0]['primaryButtonTargetLink'] && false === $two['slides'][0]['secondaryButtonSwitcher'], 'omitted button flags use the editor defaults as booleans' );

$empty = normalize( [ 'blockId' => 'gslider-empty' ], 'gslider-blocks/base' );
assert_true( [] === $empty['slides'] && 0 === $empty['totalSlides'], 'missing sliderItems returns an empty slide list' );

$image = normalize(
	[
		'images' => [
			[
				'id'          => 4,
				'url'         => 'https://example.com/photo.jpg',
				'alt'         => 'Photo',
				'caption'     => 'Caption',
				'link'        => 'https://example.com',
				'tooltipText' => 'Tip',
			],
		],
	],
	'gslider-blocks/image-slider'
);
assert_true( 1 === $image['totalSlides'] && 'https://example.com/photo.jpg' === $image['slides'][0]['url'], 'image slides stay url items' );

$logo = normalize(
	[
		'logos' => [
			[
				'id'  => 5,
				'url' => 'https://example.com/logo.png',
				'alt' => 'Logo',
			],
		],
	],
	'gslider-blocks/logo-carousel'
);
assert_true( 'https://example.com/logo.png' === $logo['slides'][0]['url'] && ! isset( $logo['slides'][0]['title'] ), 'logo slides stay logo items' );

$testimonial = normalize(
	[
		'sliderItems' => [
			[
				'id'               => 't-1',
				'authorName'       => 'Ada',
				'testimonialText'  => 'Great',
				'ratingNumber'     => 5,
			],
		],
	],
	'gslider-blocks/testimonial'
);
assert_true( 'Ada' === $testimonial['slides'][0]['authorName'] && ! isset( $testimonial['slides'][0]['subTitle'] ), 'testimonial slides keep testimonial fields' );

$flexi = BlockParser::normalize_block(
	[
		'blockName'   => 'gslider-blocks/flexi-content',
		'attrs'       => [],
		'innerBlocks' => [
			[
				'blockName'   => 'gslider-blocks/flexi-content-item',
				'attrs'       => [ 'blockId' => 'slide-a' ],
				'innerBlocks' => [],
			],
		],
	]
);
assert_true( 'gslider-blocks/flexi-content-item' === $flexi['slides'][0]['blockName'] && 1 === $flexi['totalSlides'], 'flexi slides stay child blocks' );

$valid_css = ".gslider-base-1 .swiper{padding:10px 20px !important;background-image:url(https://example.com/a.jpg);background:linear-gradient(90deg, rgba(0,0,0,.5) 0%, #fff 100%);}\n@media (max-width: 767px){.gslider-base-1 .slide{background:url(\"https://example.com/b.png\") center/cover no-repeat;}}";
assert_true( $valid_css === CssSanitizer::sanitize( $valid_css ), 'valid generated CSS passes through unchanged' );

$payloads = [
	'.a{color:red}@import url(https://evil.example/a.css);',
	'@IMPORT "https://evil.example/a.css";.a{color:red}',
	'@im@import x;port url(https://evil.example/a.css);.a{color:red}',
	'.a{background:url(javajavascript:script:alert(1));color:red}',
	'@\69mport url(https://evil.example/a.css);.a{color:red}',
	'.a{width:expression(alert(1));color:red}',
	'.a{background:url(JaVaScRiPt :alert(1));color:red}',
	'.a{-moz-binding:url(https://evil.example/x.xml#x);color:red}',
	'.a{behavior:url(x.htc);color:red}',
	'.a{background:url( "data:text/html;base64,PHNjcmlwdD4=");color:red}',
	'.a{color:red}</style><script>alert(1)</script>',
	'.a{color:red}</STYLE ',
];
foreach ( $payloads as $payload ) {
	$clean = strtolower( CssSanitizer::sanitize( $payload ) );
	$bad   = preg_match( '/<|@import|@\\\\|expression\s*\(|javascript\s*:|-moz-binding|behavior\s*:|url\s*\(\s*[\'"]?\s*data:/', $clean );
	assert_true( ! $bad && false !== strpos( $clean, 'color:red' ), 'sanitizer neutralizes ' . $payload );
}
assert_true( '' === CssSanitizer::sanitize( [ 'x' ] ) && '' === CssSanitizer::sanitize( null ), 'sanitizer rejects non-strings' );

$styled = normalize(
	[
		'blockId'    => 'gslider-base',
		'blockStyle' => '.x{color:red}@import url(https://evil.example/a.css);</style><script>alert(1)</script>',
	],
	'gslider-blocks/base'
);
assert_true( '.x{color:red}' === $styled['css'] && $styled['css'] === $styled['attrs']['blockStyle'], 'REST css and attrs.blockStyle are sanitized' );

fwrite( STDOUT, "Base block slide checks passed.\n" );
