import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import styledNormalize from 'styled-normalize'
import styled, { createGlobalStyle } from 'styled-components'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Menu } from './Menu'
import {
  GlobalScrollbarStyle,
  spacing,
  PracticalProvider,
  defaultTheme,
} from 'practical-react-components-core'

const practicalCoreTestsContext = require.context('./', true, /\.cypress\.tsx$/)

const paths = practicalCoreTestsContext.keys() as ReadonlyArray<string>
const componentDb = paths.map(path => {
  const componentModule = practicalCoreTestsContext(path)
  console.log(componentModule)
  if (componentModule.meta === undefined) {
    throw new Error(`${path} is missing exported meta object`)
  }

  return {
    ...componentModule.meta,
    component: componentModule.default,
  }
})

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.color.background00()};
    color: ${({ theme }) => theme.color.text01()};
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

const Aside = styled.aside`
  grid-area: sidebar;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background02()};
`

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: ${spacing.extraLarge};
  background-color: ${({ theme }) => theme.color.background02()};
`

const Main = styled.main`
  background-color: ${({ theme }) => theme.color.background00()};
  padding: ${spacing.extraLarge};
`

ReactDOM.render(
  <PracticalProvider theme={defaultTheme}>
    <AppContainer>
      <GlobalStyle />
      <GlobalScrollbarStyle />
      <Router hashType="noslash">
        <Aside>
          <Menu components={componentDb} />
        </Aside>
        <Content>
          <Main>
            <Switch>
              {componentDb.map(({ route, component: Component }) => (
                <Route key={route} path={route}>
                  <Component />
                </Route>
              ))}
            </Switch>
          </Main>
        </Content>
      </Router>
    </AppContainer>
  </PracticalProvider>,
  document.querySelector('.root')
)
