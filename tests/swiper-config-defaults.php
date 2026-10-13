<?php
/**
 * Checks that omitted Gutenberg defaults and explicit Swiper values
 * are both preserved in swiperConfig.
 *
 * @package GSlider
 */

define( 'ABSPATH', __DIR__ );

function sanitize_text_field( $text ) {
	return is_string( $text ) ? trim( strip_tags( $text ) ) : $text;
}

function sanitize_key( $key ) {
	return preg_replace( '/[^a-z0-9_\-]/', '', strtolower( (string) $key ) );
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

require dirname( __DIR__ ) . '/includes/RestApi/BlockParser.php';

use GSlider\RestApi\BlockParser;

function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
	fwrite( STDOUT, "OK: {$message}\n" );
}

function config_for( string $name, array $attrs ): array {
	return BlockParser::extract_swiper_config( $attrs, $name );
}

function breakpoint_has_carousel_keys( array $config ): bool {
	foreach ( $config['breakpoints'] as $breakpoint ) {
		if ( array_key_exists( 'slidesPerView', $breakpoint ) || array_key_exists( 'spaceBetween', $breakpoint ) ) {
			return true;
		}
	}
	return false;
}

$omitted = BlockParser::normalize_block(
	[
		'blockName' => 'gslider-blocks/base',
		'attrs'     => [
			'blockId' => 'gslider-base',
		],
	]
);
$base = $omitted['swiperConfig'];
assert_true( ! array_key_exists( 'sliderType', $omitted['attrs'] ), 'omitted defaults stay out of the raw attrs bag' );
assert_true( true === $base['loop'], 'omitted base infiniteLoop becomes loop true' );
assert_true( 'slide' === $base['effect'], 'omitted base sliderType uses slideEffect' );
assert_true( false === $base['autoplay'], 'omitted autoplay stays off' );
assert_true( true === $base['allowTouchMove'], 'omitted allowTouchMove stays true' );
assert_true( true === $base['navigation']['enabled'], 'omitted base navigation is enabled' );
assert_true( true === $base['pagination']['enabled'], 'omitted base pagination is enabled' );
assert_true( true === $base['breakpoints'][0]['navigation']['enabled'], 'omitted mobile navigation is enabled' );
assert_true( true === $base['breakpoints'][1025]['pagination']['enabled'], 'omitted desktop pagination is enabled' );
assert_true( ! breakpoint_has_carousel_keys( $base ), 'slider mode does not invent slidesPerView or spaceBetween' );

foreach ( [ 'gslider-blocks/testimonial', 'gslider-blocks/flexi-content' ] as $name ) {
	$typed = config_for( $name, [] );
	assert_true( 'slide' === $typed['effect'] && true === $typed['loop'] && ! breakpoint_has_carousel_keys( $typed ), "{$name} omitted defaults match a slider" );
}

$image = config_for( 'gslider-blocks/image-slider', [] );
assert_true( 'slide' === $image['effect'], 'omitted image-slider effect is carouselEffect slide' );
assert_true( 1.0 === $image['breakpoints'][0]['slidesPerView'] && 1.0 === $image['breakpoints'][768]['slidesPerView'] && 1.0 === $image['breakpoints'][1025]['slidesPerView'], 'omitted image columns are 1/1/1' );
assert_true( 0 === $image['breakpoints'][0]['spaceBetween'] && 0 === $image['breakpoints'][768]['spaceBetween'] && 0 === $image['breakpoints'][1025]['spaceBetween'], 'omitted image gap stays 0 and is not replaced with 20' );

$logo = config_for( 'gslider-blocks/logo-carousel', [] );
assert_true( 1.0 === $logo['breakpoints'][0]['slidesPerView'] && 2.0 === $logo['breakpoints'][768]['slidesPerView'] && 2.0 === $logo['breakpoints'][1025]['slidesPerView'], 'omitted logo columns are 2/2/1' );
assert_true( 10 === $logo['breakpoints'][0]['spaceBetween'] && 10 === $logo['breakpoints'][768]['spaceBetween'] && 10 === $logo['breakpoints'][1025]['spaceBetween'], 'omitted logo gap is 10/10/10' );

$fade = config_for( 'gslider-blocks/base', [ 'slideEffect' => 'fade' ] );
assert_true( 'fade' === $fade['effect'], 'omitted sliderType with slideEffect fade reports fade' );
assert_true( ! isset( $fade['creativeEffect'] ), 'fade does not add creativeEffect' );

$creative = config_for( 'gslider-blocks/base', [ 'slideEffect' => 'creative' ] );
assert_true( 'creative' === $creative['effect'], 'creative slideEffect is the reported effect' );
assert_true( true === $creative['creativeEffect']['prev']['shadow'] && [ 0, 0, -400 ] === $creative['creativeEffect']['prev']['translate'], 'creativeEffect.prev matches save()' );
assert_true( [ '100%', 0, 0 ] === $creative['creativeEffect']['next']['translate'], 'creativeEffect.next matches save()' );

$explicit = config_for(
	'gslider-blocks/base',
	[
		'sliderType'     => 'carousel',
		'infiniteLoop'   => false,
		'carouselEffect' => 'coverflow',
		'carouselPerColumnGap' => [
			'Mobile' => 0,
		],
		'keyboardNavigation' => true,
		'showNavigation' => [
			'Desktop' => false,
			'Tablet'  => false,
			'Mobile'  => false,
		],
	]
);
assert_true( 'coverflow' === $explicit['effect'], 'explicit carousel type uses carouselEffect' );
assert_true( false === $explicit['loop'], 'explicit infiniteLoop false stays false' );
assert_true( 2.0 === $explicit['breakpoints'][1025]['slidesPerView'], 'explicit carousel type includes desktop columns' );
assert_true( 0 === $explicit['breakpoints'][0]['spaceBetween'], 'explicit mobile gap 0 is kept' );
assert_true( 20 === $explicit['breakpoints'][768]['spaceBetween'], 'omitted tablet gap uses the base default of 20' );
assert_true( false === $explicit['navigation']['enabled'], 'explicit navigation off stays off' );
assert_true( false === $explicit['keyboard']['pageUpDown'] && true === $explicit['keyboard']['enabled'], 'enabled keyboard sets pageUpDown false' );

fwrite( STDOUT, "Swiper default checks passed.\n" );
