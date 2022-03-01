import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { SelectList, SelectListItemOption } from '.'
import { TestRender } from '../TestUtils'

const options: ReadonlyArray<SelectListItemOption> = [
  { value: 'test1', label: 'test1' },
  { value: 'test2', label: 'test2', disabled: true },
  { value: 'test3', label: 'test3' },
]

const onSelect = () => {
  /** */
}

describe('SelectList', () => {
  test('SelectList', () => {
    const test1 = TestRender(
      <SelectList value="test1" options={options} onSelect={onSelect} />
    )
    expect(test1).toMatchSnapshot()

    const test2 = TestRender(
      <SelectList
        value="test1"
        options={options}
        onSelect={onSelect}
        maxHeight={200}
      />
    )
    expect(test2).toMatchSnapshot()
  })
})
