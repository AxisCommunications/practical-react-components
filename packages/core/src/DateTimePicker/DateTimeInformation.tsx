import React, { useMemo } from 'react'
import styled from 'styled-components'
import { spacing, iconSize } from '../designparams'
import { Typography } from '../Typography'
import { SystemDatetimeIcon, ClockIcon } from 'practical-react-components-icons'

const DateTimeInformationContainer = styled.div`
  color: ${({ theme }) => theme.color.text04()};
  fill: ${({ theme }) => theme.color.text04()};
  background-color: ${({ theme }) => theme.color.background00()};
`

const DateInfoContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 40%;
  padding-bottom: ${spacing.small};
`

const TimeIcon = styled(ClockIcon)`
  margin-right: ${spacing.medium};
`

const DatetimeIcon = styled(SystemDatetimeIcon)`
  margin-right: ${spacing.medium};
`

interface IDateTimeInformationProps {
  /**
   * Current date value as javascript Date object
   */
  readonly dateTime: Date
  /**
   * Translation as locale string, used with javascript
   * Date object toLocaleString function.
   */
  readonly lang: string
  /**
   * If `true` will show the time format in AM/PM,
   * `false` will show time in 24 hour format.
   */
  readonly hour12: boolean
}

export const DateTimeInformation: React.FC<IDateTimeInformationProps> = ({
  dateTime,
  lang,
  hour12,
}) => {
  // Some locales generate very long texts... using a shorter version for those.
  const month = useMemo(
    () => (lang === 'pt' || lang === 'es' ? 'short' : 'long'),
    [lang]
  )
  return (
    <DateTimeInformationContainer>
      <DateInfoContainer>
        <TimeIcon height={iconSize.medium} width={iconSize.medium} />
        <Typography variant="page-heading">
          {dateTime.toLocaleString(lang, {
            hour12,
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Typography>
      </DateInfoContainer>
      <DateInfoContainer>
        <DatetimeIcon height={iconSize.medium} width={iconSize.medium} />
        <Typography variant="page-heading">
          {dateTime.toLocaleString(lang, {
            year: 'numeric',
            month,
            day: 'numeric',
            weekday: 'short',
          })}
        </Typography>
      </DateInfoContainer>
    </DateTimeInformationContainer>
  )
}
