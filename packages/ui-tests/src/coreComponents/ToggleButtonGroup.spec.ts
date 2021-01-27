/// <reference types="cypress" />

context('ToggleButtonGroup', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/togglebuttongroup')
  })

  const toggleButtonGroupEl = '[data-cy=toggleButtonGroup]'

  const checkButton = (index: number, toggled: boolean) => {
    cy.get(toggleButtonGroupEl)
      // Find the toggle button that should be checked
      .children()
      .eq(index)
      // Step to the container that contains the css background-color
      .children()
      // Check the color of the toggle button to check if its toggled or not
      .should(toggled ? 'contain' : 'not.contain', 'Selected')
  }

  it('ToggleButtonGroup', () => {
    // Check not toggled
    checkButton(0, false)
    // Toggle
    cy.get(toggleButtonGroupEl).children().first().click()
    // Check toggled
    checkButton(0, true)
    // Toggle
    cy.get(toggleButtonGroupEl)
      .children()
      .first()
      .click()
      // Blur toggle button
      .children()
      .first()
      .blur()
    // Check not toggled
    checkButton(0, false)

    // Check disabled
    cy.contains('Disabled')
      .parent()
      .parent()
      .should('have.css', 'pointer-events', 'none')
      .should('have.attr', 'disabled')
  })
})
