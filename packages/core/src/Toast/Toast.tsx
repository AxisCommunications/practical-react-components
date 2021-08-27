import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { CloseIcon } from 'practical-react-components-icons'

import {
  spacing,
  iconSize,
  opacity,
  shape,
  componentSize,
} from '../designparams'
import { Icon } from '../Icon'

import { BaseToastValue, ToastId } from './context'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * Building blocks
 */

const IconWrapper = styled.div`
  height: ${iconSize.medium};
  width: ${iconSize.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseIconWrapper = styled(IconWrapper)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.element11()};
  height: ${componentSize.small};
  width: ${componentSize.small};
  border-radius: ${shape.radius.circle};
  transition: all 640ms;

  &:hover {
    color: ${({ theme }) => theme.color.text04()};
    background-color: ${({ theme }) => theme.color.element11(opacity[16])};
  }
`

const IconContainer = styled.div`
  height: ${componentSize.extraLarge};
  width: ${componentSize.extraLarge};
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: solid 1px ${({ theme }) => theme.color.background01()};
`

const CloseIconContainer = styled(IconContainer)`
  border: none;
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`

const MessageContainer = styled.div`
  grid-column: -1 / 1;
  padding: ${spacing.large};
  border-top: solid 1px ${({ theme }) => theme.color.background01()};
  color: ${({ theme }) => theme.color.text01()};
`

const ToastWrapper = styled.div.attrs<{ readonly zIndex: number }>(
  ({ zIndex }) => ({ style: { zIndex } })
)<{
  readonly hasClose: boolean
  readonly hasMessage: boolean
  readonly zIndex: number
}>`
  position: relative;
  align-items: center;
  background-color: ${({ theme }) => theme.color.background00()};
  box-shadow: ${({ theme }) => theme.shadow.toast};
  border-radius: ${shape.radius.medium};
  display: grid;
  grid-template-columns: ${({ hasClose }) =>
    hasClose ? 'auto 1fr auto' : 'auto 1fr'};
  grid-template-rows: ${({ hasMessage }) => (hasMessage ? '1fr auto' : '1fr')};
  margin-top: ${spacing.large};
  will-change: transform;
  transition: all 320ms ease-in-out;

  &.practical-enter {
    opacity: 0;
    transform: translateY(-150%);
  }

  &.practical-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  &.practical-enter-done {
    opacity: 1;
    transform: translateY(0);
  }

  &.practical-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.practical-exit-active {
    opacity: 0;
    transform: translateY(-150%);
  }

  &.practical-exit-done {
    opacity: 0;
    transform: translateY(-150%);
  }
`

/*
 * BaseToast
 */

interface BaseToastProps extends BaseToastValue, BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  readonly toastId: ToastId
  readonly dismissToast: (id: ToastId) => void
  readonly zIndex: number
}

/**
 * A basic container for all kinds of toasts.
 * Child elements are passed as props.
 */
export const BaseToast = React.memo(
  React.forwardRef<HTMLDivElement | null, BaseToastProps>(
    (
      {
        toastId,
        dismissToast,
        icon,
        label,
        message,
        onClose,
        duration,
        hasCloseButton = true,
        zIndex,
        ...props
      },
      ref
    ) => {
      const onDismissToast = useCallback(() => {
        dismissToast(toastId)

        if (onClose !== undefined) {
          onClose(toastId)
        }
      }, [toastId, onClose, dismissToast])

      useEffect(() => {
        if (duration !== undefined) {
          const autoDismissTimer = setTimeout(onDismissToast, duration)
          return () => {
            clearTimeout(autoDismissTimer)
          }
        }
      }, [duration, onDismissToast, toastId, label, message])

      return (
        <ToastWrapper
          hasMessage={message !== undefined}
          hasClose={hasCloseButton}
          zIndex={zIndex}
          {...props}
          ref={ref}
        >
          <IconContainer>{icon}</IconContainer>
          <LabelContainer>{label}</LabelContainer>
          {hasCloseButton ? (
            <CloseIconContainer>
              <CloseIconWrapper onClick={onDismissToast}>
                <Icon icon={CloseIcon} />
              </CloseIconWrapper>
            </CloseIconContainer>
          ) : null}
          {message !== undefined ? (
            <MessageContainer>{message}</MessageContainer>
          ) : null}
        </ToastWrapper>
      )
    }
  )
)

BaseToast.displayName = 'BaseToast'
