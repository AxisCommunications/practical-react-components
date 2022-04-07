import {
  useCallback,
  useMemo,
  VFC,
  InputHTMLAttributes,
  ChangeEventHandler,
  createRef,
  FocusEventHandler,
  PointerEventHandler,
  HTMLAttributes,
} from 'react'
import styled, { css, useTheme } from 'styled-components'
import { usePressed, useVisibleFocus } from 'react-hooks-shareable'

import { withField, FieldProps } from '../utils'
import { spacing, opacity, componentSize, shape } from '../designparams'
import { Typography } from '../Typography'

/**
 *
 * The button part of the radio button
 *
 */

const AtomContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: ${shape.radius.small};
`

const SvgHalo = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  height: 20px;
  width: 20px;
  border-radius: ${shape.radius.circle};
  transform-origin: center;
  transition: transform 100ms;
`

const SvgContainer = styled.svg<{
  readonly checked: boolean
  readonly error: boolean
}>`
  width: ${componentSize.mini};
  height: ${componentSize.mini};
  overflow: visible;
  position: absolute;
  top: 0;
  fill: transparent;

  stroke: ${({ theme, checked, error }) =>
    error
      ? theme.color.elementError()
      : checked
      ? theme.color.elementPrimary()
      : theme.color.element01()};
`

const SvgRing = styled.circle`
  stroke-width: 2px;
`

const SvgDot = styled.circle<{
  readonly partial: boolean
}>`
  fill: ${({ partial, theme }) =>
    partial ? theme.color.text05() : theme.color.elementPrimary()};
  stroke: ${({ partial, theme }) =>
    partial ? theme.color.text05() : theme.color.elementPrimary()};
`

export interface RadioButtonAtomProps {
  readonly checked: boolean
  readonly partial: boolean
  readonly error: string
}

export const RadioButtonAtom: VFC<RadioButtonAtomProps> = ({
  checked,
  partial,
  error,
}) => {
  return (
    <AtomContainer>
      <SvgHalo />
      <SvgContainer checked={checked} error={error.length > 0}>
        <SvgRing r={9} cx={12} cy={12} />
        {checked || partial ? (
          <SvgDot r={4.5} cx={12} cy={12} partial={!checked && partial} />
        ) : null}
      </SvgContainer>
    </AtomContainer>
  )
}

/**
 *
 * The label
 *
 */

const Label = styled(Typography)`
  display: flex;
  padding-top: 3px;
  min-height: 24px;
  height: fit-content;
  margin-left: ${spacing.medium};
  color: ${({ theme }) => theme.color.text01()};
  white-space: initial;
  word-break: break-word;
`

/**
 *
 * The input area which the user can interact with,
 * which spans the entire button + label area.
 *
 */

export const RadioNative = styled.input`
  display: unset;
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
`

/**
 *
 * The container for the entire button + label,
 * with the input area as last child (catching events).
 *
 */

export const RadioContainer = styled.div<{
  readonly disabled: boolean
  readonly checked: boolean
  readonly partial: boolean
  readonly pressed: boolean
  readonly hovered: boolean
  readonly visibleFocus: boolean
}>`
  position: relative;
  display: grid;
  grid-template-columns: 24px auto;
  transition: transform 100ms;
  max-width: 100%;

  &:hover ${SvgHalo} {
    background-color: ${({ checked, theme }) =>
      checked
        ? theme.color.elementPrimary(opacity[16])
        : theme.color.element11(opacity[16])};
    transform: scale(1.6);
  }

  /**
   * If RadioButton exist in ContentListItemWithHover and
   * if the ContentListItemWithHover is on hover state,
   * RadioButton shows hover effect.
   */
  ${({ hovered, checked, theme }) =>
    hovered
      ? css`
          ${SvgHalo} {
            background-color: ${checked
              ? theme.color.elementPrimary(opacity[16])
              : theme.color.element11(opacity[16])};
            transform: scale(1.6);
          }
        `
      : undefined}

  &:focus-within {
    ${({ visibleFocus, checked, theme }) =>
      visibleFocus
        ? css`
            outline: none;
            ${SvgHalo} {
              background-color: ${checked
                ? theme.color.elementPrimary(opacity[16])
                : theme.color.element11(opacity[16])};
              transform: scale(1.6);
            }
            ${SvgRing} {
              outline: none;
              stroke: ${theme.color.textPrimary()};
            }
          `
        : undefined}
  }

  &:active {
    ${SvgHalo} {
      background-color: ${({ checked, theme }) =>
        checked
          ? theme.color.elementPrimary(opacity[24])
          : theme.color.element11(opacity[24])};
      transform: scale(1.7);
    }
    ${SvgRing} {
      stroke: ${({ checked, theme }) =>
        checked ? theme.color.textPrimary() : theme.color.text02()};
    }
    ${SvgDot} {
      ${({ partial, theme }) =>
        css`
          fill: ${partial ? theme.color.text02() : theme.color.textPrimary()};
          stroke: ${partial ? theme.color.text02() : theme.color.textPrimary()};
        `}
    }
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}
`

