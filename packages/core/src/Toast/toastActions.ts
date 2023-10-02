import {
	BaseToastValue,
	ToastId,
	ToastCreateAction,
	ToastActionType,
	ToastRemoveAction,
	ToastRemoveAllAction,
} from './context'

let toastCounter = 0

export const createToast = (
	toast: BaseToastValue,
	id: ToastId = `practical-${++toastCounter}`
): ToastCreateAction => ({
	id,
	type: ToastActionType.TOAST_CREATE,
	data: toast,
})

export const removeToast = (id: ToastId): ToastRemoveAction => ({
	id,
	type: ToastActionType.TOAST_REMOVE,
})

export const removeAllToasts: ToastRemoveAllAction = {
	type: ToastActionType.TOAST_REMOVE_ALL,
}
