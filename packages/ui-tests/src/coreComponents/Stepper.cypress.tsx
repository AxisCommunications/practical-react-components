import {
	Stepper,
	TextInputField,
	Typography,
} from 'practical-react-components-core'

export const meta = {
	name: 'Stepper',
	route: '/components/Stepper',
	menu: '',
}

const Test = () => (
	<Stepper
		data-cy="stepper"
		steps={[
			{
				label: 'Step 1 Title',
				content: (
					<TextInputField
						label="Name"
						value="First"
						placeholder="First name"
						data-cy="firstName"
					/>
				),
				className: 'stepper-step1',
			},
			{
				label: 'Step 2 Title',
				content: (
					<TextInputField
						label="Name"
						value="Second"
						placeholder="Second name"
						data-cy="secondName"
					/>
				),
				className: 'stepper-step2',
			},
			{
				label: 'Step 3 Title (done)',
				content: (
					<Typography
						className="stepper-last-step-message"
						variant="navigation-label"
					>
						You are now done
					</Typography>
				),
				className: 'stepper-step3',
			},
		]}
		prevAction={{
			label: 'Back',
		}}
		nextAction={{
			label: 'Next',
		}}
		completeAction={{
			label: 'Install',
		}}
		resetAction={{
			label: 'Reset',
		}}
	/>
)

export default Test
