/// <reference types="cypress" />

context('Link', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/link')
  })

  it('Check a link attribute', () => {
    cy.get('[data-cy=link-a]')
      .should('have.attr', 'href', 'http://example.org')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .should('have.attr', 'target', '_blank')
  })

  it('Click button link', () => {
    cy.get('[data-cy=link-button]')
      .click()
      .get('[data-cy=message]')
      .should('exist')

    cy.get('[data-cy=close-button]')
      .click()
      .get('[data-cy=message]')
      .should('not.exist')
  })
})
