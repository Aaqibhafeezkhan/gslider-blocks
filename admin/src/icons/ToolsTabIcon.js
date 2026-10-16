/**
 * Tools Tab Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ToolsTabIcon = ( props ) => {
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
			<path
				d="M10 2L14 6L6.5 13.5H2.5V9.5L10 2Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.5 3.5L12.5 7.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ToolsTabIcon;
