/**
 * Modal
 *
 * Provides a modal functionality without any opinions about what it should look
 * like.
 *
 * TODO: (check if these are still valid)
 *  - Visual aspects
 *  - Open/close animations ?
 *  - Prevent "click-outside" and "esc" to close all stacked dialogs ?
 *  - In "with-knobs"-story only one sub-modal can be opened at a time?!
 */

import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import noScroll from 'no-scroll'
import FocusTrap from 'focus-trap-react'
import { useId } from 'react-hooks-shareable'

import { Layer } from '../Practical'
import {
  useEscapeListenerStack,
  EscapeHandler,
} from './hooks/useEscapeListenerStack'
import { opacity } from '../designparams'

interface CloseOnEscapeProps {
  readonly onClose: VoidFunction
}

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * CloseOnEscape sets up and tears down the "close on escape" logic
 */
const CloseOnEscape: React.FC<CloseOnEscapeProps> = ({ onClose }) => {
  const [escPressed, setEscPressed] = useState(false)

  useEffect(() => {
    if (escPressed) {
      onClose()
    }
  }, [escPressed, onClose])

  // escape handler must be constant
  const escapeHandler = useCallback<EscapeHandler>(
    evt => {
      evt.preventDefault()
      setEscPressed(true)
    },
    [setEscPressed]
  )

  useEscapeListenerStack(escapeHandler)

  return null
}

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.color.text01(opacity[48])};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const FocusWrapper = styled.div`
  outline: 0px;
`

export interface ModalBackdropProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
}

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  children,
  ...props
}) => (
  <Layer>
    <ModalContainer {...props}>{children}</ModalContainer>
  </Layer>
)

export interface ModalProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Handler which is called when the modal should be closed (e.g. when the user
   * pressed the escape key). You need to set open to `false` to close the modal,
   * or do nothing to leave the modal open.
   */
  readonly onClose?: VoidFunction
  /**
   * If `true`, centers the modal.
   */
  readonly verticallyCenter?: boolean
  /**
   * If `true`, puts the modal dialog into focus.
   */
  readonly focusDialog?: boolean
  /**
   * When `true` the dialog is rendered, `false` removes the dialog.
   */
  readonly open: boolean
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  focusDialog = true,
  children,
  ...props
}) => {
  useEffect(() => {
    if (open) {
      noScroll.on()
      return () => noScroll.off()
    }
  }, [open])

  const id = useId('practical-modal')

  /**
   * Render
   */

  if (!open) {
    return null
  }

  return (
    <ModalBackdrop {...props}>
      {onClose !== undefined ? <CloseOnEscape onClose={onClose} /> : null}
      <FocusTrap
        focusTrapOptions={{
          initialFocus: focusDialog ? `#${id}` : undefined,
          escapeDeactivates: false, // We use our own stack
          clickOutsideDeactivates: true, // 😱😱😱 We need this to prevent click capturing
        }}
      >
        <FocusWrapper tabIndex={-1} id={id}>
          {children}
        </FocusWrapper>
      </FocusTrap>
    </ModalBackdrop>
  )
}
