import React, { useCallback, FC, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { FoldTransition } from '../Transition'

import { ListItemContainer } from './ListItemContainer'

import { IExpandableListItem, ExpandableListContainer } from '.'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

export interface IExpandableListItemProps extends BaseProps {
  readonly item: IExpandableListItem
  readonly expandedItems: ReadonlyArray<string>
  readonly setExpandedItems: Dispatch<SetStateAction<ReadonlyArray<string>>>
  readonly isNestedItem: boolean
}

const ItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background00()};
`

/**
 * ExpandableListItem
 *
 * The ExpandableListItem component (recursive component) wraps and builds the item in the list.
 * It may contain an array of nested items, each of which will be wrapped in this
 * component as well.
 *
 */

export const ExpandableListItem: FC<IExpandableListItemProps> = ({
  item,
  expandedItems,
  setExpandedItems,
  isNestedItem,
  ...props
}) => {
  const { id, label, icon, selected = false, onClick, items } = item
  const onChildClick = useCallback(
    () =>
      ((itemId: string) => {
        const nextExpandedItems = expandedItems.includes(itemId)
          ? expandedItems.filter(i => i !== itemId)
          : [...expandedItems, id]
        setExpandedItems(nextExpandedItems)
      })(id),
    [expandedItems, id, setExpandedItems]
  )
  const hasChildren = items !== undefined
  const onItemClick = hasChildren ? onChildClick : onClick
  const expanded = expandedItems.includes(id)
  const childSelected =
    items !== undefined
      ? Boolean(items.find(({ selected: subSelected = false }) => subSelected))
      : false

  return (
    <ItemWrapper key={id} {...props}>
      <ListItemContainer
        selected={selected}
        isNestedItem={isNestedItem}
        hasChildren={hasChildren}
        expanded={expanded}
        childSelected={childSelected}
        onClick={onItemClick}
        icon={icon}
        label={label}
      />
      {items !== undefined ? (
        <FoldTransition expanded={expanded}>
          <ExpandableListContainer>
            {items.map(i => (
              <ExpandableListItem
                key={i.id}
                item={i}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                isNestedItem={true}
              />
            ))}
          </ExpandableListContainer>
        </FoldTransition>
      ) : null}
    </ItemWrapper>
  )
}
