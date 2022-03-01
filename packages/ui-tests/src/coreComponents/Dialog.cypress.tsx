import { useBoolean } from 'react-hooks-shareable'
import {
  Dialog,
  Button,
  Typography,
  TextInputField,
  TextBlock,
  SpaceBlock,
  ContentDivider,
  FormSection,
  ContentListItem,
} from 'practical-react-components-core'

import { smallParagraphFixture } from '../fixtures/paragraphs'

export const meta = {
  name: 'Dialog',
  route: '/components/Dialog',
  menu: '',
}

const NOOP = () => {
  /* */
}

const Test = () => {
  const [openDialog, onOpenDialog, onCloseDialog] = useBoolean(false)
  return (
    <>
      <Button
        data-cy="openDialogButton"
        label="Open dialog"
        onClick={onOpenDialog}
      />
      <Dialog
        open={openDialog}
        onClose={onCloseDialog}
        header={<Dialog.HeaderTitle>Big dialog</Dialog.HeaderTitle>}
        controls={
          <>
            <Button data-cy="doneButton" label="Done" onClick={onCloseDialog} />
            <Button
              data-cy="cancelButton"
              variant="secondary"
              label="Cancel"
              onClick={onCloseDialog}
            />
          </>
        }
      >
        <Typography variant="default-text">{smallParagraphFixture}</Typography>
        <SpaceBlock data-cy="spaceBlock8" variant={8} />
        <FormSection data-cy="formSection" title="Form section title">
          <TextInputField
            data-cy="textInputFieldOne"
            label="Input label"
            value=""
            onValueChange={NOOP}
            placeholder="Placeholder"
          />
          <TextInputField
            data-cy="textInputFieldTwo"
            label="Input label"
            value=""
            onValueChange={NOOP}
            placeholder="Placeholder"
          />
        </FormSection>
        <SpaceBlock data-cy="spaceBlock32" variant={32} />
        <ContentDivider data-cy="contentDivider" />
        <ContentListItem data-cy="contentListItemMedium">
          <Typography>Content list item medium height</Typography>
        </ContentListItem>
        <ContentDivider data-cy="contentDivider" />
        <ContentListItem data-cy="contentListItemLarge" listHeight="large">
          <Typography>Content list item large height</Typography>
        </ContentListItem>
        <ContentDivider data-cy="contentDivider" />
        <SpaceBlock data-cy="spaceBlock16" variant={16} />
        <TextBlock
          data-cy="textBlock"
          text="Available applications for installation"
          caption="Selected applications will automatically be installed and
 reinstalled if removed."
        />
        <SpaceBlock data-cy="spaceBlock24" variant={24} />
      </Dialog>
    </>
  )
}
// eslint-disable-next-line import/no-default-export
export default Test
