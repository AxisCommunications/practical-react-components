import React, { useState, useCallback } from 'react'
/* eslint-disable-next-line node/no-extraneous-import */
import { Button, Slider } from 'practical-react-components-core'

export const meta = {
  name: 'Slider',
  route: '/components/Slider',
  menu: '',
}

const Test = () => {
  const [value, setValue] = useState(0)

  const addValue = useCallback(() => {
    if (value < 100) {
      setValue(value + 20)
    }
    if (value === 100) {
      setValue(0)
    }
  }, [value, setValue])

  return (
    <>
      <Button data-cy="sliderButton" label="Add value" onClick={addValue} />
      <Slider data-cy="slider" value={value} handleChange={setValue} />
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
