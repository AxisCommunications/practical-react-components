import { createContext, useMemo, useState, FC, ReactNode } from 'react'
import {
  ColorBaseName,
  generateDefaultTheme,
  PracticalProvider,
  SimpleColorBaseName,
} from 'practical-react-components-core'

export const THEME_NAME = 'themePractical:v1'

export enum ThemeName {
  // SimpleColorBaseName
  BROWN = 'brown',
  GREY = 'grey',
  BLUE_GREY = 'blueGrey',
  // ColorBaseName
  RED = 'red',
  PINK = 'pink',
  PURPLE = 'purple',
  DEEP_PURPLE = 'deepPurple',
  INDIGO = 'indigo',
  BLUE = 'blue',
  LIGHT_BLUE = 'lightBlue',
  CYAN = 'cyan',
  TEAL = 'teal',
  GREEN = 'green',
  LIGHT_GREEN = 'lightGreen',
  LIME = 'lime',
  YELLOW = 'yellow',
  AMBER = 'amber',
  ORANGE = 'orange',
  DEEP_ORANGE = 'deepOrange',
}

export interface ThemeContextType {
  readonly themeName: ThemeName
  readonly setThemeName: (themeName: ThemeName) => void
}

export interface ThemeNameProvider {
  readonly initialThemeName?: ThemeName
  readonly children?: ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: ThemeName.DEEP_PURPLE,
  setThemeName: () => {
    /** no-op */
  },
})
const { Provider } = ThemeContext

export const ThemeProvider: FC<ThemeNameProvider> = ({
  children,
  initialThemeName = ThemeName.DEEP_PURPLE,
}) => {
  const [themeName, setThemeName] = useState(initialThemeName)

  const selectedTheme = useMemo(() => {
    return generateDefaultTheme(
      themeName as SimpleColorBaseName | ColorBaseName
    )
  }, [themeName])

  return (
    <Provider value={{ themeName, setThemeName }}>
      <PracticalProvider theme={selectedTheme}>
        <>{children}</>
      </PracticalProvider>
    </Provider>
  )
}
