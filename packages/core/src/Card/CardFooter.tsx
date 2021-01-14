/**
 * CardFooter
 *
 * The `CardFooter` component adds a small margin to all its children
 *
 * Note: the footer items are rendered from right to left!! This also causes the
 * focus to land on the most important button first. If focus behaviour needs to
 * be changed, please use tab-index or the order CSS property on the footer
 * children, as changing the order behaviour of the children will cause too much
 * breaking changes.
 */

import styled from 'styled-components'
import { spacing } from '../designparams'

import { CARD_PADDING } from './padding'

const FOOTER_HEIGHT = '64px'

export const CardFooter = styled.div`
  position: relative;
  display: flex;
  flex: none;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${CARD_PADDING};
  height: ${FOOTER_HEIGHT};

  > :not(:first-child) {
    margin-right: ${spacing.medium};
  }
`

export const CardFooterSpacer = styled.div`
  flex-grow: 1;
`
