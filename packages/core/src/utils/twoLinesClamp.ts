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
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -moz-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`
