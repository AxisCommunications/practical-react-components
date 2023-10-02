import React, { useState, useCallback } from 'react'

import {
  SecurityIcon,
  UsersIcon,
  PolicyIcon,
} from 'practical-react-components-icons'
import { RadioButton, RadioIconGroup } from 'practical-react-components-core'

export const meta = {
  name: 'RadioButton',
  route: '/components/RadioButton',
  menu: '',
}

const securityOptions = [
  { value: 'basicsecurity', label: 'Basic security', icon: SecurityIcon },
  { value: 'extendedsecurity', label: 'Extended security', icon: UsersIcon },
  { value: 'firmware', label: 'Firmware', icon: PolicyIcon },
]

const Test = () => {
  const [selected, setSelected] = useState('')
  const handleSelect = useCallback(value => {
    setSelected(value)
  }, [])

  const [iconSelected, setIconSelected] = useState('')
  const handleIconSelect = useCallback(
    value => {
      setIconSelected(value)
    },
    [setIconSelected]
  )

  return (
    <>
      <RadioButton
        data-cy="radioOne"
        name={name}
        value="one"
        label="One"
        checked={selected === 'one'}
        onValueChange={handleSelect}
      />
      <RadioButton
        data-cy="radioTwo"
        name={name}
        value="two"
        label="Two"
        checked={selected === 'two'}
        onValueChange={handleSelect}
      />
      <RadioIconGroup
        data-cy="radioIconGroup"
        name="icon-group"
        options={securityOptions}
        value={iconSelected}
        onValueChange={handleIconSelect}
      />
    </>
  )
}

export default Test
