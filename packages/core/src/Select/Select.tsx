import { useMemo } from 'react'
import styled from 'styled-components'

import { BaseSelect, BaseSelectProps } from './BaseSelect'
import { FieldProps, withField } from '../utils/withField'

export const LabelContainer = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

export const PlaceholderContainer = styled(LabelContainer)`
  color: ${({ theme }) => theme.color.text05()};
`

export interface Option<V extends string = string> {
	readonly value: V
	readonly label: string
	readonly disabled?: boolean
}

export interface SelectProps<V extends string = string>
	extends Omit<BaseSelectProps<V>, 'component' | 'options'> {
	/**
	 * Selects an item in the dropdown menu.
	 * Must pre-exist in the dropdown menu and written in lowercase.
	 * Otherwise no value is selected.
	 */
	readonly value: V
	/**
	 * Used to create an array of selectable options.
	 */
	readonly options: ReadonlyArray<Option<V>>
	/**
	 * Executes a JavaScript when a user changes the selected option of an element.
	 */
	readonly placeholder?: string
	/**
	 * If `true`, select will be disabled.
	 */
	readonly disabled?: boolean
}

export function Select<V extends string = string>({
	value: currentValue,
	options,
	placeholder = '',
	...props
}: SelectProps<V>): JSX.Element {
	const textOptions = useMemo(
		() =>
			options.map(({ value, label, disabled }) => {
				return { value, disabled, component: label }
			}),
		[options]
	)

	const currentLabel = useMemo(
		() => options.find(({ value }) => value === currentValue)?.label,
		[currentValue, options]
	)

	const label = useMemo(
		() =>
			currentLabel === undefined ? (
				<PlaceholderContainer>{placeholder}</PlaceholderContainer>
			) : (
				<LabelContainer>{currentLabel}</LabelContainer>
			),
		[currentLabel, placeholder]
	)

	return (
		<BaseSelect
			value={currentValue}
			options={textOptions}
			component={label}
			{...props}
		/>
	)
}

export const SelectField = <V extends string = string>(
	props: FieldProps & SelectProps<V>
) => withField<SelectProps<V>>(Select)(props)
