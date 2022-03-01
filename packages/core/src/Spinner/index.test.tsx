import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Spinner } from '.'
import { TestRender } from '../TestUtils'

describe('Spinners', () => {
  test('Spinner', () => {
    const tree1 = TestRender(<Spinner type="primary" />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Spinner type="dashed" label="test" />)
    expect(tree2).toMatchSnapshot()
  })
})
