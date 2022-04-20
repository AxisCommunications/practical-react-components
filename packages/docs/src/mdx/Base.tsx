import { Children } from 'react'
import styled from 'styled-components'
import {
  Typography,
  spacing,
  Divider,
  Link,
} from 'practical-react-components-core'

import { Code } from './Code'
import { MDXComponents } from 'mdx/types'

export const H1 = styled(Typography).attrs({
  variant: 'page-heading',
  as: 'h1',
})`
  margin: ${spacing.extraLarge} 0;
  font-size: 36px;
  font-weight: 700;
  line-height: initial;
`

export const H2 = styled(Typography).attrs({
  variant: 'header-title',
  as: 'h2',
})`
  display: block;
  margin: ${spacing.extraLarge} 0;
  font-size: 21px;
  font-weight: 600;
  line-height: initial;
`

export const H3 = styled(Typography).attrs({
  variant: 'group-title',
  as: 'h3',
})`
  display: block;
  margin: ${spacing.large} 0;
  font-size: 18px;
  line-height: initial;
`

export const P = styled(Typography).attrs({ variant: 'default-text', as: 'p' })`
  font-size: 14px;
  margin: ${spacing.large} 0;
  line-height: initial;
`

export const Li = styled(Typography).attrs({
  variant: 'default-text',
  as: 'li',
})`
  font-size: 14px;
  overflow: visible;
  margin: ${spacing.small};
`

export const A = styled(Link).attrs({ variant: 'a' })``

export const HR = Divider

export const Pre: NonNullable<MDXComponents['pre']> = ({
  children,
  ...props
}) => {
  const child = Children.only(children)

  // If this is a preformatted block of code, render it with the custom code
  if (
    child !== null &&
    typeof child === 'object' &&
    'type' in child &&
    child?.type === 'code'
  ) {
    return <Code {...props} {...child?.props} />
  }

  return <pre>{children}</pre>
}
