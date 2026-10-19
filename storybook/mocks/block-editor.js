import * as realBlockEditor from '__real_wordpress_block_editor';
import { createSlotFill } from '@wordpress/components';
import { createElement } from '@wordpress/element';

/**
 * Storybook Mock for @wordpress/block-editor.
 * Re-exports the complete @wordpress/block-editor package and overrides only
 * InspectorControls with a clean SlotFill so inspector panels render without
 * requiring an active block context.
 */
const { Fill: InspectorControlsFill, Slot: InspectorControlsSlot } =
	createSlotFill( 'InspectorControls' );

export const InspectorControls = ( { children, ...props } ) => {
	return createElement( InspectorControlsFill, props, children );
};

InspectorControls.Slot = InspectorControlsSlot;

// Re-export all other block-editor components & utilities
export * from '__real_wordpress_block_editor';

export default {
	...realBlockEditor,
	InspectorControls,
};

