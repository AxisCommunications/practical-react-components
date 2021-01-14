import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { usePressed, useVisibleFocus } from 'react-hooks-shareable'

import {
  shape,
  spacing,
  componentSize,
  iconSize,
  opacity,
} from '../designparams'
import { withField } from '../utils'

const clamp = (x: number) => Math.max(0, Math.min(x, 1))

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

// Provides padding around the slider's track
const Container = styled.div`
  box-sizing: border-box;
  height: ${componentSize.small};
  padding: ${spacing.medium};
  width: 100%;
`
// The holder for the knob
const Rail = styled.div`
  position: absolute;
  height: 2px;
  top: 7px;
  left: 8px;
  right: 8px;
  background-color: ${({ theme }) => theme.color.element13()};
  border-radius: ${shape.radius.large};
`
// Marks the position of the knob on the rail
const Trail = styled.div<{ readonly pressed: boolean }>`
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  border-radius: ${shape.radius.large};
  width: 100%;
  height: 100%;
  transform-origin: 0px 0px;
  transition: ${({ pressed }) =>
    pressed ? 'none' : 'transform 0.2s ease-in-out'};
`
// The handle for dragging the slider
const Knob = styled.div<{
  readonly pressed: boolean
  readonly fraction: number
}>`
  width: ${iconSize.small};
  height: ${iconSize.small};
  position: absolute;
  top: -7px;
  left: 0;
  border-radius: ${shape.radius.circle};
  transition: ${({ pressed }) =>
    pressed ? 'none' : 'transform 0.2s ease-in-out'};

  &:hover {
    ${({ fraction, theme }) =>
      fraction === 0
        ? css`
            box-shadow: ${theme.shadow.knobOff1};
          `
        : css`
            box-shadow: ${theme.shadow.knobOn2};
          `}
  }
`
// The interaction part of the handle
const KnobCore = styled.svg`
  width: ${iconSize.small};
  height: ${iconSize.small};
  position: absolute;
  top: 0;
  left: 0;
`

// Shows outline on KnobCore on focus
const KnobOutline = styled.svg`
  width: ${iconSize.small};
  height: ${iconSize.small};
  position: absolute;
  top: 0;
  left: 0;
  stroke-width: 2px;
  fill: transparent;
  stroke: transparent;
`

// Shows user is currently engaging the knob
const KnobHalo = styled.div<{ readonly fraction: number }>`
  width: ${iconSize.small};
  height: ${iconSize.small};
  border-radius: ${shape.radius.circle};
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  transition: transform 100ms;

  ${/* sc-selector */ Knob}:hover & {
    visibility: unset;
    background-color: ${({ fraction, theme }) =>
      fraction === 0
        ? theme.color.element11(opacity[16])
        : theme.color.elementPrimary(opacity[16])};
    transform: scale(2);
  }
`
// Contains the track and knob, allows click to position
const Track = styled.div<{
  readonly fraction: number
  readonly disabled: boolean
  readonly visibleFocus: boolean
}>`
  position: relative;
  width: 100%;
  height: 16px;
  cursor: pointer;

  ${({ fraction, visibleFocus, theme }) =>
    fraction === 0
      ? css`
          ${Rail} {
            background-color: ${theme.color.element14()};
          }
          ${Knob} {
            box-shadow: ${theme.shadow.knobOff1};
          }
          ${KnobCore} {
            fill: ${theme.color.element10()};
          }
          ${KnobOutline} {
            stroke: ${theme.color.element16()};
            stroke-width: 1px;
          }

          &:focus {
            outline: none;
            ${visibleFocus
              ? css`
                  ${Knob} {
                    box-shadow: ${theme.shadow.knobOff1};
                  }
                  ${KnobCore} {
                    fill: ${theme.color.element10()};
                  }
                  ${KnobHalo} {
                    visibility: visible;
                    background-color: ${theme.color.element11(opacity[16])};
                    transform: scale(2);
                  }
                  ${KnobOutline} {
                    stroke: ${theme.color.textPrimary()};
                    stroke-width: 1px;
                  }
                `
              : undefined}
          }

          &:active {
            ${Knob} {
              box-shadow: ${theme.shadow.knobOff2};
            }
            ${KnobCore} {
              fill: ${theme.color.element10()};
            }
            ${KnobHalo} {
              visibility: visible;
              background-color: ${theme.color.element11(opacity[24])};
              transform: scale(2.12);
            }
            ${KnobOutline} {
              stroke: ${theme.color.element16()};
              stroke-width: 1px;
            }
          }
        `
      : css`
          ${Knob} {
            box-shadow: ${theme.shadow.knobOn1};
          }
          ${KnobCore} {
            fill: ${theme.color.elementPrimary()};
          }
          &:focus {
            outline: none;
            ${visibleFocus
              ? css`
                  ${Knob} {
                    box-shadow: ${theme.shadow.knobOn2};
                  }
                  ${KnobCore} {
                    fill: ${theme.color.elementPrimary()};
                  }
                  ${KnobHalo} {
                    visibility: visible;
                    background-color: ${theme.color.elementPrimary(
                      opacity[16]
                    )};
                    transform: scale(2);
                  }
                  ${KnobOutline} {
                    stroke: ${theme.color.textPrimary()};
                    stroke-width: 2px;
                  }
                `
              : undefined}
          }

          &:active {
            ${Knob} {
              box-shadow: ${theme.shadow.knobOn3};
            }
            ${KnobCore} {
              fill: ${theme.color.textPrimary()};
            }
            ${KnobHalo} {
              visibility: visible;
              background-color: ${theme.color.elementPrimary(opacity[24])};
              transform: scale(2.12);
            }
          }
        `}

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}
`

