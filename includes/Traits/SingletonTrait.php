<?php
/**
 * Singleton pattern trait for GSlider Blocks.
 *
 * Provides a reusable singleton implementation that ensures
 * only one instance of a class exists at any time.
 *
 * @package GSlider\Traits
 * @since   1.0.0
 */

namespace GSlider\Traits;

/**
 * Implements the Singleton design pattern.
 *
 * Classes using this trait will have a single shared instance
 * accessible via getInstance(). Cloning and unserialization
 * are prevented to maintain the singleton guarantee.
 *
 * @since 1.0.0
 */
trait SingletonTrait {

    /**
     * The single instance of the class.
     *
     * @since 1.0.0
     *
     * @var static|null
     */
    private static $instance;

    /**
     * Initializes the singleton instance.
     *
     * @since 1.0.0
     */
    private function __construct() {
        // Optional initialization code.
    }

    /**
     * Returns the singleton instance of the class.
     *
     * Creates a new instance if one does not already exist.
     *
     * @since 1.0.0
     *
     * @return static The singleton instance.
     */
    public static function getInstance() {
        if ( ! isset( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Prevents cloning of the singleton instance.
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function __clone() {
        // Cloning is not allowed.
    }

    /**
     * Prevents unserialization of the singleton instance.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __wakeup() {
        // Unserialization is not allowed.
    }
}

