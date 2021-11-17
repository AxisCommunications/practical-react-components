import React from 'react'
import 'jest-styled-components'

import { TestRender } from '../TestUtils'
import { Typography } from '../Typography'
import { SimpleTable, SimpleTableRow } from '.'
import { TableHeaderText } from '../Table'

const clickHandler = () => console.log('Row click')

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

describe('SimpleTable', () => {
  test('SimpleTable', () => {
    const tree = TestRender(
      <SimpleTable
        maxHeight={3}
        header={TABLE_HEADER_DATA.map(({ title }, id) => (
          <TableHeaderText key={id}>{title}</TableHeaderText>
        ))}
        className="my-simple-table"
      >
        {DEVICE_LIST.map((device, index) => (
          <SimpleTableRow
            key={device.serialNumber}
            disabled={index === 2}
            className="my-simple-table-row"
            onClick={clickHandler}
          >
            <Typography>{device.serialNumber}</Typography>
            <Typography>{device.name}</Typography>
            <Typography>{device.ip}</Typography>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    )
    expect(tree).toMatchSnapshot()
  })

  test('SimpleTable with fixed column width', () => {
    const tree = TestRender(
      <SimpleTable
        maxHeight={3}
        header={TABLE_HEADER_DATA.map(({ title }, id) => (
          <TableHeaderText key={id}>{title}</TableHeaderText>
        ))}
        className="my-simple-table"
        widths={[30, 20]}
      >
        {DEVICE_LIST.map((device, index) => (
          <SimpleTableRow
            key={device.serialNumber}
            disabled={index === 2}
            className="my-simple-table-row"
            onClick={clickHandler}
          >
            <Typography>{device.serialNumber}</Typography>
            <Typography>{device.name}</Typography>
            <Typography>{device.ip}</Typography>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    )
    expect(tree).toMatchSnapshot()
  })
})
