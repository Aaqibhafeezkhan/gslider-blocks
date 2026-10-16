/**
 * Base Slider Block Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const BaseSliderIcon = ( props ) => {
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
				d="M7 10L9 12L13 8"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default BaseSliderIcon;
