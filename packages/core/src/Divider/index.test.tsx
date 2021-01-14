import React from 'react'
import 'jest-styled-components'

import { Divider } from '.'
import { TestRender } from '../TestUtils'

describe('Dividers', () => {
  test('Divider variant', () => {
    const tree1 = TestRender(<Divider />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Divider variant="full" />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<Divider variant="middle" />)
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(<Divider variant="inset" />)
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(<Divider variant="inset" insetSize={100} />)
    expect(tree5).toMatchSnapshot()
  })
})
