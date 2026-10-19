import { useState } from 'react';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';

export default {
	title: 'Components/Responsive/ResponsiveSpacingControl',
	component: ResponsiveSpacingControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveSpacingControl provides 4-sided dimension inputs (Top, Right, Bottom, Left) with linked/unlinked mode switching, unit selection, and independent values across Desktop, Tablet, and Mobile viewports.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the spacing inputs',
		},
		deviceType: {
			control: { type: 'select' },
			options: ['Desktop', 'Tablet', 'Mobile'],
			description: 'Active viewport device preview',
		},
		isLinked: {
			control: 'boolean',
			description: 'Whether all 4 sides are linked together',
		},
		units: {
			control: 'object',
			description: 'Responsive unit object: { Desktop, Tablet, Mobile }',
		},
		desktopSpacing: {
			control: 'object',
			description: 'Desktop 4-sided spacing object: { top, right, bottom, left }',
		},
		tabletSpacing: {
			control: 'object',
			description: 'Tablet 4-sided spacing object: { top, right, bottom, left }',
		},
		mobileSpacing: {
			control: 'object',
			description: 'Mobile 4-sided spacing object: { top, right, bottom, left }',
		},
		onChangeDesktopSpacing: {
			action: 'desktopSpacingChanged',
			description: 'Callback fired when desktop spacing updates',
		},
		onChangeTabletSpacing: {
			action: 'tabletSpacingChanged',
			description: 'Callback fired when tablet spacing updates',
		},
		onChangeMobileSpacing: {
			action: 'mobileSpacingChanged',
			description: 'Callback fired when mobile spacing updates',
		},
		onChangeUnits: {
			action: 'unitsChanged',
			description: 'Callback fired when active unit updates',
		},
		onChangeLink: {
			action: 'linkToggled',
			description: 'Callback fired when link button is toggled',
		},
	},
};

export const Linked = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [units, setUnits] = useState(
			args.units || { Desktop: 'px', Tablet: 'px', Mobile: 'px' }
		);
		const [isLinked, setIsLinked] = useState(args.isLinked ?? true);
		const [desktop, setDesktop] = useState(
			args.desktopSpacing || { top: '24', right: '24', bottom: '24', left: '24' }
		);
		const [tablet, setTablet] = useState(
			args.tabletSpacing || { top: '16', right: '16', bottom: '16', left: '16' }
		);
		const [mobile, setMobile] = useState(
			args.mobileSpacing || { top: '12', right: '12', bottom: '12', left: '12' }
		);

		const activeSpacing =
			device === 'Desktop' ? desktop : device === 'Tablet' ? tablet : mobile;
		const activeUnit = units[device] || 'px';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Active Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d}
						</button>
					))}
				</div>

				<ResponsiveSpacingControl
					{...args}
					deviceType={device}
					units={units}
					onChangeUnits={(newUnits) => {
						setUnits(newUnits);
						args.onChangeUnits?.(newUnits);
					}}
					desktopSpacing={desktop}
					onChangeDesktopSpacing={(val) => {
						setDesktop(val);
						args.onChangeDesktopSpacing?.(val);
					}}
					tabletSpacing={tablet}
					onChangeTabletSpacing={(val) => {
						setTablet(val);
						args.onChangeTabletSpacing?.(val);
					}}
					mobileSpacing={mobile}
					onChangeMobileSpacing={(val) => {
						setMobile(val);
						args.onChangeMobileSpacing?.(val);
					}}
					isLinked={isLinked}
					onChangeLink={(val) => {
						setIsLinked(val);
						args.onChangeLink?.(val);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#f9f9f9',
						border: '1px dashed #c3c4c7',
						borderRadius: '4px',
					}}
				>
					<div
						style={{
							fontSize: '11px',
							textTransform: 'uppercase',
							color: '#646970',
							marginBottom: '8px',
						}}
					>
						Live CSS Box Padding ({device}):{' '}
						<code>
							{activeSpacing.top || 0}{activeUnit} {activeSpacing.right || 0}{activeUnit}{' '}
							{activeSpacing.bottom || 0}{activeUnit} {activeSpacing.left || 0}{activeUnit}
						</code>{' '}
						(Status: <strong>{isLinked ? 'Linked (All sides equal)' : 'Unlinked'}</strong>)
					</div>
					<div
						style={{
							background: '#2271b1',
							padding: `${activeSpacing.top || 0}${activeUnit} ${activeSpacing.right || 0}${activeUnit} ${activeSpacing.bottom || 0}${activeUnit} ${activeSpacing.left || 0}${activeUnit}`,
							borderRadius: '4px',
							transition: 'padding 0.15s ease',
						}}
					>
						<div
							style={{
								background: '#fff',
								padding: '16px',
								textAlign: 'center',
								borderRadius: '2px',
								fontSize: '13px',
								color: '#1e1e1e',
								fontWeight: 500,
							}}
						>
							Padded Content Area
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Content Padding',
		deviceType: 'Desktop',
		isLinked: true,
		units: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
		desktopSpacing: { top: '24', right: '24', bottom: '24', left: '24' },
		tabletSpacing: { top: '16', right: '16', bottom: '16', left: '16' },
		mobileSpacing: { top: '12', right: '12', bottom: '12', left: '12' },
	},
};

