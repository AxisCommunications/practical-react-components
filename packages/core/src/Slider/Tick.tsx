import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { spacing, opacity, shape } from '../designparams'
import { Typography } from '../Typography'

const BoxHalo = styled.div.attrs<{ readonly width: number }>(({ width }) => ({
  style: { width: `calc(${width}px + ${spacing.large})` },
}))<{ readonly width: number }>`
  position: absolute;
  transform: scaleX(0);
  /* stylelint-disable-next-line value-no-vendor-prefix */
  height: -webkit-fill-available;
  border-radius: ${shape.radius.small};
  transition: transform 100ms;
  pointer-events: none;
`

export interface Tick {
  /**
   * Position of the tick along the slider
   */
  readonly position: number
  /**
   * Label for the tickMarker, eg. `°`
   */
  readonly label?: string
  /**
   * If to display the marker or not. Default `true`
   */
  readonly marker?: boolean
}

const BaseTick = styled.div.attrs<{
  readonly center: number
}>(({ center }) => ({
  style: {
    left: `${center}%`,
  },
}))<{
  readonly center: number
}>`
  position: absolute;
  bottom: 0px;
  background-color: ${({ theme }) => theme.color.text00()};

  width: 2px;
  height: 2px;
  border-radius: 50%;
`

export const TickLabelContainer = styled.div`
  position: relative;
  height: 16px;
  width: ${`calc(100% - ${parseInt(spacing.large)}px)`};
  left: 8px;
`

const LabelContainer = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const BaseLabel = styled.div.attrs<{
  readonly center: number
  readonly width: number
}>(({ center, width }) => ({
  style: { left: `calc(${center}% - ${width / 2}px)` },
}))<{ readonly center: number; readonly width: number }>`
  position: absolute;
  cursor: pointer;

  &:hover ${BoxHalo} {
    background-color: ${({ theme }) => theme.color.element11(opacity[24])};
    transform: scaleX(1);
  }
`

export const TickMarker: React.FC<Omit<Tick, 'label'>> = ({
  position,
  marker,
}) => <>{marker === true ? <BaseTick center={position} /> : null}</>

interface TickLabelProps {
  /**
   * The value to display for the tick.
   * Is overriden by `label`
   */
  readonly value: number
  /**
   * Position of the tick along the slider
   */
  readonly position: number
  /**
   * Label for the tickMarker, eg. `°`
   */
  readonly label?: string
  /**
   * Executes JavaScript when clicking the value.
   */
  readonly handleChange: (value: number) => void
}

export const TickLabel: React.FC<TickLabelProps> = ({
  position,
  label,
  value,
  handleChange,
}) => {
  const [width, setWidth] = useState<number>(0)
  const el = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.stopPropagation()
      handleChange(value)
    },
    [handleChange, value]
  )

  useLayoutEffect(() => {
    if (el.current === null) {
      return
    }

    setWidth(el.current.clientWidth)
  }, [])

  return (
    <BaseLabel ref={el} center={position} width={width}>
      <LabelContainer onClick={handleClick}>
        <BoxHalo width={width}></BoxHalo>
        <Typography variant="explanatory-text">
          {label === undefined ? value : label}
        </Typography>
      </LabelContainer>
    </BaseLabel>
  )
}
