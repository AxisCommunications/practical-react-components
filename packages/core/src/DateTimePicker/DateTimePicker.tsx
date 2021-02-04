import React, { useState, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import {
  SystemDatetimeIcon,
  ClockMinuteIcon,
  ClockHourIcon,
} from 'practical-react-components-icons'

import { spacing } from '../designparams'
import { DateTimeInformation } from './DateTimeInformation'
import {
  TimePickerTwentyFour,
  TimePickerAMPM,
  MinutePicker,
} from './TimePicker'
import { DatePicker } from './DatePicker'
import { Typography } from '../Typography'
import { Modal, ModalProps } from '../Modal'
import { Button } from '../Button'
import { ToggleButtonGroup } from '../ToggleButtonGroup'
import { Paper } from '../Paper'
import { Icon } from '../Icon'
import { TranslationMeridiem } from './types'

export enum DateTimeTabs {
  'TwentyFour' = '24',
  'AMPM' = 'AM/PM',
  'Min' = 'Min',
  'Date' = 'Date',
}

const TitleContainer = styled.div`
  color: ${({ theme }) => theme.color.text04()};
  fill: ${({ theme }) => theme.color.text04()};
`

const InformationContainer = styled.div`
  padding: ${spacing.large} ${spacing.extraLarge};
  border-bottom: 1px solid ${({ theme }) => theme.color.background01()};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: ${spacing.large} ${spacing.extraLarge};
`

const FooterContainer = styled.div`
  padding: 0 ${spacing.large} ${spacing.extraLarge};
  display: flex;
  flex-direction: row-reverse;
  > :last-child {
    margin-right: ${spacing.medium};
  }
`

const StyledPaper = styled(Paper)`
  width: 360px;
  height: 688px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export interface SaveDateAction {
  readonly label: string
  readonly onClick: (dateTime: string) => void
}

export interface CloseDateAction {
  readonly label: string
  readonly onClick: () => void
}

export interface DateTimePickerProps extends ModalProps {
  /**
   * If `true` the date time picker dialog is shown.
   */
  readonly open: boolean
  /**
   * Current date value as ISO date format.
   */
  readonly date: string
  /**
   * Header label of date time dialog.
   */
  readonly header: string
  /**
   * Label for the cancel button and a
   * function that fires when user clicks cancel button.
   */
  readonly onCancelAction: CloseDateAction
  /**
   * Label for the save button and a
   * function that fires when user clicks save button
   * @param dateTime Date string in ISO date format
   */
  readonly onSaveAction: SaveDateAction
  /**
   * Translation as locale string, used with javascript
   * Date object toLocaleString function.
   * Default `en`
   */
  readonly lang?: string
  /**
   * If `true` will show and set the time in AM/PM format,
   * `false` will show and set time in 24 hour format.
   */
  readonly hour12: boolean
  /**
   * Sets which tab the dialog should start at.
   * Use DateTimeTabs enum to set.
   * Default `AMPM` or `TwentyFour`
   */
  readonly initialTab?: DateTimeTabs
  /**
   * AM/PM translation labels
   *
   * Default `AM` and `PM`
   */
  readonly hour12MeridiemLabels?: TranslationMeridiem
}

/**
 * DateTimePicker
 *
 * Dialog that can be used for date, time and time zone settings.
 */
export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  open,
  date,
  lang = 'en',
  header,
  onCancelAction,
  onSaveAction,
  hour12,
  initialTab,
  hour12MeridiemLabels = { am: 'AM', pm: 'PM' },
  ...modalProps
}) => {
  const [dateTime, setDateTime] = useState<Date>(new Date(date))

  useEffect(() => setDateTime(new Date(date)), [date])

  const [selectedTab, setSelectedTab] = useState<DateTimeTabs>(() => {
    if (initialTab !== undefined && initialTab in DateTimeTabs) {
      return initialTab
    }
    return hour12 ? DateTimeTabs.AMPM : DateTimeTabs.TwentyFour
  })

  const onSaveClick = useCallback(
    () => onSaveAction.onClick(dateTime.toISOString()),
    [dateTime, onSaveAction]
  )
  const onCancelClick = useCallback(() => {
    onCancelAction.onClick()
    setDateTime(new Date(date))
  }, [date, onCancelAction])

  const toggleButtonOptions = useMemo(
    () => [
      {
        id: hour12 ? DateTimeTabs.AMPM : DateTimeTabs.TwentyFour,
        content: <Icon icon={ClockHourIcon} />,
      },
      {
        id: DateTimeTabs.Min,
        content: <Icon icon={ClockMinuteIcon} />,
      },
      {
        id: DateTimeTabs.Date,
        content: <Icon icon={SystemDatetimeIcon} />,
      },
    ],
    [hour12]
  )
  return (
    <Modal
      open={open}
      onClose={onCancelClick}
      verticallyCenter={true}
      {...modalProps}
    >
      <StyledPaper>
        <InformationContainer>
          <TitleContainer>
            <Typography variant="dialog-heading">{header}</Typography>
          </TitleContainer>
        </InformationContainer>
        <InformationContainer>
          <DateTimeInformation
            dateTime={dateTime}
            lang={lang}
            hour12={hour12}
          />
        </InformationContainer>

        <ContentContainer>
          <ToggleButtonGroup
            onChange={setSelectedTab}
            options={toggleButtonOptions}
            values={[selectedTab]}
          />
          {selectedTab === DateTimeTabs.TwentyFour ? (
            <TimePickerTwentyFour onChange={setDateTime} date={dateTime} />
          ) : null}
          {selectedTab === DateTimeTabs.Min ? (
            <MinutePicker onChange={setDateTime} date={dateTime} />
          ) : null}
          {selectedTab === DateTimeTabs.AMPM ? (
            <TimePickerAMPM
              onChange={setDateTime}
              date={dateTime}
              hour12MeridiemLabels={hour12MeridiemLabels}
            />
          ) : null}
          {selectedTab === DateTimeTabs.Date ? (
            <DatePicker lang={lang} onChange={setDateTime} date={dateTime} />
          ) : null}
        </ContentContainer>

        <FooterContainer>
          <Button
            onClick={onSaveClick}
            label={onSaveAction.label}
            variant="primary"
          />
          <Button
            onClick={onCancelClick}
            label={onCancelAction.label}
            variant="secondary"
          />
        </FooterContainer>
      </StyledPaper>
    </Modal>
  )
}
