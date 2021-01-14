import React, { createContext, useMemo, useState } from 'react'
import {
  defaultTheme,
  PracticalProvider,
} from 'practical-react-components-core'

export const THEME_NAME = 'themePractical'

export enum IThemeActionType {
  'SWITCH_THEME',
}

export enum IThemeName {
  'DEFAULT_THEME' = 'default_theme',
}

export interface IThemeContext {
  readonly themeName: IThemeName
  readonly setThemeName: (themeName: IThemeName) => void
}

export interface IThemeNameProvider {
  readonly initialThemeName?: IThemeName
}

export const ThemeContext = createContext<IThemeContext>({
  themeName: IThemeName.DEFAULT_THEME,
  setThemeName: () => {
    /** no-op */
  },
})
const { Provider } = ThemeContext

export const ThemeProvider: React.FC<IThemeNameProvider> = ({
  children,
  initialThemeName = IThemeName.DEFAULT_THEME,
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
