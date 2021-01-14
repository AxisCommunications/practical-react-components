/// <reference types="cypress" />

context('Divder', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/divider')
  })

  it('Should exist', () => {
    cy.get('[data-cy=divider]').should('exist').should('be.visible')
  })

  it('Variant "middle" should margins on both sides', () => {
    cy.get('[data-cy=divider-middle]')
      .should('have.css', 'margin-left', '32px')
      .should('have.css', 'margin-right', '32px')
  })

  it('Variant "inset" should have margin-left', () => {
    cy.get('[data-cy=divider-inset-default]').should(
      'have.css',
      'margin-left',
      '64px'
    )

    cy.get('[data-cy=divider-inset-custom]').should(
      'have.css',
      'margin-left',
      '112px'
    )
  })
})
