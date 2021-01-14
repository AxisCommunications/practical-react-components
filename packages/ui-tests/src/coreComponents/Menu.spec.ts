/// <reference types="cypress" />

context('Menu', () => {
  const menuItemEl = '[class^=BaseMenu__BaseMenuItem]'
  const menu1 = '[data-cy=menuTest1]'
  const menu2 = '[data-cy=menuTest2]'
  const popup = '[class^=PopOver__PopOverContainer]'

  before(() => {
    cy.visit('http://localhost:9009/#components/menu')
  })

  it('Menu button should be visible and popover should not be visible', () => {
    cy.get(menu1).eq(0).should('exist').should('be.visible')
    cy.get(popup).should('not.exist')
  })

  it('Should open menu popover when click menu button', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')
  })

  it('Click an enabled item should close the popover', () => {
    cy.get(popup).eq(0).find(menuItemEl).eq(0).click()
    cy.get(popup).should('not.exist')
  })

  it('Click a disabled item should do nothing', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).eq(0).find(menuItemEl).eq(2).should('have.attr', 'disabled')
    cy.get(popup).eq(0).find(menuItemEl).eq(2).click()
    cy.get(popup).eq(0).should('exist').should('be.visible')
  })

  it('Closes popover onscroll', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get('main').parent().scrollTo(0, 500)

    cy.get(popup).should('not.exist')
  })

  it('Menu popover should close when focus left it and only one popup should open', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(menu2).eq(0).find('button').focus()
    cy.get(popup).should('not.exist')
    cy.get(menu2).eq(0).find('button').click()
    cy.get(popup).should('have.length', 1)
  })
})
