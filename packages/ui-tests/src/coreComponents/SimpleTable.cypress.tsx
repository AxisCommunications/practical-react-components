import React, { useCallback, useState } from 'react'

import { CloseIcon } from 'practical-react-components-icons'
import {
  Typography,
  IconButton,
  SimpleTable,
  SimpleTableRow,
  TableHeaderText,
} from 'practical-react-components-core'

export const meta = {
  name: 'SimpleTable',
  route: '/components/SimpleTable',
  menu: '',
}

const TABLE_HEADER_DATA = [
  { id: 'serial-number', title: 'Serial number' },
  { id: 'name', title: 'Name' },
  { id: 'ip-address', title: 'IP address' },
]

const DEVICE_LIST = [
  { serialNumber: 'FACEFACE0001', name: 'a', ip: '192.168.0.1' },
  { serialNumber: 'FACEFACE0002', name: 'b', ip: '192.168.0.2' },
  { serialNumber: 'FACEFACE0003', name: 'c', ip: '192.168.0.3' },
  { serialNumber: 'FACEFACE0004', name: 'd', ip: '192.168.0.4' },
  { serialNumber: 'FACEFACE0005', name: 'e', ip: '192.168.0.5' },
  { serialNumber: 'FACEFACE0006', name: 'f', ip: '192.168.0.6' },
  { serialNumber: 'FACEFACE0007', name: 'g', ip: '192.168.0.7' },
  { serialNumber: 'FACEFACE0008', name: 'h', ip: '192.168.0.8' },
  { serialNumber: 'FACEFACE0009', name: 'i', ip: '192.168.0.9' },
  { serialNumber: 'FACEFACE0010', name: 'j', ip: '192.168.0.10' },
  { serialNumber: 'FACEFACE0011', name: 'k', ip: '192.168.0.11' },
  { serialNumber: 'FACEFACE0012', name: 'l', ip: '192.168.0.12' },
]

const Test = () => {
  const [showMessage, setShowMessage] = useState(false)

  const OnShowMessage = useCallback(() => {
    setShowMessage(true)
  }, [setShowMessage])

  const onCloseMessage = useCallback(() => {
    setShowMessage(false)
  }, [setShowMessage])

  return (
    <>
      <SimpleTable
        data-cy="simple-table"
        maxHeight={4}
        header={TABLE_HEADER_DATA.map(({ title }, id) => (
          <TableHeaderText key={id}>{title}</TableHeaderText>
        ))}
        className="my-simple-table"
      >
        {DEVICE_LIST.map((device, index) => (
          <SimpleTableRow
            data-cy={`simple-table-row-${index}`}
            key={device.serialNumber}
            disabled={index === 2}
            className="my-simple-table-row"
            onClick={index === 5 ? OnShowMessage : undefined}
          >
            <Typography>{device.serialNumber}</Typography>
            <Typography>{device.name}</Typography>
            <Typography>{device.ip}</Typography>
          </SimpleTableRow>
        ))}
      </SimpleTable>
      {showMessage ? (
        <>
          <Typography data-cy="message">Clicked</Typography>
          <IconButton
            data-cy="close-button"
            icon={CloseIcon}
            variant="secondary"
            onClick={onCloseMessage}
          />
        </>
      ) : null}
    </>
  )
}

export default Test
