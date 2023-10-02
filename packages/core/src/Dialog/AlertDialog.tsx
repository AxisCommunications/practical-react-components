/**
 * TODO: check if we need a separate close action (maybe the button onClick
 * handler can just be the onClose handler?)
 */

import { FC } from 'react'

import { Typography } from '../Typography'
import { Button, ButtonClickHandler } from '../Button'
import { ModalProps } from '../Modal'
import { Dialog, HeaderTitle } from './Dialog'

export interface AlertDialogAction {
	/**
	 * The label for the button that should close the dialog.
	 */
	readonly label: string
	/**
	 * The click handler for the button that should close the dialog.
	 */
	readonly onClick: ButtonClickHandler
}

export interface AlertDialogProps extends ModalProps {
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
	 * The close action provides the label and click handler for the button that
	 * allows the user to close the dialog.
	 */
	readonly closeAction: AlertDialogAction
}

export const AlertDialog: FC<AlertDialogProps> = ({
	open,
	onClose,
	title,
	message,
	closeAction,
	...props
}) => (
	<Dialog
		open={open}
		onClose={onClose}
		header={
			title !== undefined ? <HeaderTitle>{title}</HeaderTitle> : undefined
		}
		controls={<Button {...closeAction} />}
		{...props}
	>
		<Typography variant="default-text">{message}</Typography>
	</Dialog>
)
