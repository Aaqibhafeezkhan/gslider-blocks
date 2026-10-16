/**
 * Toast Error Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const ToastErrorIcon = ( props ) => {
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
			<circle cx="10" cy="10" r="8" fill="#ef4444" />
			<path
				d="M10 6V11M10 14H10.01"
				stroke="#ffffff"
				strokeWidth="1.75"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ToastErrorIcon;
