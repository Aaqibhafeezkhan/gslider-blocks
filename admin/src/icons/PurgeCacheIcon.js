/**
 * Purge Cache / Refresh Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const PurgeCacheIcon = ( props ) => {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{ ...props }
		>
			<polyline points="1 4 1 10 7 10" />
			<polyline points="23 20 23 14 17 14" />
			<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
		</svg>
	);
};

export default PurgeCacheIcon;
