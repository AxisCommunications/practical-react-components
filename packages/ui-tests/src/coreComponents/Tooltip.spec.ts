/// <reference types="cypress" />

context('Tooltip', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/tooltip')
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
    {
      textDataCy: 'expandedTooltipTopLeftRightText',
      tooltipDataCy: 'expandedTooltipTopLeftRight',
      tooltipText:
        'LeftRight Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat ante pulvinar ligula fermentum, sit amet maximus sapien iaculis.',
    },
    // Inside bottom wrapper
    {
      textDataCy: 'defaultTooltipBottomText',
      tooltipDataCy: 'defaultTooltipBottom',
      tooltipText: 'Tooltip bottom',
    },
    {
      textDataCy: 'expandedTooltipBottomLeftRightText',
      tooltipDataCy: 'expandedTooltipBottomLeftRight',
      tooltipText:
        'LeftRight Nulla rutrum pulvinar urna, sed aliquet tortor pharetra id. Sed mattis augue ut libero volutpat, quis rhoncus nibh lacinia.',
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

context('Tooltip mobile device', { testIsolation: false }, () => {
  before(() => {
    cy.viewport('ipad-2')
    cy.visit('http://localhost:9009/#/components/tooltip')
  })

  const data = {
    textDataCy: 'expandedTooltipBottomLeftRightText',
    tooltipDataCy: 'expandedTooltipBottomLeftRight',
  }

  it(`Tooltip ${data.tooltipDataCy} should appear, and should hide`, () => {
    // Touch to show tooltip
    cy.get(`[data-cy=${data.textDataCy}]`).should('exist')
    cy.get(`[data-cy=${data.textDataCy}]`).trigger('pointerdown')
    cy.get(`[data-cy=${data.tooltipDataCy}]`)
      .should('exist')
      .should('be.visible')

    // Touch to hide tooltip
    cy.get(`[data-cy=${data.textDataCy}]`).trigger('pointerdown')
    cy.get(`[data-cy=${data.tooltipDataCy}]`).should('not.exist')
  })

  it(`Tooltip ${data.tooltipDataCy} should hide when client touch move more than 150 pixels`, () => {
    // Touch to show tooltip
    cy.get(`[data-cy=${data.textDataCy}]`).trigger('pointerdown')
    cy.get(`[data-cy=${data.tooltipDataCy}]`)
      .should('exist')
      .should('be.visible')

    // Touch move 151 pixels and hide tooltip
    cy.get(`[data-cy=${data.textDataCy}]`)
      .parent()
      .trigger('touchstart', {
        touches: [{ clientX: 0, clientY: 0, identifier: 0 }],
      })

    cy.get(`[data-cy=${data.textDataCy}]`)
      .parent()
      .trigger('touchmove', {
        changedTouches: [{ clientX: 151, clientY: 151, identifier: 0 }],
      })

    // Tooltip is not shown
    cy.get(`[data-cy=${data.tooltipDataCy}]`).should('not.exist')
  })
})
