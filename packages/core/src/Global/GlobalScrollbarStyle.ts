import { createGlobalStyle } from 'styled-components'
import { componentSize } from '../designparams'

export const SCROLLBAR_DIMENSION = 12

const COMMON_CSS = `
  border-radius: 12px;
  border: 4px solid transparent;
  background-clip: padding-box;
`

export const GlobalScrollbarStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: ${SCROLLBAR_DIMENSION}px;
    height: ${SCROLLBAR_DIMENSION}px;

    &-thumb {
      background: ${({ theme }) => theme.color.element11()};
      ${COMMON_CSS}
      min-height: ${componentSize.large};
      min-width: ${componentSize.large};
    }

    &-track {
      background: ${({ theme }) => theme.color.element12()};
      ${COMMON_CSS}
    }
  }
`
