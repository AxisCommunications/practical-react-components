import React, { createContext, useMemo, useState } from 'react'
import {
  defaultTheme,
  PracticalProvider,
} from 'practical-react-components-core'

export const THEME_NAME = 'themePractical'

export enum ThemeActionType {
  'SWITCH_THEME',
}

export enum ThemeName {
  'DEFAULT_THEME' = 'default_theme',
}

export interface ThemeContextType {
  readonly themeName: ThemeName
  readonly setThemeName: (themeName: ThemeName) => void
}

export interface ThemeNameProvider {
  readonly initialThemeName?: ThemeName
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: ThemeName.DEFAULT_THEME,
  setThemeName: () => {
    /** no-op */
  },
})
const { Provider } = ThemeContext

export const ThemeProvider: React.FC<ThemeNameProvider> = ({
  children,
  initialThemeName = ThemeName.DEFAULT_THEME,
}) => {
  const [themeName, setThemeName] = useState(initialThemeName)

  const selectedTheme = useMemo(() => {
    return defaultTheme
  }, [])

  return (
    <Provider value={{ themeName, setThemeName }}>
      <PracticalProvider theme={selectedTheme}>
        <>{children}</>
      </PracticalProvider>
    </Provider>
  )
}
