/// <reference types="cypress" />

context('Expandable', { testIsolation: false }, () => {
  const iconConEl = '[class^=Icon__IconContainer]'

  before(() => {
    cy.visit('http://localhost:9009/#/components/expandable')
  })

  it('header should be visible, but not content', () => {
    cy.get('[data-cy=expandableTest')
      .children()
      .eq(0)
      .contains('Header')
      .should('be.visible')
    cy.get('[data-cy=expandableTest')
      .children()
      .eq(0)
      .contains('I am content')
      .should('not.exist')
  })

  it('clicking on arrow should reveal content', () => {
    cy.get('[data-cy=expandableTest')
      .children()
      .eq(0)
      .within(() => {
        cy.get(iconConEl).parent().eq(0).click()
      })
      .wait(500)
    cy.get('[data-cy=contentId]').should('be.visible')
  })

  it('clicking on arrow again should collapse content', () => {
    cy.get('[data-cy=expandableTest')
      .children()
      .eq(0)
      .within(() => {
        cy.get(iconConEl)
          .parent()
          .eq(0)
          .click()
          .then(() => {
            cy.get('[data-cy=contentId]').should('not.exist')
          })
      })
  })
})
