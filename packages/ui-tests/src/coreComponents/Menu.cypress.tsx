import React from 'react'
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

const Wrapper = styled.div`
  height: 107vh;
  display: flex;
`

const Test = () => (
  <Wrapper>
    <Menu items={ITEMS} data-cy="menuTest1" />
    <Menu items={ITEMS} data-cy="menuTest2" />
  </Wrapper>
)

/* eslint-disable-next-line import/no-default-export */
export default Test
