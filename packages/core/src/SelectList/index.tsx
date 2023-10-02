import {
	useCallback,
	useRef,
	useEffect,
	useMemo,
	LiHTMLAttributes,
	FC,
	MouseEvent,
	KeyboardEvent,
} from 'react'
import styled, { css } from 'styled-components'
import { shape, spacing } from '../designparams'
import { Typography } from '../Typography'

type BaseElement = HTMLUListElement
type BaseProps = LiHTMLAttributes<BaseElement>

const LIST_ITEM_HEIGHT = 32

interface SelectListItemProps {
	readonly disabled: boolean
	readonly selected: boolean
}

const SelectListItem = styled.li<SelectListItemProps>`
  height: ${LIST_ITEM_HEIGHT}px;
  padding: 0 ${spacing.medium};
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  cursor: pointer;
  ${({ disabled, selected }) => {
		if (disabled) {
			return css`
        color: ${({ theme }) => theme.color.text04()};
        pointer-events: none;
      `
		}
		if (selected) {
			return css`
        color: ${({ theme }) => theme.color.text00()};
        background-color: ${({ theme }) => theme.color.elementPrimary()};
        pointer-events: none;
      `
		}
		return css`
      &:hover {
        background-color: ${({ theme }) => theme.color.background02()};
      }
    `
	}}
`

interface SelectListNativeProps {
	readonly maxHeight: string
}

const SelectListNative = styled.ul<SelectListNativeProps>`
  padding: 0;
  outline: none;
  list-style: none;
  user-select: none;
  background-color: ${({ theme }) => theme.color.background00()};
  color: ${({ theme }) => theme.color.text01()};
  min-width: 100%;
  border-radius: ${shape.radius.small};
  display: block;
  max-height: ${props => props.maxHeight};
  overflow: hidden;
  overflow-y: auto;
`

export interface SelectListItemOption {
	/**
	 * Value of the option
	 */
	readonly value: string
	/**
	 * Label that is shown to the user in the SelectList component
	 */
	readonly label: string
	/**
	 * Disables the value, restricts the user from selecting it
	 */
	readonly disabled?: boolean
}

export interface SelectListProps extends Omit<BaseProps, 'onSelect'> {
	/**
	 * Current value that is selected.
	 */
	readonly value: string
	/**
	 * Options to be displayed in the SelectList component.
	 */
	readonly options: ReadonlyArray<SelectListItemOption>
	/**
	 * Set state action, returns new selected value.
	 */
	readonly onSelect: (value: string) => void
	/**
	 * Sets the css property maxHeight as px.
	 * Default: `320`
	 */
	readonly maxHeight?: number
}

/**
 * SelectList
 *
 * Is a scrollable list that a user may select one value from,
 * the selected value is highlighted.
 *
 * It differs from the normal Select component in the sense
 * that there is no button to open/close the list of options,
 * in SelectList the options is always visible to the user.
 *
 */
export const SelectList: FC<SelectListProps> = ({
	value,
	options,
	onSelect,
	maxHeight = 320,
	...props
}) => {
	const listRef = useRef<HTMLUListElement>(null)
	const onItemClick = useCallback(
		(e: MouseEvent<HTMLLIElement>) => {
			const clickValue = e.currentTarget.getAttribute('value')
			if (clickValue !== null) {
				onSelect(clickValue)
			}
		},
		[onSelect]
	)

	const selectedValueIndex: number = useMemo(
		() => options.findIndex(o => o.value === value),
		[options, value]
	)

	// At first render _only_, scroll to the position of the selected item.
	useEffect(() => {
		if (listRef.current !== null && selectedValueIndex !== -1) {
			listRef.current.scrollTo(0, selectedValueIndex * LIST_ITEM_HEIGHT)
		}
	}, [])

	const searchForOption = useCallback(
		(e: KeyboardEvent<HTMLUListElement>) => {
			const keyPressed = e.key
			const index = options.findIndex(
				o =>
					o.value.charAt(0).toUpperCase() === keyPressed ||
					o.value.charAt(0).toLowerCase() === keyPressed
			)
			if (listRef.current !== null && index !== -1) {
				listRef.current.scrollTo({
					top: index * LIST_ITEM_HEIGHT,
					behavior: 'smooth',
				})
			}
		},
		[options, listRef]
	)

	// traversingKeys
	enum TraversingKey {
		ArrowUp = 'ArrowUp',
		ArrowDown = 'ArrowDown',
	}

	const halfway = Math.round(maxHeight / LIST_ITEM_HEIGHT / 2)

	const traverseSelection = useCallback(
		(e: KeyboardEvent<HTMLUListElement>) => {
			if (!(e.key in TraversingKey)) {
				return
			}

			e.preventDefault()

			let nextSelectedValueIndex = selectedValueIndex
			let nextScrollTopCount = selectedValueIndex
			switch (e.key) {
				case TraversingKey.ArrowUp:
					if (selectedValueIndex === 0) {
						return
					}
					nextSelectedValueIndex--
					nextScrollTopCount = nextSelectedValueIndex - halfway
					break
				case TraversingKey.ArrowDown:
					if (selectedValueIndex + 1 === options.length) {
						return
					}
					nextSelectedValueIndex++
					nextScrollTopCount = nextSelectedValueIndex - halfway
					break
			}
			onSelect(options[nextSelectedValueIndex].value)
			if (listRef.current !== null && selectedValueIndex !== -1) {
				listRef.current.scrollTo(0, nextScrollTopCount * LIST_ITEM_HEIGHT)
			}
		},
		[options, value, selectedValueIndex]
	)

	return (
		<SelectListNative
			tabIndex={0}
			onKeyUp={searchForOption}
			onKeyDown={traverseSelection}
			maxHeight={`${maxHeight}px`}
			ref={listRef}
			{...props}
		>
			{options.map(option => (
				<SelectListItem
					selected={value === option.value}
					key={option.value}
					value={option.value}
					disabled={option.disabled !== undefined}
					onClick={onItemClick}
					role="menuitem"
				>
					<Typography variant="default-text">{option.label}</Typography>
				</SelectListItem>
			))}
		</SelectListNative>
	)
}
