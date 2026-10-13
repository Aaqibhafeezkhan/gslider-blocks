<?php
/**
 * Confirms register_rest_field receives the gslider_blocks schema array.
 *
 * WordPress copies field args schema onto OPTIONS schema.properties and does
 * not call it. This script records that value the way core would.
 *
 * @package GSlider
 */

define( 'ABSPATH', __DIR__ );

class WP_REST_Controller {
	protected $schema;

	public function add_additional_fields_schema( $schema ) {
		return $schema;
	}
}

class WP_REST_Server {
	const READABLE = 'GET';
}

function apply_filters( $hook, $value ) {
	if ( 'gslider_rest_field_post_types' === $hook ) {
		$value[] = 'product';
	}
	return $value;
}

function __( $text, $domain = 'default' ) {
	return $text;
}

function register_rest_field( $object_type, $attribute, $args ) {
	$GLOBALS['registered_rest_fields'][] = [
		'object_type' => $object_type,
		'attribute'   => $attribute,
		'args'        => $args,
	];
}

require dirname( __DIR__ ) . '/includes/Interfaces/Registrable.php';
require dirname( __DIR__ ) . '/includes/Traits/SingletonTrait.php';
require dirname( __DIR__ ) . '/includes/RestApi/BlocksController.php';

use GSlider\RestApi\BlocksController;

function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
	fwrite( STDOUT, "OK: {$message}\n" );
}

$controller = BlocksController::getInstance();
$controller->register_rest_fields();

assert_true( 1 === count( $GLOBALS['registered_rest_fields'] ), 'the field is registered once' );
$registered = $GLOBALS['registered_rest_fields'][0];
assert_true( [ 'post', 'page', 'product' ] === $registered['object_type'], 'the post type filter still adds types' );
assert_true( 'gslider_blocks' === $registered['attribute'], 'the field name is gslider_blocks' );
assert_true( is_callable( $registered['args']['get_callback'] ), 'get_callback stays a callable' );

$schema = $registered['args']['schema'];
assert_true( is_array( $schema ) && ! is_callable( $schema ), 'schema is the document array, not a callable' );
assert_true( $schema === $controller->get_gslider_blocks_schema(), 'schema is the value get_gslider_blocks_schema returns' );

$options = [
	'properties' => [
		'gslider_blocks' => $schema,
	],
];
assert_true( 'array' === $options['properties']['gslider_blocks']['type'], 'OPTIONS gslider_blocks.type is array' );
assert_true( true === $options['properties']['gslider_blocks']['readonly'], 'OPTIONS gslider_blocks is readonly' );

$properties = array_keys( $options['properties']['gslider_blocks']['items']['properties'] );
$expected   = [ 'blockId', 'blockName', 'sliderType', 'totalSlides', 'swiperConfig', 'css', 'slides', 'attrs' ];
assert_true( $expected === $properties, 'OPTIONS items.properties lists the block fields' );

$route = $controller->get_item_schema();
assert_true(
	$route['properties']['blocks'] === $controller->get_gslider_blocks_schema(),
	'custom route blocks schema still calls get_gslider_blocks_schema'
);
assert_true( 'array' === $route['properties']['blocks']['type'], 'custom route blocks.type stays array' );

fwrite( STDOUT, "Field schema checks passed.\n" );
