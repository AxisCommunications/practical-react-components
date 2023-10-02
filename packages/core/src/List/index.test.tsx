import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { List, ListItem } from '.'
import { TestRender, TestText } from '../TestUtils'

describe('Lists', () => {
	test('List', () => {
		const tree1 = TestRender(
			<List>
				<ListItem>
					<TestText />
				</ListItem>
				<ListItem>
					<TestText />
				</ListItem>
				<ListItem>
					<TestText />
				</ListItem>
			</List>
		)
		expect(tree1).toMatchSnapshot()
	})
})
