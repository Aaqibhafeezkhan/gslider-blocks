/**
 * Overview Tab Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const OverviewTabIcon = ( props ) => {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<rect
				x="2"
				y="2"
				width="5"
				height="5"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="9"
				y="2"
				width="5"
				height="5"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="2"
				y="9"
				width="5"
				height="5"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="9"
				y="9"
				width="5"
				height="5"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default OverviewTabIcon;
