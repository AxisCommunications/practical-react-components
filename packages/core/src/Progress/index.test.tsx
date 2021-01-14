import React from 'react'
import 'jest-styled-components'

import { Progress } from '.'
import { TestRender } from '../TestUtils'

describe('Progress', () => {
  test('Levels', () => {
    const tree1 = TestRender(<Progress label="test" value={0} />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Progress label="test" value={0.1} />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<Progress label="test" value={0.22} />)
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(<Progress label="test" value={0.58} />)
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(<Progress label="test" value={0.83} />)
    expect(tree5).toMatchSnapshot()

    const tree6 = TestRender(<Progress label="test" value={1} />)
    expect(tree6).toMatchSnapshot()
  })
})
