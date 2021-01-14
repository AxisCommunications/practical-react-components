import React from 'react'
import 'jest-styled-components'

import { TextArea } from '.'
import { TestRender } from '../TestUtils'

describe('TextAreas', () => {
  test('TextArea', () => {
    const tree1 = TestRender(<TextArea value="test" />)
    expect(tree1).toMatchSnapshot()
  })
})
