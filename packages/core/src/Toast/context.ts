import { createContext, ReactNode } from 'react'
import { IconType } from '../Icon'
import { IALinkProps, IButtonLinkProps } from '../Link'

export interface ISimpleToast {
  readonly label: string
  readonly message?: string
  readonly onClose?: (id: ToastId) => void
  readonly duration?: number
}

export interface IActionToast extends ISimpleToast {
  readonly action: {
    readonly icon: IconType
    readonly text: string
    readonly link: IButtonLinkProps | IALinkProps
  }
}

export interface IProgressToast extends ISimpleToast {
  readonly progress: {
    readonly value: number
    readonly label: string
  }
}

export type ShowToastHandler = (toast: IBaseToast, id?: ToastId) => ToastId
export type HideToastHandler = (id: ToastId) => void
export type SimpleToastCreator = (toast: ISimpleToast, id?: ToastId) => ToastId
export type ActionToastCreator = (toast: IActionToast, id?: ToastId) => ToastId
export type ProgressToastCreator = (
  toast: IProgressToast,
  id?: ToastId
) => ToastId

export interface IToastCallbacks {
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

export interface IBaseToast {
  readonly icon: ReactNode
  readonly label: ReactNode
  readonly message?: ReactNode
  readonly duration?: number
  readonly hasCloseButton?: boolean
  readonly onClose?: (id: ToastId) => void
}

export enum IToastActionType {
  'TOAST_CREATE',
  'TOAST_REMOVE',
  'TOAST_REMOVE_ALL',
}

export type ToastId = string

export interface IToastCreateAction {
  readonly id: ToastId
  readonly type: IToastActionType.TOAST_CREATE
  readonly data: IBaseToast
}

export interface IToastRemoveAction {
  readonly id: ToastId
  readonly type: IToastActionType.TOAST_REMOVE
}

export interface IToastRemoveAllAction {
  readonly type: IToastActionType.TOAST_REMOVE_ALL
}

export type IToastAction =
  | IToastCreateAction
  | IToastRemoveAction
  | IToastRemoveAllAction

export const NI = () => {
  throw new Error(`Not implemented: no ToastContext set`)
}
interface IToastContext extends IToastCallbacks {
  readonly __dispatchRef: React.MutableRefObject<React.Dispatch<IToastAction>>
}

export const ToastsContext = createContext<IToastContext>({
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
  __dispatchRef: { current: NI },
})
