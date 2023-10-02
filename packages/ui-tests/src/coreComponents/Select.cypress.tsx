import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import {
	Select,
	MultiSelect,
	SearchSelect,
} from 'practical-react-components-core'

export const meta = {
	name: 'Select',
	route: '/components/Select',
	menu: '',
}

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'pie', label: 'Pie', disabled: true },
]

const tzOptions = [
	{ value: 'Africa/Abidjan', label: 'Africa + Abidjan' },
	{ value: 'Africa/Accra', label: 'Africa + Accra' },
	{ value: 'Africa/Addis_Ababa', label: 'Africa + Addis_Ababa' },
	{ value: 'Africa/Algiers', label: 'Africa + Algiers' },
	{ value: 'Africa/Asmara', label: 'Africa + Asmara' },
	{ value: 'Africa/Asmera', label: 'Africa + Asmera' },
	{ value: 'Africa/Bamako', label: 'Africa + Bamako' },
	{ value: 'Africa/Bangui', label: 'Africa + Bangui' },
	{ value: 'Africa/Banjul', label: 'Africa + Banjul' },
	{ value: 'Africa/Bissau', label: 'Africa + Bissau' },
]

const Wrapper = styled.div`
  height: 110vh;
`

const Test = () => {
	const [selected, setSelected] = useState([])
	const handleSelect = useCallback(value => {
		setSelected(value)
	}, [])
	const [selectedValue, setSelectedValue] = useState('')

	const [searchSelectedValue, setSearchSelectedValue] = useState('')

	return (
		<Wrapper>
			<Select
				data-cy="selectTest"
				placeholder="Select..."
				width="medium"
				options={options}
				value={selectedValue}
				onChange={setSelectedValue}
			/>
			<MultiSelect
				data-cy="multiSelectTest"
				options={tzOptions}
				placeholder="Select..."
				width="full"
				value={selected}
				onChange={handleSelect}
				variant="framed"
				noOptionsLabel="No options"
			/>
			<SearchSelect
				data-cy="searchSelectTest"
				options={tzOptions}
				placeholder="Select..."
				width="medium"
				value={searchSelectedValue}
				onChange={setSearchSelectedValue}
				noOptionsLabel="No options"
			/>
		</Wrapper>
	)
}

export default Test
