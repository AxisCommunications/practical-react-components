import React, { useCallback, useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate, useLocation, matchPath } from 'react-router-dom'
import {
  ExpandableList,
  ExpandableListItemType,
  IconButton,
} from 'practical-react-components-core'
import {
  DownloadIcon,
  HamburgerMenuIcon,
  HomeIcon,
  LogIcon,
} from 'practical-react-components-icons'

import { Components, Component } from './types'

const BASE_ITEMS = [
  {
    name: 'Home',
    route: '/',
    icon: HomeIcon,
  },
  {
    name: 'Repository',
    route: 'https://github.com/AxisCommunications/practical-react-components',
    icon: DownloadIcon,
  },
  {
    name: 'Changelog',
    route:
      'https://github.com/AxisCommunications/practical-react-components/blob/main/CHANGELOG.md',
    icon: LogIcon,
  },
]

function groupBy<T, K>(list: ReadonlyArray<T>, getKey: (item: T) => K) {
  const map = new Map<K, Array<T>>()

  list.forEach(item => {
    const key = getKey(item)
    const collection = map.get(key)

    if (collection === undefined) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })

  return Array.from(map.values())
}

const MenuContainer = styled.div<{ readonly showNavigation: boolean }>`
  background-color: ${({ theme }) => theme.color.background00()};
  display: inline-flex;
  flex-direction: column;

  ${({ showNavigation }) =>
    showNavigation
      ? css`
          height: 100%;
          width: 300px;
        `
      : undefined}
`

const ExpandableListContainer = styled.div`
  overflow-y: auto;
`

interface MenuProps {
  readonly components: Components
}

interface ComponentGroup extends Component {
  readonly id: ExpandableListItemType['id']
  readonly label: ExpandableListItemType['label']
  readonly icon: ExpandableListItemType['icon']
  readonly selected: ExpandableListItemType['selected']
}

export const Menu: React.FC<MenuProps> = ({ components }) => {
  const [showNavigation, setShowNavigation] = useState<boolean>(true)
  const navigate = useNavigate()
  const location = useLocation()
  const selectTab = useCallback((route: string) => navigate(route), [history])
  const onMenuIconClick = useCallback(
    () => setShowNavigation(!showNavigation),
    [showNavigation]
  )

  const mappedComponents = useMemo(
    () =>
      [...BASE_ITEMS, ...components].map(c => ({
        id: c.name,
        label: c.name,
        icon: () => c.icon ?? null,
        selected: matchPath(location.pathname, c.route) !== null,
        onClick: () =>
          /^https?:\/\//.test(c.route)
            ? (window.location.href = c.route)
            : selectTab(c.route),
        ...c,
      })) as unknown as ReadonlyArray<ComponentGroup>,
    [location.pathname, components, selectTab]
  )

  const groupedComponents = useMemo(
    () =>
      groupBy(mappedComponents, item => item.menu).reduce(
        (acc: ReadonlyArray<ExpandableListItemType>, g) => {
          const nested = g[0].menu !== undefined
          const name: string = nested ? g[0].menu : ''

          if (!nested || name === '') {
            return [...acc, ...g]
          }

          return [
            ...acc,
            {
              id: name,
              label: name,
              icon: () => null,
              selected: location.pathname.startsWith(
                `/${name.toLocaleLowerCase()}`
              ),
              items: g,
            },
          ]
        },
        []
      ),
    [location.pathname, mappedComponents]
  )

  return (
    <MenuContainer showNavigation={showNavigation}>
      <IconButton
        variant="secondary"
        icon={HamburgerMenuIcon}
        onClick={onMenuIconClick}
      />

      {showNavigation ? (
        <ExpandableListContainer>
          <ExpandableList items={groupedComponents} />
        </ExpandableListContainer>
      ) : null}
    </MenuContainer>
  )
}
