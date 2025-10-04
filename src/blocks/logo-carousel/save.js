import { RichText, useBlockProps } from '@wordpress/block-editor';
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";

export default function Save({ attributes }) {
    const {
        blockId,

    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-logo-carousel-wrapper ${blockId}`,
    });

    return (
        <div {...blockProps}>
            Hello World
        </div>
    );
}