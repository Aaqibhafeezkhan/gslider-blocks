/**
 * Flexi Slider Block Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const FlexiSliderIcon = ( props ) => {
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
			<path
				d="M6 7.5H14M6 10.5H11M6 13.5H9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default FlexiSliderIcon;
