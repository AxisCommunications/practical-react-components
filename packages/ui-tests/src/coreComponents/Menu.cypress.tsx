import styled from 'styled-components'

import { Menu } from 'practical-react-components-core'

export const meta = {
  name: 'Menu',
  route: '/components/Menu',
  menu: '',
}

const NOOP = () => {
  /* */
}

export const ITEMS = [
  { label: 'Enabled item', onClick: NOOP },
  { label: 'Column options', divider: true, onClick: NOOP },
  { label: 'Item 3', disabled: true, danger: true, onClick: NOOP },
]

export const ITEMS_WITH_SUBMENU = [
  {
    label: 'Enabled item',
    onClick: NOOP,
    submenu: [
      { label: 'Sub 1', onClick: NOOP },
      { label: 'Sub 2', onClick: NOOP },
    ],
  },
  { label: 'Column options', divider: true, onClick: NOOP },
  { label: 'Item 3', disabled: true, danger: true, onClick: NOOP },
]

const Wrapper = styled.div`
  height: 107vh;
  display: flex;
`

const Test = () => (
  <Wrapper>
    <Menu items={ITEMS} data-cy="menuTest1" />
    <Menu items={ITEMS} data-cy="menuTest2" />
    <Menu items={ITEMS_WITH_SUBMENU} data-cy="menuTest_submenu" />
  </Wrapper>
)

export default Test