export const Unlinked = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [units, setUnits] = useState(
			args.units || { Desktop: 'px', Tablet: 'px', Mobile: 'px' }
		);
		const [isLinked, setIsLinked] = useState(args.isLinked ?? false);
		const [desktop, setDesktop] = useState(
			args.desktopSpacing || { top: '40', right: '20', bottom: '50', left: '15' }
		);
		const [tablet, setTablet] = useState(
			args.tabletSpacing || { top: '30', right: '15', bottom: '35', left: '10' }
		);
		const [mobile, setMobile] = useState(
			args.mobileSpacing || { top: '20', right: '10', bottom: '25', left: '10' }
		);

		const activeSpacing =
			device === 'Desktop' ? desktop : device === 'Tablet' ? tablet : mobile;
		const activeUnit = units[device] || 'px';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Active Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d}
						</button>
					))}
				</div>

				<ResponsiveSpacingControl
					{...args}
					deviceType={device}
					units={units}
					onChangeUnits={(newUnits) => {
						setUnits(newUnits);
						args.onChangeUnits?.(newUnits);
					}}
					desktopSpacing={desktop}
					onChangeDesktopSpacing={(val) => {
						setDesktop(val);
						args.onChangeDesktopSpacing?.(val);
					}}
					tabletSpacing={tablet}
					onChangeTabletSpacing={(val) => {
						setTablet(val);
						args.onChangeTabletSpacing?.(val);
					}}
					mobileSpacing={mobile}
					onChangeMobileSpacing={(val) => {
						setMobile(val);
						args.onChangeMobileSpacing?.(val);
					}}
					isLinked={isLinked}
					onChangeLink={(val) => {
						setIsLinked(val);
						args.onChangeLink?.(val);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#f9f9f9',
						border: '1px dashed #c3c4c7',
						borderRadius: '4px',
					}}
				>
					<div
						style={{
							fontSize: '11px',
							textTransform: 'uppercase',
							color: '#646970',
							marginBottom: '8px',
						}}
					>
						Live Asymmetrical Spacing ({device}): Top: {activeSpacing.top}{activeUnit},
						Right: {activeSpacing.right}{activeUnit}, Bottom: {activeSpacing.bottom}
						{activeUnit}, Left: {activeSpacing.left}{activeUnit}
					</div>
					<div
						style={{
							background: '#3858e9',
							padding: `${activeSpacing.top || 0}${activeUnit} ${activeSpacing.right || 0}${activeUnit} ${activeSpacing.bottom || 0}${activeUnit} ${activeSpacing.left || 0}${activeUnit}`,
							borderRadius: '4px',
							transition: 'padding 0.15s ease',
						}}
					>
						<div
							style={{
								background: '#fff',
								padding: '16px',
								textAlign: 'center',
								borderRadius: '2px',
								fontSize: '13px',
								color: '#1e1e1e',
								fontWeight: 500,
							}}
						>
							Custom Asymmetric Margins/Padding
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Section Margin',
		deviceType: 'Desktop',
		isLinked: false,
		units: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
		desktopSpacing: { top: '40', right: '20', bottom: '50', left: '15' },
		tabletSpacing: { top: '30', right: '15', bottom: '35', left: '10' },
		mobileSpacing: { top: '20', right: '10', bottom: '25', left: '10' },
	},
};

