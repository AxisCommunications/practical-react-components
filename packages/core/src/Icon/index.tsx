import { MemoExoticComponent, FC, SVGProps, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { iconSize } from '../designparams'

type BaseElement = HTMLSpanElement
type BaseProps = HTMLAttributes<BaseElement>

/**
 * TODO: Add RTL-support for icon ? (https://material.io/design/usability/bidirectionality.html#mirroring-elements)
 */

const getSize = (size: string): string => {
  switch (size) {
    case 'small':
      return iconSize.small
    case 'medium':
      return iconSize.medium
    case 'large':
      return iconSize.large
    case 'extraLarge':
      return iconSize.extraLarge
    default:
      return iconSize.medium
  }
}

const IconContainer = styled.span<{ readonly size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: hidden;
  vertical-align: middle;

  height: ${({ size }) => getSize(size)};
  width: ${({ size }) => getSize(size)};

  > svg {
    fill: currentColor;
    height: 100%;
    width: auto;
  }
`

export type IconType =
  | MemoExoticComponent<FC<SVGProps<SVGSVGElement>>>
  | FC<SVGProps<SVGSVGElement>>

export type IconSize = 'small' | 'medium' | 'large' | 'extraLarge'

export interface IconProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * The icon element.
   */
  readonly icon: IconType
  /**
   * Changes the size of the Icons.
   */
  readonly size?: IconSize
}

export const Icon: FC<IconProps> = ({
  icon: SvgIcon,
  size = 'medium',
  ...props
}) => (
  <IconContainer role="img" size={size} {...props}>
    <SvgIcon />
  </IconContainer>
)

export const ClickableIcon = styled(Icon).attrs({ tabIndex: 0 })`
  cursor: pointer;
  pointer-events: auto;

  :focus {
    outline: 2px solid ${({ theme }) => theme.color.textPrimary()};
  }
`