type BaseElement = HTMLInputElement
type BaseProps = InputHTMLAttributes<BaseElement>

export type RadioButtonChangeHandler = ChangeEventHandler<BaseElement>
export type RadioButtonValueChangeHandler<V extends string = string> = (
  value: V
) => void

export interface RadioButtonProps<V extends string = string> extends BaseProps {
  /**
   * Attributes a name to the RadioButton.
   */
  readonly name?: BaseProps['name']
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The value of the component.
   */
  readonly value: V
  /**
   * String used to label the RadioButton.
   */
  readonly label: string
  /**
   * If `true`, the component is checked.
   */
  readonly checked: boolean
  /**
   * If `true`, the component is partially checked.
   */
  readonly partial?: boolean
  /**
   * If `true`, the switch will be disabled.
   */
  readonly disabled?: boolean
  /**
   * Signifies error by turning the checkbox red.
   */
  readonly error?: string
  /**
   * Native change handler that can be used by formik etc.
   */
  readonly onChange?: RadioButtonChangeHandler
  /**
   * Smooth typed value change handler.
   */
  readonly onValueChange?: RadioButtonValueChangeHandler<V>
  /**
   * If RadioButton exist in a `ContentListItemWithHover`, RadioButton get this props.
   * RadioButton shows hover effect if the `ContentListItemWithHover` is on hover state.
   */
  readonly hovered?: boolean
}

export function RadioButton<V extends string = string>({
  label,
  checked,
  partial = false,
  disabled = false,
  error = '',
  onChange,
  onValueChange,
  hovered = false,
  onFocus,
  onPointerUp,
  onPointerDown,
  ...rest
}: RadioButtonProps<V>): JSX.Element {
  const ref = createRef<BaseElement>()
  const pressed = usePressed(ref)

  const handleChange = useCallback<RadioButtonChangeHandler>(
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

  const radiobuttonLabel = useMemo(() => {
    return label !== undefined ? (
      <Label variant="navigation-label">{label}</Label>
    ) : null
  }, [label])

  return (
    <RadioContainer
      disabled={disabled}
      checked={checked}
      partial={partial}
      pressed={pressed}
      hovered={hovered}
      visibleFocus={visibleFocus}
    >
      <RadioButtonAtom checked={checked} partial={partial} error={error} />
      {radiobuttonLabel}
      <RadioNative
        ref={ref}
        type="radio"
        checked={checked}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onFocus={handleFocus}
        onChange={handleChange}
        {...rest}
      />
    </RadioContainer>
  )
}

/*
 * Radio Group
 */
/* stylelint-disable no-descending-specificity  */
const RadioButtonGroupContainer = styled.div<{ readonly compact: boolean }>`
  display: grid;
  grid-row-gap: ${({ compact }) => (!compact ? spacing.large : spacing.medium)};
  margin: ${({ compact }) =>
    !compact ? `${spacing.medium} 0` : `${spacing.small} 0`};
`
/* stylelint-enable */

export interface RadioButtonGroupOption<V extends string = string> {
  readonly value: V
  readonly label: string
  readonly disabled?: boolean
}

type GroupBaseElement = HTMLDivElement
type GroupBaseProps = HTMLAttributes<GroupBaseElement>

export interface RadioButtonGroupProps<V extends string = string>
  extends GroupBaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: GroupBaseProps['className']
  readonly name?: string
  readonly options: ReadonlyArray<RadioButtonGroupOption<V>>
  readonly value: V
  readonly onChange?: RadioButtonChangeHandler
  readonly onValueChange?: RadioButtonValueChangeHandler<V>
  readonly error?: string
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
}

export function RadioButtonGroup<V extends string = string>({
  options,
  name,
  value,
  onChange,
  onValueChange,
  error,
  compact: compactFromProps,
  ...rest
}: RadioButtonGroupProps<V>): JSX.Element {
  const { compact: compactFromTheme } = useTheme()
  const compact = compactFromProps ?? compactFromTheme

  return (
    <RadioButtonGroupContainer compact={compact} {...rest}>
      {options.map((option, index) => (
        <RadioButton<V>
          key={index}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={value === option.value}
          onChange={onChange}
          onValueChange={onValueChange}
          error={error}
        />
      ))}
    </RadioButtonGroupContainer>
  )
}

export const RadioButtonGroupField = <V extends string = string>(
  props: FieldProps & RadioButtonGroupProps<V>
) => withField<RadioButtonGroupProps<V>>(RadioButtonGroup)(props)
