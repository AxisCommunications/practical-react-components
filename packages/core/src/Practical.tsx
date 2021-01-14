import React, { createContext, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import { ResizeObserver } from '@juggle/resize-observer'
import { useId } from 'react-hooks-shareable'

import { ITheme, defaultTheme } from './theme'
import {
  ToastsProvider,
  ToastsAnchor,
  IToastsPlacement,
} from './Toast/ToastsProvider'
import { ISimpleToastsDurations } from './Toast'

const PracticalRoot = styled.div`
  color: ${({ theme }) => theme.color.text01()};
`

interface IPracticalContext {
  readonly rootEl: HTMLElement | null | undefined
}

const PracticalContext = createContext<IPracticalContext>({
  rootEl: undefined,
})

interface IToastsOptions {
  /**
   * Position of toasts on the page.
   */
  readonly placement: IToastsPlacement
  /**
   * Determine if toasts should be always on top (above any other modal layers),
   * or not (above the main application layer but below any other modal layers).
   *
   * @default true
   */
  readonly alwaysOnTop: boolean
  /**
   * Default toast durations
   */
  readonly defaultDurations: ISimpleToastsDurations
}

const DEFAULT_TOASTS_OPTIONS: IToastsOptions = {
  placement: { justify: 'right', top: '0' },
  alwaysOnTop: true,
  defaultDurations: {
    success: 4000,
  },
}

interface IPracticalProvider extends ISimpleToastsDurations {
  /**
   * The Practical React Components theme to be used.
   */
  readonly theme?: ITheme
  /**
   * The toasts layout.
   *
   * @default Toasts are centered at the top and always visible.
   */
  readonly toastsOptions?: IToastsOptions
}

export const PracticalProvider: React.FC<IPracticalProvider> = ({
  theme = defaultTheme,
  toastsOptions = DEFAULT_TOASTS_OPTIONS,
  children,
}) => {
  const [rootEl, rootRef] = useState<HTMLDivElement | null>(null)

  return (
    <ThemeProvider theme={theme}>
      <PracticalContext.Provider value={{ rootEl }}>
        <ToastsProvider {...toastsOptions.defaultDurations}>
          <PracticalRoot id="practical-root" ref={rootRef}>
            <Layer>{children}</Layer>
            <Layer zIndex={toastsOptions.alwaysOnTop ? 1 : 0}>
              <ToastsAnchor placement={toastsOptions.placement} />
            </Layer>
          </PracticalRoot>
        </ToastsProvider>
      </PracticalContext.Provider>
    </ThemeProvider>
  )
}

/**
 * Layer
 *
 * A layer creates a new div element that is rendered
 * a sibling to the previous layer and a child of the
 * practical root.
 *
 * Other components can access the layer element and id
 * through the LayerContext.
 *
 * Layers cannot be clicked on, but all children of it
 * can be clicked on. Wowy!
 */

const LAYER_ID_PREFIX = 'layer'

const LayerContainer = styled.div<{ readonly zIndex?: number }>`
  position: absolute;
  z-index: ${({ zIndex = 0 }) => zIndex};
`

interface ILayerContext {
  readonly el: HTMLElement | null
  readonly id: string
}

export const LayerContext = createContext<ILayerContext>({
  el: typeof document !== 'undefined' ? document.body : null,
  id: LAYER_ID_PREFIX,
})

interface ILayerProps {
  readonly zIndex?: number
}

export const Layer: React.FC<ILayerProps> = ({ children, zIndex }) => {
  const { rootEl } = useContext(PracticalContext)

  const [el, ref] = useState<HTMLDivElement | null>(null)
  const id = useId(LAYER_ID_PREFIX)

  if (rootEl === undefined) {
    throw new Error(
      'You need to wrap your application in a PracticalProvider component, otherwise layers do not work.'
    )
  }

  if (rootEl === null) {
    return null
  }

  return ReactDOM.createPortal(
    <LayerContext.Provider value={{ el, id }}>
      <LayerContainer id={id} ref={ref} zIndex={zIndex}>
        {children}
      </LayerContainer>
    </LayerContext.Provider>,
    rootEl
  )
}
// Add ResizeObserver polyfill from juggle if not available
if (typeof window !== 'undefined') {
  if (window.ResizeObserver === undefined) {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    window.ResizeObserver = ResizeObserver
  }
}
