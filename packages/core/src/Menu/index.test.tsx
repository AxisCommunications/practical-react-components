import React from 'react'
import 'jest-styled-components'

import { Menu, MenuItemProps } from '.'
import { CheckIcon } from 'practical-react-components-icons'
import { TestRender } from '../TestUtils'

const clickHandler = () => console.log('Menu item click')

const items: ReadonlyArray<MenuItemProps> = [
  { icon: CheckIcon, label: 'Apply policy', onClick: clickHandler },
  { label: 'Enter Credentials', onClick: clickHandler },
  { label: 'Pause policy', onClick: clickHandler },
  {
    label: 'Show device report',
    onClick: clickHandler,
    divider: true,
  },
  { label: 'Update firmware', onClick: clickHandler, danger: true },
  { label: 'Restart device', onClick: clickHandler, disabled: true },
]

describe('Menus', () => {
  test('Menu (default)', () => {
    const tree = TestRender(<Menu items={items} />)
    expect(tree).toMatchSnapshot()
  })
  test('Menu (left)', () => {
    const tree = TestRender(<Menu items={items} align="left" />)
    expect(tree).toMatchSnapshot()
  })
  test('Menu (right)', () => {
    const tree = TestRender(<Menu items={items} align="right" />)
    expect(tree).toMatchSnapshot()
  })
  test('Menu (disabled)', () => {
    const tree = TestRender(
      <Menu items={items} align="right" disabled={true} />
    )
    expect(tree).toMatchSnapshot()
  })
})
