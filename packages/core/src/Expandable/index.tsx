import { useState, ReactNode, useCallback, HTMLAttributes, FC } from 'react'
import { FoldTransition } from '../Transition'
import styled from 'styled-components'

export * from './ArrowIcon'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

const Header = styled.div`
  cursor: pointer;
`

interface ExpandableHeaderProps {
  readonly children?: ReactNode
  readonly onClick: VoidFunction
}

const ExpandableHeader: FC<ExpandableHeaderProps> = ({ onClick, children }) => (
  <Header onClick={onClick}>{children}</Header>
)

export interface ExpandableProps extends Omit<BaseProps, 'children'> {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * If `true`, the body is expanded.
   * Default `false`
   */
  readonly initialExpanded?: boolean
  /* Expandable's header and body */
  readonly children: {
    readonly header: (expanded: boolean) => ReactNode
    readonly body: ReactNode
  }
}

export const Expandable: FC<ExpandableProps> = ({
  initialExpanded = false,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = useState(initialExpanded)

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const { header, body } = children

  return (
    <div {...props}>
      <ExpandableHeader onClick={toggleExpanded}>
        {header(expanded)}
      </ExpandableHeader>
      <FoldTransition expanded={expanded}>{body}</FoldTransition>
    </div>
  )
}
