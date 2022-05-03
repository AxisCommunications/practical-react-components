import { useCallback, FC } from 'react'
import 'jest-styled-components'

import {
  TextInput,
  TextInputCredentials,
  NumberInput,
  TimeInput,
  TimeInputField,
  DurationInput,
  DurationInputField,
} from '.'
import { TestRender } from '../TestUtils'

const TimeInputTestController: FC = () => {
  const onChange = useCallback(() => {
    /** */
  }, [])

  return (
    <>
      <TimeInput
        value={{ hour: 0, minute: 0, second: 0 }}
        onChange={onChange}
        compact={true}
      />
      <TimeInput
        value={{ hour: 10, minute: 0 }}
        hour12={true}
        onChange={onChange}
        readOnly={true}
        disabled={true}
        compact={true}
        hour12MeridiemLabels={{ am: 'AM', pm: 'PM' }}
      />
      <DurationInput
        value={0}
        format="mm:ss"
        onChange={onChange}
        error="MM:SS"
      />
      <DurationInput value={0} format="hh" onChange={onChange} />
      <DurationInput value={0} format="ss" onChange={onChange} />
      <TimeInputField
        label="test"
        unitLabel="MM"
        hour12={true}
        value={{ minute: 10 }}
        onChange={onChange}
      />
      <DurationInputField
        label="test"
        format="mm"
        unitLabel="MM"
        value={0}
        onChange={onChange}
      />
    </>
  )
}

describe('TextInput', () => {
  test('TextInput', () => {
    const tree1 = TestRender(<TextInput value="test" />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<TextInput value="test" />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<TextInput value="test" compact={true} />)
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(<TextInput value="test" width="small" />)
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(<TextInput value="test" width="medium" />)
    expect(tree5).toMatchSnapshot()

    const tree6 = TestRender(<TextInput value="test" width="large" />)
    expect(tree6).toMatchSnapshot()

    const tree7 = TestRender(<TextInput value="test" width="full" />)
    expect(tree7).toMatchSnapshot()

    const tree8 = TestRender(<TextInput value="test" disabled={true} />)
    expect(tree8).toMatchSnapshot()

    const tree9 = TestRender(<TextInput value="test" error="test" />)
    expect(tree9).toMatchSnapshot()
  })

  test('TextInputCredentials', () => {
    const tree1 = TestRender(
      <TextInputCredentials value="test" type="username" />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <TextInputCredentials value="test" type="new-password" />
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <TextInputCredentials value="test" type="current-password" />
    )
    expect(tree3).toMatchSnapshot()
  })

  test('NumberInput', () => {
    const tree1 = TestRender(<NumberInput value="" />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<NumberInput value={1} />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<NumberInput value={100} placeholder="Number" />)
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(<NumberInput value={100} compact={true} />)
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(<NumberInput value={100} width="small" />)
    expect(tree5).toMatchSnapshot()

    const tree6 = TestRender(<NumberInput value={100} width="medium" />)
    expect(tree6).toMatchSnapshot()

    const tree7 = TestRender(<NumberInput value={100} width="large" />)
    expect(tree7).toMatchSnapshot()

    const tree8 = TestRender(<NumberInput value={100} width="full" />)
    expect(tree8).toMatchSnapshot()

    const tree9 = TestRender(<NumberInput value={100} disabled={true} />)
    expect(tree9).toMatchSnapshot()

    const tree10 = TestRender(<NumberInput value={100} error="test" />)
    expect(tree10).toMatchSnapshot()
  })

  test('TimeInput', () => {
    const test = TestRender(<TimeInputTestController />)
    expect(test).toMatchSnapshot()
  })
})
