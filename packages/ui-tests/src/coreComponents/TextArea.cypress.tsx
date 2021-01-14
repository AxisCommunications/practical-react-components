import React, { useCallback, useState } from 'react'
import { TextArea } from 'practical-react-components-core'

export const meta = {
  name: 'TextArea',
  route: '/components/textarea',
  menu: '',
}

const Test = () => {
  const [change, setChange] = useState('initial change')
  const onChange = useCallback(e => {
    setChange(e.target.value)
  }, [])
  const [valueChange, setValueChange] = useState('initial valueChange')

  return (
    <>
      <div id="cypress-div-change">{change}</div>
      <div id="cypress-div-valuechange">{valueChange}</div>
      <TextArea
        id="cypress-textarea-change"
        value={change}
        onChange={onChange}
      />
      <TextArea
        id="cypress-textarea-valuechange"
        value={valueChange}
        onValueChange={setValueChange}
      />
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
