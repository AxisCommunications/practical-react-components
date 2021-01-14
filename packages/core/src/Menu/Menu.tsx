import React, { memo, useMemo } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { componentSize, spacing } from '../designparams'
import { Typography } from '../Typography'
import { Icon, IconType } from '../Icon'
import { BaseMenu, IBaseMenuItem, IBaseMenuProps } from './BaseMenu'

export const MenuItem = styled.div<{
  readonly divider?: boolean
  readonly danger?: boolean
  readonly compact: boolean
}>`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.large};
  > * {
    margin-right: ${spacing.large};
  }
  height: ${({ compact }) =>
    compact ? componentSize.small : componentSize.medium};

  border-bottom: ${({ divider, theme }) =>
    divider === true ? `1px solid ${theme.color.element12()}` : 0};

  ${({ danger, theme }) =>
    danger === true
      ? css`
          color: ${theme.color.textError()};
        `
      : undefined}
`

const MenuItemIcon = styled(Icon)`
  color: ${({ theme }) => theme.color.text05()};
`

export interface IMenuItem
  extends Omit<IBaseMenuItem, 'component' | 'keyboardSelect'> {
  readonly icon?: IconType
  readonly label: string
  readonly divider?: boolean
  readonly danger?: boolean
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
}

interface IMenuProps extends Omit<IBaseMenuProps, 'components'> {
  /**
   * An array of items in the drop down menu.
   */
  readonly items: ReadonlyArray<IMenuItem>
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
}

/**
 * Menu
 *
 * Forwards props to BaseMenu
 */
export const Menu = memo<IMenuProps>(
  ({ items, compact: compactFromProps, ...props }) => {
    const { compact: compactFromTheme } = useTheme()
    const compact = compactFromProps ?? compactFromTheme

    /**
     * Creates array of components using MenuItem to
     * forward to Base Menu
     */
    const components = useMemo<ReadonlyArray<IBaseMenuItem>>(
      () =>
        items.map(item => {
          const { icon, label, divider, danger } = item

          const menuItemContent =
            icon !== undefined ? (
              <MenuItemIcon icon={icon} size="small" />
            ) : undefined

          return {
            component: (
              <MenuItem divider={divider} danger={danger} compact={compact}>
                {menuItemContent}
                <Typography variant="navigation-label">{label}</Typography>
              </MenuItem>
            ),
            ...item,
          }
        }),
      [compact, items]
    )

    return <BaseMenu components={components} {...props} />
  }
)

Menu.displayName = 'Menu'
