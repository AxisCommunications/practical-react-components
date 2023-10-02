import {
	useCallback,
	ButtonHTMLAttributes,
	MouseEventHandler,
	forwardRef,
	FocusEventHandler,
	PointerEventHandler,
} from 'react'
import styled, { css } from 'styled-components'
import { useVisibleFocus } from 'react-hooks-shareable'
import { Icon, IconType } from '../Icon'
import { Typography } from '../Typography'
import { componentSize, opacity, spacing, shape } from '../designparams'

// Button min-width should be "Cancel" button width
const BUTTON_MIN_WIDTH = '83px'

//Common CSS for NativeButton and NativeIconTextButton
const COMMON_STYLE = css`
  vertical-align: middle;
  white-space: nowrap;
  height: ${componentSize.small};
  outline: none;
  &::-moz-focus-inner {
    border: 0;
  }
  border-radius: ${shape.radius.small};
  cursor: pointer;
  user-select: none;
  transition: all 200ms;
  max-width: 100%;
`

/**
 * Button
 *
 * It has variant `primary` or `secondary`.
 * Default variant is `primary`.
 * `secondary` button change its color if `accent` property is true.
 *
 */

export const NativeButton = styled.button<{
	readonly variant: ButtonVariantType
	readonly accent: boolean
	readonly icon?: IconType
	readonly visibleFocus: boolean
}>`
  ${COMMON_STYLE}
  min-width: ${BUTTON_MIN_WIDTH};
  border: 2px solid transparent;
  padding: ${({ icon }) =>
		icon === undefined
			? `0 ${spacing.large}`
			: `0 ${spacing.large} 0 ${spacing.medium}`};

  ${({ variant, accent, visibleFocus, theme }) => {
		if (variant === 'primary') {
			return css`
        color: ${theme.color.text00()};
        fill: ${theme.color.text00()};
        background-color: ${theme.color.elementPrimary()};
        box-shadow: ${theme.shadow.primaryButton};

        &:hover {
          background-color: ${theme.color.textPrimary()};
          box-shadow: ${theme.shadow.primaryButton};
        }

        &:focus {
          ${
						visibleFocus
							? css`
                background-color: ${theme.color.elementPrimary()};
                box-shadow: ${theme.shadow.primaryButton};
                border: 2px solid ${theme.color.elementBorderFocus()};
              `
							: undefined
					};
        }

        &:active {
          background-color: ${theme.color.textPrimary()};
          box-shadow: 0 0 0 4px ${theme.color.elementBorderActive(opacity[24])};
        }

        &:disabled {
          background-color: ${theme.color.elementPrimary()};
        }
      `
		} else if (accent) {
			return css`
        color: ${theme.color.elementPrimary()};
        fill: ${theme.color.elementPrimary()};
        background-color: transparent;

        &:hover {
          color: ${theme.color.textPrimary()};
          background-color: ${theme.color.elementPrimary(opacity[16])};
        }

        &:focus {
          ${
						visibleFocus
							? css`
                color: ${theme.color.elementPrimary()};
                background-color: ${theme.color.elementPrimary(opacity[16])};
                border: 2px solid ${theme.color.elementBorder()};
              `
							: undefined
					};
        }

        &:active {
          color: ${theme.color.textPrimary()};
          background-color: ${theme.color.elementPrimary(opacity[24])};
        }

        &:disabled {
          color: ${theme.color.elementPrimary()};
          fill: ${theme.color.elementPrimary()};
          background-color: transparent;
        }
      `
		}

		return css`
      color: ${theme.color.text04()};
      fill: ${theme.color.text04()};
      background-color: transparent;

      &:hover {
        color: ${theme.color.text03()};
        background-color: ${theme.color.element11(opacity[16])};
      }

      &:focus {
        ${
					visibleFocus
						? css`
              color: ${theme.color.text04()};
              background-color: ${theme.color.element11(opacity[16])};
              border: 2px solid ${theme.color.elementBorder()};
            `
						: undefined
				};
      }

      &:active {
        color: ${theme.color.text03()};
        background-color: ${theme.color.element11(opacity[24])};
      }

      &:disabled {
        color: ${theme.color.text04()};
        fill: ${theme.color.text04()};
        background-color: transparent;
      }
    `
	}}

  /** common disabled style */
  ${({ disabled }) =>
		disabled === true
			? css`
          opacity: ${opacity[48]};
          cursor: default;
          box-shadow: none;

          &:hover,
          active,
          focus {
            box-shadow: none;
            border: 2px solid transparent;
          }
        `
			: undefined}
`

const Container = styled.span.attrs({ className: 'sc-Container' })`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonIcon = styled(Icon).attrs({ className: 'sc-ButtonIcon' })<{
	readonly addSpace: boolean
}>`
  fill: inherit;
  flex: none;
  ${({ addSpace }) =>
		addSpace
			? css`
          margin-right: ${spacing.medium};
        `
			: undefined}
