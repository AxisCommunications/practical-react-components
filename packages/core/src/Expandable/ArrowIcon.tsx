import { FC } from 'react'
import { Icon, IconType } from '../Icon'
import styled, { css } from 'styled-components'
import { opacity } from '../designparams'

// TODO: Add RTL-support for arrow rotation
// [`:dir(rtl)`](https://caniuse.com/#feat=css-dir-pseudo) only supported in FF at the moment

const SvgIcon: IconType = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

export interface ArrowProps {
  readonly expanded: boolean
  readonly disabled: boolean
}

const ArrowIcon = styled(Icon)<ArrowProps>`
  flex: none;
  transform-origin: center;
  transition: all 250ms ease-in-out;

  fill: currentColor;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: ${opacity[48]};
          pointer-events: none;
          cursor: inherit;
        `
      : undefined}

  ${({ expanded }) =>
    expanded
      ? css`
          transform: rotateZ(180deg);
          :dir(rtl) {
            transform: rotateZ(-180deg);
          }
        `
      : undefined}
`

export const Arrow: FC<ArrowProps> = props => (
  <ArrowIcon {...props} icon={SvgIcon} />
)
