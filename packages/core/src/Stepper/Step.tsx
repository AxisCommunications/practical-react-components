import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { CheckIcon, WarningIcon } from 'practical-react-components-icons'

import { Typography } from '../Typography'
import { Button, ButtonClickHandler } from '../Button'
import { font } from '../theme'
import { shape, spacing } from '../designparams'

export interface StepperAction {
  /**
   * The label for the stepper button (previous, next or complete action).
   */
  readonly label: string
  /**
   * The click handler for the stepper button (previous, next or complete action).
   */
  readonly onClick?: ButtonClickHandler
}

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

export interface StepContent extends BaseProps {
  /* Step's label */
  readonly label: string
  /* Step's content */
  readonly content: React.ReactNode
  /* Indicates whether the step has errors that should be resolved */
  readonly hasErrors?: boolean
  /* Disables next button */
  readonly disableNext?: boolean
}

const StepWrapper = styled.div`
  font-size: ${font.size.regular};
  font-weight: ${font.fontWeight.normal};
  padding-top: ${spacing.extraLarge};
`

const StepNumber = styled.span<{
  readonly active: boolean
  readonly completed: boolean
  readonly hasErrors?: boolean
}>`
  align-items: center;

  ${({ active, theme, completed, hasErrors }) => {
    if (active || (completed && hasErrors !== true)) {
      return css`
        background-color: ${() => theme.color.elementPrimary()};
      `
    }

    if (completed && hasErrors === true) {
      return css`
        background-color: ${() => theme.color.elementError()};
      `
    }

    return css`
      background-color: ${() => theme.color.element14()};
    `
  }}

  border-radius: ${shape.radius.circle};
  color: ${({ theme }) => theme.color.text00()};
  cursor: pointer;
  display: flex;
  fill: ${({ theme }) => theme.color.text00()};
  font-size: ${font.size.small};
  height: 20px;
  justify-content: center;
  left: -12px;
  line-height: ${font.lineHeight.large};
  position: absolute;
  text-align: center;
  top: 0;
  width: 20px;
`

const StepDivider = styled.span<{
  readonly active: boolean
  readonly completed: boolean
}>`
  ${({ active }) =>
    active
      ? css`
          height: calc(100% - 24px);
        `
      : css`
          height: 8px;
        `}
  top: 22px;
  width: 1px;
  position: absolute;
  ${({ active, theme, completed }) =>
    active || completed
      ? css`
          background-color: ${() => theme.color.elementPrimary()};
        `
      : css`
          background-color: ${() => theme.color.element14()};
        `}
  left: -2px;
`

const StepHeader = styled.div`
  position: relative;
  margin-top: -${spacing.large};
`

const StepLabel = styled(Typography)<{
  readonly active: boolean
  readonly completed: boolean
}>`
  align-items: center;

  ${({ active, completed, theme }) =>
    !active && !completed
      ? css`
          color: ${() => theme.color.text05()};
        `
      : css`
          font-weight: ${theme.font.fontWeight.semibold};
        `}

  display: flex;
  min-height: 24px;
  padding-left: 18px;
`

const StepContentContainer = styled.div`
  padding: ${spacing.medium} 0 ${spacing.huge} 20px;
`

export const StepControls = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: ${spacing.medium};
  padding: ${spacing.small} 0 20px 20px;
`

const StepContentWrapper = styled.div<{
  readonly lastStep: boolean
}>`
  position: relative;
  min-height: 32px;
  margin-bottom: -8px;
