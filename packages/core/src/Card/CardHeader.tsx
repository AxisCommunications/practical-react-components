import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { MoreVertIcon } from 'practical-react-components-icons'

import { CARD_PADDING } from './padding'
import { Typography } from '../Typography'
import { Arrow } from '../Expandable'
import { Menu, IMenuItem } from '../Menu'
import { spacing } from '../designparams'

export type CardHeaderHeightType = 'small' | 'normal' | 'large'
type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const HEADER_HEIGHT = {
  small: '40px',
  normal: '48px',
  large: '60px',
}

const ICON_CONTAINER_WIDTH = '72px'

/**
 * Empty header with just a bottom border
 */
export const EmptyHeader = styled.div`
  flex: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.text04()};
  border-bottom: 1px solid ${({ theme }) => theme.color.element12()};
`

interface ITitleHeaderProps {
  readonly height: CardHeaderHeightType
  readonly hasIcon: boolean
}

const TitleHeader = styled(EmptyHeader)<ITitleHeaderProps>`
  position: relative; /* This is for special icon like corner triangle */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: ${({ height }) => HEADER_HEIGHT[height]};
  cursor: default;

  ${({ hasIcon }) =>
    hasIcon
      ? css`
          padding-right: ${CARD_PADDING};
        `
      : css`
          padding: 0 ${CARD_PADDING};
        `}
`

const HeaderIcon = styled.div`
  width: ${ICON_CONTAINER_WIDTH};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.element11()};
`

const TitleContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface ITabsHeaderContainerProps extends Pick<ITitleHeaderProps, 'height'> {}

/* Header container for inside tabs */
export const TabsHeaderContainer = styled(
  EmptyHeader
)<ITabsHeaderContainerProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: ${({ height }) => HEADER_HEIGHT[height]};
  padding: 0 ${spacing.large};
`

export interface ICardHeaderProps extends BaseProps {
  /**
   * Label that shows inside Card Header
   */
  readonly header: string
  /**
   * Small label that shows inside Card Header under header label
   */
  readonly subhead?: string
  /**
   * Header height
   *
   * Default: `normal`
   */
  readonly height?: CardHeaderHeightType
  /**
   * Optional icon
   */
  readonly icon?: React.ReactNode
  /**
   * Menu items that shows inside menu
   */
  readonly menu?: ReadonlyArray<IMenuItem>
  /**
   * if `true` return a header for inside tabs.
   *
   * Default: `false`
   */
  readonly tab?: boolean
}

export const CardHeader: React.FC<ICardHeaderProps> = ({
  header,
  subhead,
  height = 'normal',
  icon,
  menu,
  tab = false,
  children,
  ...props
}) => {
  const hasIcon = icon !== undefined

  if (tab) {
    return (
      <TabsHeaderContainer height={height} {...props}>
        {children}
      </TabsHeaderContainer>
    )
  }

  return (
    <TitleHeader height={height} hasIcon={hasIcon} {...props}>
      {icon !== undefined ? <HeaderIcon>{icon}</HeaderIcon> : undefined}
      <TitleContainer>
        <Typography variant="card-title">{header}</Typography>
        <Typography variant="caption">{subhead}</Typography>
      </TitleContainer>
      {menu !== undefined ? (
        <Menu icon={MoreVertIcon} items={menu} />
      ) : undefined}
    </TitleHeader>
  )
}

/**
 * Expandable header
 */

interface IExpandableTitleHeaderProps {
  readonly expanded: boolean
  readonly disabled: boolean
}

const ExpandableTitleHeader = styled(TitleHeader)<IExpandableTitleHeaderProps>`
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};

  ${({ expanded }) =>
    !expanded
      ? css`
          transition: border-bottom 50ms ease-in-out 200ms;
          border-bottom-color: transparent;
        `
      : undefined};
`

export interface ICardExpandableHeaderProps extends ICardHeaderProps {
  readonly disabled?: boolean
  readonly expanded?: boolean
  readonly onToggle: (expanded: boolean) => void
}

export const CardExpandableHeader: React.FC<ICardExpandableHeaderProps> = ({
  header,
  subhead,
  height = 'normal',
  icon,
  disabled = false,
  expanded = false,
  onToggle,
  ...props
}) => {
  const hasIcon = icon !== undefined
  const onClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    if (!disabled) {
      onToggle(!expanded)
    }
  }, [disabled, onToggle, expanded])

  return (
    <ExpandableTitleHeader
      height={height}
      disabled={disabled}
      expanded={expanded}
      onClick={onClick}
      hasIcon={hasIcon}
      {...props}
    >
      {icon !== undefined ? <HeaderIcon>{icon}</HeaderIcon> : undefined}
      <TitleContainer>
        <Typography variant="card-title">{header}</Typography>
        <Typography variant="caption">{subhead}</Typography>
      </TitleContainer>
      <Arrow disabled={disabled} expanded={expanded} />
    </ExpandableTitleHeader>
  )
}
