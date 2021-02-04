import { MutableRefObject, Dispatch, useContext, useCallback } from 'react'

import { createToast, removeToast, removeAllToasts } from './toastActions'
import {
  createSuccessToast,
  createErrorToast,
  createInfoToast,
  createWarningToast,
  createActionToast,
  createLoadingToast,
  createProgressToast,
} from './toastCreators'

import {
  ActionToastCreator,
  HideToastHandler,
  ToastAction,
  ToastCallbacks,
  ProgressToastCreator,
  ShowToastHandler,
  SimpleToastCreator,
  ToastsContext,
} from './context'

export interface SimpleToastsDurations {
  readonly success?: number
  readonly error?: number
  readonly warning?: number
  readonly info?: number
}

export const useToastCallbacks = (
  dispatchRef: MutableRefObject<Dispatch<ToastAction>>,
  { success, error, warning, info }: SimpleToastsDurations = {}
): ToastCallbacks => {
  const showToast: ShowToastHandler = useCallback(
    (toast, id) => {
      const toastAction = createToast(toast, id)
      dispatchRef.current(toastAction)
      return toastAction.id
    },
    [dispatchRef]
  )

  const hideToast: HideToastHandler = useCallback(
    id => {
      const toastAction = removeToast(id)
      dispatchRef.current(toastAction)
    },
    [dispatchRef]
  )

  const clearToasts = useCallback(() => {
    dispatchRef.current(removeAllToasts)
  }, [dispatchRef])

  const showSuccessToast: SimpleToastCreator = useCallback(
    (toast, id) =>
      showToast({ duration: success, ...createSuccessToast(toast) }, id),
    [showToast, success]
  )

  const showErrorToast: SimpleToastCreator = useCallback(
    (toast, id) =>
      showToast({ duration: error, ...createErrorToast(toast) }, id),
    [showToast, error]
  )

  const showInfoToast: SimpleToastCreator = useCallback(
    (toast, id) => showToast({ duration: info, ...createInfoToast(toast) }, id),
    [showToast, info]
  )

  const showWarningToast: SimpleToastCreator = useCallback(
    (toast, id) =>
      showToast({ duration: warning, ...createWarningToast(toast) }, id),
    [showToast, warning]
  )

  const showLoadingToast: SimpleToastCreator = useCallback(
    (toast, id) => {
      return showToast(createLoadingToast(toast), id)
    },
    [showToast]
  )

  const showProgressToast: ProgressToastCreator = useCallback(
    (toast, id) => {
      return showToast(createProgressToast(toast), id)
    },
    [showToast]
  )

  const showActionToast: ActionToastCreator = useCallback(
    (toast, id) => showToast(createActionToast(toast), id),
    [showToast]
  )

  return {
    showToast,
    hideToast,
    clearToasts,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
    showLoadingToast,
    showProgressToast,
    showActionToast,
  }
}

export const useToasts = () => {
  const { __dispatchRef, ...callbacks } = useContext(ToastsContext)

  return callbacks
}
