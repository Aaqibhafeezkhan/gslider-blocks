/**
 * Toast Success Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ToastSuccessIcon = ( props ) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<circle cx="10" cy="10" r="8" fill="#10b981" />
			<path
				d="M6.5 10L9 12.5L13.5 8"
				stroke="#ffffff"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ToastSuccessIcon;
