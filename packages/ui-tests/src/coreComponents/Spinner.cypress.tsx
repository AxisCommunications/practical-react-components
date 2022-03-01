import { Spinner } from 'practical-react-components-core'

export const meta = {
  name: 'Spinner',
  route: '/components/Spinner',
  menu: '',
}

const Test = () => (
  <>
    <Spinner data-cy="spinner" />
    <Spinner data-cy="spinnertype" type="dashed" />
    <Spinner data-cy="spinnerlabel" label="label" />
  </>
)

/* eslint-disable-next-line import/no-default-export */
export default Test
