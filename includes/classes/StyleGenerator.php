<?php

namespace GSlider\Classes;
use GSlider\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('StyleGenerator')) {

    class StyleGenerator {
        
        use SingletonTrait;

        /**
         * CSS Subdirectory Path
         */
        private const CSS_SUBDIR = '/gslider-blocks/css';

        /**
         * File Permissions
         */
        private const FILE_PERMISSIONS = 0644;

        /**
         * Styles
         */
        private static $styles = array();

        /**
         * CSS Directory
         */
        private $css_dir;

        /**
         * CSS URL
         */
        private $css_url;

        /**
         * Constructor
         */
        private function __construct() {
            $this->setup_directories();
            $this->init();
        }

        /**
         * Set up Directories
         */
        private function setup_directories() {
            $upload_dir = wp_upload_dir();
            $this->css_dir = $upload_dir['basedir'] . self::CSS_SUBDIR;
            $this->css_url = $upload_dir['baseurl'] . self::CSS_SUBDIR;

            if (!file_exists($this->css_dir)) {
                if (!wp_mkdir_p($this->css_dir)) {
                    error_log('Failed to create CSS directory at: ' . $this->css_dir);
                    return;
                }
            }
        }

        /**
         * Initialize the Class
         */
        private function init() {
            add_filter('render_block', [$this, 'collect_dynamic_styles'], 10, 2);
            add_action('wp_footer', [$this, 'generate_css_file'], 10);
            add_action('wp_enqueue_scripts', [$this, 'enqueue_dynamic_styles']);
        }

        /**
         * Collect Dynamic Styles
         */
        public function collect_dynamic_styles($block_content, $block) {
            if (!is_array($block) || empty($block['blockName'])) {
                return $block_content;
            }

            // Check if the block is part of 'gslider-blocks
            if (isset($block['blockName']) && str_contains($block['blockName'], 'gslider-blocks/')) {
                if (isset($block['attrs']['blockStyle'])) {
                    // Generate a unique block ID based on block attributes
                    $block_id = isset($block['attrs']['blockId']) ? 
                        sanitize_key($block['attrs']['blockId']) : 
                        'gslider-blocks-' . md5(serialize($block['attrs']));
                    self::$styles[$block_id] = $block['attrs']['blockStyle'];
                }
            }
            return $block_content;
        }

        /**
         * Generate the CSS File
         */
        public function generate_css_file() {
            if (empty(self::$styles)) {
                return;
            }

            clearstatcache();

            // Get the page ID for dynamically generating CSS file
            $page_id = get_queried_object_id();
            $css_filename = 'gslider-blocks-dynamic-styles-' . $page_id . '.min.css';
            $css_file = $this->css_dir . '/' . $css_filename;

            $css_content = '';
            foreach (self::$styles as $block_id => $style) {
                $css_content .= $style;
            }

            // Add header with page ID and timestamp
            $css_content = "/* GSlider Blocks Dynamic Styles - Page ID: $page_id - Generated on " . 
                current_time('mysql') . " */\n" . $this->minify_css($css_content);

            if (!function_exists('WP_Filesystem')) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            global $wp_filesystem;
            if (empty($wp_filesystem)) {
                WP_Filesystem();
            }

            if (!is_dir($this->css_dir)) {
                if (!wp_mkdir_p($this->css_dir)) {
                    error_log('Failed to create CSS directory: ' . $this->css_dir);
                    return;
                }
            }

            // If the CSS content hasn't changed, do not overwrite the file
            if (file_exists($css_file)) {
                $existing_content = $wp_filesystem->get_contents($css_file);
                if ($existing_content === $css_content) {
                    return;
                }
            }

            // Write the new CSS file
            if (!$wp_filesystem->put_contents($css_file, $css_content, self::FILE_PERMISSIONS)) {
                error_log('Failed to write CSS file: ' . $css_file);
                return;
            }

            // Clear stored styles after writing them to the file
            self::$styles = array();
        }

        /**
         * Enqueue Dynamic Styles
         */
        public function enqueue_dynamic_styles() {
            clearstatcache();
        
            // Get the page ID to determine the correct CSS file
            $page_id = get_queried_object_id();
            $css_filename = 'gslider-blocks-dynamic-styles-' . $page_id . '.min.css';
            $css_file_path = $this->css_dir . '/' . $css_filename;
            $css_file_url = $this->css_url . '/' . $css_filename;
        
            // If the CSS file does not exist, generate it
            if (!file_exists($css_file_path)) {
                $this->generate_css_file();
            }
        
            // Enqueue the generated CSS file
            if (file_exists($css_file_path)) {
                wp_enqueue_style(
                    'gslider-blocks-dynamic-styles-' . $page_id,
                    $css_file_url,
                    array(),
                    filemtime($css_file_path)
                );
            }
        }

        /**
         * Minify CSS
         */
        private function minify_css($css) {
            if (empty($css)) {
                return '';
            }
            
            // Remove comments
            $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
            // Remove spaces around colons and semicolons, and unnecessary whitespace
            $css = preg_replace('/\s*([:,;{}])\s*/', '$1', $css);
            // Remove the last semicolon from the last property
            $css = preg_replace('/;}/', '}', $css);
            
            return trim($css);
        }
    }
}
