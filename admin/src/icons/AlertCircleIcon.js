/**
 * Alert Circle (Warning/Error) Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const AlertCircleIcon = ( props ) => {
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
			<line
				x1="10"
				y1="6"
				x2="10"
				y2="10"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<circle cx="10" cy="14" r="1" fill="currentColor" />
		</svg>
	);
};

export default AlertCircleIcon;
