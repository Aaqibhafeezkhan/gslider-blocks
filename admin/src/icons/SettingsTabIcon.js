/**
 * Settings Tab Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const SettingsTabIcon = ( props ) => {
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
				d="M2.5 4.5H9.5M12.5 4.5H13.5M6.5 11.5H13.5M2.5 11.5H3.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<circle
				cx="11"
				cy="4.5"
				r="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle
				cx="5"
				cy="11.5"
				r="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default SettingsTabIcon;
