import React, { useState, useCallback } from 'react'

import {
  ToggleButtonGroup,
  ToggleButtonGroupWithField,
  Typography,
} from 'practical-react-components-core'

export const meta = {
  name: 'ToggleButtonGroup',
  route: '/components/togglebuttongroup',
  menu: '',
}

const Test = () => {
  const [values, setToggledValues] = useState([])
  const [exclusiveValue, setExclusiveValue] = useState([])

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

  const onExclusiveChange = useCallback(id => {
    setExclusiveValue([id])
  }, [])

  return (
    <>
      <ToggleButtonGroup
        data-cy="toggleButtonGroup"
        onChange={onChange}
        options={[
          {
            id: 't1',
            content: (
              <Typography>
                24{values.includes('t1') ? ' (Selected)' : ''}
              </Typography>
            ),
          },
          {
            id: 't2',
            content: (
              <Typography>
                Disabled{values.includes('t2') ? ' (Selected)' : ''}
              </Typography>
            ),
            disabled: true,
          },
        ]}
        values={values}
      />
      <ToggleButtonGroupWithField
        data-cy="toggleButtonGroupExclusive"
        label="Exclusive selection"
        onChange={onExclusiveChange}
        exclusive
        options={[
          {
            id: 'option1',
            content: (
              <Typography>
                Option 1
                {exclusiveValue.includes('option1') ? ' (Selected)' : ''}
              </Typography>
            ),
          },
          {
            id: 'option2',
            content: (
              <Typography>
                Option 2
                {exclusiveValue.includes('option2') ? ' (Selected)' : ''}
              </Typography>
            ),
          },
          {
            id: 'option3',
            content: (
              <Typography>
                Option 3
                {exclusiveValue.includes('option3') ? ' (Selected)' : ''}
              </Typography>
            ),
          },
        ]}
        values={exclusiveValue}
      />
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
