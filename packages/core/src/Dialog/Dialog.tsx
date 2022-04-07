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

import { ReactNode, FC } from 'react'
import styled from 'styled-components'
import { useScrollPosition } from 'react-hooks-shareable'

import { Typography } from '../Typography'
import { ModalProps } from '../Modal'
import {
  DialogHeaderContent,
  DialogMainSection,
  DialogFooterContent,
} from './components'
import {
  BaseDialog,
  DialogWidth,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from './BaseDialog'
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

export const Dialog: FC<DialogProps> = ({
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
      {...modalProps}
    >
      {header !== undefined ? (
        <DialogHeader>
          <DialogHeaderContent shadowHidden={atTop !== false}>
            {header}
          </DialogHeaderContent>
        </DialogHeader>
      ) : null}
      <DialogContent>
        <DialogMainSection
          scrollRef={scrollRef}
          hasHeader={header !== undefined}
        >
          {children}
        </DialogMainSection>
      </DialogContent>
      <DialogFooter>
        <DialogFooterContent shadowHidden={atBottom !== false}>
          {controls}
        </DialogFooterContent>
      </DialogFooter>
    </BaseDialog>
  )
}
