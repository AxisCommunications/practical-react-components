import styled from 'styled-components'

import { spacing } from '../designparams'
import { SCROLLBAR_DIMENSION } from '../Global/GlobalScrollbarStyle'
import { Typography } from '../Typography'

/*
 * TableCell
 *
 * A regular cell in the table.
 */

export const TableCell = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: left;

  box-sizing: border-box;
  height: 100%;
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TableCellContent = styled(TableCell)`
  padding-right: ${spacing.extraLarge};
  &:first-child {
    grid-column: content-start;
  }
`

export const TableCellCheckbox = styled(TableCell)`
  padding-right: ${spacing.extraLarge};
  justify-content: center;
  grid-column: start;
  overflow: visible;
`

export const TableCellMenu = styled(TableCell)`
  padding-right: ${20 - SCROLLBAR_DIMENSION}px;
  justify-content: flex-end;
  grid-column: content-end;
  overflow: visible;
`

/*
 * TableHeaderCell
 *
 * A header cell in the table.
 */

export const TableHeaderCell = styled(TableCell)`
  color: ${({ theme }) => theme.color.text02()};
  background: ${({ theme }) => theme.color.background00()};

  text-align: left;
  font-weight: ${({ theme }) => theme.font.fontWeight.normal};

  user-select: none;

  &:not:last-child {
    resize: horizontal;
  }
`

export const TableHeaderCellContent = styled(TableHeaderCell)`
  padding-right: ${spacing.large};
  &:first-child {
    grid-column: content-start;
  }
`

export const TableHeaderCellCheckbox = styled(TableHeaderCell)`
  padding-right: ${spacing.extraLarge};
  grid-column: start;
  justify-content: center;
  overflow: visible;
`

export const TableHeaderCellMenu = styled(TableHeaderCell)`
  padding-right: ${20 - SCROLLBAR_DIMENSION}px;
  grid-column: content-end;
  justify-content: center;
  overflow: visible;
`

export const TableHeaderText = styled(Typography).attrs({
	variant: 'column-heading',
})`
  text-transform: ${({ theme }) => theme.font.tableHeader.textTransform};
`

/**
 * A special long cell that overlays the entire header
 */

export const OverlayContainer = styled(TableCell)`
  z-index: 1;
  grid-column-start: content-start;
  grid-column-end: end;
  color: ${({ theme }) => theme.color.textPrimary()};
`
