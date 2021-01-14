import styled from 'styled-components'

export const BackgroundColor = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ theme }) => theme.color.background00()};
`

export const KnobBackgroundColor = styled(BackgroundColor)`
  background-color: lightyellow;
`
