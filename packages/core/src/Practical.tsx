import React, { createContext, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import { ResizeObserver } from '@juggle/resize-observer'
import { useId } from 'react-hooks-shareable'

import { Theme, defaultTheme } from './theme'
import {
  ToastsProvider,
  ToastsAnchor,
  ToastsPlacement,
} from './Toast/ToastsProvider'
import { SimpleToastsDurations } from './Toast'

const PracticalRoot = styled.div`
  color: ${({ theme }) => theme.color.text01()};
`

interface PracticalContextType {
  readonly rootEl: HTMLElement | null | undefined
}

const PracticalContext = createContext<PracticalContextType>({
  rootEl: undefined,
})

export interface ToastsOptions {
  /**
   * Position of toasts on the page.
   */
  readonly placement?: ToastsPlacement
  /**
   * Determine if toasts should be always on top (above any other modal layers),
   * or not (above the main application layer but below any other modal layers).
   *
   * @default true
   */
  readonly alwaysOnTop?: boolean
  /**
   * Default toast durations
   */
  readonly defaultDurations?: SimpleToastsDurations
}

const DEFAULT_TOASTS_OPTIONS: Required<ToastsOptions> = {
  placement: { justify: 'right', top: '0' },
  alwaysOnTop: true,
  defaultDurations: {
    success: 4000,
  },
}

interface PracticalProviderProps extends SimpleToastsDurations {
  /**
   * The Practical React Components theme to be used.
   */
  readonly theme?: Theme
  /**
   * The toasts layout.
   *
   * @default Toasts are centered at the top and always visible.
   */
  readonly toastsOptions?: ToastsOptions
}

export const PracticalProvider: React.FC<PracticalProviderProps> = ({
  theme = defaultTheme,
  toastsOptions,
  children,
}) => {
  const [rootEl, rootRef] = useState<HTMLDivElement | null>(null)

  const mergedOptions = {
    ...DEFAULT_TOASTS_OPTIONS,
    ...toastsOptions,
  }

  return (
    <ThemeProvider theme={theme}>
      <PracticalContext.Provider value={{ rootEl }}>
        <ToastsProvider {...mergedOptions.defaultDurations}>
          <PracticalRoot id="practical-root" ref={rootRef}>
            <Layer>{children}</Layer>
            <Layer zIndex={mergedOptions.alwaysOnTop ? 1 : 0}>
              <ToastsAnchor placement={mergedOptions.placement} />
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

interface LayerContextType {
  readonly el: HTMLElement | null
  readonly id: string
}

export const LayerContext = createContext<LayerContextType>({
  el: typeof document !== 'undefined' ? document.body : null,
  id: LAYER_ID_PREFIX,
})

interface LayerProps {
  readonly zIndex?: number
}

export const Layer: React.FC<LayerProps> = ({ children, zIndex }) => {
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
