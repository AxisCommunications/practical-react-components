import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useVisibleFocus } from 'react-hooks-shareable'

import { componentSize, shape, opacity, spacing } from '../designparams'
import { withField } from '../utils'
import { Typography } from '../Typography'

const SWITCH_THUMB_SIZE = '18px'

interface IDisabledProps {
  readonly disabled: boolean
}

interface ICheckedProps {
  readonly checked: boolean
}

interface IVisibleFocusProps {
  readonly visibleFocus: boolean
}

const ThumbContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: ${SWITCH_THUMB_SIZE};
  height: ${SWITCH_THUMB_SIZE};
  margin: 0 -15px;
`

const SwitchLabel = styled(Typography).attrs({
  variant: 'default-text',
})`
  margin-right: ${spacing.medium};
`

const ThumbHalo = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${SWITCH_THUMB_SIZE};
  height: ${SWITCH_THUMB_SIZE};
  border-radius: ${shape.radius.circle};
  background-color: transparent;
  transition: transform 100ms;
`

const Thumb = styled.span<ICheckedProps>`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: ${shape.radius.circle};
  box-shadow: ${({ checked, theme }) =>
    checked ? theme.shadow.knobOn1 : theme.shadow.knobOff1};
  transition: background-color 200ms ease-in-out;

  background-color: ${({ checked, theme }) =>
    checked ? theme.color.elementPrimary() : theme.color.element10()};

  ${({ checked, theme }) =>
    checked
      ? undefined
      : css`
          border: 1px solid ${theme.color.element16()};
        `};
`

const Container = styled.div<
  IDisabledProps & ICheckedProps & IVisibleFocusProps
>`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  user-select: none;
  cursor: default;

  &:hover {
    ${Thumb} {
      box-shadow: ${({ checked, theme }) =>
        checked ? theme.shadow.knobOn2 : theme.shadow.knobOff1};
    }
    ${ThumbHalo} {
      background-color: ${({ checked, theme }) =>
        checked
          ? theme.color.elementPrimary(opacity[16])
          : theme.color.element11(opacity[16])};
      transform: scale(1.77);
    }
  }

  &:focus-within {
    outline: none;

    ${({ visibleFocus, checked, theme }) =>
      visibleFocus
        ? css`
            ${Thumb} {
              border: 2px solid ${theme.color.textPrimary()};
              box-shadow: ${checked
                ? theme.shadow.knobOn2
                : theme.shadow.knobOff1};
            }
            ${ThumbHalo} {
              background-color: ${checked
                ? theme.color.elementPrimary(opacity[16])
                : theme.color.element11(opacity[16])};
              transform: scale(1.77);
            }
          `
        : undefined}
  }

  &:active {
    ${Thumb} {
      background-color: ${({ checked, theme }) =>
        checked ? theme.color.textPrimary() : undefined};
      box-shadow: ${({ checked, theme }) =>
        checked ? theme.shadow.knobOn3 : theme.shadow.knobOff2};
    }
    ${ThumbHalo} {
      background-color: ${({ checked, theme }) =>
        checked
          ? theme.color.elementPrimary(opacity[24])
          : theme.color.element11(opacity[24])};
      transform: scale(1.88);
    }
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined};
`

const TapArea = styled.label<IDisabledProps>`
  position: relative;
  padding: ${spacing.medium};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`

// Visually hidden but covers the whole area to catch user interactions
const NativeCheckbox = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  display: unset;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`

const SwitchBox = styled.span`
  display: flex;
  align-items: center;
  width: ${componentSize.small};
  position: relative;
`

const TrackBefore = styled.span<ICheckedProps>`
  display: block;
  height: 14px;
  border-radius: 7px;
  transition: width 200ms ease-in-out;
  width: ${({ checked }) => (checked ? '30px' : '14px')};
  background-color: ${({ theme }) => theme.color.elementHalfPrimary()};
`

const TrackAfter = styled.span`
  display: block;
  height: 14px;
  width: 14px;
  border-radius: 7px;
  flex: auto;
  background-color: ${({ theme }) => theme.color.element14()};
`

type BaseElement = HTMLInputElement
type BaseProps = React.InputHTMLAttributes<BaseElement>

export type SwitchChangeHandler = React.ChangeEventHandler<BaseElement>
export type SwitchValueChangeHandler = (value: boolean) => void

export interface ISwitchProps extends BaseProps {
  /**
   * Specifies the name of an input element.
   */
  readonly name?: BaseProps['name']
  /**
   * `class` to be passed to the component.
   */
  readonly className?: string
  /**
   * If `true`, the component is switched ON, `false` if OFF.
   */
  readonly checked: boolean
  /**
   * Native change handler that can be used by formik etc.
   */
  readonly onChange?: SwitchChangeHandler
  /**
   * Smooth typed value change handler.
   */
  readonly onValueChange?: SwitchValueChangeHandler
  /**
   * A label for the switch
   * Default `undefined`
   */
  readonly label?: string
}

export const Switch: React.FunctionComponent<ISwitchProps> = ({
  checked,
  disabled = false,
  onChange,
  onValueChange,
  onFocus,
  onPointerUp,
  onPointerDown,
  label,
  className,
  ...props
}) => {
  const {
    isPointerOn,
    isPointerOff,
    determineVisibleFocus,
    visibleFocus,
  } = useVisibleFocus()

  const handleChange = useCallback<SwitchChangeHandler>(
    e => {
      onChange?.(e)
      onValueChange?.(e.target.checked)
    },
    [onChange, onValueChange]
  )

  const handleFocus = useCallback(
    e => {
      onFocus?.(e)
      determineVisibleFocus()
    },
    [determineVisibleFocus, onFocus]
  )

  const handlePointerUp = useCallback(
    e => {
      onPointerUp?.(e)
      isPointerOff()
    },
    [isPointerOff, onPointerUp]
  )

  const handlePointerDown = useCallback(
    e => {
      onPointerDown?.(e)
      isPointerOn()
    },
    [isPointerOn, onPointerDown]
  )

  return (
    <Container
      className={className}
      disabled={disabled}
      checked={checked}
      visibleFocus={visibleFocus}
    >
      {label !== undefined ? <SwitchLabel>{label}</SwitchLabel> : null}
      <TapArea disabled={disabled}>
        <SwitchBox>
          <TrackBefore checked={checked} />
          <ThumbContainer>
            <ThumbHalo />
            <Thumb checked={checked} />
          </ThumbContainer>
          <TrackAfter />
        </SwitchBox>
        <NativeCheckbox
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
          onChange={handleChange}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onFocus={handleFocus}
        />
      </TapArea>
    </Container>
  )
}

export const SwitchField = withField<ISwitchProps>(Switch)
