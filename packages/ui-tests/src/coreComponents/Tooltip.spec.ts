/// <reference types="cypress" />

context('Tooltip', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/tooltip')
  })

  const testTooltips = [
    // Inside top wrapper
    {
      textDataCy: 'defaultTooltipTopText',
      tooltipDataCy: 'defaultTooltipTop',
      tooltipText: 'Tooltip top',
    },
    {
      textDataCy: 'expandedTooltipTopText',
      tooltipDataCy: 'expandedTooltipTop',
      tooltipText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat ante pulvinar ligula fermentum, sit amet maximus sapien iaculis.',
    },
    // Inside bottom wrapper
    {
      textDataCy: 'defaultTooltipBottomText',
      tooltipDataCy: 'defaultTooltipBottom',
      tooltipText: 'Tooltip bottom',
    },
    {
      textDataCy: 'expandedTooltipBottomText',
      tooltipDataCy: 'expandedTooltipBottom',
      tooltipText:
        'Nulla rutrum pulvinar urna, sed aliquet tortor pharetra id. Sed mattis augue ut libero volutpat, quis rhoncus nibh lacinia.',
    },
  ]

  testTooltips.forEach(tooltip => {
    it(`Tooltip ${tooltip.tooltipDataCy} should appear, should have correct text, and should hide`, () => {
      cy.get(`[data-cy=${tooltip.textDataCy}]`).trigger('pointerover')
      cy.get(`[data-cy=${tooltip.tooltipDataCy}]`)
        .should('exist')
        .should('be.visible')

      // Should have correct text in the tooltip.
      cy.get(`[data-cy=${tooltip.tooltipDataCy}]`).contains(tooltip.tooltipText)

      // Hide the tooltip when pointer leaves element.
      cy.get(`[data-cy=${tooltip.textDataCy}]`).trigger('pointerout')
      cy.get(`[data-cy=${tooltip.tooltipDataCy}]`).should('not.exist')
    })
  })
})
