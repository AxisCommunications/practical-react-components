import React from 'react'
import styled from 'styled-components'

import { Typography } from '../Typography'
import { spacing, shape } from '../designparams'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const ProgressIndicator = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.element12()};
  border-radius: ${shape.radius.medium};
  height: 5px;
  flex-grow: 1;
  overflow: hidden;
`

const ProgressMeter = styled.div<{ readonly fraction: number }>`
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  border-radius: inherit;
  height: 100%;
  width: ${({ fraction }) => `${Math.round(fraction * 100)}%`};
`

const ProgressLabel = styled(Typography).attrs({
  variant: 'chip-tag-text',
})`
  padding: 0 ${spacing.medium};
  color: ${({ theme }) => theme.color.text03()};
`

interface IProgressProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Used to indicate the percentage value of the indicator.
   * Value should between 0 and 1.
   */
  readonly value: number
  /**
   * A string used to tell the user information regarding the progress value.
   */
  readonly label: string
}

export const Progress: React.FC<IProgressProps> = ({
  value,
  label,
  ...props
}) => (
  <ProgressContainer {...props}>
    <ProgressIndicator>
      <ProgressMeter fraction={value} />
    </ProgressIndicator>
    <ProgressLabel>{label}</ProgressLabel>
  </ProgressContainer>
)
