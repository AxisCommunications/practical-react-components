import React from 'react'
import 'jest-styled-components'

import { Checkbox } from '.'
import { TestRender } from '../TestUtils'

describe('Checkbox', () => {
  test('Checked', () => {
    const tree1 = TestRender(<Checkbox checked={false} />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Checkbox checked={true} />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<Checkbox checked={true} partial={true} />)
    expect(tree3).toMatchSnapshot()
  })
})
