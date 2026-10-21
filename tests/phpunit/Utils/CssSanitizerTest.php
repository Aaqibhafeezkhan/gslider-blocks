<?php
/**
 * Unit tests for GSlider\Utils\CssSanitizer.
 *
 * Verifies that:
 * 1. CssSanitizer class exists and PATTERNS constant is defined.
 * 2. Valid and benign CSS properties, selectors, media queries, and variables pass through untouched.
 * 3. Various @import variations (standard, uppercase, unicode escapes, unclosed) are neutralized.
 * 4. Nested evasion payloads are stripped via recursive multi-pass processing.
 * 5. The javascript: protocol is stripped from inside url() declarations, including mixed-case and nested variants.
 * 6. Legacy IE attack vectors (expression, behavior, -moz-binding) are neutralized.
 * 7. Base64 data URIs inside url() declarations are stripped.
 * 8. HTML tags (<style>, </style>, <script>, etc.) are stripped.
 * 9. Non-string inputs (arrays, objects, booleans, null, numbers) and empty strings return an empty string safely.
 *
 * @package GSlider\Tests\Utils
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

use GSlider\Utils\CssSanitizer;

/**
 * Test class for GSlider\Utils\CssSanitizer.
 */
class CssSanitizerTest {

	/**
	 * Helper assertion for strict boolean conditions.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( bool $condition, string $message ): void {
		if ( true !== $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Helper assertion for strict identical comparisons.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion message.
	 * @return void
	 */
	public function assert_same( $expected, $actual, string $message ): void {
		if ( $expected !== $actual ) {
			fwrite( STDERR, "FAIL: {$message} (Expected: " . var_export( $expected, true ) . ', Got: ' . var_export( $actual, true ) . ")\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider CssSanitizer Unit Tests ===\n\n";

		$this->test_class_exists_and_patterns_constant();
		$this->test_preserves_valid_css();
		$this->test_neutralizes_import_variations();
		$this->test_neutralizes_nested_evasion_payloads();
		$this->test_neutralizes_javascript_protocol();
		$this->test_neutralizes_legacy_ie_vectors();
		$this->test_neutralizes_data_uris();
		$this->test_neutralizes_html_tags();
		$this->test_handles_non_string_inputs_safely();

		echo "\nAll CssSanitizer unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Class exists and PATTERNS constant is defined as an array of regexes.
	 *
	 * @return void
	 */
	public function test_class_exists_and_patterns_constant(): void {
		$this->assert_true( class_exists( CssSanitizer::class ), 'CssSanitizer class exists' );
		$this->assert_true( is_array( CssSanitizer::PATTERNS ), 'CssSanitizer::PATTERNS is an array' );
		$this->assert_true( ! empty( CssSanitizer::PATTERNS ), 'CssSanitizer::PATTERNS is not empty' );

		foreach ( CssSanitizer::PATTERNS as $pattern ) {
			$this->assert_true( is_string( $pattern ) && '' !== $pattern, 'CssSanitizer pattern is a non-empty string' );
			$this->assert_true( false !== @preg_match( $pattern, '' ), 'CssSanitizer pattern compiles as valid PCRE regex: ' . $pattern );
		}
	}

	/**
	 * Test 2: Normal, benign CSS passes through untouched.
	 *
	 * @return void
	 */
	public function test_preserves_valid_css(): void {
		$benign_rules = [
			'.slider{border-radius:8px;color:#333;margin:0 auto;}',
			'#gslider-1234 { padding: 20px 10px; background-color: #f5f5f5; font-size: 16px; }',
			'.gslider-item { display: flex; align-items: center; justify-content: space-between; }',
			'@media (max-width: 768px) { .slider { width: 100%; display: block; } }',
			':root { --slider-primary-color: #0073aa; --slider-gap: 1.5rem; }',
			'.slide-title { font-family: "Open Sans", sans-serif; font-weight: 700; line-height: 1.4; }',
			'.slide-overlay { opacity: 0.85; transform: translate3d(0, 0, 0); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }',
		];

		foreach ( $benign_rules as $css ) {
			$this->assert_same( $css, CssSanitizer::sanitize( $css ), 'Benign CSS preserved: ' . substr( $css, 0, 40 ) . '...' );
		}
	}

	/**
	 * Test 3: Neutralizes all @import variations.
	 *
	 * @return void
	 */
	public function test_neutralizes_import_variations(): void {
		// Standard @import with url and quotes.
		$this->assert_same( '', CssSanitizer::sanitize( "@import url('https://evil.com/a.css');" ), 'Standard @import url neutralized' );

		// Uppercase @IMPORT with double quotes.
		$this->assert_same( '', CssSanitizer::sanitize( '@IMPORT "https://evil.com/a.css";' ), 'Uppercase @IMPORT neutralized' );

		// Unicode escape variations (@\69mport).
		$this->assert_same( '', CssSanitizer::sanitize( '@\\69mport url(https://evil.com/a.css);' ), 'Unicode escaped @\69mport neutralized' );

		// Unclosed @import without semicolon.
		$this->assert_same( '', CssSanitizer::sanitize( "@import url('https://evil.com/a.css')" ), 'Unclosed @import neutralized' );

		// @import embedded within legitimate CSS.
		$mixed_css = ".slider{color:red;}@import url('https://evil.com/a.css');.banner{font-size:16px;}";
		$expected  = '.slider{color:red;}.banner{font-size:16px;}';
		$this->assert_same( $expected, CssSanitizer::sanitize( $mixed_css ), 'Embedded @import stripped while preserving surrounding rules' );
	}

	/**
	 * Test 4: Neutralizes nested evasion payloads via recursive multi-pass stripping.
	 *
	 * @return void
	 */
	public function test_neutralizes_nested_evasion_payloads(): void {
		// Multi-layer nested @import re-forming attempt (@im@import x;port).
		$nested_import = '@im@import x;port url(https://evil.com/a.css);.a{color:red}';
		$this->assert_same( '.a{color:red}', CssSanitizer::sanitize( $nested_import ), 'Nested @im@importport evasion payload neutralized' );

		// Multi-pass recursive @import nesting.
		$multi_pass = '@im@im@import x;port x;port url("https://evil.com/a.css");.box{margin:0;}';
		$this->assert_same( '.box{margin:0;}', CssSanitizer::sanitize( $multi_pass ), '3-pass nested @import stripped cleanly' );

		// Payload exceeding the 10-pass stabilization loop returns empty string.
		$exceeding_payload = '@import x;';
		for ( $i = 0; $i < 11; $i++ ) {
			$exceeding_payload = '@im' . $exceeding_payload . 'port x;';
		}
		$this->assert_same( '', CssSanitizer::sanitize( $exceeding_payload ), 'Payload exceeding 10-pass limit safely returns empty string' );
	}

	/**
	 * Test 5: Neutralizes javascript: protocol execution in url() declarations.
	 *
	 * @return void
	 */
	public function test_neutralizes_javascript_protocol(): void {
		// Standard javascript: protocol.
		$js_css = '.a{background:url(javascript:alert(1));color:red}';
		$this->assert_same( '.a{background:url(alert(1));color:red}', CssSanitizer::sanitize( $js_css ), 'Standard javascript: protocol neutralized' );

		// Nested javascript: protocol evasion (javajavascript:script:).
		$nested_js = '.a{background:url(javajavascript:script:alert(1));color:red}';
		$this->assert_same( '.a{background:url(alert(1));color:red}', CssSanitizer::sanitize( $nested_js ), 'Nested javajavascript:script: evasion neutralized' );

		// Mixed case and spaces inside protocol (JaVaScRiPt :).
		$spaced_js = '.a{background:url(JaVaScRiPt :alert(1));color:red}';
		$this->assert_same( '.a{background:url(alert(1));color:red}', CssSanitizer::sanitize( $spaced_js ), 'Mixed case and spaced javascript: protocol neutralized' );

		// Quoted javascript: inside url().
		$quoted_js = ".btn{background-image:url('javascript:void(0)');}";
		$this->assert_same( ".btn{background-image:url('void(0)');}", CssSanitizer::sanitize( $quoted_js ), 'Quoted javascript: inside url() neutralized' );
	}

	/**
	 * Test 6: Neutralizes legacy IE attack vectors (expression, behavior, -moz-binding).
	 *
	 * @return void
	 */
	public function test_neutralizes_legacy_ie_vectors(): void {
		// CSS expression(...) evaluation.
		$expr_css = '.a{width:expression(alert(1));color:red}';
		$this->assert_same( '.a{width:);color:red}', CssSanitizer::sanitize( $expr_css ), 'expression(...) evaluation neutralized' );

		// Uppercase EXPRESSION(...) evaluation.
		$upper_expr = '.a{height:EXPRESSION(window.location="http://evil.com");}';
		$this->assert_same( '.a{height:;}', CssSanitizer::sanitize( $upper_expr ), 'Uppercase EXPRESSION(...) neutralized' );

		// -moz-binding XML vector.
		$moz_css = '.a{-moz-binding:url(https://evil.example/x.xml#x);color:red}';
		$this->assert_same( '.a{color:red}', CssSanitizer::sanitize( $moz_css ), '-moz-binding:url(...) neutralized' );

		// IE behavior:url(...) vector.
		$behavior_css = '.a{behavior:url(x.htc);color:red}';
		$this->assert_same( '.a{color:red}', CssSanitizer::sanitize( $behavior_css ), 'behavior:url(...) neutralized' );

		// Spaced and cased behavior vector.
		$spaced_behavior = '.box { BEHAVIOR : url("evil.htc") ; margin: 10px; }';
		$this->assert_same( '.box {  margin: 10px; }', CssSanitizer::sanitize( $spaced_behavior ), 'Spaced and uppercase behavior neutralized' );
	}

	/**
	 * Test 7: Neutralizes base64 data URIs inside url() declarations.
	 *
	 * @return void
	 */
	public function test_neutralizes_data_uris(): void {
		// Standard double-quoted base64 data URI.
		$data_css = '.a{background:url( "data:text/html;base64,PHNjcmlwdD4=");color:red}';
		$this->assert_same( '.a{background:;color:red}', CssSanitizer::sanitize( $data_css ), 'Double-quoted data: URI neutralized' );

		// Single-quoted data URI.
		$single_data = ".icon{background-image:url('data:image/svg+xml;utf8,<svg onload=\"alert(1)\"></svg>');}";
		$this->assert_same( '.icon{background-image:;}', CssSanitizer::sanitize( $single_data ), 'Single-quoted SVG data: URI neutralized' );

		// Unquoted data URI.
		$unquoted_data = '.bg{background:url(data:text/javascript;base64,YWxlcnQoMSk=);}';
		$this->assert_same( '.bg{background:;}', CssSanitizer::sanitize( $unquoted_data ), 'Unquoted data: URI neutralized' );
	}

	/**
	 * Test 8: Neutralizes HTML tags (<style>, </style>, <script>, etc.).
	 *
	 * @return void
	 */
	public function test_neutralizes_html_tags(): void {
		// Closing style tag followed by script tag.
		$tag_css = '.a{color:red}</style><script>alert(1)</script>';
		$this->assert_same( '.a{color:red}', CssSanitizer::sanitize( $tag_css ), 'Closing </style> and <script> tags stripped' );

		// Uppercase closing style tag with trailing whitespace.
		$upper_tag = '.a{color:red}</STYLE ';
		$this->assert_same( '.a{color:red}', CssSanitizer::sanitize( $upper_tag ), 'Uppercase </STYLE tag stripped' );

		// Enclosed <style> tag block is stripped completely by tag stripping.
		$enclosed_tag = '<style>.slider{padding:0;}</style>';
		$this->assert_same( '', CssSanitizer::sanitize( $enclosed_tag ), 'Enclosed <style> block stripped completely' );

		// Unclosed <style> tag stripped leaving valid CSS.
		$unclosed_tag = '.slider{padding:0;}<style>';
		$this->assert_same( '.slider{padding:0;}', CssSanitizer::sanitize( $unclosed_tag ), 'Unclosed <style> tag stripped' );

		// Arbitrary HTML injection (e.g., <iframe>, <img>).
		$html_injection = '.test{color:blue;} <iframe src="https://evil.com"></iframe>';
		$this->assert_same( '.test{color:blue;}', CssSanitizer::sanitize( $html_injection ), 'Arbitrary iframe HTML tag stripped' );
	}

	/**
	 * Test 9: Handles non-string inputs safely without throwing errors.
	 *
	 * @return void
	 */
	public function test_handles_non_string_inputs_safely(): void {
		$this->assert_same( '', CssSanitizer::sanitize( [] ), 'Array input returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( [ 'color' => 'red' ] ), 'Associative array returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( new stdClass() ), 'Object input returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( null ), 'Null input returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( true ), 'Boolean true returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( false ), 'Boolean false returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( 123 ), 'Integer input returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( 45.67 ), 'Float input returns empty string' );
		$this->assert_same( '', CssSanitizer::sanitize( '' ), 'Empty string returns empty string' );
	}
}

// Standalone execution entry point.
( new CssSanitizerTest() )->run_all_tests();
