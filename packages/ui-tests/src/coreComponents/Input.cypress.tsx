import React, { useState } from 'react'
import {
	TextInput,
	NumberInput,
	NumberInputType,
	TimeInput,
	TimeInputValues,
} from 'practical-react-components-core'

export const meta = {
	name: 'Input',
	route: '/components/Input',
	menu: '',
}

const Test = () => {
	const [textInputValue, setTextInputValue] = useState('test 1')
	const [numberInputValue, setNumberInputValue] = useState<NumberInputType>(12)
	const [timeInputValue, setTimeInputValue] = useState<TimeInputValues>({
		hour: 22,
		minute: 33,
		second: 44,
	})
	const [hour12Value, setHour12Value] = useState<TimeInputValues>({
		hour: 0,
		minute: 0,
		second: 0,
	})

	return (
		<>
			<TextInput
				data-cy="textInput"
				value={textInputValue}
				onValueChange={setTextInputValue}
				placeholder="Placeholder"
				width="small"
			/>
			<NumberInput
				data-cy="numberInput"
				value={numberInputValue}
				onValueChange={setNumberInputValue}
				placeholder="Number"
				width="small"
				min={0}
				max={17}
				maxLength={3}
			/>
			<TimeInput
				data-cy="timeInput"
				hour12={false}
				value={timeInputValue}
				onChange={setTimeInputValue}
			/>
			<TimeInput
				data-cy="timeInputHour12"
				hour12={true}
				value={hour12Value}
				onChange={setHour12Value}
			/>
		</>
	)
}

export default Test
