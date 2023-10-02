import React, { useState } from 'react'
import { DeviceIcon } from 'practical-react-components-icons'
import { ExpandableList } from 'practical-react-components-core'

export const meta = {
	name: 'ExpandableList',
	route: '/components/expandablelist',
	menu: '',
}

const ITEMS = [
	{
		id: 'devices',
		label: 'Devices',
		icon: DeviceIcon,
	},
	{
		id: 'category',
		label: 'Category',
		icon: DeviceIcon,
		selected: true,
		items: [
			{
				id: 'item-1',
				label: 'Item 1',
				icon: DeviceIcon,
			},
			{
				id: 'item-2',
				label: 'Item 2',
				icon: DeviceIcon,
			},
			{
				id: 'item-3',
				label: 'Item 3',
				icon: DeviceIcon,
			},
		],
	},
	{
		id: 'site-log',
		label: 'Site log',
		icon: DeviceIcon,
	},
]

const Test = () => {
	const [selectedItem, setSelectedItem] = useState('none')
	const listItems = ITEMS.map(item => {
		return {
			...item,
			selected: selectedItem === item.id,
			onClick: () => {
				setSelectedItem(item.id)
			},
			items:
				item.items !== undefined
					? item.items.map(subItem => {
							return {
								...subItem,
								selected: selectedItem === subItem.id,
								onClick: () => {
									setSelectedItem(subItem.id)
								},
							}
					  })
					: undefined,
		}
	})

	return (
		<>
			<ExpandableList data-cy="expandableListTest" items={listItems} />
		</>
	)
}

export default Test
