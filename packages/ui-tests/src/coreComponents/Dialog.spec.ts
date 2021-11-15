/// <reference types="cypress" />
context('Dialog', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/dialog')
  })

  /*
   * Opens the Dialog and making sure it exists. Then it checks to
   * make sure that it is in Focus, while also checking that the
   * doneButton and cancelButton isn't.
   */
  it('Open and find Dialog and ascertain focus', () => {
    cy.on('uncaught:exception', err => {
      console.error('uncaught:exception error: ', err.message)
      // return false to prevent the error from
      // failing this test
      return false
    })

    cy.get('[data-cy=openDialogButton]').click()
    cy.get('[class^=Modal__FocusWrapper]').should('exist')
    cy.focused()
      .should('have.attr', 'class')
      .and('contains', 'Modal__FocusWrapper')
    cy.focused().should('not.have.attr', 'data-cy', 'doneButton')
    cy.focused().should('not.have.attr', 'data-cy', 'cancelButton')
  })

  /*
   * Goes through each components in the Dialog, making sure they all exist
   * and are all visibile.
   */
  it('Find components', () => {
    cy.get('[data-cy=formSection]').should('exist').should('be.visible')
    cy.get('[data-cy=textInputFieldOne]').should('exist').should('be.visible')
    cy.get('[data-cy=textInputFieldTwo]').should('exist').should('be.visible')
    cy.get('[data-cy=contentListItemMedium]')
      .should('exist')
      .should('be.visible')
    cy.get('[data-cy=contentListItemLarge]').should('exist')
    cy.get('[data-cy=textBlock]').should('exist')
  })

  /*
   * Goes through each spaceBlocks, making sure that they exist.
   */
  it('Find spaceblocks', () => {
    cy.get('[data-cy=spaceBlock8]').should('exist')
    cy.get('[data-cy=spaceBlock32]').should('exist')
    cy.get('[data-cy=spaceBlock16]').should('exist')
    cy.get('[data-cy=spaceBlock24]').should('exist')
  })

  /*
   * Goes through each contenDivider, making sure they exist and are visible.
   */
  it('Find content divider', () => {
    cy.get('[data-cy=contentDivider]').should('exist').should('be.visible')
    cy.get('[data-cy=contentDivider]').should('exist').should('be.visible')
    cy.get('[data-cy=contentDivider]').should('exist').should('be.visible')
  })

  /*
   * Closes the Dialog and making sure it doesn't exist anymore.
   */
  it("Close Dialog and make sure it doesn't exist", () => {
    cy.get('[data-cy=cancelButton]').click()
    cy.get('[class^=Modal__FocusWrapper]').should('not.exist')
  })
})
