export * from './BaseChip'

import React, { useMemo } from 'react'
import styled from 'styled-components'

import { CloseIcon } from 'practical-react-components-icons'

import { spacing } from '../designparams'
import { ClickableIcon, Icon, IconType } from '../Icon'
import { Typography } from '../Typography'
import { BaseChip, BaseChipProps } from './BaseChip'

const ChipIcon = styled(Icon).attrs({ size: 'small' })`
  flex: 0 0 min-content;
  overflow: visible;
  margin-left: -${spacing.small};
  margin-right: ${spacing.small};
  color: ${({ theme }) => theme.color.text03()};
`

const ChipRemoveIcon = styled(ClickableIcon).attrs({
  tabIndex: 0,
  size: 'small',
  icon: CloseIcon,
})<{ readonly disabled: boolean }>`
  flex: 0 0 min-content;
  overflow: visible;
  margin-left: ${spacing.small};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
`

interface ChipProps extends Omit<BaseChipProps, 'component' | 'noPadding'> {
  /**
   * Changes the text of the label displayed on the chip.
   */
  readonly text: string
  /**
   * Optional icon next to text when no error
   */
  readonly icon?: IconType
  /**
   * Function to call if remove icon is pressed. Remove icon
   * only visible if this prop is set.
   */
  readonly onRemove?: (e: React.MouseEvent) => void
}

/* eslint-disable-next-line react/display-name */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    { text, error = false, disabled = false, onRemove, icon, ...props },
    ref
  ) => {
    const component = useMemo(() => {
      return (
        <>
          {!error && icon !== undefined ? <ChipIcon icon={icon} /> : null}
          <Typography variant="chip-tag-text">{text}</Typography>
          {onRemove ? (
            <ChipRemoveIcon disabled={disabled} onClick={onRemove} />
          ) : null}
        </>
      )
    }, [text, error, icon, onRemove, disabled])

    return (
      <BaseChip
        ref={ref}
        disabled={disabled}
        error={error}
        component={component}
        {...props}
      />
    )
  }
)
