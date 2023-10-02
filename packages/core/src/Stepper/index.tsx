import {
	useState,
	useMemo,
	useCallback,
	HTMLAttributes,
	FC,
	MouseEvent,
} from 'react'
import styled from 'styled-components'

import { spacing } from '../designparams'
import { Button } from '../Button'
import { Paper } from '../Paper'
import { StepContent, StepperAction, Step, StepControls } from './Step'

const StepperWrapper = styled(Paper)`
  padding: ${spacing.large} ${spacing.extraLarge} ${spacing.large} 36px;
  box-shadow: none;
`

export { StepContent, StepperAction, StepLabel } from './Step'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>
export interface StepperProps extends BaseProps {
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * The steps passed to the stepper.
	 */
	readonly steps: ReadonlyArray<StepContent>
	/**
	 * The function that run on action button click in the last stepper step.
	 */
	readonly completeAction: StepperAction
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
}

export const Stepper: FC<StepperProps> = ({
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
		(event: MouseEvent<HTMLButtonElement>) => {
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
