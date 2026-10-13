<?php
/**
 * Registrable interface for GSlider Blocks.
 *
 * Defines a formal contract for service classes that register
 * WordPress hooks, actions, filters, or REST routes.
 *
 * @package GSlider\Interfaces
 * @since   1.1.9
 */

namespace GSlider\Interfaces;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Interface Registrable
 *
 * Any service class implementing this contract must provide a register()
 * method that hooks into the WordPress lifecycle.
 *
 * @since 1.1.9
 */
interface Registrable {

	/**
	 * Register WordPress hooks, actions, filters, or assets.
	 *
	 * @since 1.1.9
	 *
	 * @return void
	 */
	public function register(): void;
}
