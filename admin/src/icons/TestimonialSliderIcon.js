/**
 * Testimonial Slider Block Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const TestimonialSliderIcon = ( props ) => {
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
			<path
				d="M4 6.5C4 5.11929 5.11929 4 6.5 4H8.5V9H5.5C4.67157 9 4 8.32843 4 7.5V6.5Z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M11.5 6.5C11.5 5.11929 12.6193 4 14 4H16V9H13C12.1716 9 11.5 8.32843 11.5 7.5V6.5Z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M4.5 12H15.5M4.5 15H11.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default TestimonialSliderIcon;
