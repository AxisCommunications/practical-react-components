import { Paper } from 'practical-react-components-core'

export const meta = {
  name: 'Paper',
  route: '/components/Paper',
  menu: '',
}

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const Test = () => <Paper data-cy="paper">{text}</Paper>

/* eslint-disable-next-line import/no-default-export */
export default Test
