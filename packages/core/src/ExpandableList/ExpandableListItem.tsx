import React, { useCallback, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { FoldTransition } from '../Transition'
import { IconType } from '../Icon'

import { ListItemContainer } from './ListItemContainer'

export interface ExpandableListItemType {
  readonly id: string
  readonly label: string
  readonly icon: IconType
  readonly selected?: boolean
  readonly onClick?: VoidFunction
  readonly items?: ReadonlyArray<ExpandableListItemType>
}

export const ExpandableListContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`

const ItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background00()};
`

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

export interface ExpandableListItemProps extends BaseProps {
  readonly item: ExpandableListItemType
  readonly expandedItems: ReadonlyArray<string>
  readonly setExpandedItems: Dispatch<SetStateAction<ReadonlyArray<string>>>
  readonly isNestedItem: boolean
  readonly accordion?: boolean
}

/**
 * ExpandableListItem
 *
 * The ExpandableListItem component (recursive component) wraps and builds the item in the list.
 * It may contain an array of nested items, each of which will be wrapped in this
 * component as well.
 *
 */

export const ExpandableListItem: React.VFC<ExpandableListItemProps> = ({
  item,
  expandedItems,
  setExpandedItems,
  isNestedItem,
  accordion = false,
  ...props
}) => {
  const { id, label, icon, selected = false, onClick, items } = item
  const onChildClick = useCallback(
    () =>
      ((itemId: string) => {
        let nextExpandedItems = []

        if (expandedItems.includes(itemId)) {
          // Close the expanded item
          nextExpandedItems = expandedItems.filter(i => i !== itemId)
        } else if (accordion) {
          // Only add one expanded item when accordion
          nextExpandedItems = [id]
        } else {
          // Extend expanded items with a new one
          nextExpandedItems = [...expandedItems, id]
        }

        setExpandedItems(nextExpandedItems)
      })(id),
    [expandedItems, id, accordion, setExpandedItems]
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
                accordion={accordion}
              />
            ))}
          </ExpandableListContainer>
        </FoldTransition>
      ) : null}
    </ItemWrapper>
  )
}
