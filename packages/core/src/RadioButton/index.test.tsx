import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import {
	PolicyIcon,
	UsersIcon,
	SecurityIcon,
} from 'practical-react-components-icons'

import {
	RadioButton,
	RadioButtonGroup,
	RadioButtonGroupOption,
	RadioIconButton,
	RadioIconGroupField,
} from '.'
import { TestRender } from '../TestUtils'

type Values = 'sunny' | 'cloudy' | 'rainy' | 'windy'

const weatherOptions: ReadonlyArray<RadioButtonGroupOption<Values>> = [
	{ value: 'sunny', label: 'Sunny' },
	{ value: 'cloudy', label: 'Cloudy' },
	{ value: 'rainy', label: 'Rainy' },
	{ value: 'windy', label: 'Windy', disabled: true },
]

describe('RadioButtons', () => {
	test('RadioButton', () => {
		const tree1 = TestRender(
			<RadioButton
				name="test"
				value={weatherOptions[0].value}
				label={weatherOptions[0].label}
				checked={false}
			/>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<RadioButton
				name="test"
				value={weatherOptions[1].value}
				label={weatherOptions[1].label}
				checked={true}
			/>
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<RadioButton
				name="test"
				value={weatherOptions[2].value}
				label={weatherOptions[2].label}
				checked={false}
				partial={true}
			/>
		)
		expect(tree3).toMatchSnapshot()

		const tree4 = TestRender(
			<RadioButton
				name="test"
				value={weatherOptions[3].value}
				label={weatherOptions[3].label}
				checked={false}
				disabled={true}
			/>
		)
		expect(tree4).toMatchSnapshot()
	})

	test('RadioButtonGroup', () => {
		const tree1 = TestRender(
			<RadioButtonGroup options={weatherOptions} value="sunny" />
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<RadioButtonGroup options={weatherOptions} value="rainy" error="test" />
		)
		expect(tree2).toMatchSnapshot()
	})

	test('RadioIconButton', () => {
		const tree1 = TestRender(
			<RadioIconButton
				name="test1"
				value="test1"
				label="Not Checked"
				icon={PolicyIcon}
				checked={false}
			/>
		)
		expect(tree1).toMatchSnapshot()

		const tree2 = TestRender(
			<RadioIconButton
				name="test2"
				value="test2"
				label="Checked"
				icon={UsersIcon}
				checked={true}
			/>
		)
		expect(tree2).toMatchSnapshot()

		const tree3 = TestRender(
			<RadioIconButton
				name="test3"
				value="test3"
				label="Disabled"
				icon={UsersIcon}
				checked={true}
				disabled={true}
			/>
		)
		expect(tree3).toMatchSnapshot()
	})

	test('RadioIconGroup', () => {
		const tree1 = TestRender(
			<RadioIconGroupField
				name="icon-group"
				label="Grouped buttons with icons"
				options={[
					{
						value: 'basicsecurity',
						label: 'Basic security',
						icon: SecurityIcon,
					},
					{
						value: 'extendedsecurity',
						label: 'Extended security',
						icon: UsersIcon,
					},
					{ value: 'firmware', label: 'Firmware', icon: PolicyIcon },
					{
						value: 'configuration',
						label: 'Configuration',
						disabled: true,
						icon: PolicyIcon,
					},
					{
						value: 'deviceusers',
						label: 'Device users',
						disabled: true,
						icon: PolicyIcon,
					},
				]}
				value=""
			/>
		)
		expect(tree1).toMatchSnapshot()
	})
})
