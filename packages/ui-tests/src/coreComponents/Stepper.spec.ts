/// <reference types="cypress" />

context('Stepper', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/stepper')
  })

  it('correctly navigates and displays content for each step', () => {
    // On the first step
    cy.get('[data-cy=stepper]').find('[data-cy=secondName]').should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('.stepper-last-step-message')
      .should('not.exist')
    cy.get('[data-cy=stepper]').find('[data-cy=firstName]').should('be.visible')
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 1)
      .click()

    // On the second step
    cy.get('[data-cy=stepper]').find('[data-cy=firstName]').should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('.stepper-last-step-message')
      .should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('[data-cy=secondName]')
      .should('be.visible')
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 2)
      .first()
      .click()

    // On the first step again
    cy.get('[data-cy=stepper]').find('[data-cy=secondName]').should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('.stepper-last-step-message')
      .should('not.exist')
    cy.get('[data-cy=stepper]').find('[data-cy=firstName]').should('be.visible')
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 1)
      .click()

    // On the second step again
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 2)
      .last()
      .click()

    // On the last step
    cy.get('[data-cy=stepper]').find('[data-cy=firstName]').should('not.exist')
    cy.get('[data-cy=stepper]').find('[data-cy=secondName]').should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('.stepper-last-step-message')
      .should('be.visible')
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 2)
      .last()
      .click()

    // Reset
    cy.get('[data-cy=stepper]')
      .find('[type=button]')
      .should('have.length', 1)
      .click()

    // Start from the beginning
    cy.get('[data-cy=stepper]').find('[data-cy=secondName]').should('not.exist')
    cy.get('[data-cy=stepper]')
      .find('.stepper-last-step-message')
      .should('not.exist')
    cy.get('[data-cy=stepper]').find('[data-cy=firstName]').should('be.visible')
    cy.get('[data-cy=stepper]').find('[type=button]').should('have.length', 1)
  })
})
