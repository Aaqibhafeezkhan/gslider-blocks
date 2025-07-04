import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import Inspector from './inspector';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const Edit = (props) => {
    const { attributes, setAttributes, clientId, context, slideIndex } = props;

    const { blockId } = attributes;


    const parentBlocks = wp.blocks.getBlockTypes().filter( function ( item ) {
		return ! item.parent;
	} );

    const TEMPLATE = [
        ['core/paragraph'],
    ];

    // Hide slider block.
	const ALLOWED_BLOCKS = parentBlocks
    .map( ( block ) => block.name )
    .filter(
        ( blockName ) => [ 'gslider-blocks/flexi-content', ].indexOf( blockName ) === -1
    );

    const innerBlockOptions = {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
    };

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: `swiper-content`,
            slot: 'container-start',
        },
        innerBlockOptions
    );

    const blockProps = useBlockProps({
        className: `gslider-slide-main-wrapper ${blockId || 'default-id'} swiper-slide`,
    });

    return (
        <>
            <Inspector attributes={attributes} setAttributes={setAttributes} clientId={clientId} />
            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
};

const applyWithSelect = withSelect((select, props) => {
    const deviceType = select('core/editor')?.getDeviceType ? select('core/editor').getDeviceType() : null;
    const { getBlocks, getBlockIndex } = select('core/block-editor');
    const innerBlocks = getBlocks(props.clientId);
    const slideIndex = getBlockIndex(props.clientId);

    return {
        innerBlocks,
        deviceType,
        isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true),
        slideIndex,
    };
});

export default compose(applyWithSelect)(Edit);
