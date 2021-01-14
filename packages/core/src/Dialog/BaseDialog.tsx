/**
 * BaseDialog
 *
 * The BaseDialog component provides a structured Modal, containing
 * a fixed header and footer section, and a scrollable body section
 * that can expand/contract based on the content size.
 *
 * The header/footer are styled depending on the scroll state to
 * indicated start/end of scrolling.
 *
 * By filling the header/footer and content, you can build up more
 * specific dialogs. All dialogs should follow this structure.
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Modal, IModalProps } from '../Modal'
import { Paper } from '../Paper'

const BOTTOM_HEIGHT = '64px'

// TODO: consider using number for width in units of e.g. 128px columns?

export type DialogWidth = 'normal' | 'settings-panel' | 'large-settings-panel'

const DIALOG_WIDTH = {
  normal: '504px',
  'settings-panel': '656px',
  'large-settings-panel': '808px',
}

const Container = styled.div<{ readonly width: DialogWidth }>`
  max-height: 80vh;
  width: ${({ width }) => DIALOG_WIDTH[width]};
  margin: auto;
  box-shadow: ${({ theme }) => theme.shadow.dialog};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ theme }) => theme.color.background00()};
`

const Header = styled.div`
  display: flex;
  flex: none;
  z-index: 1;
  min-height: 64px;
  max-height: 96px;
`

const Content = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  /**
   * Need this to show scrollbar in Firefox
   */
  overflow: auto;
`

const Footer = styled.div`
  height: ${BOTTOM_HEIGHT};
  display: flex;
  flex: none;
  z-index: 1;
`

interface IBaseDialogContentProps {
  /**
   * The width of the dialog, one of `'normal'`, `'settings-panel'` or
   * `'large-settings-panel'`.
   *
   * Default: `'normal'`
   */
  readonly width?: DialogWidth
  /**
   * React element that will go into the top of the dialog.
   */
  readonly header?: ReactNode
  /**
   * React element that will go into the bottom of the dialog.
   */
  readonly footer: ReactNode
}

export type IBaseDialogProps = IBaseDialogContentProps & IModalProps

export const BaseDialog: React.FC<IBaseDialogProps> = ({
  width = 'normal',
  header,
  footer,
  children,
  ...modalProps
}) => (
  <Modal {...modalProps}>
    <Paper>
      <Container width={width}>
        {header !== null ? <Header>{header}</Header> : null}
        <Content>{children}</Content>
        <Footer>{footer}</Footer>
      </Container>
    </Paper>
  </Modal>
)
