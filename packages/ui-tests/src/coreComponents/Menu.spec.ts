/// <reference types="cypress" />

context('Menu', () => {
  const menuItemEl = '[class^=BaseMenu__BaseMenuItem]'
  const menu1 = '[data-cy=menuTest1]'
  const menu2 = '[data-cy=menuTest2]'
  const menu_submenu = '[data-cy=menuTest_submenu]'
  const popup = '[class^=PopOver__PopOverContainer]'

  before(() => {
    cy.visit('http://localhost:9009/#/components/menu')
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

  it('Should close the menu when clicking on the button again', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')

    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).should('not.exist')
  })

  it('Should close the menu when clicking outside', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')

    cy.get('body').click(0, 0) // Click outside
    cy.get(popup).should('not.exist')
  })

  it('Should close the menu on blur', () => {
    cy.get(menu1).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')

    cy.get(menu1).eq(0).find('button').blur()
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

  it('Submenu should open when the menu item with submenu is hovered', () => {
    cy.get(menu_submenu).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')
    cy.get(popup).eq(0).find(menuItemEl).eq(0).trigger('pointerover')
    cy.get(popup).should('have.length', 2)
    cy.get(menu_submenu).eq(0).find('button').click()
  })

  it('Submenu should not open when the menu item without submenu is hovered', () => {
    cy.get(menu_submenu).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')
    cy.get(popup).eq(0).find(menuItemEl).eq(1).trigger('pointerover')
    cy.get(popup).should('have.length', 1)
    cy.get(menu_submenu).eq(0).find('button').click()
  })

  it('Both menu popover and submenu popover should close after clicking on a submenu item', () => {
    cy.get(menu_submenu).eq(0).find('button').click()
    cy.get(popup).eq(0).should('exist').should('be.visible')
    cy.get(popup).eq(0).find(menuItemEl).eq(0).trigger('pointerover')
    cy.get(popup).should('have.length', 2)
    cy.get(popup).eq(1).find(menuItemEl).eq(0).click()
    cy.get(popup).should('not.exist')
  })
})
