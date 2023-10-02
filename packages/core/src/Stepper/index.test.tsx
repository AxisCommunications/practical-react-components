import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { TestRender } from '../TestUtils'
import { Stepper, StepLabel } from '.'

const NOOP = () => {
	/** */
}

describe('Stepper', () => {
	test('Stepper', () => {
		const tree1 = TestRender(
			<Stepper
				steps={[
					{
						label: <StepLabel>Step 1 Title</StepLabel>,
						content: <div />,
					},
					{
						label: <StepLabel>Step 2 Title</StepLabel>,
						content: <div />,
						hasErrors: true,
					},
					{
						label: <StepLabel>Step 3 Title (done)</StepLabel>,
						content: <div />,
					},
				]}
				prevAction={{
					label: 'Back',
					onClick: NOOP,
				}}
				nextAction={{
					label: 'Next',
					onClick: NOOP,
				}}
				completeAction={{
					label: 'Install',
					onClick: NOOP,
				}}
				resetAction={{
					label: 'Reset',
					onClick: NOOP,
				}}
			/>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<Stepper
				steps={[
					{
						label: <StepLabel>Step 1 Title</StepLabel>,
						content: <div />,
					},
					{
						label: <StepLabel>Step 3 Title (done)</StepLabel>,
						content: <div />,
					},
				]}
				prevAction={{
					label: 'Back',
					onClick: NOOP,
				}}
				nextAction={{
					label: 'Next',
					onClick: NOOP,
				}}
				completeAction={{
					label: 'Install',
					onClick: NOOP,
				}}
				resetAction={{
					label: 'Reset',
					onClick: NOOP,
				}}
			/>
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<Stepper
				steps={[
					{
						label: <StepLabel>Step 1 Title</StepLabel>,
						content: <div />,
					},
				]}
				prevAction={{
					label: 'Back',
					onClick: NOOP,
				}}
				nextAction={{
					label: 'Next',
					onClick: NOOP,
				}}
				completeAction={{
					label: 'Install',
					onClick: NOOP,
				}}
				resetAction={{
					label: 'Reset',
					onClick: NOOP,
				}}
			/>
		)
		expect(tree3).toMatchSnapshot()
	})
})
