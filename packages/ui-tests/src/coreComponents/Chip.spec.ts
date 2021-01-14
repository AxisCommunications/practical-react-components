/// <reference types="cypress" />

context('Chip', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/chip')
  })

  it('Chip should exist', () => {
    cy.get('[data-cy=chip]').should('exist').should('be.visible')
  })

  it('Error icon should visible', () => {
    cy.get('[data-cy=chip-error]')
      .should('exist')
      .find('svg')
      .should('be.visible')
  })

  it('Should have same height', () => {
    const chipHeight = '24px'

    cy.get('[data-cy=chip]').should('have.css', 'height', chipHeight)
    cy.get('[data-cy=chip-error]').should('have.css', 'height', chipHeight)
  })
})
