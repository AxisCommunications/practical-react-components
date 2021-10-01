/// <reference types="cypress" />

context('ToggleButtonGroup', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/togglebuttongroup')
  })

  const toggleButtonGroupEl = '[data-cy=toggleButtonGroup]'
  const toggleButtonGroupExclusiveEl = '[data-cy=toggleButtonGroupExclusive]'

  const checkButton = (index: number, toggled: boolean, element: string) => {
    cy.get(element)
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
    checkButton(0, false, toggleButtonGroupEl)
    // Toggle
    cy.get(toggleButtonGroupEl).children().first().click()
    // Check toggled
    checkButton(0, true, toggleButtonGroupEl)
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
    checkButton(0, false, toggleButtonGroupEl)

    // Check disabled
    cy.contains('Disabled')
      .parent()
      .parent()
      .should('have.css', 'pointer-events', 'none')
      .should('have.attr', 'disabled')
  })

  it('ToggleButtonGroupExclusive', () => {
    // Check not toggled
    checkButton(0, false, toggleButtonGroupExclusiveEl)
    // Toggle
    cy.get(toggleButtonGroupExclusiveEl).children().first().click()
    // Check toggled
    checkButton(0, true, toggleButtonGroupExclusiveEl)
    // Check other buttons not toggled
    checkButton(1, false, toggleButtonGroupExclusiveEl)
    checkButton(2, false, toggleButtonGroupExclusiveEl)
    // Toggle
    cy.get(toggleButtonGroupExclusiveEl)
      .children()
      .first()
      .click()
      // Blur toggle button
      .children()
      .first()
      .blur()
  })
})
