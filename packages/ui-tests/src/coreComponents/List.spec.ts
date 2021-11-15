/// <reference types="cypress" />

const CONTROLLER_LIST = [
  { id: 'bla1', description: '192.168.0.100:8080' },
  { id: 'bla2', description: '192.168.0.100:8081' },
]

context('List', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/list')
  })

  it('Should exist', () => {
    cy.get('[data-cy=list]').should('exist')
    CONTROLLER_LIST.forEach(c => {
      cy.get(`[data-cy=list-item-${c.id}]`).should('exist')
    })
  })

  it('Should contain correct text', () => {
    CONTROLLER_LIST.forEach(c => {
      cy.get(`[data-cy=list-item-${c.id}]`)
        .contains(c.description)
        .should('be.visible')
    })
  })
})
