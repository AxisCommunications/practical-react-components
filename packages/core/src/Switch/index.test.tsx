import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Switch } from '.'
import { TestRender } from '../TestUtils'

describe('Switch', () => {
	test('On', () => {
		const tree1 = TestRender(<Switch value={true} />)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<Switch label="test label" value={true} disabled={true} />
		)
		expect(tree2).toMatchSnapshot()
	})

	test('Off', () => {
		const tree1 = TestRender(<Switch value={false} />)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(<Switch value={false} disabled={true} />)
		expect(tree2).toMatchSnapshot()
	})
})
