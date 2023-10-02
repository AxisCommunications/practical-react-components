import React, { useState, useCallback } from 'react'

import { CloseIcon } from 'practical-react-components-icons'
import { IconButton, Typography, Link } from 'practical-react-components-core'

export const meta = {
  name: 'Link',
  route: '/components/Link',
  menu: '',
}

const Test = () => {
  const [showMessage, setShowMessage] = useState(false)

  const OnShowMessage = useCallback(() => {
    setShowMessage(true)
  }, [setShowMessage])

  const onCloseMessage = useCallback(() => {
    setShowMessage(false)
  }, [setShowMessage])

  return (
    <>
      <Typography>
        <Link
          data-cy="link-a"
          variant="a"
          href="http://example.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          a link
        </Link>{' '}
        to example.org
      </Typography>
      <Typography>
        <Link data-cy="link-button" variant="button" onClick={OnShowMessage}>
          button link
        </Link>{' '}
        to show a message
      </Typography>
      {showMessage ? (
        <>
          <Typography data-cy="message">Clicked</Typography>
          <IconButton
            data-cy="close-button"
            icon={CloseIcon}
            variant="secondary"
            onClick={onCloseMessage}
          />
        </>
      ) : null}
    </>
  )
}

export default Test
