/// <reference types="cypress" />

context('RadioButton', () => {
  const checkedValue = (dataCy, checked) => {
    if (checked === true) {
      cy.get(`[data-cy=${dataCy}]`).should('be.checked')
    } else {
      cy.get(`[data-cy=${dataCy}]`).should('not.be.checked')
    }
  }

  const radioNativeEl = '[class^=RadioButton__RadioNative]'
  const radioLabelEl = '[class^=RadioIconButton__RadioLabel]'
  const RadioIconArray = [0, 1, 2]

  const confirmCheckedValue = (value, checked) => {
    if (checked === true) {
      cy.get('[data-cy=radioIconGroup]')
        .find(radioNativeEl)
        .eq(value)
        .should('be.checked')
    } else {
      cy.get('[data-cy=radioIconGroup]')
        .find(radioNativeEl)
        .eq(value)
        .should('not.be.checked')
    }
  }

  before(() => {
    cy.visit('http://localhost:9009/#components/radiobutton')
  })

  /** RadioButton test */
  it('RadioButton container should exist', () => {
    cy.get('[data-cy=radioOne]').parent().should('exist').should('be.visible')
  })

  it('All RadioButton should not be checked', () => {
    checkedValue('radioOne', false)
    checkedValue('radioTwo', false)
  })

  it('Click One -> click Two', () => {
    cy.get('[data-cy=radioOne]').click()

    checkedValue('radioOne', true)
    checkedValue('radioTwo', false)

    cy.get('[data-cy=radioTwo]').click()

    checkedValue('radioOne', false)
    checkedValue('radioTwo', true)
  })

  /** RadioIconButton test */
  it('RadioIconGroup container and lable should exist', () => {
    cy.get('[data-cy=radioIconGroup]').should('exist').should('be.visible')
    cy.get('[data-cy=radioIconGroup]').find(radioLabelEl).should('be.visible')
  })

  it('All RadioIconButton should not be checked', () => {
    RadioIconArray.forEach(v => confirmCheckedValue(v, false))
  })

  it('Click icon from the left side', () => {
    RadioIconArray.forEach(value => {
      cy.get('[data-cy=radioIconGroup]').find(radioNativeEl).eq(value).click()
      confirmCheckedValue(value, true)

      // Others should not be checked
      RadioIconArray.filter(v => v !== value).forEach(v =>
        confirmCheckedValue(v, false)
      )
    })
  })
})
