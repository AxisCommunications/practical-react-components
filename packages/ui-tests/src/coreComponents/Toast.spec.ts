/// <reference types="cypress" />

context('Toast', () => {
  const toasts = [
    { dataCy: 'Success', label: 'Successfully set parameter' },
    { dataCy: 'Info', label: 'Note that this will do that.' },
    { dataCy: 'Warning', label: 'Please, do not do this!' },
    { dataCy: 'Error', label: 'Oops, the server responded with 403' },
    { dataCy: 'Action', label: 'Action' },
    { dataCy: 'Loading', label: 'Loading...' },
    { dataCy: 'Progress', label: 'Progressing...' },
  ]

  before(() => {
    cy.visit('http://localhost:9009/#components/toast')
  })

  toasts.forEach(({ dataCy, label }) => {
    it(`${dataCy} toast`, () => {
      cy.get(`[data-cy=${dataCy}]`).click()
      cy.get('[class^=Toast__ToastWrapper]').contains(label).should('exist')

      cy.get('[class^=Toast__LabelContainer]')
        .contains(label)
        .parent()
        .parent()
        .should('exist')
        .should('be.visible')
    })
  })

  it(`Check toast with message`, () => {
    cy.get(`[data-cy=SuccessWithMessage]`).click()
    cy.get('[class^=Toast__ToastWrapper]').contains('Done!').should('exist')
    cy.get('[class^=Toast__LabelContainer]')
      .siblings('[class^=Toast__MessageContainer]')
      .should('exist')
  })

  it('Clear all toasts', () => {
    cy.get('[data-cy=ClearAll]').click()
    // TODO: check if all toasts will be clear after Progress toast will be fixed
  })
})
