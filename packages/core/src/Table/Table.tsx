import React, {
  useRef,
  createContext,
  useContext,
  useMemo,
  useReducer,
  Reducer,
  useLayoutEffect,
  useState,
} from 'react'
import styled from 'styled-components'

import { spacing } from '../designparams'

import { ColumnResizerRow } from './ColumnResizerRow'
import { useResetScroll } from 'react-hooks-shareable'
import { SCROLLBAR_DIMENSION } from '../Global/GlobalScrollbarStyle'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const PADDING_LEFT = 24

export const TABLE_DIMENSIONS = {
  DEFAULT_MIN_COLUMN_WIDTH: 64,
  PADDING_LEFT,
  PADDING: PADDING_LEFT + SCROLLBAR_DIMENSION, // total padding (sum of left and right(scrollbar))
  SELECT_WIDTH: 48, // holds the checkbox
  MENU_WIDTH: 32 + (20 - SCROLLBAR_DIMENSION), // holds the menu (24px box that holds menu button icon should have 24px space between itself and Table edge)
  // TODO: this is componentSize, but that one is a string and contains 'px'
  ROW_HEIGHT: 56,
}

/*******************************************************************************
 *
 * Column width control.
 *
 * The columns of a table always have a fixed width,
 * which is set initially either by the user or by
 * detecting the rendered size of the table, and dividing
 * it by the available columns. When you specify your
 * own initial widths, they will be scaled to the table
 * size automatically (and when resizing).
 *
 * The array of widths is updated using a reducer.
 *
 ******************************************************************************/

export enum WidthActionType {
  SET_WIDTHS,
  UPDATE_WIDTHS,
  RESET_WIDTHS,
  SET_TOTAL_WIDTH,
}

interface ISetWidthsAction {
  readonly type: WidthActionType.SET_WIDTHS
  readonly widths: ReadonlyArray<number>
}

interface IUpdateWidthsAction {
  readonly type: WidthActionType.UPDATE_WIDTHS
  readonly widths: { readonly [id: number]: number | undefined }
  readonly onWidthsChange?: (widths: ReadonlyArray<number>) => void
}

interface IResetWidthsAction {
  readonly type: WidthActionType.RESET_WIDTHS
  readonly numberOfColumns: number
}

interface ISetTotalWidthAction {
  readonly type: WidthActionType.SET_TOTAL_WIDTH
  readonly value: number
}

type WidthAction =
  | ISetWidthsAction
  | IUpdateWidthsAction
  | IResetWidthsAction
  | ISetTotalWidthAction

interface IWidthsState {
  readonly totalWidth: number
  readonly columnWidths: ReadonlyArray<number>
  readonly initialWidths: ReadonlyArray<number>
  readonly minColumnWidth: number
}

const reduceWidths = (
  state: IWidthsState,
  action: WidthAction
): IWidthsState => {
  switch (action.type) {
    case WidthActionType.SET_WIDTHS: {
      // Sanitize columns to the minimum width
      const sanitizedWidths = action.widths.map(width =>
        Math.max(state.minColumnWidth, width)
      )
      const totalColumnWidths = sanitizedWidths.reduce(
        (acc, cur) => acc + cur,
        0
      )
      const normalizedWidths = sanitizedWidths.map(
        width => width / totalColumnWidths
      )
      // Scale all columns to fill the total width.
      return {
        ...state,
        columnWidths: normalizedWidths.map(normalizedWidth =>
          Math.max(state.minColumnWidth, normalizedWidth * state.totalWidth)
        ),
      }
    }
    case WidthActionType.UPDATE_WIDTHS: {
      const columnWidths = state.columnWidths.map((value, id) => {
        const width = action.widths[id]
        return width !== undefined
          ? Math.max(state.minColumnWidth, width)
          : value
      })
      if (action.onWidthsChange !== undefined) {
        action.onWidthsChange(columnWidths)
      }
      return {
        ...state,
        columnWidths,
      }
    }
    case WidthActionType.RESET_WIDTHS: {
      const columnWidth =
        action.numberOfColumns !== 0
          ? state.totalWidth / action.numberOfColumns
          : 0
      return {
        ...state,
        columnWidths: new Array(action.numberOfColumns).fill(
          Math.max(state.minColumnWidth, columnWidth)
        ),
      }
    }
    case WidthActionType.SET_TOTAL_WIDTH: {
      const totalWidth = action.value

      // We always base the calculation on the initial widths if possible,
      // in order to keep the widths stable upon resize.
      const columnWidths =
        state.initialWidths.length !== 0
          ? state.initialWidths
          : state.columnWidths

      const totalColumnWidths = columnWidths.reduce((acc, cur) => acc + cur, 0)
      const nColumns = columnWidths.length

      if (totalWidth === totalColumnWidths || nColumns === 0) {
        return {
          ...state,
          totalWidth,
        }
      }

      const minWidth = nColumns * state.minColumnWidth

      const availableWidth = totalWidth - minWidth
      if (availableWidth <= 0) {
        // There is no available width, all columns get the minimum width
        return {
          ...state,
          totalWidth,
          columnWidths: columnWidths.map(() => state.minColumnWidth),
        }
      }

      // Distribute available width to all columns
      const sanitizedWidths = columnWidths.map(width =>
        Math.max(state.minColumnWidth, width)
      )
      const sanitizedTotalWidth = sanitizedWidths.reduce(
        (acc, cur) => acc + cur,
        0
      )
      const extraColumnWidth = sanitizedTotalWidth - minWidth

      if (extraColumnWidth <= 0) {
        // There is no extra width, all columns get the same new width
        return {
          ...state,
          totalWidth,
          columnWidths: columnWidths.map(() => totalWidth / nColumns),
        }
      }

      const normalizedWidths = sanitizedWidths.map(
        width => Math.max(width - state.minColumnWidth) / extraColumnWidth
      )

      return {
        ...state,
        totalWidth,
        columnWidths: normalizedWidths.map(
          normalizedWidth =>
            state.minColumnWidth + normalizedWidth * availableWidth
        ),
      }
    }
    default: {
      return state
    }
  }
}

