/// <reference types="cypress" />

context('Modal', () => {
  const modalContainerEl = '[class^=Modal__ModalContainer]'

  before(() => {
    cy.visit('http://localhost:9009/#/components/modal')
  })

  it('modal container should not be open', () => {
    cy.get(modalContainerEl).should('not.exist')
  })

  it('click open modal button, modal should be visible', () => {
    cy.get('[data-cy=openModal]')
      .click()
      .then(() => {
        cy.get('[data-cy=closeModal]').should('be.visible')
      })
  })

  it('close modal, modal should not exist', () => {
    cy.get('[data-cy=closeModal]')
      .click()
      .then(() => {
        cy.get(modalContainerEl).should('not.exist')
      })
  })
})
