import { createContext, Dispatch, RefObject } from 'react'

export enum WidthActionType {
	SET_WIDTHS = 0,
	UPDATE_WIDTHS = 1,
	RESET_WIDTHS = 2,
	SET_TOTAL_WIDTH = 3,
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
	readonly dispatchWidthsAction: Dispatch<WidthAction>
	readonly selectWidth: number
	readonly menuWidth: number
	readonly onSelect?: (selected: boolean, id?: string) => void
	readonly hasMenu: boolean
	readonly onWidthsChange?: (widths: ReadonlyArray<number>) => void
	readonly tableRef?: RefObject<HTMLDivElement>
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