`

const LabelContainer = styled.span.attrs({ className: 'sc-LabelContainer' })<{
	readonly variant: ButtonVariantType
	readonly accent: boolean
}>`
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  color: inherit;
  text-transform: ${({ variant, accent, theme }) => {
		if (variant === 'primary') {
			return theme.font.button.primary.textTransform
		} else if (accent) {
			return theme.font.button.secondary.accent.textTransform
		}
		return theme.font.button.secondary.default.textTransform
	}};
`

type BaseElement = HTMLButtonElement
type BaseProps = ButtonHTMLAttributes<BaseElement>
type ButtonType = 'button' | 'submit' | 'reset'
export type ButtonVariantType = 'primary' | 'secondary'
export type ButtonClickHandler = MouseEventHandler<BaseElement>

interface BaseButtonProps extends BaseProps {
	/**
	 * Specifies the name for a <button> element.
	 */
	readonly name?: BaseProps['name']
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * Specifies the type of button.
	 * Default: `button`
	 */
	readonly type?: ButtonType
	/**
	 * Button variant.
	 * Default: `primary`
	 */
	readonly variant?: ButtonVariantType
	/**
	 * If `true` the secondary button gets primary color.
	 * Default: `false`
	 */
	readonly accent?: boolean
}

export interface ButtonProps extends BaseButtonProps {
	/**
	 * String used to label the button.
	 */
	readonly label: string
	/**
	 * The icon element.
	 */
	readonly icon?: IconType
}

export const Button = forwardRef<BaseElement, ButtonProps>(
	(
		{
			disabled = false,
			type = 'button',
			variant = 'primary',
			accent = false,
			icon,
			onPointerDown,
			onPointerUp,
			onFocus,
			label,
			...props
		},
		ref
	) => {
		const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
			useVisibleFocus()

		const handleFocus = useCallback<FocusEventHandler<BaseElement>>(
			e => {
				onFocus?.(e)
				determineVisibleFocus()
			},
			[determineVisibleFocus, onFocus]
		)
		const handlePointerDown = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerDown?.(e)
				isPointerOn()
			},
			[isPointerOn, onPointerDown]
		)
		const handlePointerUp = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerUp?.(e)
				isPointerOff()
			},
			[isPointerOff, onPointerUp]
		)

		return (
			<NativeButton
				ref={ref}
				disabled={disabled}
				type={type}
				variant={variant}
				accent={accent}
				icon={icon}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onFocus={handleFocus}
				{...props}
				visibleFocus={visibleFocus}
			>
				<Container>
					{icon !== undefined ? (
						<ButtonIcon icon={icon} addSpace={true} />
					) : undefined}
					<LabelContainer variant={variant} accent={accent}>
						<Typography variant="button-text">{label}</Typography>
					</LabelContainer>
				</Container>
			</NativeButton>
		)
	}
)

/*
 * IconButton
 *
 * It has variant `primary` or `secondary`.
 * Default variant is `primary`.
 *
 * `secondary` IconButton has Halo background that become bigger on active state
 * than on hover state. And it changes its color if `accent` property is true.
 *
 */

const IconNativeButton = styled(NativeButton)<{
	readonly visibleFocus: boolean
}>`
  position: relative;
  flex: none;
  height: ${componentSize.small};
  width: ${componentSize.small};
  min-width: unset;
  padding: unset;

  ${({ variant, accent, visibleFocus, theme }) => {
		if (variant === 'primary') {
			return undefined
		} else if (accent) {
			return css`
        background-color: transparent;
        border-radius: ${shape.radius.circle};

        &:hover {
          background-color: transparent;
          border: 0 solid transparent;
          ${IconButtonHalo} {
            background-color: ${theme.color.elementPrimary(opacity[16])};
            transform: scale(1);
          }
        }
        &:focus {
          ${
						visibleFocus
							? css`
                background-color: transparent;
                border: 2px solid ${theme.color.elementBorder()};
                ${IconButtonHalo} {
                  background-color: ${theme.color.elementPrimary(opacity[16])};
                  transform: scale(1);
                }
              `
							: undefined
					}
        }
        &:active {
          background-color: transparent;
          ${IconButtonHalo} {
            background-color: ${theme.color.elementPrimary(opacity[24])};
            transform: scale(1.06);
          }
        }
      `
		}
		return css`
      background-color: transparent;
      border-radius: ${shape.radius.circle};

      &:hover {
        background-color: transparent;
        border: 0 solid transparent;
        ${IconButtonHalo} {
          background-color: ${theme.color.element11(opacity[16])};
          transform: scale(1);
        }
      }
      &:focus {
        ${
					visibleFocus
						? css`
              background-color: transparent;
              border: 2px solid ${theme.color.elementBorder()};
              ${IconButtonHalo} {
                background-color: ${theme.color.element11(opacity[16])};
                transform: scale(1);
              }
            `
						: undefined
				}
      }
      &:active {
        background-color: transparent;
        ${IconButtonHalo} {
          background-color: ${theme.color.element11(opacity[24])};
          transform: scale(1.06);
        }
      }
    `
	}}
