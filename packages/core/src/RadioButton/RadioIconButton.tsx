import {
  useCallback,
  InputHTMLAttributes,
  createRef,
  FocusEventHandler,
  PointerEventHandler,
  HTMLAttributes,
} from 'react'
import styled, { css } from 'styled-components'
import { usePressed, useVisibleFocus } from 'react-hooks-shareable'

import {
  RadioButtonChangeHandler,
  RadioButtonValueChangeHandler,
  RadioNative,
  RadioContainer,
} from './RadioButton'
import { Icon, IconType } from '../Icon'
import { opacity, shape, componentSize } from '../designparams'
import { Typography } from '../Typography'
import { withField, FieldProps } from '../utils'

/**
 *
 * The container for an icon.
 *
 */

const RadioIcon = styled.div<{
  readonly checked: boolean
}>`
  position: relative;
  box-sizing: border-box;
  width: 96px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${shape.radius.medium};
  color: ${({ theme }) => theme.color.text05()};

  ${({ theme, checked }) =>
    checked
      ? css`
          color: ${theme.color.elementPrimary()};
          background-color: ${theme.color.backgroundPrimary()};
          border: 1px solid ${theme.color.elementPrimary()};
        `
      : css`
          color: ${theme.color.text05()};
          background-color: ${theme.color.background02()};
          border: 1px solid ${theme.color.element11()};
        `};
`

/**
 *
 * The container for the entire button + icon + label,
 * with the input area as last child (catching events).
 *
 */

const RadioIconContainer = styled(RadioContainer)<{
  readonly disabled: boolean
  readonly checked: boolean
  readonly visibleFocus: boolean
}>`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ theme, checked, visibleFocus }) =>
    checked
      ? css`
          &:hover ${RadioIcon} {
            color: ${theme.color.textPrimary()};
            background-color: ${theme.color.elementPrimary(opacity[16])};
            border: 1px solid ${theme.color.elementPrimary()};
          }

          &:focus-within {
            outline: none;
            ${visibleFocus
              ? css`
                  ${RadioIcon} {
                    outline: none;
                    color: ${theme.color.textPrimary()};
                    background-color: ${theme.color.backgroundPrimary()};
                    border: 2px solid ${theme.color.textPrimary()};
                  }
                `
              : undefined}
          }

          &:active ${RadioIcon} {
            color: ${theme.color.textPrimary()};
            background-color: ${theme.color.elementPrimary(opacity[24])};
            border: 1px solid ${theme.color.textPrimary()};
          }
        `
      : css`
          &:hover ${RadioIcon} {
            color: ${theme.color.text04()};
            background-color: ${theme.color.background01()};
            border: 1px solid ${theme.color.element11()};
          }

          &:focus-within {
            outline: none;
            ${visibleFocus
              ? css`
                  ${RadioIcon} {
                    outline: none;
                    color: ${theme.color.text04()};
                    background-color: ${theme.color.background02()};
                    border: 2px solid ${theme.color.textPrimary()};
                  }
                `
              : undefined}
          }

          &:active ${RadioIcon} {
            color: ${theme.color.text04()};
            background-color: ${theme.color.element11(opacity[40])};
            color: ${theme.color.text04()};
          }
        `};

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}
`

/**
 *
 * The container for a label.
 *
 */

const RadioLabel = styled.div`
  height: ${componentSize.small};
  display: flex;
  align-items: center;
`

type BaseElement = HTMLInputElement
type BaseProps = InputHTMLAttributes<BaseElement>

