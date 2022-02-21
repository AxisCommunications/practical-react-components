export * from './BaseDialog'
export * from './AlertDialog'
export * from './ConfirmDialog'
export { DialogProps } from './Dialog'
export * from './components'

import { Dialog as DialogOriginal, HeaderTitle } from './Dialog'
import {
  EdgeToEdgeSection,
  CenteredSection,
  ScrollSection,
} from './components/DialogMainSection'

type DialogOriginalType = typeof DialogOriginal

/* eslint-disable functional/prefer-readonly-type */
interface DialogSetupType {
  CenteredSection: typeof CenteredSection
  EdgeToEdgeSection: typeof EdgeToEdgeSection
  ScrollSection: typeof ScrollSection
  HeaderTitle: typeof HeaderTitle
}
/* eslint-enable functional/prefer-readonly-type */

const DialogSetup = DialogOriginal as DialogOriginalType & DialogSetupType
DialogSetup.CenteredSection = CenteredSection
DialogSetup.EdgeToEdgeSection = EdgeToEdgeSection
DialogSetup.ScrollSection = ScrollSection
DialogSetup.HeaderTitle = HeaderTitle

interface DialogType extends DialogOriginalType, Readonly<DialogSetupType> {}

export const Dialog: DialogType = DialogSetup
