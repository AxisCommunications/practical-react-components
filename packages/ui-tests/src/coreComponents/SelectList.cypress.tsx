import React, { useState } from 'react'
import { SelectList } from 'practical-react-components-core'
import { timezonesList } from '../fixtures/lists'

export const meta = {
  name: 'SelectList',
  route: '/components/SelectList',
  menu: '',
}

const timeZones = timezonesList.map(timezone => ({
  label: timezone,
  value: timezone,
}))

const Test = () => {
  const [selectedValue, setSelectedValue] = useState('Europe/Stockholm')
  return (
    <SelectList
      data-cy="selectList"
      onSelect={setSelectedValue}
      options={timeZones}
      value={selectedValue}
    />
  )
}
export default Test
