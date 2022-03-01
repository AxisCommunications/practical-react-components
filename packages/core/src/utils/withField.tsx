import { FC } from 'react'
import styled, { useTheme, css } from 'styled-components'

import { Typography } from '../Typography'
import { componentSize, spacing, opacity } from '../designparams'

interface LabelProps {
  readonly compact: boolean
  readonly disabled: boolean
}

export const Label = styled.div<LabelProps>`
  height: ${({ compact }) =>
    !compact ? componentSize.medium : componentSize.small};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text03()};
  cursor: default;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined};
`

export const WithUnitLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Unit = styled(Typography)<{
  readonly disabled: boolean
}>`
  color: ${({ theme }) => theme.color.text03()};
  margin-left: ${spacing.medium};
  flex-shrink: 0;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined};
`

export interface FieldProps {
  readonly label?: string
  readonly disabled?: boolean
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
  readonly unitLabel?: string
}

export function withField<T>(InputComponent: FC<T>): FC<FieldProps & T> {
  // eslint-disable-next-line react/display-name
  return ({ label, unitLabel, ...props }) => {
    const { compact: compactFromTheme } = useTheme()
    const compact = props.compact ?? compactFromTheme
    const disabled = props.disabled ?? false

    return (
      <div>
        {label !== undefined ? (
          <Label compact={compact} disabled={disabled}>
            <Typography variant="navigation-label">{label}</Typography>
          </Label>
        ) : null}
        {unitLabel !== undefined ? (
          <WithUnitLabelContainer>
            <InputComponent {...(props as T)} />
            <Unit variant="explanatory-text" disabled={disabled}>
              {unitLabel}
            </Unit>
          </WithUnitLabelContainer>
        ) : (
          <InputComponent {...(props as T)} />
        )}
      </div>
    )
  }
}
