import React from 'react'
import 'jest-styled-components'

import { Tooltip, ExpandedTooltipTypography } from '.'
import { TestRender, TestTextWithForwardRef } from '../TestUtils'

describe('Tooltip', () => {
  test('Default', () => {
    const tree1 = TestRender(
      <Tooltip text="test">
        <TestTextWithForwardRef />
      </Tooltip>
    )
    expect(tree1).toMatchSnapshot()
  })

  test('Expanded', () => {
    const tree1 = TestRender(
      <Tooltip
        variant="expanded"
        tipTitle="title"
        contents={
          <ExpandedTooltipTypography>
            Expanded tooltip test text
          </ExpandedTooltipTypography>
        }
      >
        <TestTextWithForwardRef />
      </Tooltip>
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Tooltip
        variant="expanded"
        tipTitle="title"
        extraInfo="2020-08-31"
        contents={
          <ExpandedTooltipTypography>
            Expanded tooltip test text
          </ExpandedTooltipTypography>
        }
      >
        <TestTextWithForwardRef />
      </Tooltip>
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <Tooltip
        variant="expanded"
        placement="left-right"
        tipTitle="title"
        contents={
          <ExpandedTooltipTypography>
            Expanded tooltip test text
          </ExpandedTooltipTypography>
        }
      >
        <TestTextWithForwardRef />
      </Tooltip>
    )
    expect(tree3).toMatchSnapshot()
  })
})
