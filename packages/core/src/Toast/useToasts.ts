import { MutableRefObject, Dispatch, useContext, useCallback } from 'react'

import {
  createToast,
  removeToast,
  IToastAction,
  ToastId,
  removeAllToasts,
} from './toastActions'
import {
  ISimpleToast,
  IActionToast,
  IProgressToast,
  createSuccessToast,
  createErrorToast,
  createInfoToast,
  createWarningToast,
  createActionToast,
  createLoadingToast,
  createProgressToast,
} from './toastCreators'

import { IBaseToast } from './Toast'
import { ToastsContext } from './ToastsProvider'

type ShowToastHandler = (toast: IBaseToast, id?: ToastId) => ToastId
type HideToastHandler = (id: ToastId) => void
type SimpleToastCreator = (toast: ISimpleToast, id?: ToastId) => ToastId
type ActionToastCreator = (toast: IActionToast, id?: ToastId) => ToastId
type ProgressToastCreator = (toast: IProgressToast, id?: ToastId) => ToastId

export interface ISimpleToastsDurations {
  readonly success?: number
  readonly error?: number
  readonly warning?: number
  readonly info?: number
}

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

export const useToastCallbacks = (
  dispatchRef: MutableRefObject<Dispatch<IToastAction>>,
  { success, error, warning, info }: ISimpleToastsDurations = {}
): IToastCallbacks => {
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