/*******************************************************************************
 *
 * TableContext
 *
 * Keeps track of table-wide properties which need to
 * be accessible from within each of the subcomponents.
 *
 ******************************************************************************/

export const TableContext = createContext<{
  readonly minColumnWidth: number
  readonly columnWidths: ReadonlyArray<number>
  readonly dispatchWidthsAction: React.Dispatch<WidthAction>
  readonly selectWidth: number
  readonly menuWidth: number
  readonly onSelect?: (selected: boolean, id?: string) => void
  readonly hasMenu: boolean
  readonly onWidthsChange?: (widths: ReadonlyArray<number>) => void
}>({
  minColumnWidth: 0,
  columnWidths: [],
  dispatchWidthsAction: () => {
    /** */
  },
  selectWidth: 0,
  menuWidth: 0,
  hasMenu: false,
  onWidthsChange: () => {
    /** */
  },
})

/**
 * Transform the array of widths to an appropriate grid-template-columns
 * string, taking into account select/menu columns.
 *
 * Example:
 *  [34, 78]
 */
export const useGridTemplateColumns = () => {
  const { columnWidths, selectWidth, menuWidth } = useContext(TableContext)

  // Set up grid template columns from widths
  const gridTemplateColumnsStyle = useMemo(() => {
    return {
      gridTemplateColumns: [
        `${TABLE_DIMENSIONS.PADDING_LEFT}px`,
        '[start]',
        `${selectWidth}px`,
        '[content-start]',
        ...columnWidths.map(columnWidth => `${columnWidth}px`),
        '[content-end]',
        `${menuWidth}px`,
        '[scroll]',
        `${SCROLLBAR_DIMENSION}px`,
        '[end]',
      ].join(' '),
    }
  }, [columnWidths, menuWidth, selectWidth])

  return gridTemplateColumnsStyle
}

/*******************************************************************************
 *
 * Internal Table building blocks.
 *
 ******************************************************************************/

/**
 * The basic components of our grid.
 *
 * Note: grid-template-columns is set using a style attribute
 * to allow for dynamic change (without affecting the class name)
 */

const TableContainer = styled.div<{
  readonly dragging: boolean
}>`
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  pointer-events: ${({ dragging }) => (dragging ? 'none' : undefined)};
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.background00()};
`

/**
 * TableHeaderGrid
 *
 * A grid containing the header cells.
 */
const TableHeaderContainer = styled.div`
  display: grid;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.element12()};
`

/**
 * TableContentGrid
 *
 * A grid containing the content cells.
 */
const TableContentContainer = styled.div.attrs<{
  readonly width: number
  readonly maxHeight: number
}>(({ width, maxHeight }) => {
  return {
    style: { width: `${width}px`, maxHeight: `${maxHeight}px` },
  }
})<{
  readonly maxHeight?: number
  readonly width: number
}>`
  display: grid;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: ${spacing.medium};
  position: relative;
  z-index: 0;
`

/**
 * Table
 *
 * Defined by the number of columns.
 */

