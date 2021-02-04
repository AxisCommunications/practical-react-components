import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import { componentSize, opacity, spacing } from '../designparams'

import { useGridTemplateColumns } from './Table'
import { TableContext } from './context'

import { TableCellCheckbox, TableCellContent } from './TableCells'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * Skeleton rows (used as a loading indicator)
 */

const pulse = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: ${opacity[48]};
  }
`

// hard-coded size for a checkbox skeleton
const SkeletonCheckboxContent = styled.div`
  border: 2px;
  width: 18px;
  height: 18px;
`

// generic skeleton to replace text
const SkeletonContent = styled.div`
  width: 100%;
  height: ${spacing.large};
`

const SkeletonRowGrid = styled.div`
  z-index: 0;
  display: grid;
  position: relative;
  grid-template-rows: ${componentSize.extraLarge};

  outline: none;
  pointer-events: none;

  &
    ${/*sc-selector*/ SkeletonContent},
    &
    ${/*sc-selector*/ SkeletonCheckboxContent} {
    animation: ${pulse} 800ms infinite ease-in-out alternate;
  }
  &:nth-child(odd)
    ${/*sc-selector*/ SkeletonContent},
    &:nth-child(odd)
    ${/*sc-selector*/ SkeletonCheckboxContent} {
    background-color: ${({ theme }) => theme.color.background01()};
  }
  &:nth-child(even)
    ${/*sc-selector*/ SkeletonContent},
    &:nth-child(even)
    ${/*sc-selector*/ SkeletonCheckboxContent} {
    background-color: ${({ theme }) => theme.color.background02()};
  }
`

interface ISkeletonRowProps {
  readonly gridTemplateColumns: string
  readonly hasCheckbox: boolean
  /**
   * The number of columns in the row
   */
  readonly columns: number
}

const SkeletonRow: React.FunctionComponent<ISkeletonRowProps> = React.memo(
  ({ columns, gridTemplateColumns, hasCheckbox }) => {
    const columnArray: Array<undefined> = Array.from(new Array(columns))

    return (
      <SkeletonRowGrid style={{ gridTemplateColumns }}>
        {hasCheckbox ? (
          <TableCellCheckbox>
            <SkeletonCheckboxContent />
          </TableCellCheckbox>
        ) : null}
        {columnArray.map((__, index) => (
          <TableCellContent key={index}>
            <SkeletonContent />
          </TableCellContent>
        ))}
      </SkeletonRowGrid>
    )
  }
)
SkeletonRow.displayName = 'SkeletonRowComponent'

interface ISkeletonTableRowsProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  readonly rows: number
  readonly columns: number
}
export const SkeletonTableRows: React.FC<ISkeletonTableRowsProps> = React.memo(
  ({ rows, columns, ...props }) => {
    const rowArray: Array<undefined> = Array.from(new Array(rows))

    const { onSelect } = useContext(TableContext)
    const { gridTemplateColumns } = useGridTemplateColumns()

    return (
      <div style={{ gridTemplateColumns }} {...props}>
        {rowArray.map((_, i) => (
          <SkeletonRow
            key={i}
            columns={columns}
            gridTemplateColumns={gridTemplateColumns}
            hasCheckbox={onSelect !== undefined}
          />
        ))}
      </div>
    )
  }
)

SkeletonTableRows.displayName = 'SkeletonTableRowsComponent'
