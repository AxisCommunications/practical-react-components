import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Dialog,
  ModalProps,
  SpaceBlock,
  spacing,
  Typography,
} from 'practical-react-components-core'

const LicensesText = styled(Typography).attrs({ as: 'pre' })`
  overflow-y: scroll;
  height: 400px;
  padding: ${spacing.extraLarge};
  background-color: ${({ theme }) => theme.color.background01()};
  font-family: monospace;
`

export const Licenses: React.FC<ModalProps> = ({ onClose, ...props }) => {
  const [license, setLicense] = useState('')

  useEffect(() => {
    const fix = async () => {
      const response = await fetch('licenses.txt')
      const data = await response.text()
      setLicense(data)
    }
    void fix()
  }, [])

  return (
    <Dialog
      {...props}
      onClose={onClose}
      focusDialog={false}
      width="large-settings-panel"
      controls={<Button label="Close" onClick={onClose} />}
    >
      <Typography variant="dialog-heading">
        Licenses &amp; third party licenses
      </Typography>
      <SpaceBlock variant={32} />
      <LicensesText>{license}</LicensesText>
    </Dialog>
  )
}
