import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { PracticalProvider } from './Practical'

/*
  Only used for Jest Snapshot Testing
*/

export const TP = ({
  children,
}: {
  readonly children: React.ReactElement
}): JSX.Element => <PracticalProvider>{children}</PracticalProvider>

/**
 * Mock reference to practical-root
 */
const createNodeMock = (element: React.ReactElement) => {
  if (element.props.id !== 'practical-root') {
    return null
  }

  return {}
}

export const TestRender = (jsx: JSX.Element) => {
  return renderer.create(<TP>{jsx}</TP>, { createNodeMock }).toJSON()
}

export const TestText = (): JSX.Element => <span>Test</span>

/* eslint-disable-next-line react/display-name */
export const TestTextWithForwardRef = React.forwardRef<HTMLElement>(
  ({ ...props }, ref) => (
    <span {...props} ref={ref}>
      Test
    </span>
  )
)
