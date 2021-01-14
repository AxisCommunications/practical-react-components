import React from 'react'

import { Typography } from 'practical-react-components-core'

export const meta = {
  name: 'Typography',
  route: '/components/Typography',
  menu: '',
}

const Test = () => (
  <>
    <Typography data-cy="chip-tag-text" variant="chip-tag-text">
      text
    </Typography>
    <Typography data-cy="explanatory-text" variant="explanatory-text">
      text
    </Typography>
    <Typography data-cy="caption" variant="caption">
      text
    </Typography>
    <Typography data-cy="navigation-group" variant="navigation-group">
      text
    </Typography>
    <Typography data-cy="navigation-label" variant="navigation-label">
      text
    </Typography>
    <Typography data-cy="card-title" variant="card-title">
      text
    </Typography>
    <Typography data-cy="group-title" variant="group-title">
      text
    </Typography>
    <Typography data-cy="column-heading" variant="column-heading">
      text
    </Typography>
    <Typography data-cy="header-title" variant="header-title">
      text
    </Typography>
    <Typography data-cy="default-text">text</Typography>
    <Typography data-cy="dialog-heading" variant="dialog-heading">
      text
    </Typography>
    <Typography data-cy="page-heading" variant="page-heading">
      text
    </Typography>
    <Typography data-cy="button-text" variant="button-text">
      text
    </Typography>
    <Typography data-cy="compact-label" variant="compact-label">
      text
    </Typography>
  </>
)

/* eslint-disable-next-line import/no-default-export */
export default Test
