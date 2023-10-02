import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { CheckIcon } from 'practical-react-components-icons'
import { Chip } from '.'
import { TestRender } from '../TestUtils'

describe('Chips', () => {
	test('default', () => {
		const tree = TestRender(<Chip text="test" />)
		expect(tree).toMatchSnapshot()
	})

	test('error', () => {
		const tree = TestRender(<Chip text="test" error={true} />)

		expect(tree).toMatchSnapshot()
	})

	test('disabled', () => {
		const tree = TestRender(<Chip text="test" disabled={true} />)

		expect(tree).toMatchSnapshot()
	})

	test('with icon', () => {
		const tree = TestRender(<Chip text="with icon" icon={CheckIcon} />)

		expect(tree).toMatchSnapshot()
	})
})
