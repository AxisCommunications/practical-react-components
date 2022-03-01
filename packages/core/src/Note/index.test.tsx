import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { InfoIcon } from 'practical-react-components-icons'

import { Note } from '.'
import { TestRender } from '../TestUtils'

describe('Notes', () => {
  test('Note', () => {
    const tree1 = TestRender(<Note text="test" icon={InfoIcon} />)
    expect(tree1).toMatchSnapshot()
  })
})
