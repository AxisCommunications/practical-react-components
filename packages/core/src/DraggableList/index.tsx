import {
  useCallback,
  useRef,
  useState,
  useMemo,
  DragEventHandler,
  useLayoutEffect,
  MouseEventHandler,
  HTMLAttributes,
  FC,
  Children,
  ReactNode,
} from 'react'
import styled from 'styled-components'

import { Divider } from '../Divider'
import { Icon } from '../Icon'
import { componentSize } from '../designparams'
import { move, isElementDisabled, range } from './utils'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

const DraggableItem = styled.div`
  display: flex;
  align-items: center;
  height: ${componentSize.large};
`

const DraggableHandle = styled.div`
  color: ${({ theme }) => theme.color.element01()};
  cursor: move;
`

const DragHandleIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em">
    <path d="m20 9h-16v2h16v-2zm-16 6h16v-2h-16v2z" />
  </svg>
)

const DraggableListItemStyled = styled.div<{
  readonly disabled?: boolean
}>`
  display: flex;
  height: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

interface DraggableListItemProps extends BaseProps {
  readonly children?: ReactNode
  readonly disabled?: boolean
  readonly className?: string
}

export const DraggableListItem: FC<DraggableListItemProps> = ({
  children,
  ...props
}) => {
  const onGrabHandle = useCallback<MouseEventHandler<HTMLDivElement>>(e => {
    e.currentTarget.parentElement?.parentElement?.setAttribute(
      'draggable',
      'true'
    )
  }, [])

  const onReleaseHandle = useCallback<MouseEventHandler<HTMLDivElement>>(e => {
    e.currentTarget.parentElement?.parentElement?.setAttribute(
      'draggable',
      'false'
    )
  }, [])

  return (
    <DraggableListItemStyled {...props}>
      <div>{children}</div>
      {props.disabled === true ? null : (
        <DraggableHandle onMouseDown={onGrabHandle} onMouseUp={onReleaseHandle}>
          <Icon icon={DragHandleIcon} />
        </DraggableHandle>
      )}
    </DraggableListItemStyled>
  )
}

/**
 * Draggable list
 *
 * A list where the items can be dragged through a drag handler
 * rendered on the right side of the list items.
 */

export interface DraggableListProps extends Omit<BaseProps, 'onChange'> {
  readonly children?: ReactNode
  /**
   * Function called when list order changes with list of re-ordered indices as argument
   */
  readonly onChange: (indices: ReadonlyArray<number>) => void
}

export const DraggableList: FC<DraggableListProps> = ({
  children,
  onChange,
  ...props
}) => {
  const childElements = useMemo(() => Children.toArray(children), [children])
  const locked = useMemo(
    () => childElements.map(isElementDisabled),
    [childElements]
  )

  const elementRange = useMemo(
    () => range(childElements.length),
    [childElements]
  )
  const [order, setOrder] = useState(elementRange)

  useLayoutEffect(
    () => setOrder(elementRange),
    [elementRange, childElements.length]
  )

  const dragIndexRef = useRef<number | undefined>()
  const dropIndexRef = useRef<number | undefined>()

  const onDragStart = useCallback<DragEventHandler<HTMLDivElement>>(e => {
    // Needed for Firefox
    // You need to set some data in the dataTransfer member
    // of the event when the drag start in Firefox
    e.dataTransfer.setData('text', '')
    dragIndexRef.current = Number(e.currentTarget.dataset.index)
  }, [])

  const onDragOver = useCallback<DragEventHandler<HTMLDivElement>>(
    e => {
      const dragIndex = dragIndexRef.current
      if (dragIndex === undefined) {
        return
      }
      // Only re-order elements if we're dragging over a new
      // item in the list to prevent spurious re-renders.
      const dropIndex = Number(e.currentTarget.dataset.index)
      if (dropIndex !== dropIndexRef.current) {
        dropIndexRef.current = dropIndex
        setOrder(
          move(elementRange, locked, dragIndex, dropIndexRef.current ?? 0)
        )
      }
    },
    [elementRange, locked]
  )

  const onDragEnd = useCallback<DragEventHandler<HTMLDivElement>>(() => {
    dragIndexRef.current = undefined
    dropIndexRef.current = undefined
    onChange(order)
  }, [order, onChange])

  return (
    <div {...props}>
      {order.map((childIndex, index) => {
        const el = childElements[childIndex]
        const isLocked = locked[childIndex]

        return (
          <div key={index}>
            <DraggableItem
              onDragStart={onDragStart}
              onDragOver={isLocked ? undefined : onDragOver}
              onDragEnd={onDragEnd}
              data-index={index}
              style={{
                opacity: childIndex === dragIndexRef.current ? 0 : undefined,
              }}
            >
              {el}
            </DraggableItem>
            <Divider />
          </div>
        )
      })}
    </div>
  )
}
