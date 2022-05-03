import {
  useCallback,
  HTMLAttributes,
  FC,
  MouseEventHandler,
  ReactNode,
} from 'react'
import styled, { css } from 'styled-components'

import { CARD_PADDING } from './padding'
import { Arrow } from '../Expandable'
import { Typography } from '../Typography'
import { spacing } from '../designparams'

export type CardHeaderHeightType = 'small' | 'normal' | 'large'
type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

/**
 * Empty header with just a bottom border
 */
export const BaseHeader = styled.div`
  flex: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.text04()};
  border-bottom: 1px solid ${({ theme }) => theme.color.element12()};
`

const TitleHeader = styled(BaseHeader)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  cursor: default;
  height: auto;
  padding: ${spacing.medium} ${CARD_PADDING};
`

const TitleContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const CardHeaderTypography = styled(Typography).attrs({
  variant: 'card-title',
})``

export const CardSubHeaderTypography = styled(Typography).attrs({
  variant: 'caption',
})``

export interface CardHeaderProps extends BaseProps {
  readonly children?: ReactNode
  /**
   * `class` to be passed to the component.
   */
  readonly className?: string
}

export const CardHeader: FC<CardHeaderProps> = ({ children, ...props }) => (
  <TitleHeader {...props}>{children}</TitleHeader>
)

/**
 * Expandable header
 */

interface ExpandableTitleHeaderProps {
  readonly expanded: boolean
  readonly disabled: boolean
}

const ExpandableTitleHeader = styled(TitleHeader)<ExpandableTitleHeaderProps>`
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};

  ${({ expanded }) =>
    !expanded
      ? css`
          transition: border-bottom 50ms ease-in-out 200ms;
          border-bottom-color: transparent;
        `
      : undefined};
`

export interface CardExpandableHeaderProps extends CardHeaderProps {
  readonly children?: ReactNode
  readonly disabled?: boolean
  readonly expanded?: boolean
  readonly onToggle: (expanded: boolean) => void
}

export const CardExpandableHeader: FC<CardExpandableHeaderProps> = ({
  disabled = false,
  expanded = false,
  onToggle,
  children,
  ...props
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
    if (!disabled) {
      onToggle(!expanded)
    }
  }, [disabled, onToggle, expanded])

  return (
    <ExpandableTitleHeader
      disabled={disabled}
      expanded={expanded}
      onClick={onClick}
      {...props}
    >
      <TitleContainer>{children}</TitleContainer>
      <Arrow disabled={disabled} expanded={expanded} />
    </ExpandableTitleHeader>
  )
}
