/// <reference types="cypress" />

context('TextArea', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/textarea')
  })

  it('Value and change handlers', () => {
    cy.get('#cypress-textarea-change')
      .should('have.value', 'initial change')
      .type(' and new')
      .should('have.value', 'initial change and new')
    cy.get('#cypress-textarea-valuechange')
      .should('have.value', 'initial valueChange')
      .type(' and new')
      .should('have.value', 'initial valueChange and new')

    cy.get('#cypress-div-change').should('contain', 'initial change and new')
    cy.get('#cypress-div-valuechange').should(
      'contain',
      'initial valueChange and new'
    )
  })
})
