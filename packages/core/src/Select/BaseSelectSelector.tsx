import React from 'react'
import styled, { css, useTheme } from 'styled-components'

import { Icon } from '../Icon'
import { ArrowDownIcon, ArrowUpIcon } from './icons'
import { componentSize, shape, spacing, opacity } from '../designparams'

export type SelectVariant = 'filled' | 'transparent' | 'framed'

interface SelectInputProps {
  readonly compact: boolean
  readonly variant: SelectVariant
  readonly hasError: boolean
  readonly openedFocus: boolean
  readonly visibleFocus: boolean
  readonly disabled: boolean
}

export const SelectInsideContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  height: 100%;
  width: 100%;
`

const SelectInput = styled.div<SelectInputProps>`
  display: flex;
  align-items: center;
  min-height: ${({ compact }) =>
    compact ? componentSize.small : componentSize.medium};
  color: ${({ theme }) => theme.color.text01()};

  background-color: ${({ variant, theme }) =>
    variant === 'filled' || variant === 'framed'
      ? theme.color.background02()
      : 'transparent'};

  padding: 2px;
  border: 0 solid transparent;
  border-radius: ${shape.radius.medium};

  ${({ variant, theme }) =>
    variant === 'framed'
      ? css`
          padding: 1px;
          border: 1px solid ${theme.color.element01()};
        `
      : undefined}

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};
  text-align: left;
  cursor: pointer;

  ${SelectInsideContainer} {
    padding: ${({ compact }) =>
      compact
        ? `0 ${spacing.small} 0 ${spacing.medium}`
        : `0 ${spacing.medium}`};
  }

  ${SelectInsideContainer} > *:last-child > svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    fill: ${({ theme }) => theme.color.element01()};
  }

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === 'filled' || variant === 'framed'
        ? theme.color.background01()
        : theme.color.background02()};

    ${({ variant, theme }) =>
      variant === 'framed'
        ? css`
            padding: 0;
            border: 2px solid ${theme.color.element01()};
          `
        : undefined}
  }

  &:focus-within {
    outline: none;

    ${({ openedFocus, visibleFocus, variant, theme }) =>
      openedFocus
        ? css`
            background-color: ${theme.color.background01()};
            border: none;
            padding: 2px;
          `
        : visibleFocus
        ? css`
            background-color: ${variant === 'filled' || variant === 'framed'
              ? theme.color.background01()
              : 'transparent'};
            border: 2px solid ${theme.color.textPrimary()};
            padding: 0;
          `
        : undefined}
  }

  &:active {
    background-color: ${({ theme }) => theme.color.background01()};
    border: none;
    padding: 2px;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}

  ${({ theme, hasError }) =>
    hasError
      ? css`
          &,
          &:hover,
          &:focus {
            background-color: ${theme.color.backgroundError()};
            border-color: ${theme.color.elementError()};
          }
        `
      : undefined};
`

export interface BaseSelectSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  readonly onToggleOpen: React.MouseEventHandler
  readonly open: boolean
  readonly compact?: boolean
  readonly disabled?: boolean
  readonly variant?: SelectVariant
  readonly hasError?: boolean
  readonly visibleFocus?: boolean
}

export const BaseSelectSelector: React.FC<BaseSelectSelectorProps> = ({
  onToggleOpen,
  open,
  children,
  compact: compactFromProps,
  disabled = false,
  variant = 'filled',
  hasError = false,
  visibleFocus = false,
  ...props
}) => {
  const { compact: compactFromTheme } = useTheme()
  const compact = compactFromProps ?? compactFromTheme

  return (
    <SelectInput
      role="button"
      tabIndex={0}
      onClick={onToggleOpen}
      compact={compact}
      disabled={disabled}
      variant={variant}
      openedFocus={open}
      visibleFocus={visibleFocus}
      hasError={hasError}
      {...props}
    >
      <SelectInsideContainer>
        {children}
        <Icon icon={open ? ArrowUpIcon : ArrowDownIcon} />
      </SelectInsideContainer>
    </SelectInput>
  )
}
