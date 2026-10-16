/**
 * Dashboard Logo Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const DashboardLogo = ( props ) => {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="gslider-dashboard-logo"
			aria-hidden="true"
			{ ...props }
		>
			<rect width="32" height="32" rx="8" fill="#007cba" />
			<rect x="8" y="9" width="16" height="11" rx="2" fill="#ffffff" />
			<rect
				x="5"
				y="11"
				width="2"
				height="7"
				rx="1"
				fill="#ffffff"
				fillOpacity="0.5"
			/>
			<rect
				x="25"
				y="11"
				width="2"
				height="7"
				rx="1"
				fill="#ffffff"
				fillOpacity="0.5"
			/>
			<circle cx="12" cy="23" r="1.25" fill="#ffffff" />
			<circle cx="16" cy="23" r="1.5" fill="#ffffff" />
			<circle cx="20" cy="23" r="1.25" fill="#ffffff" fillOpacity="0.5" />
		</svg>
	);
};

export default DashboardLogo;
