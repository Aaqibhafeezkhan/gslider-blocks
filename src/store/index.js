/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import { STORE_NAME as storeName } from '@Constants/index';

export const store = createReduxStore( storeName, {
	reducer,
	actions,
	selectors,
} );

register( store );
