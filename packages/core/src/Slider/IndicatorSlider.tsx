import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useBoolean } from 'react-hooks-shareable'
import styled, { css } from 'styled-components'

import { spacing, componentSize, shape } from '../designparams'
import { withField } from '../utils'
import { SliderProps, Slider } from './Slider'

export const Container = styled.div`
  height: ${componentSize.small};
  position: relative;
  margin: 0 ${spacing.large} 0 ${spacing.large};
`

export const Indicator = styled.div<{
  readonly pressed: boolean
  readonly showIndicator: boolean
  readonly verticalAlignment: number | undefined
}>`
  position: absolute;
  top: ${({ verticalAlignment: anchor }) =>
    anchor !== undefined ? `${anchor}px` : 0};
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: ${({ pressed }) =>
    pressed ? 'none' : 'transform 0.2s ease-in-out'};

  ${({ pressed, showIndicator }) =>
    pressed || showIndicator
      ? css`
          visibility: visible;
          animation: fadein 0.25s;
        `
      : css`
          visibility: hidden;
        `}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const IndicatorRectangle = styled.div<{ readonly pressed: boolean }>`
  background-color: ${({ pressed, theme }) =>
    pressed ? theme.color.textPrimary() : theme.color.elementPrimary()};
  color: ${({ theme }) => theme.color.text00()};
  font-size: ${({ theme }) => theme.font.size.smaller};
  border-radius: ${shape.radius.medium};
  height: ${componentSize.mini};
  min-width: ${componentSize.small};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.medium};
`

export const IndicatorTriangle = styled.div<{ readonly pressed: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid
    ${({ pressed, theme }) =>
      pressed ? theme.color.textPrimary() : theme.color.elementPrimary()};
`

export interface IndicatorSliderProps
  extends Omit<SliderProps, 'handleChange'> {
  readonly indicatorLabel?: string
  readonly handleChange: (value: number) => void
  readonly verticalAlignment?: number
}

export const IndicatorSlider: React.FC<IndicatorSliderProps> = ({
  indicatorLabel,
  handleChange,
  verticalAlignment,
  ...props
}) => {
  const [value, setValue] = useState<number | null>(null)

  const [isIndicatorDisplayed, showIndicator, hideIndicator] = useBoolean(false)

  const [isPressed, enableIsPressed, disableIsPressed] = useBoolean(false)

  const [knobPosition, setKnobPosition] = useState<number | null>(null)

  const onValueChange = useCallback((v: number) => {
    handleChange(v)
    setValue(v)
  }, [])

  const handleOnPressed = useCallback((pressed: boolean) => {
    pressed ? enableIsPressed() : disableIsPressed()
  }, [])

  // Show the indicator if the value changes by key events or clicking the rail
  useEffect(() => {
    if (isPressed || value === null) {
      return
    }

    showIndicator()
  }, [isPressed, value])

  // Hide the indicator with a delay timer if the value changes
  const timeout = useRef(0)
  useEffect(() => {
    if (isPressed || value === null) {
      return
    }

    window.clearTimeout(timeout.current)

    timeout.current = window.setTimeout(() => hideIndicator(), 1000)

    return () => window.clearTimeout(timeout.current)
  }, [isPressed, value])

  // Handler for the indicators position along the X-axis
  const handleKnobMove = useCallback((v: number) => setKnobPosition(v), [])

  // Label to be displayed in the indicator
  const indicatorValue = useMemo(() => {
    const roundedValue = Math.round(value ?? 0)
    return indicatorLabel !== undefined
      ? `${roundedValue}${indicatorLabel}`
      : roundedValue
  }, [indicatorLabel, value])

  return (
    <>
      <Container>
        <Indicator
          verticalAlignment={verticalAlignment}
          pressed={isPressed}
          showIndicator={isIndicatorDisplayed}
          style={{
            transform: `translateX(-50%) translateX(${knobPosition}px)`,
          }}
        >
          <IndicatorRectangle pressed={isPressed}>
            {indicatorValue}
          </IndicatorRectangle>
          <IndicatorTriangle pressed={isPressed} />
        </Indicator>
      </Container>
      <Slider
        {...props}
        onPressed={handleOnPressed}
        onKnobMove={handleKnobMove}
        handleChange={onValueChange}
      />
    </>
  )
}

export const IndicatorSliderWithField =
  withField<IndicatorSliderProps>(IndicatorSlider)
