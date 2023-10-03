/// <reference types="cypress" />

context('SelectList', { testIsolation: false }, () => {
  const selectListitem = '[class^=SelectList__SelectListItem]'

  const timezones = [
    'Europe/Amsterdam',
    'Europe/Andorra',
    'Europe/Astrakhan',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Brussels',
    'Europe/Bucharest',
    'Europe/Budapest',
    'Europe/Chisinau',
    'Europe/Copenhagen',
    'Europe/Dublin',
    'Europe/Gibraltar',
    'Europe/Helsinki',
    'Europe/Istanbul',
    'Europe/Kaliningrad',
    'Europe/Kiev',
    'Europe/Kirov',
    'Europe/Lisbon',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Malta',
    'Europe/Minsk',
    'Europe/Monaco',
    'Europe/Moscow',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Prague',
    'Europe/Riga',
    'Europe/Rome',
    'Europe/Samara',
    'Europe/Saratov',
    'Europe/Simferopol',
    'Europe/Sofia',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Tirane',
    'Europe/Ulyanovsk',
    'Europe/Uzhgorod',
    'Europe/Vienna',
    'Europe/Vilnius',
    'Europe/Volgograd',
    'Europe/Warsaw',
    'Europe/Zaporozhye',
    'Europe/Zurich',
  ]

  before(() => {
    cy.visit('http://localhost:9009/#/components/selectlist')
  })

  /*
   * Confirming that SelectList is appearing as intended.
   */
  it('SelectList should exist', () => {
    cy.get('[data-cy=selectList]').should('exist').should('be.visible')
  })

  /*
   * Clicking on the first item and ensuring that it's tag matches
   * that of the first item in the timezone list.
   */
  it("Click an item and make sure it's value is correct", () => {
    cy.get('[data-cy=selectList]').find(selectListitem).eq(0).click()
    cy.get('[data-cy=selectList]')
      .find(selectListitem)
      .eq(0)
      .contains(timezones[0])
  })

  /*
   * Clicking on the second item and ensuring it's tag isn't the same
   * as the first one in the timezone list, and then checking to see if
   * it matches the second one in the timezone list.
   */
  it("Click another item and make sure it's value has changed", () => {
    cy.get('[data-cy=selectList]').find(selectListitem).eq(1).click()
    cy.get('[data-cy=selectList]')
      .find(selectListitem)
      .eq(0)
      .should('not.have.value', timezones[0])
    cy.get('[data-cy=selectList]')
      .find(selectListitem)
      .eq(1)
      .contains(timezones[1])
  })

  /*
   * Scrolling on the SelectList, making sure it works.
   */
  it('Scroll on SelectList', () => {
    cy.get('[class^=SelectList__SelectListNative]').scrollTo(0, 500)
  })
})
