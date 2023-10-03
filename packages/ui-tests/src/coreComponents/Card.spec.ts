/// <reference types="cypress" />

context('Card', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/card')
  })

  it('Should exist', () => {
    cy.get('[data-cy=card]').should('exist').should('be.visible')
  })
})
