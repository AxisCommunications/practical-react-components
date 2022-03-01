import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { DraggableList, DraggableListItem } from '.'
import { move } from './utils'
import { TestRender } from '../TestUtils'

const callback = () => {
  /** */
}

describe('DraggableList', () => {
  test('DraggableList', () => {
    const tree = TestRender(
      <DraggableList onChange={callback}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <DraggableListItem key={index} disabled={item === 4}>
            <p>{item}</p>
          </DraggableListItem>
        ))}
      </DraggableList>
    )
    expect(tree).toMatchSnapshot()
  })

  test('move', () => {
    const testItems = [
      {
        arr: [0, 1, 2, 3, 4],
        locked: [false, false, true, false, false],
        from: 3,
        to: 1,
        resultIndices: [0, 3, 2, 1, 4],
      },
      {
        arr: [0, 1, 2, 3, 4],
        locked: [false, false, true, true, false],
        from: 4,
        to: 1,
        resultIndices: [0, 4, 2, 3, 1],
      },
      {
        arr: [0, 1, 2, 3, 4],
        locked: [false, false, true, true, false],
        from: 1,
        to: 4,
        resultIndices: [0, 4, 2, 3, 1],
      },
      {
        arr: [0, 1, 2, 3, 4],
        locked: [true, false, false, false, true],
        from: 1,
        to: 3,
        resultIndices: [0, 2, 3, 1, 4],
      },
    ]

    testItems.forEach(({ arr, locked, from, to, resultIndices }) =>
      expect(move(arr, locked, from, to)).toEqual(resultIndices)
    )
  })
})
