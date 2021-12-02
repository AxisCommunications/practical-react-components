import React, {
  useState,
  useCallback,
  useRef,
  memo,
  PointerEventHandler,
  ReactNode,
} from 'react'
import styled, { css } from 'styled-components'

import { useBoolean, useVisibleFocus } from 'react-hooks-shareable'

import { spacing, componentSize, opacity, shape } from '../designparams'
import { remainder } from '../utils/math'
import { Icon } from '../Icon'
import { PopOver, PopOverProps } from '../PopOver'
import { useEscapeListenerStack } from '../Modal/hooks/useEscapeListenerStack'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

type BaseButtonElement = HTMLButtonElement
type BaseButtonProps = React.HTMLAttributes<BaseButtonElement>

const MENU_MIN_WIDTH = '232px'
const MENU_MAX_HEIGHT = '360px'

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

const MenuContainer = styled.div`
  color: ${({ theme }) => theme.color.text06()};
  background-color: ${({ theme }) => theme.color.background05()};
  box-shadow: ${({ theme }) => theme.shadow.menu};
  min-width: ${MENU_MIN_WIDTH};
  max-height: ${MENU_MAX_HEIGHT};
  padding: ${spacing.medium} 0;
  border-radius: ${shape.radius.medium};
  overflow: auto;
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

type ButtonClickHandler = React.MouseEventHandler<HTMLButtonElement>

interface MenuButtonProps extends BaseButtonProps {
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

export const MenuButton = React.forwardRef<BaseButtonElement, MenuButtonProps>(
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

    const handleFocus = useCallback<React.FocusEventHandler<BaseButtonElement>>(
      e => {
        onFocus?.(e)
        determineVisibleFocus()
      },
      [determineVisibleFocus, onFocus]
    )
    const handlePointerDown = useCallback<
      React.PointerEventHandler<BaseButtonElement>
    >(
      e => {
        onPointerDown?.(e)
        isPointerOn()
      },
      [isPointerOn, onPointerDown]
    )
    const handlePointerUp = useCallback<
      React.PointerEventHandler<BaseButtonElement>
    >(
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
  /**
   * Called when user pressed the escape button on the keyboard
   */
  readonly onEscape: () => void
  /**
   * `class` to be passed to the component.
   */
  readonly className?: string
}

export const MenuList: React.FC<MenuListProps> = ({
  onEscape,
  children,
  onPointerDown,
  ...props
}) => {
  // Close when pressing escape key.
  useEscapeListenerStack(onEscape)

  return <MenuContainer {...props}>{children}</MenuContainer>
}

export interface BaseItemProps {
  readonly component: ReactNode
  readonly onClick: (e: React.MouseEvent | React.KeyboardEvent) => void
  readonly disabled?: boolean
  readonly keyboardSelect?: boolean
}

const BaseItem: React.FunctionComponent<BaseItemProps> = ({
  component,
  onClick,
  disabled,
  keyboardSelect,
}) => {
  const clickHandler = useCallback<React.MouseEventHandler>(
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
    ...props
  }) => {
    const [menuVisible, openMenu, hideMenu] = useBoolean(false)

    const anchorRef = useRef<HTMLDivElement>(null)
    const [arrowIndex, setArrowIndex] = useState(-1)

    const hideAndBlurMenu = useCallback(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      hideMenu()
    }, [hideMenu])

    const handleBlur = useCallback<React.FocusEventHandler<BaseElement>>(
      e => {
        onBlur?.(e)
        hideMenu()
      },
      [onBlur, hideMenu]
    )

    const mouseToggleMenu = useCallback<React.MouseEventHandler>(
      event => {
        event.stopPropagation()
        if (menuVisible) {
          hideAndBlurMenu()
        } else {
          // Reset arrowIndex before Menu opens
          setArrowIndex(-1)
          openMenu()
        }
      },
      [menuVisible, hideAndBlurMenu, openMenu]
    )

    const moveArrowMenuIndex = useCallback(
      (increment: number) => {
        const nextIndex = remainder(arrowIndex + increment, components.length)
        return setArrowIndex(nextIndex)
      },
      [arrowIndex, components.length]
    )

    const handleKeyDown = useCallback<
      React.KeyboardEventHandler<HTMLDivElement>
    >(
      event => {
        if (!(event.key in MenuKeys)) {
          return
        }
        event.preventDefault()

        switch (event.key) {
          case MenuKeys.Enter:
          case MenuKeys.Space: {
            if (menuVisible) {
              if (components[arrowIndex].disabled !== true) {
                components[arrowIndex].onClick(event)
                hideMenu()
                break
              }
              break
            }
            openMenu()
            setArrowIndex(0)
            break
          }
          case MenuKeys.Escape:
          case MenuKeys.Esc: {
            hideMenu()
            break
          }
          case MenuKeys.ArrowUp: {
            if (menuVisible) {
              moveArrowMenuIndex(-1)
              break
            }
            openMenu()
            setArrowIndex(0)
            break
          }
          case MenuKeys.ArrowDown: {
            if (menuVisible) {
              moveArrowMenuIndex(1)
              break
            }
            openMenu()
            setArrowIndex(0)
            break
          }
          case MenuKeys.ArrowRight:
          case MenuKeys.ArrowLeft: {
            hideMenu()
            break
          }
          case MenuKeys.Home: {
            if (menuVisible) {
              setArrowIndex(0)
              break
            }
            break
          }
          case MenuKeys.End: {
            if (menuVisible) {
              setArrowIndex(components.length - 1)
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
        moveArrowMenuIndex,
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
          >
            <MenuList onEscape={hideMenu} onClick={hideAndBlurMenu}>
              {components.map((component, index) => (
                <BaseItem
                  key={index}
                  keyboardSelect={index === arrowIndex}
                  {...component}
                />
              ))}
            </MenuList>
          </PopOver>
        ) : null}
      </Anchor>
    )
  }
)

BaseMenu.displayName = 'BaseMenu'
