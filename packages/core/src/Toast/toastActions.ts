import { IBaseToast } from './Toast'

let toastCounter = 0

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

export const createToast = (
  toast: IBaseToast,
  id: ToastId = `practical-${++toastCounter}`
): IToastCreateAction => ({
  id,
  type: IToastActionType.TOAST_CREATE,
  data: toast,
})

export const removeToast = (id: ToastId): IToastRemoveAction => ({
  id,
  type: IToastActionType.TOAST_REMOVE,
})

export const removeAllToasts: IToastRemoveAllAction = {
  type: IToastActionType.TOAST_REMOVE_ALL,
}
