import styled from 'styled-components'

export const List = styled.ul`
  margin: 0;
  padding: 0;
  overflow-y: auto;
  color: ${({ theme }) => theme.color.text01()};
`

export const ListItem = styled.li`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.color.background02()};
  }
`
