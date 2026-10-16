/**
 * Blocks Tab Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const BlocksTabIcon = ( props ) => {
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
				y="3"
				width="12"
				height="10"
				rx="2"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M5 6V10M8 6V10M11 6V10"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default BlocksTabIcon;
