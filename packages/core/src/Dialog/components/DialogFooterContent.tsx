/**
 * DialogFooterContent
 *
 * The `DialogFooterContent` component adds a small margin to all its children
 *
 * Note: the footer items are rendered from right to left!! This also causes the
 * focus to land on the most important button first. If focus behaviour needs to
 * be changed, please use tab-index or the order CSS property on the footer
 * children, as changing the order behaviour of the children will cause too much
 * breaking changes.
 */

import styled from 'styled-components'

import { spacing } from '../../designparams'
import { DIALOG_PADDING } from './padding'

export const DialogFooterContent = styled.div<{
	readonly shadowHidden: boolean
}>`
  display: flex;
  flex-direction: row-reverse;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${DIALOG_PADDING};

  > :not(:first-child) {
    margin-right: ${spacing.medium};
  }

  box-shadow: ${({ shadowHidden, theme }) =>
		shadowHidden ? 'none' : theme.shadow.dialogHeaderFooter};
  transition: box-shadow 0.2s ease-in-out;
`
