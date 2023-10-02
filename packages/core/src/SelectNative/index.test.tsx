import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { SelectNative } from '.'
import { TestRender } from '../TestUtils'

const options = [
	{ value: 'test1', label: 'test1' },
	{ value: 'test2', label: 'test2', disabled: true },
	{ value: 'test3', label: 'test3' },
]

const callback = () => {
	/** */
}

describe('Draggable', () => {
	test('Width', () => {
		const tree1 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				width="small"
				onChange={callback}
			/>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				width="medium"
				onChange={callback}
			/>
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				width="large"
				onChange={callback}
			/>
		)
		expect(tree3).toMatchSnapshot()

		const tree4 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				width="full"
				onChange={callback}
			/>
		)
		expect(tree4).toMatchSnapshot()
	})

	test('Variant', () => {
		const tree1 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				variant="filled"
				onChange={callback}
			/>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				variant="transparent"
				onChange={callback}
			/>
		)
		expect(tree2).toMatchSnapshot()
	})

	test('Disabled', () => {
		const tree1 = TestRender(
			<SelectNative
				value="test1"
				options={options}
				disabled={true}
				onChange={callback}
			/>
		)
		expect(tree1).toMatchSnapshot()
	})
})
