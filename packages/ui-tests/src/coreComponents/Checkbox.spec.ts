/// <reference types="cypress" />

context('Checkbox', () => {
  const checkboxEl = '[class^=Checkbox__Container]'
  const checkboxNativeEl = '#cypress-checkbox'

  const checkedValue = checked => {
    if (checked === true) {
      cy.get('main').find(checkboxNativeEl).should('be.checked')
    } else {
      cy.get('main').find(checkboxNativeEl).should('not.be.checked')
    }
  }

  before(() => {
    cy.visit('http://localhost:9009/#components/checkbox')
  })

  it('Should exist', () => {
    cy.get('main').find(checkboxEl).should('exist').should('be.visible')
  })

  it('checked -> not checked -> checked', () => {
    checkedValue(true)

    cy.get(checkboxEl).click()
    checkedValue(false)

    cy.get(checkboxEl).click()
    checkedValue(true)
  })
})
