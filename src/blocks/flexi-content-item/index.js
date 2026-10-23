import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import attributes from './attributes.js';
import Icon from './icon';

registerBlockType( metadata.name, {
	attributes,
	icon: Icon,
	edit: Edit,
	parent: [ 'gslider-blocks/flexi-content' ],
	save,
} );
