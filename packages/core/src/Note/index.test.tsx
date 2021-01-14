import React from 'react'
import 'jest-styled-components'

import { Note } from '.'
import { TestRender } from '../TestUtils'
import { InfoIcon } from 'practical-react-components-icons'

describe('Notes', () => {
  test('Note', () => {
    const tree1 = TestRender(<Note text="test" icon={InfoIcon} />)
    expect(tree1).toMatchSnapshot()
  })
})
