/**
 * Active Status Dot Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ActiveStatusDotIcon = ( props ) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<circle cx="8" cy="8" r="6" fill="currentColor" fillOpacity="0.2" />
			<circle cx="8" cy="8" r="3" fill="currentColor" />
		</svg>
	);
};

export default ActiveStatusDotIcon;
