<?php
/**
 * SVG upload support for GSlider Blocks.
 *
 * Enables SVG file uploads in WordPress with security
 * validation and sanitization to prevent XSS attacks.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'SupportSVG' ) ) {

    /**
     * Handles SVG file upload support and security.
     *
     * Adds SVG MIME type support, validates uploaded SVGs for
     * prohibited elements, sanitizes content, and fixes media
     * library thumbnail display.
     *
     * @since 1.0.0
     */
    class SupportSVG implements Registrable {

        use SingletonTrait;

        /**
         * WordPress filesystem instance.
         *
         * @since 1.0.0
         *
         * @var WP_Filesystem_Base
         */
        private $wpFilesystem;

        /**
         * Registers hooks and initializes the filesystem.
         *
         * @since 1.0.0
         *
         * @global WP_Filesystem_Base $wp_filesystem WordPress filesystem abstraction.
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'upload_mimes', [ $this, 'allowSvgMimeType' ] );
            add_filter( 'wp_handle_upload_prefilter', [ $this, 'validateSvgUpload' ] );
            add_filter( 'wp_prepare_attachment_for_js', [ $this, 'fixSvgThumbnail' ] );
            add_action( 'admin_init', [ $this, 'enableSvgSupport' ] );

            // WP Filesystem init.
            if ( ! function_exists( 'WP_Filesystem' ) ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }
            WP_Filesystem();
            global $wp_filesystem;
            $this->wpFilesystem = $wp_filesystem;
        }

        /**
         * Adds SVG and SVGZ MIME types to allowed upload types.
         *
         * @since 1.0.0
         *
         * @param string[] $mimes Array of allowed MIME types keyed by extension.
         * @return string[] Modified array with SVG MIME types added.
         */
        public function allowSvgMimeType( array $mimes ): array {
            $mimes['svg']  = 'image/svg+xml';
            $mimes['svgz'] = 'image/svg+xml';
            return $mimes;
        }

        /**
         * Validates and sanitizes an uploaded SVG file.
         *
         * Checks file extension, reads content, validates XML
         * structure, checks for prohibited elements/attributes,
         * and sanitizes the SVG before saving.
         *
         * @since 1.0.0
         *
         * @param array $file The uploaded file data array with keys
         *                    'name', 'type', 'tmp_name', and 'error'.
         * @return array The file data array, possibly with 'error' set.
         */
        public function validateSvgUpload( array $file ): array {
            if ( 'image/svg+xml' !== $file['type'] ) {
                return $file;
            }

            // Validate file extension.
            $extension = pathinfo( $file['name'], PATHINFO_EXTENSION );
            if ( ! in_array( $extension, [ 'svg', 'svgz' ], true ) ) {
                $file['error'] = __( 'Invalid SVG file extension.', 'gslider-blocks' );
                return $file;
            }

            // Read file content.
            if ( ! $this->wpFilesystem->exists( $file['tmp_name'] ) ) {
                $file['error'] = __( 'Unable to locate uploaded file.', 'gslider-blocks' );
                return $file;
            }

            $content = $this->wpFilesystem->get_contents( $file['tmp_name'] );
            if ( ! $content ) {
                $file['error'] = __( 'Unable to read SVG file.', 'gslider-blocks' );
                return $file;
            }

            // Validate SVG structure.
            libxml_use_internal_errors( true );
            $doc = new \DOMDocument();

            // Prevent XXE by disabling external entities via LIBXML_NONET.
            $loadResult = $doc->loadXML( $content, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING );

            if ( ! $loadResult ) {
                $file['error'] = __( 'Invalid SVG XML structure.', 'gslider-blocks' );
                libxml_clear_errors();
                return $file;
            }

            // Check for prohibited elements and attributes.
            $isValid = $this->validateSvgContent( $doc );
            if ( ! $isValid ) {
                $file['error'] = __( 'SVG contains prohibited elements or attributes.', 'gslider-blocks' );
                return $file;
            }

            // Sanitize SVG content.
            $sanitizedContent = $this->sanitizeSvgContent( $content );
            if ( ! $this->wpFilesystem->put_contents( $file['tmp_name'], $sanitizedContent ) ) {
                $file['error'] = __( 'Unable to save sanitized SVG file.', 'gslider-blocks' );
                return $file;
            }

            return $file;
        }

        /**
         * Fixes SVG thumbnail display in the media library.
         *
         * Sets the full size dimensions for SVG attachments so
         * they render correctly in the media library grid.
         *
         * @since 1.0.0
         *
         * @param array $response The attachment data prepared for JavaScript.
         * @return array Modified attachment data with SVG sizes set.
         */
        public function fixSvgThumbnail( array $response ): array {
            if ( 'image/svg+xml' === $response['mime'] ) {
                $response['sizes'] = [
                    'full' => [
                        'url'         => $response['url'],
                        'width'       => $response['width'],
                        'height'      => $response['height'],
                        'orientation' => $response['orientation'],
                    ],
                ];
            }
            return $response;
        }

        /**
         * Enables SVG support by overriding file type checks.
         *
         * Hooks into wp_check_filetype_and_ext to ensure SVG
         * files pass WordPress file type validation.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function enableSvgSupport() {
            add_filter( 'wp_check_filetype_and_ext', function ( $data, $file, $filename, $mimes ) {
                $filetype = wp_check_filetype( $filename, $mimes );
                return [
                    'ext'             => $filetype['ext'],
                    'type'            => $filetype['type'],
                    'proper_filename' => $data['proper_filename'],
                ];
            }, 10, 4 );
        }

        /**
         * Validates SVG DOM for prohibited elements and attributes.
         *
         * Checks for script/iframe elements and event handler
         * attributes that could be used for XSS attacks.
         *
         * @since 1.0.0
         *
         * @param \DOMDocument $doc The parsed SVG DOM document.
         * @return bool True if the SVG is safe, false if prohibited content found.
         */
        private function validateSvgContent( \DOMDocument $doc ): bool {
            // Elements that are dangerous and should be banned completely.
            $prohibitedElements = [
                'script',
                'iframe',
                'object',
                'embed',
                'foreignobject',
                'html',
                'body',
                'head',
                'use',
                'image',
            ];

            // Loop through all elements and check their tag names.
            $elements = $doc->getElementsByTagName( '*' );
            foreach ( $elements as $element ) {
                $tagName = strtolower( $element->nodeName );
                if ( in_array( $tagName, $prohibitedElements, true ) ) {
                    return false;
                }

                // Check text content of style tags for dynamic styles / import payloads.
                if ( 'style' === $tagName ) {
                    $styleContent = html_entity_decode( $element->nodeValue, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
                    $styleContent = preg_replace( '/[\s\x00-\x1F\x7F-\x9F]+/', '', $styleContent );
                    $styleContent = strtolower( $styleContent );
                    if ( strpos( $styleContent, 'javascript:' ) !== false ||
                         strpos( $styleContent, 'data:' ) !== false ||
                         strpos( $styleContent, 'vbscript:' ) !== false ) {
                        return false;
                    }
                }

                // Check attributes.
                foreach ( $element->attributes as $attribute ) {
                    $name  = strtolower( $attribute->nodeName );
                    // Decode HTML entities (e.g. &#106;&#x61;vascript: to javascript:)
                    $value = html_entity_decode( $attribute->nodeValue, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
                    // Strip whitespaces, control characters, newlines, tabs, etc.
                    $value = preg_replace( '/[\s\x00-\x1F\x7F-\x9F]+/', '', $value );
                    $value = strtolower( $value );

                    // Check for any event handler attributes (starts with "on").
                    if ( 0 === strpos( $name, 'on' ) ) {
                        return false;
                    }

                    // Check for dangerous protocols.
                    if ( strpos( $value, 'javascript:' ) !== false ||
                         strpos( $value, 'data:' ) !== false ||
                         strpos( $value, 'vbscript:' ) !== false ) {
                        return false;
                    }
                }
            }

            return true;
        }

        /**
         * Sanitizes SVG content by removing unsafe elements.
         *
         * Strips XML comments and removes event handler attributes
         * (attributes starting with "on") from all elements.
         *
         * @since 1.0.0
         *
         * @param string $content The raw SVG XML content.
         * @return string The sanitized SVG XML content.
         */
        private function sanitizeSvgContent( $content ) {
            libxml_use_internal_errors( true );
            $doc = new \DOMDocument();

            // Prevent XXE by disabling external entities via LIBXML_NONET.
            $loadResult = $doc->loadXML( $content, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING );

            if ( ! $loadResult ) {
                libxml_clear_errors();
                return '';
            }

            // Remove comments.
            $xpath = new \DOMXPath( $doc );
            foreach ( $xpath->query( '//comment()' ) as $comment ) {
                $comment->parentNode->removeChild( $comment );
            }

            // Remove unsafe attributes.
            $elements = $doc->getElementsByTagName( '*' );
            foreach ( $elements as $element ) {
                $attributes = [];
                foreach ( $element->attributes as $attribute ) {
                    $attributes[] = $attribute->nodeName;
                }
                foreach ( $attributes as $attribute ) {
                    if ( 0 === strpos( $attribute, 'on' ) ) {
                        $element->removeAttribute( $attribute );
                    }
                }
            }

            libxml_clear_errors();
            return $doc->saveXML();
        }
    }
}