export const ResponsiveDeviceSync = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [units, setUnits] = useState(
			args.units || { Desktop: 'rem', Tablet: 'rem', Mobile: 'rem' }
		);
		const [isLinked, setIsLinked] = useState(args.isLinked ?? true);
		const [desktop, setDesktop] = useState(
			args.desktopSpacing || { top: '3', right: '3', bottom: '3', left: '3' }
		);
		const [tablet, setTablet] = useState(
			args.tabletSpacing || { top: '2', right: '2', bottom: '2', left: '2' }
		);
		const [mobile, setMobile] = useState(
			args.mobileSpacing || { top: '1', right: '1', bottom: '1', left: '1' }
		);

		const activeSpacing =
			device === 'Desktop' ? desktop : device === 'Tablet' ? tablet : mobile;
		const activeUnit = units[device] || 'rem';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Switch Device Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d} (
							{d === 'Desktop'
								? `${desktop.top}${units.Desktop}`
								: d === 'Tablet'
								? `${tablet.top}${units.Tablet}`
								: `${mobile.top}${units.Mobile}`}
							)
						</button>
					))}
				</div>

				<ResponsiveSpacingControl
					{...args}
					deviceType={device}
					units={units}
					onChangeUnits={(newUnits) => {
						setUnits(newUnits);
						args.onChangeUnits?.(newUnits);
					}}
					desktopSpacing={desktop}
					onChangeDesktopSpacing={(val) => {
						setDesktop(val);
						args.onChangeDesktopSpacing?.(val);
					}}
					tabletSpacing={tablet}
					onChangeTabletSpacing={(val) => {
						setTablet(val);
						args.onChangeTabletSpacing?.(val);
					}}
					mobileSpacing={mobile}
					onChangeMobileSpacing={(val) => {
						setMobile(val);
						args.onChangeMobileSpacing?.(val);
					}}
					isLinked={isLinked}
					onChangeLink={(val) => {
						setIsLinked(val);
						args.onChangeLink?.(val);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#f0f6fc',
						border: '1px solid #c5d9ed',
						borderRadius: '4px',
					}}
				>
					<div
						style={{
							fontSize: '12px',
							color: '#1e1e1e',
							marginBottom: '6px',
						}}
					>
						<strong>Breakpoint Memory:</strong> Desktop is <code>3rem</code>, Tablet is{' '}
						<code>2rem</code>, Mobile is <code>1rem</code>.
					</div>
					<div style={{ fontSize: '11px', color: '#646970' }}>
						Active: <code>{activeSpacing.top}{activeUnit}</code> on {device}.
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Padding (Rem)',
		deviceType: 'Desktop',
		isLinked: true,
		units: {
			Desktop: 'rem',
			Tablet: 'rem',
			Mobile: 'rem',
		},
		desktopSpacing: { top: '3', right: '3', bottom: '3', left: '3' },
		tabletSpacing: { top: '2', right: '2', bottom: '2', left: '2' },
		mobileSpacing: { top: '1', right: '1', bottom: '1', left: '1' },
	},
};
