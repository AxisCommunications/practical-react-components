/// <reference types="cypress" />

context('Input', () => {
  const timeFormatSelectEl = '[class*=Select__LabelContainer]'
  const timeFormatSelectPopOverEl = '[class^=PopOver__]'

  before(() => {
    cy.visit('http://localhost:9009/#/components/input')
  })

  it('TextInput', () => {
    cy.get('[data-cy=textInput]')
      .should('have.value', 'test 1')
      .type(' some more')
      .should('have.value', 'test 1 some more')
      .clear()
      .should('have.attr', 'placeholder', 'Placeholder')
      .should('have.value', '')
  })

  it('NumberInput', () => {
    cy.get('[data-cy=numberInput]')
      .should('have.value', '12')
      .type('19')
      .should('have.value', '121')
      .clear()
      .type('hello')
      .should('have.value', '')
      .type('321')
      .should('have.value', '321')
  })

  // Test 24 hour input
  it('TimeInput', () => {
    cy.get('[data-cy=timeInput]')
      .should('have.value', '22:33:44')
      // Clear values
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
      .should('have.value', '00:00:00')
      // Type new values with some edge values that will not be added
      // Edge values below 3**6**6**
      .type('312634656')
      .should('have.value', '12:34:56')
  })

  // Test 12 hour input
  it('TimeInputHour12', () => {
    cy.get('[data-cy=timeInputHour12]')
      .should('have.value', '12:00:00')
      // Clear values
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
      .should('have.value', '01:00:00')
      // Type new values
      .type('123456')
      .should('have.value', '12:34:56')
      // Blur and step up to in el to find meridiem select
      .blur()
      .parent()
      .parent()
      .parent()
      .find(timeFormatSelectEl)
      .should('have.text', 'AM')
      .click()

    // Find select options and change from AM to PM
    cy.get(timeFormatSelectPopOverEl)
      .should('exist')
      .should('be.visible')
      .contains('PM')
      .click()
    cy.get(timeFormatSelectEl).should('have.text', 'PM')
  })
})