`

interface StepProps extends Omit<StepContent, 'content'> {
  /**
   * The function that run on action button click in the last stepper step.
   */
  readonly completeAction?: StepperAction
  /**
   * The function that runs on previous button click.
   */
  readonly prevAction: StepperAction
  /**
   * The function that runs on next button click.
   */
  readonly nextAction: StepperAction
  /**
   * The function that runs on reset button click.
   */
  readonly resetAction: StepperAction
  /* Step's content */
  readonly children: React.ReactNode
  /* Current step's ID */
  readonly currentStep: number
  /* Step's ID */
  readonly stepId: number
  /* Function that updates current step's ID */
  readonly setCurrentStep: (step: number) => void
  /* An array of completed step IDs */
  readonly completedSteps: ReadonlyArray<number>
  /* Function that updates completed steps list */
  readonly setCompletedSteps: (steps: ReadonlyArray<number>) => void
  /* Number of steps in the stepper */
  readonly numberOfSteps: number
  /* Indicates whether any step has errors that should be resolved */
  readonly hasAnyErrors: boolean
  /* Disables next button */
  readonly disableNext?: boolean
}

export const Step: React.FC<StepProps> = ({
  children,
  label,
  hasErrors,
  hasAnyErrors,
  currentStep,
  stepId,
  setCurrentStep,
  completedSteps,
  setCompletedSteps,
  numberOfSteps,
  completeAction,
  nextAction,
  prevAction,
  disableNext,
  ...props
}) => {
  const active = currentStep === stepId
  const completed = completedSteps.includes(stepId)
  const lastStep = stepId === numberOfSteps - 1
  const onBackButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const prevStep = stepId - 1

      setCompletedSteps(
        completedSteps.filter(s => s !== prevStep && s !== stepId)
      )
      setCurrentStep(prevStep)

      if (prevAction.onClick !== undefined) {
        prevAction.onClick(event)
      }
    },
    [completedSteps, prevAction, setCompletedSteps, setCurrentStep, stepId]
  )
  const onNextButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCompletedSteps([...completedSteps, stepId])
      setCurrentStep(stepId + 1)

      if (nextAction.onClick !== undefined) {
        nextAction.onClick(event)
      }
    },
    [completedSteps, nextAction, setCompletedSteps, setCurrentStep, stepId]
  )
  const onCompleteButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCompletedSteps(Array.from(Array(numberOfSteps).keys()))

      if (!hasAnyErrors) {
        setCurrentStep(-1)
      }

      if (completeAction?.onClick !== undefined) {
        completeAction.onClick(event)
      }
    },
    [
      setCompletedSteps,
      numberOfSteps,
      hasAnyErrors,
      completeAction,
      setCurrentStep,
    ]
  )
  const onStepNumberClick = useCallback(
    () => setCurrentStep(stepId),
    [setCurrentStep, stepId]
  )

  return (
    <StepWrapper {...props}>
      <StepHeader>
        <StepNumber
          active={active}
          completed={completed}
          hasErrors={hasErrors}
          onClick={onStepNumberClick}
        >
          {completed && hasErrors !== true ? <CheckIcon /> : null}
          {completed && hasErrors === true ? <WarningIcon /> : null}
          {!completed ? (
            <Typography variant="default-text">{stepId + 1}</Typography>
          ) : null}
        </StepNumber>
      </StepHeader>
      <StepContentWrapper lastStep={lastStep}>
        {lastStep ? null : (
          <StepDivider active={active} completed={completed} />
        )}
        <StepLabel variant="default-text" active={active} completed={completed}>
          {label}
        </StepLabel>
        {active ? (
          <StepContentContainer>{children}</StepContentContainer>
        ) : null}
        {active ? (
          <StepControls>
            {currentStep > 0 ? (
              <Button
                onClick={onBackButtonClick}
                variant="secondary"
                label={prevAction.label}
              />
            ) : null}
            {lastStep ? null : (
              <Button
                onClick={onNextButtonClick}
                label={nextAction.label}
                disabled={disableNext}
              />
            )}
            {lastStep && completeAction !== undefined ? (
              <Button
                onClick={onCompleteButtonClick}
                label={completeAction.label}
              />
            ) : null}
          </StepControls>
        ) : null}
      </StepContentWrapper>
    </StepWrapper>
  )
}
