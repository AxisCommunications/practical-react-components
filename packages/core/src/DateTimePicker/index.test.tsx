import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { DateTimePicker } from '.'
import {
	TimePickerAMPM,
	TimePickerTwentyFour,
	MinutePicker,
} from './TimePicker'
import { DatePicker } from './DatePicker'
import { TestRender } from '../TestUtils'

const callbackAction = {
	label: 'test',
	onClick: () => {
		/** */
	},
}
const callback = () => {
	/** */
}

describe.skip('DateTimePicker', () => {
	const date = '2019-07-15T10:25'
	test('DateTimePicker', () => {
		const tree1 = TestRender(
			<DateTimePicker
				header="Change date and time"
				open={true}
				date={date}
				onSaveAction={callbackAction}
				onCancelAction={callbackAction}
				lang="en-US"
				hour12={true}
				hour12MeridiemLabels={{ am: 'AM', pm: 'PM' }}
			/>
		)
		expect(tree1).toMatchSnapshot()
		const tree2 = TestRender(
			<DateTimePicker
				header="Change date and time"
				open={true}
				date={date}
				onSaveAction={callbackAction}
				onCancelAction={callbackAction}
				lang="en-US"
				hour12={false}
			/>
		)
		expect(tree2).toMatchSnapshot()
	})

	test('TimePickers', () => {
		const tree3 = TestRender(
			<TimePickerAMPM
				onChange={callback}
				date={new Date(date)}
				hour12MeridiemLabels={{ am: 'AM', pm: 'PM' }}
			/>
		)
		expect(tree3).toMatchSnapshot()
		const tree4 = TestRender(
			<MinutePicker onChange={callback} date={new Date(date)} />
		)
		expect(tree4).toMatchSnapshot()

		const tree5 = TestRender(
			<TimePickerTwentyFour onChange={callback} date={new Date(date)} />
		)
		expect(tree5).toMatchSnapshot()
	})

	test('DatePicker', () => {
		const tree6 = TestRender(
			<DatePicker onChange={callback} date={new Date(date)} />
		)
		expect(tree6).toMatchSnapshot()
	})
})
