import React, { useMemo, useState, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'

import { ISliderProps, Slider as FluentUiSlider } from '@fluentui/react'
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme'
import { Typography } from '../Typography'

const dateFormatter = (epoch: number) => {
  const date = new Date(epoch)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const RangeSliderThemed: React.VFC<ISliderProps> = props => {
  const practicalTheme = useTheme()
  const fluentUiTheme: PartialTheme = useMemo(
    () => ({
      palette: {
        themePrimary: practicalTheme.color.elementPrimary().toString(),
        themeLighter: practicalTheme.color.element13().toString(), // track focus
        themeDark: practicalTheme.color.elementPrimary().toString(),
        neutralTertiaryAlt: practicalTheme.color.element13().toString(), // track blur
        neutralSecondary: practicalTheme.color.elementPrimary().toString(),
        white: practicalTheme.color.backgroundPrimary().toString(),
      },
    }),
    [practicalTheme]
  )

  return (
    <ThemeProvider theme={fluentUiTheme} applyTo="none">
      <FluentUiSlider {...props} />
    </ThemeProvider>
  )
}

const ValuesLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const RangeSliderField: React.VFC<ISliderProps> = props => {
  const { lowerValue, value } = props

  if (lowerValue === undefined || value === undefined) {
    throw new Error('lowerValue and value must be set')
  }

  return (
    <>
      <Typography>{props.label}</Typography>
      <RangeSliderThemed {...props} label={undefined} />
      <ValuesLabelWrapper>
        <Typography>
          {/* Start value label */}
          {dateFormatter(lowerValue)}
        </Typography>
        <Typography>
          {/* Stop value label */}
          {dateFormatter(value)}
        </Typography>
      </ValuesLabelWrapper>
    </>
  )
}

/** Range Slider with DateTime values in epoch. */
export const RangeSliderDemo: React.VFC = () => {
  const start = '2022-03-10 08:00:00'
  const stop = '2022-03-14 12:40:00'

  const epochStart = Date.parse(start)
  const epochStop = Date.parse(stop)

  const [sliderValue, setSliderValue] = useState([
    epochStart + 50000000, // calculate this value, or better set it in the demo and not in the component
    epochStop - 50000000,
  ])

  const sliderOnChange = useCallback(
    (_: number, range: [number, number] | undefined) => {
      if (range === undefined) {
        // handle error? throw?
        return
      }
      setSliderValue(range)
    },
    []
  )

  return (
    <RangeSliderField
      label="A range slider imported from Fluent UI"
      ranged={true}
      min={epochStart}
      max={epochStop}
      lowerValue={sliderValue[0]}
      value={sliderValue[1]}
      showValue={false}
      onChange={sliderOnChange}
      step={1000 * 60} // depending on the range, adjust to steps in a reasonable size, so moving knob with keys doesn't take to long
    />
  )
}
