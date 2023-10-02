import {
	useCallback,
	useMemo,
	ReactNode,
	HTMLAttributes,
	MouseEventHandler,
} from 'react'
import styled, { css } from 'styled-components'

import { spacing, shape, opacity, componentSize } from '../designparams'
import { withField, FieldProps } from '../utils'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

interface ToggleButtonContainerProps {
	readonly disabled: boolean
	readonly selected: boolean
}

const ToggleButtonContainer = styled.div<ToggleButtonContainerProps>`
  box-sizing: border-box;
  max-width: 100%;
  position: relative;
  cursor: pointer;
  transition: all 200ms;
  :not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.color.element13()};
  }
  ${({ theme, selected, disabled }) => {
		if (disabled) {
			return css`
        opacity: ${opacity[48]};
        pointer-events: none;
        cursor: default;
        box-shadow: none;
      `
		}
		if (selected) {
			return css`
        &:active {
          z-index: 1;
          box-shadow: -1px 0 0 5px ${theme.color.elementPrimary(opacity[24])};
          border-radius: ${shape.radius.medium};
        }
      `
		}
	}}
`

interface ToggleButtonContentProps {
	readonly selected: boolean
}

const ToggleButtonContent = styled.div<ToggleButtonContentProps>`
  background-color: ${({ theme }) => theme.color.background00()};
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 ${spacing.medium};
  overflow: hidden;
  white-space: nowrap;
  transition: all 200ms;

  ${({ theme, selected }) => {
		if (selected) {
			return css`
        color: ${theme.color.text00()};
        fill: ${theme.color.text00()};
        background-color: ${theme.color.elementPrimary()};
        &:focus {
          outline-color: ${theme.color.textPrimary()};
        }
        &:hover {
          background-color: ${theme.color.textPrimary()};
        }
      `
		}
		return css`
      &:hover {
        background-color: ${theme.color.element11(opacity[16])};
      }
      &:focus {
        background-color: ${theme.color.element11(opacity[16])};
        outline-color: ${theme.color.textPrimary()};
      }
      &:active {
        background-color: ${theme.color.element11(opacity[24])};
      }
      color: ${theme.color.element01()};
      fill: ${theme.color.element01()};
    `
	}}
`

const ToggleButtonGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${componentSize.mini}, 1fr));
  user-select: none;
  border: 1px solid ${({ theme }) => theme.color.element13()};
  border-radius: ${shape.radius.small};
`

interface ToggleButtonProps<T extends string | number> {
	/**
	 * The id to associate with when selected.
	 */
	readonly id: T
	/**
	 * Array of id values that should be toggled.
	 */
	readonly values: ReadonlyArray<T>
	/**
	 * If `true`, the button will be disabled.
	 */
	readonly disabled?: boolean
	/**
	 * Callback fired when user clicks the button.
	 * @param id The given id prop
	 */
	readonly onClick: (id: T) => void
	/**
	 * If `true`, only allow one of the child ToggleButton values to be selected.
	 * @default false
	 */
	readonly exclusive?: boolean
	/**
	 * ToggleButton content.
	 */
	readonly content: ReactNode
}

/**
 * ToggleButton
 *
 * can be used to toggle between different states of the application.
 *
 * Usage of it can be found in e.g. DateTimePicker where it is used to
 * toggle between different time settings.
 */
function ToggleButton<T extends string | number>({
	id,
	values,
	disabled = false,
	onClick,
	content,
	exclusive = false,
}: ToggleButtonProps<T>): JSX.Element {
	const selected = useMemo(
		() => values.some(value => value === id),
		[values, id]
	)
	const onButtonClick = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
		if (disabled) {
			return
		}

		if (exclusive && selected) {
			return
		}

		onClick(id)
	}, [disabled, id, exclusive, selected, onClick])

	return (
		<ToggleButtonContainer
			selected={selected}
			disabled={disabled}
			onClick={onButtonClick}
		>
			<ToggleButtonContent tabIndex={1} selected={selected}>
				{content}
			</ToggleButtonContent>
		</ToggleButtonContainer>
	)
}

export interface ToggleButtonGroupOption<T extends string | number> {
	/**
	 * The id to associate with when selected.
	 */
	readonly id: T
	/**
	 * Togglebutton content, can be e.g. Icon or Typography.
	 */
	readonly content: ReactNode
	/**
	 * Use to disable toggle button
	 * Default `false`
	 */
	readonly disabled?: boolean
}

export interface ToggleButtonGroupProps<T extends string | number>
	extends Omit<BaseProps, 'onChange'> {
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * ToggleButton options with ID, react node element as content and disabled.
	 */
	readonly options: ReadonlyArray<ToggleButtonGroupOption<T>>
	/**
	 * Array of id values that should be toggled.
	 */
	readonly values: ReadonlyArray<T>
	/**
	 * If `true`, only allow one of the child ToggleButton values to be selected.
	 * @default false
	 */
	readonly exclusive?: boolean
	/**
	 * Callback fired when user clicks a toggle button.
	 * @param id The toggle button id prop
	 */
	readonly onChange: (id: T) => void
}

export function ToggleButtonGroup<T extends string | number>({
	options,
	onChange,
	values,
	exclusive = false,
	...props
}: ToggleButtonGroupProps<T>): JSX.Element {
	return (
		<ToggleButtonGrid {...props}>
			{options.map(option => {
				return (
					<ToggleButton
						key={option.id}
						{...option}
						values={values}
						onClick={onChange}
						exclusive={exclusive}
					/>
				)
			})}
		</ToggleButtonGrid>
	)
}

export const ToggleButtonGroupWithField = <T extends string | number>(
	props: Pick<FieldProps, 'label' | 'compact'> & ToggleButtonGroupProps<T>
) => withField<ToggleButtonGroupProps<T>>(ToggleButtonGroup)(props)
