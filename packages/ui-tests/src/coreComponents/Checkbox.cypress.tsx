import React, { useState } from 'react'

import { Checkbox } from 'practical-react-components-core'

export const meta = {
	name: 'Checkbox',
	route: '/components/Checkbox',
	menu: '',
}

const Test = () => {
	const [checked, setChecked] = useState(true)

	return (
		<Checkbox
			id="cypress-checkbox"
			checked={checked}
			onCheckedValueChange={setChecked}
		/>
	)
}

export default Test
