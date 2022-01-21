import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useRef,
  createContext,
  useContext,
} from 'react'
import styled, { css, useTheme } from 'styled-components'

import { componentSize, spacing, opacity } from '../designparams'
import { SCROLLBAR_DIMENSION } from '../Global/GlobalScrollbarStyle'

type BaseElement = HTMLTableElement
type BaseProps = React.TableHTMLAttributes<BaseElement>
type BaseRowElement = HTMLTableRowElement
type BaseRowProps = React.TableHTMLAttributes<BaseRowElement>

// TODO: this is componentSize, but that one is a string and contains 'px'
const ROW_HEIGHT = 56
const SIMPLE_ROW_HEIGHT = 32

/*******************************************************************************
 *
 * SimpleTableContext
 *
 ******************************************************************************/

const SimpleTableContext = createContext<{
  readonly compact: boolean
  readonly columnWidths: ReadonlyArray<number>
}>({
  compact: false,
  columnWidths: [],
})

/*******************************************************************************
 *
 * Exported SimpleTable building blocks:
 *  - SimpleTableRow
 *  - SimpleTable
 *
 ******************************************************************************/

/**
 * SimpleTableHeader
 */

const TableHeader = styled.tr<{
  readonly compact: boolean
}>`
  height: ${({ compact }) =>
    compact ? componentSize.small : componentSize.large};
  text-align: left;
  display: table;
  table-layout: fixed;
  width: 100%;
`

const TableHeaderCellContent = styled.th<{
  readonly columWidthPercentage?: number
}>`
  color: ${({ theme }) => theme.color.text02()};
  background: ${({ theme }) => theme.color.background00()};
  &:first-child {
    padding-left: ${spacing.extraLarge};
  }
  padding-right: ${spacing.large};

  text-align: left;
  font-weight: ${({ theme }) => theme.font.fontWeight.normal};

  user-select: none;

  ${({ columWidthPercentage }) =>
    columWidthPercentage !== undefined
      ? css`
          width: ${columWidthPercentage}%;
        `
      : undefined}
`

const SimpleTableHeader: React.FC = ({ children }) => {
  const { compact, columnWidths } = useContext(SimpleTableContext)

  return (
    <TableHeader compact={compact}>
      {React.Children.map(children, (cell, i) => {
        return (
          <TableHeaderCellContent
            key={i}
            columWidthPercentage={columnWidths[i]}
          >
            {cell}
          </TableHeaderCellContent>
        )
      })}
    </TableHeader>
  )
}

/**
 * SimpleTableRow
 *
 * A single row in the table used to group cells.
 */

const TableRow = styled.tr<{
  readonly compact: boolean
  readonly disabled: boolean
  readonly clickable: boolean
}>`
  display: table;
  table-layout: fixed;

  width: 100%;
  height: ${({ compact }) =>
    compact ? componentSize.small : componentSize.extraLarge};

  text-align: left;

  transition: box-shadow 200ms;

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.background03()};
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.background00()};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.tableRow};
    transform: scale(1);
    z-index: 1;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined};

  cursor: ${({ clickable, disabled }) =>
    clickable && !disabled ? 'pointer' : 'unset'};
`

const TableCellContent = styled.td<{ readonly columWidthPercentage?: number }>`
  &:first-child {
    padding-left: ${spacing.extraLarge};
  }
  padding-right: ${spacing.large};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ columWidthPercentage }) =>
    columWidthPercentage !== undefined
      ? css`
          width: ${columWidthPercentage}%;
        `
      : undefined}
`

export interface SimpleTableRowProps extends BaseRowProps {
  readonly children: React.ReactNodeArray
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Optional flag to disable entire row.
   */
  readonly disabled?: boolean
  /**
   * Function callback on row clicked
   */
  readonly onClick?: BaseRowProps['onClick']
}

export const SimpleTableRow: React.FC<SimpleTableRowProps> = ({
  children,
  disabled = false,
  onClick,
  ...props
}) => {
  const { compact, columnWidths } = useContext(SimpleTableContext)
  const clickable = onClick !== undefined

  const handleClick = useCallback<React.MouseEventHandler<BaseRowElement>>(
    e => {
      if (clickable) {
        e.stopPropagation()
      }

      onClick?.(e)
    },
    [onClick, clickable]
  )

  return (
    <TableRow
      compact={compact}
      disabled={disabled}
      clickable={clickable}
      onClick={handleClick}
      {...props}
    >
      {React.Children.map(children, (cell, i) => {
        return (
          <TableCellContent key={i} columWidthPercentage={columnWidths[i]}>
            {cell}
          </TableCellContent>
        )
      })}
    </TableRow>
  )
}

/**
 * Table
 *
 * Defined by the number of columns.
 */
const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`

const TableHeaderContainer = styled.thead<{ readonly hasMargin: boolean }>`
  display: table;

  ${({ hasMargin }) =>
    hasMargin
      ? css`
          margin-right: ${SCROLLBAR_DIMENSION}px;
        `
      : css`
          width: 100%;
        `}
`

const TableContentContainer = styled.tbody<{
  readonly maxHeight?: number
}>`
  display: block;
  width: 100%;
  max-height: ${({ maxHeight }) =>
    maxHeight === undefined ? 'initial' : `${maxHeight}px`};
  overflow: auto;
  padding-bottom: ${spacing.medium};
  border-top: 1px solid ${({ theme }) => theme.color.element12()};
`

export interface SimpleTableProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The maximum height of the table in number of rows,
   * more rows will cause a scrollbar to appear.
   */
  readonly maxHeight: number
  /**
   * Override theme's default setting for `compact` if set.
   */
  readonly compact?: boolean
  /**
   * React element that will go into the top of the table.
   */
  readonly header: React.ReactNode
  /**
   * Override default column width by specified width (%) if set.
   */
  readonly widths?: ReadonlyArray<number>
}

export const SimpleTable: React.FC<SimpleTableProps> = ({
  maxHeight,
  compact: compactFromProps,
  header,
  widths = [],
  children,
  ...props
}) => {
  const { compact: compactFromTheme } = useTheme()
  const compact = compactFromProps ?? compactFromTheme

  const [hasOverflow, setHasOverflow] = useState(false)
  const tableRef = useRef<HTMLTableSectionElement>(null)

  const columnWidths = widths

  useLayoutEffect(() => {
    if (tableRef.current === null) {
      return
    }

    setHasOverflow(
      tableRef.current.offsetHeight < tableRef.current.scrollHeight ||
        tableRef.current.offsetWidth < tableRef.current.scrollWidth
    )
  }, [tableRef])

  const [...rows] = React.Children.toArray(children)

  const contentHeight =
    maxHeight !== undefined
      ? maxHeight * (compact ? SIMPLE_ROW_HEIGHT : ROW_HEIGHT)
      : undefined

  return (
    <TableContainer {...props}>
      <SimpleTableContext.Provider
        value={{
          compact,
          columnWidths,
        }}
      >
        <TableHeaderContainer hasMargin={hasOverflow}>
          <SimpleTableHeader>{header}</SimpleTableHeader>
        </TableHeaderContainer>
        <TableContentContainer ref={tableRef} maxHeight={contentHeight}>
          {rows}
        </TableContentContainer>
      </SimpleTableContext.Provider>
    </TableContainer>
  )
}
