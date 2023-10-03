/// <reference types="cypress" />

context('Droppable', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/droppable')
  })

  it('Should exist but should not be visible', () => {
    cy.get('[data-cy=droppable]').should('exist').should('not.be.visible')
  })

  it('Contains an icon and correct labels', () => {
    cy.get('[data-cy=droppable]').siblings().find('svg')
    cy.get('[data-cy=droppable]')
      .siblings()
      .contains('Click to browse or drag it here.')
    cy.get('[data-cy=droppable]')
      .siblings()
      .contains('(*.eap, *.zip, *.opk.tar.gz, *.svg)')
  })

  it('Drop a file and check the file name', () => {
    const dropEvent = {
      dataTransfer: {
        files: [
          new File(
            [new Blob(['<svg />'], { type: 'image/svg+xml' })],
            'test.svg'
          ),
        ],
      },
    }
    cy.get('[data-cy=droppable]').parent().trigger('drop', dropEvent)
    cy.get('[data-cy=droppable]').siblings().contains('test.svg')
  })
})
