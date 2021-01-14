/// <reference types="cypress" />

context('Paper', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/paper')
  })

  it('Should exist', () => {
    cy.get('[data-cy=paper]').should('exist').should('be.visible')
  })
})
