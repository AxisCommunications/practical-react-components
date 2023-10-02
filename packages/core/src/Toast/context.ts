import { createContext, ReactNode, Dispatch } from 'react'
import { IconType } from '../Icon'
import { ALinkProps, ButtonLinkProps } from '../Link'

export interface SimpleToast {
	readonly label: string
	readonly message?: string
	readonly onClose?: (id: ToastId) => void
	readonly duration?: number
	readonly hasCloseButton?: boolean
}

export interface ActionToast extends SimpleToast {
	readonly action: {
		readonly icon: IconType
		readonly text: string
		readonly link: ButtonLinkProps | ALinkProps
	}
}

export interface ProgressToast extends SimpleToast {
	readonly progress: {
		readonly value: number
		readonly label: string
	}
}

export type ToastsMap = ReadonlyMap<ToastId, BaseToastValue>

export type ShowToastHandler = (toast: BaseToastValue, id?: ToastId) => ToastId
export type HideToastHandler = (id: ToastId) => void
export type SimpleToastCreator = (toast: SimpleToast, id?: ToastId) => ToastId
export type ActionToastCreator = (toast: ActionToast, id?: ToastId) => ToastId
export type ProgressToastCreator = (
	toast: ProgressToast,
	id?: ToastId
) => ToastId

export interface ToastCallbacks {
	readonly showToast: ShowToastHandler
	readonly hideToast: HideToastHandler
	readonly clearToasts: () => void
	readonly showSuccessToast: SimpleToastCreator
	readonly showErrorToast: SimpleToastCreator
	readonly showWarningToast: SimpleToastCreator
	readonly showInfoToast: SimpleToastCreator
	readonly showLoadingToast: SimpleToastCreator
	readonly showProgressToast: ProgressToastCreator
	readonly showActionToast: ActionToastCreator
}

export interface BaseToastValue {
	readonly icon: ReactNode
	readonly label: ReactNode
	readonly message?: ReactNode
	readonly duration?: number
	readonly hasCloseButton?: boolean
	readonly onClose?: (id: ToastId) => void
}

export enum ToastActionType {
	'TOAST_CREATE',
	'TOAST_REMOVE',
	'TOAST_REMOVE_ALL',
}

export type ToastId = string

export interface ToastCreateAction {
	readonly id: ToastId
	readonly type: ToastActionType.TOAST_CREATE
	readonly data: BaseToastValue
}

export interface ToastRemoveAction {
	readonly id: ToastId
	readonly type: ToastActionType.TOAST_REMOVE
}

export interface ToastRemoveAllAction {
	readonly type: ToastActionType.TOAST_REMOVE_ALL
}

export type ToastAction =
	| ToastCreateAction
	| ToastRemoveAction
	| ToastRemoveAllAction

export const NI = () => {
	throw new Error(`Not implemented: no ToastContext set`)
}
export interface ToastContextType extends ToastCallbacks {
	readonly dispatch: Dispatch<ToastAction>
	readonly toasts: ToastsMap
}

export const ToastsContext = createContext<ToastContextType>({
	showToast: NI,
	hideToast: NI,
	clearToasts: NI,
	showSuccessToast: NI,
	showErrorToast: NI,
	showWarningToast: NI,
	showInfoToast: NI,
	showLoadingToast: NI,
	showProgressToast: NI,
	showActionToast: NI,
	dispatch: NI,
	toasts: new Map(),
})
