import { useEffect } from 'react'

export type EscapeHandler = (evt: KeyboardEvent) => void

let handlerStack: ReadonlyArray<EscapeHandler> = []

const escapeListener: EscapeHandler = evt => {
  const { key, defaultPrevented } = evt

  if (defaultPrevented) {
    return
  }

  if (key === 'Escape' || key === 'Esc') {
    handlerStack[0](evt)
  }
}

/**
 * Calls the last registered handler when the Escape key has been pressed
 * @param handler - Escape handler callback. Must be constant.
 */
export const useEscapeListenerStack = (handler: EscapeHandler) => {
  useEffect(() => {
    // Add new handler to top of stack
    handlerStack = [handler, ...handlerStack]

    if (handlerStack.length === 1) {
      window.addEventListener('keydown', escapeListener)
    }

    return () => {
      // Remove handler from anywhere in stack
      handlerStack = handlerStack.filter(h => h !== handler)

      if (handlerStack.length === 0) {
        window.removeEventListener('keydown', escapeListener)
      }
    }
  }, [handler])
}
