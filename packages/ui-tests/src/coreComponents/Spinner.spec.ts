/// <reference types="cypress" />

context('Spinner', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/spinner')
  })

  it('Should exist', () => {
    cy.get('[data-cy=spinner]').should('exist').should('be.visible')
    cy.get('[data-cy=spinnertype]').should('exist').should('be.visible')
    cy.get('[data-cy=spinnerlabel]').should('exist').should('be.visible')
  })
  it('should have correct label', () => {
    cy.get('[data-cy=spinnerlabel]').contains('label')
  })
})
