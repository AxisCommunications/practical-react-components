/// <reference types="cypress" />

context('Table', () => {
  const checkboxEl = '[class^=Checkbox__Container]'

  before(() => {
    cy.visit('http://localhost:9009/#components/table')
  })

  it('is rendered correctly', () => {
    cy.get('[data-cy=table]').should('be.exist').should('be.visible')
  })

  it('has correct number of rows', () => {
    cy.get('[data-cy=tableRow]').its('length').should('eq', 12)
  })

  it('show overlay when some checkbox on row is checked', () => {
    cy.get('[data-cy=tableRow]').eq(0).find(checkboxEl).click()
    cy.get('[data-cy=tableHeader]').contains('Actions overlay')
  })

  it('overlay should be hidden when all checkbox are unchecked', () => {
    cy.get('[data-cy=tableHeader]').find(checkboxEl).click().click()
    cy.get('[data-cy=tableHeader]')
      .contains('Actions overlay')
      .should('not.exist')
  })

  it('Menu on header should be visible', () => {
    cy.get('[data-cy=tableHeaderMenu]').should('be.visible')
  })

  it('Menu on row should not be visible but should be visible on hover state', () => {
    cy.get('[data-cy=tableRowMenu]').should('not.be.visible')

    // wanted to test to show menu on hover but neither `trigger('mouseover')` nor
    // `trigger('mouseenter')` don't work.
    // And also `cy.hover` has opened issue (https://github.com/cypress-io/cypress/issues/10)
  })

  it('clickable row should not have checkbox and is clickable', () => {
    cy.get('[data-cy=tableRow]').eq(5).find(checkboxEl).should('not.exist')
    cy.get('[data-cy=tableRow]').eq(5).click()
    cy.get('main').contains('Row is clicked')
  })

  it('disabled row should not be selected and should bot show menu on hover', () => {
    cy.get('[data-cy=tableRow]').eq(2).should('have.attr', 'disabled')
  })
})
