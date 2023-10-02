import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Link } from '.'
import { TestRender } from '../TestUtils'

const NOOP = () => {
	/** */
}

describe('Link', () => {
	test('Variant', () => {
		const tree1 = TestRender(
			<Link variant="a" href="http://example.org">
				Label
			</Link>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<Link variant="button" onClick={NOOP} disabled={true}>
				Label
			</Link>
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<Link
				variant="a"
				href="http://example.org"
				rel="noopener noreferrer"
				target="_blank"
			>
				Label
			</Link>
		)
		expect(tree3).toMatchSnapshot()
	})
})
