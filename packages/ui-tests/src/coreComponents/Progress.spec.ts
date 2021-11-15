/// <reference types="cypress" />

const getWidthInPercent = $div => {
  const width =
    parseFloat($div.css('width')) / parseFloat($div.parent().css('width'))
  return `${Math.round(100 * width)}%`
}

context('Progress', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/Progress')
  })

  it('should exist', () => {
    cy.get('[data-cy=progress]').should('exist').should('be.visible')
    cy.get('[data-cy=progress]')
      .find('[class*="Progress__ProgressLabel"]')
      .should('exist')
      .should('be.visible')
      .contains('Progress')
  })

  it('should progress', () => {
    const progressMeter = '[class*="Progress__ProgressMeter"]'
    const button = '[data-cy=progressButton]'

    cy.get('[data-cy=progress]')
      .find(progressMeter)
      .should($div => {
        const width = getWidthInPercent($div)

        expect(width).to.eq('0%')
      })

    cy.get(button).click()

    cy.get('[data-cy=progress]')
      .find(progressMeter)
      .should($div => {
        const width = getWidthInPercent($div)

        expect(width).to.eq('25%')
      })

    cy.get(button).click()

    cy.get('[data-cy=progress]')
      .find(progressMeter)
      .should($div => {
        const width = getWidthInPercent($div)

        expect(width).to.eq('50%')
      })

    cy.get(button).click()

    cy.get('[data-cy=progress]')
      .find(progressMeter)
      .should($div => {
        const width = getWidthInPercent($div)

        expect(width).to.eq('75%')
      })

    cy.get(button).click()

    cy.get('[data-cy=progress]')
      .find(progressMeter)
      .should($div => {
        const width = getWidthInPercent($div)

        expect(width).to.eq('100%')
      })
  })
})
