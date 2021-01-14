import React, { useState } from 'react'

import { Switch } from 'practical-react-components-core'

export const meta = {
  name: 'Switch',
  route: '/components/Switch',
  menu: '',
}

const Test = () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Switch id="cypress-switch" checked={value} onValueChange={setValue} />
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
