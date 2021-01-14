/// <reference types="cypress" />

context('StrengthIndicator', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/strengthindicator')
  })

  it('worst should have scaleX(0)', () => {
    cy.get('[data-cy=worst]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.attr', 'style')
      .should('contain', 'transform: scaleX(0)')
  })

  it('bad should have scaleX(0.25)', () => {
    cy.get('[data-cy=bad]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.attr', 'style')
      .should('contain', 'transform: scaleX(0.25)')
  })

  it('ok should have scaleX(0.5)', () => {
    cy.get('[data-cy=ok]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.attr', 'style')
      .should('contain', 'transform: scaleX(0.5)')
  })

  it('good should have scaleX(0.75)', () => {
    cy.get('[data-cy=good]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.attr', 'style')
      .should('contain', 'transform: scaleX(0.75)')
  })

  it('excellente should have scaleX(1)', () => {
    cy.get('[data-cy=excellente]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.attr', 'style')
      .should('contain', 'transform: scaleX(1)')
  })
})