`

const IconButtonHalo = styled.div<{ readonly accent: boolean }>`
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

export interface IconButtonProps extends BaseButtonProps {
	/**
	 * Icon that shows inside Button.
	 */
	readonly icon: IconType
}

export const IconButton = forwardRef<BaseElement, IconButtonProps>(
	(
		{
			disabled,
			type = 'button',
			variant = 'primary',
			accent = false,
			onPointerDown,
			onPointerUp,
			onFocus,
			icon,
			...props
		},
		ref
	) => {
		const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
			useVisibleFocus()

		const handleFocus = useCallback<FocusEventHandler<BaseElement>>(
			e => {
				onFocus?.(e)
				determineVisibleFocus()
			},
			[determineVisibleFocus, onFocus]
		)
		const handlePointerDown = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerDown?.(e)
				isPointerOn()
			},
			[isPointerOn, onPointerDown]
		)
		const handlePointerUp = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerUp?.(e)
				isPointerOff()
			},
			[isPointerOff, onPointerUp]
		)

		return (
			<IconNativeButton
				ref={ref}
				disabled={disabled}
				type={type}
				variant={variant}
				accent={accent}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onFocus={handleFocus}
				{...props}
				visibleFocus={visibleFocus}
			>
				<ButtonIcon icon={icon} addSpace={false} />
				{variant === 'secondary' ? (
					<IconButtonHalo accent={accent} />
				) : undefined}
			</IconNativeButton>
		)
	}
)

/**
 * IconTextButton
 *
 * Always has a primary icon and a secondary text
 *
 */

export const NativeIconTextButton = styled.button<{
	readonly visibleFocus: boolean
}>`
  ${COMMON_STYLE}
  border: none;
  padding: 0 ${spacing.large} 0 0;
  ${({ visibleFocus, theme }) => {
		return css`
      color: ${theme.color.text04()};
      fill: ${theme.color.text04()};
      background-color: transparent;

      &:hover {
        color: ${theme.color.text03()};
        background-color: ${theme.color.element11(opacity[16])};
        ${IconContainer} {
          background-color: ${theme.color.textPrimary()};
        }
      }
      &:focus {
        ${
					visibleFocus
						? css`
              color: ${theme.color.text04()};
              background-color: ${theme.color.element11(opacity[16])};
            `
						: undefined
				};
      }
      &:active {
        box-shadow: 0 0 0 4px ${theme.color.elementPrimary(opacity[24])};
        background-color: ${theme.color.element11(opacity[24])};
      }
      &:disabled {
        opacity: ${opacity[48]};
        cursor: default;
        box-shadow: none;
        &:hover {
          ${IconContainer} {
            background-color: ${theme.color.elementPrimary()};
          }
        }
      }
    `
	}}
`
const IconContainer = styled(Icon)`
  ${({ theme }) => {
		return css`
      box-sizing: border-box;
      height: ${componentSize.small};
      width: ${componentSize.small};
      color: ${theme.color.text00()};
      background-color: ${theme.color.elementPrimary()};
      border-radius: ${shape.radius.small};
      margin-right: ${spacing.medium};
      padding: ${spacing.small};
      transition: all 200ms;
    `
	}}
`
export interface IconTextButtonProps
	extends Omit<BaseButtonProps, 'variant' | 'accent'> {
	/**
	 * String used to label the button.
	 */
	readonly label: string
	/**
	 * The icon element.
	 */
	readonly icon: IconType
}

export const IconTextButton = forwardRef<BaseElement, IconTextButtonProps>(
	(
		{
			disabled = false,
			type = 'button',
			icon,
			onPointerDown,
			onPointerUp,
			onFocus,
			label,
			...props
		},
		ref
	) => {
		const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
			useVisibleFocus()

		const handleFocus = useCallback<FocusEventHandler<BaseElement>>(
			e => {
				onFocus?.(e)
				determineVisibleFocus()
			},
			[determineVisibleFocus, onFocus]
		)
		const handlePointerDown = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerDown?.(e)
				isPointerOn()
			},
			[isPointerOn, onPointerDown]
		)
		const handlePointerUp = useCallback<PointerEventHandler<BaseElement>>(
			e => {
				onPointerUp?.(e)
				isPointerOff()
			},
			[isPointerOff, onPointerUp]
		)
		return (
			<NativeIconTextButton
				ref={ref}
				disabled={disabled}
				type={type}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onFocus={handleFocus}
				{...props}
				visibleFocus={visibleFocus}
			>
				<Container>
					<IconContainer icon={icon} />
					<LabelContainer variant="primary" accent={false}>
						<Typography variant="button-text">{label}</Typography>
					</LabelContainer>
				</Container>
			</NativeIconTextButton>
		)
	}
)
