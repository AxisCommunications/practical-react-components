import { ReactElement, ReactNode, forwardRef, FC } from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { PracticalProvider } from './Practical'

interface TPProps {
	readonly children?: ReactNode
}
/*
  Only used for Jest Snapshot Testing
*/
export const TP: FC<TPProps> = ({ children }): JSX.Element => (
	<PracticalProvider>{children}</PracticalProvider>
)

/**
 * Mock reference to practical-root
 */
const createNodeMock = (element: ReactElement) => {
	if (element.props.id !== 'practical-root') {
		return null
	}

	return {}
}

export const TestRender = (jsx: JSX.Element) =>
	renderer.create(<TP>{jsx}</TP>, { createNodeMock }).toJSON()

export const TestText = (): JSX.Element => <span>Test</span>

export const TestTextWithForwardRef = forwardRef<HTMLElement>(
	({ ...props }, ref) => (
		<span {...props} ref={ref}>
			Test
		</span>
	)
)
