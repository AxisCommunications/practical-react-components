import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { shape, spacing } from '../designparams'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const PaperDiv = styled.div<{
  readonly square: boolean
  readonly space: boolean
}>`
  background-color: ${({ theme }) => theme.color.background00()};
  color: ${({ theme }) => theme.color.text01()};
  box-shadow: ${({ theme }) => theme.shadow.knobOn1};
  overflow: hidden;

  ${({ square }) =>
    !square
      ? css`
          border-radius: ${shape.radius.medium};
        `
      : undefined}

  ${({ space }) =>
    space
      ? css`
          padding: ${spacing.medium} ${spacing.large};
        `
      : css`
          padding: 0;
        `}
`

interface IPaperProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * If `true`, the corners become squared.
   */
  readonly square?: boolean
  /**
   * If `true`, spacing is added.
   */
  readonly space?: boolean
}

/* eslint-disable-next-line react/display-name */
export const Paper = forwardRef<BaseElement, IPaperProps>(
  ({ square = false, space = false, children, ...props }, ref) => (
    <PaperDiv square={square} space={space} {...props} ref={ref}>
      {children}
    </PaperDiv>
  )
)
