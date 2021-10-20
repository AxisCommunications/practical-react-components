import { useLayoutEffect } from 'react'

// Reposition on scroll
export const useOnScrollEffect = (
  anchorEl: HTMLElement | null,
  onScroll: () => void
): void => {
  useLayoutEffect(() => {
    if (anchorEl === null) {
      return undefined
    }

    let parentEl = anchorEl.parentElement
    const scrollableParents: Array<HTMLElement> = []
    while (parentEl !== null) {
      if (parentEl.scrollHeight > parentEl.clientHeight) {
        scrollableParents.push(parentEl)
      }

      parentEl = parentEl.parentElement
    }
    scrollableParents.forEach(parent => {
      parent.addEventListener('scroll', onScroll)
    })
    window.addEventListener('scroll', onScroll)
    return () => {
      scrollableParents.forEach(parent => {
        parent.removeEventListener('scroll', onScroll)
      })
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll, anchorEl])
}

// Reposition on resize
export const useOnResizeParentEffect = (
  element: HTMLElement | null,
  onResize: () => void
): void => {
  useLayoutEffect(() => {
    if (element === null) {
      return undefined
    }

    let parentEl = element.parentElement
    const observer = new window.ResizeObserver(onResize)

    while (parentEl !== null) {
      observer.observe(parentEl)
      parentEl = parentEl.parentElement
    }

    return () => observer.disconnect()
  }, [onResize, element])
}

export const useOnResizeEffect = (
  element: HTMLElement | null,
  onResize: () => void
) => {
  useLayoutEffect(() => {
    if (element === null) {
      return undefined
    }

    const observer = new window.ResizeObserver(onResize)
    observer.observe(element)

    return () => observer.disconnect()
  }, [onResize, element])
}

export const anchorPosition = (
  anchorEl: HTMLElement,
  popOverContainerEl: HTMLElement,
  {
    horizontalPosition = 'left',
    horizontalAlignment = 'left',
    verticalPosition = 'bottom',
    verticalAlignment = 'top',
  }: {
    readonly horizontalPosition?: 'left' | 'right' | 'center'
    readonly horizontalAlignment?: 'left' | 'right' | 'center'
    readonly verticalPosition?: 'top' | 'bottom' | 'center'
    readonly verticalAlignment?: 'top' | 'bottom' | 'center'
  }
) => {
  // 🎓 Set up default positioning
  const anchorBBox = anchorEl.getBoundingClientRect()
  const { top, left, bottom, right, width, height } = anchorBBox
  // Ignore invisible anchor, this might happen when the anchor's
  // visibility changes with e.g. display = 'none', in which case the
  // popover will get the wrong position.
  if (width === 0 && height === 0) {
    return
  }
  const anchorHPos = { left, right, center: (left + right) / 2 }
  const anchorVPos = { top, bottom, center: (top + bottom) / 2 }

  const popOverBBox = popOverContainerEl.getBoundingClientRect()
  const popOverHOffset = {
    left: 0,
    right: -popOverBBox.width,
    center: -popOverBBox.width / 2,
  }
  const popOverVOffset = {
    top: 0,
    bottom: -popOverBBox.height,
    center: -popOverBBox.height / 2,
  }

  let popOverLeft =
    anchorHPos[horizontalPosition] + popOverHOffset[horizontalAlignment]
  let popOverTop =
    anchorVPos[verticalPosition] + popOverVOffset[verticalAlignment]

  // 🧚 Automagically keep the pop-over within the document boundaries,
  // by repositioning it if it would overflow.
  const { clientHeight, clientWidth } = document.documentElement
  const popOverVOverflow = clientHeight - (popOverTop + popOverBBox.height)
  const popOverHOverflow = clientWidth - (popOverLeft + popOverBBox.width)
  if (popOverVOverflow < 0) {
    popOverTop = popOverTop + popOverVOverflow
  }
  if (popOverHOverflow < 0) {
    popOverLeft = popOverLeft + popOverHOverflow
  }

  // Set final positioning on pop-over's style
  popOverContainerEl.style.top = `${popOverTop}px`
  popOverContainerEl.style.left = `${popOverLeft}px`
}
