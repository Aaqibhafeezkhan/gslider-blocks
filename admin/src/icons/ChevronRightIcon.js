/**
 * Chevron Right Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ChevronRightIcon = ( props ) => {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<path
				d="M6 3L11 8L6 13"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ChevronRightIcon;
