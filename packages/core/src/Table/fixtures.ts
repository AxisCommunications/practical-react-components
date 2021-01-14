export const DEVICE_LIST_HEADER: ReadonlyArray<{
  readonly id: string
  readonly title: string
  readonly width?: number
}> = [
  { id: 'serial-number', title: 'Serial number', width: 2 },
  { id: 'name', title: 'Name', width: 1 },
  { id: 'ip-address', title: 'IP address', width: 2 },
  { id: 'online', title: 'Connection Status' },
  { id: 'firmware', title: 'Firmware version', width: 3 },
  { id: 'policies', title: 'Policies', width: 4 },
]

export const DEVICE_LIST_DATA: ReadonlyArray<{
  readonly serialNumber: string
  readonly name: string
  readonly ip: string
  readonly online: boolean
  readonly firmware: string
  readonly policies?: ReadonlyArray<string>
}> = [
  {
    serialNumber: 'FACEFACE0001',
    name: '1',
    ip: '192.168.0.1',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0002',
    name: '2',
    ip: '192.168.0.2',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0003',
    name: '3',
    ip: '192.168.0.3',
    online: false,
    firmware: '12.45.67',
  },
  {
    serialNumber: 'FACEFACE0004',
    name: '4',
    ip: '192.168.0.4',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0005',
    name: '5',
    ip: '192.168.0.5',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0006',
    name: '6',
    ip: '192.168.0.6',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0007',
    name: '7',
    ip: '192.168.0.7',
    online: false,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0008',
    name: '8',
    ip: '192.168.0.8',
    online: false,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0009',
    name: '9',
    ip: '192.168.0.9',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0010',
    name: '10',
    ip: '192.168.0.10',
    online: true,
    firmware: '12.45.67',
  },
  {
    serialNumber: 'FACEFACE0011',
    name: '11',
    ip: '192.168.0.11',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
  {
    serialNumber: 'FACEFACE0012',
    name: '12',
    ip: '192.168.0.12',
    online: true,
    firmware: '12.45.67',
    policies: ['pol1', 'pol2'],
  },
]
