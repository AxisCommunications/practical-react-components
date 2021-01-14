import React, { useState, useCallback } from 'react'

import { useSelection } from 'react-hooks-shareable'
import { MoreIcon } from 'practical-react-components-icons'

import { Button } from '../Button'
import { Typography } from '../Typography'
import { Menu, IMenuItem } from '../Menu'
import { GlobalScrollbarStyle } from '../Global/GlobalScrollbarStyle'
import { Table, TableRow, TableHeader } from '.'
import { TableHeaderText } from './TableCells'

const TABLE_HEADER_DATA: ReadonlyArray<{
  readonly id: string
  readonly title: string
  readonly width: number
}> = [
  { id: 'serial-number', title: 'Serial number', width: 2 },
  { id: 'name', title: 'Name', width: 1 },
  { id: 'ip-address', title: 'IP address', width: 2 },
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

const LONG_DEVICE_LIST = [
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
  ...DEVICE_LIST,
].map((device, index) => ({ ...device, id: index.toString() }))

const NOOP = () => {
  /** */
}

const onClickHandler = (label: string) => {
  return () => alert(`clicked item: "${label}"`)
}

const clickLogger = (id: string) => {
  return () => window.alert(`You clicked on: ${id}`)
}

const MENU_ITEMS: ReadonlyArray<IMenuItem> = [
  { label: 'Item 1', onClick: NOOP },
  { label: 'Item 2', divider: true, onClick: NOOP },
  {
    label: 'Item 3',
    disabled: true,
    danger: true,
    onClick: NOOP,
  },
]

export const LargeTableExample = () => {
  const [selection, add, remove, reset] = useSelection()
  const [initialWidths] = useState(TABLE_HEADER_DATA.map(({ width }) => width))
  const onSelect = useCallback(
    (selected: boolean, id?: string) => {
      if (selected) {
        if (id !== undefined) {
          add(id)
        } else {
          reset(LONG_DEVICE_LIST.map(device => device.id))
        }
      } else {
        if (id !== undefined) {
          remove(id)
        } else {
          reset([])
        }
      }
    },
    [add, remove, reset]
  )

  const [toggle, setToggle] = useState(false)
  const toggleTest = useCallback(() => {
    setToggle(!toggle)
  }, [toggle])
  return (
    <>
      <Button label="Run test" onClick={toggleTest} />
      <GlobalScrollbarStyle />
      {toggle ? (
        <Table
          initialWidths={initialWidths}
          resizableColumns={true}
          minColumnWidth={0}
          maxHeight={6}
          onSelect={onSelect}
          hasMenu={true}
        >
          <TableHeader
            selected={
              selection.size !== 0 && selection.size === LONG_DEVICE_LIST.length
            }
            partial={
              selection.size > 0 && selection.size < LONG_DEVICE_LIST.length
            }
            overlay={
              selection.size === 0 ? undefined : (
                <div>
                  <Typography>Actions overlay</Typography>
                </div>
              )
            }
            menu={
              <Menu
                align="right"
                items={MENU_ITEMS.map(({ label, ...item }) => ({
                  ...item,
                  label,
                  onClick: onClickHandler(label),
                }))}
              />
            }
          >
            {TABLE_HEADER_DATA.map(({ title }, id) => (
              <TableHeaderText key={id}>{title}</TableHeaderText>
            ))}
          </TableHeader>
          {LONG_DEVICE_LIST.map((device, index) => {
            return (
              <TableRow
                id={device.id}
                key={device.id}
                selected={selection.has(device.id)}
                disabled={index === 2}
                menu={
                  <>
                    <Menu
                      icon={MoreIcon}
                      align="right"
                      items={MENU_ITEMS.map(({ label, ...item }) => ({
                        ...item,
                        label,
                        onClick: onClickHandler(label),
                      }))}
                    />
                  </>
                }
                clickable={index === 5}
                onClicked={clickLogger(device.id)}
              >
                <Typography>{device.serialNumber}</Typography>
                <Typography>{device.name}</Typography>
                <Typography>{device.ip}</Typography>
              </TableRow>
            )
          })}
        </Table>
      ) : null}
    </>
  )
}
