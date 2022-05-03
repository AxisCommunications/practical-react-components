import { useCallback, FC, KeyboardEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { useHasOverflowWithResizeEvent } from 'react-hooks-shareable'

import { shape, spacing } from '../designparams'
import { Icon, IconType } from '../Icon'
import { Typography } from '../Typography'
import { Tooltip, ExpandedTooltipTypography } from '../Tooltip'

interface ListItemMarkerBaseProps {
  readonly selected: boolean
  readonly expanded: boolean
}

interface ListItemContainerBaseProps extends ListItemMarkerBaseProps {
  readonly childSelected: boolean
  readonly isNestedItem: boolean
  readonly hasChildren: boolean
}

interface ListItemContainerProps extends ListItemContainerBaseProps {
  readonly onClick?: VoidFunction
  readonly icon: IconType
  readonly label: string
}

interface ListItemMarkerProps extends ListItemMarkerBaseProps {
  readonly childSelected: ListItemContainerProps['childSelected']
}

/**
 * For keyboard interaction
 */

enum MenuKeys {
  Enter = 'Enter',
}

const ListItemContainerWrapper = styled.div<ListItemContainerBaseProps>`
  background-color: ${({ theme }) => theme.color.background00()};
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text03()};
  cursor: pointer;
  display: inline-flex;
  fill: ${({ theme }) => theme.color.text03()};
  flex-direction: column-reverse;
  height: 40px;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 100%;

  ${({ hasChildren, expanded }) =>
    hasChildren
      ? css`
          &::after {
            border-right: 2px solid currentColor;
            border-top: 2px solid currentColor;
            content: '';
            color: ${({ theme }) => theme.color.text05()};
            display: block;
            height: 8px;
            margin-top: ${() => (expanded ? '2px' : '-2px')};
            pointer-events: none;
            position: absolute;
            right: ${spacing.large};
            top: 50%;
            transform: translateY(-50%)
              ${() => (expanded ? 'rotateZ(-45deg)' : 'rotateZ(135deg)')};
            transform-origin: 4px 4px;
            transition: all 0.25s ease-in-out 0s;
            width: 8px;
          }
        `
      : undefined}

  ${({ theme, selected }) =>
    selected
      ? css`
          color: ${theme.color.text01()};
          fill: ${theme.color.text01()};
          background-color: ${theme.color.element15()};
          font-weight: ${theme.font.fontWeight.semibold};
        `
      : undefined}
    
    ${({ selected, childSelected }) =>
    !selected && !childSelected
      ? css`
          margin-right: ${spacing.small};
        `
      : undefined}
`

const ListItemMarker = styled.div<ListItemMarkerProps>`
  content: '';
  position: absolute;
  flex: none;
  background-color: ${({ theme, childSelected }) =>
    childSelected ? theme.color.text05() : theme.color.elementPrimary()};
  transition: all 500ms cubic-bezier(0.57, 0.67, 0.015, 1.005);
  border-radius: ${shape.radius.medium} 0 0 ${shape.radius.medium};
  width: 4px;
  height: 80%;
  right: 0;
  top: 50%;

  ${({ selected, childSelected, expanded }) =>
    css`
      transform: ${!expanded && (selected || childSelected)
        ? 'scaleY(1) translateY(-50%)'
        : 'scaleY(0)'};
    `}
`

const Label = styled(Typography).attrs({
  variant: 'default-text',
})`
  margin-right: ${spacing.huge};
  white-space: nowrap;
`

const ListItemContents = styled.div<{
  readonly isNestedItem: ListItemContainerBaseProps['isNestedItem']
}>`
  align-items: center;
  display: inline-flex;
  height: 100%;
  overflow: hidden;
  outline: none;
  border: 2px solid transparent;
  padding-left: ${({ isNestedItem }) =>
    isNestedItem ? spacing.huge : spacing.extraLarge};

  &:hover {
    background-color: ${({ theme }) => theme.color.background04()};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.color.textPrimary()};
  }
`

const ListItemContentsIcon = styled(Icon)<{
  readonly selected: ListItemMarkerBaseProps['selected']
}>`
  flex: none;
  margin-right: ${spacing.medium};
  fill: ${({ theme, selected }) =>
    selected ? theme.color.elementPrimary() : theme.color.text05()};
  color: ${({ theme, selected }) =>
    selected ? theme.color.text01() : theme.color.text05()};
  width: 16px;
  height: 16px;
`

interface OverflowTooltipProps {
  readonly label: string
}

/**
 * Used to show a tooltip if label is too long to be fully shown in container.
 */
const LabelOverflowTooltip: FC<OverflowTooltipProps> = ({ label }) => {
  const { hasOverflow, ref } = useHasOverflowWithResizeEvent()

  const text = <Label ref={ref}>{label}</Label>

  return hasOverflow ? (
    <Tooltip
      variant="expanded"
      contents={<ExpandedTooltipTypography>{label}</ExpandedTooltipTypography>}
    >
      <Label>{label}</Label>
    </Tooltip>
  ) : (
    text
  )
}

/**
 * ListItemContainer
 *
 * The ListItemContainer component is used for the styling of the list item.
 * Label, icon, marker, selected item with and without nested items
 * are styled according to the design spec that can be found
 * at the top of index.ts file
 *
 */

export const ListItemContainer: FC<ListItemContainerProps> = ({
  selected,
  isNestedItem,
  hasChildren,
  expanded,
  childSelected,
  onClick,
  icon,
  label,
}) => {
  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    event => {
      if (event.key !== MenuKeys.Enter) {
        return
      }

      event.preventDefault()

      if (onClick !== undefined) {
        onClick()
      }
    },
    [onClick]
  )

  return (
    <ListItemContainerWrapper
      selected={selected}
      isNestedItem={isNestedItem}
      hasChildren={hasChildren}
      expanded={expanded}
      childSelected={childSelected}
    >
      <ListItemMarker
        selected={selected}
        childSelected={childSelected}
        expanded={expanded}
      />
      <ListItemContents
        isNestedItem={isNestedItem}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <ListItemContentsIcon icon={icon} selected={selected} />
        <LabelOverflowTooltip label={label} />
      </ListItemContents>
    </ListItemContainerWrapper>
  )
}
