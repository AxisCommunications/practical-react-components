import React from 'react'
import styled, { css } from 'styled-components'

import {
  CheckIcon,
  AlertIcon,
  WarningIcon,
  InfoIcon,
} from 'practical-react-components-icons'

import { Link } from '../Link'
import { Icon } from '../Icon'
import { Typography } from '../Typography'
import { spacing, iconSize } from '../designparams'
import { Spinner } from '../Spinner'
import { Progress } from '../Progress'
import {
  ISimpleToast,
  IActionToast,
  IProgressToast,
  IBaseToast,
} from './context'

const ToastLabel = styled(Typography).attrs({ variant: 'chip-tag-text' })<{
  readonly hasCloseButton: boolean
  readonly isError: boolean
  readonly hasEmphasis: boolean
}>`
  height: 100%;

  ${({ hasCloseButton }) =>
    !hasCloseButton
      ? css`
          padding: 0 ${spacing.large};
        `
      : css`
          padding-left: ${spacing.large};
        `}

  ${({ hasEmphasis: emphasis }) =>
    emphasis
      ? css`
          font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
        `
      : undefined}

  ${({ isError }) =>
    isError
      ? css`
          color: ${({ theme }) => theme.color.textError()};
        `
      : css`
          color: ${({ theme }) => theme.color.text01()};
        `}
`

const IconWrapper = styled.div`
  height: ${iconSize.medium};
  width: ${iconSize.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Message = styled(Typography).attrs({ variant: 'chip-tag-text' })`
  white-space: normal;
`

const SuccessNotificationIconColor = styled(IconWrapper)`
  color: ${({ theme }) => theme.color.elementSuccess()};
`

const WarningIconColor = styled(IconWrapper)`
  color: ${({ theme }) => theme.color.elementWarning()};
`

const InfoIconColor = styled(IconWrapper)`
  color: ${({ theme }) => theme.color.text04()};
`

const ErrorIconColor = styled(IconWrapper)`
  color: ${({ theme }) => theme.color.elementError()};
`

const ActionIconColor = styled(IconWrapper)`
  color: ${({ theme }) => theme.color.elementPrimary()};
`

export type IToast = ISimpleToast | IActionToast

type ToastCreator<T = IToast> = (toast: T) => IBaseToast

type SimpleToastCreator = ToastCreator<ISimpleToast>
type ActionToastCreator = ToastCreator<IActionToast>
type ProgressToastCreator = ToastCreator<IProgressToast>

/*
 * Success toast
 */

export const createSuccessToast: SimpleToastCreator = ({
  label,
  message,
  ...rest
}) => {
  const labelComponent = (
    <ToastLabel
      hasCloseButton={false}
      isError={false}
      hasEmphasis={message !== undefined}
    >
      {label}
    </ToastLabel>
  )
  const icon = (
    <SuccessNotificationIconColor>
      <Icon icon={CheckIcon} />
    </SuccessNotificationIconColor>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    hasCloseButton: false,
    ...rest,
  }
}

/*
 * Error toast
 */

export const createErrorToast: SimpleToastCreator = ({
  label,
  message,
  ...rest
}) => {
  const labelComponent = (
    <ToastLabel
      hasCloseButton={true}
      isError={true}
      hasEmphasis={message !== undefined}
    >
      {label}
    </ToastLabel>
  )
  const icon = (
    <ErrorIconColor>
      <Icon icon={AlertIcon} />
    </ErrorIconColor>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}

/*
 * Warning toast
 */

export const createWarningToast: SimpleToastCreator = ({
  label,
  message,
  ...rest
}) => {
  const labelComponent = (
    <ToastLabel
      hasCloseButton={true}
      isError={false}
      hasEmphasis={message !== undefined}
    >
      {label}
    </ToastLabel>
  )
  const icon = (
    <WarningIconColor>
      <Icon icon={WarningIcon} />
    </WarningIconColor>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}

/*
 * Info toast
 */

export const createInfoToast: SimpleToastCreator = ({
  label,
  message,
  ...rest
}) => {
  const labelComponent = (
    <ToastLabel
      hasCloseButton={true}
      isError={false}
      hasEmphasis={message !== undefined}
    >
      {label}
    </ToastLabel>
  )
  const icon = (
    <InfoIconColor>
      <Icon icon={InfoIcon} />
    </InfoIconColor>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}

/*
 * Action toast
 *
 * Has a custom action icon (primary color),
 * and a clickable action link.
 */

const LinkWrapper = styled(Typography).attrs({ variant: 'chip-tag-text' })`
  padding: 0 ${spacing.large};
  font-weight: bold;
`

export const createActionToast: ActionToastCreator = ({
  label,
  message,
  action,
  ...rest
}) => {
  const labelComponent = (
    <>
      <ToastLabel hasCloseButton={true} isError={false} hasEmphasis={false}>
        {label}
      </ToastLabel>
      <LinkWrapper>
        <Link {...action.link}>{action.text}</Link>
      </LinkWrapper>
    </>
  )
  const icon = (
    <ActionIconColor>
      <Icon icon={action.icon} />
    </ActionIconColor>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}

/*
 * Loading toast
 */

const LoadingIconSize = styled.div`
  transform: scale(0.75);
`

export const createLoadingToast: SimpleToastCreator = ({
  label,
  message,
  ...rest
}) => {
  const labelComponent = (
    <ToastLabel
      hasCloseButton={true}
      isError={false}
      hasEmphasis={message !== undefined}
    >
      {label}
    </ToastLabel>
  )
  const icon = (
    <LoadingIconSize>
      <Spinner />
    </LoadingIconSize>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}

/*
 * Progress toast
 */

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${spacing.large};
`

export const createProgressToast: ProgressToastCreator = ({
  label,
  message,
  progress,
  ...rest
}) => {
  const labelComponent = (
    <>
      <ToastLabel
        hasCloseButton={true}
        isError={false}
        hasEmphasis={message !== undefined}
      >
        {label}
      </ToastLabel>
      <ProgressWrapper>
        <Progress {...progress} />
      </ProgressWrapper>
    </>
  )
  const icon = (
    <LoadingIconSize>
      <Spinner />
    </LoadingIconSize>
  )

  const messageComponent =
    message !== undefined ? <Message>{message}</Message> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    ...rest,
  }
}
