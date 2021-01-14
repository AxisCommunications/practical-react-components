import React, { useState } from 'react'
import styled from 'styled-components'
import { DeviceIcon } from 'practical-react-components-icons'
import { Tab } from 'practical-react-components-core'

export const meta = {
  name: 'Tab',
  route: '/components/tab',
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
    icon: DeviceIcon,
  },
  {
    id: '2',
    label: 'Very large device',
  },
]

const Test = () => {
  const [selectedTab, setSelectedTab] = useState('none')

  return (
    <>
      <HorizontalTabContainer>
        {HTABS.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            selected={tab.id === selectedTab}
            onSelect={setSelectedTab}
            data-cy={`my-tab-${tab.id}`}
          />
        ))}
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

/* eslint-disable-next-line import/no-default-export */
export default Test
