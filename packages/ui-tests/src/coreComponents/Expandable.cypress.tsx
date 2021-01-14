import React from 'react'

import { Expandable, Arrow } from 'practical-react-components-core'
import styled from 'styled-components'

export const meta = {
  name: 'Expandable',
  route: '/components/expandable',
  menu: '',
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const header = expanded => (
  <Header>
    <p>Header</p>
    <Arrow disabled={false} expanded={expanded} />
  </Header>
)

const Test = () => (
  <Expandable data-cy="expandableTest" initialExpanded={false}>
    {{
      header,
      body: (
        <div>
          <p data-cy="contentId">I am content</p>
        </div>
      ),
    }}
  </Expandable>
)

// eslint-disable-next-line import/no-default-export
export default Test
