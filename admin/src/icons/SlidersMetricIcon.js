/**
 * Sliders Metric Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const SlidersMetricIcon = ( props ) => {
	return (
		<svg
			width="20"
			height="20"
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
				d="M6 8.5L8.5 11L11.5 8"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="14" cy="7" r="1" fill="currentColor" />
		</svg>
	);
};

export default SlidersMetricIcon;
