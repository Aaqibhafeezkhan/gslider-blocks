/**
 * Logo Carousel Block Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const LogoCarouselIcon = ( props ) => {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<rect
				x="2.5"
				y="4.5"
				width="4.5"
				height="11"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="9"
				y="4.5"
				width="4.5"
				height="11"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="15.5"
				y="4.5"
				width="2"
				height="11"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default LogoCarouselIcon;
