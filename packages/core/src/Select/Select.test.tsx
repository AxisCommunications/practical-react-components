import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Select, Option } from '.'
import { TestRender } from '../TestUtils'

const options: ReadonlyArray<Option> = [
  { value: 'test1', label: 'test1' },
  { value: 'test2', label: 'test2', disabled: true },
  { value: 'test3', label: 'test3' },
]

describe('Select', () => {
  test('Width', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} width="small" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} width="medium" />
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <Select value="test1" options={options} width="large" />
    )
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(
      <Select value="test1" options={options} width="full" />
    )
    expect(tree4).toMatchSnapshot()
  })

  test('Variant', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} variant="filled" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} variant="transparent" />
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <Select value="test1" options={options} variant="framed" />
    )
    expect(tree3).toMatchSnapshot()
  })

  test('Compact', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} compact={true} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} compact={false} />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('Direction', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} direction="up" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} direction="down" />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('SelectMarker', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} selectMarker="background" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} selectMarker="check" />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('Other', () => {
    const tree1 = TestRender(
      <Select value="test1" options={options} error="test" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Select value="test1" options={options} disabled={true} />
    )
    expect(tree2).toMatchSnapshot()
  })
})
