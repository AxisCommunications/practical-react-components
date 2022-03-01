import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { TestRender } from '../TestUtils'
import { Stepper } from '.'

const NOOP = () => {
  /** */
}

describe('Stepper', () => {
  test('Stepper', () => {
    const tree1 = TestRender(
      <Stepper
        steps={[
          {
            label: 'Step 1 Title',
            content: <div />,
          },
          {
            label: 'Step 2 Title',
            content: <div />,
            hasErrors: true,
          },
          {
            label: 'Step 3 Title (done)',
            content: <div />,
          },
        ]}
        prevAction={{
          label: 'Back',
          onClick: NOOP,
        }}
        nextAction={{
          label: 'Next',
          onClick: NOOP,
        }}
        completeAction={{
          label: 'Install',
          onClick: NOOP,
        }}
        resetAction={{
          label: 'Reset',
          onClick: NOOP,
        }}
      />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Stepper
        steps={[
          {
            label: 'Step 1 Title',
            content: <div />,
          },
          {
            label: 'Step 3 Title (done)',
            content: <div />,
          },
        ]}
        prevAction={{
          label: 'Back',
          onClick: NOOP,
        }}
        nextAction={{
          label: 'Next',
          onClick: NOOP,
        }}
        completeAction={{
          label: 'Install',
          onClick: NOOP,
        }}
        resetAction={{
          label: 'Reset',
          onClick: NOOP,
        }}
      />
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <Stepper
        steps={[
          {
            label: 'Step 1 Title',
            content: <div />,
          },
        ]}
        prevAction={{
          label: 'Back',
          onClick: NOOP,
        }}
        nextAction={{
          label: 'Next',
          onClick: NOOP,
        }}
        completeAction={{
          label: 'Install',
          onClick: NOOP,
        }}
        resetAction={{
          label: 'Reset',
          onClick: NOOP,
        }}
      />
    )
    expect(tree3).toMatchSnapshot()
  })
})
