import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { blockId } = props.attributes;

	const blockProps = useBlockProps.save( {
		className: `gslider-slider-child-wrap swiper-slide ${blockId || 'default-id'}`,
	} );

	return (
		<>
			<div { ...blockProps } key={ blockId }>
				<div className="swiper-content">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}