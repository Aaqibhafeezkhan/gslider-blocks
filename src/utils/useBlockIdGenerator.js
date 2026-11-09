import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

let mountSequence = 0;
const clientMountOrder = new Map();

/**
 * Resolve the nearest `core/block` synced pattern ancestor for a block client ID.
 *
 * @param {Object} editorSelectors Selectors from `core/block-editor`.
 * @param {string} targetClientId  Block client ID to inspect.
 * @return {Object|null} Synced pattern wrapper client ID, or null.
 */
const getNearestSyncedPattern = ( editorSelectors, targetClientId ) => {
	if (
		typeof editorSelectors?.getBlockParents !== 'function' ||
		typeof editorSelectors?.getBlockName !== 'function'
	) {
		return null;
	}

	const parents = editorSelectors.getBlockParents( targetClientId ) || [];
	for ( let i = parents.length - 1; i >= 0; i-- ) {
		const parentId = parents[ i ];
		if ( editorSelectors.getBlockName( parentId ) === 'core/block' ) {
			return {
				clientId: parentId,
			};
		}
	}

	return null;
};

/**
 * Determine whether another active block owns `blockId` so this block must regenerate it.
 *
 * @param {Object}   editorSelectors Selectors from `core/block-editor`.
 * @param {string}   clientId        Current block's runtime client ID.
 * @param {string}   blockId         Current persisted `blockId` attribute.
 * @param {string}   blockPrefix     Prefix used for generated IDs (e.g. 'gslider').
 * @param {Function} [getMountOrder] Optional lookup returning numeric mount sequence for a client ID.
 * @return {boolean} True when `blockId` collides with another block and belongs elsewhere.
 */
export const hasCollidingBlockId = (
	editorSelectors,
	clientId,
	blockId,
	blockPrefix,
	getMountOrder
) => {
	if ( ! blockId || ! clientId || typeof clientId !== 'string' ) {
		return false;
	}

	if (
		! editorSelectors ||
		typeof editorSelectors.getClientIdsWithDescendants !== 'function' ||
		typeof editorSelectors.getBlockAttributes !== 'function'
	) {
		return false;
	}

	const ownSyncedPattern = getNearestSyncedPattern(
		editorSelectors,
		clientId
	);
	const allClientIds = editorSelectors.getClientIdsWithDescendants() || [];

	const matchingClientIds = allClientIds.filter( ( id ) => {
		if ( editorSelectors.getBlockAttributes( id )?.blockId !== blockId ) {
			return false;
		}

		// A block inside a Synced Pattern (core/block) only treats duplicates within
		// the exact same wrapper as collisions so shared wp_block entities are never dirtied.
		if ( ownSyncedPattern ) {
			if ( id === clientId ) {
				return true;
			}
			const candidateSyncedPattern = getNearestSyncedPattern(
				editorSelectors,
				id
			);
			return (
				candidateSyncedPattern?.clientId === ownSyncedPattern.clientId
			);
		}

		return true;
	} );

	if (
		matchingClientIds.length <= 1 ||
		! matchingClientIds.includes( clientId )
	) {
		return false;
	}

	// Never reassign an ID from a Synced Pattern entity to a standalone block; the standalone copy regenerates.
	if ( ! ownSyncedPattern ) {
		const syncedOwnerId = matchingClientIds.find(
			( id ) => getNearestSyncedPattern( editorSelectors, id ) !== null
		);
		if ( syncedOwnerId ) {
			return syncedOwnerId !== clientId;
		}
	}

	// Prefer the block whose clientId created the ID, then blocks mounted earlier (before paste), then document order.
	const expectedForId = ( id ) => `${ blockPrefix }-${ id.slice( 0, 8 ) }`;
	let ownerClientId = matchingClientIds.find(
		( id ) => blockId === expectedForId( id )
	);

	if ( ! ownerClientId && typeof getMountOrder === 'function' ) {
		let earliestOrder = Number.POSITIVE_INFINITY;
		for ( const id of matchingClientIds ) {
			const order = getMountOrder( id );
			if ( typeof order === 'number' && order < earliestOrder ) {
				earliestOrder = order;
				ownerClientId = id;
			}
		}
	}

	if ( ! ownerClientId ) {
		ownerClientId = matchingClientIds[ 0 ];
	}

	return ownerClientId !== clientId;
};

