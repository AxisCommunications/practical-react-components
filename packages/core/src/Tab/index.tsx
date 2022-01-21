import React, { useCallback, ReactNode } from 'react'

import styled, { css } from 'styled-components'
import { Icon, IconType } from '../Icon'
import { opacity, spacing } from '../designparams'
import { Typography } from '../Typography'

// Constant size for Tab
const TAB_HEIGHT = '40px'
const MARKER_THICKNESS = '4px'

type MarkerOffset = 'top' | 'bottom' | 'left' | 'right'
type VerticalTabMarkerOffset = 'left' | 'right'
type HorizontalTabMarkerOffset = 'top' | 'bottom'
type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const FLEX_DIRECTION = {
  top: 'column-reverse',
  right: 'column-reverse',
  bottom: 'column-reverse',
  left: 'column-reverse',
}

/**
 * Tab container primitive
 */

interface TabBaseContainerProps {
  readonly selected: boolean
  readonly disabled: boolean
  readonly markerOffset: MarkerOffset
}

const TabBaseContainer = styled.div<TabBaseContainerProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ markerOffset }) => FLEX_DIRECTION[markerOffset]};

  height: ${TAB_HEIGHT};
  box-sizing: border-box;
  padding: ${({ markerOffset }) =>
    markerOffset === 'left' || markerOffset === 'right'
      ? `0 ${MARKER_THICKNESS}`
      : `${MARKER_THICKNESS} 0`};
  overflow: hidden;
  max-width: 100%;
  user-select: none;

  color: ${({ theme }) => theme.color.text02()};
  fill: ${({ theme }) => theme.color.element11()};
  background-color: ${({ theme }) => theme.color.background00()};

  opacity: ${({ disabled }) => (disabled ? opacity[48] : undefined)};

  cursor: pointer;

  ${({ theme, selected, disabled }) => {
    if (!selected && !disabled) {
      return css`
        &:hover {
          background-color: ${theme.color.background02()};
        }
      `
    }
    if (selected) {
      return css`
        color: ${theme.color.elementPrimary()};
        fill: ${theme.color.elementPrimary()};
        background-color: ${theme.color.backgroundPrimary()};
      `
    }
  }}
`

/**
 * Tab marker primitive
 */

interface TabBaseMarkerProps {
  readonly offset: MarkerOffset
  readonly selected: boolean
}

// Renders a marker indicating that the tab is selected
const TabBaseMarker = styled.div<TabBaseMarkerProps>`
  content: ' ';
  position: absolute;
  flex: none;
  background-color: ${({ theme }) => theme.color.elementAccent()};
  transition: all 500ms cubic-bezier(0.57, 0.67, 0.015, 1.005);

  ${({ offset, selected }) => {
    return offset === 'left' || offset === 'right'
      ? css`
          width: ${MARKER_THICKNESS};
          height: 100%;
          ${offset}: 0;
          transform: ${selected ? 'scaleY(1)' : 'scaleY(0)'};
        `
      : css`
          height: ${MARKER_THICKNESS};
          width: 100%;
          ${offset}: 0;
          transform: ${selected ? 'scaleX(1)' : 'scaleX(0)'};
        `
  }}
`

/**
 * Tab contents primitive
 */

const TabBaseContents = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

/**
 *
 * Tab base
 *
 * A tab that is just a container for some content,
 * no icon/text is assumed and it's up to the user
 * to generate it. Use this if you need custom layout
 * for content inside the tab.
 *
 */

export interface TabBaseProps<T> extends Omit<BaseProps, 'id' | 'onSelect'> {
  readonly id: T
  readonly selected: boolean
  readonly disabled?: boolean
  readonly onSelect: (id: T) => void
  readonly markerOffset?: MarkerOffset
  readonly children: ReactNode
}

export function TabBase<T>({
  id,
  selected,
  disabled = false,
  onSelect,
  markerOffset = 'right',
  children,
  ...props
}: TabBaseProps<T>): JSX.Element {
  const onClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    if (selected || disabled) {
      return
    }

    onSelect(id)
  }, [selected, disabled, id, onSelect])

  return (
    <TabBaseContainer
      disabled={disabled}
      onClick={onClick}
      selected={selected}
      markerOffset={markerOffset}
      {...props}
    >
      <TabBaseMarker offset={markerOffset} selected={selected} />
      <TabBaseContents>{children}</TabBaseContents>
    </TabBaseContainer>
  )
}

/**
 *
 * Tab
 *
 * Tab base + quick setting of optional icon + label,
 * centered in the middle of the tab.
 * Use this if you need a default look for the tab
 * and only need icon/label inside the tab.
 *
 * There are two main components:
 *  - Tab (horizontal, marker top or bottom)
 *  - VerticalTab (vertical, marker left or right)
 *
 */

/**
 * Tab contents icon primitive
 */
const TabContentsIcon = styled(Icon)`
  flex: none;
  fill: inherit;
`

/**
 * Tab contents label primitive
 */

interface TabContentsLabelProps {
  readonly selected?: boolean
  readonly centered?: boolean
}

const TabContentsLabel = styled.div<TabContentsLabelProps>`
  margin-left: ${({ centered }) => (centered === true ? '0' : spacing.medium)};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  color: inherit;

  font-weight: ${({ selected }) => (selected === true ? '600' : undefined)};
`

/**
 * Tab contents primitive
 */
const TabContents = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 ${spacing.medium};
`

/**
 * Tab primitive
 */

export type ChangeEventHandler<T> = (id: T) => void

interface InternalTabBaseProps<T> extends Omit<BaseProps, 'id' | 'onSelect'> {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Determines the Tab's ID.
   */
  readonly id: T
  /**
   * Indicates if the Tab has been selected.
   */
  readonly selected?: boolean
  /**
   * The icon element.
   */
  readonly icon?: IconType
  /**
   * If `true`, the tab will be disabled.
   */
  readonly disabled?: boolean
  /**
   * Executes a JavaScript upon being selected.
   */
  readonly onSelect: ChangeEventHandler<T>
  /**
   * Changes the label written on the tab.
   */
  readonly label?: string
}

interface InternalTabProps<T> extends InternalTabBaseProps<T> {
  readonly markerOffset: MarkerOffset
}

function InternalTab<T>({
  id,
  selected = false,
  disabled = false,
  icon,
  onSelect,
  markerOffset,
  label,
  ...props
}: InternalTabProps<T>): JSX.Element {
  return (
    <TabBase<T>
      id={id}
      disabled={disabled}
      onSelect={onSelect}
      selected={selected}
      markerOffset={markerOffset}
      {...props}
    >
      <TabContents>
        {icon !== undefined ? <TabContentsIcon icon={icon} /> : null}
        <TabContentsLabel selected={selected} centered={icon === undefined}>
          <Typography variant="navigation-label">{label}</Typography>
        </TabContentsLabel>
      </TabContents>
    </TabBase>
  )
}

/**
 * Tab
 */
export interface TabProps<T> extends InternalTabBaseProps<T> {
  readonly markerOffset?: HorizontalTabMarkerOffset
}

export function Tab<T>({
  markerOffset = 'bottom',
  ...props
}: TabProps<T>): JSX.Element {
  return <InternalTab<T> {...props} markerOffset={markerOffset} />
}

/**
 * Vertical tab
 */
export interface VerticalTabProps<T> extends InternalTabBaseProps<T> {
  readonly markerOffset?: VerticalTabMarkerOffset
}

export function VerticalTab<T>({
  markerOffset = 'right',
  ...props
}: VerticalTabProps<T>): JSX.Element {
  return <InternalTab<T> {...props} markerOffset={markerOffset} />
}
