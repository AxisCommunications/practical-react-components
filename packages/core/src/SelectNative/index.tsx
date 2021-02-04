// Libs
import React from 'react'

import styled from 'styled-components'
import { Icon } from '../Icon'
import { componentSize, opacity, shape, spacing } from '../designparams'

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" />
    </svg>
  )
}

const getWidth = (width: string): string => {
  switch (width) {
    case 'small':
      return '160px'
    case 'medium':
      return '200px'
    case 'large':
      return '300px'
    case 'full':
      return '100%'
    default:
      return '100%'
  }
}

const Container = styled.div<{ readonly width: string }>`
  width: ${({ width }) => getWidth(width)};
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.color.text05()};
`

const IconContainer = styled.div`
  position: absolute;
  right: 8px;
  background-color: transparent;

  > svg {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
`

const NativeSelect = styled.select<{ readonly variant: SelectVariant }>`
  height: ${componentSize.medium};
  width: 100%;
  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ variant, theme }) =>
    variant === 'filled' ? theme.color.background02() : 'transparent'};
  border-width: 0;
  border: 1px solid transparent;
  border-radius: ${shape.radius.medium};
  padding: 0 ${spacing.medium};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === 'filled'
        ? theme.color.background01()
        : theme.color.background02()};
  }

  &:focus {
    outline: none;
    background-color: ${({ variant, theme }) =>
      variant === 'filled' ? theme.color.background02() : 'transparent'};
    border: 1px solid ${({ theme }) => theme.color.textPrimary()};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.background01()};
    border: 1px solid transparent;
  }

  &:disabled {
    opacity: ${opacity[48]};
    pointer-events: none;
  }

  &:required:invalid {
    color: ${({ theme }) => theme.color.text01()};
  }

  /* Hide default arrow */
  appearance: none;
  text-indent: 1px;
  text-overflow: '';
`

const OptionNative = styled.option`
  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ theme }) => theme.color.background00()};
  &:disabled {
    color: ${({ theme }) => theme.color.text05()};
    pointer-events: none;
  }
`

const PlaceholderOption = styled.option`
  color: ${({ theme }) => theme.color.text05()};
  background-color: ${({ theme }) => theme.color.background00()};
  ${/* sc-selector */ NativeSelect}:required &[value=''][disabled] {
    display: none;
  }
`

type BaseElement = HTMLSelectElement
type BaseProps = React.SelectHTMLAttributes<BaseElement>

type SelectVariant = 'filled' | 'transparent'

export interface SelectNativeProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Selects the different items in the dropdown menu. Must pre-exist in the dropdown menu and written in lowercase. Otherwise no value is selected.
   */
  readonly value: string
  /**
   * An array of data used to create a dropdown menu.
   */
  readonly options: ReadonlyArray<{
    /**
     * The value used to define a selectable option.
     */
    readonly value: string
    /**
     * String used to label the selected option.
     */
    readonly label: string
    /**
     * If `true`, the selectable option will be disabled.
     */
    readonly disabled?: boolean
  }>
  /**
   * Executes a JavaScript when a user changes the selected option of an element.
   */
  readonly onChange: React.ChangeEventHandler<HTMLSelectElement>
  /**
   * A name used to specify the particular element.
   */
  readonly name?: BaseProps['name']
  /**
   * Set to true to force the user to select an option in a dropdown menu.
   */
  readonly required?: boolean
  /**
   * Used to determine the width of a dropdown menu.
   */
  readonly width?: 'small' | 'medium' | 'large' | 'full'
  readonly variant?: SelectVariant
  readonly placeholder?: string
  /**
   * If `true`, SelectNative will be disabled.
   */
  readonly disabled?: boolean
}

export const SelectNative: React.FunctionComponent<SelectNativeProps> = ({
  value,
  options,
  onChange,
  name = '',
  required = true,
  width = 'full',
  variant = 'filled',
  placeholder = '',
  disabled = false,
  ...props
}) => {
  return (
    <Container width={width}>
      <NativeSelect
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        variant={variant}
        {...props}
      >
        {value === '' || placeholder !== '' ? (
          <PlaceholderOption value="" disabled={required}>
            {placeholder}
          </PlaceholderOption>
        ) : undefined}
        {options.map(option => (
          <OptionNative
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </OptionNative>
        ))}
      </NativeSelect>
      <IconContainer>
        <Icon icon={ArrowDown} />
      </IconContainer>
    </Container>
  )
}
