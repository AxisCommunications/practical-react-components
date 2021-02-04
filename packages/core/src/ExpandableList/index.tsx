import React, { useState, FC } from 'react'

import {
  ExpandableListContainer,
  ExpandableListItem,
  IExpandableListItem,
} from './ExpandableListItem'

export * from './ExpandableListItem'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

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
