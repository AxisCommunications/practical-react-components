import { HTMLAttributes, FC } from 'react'
import styled from 'styled-components'

import { Typography } from '../Typography'
import { spacing } from '../designparams'
import { Color } from '../theme'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

/**
 * Get a color that matches the strength level.
 * NOTE: these colors are directly taken from the
 * color palette as they are _not_ theme dependent.
 * Don't do this at home!
 *
 * @param strength The level of strength (between 0 and 1)
 */
const getStrengthColor = (strength: number, color: Color) => {
  if (strength > 0.75) {
    return color.elementSuccess()
  }
  if (strength > 0.5) {
    return color.elementWarning()
  }
  if (strength > 0) {
    return color.elementError()
  }
}

const PasswordMeterContainer = styled.div`
  background-color: ${({ theme }) => theme.color.background01()};
  height: 4px;
  width: 240px;
  overflow: hidden;
`

const PasswordMeter = styled.div.attrs<{ readonly strength: number }>(
  ({ strength }) => ({
    style: {
      transform: `scaleX(${strength})`,
    },
  })
)<{ readonly strength: number }>`
  background-color: ${({ theme, strength }) =>
    getStrengthColor(strength, theme.color)};
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  transform-origin: left center;
`

const PasswordWarning = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  margin-left: ${spacing.large};
  line-height: 0;
  color: ${({ theme }) => theme.color.text01()};
`

const PasswordStrengthIndicator = styled.div`
  height: 16px;
  width: 100%;
  display: flex;
  align-items: center;
`

export interface StrengthIndicatorProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Used to indicate the strength value of the indicator.
   */
  readonly strength: number
  /**
   * A string used to tell the user information regarding the strength value.
   */
  readonly helpText: string
}

export const StrengthIndicator: FC<StrengthIndicatorProps> = ({
  strength,
  helpText,
  ...props
}) => (
  <PasswordStrengthIndicator {...props}>
    <PasswordMeterContainer>
      <PasswordMeter strength={strength} />
    </PasswordMeterContainer>
    <PasswordWarning>
      <Typography variant="navigation-label">{helpText}</Typography>
    </PasswordWarning>
  </PasswordStrengthIndicator>
)
