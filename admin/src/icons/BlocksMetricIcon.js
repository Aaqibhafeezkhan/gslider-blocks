/**
 * Blocks Metric Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const BlocksMetricIcon = ( props ) => {
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
				x="3"
				y="3"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="11"
				y="3"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="3"
				y="11"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="11"
				y="11"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default BlocksMetricIcon;
