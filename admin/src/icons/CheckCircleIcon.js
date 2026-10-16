/**
 * Check Circle Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const CheckCircleIcon = ( props ) => {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
			{ ...props }
		>
			<circle
				cx="10"
				cy="10"
				r="9"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M6 10L9 13L14 7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CheckCircleIcon;
