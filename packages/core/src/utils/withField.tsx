import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Typography } from '../Typography'
import { componentSize, spacing } from '../designparams'

export interface FieldProps {
  readonly label?: string
  /**
   * Override theme's default setting for `compact` if set.

   */
  readonly compact?: boolean
  readonly unitLabel?: string
}

export const Label = styled.div<{ readonly compact: boolean }>`
  height: ${({ compact }) =>
    !compact ? componentSize.medium : componentSize.small};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text03()};
  cursor: default;
`

export const WithUnitLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Unit = styled(Typography)`
  color: ${({ theme }) => theme.color.text03()};
  margin-left: ${spacing.medium};
  flex-shrink: 0;
`

export function withField<T>(
  InputComponent: React.FunctionComponent<T>
): React.FunctionComponent<FieldProps & T> {
  // eslint-disable-next-line react/display-name
  return ({ label, unitLabel, ...props }) => {
    const { compact: compactFromTheme } = useTheme()
    const compact = props.compact ?? compactFromTheme

    return (
      <div>
        {label !== undefined ? (
          <Label compact={compact}>
            <Typography variant="navigation-label">{label}</Typography>
          </Label>
        ) : null}
        {unitLabel !== undefined ? (
          <WithUnitLabelContainer>
            <InputComponent {...(props as T)} />
            <Unit variant="explanatory-text">{unitLabel}</Unit>
          </WithUnitLabelContainer>
        ) : (
          <InputComponent {...(props as T)} />
        )}
      </div>
    )
  }
}
