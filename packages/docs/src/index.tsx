import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import styledNormalize from 'styled-normalize'
import styled, { createGlobalStyle } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import 'typeface-open-sans'
import { GlobalScrollbarStyle, spacing } from 'practical-react-components-core'
import { getLocalStorage } from 'react-hooks-shareable'

import { components } from './mdx'
import { ThemeProvider, ThemeName, THEME_NAME } from './context'
import { Header } from './Header'
import { Menu } from './Menu'
import { Home } from './Home'
import { Content } from './Content'

import { Components } from './types'
import { ThemeCreator } from './mdx/themeCreator/ThemeCreator'

const practicalCoreModuleContext = require.context('./', true, /\.mdx$/)

const paths = practicalCoreModuleContext.keys() as ReadonlyArray<string>
const storage = getLocalStorage()
const initialThemeName: ThemeName | undefined = storage[THEME_NAME] ?? undefined

const componentDb = paths.map(path => {
  const componentModule = practicalCoreModuleContext(path)
  if (componentModule.meta === undefined) {
    throw new Error(`${path} is missing exported meta object`)
  }

  return {
    ...componentModule.meta,
    component: componentModule.default,
  }
}) as Components

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.color.background00()};
    font-family: Open Sans,Helvetica,arial,sans-serif;
    margin: 0;
    min-height: 100vh;
    padding: 0;
  }
`

const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar content';
  grid-template-columns: min-content 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;
`

const HeaderStyled = styled.header`
  background-color: ${({ theme }) => theme.color.background00()};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  grid-area: header;
  height: 54px;
  width: 100vw;
  z-index: 1;
  display: flex;
`

const Aside = styled.aside`
  box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.16);
  grid-area: sidebar;
  overflow: hidden;
`

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.background00()};
  padding: ${spacing.extraLarge};
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider initialThemeName={initialThemeName}>
      <AppContainer>
        <GlobalStyle />
        <GlobalScrollbarStyle />
        <HeaderStyled>
          <Header />
        </HeaderStyled>
        <Router hashType="noslash">
          <Aside>
            <Menu components={componentDb} />
          </Aside>
          <Content>
            <MDXProvider components={components}>
              <Main>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/theme-creator">
                    <ThemeCreator />
                  </Route>
                  {componentDb.map(({ route, component: Component }) => (
                    <Route key={route} path={route}>
                      <Component />
                    </Route>
                  ))}
                </Switch>
              </Main>
            </MDXProvider>
          </Content>
        </Router>
      </AppContainer>
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector('.root')
)
