/**
 * External Link Arrow Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ExternalLinkIcon = ( props ) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<path
				d="M3.5 2H10M10 2V8.5M10 2L2 10"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ExternalLinkIcon;
