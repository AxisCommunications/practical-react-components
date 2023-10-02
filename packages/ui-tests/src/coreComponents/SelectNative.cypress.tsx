import React, { useState, useCallback } from 'react'

import { SelectNative } from 'practical-react-components-core'

export const meta = {
  name: 'SelectNative',
  route: '/components/SelectNative',
  menu: '',
}

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pie', label: 'Pie', disabled: true },
]

const Test = () => {
  const [selected, setSelected] = useState('')
  const handleSelect = useCallback(e => {
    setSelected(e.currentTarget.value)
  }, [])

  return (
    <SelectNative
      data-cy="selectNative"
      value={selected}
      options={options}
      onChange={handleSelect}
      placeholder="Select..."
      width="small"
    />
  )
}

export default Test
