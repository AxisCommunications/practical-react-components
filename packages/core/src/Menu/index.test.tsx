import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { CheckIcon } from 'practical-react-components-icons'

import { Menu, MenuItemProps } from '.'
import { TestRender } from '../TestUtils'

const clickHandler = () => console.log('Menu item click')

const items: ReadonlyArray<MenuItemProps> = [
	{ icon: CheckIcon, label: 'Apply policy', onClick: clickHandler },
	{ label: 'Enter Credentials', onClick: clickHandler },
	{ label: 'Pause policy', onClick: clickHandler },
	{
		label: 'Show device report',
		onClick: clickHandler,
		divider: true,
	},
	{ label: 'Update firmware', onClick: clickHandler, danger: true },
	{ label: 'Restart device', onClick: clickHandler, disabled: true },
]

describe('Menus', () => {
	test('Menu (default)', () => {
		const tree = TestRender(<Menu items={items} />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (left)', () => {
		const tree = TestRender(<Menu items={items} align="left" />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (right)', () => {
		const tree = TestRender(<Menu items={items} align="right" />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (disabled)', () => {
		const tree = TestRender(
			<Menu items={items} align="right" disabled={true} />
		)
		expect(tree).toMatchSnapshot()
	})
})

const ItemsWithSubItems: ReadonlyArray<MenuItemProps> = [
	{
		icon: CheckIcon,
		label: 'Apply policy',
		submenu: [
			{ icon: CheckIcon, label: 'Sub 1', onClick: clickHandler },
			{ label: 'Sub 2', onClick: clickHandler, disabled: true },
			{ label: 'Sub 3', onClick: clickHandler },
		],
		onClick: clickHandler, //TODO: this should not be needed
	},
	{ label: 'Enter Credentials', onClick: clickHandler },
	{ label: 'Pause policy', onClick: clickHandler },
	{
		label: 'Show device report',
		onClick: clickHandler,
		divider: true,
	},
	{ label: 'Update firmware', onClick: clickHandler, danger: true },
	{ label: 'Restart device', onClick: clickHandler, disabled: true },
]

describe('Menus with submenu', () => {
	test('Menu (default)', () => {
		const tree = TestRender(<Menu items={ItemsWithSubItems} />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (left)', () => {
		const tree = TestRender(<Menu items={ItemsWithSubItems} align="left" />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (right)', () => {
		const tree = TestRender(<Menu items={ItemsWithSubItems} align="right" />)
		expect(tree).toMatchSnapshot()
	})
	test('Menu (disabled)', () => {
		const tree = TestRender(
			<Menu items={ItemsWithSubItems} align="right" disabled={true} />
		)
		expect(tree).toMatchSnapshot()
	})
})
