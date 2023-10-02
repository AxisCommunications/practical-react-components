import styled from 'styled-components'

import { spacing } from '../../designparams'
import { DIALOG_PADDING } from './padding'

export const DialogHeaderContent = styled.div<{
	readonly shadowHidden: boolean
}>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.text01()};
  padding: ${spacing.large} ${DIALOG_PADDING};
  cursor: default;

  box-shadow: ${({ shadowHidden, theme }) =>
		shadowHidden ? 'none' : theme.shadow.dialogHeaderFooter};
  transition: box-shadow 0.2s ease-in-out;
`
