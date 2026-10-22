import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Icon } from '@wordpress/components';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Individual sortable item
 * @param root0
 * @param root0.id
 * @param root0.label
 * @param root0.icon
 */
const ContentOrderItem = ( { id, label, icon } ) => {
	const {
		attributes: sortableAttrs,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable( { id } );
	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};
	return (
		<li
			ref={ setNodeRef }
			style={ style }
			{ ...sortableAttrs }
			className="gslider-content-order-item"
		>
			<span className="gslider-content-order-icon">
				<Icon icon={ icon } />
			</span>
			<span className="gslider-content-order-label">{ label }</span>
			<span className="gslider-content-order-handle" { ...listeners }>
				<Button icon="move" label="Reorder" />
			</span>
		</li>
	);
};

/**
 * Reusable Content Order Control
 *
 * Usage:
 * <ContentOrderControl
 *     items={[
 *         { key: 'image', label: 'Author Image', icon: '🖼️' },
 *         { key: 'title', label: 'Title', icon: '📝' },
 *     ]}
 *     order={contentOrder}
 *     onChange={(newOrder) => setAttributes({ contentOrder: newOrder })}
 * />
 *
 * @param            items.items
 * @param {Array}    items          - Array of { key, label, icon } objects defining available items
 * @param {Array}    order          - Current order array (e.g. ['image', 'title', ...])
 * @param {Function} onChange       - Callback with new order array when user reorders
 * @param {string}   label          - Optional control label (default: "Content Order")
 * @param {string}   help           - Optional help text
 * @param            items.order
 * @param            items.onChange
 * @param            items.label
 * @param            items.help
 */
const ContentOrderControl = ( {
	items,
	order,
	onChange,
	label = __( 'Content Order', 'gslider-blocks' ),
	help = __( 'Drag to reorder content elements', 'gslider-blocks' ),
} ) => {
	// Build default order from items if order is not set
	const defaultOrder = items.map( ( item ) => item.key );
	const currentOrder = order || defaultOrder;

	// Build a lookup map for item config by key
	const itemMap = {};
	items.forEach( ( item ) => {
		itemMap[ item.key ] = item;
	} );

	const handleDragEnd = ( event ) => {
		const { active, over } = event;
		if ( active && over && active.id !== over.id ) {
			const oldIndex = currentOrder.indexOf( active.id );
			const newIndex = currentOrder.indexOf( over.id );
			const newOrder = [ ...currentOrder ];
			newOrder.splice( oldIndex, 1 );
			newOrder.splice( newIndex, 0, active.id );
			onChange( newOrder );
		}
	};

	return (
		<BaseControl label={ label } className="gslider-content-order-control">
			<DndContext
				collisionDetection={ closestCenter }
				onDragEnd={ handleDragEnd }
			>
				<SortableContext items={ currentOrder }>
					<ul className="gslider-content-order-list">
						{ currentOrder.map( ( key ) => {
							const config = itemMap[ key ];
							if ( ! config ) {
								return null;
							}
							return (
								<ContentOrderItem
									key={ key }
									id={ key }
									label={ config.label }
									icon={ config.icon }
								/>
							);
						} ) }
					</ul>
				</SortableContext>
			</DndContext>
			{ help && (
				<p className="components-base-control__help">{ help }</p>
			) }
		</BaseControl>
	);
};

export default ContentOrderControl;
