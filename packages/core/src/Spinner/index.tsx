import { HTMLAttributes, FC } from 'react'
import { useSynchronizedAnimation } from 'react-hooks-shareable'
import styled, { keyframes, css } from 'styled-components'

import { shape, componentSize, spacing } from '../designparams'
import { Typography } from '../Typography'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

// Constant size for spinner
const SPINNER_SIZE = componentSize.small

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
`

const rotate = keyframes`
  from {
    transform: rotate(90deg);
  }

  to {
    transform: rotate(450deg);
  }
`

type SpinnerType = 'primary' | 'dashed'

interface CircleProps {
	readonly type: SpinnerType
}

const Circle = styled.div<CircleProps>`
  width: ${SPINNER_SIZE};
  height: ${SPINNER_SIZE};
  box-sizing: border-box;
  border-radius: ${shape.radius.circle};
  border-width: 2px;
  border-color: ${({ theme }) => theme.color.background01()};
  transform: rotate(90deg);
  animation: ${rotate} linear infinite;

  :dir(rtl) {
    animation-direction: reverse;
  }

  ${({ type }) =>
		type === 'primary'
			? css`
          border-style: solid;
          border-left: 2px solid ${({ theme }) => theme.color.elementPrimary()};
          animation-duration: 2s;
        `
			: css`
          border-style: dashed;
          animation-duration: 10s;
        `}
`

const Label = styled.div`
  margin-top: ${spacing.medium};
  color: ${({ theme }) => theme.color.text01()};
`

export interface SpinnerProps extends BaseProps {
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * Used to choose spinner type.
	 */
	readonly type?: SpinnerType
	/**
	 * Changes the label attatched to the spinner.
	 */
	readonly label?: string
}

export const Spinner: FC<SpinnerProps> = ({
	type = 'primary',
	label,
	...props
}) => {
	const ref = useSynchronizedAnimation<HTMLDivElement>()
	return (
		<Container {...props}>
			<Circle type={type} ref={ref} />
			{label !== undefined && label.length > 0 ? (
				<Label>
					<Typography variant="navigation-label">{label}</Typography>
				</Label>
			) : null}
		</Container>
	)
}
