<?php
/**
 * Focused permission checks for BlocksController.
 *
 * Stubs the WordPress functions this class calls so the password,
 * public, draft, and non-public post type branches can run without
 * a database.
 *
 * @package GSlider
 */

define( 'ABSPATH', __DIR__ );

class WP_Post {
	public $ID;
	public $post_status;
	public $post_password;
	public $post_type;
	public $post_title;
}

class WP_Error {
	public $code;
	public $message;
	public $data;

	public function __construct( $code = '', $message = '', $data = [] ) {
		$this->code    = $code;
		$this->message = $message;
		$this->data    = $data;
	}
}

class WP_REST_Controller {}

class WP_REST_Server {
	const READABLE = 'GET';
}

class WP_REST_Request {
	public $params;

	public function __construct( array $params ) {
		$this->params = $params;
	}

	public function get_param( $key ) {
		return $this->params[ $key ] ?? null;
	}
}

$posts           = [];
$can_read        = [];
$password_clear  = [];
$parsed_posts    = [];

function get_post( $post_id ) {
	global $posts;
	return $posts[ (int) $post_id ] ?? null;
}

function post_password_required( $post ) {
	global $password_clear;
	if ( ! $post instanceof WP_Post || '' === (string) $post->post_password ) {
		return false;
	}
	return empty( $password_clear[ (int) $post->ID ] );
}

function get_post_type_object( $post_type ) {
	$public_types = [ 'post', 'page' ];
	$type         = new stdClass();
	$type->name   = $post_type;
	$type->public = in_array( $post_type, $public_types, true );
	$type->cap    = (object) [ 'read_post' => 'read_post' ];
	return $type;
}

function current_user_can( $cap, $post_id ) {
	global $can_read;
	return ! empty( $can_read[ (int) $post_id ] ) && 'read_post' === $cap;
}

function rest_authorization_required_code() {
	return 401;
}

function __( $text, $domain = 'default' ) {
	return $text;
}

function get_the_title( $post ) {
	return $post instanceof WP_Post ? $post->post_title : '';
}

function rest_ensure_response( $data ) {
	return $data;
}

require __DIR__ . '/stubs/block-parser.php';
require dirname( __DIR__ ) . '/includes/Interfaces/Registrable.php';
require dirname( __DIR__ ) . '/includes/Traits/SingletonTrait.php';
require dirname( __DIR__ ) . '/includes/RestApi/BlocksController.php';

use GSlider\RestApi\BlocksController;

function make_post( $id, $status, $type, $password = '' ) {
	$post                = new WP_Post();
	$post->ID            = $id;
	$post->post_status   = $status;
	$post->post_type     = $type;
	$post->post_password = $password;
	$post->post_title    = 'Slider post ' . $id;
	return $post;
}

function request_for( $id ) {
	return new WP_REST_Request( [ 'id' => $id ] );
}

function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
	fwrite( STDOUT, "OK: {$message}\n" );
}

$controller = BlocksController::getInstance();

$posts[10] = make_post( 10, 'publish', 'post', 'secret' );
$result    = $controller->get_item_permissions_check( request_for( 10 ) );
assert_true( $result instanceof WP_Error, 'password-protected published post is denied' );
assert_true( 'rest_cannot_read_post' === $result->code, 'password denial uses the read error' );
assert_true( 404 !== ( $result->data['status'] ?? null ), 'password denial is not a 404' );
$field = $controller->get_gslider_blocks_field( [ 'id' => 10 ] );
assert_true( [] === $field, 'password-protected core field is an empty list' );
assert_true( [] === $GLOBALS['parsed_posts'], 'password-protected field does not parse slides' );

$password_clear[10] = true;
$result             = $controller->get_item_permissions_check( request_for( 10 ) );
assert_true( true === $result, 'correct password cookie allows the published post' );
$field = $controller->get_gslider_blocks_field( [ 'id' => 10 ] );
assert_true( isset( $field[0]['slides'][0]['text'] ), 'unlocked field returns slide text' );

$posts[11] = make_post( 11, 'publish', 'post' );
$result    = $controller->get_item_permissions_check( request_for( 11 ) );
assert_true( true === $result, 'published public post with no password is readable while logged out' );
$item = $controller->get_item( request_for( 11 ) );
assert_true( is_array( $item ) && isset( $item['blocks'][0]['attrs'], $item['blocks'][0]['css'] ), 'public route returns attrs and css' );

$posts[12] = make_post( 12, 'draft', 'post' );
$result    = $controller->get_item_permissions_check( request_for( 12 ) );
assert_true( $result instanceof WP_Error && 'rest_cannot_read_post' === $result->code, 'draft without read_post is denied' );
$can_read[12] = true;
$result       = $controller->get_item_permissions_check( request_for( 12 ) );
assert_true( true === $result, 'draft with read_post is allowed' );

$posts[13] = make_post( 13, 'publish', 'internal_note' );
$result    = $controller->get_item_permissions_check( request_for( 13 ) );
assert_true( $result instanceof WP_Error && 'rest_cannot_read_post' === $result->code, 'published non-public type is denied while logged out' );
$can_read[13] = true;
$result       = $controller->get_item_permissions_check( request_for( 13 ) );
assert_true( true === $result, 'published non-public type is allowed with read_post' );

$result = $controller->get_item_permissions_check( request_for( 99 ) );
assert_true( $result instanceof WP_Error && 404 === ( $result->data['status'] ?? null ), 'missing post is a 404' );

$empty = $controller->get_gslider_blocks_field( [ 'id' => 0 ] );
assert_true( [] === $empty, 'missing field id stays an empty list' );

fwrite( STDOUT, "All blocks permission checks passed.\n" );
