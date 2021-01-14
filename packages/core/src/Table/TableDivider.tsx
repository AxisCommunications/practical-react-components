import React from 'react'
import styled from 'styled-components'

import { componentSize } from '../designparams'

import { useGridTemplateColumns } from './Table'
import { TableCell } from './TableCells'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * Table divider
 */

const TableDividerGrid = styled.div`
  display: grid;
  grid-template-rows: ${componentSize.medium};
  background-color: ${({ theme }) => theme.color.background00()};
  border-top: 1px solid ${({ theme }) => theme.color.element12()};
  border-bottom: 1px solid ${({ theme }) => theme.color.element12()};
  color: ${({ theme }) => theme.color.text02()};
`

const TableDividerCell = styled(TableCell)`
  grid-column-start: start;
  grid-column-end: scroll;
`

interface ITableDividerProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
}

export const TableDivider: React.FC<ITableDividerProps> = ({
  children,
  ...props
}) => {
  const { gridTemplateColumns } = useGridTemplateColumns()
  return (
    <TableDividerGrid style={{ gridTemplateColumns }} {...props}>
      <TableDividerCell>{children}</TableDividerCell>
    </TableDividerGrid>
  )
}
