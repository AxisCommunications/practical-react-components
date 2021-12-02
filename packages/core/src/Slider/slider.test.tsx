import React from 'react'
import 'jest-styled-components'

import { Slider } from '.'
import { TestRender } from '../TestUtils'

const handleChange = () => {
  /** */
}

describe('Slider', () => {
  test('Levels', () => {
    const tree1 = TestRender(<Slider value={0} handleChange={handleChange} />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Slider value={50} handleChange={handleChange} />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<Slider value={100} handleChange={handleChange} />)
    expect(tree3).toMatchSnapshot()
  })
})
