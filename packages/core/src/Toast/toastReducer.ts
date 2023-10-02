import { ToastAction, ToastActionType, ToastsMap } from './context'

/**
 * Given the current state (toast map) and an action,
 * produce a new state depending on the action.
 * The new map of toasts (id => toast) is immutable.
 *
 * @param state The map of id -> toast connections
 * @param action The required action
 */
export const toastReducer = (state: ToastsMap, action: ToastAction) => {
	switch (action.type) {
		case ToastActionType.TOAST_CREATE: {
			const toastMap = new Map(state)
			toastMap.set(action.id, action.data)
			return toastMap
		}
		case ToastActionType.TOAST_REMOVE: {
			const toastMap = new Map(state)
			toastMap.delete(action.id)
			return toastMap
		}
		case ToastActionType.TOAST_REMOVE_ALL: {
			return new Map()
		}
		default:
			return state
	}
}
