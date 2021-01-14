import React from 'react'

import { InfoIcon } from 'practical-react-components-icons'
import { Note } from 'practical-react-components-core'

export const meta = {
  name: 'Note',
  route: '/components/Note',
  menu: '',
}

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const Test = () => <Note data-cy="note" text={text} icon={InfoIcon} />

/* eslint-disable-next-line import/no-default-export */
export default Test
