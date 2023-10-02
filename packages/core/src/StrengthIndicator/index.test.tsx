import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { StrengthIndicator } from '.'
import { TestRender } from '../TestUtils'

describe('StrengthIndicator', () => {
	test('Levels', () => {
		const tree1 = TestRender(<StrengthIndicator helpText="test" strength={0} />)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<StrengthIndicator helpText="test" strength={0.01} />
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<StrengthIndicator helpText="test" strength={0.26} />
		)
		expect(tree3).toMatchSnapshot()

		const tree4 = TestRender(
			<StrengthIndicator helpText="test" strength={0.51} />
		)
		expect(tree4).toMatchSnapshot()

		const tree5 = TestRender(
			<StrengthIndicator helpText="test" strength={0.76} />
		)
		expect(tree5).toMatchSnapshot()
	})
})
