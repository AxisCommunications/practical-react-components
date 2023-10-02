import {
  Card,
  CardHeader,
  CardHeaderTypography,
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
    <CardHeader>
      <CardHeaderTypography>Card header</CardHeaderTypography>
    </CardHeader>
    <CardContent>
      <Typography>Card content</Typography>
    </CardContent>
    <CardFooter>
      <Button onClick={NOOP} label="Action 1" />
    </CardFooter>
  </Card>
)

export default Test
