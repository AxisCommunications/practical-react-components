import React, { useState, useCallback } from 'react'

import { DateTimePicker, Button } from 'practical-react-components-core'

export const meta = {
	name: 'DateTimePicker',
	route: '/components/datetimepicker',
	menu: '',
}

const Test = () => {
	const [value, setValue] = useState('no result')
	const [open, setOpen] = useState(false)
	const toggle = useCallback(() => setOpen(prevState => !prevState), [setOpen])
	const date = '2019-07-15T10:25'

	const cancelCallbackAction = {
		label: 'Close',
		onClick: () => {
			setOpen(false)
		},
	}

	return (
		<>
			<Button
				data-cy="openButton"
				label="Change date and time"
				variant="primary"
				onClick={toggle}
			/>
			<DateTimePicker
				data-cy="dateTimePickerTest"
				header="Change date and time"
				open={open}
				date={date}
				onSaveAction={{
					label: 'Save',
					onClick: dateTime => {
						setValue(dateTime)
						setOpen(false)
					},
				}}
				onCancelAction={cancelCallbackAction}
				lang="en-US"
				hour12={true}
				hour12MeridiemLabels={{ am: 'AM', pm: 'PM' }}
			/>
			<div>{value}</div>
		</>
	)
}

export default Test
