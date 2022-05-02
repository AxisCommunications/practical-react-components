import { useMemo, FC } from 'react'
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

interface DateTimeInformationProps {
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

export const DateTimeInformation: FC<DateTimeInformationProps> = ({
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
            hour: 'numeric',
            minute: 'numeric',
            /**
             * There is an issue with displaying midnight as 0 or 24.
             * If hour12 is specified, even as false, it defaults
             * to hourCycle 'h24'. Not using hour12 if it's false and specifying h23
             * resolves the issue. The issue exists on chrome-based browsers.
             *
             * More information regarding the issue can be found here:
             * https://github.com/tc39/ecma402/pull/436
             *
             * Information regarding hourCycle can be found here:
             * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle
             */
            ...(hour12 ? { hour12 } : { hourCycle: 'h23' }),
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
