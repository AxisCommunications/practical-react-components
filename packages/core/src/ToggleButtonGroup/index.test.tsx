import { useState, useCallback, VFC } from 'react'
import { LocationIcon, CalendarIcon } from 'practical-react-components-icons'
import 'jest-styled-components'

import { ToggleButtonGroup, ToggleButtonGroupWithField } from '.'
import { TestRender } from '../TestUtils'
import { Typography } from '../Typography'
import { Icon } from '../Icon'

const TestController: VFC = () => {
  const [values, setToggledValues] = useState(['24'])
  const onChange = useCallback(
    id => {
      const found = values.includes(id)
      if (found) {
        setToggledValues(values.filter(v => v !== id))
      } else {
        setToggledValues([...values, id])
      }
    },
    [values]
  )
  return (
    <ToggleButtonGroup
      onChange={onChange}
      options={[
        {
          id: '24',
          content: <Typography variant="default-text">24</Typography>,
        },
        { id: 'location', content: <Icon icon={LocationIcon} /> },
        {
          id: 'disabled',
          content: <Typography variant="default-text">Disabled</Typography>,
          disabled: true,
        },
      ]}
      values={values}
    />
  )
}

const TestControllerWithField: VFC = () => {
  const [values, setToggledValues] = useState(['24'])
  const onChange = useCallback(
    id => {
      const found = values.includes(id)
      if (found) {
        setToggledValues(values.filter(v => v !== id))
      } else {
        setToggledValues([...values, id])
      }
    },
    [values]
  )
  return (
    <ToggleButtonGroupWithField
      label="Togglebutton test"
      onChange={onChange}
      options={[
        {
          id: 'btn',
          content: <Typography variant="default-text">click me</Typography>,
        },
        {
          id: 'calendar',
          content: <Icon icon={CalendarIcon} />,
        },
        {
          id: 'test',
          content: <Typography variant="default-text">test</Typography>,
        },
      ]}
      values={values}
    />
  )
}

const TestControlledWithFieldExclusive: VFC = () => {
  const [exclusiveValue, setExclusiveValue] = useState([])

  const onExclusiveChange = useCallback(id => {
    setExclusiveValue([id])
  }, [])

  return (
    <ToggleButtonGroupWithField
      data-cy="toggleButtonGroupExclusive"
      label="Exclusive selection"
      onChange={onExclusiveChange}
      exclusive
      options={[
        {
          id: 'option1',
          content: <Typography>Option 1</Typography>,
        },
        {
          id: 'option2',
          content: <Typography>Option 2</Typography>,
        },
        {
          id: 'option3',
          content: <Typography>Option 3</Typography>,
        },
      ]}
      values={exclusiveValue}
    />
  )
}

describe('ToggleButtonGroup', () => {
  test('ToggleButtonGroup', () => {
    const test = TestRender(<TestController />)
    expect(test).toMatchSnapshot()
  })
  test('ToggleButtonGroupWithField', () => {
    const test = TestRender(<TestControllerWithField />)
    expect(test).toMatchSnapshot()
  })
  test('ToggleButtonGroupWithFieldExclusive', () => {
    const test = TestRender(<TestControlledWithFieldExclusive />)
    expect(test).toMatchSnapshot()
  })
})
