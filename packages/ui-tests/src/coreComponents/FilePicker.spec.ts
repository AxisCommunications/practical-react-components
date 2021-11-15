/// <reference types="cypress" />

context('FilePicker', () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/filepicker')
  })

  it('Should exist but should not be visible', () => {
    cy.get('[data-cy=filePicker]').should('exist').should('not.be.visible')
  })

  it('Contains correct text in the button', () => {
    cy.get('[data-cy=filePicker]').siblings().contains('Choose file')
  })

  it('Pick a file then check the picked file name', () => {
    cy.get('input[type=file]').then(subject => {
      const fileInput = subject[0] as HTMLInputElement

      const file = new File(
        [new Blob(['<svg />'], { type: 'image/svg+xml' })],
        'test.svg'
      )

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInput.files = dataTransfer.files

      cy.wrap(subject).trigger('change', { force: true })
    })

    cy.contains('test.svg')
  })
})
