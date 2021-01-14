/// <reference types="cypress" />

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

context('SimpleTable', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/simpletable')
  })

  it('Should exist and visible', () => {
    cy.get('[data-cy=simple-table]').should('exist').should('be.visible')
  })

  it('Has correct number of rows', () => {
    cy.get('[data-cy*=simple-table-row-]').its('length').should('eq', 12)
  })

  it('Contains correct texts', () => {
    TABLE_HEADER_DATA.forEach(h => {
      cy.get('[data-cy=simple-table]').contains(h.title)
    })

    DEVICE_LIST.forEach((d, index) => {
      cy.get(`[data-cy=simple-table-row-${index}]`)
        .children()
        .eq(0)
        .contains(d.serialNumber)
      cy.get(`[data-cy=simple-table-row-${index}]`)
        .children()
        .eq(1)
        .contains(d.name)
      cy.get(`[data-cy=simple-table-row-${index}]`)
        .children()
        .eq(2)
        .contains(d.ip)
    })
  })

  it('Click a clickable row and should execute a function to show a message', () => {
    cy.get('[data-cy=simple-table-row-5]').click()
    cy.get('[data-cy=message]').should('exist').should('be.visible')
  })
})
