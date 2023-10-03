/// <reference types="cypress" />

context('ExpandableList', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/expandablelist')
  })

  it('container should have 3 items', () => {
    cy.get('[data-cy=expandableListTest]').children().should('have.length', 3)
  })

  it('category item should expand list on click and contain 3 items', () => {
    const categoryEl = cy.get('[data-cy=expandableListTest]').children().eq(1)
    categoryEl.click().then(() => {
      categoryEl
        .children()
        .eq(1)
        .children()
        .eq(0)
        .children()
        .should('have.length', 3)
    })
  })

  it('text of all 3 subitems should be visible', () => {
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 1')
      .should('be.visible')
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 2')
      .should('be.visible')
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 3')
      .should('be.visible')
  })

  it('clicking category item should collapse list again', () => {
    const categoryEl = cy
      .get('[data-cy=expandableListTest]')
      .children()
      .eq(1)
      .contains('Category')
      .parent()
    categoryEl.click().then(() => {
      categoryEl.children().should('have.length', 2)
    })
  })

  it('text of all 3 subitems should not be visible', () => {
    cy.wait(200)
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 1')
      .should('not.exist')
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 2')
      .should('not.exist')
    cy.get('[data-cy=expandableListTest]')
      .contains('Item 3')
      .should('not.exist')
  })
})
