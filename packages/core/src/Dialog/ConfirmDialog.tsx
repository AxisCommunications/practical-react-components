import React from 'react'

import { Typography } from '../Typography'
import { Button, ButtonClickHandler } from '../Button'
import { IModalProps } from '../Modal'
import { Dialog, HeaderTitle } from './Dialog'

export interface IConfirmDialogAction {
  readonly label: string
  readonly onClick: ButtonClickHandler
}

interface IConfirmDialogProps extends IModalProps {
  /**
   * When `true` the dialog is rendered, `false` removes the dialog.
   */
  readonly open: boolean
  /**
   * Handler which is called when the modal should be closed (e.g. when the user
   * pressed the escape key). You need to set open to `false` to close the modal,
   * or do nothing to leave the modal open.
   */
  readonly onClose?: VoidFunction
  /**
   * The title is a string that is used as the header of the dialog.
   */
  readonly title?: string
  /**
   * The message is a string that is displayed inside the dialog.
   */
  readonly message: string
  /**
   * The confirm action provides the label and click handler for the button that
   * allows the user to confimr the action and close the dialog.
   */
  readonly confirmAction: IConfirmDialogAction
  /**
   * The cancel action provides the label and click handler for the button that
   * allows the user to cancel the action and close the dialog.
   */
  readonly cancelAction: IConfirmDialogAction
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  open,
  onClose,
  title,
  message,
  confirmAction,
  cancelAction,
  ...props
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    header={
      title !== undefined ? <HeaderTitle>{title}</HeaderTitle> : undefined
    }
    controls={
      <>
        <Button {...confirmAction} />
        <Button variant="secondary" {...cancelAction} />
      </>
    }
    {...props}
  >
    <Typography variant="default-text">{message}</Typography>
  </Dialog>
)
