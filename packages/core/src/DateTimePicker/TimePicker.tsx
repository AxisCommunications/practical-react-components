import React, { useMemo, useRef, useCallback, useState } from 'react'
import styled from 'styled-components'

import { spacing, shape } from '../designparams'
import { Typography } from '../Typography'
import { font } from '../theme'
import { NativeButton } from '../Button'
import { ITranslationMeridiem } from '.'

const CLOCK_SIZE = 300
const HALF_CLOCK_SIZE = CLOCK_SIZE / 2
const QUARTER_CLOCK_SIZE = CLOCK_SIZE / 4
const NUMBER_SIZE = CLOCK_SIZE / 6
const HALF_NUMBER_SIZE = NUMBER_SIZE / 2
const MIDDLE_POINT_SIZE = 10
const HALF_MIDDLE_POINT_SIZE = MIDDLE_POINT_SIZE / 2
const CLOCK_NUMBER_DIF = HALF_CLOCK_SIZE - HALF_NUMBER_SIZE
const ANGLE_360 = 360

const TIMEFORMAT_BUTTON_MIN_SIZE = 36

const CLOCK_NUMBERS: ReadonlyArray<number> = [
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
]
const CLOCK_NUMBERS_TWENTY_FOUR: ReadonlyArray<number> = [
  0,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
]

enum AMPM {
  AM = 'AM',
  PM = 'PM',
}

type TimeFormat = AMPM.AM | AMPM.PM | ''

interface INumberPosition {
  readonly x: number
  readonly y: number
  readonly number: number
}

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: ${spacing.huge};
  height: 100%;
  user-select: none;
`

const TimeFormatContainer = styled.div`
  position: absolute;
  left: 0;
  top: ${spacing.large};
  z-index: 2;
`

interface ITimeFormatSelected {
  readonly selected: boolean
}

const TimeFormatButton = styled(NativeButton).attrs({
  accent: false,
  visibleFocus: true,
})<ITimeFormatSelected>`
  border-radius: ${TIMEFORMAT_BUTTON_MIN_SIZE / 2}px;
  width: fit-content;
  min-width: ${TIMEFORMAT_BUTTON_MIN_SIZE}px;
  height: ${TIMEFORMAT_BUTTON_MIN_SIZE}px;
  padding: ${spacing.small};
  box-shadow: initial;
  :first-child {
    margin-right: ${spacing.medium};
  }

  background-color: ${({ theme, selected }) =>
    selected ? undefined : theme.color.background01()};
`

const TimeFormatButtonLabel = styled(Typography).attrs({
  variant: 'default-text',
})<ITimeFormatSelected>`
  color: ${({ theme, selected }) =>
    selected ? theme.color.text00() : theme.color.text03()};
`

const Clock = styled.div`
  height: ${CLOCK_SIZE}px;
  width: ${CLOCK_SIZE}px;
  border-radius: ${shape.radius.circle};
  position: relative;
  background-color: ${({ theme }) => theme.color.background01()};
  cursor: Move;
`

const MiddlePoint = styled.span`
  position: absolute;
  left: ${(CLOCK_SIZE - MIDDLE_POINT_SIZE) / 2}px;
  top: ${(CLOCK_SIZE - MIDDLE_POINT_SIZE) / 2}px;
  height: ${MIDDLE_POINT_SIZE}px;
  width: ${MIDDLE_POINT_SIZE}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.elementPrimary()};
