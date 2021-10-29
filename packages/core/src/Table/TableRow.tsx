import React, { useContext, useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { componentSize, opacity } from '../designparams'
import { CheckboxChangeHandler, Checkbox } from '../Checkbox'

import { useGridTemplateColumns } from './Table'
import { TableContext } from './context'

import {
  TableCellMenu,
  TableCellContent,
  TableCellCheckbox,
} from './TableCells'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * TableRow
 *
 * A single row in the table used to group cells.
 * Note that there is no div associated with this,
 * it is just a convenience component to pass proper
 * keys to the grid cells.
 */

const TableRowGrid = styled.div<{
  readonly disabled: boolean
  readonly clickable: boolean
}>`
  z-index: 0;
  display: grid;
  position: relative;
  grid-template-rows: ${componentSize.extraLarge};

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.background03()};
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.background00()};
  }

  outline: none;

  ${TableCellMenu} {
    display: none;

    &:focus-within {
      display: flex;
    }
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.tableRow};
    z-index: 1;

    ${/**sc-selector*/ TableCellMenu} {
      display: flex;
    }
  }

  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadow.tableRow};
    z-index: 1;
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.backgroundPrimary()};
  }

  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  & ${TableCellContent} {
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: ${opacity[48]}; /* TODO: to be decided */
            pointer-events: none;
          `
        : undefined};
  }

  cursor: ${({ clickable, disabled }) =>
    clickable && !disabled ? 'pointer' : 'unset'};
`

export interface TableRowProps extends BaseProps {
  readonly children: React.ReactNodeArray
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * ID for the row, used in the onSelect handler
   */
  readonly id: string
  /**
   * Indicates if the row is selected or not.
   */
  readonly selected?: boolean
  /**
   * Optional menu content to put on the right.
   * It will be aligned to the right and overflow onto the row.
   */
  readonly menu?: React.ReactNode
  /**
   * Optional flag to disable entire row.
   */
  readonly disabled?: boolean
  /**
   * If the row is clickable.
   * Note: If row is clickable, row can not be selectable.
   */
  readonly clickable?: boolean
  /**
   * Function callback on row clicked
   */
  readonly onClicked?: React.MouseEventHandler<HTMLDivElement>
}

export const TableRow: React.FC<TableRowProps> = React.memo(
  ({
    className,
    id,
    children,
    selected = false,
    disabled = false,
    clickable = false,
    onClicked,
    menu,
    ...props
  }) => {
    const { onSelect, hasMenu } = useContext(TableContext)
    const onChange = useCallback<CheckboxChangeHandler>(
      e => {
        if (onSelect !== undefined) {
          onSelect(e.target.checked, id)
        }
      },
      [id, onSelect]
    )

    const onRowClicked = useCallback<React.MouseEventHandler<HTMLDivElement>>(
      e => {
        e.stopPropagation()
        if (onClicked !== undefined && clickable && !disabled) {
          onClicked(e)
        }
      },
      [disabled, clickable, onClicked]
    )

    const gridTemplateColumnsStyle = useGridTemplateColumns()

    const tableCheckboxContent = useMemo(() => {
      return onSelect !== undefined && !clickable ? (
        <TableCellCheckbox>
          <Checkbox
            checked={selected}
            onChange={onChange}
            disabled={disabled}
          />
        </TableCellCheckbox>
      ) : null
    }, [onSelect, clickable, selected, onChange, disabled])

    const tableCellContent = useMemo(() => {
      return React.Children.map(children, (cell, cellId) => {
        return (
          <TableCellContent data-col={cellId} key={cellId}>
            {cell}
          </TableCellContent>
        )
      })
    }, [children])

    const tableMenuContent = useMemo(() => {
      return hasMenu ? (
        <TableCellMenu>{menu !== undefined ? menu : null}</TableCellMenu>
      ) : null
    }, [hasMenu, menu])
    const tableRowClassName = useMemo(
      () =>
        [selected ? 'selected' : undefined, className]
          .filter(Boolean)
          .join(' '),
      [className, selected]
    )

    return (
      <TableRowGrid
        style={gridTemplateColumnsStyle}
        disabled={disabled}
        className={tableRowClassName}
        clickable={clickable}
        onClick={clickable ? onRowClicked : undefined}
        {...props}
      >
        {tableCheckboxContent}
        {tableCellContent}
        {tableMenuContent}
      </TableRowGrid>
    )
  }
)
TableRow.displayName = 'TableRowComponent'
