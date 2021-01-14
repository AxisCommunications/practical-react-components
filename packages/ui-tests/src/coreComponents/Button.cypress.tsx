import React from 'react'
import { AddIcon } from 'practical-react-components-icons'
/* eslint-disable-next-line node/no-extraneous-import */
import { Button, IconButton } from 'practical-react-components-core'

export const meta = {
  name: 'Button',
  route: '/components/button',
  menu: '',
}

const NOOP = () => {
  /* */
}

const Test = () => (
  <>
    <Button data-cy="buttonTest1" label="Primary" onClick={NOOP} />
    <Button
      data-cy="buttonTest2"
      label="Secondary"
      onClick={NOOP}
      variant="secondary"
    />
    <IconButton data-cy="buttonTest3" icon={AddIcon} onClick={NOOP} />
    <IconButton
      data-cy="buttonTest4"
      icon={AddIcon}
      onClick={NOOP}
      variant="secondary"
    />
  </>
)

/* eslint-disable-next-line import/no-default-export */
export default Test
