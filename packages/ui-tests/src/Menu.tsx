import React, { useCallback, useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  ExpandableList,
  IExpandableListItem,
  IconButton,
} from 'practical-react-components-core'
import { HamburgerMenuIcon } from 'practical-react-components-icons'

import { Components, IComponent } from './types'

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

interface IMenuProps {
  readonly components: Components
}

interface IComponentGroup extends IComponent {
  readonly id: IExpandableListItem['id']
  readonly label: IExpandableListItem['label']
  readonly icon: IExpandableListItem['icon']
  readonly selected: IExpandableListItem['selected']
}

export const Menu: React.FC<IMenuProps> = ({ components }) => {
  const [showNavigation, setShowNavigation] = useState<boolean>(true)
  const history = useHistory()
  const selectTab = useCallback((route: string) => history.push(route), [
    history,
  ])
  const onMenuIconClick = useCallback(
    () => setShowNavigation(!showNavigation),
    [showNavigation]
  )

  const mappedComponents = useMemo(
    () =>
      (components.map(c => ({
        id: c.name,
        label: c.name,
        icon: () => null,
        selected: c.route === history.location.pathname,
        onClick: () =>
          /^https?:\/\//.test(c.route)
            ? (window.location.href = c.route)
            : selectTab(c.route),
        ...c,
      })) as unknown) as ReadonlyArray<IComponentGroup>,
    [history.location.pathname, components, selectTab]
  )

  const groupedComponents = useMemo(
    () =>
      groupBy(mappedComponents, item => item.menu).reduce(
        (acc: ReadonlyArray<IExpandableListItem>, g) => {
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
              selected: history.location.pathname.startsWith(
                `/${name.toLocaleLowerCase()}`
              ),
              items: g,
            },
          ]
        },
        []
      ),
    [history.location.pathname, mappedComponents]
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
