import { css } from 'styled-components'

/**
 * A styled-components mixin that truncates two-lines text with ellipsis.
 *
 * An example:
 * ```tsx
 * const Div = styled.div`
 *   ${twoLinesClamp};
 * `
 * ```
 */
export const twoLinesClamp = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`
