import React from 'react'

import { Button, Modal } from 'practical-react-components-core'
import { useBoolean } from 'react-hooks-shareable'

export const meta = {
  name: 'Modal',
  route: '/components/modal',
  menu: '',
}

const Test = () => {
  const [open, setOpen, unsetOpen] = useBoolean(false)

  return (
    <>
      <Button
        data-cy="openModal"
        label="Open modal"
        onClick={setOpen}
        variant="primary"
      />
      <Modal
        open={open}
        onClose={unsetOpen}
        focusDialog={true}
        data-cy="my-modal"
      >
        <Button
          data-cy="closeModal"
          label="Close modal"
          onClick={unsetOpen}
          variant="primary"
        />
      </Modal>
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
