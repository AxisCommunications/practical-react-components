import React, { useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { spacing, shape } from '../designparams'
import { Typography } from '../Typography'
import { IconButton, NativeButton } from '../Button'
import { ArrowLeftIcon, ArrowRightIcon } from 'practical-react-components-icons'
import { font } from '../theme'

const DatePickerWrapper = styled.div`
  padding-top: ${spacing.huge};
  user-select: none;
`

const DateWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.background01()};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-bottom: 2px solid ${({ theme }) => theme.color.background00()};
`

const DayPicker = styled.div`
  width: 100%;
  height: 216px;
  background-color: ${({ theme }) => theme.color.background01()};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const DateButtonContainer = styled.div`
  text-align: center;
  width: 14%;
`

const WeekdayTypo = styled(Typography)`
  text-align: center;
  width: 14%;
  color: ${({ theme }) => theme.color.text03()};
  margin: ${spacing.medium} 0;
  font-size: ${font.size.large};
`

const MonthPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.medium};
`

const YearPicker = styled.div`
  margin-top: ${spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const MonthYearLabel = styled(Typography)`
  font-size: ${font.size.large};
`

const DateButton = styled(NativeButton)`
  border-radius: ${shape.radius.circle};
  width: 36px;
  height: 36px;
  min-width: unset;
  padding: 0;
  box-shadow: initial;
  :focus {
    border: initial;
    box-shadow: initial;
  }
`

interface DateButtonLabelProps {
  readonly selected: boolean
}

const DateButtonLabel = styled(Typography)<DateButtonLabelProps>`
  ${({ theme, selected }) => {
    if (selected) {
      return css`
        color: ${theme.color.text00()};
      `
    }
    return css`
      color: ${theme.color.text03()};
    `
  }}
`

/**
 * Gets all days for given month and year.
 */
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1)
  const days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

/**
 * Gets weekday labels for the calendar.
 * @param lang locale string
 */
const getWeekDays = (lang: string) => {
  const date = new Date('1/5/1970') // Monday Jan 5th 1970 - starting at a known Monday
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push(
      date.toLocaleString(lang, {
        weekday: 'short',
      })
    )
    date.setDate(date.getDate() + 1)
  }
  return days
}

interface DatePickerProps {
  /**
   * Current date value
   */
  readonly date: Date
  /**
   * Fires when date is changed
   */
  readonly onChange: React.Dispatch<React.SetStateAction<Date>>
  /**
   * Translation as locale string, used with javascript
   * Date object toLocaleString function.
   * Default `en`
   */
  readonly lang?: string
}

/**
 * DatePicker
 *
 * Modal component that allows users to choose
 * date, time and time zone setting
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onChange,
  lang = 'en',
}) => {
  const days = useMemo<ReadonlyArray<Date>>(
    () => getDaysInMonth(date.getFullYear(), date.getMonth()),
    [date]
  )
  const firstDayOfMonth = useMemo(
    () => (days[0].getDay() === 0 ? 6 : days[0].getDay() - 1),
    [days]
  )
  const lastDayOfMonth = useMemo<number>(
    () =>
      days[days.length - 1].getDay() === 0 ? 7 : days[days.length - 1].getDay(),
    [days]
  )
  const navigateMonth = useCallback(
    (n: number) => {
      const newDate = new Date(date)
      const checkValue = newDate.getMonth()
      newDate.setMonth(checkValue + n)
      // If changing month on last date of the month you might end up
      // in either the same month or one month ahead, step back date
      // until we have the correct month.
      while (
        newDate.getMonth() === checkValue ||
        newDate.getMonth() === checkValue + 2
      ) {
        newDate.setDate(newDate.getDate() - 1)
      }
      onChange(newDate)
    },
    [date, onChange]
  )
  const onNextMonthClick = useCallback(() => navigateMonth(1), [navigateMonth])
  const onPreviousMonthClick = useCallback(() => navigateMonth(-1), [
    navigateMonth,
  ])

  const onDateClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const newDate = new Date(date)
      newDate.setDate(Number(e.currentTarget.innerText))
      onChange(newDate)
    },
    [date, onChange]
  )
  const navigateYear = useCallback(
    (n: number) => {
      const newDate = new Date(date)
      newDate.setFullYear(newDate.getFullYear() + n)
      onChange(newDate)
    },
    [date, onChange]
  )
  const onNextYearClick = useCallback(() => navigateYear(1), [navigateYear])
  const onPreviousYearClick = useCallback(() => navigateYear(-1), [
    navigateYear,
  ])
  const weekdays = useMemo(() => getWeekDays(lang), [lang])
  return (
    <DatePickerWrapper>
      <MonthPicker>
        <IconButton
          onClick={onPreviousMonthClick}
          icon={ArrowLeftIcon}
          variant="secondary"
        />
        <MonthYearLabel variant="default-text">
          {date.toLocaleString(lang, {
            month: 'long',
          })}
        </MonthYearLabel>
        <IconButton
          onClick={onNextMonthClick}
          icon={ArrowRightIcon}
          variant="secondary"
        />
      </MonthPicker>
      <DateWrapper>
        {weekdays.map(weekday => (
          <WeekdayTypo key={weekday} variant="default-text">
            {weekday}
          </WeekdayTypo>
        ))}
      </DateWrapper>
      <DayPicker>
        {Array(firstDayOfMonth)
          .fill(0)
          .map((_, i) => (
            <DateButtonContainer key={i} />
          ))}
        {days.map(dayObj => {
          const day = dayObj.getDate()
          const selected = day === date.getDate()
          return (
            <DateButtonContainer key={day}>
              <DateButton
                key={day}
                variant={selected ? 'primary' : 'secondary'}
                onClick={onDateClick}
                accent={false}
                visibleFocus={false}
              >
                <DateButtonLabel selected={selected} variant="default-text">
                  {day.toString()}
                </DateButtonLabel>
              </DateButton>
            </DateButtonContainer>
          )
        })}
        {Array(7 - lastDayOfMonth)
          .fill(0)
          .map((_, i) => (
            <DateButtonContainer key={i} />
          ))}
      </DayPicker>
      <YearPicker>
        <IconButton
          onClick={onPreviousYearClick}
          icon={ArrowLeftIcon}
          variant="secondary"
        />
        <MonthYearLabel variant="default-text">
          {date.getFullYear().toString()}
        </MonthYearLabel>
        <IconButton
          onClick={onNextYearClick}
          icon={ArrowRightIcon}
          variant="secondary"
        />
      </YearPicker>
    </DatePickerWrapper>
  )
}
