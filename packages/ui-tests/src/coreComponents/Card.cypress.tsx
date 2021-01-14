import React from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Typography,
  Button,
} from 'practical-react-components-core'

export const meta = {
  name: 'Card',
  route: '/components/Card',
  menu: '',
}

const NOOP = () => {
  /** */
}

const Test = () => (
  <Card data-cy="card">
    <CardHeader header="Card header" />
    <CardContent>
      <Typography>Card content</Typography>
    </CardContent>
    <CardFooter>
      <Button onClick={NOOP} label="Action 1" />
    </CardFooter>
  </Card>
)

// eslint-disable-next-line import/no-default-export
export default Test
