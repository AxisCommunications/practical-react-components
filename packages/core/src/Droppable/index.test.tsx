import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Droppable } from '.'
import { TestRender } from '../TestUtils'

const onFileChange = () => {
  /** */
}

describe('Droppable', () => {
  test('Droppable', () => {
    const tree1 = TestRender(
      <Droppable inputLabel="Click me" onFileChange={onFileChange} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Droppable
        inputLabel="Click me"
        supportedFormats="some formats"
        onFileChange={onFileChange}
      />
    )
    expect(tree2).toMatchSnapshot()
  })
})
