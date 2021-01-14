import { remainder } from '../utils/math'

/**
 * TODO: Fix width according to UX
 */
export const getWidth = (width: string): string => {
  switch (width) {
    case 'small':
      return '160px'
    case 'medium':
      return '220px'
    case 'large':
      return '300px'
    case 'full':
      return '100%'
    default:
      return '100%'
  }
}

/**
 * A scrollIntoView with fallback for Edge. For browsers that support it
 * this is identical to:
 *
 * `(element) => element.scrollIntoView({ block: 'nearest' })
 *
 * For other browser this is implemented with `element.scrollIntoView(true)`
 * or `element.scrollIntoView(false)` depending on the vertical offset. It
 * doesn't polyfill the full functionality of `scrollIntoView`.
 */
export const scrollIntoView = (element: Element) => {
  if ('scrollBehavior' in window.document.documentElement.style) {
    element.scrollIntoView({ block: 'nearest' })
    return
  }

  const parent = element.parentElement as Element
  const { height, top }: ClientRect = element.getBoundingClientRect()
  const { top: parentTop }: ClientRect = parent.getBoundingClientRect()
  const offset = top - parentTop

  if (offset < 0) {
    element.scrollIntoView(true)
  } else if (offset + height > parent.clientHeight) {
    element.scrollIntoView(false)
  }
}

type Options = ReadonlyArray<{ readonly disabled?: boolean }>

export const findNextIndex = (index: number | null, options: Options) => {
  const start = index === null ? 0 : index + 1
  for (let i = start; i < start + options.length; i++) {
    const nextIndex = remainder(i, options.length)
    if (options[nextIndex].disabled !== true) {
      return nextIndex
    }
  }
  return index
}

export const findPrevIndex = (index: number | null, options: Options) => {
  const start = index === null ? options.length - 1 : index - 1
  for (let i = start; i > start - options.length; i--) {
    const nextIndex = remainder(i, options.length)
    if (options[nextIndex].disabled !== true) {
      return nextIndex
    }
  }
  return index
}
