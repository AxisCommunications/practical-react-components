import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Paper } from '.'
import { TestRender, TestText } from '../TestUtils'

describe('Paper', () => {
	test('Default', () => {
		const tree1 = TestRender(
			<Paper>
				<TestText />
			</Paper>
		)
		expect(tree1).toMatchSnapshot()
	})

	test('Square', () => {
		const tree1 = TestRender(
			<Paper square={true}>
				<TestText />
			</Paper>
		)
		expect(tree1).toMatchSnapshot()
	})

	test('Space', () => {
		const tree1 = TestRender(
			<Paper>
				<TestText />
			</Paper>
		)
		expect(tree1).toMatchSnapshot()
	})
})
