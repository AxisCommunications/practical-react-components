/**
 * Divider shows a divider line
 */

import styled, { css } from 'styled-components'
import { spacing } from '../designparams'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

export interface INormalDividerProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * A normal divider has variant `full`
   *
   * Default: `full`
   */
  readonly variant?: 'full'
}

export interface IMiddleDividerProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * A middle divider has variant `middle`
   *
   * Default: `full`
   */
  readonly variant: 'middle'
}

export interface IInsetDividerProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * An inset divider has variant `inset`
   *
   * Default: `full`
   */
  readonly variant: 'inset'
  /**
   * Only affect to the Divider which has variant="inset".
   * Changes margin-left size.
   *
   * Default: `64`
   */
  readonly insetSize?: number
}

export const Divider = styled.div<
  INormalDividerProps | IMiddleDividerProps | IInsetDividerProps
>`
  height: 1px;
  background-color: ${({ theme }) => theme.color.element12()};

  ${props =>
    props.variant === 'middle'
      ? css`
          margin: 0 ${spacing.huge};
        `
      : props.variant === 'inset'
      ? css`
          margin-left: ${props.insetSize !== undefined
            ? props.insetSize
            : 64}px;
        `
      : undefined}
`
