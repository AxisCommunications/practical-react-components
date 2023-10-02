import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Table, TableHeader, TableRow, TableHeaderText } from '.'
import { TestRender } from '../TestUtils'
import { Typography } from '../Typography'
import { MenuItemProps, Menu } from '../Menu'

const NOOP = () => {
	/** */
}
const clickHandler = () => console.log('Menu item click')

interface Device {
	readonly serialNumber: string
	readonly name: string
	readonly ip: string
	readonly disabled?: boolean
}

const TABLE_HEADER_DATA: ReadonlyArray<{
	readonly id: string
	readonly title: string
	readonly width: number
}> = [
	{ id: 'serial-number', title: 'Serial number', width: 2 },
	{ id: 'name', title: 'Name', width: 1 },
	{ id: 'ip-address', title: 'IP address', width: 2 },
]

const DEVICE_LIST: ReadonlyArray<Device> = [
	{ serialNumber: 'FACEFACE0001', name: 'a', ip: '192.168.0.1' },
	{ serialNumber: 'FACEFACE0002', name: 'b', ip: '192.168.0.2' },
	{
		serialNumber: 'FACEFACE0003',
		name: 'c',
		ip: '192.168.0.3',
		disabled: true,
	},
	{ serialNumber: 'FACEFACE0004', name: 'd', ip: '192.168.0.4' },
	{ serialNumber: 'FACEFACE0005', name: 'e', ip: '192.168.0.5' },
	{ serialNumber: 'FACEFACE0006', name: 'f', ip: '192.168.0.6' },
	{ serialNumber: 'FACEFACE0007', name: 'g', ip: '192.168.0.7' },
	{ serialNumber: 'FACEFACE0008', name: 'h', ip: '192.168.0.8' },
	{ serialNumber: 'FACEFACE0009', name: 'i', ip: '192.168.0.9' },
	{ serialNumber: 'FACEFACE0010', name: 'j', ip: '192.168.0.10' },
	{ serialNumber: 'FACEFACE0011', name: 'k', ip: '192.168.0.11' },
	{ serialNumber: 'FACEFACE0012', name: 'l', ip: '192.168.0.12' },
]

const ITEMS: ReadonlyArray<Omit<MenuItemProps, 'onClick'>> = [
	{ label: 'Item 1' },
	{ label: 'Item 2', divider: true },
	{ label: 'Item 3', disabled: true, danger: true },
]

describe('Tables', () => {
	test('Table (minimal)', () => {
		const tree = TestRender(
			<Table maxHeight={6}>
				<TableHeader>
					{TABLE_HEADER_DATA.map(({ title }, id) => (
						<TableHeaderText key={id}>{title}</TableHeaderText>
					))}
				</TableHeader>
				{DEVICE_LIST.map(device => (
					<TableRow
						id={device.serialNumber}
						key={device.serialNumber}
						disabled={device.disabled}
					>
						<Typography>{device.serialNumber}</Typography>
						<Typography>{device.name}</Typography>
						<Typography>{device.ip}</Typography>
					</TableRow>
				))}
			</Table>
		)
		expect(tree).toMatchSnapshot()
	})
	test('Table (full)', () => {
		const tree = TestRender(
			<Table
				initialWidths={TABLE_HEADER_DATA.map(({ width }) => width)}
				maxHeight={6}
				onSelect={NOOP}
				hasMenu={true}
			>
				<TableHeader
					selected={true}
					partial={false}
					overlay={
						<div>
							<Typography>Actions overlay</Typography>
						</div>
					}
					menu={
						<Menu
							align="right"
							items={ITEMS.map(({ label, ...item }) => ({
								...item,
								label,
								onClick: clickHandler,
							}))}
						/>
					}
				>
					{TABLE_HEADER_DATA.map(({ title }, id) => (
						<TableHeaderText key={id}>{title}</TableHeaderText>
					))}
				</TableHeader>
				{DEVICE_LIST.map(device => (
					<TableRow
						id={device.serialNumber}
						key={device.serialNumber}
						selected={true}
						disabled={device.disabled}
						menu={
							<Menu
								align="right"
								items={ITEMS.map(({ label, ...item }) => ({
									...item,
									label,
									onClick: clickHandler,
								}))}
							/>
						}
					>
						<Typography>{device.serialNumber}</Typography>
						<Typography>{device.name}</Typography>
						<Typography>{device.ip}</Typography>
					</TableRow>
				))}
			</Table>
		)
		expect(tree).toMatchSnapshot()
	})
})
