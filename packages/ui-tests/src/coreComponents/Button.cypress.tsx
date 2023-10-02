import { AddIcon } from 'practical-react-components-icons'

import {
  Button,
  IconButton,
  IconTextButton,
} from 'practical-react-components-core'

export const meta = {
  name: 'Button',
  route: '/components/button',
  menu: '',
}

const NOOP = () => {
  /* */
}
const testOnclick = () => {
  alert('Click works!')
}
const Test = () => (
  <div style={{ display: 'inline-flex' }}>
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
    <IconTextButton data-cy="buttonTest5" label="Secondary" icon={AddIcon} />

    <IconTextButton
      data-cy="buttonTest6"
      label="Secondary"
      icon={AddIcon}
      onClick={testOnclick}
    />
  </div>
)

export default Test