`

interface IStyledPointerProps {
  readonly innerPointer: boolean
  readonly rotation: number
}

const StyledPointer = styled.div<IStyledPointerProps>`
  z-index: 100;
  width: 4px;
  left: calc(50% - 2px);
  position: absolute;
  top: 50%;
  transform: rotate(${props => props.rotation}deg);
  ::before {
    content: '';
    position: absolute;
    z-index: 10;
    height: 0;
    top: ${props =>
      props.innerPointer
        ? `-${QUARTER_CLOCK_SIZE}px`
        : `-${CLOCK_NUMBER_DIF}px`};
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
    border-bottom: ${props =>
        props.innerPointer
          ? `${QUARTER_CLOCK_SIZE}px`
          : `${CLOCK_NUMBER_DIF}px`}
      solid ${({ theme }) => theme.color.elementPrimary()};
  }
  ::after {
    content: '';
    height: ${NUMBER_SIZE}px;
    width: ${NUMBER_SIZE}px;
    left: -${HALF_NUMBER_SIZE - 1}px;
    position: absolute;
    top: ${props =>
      props.innerPointer
        ? `-${HALF_CLOCK_SIZE - NUMBER_SIZE}px`
        : `-${HALF_CLOCK_SIZE}px`};
    color: ${({ theme }) => theme.color.text00()};
    transform: rotate(-${props => props.rotation}deg);
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.elementPrimary()};
  }
  > * {
    transform: rotate(-${props => props.rotation}deg);
    z-index: 1000;
    text-align: center;
    line-height: ${NUMBER_SIZE}px;
    height: ${NUMBER_SIZE}px;
    width: ${NUMBER_SIZE}px;
    left: -${HALF_NUMBER_SIZE - 1}px;
    position: absolute;
    top: ${props =>
      props.innerPointer
        ? `-${HALF_CLOCK_SIZE - NUMBER_SIZE}px`
        : `-${HALF_CLOCK_SIZE}px`};
    color: ${({ theme }) => theme.color.text00()};
    font-size: ${font.size.large};
  }
`
interface INumberProps {
  readonly x: string
  readonly y: string
}

const NumberContainer = styled.span<INumberProps>`
  text-align: center;
  line-height: ${NUMBER_SIZE}px;
  height: ${NUMBER_SIZE}px;
  width: ${NUMBER_SIZE}px;
  position: absolute;
  top: ${props => props.y};
  left: ${props => props.x};
  > * {
    font-size: ${font.size.large};
    line-height: ${NUMBER_SIZE}px;
  }
