<?php
/**
 * GSlider Blocks Dynamic Style Handler
 *
 * This class manages the dynamic styles generated for the GSlider blocks.
 * It collects block styles, generates a CSS file, and enqueues it for frontend use.
 *
 * @since 1.0.0
 * @package gslider-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('GSlider_Blocks_Dynamic_Style')) {
    /**
     * GSlider_Blocks_Dynamic_Style Class
     *
     * This class handles the generation and management of dynamic styles
     * for GSlider blocks, including collecting styles, writing them to a CSS file,
     * and enqueuing the file for use on the frontend.
     *
     * @since 1.0.0
     * @package gslider-blocks
     */
    class GSlider_Blocks_Dynamic_Style {
        /**
         * CSS Subdirectory Path
         *
         * Defines the relative path to the CSS directory for storing dynamic styles.
         *
         * @var string
         */
        private const CSS_SUBDIR = '/gslider-blocks/css';

        /**
         * File Permissions for Generated CSS
         *
         * Defines the file permissions for the generated CSS file.
         *
         * @var int
         */
        private const FILE_PERMISSIONS = 0644;

        /**
         * Stores all dynamic styles for blocks
         *
         * This array holds the styles that will be written into the CSS file.
         *
         * @var array
         */
        private static $styles = array();

        /**
         * The directory for storing CSS files
         *
         * This variable holds the absolute path where dynamic CSS files are stored.
         *
         * @var string
         */
        private $css_dir;

        /**
         * The URL for the CSS directory
         *
         * This variable holds the URL to the directory where dynamic CSS files are served from.
         *
         * @var string
         */
        private $css_url;

        /**
         * Singleton instance
         *
         * Holds the singleton instance of the class.
         *
         * @var null|self
         */
        private static $instance = null;

        /**
         * Constructor
         *
         * Initializes the class, sets up directories, and registers hooks.
         *
         * @since 1.0.0
         * @return void
         */
        private function __construct() {
            $this->setup_directories();
            $this->init();
        }

        /**
         * Get the Singleton Instance
         *
         * Ensures only one instance of this class is created and returns it.
         *
         * @since 1.0.0
         * @return self
         */
        public static function get_instance() {
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Set up Directories for Storing and Serving CSS
         *
         * Defines the CSS storage directory and URL, and creates the directory if it does not exist.
         *
         * @since 1.0.0
         * @return void
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
         *
         * Registers necessary hooks to collect block styles, generate the CSS file,
         * and enqueue the CSS for frontend use.
         *
         * @since 1.0.0
         * @return void
         */
        private function init() {
            add_filter('render_block', [$this, 'collect_dynamic_styles'], 10, 2);
            add_action('wp_footer', [$this, 'generate_css_file'], 10);
            add_action('wp_enqueue_scripts', [$this, 'enqueue_dynamic_styles']);
        }

        /**
         * Collect Dynamic Styles from Blocks
         *
         * This function collects the styles from the blocks' attributes, stores them,
         * and associates them with a unique block ID.
         *
         * @since 1.0.0
         * @param string $block_content Block content (HTML).
         * @param array  $block Block attributes (metadata).
         * @return string The block content, unmodified.
         */
        public function collect_dynamic_styles($block_content, $block) {
            if (!is_array($block) || empty($block['blockName'])) {
                return $block_content;
            }

            // Check if the block is part of 'gslider-blocks'
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
         * Generate the CSS File for Dynamic Styles
         *
         * This function generates a CSS file containing all the collected styles and saves it to the server.
         *
         * @since 1.0.0
         * @return void
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
         * Enqueue Dynamic Styles for Frontend
         *
         * This function enqueues the generated CSS file on the frontend of the site.
         *
         * @since 1.0.0
         * @return void
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
         * Minify the CSS
         *
         * This function removes unnecessary characters from the CSS to reduce file size.
         *
         * @since 1.0.0
         * @param string $css The CSS to minify.
         * @return string Minified CSS.
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

GSlider_Blocks_Dynamic_Style::get_instance();
