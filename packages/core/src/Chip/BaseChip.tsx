import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Icon } from '../Icon'
import { opacity, shape, spacing, componentSize } from '../designparams'
import { ErrorWithoutCircleIcon } from './icons'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const ChipArea = styled.div<{
  readonly error: boolean
  readonly disabled: boolean
}>`
  position: relative;

  box-sizing: border-box;
  user-select: none;

  height: ${componentSize.mini};
  width: min-content;
  /** space for a character and dots */
  min-width: ${({ error }) =>
    error ? componentSize.extraLarge : componentSize.small};
  max-width: 100%;

  padding: 0 ${spacing.medium};

  display: flex;
  align-items: center;

  overflow: hidden;

  border-radius: ${shape.radius.small};
  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ error, theme }) =>
    error ? theme.color.backgroundError() : theme.color.background01()};

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
        `
      : undefined};

  ${({ error, theme }) =>
    error
      ? css`
          color: ${theme.color.textError()};
          padding-left: 0;
          border: 1px solid ${theme.color.elementError()};
        `
      : undefined};
`

const ChipErrorIcon = styled(Icon).attrs({ icon: ErrorWithoutCircleIcon })`
  flex: 0 0 min-content;
  overflow: visible;
  color: ${({ theme }) => theme.color.elementError()};
`

export interface BaseChipProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * If `true`, adds an error notification to the chip.
   */
  readonly error?: boolean
  /**
   * If `true`, the chip will be disabled.
   */
  readonly disabled?: boolean
  /**
   * Component to render inside the chip.
   */
  readonly component: ReactNode
}

/* eslint-disable-next-line react/display-name */
export const BaseChip = React.forwardRef<HTMLDivElement, BaseChipProps>(
  ({ error = false, disabled = false, component, ...props }, ref) => (
    <ChipArea ref={ref} error={error} disabled={disabled} {...props}>
      {error ? <ChipErrorIcon /> : null}
      {component}
    </ChipArea>
  )
)
