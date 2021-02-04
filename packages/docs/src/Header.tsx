import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { Select, Typography, spacing } from 'practical-react-components-core'
import { useLocalStorage } from 'react-hooks-shareable'

import { ThemeName, ThemeContext, THEME_NAME } from './context'

const THEME_OPTIONS: ReadonlyArray<{
  readonly value: ThemeName
  readonly label: string
}> = [{ value: ThemeName.DEFAULT_THEME, label: 'Default theme' }]

const HeaderContainer = styled.div`
  padding: ${spacing.medium};
  width: 100vw;
  display: inline-grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${spacing.large};
  align-items: center;
`

export const Header = () => {
  const { themeName, setThemeName } = useContext(ThemeContext)
  const [, setThemeLocalStorage] = useLocalStorage<ThemeName>(THEME_NAME)
  const onChange = useCallback(
    (value: ThemeName) => {
      setThemeName(value)
      setThemeLocalStorage(value)
    },
    [setThemeLocalStorage, setThemeName]
  )

  return (
    <HeaderContainer>
      <Typography variant="page-heading">Practical react components</Typography>
      <Select<ThemeName>
        value={themeName}
        options={THEME_OPTIONS}
        onChange={onChange}
        placeholder="Select..."
        width="small"
        direction="down"
      />
    </HeaderContainer>
  )
}
