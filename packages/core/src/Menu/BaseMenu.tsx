import {
	useState,
	useCallback,
	useRef,
	memo,
	PointerEventHandler,
	ReactNode,
	useEffect,
	HTMLAttributes,
	MouseEventHandler,
	forwardRef,
	FocusEventHandler,
	FC,
	MouseEvent,
	KeyboardEvent,
	KeyboardEventHandler,
} from 'react'
import styled, { css } from 'styled-components'

import { useBoolean, useVisibleFocus } from 'react-hooks-shareable'

import { spacing, componentSize, opacity, shape } from '../designparams'
import { remainder } from '../utils/math'
import { Icon } from '../Icon'
import { PopOver, PopOverProps } from '../PopOver'
import { useEscapeListenerStack } from '../Modal/hooks/useEscapeListenerStack'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

type BaseButtonElement = HTMLButtonElement
type BaseButtonProps = HTMLAttributes<BaseButtonElement>

const MENU_MIN_WIDTH = '232px'
const MENU_MAX_HEIGHT = '360px'

const SUBMENU_DELAY_MS = 250

const Anchor = styled.div`
  width: fit-content;
  height: fit-content;
`

export const MenuButtonIconContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: ${componentSize.small};
  width: ${componentSize.small};
  border-radius: ${shape.radius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MenuButtonIcon = styled(Icon).attrs({
	className: 'sc-ButtonIcon',
})`
  fill: inherit;
  flex: none;
`

export const MenuButtonHalo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${shape.radius.circle};
  background-color: transparent;
  outline: none;
  transform: scale(0.3);
  transition: transform 100ms;
`

const MenuNativeButton = styled.button<{
	readonly visibleFocus: boolean
}>`
  flex: none;
  min-width: unset;
  padding: unset;
  outline: none;
  cursor: pointer;
  border: 0;
  &::-moz-focus-inner {
    border: 0;
  }
  color: ${({ theme }) => theme.color.text04()};
  fill: ${({ theme }) => theme.color.text04()};
  background-color: transparent;
  transition: all 200ms;
  ${MenuButtonIconContainer} {
    border: 2px solid transparent;
  }

  &:hover,
  &:focus-within {
    ${MenuButtonIconContainer} {
      border: 0 solid transparent;
    }
    ${MenuButtonHalo} {
      background-color: ${({ theme }) => theme.color.element11(opacity[16])};
      transform: scale(1);
    }
  }

  &:focus {
    ${({ visibleFocus }) =>
			visibleFocus
				? css`
            &:focus {
              ${MenuButtonIconContainer} {
                border: 2px solid ${({ theme }) => theme.color.elementBorder()};
              }
              ${MenuButtonHalo} {
                background-color: ${({ theme }) =>
									theme.color.element11(opacity[16])};
                transform: scale(1);
              }
            }
          `
				: undefined}
  }

  &:active {
    ${MenuButtonHalo} {
      background-color: ${({ theme }) => theme.color.element11(opacity[24])};
      transform: scale(1.06);
    }
  }

  ${({ disabled }) =>
		disabled === true
			? css`
          opacity: ${opacity[48]};
          pointer-events: none;
          cursor: default;
          box-shadow: none;
        `
			: undefined}
`

const MenuContainer = styled.div<{ readonly isSubmenu: boolean }>`
  color: ${({ theme }) => theme.color.text06()};
  background-color: ${({ theme }) => theme.color.background05()};
  box-shadow: ${({ theme }) => theme.shadow.menu};
  min-width: ${MENU_MIN_WIDTH};
  max-height: ${MENU_MAX_HEIGHT};
  padding: ${spacing.medium} 0;
  border-radius: ${shape.radius.medium};
  overflow: auto;

  ${({ isSubmenu }) =>
		isSubmenu
			? css`
          margin-top: -${spacing.medium};
        `
			: undefined}
`

export const BaseMenuItem = styled.div<{
	readonly disabled?: boolean
	readonly keyboardSelect?: boolean
}>`
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  fill: red;

  &:hover {
    background-color: ${({ theme }) => theme.color.background02()};
  }

  ${({ keyboardSelect }) =>
		keyboardSelect === true
			? css`
          background-color: ${({ theme }) => theme.color.background02()};
        `
			: undefined}

  ${({ disabled }) =>
		disabled === true
			? css`
          opacity: ${opacity[48]};
          cursor: default;
        `
			: undefined}
`

type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>

export interface MenuButtonProps extends BaseButtonProps {
	readonly children?: ReactNode
	/**
	 * If `true`, the button will be disabled.
	 */
	readonly disabled?: boolean
	/**
	 * Specifies the name for a <button> element.
	 * It is used to reference form-data after the form has been submitted,
	 * or to reference the element in a JavaScript.
	 */
	readonly name?: string
	/**
	 * Executes a JavaScript when a user click the button.
	 */
	readonly onClick: ButtonClickHandler
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: string
	/**
	 * The title attribute specifies extra information about an element.
	 */
	readonly title?: string
}

export const MenuButton = forwardRef<BaseButtonElement, MenuButtonProps>(
	(
		{
			disabled,
			name,
			onClick,
			className,
			onPointerDown,
			onPointerUp,
			onFocus,
			children,
			...props
		},
		ref
	) => {
		const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
			useVisibleFocus()

		const handleFocus = useCallback<FocusEventHandler<BaseButtonElement>>(
			e => {
				onFocus?.(e)
				determineVisibleFocus()
			},
			[determineVisibleFocus, onFocus]
		)
		const handlePointerDown = useCallback<
			PointerEventHandler<BaseButtonElement>
		>(
			e => {
				onPointerDown?.(e)
				isPointerOn()
			},
			[isPointerOn, onPointerDown]
		)
		const handlePointerUp = useCallback<PointerEventHandler<BaseButtonElement>>(
			e => {
				onPointerUp?.(e)
				isPointerOff()
			},
			[isPointerOff, onPointerUp]
		)

		return (
			<MenuNativeButton
				ref={ref}
				disabled={disabled}
				name={name}
				type="button"
				onClick={onClick}
				className={className}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onFocus={handleFocus}
				visibleFocus={visibleFocus}
				{...props}
			>
				{children}
			</MenuNativeButton>
		)
	}
)

MenuButton.displayName = 'MenuButton'

/**
 * For keyboard interaction
 */

enum MenuKeys {
	Space = ' ',
	Enter = 'Enter',
	Escape = 'Escape',
	// 'Esc' need for Edge and IE 11
	Esc = 'Esc',
	Home = 'Home',
	End = 'End',
	ArrowRight = 'ArrowRight',
	ArrowUp = 'ArrowUp',
	ArrowLeft = 'ArrowLeft',
	ArrowDown = 'ArrowDown',
}

/**
 * Add an escape listener to the actual rendered menu.
 */
export interface MenuListProps extends BaseProps {
	readonly children?: ReactNode
	/**
	 * Called when user pressed the escape button on the keyboard
	 */
	readonly onEscape: () => void
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: string
	/**
	 * If true, align submenu list with main menu item.
	 */
	readonly isSubmenu?: boolean
}

export const MenuList: FC<MenuListProps> = ({
	onEscape,
	children,
	onPointerDown,
	isSubmenu = false,
	...props
}) => {
	// Close when pressing escape key.
	useEscapeListenerStack(onEscape)

	return (
		<MenuContainer {...props} isSubmenu={isSubmenu}>
			{children}
		</MenuContainer>
	)
}

interface SubmenuProps {
	readonly visible: boolean
	readonly submenuComponents: ReadonlyArray<BaseItemProps>
	readonly anchorEl: HTMLElement | null
	readonly disabled?: boolean
	readonly align: 'left' | 'right'
	readonly arrowIndex: number
	readonly hideAndBlurMenu: VoidFunction
	readonly hideSubmenu: VoidFunction
}

const Submenu: FC<SubmenuProps> = ({
	visible,
	submenuComponents,
	anchorEl,
	disabled,
	align,
	arrowIndex,
	hideAndBlurMenu,
	hideSubmenu,
}) => {
	const [hovered, show, hide] = useBoolean(false)

	if (!visible && !hovered) {
		return null
	}

	return (
		<PopOver
			horizontalPosition={align === 'left' ? 'right' : 'left'}
			horizontalAlignment={align}
			verticalPosition="top"
			anchorEl={anchorEl}
			onScroll={hideAndBlurMenu}
		>
			<MenuList
				onEscape={hideSubmenu}
				onClick={hideAndBlurMenu}
				onPointerOver={show}
				onPointerLeave={hide}
				isSubmenu
			>
				{submenuComponents.map((sub, index) => {
					return (
						<BaseItem
							key={index}
							onClick={sub.onClick}
							keyboardSelect={index === arrowIndex}
							component={sub.component}
							disabled={disabled === true || sub.disabled}
						/>
					)
				})}
			</MenuList>
		</PopOver>
	)
}

export interface BaseItemWithSubmenuProps
	extends Omit<BaseItemProps, 'onClick'> {
	readonly align: 'left' | 'right'
	readonly submenuVisible: boolean
	readonly submenuArrowIndex: number
	readonly hideAndBlurMenu: VoidFunction
	readonly hideSubmenu: VoidFunction
}

const BaseItemWithSubmenu: FC<BaseItemWithSubmenuProps> = ({
	component,
	submenuComponents,
	disabled,
	keyboardSelect,
	align,
	submenuVisible,
	submenuArrowIndex,
	hideAndBlurMenu,
	hideSubmenu,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const [visible, show, hide] = useBoolean(false)
	const [debouncedVisible, setDebouncedVisible] = useState(visible)

	useEffect(() => {
		const delayVisible = () => setDebouncedVisible(visible)
		const delayed = setTimeout(delayVisible, SUBMENU_DELAY_MS)
		return () => {
			clearTimeout(delayed)
		}
	}, [visible])

	const preventMenuBlur = useCallback<PointerEventHandler>(e => {
		// Prevent the menu from losing focus when clicking down on an item.
		e.preventDefault()
	}, [])

	const preventCloseMenu = useCallback<MouseEventHandler>(e => {
		// Prevent event from bubbling up to the wrapper
		// that closes the menu when it has submenu
		e.stopPropagation()
	}, [])

	return (
		<>
			<BaseMenuItem
				ref={setAnchorEl}
				disabled={disabled}
				keyboardSelect={keyboardSelect}
				onPointerDown={preventMenuBlur}
				onPointerOver={show}
				onPointerOut={hide}
				onClick={preventCloseMenu}
			>
				{component}
			</BaseMenuItem>
			{submenuComponents !== undefined && (
				<Submenu
					visible={submenuVisible || debouncedVisible}
					submenuComponents={submenuComponents}
					anchorEl={anchorEl}
					disabled={disabled}
					align={align}
					arrowIndex={submenuArrowIndex}
					hideAndBlurMenu={hideAndBlurMenu}
					hideSubmenu={hideSubmenu}
				/>
			)}
		</>
	)
}

export interface BaseItemProps {
	readonly component: ReactNode
	readonly submenuComponents?: ReadonlyArray<BaseItemProps>
	readonly onClick: (e: MouseEvent | KeyboardEvent) => void
	readonly disabled?: boolean
	readonly keyboardSelect?: boolean
}

const BaseItem: FC<BaseItemProps> = ({
	component,
	onClick,
	disabled,
	keyboardSelect,
}) => {
	const clickHandler = useCallback<MouseEventHandler>(
		event => {
			if (disabled === true) {
				// Prevent event from bubbling up to the wrapper
				// that closes the menu
				event.stopPropagation()
				return
			}
			onClick(event)
		},
		[disabled, onClick]
	)

	const preventMenuBlur = useCallback<PointerEventHandler>(e => {
		// Prevent the menu from losing focus when clicking down on an item.
		e.preventDefault()
	}, [])

	return (
		<BaseMenuItem
			onPointerDown={preventMenuBlur}
			onClick={clickHandler}
			disabled={disabled}
			keyboardSelect={keyboardSelect}
		>
			{component}
		</BaseMenuItem>
	)
}

interface ArrowIndex {
	readonly main: number
	readonly sub: number
}

export interface BaseMenuProps extends Omit<PopOverProps, 'anchorEl'> {
	/**
	 * React element that will appear as menu button
	 */
	readonly button: ReactNode
	/**
	 * Aligns the menu either left or right.
	 */
	readonly align?: 'left' | 'right'
	/**
	 * Disabled
	 */
	readonly disabled?: boolean
	/**
	 * Components to render
	 */
	readonly components: ReadonlyArray<BaseItemProps>
}

/**
 * BaseMenu
 *
 * Anchor with a button that toggles a menu when you click the button.
 * When pressing the escape key, the menu is closed.
 */
export const BaseMenu = memo<BaseMenuProps>(
	({
		button,
		align = 'left',
		disabled = false,
		components,
		onBlur,
		inline,
		...props
	}) => {
		const [menuVisible, openMenu, hideMenu] = useBoolean(false)
		const [submenuVisible, openSubmenu, hideSubmenu] = useBoolean(false)

		const anchorRef = useRef<HTMLDivElement>(null)
		const [arrowIndex, setArrowIndex] = useState<ArrowIndex>({
			main: -1,
			sub: -1,
		})

		const hideAndBlurMenu = useCallback(() => {
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur()
			}
			hideMenu()
			hideSubmenu()
		}, [hideMenu])

		const handleBlur = useCallback<FocusEventHandler<BaseElement>>(
			e => {
				onBlur?.(e)
				hideMenu()
			},
			[onBlur, hideMenu]
		)

		const mouseToggleMenu = useCallback<MouseEventHandler>(
			event => {
				event.stopPropagation()
				if (menuVisible) {
					hideAndBlurMenu()
				} else {
					// Reset arrowIndex before Menu opens
					setArrowIndex({ main: -1, sub: -1 })
					openMenu()
				}
			},
			[menuVisible, hideAndBlurMenu, openMenu]
		)

		const moveMainArrowMenuIndex = useCallback(
			(increment: number) => {
				const nextIndex = remainder(
					arrowIndex.main + increment,
					components.length
				)
				return setArrowIndex({ ...arrowIndex, main: nextIndex })
			},
			[arrowIndex, components.length]
		)

		const moveSubArrowMenuIndex = useCallback(
			(increment: number) => {
				const nextIndex = remainder(
					arrowIndex.sub + increment,
					components[arrowIndex.main].submenuComponents?.length ?? 0
				)
				return setArrowIndex({ ...arrowIndex, sub: nextIndex })
			},
			[arrowIndex, components.length]
		)

		const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
			event => {
				if (!(event.key in MenuKeys)) {
					return
				}
				event.preventDefault()

				switch (event.key) {
					case MenuKeys.Enter:
					case MenuKeys.Space: {
						if (menuVisible) {
							const submenu = components[arrowIndex.main].submenuComponents
							const hasSubmenu = submenu !== undefined

							if (
								submenuVisible &&
								hasSubmenu &&
								components[arrowIndex.main].disabled !== true &&
								submenu[arrowIndex.sub].disabled !== true &&
								arrowIndex.sub !== -1
							) {
								submenu[arrowIndex.sub].onClick(event)
								hideSubmenu()
								hideMenu()
								break
							}

							if (
								components[arrowIndex.main].disabled !== true &&
								!hasSubmenu
							) {
								components[arrowIndex.main].onClick(event)
								hideMenu()
								break
							}

							// Open submenu
							if (components[arrowIndex.main].disabled !== true && hasSubmenu) {
								openSubmenu()
								setArrowIndex({ ...arrowIndex, sub: 0 })
								break
							}
						}

						openMenu()
						setArrowIndex({ main: 0, sub: -1 })
						break
					}
					case MenuKeys.Escape:
					case MenuKeys.Esc: {
						hideSubmenu()
						hideMenu()
						break
					}
					case MenuKeys.ArrowUp: {
						if (submenuVisible) {
							moveSubArrowMenuIndex(-1)
							break
						}
						if (menuVisible) {
							moveMainArrowMenuIndex(-1)
							break
						}
						openMenu()
						setArrowIndex({ ...arrowIndex, main: 0 })
						break
					}
					case MenuKeys.ArrowDown: {
						if (submenuVisible) {
							moveSubArrowMenuIndex(1)
							break
						}
						if (menuVisible) {
							moveMainArrowMenuIndex(1)
							break
						}
						openMenu()
						setArrowIndex({ ...arrowIndex, main: 0 })
						break
					}
					case MenuKeys.ArrowRight:
					case MenuKeys.ArrowLeft: {
						if (
							!submenuVisible &&
							components[arrowIndex.main].submenuComponents !== undefined
						) {
							openSubmenu()
							setArrowIndex({ ...arrowIndex, sub: 0 })
							break
						}
						if (submenuVisible) {
							hideSubmenu()
							setArrowIndex({ ...arrowIndex, sub: -1 })
							break
						}
						hideMenu()
						break
					}
					case MenuKeys.Home: {
						if (submenuVisible) {
							setArrowIndex({ ...arrowIndex, sub: 0 })
							break
						}
						if (menuVisible) {
							setArrowIndex({ ...arrowIndex, main: 0 })
							break
						}
						break
					}
					case MenuKeys.End: {
						const submenu = components[arrowIndex.main].submenuComponents
						if (submenuVisible && submenu !== undefined) {
							setArrowIndex({
								...arrowIndex,
								sub: submenu.length - 1,
							})
							break
						}
						if (menuVisible) {
							setArrowIndex({ ...arrowIndex, main: components.length - 1 })
							break
						}
						break
					}

					default:
				}
			},
			[
				menuVisible,
				openMenu,
				components,
				arrowIndex,
				hideMenu,
				moveMainArrowMenuIndex,
			]
		)

		return (
			<Anchor
				ref={anchorRef}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				{...props}
			>
				<MenuButton onClick={mouseToggleMenu} disabled={disabled}>
					{button}
				</MenuButton>
				{menuVisible ? (
					<PopOver
						horizontalPosition={align}
						horizontalAlignment={align}
						anchorEl={anchorRef.current}
						onScroll={hideAndBlurMenu}
						inline={inline}
					>
						<MenuList onEscape={hideMenu} onClick={hideAndBlurMenu}>
							{components.map((component, index) => {
								if (component.submenuComponents === undefined) {
									return (
										<BaseItem
											key={index}
											keyboardSelect={index === arrowIndex.main}
											{...component}
										/>
									)
								}
								return (
									<BaseItemWithSubmenu
										key={index}
										keyboardSelect={index === arrowIndex.main}
										{...component}
										align={align}
										submenuVisible={submenuVisible}
										submenuArrowIndex={arrowIndex.sub}
										hideAndBlurMenu={hideAndBlurMenu}
										hideSubmenu={hideSubmenu}
									/>
								)
							})}
						</MenuList>
					</PopOver>
				) : null}
			</Anchor>
		)
	}
)

BaseMenu.displayName = 'BaseMenu'
