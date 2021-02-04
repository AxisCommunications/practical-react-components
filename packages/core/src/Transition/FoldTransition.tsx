import React, { useRef, useCallback } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'

const FOLD_ANIMATION_DURATION = 250

const transitionHeight = (
  node: HTMLElement,
  start: number,
  end: number
): void => {
  node.style.overflow = 'hidden'
  node.style.height = `${start}px`
  /* eslint-disable-next-line no-self-assign */
  node.scrollTop = node.scrollTop // ✨ force reflow ✨
  node.style.transition = `height ${FOLD_ANIMATION_DURATION}ms ease-in-out`
  node.style.height = `${end}px`
}

interface FoldTransitionProps {
  readonly expanded: boolean
}

export const FoldTransition: React.FunctionComponent<FoldTransitionProps> = ({
  expanded,
  children,
}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null)

  const increaseHeight = useCallback(() => {
    if (nodeRef.current === null) {
      return
    }

    const node = nodeRef.current

    const height = node.offsetHeight
    transitionHeight(node, 0, height)
  }, [])

  const decreaseHeight = useCallback(() => {
    if (nodeRef.current === null) {
      return
    }

    const node = nodeRef.current

    const height = node.offsetHeight
    transitionHeight(node, height, 0)
  }, [])

  const resetHeight = useCallback(() => {
    if (nodeRef.current === null) {
      return
    }

    const node = nodeRef.current
    node.style.overflow = 'visible'
    node.style.height = 'auto'
    node.style.removeProperty('transition')
  }, [])

  return (
    <TransitionGroup component={null}>
      {expanded ? (
        <Transition
          nodeRef={nodeRef}
          appear={true}
          timeout={FOLD_ANIMATION_DURATION}
          onEnter={increaseHeight}
          onEntered={resetHeight}
          onExit={decreaseHeight}
          onExited={resetHeight}
        >
          <div ref={nodeRef}>{children}</div>
        </Transition>
      ) : undefined}
    </TransitionGroup>
  )
}
