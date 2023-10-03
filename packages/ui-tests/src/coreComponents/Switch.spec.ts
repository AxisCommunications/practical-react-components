/// <reference types="cypress" />

context('Switch', { testIsolation: false }, () => {
  const switchEl = '[class*=Switch__Container]'
  const switchNativeEl = '#cypress-switch'

  const checkedValue = checked => {
    if (checked === true) {
      cy.get('main').find(switchNativeEl).should('be.checked')
    } else {
      cy.get('main').find(switchNativeEl).should('not.be.checked')
    }
  }

  before(() => {
    cy.visit('http://localhost:9009/#/components/switch')
  })

  it('should exist', () => {
    cy.get('main').find(switchEl).should('exist').should('be.visible')
  })

  it('should be clickable', () => {
    checkedValue(false)

    cy.get('main').find(switchEl).click()

    checkedValue(true)

    cy.get('main').find(switchEl).click()

    checkedValue(false)
  })
})
