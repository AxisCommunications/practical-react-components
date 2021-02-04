import React, { useContext, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { componentSize } from '../designparams'
import { CheckboxChangeHandler, Checkbox } from '../Checkbox'

import { useGridTemplateColumns } from './Table'
import { TableContext, WidthActionType } from './context'

import {
  TableHeaderCellCheckbox,
  OverlayContainer,
  TableHeaderCellContent,
  TableHeaderCellMenu,
} from './TableCells'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/*
 * TableHeader
 *
 * Defines the group of special cells that make up the header
 * of the table. They allow to resize the columns.
 * You should use this to wrap the elements you pass to the
 * header property of the Table component.
 */

const TableHeaderGrid = styled.div`
  display: grid;
  grid-template-rows: ${componentSize.large};
`
interface TableHeaderProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Indicates if the all rows are selected.
   */
  readonly selected?: boolean
  /**
   * Indicates if only a part of all rows are selected.
   */
  readonly partial?: boolean
  /**
   * Optional overlay element to cover the column headers.
   */
  readonly overlay?: React.ReactNode
  /**
   * Optional menu content to put on the right.
   * It will be aligned to the right and overflow onto the row.
   */
  readonly menu?: React.ReactNode
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  selected = false,
  partial = false,
  overlay,
  menu,
  ...props
}) => {
  const { onSelect, hasMenu, columnWidths, dispatchWidthsAction } = useContext(
    TableContext
  )
  const onChange = useCallback<CheckboxChangeHandler>(
    e => {
      if (onSelect !== undefined) {
        onSelect(e.target.checked)
      }
    },
    [onSelect]
  )
  const numberOfColumns = React.Children.count(children)
  // Set the column widths.
  // This will happen on first render (number of columns changes from 0).
  useEffect(() => {
    if (columnWidths.length === 0) {
      dispatchWidthsAction({
        type: WidthActionType.RESET_WIDTHS,
        numberOfColumns,
      })
    }
  }, [dispatchWidthsAction, columnWidths.length, numberOfColumns])
  const gridTemplateColumnsStyle = useGridTemplateColumns()
  return (
    <TableHeaderGrid style={gridTemplateColumnsStyle} {...props}>
      {onSelect !== undefined ? (
        <TableHeaderCellCheckbox>
          <Checkbox checked={selected} partial={partial} onChange={onChange} />
        </TableHeaderCellCheckbox>
      ) : null}
      {overlay !== undefined ? (
        <OverlayContainer>{overlay}</OverlayContainer>
      ) : (
        React.Children.map(children, (cell, i) => {
          return <TableHeaderCellContent key={i}>{cell}</TableHeaderCellContent>
        })
      )}
      {overlay === undefined && hasMenu ? (
        <TableHeaderCellMenu>
          {menu !== undefined ? menu : null}
        </TableHeaderCellMenu>
      ) : null}
    </TableHeaderGrid>
  )
}
