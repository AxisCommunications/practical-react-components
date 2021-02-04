import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'

import { useBoolean } from 'react-hooks-shareable'

import { BaseSelect } from './BaseSelect'
import { ISelectProps } from './Select'
import { IFieldProps, withField } from '../utils/withField'

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

export function SearchSelect<V extends string = string>({
  value: currentValue,
  options,
  onChange,
  placeholder,
  ...props
}: ISelectProps<V>): JSX.Element {
  const [filter, setFilter] = useState('')
  const [isTyping, startTyping, stopTyping] = useBoolean(false)

  const filterLabel = useCallback(
    (text: string) =>
      text.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    [filter]
  )

  const textOptions = useMemo(() => {
    return options
      .filter(({ label }) => !isTyping || filterLabel(label))
      .map(({ value, disabled, label }) => {
        return { value, disabled, component: label }
      })
  }, [options, filterLabel, isTyping])

  const onSelectChange = useCallback(
    value => {
      setFilter(value)
      onChange?.(value)
      stopTyping()
    },
    [onChange, stopTyping]
  )

  const onFilterChange = useCallback(
    e => {
      setFilter(e.target.value)
      startTyping()
    },
    [startTyping]
  )

  const input = (
    <InputNative
      value={filter}
      onChange={onFilterChange}
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
  props: IFieldProps & ISelectProps<V>
) => withField<ISelectProps<V>>(SearchSelect)(props)
