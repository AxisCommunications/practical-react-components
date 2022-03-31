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
  SimpleToast,
  ActionToast,
  ProgressToast,
  BaseToastValue,
} from './context'
import { Theme } from '../theme'
import { twoLinesClamp } from '../utils/twoLinesClamp'

const getIconColor = (theme: Theme, iconType?: ToastIconType) => {
  const { color } = theme

  switch (iconType) {
    case ToastIconType.SUCCESS:
      return color.elementSuccess()
    case ToastIconType.WARNING:
      return color.elementWarning()
    case ToastIconType.ERROR:
      return color.elementError()
    case ToastIconType.ACTION:
      return color.elementPrimary()
    case ToastIconType.INFO:
    default:
      return color.text04()
  }
}

export const ToastLabel = styled(Typography).attrs({
  variant: 'chip-tag-text',
})<{
  readonly hasCloseButton: boolean
  readonly isError: boolean
  readonly hasEmphasis: boolean
}>`
  height: 100%;
  ${twoLinesClamp}

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

export enum ToastIconType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  ACTION = 'action',
}

export const ToastIconWrapper = styled.div<{
  readonly iconType?: ToastIconType
}>`
  height: ${iconSize.medium};
  width: ${iconSize.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, iconType }) => getIconColor(theme, iconType)};
`

export const ToastMessage = styled(Typography).attrs({
  variant: 'chip-tag-text',
})`
  white-space: normal;
`

export type Toast = SimpleToast | ActionToast

type ToastCreator<T = Toast> = (toast: T) => BaseToastValue

type SimpleToastCreator = ToastCreator<SimpleToast>
type ActionToastCreator = ToastCreator<ActionToast>
type ProgressToastCreator = ToastCreator<ProgressToast>

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
    <ToastIconWrapper iconType={ToastIconType.SUCCESS}>
      <Icon icon={CheckIcon} />
    </ToastIconWrapper>
  )

  const messageComponent =
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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
    <ToastIconWrapper iconType={ToastIconType.ERROR}>
      <Icon icon={AlertIcon} />
    </ToastIconWrapper>
  )

  const messageComponent =
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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
    <ToastIconWrapper iconType={ToastIconType.WARNING}>
      <Icon icon={WarningIcon} />
    </ToastIconWrapper>
  )

  const messageComponent =
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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
    <ToastIconWrapper iconType={ToastIconType.INFO}>
      <Icon icon={InfoIcon} />
    </ToastIconWrapper>
  )

  const messageComponent =
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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
    <ToastIconWrapper iconType={ToastIconType.ACTION}>
      <Icon icon={action.icon} />
    </ToastIconWrapper>
  )

  const messageComponent =
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

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

const ProgressWrapper = styled.div<{
  readonly hasClose: boolean
}>`
  display: flex;
  align-items: center;
  ${({ hasClose }) =>
    !hasClose
      ? css`
          padding: 0 ${spacing.medium} 0 ${spacing.large};
        `
      : css`
          padding-left: ${spacing.large};
        `}
`

export const createProgressToast: ProgressToastCreator = ({
  label,
  message,
  progress,
  hasCloseButton = true,
  ...rest
}) => {
  const labelComponent = (
    <>
      <ToastLabel
        hasCloseButton={hasCloseButton}
        isError={false}
        hasEmphasis={message !== undefined}
      >
        {label}
      </ToastLabel>
      <ProgressWrapper hasClose={hasCloseButton}>
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
    message !== undefined ? <ToastMessage>{message}</ToastMessage> : undefined

  return {
    icon,
    label: labelComponent,
    message: messageComponent,
    hasCloseButton,
    ...rest,
  }
}
