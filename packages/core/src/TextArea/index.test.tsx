import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { TextArea } from '.'
import { TestRender } from '../TestUtils'

describe('TextAreas', () => {
  test('TextArea', () => {
    const tree1 = TestRender(<TextArea value="test" />)
    expect(tree1).toMatchSnapshot()
  })
})
