import { IToastAction, IToastActionType, ToastId } from './toastActions'
import { IBaseToast } from './Toast'

export type IToastsMap = ReadonlyMap<ToastId, IBaseToast>

/**
 * Given the current state (toast map) and an action,
 * produce a new state depending on the action.
 * The new map of toasts (id => toast) is immutable.
 *
 * @param state The map of id -> toast connections
 * @param action The required action
 */
export const toastReducer = (state: IToastsMap, action: IToastAction) => {
  switch (action.type) {
    case IToastActionType.TOAST_CREATE: {
      const toastMap = new Map(state)
      toastMap.set(action.id, action.data)
      return toastMap
    }
    case IToastActionType.TOAST_REMOVE: {
      const toastMap = new Map(state)
      toastMap.delete(action.id)
      return toastMap
    }
    case IToastActionType.TOAST_REMOVE_ALL: {
      return new Map()
    }
    default:
      return state
  }
}
