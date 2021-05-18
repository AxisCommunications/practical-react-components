import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'

import { componentSize, opacity, shape, spacing } from '../designparams'
import { Typography } from '../Typography'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>
type OnClickHandler = React.MouseEventHandler<BaseElement>
type TabVariant = 'inside' | 'outside'

const OUTSIDE_TAB_HEIGHT = componentSize.small
const MARKER_THICKNESS = '2px'

const TabContainer = styled.div`
  display: flex;
  height: 100%;
`
const Tab = styled.div<{
  readonly selected: boolean
  readonly disabled: boolean
  readonly variant: TabVariant
  readonly hasBackground: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ variant, selected, theme }) =>
    variant === 'inside'
      ? css`
          position: relative;
          max-width: 100%;
          overflow: hidden;
          padding: 0 ${spacing.medium};
          color: ${selected ? theme.color.text01() : theme.color.text05()};

          &:not(:first-child) {
            margin-left: ${spacing.medium};
          }

          &:hover {
            color: ${selected ? undefined : theme.color.text03()};
          }
        `
      : css`
          background-color: ${selected
            ? theme.color.background00()
            : theme.color.background02()};
          border-radius: ${shape.radius.medium} ${shape.radius.medium} 0 0;
          box-shadow: ${theme.shadow.tab};
          padding: 0 ${spacing.large};
          height: ${OUTSIDE_TAB_HEIGHT};
          color: ${theme.color.text01()};
          clip-path: inset(-2px -2px 0 -2px);

          &:not(:first-child) {
            margin-left: ${spacing.medium};
          }

          &:hover {
            background-color: ${selected
              ? theme.color.background00()
              : theme.color.background01()};
          }
        `}

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
      : undefined}

  ${({ hasBackground, selected, theme }) =>
    hasBackground && selected
      ? css`
          background-color: ${theme.color.element15()};
        `
      : undefined}
`

// Renders a marker indicating that the tab is selected
const TabBaseMarker = styled.div<{
  readonly selected: boolean
}>`
  content: ' ';
  position: absolute;
  bottom: 0;
  flex: none;
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  transition: all 500ms cubic-bezier(0.57, 0.67, 0.015, 1.005);
  border-radius: ${shape.radius.small} ${shape.radius.small} 0 0;

  ${({ selected }) =>
    selected
      ? css`
          height: ${MARKER_THICKNESS};
          width: 100%;
          transform: scaleX(1);
        `
      : css`
          transform: scaleX(0);
        `}
`

interface TabProps {
  readonly id: number
  readonly selected?: boolean
  readonly label: string
  readonly onClick: (id: number) => void
  readonly variant: TabVariant
  readonly disabled?: boolean
  readonly hasBackground?: boolean
}

function InternalTab({
  id,
  selected = false,
  onClick,
  label,
  variant,
  disabled = false,
  hasBackground = false,
}: TabProps): JSX.Element {
  const onClickHandler = useCallback<OnClickHandler>(() => {
    if (!selected) {
      onClick(id)
    }
  }, [selected, onClick, id])

  return (
    <Tab
      selected={selected}
      onClick={onClickHandler}
      disabled={disabled}
      variant={variant}
      hasBackground={hasBackground}
    >
      {variant === 'inside' ? (
        <Typography variant="card-title">{label}</Typography>
      ) : (
        <Typography>{label}</Typography>
      )}
      {variant === 'inside' ? <TabBaseMarker selected={selected} /> : undefined}
    </Tab>
  )
}

interface TabItem<T> {
  readonly value: T
  readonly label: string
  readonly disabled?: boolean
}

interface CardTabsProps<T> extends Omit<BaseProps, 'onChange'> {
  /**
   * Current selected tab, matching a `value` from options
   */
  readonly value: T
  /**
   * Array with object that contain `value`, `label`, and optional `disabled`
   */
  readonly options: ReadonlyArray<TabItem<T>>
  /**
   * Tab change callback, called with the `value` from the selected options
   */
  readonly onChange: (value: T) => void
  /**
   * Tab variant. You need to select `inside` or `outside`
   */
  readonly variant: TabVariant
  /**
   * Decides whether the active tab should have a background
   */
  readonly hasBackground?: boolean
}

export function CardTabs<T>({
  value,
  options,
  onChange,
  variant,
  hasBackground,
  ...props
}: CardTabsProps<T>): JSX.Element {
  const onClickHandler = useCallback(
    index => onChange(options[index].value),
    [options, onChange]
  )

  return (
    <TabContainer {...props}>
      {options.map(({ value: tabValue, label, disabled }, index) => (
        <InternalTab
          key={index}
          id={index}
          selected={value === tabValue}
          onClick={onClickHandler}
          label={label}
          variant={variant}
          disabled={disabled}
          hasBackground={hasBackground}
        />
      ))}
    </TabContainer>
  )
}