enum SliderKeys {
  Home = 'Home',
  End = 'End',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  ArrowDown = 'ArrowDown',
}

export interface ISliderProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Specifies default value between min and max value.
   */
  readonly value: number
  /**
   * Specifies minimum value of the slider.
   */
  readonly min?: number
  /**
   * Specifies maximum value of the slider.
   */
  readonly max?: number
  /**
   * Executes a JavaScript when a user changes the value.
   */
  readonly handleChange: (value: number) => void
  /**
   * If `true`, the slider will be disabled.
   */
  readonly disabled?: boolean
}

/**
 * Slider component
 *
 * A horizontal track with a knob that can be moved
 * forward and backward. When the knob is pressed,
 * no transitions are applied, but when the track itself
 * is pressed, the knob jumps to the new position with
 * an animation.
 */

/**
 * TODO: according to UX, need to add `variant` property to have style `dashed`
 */
export const Slider: React.FC<ISliderProps> = ({
  value,
  min = 0,
  max = 100,
  handleChange,
  disabled = false,
  className,
  onKeyDown,
  onClick,
  onPointerDown,
  onPointerUp,
  onFocus,
  ...props
}) => {
  const sliderRef = useRef<BaseElement>(null)
  const knobRef = useRef(null)
  const pressed = usePressed(knobRef)
  const [sliderWidth, setSliderWidth] = useState(0)

  const fraction = (value - min) / (max - min)

  // Computes the new value and passed it to the handleChange callback
  const handleClick = useCallback(
    (e: PointerEvent | React.MouseEvent<BaseElement>) => {
      e.preventDefault()
      onClick?.(e as React.MouseEvent<BaseElement>)

      if (sliderRef.current !== null) {
        const { left, width } = sliderRef.current.getBoundingClientRect()
        const x = clamp((e.pageX - left) / width)
        handleChange(min + x * (max - min))
      }
    },
    [handleChange, max, min, onClick]
  )

  // Fetch slider dimensions once when the component is mounted and
  // again on each resize
  useEffect(() => {
    const updateDims = () => {
      if (sliderRef.current !== null) {
        const { width } = sliderRef.current.getBoundingClientRect()
        setSliderWidth(width)
      }
    }

    if (sliderRef.current !== null) {
      updateDims()
      const observer = new window.ResizeObserver(updateDims)
      observer.observe(sliderRef.current)
    }
  }, [])

  // Track pointer position as soon as knob is pressed
  useEffect(() => {
    if (pressed) {
      document.addEventListener('pointermove', handleClick)

      return () => document.removeEventListener('pointermove', handleClick)
    }
  }, [handleClick, pressed])

  // Keyboard support
  const handleKeyDown = useCallback<React.KeyboardEventHandler<BaseElement>>(
    event => {
      onKeyDown?.(event)

      if (!(event.key in SliderKeys)) {
        return
      }
      event.preventDefault()

      if (sliderRef.current !== null) {
        const { width } = sliderRef.current.getBoundingClientRect()
        setSliderWidth(width)
      }

      const onePercent = Math.abs((max - min) / 100)
      let newValue

      switch (event.key) {
        case SliderKeys.ArrowRight:
        case SliderKeys.ArrowUp: {
          newValue = value + onePercent
          break
        }

        case SliderKeys.ArrowLeft:
        case SliderKeys.ArrowDown: {
          newValue = value - onePercent
          break
        }

        case SliderKeys.PageUp: {
          newValue = value + onePercent * 10
          break
        }

        case SliderKeys.PageDown: {
          newValue = value - onePercent * 10
          break
        }

        case SliderKeys.Home: {
          newValue = min
          break
        }

        case SliderKeys.End: {
          newValue = max
          break
        }

        default:
      }

      if (newValue !== undefined) {
        if (newValue > max) {
          newValue = max
        } else if (newValue < min) {
          newValue = min
        }
        handleChange(newValue)
      }
    },
    [max, min, value, handleChange, onKeyDown]
  )

  const {
    isPointerOn,
    isPointerOff,
    determineVisibleFocus,
    visibleFocus,
  } = useVisibleFocus()

  const handlePointerDown = useCallback<React.PointerEventHandler<BaseElement>>(
    e => {
      onPointerDown?.(e)
      isPointerOn()
    },
    [isPointerOn, onPointerDown]
  )
  const handlePointerUp = useCallback<React.PointerEventHandler<BaseElement>>(
    e => {
      onPointerUp?.(e)
      isPointerOff()
    },
    [isPointerOff, onPointerUp]
  )
  const handleFocus = useCallback<React.FocusEventHandler<BaseElement>>(
    e => {
      onFocus?.(e)
      determineVisibleFocus()
    },
    [determineVisibleFocus, onFocus]
  )

  return (
    <Container className={className}>
      <Track
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        fraction={fraction}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onFocus={handleFocus}
        visibleFocus={visibleFocus}
        {...props}
      >
        <Rail ref={sliderRef}>
          <Trail
            pressed={pressed}
            style={{ transform: `scaleX(${fraction})` }}
          />
          <Knob
            fraction={fraction}
            pressed={pressed}
            style={{
              transform: `translateX(-50%) translateX(${
                fraction * sliderWidth
              }px)`,
            }}
            ref={knobRef}
          >
            <KnobHalo fraction={fraction} />
            <KnobCore>
              <circle cx={8} cy={8} r={8} />
            </KnobCore>
            <KnobOutline>
              <circle cx={8} cy={8} r={fraction === 0 ? 7.5 : 7} />
            </KnobOutline>
          </Knob>
        </Rail>
      </Track>
    </Container>
  )
}

export const SliderField = withField(Slider)
