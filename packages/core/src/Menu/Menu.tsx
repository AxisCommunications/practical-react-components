import { memo, useMemo } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { MoreVertIcon } from 'practical-react-components-icons'

import { componentSize, spacing } from '../designparams'
import { Typography } from '../Typography'
import { Icon, IconType } from '../Icon'
import {
	BaseMenu,
	BaseItemProps,
	BaseMenuProps,
	MenuButtonIcon,
	MenuButtonHalo,
	MenuButtonIconContainer,
} from './BaseMenu'

const SubmenuArrowIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M11.71 15.29l2.59-2.59a.996.996 0 000-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z" />
	</svg>
)

export const SubmenuIcon = styled(Icon).attrs({ icon: SubmenuArrowIcon })`
  color: ${({ theme }) => theme.color.text05()};
`

export const MenuItem = styled.div<{
	readonly divider?: boolean
	readonly danger?: boolean
	readonly compact: boolean
	readonly submenu: boolean
	readonly hasIcon: boolean
}>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ hasIcon }) =>
		hasIcon
			? `${componentSize.small} 1fr ${componentSize.mini}`
			: `1fr ${componentSize.mini}`};

  padding: ${({ submenu }) =>
		submenu ? `0 ${spacing.medium} 0 ${spacing.large}` : `0 ${spacing.large}`};

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

export interface MenuItemProps
	extends Omit<
		BaseItemProps,
		'component' | 'submenuComponents' | 'keyboardSelect'
	> {
	readonly icon?: IconType
	readonly label: string
	readonly divider?: boolean
	readonly danger?: boolean
	/**
	 * Override theme's default setting for `compact` if set.
	 */
	readonly compact?: boolean
	/**
	 * An array of submenu items.
	 */
	readonly submenu?: ReadonlyArray<MenuItemProps>
}

export interface MenuProps
	extends Omit<BaseMenuProps, 'components' | 'button'> {
	/**
	 * The icon element for menu button.
	 *
	 * Default: `MoreVertIcon`
	 */
	readonly icon?: IconType
	/**
	 * An array of items in the drop down menu.
	 */
	readonly items: ReadonlyArray<MenuItemProps>
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
export const Menu = memo<MenuProps>(
	({
		icon: buttonIcon = MoreVertIcon,
		items,
		compact: compactFromProps,
		...props
	}) => {
		const { compact: compactFromTheme } = useTheme()
		const compact = compactFromProps ?? compactFromTheme

		const button = (
			<MenuButtonIconContainer>
				<MenuButtonIcon icon={buttonIcon} />
				<MenuButtonHalo />
			</MenuButtonIconContainer>
		)

		/**
		 * Creates array of components using MenuItem to
		 * forward to Base Menu
		 */
		const components = useMemo<ReadonlyArray<BaseItemProps>>(
			() =>
				items.map(item => {
					const { icon, label, divider, danger, submenu } = item

					const menuItemContent =
						icon !== undefined ? (
							<MenuItemIcon icon={icon} size="small" />
						) : undefined

					const submenuArrowIcon =
						submenu !== undefined ? <SubmenuIcon /> : undefined

					const submenuComponents =
						submenu !== undefined
							? submenu.map(sub => {
									return {
										component: (
											<MenuItem
												divider={sub.divider}
												danger={sub.danger}
												compact={compact}
												submenu={false}
												hasIcon={sub.icon !== undefined}
											>
												{sub.icon !== undefined ? (
													<MenuItemIcon icon={sub.icon} size="small" />
												) : undefined}
												<Typography variant="navigation-label">
													{sub.label}
												</Typography>
											</MenuItem>
										),
										...sub,
									}
							  })
							: undefined

					return {
						component: (
							<MenuItem
								divider={divider}
								danger={danger}
								compact={compact}
								submenu={submenu !== undefined}
								hasIcon={icon !== undefined}
							>
								{menuItemContent}
								<Typography variant="navigation-label">{label}</Typography>
								{submenuArrowIcon}
							</MenuItem>
						),
						submenuComponents,
						...item,
					}
				}),
			[compact, items]
		)

		return <BaseMenu button={button} components={components} {...props} />
	}
)

Menu.displayName = 'Menu'
