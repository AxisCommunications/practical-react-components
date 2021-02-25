/**
 * Dialog
 *
 * The Dialog component consists of a title with optional right-side menu, a
 * bottom control section with buttons, and a variable content which is
 * scrollable when the size gets too small.
 *
 * To build up the content, you can just add elements into the dialog body,
 * which will then get the default padding. Use the appropriate sections from
 * the dialog contents to adapt.
 *
 * The title will automatically be ID-ed for ARIA conformance.
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useScrollPosition } from 'react-hooks-shareable'

import { Typography } from '../Typography'
import { ModalProps } from '../Modal'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { MainSection } from './components/Content'
import { BaseDialog, DialogWidth } from './BaseDialog'
import { twoLinesClamp } from '../utils/twoLinesClamp'

export const HeaderTitle = styled(Typography).attrs({
  variant: 'dialog-heading',
})`
  ${twoLinesClamp}
`

export interface DialogProps extends ModalProps {
  /**
   * Adjusts the width of the panel.
   */
  readonly width?: DialogWidth
  /**
   * React element that will go into the top of the dialog.
   */
  readonly header?: ReactNode
  /**
   * React element that will go into the bottom of the dialog.
   */
  readonly controls: ReactNode
  /**
   * If `true`, puts the modal dialog into focus.
   * AlertDialog, ConfirmDialog don't have input in the content,
   * and they should have `focusDialog={true}`.
   *
   * Default: `true`
   */
  readonly focusDialog?: boolean
}

export const Dialog: React.FC<DialogProps> = ({
  width,
  header,
  controls,
  focusDialog = true,
  children,
  ...modalProps
}) => {
  const { atTop, atBottom, scrollRef } = useScrollPosition()

  return (
    <BaseDialog
      focusDialog={focusDialog}
      width={width}
      verticallyCenter={true}
      header={
        header !== undefined ? (
          <Header shadowHidden={atTop !== false}>{header}</Header>
        ) : null
      }
      footer={<Footer shadowHidden={atBottom !== false}>{controls}</Footer>}
      {...modalProps}
    >
      <MainSection scrollRef={scrollRef} hasHeader={header !== undefined}>
        {children}
      </MainSection>
    </BaseDialog>
  )
}
