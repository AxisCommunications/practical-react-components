import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { SearchSelect } from '.'
import { Option } from './Select'
import { TestRender } from '../TestUtils'

const options: ReadonlyArray<Option> = [
	{ value: 'test1', label: 'test1' },
	{ value: 'test2', label: 'test2', disabled: true },
	{ value: 'test3', label: 'test3' },
]

describe('Select', () => {
	test('Width', () => {
		const tree1 = TestRender(<SearchSelect value="test1" options={options} />)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(<SearchSelect value="test2" options={options} />)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<SearchSelect value="test1" options={[]} noOptionsLabel="No options" />
		)
		expect(tree3).toMatchSnapshot()
	})

	test('Direction', () => {
		const tree1 = TestRender(
			<SearchSelect value="test1" options={options} direction="up" />
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<SearchSelect value="test1" options={options} direction="down" />
		)
		expect(tree2).toMatchSnapshot()
	})

	test('SelectMarker', () => {
		const tree1 = TestRender(
			<SearchSelect value="test1" options={options} selectMarker="background" />
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<SearchSelect value="test1" options={options} selectMarker="check" />
		)
		expect(tree2).toMatchSnapshot()
	})

	test('Other', () => {
		const tree1 = TestRender(
			<SearchSelect value="test1" options={options} error="test" />
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<SearchSelect value="test1" options={options} disabled={true} />
		)
		expect(tree2).toMatchSnapshot()
	})
})
