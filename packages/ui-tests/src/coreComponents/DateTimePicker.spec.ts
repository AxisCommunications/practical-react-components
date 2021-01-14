/// <reference types="cypress" />

context('DateTimePicker', () => {
  const toggleBtnGroupEL = '[class*=ToggleButtonGroup__ToggleButtonGrid]'
  const dateTimeInfoConEl =
    '[class*=DateTimeInformation__DateTimeInformationContainer]'
  const timeFormatConEl = '[class*=TimePicker__TimeFormatContainer]'
  const datePickerWrapperEl = '[class*=DatePicker__DatePickerWrapper]'
  const monthPickerEl = '[class*=DatePicker__MonthPicker]'
  const dayPickerEl = '[class*=DatePicker__DayPicker]'
  const yearPickerEl = '[class*=DatePicker__YearPicker]'
  const footerConEl = '[class*=DateTimePicker__FooterContainer]'

  before(() => {
    cy.visit('http://localhost:9009/#components/datetimepicker')
  })

  it('no result should exist', () => {
    cy.get('main').contains('no result').should('be.visible')
  })

  it('date time picker modal container should not exist', () => {
    cy.get('[data-cy=dateTimePickerTest]').should('not.be.exist')
  })

  it('date time picker modal container should be exist', () => {
    cy.get('[data-cy=openButton').click()
    cy.get('[data-cy=dateTimePickerTest]').should('be.exist')
  })

  it('date time picker modal should be visible', () => {
    cy.get('[data-cy=dateTimePickerTest]').children().should('be.visible')
  })

  it('button group should be visible', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(toggleBtnGroupEL)
      .should('be.visible')
  })

  it('time format, AM & PM should be visible', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(timeFormatConEl)
      .contains('AM')
      .should('be.visible')
    cy.get('[data-cy=dateTimePickerTest]')
      .find(timeFormatConEl)
      .contains('PM')
      .should('be.visible')
  })

  it('change from AM to PM', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(timeFormatConEl)
      .contains('PM')
      .click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('PM')
      .should('be.visible')
  })

  it('should be able to edit hour', () => {
    cy.get('[data-cy=dateTimePickerTest]').contains('4').parent().click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('4:')
      .should('be.visible')
  })

  it('should be able to switch to edit minute', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(toggleBtnGroupEL)
      .children()
      .eq(1)
      .click()

    cy.get('[data-cy=dateTimePickerTest]').contains('55').should('be.visible')

    cy.get('[data-cy=dateTimePickerTest]')
      .find(timeFormatConEl)
      .should('not.exist')
  })

  it('should be able to edit minute', () => {
    cy.get('[data-cy=dateTimePickerTest]').contains('50').click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('4:50 PM')
      .should('be.visible')
  })

  it('should reset when close modal', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(footerConEl)
      .children()
      .eq(1)
      .contains('Close')
      .parent()
      .parent()
      .click()

    cy.get('main').contains('no result').should('be.visible')

    cy.get('[data-cy=openButton').click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('10:25 AM')
      .should('be.visible')
  })

  it('edit hour and minute', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(toggleBtnGroupEL)
      .children()
      .eq(0)
      .click()

    cy.get('[data-cy=dateTimePickerTest]').contains('12').parent().click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(toggleBtnGroupEL)
      .children()
      .eq(1)
      .click()

    cy.get('[data-cy=dateTimePickerTest]').contains('40').click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('12:40 AM')
      .should('be.visible')
  })

  it('should be able to switch to edit date', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(toggleBtnGroupEL)
      .children()
      .eq(2)
      .click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(datePickerWrapperEl)
      .should('be.visible')
  })

  it('should be able to edit month', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(datePickerWrapperEl)
      .find(monthPickerEl)
      .children()
      .eq(0)
      .click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(datePickerWrapperEl)
      .find(monthPickerEl)
      .contains('June')
      .should('be.visible')

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('Sat, June 15, 2019')
      .should('be.visible')
  })

  it('should be able to edit date', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(datePickerWrapperEl)
      .find(dayPickerEl)
      .contains('6')
      .click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('Thu, June 6, 2019')
      .should('be.visible')
  })

  it('should be able to edit year', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(datePickerWrapperEl)
      .find(yearPickerEl)
      .children()
      .eq(2)
      .click()

    cy.get('[data-cy=dateTimePickerTest]')
      .find(dateTimeInfoConEl)
      .contains('Sat, June 6, 2020')
      .should('be.visible')
  })

  it('should be able to save', () => {
    cy.get('[data-cy=dateTimePickerTest]')
      .find(footerConEl)
      .children()
      .eq(0)
      .contains('Save')
      .parent()
      .parent()
      .click()
  })

  it('datetimepicker should be closed', () => {
    cy.get('[data-cy=dateTimePickerTest]').should('not.exist')
  })
})
