import React, { createContext, useReducer, useContext, useRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { spacing, shape } from '../designparams'

import { BaseToast } from './Toast'
import { toastReducer } from './toastReducer'
import { IToastAction } from './toastActions'
import {
  IToastCallbacks,
  useToastCallbacks,
  ISimpleToastsDurations,
} from './useToasts'

const NI = () => {
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

export interface IToastsPlacement {
  readonly justify: 'center' | 'right'
  readonly top: string
}

const ToastsWrapper = styled.div<IToastsPlacement>`
  position: fixed;
  top: ${({ top }) => top};
  width: 360px;
  border-radius: ${shape.radius.medium};
  margin: ${spacing.medium} ${spacing.large};

  ${({ justify }) =>
    justify === 'center'
      ? css`
          left: 50%;
          transform: translateX(-50%);
        `
      : css`
          right: 0;
        `}
`

/**
 *
 * Toasts provider
 *
 * Used to provide a context for dispatching toast actions.
 *
 * Note: Do not use this directly! Instead use the `useToasts` hook which wraps
 * the dispatch ref.
 *
 */
export const ToastsProvider: React.FC<ISimpleToastsDurations> = ({
  children,
  ...toastsOptions
}) => {
  const __dispatchRef = useRef<React.Dispatch<IToastAction>>(NI)

  const callbacks = useToastCallbacks(__dispatchRef, toastsOptions)

  return (
    <ToastsContext.Provider value={{ ...callbacks, __dispatchRef }}>
      {children}
    </ToastsContext.Provider>
  )
}

export const ToastTransition: React.FC = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <CSSTransition
      nodeRef={ref}
      classNames="practical"
      appear={true}
      timeout={400}
      mountOnEnter={true}
      unmountOnExit={true}
      {...props}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, { ref })
        : null}
    </CSSTransition>
  )
}

export interface IToastsAnchorProps {
  /**
   * Where the toasts should be placed.
   *
   * Default: top right
   */
  readonly placement: IToastsPlacement
}

export const ToastsAnchor: React.FC<IToastsAnchorProps> = ({ placement }) => {
  const [toasts, dispatch] = useReducer(toastReducer, new Map())
  const { hideToast, __dispatchRef } = useContext(ToastsContext)
  __dispatchRef.current = dispatch

  return (
    <ToastsWrapper {...placement}>
      <TransitionGroup component={null}>
        {[...toasts.entries()].map(([id, props], index) => (
          <ToastTransition key={id}>
            <BaseToast
              key={id}
              toastId={id}
              zIndex={-index}
              dismissToast={hideToast}
              {...props}
            />
          </ToastTransition>
        ))}
      </TransitionGroup>
    </ToastsWrapper>
  )
}
