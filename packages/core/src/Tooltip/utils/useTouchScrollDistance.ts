import { useState, useEffect, useLayoutEffect } from 'react'

export const useTouchScrollDistance = () => {
  const [origin, setOrigin] = useState<TouchList | null>(null)
  const [touches, setTouches] = useState<TouchList | null>(null)
  /**
   * The distance between touch origin and touch current for both
   * x-axis and y-axis
   */
  const [touchScrollDistance, setTouchScrollDistance] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const touchStartHandler = (event: TouchEvent) => {
      if (origin === null) {
        setOrigin(event.touches)
      }
    }

    const touchMoveHandler = (event: TouchEvent) =>
      setTouches(event.changedTouches)

    const touchEndHandler = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        setOrigin(null)
        setTouches(null)
        setTouchScrollDistance({ x: 0, y: 0 })
      }
    }

    const touchCancelHandler = () => {
      setOrigin(null)
      setTouches(null)
      setTouchScrollDistance({ x: 0, y: 0 })
    }

    document.addEventListener('touchstart', touchStartHandler)
    document.addEventListener('touchmove', touchMoveHandler)
    document.addEventListener('touchend', touchEndHandler)
    document.addEventListener('touchcancel', touchCancelHandler)

    return () => {
      document.removeEventListener('touchstart', touchStartHandler)
      document.removeEventListener('touchmove', touchMoveHandler)
      document.removeEventListener('touchend', touchEndHandler)
      document.removeEventListener('touchcancel', touchCancelHandler)
    }
  }, [origin])

  /**
   * Calculates the distance in pixels between the origin of
   * a touch event and position updates to that touch event.
   */
  useLayoutEffect(() => {
    if (origin === null || touches === null) {
      return
    }

    // User is not scrolling
    if (touches.length > 1) {
      return
    }

    const deltaX = touches[0].clientX - origin[0].clientX
    const deltaY = touches[0].clientY - origin[0].clientY

    setTouchScrollDistance({ x: deltaX, y: deltaY })
  }, [origin, touches])

  return touchScrollDistance
}
