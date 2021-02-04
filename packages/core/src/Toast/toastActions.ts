import {
  IBaseToast,
  ToastId,
  IToastCreateAction,
  IToastActionType,
  IToastRemoveAction,
  IToastRemoveAllAction,
} from './context'

let toastCounter = 0

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
