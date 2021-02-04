import React, { useContext, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { useDraggable } from 'react-hooks-shareable'

import { componentSize } from '../designparams'

import { TABLE_DIMENSIONS } from './dimensions'
import { TableContext, WidthActionType } from './context'

/**
 * A column divider specifies the absolute position of the divider
 * from the beginning of the first column, and the widths of the columns
 * before and after the divider.
 */
interface IColumnDivider {
  readonly offset: number
  readonly before: number
  readonly after: number
}

/**
 * Clip the translation of a divider so that it remains
 * within the total width of the two columns it divides.
 *
 * @param tx Divider translation
 * @param divider Divider
 */
const clipTranslation = (
  tx: number,
  divider: IColumnDivider,
  minWidth: number
) => {
  const { before, after } = divider
  const txMin = minWidth - before
  const txMax = after - minWidth

  return Math.min(Math.max(txMin, tx), txMax)
}

/*******************************************************************************
 *
 * Column resizing.
 *
 ******************************************************************************/

const ResizeContainer = styled.div.attrs<{ readonly left: number }>(
  ({ left }) => {
    return {
      style: { left: `${left - 8}px` },
    }
  }
)<{ readonly left: number }>`
  display: relative;
  position: absolute;
  width: 16px;
  top: 0;
  height: 100%;
  pointer-events: none;
`

/**
 * ResizeHandle
 *
 * A special component to keep track of the size of its element
 * and pass it to a function that can alter the size globally.
 */
const ResizeHandle = styled.div`
  position: absolute;
  width: 16px;
  top: 0;
  left: 0;
  height: ${componentSize.large};
  cursor: ew-resize;
  pointer-events: all;
`

/**
 * ResizeMarker
 *
 * A vertical line marking the edge of the new column.
 */
const ResizeMarker = styled.div<{
  readonly dragging: boolean
}>`
  display: ${({ dragging }) => (dragging ? 'unset' : 'none')};
  position: absolute;
  width: 1px;
  top: 0;
  bottom: 0;
  left: 8px;
  background-color: ${({ theme }) => theme.color.background01()};

  ${/* sc-selector */ ResizeHandle}:hover + & {
    display: unset;
  }
`

/**
 * ColumnResizer
 *
 * A draggable resize handle that will dispatch a new
 * column width when dragging ends. During dragging,
 * a resize marker is shown to follow the change in width.
 */

interface IColumnResizerProps {
  readonly divider: IColumnDivider
  readonly setDragging: (dragging: boolean) => void
  readonly onDragEnd: (t: readonly [number, number]) => void
}

const ColumnResizer: React.FunctionComponent<IColumnResizerProps> = ({
  divider,
  setDragging,
  onDragEnd,
}) => {
  const { minColumnWidth } = useContext(TableContext)

  const [[tx], onDragStart, dragging] = useDraggable(onDragEnd)
  const txClipped = clipTranslation(tx, divider, minColumnWidth)

  useEffect(() => {
    setDragging(dragging)
    if (dragging) {
      document.body.style.cursor = 'ew-resize'
      return () => {
        document.body.style.cursor = ''
      }
    }
  }, [dragging, setDragging])

  return (
    <ResizeContainer left={divider.offset + txClipped}>
      <ResizeHandle onPointerDown={onDragStart} />
      <ResizeMarker dragging={dragging} />
    </ResizeContainer>
  )
}

/**
 * ColumnResizerRow
 *
 * A collection of resize handlers.
 */

interface IColumnResizerRowProps {
  /**
   * Callback signaling start of a drag.
   */
  readonly setDragging: (dragging: boolean) => void
}

export const ColumnResizerRow: React.FunctionComponent<IColumnResizerRowProps> = ({
  setDragging,
}) => {
  const {
    minColumnWidth,
    columnWidths,
    dispatchWidthsAction,
    onSelect,
    onWidthsChange,
  } = useContext(TableContext)

  /**
   * The global offset of all resize handles.
   * This is used e.g. when there is a column
   * of checkboxes that needs to be taken into account.
   */
  const globalOffset =
    TABLE_DIMENSIONS.PADDING_LEFT +
    (onSelect !== undefined ? TABLE_DIMENSIONS.SELECT_WIDTH : 0)

  const dividers = useMemo(() => {
    const result = []
    let offset = globalOffset
    for (let i = 0; i < columnWidths.length - 1; i += 1) {
      offset = offset + columnWidths[i]
      result.push({
        offset,
        before: columnWidths[i],
        after: columnWidths[i + 1],
      })
    }
    return result
  }, [columnWidths, globalOffset])

  const moveDivider = useCallback(
    (x: number, dividerIndex: number) => {
      const divider = dividers[dividerIndex]
      const xClipped = clipTranslation(x, divider, minColumnWidth)
      dispatchWidthsAction({
        type: WidthActionType.UPDATE_WIDTHS,
        widths: {
          [dividerIndex]: divider.before + xClipped,
          [dividerIndex + 1]: divider.after - xClipped,
        },
        onWidthsChange,
      })
    },
    [dividers, dispatchWidthsAction, minColumnWidth, onWidthsChange]
  )

  const dragEndHandlers = useMemo(() => {
    return [
      ...Array(dividers.length).keys(),
    ].map(i => ([tx]: readonly [number, number]) => moveDivider(tx, i))
  }, [dividers.length, moveDivider])

  return (
    <>
      {dividers.map((divider, i) => {
        return (
          <ColumnResizer
            setDragging={setDragging}
            key={`${i}:${divider.offset}`}
            divider={divider}
            onDragEnd={dragEndHandlers[i]}
          />
        )
      })}
    </>
  )
}
