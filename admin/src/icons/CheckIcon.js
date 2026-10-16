/**
 * Checkmark Icon component.
 *
 * @since 1.2.0
 *
 * @param {Object}        props                   Component properties.
 * @param {string|number} [props.strokeWidth='2'] Stroke line thickness.
 * @return {JSX.Element} SVG element.
 */
const CheckIcon = ( { strokeWidth = '2', ...props } ) => {
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
			<path
				d="M16.6667 5L7.50001 14.1667L3.33334 10"
				stroke="currentColor"
				strokeWidth={ strokeWidth }
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CheckIcon;
