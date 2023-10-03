/// <reference types="cypress" />

const options = [
  { value: 'select...', label: 'Select...' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pie', label: 'Pie', disabled: true },
]

context('SelectNative', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/selectnative')
  })

  it('Should exist and be visible', () => {
    cy.get('[data-cy=selectNative]').should('exist').should('be.visible')
  })

  it('Should show correct text as placeholder', () => {
    cy.get('[data-cy=selectNative]').contains('Select...')
  })

  it('Options should contain correct text', () => {
    options.forEach((option, index) => {
      cy.get('[data-cy=selectNative]')
        .find('option')
        .eq(index)
        .contains(option.label)
    })
  })

  it('Should select a option', () => {
    cy.get('[data-cy=selectNative]').select('Apple').should('be.visible')
    cy.get('[data-cy=selectNative]').select('Banana').should('be.visible')
  })

  /**
   * There is issue to test for disabled select options https://github.com/cypress-io/cypress/issues/107
   */
  // it('Should not select a disabled option', () => {
  //   cy.get('[data-cy=selectNative]').select('Pie').should('not.be.visible')
  // })
})
