/**
 * Image Slider Block Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ImageSliderIcon = ( props ) => {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<rect
				x="2.5"
				y="3.5"
				width="15"
				height="13"
				rx="2"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle cx="6.5" cy="7.5" r="1.25" fill="currentColor" />
			<path
				d="M4 14.5L8.5 9.5L12 13.5L14 11.5L16.5 14.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ImageSliderIcon;
