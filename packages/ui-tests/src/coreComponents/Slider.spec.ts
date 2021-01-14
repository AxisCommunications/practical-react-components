/// <reference types="cypress" />

const getKnobPositionPercent = $div => {
  const knobTransformValue = $div.css('transform').valueOf()
  const knobPosition = knobTransformValue.match(/\d+.\d*/g)[4]
  // Need to add 8px to position which is the half of Knob's width
  const adjustedKnobPosition = parseInt(knobPosition) + 8
  const railWidth = $div.parent().css('width').match(/\d+/g)[0]

  return `${Math.round((adjustedKnobPosition / parseInt(railWidth)) * 100)}%`
}

context('Slider', () => {
  const trail = '[class^=Slider__Trail]'
  const knob = '[class^=Slider__Knob]'
  const button = '[data-cy=sliderButton]'

  before(() => {
    cy.visit('http://localhost:9009/#components/slider')
  })

  it('Check if trail element is exist', () => {
    cy.get('[data-cy=slider]')
      .find('[class^=Slider__Rail]')
      .should('exist')
      .should('be.visible')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(0, 0, 0, 1, 0, 0)')
  })

  it('Check if Knob element is exist', () => {
    cy.get('[data-cy=slider]')
      .find('[class^=Slider__Rail]')
      .find(knob)
      .should('exist')
      .should('be.visible')
  })

  it('Focus the Track then check if the Halo showing up', () => {
    cy.get('[data-cy=slider]').focus()
    cy.get('[data-cy=slider]')
      .find('[class^=Slider__KnobHalo]')
      .should('have.css', 'visibility')
      .and('eq', 'visible')
  })

  it('Add value and check trail/knob position', () => {
    // test 20%
    cy.get(button).click()

    cy.get('[data-cy=slider]')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(0.2, 0, 0, 1, 0, 0)')

    cy.get('[data-cy=slider]')
      .find(knob)
      .should($div => {
        const expectedKnobPosition = getKnobPositionPercent($div)
        expect(expectedKnobPosition).to.eq('20%')
      })

    // test 40%
    cy.get(button).click()

    cy.get('[data-cy=slider]')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(0.4, 0, 0, 1, 0, 0)')

    cy.get('[data-cy=slider]')
      .find(knob)
      .should($div => {
        const expectedKnobPosition = getKnobPositionPercent($div)
        expect(expectedKnobPosition).to.eq('40%')
      })

    // test 60%
    cy.get(button).click()

    cy.get('[data-cy=slider]')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(0.6, 0, 0, 1, 0, 0)')

    cy.get('[data-cy=slider]')
      .find(knob)
      .should($div => {
        const expectedKnobPosition = getKnobPositionPercent($div)
        expect(expectedKnobPosition).to.eq('60%')
      })

    // test 80%
    cy.get(button).click()

    cy.get('[data-cy=slider]')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(0.8, 0, 0, 1, 0, 0)')

    cy.get('[data-cy=slider]')
      .find(knob)
      .should($div => {
        const expectedKnobPosition = getKnobPositionPercent($div)
        expect(expectedKnobPosition).to.eq('80%')
      })

    // test 100%
    cy.get(button).click()

    cy.get('[data-cy=slider]')
      .find(trail)
      .should('exist')
      .should('have.css', 'transform')
      .and('eq', 'matrix(1, 0, 0, 1, 0, 0)')

    cy.get('[data-cy=slider]')
      .find(knob)
      .should($div => {
        const expectedKnobPosition = getKnobPositionPercent($div)
        expect(expectedKnobPosition).to.eq('100%')
      })
  })
})
