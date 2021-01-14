/// <reference types="cypress" />

context('Practical', () => {
  before(() => {
    cy.visit('http://localhost:9009')
  })

  it('Loads the page', () => {
    cy.get('#practical-root').should('exist')
  })
})
