import React, { useCallback } from 'react'

import { FilePicker } from 'practical-react-components-core'

export const meta = {
  name: 'FilePicker',
  route: '/components/FilePicker',
  menu: '',
}

const Test = () => {
  const onFileChange = useCallback(file => console.log(file), [])
  return (
    <FilePicker
      data-cy="filePicker"
      onFileChange={onFileChange}
      label="Choose file"
    />
  )
}

// eslint-disable-next-line import/no-default-export
export default Test
