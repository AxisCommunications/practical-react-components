// Spec: https://xd.adobe.com/spec/fdeb9a9d-1c3f-425f-741f-268833f8807e-8bda/
// Prototype: https://xd.adobe.com/view/281d386a-68ef-4678-7dd7-71ca98dde7c6-5e2c/
// Pass: Momentum1

import React, { useState, FC } from 'react'
import styled from 'styled-components'

import { IconType } from '../Icon'
import { ExpandableListItem } from './ExpandableListItem'

export * from './ExpandableListItem'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

export interface IExpandableListItem {
  readonly id: string
  readonly label: string
  readonly icon: IconType
  readonly selected?: boolean
  readonly onClick?: VoidFunction
  readonly items?: ReadonlyArray<IExpandableListItem>
}

interface IExpandableListProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Used to create an array of items.
   */
  readonly items: ReadonlyArray<IExpandableListItem>
}

export const ExpandableListContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`

export const ExpandableList: FC<IExpandableListProps> = ({
  items,
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState<ReadonlyArray<string>>([])

  return (
    <ExpandableListContainer {...props}>
      {items.map(item => (
        <ExpandableListItem
          key={item.id}
          item={item}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          isNestedItem={false}
        />
      ))}
    </ExpandableListContainer>
  )
}
