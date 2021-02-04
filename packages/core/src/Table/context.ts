import { createContext } from 'react'

export enum WidthActionType {
  SET_WIDTHS,
  UPDATE_WIDTHS,
  RESET_WIDTHS,
  SET_TOTAL_WIDTH,
}

interface SetWidthsAction {
  readonly type: WidthActionType.SET_WIDTHS
  readonly widths: ReadonlyArray<number>
}

interface UpdateWidthsAction {
  readonly type: WidthActionType.UPDATE_WIDTHS
  readonly widths: { readonly [id: number]: number | undefined }
  readonly onWidthsChange?: (widths: ReadonlyArray<number>) => void
}

interface ResetWidthsAction {
  readonly type: WidthActionType.RESET_WIDTHS
  readonly numberOfColumns: number
}

interface SetTotalWidthAction {
  readonly type: WidthActionType.SET_TOTAL_WIDTH
  readonly value: number
}

export type WidthAction =
  | SetWidthsAction
  | UpdateWidthsAction
  | ResetWidthsAction
  | SetTotalWidthAction

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
