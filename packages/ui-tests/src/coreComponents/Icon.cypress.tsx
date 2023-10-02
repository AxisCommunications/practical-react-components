import { Icon } from 'practical-react-components-core'
import {
  AddIcon,
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  WarningIcon,
} from 'practical-react-components-icons'

export const meta = {
  name: 'Icon',
  route: '/components/icon',
  menu: '',
}

const Test = () => (
  <>
    <Icon data-cy="small" icon={AddIcon} size="small" />
    <Icon data-cy="medium" icon={AlertIcon} size="medium" />
    <Icon data-cy="default" icon={ArrowLeftIcon} />
    <Icon data-cy="large" icon={ArrowRightIcon} size="large" />
    <Icon data-cy="extraLarge" icon={WarningIcon} size="extraLarge" />
  </>
)

export default Test
