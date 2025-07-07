import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';
import Inspector from './inspector';

export default function Edit({ attributes, setAttributes, clientId }) {

	const {
		blockId,
	} = attributes;

  const blockProps = useBlockProps({
    className: `flexi-content-item swiper-slide ${blockId}`,
  });

  return (
	<>
		<Inspector 
			attributes={attributes}
			setAttributes={setAttributes}
			clientId={clientId}
		/>
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
	</>
  );
}