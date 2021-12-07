import React, { useCallback, useState, useRef, useLayoutEffect } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { opacity, spacing, shape, componentSize } from '../designparams'
import { Icon } from '../Icon'
import { withField } from '../utils/withField'
import { Typography } from '../Typography'
import { Tooltip } from '../Tooltip'
import { VisibilityIcon, NotVisibilityIcon, ErrorIcon } from './icons'

type BaseElement = HTMLInputElement
type BaseProps = React.InputHTMLAttributes<BaseElement>
export type NumberInputType = number | ''
export type InputChangeHandler = React.ChangeEventHandler<BaseElement>
export type InputValueChangeHandler<T> = (value: T) => void
export type TextInputWidth = 'small' | 'medium' | 'large' | 'full'
export type TextInputCredentialsType =
  | 'username'
  | 'current-password'
  | 'new-password'
export type InputType = 'text' | 'number'
type ErrorVariant = 'text' | 'icon'

const getWidth = (width: TextInputWidth): string => {
  switch (width) {
    case 'small':
      return '160px'
    case 'medium':
      return '200px'
    case 'large':
      return '352px'
    case 'full':
      return '100%'
    default:
      return '100%'
  }
}

const Error = styled.div<{
  readonly compact: boolean
}>`
  color: ${({ theme }) => theme.color.elementError()};
  line-height: 16px;
  background-color: transparent;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: ${({ compact }) =>
    !compact ? componentSize.medium : componentSize.small};
`

const ErrorLineContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.elementError()};
  height: 100%;
  min-width: ${spacing.medium};
  flex-grow: 1;
`

const ErrorLine = styled.div<{ readonly hasErrorMessage: boolean }>`
  position: absolute;
  bottom: -1px;
  height: 2px;
  width: 100%;
  background-color: transparent;
  border-radius: ${({ hasErrorMessage }) =>
    hasErrorMessage
      ? `${shape.radius.small} 0 0 0`
      : `${shape.radius.small} ${shape.radius.small} 0 0`};
`

const ErrorMessage = styled.div`
  padding: 0 ${spacing.medium};
  position: relative;
  bottom: -50%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: text;
`

const FocusLine = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  width: 100%;
  background-color: transparent;
  border-radius: ${shape.radius.small} ${shape.radius.small} 0 0;
`

const InputContainer = styled.div<{
  readonly disabled: boolean
  readonly compact: boolean
  readonly width: TextInputWidth
  readonly hasError: boolean
}>`
  position: relative;
  display: inline-flex;
  width: ${({ width }) => getWidth(width)};
  background-color: ${({ theme }) => theme.color.background02()};
  box-sizing: border-box;
  border-width: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.element11()};
  border-radius: ${shape.radius.medium} ${shape.radius.medium} 0 0;

  height: ${({ compact }) =>
    !compact ? componentSize.medium : componentSize.small};

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color.element01()};
    background-color: ${({ theme }) => theme.color.background01()};
  }

  &:focus-within {
    outline: none;
    border-bottom: 2px solid transparent;
    background-color: ${({ theme }) => theme.color.backgroundPrimary()};
  }

  &:focus-within ${FocusLine} {
    background-color: ${({ theme }) => theme.color.elementPrimary()};
  }

  &:focus-within ${ErrorLine} {
    background-color: ${({ theme }) => theme.color.elementError()};
  }

  &:focus-within ${ErrorLineContainer} {
    border-bottom: 1px solid transparent;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}

  ${({ theme, hasError }) =>
    hasError
      ? css`
          background-color: ${theme.color.backgroundError()};
          border-bottom: none;

          &:hover {
            background-color: ${theme.color.backgroundError()};
            border-bottom: none;
          }
          &:focus-within {
            background-color: ${theme.color.backgroundError()};
            border-bottom: none;
          }
        `
      : undefined};
`

const InputNative = styled.input`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};
  display: unset;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text01()};
  background-color: transparent;
  border-width: 0;
  padding: ${spacing.medium};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.text05()};
  }

  &:read-only {
    opacity: ${opacity[48]};
  }

  ${({ type }) =>
    type === 'number'
      ? `
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
    appearance: textfield; /* Firefox */
  `
      : type === 'password' || type === 'text'
      ? `
    ::-ms-reveal,
    ::-ms-clear {
      display: none;
    }
    `
      : undefined}
`

const PasswordToggle = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  height: inherit;
  padding: 0 ${spacing.medium};
  color: ${({ theme }) => theme.color.element11()};

  ${/* sc-selector */ InputContainer}:hover & {
    color: ${({ theme }) => theme.color.text05()};
  }
`

const ErrorIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  height: inherit;
  padding: 0 ${spacing.medium};
  color: ${({ theme }) => theme.color.elementError()};
`

interface ErrorMessageTextProps {
  readonly error?: string
  readonly errorVariant: ErrorVariant
}

const ErrorMessageText: React.FC<ErrorMessageTextProps> = ({
  error,
  errorVariant,
}) => {
  const [hasOverflow, setHasOverflow] = useState(false)
  const errorMessageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (errorMessageRef.current === null) {
      return
    }

    setHasOverflow(
      errorMessageRef.current.offsetHeight <
        errorMessageRef.current.scrollHeight ||
        errorMessageRef.current.offsetWidth <
          errorMessageRef.current.scrollWidth
    )
  }, [errorMessageRef])

  if (error === undefined || error === '' || errorVariant !== 'text') {
    return null
  }

  const text = (
    <ErrorMessage ref={errorMessageRef}>
      <Typography variant="explanatory-text">{error}</Typography>
    </ErrorMessage>
  )

  return hasOverflow ? <Tooltip text={error}>{text}</Tooltip> : text
}

