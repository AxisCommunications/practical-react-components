import { useMemo, useCallback, SyntheticEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'

import { CloseIcon } from 'practical-react-components-icons'
import { spacing } from '../designparams'
import { ClickableIcon } from '../Icon'

import { Chip } from '../Chip'
import { FieldProps, withField } from '../utils/withField'

import { BaseSelect, BaseSelectProps } from './BaseSelect'
import { Option, PlaceholderContainer } from './Select'

const StyledChip = styled(Chip)`
  background-color: ${({ theme }) => theme.color.element13()};
  margin: ${spacing.small};
`

export interface MultiSelectProps<V extends string = string>
	extends Omit<
		BaseSelectProps<V>,
		'value' | 'component' | 'options' | 'onChange' | 'selectMarker'
	> {
	/**
	 * Selects items in the dropdown menu.
	 * Must pre-exist in the dropdown menu and written in lowercase.
	 * Otherwise no value is selected.
	 */
	readonly value: ReadonlyArray<V>
	/**
	 * Used to create an array of selectable options.
	 */
	readonly options: ReadonlyArray<Option<V>>
	/**
	 * Executes a JavaScript when a user changes the selected option of an element.
	 */
	readonly onChange?: (value: ReadonlyArray<V>) => void
	/**
	 * Placeholder text when no value has been selected.
	 */
	readonly placeholder?: string
}

const SelectInsideContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const ChipContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: hidden;
`

const IconsContainer = styled.div`
  display: flex;
  align-self: stretch;
  align-items: center;
  padding: ${spacing.medium};
`

const Divider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => theme.color.element12()};
  align-self: stretch;
  margin: ${spacing.small} 0;
`

export function MultiSelect<V extends string = string>({
	value,
	options,
	onChange,
	placeholder = '',
	...props
}: MultiSelectProps<V>): JSX.Element {
	const onRemoveAllClick = useCallback(
		(event: SyntheticEvent) => {
			event.stopPropagation()
			onChange?.([])
		},
		[onChange]
	)
	const handleRemoveAllKeyDown = useCallback(
		(event: KeyboardEvent<HTMLSpanElement>) => {
			if (event.key === 'Enter') {
				event.stopPropagation()
				onChange?.([])
			}
		},
		[onChange]
	)

	const onMultiChange = useCallback(
		(nextValue: V | '') => onChange?.([...value, nextValue as V]),

		[value, onChange]
	)

	const chips = useMemo(
		() =>
			value.map(v => ({
				label: options.find(option => option.value === v)?.label ?? '',
				onRemove: () => {
					onChange?.(value.filter(v2 => v2 !== v))
				},
			})),
		[onChange, options, value]
	)

	const component = useMemo(() => {
		if (value.length === 0) {
			return <PlaceholderContainer>{placeholder}</PlaceholderContainer>
		}

		return (
			<SelectInsideContainer>
				<ChipContainer>
					{value.map((v, i) => (
						<StyledChip
							key={v}
							text={chips[i].label}
							onRemove={chips[i].onRemove}
						/>
					))}
				</ChipContainer>
				<IconsContainer>
					<ClickableIcon
						size="small"
						icon={CloseIcon}
						onClick={onRemoveAllClick}
						onKeyDown={handleRemoveAllKeyDown}
					/>
				</IconsContainer>
				<Divider />
			</SelectInsideContainer>
		)
	}, [chips, onRemoveAllClick, handleRemoveAllKeyDown, placeholder, value])

	const notSelectedOptions = useMemo(
		() =>
			options
				.filter(o => !value.includes(o.value))
				.map(({ label, ...rest }) => {
					return { ...rest, component: label }
				}),
		[options, value]
	)

	return (
		<BaseSelect<V | ''>
			value=""
			options={notSelectedOptions}
			component={component}
			{...props}
			onChange={onMultiChange}
		/>
	)
}

export const MultiSelectField = <V extends string = string>(
	props: FieldProps & MultiSelectProps<V>
) => withField<MultiSelectProps<V>>(MultiSelect)(props)
