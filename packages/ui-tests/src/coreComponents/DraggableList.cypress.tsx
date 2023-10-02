import React, { useState, useCallback } from 'react'

import {
	DraggableList,
	DraggableListItem,
	Typography,
} from 'practical-react-components-core'

export const meta = {
	name: 'DraggableList',
	route: '/components/DraggableList',
	menu: '',
}

const Test = () => {
	const [state, setState] = useState([0, 1, 2, 3, 4])
	const handleChange = useCallback(
		nextIndices => {
			setState(nextIndices.map(index => state[index]))
		},
		[setState, state]
	)

	return (
		<DraggableList onChange={handleChange} data-cy="draggableList">
			{state.map((item, index) => (
				<DraggableListItem key={index} disabled={item === 3}>
					<Typography>{item}</Typography>
				</DraggableListItem>
			))}
		</DraggableList>
	)
}

export default Test
