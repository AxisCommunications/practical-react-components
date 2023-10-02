import {
	useMemo,
	useState,
	useCallback,
	useRef,
	useEffect,
	ReactNode,
	ChangeEventHandler,
} from 'react'
import styled from 'styled-components'

import { useBoolean } from 'react-hooks-shareable'

import { BaseSelect } from './BaseSelect'
import { SelectProps, Option } from './Select'
import { FieldProps, withField } from '../utils/withField'

const InputNative = styled.input`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};
  display: unset;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: inherit;
  color: ${({ theme }) => theme.color.text01()};
  background-color: transparent;
  border-width: 0;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.text05()};
  }
`

const getLabel = <V extends string = string>(
	value: V,
	options: ReadonlyArray<Option<V>>
): string => {
	return options.find(option => option.value === value)?.label ?? value
}

const getLabelComponent = (label: string, filter: string): ReactNode => {
	const offset = label.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase())

	if (offset === -1) {
		return label
	}

	return (
		<span>
			{label.substring(0, offset)}
			<strong>{label.substring(offset, offset + filter.length)}</strong>
			{label.substring(offset + filter.length)}
		</span>
	)
}

export function SearchSelect<V extends string = string>({
	value: currentValue,
	options,
	onChange,
	placeholder,
	...props
}: SelectProps<V>): JSX.Element {
	const [filter, setFilter] = useState<string>(currentValue)
	const [isTyping, startTyping, stopTyping] = useBoolean(false)

	const inputRef = useRef<HTMLInputElement>(null)

	const filterLabel = useCallback(
		(text: string) =>
			text.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
		[filter]
	)

	const textOptions = useMemo(() => {
		return options
			.filter(({ label }) => !isTyping || filterLabel(label))
			.map(({ value, disabled, label }) => {
				return { value, disabled, component: getLabelComponent(label, filter) }
			})
	}, [options, isTyping, filterLabel, filter])

	const onSelectChange = useCallback(
		(nextValue: V) => {
			setFilter(getLabel(nextValue, options) ?? nextValue)
			onChange?.(nextValue)
			stopTyping()
		},
		[onChange, options, stopTyping]
	)

	const onFilterChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		e => {
			setFilter(e.target.value)
			startTyping()
		},
		[startTyping]
	)

	const selectInputText = useCallback(() => inputRef.current?.select(), [])

	const resetInputText = useCallback(() => {
		setFilter(getLabel(currentValue, options))
		stopTyping()
	}, [currentValue, options])

	useEffect(
		() => setFilter(getLabel(currentValue, options)),
		[currentValue, options]
	)

	const input = (
		<InputNative
			ref={inputRef}
			value={filter}
			onChange={onFilterChange}
			onFocus={selectInputText}
			onBlur={resetInputText}
			placeholder={placeholder}
		/>
	)

	return (
		<BaseSelect
			value={currentValue}
			options={textOptions}
			component={input}
			{...props}
			onChange={onSelectChange}
		/>
	)
}

export const SearchSelectField = <V extends string = string>(
	props: FieldProps & SelectProps<V>
) => withField<SelectProps<V>>(SearchSelect)(props)
