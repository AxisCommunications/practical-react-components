export * from './BaseDialog'
export * from './AlertDialog'
export * from './ConfirmDialog'
export { IDialogProps } from './Dialog'

import { Dialog as DialogOriginal, HeaderTitle } from './Dialog'
import {
  EdgeToEdgeSection,
  CenteredSection,
  ScrollSection,
} from '../Dialog/components/Content'

type DialogOriginalType = typeof DialogOriginal

/* eslint-disable functional/prefer-readonly-type */
interface IDialogSetup {
  CenteredSection: typeof CenteredSection
  EdgeToEdgeSection: typeof EdgeToEdgeSection
  ScrollSection: typeof ScrollSection
  HeaderTitle: typeof HeaderTitle
}
/* eslint-enable functional/prefer-readonly-type */

const DialogSetup = DialogOriginal as DialogOriginalType & IDialogSetup
DialogSetup.CenteredSection = CenteredSection
DialogSetup.EdgeToEdgeSection = EdgeToEdgeSection
DialogSetup.ScrollSection = ScrollSection
DialogSetup.HeaderTitle = HeaderTitle

interface IDialog extends DialogOriginalType, Readonly<IDialogSetup> {}

export const Dialog: IDialog = DialogSetup
