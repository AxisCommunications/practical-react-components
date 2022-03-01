import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { Typography } from '.'
import { TestRender } from '../TestUtils'

describe('Typography', () => {
  test('default', () => {
    const tree1 = TestRender(<Typography>text</Typography>)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Typography variant="default-text">text</Typography>
    )

    expect(tree2).toMatchSnapshot()
  })

  test('chip tag text', () => {
    const tree = TestRender(
      <Typography variant="chip-tag-text">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('explanatory text', () => {
    const tree = TestRender(
      <Typography variant="explanatory-text">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('caption', () => {
    const tree = TestRender(<Typography variant="caption">text</Typography>)

    expect(tree).toMatchSnapshot()
  })
  test('navigation group', () => {
    const tree = TestRender(
      <Typography variant="navigation-group">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('card title', () => {
    const tree = TestRender(<Typography variant="card-title">text</Typography>)

    expect(tree).toMatchSnapshot()
  })
  test('navigation label', () => {
    const tree = TestRender(
      <Typography variant="navigation-label">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('group title', () => {
    const tree = TestRender(<Typography variant="group-title">text</Typography>)

    expect(tree).toMatchSnapshot()
  })
  test('column heading', () => {
    const tree = TestRender(
      <Typography variant="column-heading">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('header title', () => {
    const tree = TestRender(
      <Typography variant="header-title">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('dialog heading', () => {
    const tree = TestRender(
      <Typography variant="dialog-heading">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('page heading', () => {
    const tree = TestRender(
      <Typography variant="page-heading">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
  test('buttons', () => {
    const tree1 = TestRender(
      <Typography variant="button-text">text</Typography>
    )

    expect(tree1).toMatchSnapshot()
  })
  test('compact label', () => {
    const tree = TestRender(
      <Typography variant="compact-label">text</Typography>
    )

    expect(tree).toMatchSnapshot()
  })
})