export interface RadioIconButtonProps<V extends string = string>
  extends BaseProps {
  /**
   * Attributes a name to the RadioIconButton.
   */
  readonly name: string
  /**
   * Value used to define the button text.
   */
  readonly value: V
  /**
   * String used to label the RadioIconButton.
   */
  readonly label: string
  /**
   * If `true`, the component is checked.
   */
  readonly checked: boolean
  /**
   * If `true`, the RadioIconButton will be disabled.
   */
  readonly disabled?: boolean
  /**
   * Adds an error message to the RadioIconButton.
   */
  readonly error?: string
  /**
   * The icon element.
   */
  readonly icon: IconType
  /**
   * Native change handler that can be used by formik etc.
   */
  readonly onChange?: RadioButtonChangeHandler
  /**
   * Smooth typed value change handler.
   */
  readonly onValueChange?: RadioButtonValueChangeHandler<V>
}

export function RadioIconButton<V extends string = string>({
  label,
  checked,
  disabled = false,
  onChange,
  onValueChange,
  icon,
  onFocus,
  onPointerUp,
  onPointerDown,
  ...rest
}: RadioIconButtonProps<V>): JSX.Element {
  const ref = createRef<BaseElement>()
  const pressed = usePressed(ref)
  const onChangeHandler = useCallback<RadioButtonChangeHandler>(
    e => {
      onChange?.(e)
      onValueChange?.(e.target.value as V)
    },
    [onChange, onValueChange]
  )

  const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
    useVisibleFocus()

  const handleFocus = useCallback<FocusEventHandler<BaseElement>>(
    e => {
      onFocus?.(e)
      determineVisibleFocus()
    },
    [determineVisibleFocus, onFocus]
  )
  const handlePointerDown = useCallback<PointerEventHandler<BaseElement>>(
    e => {
      onPointerDown?.(e)
      isPointerOn()
    },
    [isPointerOn, onPointerDown]
  )
  const handlePointerUp = useCallback<PointerEventHandler<BaseElement>>(
    e => {
      onPointerUp?.(e)
      isPointerOff()
    },
    [isPointerOff, onPointerUp]
  )

  return (
    <RadioIconContainer
      disabled={disabled}
      checked={checked}
      partial={false}
      pressed={pressed}
      hovered={false}
      visibleFocus={visibleFocus}
    >
      <RadioIcon checked={checked}>
        <Icon icon={icon} />
      </RadioIcon>
      <RadioLabel>
        <Typography variant="navigation-label">{label}</Typography>
      </RadioLabel>
      <RadioNative
        ref={ref}
        type="radio"
        onChange={onChangeHandler}
        checked={checked}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onFocus={handleFocus}
        {...rest}
      />
    </RadioIconContainer>
  )
}

/*
 * Radio Icon Group
 */

const RadioIconGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > ${/* sc-selector */ RadioIconContainer}:not(:first-child) {
    margin-left: 48px;
  }
`

export interface RadioIconGroupOption<V extends string = string> {
  readonly value: V
  readonly label: string
  readonly disabled?: boolean
  readonly icon: IconType
}

type GroupBaseElement = HTMLDivElement
type GroupBaseProps = HTMLAttributes<GroupBaseElement>

export interface RadioIconGroupProps<V extends string = string>
  extends GroupBaseProps {
  readonly options: ReadonlyArray<RadioIconGroupOption<V>>
  readonly name?: string
  readonly value: V
  readonly onChange?: RadioButtonChangeHandler
  readonly onValueChange?: RadioButtonValueChangeHandler<V>
  readonly error?: string
}

export function RadioIconGroup<V extends string = string>({
  options,
  name = '',
  value,
  onChange,
  onValueChange,
  error,
  ...rest
}: RadioIconGroupProps<V>): JSX.Element {
  return (
    <RadioIconGroupContainer {...rest}>
      {options.map((option, index) => (
        <RadioIconButton<V>
          key={index}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={value === option.value}
          onChange={onChange}
          onValueChange={onValueChange}
          error={error}
          icon={option.icon}
        />
      ))}
    </RadioIconGroupContainer>
  )
}

export const RadioIconGroupField = <V extends string = string>(
  props: FieldProps & RadioIconGroupProps<V>
) => withField<RadioIconGroupProps<V>>(RadioIconGroup)(props)
