import { MDXComponents } from 'mdx/types'

import { P, H1, H2, H3, Li, Pre, A, HR } from './Base'
import { Props } from './Props'

export const components: MDXComponents = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: P,
  h5: P,
  h6: P,
  thematicBreak: HR,
  // blockquote, TODO

  // ol - ok as is
  // ul - ok as is
  li: Li,

  // table TODO
  // thead TODO
  // tbody TODO
  // tr TODO
  // td/ th	TODO

  pre: Pre,
  // code - ok as is,

  // em - ok as is
  // strong - ok as is
  // delete - ok as is
  // inlineCode - ok as is

  hr: HR,

  a: A,

  // Practical react components doc shortcodes
  Props,
}
