import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import { useSelection } from 'react-hooks-shareable'
import { MoreIcon } from 'practical-react-components-icons'
import {
	Table,
	TableHeader,
	TableRow,
	TableHeaderText,
	Typography,
	Menu,
} from 'practical-react-components-core'

export const meta = {
	name: 'Table',
	route: '/components/Table',
	menu: '',
}

// Visible wrapper to outline the table
const Wrapper = styled.div`
  height: 256px;
  border: solid green 1px;
  box-sizing: content-box;
`

const TABLE_HEADER_DATA = [
	{ id: 'serial-number', title: 'Serial number', width: 200 },
	{ id: 'name', title: 'Name', width: 300 },
	{ id: 'ip-address', title: 'IP address', width: 400 },
]

const DEVICE_LIST = [
	{ serialNumber: 'FACEFACE0001', name: 'a', ip: '192.168.0.1' },
	{ serialNumber: 'FACEFACE0002', name: 'b', ip: '192.168.0.2' },
	{ serialNumber: 'FACEFACE0003', name: 'c', ip: '192.168.0.3' },
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

const ITEMS = [
	{ label: 'Item 1' },
	{ label: 'Item 2', divider: true },
	{ label: 'Item 3', disabled: true, danger: true },
]

const onClickHandler = () => {
	/* do nothing */
}

const Test = () => {
	const [selection, add, remove, reset] = useSelection()
	const [initialWidths, setInitialWidths] = useState(
		TABLE_HEADER_DATA.map(({ width }) => width)
	)
	const handleWidthChange = useCallback(e => {
		setInitialWidths(e)
	}, [])
	const onSelect = useCallback(
		(selected, id) => {
			if (selected === true) {
				id !== undefined
					? add(id)
					: reset(DEVICE_LIST.map(device => device.serialNumber))
			} else {
				id !== undefined ? remove(id) : reset([])
			}
		},
		[add, reset, remove]
	)
	const [key, setKey] = useState('')
	const [clicked, setClicked] = useState(false)
	const clickFunc = useCallback(() => {
		setClicked(true)
		setKey(`${Math.floor(Math.random() * 100)}`)
	}, [setKey, setClicked])

	return (
		<Wrapper>
			<Table
				data-cy="table"
				initialWidths={initialWidths}
				resizableColumns={true}
				minColumnWidth={0}
				maxHeight={6}
				onSelect={onSelect}
				hasMenu={true}
				onWidthsChange={handleWidthChange}
				scrollKey={key}
			>
				<TableHeader
					data-cy="tableHeader"
					selected={
						selection.size !== 0 && selection.size === DEVICE_LIST.length
					}
					partial={selection.size > 0 && selection.size < DEVICE_LIST.length}
					overlay={
						selection.size === 0 ? undefined : (
							<div>
								<Typography>Actions overlay</Typography>
							</div>
						)
					}
					menu={
						<Menu
							data-cy="tableHeaderMenu"
							align="right"
							items={ITEMS.map(({ label, ...item }) => ({
								...item,
								label,
								onClick: onClickHandler,
							}))}
						/>
					}
				>
					{TABLE_HEADER_DATA.map(({ title }, id) => (
						<TableHeaderText key={id}>{title}</TableHeaderText>
					))}
				</TableHeader>
				{DEVICE_LIST.map((device, index) => (
					<TableRow
						data-cy="tableRow"
						id={device.serialNumber}
						key={device.serialNumber}
						selected={selection.has(device.serialNumber)}
						disabled={index === 2}
						menu={
							<>
								<Menu
									data-cy="tableRowMenu"
									icon={MoreIcon}
									align="right"
									items={ITEMS.map(({ label, ...item }) => ({
										...item,
										label,
										onClick: onClickHandler,
									}))}
								/>
							</>
						}
						clickable={index === 5}
						onClicked={clickFunc}
					>
						<Typography>{device.serialNumber}</Typography>
						<Typography>{device.name}</Typography>
						<Typography>{device.ip}</Typography>
					</TableRow>
				))}
			</Table>
			{clicked ? <Typography>Row is clicked</Typography> : null}
		</Wrapper>
	)
}

export default Test