interface BaseInputProps<T extends string | NumberInputType> extends BaseProps {
  /**
   * Specifies the name of an input element.
   */
  readonly name?: BaseProps['name']
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The value of the input element.
   */
  readonly value: T
  /**
   * Native change handler that can be used by formik etc.
   */
  readonly onChange?: InputChangeHandler
  /**
   * Smooth typed value change handler.
   */
  readonly onValueChange?: InputValueChangeHandler<T>
  /**
   * Executes an action when the Enter key is pressed.
   */
  readonly onPressEnter?: VoidFunction
  /**
   * Executes an action when the Esc key is pressed.
   */
  readonly onPressEscape?: VoidFunction
  /**
   * Changes the width of the textbox area.
   */
  readonly width?: TextInputWidth
  /**
   * Adds error message to TextInput.
   */
  readonly error?: string
  /**
   * Error message variant.
   *
   * Default: `text`
   */
  readonly errorVariant?: ErrorVariant

  /**
   * Can be used to set React ref to the input element
   */

  readonly inputRef?: React.RefObject<BaseElement>
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
}

function Input<T extends string | NumberInputType>({
  onChange,
  onValueChange,
  onPressEnter,
  onPressEscape,
  disabled = false,
  compact: compactFromProps,
  width = 'full',
  error,
  errorVariant = 'text',
  type,
  className,
  onKeyUp,
  inputRef,
  ...props
}: BaseInputProps<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { compact: compactFromTheme } = useTheme()
  const compact = compactFromProps ?? compactFromTheme

  const handleKeyUp = useCallback<React.KeyboardEventHandler<BaseElement>>(
    e => {
      switch (e.key) {
        case 'Enter': {
          onPressEnter?.()
          break
        }

        case 'Esc':
        case 'Escape': {
          onPressEscape?.()
          break
        }

        default:
          onKeyUp?.(e)
      }
    },
    [onPressEnter, onPressEscape, onKeyUp]
  )
  const toggleShowPassword = useCallback<React.MouseEventHandler>(
    e => {
      e.preventDefault()
      setShowPassword(oldValue => !oldValue)
    },
    [setShowPassword]
  )

  const handleChange = useCallback<InputChangeHandler>(
    e => {
      e.preventDefault()

      onChange?.(e)

      if (onValueChange !== undefined) {
        if (type === 'number') {
          const newNumberValue = e.target.value
          if (newNumberValue === '') {
            // To allow 0 to be removed while typing
            onValueChange(newNumberValue as T)
          } else {
            // We know that T should be number here
            onValueChange(Number(newNumberValue) as T)
          }
        } else {
          // We know that T should be string here
          onValueChange(e.target.value as T)
        }
      }
    },
    [onChange, onValueChange, type]
  )

  return (
    <InputContainer
      disabled={disabled}
      compact={compact}
      ref={containerRef}
      className={className}
      width={width}
      hasError={error !== undefined}
    >
      <InputNative
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={disabled}
        ref={inputRef}
        {...props}
        type={
          (type === 'current-password' || type === 'new-password') &&
          !showPassword
            ? 'password'
            : type
        }
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {(type === 'current-password' || type === 'new-password') &&
      props.value !== '' ? (
        <PasswordToggle onClick={toggleShowPassword}>
          <Icon
            icon={showPassword ? NotVisibilityIcon : VisibilityIcon}
            size="small"
          />
        </PasswordToggle>
      ) : null}
      {error !== undefined && errorVariant === 'icon' ? (
        <ErrorIconContainer>
          <Tooltip text={error ?? ''}>
            <div>
              <Icon icon={ErrorIcon} />
            </div>
          </Tooltip>
        </ErrorIconContainer>
      ) : null}
      {error !== undefined ? (
        <Error compact={compact}>
          <ErrorLineContainer>
            <ErrorLine hasErrorMessage={error !== ''} />
          </ErrorLineContainer>
          {errorVariant === 'text' && error !== '' ? (
            <ErrorMessageText errorVariant={errorVariant} error={error} />
          ) : null}
        </Error>
      ) : (
        <FocusLine />
      )}
    </InputContainer>
  )
}

export interface TextInputProps extends BaseInputProps<string> {}
export const TextInput: React.FC<TextInputProps> = props => (
  <Input {...props} type="text" />
)

export interface NumberInputProps extends BaseInputProps<NumberInputType> {}
export const NumberInput: React.FC<NumberInputProps> = props => (
  <Input {...props} type="number" />
)

export interface TextInputCredentialsProps extends BaseInputProps<string> {
  readonly type: TextInputCredentialsType
}
export const TextInputCredentials: React.FC<
  TextInputCredentialsProps
> = props => <Input {...props} />

export const TextInputField = withField<TextInputProps>(TextInput)
export const NumberInputField = withField<NumberInputProps>(NumberInput)
export const TextInputCredentialsField =
  withField<TextInputCredentialsProps>(TextInputCredentials)
