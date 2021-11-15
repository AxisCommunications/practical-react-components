/// <reference types="cypress" />

context('Note', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/note')
  })

  it('Should exist', () => {
    cy.get('[data-cy=note]').should('exist').should('be.visible')
  })

  it('Should contain an SVG and a text', () => {
    cy.get('[data-cy=note]').find('svg')
    cy.get('[data-cy=note]').find('p')
  })
})