interface ITableProps extends Omit<BaseProps, 'onSelect'> {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The initial widths for the columns of the Table.
   * The width will be automatically adjusted to fit the
   * table, so use 0 if not known, e.g. new Array(#columns).fill(0)
   * would be a valid starting point.
   */
  readonly initialWidths?: ReadonlyArray<number>
  /**
   * Control if columns should be resizeable or not. If true, resize
   * handles will be available to change column width.
   *
   * @default false
   */
  readonly resizableColumns?: boolean
  /**
   * Minimum column width.
   *
   * @default DEFAULT_MIN_COLUMN_WIDTH
   */
  readonly minColumnWidth?: number
  /**
   * Callback which will get the (new) array of column widths
   * every time any width is changed.
   */
  readonly onWidthsChange?: (widths: ReadonlyArray<number>) => void
  /**
   * The maximum height of the table in number of rows,
   * more rows will cause a scrollbar to appear.
   */
  readonly maxHeight?: number
  /**
   * Callback which will get checked status and row ID on selection.
   * The ID is undefined if the main checkbox is selected ("select all").
   */
  readonly onSelect?: (selected: boolean, id?: string) => void
  /**
   * Allow for optional right-side menu content for each row.
   */
  readonly hasMenu?: boolean
  /**
   * Key to control scrollbar in Table.
   * If key changes, scrollbar will scroll to top.
   */
  readonly scrollKey?: string
}

const EMPTY_ARRAY: ReadonlyArray<number> = []

export const Table: React.FunctionComponent<ITableProps> = React.memo(
  ({
    initialWidths = EMPTY_ARRAY,
    resizableColumns = false,
    minColumnWidth = TABLE_DIMENSIONS.DEFAULT_MIN_COLUMN_WIDTH,
    onWidthsChange,
    maxHeight,
    onSelect,
    hasMenu = false,
    scrollKey,
    children,
    ...props
  }) => {
    // Table width/height, including column widths
    const [{ columnWidths }, dispatchWidthsAction] = useReducer<
      Reducer<IWidthsState, WidthAction>
    >(reduceWidths, {
      totalWidth: initialWidths.reduce((sum, width) => sum + width, 0),
      columnWidths: initialWidths,
      initialWidths,
      minColumnWidth,
    })
    const [tableHeight, setTableHeight] = useState<number>()

    // Keep track of additional columns for select/menu.
    const selectWidth = useMemo(
      () => (onSelect !== undefined ? TABLE_DIMENSIONS.SELECT_WIDTH : 0),
      [onSelect]
    )
    const menuWidth = useMemo(
      () => (hasMenu ? TABLE_DIMENSIONS.MENU_WIDTH : 0),
      [hasMenu]
    )

    // Set up total width control
    const tableRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      const tableEl = tableRef.current
      if (tableEl !== null) {
        const updateTableDimensions = () => {
          const { width, height } = tableEl.getBoundingClientRect()
          dispatchWidthsAction({
            type: WidthActionType.SET_TOTAL_WIDTH,
            value: width - selectWidth - menuWidth - TABLE_DIMENSIONS.PADDING,
          })
          setTableHeight(height)
        }
        updateTableDimensions()

        const observer = new window.ResizeObserver(updateTableDimensions)
        observer.observe(tableEl)

        return () => observer.disconnect()
      }
    }, [columnWidths.length, selectWidth, menuWidth, setTableHeight])

    const [dragging, setDragging] = useState(false)

    /**
     * The content's width and (maximum) height.
     */
    const contentWidth = useMemo(() => {
      return (
        columnWidths.reduce((total, width) => total + width, 0) +
        selectWidth +
        menuWidth +
        TABLE_DIMENSIONS.PADDING
      )
    }, [columnWidths, selectWidth, menuWidth])
    const contentHeight =
      maxHeight !== undefined
        ? maxHeight * TABLE_DIMENSIONS.ROW_HEIGHT
        : tableHeight !== undefined
        ? tableHeight - TABLE_DIMENSIONS.ROW_HEIGHT
        : undefined

    const { header, rows } = useMemo(() => {
      const [headerEl, ...rowsEl] = React.Children.toArray(children)
      return { header: headerEl, rows: rowsEl }
    }, [children])

    const tableContentRef = useRef<HTMLDivElement>(null)
    // Scroll to top when scrollKey changes
    useResetScroll(tableContentRef, scrollKey)

    return (
      <TableContainer ref={tableRef} dragging={dragging} {...props}>
        <TableContext.Provider
          value={{
            minColumnWidth,
            columnWidths,
            dispatchWidthsAction,
            selectWidth,
            menuWidth,
            onSelect,
            hasMenu,
            onWidthsChange,
          }}
        >
          <TableHeaderContainer>{header}</TableHeaderContainer>
          <TableContentContainer
            maxHeight={contentHeight}
            width={contentWidth}
            ref={tableContentRef}
          >
            {tableHeight !== undefined ? rows : undefined}
          </TableContentContainer>
          {resizableColumns ? (
            <ColumnResizerRow setDragging={setDragging} />
          ) : null}
        </TableContext.Provider>
      </TableContainer>
    )
  }
)
