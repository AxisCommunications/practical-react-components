import { useEffect, useRef, FC } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { spacing } from 'practical-react-components-core'

const StyledContent = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: ${spacing.extraLarge};
`

export const Content: FC = ({ children }) => {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollTo(0, 0)
  }, [pathname])

  return <StyledContent ref={ref}>{children}</StyledContent>
}
