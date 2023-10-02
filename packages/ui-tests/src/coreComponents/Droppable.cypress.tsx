import React, { useState, useCallback } from 'react'

import { Droppable } from 'practical-react-components-core'

export const meta = {
	name: 'Droppable',
	route: '/components/Droppable',
	menu: '',
}

const Test = () => {
	const [selectedFile, setsetSelectedFile] = useState(null)
	const hasSelectedFile = selectedFile !== null
	const supportedFormats = hasSelectedFile
		? undefined
		: '(*.eap, *.zip, *.opk.tar.gz, *.svg)'
	const onFileChange = useCallback(file => {
		if (file === undefined) {
			return
		}
		setsetSelectedFile(file)
	}, [])
	return (
		<Droppable
			data-cy="droppable"
			inputLabel="Click to browse or drag it here."
			supportedFormats={supportedFormats}
			selectedFileName={hasSelectedFile ? selectedFile.name : undefined}
			onFileChange={onFileChange}
		/>
	)
}

export default Test