`

interface IPointerProps {
  readonly innerPointer: boolean
  readonly value: string
  readonly rotation: number
}

const Pointer: React.FunctionComponent<IPointerProps> = ({
  innerPointer,
  value,
  rotation,
}) => {
  return (
    <StyledPointer rotation={rotation} innerPointer={innerPointer}>
      <Typography variant="button-text">{value}</Typography>
    </StyledPointer>
  )
}

interface IClockComponentProps {
  /**
   * Numbers to be shown in clock
   * Length of numbers should be 12 or 60.
   */
  readonly numbers: ReadonlyArray<number>
  /**
   * Current value
   */
  readonly value: number
  /**
   * If innerNumbers are needed.
   * Length should be 12.
   * Default `[]`
   */
  readonly innerNumbers?: ReadonlyArray<number>
  /**
   * For AM/PM time formats.
   * If `AM` or `PM` toggle buttons will appear.
   * Default `''`
   */
  readonly timeFormat?: TimeFormat
  /**
   * On time change
   * @param value new chosen value
   */
  readonly onTimeChange: (value: number) => void
  /**
   * AM/PM translation labels
   */
  readonly hour12MeridiemLabels?: ITranslationMeridiem
}

const ClockComponent: React.FunctionComponent<IClockComponentProps> = ({
  numbers,
  value,
  innerNumbers = [],
  timeFormat = '',
  onTimeChange,
  hour12MeridiemLabels,
}) => {
  const roundValue = useMemo(() => ANGLE_360 / numbers.length, [numbers])
  const numberPositions = useMemo(() => {
    const { length } = numbers
    const rotateQuarter = length / 4
    return numbers.reduce<ReadonlyArray<INumberPosition>>(
      (acc, number, index) => {
        if (length === 60 && index % 5 > 0) {
          return acc
        }
        const math = Math.PI * 2 * ((index - rotateQuarter) / length)
        const y = CLOCK_NUMBER_DIF * Math.sin(math) + CLOCK_NUMBER_DIF
        const x = CLOCK_NUMBER_DIF * Math.cos(math) + CLOCK_NUMBER_DIF
        return [...acc, { x, y, number }]
      },
      []
    )
  }, [numbers])
  const innerNumberPositions = useMemo(() => {
    const { length } = innerNumbers
    const rotateQuarter = length / 4
    return innerNumbers.map<INumberPosition>((number, index) => {
      const math = Math.PI * 2 * ((index - rotateQuarter) / length)
      const y = QUARTER_CLOCK_SIZE * Math.sin(math) + CLOCK_NUMBER_DIF
      const x = QUARTER_CLOCK_SIZE * Math.cos(math) + CLOCK_NUMBER_DIF
      return { x, y, number }
    })
  }, [innerNumbers])

  const [rotation, setRotation] = useState<number>(
    numbers.includes(value)
      ? numbers.indexOf(value) * roundValue
      : innerNumbers.indexOf(value) * roundValue
  )
  const [selectedTab, setSelectedTab] = useState<TimeFormat>(timeFormat)
  const isAMSelected = selectedTab === AMPM.AM

  const middlePoint = useRef<HTMLSpanElement>(null)

  const setPM = useCallback(() => {
    setSelectedTab(AMPM.PM)
    onTimeChange(value === 12 ? value : value + 12)
  }, [onTimeChange, value])

  const setAM = useCallback(() => {
    setSelectedTab(AMPM.AM)
    onTimeChange(value === 12 ? 0 : value)
  }, [onTimeChange, value])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons !== 1 || middlePoint.current === null) {
        return
      }
      // Calculate which degree the mouse pointer is compared to middlepoint
      const middlePointRect = middlePoint.current.getBoundingClientRect()
      const dy = middlePointRect.top + HALF_MIDDLE_POINT_SIZE - e.clientY
      const dx = e.clientX - middlePointRect.left - HALF_MIDDLE_POINT_SIZE
      let theta = (Math.atan2(dx, dy) * 180) / Math.PI
      if (theta < 0) {
        theta = ANGLE_360 + theta
      }
      theta = Math.round(theta / roundValue) * roundValue
      theta = theta > roundValue * (numbers.length - 1) ? 0 : theta
      if (innerNumbers.length > 0) {
        // Calculate distance from middlepoint, used to know if user is clicking on inner numbers.
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        const clock = e.currentTarget.getBoundingClientRect()
        const distanceFromMiddle = distance / clock.width
        if (distanceFromMiddle < 0.32) {
          const newInnervalue = innerNumbers[theta / roundValue]
          if (newInnervalue === value) {
            return
          }
          setRotation(theta)
          onTimeChange(newInnervalue)
          return
        }
      }
      let newValue = numbers[theta / roundValue]
      if (newValue === value) {
        return
      }
      if (isAMSelected) {
        newValue = newValue === 12 ? 0 : newValue
      }
      if (selectedTab === AMPM.PM) {
        newValue = newValue === 12 ? newValue : newValue + 12
      }
      setRotation(theta)
      onTimeChange(newValue)
    },
    [
      roundValue,
      numbers,
      innerNumbers,
      value,
      selectedTab,
      isAMSelected,
      onTimeChange,
    ]
  )

  return (
    <TimeContainer>
      <Clock onMouseMove={onMouseMove} onMouseDown={onMouseMove}>
        <MiddlePoint ref={middlePoint} />
        {numberPositions.map(({ number, x, y }, index) => {
          return (
            <NumberContainer
              y={`${y}px`}
              x={`${x}px`}
              key={number}
              id={index.toString()}
            >
              <Typography variant="default-text">{number}</Typography>
            </NumberContainer>
          )
        })}
        {innerNumberPositions.map(({ number, x, y }, index) => {
          return (
            <NumberContainer
              y={`${y}px`}
              x={`${x}px`}
              key={number}
              id={index.toString()}
            >
              <Typography variant="default-text">{number}</Typography>
            </NumberContainer>
          )
        })}
        <Pointer
          innerPointer={innerNumbers.includes(value)}
          rotation={rotation}
          value={value.toString()}
        />
      </Clock>
      {hour12MeridiemLabels !== undefined ? (
        <TimeFormatContainer>
          <TimeFormatButton
            selected={isAMSelected}
            variant={isAMSelected ? 'primary' : 'secondary'}
            onClick={setAM}
          >
            <TimeFormatButtonLabel selected={isAMSelected}>
              {hour12MeridiemLabels.am}
            </TimeFormatButtonLabel>
          </TimeFormatButton>
          <TimeFormatButton
            selected={!isAMSelected}
            variant={!isAMSelected ? 'primary' : 'secondary'}
            onClick={setPM}
          >
            <TimeFormatButtonLabel selected={!isAMSelected}>
              {hour12MeridiemLabels.pm}
            </TimeFormatButtonLabel>
          </TimeFormatButton>
        </TimeFormatContainer>
      ) : null}
    </TimeContainer>
  )
}

interface ITimePickerProps {
  /**
   * Current date value as date object
   */
  readonly date: Date
  /**
   * Fires when date value is changed
   */
  readonly onChange: React.Dispatch<React.SetStateAction<Date>>
}

/**
 * TimePickerTwentyFour
 *
 * Shows a clock component with 24 hour time options
 */
export const TimePickerTwentyFour: React.FC<ITimePickerProps> = ({
  date,
  onChange,
}) => {
  const onTimeChange = useCallback(
    (hour: number) => {
      const newDate = new Date(date)
      newDate.setHours(hour)
      onChange(newDate)
    },
    [date, onChange]
  )

  return (
    <ClockComponent
      onTimeChange={onTimeChange}
      value={date.getHours()}
      innerNumbers={CLOCK_NUMBERS_TWENTY_FOUR}
      numbers={CLOCK_NUMBERS}
    />
  )
}

interface ITimePickerAMPMProps extends ITimePickerProps {
  /**
   * AM/PM translation labels
   */
  readonly hour12MeridiemLabels: ITranslationMeridiem
}

/**
 * TimePickerAMPM
 *
 * Shows a clock component with AM/PM format.
 */
export const TimePickerAMPM: React.FunctionComponent<ITimePickerAMPMProps> = ({
  date,
  onChange,
  hour12MeridiemLabels,
}) => {
  const onTimeChange = useCallback(
    (hour: number) => {
      const newDate = new Date(date)
      newDate.setHours(hour)
      onChange(newDate)
    },
    [date, onChange]
  )
  let hours = date.getHours()
  const ampm = hours >= 12 ? AMPM.PM : AMPM.AM
  hours = hours % 12
  hours = hours !== 0 ? hours : 12
  return (
    <ClockComponent
      onTimeChange={onTimeChange}
      value={hours}
      timeFormat={ampm}
      numbers={CLOCK_NUMBERS}
      hour12MeridiemLabels={hour12MeridiemLabels}
    />
  )
}

/**
 * MinutePicker
 *
 * Shows a clock component with minute values
 */
export const MinutePicker: React.FC<ITimePickerProps> = ({
  date,
  onChange,
}) => {
  const onTimeChange = useCallback(
    (minutes: number) => {
      const newDate = new Date(date)
      newDate.setMinutes(minutes)
      onChange(newDate)
    },
    [date, onChange]
  )
  const minuteNumbers = useMemo(
    () =>
      Array(60)
        .fill(0)
        .map((_, i) => i),
    []
  )
  return (
    <ClockComponent
      onTimeChange={onTimeChange}
      value={date.getMinutes()}
      numbers={minuteNumbers}
    />
  )
}
