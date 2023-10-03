/// <reference types="cypress" />

context('Tab', { testIsolation: false }, () => {
  const tab1El = '[data-cy*=my-tab-1]'
  const tab2El = '[data-cy*=my-tab-2]'

  before(() => {
    cy.visit('http://localhost:9009/#/components/tabs')
  })

  it('no tab selected, containers should not be visible', () => {
    cy.get('main').find('[data-cy=container1]').should('not.be.visible')
    cy.get('main').find('[data-cy=container2]').should('not.be.visible')
  })

  it('click first tab, "Content 1" should be visible', () => {
    cy.get('main')
      .find(tab1El)
      .click()
      .then(() => {
        cy.get('[data-cy=container1]').contains('Content 1')
      })
  })

  it('click second tab, "Content 2" should be visible', () => {
    cy.get('main')
      .find(tab2El)
      .click()
      .then(() => {
        cy.get('[data-cy=container2]').contains('Content 2')
      })
  })
})
