import React, { useState, useCallback } from 'react'
/* eslint-disable-next-line node/no-extraneous-import */
import { ToggleButtonGroup, Typography } from 'practical-react-components-core'

export const meta = {
  name: 'ToggleButtonGroup',
  route: '/components/togglebuttongroup',
  menu: '',
}

const Test = () => {
  const [values, setToggledValues] = useState([])
  const onChange = useCallback(
    id => {
      const found = values.includes(id)
      if (found) {
        setToggledValues(values.filter(v => v !== id))
      } else {
        setToggledValues([...values, id])
      }
    },
    [values]
  )

  return (
    <ToggleButtonGroup
      data-cy="toggleButtonGroup"
      onChange={onChange}
      options={[
        {
          id: 't1',
          content: <Typography>24</Typography>,
        },
        {
          id: 't2',
          content: <Typography>Disabled</Typography>,
          disabled: true,
        },
      ]}
      values={values}
    />
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
