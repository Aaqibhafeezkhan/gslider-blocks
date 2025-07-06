import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {

	const {
		blockId,
	} = attributes;

  const blockProps = useBlockProps({
    className: `flexi-content-item swiper-slide ${blockId}`,
  });

  return (
    <div {...blockProps}>
		<div className="gslider-content-wrapper">
			<div className="gslider-content-inner-wrapper">
				<InnerBlocks
					template={[
					['core/paragraph'],
					]}
					renderAppender={InnerBlocks.DefaultBlockAppender}
				/>
			</div>
		</div>
    </div>
  );
}