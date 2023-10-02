import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Tabs } from 'practical-react-components-core'

export const meta = {
  name: 'Tabs',
  route: '/components/tabs',
  menu: '',
}

const HorizontalTabContainer = styled.div`
  display: flex;
  > * {
    width: 128px;
    margin: 8px;
  }
`

const Container = styled.div<{ readonly show: boolean }>`
  display: ${({ show }) => (show ? 'unset' : 'none')};
`

const HTABS = [
  {
    id: '1',
    label: 'Large device',
  },
  {
    id: '2',
    label: 'Very large device',
  },
]

const Test = () => {
  const [selectedTab, setSelectedTab] = useState('none')

  const hTabs = useMemo(() => {
    return HTABS.map(tab => {
      return {
        id: tab.id,
        label: tab.label,
        selected: tab.id === selectedTab,
        onSelect: setSelectedTab,
        'data-cy': `my-tab-${tab.id}`,
      }
    })
  }, [selectedTab, setSelectedTab])

  return (
    <>
      <HorizontalTabContainer>
        <Tabs tabs={hTabs} />
      </HorizontalTabContainer>
      <Container data-cy="container1" show={selectedTab === '1'}>
        <p>Content 1</p>
      </Container>
      <Container data-cy="container2" show={selectedTab === '2'}>
        <p>Content 2</p>
      </Container>
    </>
  )
}

export default Test
