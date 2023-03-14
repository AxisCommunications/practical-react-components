import {
  useLayoutEffect,
  useContext,
  useCallback,
  useState,
  HTMLAttributes,
  FC,
  ReactNode,
  useMemo,
} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { LayerContext } from '../Practical'
import {
  useOnResizeParentEffect,
  useOnResizeEffect,
  useOnScrollEffect,
  anchorPosition,
} from './utils'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

const PopOverContainer = styled.div`
  position: fixed;
`

/**
 * Pop-over component
 *
 * Used to render some content positioned relative to an anchor, but as a child
 * of the document. By default the PopOver content is positioned below the
 * anchor aligned to the left. When the content would overflow the document, it's
 * repositioned stay within the document boundaries.
 */

export interface PopOverProps extends BaseProps {
  readonly children?: ReactNode
  /**
   * The element to anchor the pop-over to.
   */
  readonly anchorEl: HTMLElement | null
  /**
   * Renders the pop-over at the same DOM-level as the
   * anchorEl, not at the root layer which is by default.
   *
   * Default: `false`
   */
  readonly inline?: boolean
  /**
   * The horizontal position of the pop-over relative to the anchor.
   *
   * Default: `'left'`
   */
  readonly horizontalPosition?: 'left' | 'right' | 'center'
  /**
   * The vertical position of the pop-over relative to the anchor.
   *
   * Default: `'bottom'`
   */
  readonly verticalPosition?: 'top' | 'bottom' | 'center'
  /**
   * Which side of the pop-over to align horizontally with the anchor position.
   *
   * Default: `'left'`
   */
  readonly horizontalAlignment?: 'left' | 'right' | 'center'
  /**
   * Which side of the pop-over to align vertically with the anchor position.
   *
   * Default: `'top'`
   */
  readonly verticalAlignment?: 'top' | 'bottom' | 'center'
  /**
   * Callback, called when the popover element needs to be repositioned. By
   * default an alignment position is used with the values given from
   * `horizontalPosition`, `verticalPosition`, `horizontalAlignment` and
   * `verticalAlignment`.
   *
   * If an `onPosition` function is given that is being used instead of the
   * default positioning function.
   *
   * Default: `undefined`
   */
  readonly onPosition?: (
    anchor: HTMLElement,
    popOverContainer: HTMLElement
  ) => void
  /**
   * Callback, called when the popover element have been scrolled
   *
   * Default: `undefined`
   */
  readonly onScroll?: () => void
}

export const PopOver: FC<PopOverProps> = ({
  anchorEl,
  inline = false,
  horizontalPosition = 'left',
  verticalPosition = 'bottom',
  horizontalAlignment = 'left',
  verticalAlignment = 'top',
  onPosition,
  onScroll,
  children,
  ...props
}) => {
  const [popOverContainer, setPopOverContainer] =
    useState<HTMLDivElement | null>(null)

  const { el: layerRoot } = useContext(LayerContext)

  const position = useCallback(() => {
    // Position the pop-over element synchronously
    if (anchorEl !== null && popOverContainer !== null) {
      if (onPosition === undefined) {
        anchorPosition(anchorEl, popOverContainer, {
          horizontalPosition,
          verticalPosition,
          horizontalAlignment,
          verticalAlignment,
        })
        return
      }
      onPosition(anchorEl, popOverContainer)
    }
  }, [
    horizontalPosition,
    verticalPosition,
    horizontalAlignment,
    verticalAlignment,
    anchorEl,
    onPosition,
    popOverContainer,
  ])

  useOnScrollEffect(anchorEl, () => {
    onScroll?.()
    position()
  })

  // Used when resizing the parent anchorEl
  useOnResizeParentEffect(anchorEl, position)

  useOnResizeEffect(popOverContainer, position)

  // Reposition on initialize
  useLayoutEffect(() => {
    position()
  }, [position, popOverContainer])

  const popOverElement = useMemo(
    () => (
      <PopOverContainer ref={setPopOverContainer} {...props}>
        {children}
      </PopOverContainer>
    ),
    [children, props]
  )

  // When the layer element is not available, there is no layer yet.
  if (layerRoot === null) {
    return null
  }

  // Render the pop-over at the same DOM-level as anchorEl
  if (inline && anchorEl !== null) {
    return popOverElement
  }

  return ReactDOM.createPortal(popOverElement, layerRoot)
}
