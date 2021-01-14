/// <reference types="cypress" />

context('Button', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/button')
  })

  it('Default background color', () => {
    cy.get('[data-cy=buttonTest1]').should(
      'not.have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )

    cy.get('[data-cy=buttonTest2]').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )

    cy.get('[data-cy=buttonTest3]').should(
      'not.have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )

    cy.get('[data-cy=buttonTest4]').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    cy.get('[class^=Button__IconButtonHalo]').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
  })

  it('Focused secondary buttons', () => {
    cy.get('[data-cy=buttonTest2]')
      .focus()
      .should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)')

    cy.get('[data-cy=buttonTest4]')
      .focus()
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    cy.get('[class^=Button__IconButtonHalo]').should('be.visible')
  })
})