/**
 * Custom hook to handle duplicate block detection and ID regeneration.
 *
 * When a block is duplicated or copy-pasted and collides with an existing block's
 * `blockId` in the editor, this hook immediately generates a new unique `blockId`
 * for the duplicate while preserving existing blocks on normal post reloads. It also
 * falls back to regenerating on style changes when no colliding original remains.
 *
 * @param {Object}   params
 * @param {string}   params.clientId      - Block's unique client ID
 * @param {string}   params.blockId       - Current block ID attribute
 * @param {string}   params.blockPrefix   - Prefix for the block ID (e.g., 'fb-testimonial')
 * @param {boolean}  params.isSelected    - Whether the block is currently selected
 * @param {Object}   params.attributes    - All block attributes
 * @param {Function} params.setAttributes - Function to update attributes
 * @param {string[]} [params.excludeKeys] - Additional keys to exclude from change detection
 */
const useBlockIdGenerator = ( {
	clientId,
	blockId,
	blockPrefix,
	isSelected,
	attributes,
	setAttributes,
	excludeKeys = [],
} ) => {
	// Track previous attributes to detect style changes
	const prevAttributesRef = useRef( attributes );

	// Record mount sequence so a copy pasted before an existing block is still recognized as newer
	useEffect( () => {
		if ( ! clientId || typeof clientId !== 'string' ) {
			return undefined;
		}
		if ( ! clientMountOrder.has( clientId ) ) {
			clientMountOrder.set( clientId, ++mountSequence );
		}
		return () => {
			clientMountOrder.delete( clientId );
		};
	}, [ clientId ] );

	const hasDuplicateBlockId = useSelect(
		( select ) =>
			hasCollidingBlockId(
				select( blockEditorStore ),
				clientId,
				blockId,
				blockPrefix,
				( id ) => clientMountOrder.get( id )
			),
		[ blockId, blockPrefix, clientId ]
	);

	useEffect( () => {
		if ( clientId && typeof clientId === 'string' ) {
			const expectedIdPrefix = `${ blockPrefix }-${ clientId.slice(
				0,
				8
			) }`;

			// Case 1: Brand new block with no ID, or a duplicate colliding with another block on the canvas
			if (
				! blockId ||
				( hasDuplicateBlockId && blockId !== expectedIdPrefix )
			) {
				setAttributes( {
					blockId: expectedIdPrefix,
				} );
				prevAttributesRef.current = attributes;
				return;
			}

			// Case 2: Standalone copied block (original removed or pasted across posts)
			// Wait until this block's own attributes change while selected before changing its saved ID
			const isDuplicate = blockId !== expectedIdPrefix;

			if ( isDuplicate && isSelected ) {
				const prevAttrs = prevAttributesRef.current;

				// Default keys to always exclude from change detection
				const defaultExcludeKeys = [ 'blockId', 'blockStyle' ];
				const allExcludeKeys = [
					...defaultExcludeKeys,
					...excludeKeys,
				];

				// Check if any attribute (except excluded attributes) changed
				const hasStyleChange = Object.keys( attributes ).some(
					( key ) => {
						if ( allExcludeKeys.includes( key ) ) {
							return false;
						}
						return (
							JSON.stringify( attributes[ key ] ) !==
							JSON.stringify( prevAttrs[ key ] )
						);
					}
				);

				if ( hasStyleChange ) {
					setAttributes( {
						blockId: expectedIdPrefix,
					} );
				}
			}
		}

		// Update ref for next comparison
		prevAttributesRef.current = attributes;
	}, [
		clientId,
		blockId,
		blockPrefix,
		isSelected,
		attributes,
		setAttributes,
		excludeKeys,
		hasDuplicateBlockId,
	] );
};

export default useBlockIdGenerator;
