import { Chip } from 'practical-react-components-core'

export const meta = {
  name: 'Chip',
  route: '/components/Chip',
  menu: '',
}

const Test = () => (
  <>
    <Chip data-cy="chip" text="Default chip" />
    <Chip data-cy="chip-error" text="Error chip" error={true} />
  </>
)

// eslint-disable-next-line import/no-default-export
export default Test
