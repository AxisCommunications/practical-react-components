import React, { useCallback, useState } from 'react'

import { Button, Progress } from 'practical-react-components-core'

export const meta = {
	name: 'Progress',
	route: '/components/Progress',
	menu: '',
}

const Test = () => {
	const [value, setValue] = useState(0)

	const updateProgress = useCallback(() => {
		if (value < 1) {
			setValue(Number((value + 0.25).toFixed(2)))
		}
	}, [value, setValue])

	return (
		<>
			<Progress data-cy="progress" value={value} label="Progress" />
			<Button
				data-cy="progressButton"
				label="Click me"
				onClick={updateProgress}
			/>
		</>
	)
}

export default Test
