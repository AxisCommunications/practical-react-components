import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'

import { spacing } from '../designparams'
import { ButtonClickHandler, Button } from '../Button'
import { Paper } from '../Paper'
import { Step, StepControls } from './Step'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const StepperWrapper = styled(Paper)`
  padding: ${spacing.large} ${spacing.extraLarge} ${spacing.large} 36px;
  box-shadow: none;
`

export interface IStepContent extends BaseProps {
  /* Step's label */
  readonly label: string
  /* Step's content */
  readonly content: React.ReactNode
  /* Indicates whether the step has errors that should be resolved */
  readonly hasErrors?: boolean
  /* Disables next button */
  readonly disableNext?: boolean
}

export interface IStepperAction {
  /**
   * The label for the stepper button (previous, next or complete action).
   */
  readonly label: string
  /**
   * The click handler for the stepper button (previous, next or complete action).
   */
  readonly onClick?: ButtonClickHandler
}

export interface IStepperProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The steps passed to the stepper.
   */
  readonly steps: ReadonlyArray<IStepContent>
  /**
   * The function that run on action button click in the last stepper step.
   */
  readonly completeAction: IStepperAction
  /**
   * The function that runs on previous button click.
   */
  readonly prevAction: IStepperAction
  /**
   * The function that runs on next button click.
   */
  readonly nextAction: IStepperAction
  /**
   * The function that runs on reset button click.
   */
  readonly resetAction: IStepperAction
}

export const Stepper: React.FC<IStepperProps> = ({
  steps,
  completeAction,
  prevAction,
  nextAction,
  resetAction,
  ...props
}) => {
  const [currentStep, setCurrentStep] = useState<Readonly<number>>(0)
  const [completedSteps, setCompletedSteps] = useState<ReadonlyArray<number>>(
    []
  )
  const hasAnyErrors = useMemo(
    () => steps.some(({ hasErrors }) => hasErrors === true),
    [steps]
  )
  const onResetButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCompletedSteps([])
      setCurrentStep(0)

      if (resetAction.onClick !== undefined) {
        resetAction.onClick(event)
      }
    },
    [resetAction]
  )

  return (
    <StepperWrapper square={true} {...props}>
      {steps.map(({ content, ...rest }, index) => (
        <Step
          key={index}
          hasAnyErrors={hasAnyErrors}
          currentStep={currentStep}
          numberOfSteps={steps.length}
          stepId={index}
          setCurrentStep={setCurrentStep}
          completedSteps={completedSteps}
          setCompletedSteps={setCompletedSteps}
          completeAction={completeAction}
          prevAction={prevAction}
          nextAction={nextAction}
          resetAction={resetAction}
          {...rest}
        >
          {content}
        </Step>
      ))}
      {currentStep === -1 ? (
        <StepControls>
          <Button
            onClick={onResetButtonClick}
            variant="secondary"
            label={resetAction.label}
          />
        </StepControls>
      ) : null}
    </StepperWrapper>
  )
}
