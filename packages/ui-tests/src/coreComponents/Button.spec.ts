/// <reference types="cypress" />

context('Button', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/button')
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

context('Tests of IconTextButton', { testIsolation: false }, () => {
  it('Enable/Disable Props', () => {
    cy.get('[data-cy=buttonTest5]')
      .should('be.enabled')
      .invoke('prop', 'disabled', true) //Disable the button

    cy.get('[data-cy=buttonTest5]').should('be.disabled')
  })

  it('Click', () => {
    cy.get('[data-cy=buttonTest6]').click()
  })
})
